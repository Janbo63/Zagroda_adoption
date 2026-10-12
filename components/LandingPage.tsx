import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronDown, MapPin, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import type { LandingContent } from '@/lib/landing/types';
import { PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/landing/types';

/**
 * Server-rendered AEO landing page. Answer capsules use <details> so the full
 * answer text is in the initial HTML (crawlers and AI extractors see it without JS).
 */
export function LandingPage({ content: c }: { content: LandingContent }) {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-800">
            {/* Hero */}
            <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-emerald-950 pb-16 pt-28 text-white">
                <div className="absolute inset-0 opacity-40">
                    <Image src={c.image.src} alt={c.image.alt} fill priority className="object-cover" sizes="100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-950/30" />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-100">
                        <MapPin className="h-4 w-4" /> {c.badge}
                    </span>
                    <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl">{c.h1}</h1>
                    <p className="mx-auto max-w-2xl text-lg text-emerald-50/90 md:text-xl">{c.intro}</p>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link href={c.cta.primary.href} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-600">
                            {c.cta.primary.label} <ArrowRight className="h-5 w-5" />
                        </Link>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-7 py-4 font-bold text-white transition hover:bg-white/20">
                            <MessageCircle className="h-5 w-5" /> {c.cta.whatsappLabel}
                        </a>
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
                {c.highlights.map((h) => (
                    <div key={h.title} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                        <Check className="mb-3 h-6 w-6 text-emerald-600" />
                        <h2 className="mb-2 text-lg font-bold text-emerald-950">{h.title}</h2>
                        <p className="text-sm leading-relaxed text-stone-600">{h.text}</p>
                    </div>
                ))}
            </section>

            {/* Answer capsules */}
            <section className="mx-auto max-w-3xl px-4 pb-16">
                <h2 className="mb-8 text-center text-3xl font-black text-emerald-950">{c.capsulesTitle}</h2>
                <div className="space-y-4">
                    {c.capsules.map((cap, i) => (
                        <details key={cap.q} open={i < 2} className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-bold text-emerald-950">
                                <h3>{cap.q}</h3>
                                <ChevronDown className="mt-1 h-5 w-5 shrink-0 transition group-open:rotate-180" />
                            </summary>
                            <p className="mt-4 leading-relaxed text-stone-700">{cap.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Drive-time table */}
            {c.table && (
                <section className="mx-auto max-w-3xl px-4 pb-16">
                    <h2 className="mb-6 text-2xl font-black text-emerald-950">{c.table.title}</h2>
                    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-emerald-50 text-emerald-950">
                                <tr>{c.table.headers.map((h) => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr>
                            </thead>
                            <tbody>
                                {c.table.rows.map((r) => (
                                    <tr key={r[0]} className="border-t border-stone-100">
                                        {r.map((cell, i) => <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-medium' : ''}`}>{cell}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3 text-xs text-stone-500">{c.table.note}</p>
                </section>
            )}

            {/* Farm vs resort comparison */}
            {c.comparison && (
                <section className="mx-auto max-w-4xl px-4 pb-16">
                    <h2 className="mb-3 text-2xl font-black text-emerald-950">{c.comparison.title}</h2>
                    <p className="mb-6 text-stone-600">{c.comparison.intro}</p>
                    <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-emerald-50 text-emerald-950">
                                <tr>{c.comparison.headers.map((h) => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr>
                            </thead>
                            <tbody>
                                {c.comparison.rows.map((r) => (
                                    <tr key={r[0]} className="border-t border-stone-100 align-top">
                                        <td className="px-4 py-3 font-medium">{r[0]}</td>
                                        <td className="px-4 py-3 text-emerald-900">{r[1]}</td>
                                        <td className="px-4 py-3 text-stone-500">{r[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-emerald-950 px-4 py-16 text-center text-white">
                <h2 className="mb-4 text-3xl font-black">{c.cta.title}</h2>
                <p className="mx-auto mb-8 max-w-2xl text-emerald-50/90">{c.cta.text}</p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href={c.cta.primary.href} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-7 py-4 font-bold transition hover:bg-orange-600">
                        {c.cta.primary.label} <ArrowRight className="h-5 w-5" />
                    </Link>
                    <a href="tel:+48695545330" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/40 px-7 py-4 font-bold transition hover:bg-white/10">
                        <Phone className="h-5 w-5" /> {PHONE_DISPLAY}
                    </a>
                </div>
                <p className="mt-6 text-sm text-emerald-100/70">Zagroda Alpakoterapii · Orłowice 24, 59-630 Mirsk</p>
            </section>

            {/* Related pages */}
            <section className="mx-auto max-w-4xl px-4 py-12">
                <h2 className="mb-4 text-lg font-bold text-emerald-950">{c.relatedTitle}</h2>
                <div className="flex flex-wrap gap-3">
                    {c.related.map((r) => (
                        <Link key={r.href} href={r.href} className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50">
                            {r.label}
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
