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
    <footer className="bg-warmCharcoal text-white/90 pb-bottom-nav">
      <div className="section-divider" />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <Image
              src="/images/zagrodanewlogo.png"
              alt="Zagroda Alpakoterapii Logo"
              width={52}
              height={52}
              className="rounded-xl"
            />
            <div>
              <h3 className="text-lg font-display font-bold mb-1">Zagroda Alpakoterapii</h3>
              <p className="text-sm text-white/60 leading-relaxed">{t('description')}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-display font-bold mb-3">{t('contactUs')}</h3>
            <p className="flex items-center mb-2 text-sm">
              <Phone className="mr-2 text-terracotta-light" size={16} />
              <a href="tel:+48695545330" className="hover:text-terracotta-light transition-colors">+48 695 545 330</a>
            </p>
            <p className="flex items-center text-sm">
              <MapPin className="mr-2 text-terracotta-light" size={16} />
              24 Orłowice, Mirsk 59-630, Poland
            </p>
          </div>
          <div>
            <h3 className="text-lg font-display font-bold mb-3">{t('followUs')}</h3>
            <p className="text-sm text-white/50 mb-3 leading-relaxed italic">
              Follow us to get special offers on <span className="font-semibold text-terracotta-light">stays and events!</span>
            </p>
            <div className="flex gap-3 mb-4">
              <a href="https://www.facebook.com/zagrodaalpakoterapii/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-terracotta/30 flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/zagrodaalpako/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-terracotta/30 flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
            </div>
            <Link href={`/${locale}/privacy`} className="text-xs text-white/40 hover:text-terracotta-light block mb-1 transition-colors">
              {t('privacyPolicy')}
            </Link>
            <Link href={`/${locale}/terms`} className="text-xs text-white/40 hover:text-terracotta-light block transition-colors">
              {t('termsAndConditions')}
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} Zagroda Alpakoterapii. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}