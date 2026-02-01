import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover' as any,
});

export async function POST(request: Request) {
    try {
        const { sessionId, locale } = await request.json();

        if (!sessionId) {
            return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
        }

        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== 'paid') {
            return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
        }

        const tier = session.metadata?.tier;
        const alpaca = session.metadata?.alpaca;
        const email = session.customer_details?.email;
        const price = session.amount_total;

        if (!tier || !alpaca || !email) {
            return NextResponse.json({ error: 'Incomplete session metadata' }, { status: 400 });
        }

        // Record the adoption in the database
        const adoption = await prisma.adoption.create({
            data: {
                email,
                alpaca,
                tier,
                price: price || 0,
                status: 'completed',
                notes: `Adopted via Stripe Checkout Session: ${sessionId}`,
            },
        });

        return NextResponse.json({ success: true, adoption });
    } catch (err: any) {
        console.error('Adoption Recording Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
