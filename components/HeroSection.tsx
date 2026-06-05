'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

interface HeroSectionProps {
  locale: string
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('home')
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  return (
    <section className="relative w-full h-[55vh] sm:h-[60vh] overflow-hidden">
      {/* Background image — bright and sunny */}
      <Image
        src="/images/hero-banner.png"
        alt={t('heroImageAlt')}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Subtle warm gradient — NOT dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-warmCharcoal/50 via-warmCharcoal/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-warmWhite/30 to-transparent" />

      {/* Content — left-aligned */}
      <div className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 leading-[1.1] drop-shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            More Than<br />a Holiday
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-white/90 mb-6 leading-relaxed font-light max-w-md drop-shadow-md font-handwritten text-xl sm:text-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            A place where families<br />
            <strong className="font-semibold">reconnect with nature.</strong>
          </motion.p>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href={`/${locale}/stay`}
              className="inline-flex items-center px-6 py-3 bg-terracotta hover:bg-terracotta-dark text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              {t('planVisit')}
            </Link>

            {/* Video play button */}
            <button
              onClick={() => setVideoModalOpen(true)}
              className="group flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              aria-label="Watch video"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all border border-white/30">
                <Play size={18} fill="white" className="text-white ml-0.5" />
              </div>
              <span className="text-sm font-medium hidden sm:inline">Watch our story</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Video placeholder modal */}
      {videoModalOpen && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setVideoModalOpen(false)}
        >
          <motion.div
            className="bg-warmCream rounded-2xl p-8 max-w-md text-center shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play size={28} className="text-terracotta ml-1" />
            </div>
            <h3 className="font-display text-xl font-bold text-warmCharcoal mb-2">
              Video Coming Soon
            </h3>
            <p className="text-warmCharcoal/60 text-sm mb-4">
              We&apos;re preparing a beautiful video of the farm and our alpacas. Stay tuned!
            </p>
            <button
              onClick={() => setVideoModalOpen(false)}
              className="px-5 py-2 bg-terracotta text-white rounded-full text-sm font-medium hover:bg-terracotta-dark transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}