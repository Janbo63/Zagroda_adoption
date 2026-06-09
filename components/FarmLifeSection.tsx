'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import {
  Flame,
  Mountain,
  TreePine,
  UtensilsCrossed,
  Dumbbell,
  Flower2,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const amenities = [
  { key: 'fireplace', icon: Flame, gradient: 'from-orange-400 to-amber-500' },
  { key: 'mountains', icon: Mountain, gradient: 'from-sky-400 to-blue-500' },
  { key: 'playground', icon: TreePine, gradient: 'from-emerald-400 to-green-500' },
  { key: 'kitchen', icon: UtensilsCrossed, gradient: 'from-rose-400 to-pink-500' },
  { key: 'billiards', icon: Dumbbell, gradient: 'from-violet-400 to-purple-500' },
  { key: 'garden', icon: Flower2, gradient: 'from-lime-400 to-emerald-500' },
]

export function FarmLifeSection() {
  const t = useTranslations('farmLife')

  return (
    <section className="w-full mb-8 md:mb-12 px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Emotional headline */}
        <div className="text-center mb-8">
          <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            {t('badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-700 mb-3">
            {t('headline')}
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            {t('subheadline')}
          </p>
        </div>

        {/* Amenity cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {amenities.map((amenity, index) => {
            const IconComponent = amenity.icon
            return (
              <motion.div
                key={amenity.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white group cursor-default overflow-hidden">
                  <CardContent className="p-5 md:p-6 flex flex-col items-center text-center relative">
                    {/* Icon with gradient background */}
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${amenity.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-stone-800 text-sm md:text-base mb-2">
                      {t(`${amenity.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                      {t(`${amenity.key}.desc`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
