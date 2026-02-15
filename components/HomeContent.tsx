'use client'

import React from 'react'
import { Hero } from './home/Hero'
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
      <Hero />
      <AnimalSection locale={locale} />
      <ActivitiesSection locale={locale} />
      <SocialMediaBanner />
      <AccommodationSection locale={locale} />
    </main>
  );
}