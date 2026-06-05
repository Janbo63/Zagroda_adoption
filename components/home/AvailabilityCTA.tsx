'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Calendar } from 'lucide-react'

interface AvailabilityCTAProps {
  locale: string
}

export function AvailabilityCTA({ locale }: AvailabilityCTAProps) {
  const t = useTranslations('common')

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-30 hidden sm:block"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
    >
      <div className="bg-gradient-to-r from-terracotta to-terracotta-dark shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
              <Calendar size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">
                <span className="text-2xl font-display font-bold mr-1.5">3</span>
                rooms available this weekend
              </p>
            </div>
          </div>
          <Link
            href={`/${locale}/stay`}
            className="inline-flex items-center px-6 py-2.5 bg-white text-terracotta font-bold rounded-full text-sm hover:bg-warmCream transition-colors shadow-md"
          >
            {t('stayWithUs')}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
