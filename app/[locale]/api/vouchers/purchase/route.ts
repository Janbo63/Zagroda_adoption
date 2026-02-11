import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { generateVoucherCode, calculateExpirationDate, VOUCHER_AMOUNTS } from '@/lib/voucher-utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover' as any,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount, currency, buyerEmail, recipientEmail, recipientName, personalMessage, locale } = body;

        // Validate amount
        const validAmounts = VOUCHER_AMOUNTS[currency as 'EUR' | 'PLN'];
        if (!validAmounts || !validAmounts.includes(amount)) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }

        // Validate currency
        if (currency !== 'EUR' && currency !== 'PLN') {
            return NextResponse.json({ error: 'Invalid currency' }, { status: 400 });
        }

        // Generate voucher code (uniqueness will be handled by Zoho later)
        const voucherCode = generateVoucherCode();
        const expiresAt = calculateExpirationDate();

        // TODO: Transition database persistence to Zoho CRM
        console.log(`Preparing voucher ${voucherCode} for purchase. Sync will happen on payment.`);

        // Origin for redirect URLs
        const origin = request.headers.get('origin');

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'required', // Collect billing details including name
            line_items: [
                {
                    price_data: {
                        currency: currency.toLowerCase(),
                        product_data: {
                            name: `Alpaca Farm Gift Voucher - ${amount / 100} ${currency}`,
                            description: recipientName
                                ? `For ${recipientName}`
                                : 'Redeemable for farm activities, stays, and adoptions',
                            images: [`${origin}/images/voucher-preview.jpg`],
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/${locale}/vouchers/success?session_id={CHECKOUT_SESSION_ID}&voucher_code=${voucherCode}&amount=${amount}&currency=${currency}`,
            cancel_url: `${origin}/${locale}/vouchers`,
            metadata: {
                voucherCode,
                recipientEmail: recipientEmail || '',
                recipientName: recipientName || '',
                personalMessage: personalMessage || '',
                amount: amount.toString(),
                currency
            },
        });

        return NextResponse.json({ url: session.url, voucherCode });
    } catch (err: any) {
        console.error('Voucher Purchase Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
