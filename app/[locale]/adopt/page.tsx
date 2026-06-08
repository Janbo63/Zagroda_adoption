import { unstable_setRequestLocale } from 'next-intl/server'
import { AdoptionPageContent } from '@/components/AdoptionPageContent'
import type { Metadata } from 'next';

interface AdoptPageProps {
    params: { locale: string }
}

const metaByLocale: Record<string, { title: string; description: string }> = {
    en: {
        title: 'Adopt an Alpaca — Virtual Sponsorship | Zagroda Alpakoterapii',
        description: 'Virtually adopt an alpaca at Zagroda Alpakoterapii. Support our alpacas with a sponsorship programme, receive updates, and visit your alpaca anytime.',
    },
    pl: {
        title: 'Adoptuj Alpakę — Wirtualna Adopcja | Zagroda Alpakoterapii',
        description: 'Adoptuj wirtualnie alpakę w Zagrodzie Alpakoterapii. Wspieraj nasze alpaki, otrzymuj aktualizacje i odwiedzaj swoją alpakę w dowolnym momencie.',
    },
    de: {
        title: 'Alpaka Adoptieren — Virtuelle Patenschaft | Zagroda Alpakoterapii',
        description: 'Adoptieren Sie virtuell ein Alpaka bei Zagroda Alpakoterapii. Unterstützen Sie unsere Alpakas mit einem Patenschaftsprogramm.',
    },
    cs: {
        title: 'Adoptujte Alpaku — Virtuální Adopce | Zagroda Alpakoterapii',
        description: 'Virtuálně adoptujte alpaku na Zagroda Alpakoterapii. Podpořte naše alpaky prostřednictvím adopčního programu.',
    },
    nl: {
        title: 'Adopteer een Alpaca — Virtueel Sponsorprogramma | Zagroda Alpakoterapii',
        description: 'Adopteer virtueel een alpaca bij Zagroda Alpakoterapii. Steun onze alpaca\'s met een sponsorprogramma en ontvang updates.',
    },
};

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

export function generateMetadata({ params: { locale } }: AdoptPageProps): Metadata {
    const meta = metaByLocale[locale] || metaByLocale.en;
    const url = `https://zagrodaalpakoterapii.com/${locale}/adopt`;

    return {
        title: meta.title,
        description: meta.description,
        alternates: {
            canonical: url,
            languages: {
                en: 'https://zagrodaalpakoterapii.com/en/adopt',
                pl: 'https://zagrodaalpakoterapii.com/pl/adopt',
                de: 'https://zagrodaalpakoterapii.com/de/adopt',
                cs: 'https://zagrodaalpakoterapii.com/cs/adopt',
                nl: 'https://zagrodaalpakoterapii.com/nl/adopt',
            },
        },
    }
}

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'pl' }, { locale: 'de' }, { locale: 'cs' }, { locale: 'nl' }]
}
