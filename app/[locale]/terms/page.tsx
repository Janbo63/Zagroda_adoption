'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { FileText, Shield, Info, Gavel, Calendar } from 'lucide-react'

export default function TermsPage() {
    const t = useTranslations('terms_full')

    const sections = [
        { key: 'identity', icon: <Info className="w-6 h-6" /> },
        { key: 'vouchers', icon: <FileText className="w-6 h-6" /> },
        { key: 'adoptions', icon: <Shield className="w-6 h-6" /> },
        { key: 'availability', icon: <Calendar className="w-6 h-6" /> },
        { key: 'governing_law', icon: <Gavel className="w-6 h-6" /> }
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
                    <p className="text-stone-500 font-medium tracking-wide uppercase text-sm">
                        {t('last_updated')}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 p-8 md:p-12 space-y-12">
                    <section>
                        <p className="text-lg text-stone-600 leading-relaxed font-medium">
                            {t('intro')}
                        </p>
                    </section>

                    {sections.map((section, idx) => (
                        <motion.section
                            key={section.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                                    {section.icon}
                                </div>
                                <h2 className="text-2xl font-black text-primary-800">
                                    {t(`${section.key}.title`)}
                                </h2>
                            </div>
                            <div className="pl-16">
                                <p className="text-stone-600 leading-relaxed text-lg font-medium whitespace-pre-line">
                                    {t(`${section.key}.content`)}
                                </p>
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
