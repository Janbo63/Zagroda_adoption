'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Sparkles } from 'lucide-react'

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
    image: "/images/dogs/Lucy.jpg",
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
          <Card key={animal.id} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm group">
            <div className="relative aspect-video rounded-t-2xl overflow-hidden">
              <Image
                src={animal.image}
                alt={t(`${animal.id}.alt`)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Superpower Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <div className="bg-orange-500/90 backdrop-blur-sm self-start px-3 py-1 rounded-full flex items-center gap-1.5 mb-2 shadow-lg scale-90 origin-left translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Superpower</span>
                </div>
                <p className="text-white font-bold text-xl leading-tight drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {t(`${animal.id}.superpower`)}
                </p>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-600">{t(`${animal.id}.name`)}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <CardDescription className="text-primary-700 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">{t(`${animal.id}.description`)}</CardDescription>
              <Link href={`/${locale}${animal.link}`} passHref>
                <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-lg">
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