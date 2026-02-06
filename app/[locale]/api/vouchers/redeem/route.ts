import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { code, amountToRedeem } = body; // amountToRedeem in cents

        if (!code) {
            return NextResponse.json({ error: 'Voucher code is required' }, { status: 400 });
        }

        // Find voucher
        const voucher = await prisma.voucher.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (!voucher) {
            return NextResponse.json({
                error: 'Invalid voucher code',
                valid: false
            }, { status: 404 });
        }

        // Check if expired
        if (new Date() > voucher.expiresAt) {
            return NextResponse.json({
                error: 'Voucher has expired',
                valid: false
            }, { status: 400 });
        }

        // Check if already fully redeemed
        if (voucher.status === 'fully_redeemed' || voucher.remainingAmount <= 0) {
            return NextResponse.json({
                error: 'Voucher has been fully redeemed',
                valid: false
            }, { status: 400 });
        }

        // Check if status is still pending (payment not completed)
        if (voucher.status === 'pending') {
            return NextResponse.json({
                error: 'Voucher payment has not been completed',
                valid: false
            }, { status: 400 });
        }

        // If amountToRedeem is provided, validate it
        if (amountToRedeem !== undefined) {
            if (amountToRedeem > voucher.remainingAmount) {
                return NextResponse.json({
                    error: 'Amount exceeds voucher balance',
                    valid: false,
                    remainingAmount: voucher.remainingAmount,
                    currency: voucher.currency
                }, { status: 400 });
            }

            // Calculate new remaining amount
            const newRemainingAmount = voucher.remainingAmount - amountToRedeem;
            const newStatus = newRemainingAmount === 0 ? 'fully_redeemed' : 'active';

            // Update voucher
            const updatedVoucher = await prisma.voucher.update({
                where: { id: voucher.id },
                data: {
                    remainingAmount: newRemainingAmount,
                    status: newStatus,
                    updatedAt: new Date(),
                },
            });

            return NextResponse.json({
                valid: true,
                voucher: {
                    code: updatedVoucher.code,
                    redeemedAmount: amountToRedeem,
                    remainingAmount: updatedVoucher.remainingAmount,
                    currency: updatedVoucher.currency,
                    status: updatedVoucher.status,
                },
            });
        }

        // Just validating without redeeming
        return NextResponse.json({
            valid: true,
            voucher: {
                code: voucher.code,
                remainingAmount: voucher.remainingAmount,
                originalAmount: voucher.originalAmount,
                currency: voucher.currency,
                expiresAt: voucher.expiresAt,
            },
        });
    } catch (err: any) {
        console.error('Voucher Redemption Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
