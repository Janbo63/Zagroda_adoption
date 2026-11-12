'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Home, Gift, Heart } from 'lucide-react'

const BARN_REEL_URL = 'https://www.facebook.com/share/r/1EPSYJYUkz/'

const activities = [
  {
    id: 'meetthealpacas',
    image: "/images/activities/meet-alpacas.jpg"
  },
  {
    id: 'alpacawalks',
    image: "/images/activities/alpaca-walks.jpg"
  },
  {
    id: 'privatealpacasafari',
    image: "/images/activities/alpacaprivateoffer.png"
  }
]

export function ActivitiesContent({ locale }: { locale: string }) {
  const t = useTranslations('activities')
  const lb = useTranslations('livingBulletin')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-8 text-stone-900 tracking-tight">
        {t('title')}
      </h1>

      {/* All-Weather Cosy Winter Barn Highlight Banner */}
      <div className="mb-10 rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50/80 to-emerald-50 border-2 border-amber-300 shadow-xl text-stone-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 p-3.5 bg-gradient-to-b from-emerald-900 via-red-950 to-amber-900 flex flex-col justify-center">
            <div aria-hidden="true" className="flex items-center justify-between px-2 pb-2 text-xs select-none">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fcd34d] animate-pulse" />
              <span>🌲</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_8px_#f87171]" />
              <span>✨</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_8px_#fde68a] animate-pulse" />
              <span>🎄</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7]" />
              <span>❄️</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fcd34d] animate-pulse" />
            </div>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden ring-4 ring-amber-300/90 shadow-[0_0_25px_rgba(251,191,36,0.45)] bg-stone-900">
              <Image
                src="/images/activities/winter-barn.jpg"
                alt={lb('barnImageAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute top-2 left-2 bg-red-700/90 text-amber-100 border border-amber-300/80 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-md">
                🎄 Zima 2026
              </div>
              <div aria-hidden="true" className="absolute top-2 right-2 text-lg drop-shadow">
                ❄️✨
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white/90">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-800 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full mb-3">
                <Home className="w-3.5 h-3.5 text-orange-600" />
                {lb('barnBadge')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight mb-3 leading-snug">
                {lb('barnTitle')}
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-6">
                {lb('barnDescription')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-amber-200">
              <a
                href={BARN_REEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all min-h-[44px]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{lb('watchReelCta')}</span>
              </a>
              <Link
                href={`/${locale}/vouchers`}
                className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors min-h-[44px]"
              >
                <Gift className="w-4 h-4 text-red-600" />
                <span>{lb('voucherCardCta')}</span>
              </Link>
              <Link
                href={`/${locale}/adopt`}
                className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors min-h-[44px]"
              >
                <Heart className="w-4 h-4 text-emerald-600" />
                <span>{lb('adoptCardCta')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-serif font-bold text-stone-900">
                {t(`${activity.id}.name`)}
              </CardTitle>
            </CardHeader>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={activity.image}
                alt={t(`${activity.id}.alt`)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <CardContent className="p-4">
              <Tabs defaultValue="attributes">
                <TabsList className="grid w-full grid-cols-4 h-auto min-h-[2.5rem]">
                  <TabsTrigger
                    value="attributes"
                    className="px-1 py-1 text-xs whitespace-normal h-full flex items-center justify-center"
                  >
                    {t('attributes')}
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="px-1 py-1 text-xs whitespace-normal h-full flex items-center justify-center"
                  >
                    {t('details')}
                  </TabsTrigger>
                  <TabsTrigger
                    value="highlights"
                    className="px-1 py-1 text-xs whitespace-normal h-full flex items-center justify-center"
                  >
                    {t('highlights')}
                  </TabsTrigger>
                  <TabsTrigger
                    value="requirements"
                    className="px-1 py-1 text-xs whitespace-normal h-full flex items-center justify-center"
                  >
                    {t('requirements')}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="attributes">
                  <dl className="mt-4 space-y-2">
                    <div>
                      <dt className="font-semibold text-stone-700">{t('duration')}:</dt>
                      <dd>{t(`${activity.id}.attributes.duration`)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-stone-700">{t('groupSize')}:</dt>
                      <dd>{t(`${activity.id}.attributes.groupSize`)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-stone-700">{t('minAge')}:</dt>
                      <dd>{t(`${activity.id}.attributes.minAge`)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-stone-700">{t('availability')}:</dt>
                      <dd>{t(`${activity.id}.attributes.availability`)}</dd>
                    </div>
                  </dl>
                </TabsContent>
                <TabsContent value="details">
                  <p className="mt-4 text-stone-700">{t(`${activity.id}.details`)}</p>
                </TabsContent>
                <TabsContent value="highlights">
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-stone-700">
                    {Array.isArray(t.raw(`${activity.id}.highlights`))
                      ? (t.raw(`${activity.id}.highlights`) as string[]).map((highlight: string, index: number) => (
                        <li key={index}>{highlight}</li>
                      ))
                      : <li>{t(`${activity.id}.highlights`)}</li>
                    }
                  </ul>
                </TabsContent>
                <TabsContent value="requirements">
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-stone-700">
                    {Array.isArray(t.raw(`${activity.id}.requirements`))
                      ? (t.raw(`${activity.id}.requirements`) as string[]).map((requirement: string, index: number) => (
                        <li key={index}>{requirement}</li>
                      ))
                      : <li>{t(`${activity.id}.requirements`)}</li>
                    }
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
