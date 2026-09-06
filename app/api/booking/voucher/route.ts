/**
 * POST /api/booking/voucher
 * Validates a voucher code against Zoho CRM Vouchers module.
 * Returns discount type and value, or an error if invalid/expired.
 */

import { NextResponse } from 'next/server';
import { zoho } from '@/lib/zoho';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        let code = '';
        try {
            const body = await req.json();
            code = body?.code || '';
        } catch {
            return NextResponse.json({ valid: false, error: 'Invalid request body' }, { status: 400 });
        }

        if (!code || typeof code !== 'string') {
            return NextResponse.json({ valid: false, error: 'No voucher code provided' }, { status: 400 });
        }

        const normalised = code.toUpperCase().trim();
        const rawTrimmed = code.trim();

        // ── Active Seasonal Campaign Promo Aliases ────────────────────────────
        if (
            normalised === 'AUTUMN2026' ||
            normalised === 'AUTUMN-2026' ||
            normalised === 'AUTUMN' ||
            normalised === 'PODZIM2026' ||
            normalised === 'PODZIM-2026' ||
            normalised === 'PODZIM' ||
            normalised === 'AUGUST2026' ||
            normalised === 'ALPACA-1003' ||
            normalised === 'ALPACA1003'
        ) {
            return NextResponse.json({
                valid: true,
                code: 'Autumn2026',
                discountType: 'PERCENT',
                discountValue: 10,
                description: 'Autumn 2026 Promo (10% off September & October bookings)',
            });
        }

        // Search Zoho Vouchers module by Voucher_Code OR Name OR Voucher_Name
        let result = await zoho.searchRecord('Vouchers', `(Voucher_Code:equals:${normalised})`);
        if (!result?.data?.length) {
            try {
                result = await zoho.searchRecord('Vouchers', `(Name:equals:${rawTrimmed})`);
            } catch {}
        }
        if (!result?.data?.length) {
            try {
                result = await zoho.searchRecord('Vouchers', `(Voucher_Name:equals:${rawTrimmed})`);
            } catch {}
        }
        const voucher = result?.data?.[0];

        if (!voucher) {
            return NextResponse.json({ valid: false, code: normalised, error: 'Voucher code not found' });
        }

        // Check status
        if (voucher.Status !== 'Active') {
            return NextResponse.json({
                valid: false,
                code: normalised,
                error: voucher.Status === 'Redeemed' ? 'This voucher has already been used' : 'This voucher is no longer valid',
            });
        }

        // Check expiry date
        if (voucher.Expiration_Date) {
            const expiry = new Date(voucher.Expiration_Date);
            if (expiry < new Date()) {
                return NextResponse.json({ valid: false, code: normalised, error: 'This voucher has expired' });
            }
        }

        // Return discount details
        // Assumes Zoho Vouchers module has: Discount_Type (PERCENT|FIXED), Discount_Value, Description
        return NextResponse.json({
            valid: true,
            code: normalised,
            discountType: (voucher.Discount_Type as 'PERCENT' | 'FIXED') || 'FIXED',
            discountValue: Number(voucher.Discount_Value) || 0,
            description: voucher.Description || '',
        });
    } catch (err: any) {
        console.error('[Voucher Validate] Error:', err);
        return NextResponse.json({ valid: false, error: 'Unable to validate voucher' }, { status: 500 });
    }
}
