'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'

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
        {alpacaIds.map((alpacaId) => (
          <Card key={alpacaId} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-600">{t(alpacaId)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">{t('attributes')}</h3>
                <p><span className="font-medium">{t('age')}:</span> {alpaca.attributes.age} {t('years')}</p>
                <p><span className="font-medium">{t('color')}:</span> {alpaca.attributes.color}</p>
                <p><span className="font-medium">{t('birthplace')}:</span> {alpaca.attributes.birthplace}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">{t('character')}</h3>
                <p>{alpaca.character}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">{t('stories')}</h3>
                <ul className="list-disc list-inside">
                  {alpaca.stories.map((story, index) => (
                    <li key={index} className="mb-2">{story}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}