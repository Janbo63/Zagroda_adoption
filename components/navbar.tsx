'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import LanguageSwitcher from './LanguageSwitcher'
import { CompassNav } from './layout/CompassNav'

interface NavbarProps {
  locale: string
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('common')
  const [compassOpen, setCompassOpen] = useState(false)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => setScrolled(v > 50))
    return unsubscribe
  }, [scrollY])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-warmWhite/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Menu button — always clearly visible */}
            <button
              onClick={() => setCompassOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 shadow-md hover:shadow-lg hover:bg-white text-warmCharcoal transition-all duration-200 backdrop-blur-sm border border-warmCharcoal/10"
              aria-label="Open navigation"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="17" y2="12" />
                <line x1="3" y1="18" x2="14" y2="18" />
              </svg>
              <span className="text-sm font-semibold hidden sm:inline">Menu</span>
            </button>

            {/* Centre logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2.5">
              <Image
                src="/images/zagrodanewlogo.png"
                alt="Zagroda Alpakoterapii Logo"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className={`text-lg font-display font-bold tracking-tight hidden sm:inline transition-colors ${
                scrolled ? 'text-warmCharcoal' : 'text-white'
              }`}>
                Zagroda Alpakoterapii
              </span>
            </Link>

            {/* Right side: Language + Plan Visit CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher />
              <Link
                href={`/${locale}/stay`}
                className="inline-flex items-center px-4 sm:px-5 py-2 bg-terracotta hover:bg-terracotta-dark text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {t('stayWithUs')}
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      <CompassNav
        locale={locale}
        isOpen={compassOpen}
        onClose={() => setCompassOpen(false)}
      />
    </>
  )
}