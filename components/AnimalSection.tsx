'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const animals = [
  {
    id: 'alpacas',
    image: '/images/animals/alpacas-main.jpg',
    link: '/animals/alpacas'
  },
  {
    id: 'goats',
    image: '/images/animals/goats-main.jpg',
    link: '/animals/goats'
  },
  {
    id: 'dogs',
    image: '/images/animals/dogs-main.jpg',
    link: '/animals/dogs'
  }
]

export function AnimalSection({ locale }: { locale: string }) {
  const t = useTranslations('animals')

  return (
    <section className="w-full mb-8 md:mb-12 px-2 sm:px-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-primary-700">
        {t('sectionTitle')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {animals.map((animal) => (
          <Link href={`/${locale}${animal.link}`} key={animal.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <CardTitle className="mb-2">{t(`${animal.id}.name`)}</CardTitle>
                <Image 
                  src={animal.image} 
                  alt={t(`${animal.id}.alt`)} 
                  width={300} 
                  height={200} 
                  className="w-full h-40 object-cover mb-4" 
                />
                <CardDescription>{t(`${animal.id}.description`)}</CardDescription>
                <Button variant="outline" className="mt-4">
                  {t('meetButton', { name: t(`${animal.id}.name`) })}
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}       