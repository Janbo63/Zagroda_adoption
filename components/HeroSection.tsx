'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'

interface HeroSectionProps {
  locale: string;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('hero')

  return (
    <section className="relative w-full aspect-[16/9] mb-8 md:mb-12 mt-4 rounded-3xl overflow-hidden shadow-lg">
      <Image
        src="/images/hero-banner.png"
        alt="Happy children with alpacas"
        fill
        className="rounded-3xl object-cover"
        priority
        sizes="100vw"
        quality={75}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-12 p-4 bg-gradient-to-b from-black/30 via-transparent to-white/70">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 text-center text-white drop-shadow-lg animate-bounce">
          {t('title')}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-8 text-center px-2 sm:px-4 text-white drop-shadow-lg">
          {t('subtitle')}
        </p>
        <Link href={`/${locale}/contact`}>
          <Button 
            variant="default" 
            size="lg" 
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t('planVisit')}
          </Button>
        </Link>
      </div>
    </section>
  )
}