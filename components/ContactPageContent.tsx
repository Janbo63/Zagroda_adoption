'use client'

import React from 'react'
import { Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface ContactPageContentProps {
  locale: string;
}

export function ContactPageContent({ locale: _locale }: ContactPageContentProps) {
  const t = useTranslations('contact')
  const phoneNumber = '+48695545330'
  const displayNumber = '+48 695 545 330'

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-700">{t('title')}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2" /> {t('callOrMessage')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-lg">{displayNumber}</p>
              <div className="flex space-x-2">
                <Button asChild variant="outline">
                  <Link href={`tel:${phoneNumber}`}>
                    <Phone className="mr-2 h-4 w-4" /> {t('call')}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2" /> {t('visitUs')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">24 Orłowice</p>
              <p className="text-lg">Mirsk 59-630</p>
              <p className="text-lg">Poland</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('followUs')}</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-4">
              <Button asChild variant="outline">
                <Link href="https://www.facebook.com/zagrodaalpakoterapii/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="mr-2 h-4 w-4" /> Facebook
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="https://www.instagram.com/zagrodaalpako/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-4 w-4" /> Instagram
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="h-[400px] md:h-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2516.769454826891!2d15.375555776580615!3d50.91731827172701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470ee0f0b5d0b3c3%3A0x7c7b6d6a6c6d6c6d!2s24%20Or%C5%82owice%2C%2059-630%20Mirsk%2C%20Poland!5e0!3m2!1sen!2sus!4v1637000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen={true} 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
} 