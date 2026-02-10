import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { zoho } from '@/lib/zoho';
import { voucherGenerator } from '@/lib/voucher-generator';
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
                    const customerName = session.customer_details?.name || '';
                    const nameParts = customerName.split(' ');
                    const firstName = nameParts[0] || '';
                    const lastName = nameParts.slice(1).join(' ') || '';
                    const phone = session.customer_details?.phone || undefined;

                    const adoption = await zoho.findAdoptionBySessionId(session.id);
                    if (adoption) {
                        await zoho.updateRecord('Adoptions', adoption.id, {
                            "Status": "Paid"
                        });
                    } else {
                        // Create if it didn't exist for some reason
                        await zoho.syncAdoption({
                            email: session.customer_details?.email || 'pending@stripe.com',
                            alpaca: session.metadata.alpaca,
                            tier: session.metadata.tier,
                            amount: session.amount_total || 0,
                            status: 'Paid',
                            stripeSessionId: session.id,
                            firstName: firstName,
                            lastName: lastName,
                            phone: phone
                        });
                    }
                } catch (zohoErr) {
                    console.error('Zoho Adoption Update Error:', zohoErr);
                }
            }

            // 2. Handle Vouchers
            if (session.metadata?.voucherCode) {
                try {
                    // Extract customer details
                    const customerName = session.customer_details?.name || '';
                    const nameParts = customerName.split(' ');
                    const firstName = nameParts[0] || '';
                    const lastName = nameParts.slice(1).join(' ') || '';
                    const phone = session.customer_details?.phone || undefined;

                    await zoho.syncVoucher({
                        code: session.metadata.voucherCode,
                        amount: session.amount_total || 0,
                        currency: session.currency?.toUpperCase() || 'PLN',
                        status: 'Active',
                        buyerEmail: session.customer_details?.email || 'pending@stripe.com',
                        buyerFirstName: firstName,
                        buyerLastName: lastName,
                        recipientName: session.metadata.recipientName,
                        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        phone: phone
                    });
                } catch (zohoErr) {
                    console.error('Zoho Voucher Sync Error:', zohoErr);
                }

                // Generate PDF and Email Admin
                try {
                    const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                    const buyerEmail = session.customer_details?.email || 'pending@stripe.com';

                    const { filePath } = await voucherGenerator.generateVoucher({
                        code: session.metadata.voucherCode,
                        amount: session.amount_total || 0,
                        currency: (session.currency?.toUpperCase() || 'PLN') as 'EUR' | 'PLN',
                        buyerName: session.customer_details?.name || 'Unknown Buyer',
                        recipientName: session.metadata.recipientName,
                        personalMessage: session.metadata.personalMessage,
                        expiryDate: expiryDate
                    });

                    await emailService.sendVoucherToAdmin({
                        adminEmail: process.env.CONTACT_EMAIL || 'info@zagrodaalpakoterapii.com',
                        voucherCode: session.metadata.voucherCode,
                        amount: session.amount_total || 0,
                        currency: session.currency?.toUpperCase() || 'PLN',
                        buyerName: session.customer_details?.name || 'Unknown Buyer',
                        buyerEmail: buyerEmail,
                        pdfPath: filePath
                    });

                } catch (genError) {
                    console.error('Voucher Generation/Email Warning:', genError);
                }
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
