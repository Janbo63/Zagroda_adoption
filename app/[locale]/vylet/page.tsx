import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { JsonLd } from '@/components/JsonLd';
import { LandingPage } from '@/components/LandingPage';
import { vyletCs } from '@/lib/landing/vylet-cs';
import { landingMetadata, landingSchema, resolveContent } from '@/lib/landing/render';

// Czech-only day-trip page. Other locales go to the activities page instead of an untranslated copy.
const SLUG = 'vylet';

type Props = { params: { locale: string } };

export function generateStaticParams() {
    return [{ locale: 'cs' }];
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    if (locale !== 'cs') return {};
    return landingMetadata(await resolveContent(vyletCs, 'cs'), 'cs', SLUG, ['cs']);
}

export default async function VyletPage({ params: { locale } }: Props) {
    if (locale !== 'cs') redirect(`/${locale}/activities`);
    unstable_setRequestLocale(locale);
    const content = await resolveContent(vyletCs, 'cs');
    return (
        <>
            <JsonLd data={landingSchema(content, 'cs', SLUG)} />
            <LandingPage content={content} />
        </>
    );
}
