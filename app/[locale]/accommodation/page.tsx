import { unstable_setRequestLocale } from 'next-intl/server'

interface AccommodationPageProps {
  params: { locale: string }
}

export default function AccommodationPage({ params: { locale } }: AccommodationPageProps) {
  unstable_setRequestLocale(locale)
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 mt-16">
        <iframe 
          src="https://beds24.com/booking2.php?propid=	98031&referer=iFrame" 
          width="100%" 
          height="800" 
          style={{ border: 'none', maxWidth: '100%', overflow: 'auto' }}
          title="Booking System"
        />
      </div>
    </div>
  )
}

export function generateMetadata({ params: { locale } }: AccommodationPageProps) {
  return {
    title: `Accommodation - ${locale.toUpperCase()}`,
    description: `Book your stay - ${locale.toUpperCase()} version`,
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }]
}
