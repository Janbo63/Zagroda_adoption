import { redirect } from 'next/navigation';

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
    redirect(`/${locale}/welkom`);
}
