'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Compass, Clock, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface DiscoverTeaserProps {
  locale: string
}

export function DiscoverTeaser({ locale }: DiscoverTeaserProps) {
  const t = useTranslations('discoverTeaser')

  return (
    <Link href={`/${locale}/discover`}>
      <motion.div
        className="bento-card relative overflow-hidden group h-full min-h-[220px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image
          src="/images/farm-landscape.jpg"
          alt="Karkonosze Mountains"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warmCharcoal/80 via-warmCharcoal/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="flex items-center gap-2 mb-2">
            <Compass size={16} className="text-terracotta-light" />
            <span className="text-xs font-semibold text-terracotta-light uppercase tracking-wider">
              {t('label')}
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
            {t('title')}
          </h3>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1 text-xs text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <MapPin size={12} /> {t('castles')}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <Clock size={12} /> {t('spaTown')}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <Mountain size={12} /> {t('hiking')}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

function Mountain(props: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
    </svg>
  )
}
