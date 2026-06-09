'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from 'next-intl'
import { Phone, MessageCircle } from 'lucide-react'
import { trackContactClick } from '@/lib/tracking'

const activityKeys = ['meetthealpacas', 'alpacawalks', 'privatealpacasafari']

interface ActivitiesPageContentProps {
  locale: string;
}

export function ActivitiesPageContent({ locale: _locale }: ActivitiesPageContentProps) {
  const t = useTranslations('activities')

  const handleBookClick = (activityName: string) => {
    trackContactClick({ channel: 'whatsapp', page: 'activities', label: activityName })
  }

  const handlePhoneClick = () => {
    trackContactClick({ channel: 'phone', page: 'activities' })
  }

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
                  {t('duration')}: <span className="font-normal">{t(`${key}.attributes.duration`)}</span>
                </p>
                <p className="font-semibold text-primary-600">
                  {t('requirements')}: <span className="font-normal">{t(`${key}.attributes.terms`)}</span>
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <a
                  href={`https://wa.me/48695545330?text=${encodeURIComponent(t(`${key}.name`) + ' - ')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                  onClick={() => handleBookClick(key)}
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
                <a
                  href="tel:+48695545330"
                  onClick={handlePhoneClick}
                >
                  <Button variant="outline" className="rounded-full py-2 px-4 transition-all duration-300 transform hover:scale-105">
                    <Phone className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
 