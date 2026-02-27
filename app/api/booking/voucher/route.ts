/**
 * POST /api/booking/voucher
 * Validates a voucher code against Zoho CRM Vouchers module.
 * Returns discount type and value, or an error if invalid/expired.
 */

import { NextResponse } from 'next/server';
import { zoho } from '@/lib/zoho';

export async function POST(req: Request) {
    try {
        const { code } = await req.json();

        if (!code || typeof code !== 'string') {
            return NextResponse.json({ valid: false, error: 'No voucher code provided' }, { status: 400 });
        }

        const normalised = code.toUpperCase().trim();

        // Search Zoho Vouchers module for this code
        const result = await zoho.searchRecord('Vouchers', `(Voucher_Code:equals:${normalised})`);
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
