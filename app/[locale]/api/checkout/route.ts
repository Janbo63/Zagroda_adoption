import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover' as any,
});

const TIER_PRICES: Record<string, number> = {
    bronze: 9900, // 99.00 PLN
    silver: 49900, // 499.00 PLN
    gold: 99900, // 999.00 PLN
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { tier, alpaca, locale } = body;

        if (!tier || !alpaca) {
            return NextResponse.json({ error: 'Missing tier or alpaca' }, { status: 400 });
        }

        const price = TIER_PRICES[tier.toLowerCase()];
        if (!price) {
            return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
        }

        // Origin for redirect URLs
        const origin = request.headers.get('origin');

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'pln',
                        product_data: {
                            name: `Alpaca Adoption - ${tier.toUpperCase()} Package`,
                            description: `Annual adoption of ${alpaca}`,
                            images: [`${origin}/images/Alpacas/${alpaca}.jpg`],
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/${locale}/adopt/success?session_id={CHECKOUT_SESSION_ID}&tier=${tier}&alpaca=${alpaca}`,
            cancel_url: `${origin}/${locale}/adopt`,
            metadata: {
                tier,
                alpaca,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Stripe Session Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
