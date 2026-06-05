'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface CompassNavProps {
  locale: string
  isOpen: boolean
  onClose: () => void
}

/* 6 items spaced evenly around full 360° circle, starting from top */
const navItems = [
  { key: 'stayWithUs', href: '/stay', icon: StayIcon, angle: 270 },       // top
  { key: 'animals', href: '/animals', icon: AnimalsIcon, angle: 330 },     // top-right
  { key: 'activities', href: '/activities', icon: ActivitiesIcon, angle: 30 },  // bottom-right
  { key: 'vouchers', href: '/vouchers', icon: GiftsIcon, angle: 90 },      // bottom
  { key: 'adoption', href: '/adopt', icon: AdoptIcon, angle: 150 },        // bottom-left
  { key: 'exploreTheArea', href: '/discover', icon: ExploreIcon, angle: 210 }, // top-left
]

export function CompassNav({ locale, isOpen, onClose }: CompassNavProps) {
  const t = useTranslations('common')

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-warmCharcoal/60 backdrop-blur-md z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Compass wheel — centred on screen */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative" style={{ width: 360, height: 360 }}>

              {/* Dashed compass ring */}
              <motion.div
                className="absolute rounded-full border-2 border-dashed border-white/20"
                style={{ inset: 20 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }}
              />

              {/* Centre logo button (tap to close) */}
              <motion.button
                onClick={onClose}
                className="absolute z-10 rounded-full bg-warmCream shadow-xl flex items-center justify-center border-4 border-white/80 hover:scale-105 transition-transform"
                style={{ width: 80, height: 80, top: '50%', left: '50%', marginTop: -40, marginLeft: -40 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                aria-label="Close menu"
              >
                <Image
                  src="/images/zagrodanewlogo.png"
                  alt="Zagroda Alpakoterapii"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </motion.button>

              {/* Navigation petals — evenly distributed */}
              {navItems.map((item, i) => {
                const rad = (item.angle * Math.PI) / 180
                const r = 140  // radius from centre
                const cx = 180 // centre x of 360px container
                const cy = 180 // centre y
                const px = cx + Math.cos(rad) * r - 36  // subtract half of petal width (72/2)
                const py = cy + Math.sin(rad) * r - 36
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.key}
                    className="absolute"
                    style={{ left: px, top: py, width: 72, height: 72 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: 0.06 + 0.06 * i, type: 'spring', stiffness: 260, damping: 16 }}
                  >
                    <Link
                      href={`/${locale}${item.href}`}
                      onClick={onClose}
                      className="group flex flex-col items-center"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:bg-terracotta-50 group-hover:shadow-xl transition-all duration-200 group-hover:scale-110">
                        <Icon className="w-7 h-7 text-wood group-hover:text-terracotta transition-colors" />
                      </div>
                      <span className="mt-1.5 text-[11px] font-semibold text-white text-center leading-tight whitespace-nowrap drop-shadow-md">
                        {t(item.key)}
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Close hint at bottom */}
            <motion.p
              className="absolute bottom-8 text-white/40 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Tap logo or background to close
            </motion.p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─── Hand-drawn style SVG icons ─── */

function StayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 28V14l11-9 11 9v14H5z" />
      <path d="M13 28v-8h6v8" />
      <path d="M10 17h2m8 0h2" />
    </svg>
  )
}

function AnimalsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 26v-4c0-2 1-3 3-4 2-1 3-2 3-5V8c0-1 1-2 2-2s2 1 2 1v5" />
      <circle cx="18.5" cy="7.5" r="2" />
      <path d="M17 15c2 1 4 2 4 5v6" />
      <path d="M8 26h16" />
      <path d="M19 5l1-2M17 5l-1-2" />
    </svg>
  )
}

function ActivitiesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4l3 6h6l-5 4 2 7-6-4-6 4 2-7-5-4h6l3-6z" />
    </svg>
  )
}

function GiftsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="14" width="22" height="14" rx="2" />
      <rect x="7" y="10" width="18" height="4" rx="1" />
      <line x1="16" y1="10" x2="16" y2="28" />
      <path d="M16 10c-2-3-5-5-7-3s1 5 7 3" />
      <path d="M16 10c2-3 5-5 7-3s-1 5-7 3" />
    </svg>
  )
}

function AdoptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 28s-9-5.5-9-12c0-4 3-6 5.5-6 1.8 0 3 1 3.5 2 .5-1 1.7-2 3.5-2 2.5 0 5.5 2 5.5 6 0 6.5-9 12-9 12z" />
    </svg>
  )
}

function ExploreIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="11" />
      <path d="M19 13l-7 3 3 7 7-3-3-7z" fill="currentColor" fillOpacity="0.15" />
      <path d="M19 13l-7 3 3 7 7-3-3-7z" />
      <line x1="16" y1="4" x2="16" y2="7" />
      <line x1="16" y1="25" x2="16" y2="28" />
      <line x1="4" y1="16" x2="7" y2="16" />
      <line x1="25" y1="16" x2="28" y2="16" />
    </svg>
  )
}
