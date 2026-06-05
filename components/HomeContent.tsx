'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { HeroSection } from './HeroSection'
import { GuestReviewsCard } from './home/GuestReviewsCard'
import { FarmLifeCard } from './home/FarmLifeCard'
import { DiscoverTeaser } from './home/DiscoverTeaser'
import { AvailabilityCTA } from './home/AvailabilityCTA'
import { TornPaperDivider } from './ui/TornPaperDivider'
import { LeafDecoration } from './ui/LeafDecoration'
import { AnimalSection } from './AnimalSection'
import { ActivitiesSection } from './ActivitiesSection'
import { AccommodationSection } from './AccommodationSection'

interface HomeContentProps {
  locale: string
}

export function HomeContent({ locale }: HomeContentProps) {
  const t = useTranslations('farmLife')

  return (
    <main className="bg-paper">
      {/* ─── Half-screen Hero ─── */}
      <HeroSection locale={locale} />

      {/* ─── Bento Grid: The Living Countryside Layout ─── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <LeafDecoration position="top-right" className="hidden sm:block" />

        {/* Row 1: Explore (lg) + Fireplace (md) + Reviews (sm) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 mb-4 sm:mb-5">
          {/* Explore the Karkonosze — large landscape card */}
          <div className="lg:col-span-5">
            <DiscoverTeaser locale={locale} />
          </div>

          {/* Evenings by the fire — atmospheric photo */}
          <div className="lg:col-span-3">
            <FarmLifeCard />
          </div>

          {/* Guest Reviews 9.6/10 badge */}
          <div className="lg:col-span-4">
            <GuestReviewsCard />
          </div>
        </div>

        {/* Row 2: Alpaca Therapy (md) + Farm Moments (md) + Castles (lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* Alpaca Therapy Sessions */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href={`/${locale}/activities`}>
              <div className="journal-card relative overflow-hidden group h-full min-h-[220px]">
                <Image
                  src="/images/Alpaca-cover-1.jpg"
                  alt="Alpaca therapy sessions"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warmCharcoal/70 via-warmCharcoal/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
                    Alpaca Therapy<br />Sessions
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* More than a farm — text + mountain illustration card */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="journal-card p-5 sm:p-6 bg-moss-50 h-full flex flex-col justify-between relative overflow-hidden">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-warmCharcoal mb-2 leading-tight">
                  More than<br />a farm
                </h3>
                {/* Mountain illustration */}
                <svg viewBox="0 0 120 50" className="w-28 h-auto text-moss/30 mb-3">
                  <path d="M0 50 L30 15 L45 30 L60 8 L80 28 L120 50 Z" fill="currentColor" />
                  <path d="M60 8 L70 20 L50 20 Z" fill="white" fillOpacity="0.4" />
                </svg>
              </div>

              {/* Amenity pills */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {['fireplace', 'mountains', 'garden', 'kitchen', 'games', 'playground'].map((key) => (
                  <span
                    key={key}
                    className="text-[11px] font-medium text-warmCharcoal/60 bg-white/80 px-2.5 py-1 rounded-full"
                  >
                    {t(key)}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Discover Historic Castles — large photo */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href={`/${locale}/discover`}>
              <div className="journal-card relative overflow-hidden group h-full min-h-[220px]">
                <Image
                  src="/images/farm-landscape.jpg"
                  alt="Discover historic castles nearby"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warmCharcoal/70 via-warmCharcoal/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
                    Discover Historic<br />Castles Nearby
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Torn Paper Transition ─── */}
      <TornPaperDivider />

      {/* ─── Animals Section ─── */}
      <section className="relative bg-watercolour-cool">
        <LeafDecoration position="bottom-left" className="hidden sm:block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <AnimalSection locale={locale} />
        </div>
      </section>

      <TornPaperDivider variant="top" />

      {/* ─── Activities Section ─── */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <ActivitiesSection locale={locale} />
        </div>
      </section>

      <TornPaperDivider />

      {/* ─── Accommodation Section ─── */}
      <section className="relative bg-watercolour-warm">
        <LeafDecoration position="top-right" className="hidden sm:block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <AccommodationSection locale={locale} />
        </div>
      </section>

      {/* ─── Sticky Availability CTA ─── */}
      <AvailabilityCTA locale={locale} />
    </main>
  )
}
