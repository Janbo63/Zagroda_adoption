'use client'

import React from 'react'
import { Facebook, Instagram, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function SocialMediaBanner() {
    const t = useTranslations('social')

    return (
        <section className="w-full mb-8 md:mb-12 px-2 sm:px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-400 to-orange-500 p-6 md:p-10 text-white shadow-xl"
            >
                {/* Animated sparkles background */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 180, 270, 360],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:40px_40px]"
                    />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <Sparkles className="w-6 h-6 text-yellow-200 animate-pulse" />
                            <span className="uppercase tracking-widest text-sm font-bold text-orange-100">
                                Exclusive Content
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                            {t('title')}
                        </h2>
                        <p className="text-lg md:text-xl text-orange-50 font-medium max-w-xl">
                            {t('description')}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <a
                            href="https://www.facebook.com/zagrodaalpakoterapii/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-white text-orange-500 hover:bg-orange-50 transition-all duration-300 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg group"
                        >
                            <Facebook className="w-6 h-6 fill-current transition-transform group-hover:scale-110" />
                            Facebook
                        </a>
                        <a
                            href="https://www.instagram.com/zagrodaalpako/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-white text-orange-500 hover:bg-orange-50 transition-all duration-300 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg group"
                        >
                            <Instagram className="w-6 h-6 transition-transform group-hover:scale-110" />
                            Instagram
                        </a>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </motion.div>
        </section>
    )
}
