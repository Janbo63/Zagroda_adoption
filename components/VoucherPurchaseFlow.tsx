'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Gift, Check, Heart } from 'lucide-react';
import { VOUCHER_AMOUNTS, formatVoucherAmount } from '@/lib/voucher-utils';
import { VoucherPreview } from './VoucherPreview';
import { ValentineVoucherPreview } from './ValentineVoucherPreview';

export function VoucherPurchaseFlow({ locale }: { locale: string }) {
    const t = useTranslations('vouchers');

    // Check if it's Valentine's season (Feb 1-14)
    const now = new Date();
    const isValentinesSeason = now.getMonth() === 1 && now.getDate() <= 14;

    // Determine default currency based on locale
    const defaultCurrency = locale === 'pl' || locale === 'cs' ? 'PLN' : 'EUR';

    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [currency, setCurrency] = useState<'EUR' | 'PLN'>(defaultCurrency);
    const [buyerEmail, setBuyerEmail] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [personalMessage, setPersonalMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const amounts = VOUCHER_AMOUNTS[currency];

    const handlePurchase = async () => {
        if (!selectedAmount || !buyerEmail) {
            alert('Please select an amount and enter your email');
            return;
        }

        setIsProcessing(true);

        try {
            const response = await fetch(`/${locale}/api/vouchers/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: selectedAmount,
                    currency,
                    buyerEmail,
                    recipientEmail: recipientEmail || null,
                    recipientName: recipientName || null,
                    personalMessage: personalMessage || null,
                    locale,
                }),
            });

            const data = await response.json();

            if (response.ok && data.url) {
                // Redirect to Stripe Checkout
                window.location.href = data.url;
            } else {
                alert(data.error || 'Something went wrong');
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Purchase error:', error);
            alert('Failed to process purchase');
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <Gift className="w-16 h-16 mx-auto mb-4 text-orange-600" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary-900 mb-4">
                    {t('title')}
                </h1>
                <p className="text-xl text-stone-600 max-w-2xl mx-auto">
                    {t('subtitle')}
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Purchase Form */}
                <div className="space-y-6">
                    {/* Currency Selection */}
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">
                            {t('currency')}
                        </label>
                        <div className="flex gap-2">
                            <Button
                                variant={currency === 'EUR' ? 'default' : 'outline'}
                                onClick={() => {
                                    setCurrency('EUR');
                                    setSelectedAmount(null);
                                }}
                                className="flex-1"
                            >
                                EUR (€)
                            </Button>
                            <Button
                                variant={currency === 'PLN' ? 'default' : 'outline'}
                                onClick={() => {
                                    setCurrency('PLN');
                                    setSelectedAmount(null);
                                }}
                                className="flex-1"
                            >
                                PLN (zł)
                            </Button>
                        </div>
                    </div>

                    {/* Amount Selection */}
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">
                            {t('selectAmount')}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {amounts.map((amount) => (
                                <Button
                                    key={amount}
                                    variant={selectedAmount === amount ? 'default' : 'outline'}
                                    onClick={() => setSelectedAmount(amount)}
                                    className="relative"
                                >
                                    {formatVoucherAmount(amount, currency)}
                                    {selectedAmount === amount && (
                                        <Check className="absolute top-1 right-1 w-4 h-4" />
                                    )}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Buyer Email */}
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">
                            {t('buyerEmail')}
                        </label>
                        <Input
                            type="email"
                            value={buyerEmail}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBuyerEmail(e.target.value)}
                            placeholder="your @email.com"
                            required
                        />
                    </div>

                    {/* Recipient Details */}
                    <div className="pt-4 border-t">
                        <h3 className="text-lg font-bold text-stone-800 mb-4">
                            {t('recipientDetails')}
                        </h3>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">
                                    {t('recipientEmail')}
                                </label>
                                <Input
                                    type="email"
                                    value={recipientEmail}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipientEmail(e.target.value)}
                                    placeholder="recipient@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">
                                    {t('recipientName')}
                                </label>
                                <Input
                                    type="text"
                                    value={recipientName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipientName(e.target.value)}
                                    placeholder="Anna"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">
                                    {t('personalMessage')}
                                </label>
                                <textarea
                                    value={personalMessage}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPersonalMessage(e.target.value)}
                                    placeholder="Happy Birthday! 🎂"
                                    className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Purchase Button */}
                    <Button
                        size="lg"
                        onClick={handlePurchase}
                        disabled={!selectedAmount || !buyerEmail || isProcessing}
                        className="w-full"
                    >
                        {isProcessing ? 'Processing...' : t('buyNow')}
                    </Button>
                </div>

                {/* How It Works & Preview */}
                <div className="space-y-6">
                    {/* Voucher Preview */}
                    {selectedAmount && (
                        <div className="mb-6">
                            {isValentinesSeason ? (
                                <ValentineVoucherPreview
                                    amount={selectedAmount}
                                    currency={currency}
                                />
                            ) : (
                                <VoucherPreview
                                    amount={selectedAmount}
                                    currency={currency}
                                />
                            )}
                        </div>
                    )}

                    <Card className="p-6 bg-orange-50 border-orange-100">
                        <Heart className="w-12 h-12 text-orange-600 mb-4" />
                        <h3 className="text-xl font-bold text-stone-800 mb-4">
                            {t('howItWorks')}
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">
                                    1
                                </span>
                                <span className="text-stone-700">{t('step1')}</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">
                                    2
                                </span>
                                <span className="text-stone-700">{t('step2')}</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">
                                    3
                                </span>
                                <span className="text-stone-700">{t('step3')}</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">
                                    4
                                </span>
                                <span className="text-stone-700">{t('step4')}</span>
                            </li>
                        </ul>

                        <div className="mt-6 pt-6 border-t border-orange-200">
                            <p className="text-sm text-stone-600 font-medium">
                                ✨ {t('validFor')}
                            </p>
                        </div>
                    </Card>

                    <p className="text-sm text-stone-500 mt-4 text-center">
                        {t('description')}
                    </p>
                </div>
            </div>
        </div>
    );
}
