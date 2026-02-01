'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Sparkles, Music } from 'lucide-react'
import { AlpacaSoundButton } from './AlpacaSoundButton'

const animals = [
  {
    id: 'alpacas',
    image: '/images/animals/alpacas-main.jpg',
    link: '/animals/alpacas',
    superpower: 'Emanating Calm & Softness' // Placeholder, would ideally come from i18n
  },
  {
    id: 'goats',
    image: '/images/animals/goats-main.jpg',
    link: '/animals/goats',
    superpower: 'Playful Energy & Climbing'
  },
  {
    id: 'dogs',
    image: '/images/dogs/Lucy.jpg',
    link: '/animals/dogs',
    superpower: 'Unconditional Love'
  }
]

export function AnimalSection({ locale }: { locale: string }) {
  const t = useTranslations('animals')

  return (
    <section className="w-full mb-8 md:mb-12 px-2 sm:px-4">
      <Link href={`/${locale}/animals`}>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-primary-700 
          hover:text-primary-500 transition-colors duration-300 group flex items-center justify-center gap-2">
          {t('sectionTitle')}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
        </h2>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {animals.map((animal, index) => (
          <Link href={`/${locale}${animal.link}`} key={animal.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer">
                <CardContent className="p-0 relative">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={animal.image}
                      alt={t(`${animal.id}.alt`)}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Superpower Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-orange-500/90 backdrop-blur-sm self-start px-3 py-1 rounded-full flex items-center gap-1.5 mb-2 shadow-lg">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Superpower</span>
                      </div>
                      <p className="text-white font-bold text-lg leading-tight drop-shadow-md">
                        {t(`${animal.id}.superpower`)}
                      </p>
                    </div>

                    {/* Interactive Sound Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-300 z-20">
                      <AlpacaSoundButton />
                    </div>
                  </div>

                  <div className="p-6 relative z-10">
                    <CardTitle className="mb-2 text-2xl text-primary-800">{t(`${animal.id}.name`)}</CardTitle>

                    <CardDescription className="line-clamp-2 group-hover:line-clamp-none transition-all duration-500 text-stone-600">
                      {t(`${animal.id}.description`)}
                    </CardDescription>

                    <Button
                      className="mt-4 w-full bg-primary-100 text-primary-700 hover:bg-primary-600 hover:text-white rounded-xl font-bold transition-all duration-300 group-hover:shadow-md"
                    >
                      {t('meetButton', { name: t(`${animal.id}.name`) })}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  )
}       