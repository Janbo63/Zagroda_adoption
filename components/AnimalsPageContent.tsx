'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const animals = [
  {
    id: 'alpacas',
    image: "/images/animals/alpacas-main.jpg",
    link: "/animals/alpacas"
  },
  {
    id: 'goats',
    image: "/images/animals/goats-main.jpg",
    link: "/animals/goats"
  },
  {
    id: 'dogs',
    image: "/images/dogs/dogs-main.jpg",
    link: "/animals/dogs"
  }
]

interface AnimalsPageContentProps {
  locale: string;
}

export function AnimalsPageContent({ locale }: AnimalsPageContentProps) {
  const t = useTranslations('animals')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-700">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <Card key={animal.id} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <div className="relative aspect-video rounded-t-2xl overflow-hidden">
              <Image
                src={animal.image}
                alt={t(`${animal.id}.alt`)}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-600">{t(`${animal.id}.name`)}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <CardDescription className="text-primary-700 mb-4">{t(`${animal.id}.description`)}</CardDescription>
              <Link href={`/${locale}${animal.link}`} passHref>
                <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                  {t('meetButton', { name: t(`${animal.id}.name`) })}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 