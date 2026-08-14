'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, Download, Phone, ExternalLink, MapPin, Sparkles, Send, Coffee, Users, Compass } from 'lucide-react';

interface PartnersPageContentProps {
  locale: string;
}

const DESCRIPTIONS = {
  pl: {
    title: 'Materiały dla Hoteli, Pensjonatów i Portali Turystycznych',
    subtitle: 'Wzbogać ofertę swojego obiektu o wyjątkową atrakcję dla gości. Pobierz gotowe opisy spacerów z alpakami, zdjęcia i zamów bezpłatne materiały na recepcję.',
    partnerTypeLabel: 'Wybierz typ profilu do skopiowania:',
    hotelTab: '🏨 Dla Hoteli i Pensjonatów (Atrakcja dla Twoich gości)',
    portalTab: '🗺️ Dla Portali i Informacji Turystycznej (Pełny profil)',
    locationLabel: 'Lokalizacja',
    contactLabel: 'Kontakt & Rezerwacje',
    websiteLabel: 'Rezerwacja Atrakcji Online',
    onlineBooking247: 'Bilety i terminy online 24/7',
    descriptionsHeading: 'Gotowe opisy do wklejenia na Państwa stronę',
    descriptionsSubheading: 'Wybierz język, aby skopiować gotowy opis do zakładki „Atrakcje w okolicy / Co robić”',
    partnerInviteBadge: 'Zaproszenie dla Personelu',
    distanceInfo: '15 min od Świeradowa-Zdroju, 25 min od Szklarskiej Poręby, 90 min od Pragi',
    
    // Hotel-focused snippets (100% Day Activity / Zero Accommodation competition)
    hotelShortTitle: 'Krótki opis do listy atrakcji (1-2 zdania)',
    hotelShortText: 'Zagroda Alpakoterapii w Rębiszowie (15 min od Świeradowa-Zdroju) – wspaniała atrakcja dla całej rodziny! Bezpośredni kontakt z łagodnymi alpakami, spacery z przewodnikiem i alpakoterapia. Wymagana wcześniejsza rezerwacja online na zagrodaalpakoterapii.com lub tel. +48 695 545 330.',
    hotelLongTitle: 'Pełny artykuł do zakładki „Atrakcje w okolicy” (1-2 akapity)',
    hotelLongText: 'Szukasz wyjątkowej atrakcji w ciągu dnia dla całej rodziny? Zagroda Alpakoterapii w Rębiszowie (zaledwie 15 minut od Świeradowa-Zdroju) to idealne miejsce na relaksujący spacer w naturze z łagodnymi alpakami. Gospodarstwo oferuje indywidualne i grupowe spacery po malowniczych izerskich łąkach, sesje alpakoterapii, karmienie kóz miniaturek oraz niezapomniane sesje zdjęciowe. Ze względu na kameralny charakter i komfort zwierząt, obowiązuje wcześniejsza rezerwacja wizyt: https://zagrodaalpakoterapii.com/pl/activities (tel. +48 695 545 330).',

    // Portal-focused snippets
    portalShortTitle: 'Krótki wpis katalogowy',
    portalShortText: 'Zagroda Alpakoterapii w Rębiszowie (Góry Izerskie) – agroturystyka, alpakoterapia oraz spacery z alpakami w malowniczym otoczeniu Karkonoszy. Rezerwacje: zagrodaalpakoterapii.com.',
    portalLongTitle: 'Pełny opis regionalny (Agroturystyka & Alpakoterapia)',
    portalLongText: 'Zagroda Alpakoterapii to wyjątkowe gospodarstwo agroturystyczne i ośrodek alpakoterapii w Rębiszowie koło Mirska w Górach Izerskich. Oferuje spotkania edukacyjne, spacery z alpakami, warsztaty i sesje terapeutyczne w otoczeniu górskiej przyrody. Obiekt całoroczny, przyjazny zwierzętom i rodzinom z dziećmi. Szczegóły: https://zagrodaalpakoterapii.com (tel. +48 695 545 330).',

    photosTitle: 'Zdjęcia Atrakcji i Logo do pobrania (Wysoka rozdzielczość)',
    photosSubtitle: 'Zdjęcia są wolne od praw autorskich do wykorzystania na Państwa stronie w sekcji atrakcji regionalnych.',
    receptionFlyersTitle: 'Darmowe ulotki i stojaki na recepcję',
    receptionFlyersDesc: 'Prowadzisz hotel, pensjonat lub apartamenty? Prześlemy Ci bezpłatnie elegancki stojak z ulotkami o spacerach z alpakami, który ułatwi recepcji polecanie atrakcji.',
    staffInviteTitle: 'Darmowa kawa i spacer z alpakami dla Twojej recepcji',
    staffInviteDesc: 'Zapraszamy personel recepcji oraz managerów na bezpłatną wizytę i spacer z alpakami. Gdy zespół osobiście pozna to miejsce, będzie z entuzjazmem polecać je Państwa gościom!',
    copyBtn: 'Kopiuj opis',
    copiedBtn: 'Skopiowano!',
    downloadBtn: 'Pobierz zdjęcie',
    contactWhatsapp: 'Napisz na WhatsApp',
    requestFlyersBtn: 'Zamów darmowe ulotki',
    formName: 'Nazwa hotelu / pensjonatu',
    formAddress: 'Adres do wysyłki ulotek',
    formPhone: 'Telefon kontaktowy',
    formSubmit: 'Wyślij zamówienie',
    formSuccess: 'Dziękujemy! Skontaktujemy się i wyślemy pakiet ulotek na recepcję.',
    whatsappMessage: 'Dzień dobry! Reprezentuję hotel/pensjonat. Chcielibyśmy skorzystać z bezpłatnego zaproszenia partnerskiego dla naszej recepcji do Zagrody Alpakoterapii.',
  },
  cs: {
    title: 'Materiály pro hotely, penziony a turistické portály',
    subtitle: 'Obohaťte nabídku svého ubytování o jedinečný zážitek pro vaše hosty. Stáhněte si připravené texty o procházkách s alpakami a objednejte si letáky na recepci zdarma.',
    partnerTypeLabel: 'Zvolte typ materiálů:',
    hotelTab: '🏨 Pro hotely a penziony (Atrakce pro vaše hosty)',
    portalTab: '🗺️ Pro turistické portály a infocentra (Kompletní profil)',
    locationLabel: 'Lokalita',
    contactLabel: 'Kontakt a rezervace',
    websiteLabel: 'Online rezervace zážitků',
    onlineBooking247: 'Online rezervace 24/7',
    descriptionsHeading: 'Připravené texty ke zkopírování na váš web',
    descriptionsSubheading: 'Vyberte jazyk pro zkopírování textu do sekce „Tipy na výlet a atrakce v okolí“',
    partnerInviteBadge: 'Pozvání pro recepci',
    distanceInfo: '45 min z Liberce, 90 min z Prahy, 15 min od lázní Świeradów-Zdrój',
    
    hotelShortTitle: 'Krátký popis do přehledu atrakcí (1-2 věty)',
    hotelShortText: 'Zagroda Alpakoterapii v Rębiszowě (jen 45 min z Liberce / 15 min ze Świeradowa) – skvělý zážitek pro celou rodinu! Komentované procházky s přátelskými alpakami v přírodě Jizerských hor a alpakoterapie. Rezervace online na zagrodaalpakoterapii.com nebo tel. +48 695 545 330.',
    hotelLongTitle: 'Plný popis pro sekci „Tipy na výlet v okolí“',
    hotelLongText: 'Hledáte nezapomenutelný denní zážitek v Jizerských horách? Zagroda Alpakoterapii nabízí přímý kontakt s mírumilovnými alpakami, komentované procházky přírodou po malebných loukách a terapeutická setkání pro děti i dospělé. Na místě najdete také minikozy a nádherné výhledy. Z důvodu klidu zvířat a komfortu návštěvníků je nutná rezervace předem: https://zagrodaalpakoterapii.com/cs/activities (tel. +48 695 545 330, mluvíme česky i anglicky).',

    portalShortTitle: 'Krátký zápis do katalogu',
    portalShortText: 'Zagroda Alpakoterapii v Rębiszowě – alpaka farma, agroturistika a alpakoterapie v Jizerských horách. Rezervace: zagrodaalpakoterapii.com.',
    portalLongTitle: 'Kompletní regionální profil',
    portalLongText: 'Zagroda Alpakoterapii je unikátní alpaka farma a centrum alpakoterapie v Rębiszowě u polsko-české hranice. Nabízí procházky s alpakami, zážitkové programy pro rodiny s dětmi a relaxaci v přírodě. Více informací na: https://zagrodaalpakoterapii.com (tel. +48 695 545 330).',

    photosTitle: 'Fotografie a logo ke stažení (vysoké rozlišení)',
    photosSubtitle: 'Fotografie můžete volně použít pro prezentaci regionálních atrakcí na vašem webu.',
    receptionFlyersTitle: 'Tištěné letáky na recepci zdarma',
    receptionFlyersDesc: 'Provozujete hotel nebo penzion? Rádi vám zdarma zašleme stojánek s informačními letáky o alpakách pro vaše hosty.',
    staffInviteTitle: 'Káva a procházka s alpakami pro váš personál zdarma',
    staffInviteDesc: 'Zveme recepční a manažery vašeho hotelu na bezplatnou návštěvu a seznámení s alpakami, abyste zážitek mohli s jistotou doporučit hostům!',
    copyBtn: 'Kopírovat text',
    copiedBtn: 'Zkopírováno!',
    downloadBtn: 'Stáhnout foto',
    contactWhatsapp: 'Napsat na WhatsApp',
    requestFlyersBtn: 'Objednat letáky zdarma',
    formName: 'Název hotelu / penzionu',
    formAddress: 'Adresa pro doručení',
    formPhone: 'Telefon',
    formSubmit: 'Odeslat žádost',
    formSuccess: 'Děkujeme! Brzy vám zašleme propagační letáky na recepci.',
    whatsappMessage: 'Dobrý den! Zastupuji hotel/penzion a rádi bychom využili partnerského pozvání pro náš personál na návštěvu Zagrody Alpakoterapii.',
  },
  en: {
    title: 'Media Kit & Partner Portal for Hotels & Tourism Boards',
    subtitle: 'Enrich your guests’ stay with a unique local experience. Download ready-to-use alpaca walk descriptions, high-res photos, and order free reception materials.',
    partnerTypeLabel: 'Select profile type to copy:',
    hotelTab: '🏨 For Hotels & Guesthouses (Guest Attraction / Day Trip)',
    portalTab: '🗺️ For Tourism Boards & Directories (Full Profile)',
    locationLabel: 'Location',
    contactLabel: 'Contact & Bookings',
    websiteLabel: 'Online Activity Booking',
    onlineBooking247: 'Online booking 24/7',
    descriptionsHeading: 'Ready-to-use descriptions for your website',
    descriptionsSubheading: 'Select a language to copy ready descriptions for your "Local Attractions / Things to Do" page',
    partnerInviteBadge: 'Staff VIP Invitation',
    distanceInfo: '15 min from Świeradów-Zdrój, 45 min from Liberec, 90 min from Prague, 2 hrs from Wrocław',
    
    hotelShortTitle: 'Short description for attraction listings (1-2 sentences)',
    hotelShortText: 'Zagroda Alpakoterapii in Rębiszów (15 min from Świeradów-Zdrój) – a delightful family activity! Direct interaction with gentle alpacas, guided nature walks, and animal therapy in the Jizera Mountains. Advance booking required at zagrodaalpakoterapii.com or +48 695 545 330.',
    hotelLongTitle: 'Full article for your "Things to Do Nearby" page',
    hotelLongText: 'Looking for a memorable day activity in the Jizera Mountains? Zagroda Alpakoterapii offers guided meadow walks with gentle alpacas, animal-assisted therapy, miniature goats, and scenic mountain views. Ideal for families, couples, and nature lovers staying in the region. Due to animal welfare and small-group comfort, advance booking is required: https://zagrodaalpakoterapii.com/en/activities (Phone: +48 695 545 330).',

    portalShortTitle: 'Short Directory Listing',
    portalShortText: 'Zagroda Alpakoterapii in Rębiszów – alpaca therapy farm, guided walks, and agritourism in the Jizera Mountains. Bookings: zagrodaalpakoterapii.com.',
    portalLongTitle: 'Full Regional Directory Profile',
    portalLongText: 'Zagroda Alpakoterapii is a boutique alpaca farm and therapy center in Rębiszów, Poland (15 min from Świeradów-Zdrój, 45 min from Liberec). Offers interactive alpaca walks, educational visits, and nature experiences. Pet-friendly and open year-round. Details: https://zagrodaalpakoterapii.com (Phone: +48 695 545 330).',

    photosTitle: 'Download Photos & Logos (High-Resolution)',
    photosSubtitle: 'Royalty-free for hotels, guest houses, and regional tourism guides.',
    receptionFlyersTitle: 'Free Reception Leaflets & Counter Displays',
    receptionFlyersDesc: 'Managing a hotel, guesthouse, or tourist office? We will courier free flyers and a countertop display directly to your reception desk.',
    staffInviteTitle: 'Free VIP Visit for Hotel Front-Desk Staff & Managers',
    staffInviteDesc: 'We invite your reception staff for free coffee and an alpaca walk so they can experience the farm firsthand and enthusiastically recommend it to guests!',
    copyBtn: 'Copy Description',
    copiedBtn: 'Copied!',
    downloadBtn: 'Download Photo',
    contactWhatsapp: 'Chat on WhatsApp',
    requestFlyersBtn: 'Request Free Leaflets',
    formName: 'Hotel / Property Name',
    formAddress: 'Delivery Address',
    formPhone: 'Phone Number',
    formSubmit: 'Send Request',
    formSuccess: 'Thank you! We will courier promotional flyers to your reception.',
    whatsappMessage: 'Hello! I represent a hotel/accommodation provider. We would love to take up the VIP invitation for our front-desk staff to visit Zagroda Alpakoterapii.',
  },
  de: {
    title: 'Partner-Kit für Hotels, Pensionen & Tourismusportale',
    subtitle: 'Bereichern Sie den Aufenthalt Ihrer Gäste mit einem einzigartigen Erlebnis. Laden Sie Beschreibungen für Alpaka-Spaziergänge herunter und bestellen Sie kostenlose Flyer für Ihre Rezeption.',
    partnerTypeLabel: 'Profiltyp zum Kopieren wählen:',
    hotelTab: '🏨 Für Hotels & Pensionen (Ausflugsziel für Ihre Gäste)',
    portalTab: '🗺️ Für Tourismusportale (Gesamtprofil)',
    locationLabel: 'Standort',
    contactLabel: 'Kontakt & Buchungen',
    websiteLabel: 'Online-Erlebnisbuchung',
    onlineBooking247: 'Online-Buchung 24/7',
    descriptionsHeading: 'Fertige Texte zum Einfügen auf Ihrer Website',
    descriptionsSubheading: 'Wählen Sie eine Sprache, um die Beschreibung für den Bereich „Ausflugsziele in der Region“ zu kopieren',
    partnerInviteBadge: 'Team-Einladung',
    distanceInfo: '15 Min. von Bad Flinsberg (Świeradów-Zdrój), 90 Min. von Prag, 2 Std. von Dresden',
    
    hotelShortTitle: 'Kurzbeschreibung für Attraktionslisten (1-2 Sätze)',
    hotelShortText: 'Zagroda Alpakoterapii in Rębiszów (15 Min. von Świeradów-Zdrój) – ein wunderbares Naturerlebnis für die ganze Familie! Direkter Kontakt zu zahmen Alpakas, geführte Wiesenwanderungen und tiergestützte Therapie. Voranmeldung erforderlich: zagrodaalpakoterapii.com oder Tel. +48 695 545 330.',
    hotelLongTitle: 'Ausführlicher Beitrag für Ihre Rubrik „Ausflugsziele in der Nähe“',
    hotelLongText: 'Suchen Sie nach einem besonderen Tagesausflug im Isergebirge? Die Zagroda Alpakoterapii bietet geführte Spaziergänge mit Alpakas durch die malerische Landschaft, Streichelzeit mit Miniziegen und Erholung in der Natur. Ideal für Familien mit Kindern und Naturliebhaber. Aus Rücksicht auf die Tiere ist eine Voranmeldung erforderlich: https://zagrodaalpakoterapii.com/de/activities (Tel. +48 695 545 330).',

    portalShortTitle: 'Kurzer Katalogeintrag',
    portalShortText: 'Zagroda Alpakoterapii in Rębiszów – Alpaka-Therapiehof, Wiesenwanderungen und Agrotourismus im Isergebirge. Buchung: zagrodaalpakoterapii.com.',
    portalLongTitle: 'Ausführliches Regionalprofil',
    portalLongText: 'Die Zagroda Alpakoterapii ist ein Alpaka-Hof und Therapiezentrum in Rębiszów bei Mirsk. Bietet geführte Naturspaziergänge mit Alpakas, Bildungsangebote und tiergestützte Erholung. Ganzjährig geöffnet. Details: https://zagrodaalpakoterapii.com (Tel. +48 695 545 330).',

    photosTitle: 'Fotos & Logo herunterladen (High-Res)',
    photosSubtitle: 'Kostenlos nutzbar für Hotel-Websites, Gästebücher und regionale Reiseführer.',
    receptionFlyersTitle: 'Kostenlose Flyer & Aufsteller für die Rezeption',
    receptionFlyersDesc: 'Betreiben Sie ein Hotel oder eine Pension? Wir senden Ihnen gerne kostenlose Flyer über Alpaka-Wanderungen für Ihre Rezeption zu.',
    staffInviteTitle: 'Kostenloser Besuch für Ihr Rezeptionsteam',
    staffInviteDesc: 'Wir laden Ihr Rezeptionsteam herzlich zu einem kostenlosen Kaffee und einem Alpaka-Spaziergang ein, damit Sie das Erlebnis persönlich kennenlernen!',
    copyBtn: 'Text kopieren',
    copiedBtn: 'Kopiert!',
    downloadBtn: 'Foto laden',
    contactWhatsapp: 'WhatsApp Kontakt',
    requestFlyersBtn: 'Flyer bestellen',
    formName: 'Hotelname',
    formAddress: 'Lieferadresse',
    formPhone: 'Telefon',
    formSubmit: 'Absenden',
    formSuccess: 'Vielen Dank! Wir senden Ihnen Flyer für die Rezeption zu.',
    whatsappMessage: 'Guten Tag! Ich vertrete ein Hotel/eine Pension und wir möchten gerne die Partnereinladung für unser Rezeptionsteam nutzen.',
  },
  nl: {
    title: 'Media Kit & Partner Portal voor Hotels & Toeristische Platforms',
    subtitle: 'Verrijk het verblijf van uw gasten met een unieke lokale activiteit. Download kant-en-klare teksten over alpacawandelingen en bestel gratis flyers voor de receptie.',
    partnerTypeLabel: 'Selecteer type beschrijving:',
    hotelTab: '🏨 Voor Hotels & Pensions (Daggastactiviteit voor uw gasten)',
    portalTab: '🗺️ Voor Toeristische Gidsen & Portalen (Volledig profiel)',
    locationLabel: 'Locatie',
    contactLabel: 'Contact & Reserveringen',
    websiteLabel: 'Online Activiteit Reserveren',
    onlineBooking247: 'Online reserveren 24/7',
    descriptionsHeading: 'Kant-en-klare teksten voor uw website',
    descriptionsSubheading: 'Selecteer een taal om de beschrijving voor uw pagina "Bezienswaardigheden in de omgeving" te kopiëren',
    partnerInviteBadge: 'Personeelsuitnodiging',
    distanceInfo: '15 min. van Świeradów-Zdrój, 90 min. van Praag, 2 uur van Wrocław',
    
    hotelShortTitle: 'Korte beschrijving voor activiteitenoverzichten (1-2 zinnen)',
    hotelShortText: 'Zagroda Alpakoterapii in Rębiszów (15 min. van Świeradów-Zdrój) – een fantastische activiteit voor het hele gezin! Direct contact met vriendelijke alpaca’s, begeleide wandelingen in de natuur van het Isergebergte. Vooraf reserveren verplicht via zagrodaalpakoterapii.com of +48 695 545 330.',
    hotelLongTitle: 'Volledig artikel voor uw pagina "Wat te doen in de omgeving"',
    hotelLongText: 'Op zoek naar een ontspannende dagactiviteit in het Isergebergte? Zagroda Alpakoterapii biedt begeleide weidewandelingen met vriendelijke alpaca’s, dwerggeitjes en prachtig uitzicht op het Reuzengebergte. Ideaal voor gezinnen en stellen die in de regio verblijven. Vooraf reserveren is verplicht: https://zagrodaalpakoterapii.com/nl/activities (Tel. +48 695 545 330).',

    portalShortTitle: 'Korte gidsvermelding',
    portalShortText: 'Zagroda Alpakoterapii in Rębiszów – alpacatherapie, begeleide wandelingen en agritoerisme in het Isergebergte. Reserveren: zagrodaalpakoterapii.com.',
    portalLongTitle: 'Volledig regionaal profiel',
    portalLongText: 'Zagroda Alpakoterapii is een boerderij en alpacatherapiecentrum in Rębiszów nabij Mirsk. Biedt educatieve ontmoetingen, alpacawandelingen en natuurbeleving. Gehele jaar geopend. Info: https://zagrodaalpakoterapii.com (Tel. +48 695 545 330).',

    photosTitle: 'Foto’s & Logo downloaden (Hoge resolutie)',
    photosSubtitle: 'Rechtenvrij te gebruiken voor hotelwebsites, gastenmappen en regionale reisgidsen.',
    receptionFlyersTitle: 'Gratis flyers & display voor de receptie',
    receptionFlyersDesc: 'Beheert u een hotel of pension? We sturen u graag een gratis display met flyers over alpacawandelingen voor uw gasten.',
    staffInviteTitle: 'Gratis VIP-bezoek voor receptiepersoneel',
    staffInviteDesc: 'We nodigen uw receptieteam van harte uit voor gratis koffie en een alpacawandeling, zodat u de boerderij zelf kunt ervaren en aanbevelen!',
    copyBtn: 'Tekst kopiëren',
    copiedBtn: 'Gekopieerd!',
    downloadBtn: 'Download foto',
    contactWhatsapp: 'WhatsApp contact',
    requestFlyersBtn: 'Flyers bestellen',
    formName: 'Naam hotel / pension',
    formAddress: 'Bezorgadres',
    formPhone: 'Telefoonnummer',
    formSubmit: 'Aanvraag versturen',
    formSuccess: 'Bedankt! We sturen de flyers zo snel mogelijk naar uw receptie.',
    whatsappMessage: 'Hallo! Ik vertegenwoordig een hotel/pension en we willen graag gebruikmaken van de partnereinladung voor ons receptieteam.',
  },
};

const PHOTOS = [
  {
    title: 'Spacery i spotkania z alpakami (Alpaca Walk)',
    url: '/images/Meet-and-Greet.jpg',
    category: 'Atrakcja / Zwierzęta',
  },
  {
    title: 'Alpaka w plenerze Gór Izerskich',
    url: '/images/Alpaca-cover-1.jpg',
    category: 'Krajobraz / Natura',
  },
  {
    title: 'Karmienie i kontakt ze zwierzętami',
    url: '/images/Ricky.jpeg',
    category: 'Edukacja / Dzieci',
  },
  {
    title: 'Oficjalne Logo Zagroda Alpakoterapii',
    url: '/images/zagrodanewlogo.png',
    category: 'Branding / Logo',
  },
];

export function PartnersPageContent({ locale }: PartnersPageContentProps) {
  const t = DESCRIPTIONS[locale as keyof typeof DESCRIPTIONS] || DESCRIPTIONS.en;
  const [selectedLang, setSelectedLang] = useState<'pl' | 'cs' | 'en' | 'de' | 'nl'>((locale as 'pl' | 'cs' | 'en' | 'de' | 'nl') || 'en');
  const [partnerType, setPartnerType] = useState<'hotel' | 'portal'>('hotel');
  const [copiedShort, setCopiedShort] = useState(false);
  const [copiedLong, setCopiedLong] = useState(false);
  const [flyerSubmitted, setFlyerSubmitted] = useState(false);

  const activeCopy = DESCRIPTIONS[selectedLang] || DESCRIPTIONS.en;

  const shortTitle = partnerType === 'hotel' ? activeCopy.hotelShortTitle : activeCopy.portalShortTitle;
  const shortText = partnerType === 'hotel' ? activeCopy.hotelShortText : activeCopy.portalShortText;
  const longTitle = partnerType === 'hotel' ? activeCopy.hotelLongTitle : activeCopy.portalLongTitle;
  const longText = partnerType === 'hotel' ? activeCopy.hotelLongText : activeCopy.portalLongText;

  const handleCopy = (text: string, type: 'short' | 'long') => {
    navigator.clipboard.writeText(text);
    if (type === 'short') {
      setCopiedShort(true);
      setTimeout(() => setCopiedShort(false), 2000);
    } else {
      setCopiedLong(true);
      setTimeout(() => setCopiedLong(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Media Kit & Partner Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.title}
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-slate-600">
            {t.subtitle}
          </p>
        </div>

        {/* Quick Facts Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-slate-900">{t.locationLabel}</p>
              <p className="text-sm">Orłowice 24 / Rębiszów, 59-630 Mirsk</p>
              <p className="text-xs text-slate-500 mt-1">{t.distanceInfo}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-slate-900">{t.contactLabel}</p>
              <p className="text-sm">+48 695 545 330 (PL, EN, CS)</p>
              <p className="text-xs text-slate-500 mt-1">zagrodaalpakoterapii@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-slate-900">{t.websiteLabel}</p>
              <a href="https://zagrodaalpakoterapii.com/activities" target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:underline">
                zagrodaalpakoterapii.com/activities
              </a>
              <p className="text-xs text-slate-500 mt-1">{t.onlineBooking247}</p>
            </div>
          </div>
        </div>

        {/* Audience Segment Tabs (Hotels vs Tourism Portals) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.partnerTypeLabel}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setPartnerType('hotel')}
                className={`p-4 rounded-xl border text-left font-semibold transition flex items-center justify-between ${
                  partnerType === 'hotel'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>{t.hotelTab}</span>
                {partnerType === 'hotel' && <Check className="w-5 h-5 text-emerald-600" />}
              </button>
              <button
                onClick={() => setPartnerType('portal')}
                className={`p-4 rounded-xl border text-left font-semibold transition flex items-center justify-between ${
                  partnerType === 'portal'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>{t.portalTab}</span>
                {partnerType === 'portal' && <Check className="w-5 h-5 text-emerald-600" />}
              </button>
            </div>
          </div>

          {/* Language Switcher Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t.descriptionsHeading}</h2>
              <p className="text-sm text-slate-500">{t.descriptionsSubheading}</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
              {(['pl', 'cs', 'en', 'de', 'nl'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                    selectedLang === lang
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {shortTitle}
              </span>
              <button
                onClick={() => handleCopy(shortText, 'short')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
              >
                {copiedShort ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedShort ? activeCopy.copiedBtn : activeCopy.copyBtn}
              </button>
            </div>
            <p className="text-slate-800 text-sm leading-relaxed">{shortText}</p>
          </div>

          {/* Long Description */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {longTitle}
              </span>
              <button
                onClick={() => handleCopy(longText, 'long')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
              >
                {copiedLong ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLong ? activeCopy.copiedBtn : activeCopy.copyBtn}
              </button>
            </div>
            <p className="text-slate-800 text-sm leading-relaxed">{longText}</p>
          </div>
        </div>

        {/* Photo Gallery & Download Pack (Focused on Day Activities & Animals) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.photosTitle}</h2>
            <p className="text-sm text-slate-500">{t.photosSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHOTOS.map((photo, idx) => (
              <div key={idx} className="group relative bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex flex-col">
                <div className="relative h-44 w-full bg-slate-200">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-semibold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {photo.category}
                    </span>
                    <p className="text-xs font-medium text-slate-800 mt-1 line-clamp-2">{photo.title}</p>
                  </div>
                  <a
                    href={photo.url}
                    download
                    className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t.downloadBtn}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIP Staff Invitation & Reception Flyers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: VIP Staff Invitation */}
          <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
                <Coffee className="w-4 h-4" />
                <span>{t.partnerInviteBadge}</span>
              </div>
              <h3 className="text-2xl font-bold">{t.staffInviteTitle}</h3>
              <p className="text-emerald-100 text-sm leading-relaxed">
                {t.staffInviteDesc}
              </p>
            </div>
            <a
              href={`https://wa.me/48695545330?text=${encodeURIComponent(t.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-xl transition"
            >
              <Phone className="w-4 h-4" />
              {t.contactWhatsapp}
            </a>
          </div>

          {/* Card 2: Free Reception Flyers Order */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{t.receptionFlyersTitle}</h3>
              <p className="text-slate-600 text-sm mt-1">{t.receptionFlyersDesc}</p>
            </div>

            {flyerSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-medium">
                {t.formSuccess}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFlyerSubmitted(true);
                }}
                className="space-y-3 text-sm"
              >
                <div>
                  <input
                    type="text"
                    required
                    placeholder={t.formName}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    placeholder={t.formAddress}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder={t.formPhone}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  {t.formSubmit}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
