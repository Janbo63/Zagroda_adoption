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
    description: "Get up close and personal with our friendly alpacas in their natural environment. Learn about their habits, personalities, and role in animal therapy.",
    requirements: [
      "Comfortable shoes recommended",
      "Outdoor activity",
      "Children under 12 must be accompanied by an adult",
      "Rain ponchos provided if needed"
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
    description: "Take a relaxing walk with one of our alpacas. This unique experience allows you to bond with these amazing animals while enjoying the beautiful farm surroundings.",
    requirements: [
      "Sturdy footwear required",
      "Trail adapted to participants' abilities",
      "Water provided",
      "May be rescheduled in case of bad weather"
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
    description: "Enjoy a private tour with one of our alpacas. This exclusive experience allows you to explore the farm and learn about alpacas in a more personalized setting.",
    requirements: [
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