import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { zoho } from '@/lib/zoho';

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

        const adoptionId = session.metadata?.adoptionId;
        const email = session.customer_details?.email;

        if (!adoptionId || !email) {
            return NextResponse.json({ error: 'Incomplete session metadata' }, { status: 400 });
        }

        // The primary sync happens in the Webhook, but we can verify here for the UI
        try {
            const adoption = await zoho.findAdoptionBySessionId(sessionId);
            if (adoption && adoption.Status !== 'Paid') {
                await zoho.updateRecord('Adoptions', adoption.id, { "Status": "Paid" });
            }
        } catch (error) {
            console.error('Zoho Verification Error in record route:', error);
        }

        return NextResponse.json({ success: true, status: 'paid' });
    } catch (err: any) {
        console.error('Adoption Recording Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
