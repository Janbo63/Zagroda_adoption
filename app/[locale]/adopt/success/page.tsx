'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Link } from '@/app/[locale]/navigation'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Heart, Award } from 'lucide-react'
import Image from 'next/image'

export default function AdoptionSuccessPage({ params: { locale } }: { params: { locale: string } }) {
    const t = useTranslations('adoption.success')
    const tTier = useTranslations('adoption')
    const searchParams = useSearchParams()
    const [isSaving, setIsSaving] = useState(false)

    const sessionId = searchParams?.get('session_id')
    const tier = searchParams?.get('tier') || 'bronze'
    const alpaca = searchParams?.get('alpaca') || 'Micky'

    const amount = searchParams?.get('amount');

    useEffect(() => {
        if (sessionId) {
            const recordAdoption = async () => {
                setIsSaving(true)
                try {
                    const response = await fetch(`/${locale}/api/adoption/record`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ sessionId, locale }),
                    })
                    const data = await response.json()
                    if (!data.success) {
                        console.error('Failed to record adoption:', data.error)
                    } else {
                        // Track Purchase Event
                        if (amount) {
                            import('@/lib/fpixel').then((fpixel) => {
                                fpixel.event('Purchase', {
                                    currency: 'PLN',
                                    value: amount / 100, // Stripe amount is in cents
                                    content_name: `Adoption - ${alpaca} (${tier})`,
                                    content_category: 'Adoption',
                                    content_ids: [alpaca],
                                    content_type: 'product'
                                });
                            });
                        }
                    }
                } catch (error) {
                    console.error('Error recording adoption:', error)
                } finally {
                    setIsSaving(false)
                }
            }
            recordAdoption()
        }
    }, [sessionId, locale, amount, alpaca, tier])

    return (
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-stone-50/50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-stone-100"
            >
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-10 text-center text-white relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        </svg>
                    </div>

                    <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 12, delay: 0.2 }}
                        className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/50 shadow-inner"
                    >
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black mb-3 drop-shadow-sm">{t('title')}</h1>
                    <p className="text-emerald-50 text-xl font-medium opacity-90">
                        {isSaving ? "Finalizing your adoption..." : t('message')}
                    </p>
                </div>

                <div className="p-8 md:p-14 text-center">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-12">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative"
                        >
                            <div className="w-40 h-40 rounded-[2rem] overflow-hidden border-8 border-primary-50 shadow-2xl relative rotate-3 hover:rotate-0 transition-transform duration-500">
                                <Image
                                    src={`/images/Alpacas/${alpaca}.jpg`}
                                    alt={alpaca}
                                    fill
                                    className="object-cover"
                                    sizes="160px"
                                />
                            </div>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -bottom-4 -right-4 bg-pink-500 text-white p-3 rounded-2xl shadow-xl border-4 border-white"
                            >
                                <Heart className="w-6 h-6 fill-current" />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-left"
                        >
                            <div className="flex items-center gap-2 text-primary-600 font-black uppercase tracking-[0.2em] text-xs mb-2">
                                <Award className="w-4 h-4" />
                                {tTier(`${tier}.name`)}
                            </div>
                            <h2 className="text-3xl font-bold text-stone-800 leading-tight">
                                {t('details', { alpaca, tier: tTier(`${tier}.name`) })}
                            </h2>
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-stone-500 text-lg leading-relaxed mb-12 max-w-md mx-auto"
                    >
                        {t('description')}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <Link href="/">
                            <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white px-12 py-8 rounded-full text-xl font-black shadow-xl transition-all hover:shadow-primary-200 hover:scale-105 active:scale-95">
                                {t('backHome')}
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
