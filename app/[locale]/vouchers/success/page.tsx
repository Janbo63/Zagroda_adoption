'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VoucherSuccessPage() {
    const t = useTranslations('vouchers');
    const searchParams = useSearchParams();
    const voucherId = searchParams.get('voucher_id');
    const [voucherCode, setVoucherCode] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const amount = searchParams.get('amount');
    const currency = searchParams.get('currency');

    useEffect(() => {
        // In a real implementation, you'd fetch voucher details from your database
        // For now, we'll show a generic success message
        // The actual voucher code will be sent via email

        if (voucherId && amount && currency) {
            import('@/lib/fpixel').then((fpixel) => {
                fpixel.event('Purchase', {
                    currency: currency,
                    value: amount,
                    content_name: 'Alpaca Voucher',
                    content_ids: [voucherId],
                    content_type: 'product'
                });
            });
        }
    }, [voucherId, amount, currency]);

    const copyCode = () => {
        if (voucherCode) {
            navigator.clipboard.writeText(voucherCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center"
            >
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-green-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-12 h-12 text-green-600" />
                    </div>

                    <h1 className="text-3xl font-extrabold text-stone-900 mb-4">
                        Payment Successful!
                    </h1>

                    <p className="text-stone-600 mb-6">
                        Your gift voucher has been created and an email has been sent to the recipient with the voucher code and redemption instructions.
                    </p>

                    {voucherCode && (
                        <div className="bg-stone-50 p-4 rounded-xl mb-6">
                            <p className="text-sm font-medium text-stone-500 mb-2">Voucher Code</p>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 text-lg font-bold text-orange-600 tracking-wider">
                                    {voucherCode}
                                </code>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={copyCode}
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2 text-sm text-stone-500">
                        <p>✨ Valid for 12 months</p>
                        <p>📧 Check your email for confirmation</p>
                    </div>

                    <div className="mt-8">
                        <Button
                            size="lg"
                            onClick={() => window.location.href = '/'}
                            className="w-full"
                        >
                            Return to Home
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
