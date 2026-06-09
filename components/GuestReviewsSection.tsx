'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const reviews = [
  { key: 'r1', flag: '🇳🇱' },
  { key: 'r2', flag: '🇧🇪' },
  { key: 'r3', flag: '🇩🇪' },
]

export function GuestReviewsSection() {
  const t = useTranslations('guestReviews')

  return (
    <section className="w-full mb-8 md:mb-12 px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Section heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-primary-700">
          {t('sectionTitle')}
        </h2>

        {/* Score badge + Reviews grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
          {/* Booking.com Score Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="h-full border-none shadow-lg bg-gradient-to-br from-[#003580] to-[#004a9f] text-white overflow-hidden relative group">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center relative z-10">
                {/* Decorative glow */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />

                {/* Booking.com logo text */}
                <span className="text-sm font-bold tracking-wide text-blue-200 uppercase mb-2">
                  Booking.com
                </span>

                {/* Score */}
                <div className="relative mb-3">
                  <span className="text-6xl md:text-7xl font-black leading-none">
                    9.6
                  </span>
                  <span className="text-xl font-medium text-blue-200 ml-1">/10</span>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Label */}
                <span className="text-sm font-semibold text-blue-100 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full">
                  {t('ratingLabel')}
                </span>

                {/* Visitor count */}
                <span className="text-xs text-blue-200 mt-3">
                  {t('visitorCount')}
                </span>
              </CardContent>
            </Card>
          </motion.div>

          {/* Guest testimonials */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white group">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    {/* Quote icon */}
                    <div className="mb-4">
                      <Quote className="w-8 h-8 text-primary-200 group-hover:text-primary-400 transition-colors duration-300" />
                    </div>

                    {/* Review text */}
                    <p className="text-stone-700 leading-relaxed italic flex-1 mb-4">
                      &ldquo;{t(`${review.key}.text`)}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 pt-4 border-t border-stone-100">
                      <span className="text-2xl">{review.flag}</span>
                      <div>
                        <span className="text-sm font-semibold text-stone-800">
                          {t(`${review.key}.author`)}
                        </span>
                        <div className="flex gap-0.5 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
