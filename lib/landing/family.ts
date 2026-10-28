import type { LandingContent } from './types';

/**
 * /{locale}/family-farm-stay — families cluster page (AEO brief, target 4 Nov 2026).
 * Owner-confirmed hooks only: Forest Apartment 2+2 with cooking area, Meet the Alpacas
 * included in room price (stay.rooms.*.priceSub), mini goats, covered barn, parking.
 * Activity facts from messages activities.*.attributes (all ages / walks 6+ / up to 4).
 */
export const familyFarmStay: Record<string, LandingContent> = {
    en: {
        meta: {
            title: 'Family Farm Stay with Alpacas & Mini Goats – Izera Mountains | Zagroda Alpakoterapii',
            description: 'Stay on a family-run alpaca farm in Orłowice near Świeradów-Zdrój: Forest Apartment for up to 3 guests, Meet the Alpacas for all ages, mini goats and a covered barn for rainy days.',
        },
        badge: 'Orłowice · Izera Mountains · near Świeradów-Zdrój',
        h1: 'A family farm stay where the alpacas are part of the holiday',
        intro: 'Children feed alpacas and mini goats, you get a self-catering apartment and the mountains on the doorstep. A small, family-run alternative to big hotel resorts in the Izera Mountains.',
        image: { src: '/images/Rooms/apartment1.jpg', alt: 'Forest Apartment for families at Zagroda Alpakoterapii' },
        highlights: [
            { title: '{meetName} included', text: 'Room prices include {meetName}: about an hour with the alpacas.' },
            { title: 'Room for the family', text: '{forestName} for up to 3 guests, with its own cooking area.' },
            { title: 'Rainy-day plan', text: 'A covered barn, so time with the animals happens in any weather.' },
            { title: 'Easy arrival', text: 'Parking at the farm, 8 minutes from Świeradów-Zdrój.' },
        ],
        capsulesTitle: 'Questions parents ask us',
        capsules: [
            { q: 'Where can we stay with kids on a farm in the Izera Mountains?', a: 'Zagroda Alpakoterapii in Orłowice, eight minutes from Świeradów-Zdrój, is a family-run alpaca farm with three guest rooms. For families we recommend the {forestName} for up to three guests, which has its own cooking area and looks out onto the alpaca garden. Every stay includes {meetName}, about an hour with the alpacas.' },
            { q: 'What can children do with the animals?', a: 'During {meetName} children feed and stroke the alpacas under our guide’s supervision, and they also meet our mini goats. It suits all ages, including toddlers. From six years old, children can lead an alpaca themselves on an alpaca walk of about 90 minutes through the meadows, in a group of up to four people.' },
            { q: 'What if it rains during our stay?', a: 'We have a covered barn, so meeting the alpacas and mini goats works in any weather. Alpaca walks depend on the weather, so check the forecast and tell us when you would like to go. Nearby rainy-day options include the thermal baths in Świeradów-Zdrój, eight minutes away, and Czocha Castle, under an hour’s drive.' },
            { q: 'How much does a family stay cost, and what is included?', a: 'The {forestName} for up to three guests starts {forestPrice} {forestPriceSub}. The minimum stay is two nights, with check-in from 15:00 and check-out by 11:00. You book and pay online by card in your own currency. Extra activities, such as alpaca walks, are priced on request.' },
            { q: 'Is it a better choice than a family hotel resort?', a: 'It is a different choice. Resorts have pools, kids’ clubs and restaurants on site, which we do not. Here children get real time with animals, space outdoors and a quiet farm instead of crowded corridors. You can easily combine both: farm days with the alpacas and an afternoon at the thermal baths in nearby Świeradów-Zdrój.' },
        ],
        comparison: {
            title: 'Farm stay or family hotel?',
            intro: 'An honest comparison for parents.',
            headers: ['', 'Zagroda Alpakoterapii', 'Typical family hotel / resort'],
            rows: [
                ['Size', 'Three guest rooms, family-run', 'Large and busy'],
                ['For children', 'Feeding alpacas and mini goats, walks from age 6', 'Kids’ club, playground, pools'],
                ['Rainy days', 'Covered barn; Świeradów thermal baths 8 min away', 'Indoor pool on site'],
                ['Meals', 'Own cooking area in the apartment', 'Restaurant / buffet'],
                ['Space', 'Farm, pasture and mountains all around', 'Hotel grounds'],
            ],
        },
        cta: {
            title: 'Book your family stay',
            text: 'Check available dates online. We will arrange an alpaca walk or a programme for a larger group with you on WhatsApp.',
            primary: { label: 'Check availability', href: '/en/stay#booking' },
            whatsappLabel: 'Message us on WhatsApp',
        },
        relatedTitle: 'You might also like',
        related: [
            { label: 'Romantic mountain getaway', href: '/en/romantic-getaway' },
            { label: 'Alpaca activities', href: '/en/activities' },
            { label: 'Our animals', href: '/en/animals' },
            { label: 'Adopt an alpaca', href: '/en/adopt' },
            { label: 'Explore the area', href: '/en/discover' },
        ],
        breadcrumb: 'Family farm stay',
    },

    pl: {
        meta: {
            title: 'Rodzinny pobyt na farmie z alpakami i minikozami – Góry Izerskie | Zagroda Alpakoterapii',
            description: 'Pobyt na rodzinnej farmie alpak w Orłowicach koło Świeradowa-Zdroju: apartament dla maksymalnie 3 osób, spotkanie z alpakami dla każdego wieku, minikozy i kryta stodoła na deszczowe dni.',
        },
        badge: 'Orłowice · Góry Izerskie · koło Świeradowa-Zdroju',
        h1: 'Rodzinny pobyt na farmie, gdzie alpaki są częścią wakacji',
        intro: 'Dzieci karmią alpaki i minikozy, Wy macie apartament z aneksem kuchennym i góry na wyciągnięcie ręki. Kameralna, rodzinna alternatywa dla dużych hoteli w Górach Izerskich.',
        image: { src: '/images/Rooms/apartment1.jpg', alt: 'Leśny Apartament dla rodzin w Zagrodzie Alpakoterapii' },
        highlights: [
            { title: '{meetName} w cenie', text: 'Ceny pokoi obejmują {meetName} – ok. godzinę z alpakami.' },
            { title: 'Miejsce dla rodziny', text: '{forestName} dla maksymalnie 3 osób z własnym aneksem kuchennym.' },
            { title: 'Plan na deszcz', text: 'Kryta stodoła – czas ze zwierzętami bez względu na pogodę.' },
            { title: 'Łatwy dojazd', text: 'Parking na farmie, 8 minut od Świeradowa-Zdroju.' },
        ],
        capsulesTitle: 'Pytania, które zadają rodzice',
        capsules: [
            { q: 'Gdzie na pobyt z dziećmi na farmie w Górach Izerskich?', a: 'Zagroda Alpakoterapii w Orłowicach, 8 minut od Świeradowa-Zdroju, to rodzinna farma alpak z trzema pokojami gościnnymi. Rodzinom polecamy {forestName} dla maksymalnie trzech osób – z własnym aneksem kuchennym i widokiem na ogród z alpakami. Każdy pobyt obejmuje spotkanie „{meetName}”, czyli mniej więcej godzinę z alpakami.' },
            { q: 'Co dzieci mogą robić ze zwierzętami?', a: 'Podczas spotkania z alpakami dzieci karmią je i głaszczą pod okiem naszego przewodnika, a do tego poznają nasze minikozy. To zajęcie dla każdego wieku, także dla maluchów. Od szóstego roku życia dzieci mogą same prowadzić alpakę na spacerze, który trwa około 90 minut po łąkach, w grupie do czterech osób.' },
            { q: 'Co robić, gdy pada deszcz?', a: 'Mamy krytą stodołę, więc spotkanie z alpakami i minikozami odbywa się przy każdej pogodzie. Spacery z alpakami zależą od pogody – sprawdźcie prognozę i dajcie nam znać, kiedy chcecie iść. W okolicy na deszczowy dzień sprawdzą się baseny termalne w Świeradowie-Zdroju (8 minut) oraz Zamek Czocha, niecałą godzinę jazdy.' },
            { q: 'Ile kosztuje pobyt rodzinny i co jest w cenie?', a: '{forestName} dla maksymalnie trzech osób kosztuje {forestPrice} {forestPriceSub}. Minimalny pobyt to dwie noce, zameldowanie od 15:00, wymeldowanie do 11:00. Rezerwujecie i płacicie online kartą w swojej walucie. Dodatkowe atrakcje, na przykład spacery z alpakami, wyceniamy indywidualnie na zapytanie.' },
            { q: 'Czy to lepszy wybór niż rodzinny hotel z basenem?', a: 'To po prostu inny wybór. Resorty mają na miejscu baseny, kluby dla dzieci i restauracje – my nie. U nas dzieci spędzają prawdziwy czas ze zwierzętami, na świeżym powietrzu i w ciszy zamiast w zatłoczonych korytarzach. Łatwo połączyć jedno z drugim: dni na farmie z alpakami i popołudnie na basenach w pobliskim Świeradowie-Zdroju.' },
        ],
        comparison: {
            title: 'Farma czy hotel rodzinny?',
            intro: 'Uczciwe porównanie dla rodziców.',
            headers: ['', 'Zagroda Alpakoterapii', 'Typowy hotel rodzinny / resort'],
            rows: [
                ['Wielkość', 'Trzy pokoje, rodzinne gospodarstwo', 'Duży i gwarny'],
                ['Dla dzieci', 'Karmienie alpak i minikóz, spacery od 6 lat', 'Klub dziecięcy, plac zabaw, baseny'],
                ['Deszczowe dni', 'Kryta stodoła; baseny w Świeradowie 8 min', 'Kryty basen na miejscu'],
                ['Posiłki', 'Własny aneks kuchenny w apartamencie', 'Restauracja / bufet'],
                ['Przestrzeń', 'Farma, pastwisko i góry dookoła', 'Teren hotelu'],
            ],
        },
        cta: {
            title: 'Zarezerwujcie rodzinny pobyt',
            text: 'Sprawdźcie wolne terminy online. Spacer z alpakami albo program dla większej grupy ustalimy z Wami przez WhatsApp.',
            primary: { label: 'Sprawdź dostępność', href: '/pl/stay#booking' },
            whatsappLabel: 'Napisz na WhatsApp',
        },
        relatedTitle: 'Może Was zainteresować',
        related: [
            { label: 'Romantyczny weekend w górach', href: '/pl/romantic-getaway' },
            { label: 'Atrakcje z alpakami', href: '/pl/activities' },
            { label: 'Nasze zwierzęta', href: '/pl/animals' },
            { label: 'Adopcja alpaki', href: '/pl/adopt' },
            { label: 'Okolica', href: '/pl/discover' },
        ],
        breadcrumb: 'Rodzinny pobyt na farmie',
    },

    cs: {
        meta: {
            title: 'Rodinný pobyt na farmě s alpakami a minikozami – Jizerské hory | Zagroda Alpakoterapii',
            description: 'Pobyt na rodinné alpačí farmě v polských Orłowicích, 10 km od české hranice: apartmán pro až 3 osoby, setkání s alpakami pro všechny věky, minikozy a krytá stodola pro deštivé dny.',
        },
        badge: 'Orłowice · polské Jizerské hory · 10 km od hranice',
        h1: 'Rodinný pobyt na farmě, kde jsou alpaky součástí dovolené',
        intro: 'Děti krmí alpaky a minikozy, vy máte apartmán s kuchyňkou a hory hned za domem. Komorní rodinná alternativa k velkým hotelům v Jizerských horách, 10 km od české hranice.',
        image: { src: '/images/Rooms/apartment1.jpg', alt: 'Lesní apartmán pro rodiny na farmě Zagroda Alpakoterapii' },
        highlights: [
            { title: '{meetName} v ceně', text: 'V ceně pokoje je {meetName} – asi hodina s alpakami.' },
            { title: 'Místo pro rodinu', text: '{forestName} pro až 3 osoby s vlastní kuchyňkou.' },
            { title: 'Plán na déšť', text: 'Krytá stodola – čas se zvířaty za každého počasí.' },
            { title: 'Snadný příjezd', text: 'Parkování u farmy, z Liberce cca 50–60 minut.' },
        ],
        capsulesTitle: 'Na co se ptají rodiče',
        capsules: [
            { q: 'Kde se dá s dětmi ubytovat na farmě v Jizerských horách?', a: 'Zagroda Alpakoterapii v polských Orłowicích, 10 km od české hranice, je rodinná alpačí farma se třemi pokoji pro hosty. Rodinám doporučujeme {forestName} pro až tři osoby – s vlastní kuchyňkou a výhledem do zahrady s alpakami. Součástí každého pobytu je setkání s alpakami, tedy zhruba hodina krmení a hlazení.' },
            { q: 'Co mohou děti se zvířaty dělat?', a: 'Při setkání s alpakami je děti krmí a hladí pod dohledem našeho průvodce a seznámí se také s našimi minikozami. Je to vhodné pro všechny věkové kategorie, i pro úplně malé děti. Od šesti let mohou děti samy vést alpaku na procházce, která trvá asi 90 minut po loukách a je pro skupinu do čtyř osob.' },
            { q: 'Co dělat, když prší?', a: 'Máme krytou stodolu, takže setkání s alpakami a minikozami proběhne za každého počasí. Procházky s alpakami závisí na počasí – podívejte se na předpověď a dejte nám vědět, kdy chcete jít. Na deštivý den se v okolí hodí termální lázně ve městě Świeradów-Zdrój (8 minut) nebo zámek Czocha, necelou hodinu jízdy.' },
            { q: 'Kolik stojí rodinný pobyt a co je v ceně?', a: '{forestName} pro až tři osoby stojí {forestPrice} {forestPriceSub}. Minimální pobyt jsou dvě noci, příjezd od 15:00 a odjezd do 11:00. Rezervujete a platíte online kartou přímo v korunách. Další aktivity, například procházky s alpakami, vám naceníme na dotaz podle velikosti skupiny.' },
            { q: 'Je to lepší volba než rodinný hotel s bazénem?', a: 'Je to prostě jiná volba. Resorty mají bazény, dětské kluby a restaurace přímo na místě – my ne. U nás děti tráví opravdový čas se zvířaty, venku a v klidu místo přeplněných chodeb. Obojí se dá snadno spojit: dny na farmě s alpakami a odpoledne v termálních bazénech v nedalekých lázních Świeradów-Zdrój.' },
        ],
        comparison: {
            title: 'Farma, nebo rodinný hotel?',
            intro: 'Upřímné srovnání pro rodiče.',
            headers: ['', 'Zagroda Alpakoterapii', 'Typický rodinný hotel / resort'],
            rows: [
                ['Velikost', 'Tři pokoje, rodinná farma', 'Velký a rušný'],
                ['Pro děti', 'Krmení alpak a minikoz, procházky od 6 let', 'Dětský klub, hřiště, bazény'],
                ['Deštivé dny', 'Krytá stodola; lázně Świeradów-Zdrój 8 min', 'Krytý bazén na místě'],
                ['Jídlo', 'Vlastní kuchyňka v apartmánu', 'Restaurace / bufet'],
                ['Prostor', 'Farma, pastvina a hory kolem', 'Areál hotelu'],
            ],
        },
        cta: {
            title: 'Zarezervujte si rodinný pobyt',
            text: 'Volné termíny najdete online. Procházku s alpakami nebo program pro větší skupinu s vámi domluvíme přes WhatsApp.',
            primary: { label: 'Ověřit volné termíny', href: '/cs/stay#booking' },
            whatsappLabel: 'Napsat na WhatsApp',
        },
        relatedTitle: 'Mohlo by vás zajímat',
        related: [
            { label: 'Výlet s dětmi k alpakám', href: '/cs/vylet' },
            { label: 'Romantický víkend v horách', href: '/cs/romantic-getaway' },
            { label: 'Aktivity s alpakami', href: '/cs/activities' },
            { label: 'Naše zvířata', href: '/cs/animals' },
            { label: 'Adopce alpaky', href: '/cs/adopt' },
        ],
        breadcrumb: 'Rodinný pobyt na farmě',
    },

    de: {
        meta: {
            title: 'Familienurlaub auf dem Alpakahof mit Minizigen – Isergebirge | Zagroda Alpakoterapii',
            description: 'Urlaub auf einem familiengeführten Alpakahof in Orłowice bei Świeradów-Zdrój: Apartment für bis zu 3 Gäste, Alpaka-Begegnung für jedes Alter, Minizigen und eine überdachte Scheune für Regentage.',
        },
        badge: 'Orłowice · Isergebirge · bei Świeradów-Zdrój',
        h1: 'Familienurlaub auf dem Hof – die Alpakas sind mit dabei',
        intro: 'Die Kinder füttern Alpakas und Minizigen, Sie haben ein Apartment mit Küchenzeile und die Berge vor der Tür. Eine kleine, familiäre Alternative zu großen Hotelresorts im Isergebirge.',
        image: { src: '/images/Rooms/apartment1.jpg', alt: 'Waldapartement für Familien auf dem Alpakahof Zagroda Alpakoterapii' },
        highlights: [
            { title: 'Alpaka-Begegnung inklusive', text: 'Im Zimmerpreis ist „{meetName}“ enthalten – rund eine Stunde mit den Alpakas.' },
            { title: 'Platz für die Familie', text: '{forestName} für bis zu 3 Gäste mit eigener Küchenzeile.' },
            { title: 'Plan für Regentage', text: 'Überdachte Scheune – Zeit mit den Tieren bei jedem Wetter.' },
            { title: 'Einfache Anreise', text: 'Parken am Hof, 8 Minuten von Świeradów-Zdrój.' },
        ],
        capsulesTitle: 'Was Eltern uns fragen',
        capsules: [
            { q: 'Wo können wir mit Kindern auf einem Bauernhof im Isergebirge übernachten?', a: 'Zagroda Alpakoterapii in Orłowice, acht Minuten von Świeradów-Zdrój, ist ein familiengeführter Alpakahof mit drei Gästezimmern. Familien empfehlen wir das {forestName} für bis zu drei Gäste – mit eigener Küchenzeile und Blick auf den Alpakagarten. Zu jedem Aufenthalt gehört das Programm „{meetName}“, also rund eine Stunde mit den Alpakas.' },
            { q: 'Was können Kinder mit den Tieren erleben?', a: 'Bei der Alpaka-Begegnung füttern und streicheln die Kinder die Alpakas unter Aufsicht unseres Guides und lernen auch unsere Minizigen kennen. Das passt für jedes Alter, auch für Kleinkinder. Ab sechs Jahren dürfen Kinder auf der Alpakawanderung selbst ein Alpaka führen – rund 90 Minuten über die Wiesen, für bis zu vier Personen.' },
            { q: 'Was machen wir, wenn es regnet?', a: 'Wir haben eine überdachte Scheune, die Begegnung mit Alpakas und Minizigen findet also bei jedem Wetter statt. Alpakawanderungen hängen vom Wetter ab – schauen Sie auf die Vorhersage und sagen Sie uns, wann Sie gehen möchten. Für Regentage in der Nähe: die Thermalbäder in Świeradów-Zdrój (8 Minuten) und Schloss Czocha, knapp eine Stunde Fahrt.' },
            { q: 'Was kostet ein Familienaufenthalt und was ist enthalten?', a: 'Das {forestName} für bis zu drei Gäste kostet {forestPrice} {forestPriceSub}. Der Mindestaufenthalt beträgt zwei Nächte, Check-in ab 15:00, Check-out bis 11:00. Sie buchen und bezahlen online per Karte in Ihrer eigenen Währung. Zusätzliche Aktivitäten wie Alpakawanderungen gibt es auf Anfrage.' },
            { q: 'Ist das die bessere Wahl als ein Familienhotel mit Pool?', a: 'Es ist eine andere Wahl. Resorts haben Pools, Kinderclubs und Restaurants vor Ort – wir nicht. Bei uns verbringen Kinder echte Zeit mit Tieren, draußen und in Ruhe statt in vollen Hotelfluren. Beides lässt sich leicht verbinden: Hoftage mit den Alpakas und ein Nachmittag in den Thermalbädern im nahen Świeradów-Zdrój.' },
        ],
        comparison: {
            title: 'Bauernhof oder Familienhotel?',
            intro: 'Ein ehrlicher Vergleich für Eltern.',
            headers: ['', 'Zagroda Alpakoterapii', 'Typisches Familienhotel / Resort'],
            rows: [
                ['Größe', 'Drei Gästezimmer, familiengeführt', 'Groß und belebt'],
                ['Für Kinder', 'Alpakas und Minizigen füttern, Wanderungen ab 6 Jahren', 'Kinderclub, Spielplatz, Pools'],
                ['Regentage', 'Überdachte Scheune; Thermalbad Świeradów 8 Min.', 'Hallenbad vor Ort'],
                ['Essen', 'Eigene Küchenzeile im Apartment', 'Restaurant / Buffet'],
                ['Platz', 'Hof, Weide und Berge ringsum', 'Hotelgelände'],
            ],
        },
        cta: {
            title: 'Buchen Sie Ihren Familienurlaub',
            text: 'Freie Termine finden Sie online. Eine Alpakawanderung oder ein Programm für größere Gruppen stimmen wir per WhatsApp mit Ihnen ab.',
            primary: { label: 'Verfügbarkeit prüfen', href: '/de/stay#booking' },
            whatsappLabel: 'Per WhatsApp schreiben',
        },
        relatedTitle: 'Das könnte Sie auch interessieren',
        related: [
            { label: 'Romantisches Wochenende in den Bergen', href: '/de/romantic-getaway' },
            { label: 'Aktivitäten mit Alpakas', href: '/de/activities' },
            { label: 'Unsere Tiere', href: '/de/animals' },
            { label: 'Alpaka-Patenschaft', href: '/de/adopt' },
            { label: 'Umgebung entdecken', href: '/de/discover' },
        ],
        breadcrumb: 'Familienurlaub auf dem Hof',
    },

    nl: {
        meta: {
            title: "Gezinsvakantie op een alpacaboerderij met minigeitjes – Jizergebergte | Zagroda Alpakoterapii",
            description: "Verblijf op een familieboerderij met alpaca's in Orłowice bij Świeradów-Zdrój: appartement voor maximaal 3 gasten, kennismaking met alpaca's voor alle leeftijden, minigeitjes en een overdekte schuur.",
        },
        badge: 'Orłowice · Jizergebergte · bij Świeradów-Zdrój',
        h1: "Gezinsvakantie op de boerderij – de alpaca's horen erbij",
        intro: "De kinderen voeren alpaca's en minigeitjes, jullie hebben een appartement met kookhoek en de bergen voor de deur. Een klein, gezellig alternatief voor grote hotelresorts in het Jizergebergte.",
        image: { src: '/images/Rooms/apartment1.jpg', alt: 'Bosappartement voor gezinnen bij Zagroda Alpakoterapii' },
        highlights: [
            { title: "Kennismaking met alpaca's inbegrepen", text: "De kamerprijs is inclusief ‘{meetName}’: zo'n uur met de alpaca's." },
            { title: 'Ruimte voor het gezin', text: '{forestName} voor maximaal 3 gasten met eigen kookhoek.' },
            { title: 'Plan bij regen', text: 'Overdekte schuur – tijd met de dieren bij elk weer.' },
            { title: 'Makkelijk bereikbaar', text: 'Parkeren bij de boerderij, 8 minuten van Świeradów-Zdrój.' },
        ],
        capsulesTitle: 'Vragen die ouders ons stellen',
        capsules: [
            { q: 'Waar kun je met kinderen op een boerderij logeren in het Jizergebergte?', a: "Zagroda Alpakoterapii in Orłowice, acht minuten van Świeradów-Zdrój, is een familieboerderij met alpaca's en drie gastenkamers. Voor gezinnen raden we het {forestName} aan, voor maximaal drie gasten, met eigen kookhoek en uitzicht op de alpacatuin. Bij elk verblijf hoort het programma ‘{meetName}’: zo'n uur met de alpaca's." },
            { q: 'Wat kunnen kinderen met de dieren doen?', a: "Tijdens de kennismaking voeren en aaien de kinderen de alpaca's onder begeleiding van onze gids, en ze ontmoeten ook onze minigeitjes. Het is geschikt voor alle leeftijden, ook voor peuters. Vanaf zes jaar mogen kinderen zelf een alpaca leiden tijdens de wandeling van zo'n 90 minuten door de weilanden, voor maximaal vier personen." },
            { q: 'Wat doen we als het regent?', a: "We hebben een overdekte schuur, dus de kennismaking met alpaca's en minigeitjes gaat bij elk weer door. Wandelingen met de alpaca's hangen af van het weer – kijk naar de voorspelling en laat ons weten wanneer jullie willen gaan. Voor regenachtige dagen in de buurt: de thermale baden van Świeradów-Zdrój (8 minuten) en kasteel Czocha, op nog geen uur rijden." },
            { q: 'Wat kost een gezinsverblijf en wat is inbegrepen?', a: "Het {forestName} voor maximaal drie gasten kost {forestPrice} {forestPriceSub}. Het minimale verblijf is twee nachten, inchecken vanaf 15:00 en uitchecken tot 11:00. Je boekt en betaalt online met je kaart in je eigen valuta. Extra activiteiten, zoals wandelingen met de alpaca's, zijn op aanvraag." },
            { q: 'Is het een betere keuze dan een gezinshotel met zwembad?', a: "Het is een andere keuze. Resorts hebben zwembaden, kinderclubs en restaurants ter plaatse – wij niet. Hier brengen kinderen echte tijd door met dieren, buiten en in rust in plaats van in drukke gangen. Je kunt het makkelijk combineren: dagen op de boerderij met de alpaca's en een middag in de thermale baden van het nabije Świeradów-Zdrój." },
        ],
        comparison: {
            title: 'Boerderij of gezinshotel?',
            intro: 'Een eerlijke vergelijking voor ouders.',
            headers: ['', 'Zagroda Alpakoterapii', 'Typisch gezinshotel / resort'],
            rows: [
                ['Grootte', 'Drie gastenkamers, familiebedrijf', 'Groot en druk'],
                ['Voor kinderen', "Alpaca's en minigeitjes voeren, wandelingen vanaf 6 jaar", 'Kinderclub, speeltuin, zwembaden'],
                ['Regenachtige dagen', 'Overdekte schuur; thermale baden Świeradów op 8 min', 'Binnenzwembad ter plaatse'],
                ['Eten', 'Eigen kookhoek in het appartement', 'Restaurant / buffet'],
                ['Ruimte', 'Boerderij, weide en bergen rondom', 'Hotelterrein'],
            ],
        },
        cta: {
            title: 'Boek je gezinsverblijf',
            text: "Vrije data vind je online. Een wandeling met de alpaca's of een programma voor een grotere groep spreken we via WhatsApp met je af.",
            primary: { label: 'Beschikbaarheid bekijken', href: '/nl/stay#booking' },
            whatsappLabel: 'Stuur een WhatsApp',
        },
        relatedTitle: 'Misschien ook interessant',
        related: [
            { label: 'Romantisch weekend in de bergen', href: '/nl/romantic-getaway' },
            { label: "Activiteiten met alpaca's", href: '/nl/activities' },
            { label: 'Onze dieren', href: '/nl/animals' },
            { label: 'Alpaca adopteren', href: '/nl/adopt' },
            { label: 'Omgeving ontdekken', href: '/nl/discover' },
        ],
        breadcrumb: 'Gezinsvakantie op de boerderij',
    },
};
