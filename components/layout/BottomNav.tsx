'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

interface BottomNavProps {
  locale: string
}

const items = [
  { key: 'home', href: '/', icon: HomeIcon },
  { key: 'stay', href: '/stay', icon: StayIcon },
  { key: 'explore', href: '/discover', icon: ExploreIcon },
  { key: 'adopt', href: '/adopt', icon: AdoptIcon },
  { key: 'gifts', href: '/vouchers', icon: GiftsIcon },
]

export function BottomNav({ locale }: BottomNavProps) {
  const pathname = usePathname()
  const currentPath = pathname?.replace(/^\/(en|pl|de|cs|nl)/, '') || ''

  return (
    <motion.div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 sm:hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
    >
      <nav className="flex items-center gap-1 bg-warmCharcoal/90 backdrop-blur-lg rounded-full px-3 py-2 shadow-xl border border-white/10">
        {items.map((item) => {
          const isActive = item.href === '/'
            ? currentPath === '' || currentPath === '/'
            : currentPath.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-terracotta text-white scale-110'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <motion.div
                  className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-white"
                  layoutId="bottomNavDot"
                />
              )}
            </Link>
          )
        })}
      </nav>
    </motion.div>
  )
}

/* ─── Compact icons ─── */

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  )
}

function StayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21V10l9-7 9 7v11H3z" />
      <path d="M9 21v-6h6v6" />
    </svg>
  )
}

function ExploreIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M14 10l-5 2 2 5 5-2-2-5z" />
    </svg>
  )
}

function AdoptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-4-7-9.5c0-3 2.5-4.5 4-4.5 1.2 0 2.3.8 3 1.8.7-1 1.8-1.8 3-1.8 1.5 0 4 1.5 4 4.5 0 5.5-7 9.5-7 9.5z" />
    </svg>
  )
}

function GiftsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="10" width="18" height="12" rx="1.5" />
      <rect x="5" y="7" width="14" height="3" rx="1" />
      <line x1="12" y1="7" x2="12" y2="22" />
      <path d="M12 7c-1.5-2-4-3.5-5-2s1 4 5 2" />
      <path d="M12 7c1.5-2 4-3.5 5-2s-1 4-5 2" />
    </svg>
  )
}
