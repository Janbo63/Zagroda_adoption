'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'

const alpacas = [
  {
    name: "Micky",
    image: "/images/Alpacas/Micky.jpg",
    attributes: {
      age: 5,
      color: "White",
      birthplace: "Local Farm, Poland"
    },
    character: "Micky is a gentle and curious alpaca. He loves to approach visitors and is often the first to greet newcomers to the farm.",
    stories: [
      "Once, Micky figured out how to open the gate and led the whole troop on an adventure around the farm!",
      "Micky has a special fondness for children and always seems to know when a child needs extra comfort during therapy sessions."
    ]
  },
  {
    name: "Elvis",
    image: "/images/Alpacas/Elvis.jpg",
    attributes: {
      age: 4,
      color: "Brown",
      birthplace: "Zagroda Alpakoterapii"
    },
    character: "Elvis is the rock star of the group. He's charismatic and loves being the center of attention during farm events.",
    stories: [
      "During a farm open day, Elvis 'performed' by humming along to the background music, much to everyone's amusement.",
      "Elvis has a habit of striking poses whenever he sees a camera, earning him the nickname 'The King' among the staff."
    ]
  },
  {
    name: "Ricky",
    image: "/images/Alpacas/Ricky.jpg",
    attributes: {
      age: 3,
      color: "Black",
      birthplace: "Alpaca Breeder, Southern Poland"
    },
    character: "Ricky is the adventurous one. He's always eager to explore new areas of the farm and try new activities.",
    stories: [
      "Ricky once led a group of visitors on an impromptu 'tour' of the farm, showing them all his favorite spots.",
      "During a thunderstorm, Ricky surprised everyone by calmly watching the lightning, while the other alpacas sought shelter."
    ]
  },
  {
    name: "Teddy",
    image: "/images/Alpacas/Teddy.jpg",
    attributes: {
      age: 6,
      color: "Light Brown",
      birthplace: "Zagroda Alpakoterapii"
    },
    character: "Teddy is the gentle giant of the group. Despite his size, he's incredibly gentle and patient, especially with young children.",
    stories: [
      "Teddy once stood perfectly still for an hour while a young artist painted his portrait during a therapy session.",
      "During winter, Teddy likes to roll in the snow, creating 'alpaca angels' that always make visitors laugh."
    ]
  },
  {
    name: "Suri",
    image: "/images/Alpacas/Suri.jpg",
    attributes: {
      age: 2,
      color: "White with Brown Spots",
      birthplace: "Alpaca Farm, Western Poland"
    },
    character: "Suri is the fashionista of the group. Her unique coat always draws attention, and she seems to enjoy being admired.",
    stories: [
      "During a shearing session, Suri kept trying to style her wool into different 'hairdos', much to the amusement of the shearers.",
      "Suri has a talent for finding the sunniest spots in the field, and the other alpacas often follow her lead for the best sunbathing locations."
    ]
  },
  {
    name: "Freddy",
    image: "/images/Alpacas/Freddy.jpg",
    attributes: {
      age: 4,
      color: "Dark Brown",
      birthplace: "Zagroda Alpakoterapii"
    },
    character: "Freddy is the peacekeeper of the group. He has a calm demeanor and often mediates when there's any tension among the other alpacas.",
    stories: [
      "Once, when two younger alpacas were squabbling over a favorite toy, Freddy intervened by bringing them each a different toy, resolving the conflict.",
      "Freddy has a unique way of communicating with humans, using different humming tones that the regular visitors have started to recognize and interpret."
    ]
  }
]

interface AlpacasPageContentProps {
  locale: string;
}

export function AlpacasPageContent({ locale }: AlpacasPageContentProps) {
  const t = useTranslations('common')

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/${locale}/animals`}>
        <Button variant="outline" className="mb-4 bg-primary-500 hover:bg-primary-600 text-white">
          &larr; {t('backToAnimals')}
        </Button>
      </Link>
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-700">Meet Our Alpaca Troop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alpacas.map((alpaca) => (
          <Card key={alpaca.name} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-600">{alpaca.name}</CardTitle>
            </CardHeader>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={alpaca.image}
                alt={`${alpaca.name} the alpaca`}
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
                      <dd>{alpaca.attributes.age} {t('years')}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-primary-700">{t('color')}:</dt>
                      <dd>{alpaca.attributes.color}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-primary-700">{t('birthplace')}:</dt>
                      <dd>{alpaca.attributes.birthplace}</dd>
                    </div>
                  </dl>
                </TabsContent>
                <TabsContent value="character">
                  <p className="mt-4 text-primary-700">{alpaca.character}</p>
                </TabsContent>
                <TabsContent value="stories">
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-primary-700">
                    {alpaca.stories.map((story, index) => (
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