'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

const goats = [
  {
    name: "Madonna",
    image: "/images/goats/madonna.jpg",
    attributes: {
      age: 3,
      color: "White",
      birthplace: "Local Farm, Poland"
    },
    character: "Madonna is the diva of the goat herd. She loves attention and often 'sings' to visitors.",
    stories: [
      "Madonna once stole a visitor's hat and wore it around the farm for an entire day.",
      "She has a habit of standing on the highest point of any structure, as if posing for a photo shoot."
    ]
  },
  {
    name: "Lady Gaga",
    image: "/images/goats/lady-gaga.jpg",
    attributes: {
      age: 2,
      color: "Black and White",
      birthplace: "Zagroda Alpakoterapii"
    },
    character: "Lady Gaga is known for her unique 'fashion sense', often found wearing flowers or leaves in her fur.",
    stories: [
      "Lady Gaga once organized a 'goat parade' where she led the entire herd in a line around the farm.",
      "She has a special talent for finding the tastiest leaves and will share them with her goat friends."
    ]
  },
  {
    name: "Nella",
    image: "/images/goats/nella.jpg",
    attributes: {
      age: 4,
      color: "Brown",
      birthplace: "Goat Breeder, Eastern Poland"
    },
    character: "Nella is the gentle soul of the group. She's particularly good with children and loves cuddles.",
    stories: [
      "Nella once comforted a crying child by nuzzling up to them and staying by their side until they smiled.",
      "She has a unique friendship with one of the farm cats and they can often be found napping together in the sun."
    ]
  },
  {
    name: "Baron",
    image: "/images/goats/baron.jpg",
    attributes: {
      age: 5,
      color: "Black",
      birthplace: "Zagroda Alpakoterapii"
    },
    character: "Baron is the dignified leader of the goat herd. He's calm, wise, and protective of the others.",
    stories: [
      "Baron once alerted the farmers to a broken fence by repeatedly headbutting the barn door until someone came to check.",
      "He has a habit of 'escorting' visitors around the farm, walking beside them like a tour guide."
    ]
  }
]

interface GoatsContentProps {
  params: {
    locale: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function GoatsContent({
  params,
  searchParams: _searchParams
}: GoatsContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/${params.locale}/animals`}>
        <Button variant="outline" className="mb-4 bg-primary-500 hover:bg-primary-600 text-white">
          &larr; Back to All Animals
        </Button>
      </Link>
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-700">Meet Our Goat Gang</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goats.map((goat) => (
          <Card key={goat.name} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-600">{goat.name}</CardTitle>
            </CardHeader>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={goat.image}
                alt={`${goat.name} the goat`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <CardContent className="p-4">
              <Tabs defaultValue="attributes">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="attributes" className="text-primary-600">Attributes</TabsTrigger>
                  <TabsTrigger value="character" className="text-primary-600">Character</TabsTrigger>
                  <TabsTrigger value="stories" className="text-primary-600">Stories</TabsTrigger>
                </TabsList>
                <TabsContent value="attributes">
                  <dl className="mt-4 space-y-2">
                    <div>
                      <dt className="font-semibold text-primary-700">Age:</dt>
                      <dd>{goat.attributes.age} years</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-primary-700">Color:</dt>
                      <dd>{goat.attributes.color}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-primary-700">Birthplace:</dt>
                      <dd>{goat.attributes.birthplace}</dd>
                    </div>
                  </dl>
                </TabsContent>
                <TabsContent value="character">
                  <p className="mt-4 text-primary-700">{goat.character}</p>
                </TabsContent>
                <TabsContent value="stories">
                  <ul className="mt-4 list-disc pl-5 space-y-2 text-primary-700">
                    {goat.stories.map((story, index) => (
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