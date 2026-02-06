import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import { generateVoucherCode, calculateExpirationDate, VOUCHER_AMOUNTS } from '@/lib/voucher-utils';

const prisma = new PrismaClient();
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

        // Generate unique voucher code
        let voucherCode = generateVoucherCode();
        let isUnique = false;

        // Ensure uniqueness
        while (!isUnique) {
            const existing = await prisma.voucher.findUnique({
                where: { code: voucherCode }
            });
            if (!existing) {
                isUnique = true;
            } else {
                voucherCode = generateVoucherCode();
            }
        }

        // Calculate expiration (12 months from now)
        const expiresAt = calculateExpirationDate();

        // Create voucher in database (status: pending until payment succeeds)
        const voucher = await prisma.voucher.create({
            data: {
                code: voucherCode,
                originalAmount: amount,
                remainingAmount: amount,
                currency,
                buyerEmail,
                recipientEmail: recipientEmail || null,
                recipientName: recipientName || null,
                personalMessage: personalMessage || null,
                status: 'pending',
                expiresAt,
            },
        });

        // Origin for redirect URLs
        const origin = request.headers.get('origin');

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
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
            success_url: `${origin}/${locale}/vouchers/success?session_id={CHECKOUT_SESSION_ID}&voucher_id=${voucher.id}`,
            cancel_url: `${origin}/${locale}/vouchers`,
            metadata: {
                voucherCode,
                voucherId: voucher.id,
                recipientEmail: recipientEmail || '',
            },
        });

        return NextResponse.json({ url: session.url, voucherCode });
    } catch (err: any) {
        console.error('Voucher Purchase Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
