'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { useTranslations } from 'next-intl'

interface Activity {
  name: string;
  image: string;
  description: string;
  link: string;
  id: string;
}

const activities: Activity[] = [
  { 
    name: "Meet the Alpacas", 
    image: "/images/activities/meet-alpacas.jpg", 
    description: "Make new fluffy friends!", 
    link: "/meet-alpacas", 
    id: "meetthealpacas" 
  },
  { 
    name: "Alpaca Walks", 
    image: "/images/activities/alpaca-walks.jpg", 
    description: "Take a stroll with your new buddy!", 
    link: "/alpaca-walks", 
    id: "alpacawalks" 
  },
  { 
    name: "Private Alpaca Safari", 
    image: "/images/Meet-and-Greet.jpg", 
    description: "Explore the farm with a herd of alpacas!", 
    link: "/private-alpaca-safari", 
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
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-primary-700">
        {t('sectionTitle')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <Link href={`/${locale}${activity.link}`} key={activity.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <CardTitle className="mb-2">{t(`${activity.id}.name`)}</CardTitle>
                <Image 
                  src={activity.image} 
                  alt={t(`${activity.id}.alt`)} 
                  width={300} 
                  height={200} 
                  className="w-full h-40 object-cover mb-4" 
                />
                <CardDescription>{t(`${activity.id}.description`)}</CardDescription>
                <Button variant="outline" className="mt-4">
                  {t('viewDetails')}
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}