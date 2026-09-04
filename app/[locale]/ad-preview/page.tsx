import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
    return [
        { locale: 'pl' },
        { locale: 'en' },
        { locale: 'cs' },
        { locale: 'de' },
        { locale: 'nl' },
    ];
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}) {
    return {
        title: 'Podgląd Reklamy — Zagroda Alpakoterapii',
        robots: { index: false, follow: false },
    };
}

export default function AdPreviewPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
        <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4">
            <div className="max-w-xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                        🍂 Kampania Jesień 2026
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Podgląd Reklamy Zagrody
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Tak będzie wyglądać reklama na Facebooku i Instagramie dla gości z Dolnego Śląska i Czech.
                    </p>
                    
                    {/* Market Links */}
                    <div className="flex justify-center gap-2 mt-4">
                        <Link href="/pl/ad-preview" className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${locale === 'pl' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                            🇵🇱 Polski
                        </Link>
                        <Link href="/cs/ad-preview" className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${locale === 'cs' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                            🇨🇿 Čeština
                        </Link>
                        <Link href="/en/ad-preview" className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${locale === 'en' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                            🇬🇧 English
                        </Link>
                    </div>
                </div>

                {/* Facebook Card Mockup */}
                <div className="bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-700 mb-6">
                    {/* Post Header */}
                    <div className="p-3.5 flex items-center gap-3">
                        <div className="w-10 h-10 relative rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                            <Image 
                                src="/images/zagrodanewlogo.png" 
                                alt="Zagroda Alpakoterapii"
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm text-slate-900 flex items-center gap-1">
                                Zagroda Alpakoterapii
                                <span className="text-blue-600 text-xs">✓</span>
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                Sponsorowane · 🌍
                            </div>
                        </div>
                        <div className="text-slate-400 text-lg font-bold">•••</div>
                    </div>

                    {/* Post Copy */}
                    <div className="px-3.5 pb-3 text-sm text-slate-900 leading-relaxed whitespace-pre-line">
                        {locale === 'cs' ? (
                            `Jen kousek za hranicemi v Jizerských horách začíná opravdový podzimní klid… 🍂🦙\n\nPředstavte si procházku zlatým lesem s našimi přátelskými alpakami, útulné ubytování a večery u praskajícího ohně. Zagroda Alpakoterapii v Orłowicích leží jen 20 minut od Frýdlantu a Nového Města pod Smrkem!\n\n🎁 Podzimní akce: Rezervujte si pobyt v září nebo říjnu s kódem Autumn2026 a získejte 10% slevu!\n\nPřijeďte načerpat energii do přírody — těšíme se na vás!`
                        ) : locale === 'en' ? (
                            `Crisp mountain air, golden forest trails, and the sweetest walking companions you could ask for 🦙🍂\n\nAutumn in the Izera Mountains is pure tranquility. Unwind in our cozy farm rooms, take guided alpaca walks through falling leaves, and stargaze by the evening fire.\n\n🎁 Use code Autumn2026 to save 10% on all September & October stays!\nLocated in Orłowice, right on the Polish-Czech border.`
                        ) : (
                            `Wyobraź sobie ten poranek: rześkie górskie powietrze, złote liście na ścieżkach Gór Izerskich, ciepła kawa w dłoni i… spacer z naszymi puszystymi alpakami u boku 🦙🍂\n\nWrzesień i październik to najspokojniejszy, najbardziej magiczny czas w Zagrodzie Alpakoterapii w Orłowicach. Szlaki są puste, lasy mienią się kolorami, a wieczory spędzamy przy trzaskającym ognisku pod rozgwieżdżonym izerskim niebem.\n\n🎁 Jesienny prezent: Zarezerwuj pobyt lub weekend we wrześniu/październiku z kodem Autumn2026 i odbierz 10% rabatu!\n\n📍 Tylko 2h z Wrocławia, 25 min ze Szklarskiej Poręby.\n⚠️ Liczba pokoi jest ograniczona — najpopularniejsze jesienne weekendy szybko znikają!`
                        )}
                    </div>

                    {/* Image */}
                    <div className="relative aspect-square w-full bg-slate-100">
                        <Image
                            src="/images/activities/forest-walk-opt.jpg"
                            alt="Spacer z alpakami w lesie"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    {/* Bottom CTA Bar */}
                    <div className="bg-slate-100 p-3.5 flex items-center justify-between gap-3 border-t border-slate-200">
                        <div className="flex-1 min-w-0">
                            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold truncate">
                                ZAGRODAALPAKOTERAPII.COM
                            </div>
                            <div className="font-bold text-sm text-slate-900 truncate">
                                {locale === 'cs' ? '🍂 Podzimní pobyt s alpakami (-10%)' : locale === 'en' ? '🍂 Mountain Escape with Alpacas (-10%)' : '🍂 Jesienny Reset w Górach z Alpakami (-10%)'}
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                                {locale === 'cs' ? 'Kousek od Frýdlantu • Kód: Autumn2026' : locale === 'en' ? 'Izera Mountains • Code: Autumn2026' : 'Orłowice k. Świeradowa • Kod: Autumn2026'}
                            </div>
                        </div>
                        <Link 
                            href={`/${locale}/jesien?code=Autumn2026`} 
                            className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xs px-3.5 py-2 rounded border border-slate-300 transition-colors flex-shrink-0"
                        >
                            {locale === 'cs' ? 'Rezervovat' : locale === 'en' ? 'Book Now' : 'Zarezerwuj'}
                        </Link>
                    </div>
                </div>

                {/* Test discount button */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
                    <h3 className="font-bold text-base text-white mb-1">Przetestuj zniżkę 10%</h3>
                    <p className="text-slate-400 text-xs mb-4">
                        Kliknij poniżej, aby otworzyć stronę jesienną z automatycznie naliczonym kodem <strong>Autumn2026</strong>:
                    </p>
                    <Link
                        href={`/${locale}/jesien?code=Autumn2026`}
                        className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3 rounded-lg shadow-lg transition-colors"
                    >
                        👉 Otwórz stronę rezerwacji z rabatem (-10%)
                    </Link>
                </div>
            </div>
        </div>
    );
}
