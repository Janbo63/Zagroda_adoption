'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

export default async function PrivacyPolicy() {
  const t = await useTranslations('privacy')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">{t('intro.p1')}</p>
          <p className="mb-4">{t('intro.p2')}</p>
          <p className="mb-4">{t('intro.p3')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('metaCrawlers.title')}</h2>
          <p className="mb-4">{t('metaCrawlers.content')}</p>
          <ul className="list-disc pl-6 mb-4">
            {t.raw('metaCrawlers.items').map((item: string, index: number) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ul>
          <p className="mb-4">{t('metaCrawlers.dataCollection')}</p>
          <ul className="list-disc pl-6 mb-4">
            {t.raw('metaCrawlers.dataItems').map((item: string, index: number) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ul>
          <p className="mb-4">{t('metaCrawlers.security')}</p>
          <h3 className="text-xl font-semibold mt-6 mb-3">{t('metaCrawlers.technicalRequirements.title')}</h3>
          <p className="mb-4">{t('metaCrawlers.technicalRequirements.content')}</p>
          <ul className="list-disc pl-6 mb-4">
            {t.raw('metaCrawlers.technicalRequirements.items').map((item: string, index: number) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('whoWeAre.title')}</h2>
          <p className="mb-4">{t('whoWeAre.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('messengerData.title')}</h2>
          <p>{t('messengerData.content')}</p>
          <ul className="list-disc pl-6 mt-2">
            {['items.0', 'items.1', 'items.2'].map((key) => (
              <li key={key}>{t(`messengerData.${key}`)}</li>
            ))}
          </ul>
          <p className="mt-4">{t('messengerData.purpose')}</p>
          <ul className="list-disc pl-6 mt-2">
            {['purposeItems.0', 'purposeItems.1', 'purposeItems.2', 'purposeItems.3'].map((key) => (
              <li key={key}>{t(`messengerData.${key}`)}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('dataCollection.title')}</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3 text-primary-500">{t('dataCollection.contactForms.title')}</h3>
          <p>{t('dataCollection.contactForms.content')}</p>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-primary-500">{t('dataCollection.embeddedContent.title')}</h3>
          <p>{t('dataCollection.embeddedContent.p1')}</p>
          <p>{t('dataCollection.embeddedContent.p2')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('dataSharing.title')}</h2>
          <p>{t('dataSharing.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('dataRetention.title')}</h2>
          <p>{t('dataRetention.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('dataDeletion.title')}</h2>
          <p>{t('dataDeletion.content')}</p>
          <ul className="list-disc pl-6 mt-2">
            {['items.0', 'items.1', 'items.2'].map((key) => (
              <li key={key}>{t(`dataDeletion.${key}`)}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('yourRights.title')}</h2>
          <p>{t('yourRights.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-600">{t('contact.title')}</h2>
          <p>{t('contact.content')}</p>
        </section>
      </div>
    </div>
  )
}