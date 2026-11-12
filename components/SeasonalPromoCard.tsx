'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Sparkles, ArrowRight, Gift, Heart, Play, Home } from 'lucide-react';

interface Props {
  locale: string;
}

const BARN_REEL_URL = 'https://www.facebook.com/share/r/1EPSYJYUkz/';

export function SeasonalPromoCard({ locale }: Props) {
  const lb = useTranslations('livingBulletin');

  return (
    <section
      aria-labelledby="living-bulletin-heading"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-12 relative z-20"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/80 to-emerald-50 border-2 border-amber-300 p-5 sm:p-8 shadow-xl">
        {/* Decorative warm festive glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-300/25 rounded-full blur-3xl pointer-events-none" />

        {/* Top Bulletin Header Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-200/90 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm">
            <span>🎄</span>
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>{lb('badge')}</span>
          </div>
        </div>

        {/* Main 2-Column Grid: Left = Cosy Indoor Winter Barn | Right = Christmas Vouchers & Adoption */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 relative z-10 items-stretch">
          {/* Left Column (7 cols): Cosy Winter Barn Feature with Full Wide Photo */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-white border-2 border-amber-300 overflow-hidden shadow-md">
            {/* Full-Width Barn Photo with Festive Christmas Garland & Fairy Lights Frame (zero side cropping!) */}
            <div className="p-3 sm:p-4 bg-gradient-to-r from-emerald-900 via-red-950 to-amber-900">
              {/* Festive Top Fairy Lights & Pine Garland Bar */}
              <div
                aria-hidden="true"
                className="flex items-center justify-between px-3 pb-2.5 text-sm select-none"
              >
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fcd34d] animate-pulse" />
                <span>🌲</span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_8px_#f87171]" />
                <span>✨</span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_8px_#fde68a] animate-pulse" />
                <span>🎄</span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7]" />
                <span>❄️</span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fcd34d] animate-pulse" />
                <span>🎁</span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_8px_#f87171]" />
                <span>🌲</span>
              </div>

              {/* Full 4:3 Landscape Picture — shows all 5 alpacas from edge to edge */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden ring-4 ring-amber-300/90 shadow-[0_0_25px_rgba(251,191,36,0.45)] bg-stone-900">
                <Image
                  src="/images/activities/winter-barn.jpg"
                  alt={lb('barnImageAlt')}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain sm:object-cover"
                />

                {/* Corner Christmas Badges */}
                <div
                  aria-hidden="true"
                  className="absolute top-3 left-3 bg-red-700/90 text-amber-100 border border-amber-300/80 px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <span>🎄</span>
                  <span>Zima 2026</span>
                </div>
                <div
                  aria-hidden="true"
                  className="absolute top-3 right-3 text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] select-none"
                >
                  ❄️✨
                </div>

                {/* Watch Reel Pill in bottom-right corner so alpacas stay completely visible */}
                <a
                  href={BARN_REEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-white/95 hover:bg-white text-red-800 border-2 border-amber-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-current text-red-600 flex-shrink-0" />
                  <span>{lb('watchReelCta')}</span>
                </a>
              </div>
            </div>

            {/* Barn Text & CTAs Underneath */}
            <div className="p-5 sm:p-6 flex flex-col justify-between bg-gradient-to-br from-white via-amber-50/40 to-orange-50/40 flex-1">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-800 bg-orange-100 border border-orange-200 px-2.5 py-1 rounded-md mb-2.5">
                  <Home className="w-3.5 h-3.5 text-orange-600" />
                  {lb('barnBadge')}
                </span>
                <h2
                  id="living-bulletin-heading"
                  className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight leading-snug mb-2"
                >
                  {lb('barnTitle')}
                </h2>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-5">
                  {lb('barnDescription')}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/${locale}/activities`}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all min-h-[44px]"
                >
                  <span>{lb('planVisitCta')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={BARN_REEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-stone-900 border border-amber-300 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors min-h-[44px]"
                >
                  <Play className="w-4 h-4 text-red-600 fill-current" />
                  <span>{lb('watchReelCta')}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Christmas Vouchers & Alpaca Adoption Push */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-white via-emerald-50/50 to-amber-50/60 border-2 border-emerald-300 p-5 sm:p-6 shadow-md">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-md mb-2">
                🎄 {lb('christmasBadge')}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                {lb('christmasTitle')}
              </h3>
              <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                {lb('christmasSubtitle')}
              </p>
            </div>

            <div className="space-y-4 my-auto">
              {/* Card 1: Christmas Gift Vouchers */}
              <Link
                href={`/${locale}/vouchers`}
                className="block group rounded-xl bg-white hover:bg-orange-50/60 border-2 border-orange-200 hover:border-orange-400 p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 flex-shrink-0 mt-0.5">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-serif font-bold text-stone-900 group-hover:text-red-700 transition-colors text-base sm:text-lg">
                        {lb('voucherCardTitle')}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                      {lb('voucherCardDesc')}
                    </p>
                    <span className="inline-block mt-3 text-xs sm:text-sm font-bold text-red-600 group-hover:text-red-700">
                      {lb('voucherCardCta')}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Card 2: Christmas Alpaca Adoption Packages */}
              <Link
                href={`/${locale}/adopt`}
                className="block group rounded-xl bg-white hover:bg-emerald-50/60 border-2 border-emerald-200 hover:border-emerald-400 p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0 mt-0.5">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-stone-900 group-hover:text-emerald-700 transition-colors text-base sm:text-lg">
                      {lb('adoptCardTitle')}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                      {lb('adoptCardDesc')}
                    </p>
                    <div className="mt-3 flex items-center gap-3 rounded-lg bg-emerald-50/80 border border-emerald-200/80 p-2">
                      <div className="relative w-16 h-12 rounded-md overflow-hidden flex-shrink-0 border border-amber-300 bg-stone-900">
                        <Image
                          src="/images/adoption/alpaca-mascots.jpg"
                          alt={lb('adoptCardTitle')}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-emerald-700 group-hover:text-emerald-800">
                        {lb('adoptCardCta')}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
