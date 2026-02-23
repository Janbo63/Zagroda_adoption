'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Check, MapPin, Phone, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Room gallery images ──────────────────────────────────────────────────────
const GARDEN_PHOTOS = [
    '/images/Rooms/Garden Room1.jpg',
    '/images/Rooms/Garden Room 3.jpg',
    '/images/Rooms/Garden Room 4.jpg',
    '/images/Rooms/GardenRoom 2.jpg',
    '/images/Rooms/Garden-1.jpg',
];

const JUNGLE_PHOTOS = [
    '/images/Rooms/Jungle Room 1.jpg',
    '/images/Rooms/Jungle Room 2.jpg',
    '/images/Rooms/Jungle Room 3.jpg',
    '/images/Rooms/Jungle-Room-5-edited.jpg',
];

const SHARED_PHOTOS = [
    '/images/Rooms/lounge-1.jpg',
    '/images/Rooms/Lounge 2.jpg',
    '/images/Rooms/kitchen.jpg',
    '/images/Rooms/Corridor-scaled.jpg',
    '/images/Rooms/table-tennis-table.jpg',
    '/images/Rooms/table-football.jpg',
];

// Apartment room photos (separate room — not common areas)
const _APARTMENT_PHOTOS = [
    '/images/Rooms/apartment2.jpg',
    '/images/Rooms/apartment3-1.jpg',
];

// ─── Mini photo gallery component ────────────────────────────────────────────
function PhotoGallery({ photos, roomName }: { photos: string[]; roomName: string }) {
    const [current, setCurrent] = useState(0);

    return (
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 group">
            <Image
                src={photos[current]}
                alt={`${roomName} photo ${current + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Navigation arrows */}
            {photos.length > 1 && (
                <>
                    <button
                        onClick={() => setCurrent((c) => (c - 1 + photos.length) % photos.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Previous photo"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setCurrent((c) => (c + 1) % photos.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Next photo"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {photos.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/50'
                                    }`}
                                aria-label={`Go to photo ${i + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

// ─── Shared areas mini strip ──────────────────────────────────────────────────
function SharedAreasStrip({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="mt-12">
            <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
            <p className="text-center text-gray-500 mb-6">{desc}</p>
            <div className="grid grid-cols-4 md:grid-cols-4 gap-2">
                {SHARED_PHOTOS.slice(0, 8).map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image src={src} alt={`Shared area ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="25vw" />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Main page component ──────────────────────────────────────────────────────
export function StayPageContent({ locale }: { locale: string }) {
    const t = useTranslations('stay');

    const beds24Url = `https://beds24.com/booking2.php?propid=98031&referer=iFrame&lang=${locale}&utm_source=website&utm_medium=booking_cta&utm_campaign=direct`;

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
                {/* Background image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/Rooms/Garden-1.jpg"
                        alt="Alpaca farm at sunrise"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-24">
                    <motion.div initial="hidden" animate="visible" variants={stagger}>
                        <motion.span
                            variants={fadeUp}
                            className="inline-block bg-emerald-500/90 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase"
                        >
                            {t('hero.badge')}
                        </motion.span>

                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
                            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
                        >
                            {t('hero.headline')}
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-4"
                        >
                            {t('hero.subheadline')}
                        </motion.p>

                        <motion.p variants={fadeUp} className="text-white/70 text-sm mb-8">
                            ⭐ {t('hero.socialProof')}
                        </motion.p>

                        <motion.div variants={fadeUp}>
                            <a href="#booking">
                                <Button
                                    size="lg"
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-xl transition-all hover:scale-105"
                                >
                                    {t('hero.cta')}
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-3 bg-white/70 rounded-full" />
                    </div>
                </div>
            </section>

            {/* ── EXPERIENCE PILLARS ───────────────────────────────────── */}
            <section className="py-20 bg-stone-50">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center mb-14"
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900">
                            {t('experience.title')}
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {(['intimacy', 'walk', 'nature'] as const).map((key) => (
                            <motion.div
                                key={key}
                                variants={fadeUp}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                            >
                                <div className="text-5xl mb-4">{t(`experience.${key}.icon`)}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{t(`experience.${key}.title`)}</h3>
                                <p className="text-gray-600 leading-relaxed">{t(`experience.${key}.desc`)}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── ROOMS ────────────────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center mb-14"
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            {t('rooms.title')}
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-gray-500 text-lg">
                            {t('rooms.subtitle')}
                        </motion.p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Garden Room */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
                        >
                            <PhotoGallery photos={GARDEN_PHOTOS} roomName={t('rooms.garden.name')} />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('rooms.garden.name')}</h3>
                                <p className="text-gray-600 mb-4">{t('rooms.garden.desc')}</p>

                                {/* Price callout */}
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4">
                                    <div className="text-2xl font-bold text-emerald-700">{t('rooms.garden.price')}</div>
                                    <div className="text-sm text-emerald-600">{t('rooms.garden.priceSub')}</div>
                                </div>

                                <div className="text-sm text-gray-500 mb-4">👥 {t('rooms.garden.capacity')}</div>

                                <ul className="space-y-2">
                                    {(t.raw('rooms.garden.included') as string[]).map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <a href="#booking" className="block mt-6">
                                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-3 font-semibold">
                                        {t('booking.cta')}
                                    </Button>
                                </a>
                            </div>
                        </motion.div>

                        {/* Jungle Room */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
                        >
                            <PhotoGallery photos={JUNGLE_PHOTOS} roomName={t('rooms.jungle.name')} />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('rooms.jungle.name')}</h3>
                                <p className="text-gray-600 mb-4">{t('rooms.jungle.desc')}</p>

                                {/* Price callout */}
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4">
                                    <div className="text-2xl font-bold text-emerald-700">{t('rooms.jungle.price')}</div>
                                    <div className="text-sm text-emerald-600">{t('rooms.jungle.priceSub')}</div>
                                </div>

                                <div className="text-sm text-gray-500 mb-4">👥 {t('rooms.jungle.capacity')}</div>

                                <ul className="space-y-2">
                                    {(t.raw('rooms.jungle.included') as string[]).map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <a href="#booking" className="block mt-6">
                                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-3 font-semibold">
                                        {t('booking.cta')}
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Shared areas */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <SharedAreasStrip title={t('rooms.sharedAreas')} desc={t('rooms.sharedDesc')} />
                    </motion.div>
                </div>
            </section>

            {/* ── PACKAGES ─────────────────────────────────────────────── */}
            <section className="py-20 bg-stone-50">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                            {t('packages.title')}
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Weekend package */}
                            <motion.div
                                variants={fadeUp}
                                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
                            >
                                <div className="text-3xl mb-3">🌿</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{t('packages.weekend.name')}</h3>
                                <p className="text-gray-500 text-sm mb-5">{t('packages.weekend.nights')}</p>
                                <ul className="space-y-3">
                                    {(t.raw('packages.weekend.highlights') as string[]).map((h, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-700">
                                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                                <a href="#booking" className="block mt-6">
                                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">
                                        {t('booking.cta')}
                                    </Button>
                                </a>
                            </motion.div>

                            {/* Extended package */}
                            <motion.div
                                variants={fadeUp}
                                className="bg-emerald-900 rounded-2xl p-8 text-white relative overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                                    {t('packages.extended.badge')}
                                </div>
                                <div className="text-3xl mb-3">🏕️</div>
                                <h3 className="text-xl font-bold mb-1">{t('packages.extended.name')}</h3>
                                <p className="text-emerald-300 text-sm mb-5">{t('packages.extended.nights')}</p>
                                <ul className="space-y-3">
                                    {(t.raw('packages.extended.highlights') as string[]).map((h, i) => (
                                        <li key={i} className="flex items-center gap-2 text-emerald-100">
                                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={`/${locale}/contact`} className="block mt-6">
                                    <Button className="w-full bg-white text-emerald-900 hover:bg-emerald-100 rounded-xl font-semibold">
                                        {t('booking.cta')}
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── BOOKING WIDGET ───────────────────────────────────────── */}
            <section id="booking" className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
                            {t('booking.title')}
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-center text-gray-500 mb-8">
                            {t('booking.subtitle')}
                        </motion.p>

                        <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                            <iframe
                                src={beds24Url}
                                width="100%"
                                height="800"
                                style={{ border: 'none', maxWidth: '100%', overflow: 'auto' }}
                                title="Booking System"
                            />
                        </motion.div>

                        <motion.p variants={fadeUp} className="text-center text-gray-500 mt-6 flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            {t('booking.note')}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── GETTING HERE ─────────────────────────────────────────── */}
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

            {/* ── REVIEWS ──────────────────────────────────────────────── */}
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
                                    className="bg-stone-50 rounded-2xl p-6 border border-gray-100"
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

            {/* ── FINAL CTA ────────────────────────────────────────────── */}
            <section className="py-20 bg-emerald-900 text-white text-center">
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
                        <motion.p variants={fadeUp} className="text-emerald-200 text-lg mb-8">
                            {t('cta.subtitle')}
                        </motion.p>
                        <motion.div variants={fadeUp}>
                            <a href="#booking">
                                <Button
                                    size="lg"
                                    className="bg-white text-emerald-900 hover:bg-emerald-100 px-10 py-4 text-lg font-bold rounded-full shadow-xl hover:scale-105 transition-all"
                                >
                                    {t('cta.btn')}
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
