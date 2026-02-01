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
  const t = useTranslations('hero')
  const containerRef = useRef<HTMLElement>(null)

  // Parallax effect: Text moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <>
      {/* Title section above hero */}
      <div className="w-full py-4 relative z-10 bg-gradient-to-br from-green-100/50 to-blue-100/50 backdrop-blur-sm">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-center text-primary-700">
          {t('title')}
        </h1>
      </div>

      {/* Living Hero section */}
      <section
        ref={containerRef}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] mb-8 md:mb-12 rounded-3xl overflow-hidden shadow-2xl group"
      >
        {/* Poster / Fallback Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-video-poster.png"
            alt="Alpacas in the mist"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10 opacity-90 transition-opacity duration-1000"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Content with Parallax */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="absolute inset-0 flex flex-col items-center justify-center p-4 z-30"
        >
          <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl mb-6 md:mb-10 text-center px-4 text-white font-serif tracking-wide drop-shadow-xl max-w-4xl leading-relaxed">
            {t('subtitle')}
          </p>

          <Link href={`/${locale}/contact`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="default"
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 text-lg rounded-full shadow-orange-500/30 shadow-lg border-2 border-white/20 backdrop-blur-sm"
              >
                {t('planVisit')}
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Subtle decorative bottom curve */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/40 to-transparent z-20" />
      </section>
    </>
  )
}