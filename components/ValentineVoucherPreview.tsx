'use client';

import { motion } from 'framer-motion';
import { Gift, Star, Heart } from 'lucide-react';
import Image from 'next/image';

interface ValentineVoucherPreviewProps {
    amount: number;
    currency: 'EUR' | 'PLN';
    code?: string;
}

export function ValentineVoucherPreview({ amount, currency, code }: ValentineVoucherPreviewProps) {
    const displayAmount = `${amount / 100} ${currency === 'EUR' ? '€' : 'zł'}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md mx-auto"
        >
            {/* Valentine's Voucher Card */}
            <div className="relative bg-gradient-to-br from-rose-100 via-pink-50 to-red-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-rose-300">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4">
                        <Heart className="w-16 h-16 text-rose-500 animate-pulse" fill="currentColor" />
                    </div>
                    <div className="absolute top-4 right-4">
                        <Heart className="w-12 h-12 text-red-400" fill="currentColor" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                        <Heart className="w-14 h-14 text-pink-400" fill="currentColor" />
                    </div>
                    <div className="absolute bottom-4 right-4">
                        <Heart className="w-10 h-10 text-rose-500" fill="currentColor" />
                    </div>
                </div>

                {/* Content */}
                <div className="relative p-8 text-center">
                    {/* Valentine's Badge */}
                    <div className="mb-4">
                        <div className="inline-block px-4 py-1 bg-rose-500 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                            💕 Valentine's Special
                        </div>
                    </div>

                    {/* Farm Logo */}
                    <div className="mb-3 flex justify-center">
                        <Image
                            src="/images/zagrodanewlogo.png"
                            alt="Zagroda Alpakoterapii"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                    </div>

                    {/* Farm Name */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-rose-900 tracking-wide">
                            Zagroda Alpakoterapii
                        </h3>
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mt-2"></div>
                    </div>

                    {/* Gift Voucher Label */}
                    <div className="mb-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-rose-700 font-bold">
                            Gift Voucher
                        </p>
                    </div>

                    {/* Amount */}
                    <div className="mb-6 py-6 px-8 bg-white/80 rounded-2xl backdrop-blur-sm border-2 border-rose-200">
                        <p className="text-5xl font-extrabold text-rose-600 tracking-tight">
                            {displayAmount}
                        </p>
                    </div>

                    {/* Voucher Code (if provided) */}
                    {code && (
                        <div className="mb-6">
                            <p className="text-xs text-rose-600 mb-1">Code</p>
                            <p className="text-lg font-mono font-bold text-rose-800 tracking-wider">
                                {code}
                            </p>
                        </div>
                    )}

                    {/* Description */}
                    <div className="mb-4">
                        <p className="text-sm text-rose-700 leading-relaxed font-medium">
                            💕 Love without drama<br />
                            🦙 Redeemable for alpaca experiences
                        </p>
                    </div>

                    {/* Decorative Hearts */}
                    <div className="flex justify-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                        <Heart className="w-3 h-3 text-rose-500" fill="currentColor" />
                        <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                    </div>

                    {/* Teddy Image Inset with Hearts */}
                    <div className="mb-4 flex justify-center relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                            <Image
                                src="/images/Alpacas/Teddy.jpg"
                                alt="Teddy the Alpaca"
                                width={80}
                                height={80}
                                className="object-cover"
                            />
                        </div>
                        {/* Floating hearts */}
                        <Heart className="absolute -top-1 -right-1 w-4 h-4 text-rose-400 animate-pulse" fill="currentColor" />
                        <Heart className="absolute -bottom-1 -left-1 w-3 h-3 text-pink-400" fill="currentColor" />
                    </div>

                    {/* Validity */}
                    <div className="text-xs text-rose-500 font-medium">
                        Valid for 12 months · Perfect gift for your Valentine 💕
                    </div>
                </div>

                {/* Decorative Border Pattern */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-400 via-pink-500 to-red-400"></div>
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-400 via-pink-500 to-rose-400"></div>
            </div>

            {/* Shadow/Depth Effect */}
            <div className="absolute -bottom-2 left-4 right-4 h-full bg-rose-300/40 rounded-3xl -z-10 blur-xl"></div>
        </motion.div>
    );
}
