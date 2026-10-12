import type { LandingContent } from './types';

/**
 * /cs/vylet — Czech day-trip page (AEO brief, target 28 Oct 2026).
 * Drive times: OSRM free-flow, rounded up to realistic ranges (2026-10-12):
 *   border (Jindřichovice p. S.) 10.3 km/14 min · Frýdlant 21.9 km/26 min · Nové Město p. S. 14 km/25 min
 *   Liberec 42.9 km/50 min · Harrachov 34.8 km/40 min · Jablonec n. N. 54.1 km/60 min · Świeradów-Zdrój 4.2 km/8 min
 * Capsules are 45–60 words each (checked by scripts/check-capsules).
 */
export const vyletCs: LandingContent = {
    meta: {
        title: 'Výlet s dětmi k alpakám – 10 km za hranicí v Jizerských horách | Zagroda Alpakoterapii',
        description:
            'Alpaky a minikozy v polských Orłowicích, 10 km od české hranice. Z Frýdlantu cca 30 min, z Liberce 50–60 min. Krytá stodola, platba kartou i v korunách. Rezervace přes WhatsApp.',
    },
    badge: 'Orłowice · polské Jizerské hory · 10 km od hranice',
    h1: 'Výlet s dětmi k alpakám, kousek za českou hranicí',
    intro:
        'Pohlaďte a nakrmte alpaky a minikozy na rodinné farmě v polských Jizerských horách. Z Frýdlantu jste tu zhruba za půl hodiny, z Liberce do hodiny. Platit můžete kartou i v korunách.',
    image: { src: '/images/activities/meet-alpacas.jpg', alt: 'Děti krmí alpaky na farmě Zagroda Alpakoterapii v Orłowicích' },
    highlights: [
        { title: '10 km od hranice', text: 'Orłowice 24 u Mirska, kousek od Jindřichovic pod Smrkem. U farmy je parkoviště.' },
        { title: 'Pro všechny věky', text: '{meetName}: asi hodina s alpakami a minikozami, vhodné i pro nejmenší děti.' },
        { title: 'I když prší', text: 'Krytá stodola – setkání se zvířaty proběhne za každého počasí.' },
        { title: 'Koruny i karta', text: 'Na farmě platíte kartou nebo hotově v CZK či PLN. Předem i převodem nebo BLIK.' },
    ],
    capsulesTitle: 'Nejčastější otázky českých rodin',
    capsules: [
        {
            q: 'Kam s dětmi na výlet z Liberce do Jizerských hor?',
            a: 'Tip na výlet za hranice: Zagroda Alpakoterapii v polských Orłowicích na severní straně Jizerských hor. Děti si tu pohladí a nakrmí alpaky a minikozy, se staršími dětmi můžete jít na procházku s alpakou. Z Liberce je to autem asi 50–60 minut, z Frýdlantu zhruba půl hodiny. Návštěvu je potřeba předem domluvit.',
        },
        {
            q: 'Jak daleko je alpaka farma od české hranice?',
            a: 'Farma leží v Orłowicích 24 u Mirska, asi 10 km od české hranice u Jindřichovic pod Smrkem, tedy zhruba 15 minut autem. Z Frýdlantu je to cca 22 km (25–30 minut), z Nového Města pod Smrkem 14 km a z Liberce kolem 43 km (50–60 minut). Přímo u farmy můžete zaparkovat.',
        },
        {
            q: 'Co se dá u alpak dělat a jak dlouho to trvá?',
            a: 'Nejoblíbenější je {meetName}: zhruba hodina krmení, hlazení a povídání o alpakách pro skupinu do 6 osob. {walkName} trvají asi 90 minut a jsou pro skupiny do 4 osob s dětmi od 6 let. Pro skupinu do 8 osob připravíme soukromý program na 2–3 hodiny. Vše je po předchozí domluvě.',
        },
        {
            q: 'Pro jak staré děti je návštěva vhodná?',
            a: 'Setkání s alpakami je pro všechny věkové kategorie, přijet mohou i rodiny s úplně malými dětmi. Alpaky jsou klidná a zvědavá zvířata a děti je krmí z ruky pod dohledem našeho průvodce. Procházka s alpakou na vodítku je až od 6 let, protože dítě zvíře samo vede. Kromě alpak u nás potkáte i minikozy.',
        },
        {
            q: 'Dá se u vás platit v korunách nebo kartou?',
            a: 'Ano. Na farmě můžete platit kartou nebo v hotovosti v korunách (CZK) i ve zlotých (PLN). Předem lze zaplatit také bankovním převodem nebo přes BLIK. Při online rezervaci ubytování se cena zobrazuje přímo v korunách a platí se kartou. Cenu výletu vám rádi sdělíme při rezervaci, záleží na programu a velikosti skupiny.',
        },
        {
            q: 'Jak si návštěvu rezervovat? Domluvíme se česky?',
            a: 'Návštěvu si domluvte telefonicky nebo přes WhatsApp na čísle +48 695 545 330, ideálně několik dní předem. Mluvíme polsky a anglicky. Čeština a polština jsou si blízké, takže se s námi čeští hosté obvykle domluví, a jednoduchou zprávu na WhatsApp nám klidně napište česky. Odpovíme polsky nebo anglicky.',
        },
        {
            q: 'Co když prší?',
            a: 'Výlet kvůli dešti rušit nemusíte. Na farmě máme krytou stodolu, takže setkání s alpakami a minikozami proběhne i za nepříznivého počasí. Procházka s alpakami se koná podle počasí, takže pokud je opravdu nevlídno, domluvte se s námi předem. Vezměte dětem pevnou obuv, na pastvině bývá po dešti mokro a blátivo.',
        },
        {
            q: 'Dá se u alpak i přespat?',
            a: 'Ano. Máme tři pokoje: Zahradní a Džunglový pokoj až pro 3 osoby s vlastní koupelnou a Lesní apartmán pro 2 dospělé a 2 děti s vlastní kuchyňkou. Ceny začínají {gardenPrice} {gardenPriceSub}. Minimální pobyt jsou 2 noci. Rezervovat a zaplatit v korunách můžete online na našem webu.',
        },
    ],
    table: {
        title: 'Jak dlouho se k nám jede',
        note: 'Orientační časy jízdy autem bez provozu (OSRM). V zimě a na horských silnicích počítejte s rezervou.',
        headers: ['Odkud', 'Vzdálenost', 'Čas autem'],
        rows: [
            ['Česká hranice (Jindřichovice p. S.)', 'cca 10 km', 'cca 15 min'],
            ['Nové Město pod Smrkem', 'cca 14 km', 'cca 25 min'],
            ['Frýdlant', 'cca 22 km', '25–30 min'],
            ['Harrachov', 'cca 35 km', '40–45 min'],
            ['Liberec', 'cca 43 km', '50–60 min'],
            ['Jablonec nad Nisou', 'cca 54 km', 'cca 60 min'],
        ],
    },
    cta: {
        title: 'Domluvte si návštěvu u alpak',
        text: 'Napište nám na WhatsApp, kdy chcete přijet a kolik vás bude. Termín i cenu vám pošleme zpátky.',
        primary: { label: 'Ubytování a online rezervace', href: '/cs/stay#booking' },
        whatsappLabel: 'Napsat na WhatsApp',
    },
    relatedTitle: 'Mohlo by vás zajímat',
    related: [
        { label: 'Aktivity s alpakami', href: '/cs/activities' },
        { label: 'Rodinný pobyt na farmě', href: '/cs/family-farm-stay' },
        { label: 'Romantický pobyt v horách', href: '/cs/romantic-getaway' },
        { label: 'Tipy na výlety v okolí', href: '/cs/discover' },
        { label: 'Kontakt a mapa', href: '/cs/contact' },
    ],
    breadcrumb: 'Výlet s dětmi k alpakám',
};
