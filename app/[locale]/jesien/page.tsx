import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
    return [
        { locale: 'pl' },
        { locale: 'en' },
        { locale: 'nl' },
        { locale: 'de' },
        { locale: 'cs' },
    ];
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}) {
    const t = await getTranslations({ locale, namespace: 'autumn' });
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
    };
}

export default async function AutumnPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'autumn' });

    return (
        <div className="bg-stone-950 text-stone-100 min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden px-4">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/activities/forest-walk-opt.jpg"
                        alt="Walking with alpacas in autumn forest at Zagroda"
                        fill
                        priority
                        className="object-cover opacity-90 object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/30 to-stone-950" />
                </div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center mt-6 bg-stone-950/70 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-stone-800/70 shadow-2xl">
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-900/60 text-emerald-400 border border-emerald-700/60 text-sm font-medium mb-6">
                        {t('badge')}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-50 mb-6 tracking-tight drop-shadow-md">
                        {t('heroTitle')}
                    </h1>
                    <p className="text-xl text-stone-200 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow">
                        {t('heroSubtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`/${locale}/stay?code=Autumn2026`} className="bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-medium transition-colors text-lg shadow-lg hover:shadow-emerald-900/50">
                            {t('ctaBook')}
                        </Link>
                        <Link href="#activities" className="bg-stone-800/90 hover:bg-stone-700 text-stone-200 px-8 py-4 rounded-lg font-medium transition-colors border border-stone-700 text-lg">
                            {t('ctaActivities')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Activities Section */}
            <section id="activities" className="py-20 bg-stone-900 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-50 mb-4">{t('activitiesTitle')}</h2>
                        <p className="text-stone-400 text-lg">{t('activitiesSubtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ActivityCard 
                            title={t('activity1Title')} 
                            desc={t('activity1Desc')}
                            icon="🦙"
                        />
                        <ActivityCard 
                            title={t('activity2Title')} 
                            desc={t('activity2Desc')}
                            icon="🥾"
                        />
                        <ActivityCard 
                            title={t('activity3Title')} 
                            desc={t('activity3Desc')}
                            icon="🗼"
                        />
                        <ActivityCard 
                            title={t('activity4Title')} 
                            desc={t('activity4Desc')}
                            icon="🍄"
                        />
                        <ActivityCard 
                            title={t('activity5Title')} 
                            desc={t('activity5Desc')}
                            icon="🔥"
                        />
                        <ActivityCard 
                            title={t('activity6Title')} 
                            desc={t('activity6Desc')}
                            icon="✨"
                        />
                    </div>
                </div>
            </section>

            {/* Rooms Section */}
            <section className="py-20 bg-stone-950 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-50 mb-4">{t('roomsTitle')}</h2>
                        <p className="text-stone-400 text-lg">{t('roomsSubtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <RoomCard 
                            name={t('roomGardenName')}
                            price={t('roomGardenPrice')}
                            desc={t('roomGardenDesc')}
                            locale={locale}
                            ctaText={t('viewRoom')}
                        />
                        <RoomCard 
                            name={t('roomJungleName')}
                            price={t('roomJunglePrice')}
                            desc={t('roomJungleDesc')}
                            locale={locale}
                            highlight={true}
                            popularBadge={t('mostPopular')}
                            ctaText={t('viewRoom')}
                        />
                        <RoomCard 
                            name={t('roomForestName')}
                            price={t('roomForestPrice')}
                            desc={t('roomForestDesc')}
                            locale={locale}
                            ctaText={t('viewRoom')}
                        />
                    </div>
                </div>
            </section>

            {/* Key Dates Section */}
            <section className="py-20 bg-stone-900 border-t border-stone-800 px-4">
                <div className="max-w-4xl mx-auto bg-stone-950 p-8 rounded-2xl border border-stone-800">
                    <h3 className="text-2xl font-serif font-bold text-emerald-400 mb-6 text-center">{t('holidaysTitle')}</h3>
                    <ul className="space-y-4 text-stone-300">
                        <li className="flex justify-between items-center pb-4 border-b border-stone-800">
                            <span>{t('holiday1')}</span>
                            <span className="text-sm bg-stone-800 px-3 py-1 rounded">{t('holiday1Tag')}</span>
                        </li>
                        <li className="flex justify-between items-center pb-4 border-b border-stone-800">
                            <span>{t('holiday2')}</span>
                            <span className="text-sm bg-stone-800 px-3 py-1 rounded">{t('holiday2Tag')}</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span>{t('holiday3')}</span>
                            <span className="text-sm bg-stone-800 px-3 py-1 rounded">{t('holiday3Tag')}</span>
                        </li>
                    </ul>
                    <div className="mt-8 text-center">
                        <Link href={`/${locale}/stay?code=Autumn2026`} className="inline-block bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                            {t('checkAvailability')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ActivityCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
    return (
        <div className="bg-stone-800 p-6 rounded-xl border border-stone-700 hover:border-emerald-700 transition-colors">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-stone-100 mb-2">{title}</h3>
            <p className="text-stone-400 leading-relaxed">{desc}</p>
        </div>
    );
}

function RoomCard({ name, price, desc, locale, highlight = false, popularBadge = 'Most Popular', ctaText = 'View Room' }: { name: string, price: string, desc: string, locale: string, highlight?: boolean, popularBadge?: string, ctaText?: string }) {
    return (
        <div className={`p-6 rounded-xl border flex flex-col h-full ${highlight ? 'bg-stone-900 border-emerald-800 relative' : 'bg-stone-900 border-stone-800'}`}>
            {highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-700 text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider">
                    {popularBadge}
                </div>
            )}
            <h3 className="text-2xl font-serif font-bold text-stone-100 mb-2">{name}</h3>
            <div className="text-emerald-400 font-medium mb-4">{price}</div>
            <p className="text-stone-400 flex-grow mb-6">{desc}</p>
            <Link href={`/${locale}/stay?code=Autumn2026`} className="block text-center bg-stone-800 hover:bg-stone-700 text-stone-200 py-3 rounded-lg font-medium transition-colors border border-stone-700 w-full">
                {ctaText}
            </Link>
        </div>
    );
}
