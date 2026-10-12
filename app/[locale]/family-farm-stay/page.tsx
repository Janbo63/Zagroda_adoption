import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { JsonLd } from '@/components/JsonLd';
import { LandingPage } from '@/components/LandingPage';
import { familyFarmStay } from '@/lib/landing/family';
import { CLUSTER_LOCALES, landingMetadata, landingSchema, resolveContent } from '@/lib/landing/render';

const SLUG = 'family-farm-stay';

type Props = { params: { locale: string } };

export function generateStaticParams() {
    return CLUSTER_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    const raw = familyFarmStay[locale];
    if (!raw) return {};
    return landingMetadata(await resolveContent(raw, locale), locale, SLUG, CLUSTER_LOCALES);
}

export default async function FamilyFarmStayPage({ params: { locale } }: Props) {
    const raw = familyFarmStay[locale];
    if (!raw) notFound();
    unstable_setRequestLocale(locale);
    const content = await resolveContent(raw, locale);
    return (
        <>
            <JsonLd data={landingSchema(content, locale, SLUG)} />
            <LandingPage content={content} />
        </>
    );
}
