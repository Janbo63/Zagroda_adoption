'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    details: "A hands-on session where you'll meet our alpaca herd up close. Perfect for families and individuals looking to learn about these amazing animals.",
    highlights: [
      "Feed the alpacas their favorite treats",
      "Learn about alpaca behavior and care",
      "Take photos with our friendly herd",
      "Participate in grooming activities"
    ],
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
    details: "Take a guided walk through our scenic trails with your own alpaca companion. Learn handling techniques and bond with these gentle animals.",
    highlights: [
      "One-on-one time with an alpaca",
      "Guided nature walk",
      "Learn alpaca handling skills",
      "Photo opportunities throughout"
    ],
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
      groupSize: "2-6 people",
      minAge: "All ages",
      availability: "By appointment"
    },
    details: "An exclusive experience where you'll get private time with our alpaca herd. Perfect for special occasions or those wanting a more personalized experience.",
    highlights: [
      "Private access to the herd",
      "Customized experience",
      "Extended interaction time",
      "Professional photo session included"
    ],
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
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={activity.image}
                alt={t(`${activity.id}.alt`)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <CardContent className="p-4">
              <Tabs defaultValue="attributes">
                <TabsList className="grid w-full grid-cols-4 text-xs sm:text-sm">
                  <TabsTrigger value="attributes" className="px-2 py-1">
                    {t('attributes')}
                  </TabsTrigger>
                  <TabsTrigger value="details" className="px-2 py-1">
                    {t('details')}
                  </TabsTrigger>
                  <TabsTrigger value="highlights" className="px-2 py-1">
                    {t('highlights')}
                  </TabsTrigger>
                  <TabsTrigger value="requirements" className="px-2 py-1">
                    {t('requirements')}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="attributes">
                  <dl className="mt-4 space-y-2">
                    <div>
                      <dt className="font-semibold text-primary-700">{t('price')}:</dt>
                      <dd>{activity.attributes.price}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-primary-700">{t('duration')}:</dt>
                      <dd>{activity.attributes.duration}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-primary-700">{t('groupSize')}:</dt>
                      <dd>{activity.attributes.groupSize}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-primary-700">{t('minAge')}:</dt>
                      <dd>{activity.attributes.minAge}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-primary-700">{t('availability')}:</dt>
                      <dd>{activity.attributes.availability}</dd>
                    </div>
                  </dl>
                </TabsContent>
                <TabsContent value="details">
                  <p className="mt-4 text-primary-700">{activity.details}</p>
                </TabsContent>
                <TabsContent value="highlights">
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-primary-700">
                    {activity.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="requirements">
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-primary-700">
                    {activity.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 