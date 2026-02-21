'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Star, Gift, Check, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CampaignLandingPage({ locale }: { locale: string }) {
    const t = useTranslations('campaign');

    const alpacaStars = [
        {
            name: 'Elvis',
            image: '/images/Alpacas/Elvis.jpg',
            personality: t('stars.elvis.personality'),
            idealFor: t('stars.elvis.idealFor'),
        },
        {
            name: 'Micky',
            image: '/images/Alpacas/Micky.jpg',
            personality: t('stars.micky.personality'),
            idealFor: t('stars.micky.idealFor'),
        },
        {
            name: 'Suri',
            image: '/images/Alpacas/Suri.jpg',
            personality: t('stars.suri.personality'),
            idealFor: t('stars.suri.idealFor'),
        },
        {
            name: 'Teddy',
            image: '/images/Alpacas/Teddy.jpg',
            personality: t('stars.teddy.personality'),
            idealFor: t('stars.teddy.idealFor'),
        },
        {
            name: 'Ricky',
            image: '/images/Alpacas/Ricky.jpg',
            personality: t('stars.ricky.personality'),
            idealFor: t('stars.ricky.idealFor'),
        },
        {
            name: 'Freddy',
            image: '/images/Alpacas/Freddy.jpg',
            personality: t('stars.freddy.personality'),
            idealFor: t('stars.freddy.idealFor'),
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">

                    <div className="absolute bottom-10 right-10">
                        <Star className="w-40 h-40 text-orange-400" />
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block px-6 py-2 mb-6 bg-rose-100 rounded-full">
                            <p className="text-rose-600 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {t('badge')}
                            </p>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-stone-900 mb-6 leading-tight">
                            {t('hero.title')}
                        </h1>

                        <p className="text-xl md:text-2xl text-stone-600 mb-4 max-w-3xl mx-auto font-medium">
                            {t('hero.subtitle')}
                        </p>

                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                                ))}
                            </div>
                            <p className="text-sm text-stone-500 font-medium">
                                {t('hero.socialProof')}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="text-lg px-8 py-6" asChild>
                                <Link href={`/${locale}/vouchers`}>
                                    {t('hero.primaryCta')}
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                                <Link href={`/${locale}/adopt`}>
                                    {t('hero.secondaryCta')}
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Star Lineup Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">
                            {t('stars.title')}
                        </h2>
                        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
                            {t('stars.subtitle')}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {alpacaStars.map((star, index) => (
                            <motion.div
                                key={star.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Card className="p-6 hover:shadow-2xl transition-shadow duration-300 border-2 border-stone-100 hover:border-orange-200">
                                    <div className="relative w-full aspect-square mb-4 rounded-2xl overflow-hidden">
                                        <Image
                                            src={star.image}
                                            alt={star.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <h3 className="text-2xl font-bold text-stone-900 mb-2">
                                        {star.name}
                                    </h3>

                                    <p className="text-stone-700 mb-4 leading-relaxed">
                                        {star.personality}
                                    </p>

                                    <div className="bg-orange-50 rounded-lg p-3 mb-4">
                                        <p className="text-sm text-orange-700 font-medium">
                                            <strong>{t('stars.idealForLabel')}:</strong> {star.idealFor}
                                        </p>
                                    </div>

                                    <Button
                                        className="w-full"
                                        variant="outline"
                                        onClick={() => {
                                            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        {t('stars.chooseCta')} {star.name}
                                    </Button>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Packages Section */}
            <section id="pricing" className="py-20 bg-rose-50/30">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">
                            {t('packages.title')}
                        </h2>
                        <p className="text-xl text-stone-600">
                            {t('packages.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-start">
                        {/* Tier 1: Lite */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl border-2 border-stone-100 shadow-sm flex flex-col h-full"
                        >
                            <h3 className="text-2xl font-bold mb-6">{t('packages.lite.name')}</h3>
                            <ul className="space-y-4 mb-8 flex-grow">
                                {[1, 2, 3].map((i) => (
                                    <li key={i} className="flex gap-3 text-stone-600">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>{t(`packages.lite.point${i}`)}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full" variant="outline" asChild>
                                <Link href={`/${locale}/vouchers`}>{t('packages.cta')}</Link>
                            </Button>
                        </motion.div>

                        {/* Tier 2: Popular (Center) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-orange-500 to-rose-500 p-8 rounded-3xl shadow-xl flex flex-col text-white relative transform md:scale-110 z-10 h-full border-4 border-white/20"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-orange-600 text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                {t('packages.popular.badge')}
                            </div>
                            <h3 className="text-2xl font-bold mb-6">{t('packages.popular.name')}</h3>
                            <ul className="space-y-4 mb-8 flex-grow">
                                {[1, 2, 3, 4].map((i) => (
                                    <li key={i} className="flex gap-3 text-white/90">
                                        <Check className="w-5 h-5 text-white flex-shrink-0" />
                                        <span>{t(`packages.popular.point${i}`)}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full bg-white text-orange-600 hover:bg-stone-50 border-none" asChild>
                                <Link href={`/${locale}/vouchers`}>{t('packages.cta')}</Link>
                            </Button>
                        </motion.div>

                        {/* Tier 3: VIP */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl border-2 border-stone-100 shadow-sm flex flex-col h-full"
                        >
                            <h3 className="text-2xl font-bold mb-6">{t('packages.vip.name')}</h3>
                            <ul className="space-y-4 mb-8 flex-grow">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <li key={i} className="flex gap-3 text-stone-600">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>{t(`packages.vip.point${i}`)}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full" variant="outline" asChild>
                                <Link href={`/${locale}/vouchers`}>{t('packages.cta')}</Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gradient-to-br from-stone-50 to-orange-50">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center text-stone-900 mb-12">
                        {t('comparison.title')}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* TV Drama Column */}
                        <div className="bg-white/50 p-6 rounded-2xl border-2 border-stone-200">
                            <h3 className="text-xl font-bold text-stone-700 mb-4 text-center">
                                {t('comparison.tv.title')}
                            </h3>
                            <ul className="space-y-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <li key={i} className="flex items-start gap-3 text-stone-600">
                                        <span className="text-red-500 mt-1">❌</span>
                                        <span>{t(`comparison.tv.point${i}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Our Farm Column */}
                        <div className="bg-gradient-to-br from-orange-100 to-rose-100 p-6 rounded-2xl border-2 border-orange-300 shadow-lg">
                            <h3 className="text-xl font-bold text-orange-700 mb-4 text-center">
                                {t('comparison.us.title')}
                            </h3>
                            <ul className="space-y-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <li key={i} className="flex items-start gap-3 text-stone-700">
                                        <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                        <span className="font-medium">{t(`comparison.us.point${i}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Button size="lg" asChild>
                            <Link href={`/${locale}/vouchers`}>
                                {t('comparison.cta')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 bg-gradient-to-r from-orange-600 to-rose-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        {t('finalCta.title')}
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        {t('finalCta.subtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                            <Link href={`/${locale}/vouchers`}>
                                <Gift className="w-5 h-5 mr-2" />
                                {t('finalCta.primaryBtn')}
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white text-orange-600 hover:bg-orange-50" asChild>
                            <Link href={`/${locale}/contact`}>
                                {t('finalCta.secondaryBtn')}
                            </Link>
                        </Button>
                    </div>

                    <p className="mt-6 text-sm opacity-75">
                        {t('finalCta.urgency')}
                    </p>
                </div>
            </section>
        </div>
    );
}
