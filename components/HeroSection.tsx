'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'

interface HeroSectionProps {
  locale: string;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('home')

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-r from-amber-50/90 via-stone-50 to-emerald-50/80 border border-stone-200/80 rounded-2xl px-5 py-4 sm:px-7 sm:py-5 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-1">
            {t('subtitle')} • <span className="font-medium text-stone-700">{t('address')}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <Link href={`/${locale}/stay`}>
            <Button
              variant="default"
              size="default"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-sm transition-colors text-sm sm:text-base min-h-[44px]"
            >
              🏡 {t('bookStay')}
            </Button>
          </Link>
          <Link href={`/${locale}/contact`}>
            <Button
              variant="outline"
              size="default"
              className="border-stone-300 bg-white hover:bg-stone-100 text-stone-800 font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors text-sm sm:text-base min-h-[44px]"
            >
              📅 {t('planVisit')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
