'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from 'next-intl'

const activities = [
  {
    id: 'meetthealpacas',
    name: "Meet the Alpacas",
    image: "/images/activities/meet-alpacas.jpg",
    attributes: {
      price: "50 PLN",
      duration: "1 hour",
      groupSize: "2-8 people",
      minAge: "3+",
      availability: "Daily"
    },
    details: "A hands-on session where you'll meet our alpaca herd up close. Perfect for families and individuals looking to learn about these amazing animals.",
    highlights: [
      "Feed the alpacas their favorite treats",
      "Learn about alpaca behavior and care",
      "Take photos with our friendly herd",
      "Participate in grooming activities"
    ],
    practicalInfo: [
      "Comfortable shoes recommended",
      "Outdoor activity - dress for weather",
      "Children under 12 must be accompanied",
      "All equipment provided",
      "Cameras welcome"
    ]
  },
  {
    id: 'alpacawalks',
    name: "Alpaca Walks",
    image: "/images/activities/alpaca-walks.jpg",
    attributes: {
      price: "80 PLN",
      duration: "1.5 hours",
      groupSize: "2-4 people",
      minAge: "6+",
      availability: "Weekends"
    },
    details: "Take a guided walk through our scenic trails with your own alpaca companion. Learn handling techniques and bond with these gentle animals.",
    highlights: [
      "One-on-one time with an alpaca",
      "Guided nature walk",
      "Basic training demonstration",
      "Photo opportunities on the trail"
    ],
    practicalInfo: [
      "Sturdy footwear required",
      "Trail suitable for all fitness levels",
      "Water and snacks provided",
      "Weather-appropriate clothing recommended"
    ]
  },
  {
    id: 'privatealpacasafari',
    name: "Private Alpaca Safari",
    image: "/images/activities/alpaca-safari.jpg",
    attributes: {
      price: "150 PLN",
      duration: "2 hours",
      groupSize: "Private",
      minAge: "All ages",
      availability: "By appointment"
    },
    details: "Enjoy a private tour with one of our alpacas. This exclusive experience allows you to explore the farm and learn about alpacas in a more personalized setting.",
    highlights: [
      "One-on-one time with an alpaca",
      "Guided tour of the farm",
      "Learn about alpaca behavior and care",
      "Photo opportunities on the farm"
    ],
    practicalInfo: [
      "Comfortable shoes recommended",
      "Outdoor activity",
      "Children under 12 must be accompanied by an adult",
      "Rain ponchos provided if needed"
    ]
  }
]

export function ActivitiesContent({ locale: _locale }: { locale: string }) {
  const t = useTranslations('activities')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-700">
        {t('title')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-600">
                {t(`${activity.id}.name`)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-[4/3]">
                <Image
                  src={activity.image}
                  alt={t(`${activity.id}.alt`)}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{activity.price}</span>
                  <span>{activity.duration}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{activity.groupSize}</span>
                  <span>{activity.minAge}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{activity.availability}</span>
                </div>
              </div>
              <CardContent className="p-4">
                {t(`${activity.id}.description`)}
              </CardContent>
              <CardContent className="p-4">
                <strong>{t('requirements')}:</strong>
                <ul className="list-disc pl-6">
                  {activity.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </CardContent>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 