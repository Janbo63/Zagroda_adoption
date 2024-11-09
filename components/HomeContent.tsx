'use client'

import React from 'react'
import { HeroSection } from './HeroSection'
import { AnimalSection } from './AnimalSection'
import { ActivitiesSection } from './ActivitiesSection'
import { AccommodationSection } from './AccommodationSection'

interface HomeContentProps {
  locale: string;
}

export function HomeContent({ locale }: HomeContentProps) {
  return (
    <main>
      <HeroSection locale={locale} />
      <AnimalSection locale={locale} />
      <ActivitiesSection locale={locale} />
      <AccommodationSection locale={locale} />
    </main>
  );
}