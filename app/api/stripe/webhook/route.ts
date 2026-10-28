import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { zoho } from '@/lib/zoho';
import { voucherGenerator } from '@/lib/voucher-generator';
import { certificateGenerator } from '@/lib/certificate-generator';
import { emailService } from '@/lib/email-service';
import { createBeds25Booking } from '@/lib/beds25';
import { convertToPLN, SUPPORTED_CURRENCIES, type Currency } from '@/lib/currency';

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
                    const customerEmail = session.customer_details?.email || '';
                    const customerName = session.customer_details?.name || '';
                    const nameParts = customerName.split(' ');
                    const firstName = nameParts[0] || '';
                    const lastName = nameParts.slice(1).join(' ') || '';
                    const phone = session.customer_details?.phone || undefined;

                    // Create or find the Contact in Zoho CRM
                    const contactId = await zoho.createOrFindContact({
                        email: customerEmail || 'unknown@stripe.com',
                        firstName,
                        lastName,
                        phone,
                    });

                    let zohoRecordId = '';
                    const adoption = await zoho.findAdoptionBySessionId(session.id);
                    if (adoption) {
                        // Update existing Pending record with real customer details + link Contact
                        zohoRecordId = adoption.id;
                        await zoho.updateRecord('Adoptions', adoption.id, {
                            Status: 'Paid',
                            Email: customerEmail,
                            ...(contactId ? { Client: contactId } : {}),
                        });
                    } else {
                        // No pre-existing record — create fresh with full details
                        const createResult = await zoho.syncAdoption({
                            email: customerEmail || 'unknown@stripe.com',
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

                    // Generate certificate, upload to Zoho, email to customer + admin
                    let certFilePath = '';
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
                            certFilePath = filePath;
                            const fs = await import('fs');
                            const pdfBuffer = fs.readFileSync(filePath);
                            await zoho.uploadCertificateAttachment(zohoRecordId, pdfBuffer, `Adoption_${session.metadata.alpaca}.pdf`);
                            await zoho.updateAdoptionCertificate(zohoRecordId, publicUrl, new Date().toISOString().split('T')[0]);
                        } catch (certErr) {
                            console.error('Certificate Automation Error:', certErr);
                        }
                    }

                    // Email certificate to the customer
                    if (customerEmail && certFilePath) {
                        try {
                            await emailService.sendCertificate({
                                email: customerEmail,
                                adopterName: customerName || 'Valued Adopter',
                                alpacaName: session.metadata.alpaca,
                                pdfPath: certFilePath,
                                locale: 'en',
                            });
                        } catch (emailErr) {
                            console.error('Certificate Email Error:', emailErr);
                        }
                    }

                    // Notify admin about the new adoption
                    try {
                        await emailService.sendAdoptionToAdmin({
                            adminEmail: process.env.CONTACT_EMAIL || 'info@zagrodaalpakoterapii.com',
                            adopterName: customerName || 'Unknown',
                            adopterEmail: customerEmail || 'unknown@stripe.com',
                            alpacaName: session.metadata.alpaca,
                            tier: session.metadata.tier || 'bronze',
                            amount: session.amount_total || 0,
                            pdfPath: certFilePath || undefined,
                        });
                    } catch (adminEmailErr) {
                        console.error('Admin Adoption Notification Error:', adminEmailErr);
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
        // Zoho + Beds25 records are created HERE — only after real payment.
        // All booking data is stored in the PaymentIntent metadata.
        // Internal accounting in Zoho & Beds25 is strictly in PLN.
        case 'payment_intent.succeeded': {
            const intent = event.data.object as Stripe.PaymentIntent;
            if (intent.metadata?.type !== 'booking_deposit') break;

            const meta = intent.metadata;
            const { bookingRef } = meta;

            if (!bookingRef) {
                console.error('[Booking] CRITICAL: payment_intent.succeeded missing bookingRef', meta);
                break;
            }

            const children = JSON.parse(meta.childrenJson || '[]');
            const rawCurrency = meta.currency || 'PLN';
            const bookingCurrency: Currency = (SUPPORTED_CURRENCIES as readonly string[]).includes(rawCurrency)
                ? (rawCurrency as Currency)
                : 'PLN';

            // Always normalise Zoho & Beds25 financial fields to PLN
            const rawTotalDisplay = Number(meta.totalAmount || 0);
            const rawDepositDisplay = Number(meta.depositAmount || 0);
            const rawBalanceDisplay = Number(meta.balanceAmount || 0);
            const rawVoucherDisplay = Number(meta.voucherAmount || 0);
            const originalPLN = Number(meta.originalPLNTotal || 0);

            const grossPLN = originalPLN > 0
                ? originalPLN
                : convertToPLN(rawTotalDisplay, bookingCurrency);
            const voucherPLN = rawVoucherDisplay > 0
                ? (bookingCurrency === 'PLN' ? rawVoucherDisplay : convertToPLN(rawVoucherDisplay, bookingCurrency))
                : 0;
            const netPLN = Math.max(0, grossPLN - voucherPLN);
            const depositPLN = bookingCurrency === 'PLN'
                ? rawDepositDisplay
                : Math.round(netPLN * 0.1 * 100) / 100;
            const balancePLN = bookingCurrency === 'PLN'
                ? rawBalanceDisplay
                : Math.round((netPLN - depositPLN) * 100) / 100;
            const totalPLN = bookingCurrency === 'PLN'
                ? (depositPLN + balancePLN)
                : netPLN;

            const currencyNote = bookingCurrency !== 'PLN'
                ? `[Booked in ${bookingCurrency}: ${rawTotalDisplay} ${bookingCurrency} gross${rawVoucherDisplay > 0 ? ` - ${rawVoucherDisplay} ${bookingCurrency} voucher (${meta.voucherCode})` : ''} = ${rawDepositDisplay + rawBalanceDisplay} ${bookingCurrency} net (${totalPLN} PLN). Deposit paid on Stripe: ${rawDepositDisplay} ${bookingCurrency} (${depositPLN} PLN). Balance due: ${rawBalanceDisplay} ${bookingCurrency} (${balancePLN} PLN).]`
                : '';
            const combinedNotes = [meta.specialRequests?.trim(), currencyNote].filter(Boolean).join(' | ');
            const stripePmId = typeof intent.payment_method === 'string'
                ? intent.payment_method
                : intent.payment_method?.id || '';

            const errors: string[] = [];
            let zohoDealId = '';

            // 1. Create Zoho Booking record (in PLN)
            try {
                const { createBookingDeal, redeemVoucherInZoho } = await import('@/lib/zoho-booking');
                const zohoRes = await createBookingDeal({
                    room: { id: meta.roomId, name: meta.roomName },
                    checkIn: meta.checkIn,
                    checkOut: meta.checkOut,
                    nights: Number(meta.nights),
                    depositAmount: depositPLN,
                    balanceAmount: balancePLN,
                    totalAmount: totalPLN,
                    guest: {
                        name: meta.guestName,
                        email: meta.guestEmail,
                        phone: meta.guestPhone,
                        adults: Number(meta.adults),
                        children,
                        specialRequests: combinedNotes || undefined,
                        nipNumber: meta.nipNumber || undefined,
                    },
                    voucherCode: meta.voucherCode || undefined,
                    voucherAmount: voucherPLN > 0 ? voucherPLN : undefined,
                    stripeDepositId: intent.id,
                    stripeCustomerId: intent.customer as string,
                    stripePaymentMethodId: stripePmId || undefined,
                    locale: meta.locale,
                    currency: 'PLN',
                });
                zohoDealId = zohoRes.zohoDealId;
                console.log(`[Booking] Zoho Booking created: ${zohoDealId} (${bookingRef}) — ${totalPLN} PLN`);

                // 2. Redeem voucher in Zoho (non-fatal)
                if (meta.voucherCode && zohoDealId) {
                    try {
                        await redeemVoucherInZoho(meta.voucherCode, zohoDealId);
                        console.log(`[Booking] Voucher ${meta.voucherCode} redeemed`);
                    } catch (voucherErr) {
                        console.error('[Booking] Voucher redemption failed (non-fatal):', voucherErr);
                    }
                }
            } catch (zohoErr: any) {
                console.error('[Booking] CRITICAL: Zoho creation failed:', zohoErr);
                errors.push(`Zoho Error: ${zohoErr?.message || zohoErr}`);
            }

            // 3. Create booking in Beds25 (in PLN) → blocks calendar immediately
            try {
                await createBeds25Booking({
                    bookingRef,
                    zohoBookingDealId: zohoDealId || bookingRef,
                    roomId: meta.roomId,
                    checkIn: meta.checkIn,
                    checkOut: meta.checkOut,
                    guestName: meta.guestName,
                    guestEmail: meta.guestEmail,
                    guestPhone: meta.guestPhone,
                    adults: Number(meta.adults),
                    children,
                    specialRequests: combinedNotes || undefined,
                    nipNumber: meta.nipNumber || undefined,
                    voucherCode: meta.voucherCode || undefined,
                    voucherAmount: voucherPLN > 0 ? voucherPLN : undefined,
                    depositAmount: depositPLN,
                    balanceAmount: balancePLN,
                    stripeDepositId: intent.id,
                    stripeCustomerId: intent.customer as string,
                    stripePaymentMethodId: stripePmId,
                    locale: meta.locale,
                    source: 'Website' as any,
                });
                console.log(`[Booking] Beds25 booking created, OTA blocked (${bookingRef})`);
            } catch (beds25Err: any) {
                console.error('[Booking] CRITICAL: Beds25 creation failed:', beds25Err);
                errors.push(`Beds25 Error: ${beds25Err?.message || beds25Err}`);
            }

            // 4. Always send Admin & Guest confirmation emails
            const emailPayload = {
                bookingRef,
                roomName: meta.roomName,
                checkIn: meta.checkIn,
                checkOut: meta.checkOut,
                nights: Number(meta.nights),
                guestName: meta.guestName,
                guestEmail: meta.guestEmail,
                guestPhone: meta.guestPhone,
                adults: Number(meta.adults),
                childrenCount: Array.isArray(children) ? children.length : 0,
                childrenAges: Array.isArray(children) && children.length > 0
                    ? children.map((c: any, idx: number) => `Child ${idx + 1}: ${c.age}y`).join(', ')
                    : undefined,
                specialRequests: meta.specialRequests || undefined,
                voucherCode: meta.voucherCode || undefined,
                totalPLN,
                depositPLN,
                balancePLN,
                paidCurrency: bookingCurrency,
                paidDepositDisplay: rawDepositDisplay,
                balanceDisplay: rawBalanceDisplay,
                locale: meta.locale,
            };

            await emailService.sendBookingToAdmin(emailPayload);
            if (meta.guestEmail) {
                await emailService.sendBookingConfirmationToGuest(emailPayload);
            }

            // 5. If any downstream sync error occurred, send alert email to admin
            if (errors.length > 0) {
                await emailService.sendAdminAlert(
                    `Webhook Sync Warning for Booking ${bookingRef}`,
                    `Payment succeeded (${intent.id}), but a downstream sync step reported an error:\n\n` +
                    `${errors.join('\n')}\n\n` +
                    `Booking Ref: ${bookingRef}\n` +
                    `PLN Breakdown: Total ${totalPLN} PLN | Deposit ${depositPLN} PLN | Balance ${balancePLN} PLN\n` +
                    `Meta Snapshot:\n${JSON.stringify(meta, null, 2)}`
                );
            }
            break;
        }
    }

    return NextResponse.json({ received: true });
}
