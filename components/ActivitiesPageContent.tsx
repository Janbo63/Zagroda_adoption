'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
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
                <Button asChild className="flex-1 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                  <a
                    href={`https://wa.me/48695545330?text=${encodeURIComponent(t(`${key}.name`) + ' - ')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleBookClick(key)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full min-w-[44px] min-h-[44px] transition-all duration-300 transform hover:scale-105">
                  <a
                    href="tel:+48695545330"
                    onClick={handlePhoneClick}
                    aria-label={t('callUs')}
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {_locale === 'cs' && (
        <div className="mt-12 rounded-2xl border border-emerald-300 bg-white/90 p-6 md:p-8 text-center text-stone-800 shadow-lg max-w-3xl mx-auto backdrop-blur-sm">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            Tipy pro návštěvníky z Česka
          </span>
          <h2 className="text-2xl font-bold text-emerald-950 mb-3">
            Plánujete rodinný výlet z Frýdlantu či Liberce?
          </h2>
          <p className="text-stone-700 mb-6 leading-relaxed">
            Přečtěte si praktického průvodce: ověřené dojezdové časy (10 km od hranice), platby v korunách i kartou, krytá stodola pro případ deště a odpovědi na nejčastější dotazy.
          </p>
          <Link
            href="/cs/vylet"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white shadow hover:bg-emerald-800 transition"
          >
            Průvodce: Výlet k alpakám pro rodiny z ČR →
          </Link>
        </div>
      )}
    </div>
  )
}
 