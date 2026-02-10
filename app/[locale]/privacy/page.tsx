'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Share2, Trash2, Mail } from 'lucide-react'

export default function PrivacyPolicy() {
  const t = useTranslations('privacy')

  const sections = [
    { key: 'whoWeAre', icon: <Eye className="w-6 h-6" /> },
    { key: 'messengerData', icon: <Shield className="w-6 h-6" /> },
    { key: 'dataCollection', icon: <Lock className="w-6 h-6" /> },
    { key: 'dataSharing', icon: <Share2 className="w-6 h-6" /> },
    { key: 'dataRetention', icon: <CalendarIcon className="w-6 h-6" /> },
    { key: 'dataDeletion', icon: <Trash2 className="w-6 h-6" /> },
    { key: 'yourRights', icon: <Shield className="w-6 h-6" /> },
    { key: 'contact', icon: <Mail className="w-6 h-6" /> }
  ]

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 py-12 md:py-20 mb-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-primary-900 mb-4"
          >
            {t('title')}
          </motion.h1>
          <div className="w-20 h-1.5 bg-orange-400 mx-auto rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 p-8 md:p-12 space-y-16">
          <section className="space-y-4">
            <p className="text-xl text-stone-600 leading-relaxed font-semibold italic">
              {t('intro.p1')}
            </p>
            <p className="text-stone-500 font-medium">
              {t('intro.p2')}
            </p>
          </section>

          {sections.map((section, idx) => (
            <motion.section
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-black text-primary-800">
                  {t(`${section.key}.title`)}
                </h2>
              </div>

              <div className="pl-0 md:pl-16 space-y-4">
                <p className="text-stone-600 leading-relaxed text-lg font-medium">
                  {t(`${section.key}.content`)}
                </p>

                {/* Render items if they exist as an array */}
                {renderItems(t, section.key)}
              </div>
            </motion.section>
          ))}
        </div>

        <div className="mt-12 text-center text-stone-400 text-sm font-medium italic">
          Zagroda Alpakoterapii &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

function renderItems(t: any, key: string) {
  try {
    const items = t.raw(`${key}.items`)
    if (items && Array.isArray(items)) {
      return (
        <ul className="space-y-3 list-none">
          {items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-stone-600 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )
    }
  } catch (e) { }
  return null
}