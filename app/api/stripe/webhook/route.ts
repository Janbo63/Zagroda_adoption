import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { zoho } from '@/lib/zoho';

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
                            stripeSessionId: session.id
                        });
                    }
                } catch (zohoErr) {
                    console.error('Zoho Adoption Update Error:', zohoErr);
                }
            }

            // 2. Handle Vouchers
            if (session.metadata?.voucherCode) {
                try {
                    await zoho.syncVoucher({
                        code: session.metadata.voucherCode,
                        amount: session.amount_total || 0,
                        currency: session.currency?.toUpperCase() || 'PLN',
                        status: 'Active',
                        buyerEmail: session.customer_details?.email || 'pending@stripe.com',
                        recipientName: session.metadata.recipientName,
                        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                    });
                } catch (zohoErr) {
                    console.error('Zoho Voucher Sync Error:', zohoErr);
                }
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
