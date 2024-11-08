'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from 'next-intl'

const activities = [
  {
    id: 'meetthealpacas',
    image: "/images/activities/meet-alpacas.jpg",
    attributes: {
      price: "50 PLN",
      duration: "1 hour",
      groupSize: "2-8 people",
      minAge: "3+",
      availability: "Daily"
    },
    requirements: [
      "Comfortable shoes recommended",
      "Outdoor activity",
      "Children under 12 must be accompanied",
      "All equipment provided"
    ]
  },
  {
    id: 'alpacawalks',
    image: "/images/activities/alpaca-walks.jpg",
    attributes: {
      price: "80 PLN",
      duration: "1.5 hours",
      groupSize: "2-4 people",
      minAge: "6+",
      availability: "Weekends"
    },
    requirements: [
      "Sturdy walking shoes required",
      "Weather appropriate clothing",
      "Minimum age 6 years",
      "Basic fitness level needed"
    ]
  },
  {
    id: 'privatealpacasafari',
    image: "/images/activities/alpaca-safari.jpg",
    attributes: {
      price: "150 PLN",
      duration: "2 hours",
      groupSize: "Private",
      minAge: "All ages",
      availability: "By appointment"
    },
    requirements: [
      "Advance booking required",
      "2-6 people per group",
      "Duration 2 hours",
      "Camera recommended"
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