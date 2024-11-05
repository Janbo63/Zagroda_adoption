'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Animals', href: '/animals' },
  { name: 'Activities', href: '/activities' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

interface NavbarProps {
  locale: string
}

export function Navbar({ locale }: NavbarProps) {
  const _t = useTranslations('navigation')
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Add a safety check for pathname
  const currentPath = pathname?.replace(/^\/(en|pl)/, '') || ''

  return (
    <nav className="bg-green-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-orange-400 opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/zagrodalogo.png"
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
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-orange-400 text-white'
                        : 'border-transparent text-gray-200 hover:border-orange-200 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Language Switcher */}
          <div className="hidden sm:flex sm:items-center">
            <Link
              href={`/${locale === 'en' ? 'pl' : 'en'}${currentPath}`}
              className="text-white hover:text-orange-200 font-medium"
            >
              {locale === 'en' ? 'PL' : 'EN'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center space-x-4">
            <Link
              href={`/${locale === 'en' ? 'pl' : 'en'}${currentPath}`}
              className="text-white hover:text-orange-200 font-medium"
            >
              {locale === 'en' ? 'PL' : 'EN'}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-gray-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 