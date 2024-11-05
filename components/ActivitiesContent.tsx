'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const activities = [
  {
    id: 'meetthealpacas',
    image: '/images/activities/meet-alpacas.jpg',
    price: '50 PLN',
    duration: '1 hour'
  },
  {
    id: 'alpacawalks',
    image: '/images/activities/alpaca-walks.jpg',
    price: '80 PLN',
    duration: '1.5 hours'
  },
  {
    id: 'privatealpacasafari',
    image: '/images/activities/alpaca-safari.jpg',
    price: '150 PLN',
    duration: '2 hours'
  }
]

export function ActivitiesContent({ locale: _locale }: { locale: string }) {
  const t = useTranslations('activities')

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary-700">
        {t('title')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <Image
                src={activity.image}
                alt={t(`${activity.id}.alt`)}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-t mb-4"
              />
              <CardTitle className="mb-2">
                {t(`${activity.id}.name`)}
              </CardTitle>
              <CardDescription className="mb-4">
                {t(`${activity.id}.description`)}
              </CardDescription>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{activity.price}</span>
                <span>{activity.duration}</span>
              </div>
              <Button className="w-full mt-4">
                {t('seeAll')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 