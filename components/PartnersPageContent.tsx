'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, Download, Mail, Phone, ExternalLink, MapPin, Sparkles, Send, Coffee } from 'lucide-react';

interface PartnersPageContentProps {
  locale: string;
}

const DESCRIPTIONS = {
  pl: {
    title: 'Materiały dla Partnerów, Hoteli i Portali Turystycznych',
    subtitle: 'Wszystko, czego potrzebujesz, aby polecić Zagrodę Alpakoterapii swoim gościom: gotowe opisy, zdjęcia wysokiej rozdzielczości i logo.',
    locationLabel: 'Lokalizacja',
    contactLabel: 'Kontakt & Rezerwacje',
    websiteLabel: 'Oficjalna Strona',
    onlineBooking247: 'Rezerwacje online 24/7',
    descriptionsHeading: 'Gotowe opisy do wklejenia na Państwa stronę',
    descriptionsSubheading: 'Wybierz język, aby skopiować gotowy opis do zakładki „Atrakcje w okolicy”',
    partnerInviteBadge: 'Zaproszenie Partnerskie',
    distanceInfo: '15 min od Świeradowa-Zdroju, 25 min od Szklarskiej Poręby, 90 min od Pragi',
    shortDescTitle: 'Krótki opis (do listingu atrakcji / 1-2 zdania)',
    shortDescText: 'Zagroda Alpakoterapii w Rębiszowie (15 min od Świeradowa-Zdroju) – wyjątkowe miejsce spotkań z alpakami, spacery w naturze i alpakoterapia dla dzieci i dorosłych. Wymagana wcześniejsza rezerwacja online lub telefonicznie.',
    longDescTitle: 'Pełny opis (na stronę z atrakcjami / artykuł)',
    longDescText: 'Szukasz relaksującej atrakcji w sercu Gór Izerskich? Zagroda Alpakoterapii w Rębiszowie oferuje bezpośredni kontakt z łagodnymi alpakami, spacery z przewodnikiem po malowniczych łąkach oraz sesje terapeutyczne i edukacyjne. Idealna propozycja dla rodzin z dziećmi, par oraz wszystkich miłośników natury. Do dyspozycji gości jest także kameralne gospodarstwo, mini kózki oraz widoki na Karkonosze. Obiekt przyjazny zwierzętom. Rezerwacje biletów i spacerów: https://zagrodaalpakoterapii.com (tel. +48 695 545 330).',
    photosTitle: 'Zdjęcia i Logo do pobrania (Wysoka rozdzielczość)',
    photosSubtitle: 'Zdjęcia są wolne od praw autorskich do wykorzystania w materiałach promujących atrakcje regionu.',
    receptionFlyersTitle: 'Darmowe ulotki i plakaty na recepcję',
    receptionFlyersDesc: 'Prowadzisz hotel, pensjonat lub punkt informacji? Prześlemy Ci bezpłatnie elegancki stojak z ulotkami dla Twoich gości.',
    staffInviteTitle: 'Bezpłatna wizyta dla personelu recepcji i managerów',
    staffInviteDesc: 'Zapraszamy Ciebie i Twój zespół na bezpłatną kawę i spacer z alpakami, abyście mogli osobiście poznać naszą zagrodę i z pełnym przekonaniem polecać ją gościom!',
    copyBtn: 'Kopiuj opis',
    copiedBtn: 'Skopiowano!',
    downloadBtn: 'Pobierz zdjęcie',
    contactWhatsapp: 'Napisz na WhatsApp',
    requestFlyersBtn: 'Zamów darmowe ulotki',
    formName: 'Nazwa obiektu / hotelu',
    formAddress: 'Adres do wysyłki ulotek',
    formPhone: 'Telefon kontaktowy',
    formSubmit: 'Wyślij zamówienie',
    formSuccess: 'Dziękujemy! Skontaktujemy się i wyślemy materiały promocyjne.',
    whatsappMessage: 'Dzień dobry! Reprezentuję hotel/pensjonat. Chcielibyśmy skorzystać z zaproszenia partnerskiego i odwiedzić Zagrodę Alpakoterapii.',
  },
  cs: {
    title: 'Materiály pro hotely, partnery a turistické portály',
    subtitle: 'Vše, co potřebujete k doporučení Zagrody Alpakoterapii vašim hostům: připravené texty, fotografie ve vysokém rozlišení a logo.',
    locationLabel: 'Lokalita',
    contactLabel: 'Kontakt a rezervace',
    websiteLabel: 'Oficiální web',
    onlineBooking247: 'Online rezervace 24/7',
    descriptionsHeading: 'Připravené texty ke zkopírování na váš web',
    descriptionsSubheading: 'Vyberte jazyk pro zkopírování textu do sekce „Tipy na výlet a atrakce v okolí“',
    partnerInviteBadge: 'Partnerské pozvání',
    distanceInfo: '45 min z Liberce, 90 min z Prahy, 15 min od lázní Świeradów-Zdrój',
    shortDescTitle: 'Krátký popis (pro přehledy atrakcí / 1–2 věty)',
    shortDescText: 'Zagroda Alpakoterapii v Rębiszowě (jen 45 min z Liberce) – unikátní alpaka farma, procházky s alpakami v přírodě Jizerských hor a alpakoterapie pro rodiny i jednotlivce. Nutná rezervace předem.',
    longDescTitle: 'Plný popis (pro webové stránky a katalogy)',
    longDescText: 'Hledáte klidný a nezapomenutelný zážitek v Jizerských horách? Zagroda Alpakoterapii nabízí přímý kontakt s přátelskými alpakami, komentované procházky přírodou a terapeutická setkání. Ideální pro rodiny s dětmi, páry i milovníky zvířat. K dispozici jsou také minikozy, krásné výhledy a útulné ubytování. Rezervace: https://zagrodaalpakoterapii.com (tel. +48 695 545 330, mluvíme česky i anglicky).',
    photosTitle: 'Fotografie a logo ke stažení (vysoké rozlišení)',
    photosSubtitle: 'Fotografie můžete volně použít pro propagaci regionálních atrakcí.',
    receptionFlyersTitle: 'Letáky na recepci zdarma',
    receptionFlyersDesc: 'Provozujete hotel nebo penzion? Rádi vám zdarma zašleme tištěné informační letáky pro vaše hosty.',
    staffInviteTitle: 'Bezplatná návštěva pro personál recepce',
    staffInviteDesc: 'Zveme váš tým na bezplatnou kávu a seznámení s alpakami, abyste mohli zážitek osobně doporučit svým hostům!',
    copyBtn: 'Kopírovat text',
    copiedBtn: 'Zkopírováno!',
    downloadBtn: 'Stáhnout foto',
    contactWhatsapp: 'Napsat na WhatsApp',
    requestFlyersBtn: 'Objednat letáky zdarma',
    formName: 'Název hotelu / penzionu',
    formAddress: 'Adresa pro doručení',
    formPhone: 'Telefon',
    formSubmit: 'Odeslat žádost',
    formSuccess: 'Děkujeme! Brzy vám zašleme propagační materiály.',
    whatsappMessage: 'Dobrý den! Zastupuji hotel/penzion a rádi bychom využili partnerského pozvání na návštěvu Zagrody Alpakoterapii.',
  },
  en: {
    title: 'Media & Partner Kit for Hotels & Tourism Boards',
    subtitle: 'Everything you need to recommend Zagroda Alpakoterapii to your guests: ready-to-use descriptions, high-res photos, and logos.',
    locationLabel: 'Location',
    contactLabel: 'Contact & Bookings',
    websiteLabel: 'Official Website',
    onlineBooking247: 'Online booking 24/7',
    descriptionsHeading: 'Ready-to-use descriptions for your website',
    descriptionsSubheading: 'Select a language to copy ready descriptions for your "Local Attractions" page',
    partnerInviteBadge: 'Partner Invitation',
    distanceInfo: '15 min from Świeradów-Zdrój, 45 min from Liberec, 90 min from Prague, 2 hrs from Wrocław',
    shortDescTitle: 'Short Description (for attraction listings / 1-2 sentences)',
    shortDescText: 'Zagroda Alpakoterapii in Rębiszów (15 min from Świeradów-Zdrój) – a boutique alpaca therapy farm offering guided nature walks, animal therapy, and peaceful farm stays. Advance booking required.',
    longDescTitle: 'Full Description (for partner pages / directory listings)',
    longDescText: 'Looking for a relaxing nature experience in the Jizera Mountains? Zagroda Alpakoterapii offers direct interaction with gentle alpacas, guided mountain walks, and therapeutic sessions for all ages. Perfect for families, couples, and nature enthusiasts. Featuring farm stays, miniature goats, and stunning mountain views. Book online at https://zagrodaalpakoterapii.com (Phone: +48 695 545 330).',
    photosTitle: 'Download Photos & Logos (High-Resolution)',
    photosSubtitle: 'Royalty-free for hotels, travel portals, and regional tourism guides.',
    receptionFlyersTitle: 'Free Reception Leaflets & Display Stands',
    receptionFlyersDesc: 'Running a hotel, guest house, or tourist info office? We will courier free flyers and a counter stand directly to you.',
    staffInviteTitle: 'Complimentary VIP Visit for Hotel Receptionists & Managers',
    staffInviteDesc: 'We invite you and your front-desk staff for a free coffee and alpaca walk so you can experience our farm first-hand!',
    copyBtn: 'Copy Description',
    copiedBtn: 'Copied!',
    downloadBtn: 'Download Photo',
    contactWhatsapp: 'Chat on WhatsApp',
    requestFlyersBtn: 'Request Free Leaflets',
    formName: 'Hotel / Property Name',
    formAddress: 'Delivery Address',
    formPhone: 'Phone Number',
    formSubmit: 'Send Request',
    formSuccess: 'Thank you! We will courier promotional materials to you.',
    whatsappMessage: 'Hello! I represent a hotel/accommodation provider. We would love to take up the partner VIP invitation to visit Zagroda Alpakoterapii.',
  },
  de: {
    title: 'Partner-Kit für Hotels & Tourismusportale',
    subtitle: 'Alles, was Sie benötigen, um die Zagroda Alpakoterapii Ihren Gästen zu empfehlen: fertige Texte, hochauflösende Fotos und Logos.',
    locationLabel: 'Standort',
    contactLabel: 'Kontakt & Buchungen',
    websiteLabel: 'Offizielle Website',
    onlineBooking247: 'Online-Buchung rund um die Uhr',
    descriptionsHeading: 'Fertige Texte zum Einfügen auf Ihrer Website',
    descriptionsSubheading: 'Wählen Sie eine Sprache, um die Beschreibung für den Bereich „Ausflugsziele in der Region“ zu kopieren',
    partnerInviteBadge: 'Partner-Einladung',
    distanceInfo: '15 Min. von Bad Flinsberg (Świeradów-Zdrój), 90 Min. von Prag, 2 Std. von Dresden',
    shortDescTitle: 'Kurzbeschreibung (für Attraktionslisten / 1-2 Sätze)',
    shortDescText: 'Zagroda Alpakoterapii in Rębiszów (15 Min. von Świeradów-Zdrój) – ein einzigartiger Alpaka-Therapiehof mit geführten Spaziergängen und Erholung in der Natur des Isergebirges. Voranmeldung erforderlich.',
    longDescTitle: 'Ausführliche Beschreibung (für Partnerseiten & Kataloge)',
    longDescText: 'Suchen Sie nach einem erholsamen Naturerlebnis im Isergebirge? Die Zagroda Alpakoterapii bietet direkten Kontakt zu zahmen Alpakas, geführte Wiesenwanderungen und tiergestützte Therapie. Ideal für Familien mit Kindern, Paare und Naturliebhaber. Buchung: https://zagrodaalpakoterapii.com (Tel. +48 695 545 330).',
    photosTitle: 'Fotos & Logo herunterladen (High-Res)',
    photosSubtitle: 'Kostenlos nutzbar für regionale Reiseführer, Hotel-Websites und Tourismusportale.',
    receptionFlyersTitle: 'Kostenlose Flyer für die Rezeption',
    receptionFlyersDesc: 'Betreiben Sie ein Hotel oder eine Pension? Wir senden Ihnen gerne kostenlose Flyer für Ihre Gäste zu.',
    staffInviteTitle: 'Kostenloser Besuch für Rezeption & Management',
    staffInviteDesc: 'Wir laden Ihr Rezeptionsteam herzlich zu einem kostenlosen Kaffee und einem Alpaka-Spaziergang ein!',
    copyBtn: 'Text kopieren',
    copiedBtn: 'Kopiert!',
    downloadBtn: 'Foto laden',
    contactWhatsapp: 'WhatsApp Kontakt',
    requestFlyersBtn: 'Flyer bestellen',
    formName: 'Hotelname',
    formAddress: 'Lieferadresse',
    formPhone: 'Telefon',
    formSubmit: 'Absenden',
    formSuccess: 'Vielen Dank! Wir senden Ihnen das Infomaterial zu.',
    whatsappMessage: 'Guten Tag! Ich vertrete ein Hotel/eine Pension und wir möchten gerne die Partnereinladung nutzen, um die Zagroda Alpakoterapii zu besuchen.',
  },
  nl: {
    title: 'Media & Partner Kit voor Hotels en Toeristische Platforms',
    subtitle: 'Alles wat u nodig heeft om Zagroda Alpakoterapii aan te bevelen aan uw gasten: kant-en-klare teksten, foto’s in hoge resolutie en logo’s.',
    locationLabel: 'Locatie',
    contactLabel: 'Contact & Reserveringen',
    websiteLabel: 'Officiële Website',
    onlineBooking247: 'Online reserveren 24/7',
    descriptionsHeading: 'Kant-en-klare teksten voor uw website',
    descriptionsSubheading: 'Selecteer een taal om de beschrijving voor uw pagina "Bezienswaardigheden in de omgeving" te kopiëren',
    partnerInviteBadge: 'Partner Uitnodiging',
    distanceInfo: '15 min. van Świeradów-Zdrój, 90 min. van Praag, 2 uur van Wrocław',
    shortDescTitle: 'Korte beschrijving (voor attractielijsten / 1-2 zinnen)',
    shortDescText: 'Zagroda Alpakoterapii in Rębiszów (15 min. van Świeradów-Zdrój) – een unieke alpacatherapieboerderij met begeleide wandelingen in de natuur van het Isergebergte en alpacatherapie voor jong en oud. Vooraf reserveren verplicht.',
    longDescTitle: 'Volledige beschrijving (voor partnerpagina’s & artikelen)',
    longDescText: 'Op zoek naar een ontspannende natuurervaring in het Isergebergte? Zagroda Alpakoterapii biedt direct contact met vriendelijke alpaca’s, begeleide wandelingen door schilderachtige weiden en therapeutische sessies. Ideaal voor gezinnen met kinderen, stellen en natuurliebhebbers. Beschikt ook over boerderijverblijven, dwerggeitjes en prachtig uitzicht op het Reuzengebergte. Reserveren: https://zagrodaalpakoterapii.com (Tel. +48 695 545 330).',
    photosTitle: 'Foto’s & Logo downloaden (Hoge resolutie)',
    photosSubtitle: 'Rechtenvrij te gebruiken voor hotels, reisgidsen en regionale toeristische platforms.',
    receptionFlyersTitle: 'Gratis flyers voor de receptie',
    receptionFlyersDesc: 'Beheert u een hotel, pension of VVV-kantoor? We sturen u graag een gratis display met flyers voor uw gasten.',
    staffInviteTitle: 'Gratis VIP-bezoek voor receptiepersoneel en managers',
    staffInviteDesc: 'We nodigen uw receptieteam van harte uit voor gratis koffie en een wandeling met de alpaca’s, zodat u onze boerderij zelf kunt ervaren en aanbevelen!',
    copyBtn: 'Tekst kopiëren',
    copiedBtn: 'Gekopieerd!',
    downloadBtn: 'Download foto',
    contactWhatsapp: 'WhatsApp contact',
    requestFlyersBtn: 'Flyers bestellen',
    formName: 'Naam hotel / accommodatie',
    formAddress: 'Bezorgadres',
    formPhone: 'Telefoonnummer',
    formSubmit: 'Aanvraag versturen',
    formSuccess: 'Bedankt! We sturen het promotiemateriaal zo snel mogelijk naar u toe.',
    whatsappMessage: 'Hallo! Ik vertegenwoordig een hotel/accommodatie. We willen graag gebruikmaken van de partneruitnodiging om Zagroda Alpakoterapii te bezoeken.',
  },
};

const PHOTOS = [
  {
    title: 'Alpaca Walks & Meet-and-Greet',
    url: '/images/Meet-and-Greet.jpg',
    category: 'Experience / Animals',
  },
  {
    title: 'Alpaca in Jizera Mountain Nature',
    url: '/images/Alpaca-cover-1.jpg',
    category: 'Landscape / Nature',
  },
  {
    title: 'Cozy Farmhouse Rooms',
    url: '/images/Farmhouse-rooms.jpg',
    category: 'Accommodation / Rooms',
  },
  {
    title: 'Official Logo (Zagroda Alpakoterapii)',
    url: '/images/zagrodanewlogo.png',
    category: 'Branding / Logo',
  },
];

export function PartnersPageContent({ locale }: PartnersPageContentProps) {
  const t = DESCRIPTIONS[locale as keyof typeof DESCRIPTIONS] || DESCRIPTIONS.en;
  const [selectedLang, setSelectedLang] = useState<'pl' | 'cs' | 'en' | 'de' | 'nl'>((locale as 'pl' | 'cs' | 'en' | 'de' | 'nl') || 'en');
  const [copiedShort, setCopiedShort] = useState(false);
  const [copiedLong, setCopiedLong] = useState(false);
  const [flyerSubmitted, setFlyerSubmitted] = useState(false);

  const activeCopy = DESCRIPTIONS[selectedLang] || DESCRIPTIONS.en;

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
            <span>Media Kit & B2B Partner Portal</span>
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
              <a href="https://zagrodaalpakoterapii.com" target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:underline">
                zagrodaalpakoterapii.com
              </a>
              <p className="text-xs text-slate-500 mt-1">{t.onlineBooking247}</p>
            </div>
          </div>
        </div>

        {/* Language Tabs for Descriptions */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
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
                {activeCopy.shortDescTitle}
              </span>
              <button
                onClick={() => handleCopy(activeCopy.shortDescText, 'short')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
              >
                {copiedShort ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedShort ? activeCopy.copiedBtn : activeCopy.copyBtn}
              </button>
            </div>
            <p className="text-slate-800 text-sm leading-relaxed">{activeCopy.shortDescText}</p>
          </div>

          {/* Long Description */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {activeCopy.longDescTitle}
              </span>
              <button
                onClick={() => handleCopy(activeCopy.longDescText, 'long')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
              >
                {copiedLong ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLong ? activeCopy.copiedBtn : activeCopy.copyBtn}
              </button>
            </div>
            <p className="text-slate-800 text-sm leading-relaxed">{activeCopy.longDescText}</p>
          </div>
        </div>

        {/* Photo Gallery & Download Pack */}
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
