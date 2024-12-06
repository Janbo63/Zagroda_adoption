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
    }
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
    }
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
    }
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
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <CardContent className="p-4">
              <Tabs defaultValue="attributes">
                <TabsList className="grid w-full grid-cols-4 h-auto min-h-[2.5rem]">
                  <TabsTrigger 
                    value="attributes" 
                    className="px-1 py-1 text-xs whitespace-normal h-full flex items-center justify-center"
                  >
                    {t('attributes')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="details" 
                    className="px-1 py-1 text-xs whitespace-normal h-full flex items-center justify-center"
                  >
                    {t('details')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="highlights" 
                    className="px-1 py-1 text-xs whitespace-normal h-full flex items-center justify-center"
                  >
                    {t('highlights')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="requirements" 
                    className="px-1 py-1 text-xs whitespace-normal h-full flex items-center justify-center"
                  >
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
                  <p className="mt-4 text-primary-700">{t(`${activity.id}.details`)}</p>
                </TabsContent>
                <TabsContent value="highlights">
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-primary-700">
                    {Array.isArray(t(`${activity.id}.highlights`)) 
                      ? t(`${activity.id}.highlights`).map((highlight: string, index: number) => (
                          <li key={index}>{highlight}</li>
                        ))
                      : <li>{t(`${activity.id}.highlights`)}</li>
                    }
                  </ul>
                </TabsContent>
                <TabsContent value="requirements">
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-primary-700">
                    {Array.isArray(t(`${activity.id}.requirements`))
                      ? t(`${activity.id}.requirements`).map((requirement: string, index: number) => (
                          <li key={index}>{requirement}</li>
                        ))
                      : <li>{t(`${activity.id}.requirements`)}</li>
                    }
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