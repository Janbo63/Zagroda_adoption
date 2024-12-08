'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

const navigation = [
  { key: 'home', href: '/' },
  { key: 'animals', href: '/animals' },
  { key: 'activities', href: '/activities' },
  { key: 'accommodation', href: '/accommodation' },
  { key: 'contact', href: '/contact' },
]

interface NavbarProps {
  locale: string
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('common')
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const currentPath = pathname?.replace(/^\/(en|pl|de|cs)/, '') || ''

  return (
    <nav className="bg-green-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-orange-400 opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex flex-1">
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
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = currentPath === item.href
                return (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href}`}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-orange-400 text-white'
                        : 'border-transparent text-gray-200 hover:border-orange-200 hover:text-white'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right side - Language Switcher */}
          <div className="flex items-center justify-end ml-4 min-w-[260px]">
            <div className="hidden sm:flex">
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button and language switcher */}
            <div className="sm:hidden flex items-center">
              <div className="mr-2">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-gray-300 p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden fixed inset-x-0 top-16 bg-green-800 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isActive = currentPath === item.href
              return (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={`block px-3 py-2 rounded-md text-base font-medium touch-manipulation ${
                    isActive
                      ? 'bg-orange-400 text-white'
                      : 'text-gray-200 hover:bg-orange-400 hover:text-white active:bg-orange-500'
                  }`}
                  onClick={() => setIsOpen(false)}
                  role="button"
                  tabIndex={0}
                >
                  {t(item.key)}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}