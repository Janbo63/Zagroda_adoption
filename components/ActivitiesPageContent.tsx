'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from 'next-intl'

const activities = [
  {
    name: "Meet the Alpacas",
    image: "/images/activities/meet-alpacas.jpg",
    description: "Get up close and personal with our friendly alpacas! Perfect for families who want to learn more about these fascinating animals.",
    cost: "£20 per family (up to 2 adults + 2 children)",
    duration: "Approximately 1 hour",
    terms: "No special requirements. Suitable for all ages."
  },
  {
    name: "Walk with the Alpacas",
    image: "/images/activities/alpaca-walks.jpg",
    description: "Take a leisurely stroll through our beautiful farm grounds, accompanied by your very own alpaca buddy!",
    cost: "£20 per alpaca (max 2 people per alpaca)",
    duration: "Approximately 90 minutes",
    terms: "Suitable for ages 6 and up. Sturdy footwear recommended."
  },
  {
    name: "Private Alpaca Safari",
    image: "/images/activities/alpaca-safari.jpg",
    description: "Enjoy an exclusive tour of our farm with a herd of alpacas! Perfect for larger groups or special occasions.",
    cost: "£100 (up to 6 alpacas, max 12 people)",
    duration: "Approximately 2 hours",
    terms: "Booking required at least 48 hours in advance. Suitable for all ages."
  }
]

interface ActivitiesPageContentProps {
  locale: string;
}

export function ActivitiesPageContent({ locale: _locale }: ActivitiesPageContentProps) {
  const t = useTranslations('activities')

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-100 to-green-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-700">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card key={activity.name} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-600">{activity.name}</CardTitle>
            </CardHeader>
            <div className="relative aspect-video">
              <Image
                src={activity.image}
                alt={activity.name}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-4">
              <CardDescription className="text-primary-700 mb-4">{activity.description}</CardDescription>
              <div className="space-y-2">
                <p className="font-semibold text-primary-600">Cost: <span className="font-normal">{activity.cost}</span></p>
                <p className="font-semibold text-primary-600">Duration: <span className="font-normal">{activity.duration}</span></p>
                <p className="font-semibold text-primary-600">Terms: <span className="font-normal">{activity.terms}</span></p>
              </div>
              <Button className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                {t('bookNow')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 