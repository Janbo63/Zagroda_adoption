import { unstable_setRequestLocale } from 'next-intl/server';
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
    return {
        title: 'Autumn in Zagroda Alpakoterapii - 10% OFF',
        description: 'Enjoy a cozy autumn stay in the Izera Mountains with alpacas, mountain hiking, bonfire evenings, and stargazing. 10% off with code AUTUMN2026.',
    };
}

export default function AutumnPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
        <div className="bg-stone-950 text-stone-100 min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden px-4">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/activities/forest-walk-autumn.jpg"
                        alt="Walking with alpacas in autumn forest at Zagroda"
                        fill
                        priority
                        className="object-cover opacity-35"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/60 to-stone-950" />
                </div>
                
                <div className="relative z-10 max-w-5xl mx-auto text-center mt-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-900/50 text-emerald-400 border border-emerald-800 text-sm font-medium mb-6">
                        Autumn 2026 Special • 10% OFF
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-50 mb-6 tracking-tight">
                        Experience the Magic of Autumn in the Izera Mountains
                    </h1>
                    <p className="text-xl text-stone-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Cozy rooms, golden forests, alpaca walks, and evening bonfires. Book your September or October getaway with code <strong className="text-emerald-400">Autumn2026</strong> for 10% off.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`/${locale}/stay?code=Autumn2026`} className="bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-medium transition-colors text-lg shadow-lg hover:shadow-emerald-900/50">
                            Book Your Stay with 10% OFF
                        </Link>
                        <Link href="#activities" className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-8 py-4 rounded-lg font-medium transition-colors border border-stone-700 text-lg">
                            Explore Activities
                        </Link>
                    </div>
                </div>
            </section>

            {/* Activities Section */}
            <section id="activities" className="py-20 bg-stone-900 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-50 mb-4">Autumn Activities</h2>
                        <p className="text-stone-400 text-lg">Make the most of the golden season at our farm and in the mountains.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ActivityCard 
                            title="Alpaca Walks & Feeding" 
                            desc="Start your morning with our gentle alpacas. The crisp autumn air makes them extra playful."
                            icon="🦙"
                        />
                        <ActivityCard 
                            title="Mountain Hiking" 
                            desc="Hike to Stóg Izerski in fall colors. The trails are less crowded and the views are spectacular."
                            icon="🥾"
                        />
                        <ActivityCard 
                            title="Sky Walk" 
                            desc="Visit the Świeradów-Zdrój observation tower and see the endless golden canopy from above."
                            icon="🗼"
                        />
                        <ActivityCard 
                            title="Mushroom Foraging" 
                            desc="The nearby forests are a paradise for mushroom foragers during autumn."
                            icon="🍄"
                        />
                        <ActivityCard 
                            title="Bonfire Evenings" 
                            desc="Warm up by the fire after a long day of hiking. Perfect for roasting marshmallows."
                            icon="🔥"
                        />
                        <ActivityCard 
                            title="Dark Sky Park" 
                            desc="Enjoy world-class stargazing in the Izera Dark Sky Park on clear autumn nights."
                            icon="✨"
                        />
                    </div>
                </div>
            </section>

            {/* Rooms Section */}
            <section className="py-20 bg-stone-950 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-50 mb-4">Cozy Autumn Accommodations</h2>
                        <p className="text-stone-400 text-lg">Your mountain retreat awaits in Orłowice, right on the Czech border.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <RoomCard 
                            name="Garden Room"
                            price="320 PLN / night"
                            desc="Intimate and cozy, perfect for couples. Direct access to the garden and alpaca views."
                            locale={locale}
                        />
                        <RoomCard 
                            name="Jungle Room"
                            price="350 PLN / night"
                            desc="Spacious and vibrant. A favorite for small families looking for an autumn escape."
                            locale={locale}
                            highlight={true}
                        />
                        <RoomCard 
                            name="Forest Apartment"
                            price="400 PLN / night"
                            desc="Our largest offering with its own cooking area. Ideal for longer stays and complete privacy."
                            locale={locale}
                        />
                    </div>
                </div>
            </section>

            {/* Key Dates Section */}
            <section className="py-20 bg-stone-900 border-t border-stone-800 px-4">
                <div className="max-w-4xl mx-auto bg-stone-950 p-8 rounded-2xl border border-stone-800">
                    <h3 className="text-2xl font-serif font-bold text-emerald-400 mb-6 text-center">Plan Around Key Autumn Holidays</h3>
                    <ul className="space-y-4 text-stone-300">
                        <li className="flex justify-between items-center pb-4 border-b border-stone-800">
                            <span><strong>Sep 28</strong> — St. Wenceslas Day (CZ)</span>
                            <span className="text-sm bg-stone-800 px-3 py-1 rounded">Book early!</span>
                        </li>
                        <li className="flex justify-between items-center pb-4 border-b border-stone-800">
                            <span><strong>Oct 28 - Nov 1</strong> — Autumn Holidays (CZ)</span>
                            <span className="text-sm bg-stone-800 px-3 py-1 rounded">Family Favorite</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span><strong>Nov 11</strong> — Independence Day (PL)</span>
                            <span className="text-sm bg-stone-800 px-3 py-1 rounded">Long Weekend</span>
                        </li>
                    </ul>
                    <div className="mt-8 text-center">
                        <Link href={`/${locale}/stay?code=Autumn2026`} className="inline-block bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                            Check Availability Now (10% OFF)
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

function RoomCard({ name, price, desc, locale, highlight = false }: { name: string, price: string, desc: string, locale: string, highlight?: boolean }) {
    return (
        <div className={`p-6 rounded-xl border flex flex-col h-full ${highlight ? 'bg-stone-900 border-emerald-800 relative' : 'bg-stone-900 border-stone-800'}`}>
            {highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-700 text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider">
                    Most Popular
                </div>
            )}
            <h3 className="text-2xl font-serif font-bold text-stone-100 mb-2">{name}</h3>
            <div className="text-emerald-400 font-medium mb-4">{price}</div>
            <p className="text-stone-400 flex-grow mb-6">{desc}</p>
            <Link href={`/${locale}/stay?code=Autumn2026`} className="block text-center bg-stone-800 hover:bg-stone-700 text-stone-200 py-3 rounded-lg font-medium transition-colors border border-stone-700 w-full">
                View Room (10% OFF)
            </Link>
        </div>
    );
}
