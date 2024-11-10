'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from 'next-intl'

const activityKeys = ['meetthealpacas', 'alpacawalks', 'privatealpacasafari']

interface ActivitiesPageContentProps {
  locale: string;
}

export function ActivitiesPageContent({ locale: _locale }: ActivitiesPageContentProps) {
  const t = useTranslations('activities')

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-100 to-green-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-700">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activityKeys.map((key) => (
          <Card key={key} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-600">
                {t(`${key}.name`)}
              </CardTitle>
            </CardHeader>
            <div className="relative aspect-video">
              <Image
                src={t(`${key}.image`)}
                alt={t(`${key}.alt`)}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-4">
              <CardDescription className="text-primary-700 mb-4">
                {t(`${key}.description`)}
              </CardDescription>
              <div className="space-y-2">
                <p className="font-semibold text-primary-600">
                  {t('price')}: <span className="font-normal">{t(`${key}.attributes.cost`)}</span>
                </p>
                <p className="font-semibold text-primary-600">
                  {t('duration')}: <span className="font-normal">{t(`${key}.attributes.duration`)}</span>
                </p>
                <p className="font-semibold text-primary-600">
                  {t('requirements')}: <span className="font-normal">{t(`${key}.attributes.terms`)}</span>
                </p>
              </div>
              <Button className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                {t('bookNow')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 