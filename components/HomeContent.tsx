'use client'

import React from 'react'
import { HeroSection } from './HeroSection'
import { SeasonalPromoCard } from './SeasonalPromoCard'
import { VideoSection } from './VideoSection'
import { AnimalSection } from './AnimalSection'
import { ActivitiesSection } from './ActivitiesSection'
import { GuestReviewsSection } from './GuestReviewsSection'
import { FarmLifeSection } from './FarmLifeSection'
import { AccommodationSection } from './AccommodationSection'
import { SocialMediaBanner } from './SocialMediaBanner'

interface HomeContentProps {
  locale: string;
}

export function HomeContent({ locale }: HomeContentProps) {
  return (
    <main>
      <HeroSection locale={locale} />
      <SeasonalPromoCard locale={locale} />
      <VideoSection />
      <AnimalSection locale={locale} />
      <ActivitiesSection locale={locale} />
      <GuestReviewsSection />
      <FarmLifeSection />
      <SocialMediaBanner />
      <AccommodationSection locale={locale} />
    </main>
  );
}
