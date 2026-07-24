'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
    Wifi,
    Coffee,
    Laptop,
    Sparkles,
    Clock,
    MapPin,
    Check,
    HelpCircle,
    Phone,
    ArrowRight,
    ShieldCheck,
    Sun,
    Heart,
    Zap,
    MessageCircle,
    ChevronDown,
    ChevronUp,
    Car,
    Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackContactClick } from '@/lib/tracking';
import dynamic from 'next/dynamic';

const BookingWidget = dynamic(() => import('@/components/BookingWidget'), { ssr: false });

export function WorkationPageContent({ locale }: { locale: string }) {
    const t = useTranslations('workation');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const scrollToBooking = () => {
        const element = document.getElementById('workation-booking');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* ─── 1. HERO SECTION ──────────────────────────────────────────────── */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-emerald-950 text-white pt-24 pb-16">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="/images/Rooms/Garden-1.jpg"
                        alt="Workation at Zagroda Alpakoterapii"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-950/40" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-sm font-medium mb-6 backdrop-blur-md"
                    >
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>{t('hero.badge')}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
                    >
                        {t('hero.title')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
                    >
                        {t('hero.subtitle')}
                    </motion.p>

                    {/* Proof Chips */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10 text-xs sm:text-sm font-medium"
                    >
                        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                            <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>100+ Mbps Fiber Wi-Fi</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                            <Laptop className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Dedicated Work Desks</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                            <Coffee className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Espresso & Kitchens</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                            <Heart className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Daily Alpaca Breaks</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button
                            onClick={scrollToBooking}
                            size="lg"
                            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-emerald-900/30 text-base"
                        >
                            {t('hero.ctaPrimary')}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <a
                            href="https://wa.me/48695545330?text=Hi!%20I'm%20interested%20in%20a%20midweek%20workation%20stay."
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackContactClick({ channel: 'whatsapp', page: 'workation', label: 'Workation Hero CTA' })}
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto border-emerald-400/40 text-emerald-100 hover:bg-white/10 px-8 py-6 rounded-xl text-base backdrop-blur-md"
                            >
                                <MessageCircle className="w-5 h-5 mr-2 text-emerald-400" />
                                {t('hero.ctaWhatsApp')}
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ─── 2. THE CONTRAST ──────────────────────────────────────────────── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        {t('contrast.title')}
                    </h2>
                    <p className="text-slate-600 text-lg">
                        {t('contrast.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* City Box */}
                    <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-bl-full -z-0" />
                        <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                            <span>🏢</span> {t('contrast.cityTitle')}
                        </h3>
                        <ul className="space-y-4 text-slate-600 font-light">
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 font-bold">✕</span>
                                <span>{t('contrast.city1')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 font-bold">✕</span>
                                <span>{t('contrast.city2')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 font-bold">✕</span>
                                <span>{t('contrast.city3')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 font-bold">✕</span>
                                <span>{t('contrast.city4')}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Zagroda Workation Box */}
                    <div className="p-8 rounded-2xl bg-emerald-900 text-white shadow-xl relative overflow-hidden border border-emerald-700">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-800/50 rounded-bl-full -z-0" />
                        <h3 className="text-xl font-bold text-emerald-200 mb-6 flex items-center gap-2">
                            <span>🦙</span> {t('contrast.zagrodaTitle')}
                        </h3>
                        <ul className="space-y-4 text-emerald-50 font-light">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{t('contrast.zagroda1')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{t('contrast.zagroda2')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{t('contrast.zagroda3')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{t('contrast.zagroda4')}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ─── 3. WORKSTATION PROOF & ESSENTIALS ────────────────────────────── */}
            <section className="py-20 bg-slate-100 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            {t('essentials.title')}
                        </h2>
                        <p className="text-slate-600 text-lg">
                            {t('essentials.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                                <Wifi className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{t('essentials.wifiTitle')}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{t('essentials.wifiDesc')}</p>
                        </div>

                        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                                <Laptop className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{t('essentials.deskTitle')}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{t('essentials.deskDesc')}</p>
                        </div>

                        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                                <Coffee className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{t('essentials.coffeeTitle')}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{t('essentials.coffeeDesc')}</p>
                        </div>

                        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{t('essentials.quietTitle')}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{t('essentials.quietDesc')}</p>
                        </div>

                        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                                <Heart className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{t('essentials.alpacaTitle')}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{t('essentials.alpacaDesc')}</p>
                        </div>

                        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{t('essentials.hikesTitle')}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{t('essentials.hikesDesc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 4. A DAY IN THE LIFE TIMELINE ───────────────────────────────── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        {t('timeline.title')}
                    </h2>
                    <p className="text-slate-600 text-lg">
                        {t('timeline.subtitle')}
                    </p>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-emerald-200 md:before:left-1/2">
                    {/* Item 1 */}
                    <div className="relative flex flex-col md:flex-row items-start group">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 text-white font-bold text-sm z-10 shadow-md border-4 border-slate-50 shrink-0">
                            08:00
                        </div>
                        <div className="ml-6 md:ml-0 md:w-1/2 md:pr-12 md:text-right mt-2 md:mt-0">
                            <h3 className="text-lg font-bold text-slate-800">{t('timeline.t1Title')}</h3>
                            <p className="text-slate-600 text-sm mt-1">{t('timeline.t1Desc')}</p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="relative flex flex-col md:flex-row items-start md:flex-row-reverse group">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 text-white font-bold text-sm z-10 shadow-md border-4 border-slate-50 shrink-0">
                            09:00
                        </div>
                        <div className="ml-6 md:ml-0 md:w-1/2 md:pl-12 text-left mt-2 md:mt-0">
                            <h3 className="text-lg font-bold text-slate-800">{t('timeline.t2Title')}</h3>
                            <p className="text-slate-600 text-sm mt-1">{t('timeline.t2Desc')}</p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="relative flex flex-col md:flex-row items-start group">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 text-white font-bold text-sm z-10 shadow-md border-4 border-slate-50 shrink-0">
                            13:00
                        </div>
                        <div className="ml-6 md:ml-0 md:w-1/2 md:pr-12 md:text-right mt-2 md:mt-0">
                            <h3 className="text-lg font-bold text-slate-800">{t('timeline.t3Title')}</h3>
                            <p className="text-slate-600 text-sm mt-1">{t('timeline.t3Desc')}</p>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="relative flex flex-col md:flex-row items-start md:flex-row-reverse group">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-700 text-white font-bold text-sm z-10 shadow-md border-4 border-slate-50 shrink-0">
                            17:05
                        </div>
                        <div className="ml-6 md:ml-0 md:w-1/2 md:pl-12 text-left mt-2 md:mt-0">
                            <h3 className="text-lg font-bold text-emerald-900">{t('timeline.t4Title')}</h3>
                            <p className="text-slate-600 text-sm mt-1">{t('timeline.t4Desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 5. COMMUTE & LOCATION ────────────────────────────────────────── */}
            <section className="py-16 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">{t('commute.title')}</h2>
                    <p className="text-slate-400 mb-12 max-w-2xl mx-auto">{t('commute.subtitle')}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
                            <Car className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-white mb-1">90 mins</div>
                            <div className="text-slate-400 text-xs font-medium">Prague, CZ 🇨🇿</div>
                        </div>
                        <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
                            <Car className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-white mb-1">45 mins</div>
                            <div className="text-slate-400 text-xs font-medium">Liberec, CZ 🇨🇿</div>
                        </div>
                        <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
                            <Car className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-white mb-1">2 hours</div>
                            <div className="text-slate-400 text-xs font-medium">Wrocław, PL 🇵🇱</div>
                        </div>
                        <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
                            <Car className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-white mb-1">1.5 hours</div>
                            <div className="text-slate-400 text-xs font-medium">Dresden, DE 🇩🇪</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 6. BOOKING WIDGET INTEGRATION ───────────────────────────────── */}
            <section id="workation-booking" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        {t('booking.tag')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 mb-3">
                        {t('booking.title')}
                    </h2>
                    <p className="text-slate-600">
                        {t('booking.subtitle')}
                    </p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
                    <BookingWidget locale={locale} />
                </div>
            </section>

            {/* ─── 7. FAQ ACCORDION ─────────────────────────────────────────────── */}
            <section className="py-16 bg-slate-100 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-10">
                        {t('faq.title')}
                    </h2>

                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((num) => {
                            const isOpen = activeFaq === num;
                            return (
                                <div
                                    key={num}
                                    className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                                >
                                    <button
                                        onClick={() => setActiveFaq(isOpen ? null : num)}
                                        className="w-full p-5 text-left font-semibold text-slate-800 flex items-center justify-between hover:bg-slate-50 transition-colors"
                                    >
                                        <span>{t(`faq.q${num}`)}</span>
                                        {isOpen ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                                    </button>
                                    {isOpen && (
                                        <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                                            {t(`faq.a${num}`)}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
