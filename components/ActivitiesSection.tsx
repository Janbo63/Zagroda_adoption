'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { useTranslations } from 'next-intl'

interface Activity {
  name: string;
  image: string;
  description: string;
  id: string;
}

const activities: Activity[] = [
  { 
    name: "Meet the Alpacas", 
    image: "/images/activities/meet-alpacas.jpg", 
    description: "Make new fluffy friends!", 
    id: "meetthealpacas" 
  },
  { 
    name: "Alpaca Walks", 
    image: "/images/activities/alpaca-walks.jpg", 
    description: "Take a stroll with your new buddy!", 
    id: "alpacawalks" 
  },
  { 
    name: "Private Alpaca Safari", 
    image: "/images/Meet-and-Greet.jpg", 
    description: "Explore the farm with a herd of alpacas!", 
    id: "privatealpacasafari" 
  },
]

interface ActivitiesSectionProps {
  locale: string;
}

export function ActivitiesSection({ locale }: ActivitiesSectionProps) {
  const t = useTranslations('activities')

  return (
    <section className="w-full mb-8 md:mb-12 px-2 sm:px-4">
      <Link href={`/${locale}/activities`}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 md:mb-6 text-center text-stone-900 hover:text-orange-700 tracking-tight transition-colors duration-300 group flex items-center justify-center gap-2">
          {t('sectionTitle')}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
        </h2>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <Link key={activity.id} href={`/${locale}/activities`} className="block h-full">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-4">
                <CardTitle className="mb-2">{t(`${activity.id}.name`)}</CardTitle>
                <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-md">
                  <Image 
                    src={activity.image} 
                    alt={t(`${activity.id}.alt`)} 
                    fill
                    className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <CardDescription>{t(`${activity.id}.description`)}</CardDescription>
                <span className="inline-block mt-4 bg-orange-600 text-white rounded-xl transition-all duration-300 px-6 py-2.5 text-sm font-bold shadow-sm group-hover:bg-orange-700">
                  {t('viewDetails')}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}