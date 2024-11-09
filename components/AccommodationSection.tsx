'use client'

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'

const accommodationImages = [
    "/images/accommodation/farmhouse-rooms.jpg",
    "/images/accommodation/room1.jpg",
    "/images/accommodation/room2.jpg",
    "/images/accommodation/room3.jpg",
    // Add more image paths as needed
]

interface AccommodationSectionProps {
  locale: string;
}

export function AccommodationSection({ locale }: AccommodationSectionProps) {
  const t = useTranslations('accommodation')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-scroll images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === accommodationImages.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full mb-8 md:mb-12 px-2 sm:px-4">
      <Link href={`/${locale}/accommodation`}>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-primary-700 
          hover:text-primary-500 transition-colors duration-300 group flex items-center justify-center gap-2">
          {t('sectionTitle')}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
        </h2>
      </Link>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t('cozyfarmhouserooms.name')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            {accommodationImages.map((image, index) => (
              <Image
                key={image}
                src={image}
                alt={`${t('cozyfarmhouserooms.name')} - Image ${index + 1}`}
                width={1280}
                height={720}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000
                  ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            
            {/* Optional: Add navigation dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {accommodationImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all
                    ${currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardDescription className="text-lg">
              {t('cozyfarmhouserooms.description')}
            </CardDescription>
            <Link href="/book-now">
              <Button size="lg">{t('bookNow')}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
} 