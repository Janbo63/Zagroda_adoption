'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

export default function AlpacasPageContent() {
  const t = useTranslations('alpacas')
  
  // Create an array of alpaca IDs
  const alpacaIds = ['micky', 'elvis', 'ricky', 'teddy', 'suri', 'freddy']
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('pageTitle')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {alpacaIds.map((alpacaId) => {
          // Safely access translations using optional chaining
          const name = t(`${alpacaId}.name`)
          const character = t(`${alpacaId}.character`)
          const stories = [
            t(`${alpacaId}.stories.0`),
            t(`${alpacaId}.stories.1`)
          ]
          const attributes = {
            age: t(`${alpacaId}.attributes.age`),
            color: t(`${alpacaId}.attributes.color`),
            birthplace: t(`${alpacaId}.attributes.birthplace`)
          }

          return (
            <div key={alpacaId} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">{name}</h2>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">{t('attributes')}</h3>
                <p><span className="font-medium">{t('age')}:</span> {attributes.age} {t('years')}</p>
                <p><span className="font-medium">{t('color')}:</span> {attributes.color}</p>
                <p><span className="font-medium">{t('birthplace')}:</span> {attributes.birthplace}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">{t('character')}</h3>
                <p>{character}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">{t('stories')}</h3>
                <ul className="list-disc list-inside">
                  {stories.map((story, index) => (
                    <li key={index} className="mb-2">{story}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}