'use client'

import React from 'react'
import { HeroSection } from './HeroSection'
import { VideoSection } from './VideoSection'
import { AnimalSection } from './AnimalSection'
import { ActivitiesSection } from './ActivitiesSection'
import { AccommodationSection } from './AccommodationSection'
import { SocialMediaBanner } from './SocialMediaBanner'

interface HomeContentProps {
  locale: string;
}

export function HomeContent({ locale }: HomeContentProps) {
  return (
    <main>
      <HeroSection locale={locale} />
      <VideoSection />
      <AnimalSection locale={locale} />
      <ActivitiesSection locale={locale} />
      <SocialMediaBanner />
      <AccommodationSection locale={locale} />
    </main>
  );
}
