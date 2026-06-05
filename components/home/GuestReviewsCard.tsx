'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Star } from 'lucide-react'

export function GuestReviewsCard() {
  const t = useTranslations('guestReviews')
  const [currentReview, setCurrentReview] = useState(0)

  const reviews = [
    { text: t('review1.text'), author: t('review1.author'), flag: '🇵🇱' },
    { text: t('review2.text'), author: t('review2.author'), flag: '🇳🇱' },
    { text: t('review3.text'), author: t('review3.author'), flag: '🇩🇪' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [reviews.length])

  return (
    <motion.div
      className="journal-card p-5 sm:p-6 bg-warmCream h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-warmCharcoal/50 uppercase tracking-wider mb-1">
            Guest Reviews
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl sm:text-5xl font-display font-black text-warmCharcoal">
              9.6
            </span>
            <span className="text-lg text-warmCharcoal/40 font-display">/10</span>
          </div>
        </div>
        <div className="flex gap-0.5 mt-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={14} fill="#C67B5C" className="text-terracotta" />
          ))}
        </div>
      </div>

      <p className="text-[11px] text-warmCharcoal/40 mb-3">
        {t('basedOn')}
      </p>

      {/* Rotating review */}
      <div className="flex-1 relative min-h-[60px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm text-warmCharcoal/70 italic leading-relaxed mb-2">
              &ldquo;{reviews[currentReview].text}&rdquo;
            </p>
            <p className="text-xs font-medium text-warmCharcoal/50">
              {reviews[currentReview].flag} {reviews[currentReview].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Review dots */}
      <div className="flex gap-1.5 mt-3">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentReview(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentReview ? 'bg-terracotta w-4' : 'bg-warmCharcoal/20'
            }`}
            aria-label={`Review ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  )
}
