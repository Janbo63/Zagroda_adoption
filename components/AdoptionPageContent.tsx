'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Heart, Sparkles, ChevronDown, Info } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

const BENEFIT_IMAGES = {
    certificate: '/images/adoption/certificate.png',
    portrait: '/images/adoption/photo.png',
    fur_lock: '/images/adoption/plush.png', // Temporary, will guide user to add better image if needed
    updates: '/images/adoption/email.png',
    priority: '/images/activities/meet-alpacas.jpg',
    discount: '/images/Farmhouse-rooms.jpg',
    greetings: '/images/adoption/greetings.png',
    plush: '/images/adoption/plush.png'
}

export function AdoptionPageContent() {
    const t = useTranslations('adoption')
    const router = useRouter()
    const params = useParams()
    const locale = params?.locale as string
    const [selectedTier, setSelectedTier] = useState<'bronze' | 'silver' | 'gold' | null>(null)
    const [selectedAlpaca, setSelectedAlpaca] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [showTerms, setShowTerms] = useState(false)

    const tiers = ['bronze', 'silver', 'gold']
    const alpacas = ['Micky', 'Elvis', 'Ricky', 'Teddy', 'Suri', 'Freddy']
    const benefitsKeys = ['certificate', 'portrait', 'fur_lock', 'updates', 'priority', 'discount', 'greetings', 'plush']

    const handleAdoption = async () => {
        if (!selectedAlpaca || !selectedTier) return

        setIsProcessing(true)
        try {
            const response = await fetch(`/${locale}/api/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tier: selectedTier,
                    alpaca: selectedAlpaca,
                    locale: locale,
                    campaign: "winter-vol-liefde"
                }),
            })

            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error(data.error || 'Failed to create checkout session')
            }
        } catch (error) {
            console.error('Checkout error:', error)
            alert('Something went wrong. Please try again or contact us.')
            setIsProcessing(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-[0.2em] shadow-sm">
                    {t('campaignTitle')}
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-primary-900 mb-6 tracking-tight leading-tight">
                    {t('campaignTitle')}
                </h1>
                <p className="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto font-medium leading-relaxed">
                    {t('campaignSubtitle')}
                </p>
            </motion.div>

            {/* Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                {tiers.map((tier, index) => (
                    <motion.div
                        key={tier}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className={`relative h-full border-2 transition-all duration-500 overflow-hidden ${selectedTier === tier
                            ? 'border-orange-500 shadow-2xl scale-105 z-10'
                            : 'border-stone-100 hover:border-orange-200 hover:shadow-xl'
                            }`}>
                            {tier === 'gold' && (
                                <div className="absolute top-0 right-0">
                                    <div className="bg-orange-500 text-white text-[10px] uppercase tracking-widest font-black py-1 px-10 rotate-45 translate-x-[30px] translate-y-[10px] shadow-sm">
                                        {t('bestValue')}
                                    </div>
                                </div>
                            )}

                            <CardHeader className="text-center pb-2 pt-8">
                                <CardTitle className="text-2xl font-black text-primary-800 uppercase tracking-wide">
                                    {t(`${tier}.name`)}
                                </CardTitle>
                                <div className="flex flex-col items-center mt-4">
                                    <div className="text-4xl font-black text-orange-500">{t(`${tier}.price`)}</div>
                                    <div className="text-xs uppercase tracking-widest text-stone-400 font-bold mt-1">{t('annualFeeNote')}</div>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-6">
                                <ul className="space-y-4">
                                    {['0', '1', '2'].map((key) => (
                                        <li key={key} className="flex items-start gap-3">
                                            <div className="bg-green-100 rounded-full p-1 mt-0.5">
                                                <Check className="w-3 h-3 text-green-600 stroke-[4px]" />
                                            </div>
                                            <span className="text-stone-700 text-sm font-semibold leading-relaxed">
                                                {t(`${tier}.features.${key}` as any)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="pt-6 pb-8 px-6">
                                <Button
                                    className={`w-full font-black text-lg h-14 rounded-2xl transition-all duration-300 ${selectedTier === tier
                                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg'
                                        : 'bg-stone-100 text-stone-600 hover:bg-orange-100 hover:text-orange-600'
                                        }`}
                                    onClick={() => setSelectedTier(tier as 'bronze' | 'silver' | 'gold')}
                                >
                                    <Heart className={`w-5 h-5 mr-3 transition-transform ${selectedTier === tier ? 'fill-current scale-110' : ''}`} />
                                    {selectedTier === tier ? t('selected') : t('selectButton')}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Detailed Benefits Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-20"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-primary-800 mb-2 underline decoration-orange-400 decoration-4 underline-offset-8">
                        {t('benefitsTitle')}
                    </h2>
                    <p className="text-stone-500 font-medium">{t('benefitsSubtitle')}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {benefitsKeys.map((key, idx) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                        >
                            <div className="relative h-40 overflow-hidden">
                                <Image
                                    src={BENEFIT_IMAGES[key as keyof typeof BENEFIT_IMAGES]}
                                    alt={t(`benefits.${key}.title`)}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <h4 className="absolute bottom-3 left-4 text-white font-black text-lg">
                                    {t(`benefits.${key}.title`)}
                                </h4>
                            </div>
                            <div className="p-4">
                                <p className="text-stone-600 text-sm leading-relaxed font-medium">
                                    {t(`benefits.${key}.description`)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Alpaca Selection */}
            <AnimatePresence>
                {selectedTier && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mt-16 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-stone-100 text-center relative overflow-hidden"
                    >
                        {/* Decorative background circle */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <div className="text-center mb-10">
                                <h3 className="text-3xl font-black text-primary-900 mb-2">{t('chooseAlpaca')}</h3>
                                <p className="text-stone-500 font-semibold">{t('chooseAlpacaSubtitle')}</p>
                            </div>

                            <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
                                {alpacas.map((name) => (
                                    <motion.div
                                        key={name}
                                        whileHover={{ y: -5 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex flex-col items-center gap-4 p-5 rounded-3xl transition-all duration-300 cursor-pointer border-3
                                            ${selectedAlpaca === name
                                                ? 'bg-orange-50 border-orange-500 shadow-lg'
                                                : 'bg-white border-stone-100 hover:border-orange-200'}`}
                                        onClick={() => setSelectedAlpaca(name)}
                                    >
                                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl relative flex items-center justify-center bg-stone-50">
                                            <Image
                                                src={`/images/Alpacas/${name}.jpg`}
                                                alt={name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 96px, 128px"
                                            />
                                            {selectedAlpaca === name && (
                                                <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center backdrop-blur-[2px]">
                                                    <div className="bg-white rounded-full p-2 shadow-2xl">
                                                        <Check className="w-6 h-6 text-orange-600 stroke-[3px]" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <span className={`text-lg font-black tracking-tight transition-colors ${selectedAlpaca === name ? 'text-orange-600' : 'text-stone-700'}`}>
                                            {name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Dynamic Star Profile Display */}
                            <AnimatePresence mode="wait">
                                {selectedAlpaca && (
                                    <motion.div
                                        key={selectedAlpaca}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-12 max-w-2xl mx-auto overflow-hidden"
                                    >
                                        <div className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100 relative group transition-all duration-500 hover:shadow-inner">
                                            <div className="absolute top-4 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <Heart className="w-16 h-16 text-orange-500" />
                                            </div>
                                            <h4 className="text-orange-600 font-black uppercase tracking-widest text-sm mb-3 text-center">
                                                {t(`starProfiles.${selectedAlpaca}.hook`) || t('starProfiles.General.hook')}
                                            </h4>
                                            <p className="text-stone-700 font-medium text-lg leading-relaxed italic text-center">
                                                "{t(`starProfiles.${selectedAlpaca}.description`) || t('starProfiles.General.description')}"
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-16 flex flex-col items-center">
                                <Button
                                    size="lg"
                                    disabled={!selectedAlpaca || !selectedTier || isProcessing}
                                    className={`px-16 py-10 rounded-3xl shadow-2xl text-2xl font-black transition-all duration-500 transform group
                                        ${selectedAlpaca && selectedTier
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 active:scale-95'
                                            : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
                                    onClick={handleAdoption}
                                >
                                    <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                                    {isProcessing ? t('confirmAdoption') + '...' : t('confirmAdoption')}
                                </Button>
                                {!selectedAlpaca && (
                                    <p className="text-stone-400 mt-6 text-sm font-bold flex items-center gap-2 italic">
                                        <Info className="w-4 h-4" /> {t('selectionRequired')}
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Terms Section */}
            <div className="mt-20 max-w-4xl mx-auto">
                <button
                    onClick={() => setShowTerms(!showTerms)}
                    className="flex items-center justify-center gap-2 w-full text-stone-400 hover:text-stone-600 transition-colors font-bold uppercase tracking-widest text-xs"
                >
                    {t('terms.title')}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showTerms ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {showTerms && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-6"
                        >
                            <div className="bg-stone-50 rounded-2xl p-6 md:p-8 space-y-4">
                                <ul className="space-y-3 list-disc list-inside text-stone-500 text-sm font-medium leading-relaxed">
                                    {(t.raw('terms.items') as string[]).map((item, idx) => (
                                        <li key={idx} className="pl-2">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
