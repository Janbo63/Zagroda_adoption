import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { zoho } from '@/lib/zoho';
import { voucherGenerator } from '@/lib/voucher-generator';
import { certificateGenerator } from '@/lib/certificate-generator';
import { emailService } from '@/lib/email-service';
import { updateBookingStatus, redeemVoucherInZoho } from '@/lib/zoho-booking';
import { createBeds25Booking } from '@/lib/beds25';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    const body = await req.text();
    const sig = headers().get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        if (!webhookSecret) {
            console.error('Missing STRIPE_WEBHOOK_SECRET');
            return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
        }
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;

            // ── Adoptions ────────────────────────────────────────────────────
            if (session.metadata?.alpaca) {
                try {
                    const customerName = session.customer_details?.name || '';
                    const nameParts = customerName.split(' ');
                    const firstName = nameParts[0] || '';
                    const lastName = nameParts.slice(1).join(' ') || '';
                    const phone = session.customer_details?.phone || undefined;

                    let zohoRecordId = '';
                    const adoption = await zoho.findAdoptionBySessionId(session.id);
                    if (adoption) {
                        zohoRecordId = adoption.id;
                        await zoho.updateRecord('Adoptions', adoption.id, { Status: 'Paid' });
                    } else {
                        const createResult = await zoho.syncAdoption({
                            email: session.customer_details?.email || 'pending@stripe.com',
                            alpaca: session.metadata.alpaca,
                            tier: session.metadata.tier,
                            amount: session.amount_total || 0,
                            status: 'Paid',
                            stripeSessionId: session.id,
                            firstName,
                            lastName,
                            phone,
                        });
                        zohoRecordId = createResult.data?.[0]?.details?.id;
                    }

                    if (zohoRecordId) {
                        try {
                            const { filePath, publicUrl } = await certificateGenerator.generateCertificate({
                                adoptionId: session.id.slice(-8),
                                adopterName: customerName || 'Valued Adopter',
                                alpacaName: session.metadata.alpaca,
                                adoptionDate: new Date().toISOString().split('T')[0],
                                tier: (session.metadata.tier?.toLowerCase() as any) || 'bronze',
                                locale: 'en',
                            });
                            const fs = await import('fs');
                            const pdfBuffer = fs.readFileSync(filePath);
                            await zoho.uploadCertificateAttachment(zohoRecordId, pdfBuffer, `Adoption_${session.metadata.alpaca}.pdf`);
                            await zoho.updateAdoptionCertificate(zohoRecordId, publicUrl, new Date().toISOString().split('T')[0]);
                        } catch (certErr) {
                            console.error('Certificate Automation Error:', certErr);
                        }
                    }
                } catch (zohoErr) {
                    console.error('Zoho Adoption Update Error:', zohoErr);
                }
            }

            // ── Vouchers ─────────────────────────────────────────────────────
            if (session.metadata?.voucherCode) {
                try {
                    const customerName = session.customer_details?.name || '';
                    const nameParts = customerName.split(' ');
                    await zoho.syncVoucher({
                        code: session.metadata.voucherCode,
                        amount: session.amount_total || 0,
                        currency: session.currency?.toUpperCase() || 'PLN',
                        status: 'Active',
                        buyerEmail: session.customer_details?.email || 'pending@stripe.com',
                        buyerFirstName: nameParts[0] || '',
                        buyerLastName: nameParts.slice(1).join(' ') || '',
                        recipientName: session.metadata.recipientName,
                        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        phone: session.customer_details?.phone || undefined,
                    });
                } catch (zohoErr) {
                    console.error('Zoho Voucher Sync Error:', zohoErr);
                }

                try {
                    const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                    const { filePath } = await voucherGenerator.generateVoucher({
                        code: session.metadata.voucherCode,
                        amount: session.amount_total || 0,
                        currency: (session.currency?.toUpperCase() || 'PLN') as 'EUR' | 'PLN',
                        buyerName: session.customer_details?.name || 'Unknown Buyer',
                        recipientName: session.metadata.recipientName,
                        personalMessage: session.metadata.personalMessage,
                        expiryDate,
                    });
                    await emailService.sendVoucherToAdmin({
                        adminEmail: process.env.CONTACT_EMAIL || 'info@zagrodaalpakoterapii.com',
                        voucherCode: session.metadata.voucherCode,
                        amount: session.amount_total || 0,
                        currency: session.currency?.toUpperCase() || 'PLN',
                        buyerName: session.customer_details?.name || 'Unknown Buyer',
                        buyerEmail: session.customer_details?.email || 'pending@stripe.com',
                        pdfPath: filePath,
                    });
                } catch (genError) {
                    console.error('Voucher Generation/Email Warning:', genError);
                }
            }
            break;
        }

        // ─── Booking Deposit Confirmed ────────────────────────────────────────
        // Zoho Deal was created BEFORE payment in /api/booking/intent.
        // bookingRef + zohoDealId are stored in the PaymentIntent metadata.
        // We just: update Zoho status → redeem voucher → POST to Beds25.
        case 'payment_intent.succeeded': {
            const intent = event.data.object as Stripe.PaymentIntent;
            if (intent.metadata?.type !== 'booking_deposit') break;

            const meta = intent.metadata;
            const { bookingRef, zohoBookingDealId: zohoDealId } = meta;

            if (!bookingRef || !zohoDealId) {
                console.error('[Booking] CRITICAL: payment_intent.succeeded missing bookingRef or zohoDealId', meta);
                break;
            }

            try {
                // 1. Update Zoho Deal → DEPOSIT_PAID
                await updateBookingStatus(zohoDealId, 'DEPOSIT_PAID');
                console.log(`[Booking] Zoho Deal ${zohoDealId} → DEPOSIT_PAID (${bookingRef})`);

                // 2. Redeem voucher in Zoho (non-fatal)
                if (meta.voucherCode) {
                    try {
                        await redeemVoucherInZoho(meta.voucherCode, zohoDealId);
                        console.log(`[Booking] Voucher ${meta.voucherCode} redeemed`);
                    } catch (voucherErr) {
                        console.error('[Booking] Voucher redemption failed (non-fatal):', voucherErr);
                    }
                }

                // 3. Create booking in Beds25 → blocks OTA (Beds24) calendar
                const children = JSON.parse(meta.childrenJson || '[]');
                await createBeds25Booking({
                    bookingRef,
                    zohoBookingDealId: zohoDealId,
                    roomId: meta.roomId,
                    checkIn: meta.checkIn,
                    checkOut: meta.checkOut,
                    guestName: meta.guestName,
                    guestEmail: meta.guestEmail,
                    guestPhone: meta.guestPhone,
                    adults: Number(meta.adults),
                    children,
                    specialRequests: meta.specialRequests || undefined,
                    nipNumber: meta.nipNumber || undefined,
                    voucherCode: meta.voucherCode || undefined,
                    voucherAmount: meta.voucherAmount ? Number(meta.voucherAmount) : undefined,
                    depositAmount: Number(meta.depositAmount),
                    balanceAmount: Number(meta.balanceAmount),
                    stripeDepositId: intent.id,
                    stripeCustomerId: intent.customer as string,
                    stripePaymentMethodId: intent.payment_method as string,
                    locale: meta.locale,
                    source: 'alpaca-site',
                });
                console.log(`[Booking] Beds25 booking created, OTA blocked (${bookingRef})`);

            } catch (err: any) {
                console.error('[Booking] CRITICAL: Post-payment processing failed:', err);

                // Send admin alert email
                try {
                    const { emailService } = await import('@/lib/email-service');
                    await emailService.sendAdminAlert(
                        `Webhook Processing Failed for Booking ${bookingRef || 'Unknown'}`,
                        `An error occurred during post-payment processing:\n\n` +
                        `Error: ${err?.message || err}\n` +
                        `Booking Ref: ${bookingRef}\n` +
                        `Zoho Deal ID: ${zohoDealId}\n` +
                        `Meta Snapshot:\n${JSON.stringify(meta, null, 2)}`
                    );
                } catch (emailErr) {
                    console.error('[Booking] CRITICAL: Failed to send admin alert email', emailErr);
                }
            }
            break;
        }
    }

    return NextResponse.json({ received: true });
}
