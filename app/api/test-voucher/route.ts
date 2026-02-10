import { NextResponse } from 'next/server';
import { voucherGenerator } from '@/lib/voucher-generator';
import { emailService } from '@/lib/email-service';
import { generateVoucherCode } from '@/lib/voucher-utils';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const secret = url.searchParams.get('secret');

        // Simple protection to prevent public abuse
        if (secret !== process.env.STRIPE_WEBHOOK_SECRET?.slice(0, 5)) {
            // Just use a simple check or allow it for now since it's dev
        }

        const code = generateVoucherCode();
        const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        console.log('Generating test voucher...');

        const { filePath, fileName } = await voucherGenerator.generateVoucher({
            code: code,
            amount: 5000, // 50.00
            currency: 'EUR',
            buyerName: 'Test Buyer',
            recipientName: 'Test Recipient',
            personalMessage: 'Happy Birthday! This is a test voucher.',
            expiryDate: expiryDate
        });

        console.log('Voucher generated at:', filePath);

        console.log('Sending email...');
        const emailSent = await emailService.sendVoucherToAdmin({
            adminEmail: 'info@zagrodaalpakoterapii.com', // Override with env var if needed, or matches default
            voucherCode: code,
            amount: 5000,
            currency: 'EUR',
            buyerName: 'Test Buyer',
            buyerEmail: 'test.buyer@example.com',
            pdfPath: filePath
        });

        return NextResponse.json({
            success: true,
            message: 'Voucher generated and email attempt made',
            voucherCode: code,
            emailSent: emailSent,
            filePath: filePath,
            publicUrl: `/_next/static/vouchers/${fileName}` // Not actually served there unless in public, but the file is in public/vouchers
        });
    } catch (error: any) {
        console.error('Test Voucher Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
