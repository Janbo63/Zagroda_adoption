/**
 * POST /api/booking/intent
 *
 * Flow (per Beds25 integration guide):
 *   1. Create Zoho Deal → receive bookingRef + zohoDealId
 *   2. Create Stripe Customer (or find existing)
 *   3. Create PaymentIntent with setup_future_usage:'off_session'
 *      → embed bookingRef + zohoDealId in metadata
 *   4. Return clientSecret + bookingRef to client
 *
 * Webhook (payment_intent.succeeded) then:
 *   → Calls POST /api/public/booking/create on Beds25
 *   → Updates Zoho Deal to DEPOSIT_PAID
 */

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createBookingDeal } from '@/lib/zoho-booking';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-01-28.clover' as any });

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            roomId,
            roomName,
            checkIn,
            checkOut,
            nights,
            depositAmount,
            balanceAmount,
            totalAmount,
            adults,
            children,
            guestName,
            guestEmail,
            guestPhone,
            specialRequests,
            nipNumber,
            voucherCode,
            voucherAmount,
            locale = 'pl',
        } = body;

        // Basic validation
        if (!roomId || !checkIn || !checkOut || !depositAmount || !guestEmail || !guestName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        if (depositAmount < 1) {
            return NextResponse.json({ error: 'Deposit amount must be positive' }, { status: 400 });
        }

        // ── Step 1: Create Zoho Deal (before payment so bookingRef is known upfront) ──
        // If this fails we return early — no Stripe charge, no orphan payment
        const { zohoBookingRef, zohoDealId } = await createBookingDeal({
            room: { id: roomId, name: roomName },
            checkIn,
            checkOut,
            nights,
            depositAmount,
            balanceAmount,
            totalAmount,
            guest: {
                name: guestName,
                email: guestEmail,
                phone: guestPhone,
                adults: adults ?? 2,
                children: children ?? [],
                specialRequests: specialRequests ?? undefined,
                nipNumber: nipNumber ?? undefined,
            },
            voucherCode: voucherCode || undefined,
            voucherAmount: voucherAmount || undefined,
            locale,
        });

        // ── Step 2: Create or retrieve Stripe customer ────────────────────────────
        let customerId: string;
        const existing = await stripe.customers.list({ email: guestEmail, limit: 1 });
        if (existing.data.length > 0) {
            customerId = existing.data[0].id;
        } else {
            const customer = await stripe.customers.create({
                email: guestEmail,
                name: guestName,
                phone: guestPhone,
                metadata: { locale, bookingRef: zohoBookingRef },
            });
            customerId = customer.id;
        }

        // ── Step 3: Create PaymentIntent ──────────────────────────────────────────
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(depositAmount * 100), // PLN → grosze
            currency: 'pln',
            customer: customerId,
            setup_future_usage: 'off_session', // ← saves card for T-3 balance charge
            description: `Deposit: ${roomName} ${checkIn}–${checkOut} [${zohoBookingRef}]`,
            metadata: {
                type: 'booking_deposit',
                bookingRef: zohoBookingRef,
                zohoBookingDealId: zohoDealId,
                roomId,
                roomName,
                checkIn,
                checkOut,
                nights: String(nights),
                depositAmount: String(depositAmount),
                balanceAmount: String(balanceAmount),
                totalAmount: String(totalAmount),
                adults: String(adults),
                childrenJson: JSON.stringify(children ?? []),
                guestName,
                guestEmail,
                guestPhone,
                specialRequests: specialRequests ?? '',
                nipNumber: nipNumber ?? '',
                voucherCode: voucherCode ?? '',
                voucherAmount: String(voucherAmount ?? 0),
                locale,
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            bookingRef: zohoBookingRef, // show the guest their ref in the confirmation step
        });

    } catch (err: any) {
        console.error('[/api/booking/intent] Error:', err);
        return NextResponse.json(
            { error: err.message || 'Failed to prepare payment' },
            { status: 500 }
        );
    }
}
