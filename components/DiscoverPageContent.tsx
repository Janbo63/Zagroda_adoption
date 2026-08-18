'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, ExternalLink, Camera, Sparkles, Clock, Calendar, Compass, HelpCircle, ChevronRight } from 'lucide-react';
import { RegionMap } from '@/components/RegionMap';
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

const INITIATIVE_URL = 'https://stacjakultury.swieradowzdroj.pl/izerska_laka/izerski-pakiet-turystyczny/';

interface Attraction {
    icon: string;
    name: string;
    desc: string;
    distance: string;
    type: string;
}

// ─── Main component ──────────────────────────────────────────────────────────
export function DiscoverPageContent({ locale }: { locale: string }) {
    const t = useTranslations('discover');
    const [activeTab, setActiveTab] = useState<'near' | 'far'>('near');

    const nearAttractions = t.raw('attractions.near') as Attraction[];
    const farAttractions = t.raw('attractions.far') as Attraction[];
    const currentAttractions = activeTab === 'near' ? nearAttractions : farAttractions;

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
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/activities/alpaca-walks.jpg"
                        alt="Alpacas in the Polish mountains near Świeradów-Zdrój and Szklarska Poręba"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-24 pb-12">
                    <motion.div initial="hidden" animate="visible" variants={stagger}>
                        <motion.span
                            variants={fadeUp}
                            className="inline-flex items-center gap-2 bg-emerald-700/80 backdrop-blur-md text-white text-sm font-semibold px-5 py-2 rounded-full mb-6 tracking-wide shadow-lg border border-emerald-500/30"
                        >
                            <Sparkles className="w-4 h-4 text-emerald-300" />
                            {t('hero.badge')}
                        </motion.span>

                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}
                        >
                            {t('hero.headline')}
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto mb-6 leading-relaxed"
                        >
                            {t('hero.subheadline')}
                        </motion.p>

                        <motion.p variants={fadeUp} className="text-white/70 text-sm font-medium">
                            ⭐ {t('hero.socialProof')}
                        </motion.p>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
                    <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-3 bg-white/60 rounded-full" />
                    </div>
                </div>
            </section>

            {/* ── 1. NARRATIVE FLIP: BASE CAMP & TOP ACTIVITY ────────────── */}
            <section className="py-16 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white shadow-xl relative z-10">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/15 shadow-2xl"
                    >
                        <motion.div variants={fadeUp} className="inline-block bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                            🦙 Top Activity & Base Camp
                        </motion.div>
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold mb-4 text-white leading-tight">
                            {t('baseCamp.title')}
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-emerald-100 text-lg md:text-xl leading-relaxed mb-8">
                            {t('baseCamp.subtitle')}
                        </motion.p>

                        <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-6 mb-8 text-left">
                            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                                <div className="text-2xl mb-2">🦙</div>
                                <h3 className="font-bold text-white mb-1 text-base">{t('baseCamp.f1')}</h3>
                                <p className="text-emerald-200 text-xs leading-relaxed">Unique hands-on animal encounters for kids & adults</p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                                <div className="text-2xl mb-2">🏡</div>
                                <h3 className="font-bold text-white mb-1 text-base">{t('baseCamp.f2')}</h3>
                                <p className="text-emerald-200 text-xs leading-relaxed">Sleep on a working alpaca farm under mountain dark skies</p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                                <div className="text-2xl mb-2">🗺️</div>
                                <h3 className="font-bold text-white mb-1 text-base">{t('baseCamp.f3')}</h3>
                                <p className="text-emerald-200 text-xs leading-relaxed">5 min to Świeradów-Zdrój & 25 min to Szklarska Poręba</p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
                            <Link href={`/${locale}/stay`}>
                                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 text-base rounded-full shadow-lg transition-all hover:scale-105">
                                    Book Your Farm Stay or Walk →
                                </Button>
                            </Link>
                            <Link href={`/${locale}/activities`}>
                                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-6 py-3.5 text-base rounded-full transition-all">
                                    Explore Alpaca Activities
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── 2. SAMPLE ITINERARY SECTION ──────────────────────────── */}
            <section className="py-20 bg-stone-50">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="text-center mb-14">
                            <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider mb-2 block">
                                🗓️ Weekend Trip Planner
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {t('itinerary.title')}
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                {t('itinerary.subtitle')}
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-7 border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-500" />
                                <div>
                                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-3">
                                        <Clock className="w-4 h-4" /> Friday Evening
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-3 leading-snug">
                                        {t('itinerary.friday.title')}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        {t('itinerary.friday.desc')}
                                    </p>
                                </div>
                                <span className="inline-flex items-center text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full self-start">
                                    📍 Base: Orłowice Farm (near Świeradów-Zdrój)
                                </span>
                            </motion.div>

                            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-7 border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 left-0 right-0 h-2 bg-orange-400" />
                                <div>
                                    <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-3">
                                        <Calendar className="w-4 h-4" /> Saturday
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-3 leading-snug">
                                        {t('itinerary.saturday.title')}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        {t('itinerary.saturday.desc')}
                                    </p>
                                </div>
                                <span className="inline-flex items-center text-xs font-semibold text-orange-800 bg-orange-50 px-3 py-1.5 rounded-full self-start">
                                    🚗 5 min drive to Świeradów
                                </span>
                            </motion.div>

                            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-7 border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-700" />
                                <div>
                                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
                                        <Compass className="w-4 h-4" /> Sunday
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-3 leading-snug">
                                        {t('itinerary.sunday.title')}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        {t('itinerary.sunday.desc')}
                                    </p>
                                </div>
                                <span className="inline-flex items-center text-xs font-semibold text-emerald-900 bg-emerald-100 px-3 py-1.5 rounded-full self-start">
                                    🏰 Sky Walk & Castle Czocha
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── STORY STRIP ─────────────────────────────────────────── */}
            <section className="py-20 bg-white">
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

            {/* ── LOCAL ATTRACTIONS WITH CROSS-LINKS ──────────────────── */}
            <section className="py-20 bg-stone-50" id="explore">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        {/* Heading */}
                        <motion.div variants={fadeUp} className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                {t('attractions.title')}
                            </h2>
                            <p className="text-gray-500 text-lg max-w-xl mx-auto">
                                {t('attractions.subtitle')}
                            </p>
                        </motion.div>

                        {/* Initiative banner */}
                        <motion.div variants={fadeUp} className="mb-8">
                            <a
                                href={INITIATIVE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-4 bg-emerald-700 text-white rounded-2xl px-6 py-4 hover:bg-emerald-800 transition-colors group shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🏔️</span>
                                    <div>
                                        <p className="font-bold text-sm uppercase tracking-wide text-emerald-200 mb-0.5">Local Initiative — We&apos;re a Partner</p>
                                        <p className="font-semibold text-base leading-tight">Izerski Pakiet Turystyczny — Explore the Izera region together</p>
                                    </div>
                                </div>
                                <ExternalLink className="w-5 h-5 text-emerald-300 group-hover:text-white flex-shrink-0 transition-colors" />
                            </a>
                        </motion.div>

                        {/* Tab buttons */}
                        <motion.div variants={fadeUp} className="flex gap-3 justify-center mb-10">
                            <button
                                onClick={() => setActiveTab('near')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-sm ${activeTab === 'near'
                                    ? 'bg-emerald-700 text-white shadow-emerald-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                                    }`}
                            >
                                <span>⏱</span> {t('attractions.tab15')}
                            </button>
                            <button
                                onClick={() => setActiveTab('far')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-sm ${activeTab === 'far'
                                    ? 'bg-emerald-700 text-white shadow-emerald-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                                    }`}
                            >
                                <span>🚗</span> {t('attractions.tab60')}
                            </button>
                        </motion.div>

                        {/* Hub diagram */}
                        <motion.div variants={fadeUp} className="mb-10">
                            <RegionMap
                                tab15Label={t('attractions.tab15')}
                                tab60Label={t('attractions.tab60')}
                            />
                        </motion.div>

                        {/* Cards grid */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {currentAttractions.map((attraction, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                                    >
                                        <div>
                                            <div className="flex items-start justify-between gap-2 mb-3">
                                                <span className="text-3xl">{attraction.icon}</span>
                                                <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
                                                    {attraction.distance} drive from Zagroda
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight">{attraction.name}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-4">{attraction.desc}</p>
                                        </div>

                                        <div className="border-t border-gray-100 pt-3 mt-2 flex flex-col gap-2">
                                            <span className="inline-block bg-stone-100 text-stone-600 text-xs font-medium px-2.5 py-0.5 rounded-md self-start">
                                                {attraction.type}
                                            </span>
                                            <Link
                                                href={`/${locale}/stay`}
                                                className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 font-semibold text-xs transition-colors mt-1"
                                            >
                                                <span>🦙 Combine with a visit to our alpaca farm</span>
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* Gallery CTA */}
                        <motion.div variants={fadeUp} className="mt-12 text-center">
                            <Link href={`/${locale}/discover#gallery`}
                                className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-900 transition-colors border-b-2 border-emerald-200 hover:border-emerald-500 pb-0.5"
                            >
                                <Camera className="w-4 h-4" />
                                See our farm photo gallery
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── 3. VISIBLE FAQ SECTION (GEO TARGET) ─────────────────── */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                                <HelpCircle className="w-3.5 h-3.5" /> Travel Guide & FAQs
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                {t('faqs.title')}
                            </h2>
                            <p className="text-gray-500 text-base max-w-xl mx-auto">
                                {t('faqs.subtitle')}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="space-y-6">
                            <div className="bg-stone-50 rounded-2xl p-6 border border-gray-200">
                                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-start gap-3">
                                    <span className="text-emerald-600 text-2xl">❓</span>
                                    <span>{t('faqs.q1')}</span>
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base pl-9">
                                    {t('faqs.a1')}
                                </p>
                            </div>

                            <div className="bg-stone-50 rounded-2xl p-6 border border-gray-200">
                                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-start gap-3">
                                    <span className="text-emerald-600 text-2xl">❓</span>
                                    <span>{t('faqs.q2')}</span>
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base pl-9">
                                    {t('faqs.a2')}
                                </p>
                            </div>

                            <div className="bg-stone-50 rounded-2xl p-6 border border-gray-200">
                                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-start gap-3">
                                    <span className="text-emerald-600 text-2xl">❓</span>
                                    <span>{t('faqs.q3')}</span>
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base pl-9">
                                    {t('faqs.a3')}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── PHOTO GALLERY ──────────────────────────────────────── */}
            <section className="py-20 bg-stone-50" id="gallery">
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

            {/* ── REVIEWS ────────────────────────────────────────────── */}
            <section className="py-20 bg-white">
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
                                    className="bg-stone-50 rounded-2xl p-6 border border-gray-200 shadow-sm"
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
            <section className="py-20 bg-stone-50">
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
                                    className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-md transition-shadow"
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
