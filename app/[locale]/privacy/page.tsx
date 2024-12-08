'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

export default function PrivacyPolicy() {
  const t = useTranslations('privacy')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-primary-700">{t('title')}</h1>
      <div className="prose max-w-none space-y-6">
        <div className="space-y-4">
          <p>{t('intro.p1')}</p>
          <p>{t('intro.p2')}</p>
          <p>{t('intro.p3')}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('whoWeAre.title')}</h2>
          <p>{t('whoWeAre.content')}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('dataCollection.title')}</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3 text-primary-500">{t('dataCollection.contactForms.title')}</h3>
          <p>{t('dataCollection.contactForms.content')}</p>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-primary-500">{t('dataCollection.embeddedContent.title')}</h3>
          <p>{t('dataCollection.embeddedContent.p1')}</p>
          <p>{t('dataCollection.embeddedContent.p2')}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('dataSharing.title')}</h2>
          <p>{t('dataSharing.content')}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('dataRetention.title')}</h2>
          <p>{t('dataRetention.content')}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('yourRights.title')}</h2>
          <p>{t('yourRights.content')}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('contact.title')}</h2>
          <p>{t('contact.content')}</p>
        </div>
      </div>
    </div>
  )
}