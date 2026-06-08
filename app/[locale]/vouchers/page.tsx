import { VoucherPurchaseFlow } from '@/components/VoucherPurchaseFlow';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

type VouchersPageProps = {
    params: { locale: string };
};

const metaByLocale: Record<string, { title: string; description: string }> = {
    en: {
        title: 'Gift Vouchers — Alpaca Experience Gifts | Zagroda Alpakoterapii',
        description: 'Give the gift of an alpaca experience. Purchase gift vouchers for alpaca walks, therapy sessions, and farm stays at Zagroda Alpakoterapii in the Karkonosze Mountains.',
    },
    pl: {
        title: 'Vouchery Prezentowe — Prezenty z Alpakami | Zagroda Alpakoterapii',
        description: 'Podaruj doświadczenie z alpakami. Kup vouchery na spacery z alpakami, sesje terapeutyczne i noclegi w Zagrodzie Alpakoterapii w Karkonoszach.',
    },
    de: {
        title: 'Geschenkgutscheine — Alpaka-Erlebnis Geschenke | Zagroda Alpakoterapii',
        description: 'Verschenken Sie ein Alpaka-Erlebnis. Gutscheine für Alpaka-Spaziergänge, Therapie und Übernachtungen bei Zagroda Alpakoterapii im Riesengebirge.',
    },
    cs: {
        title: 'Dárkové Poukazy — Zážitky s Alpakami | Zagroda Alpakoterapii',
        description: 'Darujte zážitek s alpakami. Zakupte dárkové poukazy na procházky s alpakami, terapii a ubytování na Zagroda Alpakoterapii v Krkonoších.',
    },
    nl: {
        title: 'Cadeaubonnen — Alpaca-ervaringen Cadeau | Zagroda Alpakoterapii',
        description: 'Geef een alpaca-ervaring cadeau. Koop cadeaubonnen voor alpacawandelingen, therapiesessies en verblijven bij Zagroda Alpakoterapii.',
    },
};

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'pl' }, { locale: 'de' }, { locale: 'cs' }, { locale: 'nl' }];
}

export function generateMetadata({ params: { locale } }: VouchersPageProps): Metadata {
    const meta = metaByLocale[locale] || metaByLocale.en;
    const url = `https://zagrodaalpakoterapii.com/${locale}/vouchers`;

    return {
        title: meta.title,
        description: meta.description,
        alternates: {
            canonical: url,
            languages: {
                en: 'https://zagrodaalpakoterapii.com/en/vouchers',
                pl: 'https://zagrodaalpakoterapii.com/pl/vouchers',
                de: 'https://zagrodaalpakoterapii.com/de/vouchers',
                cs: 'https://zagrodaalpakoterapii.com/cs/vouchers',
                nl: 'https://zagrodaalpakoterapii.com/nl/vouchers',
            },
        },
    }
}

export default function VouchersPage({ params: { locale } }: VouchersPageProps) {
    unstable_setRequestLocale(locale);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="mt-8">
                <VoucherPurchaseFlow locale={locale} />
            </div>
        </div>
    );
}
