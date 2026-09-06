'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Sparkles, ArrowRight, MapPin } from 'lucide-react';

interface Props {
  locale: string;
}

export function SeasonalPromoCard({ locale }: Props) {
  const t = useTranslations('home');

  const title = t('seasonalPromoTitle');
  const subtitle = t('seasonalPromoSubtitle');
  const cta = t('seasonalPromoCta');

  const promoCode = locale === 'cs' ? 'Podzim2026' : 'Autumn2026';

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 mb-10 relative z-20">
      <Link
        href={`/${locale}/jesien?code=${promoCode}`}
        className="block group relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950/80 to-emerald-950/90 border border-amber-500/40 p-5 sm:p-7 shadow-2xl transition-all duration-300 hover:border-amber-400 hover:shadow-amber-900/30 hover:-translate-y-0.5"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 relative z-10">
          <div className="flex items-center gap-4 sm:gap-5 text-center sm:text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-900/40 border border-amber-500/30 flex items-center justify-center text-3xl sm:text-4xl shadow-inner flex-shrink-0">
              🦙
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {locale === 'cs' ? 'Podzim v Jizerských horách' : 'Autumn Special'}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 group-hover:text-amber-200 transition-colors">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-stone-300 mt-1 leading-snug max-w-2xl">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 mt-2 md:mt-0">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold px-6 py-3 rounded-full text-sm sm:text-base shadow-lg group-hover:shadow-amber-900/50 transition-all">
              {cta}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
