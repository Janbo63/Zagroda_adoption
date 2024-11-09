'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'

const dogs = [
  {
    name: "Max",
    image: "/images/dogs/lucy.jpg",
    attributes: {
      age: 4,
      color: "Golden and Tan",
      birthplace: "Local Shelter, Poland"
    },
    character: "Max is our friendly farm guardian. He's gentle with visitors but takes his job seriously.",
    stories: [
      "Max once helped guide a lost sheep back to its pen.",
      "He loves to greet every visitor and give tours of the farm."
    ]
  }
  // Add more dogs here...
]

interface DogsPageContentProps {
  locale: string;
}

export function DogsPageContent({ locale }: DogsPageContentProps) {
  const t = useTranslations('common')

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/${locale}/animals`}>
        <Button variant="outline" className="mb-4 bg-primary-500 hover:bg-primary-600 text-white">
          &larr; {t('backToAnimals')}
        </Button>
      </Link>
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-700">Meet Our Farm Dogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogs.map((dog) => (
          <Card key={dog.name} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-600">{dog.name}</CardTitle>
            </CardHeader>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={dog.image}
                alt={`${dog.name} the dog`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
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
                      <dd>{dog.attributes.age} {t('years')}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-primary-700">{t('color')}:</dt>
                      <dd>{dog.attributes.color}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-primary-700">{t('birthplace')}:</dt>
                      <dd>{dog.attributes.birthplace}</dd>
                    </div>
                  </dl>
                </TabsContent>
                <TabsContent value="character">
                  <p className="mt-4 text-primary-700">{dog.character}</p>
                </TabsContent>
                <TabsContent value="stories">
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-primary-700">
                    {dog.stories.map((story, index) => (
                      <li key={index}>{story}</li>
                    ))}
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