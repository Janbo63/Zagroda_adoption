import { CampaignLandingPage } from '@/components/CampaignLandingPage';
import { unstable_setRequestLocale } from 'next-intl/server';

type CampaignPageProps = {
    params: { locale: string };
};

export function generateStaticParams() {
    return [
        { locale: 'nl' },
        { locale: 'de' },
        { locale: 'en' },
        { locale: 'pl' },
        { locale: 'cs' }
    ];
}

export default function WinterVolLiefdePage({ params: { locale } }: CampaignPageProps) {
    unstable_setRequestLocale(locale);

    return (
        <div className="flex flex-col min-h-screen">
            <CampaignLandingPage locale={locale} />
        </div>
    );
}
