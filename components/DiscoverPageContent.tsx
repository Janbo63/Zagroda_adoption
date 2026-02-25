'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Photo grid images ──────────────────────────────────────────────────────
const GALLERY_PHOTOS = [
    '/images/Alpacas/Elvis.jpg',
    '/images/activities/alpaca-walks.jpg',
    '/images/Rooms/Garden-1.jpg',
    '/images/Alpacas/Suri.jpg',
    '/images/activities/meet-alpacas.jpg',
    '/images/Alpacas/Micky.jpg',
];

// ─── Main component ──────────────────────────────────────────────────────────
export function DiscoverPageContent({ locale }: { locale: string }) {
    const t = useTranslations('discover');

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.15 } },
    };

    return (
        <div className="min-h-screen bg-white">

            {/* ── HERO ─────────────────────────────────────────────────── */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/activities/alpaca-walks.jpg"
                        alt="Alpacas in the Polish mountains"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-24">
                    <motion.div initial="hidden" animate="visible" variants={stagger}>
                        <motion.span
                            variants={fadeUp}
                            className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-5 py-2 rounded-full mb-8 tracking-wide"
                        >
                            {t('hero.badge')}
                        </motion.span>

                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.4)' }}
                        >
                            {t('hero.headline')}
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-4 leading-relaxed"
                        >
                            {t('hero.subheadline')}
                        </motion.p>

                        <motion.p variants={fadeUp} className="text-white/60 text-sm">
                            ⭐ {t('hero.socialProof')}
                        </motion.p>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-3 bg-white/60 rounded-full" />
                    </div>
                </div>
            </section>

            {/* ── STORY STRIP ─────────────────────────────────────────── */}
            <section className="py-20 bg-stone-50">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            {t('story.title')}
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-xl mx-auto">
                            {t('story.subtitle')}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid md:grid-cols-3 gap-10"
                    >
                        {(['alpacas', 'nature', 'farm'] as const).map((key) => (
                            <motion.div
                                key={key}
                                variants={fadeUp}
                                className="group"
                            >
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-lg">
                                    <Image
                                        src={t(`story.${key}.image`)}
                                        alt={t(`story.${key}.title`)}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <div className="text-3xl mb-2">{t(`story.${key}.icon`)}</div>
                                        <h3 className="text-xl font-bold mb-1">{t(`story.${key}.title`)}</h3>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed px-1">
                                    {t(`story.${key}.desc`)}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── PHOTO GALLERY ──────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center mb-12"
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            {t('gallery.title')}
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-2 md:grid-cols-3 gap-3"
                    >
                        {GALLERY_PHOTOS.map((src, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className={`relative overflow-hidden rounded-xl ${i === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
                                    }`}
                            >
                                <Image
                                    src={src}
                                    alt={`Farm life ${i + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── WHY FAMILIES LOVE IT ───────────────────────────────── */}
            <section className="py-20 bg-stone-50">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                            {t('reviews.title')}
                        </motion.h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {([['q1', 'a1'], ['q2', 'a2'], ['q3', 'a3']] as const).map(([q, a]) => (
                                <motion.div
                                    key={q}
                                    variants={fadeUp}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                                >
                                    <div className="flex gap-0.5 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 italic mb-4 leading-relaxed">&ldquo;{t(`reviews.${q}`)}&rdquo;</p>
                                    <p className="text-sm text-gray-500 font-medium">— {t(`reviews.${a}`)}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── GETTING HERE ────────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
                            {t('distance.title')}
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-center text-gray-500 mb-12">
                            {t('distance.subtitle')}
                        </motion.p>

                        <div className="grid md:grid-cols-3 gap-6">
                            {(['brussels', 'amsterdam', 'warsaw'] as const).map((city) => (
                                <motion.div
                                    key={city}
                                    variants={fadeUp}
                                    className="bg-stone-50 rounded-2xl p-6 border border-gray-200 text-center hover:shadow-md transition-shadow"
                                >
                                    <div className="text-4xl mb-3">{t(`distance.${city}.flag`)}</div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-4">{t(`distance.${city}.label`)}</h3>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center justify-center gap-2">
                                            <span>🚗</span>
                                            <span>{t(`distance.${city}.drive`)}</span>
                                        </div>
                                        <div className="flex items-start justify-center gap-2 text-center">
                                            <span className="mt-0.5">✈️</span>
                                            <span>{t(`distance.${city}.fly`)}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            variants={fadeUp}
                            className="mt-8 text-center flex items-center justify-center gap-2 text-gray-500"
                        >
                            <MapPin className="w-4 h-4 text-emerald-500" />
                            <span>{t('distance.address')}</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── SOFT CTA ────────────────────────────────────────────── */}
            <section className="py-24 bg-emerald-900 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="text-5xl mb-6">🦙</motion.div>
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
                            {t('cta.title')}
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-emerald-200 text-lg mb-10 leading-relaxed">
                            {t('cta.subtitle')}
                        </motion.p>
                        <motion.div variants={fadeUp}>
                            <Link href={`/${locale}/stay`}>
                                <Button
                                    size="lg"
                                    className="bg-white text-emerald-900 hover:bg-emerald-100 px-10 py-4 text-lg font-bold rounded-full shadow-xl hover:scale-105 transition-all"
                                >
                                    {t('cta.btn')}
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
