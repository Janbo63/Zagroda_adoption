'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'

const goatIds = ['madonna', 'ladygaga', 'nella', 'baron']

interface GoatsPageContentProps {
  locale: string;
}

export function GoatsPageContent({ locale }: GoatsPageContentProps) {
  const t = useTranslations('goats')

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/${locale}/animals`}>
        <Button variant="outline" className="mb-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-sm">
          &larr; {t('backToAnimals')}
        </Button>
      </Link>
      <h1 className="text-4xl font-serif font-bold text-center mb-8 text-stone-900">{t('pageTitle')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goatIds.map((id) => (
          <Card key={id} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-serif font-bold text-stone-900">{t(`${id}.name`)}</CardTitle>
            </CardHeader>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={`/images/goats/${id === 'ladygaga' ? 'Lady-Gaga' : id === 'nella' ? 'Nella' : t(`${id}.name`)}.jpg`}
                alt={t(`${id}.name`)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <CardContent className="p-4">
              <Tabs defaultValue="attributes">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="attributes" className="text-stone-900">{t('attributes')}</TabsTrigger>
                  <TabsTrigger value="character" className="text-stone-900">{t('character')}</TabsTrigger>
                  <TabsTrigger value="stories" className="text-stone-900">{t('stories')}</TabsTrigger>
                </TabsList>
                <TabsContent value="attributes">
                  <dl className="mt-4 space-y-2">
                    <div>
                      <dt className="font-semibold text-stone-900">{t('age')}:</dt>
                      <dd>{t(`${id}.attributes.age`)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-stone-900">{t('color')}:</dt>
                      <dd>{t(`${id}.attributes.color`)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-stone-900">{t('birthplace')}:</dt>
                      <dd>{t(`${id}.attributes.birthplace`)}</dd>
                    </div>
                  </dl>
                </TabsContent>
                <TabsContent value="character">
                  <p className="mt-4 text-stone-900">{t(`${id}.character`)}</p>
                </TabsContent>
                <TabsContent value="stories">
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-stone-900">
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