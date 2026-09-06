'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { AmbientSoundToggle } from './AmbientSoundToggle'

const navigation = [
  { key: 'home', href: '/' },
  { key: 'animals', href: '/animals' },
  { key: 'activities', href: '/activities' },
  { key: 'adoption', href: '/adopt' },
  { key: 'vouchers', href: '/vouchers' },
  { key: 'contact', href: '/contact' },
]

interface NavbarProps {
  locale: string
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('common')
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const currentPath = pathname?.replace(/^\/(en|pl|de|cs|nl)/, '') || ''
  const isAccomActive = currentPath === '/stay' || currentPath === '/discover'

  return (
    <nav className="bg-green-800 text-white relative z-50">
      <div className="absolute inset-0 bg-orange-400 opacity-20 pointer-events-none overflow-hidden" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between py-2 sm:h-16">

          {/* Logo */}
          <div className="flex flex-1 items-center justify-between sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href={`/${locale}`} className="flex items-center">
                <Image
                  src="/images/zagrodanewlogo.png"
                  alt="Zagroda Alpakoterapii Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-xl font-bold">Zagroda Alpakoterapii</span>
              </Link>
            </div>
            <div className="sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {/* Home, Animals, Activities */}
            {navigation.slice(0, 3).map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${currentPath === item.href
                    ? 'border-orange-400 text-white'
                    : 'border-transparent text-gray-200 hover:border-orange-200 hover:text-white'
                  }`}
              >
                {t(item.key)}
              </Link>
            ))}

            {/* Accommodation dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`inline-flex items-center gap-1 px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer ${isAccomActive
                    ? 'border-orange-400 text-white'
                    : 'border-transparent text-gray-200 hover:border-orange-200 hover:text-white'
                  }`}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                {t('accommodation')}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-150 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-white rounded-xl shadow-2xl ring-1 ring-black/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href={`/${locale}/stay`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                  >
                    <span>🏡</span> {t('stayWithUs')}
                  </Link>
                  <div className="border-t border-gray-100" />
                  <Link
                    href={`/${locale}/discover`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                  >
                    <span>🗺️</span> {t('exploreTheArea')}
                  </Link>
                  <div className="border-t border-gray-100" />
                  <Link
                    href={`/${locale}/workation`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                  >
                    <span>💻</span> Workation & Reset
                  </Link>
                </div>
              )}
            </div>

            {/* Adopt, Vouchers, Contact */}
            {navigation.slice(3).map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${currentPath === item.href
                    ? 'border-orange-400 text-white'
                    : 'border-transparent text-gray-200 hover:border-orange-200 hover:text-white'
                  }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Book Now CTA + Language + Sound */}
          <div className="flex items-center justify-center sm:justify-end mt-2 sm:mt-0 sm:ml-8 gap-4">
            <Link
              href={`/${locale}/stay`}
              className="hidden sm:inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-full text-sm transition-colors shadow-md hover:shadow-lg"
            >
              🏡 {t('bookStay')}
            </Link>
            <AmbientSoundToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden fixed inset-x-0 top-16 bg-green-800 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile booking CTA — top of menu for maximum visibility */}
            <Link
              href={`/${locale}/stay`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-base font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors touch-manipulation shadow-md mb-2"
            >
              🏡 {t('bookStay')}
            </Link>

            {navigation.slice(0, 3).map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium touch-manipulation ${currentPath === item.href
                    ? 'bg-orange-400 text-white'
                    : 'text-gray-200 hover:bg-orange-400 hover:text-white'
                  }`}
              >
                {t(item.key)}
              </Link>
            ))}

            {/* Mobile Accommodation group */}
            <div className="px-3 pt-2 pb-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1">
                {t('accommodation')}
              </p>
              <Link
                href={`/${locale}/stay`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 py-2 pl-2 text-gray-200 hover:text-white text-base font-medium"
              >
                <span>🏡</span> {t('stayWithUs')}
              </Link>
              <Link
                href={`/${locale}/discover`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 py-2 pl-2 text-gray-200 hover:text-white text-base font-medium"
              >
                <span>🗺️</span> {t('exploreTheArea')}
              </Link>
            </div>

            {navigation.slice(3).map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium touch-manipulation ${currentPath === item.href
                    ? 'bg-orange-400 text-white'
                    : 'text-gray-200 hover:bg-orange-400 hover:text-white'
                  }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}