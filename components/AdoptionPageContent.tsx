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
    meet: '/images/activities/winter-barn.jpg',
    fur_lock: '/images/adoption/photo.png',
    discount: '/images/Farmhouse-rooms.jpg',
    forest_walk: '/images/activities/meet-alpacas.jpg',
    weekend: '/images/Farmhouse-rooms.jpg',
    care: '/images/adoption/greetings.png',
    mini_me: '/images/adoption/plush.png'
}

const TIER_BENEFITS: Record<'bronze' | 'silver' | 'gold', string[]> = {
    bronze: ['certificate', 'fur_lock', 'meet'],
    silver: ['certificate', 'fur_lock', 'meet', 'discount', 'forest_walk'],
    gold: ['certificate', 'fur_lock', 'meet', 'discount', 'forest_walk', 'weekend', 'care', 'mini_me'],
}

const BENEFIT_TIER_BADGE: Record<string, { label: string; className: string }> = {
    certificate: { label: 'Bronze • Silver • Gold', className: 'bg-amber-800/90 text-amber-50 border-amber-400/60' },
    fur_lock: { label: 'Bronze • Silver • Gold', className: 'bg-amber-800/90 text-amber-50 border-amber-400/60' },
    meet: { label: 'Bronze • Silver • Gold', className: 'bg-amber-800/90 text-amber-50 border-amber-400/60' },
    discount: { label: 'Silver & Gold', className: 'bg-slate-700/90 text-slate-100 border-slate-300/60' },
    forest_walk: { label: 'Silver & Gold', className: 'bg-slate-700/90 text-slate-100 border-slate-300/60' },
    weekend: { label: '⭐ Gold Only', className: 'bg-orange-600/95 text-white border-amber-300' },
    care: { label: '⭐ Gold Only', className: 'bg-orange-600/95 text-white border-amber-300' },
    mini_me: { label: '⭐ Gold Only', className: 'bg-orange-600/95 text-white border-amber-300' },
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
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [marketingConsent, setMarketingConsent] = useState(false)
    const [showError, setShowError] = useState(false)

    const tiers = ['bronze', 'silver', 'gold']
    const alpacas = ['Micky', 'Elvis', 'Ricky', 'Teddy', 'Suri', 'Freddy']
    const allBenefitsKeys = ['certificate', 'fur_lock', 'meet', 'discount', 'forest_walk', 'weekend', 'care', 'mini_me']
    const visibleBenefitsKeys = selectedTier ? TIER_BENEFITS[selectedTier] : allBenefitsKeys

    const handleAdoption = async () => {
        if (!selectedAlpaca || !selectedTier) return

        if (!termsAccepted) {
            setShowError(true)
            return
        }

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
                    campaign: "seasonal-adoption",
                    marketingConsent: marketingConsent
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
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-orange-100 text-orange-600 text-xs font-serif font-bold uppercase tracking-[0.2em] shadow-sm">
                    {t('campaignTitle')}
                </div>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 tracking-tight leading-tight">
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
                                    <div className="bg-orange-500 text-white text-[10px] uppercase tracking-widest font-serif font-bold py-1 px-10 rotate-45 translate-x-[30px] translate-y-[10px] shadow-sm">
                                        {t('bestValue')}
                                    </div>
                                </div>
                            )}

                            <CardHeader className="text-center pb-2 pt-8">
                                <CardTitle className="text-2xl font-serif font-bold text-stone-900 uppercase tracking-wide">
                                    {t(`${tier}.name`)}
                                </CardTitle>
                                <div className="flex flex-col items-center mt-4">
                                    <div className="text-4xl font-serif font-bold text-orange-500">{t(`${tier}.price`)}</div>
                                    <div className="text-xs uppercase tracking-widest text-stone-400 font-serif font-bold mt-1">{t('annualFeeNote')}</div>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-6">
                                <ul className="space-y-4">
                                    {(t.raw(`${tier}.features`) as string[]).map((feature, featureIdx) => (
                                        <li key={featureIdx} className="flex items-start gap-3">
                                            <div className="bg-green-100 rounded-full p-1 mt-0.5">
                                                <Check className="w-3 h-3 text-green-600 stroke-[4px]" />
                                            </div>
                                            <span className="text-stone-700 text-sm font-semibold leading-relaxed">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {tier === 'gold' && (
                                    <div className="mt-5 rounded-xl overflow-hidden border-2 border-amber-300 bg-stone-900 shadow-md">
                                        <div className="relative w-full aspect-[4/3]">
                                            <Image
                                                src="/images/adoption/alpaca-mascots.jpg"
                                                alt={t('benefits.mini_me.title')}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 350px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="bg-amber-50 px-3 py-2 text-center border-t border-amber-200">
                                            <p className="text-xs font-serif font-bold text-amber-900">
                                                ✨ {t('benefits.mini_me.title')} — {t('benefits.mini_me.description')}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter className="pt-6 pb-8 px-6">
                                <Button
                                    className={`w-full font-serif font-bold text-lg h-14 rounded-2xl transition-all duration-300 ${selectedTier === tier
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
                    <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2 underline decoration-orange-400 decoration-4 underline-offset-8">
                        {selectedTier
                            ? t('benefitsTitleSelected', { tier: `${t(`${selectedTier}.name`)} (${t(`${selectedTier}.price`)})` })
                            : t('benefitsTitle')}
                    </h2>
                    <p className="text-stone-500 font-medium">{t('benefitsSubtitle')}</p>
                    {selectedTier && (
                        <button
                            type="button"
                            onClick={() => setSelectedTier(null)}
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-serif font-bold uppercase tracking-wider text-orange-600 hover:text-orange-700 underline underline-offset-4"
                        >
                            {t('showAllBenefits')}
                        </button>
                    )}
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-2 ${visibleBenefitsKeys.length === 3 ? 'lg:grid-cols-3 max-w-5xl' : 'lg:grid-cols-4 max-w-7xl'} gap-6 mx-auto`}>
                    {visibleBenefitsKeys.map((key, idx) => {
                        const badge = BENEFIT_TIER_BADGE[key];
                        return (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                        >
                            <div className="relative h-44 overflow-hidden bg-stone-900">
                                <Image
                                    src={BENEFIT_IMAGES[key as keyof typeof BENEFIT_IMAGES]}
                                    alt={t(`benefits.${key}.title`)}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                                {badge && (
                                    <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-sm ${badge.className}`}>
                                        {badge.label}
                                    </span>
                                )}
                                <h4 className="absolute bottom-3 left-4 text-white font-serif font-bold text-lg">
                                    {t(`benefits.${key}.title`)}
                                </h4>
                            </div>
                            <div className="p-4">
                                <p className="text-stone-600 text-sm leading-relaxed font-medium">
                                    {t(`benefits.${key}.description`)}
                                </p>
                            </div>
                        </motion.div>
                        );
                    })}
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
                                <h3 className="text-3xl font-serif font-bold text-stone-900 mb-2">{t('chooseAlpaca')}</h3>
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
                                        <span className={`text-lg font-serif font-bold tracking-tight transition-colors ${selectedAlpaca === name ? 'text-orange-600' : 'text-stone-700'}`}>
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
                                            <h4 className="text-orange-600 font-serif font-bold uppercase tracking-widest text-sm mb-3 text-center">
                                                {t(`starProfiles.${selectedAlpaca}.hook`) || t('starProfiles.General.hook')}
                                            </h4>
                                            <p className="text-stone-700 font-medium text-lg leading-relaxed italic text-center">
                                                "{t(`starProfiles.${selectedAlpaca}.description`) || t('starProfiles.General.description')}"
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-16 flex flex-col items-center max-w-lg mx-auto w-full">
                                {/* Legal Checkboxes */}
                                <div className="mb-8 space-y-4 text-left w-full">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center mt-1">
                                            <input
                                                type="checkbox"
                                                checked={termsAccepted}
                                                onChange={(e) => {
                                                    setTermsAccepted(e.target.checked)
                                                    if (e.target.checked) setShowError(false)
                                                }}
                                                className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-stone-200 transition-all checked:bg-orange-500 checked:border-orange-500"
                                            />
                                            <Check className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity left-0.5" strokeWidth={4} />
                                        </div>
                                        <span className="text-sm font-semibold text-stone-600 group-hover:text-stone-800 transition-colors">
                                            {t.rich('legal.accept_terms', {
                                                terms: (chunks) => <a href={`/${locale}/terms`} target="_blank" className="text-orange-600 underline hover:text-orange-700">{chunks}</a>,
                                                privacy: (chunks) => <a href={`/${locale}/privacy`} target="_blank" className="text-orange-600 underline hover:text-orange-700">{chunks}</a>
                                            })}
                                        </span>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center mt-1">
                                            <input
                                                type="checkbox"
                                                checked={marketingConsent}
                                                onChange={(e) => setMarketingConsent(e.target.checked)}
                                                className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-stone-200 transition-all checked:bg-orange-500 checked:border-orange-500"
                                            />
                                            <Check className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity left-0.5" strokeWidth={4} />
                                        </div>
                                        <span className="text-sm font-semibold text-stone-500 group-hover:text-stone-700 transition-colors">
                                            {t('legal.marketing_opt_in')}
                                        </span>
                                    </label>

                                    {showError && (
                                        <motion.p
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-red-500 text-xs font-serif font-bold uppercase tracking-wider mt-2"
                                        >
                                            {t('legal.required_error')}
                                        </motion.p>
                                    )}
                                </div>

                                <Button
                                    size="lg"
                                    disabled={!selectedAlpaca || !selectedTier || isProcessing}
                                    className={`px-16 py-10 rounded-3xl shadow-2xl text-2xl font-serif font-bold transition-all duration-500 transform group
                                        ${selectedAlpaca && selectedTier
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 active:scale-95'
                                            : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
                                    onClick={handleAdoption}
                                >
                                    <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                                    {isProcessing ? t('confirmAdoption') + '...' : t('confirmAdoption')}
                                </Button>
                                {!selectedAlpaca && (
                                    <p className="text-stone-400 mt-6 text-sm font-serif font-bold flex items-center gap-2 italic">
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
                    className="flex items-center justify-center gap-2 w-full text-stone-400 hover:text-stone-600 transition-colors font-serif font-bold uppercase tracking-widest text-xs"
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
