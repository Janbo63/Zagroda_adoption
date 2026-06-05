'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function FarmLifeCard() {
  const t = useTranslations('farmLife')

  return (
    <motion.div
      className="journal-card relative overflow-hidden group h-full min-h-[200px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Image
        src="/images/kitchen.jpg"
        alt="Evenings by the fire"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-warmCharcoal/70 via-warmCharcoal/20 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <p className="font-handwritten text-lg text-terracotta-light mb-1">
          {t('title')}
        </p>
        <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
          {t('fireplace')}
        </h3>
      </div>
    </motion.div>
  )
}
