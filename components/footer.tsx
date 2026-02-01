import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

type FooterProps = {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer')

  return (
    <footer className="bg-green-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-orange-400 opacity-20"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center">
            <Image
              src="/images/zagrodanewlogo.png"
              alt="Zagroda Alpakoterapii Logo"
              width={60}
              height={60}
              className="mr-4"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">Zagroda Alpakoterapii</h3>
              <p>{t('description')}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contactUs')}</h3>
            <p className="flex items-center mb-2">
              <Phone className="mr-2" size={18} />
              <a href="tel:+48695545330" className="hover:text-orange-200">+48 695 545 330</a>
            </p>
            <p className="flex items-center mb-2">
              <MapPin className="mr-2" size={18} />
              24 Orłowice, Mirsk 59-630, Poland
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('followUs')}</h3>
            <p className="text-sm text-orange-100 mb-4 opacity-90 leading-relaxed italic">
              Follow us to get special offers on <span className="font-bold underline decoration-orange-300">stays and events!</span>
            </p>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.facebook.com/zagrodaalpakoterapii/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200">
                <Facebook size={24} />
              </a>
              <a href="https://www.instagram.com/zagrodaalpako/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200">
                <Instagram size={24} />
              </a>
            </div>
            <Link href={`/${locale}/privacy`} className="text-sm hover:text-orange-200">
              {t('privacyPolicy')}
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p>&copy; {new Date().getFullYear()} Zagroda Alpakoterapii. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}