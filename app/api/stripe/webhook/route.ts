import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { zoho } from '@/lib/zoho';
import { voucherGenerator } from '@/lib/voucher-generator';
import { adoptionGenerator } from '@/lib/adoption-generator';
import { emailService } from '@/lib/email-service';

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

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;

            // 1. Handle Adoptions
            if (session.metadata?.alpaca) {
                try {
                    // Extract customer details
                    const customerName = session.customer_details?.name || 'Unknown Adopter';
                    const nameParts = customerName.split(' ');
                    const firstName = nameParts[0] || '';
                    const lastName = nameParts.slice(1).join(' ') || '';
                    const phone = session.customer_details?.phone || undefined;
                    const email = session.customer_details?.email || 'pending@stripe.com';

                    let adoptionId: string | undefined;

                    const adoption = await zoho.findAdoptionBySessionId(session.id);
                    if (adoption) {
                        await zoho.updateRecord('Adoptions', adoption.id, {
                            "Status": "Paid"
                        });
                        adoptionId = adoption.id;
                    } else {
                        // Create if it didn't exist for some reason
                        const result = await zoho.syncAdoption({
                            email: email,
                            alpaca: session.metadata.alpaca,
                            tier: session.metadata.tier,
                            amount: session.amount_total || 0,
                            status: 'Paid',
                            stripeSessionId: session.id,
                            firstName: firstName,
                            lastName: lastName,
                            phone: phone
                        });
                        adoptionId = result.data?.[0]?.details?.id;
                    }

                    // Generate Certificate and Attach to Zoho
                    if (adoptionId) {
                        try {
                            const { filePath } = await adoptionGenerator.generateCertificate({
                                adoptionId: adoptionId,
                                alpacaName: session.metadata.alpaca,
                                customerName: customerName,
                                tier: session.metadata.tier,
                                startDate: new Date().toISOString().split('T')[0]
                            });

                            await zoho.uploadAttachment('Adoptions', adoptionId, filePath);
                            console.log(`Certificate attached to Adoption ${adoptionId}`);
                        } catch (certError) {
                            console.error('Certificate Generation/Upload Error:', certError);
                        }
                    }

                } catch (zohoErr) {
                    console.error('Zoho Adoption Update Error:', zohoErr);
                }
            }

            // 2. Handle Vouchers
            if (session.metadata?.voucherCode) {
                try {
                    // Extract customer details
                    const customerName = session.customer_details?.name || 'Unknown Buyer';
                    const nameParts = customerName.split(' ');
                    const firstName = nameParts[0] || '';
                    const lastName = nameParts.slice(1).join(' ') || '';
                    const phone = session.customer_details?.phone || undefined;
                    const buyerEmail = session.customer_details?.email || 'pending@stripe.com';

                    const result = await zoho.syncVoucher({
                        code: session.metadata.voucherCode,
                        amount: session.amount_total || 0,
                        currency: session.currency?.toUpperCase() || 'PLN',
                        status: 'Active',
                        buyerEmail: buyerEmail,
                        buyerFirstName: firstName,
                        buyerLastName: lastName,
                        recipientName: session.metadata.recipientName,
                        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        phone: phone
                    });

                    const voucherRecordId = result.data?.[0]?.details?.id;

                    // Generate PDF
                    const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

                    const { filePath } = await voucherGenerator.generateVoucher({
                        code: session.metadata.voucherCode,
                        amount: session.amount_total || 0,
                        currency: (session.currency?.toUpperCase() || 'PLN') as 'EUR' | 'PLN',
                        buyerName: customerName,
                        recipientName: session.metadata.recipientName,
                        personalMessage: session.metadata.personalMessage,
                        expiryDate: expiryDate
                    });

                    // Attach to Zoho
                    if (voucherRecordId) {
                        try {
                            await zoho.uploadAttachment('Vouchers', voucherRecordId, filePath);
                            console.log(`Voucher PDF attached to Voucher Record ${voucherRecordId}`);
                        } catch (uploadError) {
                            console.error('Voucher Attachment Upload Error:', uploadError);
                        }
                    }

                    // Email Admin (Legacy/Backup)
                    await emailService.sendVoucherToAdmin({
                        adminEmail: process.env.CONTACT_EMAIL || 'info@zagrodaalpakoterapii.com',
                        voucherCode: session.metadata.voucherCode,
                        amount: session.amount_total || 0,
                        currency: session.currency?.toUpperCase() || 'PLN',
                        buyerName: customerName,
                        buyerEmail: buyerEmail,
                        pdfPath: filePath
                    });

                } catch (zohoErr) {
                    console.error('Zoho Voucher Sync/Gen Error:', zohoErr);
                }
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
