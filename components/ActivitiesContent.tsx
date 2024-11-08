'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const activities = [
  {
    id: 'meetthealpacas',
    image: '/images/activities/meet-alpacas.jpg',
    attributes: {
      price: '50 PLN',
      duration: '1 hour',
      groupSize: '2-8 people',
      minAge: '3+',
      availability: 'Daily'
    }
  },
  {
    id: 'alpacawalks',
    image: '/images/activities/alpaca-walks.jpg',
    attributes: {
      price: '80 PLN',
      duration: '1.5 hours',
      groupSize: '2-4 people',
      minAge: '6+',
      availability: 'Weekends'
    }
  },
  {
    id: 'privatealpacasafari',
    image: '/images/activities/alpaca-safari.jpg',
    attributes: {
      price: '150 PLN',
      duration: '2 hours',
      groupSize: 'Private',
      minAge: 'All ages',
      availability: 'By appointment'
    }
  }
]

export function ActivitiesContent({ locale: _locale }: { locale: string }) {
  const t = useTranslations('activities')

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary-700">
        {t('title')}
      </h1>
      
      {activities.map((activity) => (
        <div key={activity.id} className="mb-16 last:mb-0">
          <h2 className="text-2xl font-bold mb-6 text-primary-600">
            {t(`${activity.id}.name`)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Image Section */}
            <div className="relative aspect-[4/3]">
              <Image
                src={activity.image}
                alt={t(`${activity.id}.alt`)}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Description Section */}
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
          </div>

          <CardContent className="p-4">
            {t(`${activity.id}.description`)}
          </CardContent>
        </div>
      ))}
    </div>
  )
} 