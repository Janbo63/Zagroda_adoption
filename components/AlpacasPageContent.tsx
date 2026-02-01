'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'
import { Sparkles, Heart } from 'lucide-react'

const alpacaIds = ['micky', 'elvis', 'ricky', 'teddy', 'suri', 'freddy']

interface AlpacasPageContentProps {
  locale: string;
}

export function AlpacasPageContent({ locale }: AlpacasPageContentProps) {
  const t = useTranslations('alpacas')

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/${locale}/animals`}>
        <Button variant="outline" className="mb-4 bg-primary-500 hover:bg-primary-600 text-white">
          &larr; {t('backToAnimals')}
        </Button>
      </Link>
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-700">{t('pageTitle')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alpacaIds.map((id) => (
          <Card key={id} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary-600 flex justify-between items-center">
                {t(`${id}.name`)}
                <Heart className="w-5 h-5 text-red-400 hover:fill-red-400 cursor-pointer transition-colors" />
              </CardTitle>
            </CardHeader>
            <div className="relative aspect-[4/3] w-full group">
              <Image
                src={`/images/Alpacas/${id.charAt(0).toUpperCase() + id.slice(1)}.jpg`}
                alt={t(`${id}.name`)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Superpower Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                <div className="bg-orange-500/90 backdrop-blur-sm self-start px-2 py-0.5 rounded-full flex items-center gap-1 mb-1 shadow-lg">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span className="text-[9px] font-black text-white uppercase tracking-wider">Superpower</span>
                </div>
                <p className="text-white font-bold text-sm leading-tight">
                  {t(`${id}.superpower`)}
                </p>
              </div>
            </div>
            <CardContent className="p-4">
              <Tabs defaultValue="attributes">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="attributes" className="text-primary-600">{t('attributes')}</TabsTrigger>
                  <TabsTrigger value="character" className="text-primary-600">{t('character')}</TabsTrigger>
                  <TabsTrigger value="stories" className="text-primary-600">{t('stories')}</TabsTrigger>
                </TabsList>
                <TabsContent value="attributes">
                  <dl className="mt-4 space-y-2">
                    <div>
                      <dt className="font-semibold text-primary-700">{t('age')}:</dt>
                      <dd>{t(`${id}.attributes.age`)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-primary-700">{t('color')}:</dt>
                      <dd>{t(`${id}.attributes.color`)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-primary-700">{t('birthplace')}:</dt>
                      <dd>{t(`${id}.attributes.birthplace`)}</dd>
                    </div>
                  </dl>
                </TabsContent>
                <TabsContent value="character">
                  <p className="mt-4 text-primary-700">{t(`${id}.character`)}</p>
                </TabsContent>
                <TabsContent value="stories">
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-primary-700">
                    <li>{t(`${id}.stories.0`)}</li>
                    <li>{t(`${id}.stories.1`)}</li>
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