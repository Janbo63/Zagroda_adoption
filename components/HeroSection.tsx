'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'

interface HeroSectionProps {
  locale: string;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('home')
  const containerRef = useRef<HTMLElement>(null)

  // Parallax effect: Text moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const yText = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <>
      {/* Title section above hero */}
      <div className="w-full py-8 md:py-12 bg-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-center text-[#1a73e8] tracking-tight">
          {t('title')}
        </h1>
      </div>

      {/* Living Hero section */}
      <section
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] mb-8 md:mb-12 overflow-hidden group shadow-md"
      >
        {/* Mosaic Hero Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.png"
            alt={t('heroImageAlt')}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Subtle Gradient Overlay for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent z-10" />

        {/* Content Positioned Bottom-Left to match live site */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="absolute bottom-[5%] left-[5%] md:bottom-[10%] md:left-[8%] w-[85%] md:w-[45%] flex flex-col items-start justify-end p-4 z-30 pointer-events-none"
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 text-left text-white font-medium drop-shadow-lg leading-snug">
            {t('subtitle')}
          </p>

          <Link href={`/${locale}/contact`} className="pointer-events-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="default"
                size="lg"
                className="bg-[#2196f3] hover:bg-[#1976d2] text-white font-bold py-3 px-8 text-lg rounded-full shadow-lg transition-colors"
              >
                {t('planVisit')}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>
    </>
  )
}