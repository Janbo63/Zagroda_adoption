'use client';

import { motion } from 'framer-motion';
import { Gift, Star, Heart } from 'lucide-react';
import Image from 'next/image';

interface VoucherPreviewProps {
    amount: number;
    currency: 'EUR' | 'PLN';
    code?: string;
}

export function VoucherPreview({ amount, currency, code }: VoucherPreviewProps) {
    const displayAmount = `${amount / 100} ${currency === 'EUR' ? '€' : 'zł'}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md mx-auto"
        >
            {/* Voucher Card */}
            <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-200">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 left-4">
                        <Star className="w-16 h-16 text-orange-600" />
                    </div>
                    <div className="absolute top-4 right-4">
                        <Heart className="w-16 h-16 text-orange-600" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                        <Gift className="w-16 h-16 text-orange-600" />
                    </div>
                    <div className="absolute bottom-4 right-4">
                        <Star className="w-16 h-16 text-orange-600" />
                    </div>
                </div>

                {/* Content */}
                <div className="relative p-8 text-center">
                    {/* Farm Logo */}
                    <div className="mb-4 flex justify-center">
                        <Image
                            src="/images/zagrodanewlogo.png"
                            alt="Zagroda Alpakoterapii"
                            width={60}
                            height={60}
                            className="rounded-full"
                        />
                    </div>

                    {/* Farm Name */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-stone-800 tracking-wide">
                            Zagroda Alpakoterapii
                        </h3>
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mt-2"></div>
                    </div>

                    {/* Gift Voucher Label */}
                    <div className="mb-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-stone-500 font-bold">
                            Gift Voucher
                        </p>
                    </div>

                    {/* Amount */}
                    <div className="mb-6 py-6 px-8 bg-white/60 rounded-2xl backdrop-blur-sm border border-orange-200/50">
                        <p className="text-5xl font-extrabold text-orange-600 tracking-tight">
                            {displayAmount}
                        </p>
                    </div>

                    {/* Voucher Code (if provided) */}
                    {code && (
                        <div className="mb-6">
                            <p className="text-xs text-stone-500 mb-1">Code</p>
                            <p className="text-lg font-mono font-bold text-stone-700 tracking-wider">
                                {code}
                            </p>
                        </div>
                    )}

                    {/* Description */}
                    <div className="mb-4">
                        <p className="text-sm text-stone-600 leading-relaxed italic">
                            Redeemable for farm activities, stays,<br />
                            and alpaca adoption experiences
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="flex justify-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-orange-300"></div>
                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    </div>

                    {/* Teddy Image Inset */}
                    <div className="mb-4 flex justify-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <Image
                                src="/images/Alpacas/Teddy.jpg"
                                alt="Teddy the Alpaca"
                                width={80}
                                height={80}
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Validity */}
                    <div className="text-xs text-stone-400">
                        Valid for 12 months from purchase
                    </div>
                </div>

                {/* Decorative Border Pattern */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500"></div>
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300"></div>
            </div>

            {/* Shadow/Depth Effect */}
            <div className="absolute -bottom-2 left-4 right-4 h-full bg-orange-200/30 rounded-3xl -z-10 blur-xl"></div>
        </motion.div>
    );
}
