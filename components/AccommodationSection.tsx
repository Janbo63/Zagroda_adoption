'use client'

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from 'next-intl'

interface Accommodation {
  name: string;
  image: string;
  description: string;
}

const accommodations: Accommodation[] = [
  { 
    name: "Cozy Farmhouse Rooms", 
    image: "/images/accommodation/farmhouse-rooms.jpg", 
    description: "Sleep tight in our comfy farmhouse!" 
  },
  { 
    name: "Unique Caravan Stays", 
    image: "/images/accommodation/caravan-stays.jpg", 
    description: "Camp out in our fun caravans!" 
  },
]

interface AccommodationSectionProps {
  locale: string;
}

export function AccommodationSection({ locale: _locale }: AccommodationSectionProps) {
  const t = useTranslations('accommodation')

  return (
    <section className="w-full mb-8 md:mb-12 px-2 sm:px-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-primary-700">
        {t('sectionTitle')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {accommodations.map((accommodation) => (
          <Card key={accommodation.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{accommodation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image 
                src={accommodation.image} 
                alt={accommodation.name} 
                width={1280} 
                height={622} 
                className="w-full h-auto" 
              />
              <CardDescription>{accommodation.description}</CardDescription>
              <Link href="/book-now">
                <Button>{t('bookNow')}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
} 