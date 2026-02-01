import { unstable_setRequestLocale } from 'next-intl/server'
import { AdoptionPageContent } from '@/components/AdoptionPageContent'

interface AdoptPageProps {
    params: { locale: string }
}

export default function AdoptPage({ params: { locale } }: AdoptPageProps) {
    unstable_setRequestLocale(locale)

    return (
        <div className="flex flex-col min-h-screen">
            <div className="mt-8">
                <AdoptionPageContent />
            </div>
        </div>
    )
}

export function generateMetadata({ params: { locale } }: AdoptPageProps) {
    return {
        title: locale === 'pl' ? 'Adoptuj Alpakę - Zagroda Alpakoterapii' : 'Adopt an Alpaca',
        description: locale === 'pl' ? 'Dołącz do naszego programu adopcji wirtualnej i wspieraj nasze alpaki.' : 'Join our virtual adoption program and support our alpacas.',
    }
}

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'pl' }, { locale: 'de' }, { locale: 'cs' }]
}
