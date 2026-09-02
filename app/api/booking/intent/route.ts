/**
 * POST /api/booking/intent
 *
 * Revised flow — Zoho + Beds25 records are created ONLY after payment:
 *   1. Generate a local booking reference (ZAP-XXXXXX)
 *   2. Create or find Stripe Customer
 *   3. Create PaymentIntent with all booking data in metadata
 *   4. Return clientSecret + bookingRef to client
 *
 * Webhook (payment_intent.succeeded) then:
 *   → Creates Zoho Booking record (status: Deposit Paid)
 *   → Creates Beds25 booking (blocks OTA calendar)
 *   → Redeems voucher if applicable
 *
 * This ensures NO Zoho orphans and NO premature confirmation emails
 * if the guest abandons the payment step.
 */

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-01-28.clover' as any });

/** Generate a human-friendly booking reference: ZAP-XXXXXX */
function generateBookingRef(): string {
    const hex = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6 hex chars
    return `ZAP-${hex}`;
}

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

        // ── Step 1: Generate booking reference locally ────────────────────────────
        const bookingRef = generateBookingRef();

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
                metadata: { locale, bookingRef },
            });
            customerId = customer.id;
        }

        // ── Step 3: Create PaymentIntent ──────────────────────────────────────────
        // All booking data is stored in metadata so the webhook can create
        // the Zoho + Beds25 records after payment succeeds.
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(depositAmount * 100), // PLN → grosze
            currency: 'pln',
            customer: customerId,
            setup_future_usage: 'off_session', // saves card for T-3 balance charge
            description: `Deposit: ${roomName} ${checkIn}–${checkOut} [${bookingRef}]`,
            metadata: {
                type: 'booking_deposit',
                bookingRef,
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
            bookingRef, // show the guest their ref in the confirmation step
        });

    } catch (err: any) {
        console.error('[/api/booking/intent] Error:', err);
        return NextResponse.json(
            { error: err.message || 'Failed to prepare payment' },
            { status: 500 }
        );
    }
}
