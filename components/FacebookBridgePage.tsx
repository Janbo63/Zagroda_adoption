'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Check, Heart, Gift, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    initScrollDepthTracking,
    trackCTAClick,
    observeSection,
} from '@/lib/analytics';

const ALPACAS = [
    { key: 'elvis', name: 'Elvis', image: '/images/Alpacas/Elvis.jpg' },
    { key: 'micky', name: 'Micky', image: '/images/Alpacas/Micky.jpg' },
    { key: 'suri', name: 'Suri', image: '/images/Alpacas/Suri.jpg' },
    { key: 'teddy', name: 'Teddy', image: '/images/Alpacas/Teddy.jpg' },
    { key: 'ricky', name: 'Ricky', image: '/images/Alpacas/Ricky.jpg' },
    { key: 'freddy', name: 'Freddy', image: '/images/Alpacas/Freddy.jpg' },
];

const STORY_CARDS = [
    { key: 'alpacas', image: '/images/Alpacas/Elvis.jpg' },
    { key: 'nature', image: '/images/activities/alpaca-walks.jpg' },
    { key: 'rooms', image: '/images/Rooms/Garden-1.jpg' },
] as const;

function useSection(name: string) {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => observeSection(ref.current, name), [name]);
    return ref;
}

const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export function FacebookBridgePage({ locale }: { locale: string }) {
    const t = useTranslations('welkom');

    useEffect(() => initScrollDepthTracking('welkom'), []);

    const cta = useCallback(
        (name: string, section: string) => () => trackCTAClick(name, section),
        [],
    );

    const heroRef = useSection('hero');
    const storyRef = useSection('story');
    const alpacasRef = useSection('alpacas');
    const reviewsRef = useSection('reviews');
    const ctaRef = useSection('soft_cta');
    const packagesRef = useSection('packages');

    return (
        <div className="min-h-screen bg-white">
            {/* ── HERO ── */}
            <section
                ref={heroRef}
                className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0">
                    <Image
                        src="/images/Alpacas/Elvis.jpg"
                        alt={t('hero.imageAlt')}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
                    <motion.div initial="hidden" animate="visible" variants={stagger}>
                        <motion.p
                            variants={fade}
                            className="inline-block bg-white/20 backdrop-blur-sm text-sm font-medium px-5 py-2 rounded-full mb-6 tracking-wide"
                        >
                            {t('hero.badge')}
                        </motion.p>

                        <motion.h1
                            variants={fade}
                            className="text-4xl md:text-6xl font-bold leading-tight mb-4"
                            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
                        >
                            {t('hero.title')}
                        </motion.h1>

                        <motion.p
                            variants={fade}
                            className="text-lg md:text-xl text-white/90 max-w-xl mx-auto mb-3 leading-relaxed"
                        >
                            {t('hero.subtitle')}
                        </motion.p>

                        <motion.div variants={fade} className="flex items-center justify-center gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-white/70 text-sm ml-2">{t('hero.socialProof')}</span>
                        </motion.div>

                        <motion.div variants={fade} className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-stone-900 hover:bg-stone-100 text-lg px-8 py-5 rounded-full font-bold shadow-xl"
                                asChild
                                onClick={cta('explore_farm', 'hero')}
                            >
                                <a href="#story">{t('hero.cta')}</a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
                    <ArrowDown className="w-6 h-6 text-white/60" />
                </div>
            </section>

            {/* ── STORY STRIP ── */}
            <section ref={storyRef} id="story" className="py-16 md:py-20 bg-stone-50">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center mb-12"
                    >
                        <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            {t('story.title')}
                        </motion.h2>
                        <motion.p variants={fade} className="text-gray-500 text-lg max-w-xl mx-auto">
                            {t('story.subtitle')}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {STORY_CARDS.map(({ key, image }) => (
                            <motion.div key={key} variants={fade} className="group">
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 shadow-lg">
                                    <Image
                                        src={image}
                                        alt={t(`story.${key}.title`)}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                        <div className="text-2xl mb-1">{t(`story.${key}.icon`)}</div>
                                        <h3 className="text-lg font-bold">{t(`story.${key}.title`)}</h3>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed px-1">{t(`story.${key}.desc`)}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── MEET THE ALPACAS ── */}
            <section ref={alpacasRef} className="py-16 md:py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center mb-10"
                    >
                        <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            {t('alpacas.title')}
                        </motion.h2>
                        <motion.p variants={fade} className="text-gray-500 text-lg max-w-xl mx-auto">
                            {t('alpacas.subtitle')}
                        </motion.p>
                    </motion.div>

                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:gap-6">
                        {ALPACAS.map((a, i) => (
                            <motion.div
                                key={a.key}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="min-w-[260px] snap-center md:min-w-0"
                            >
                                <Card className="overflow-hidden border border-stone-100 hover:shadow-xl transition-shadow">
                                    <div className="relative aspect-square">
                                        <Image src={a.image} alt={a.name} fill className="object-cover" sizes="260px" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg text-gray-900">{a.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{t(`alpacas.${a.key}`)}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── REVIEWS ── */}
            <section ref={reviewsRef} className="py-16 md:py-20 bg-stone-50">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
                            {t('reviews.title')}
                        </motion.h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {(['r1', 'r2', 'r3'] as const).map((key) => (
                                <motion.div
                                    key={key}
                                    variants={fade}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                                >
                                    <div className="flex gap-0.5 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 italic mb-3 leading-relaxed">
                                        &ldquo;{t(`reviews.${key}.text`)}&rdquo;
                                    </p>
                                    <p className="text-sm text-gray-500 font-medium">— {t(`reviews.${key}.author`)}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── SOFT CTA ── */}
            <section ref={ctaRef} className="py-16 md:py-20 bg-emerald-900 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fade} className="text-5xl mb-5">🦙</motion.div>
                        <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold mb-4">
                            {t('cta.title')}
                        </motion.h2>
                        <motion.p variants={fade} className="text-emerald-200 text-lg mb-8 leading-relaxed">
                            {t('cta.subtitle')}
                        </motion.p>
                        <motion.div variants={fade} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-emerald-900 hover:bg-emerald-100 px-8 py-4 text-lg font-bold rounded-full shadow-xl"
                                asChild
                                onClick={cta('explore_stay', 'soft_cta')}
                            >
                                <Link href={`/${locale}/stay`}>
                                    <Heart className="w-5 h-5 mr-2" />
                                    {t('cta.stayBtn')}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full"
                                asChild
                                onClick={cta('gift_voucher', 'soft_cta')}
                            >
                                <Link href={`/${locale}/vouchers`}>
                                    <Gift className="w-5 h-5 mr-2" />
                                    {t('cta.giftBtn')}
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── PACKAGES ── */}
            <section ref={packagesRef} id="packages" className="py-16 md:py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            {t('packages.title')}
                        </h2>
                        <p className="text-gray-500 text-lg">{t('packages.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 items-start">
                        {/* Lite */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm flex flex-col h-full"
                        >
                            <h3 className="text-xl font-bold mb-5">{t('packages.lite.name')}</h3>
                            <ul className="space-y-3 mb-6 flex-grow">
                                {[1, 2, 3].map((i) => (
                                    <li key={i} className="flex gap-2 text-stone-600 text-sm">
                                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{t(`packages.lite.p${i}`)}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full" variant="outline" asChild onClick={cta('voucher_lite', 'packages')}>
                                <Link href={`/${locale}/vouchers`}>{t('packages.cta')}</Link>
                            </Button>
                        </motion.div>

                        {/* Popular */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 p-7 rounded-2xl shadow-xl text-white flex flex-col h-full md:scale-105 z-10 border-2 border-white/20"
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-emerald-700 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow">
                                {t('packages.popular.badge')}
                            </div>
                            <h3 className="text-xl font-bold mb-5">{t('packages.popular.name')}</h3>
                            <ul className="space-y-3 mb-6 flex-grow">
                                {[1, 2, 3, 4].map((i) => (
                                    <li key={i} className="flex gap-2 text-white/90 text-sm">
                                        <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                        <span>{t(`packages.popular.p${i}`)}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full bg-white text-emerald-700 hover:bg-emerald-50" asChild onClick={cta('voucher_popular', 'packages')}>
                                <Link href={`/${locale}/vouchers`}>{t('packages.cta')}</Link>
                            </Button>
                        </motion.div>

                        {/* VIP */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm flex flex-col h-full"
                        >
                            <h3 className="text-xl font-bold mb-5">{t('packages.vip.name')}</h3>
                            <ul className="space-y-3 mb-6 flex-grow">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <li key={i} className="flex gap-2 text-stone-600 text-sm">
                                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{t(`packages.vip.p${i}`)}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full" variant="outline" asChild onClick={cta('voucher_vip', 'packages')}>
                                <Link href={`/${locale}/vouchers`}>{t('packages.cta')}</Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
