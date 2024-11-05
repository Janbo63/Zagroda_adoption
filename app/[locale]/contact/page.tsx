import { unstable_setRequestLocale } from 'next-intl/server'
import { ContactPageContent } from '@/components/ContactPageContent'

interface ContactPageProps {
  params: { locale: string }
}

export default function ContactPage({ params }: ContactPageProps) {
  unstable_setRequestLocale(params.locale)
  
  return <ContactPageContent locale={params.locale} />
}

export function generateMetadata({ params: { locale } }: ContactPageProps) {
  return {
    title: `Contact - ${locale.toUpperCase()}`,
    description: `Contact us - ${locale.toUpperCase()} version`,
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }]
}
