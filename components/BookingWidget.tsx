'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import {
    trackBeginCheckout, trackSelectRoom, trackAddToCart,
    trackAddPaymentInfo, trackBookingConfirmed, trackPaymentFailed, trackVoucherApplied,
} from '@/lib/analytics';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// ─── Types ────────────────────────────────────────────────────────────────────

interface Room {
    roomId: string;
    name: string;
    description: string;
    capacity: string;
    maxAdults: number;
    maxChildren: number;
    minNights: number;
    basePrice: number;
    amenities: string[];
    totalPrice: number;
    pricePerNight: number;
    currency: string;
    nights: number;
    size?: number;
    sizeUnit?: string;
    cleaningFee?: number;
    rackRate?: number;
}

interface Child { age: number }

interface BookingState {
    checkIn: string;
    checkOut: string;
    nights: number;
    selectedRoom: Room | null;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    adults: number;
    children: Child[];
    specialRequests: string;
    nipNumber: string;
    voucherCode: string;
    voucherValid: boolean;
    voucherDiscount: number;
    voucherDiscountType: 'PERCENT' | 'FIXED';
    voucherError: string;
    depositAmount: number;
    balanceAmount: number;
    totalAmount: number;
}

interface Props { locale: string; }

// ─── Error Boundary ──────────────────────────────────────────────────────────

class BookingErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error: string }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: '' };
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error: error.message };
    }
    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('[BookingWidget] Crash:', error, info.componentStack);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="rounded-2xl border border-red-800 bg-red-950/30 p-6 text-red-300 max-w-xl mx-auto">
                    <h3 className="text-white font-bold mb-2">⚠️ Something went wrong</h3>
                    <p className="text-sm break-words">{this.state.error}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

// ─── Amenity code → display label mapping ────────────────────────────────────
// Codes come from Beds25 API (e.g. "WIFI", "PARKING", "KITCHEN")
const AMENITY_LABELS: Record<string, { label: string; icon: string }> = {
    WIFI: { label: 'WiFi', icon: '📶' },
    PARKING: { label: 'Free parking', icon: '🅿️' },
    PRIVATE_BATHROOM: { label: 'Private bathroom', icon: '🚿' },
    SHARED_BATHROOM: { label: 'Shared bathroom', icon: '🚿' },
    KITCHEN: { label: 'Full kitchen', icon: '🍳' },
    KITCHENETTE: { label: 'Kitchenette', icon: '🍳' },
    SEPARATE_BEDROOM: { label: 'Separate bedroom', icon: '🛏️' },
    GARDEN_VIEW: { label: 'Garden view', icon: '🌿' },
    MOUNTAIN_VIEW: { label: 'Mountain view', icon: '⛰️' },
    AIR_CONDITIONING: { label: 'Air conditioning', icon: '❄️' },
    HEATING: { label: 'Heating', icon: '🔥' },
    TV: { label: 'TV', icon: '📺' },
    PETS_ALLOWED: { label: 'Pets welcome', icon: '🐾' },
    BALCONY: { label: 'Balcony', icon: '🏞️' },
    TERRACE: { label: 'Terrace', icon: '☀️' },
    FIREPLACE: { label: 'Fireplace', icon: '🔥' },
    WASHING_MACHINE: { label: 'Washing machine', icon: '🧺' },
};

function formatAmenity(code: unknown): string {
    if (Array.isArray(code)) return code.flat(Infinity).map(formatAmenity).join(', ');
    if (typeof code !== 'string') return String(code);
    return AMENITY_LABELS[code]?.label || code.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase());
}

// ─── Friendly room name overrides ─────────────────────────────────────────────
// Keys are the real Beds25 room IDs. These override whatever name the API returns.
const ROOM_NAME_OVERRIDES: Record<string, string> = {
    '884394000000897001': 'Garden Room',
    '884394000000894006': 'Jungle Room',
    '884394000000896001': 'Forest Apartment',
    '884394000000884002': 'Caravan',
};

// ─── Amenity overrides per room ID ────────────────────────────────────────────
// Uses our AMENITY_LABELS codes. Overrides whatever Booking.com/Beds25 sends.
const ROOM_AMENITY_OVERRIDES: Record<string, string[]> = {
    '884394000000897001': ['WIFI', 'PRIVATE_BATHROOM', 'GARDEN_VIEW', 'HEATING', 'TV'],      // Garden Room
    '884394000000894006': ['WIFI', 'PRIVATE_BATHROOM', 'GARDEN_VIEW', 'HEATING', 'TV'],      // Jungle Room
    '884394000000896001': ['WIFI', 'PRIVATE_BATHROOM', 'KITCHEN', 'SEPARATE_BEDROOM', 'MOUNTAIN_VIEW', 'WASHING_MACHINE', 'TV'], // Forest Apartment
    '884394000000884002': ['WIFI', 'PARKING', 'HEATING', 'PETS_ALLOWED', 'TERRACE'],         // Caravan
};

// ─── Local image overrides per room ID ────────────────────────────────────────
// High-res photos hosted on this site. Keys are the real Beds24/Beds25 room IDs.
// Images from the Beds25 API media[] field are used as fallback.
const LOCAL_ROOM_IMAGES: Record<string, string[]> = {
    // Real Beds24 room IDs
    '884394000000897001': [ // Garden Room
        '/images/Rooms/Garden Room1.jpg',
        '/images/Rooms/Garden Room 3.jpg',
        '/images/Rooms/Garden Room 4.jpg',
        '/images/Rooms/GardenRoom 2.jpg',
        '/images/Rooms/Garden-1.jpg',
    ],
    '884394000000894006': [ // Jungle Room
        '/images/Rooms/Jungle Room 1.jpg',
        '/images/Rooms/Jungle Room 2.jpg',
        '/images/Rooms/Jungle Room 3.jpg',
        '/images/Rooms/Jungle-Room-5-edited.jpg',
    ],
    '884394000000896001': [ // Forest Apartment
        '/images/Rooms/apartment2.jpg',
        '/images/Rooms/apartment3-1.jpg',
        '/images/Rooms/kitchen.jpg',
    ],
    '884394000000884002': [ // Caravan
        '/images/Rooms/lounge-1.jpg',
        '/images/Rooms/Lounge 2.jpg',
        '/images/Rooms/Garden-1.jpg',
    ],
    // Dev stubs
    'room-garden': [
        '/images/Rooms/Garden Room1.jpg',
        '/images/Rooms/Garden Room 3.jpg',
        '/images/Rooms/Garden Room 4.jpg',
        '/images/Rooms/GardenRoom 2.jpg',
        '/images/Rooms/Garden-1.jpg',
    ],
    'room-jungle': [
        '/images/Rooms/Jungle Room 1.jpg',
        '/images/Rooms/Jungle Room 2.jpg',
        '/images/Rooms/Jungle Room 3.jpg',
        '/images/Rooms/Jungle-Room-5-edited.jpg',
    ],
    'room-forest': [
        '/images/Rooms/apartment2.jpg',
        '/images/Rooms/apartment3-1.jpg',
        '/images/Rooms/kitchen.jpg',
    ],
};

// ─── Mini Photo Gallery (mirrors StayPageContent PhotoGallery) ────────────────

function RoomPhotoGallery({ photos, roomName }: { photos: string[]; roomName: string }) {
    const [current, setCurrent] = useState(0);
    return (
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-800 group">
            <Image
                src={photos[current]}
                alt={`${roomName} photo ${current + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 600px"
            />
            {photos.length > 1 && (
                <>
                    <button
                        onClick={e => { e.stopPropagation(); setCurrent(c => (c - 1 + photos.length) % photos.length); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Previous photo"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={e => { e.stopPropagation(); setCurrent(c => (c + 1) % photos.length); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Next photo"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {photos.map((_, i) => (
                            <button
                                key={i}
                                onClick={e => { e.stopPropagation(); setCurrent(i); }}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/50'}`}
                                aria-label={`Photo ${i + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

// ─── Shared UI primitives ─────────────────────────────────────────────────────

const inputCls = "w-full bg-stone-800 border border-stone-600 text-white placeholder-stone-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors";
const labelCls = "block text-stone-300 text-sm font-medium mb-1.5";
const stepTitleCls = "text-2xl font-bold text-white mb-1";
const stepSubCls = "text-stone-400 text-sm mb-6";

// ─── Progress bar ─────────────────────────────────────────────────────────────

const STEPS = ['dates', 'room', 'guests', 'extras', 'summary', 'payment', 'confirmed'] as const;

function ProgressBar({ step }: { step: number }) {
    const t = useTranslations('booking');
    if (step >= 6) return null;
    const pct = ((step + 1) / 7) * 100;
    return (
        <div className="mb-8" role="progressbar" aria-valuenow={step + 1} aria-valuemax={7}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                    Step {step + 1} of 7 — {t(`steps.${STEPS[step]}`)}
                </span>
                <span className="text-xs text-emerald-400 font-medium">{Math.round(pct)}%</span>
            </div>
            <div className="h-1.5 bg-stone-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

// ─── Step nav row ─────────────────────────────────────────────────────────────

function StepNav({ onBack, onNext, nextLabel, disabled = false, showBack = true }: {
    onBack?: () => void;
    onNext?: () => void;
    nextLabel?: string;
    disabled?: boolean;
    showBack?: boolean;
}) {
    const t = useTranslations('booking');
    const finalNextLabel = nextLabel || t('nav.next');

    return (
        <div className="flex justify-between items-center mt-8 gap-3">
            {showBack && onBack ? (
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="border-stone-600 text-stone-300 hover:bg-stone-700 hover:text-white bg-transparent rounded-xl px-5"
                >
                    {t('nav.back')}
                </Button>
            ) : <div />}
            {onNext && (
                <Button
                    type="button"
                    onClick={onNext}
                    disabled={disabled}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {finalNextLabel}
                </Button>
            )}
        </div>
    );
}

// ─── Step 1: Date Picker ──────────────────────────────────────────────────────

function StepDates({ state, onChange, onNext }: {
    state: BookingState;
    onChange: (k: keyof BookingState, v: any) => void;
    onNext: () => void;
}) {
    const t = useTranslations('booking');

    // Booking cutoff: if it's past 1 PM, earliest check-in is day after tomorrow
    // (gives the team time to prepare rooms)
    const now = new Date();
    const isPastCutoff = now.getHours() >= 13;
    const minCheckInDate = new Date(now);
    // Tomorrow = +1 day. If past 1 PM, push to day after tomorrow = +2 days
    minCheckInDate.setDate(minCheckInDate.getDate() + (isPastCutoff ? 2 : 1));
    const today = minCheckInDate.toISOString().split('T')[0];

    const handleCheckIn = (v: string) => {
        onChange('checkIn', v);
        if (state.checkOut && v >= state.checkOut) onChange('checkOut', '');
    };

    const calcNights = (ci: string, co: string) => {
        if (!ci || !co) return 0;
        return Math.round((new Date(co).getTime() - new Date(ci).getTime()) / 86400000);
    };

    const handleCheckOut = (v: string) => {
        onChange('checkOut', v);
        onChange('nights', calcNights(state.checkIn, v));
    };

    const canNext = state.checkIn && state.checkOut && state.nights >= 2;

    return (
        <div>
            <h2 className={stepTitleCls}>{t('dates.title')}</h2>
            <p className={stepSubCls}>{t('dates.subtitle')}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className={labelCls}>{t('dates.checkIn')}</label>
                    <input
                        type="date"
                        className={inputCls}
                        min={today}
                        value={state.checkIn}
                        onChange={e => handleCheckIn(e.target.value)}
                    />
                </div>
                <div>
                    <label className={labelCls}>{t('dates.checkOut')}</label>
                    <input
                        type="date"
                        className={inputCls}
                        min={state.checkIn || today}
                        value={state.checkOut}
                        onChange={e => handleCheckOut(e.target.value)}
                    />
                </div>
            </div>

            {state.nights > 0 && (
                <div className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-700 text-emerald-300 rounded-full px-4 py-1.5 text-sm mb-6">
                    🌙 {t(state.nights === 1 ? 'dates.nights' : 'dates.nights_plural', { count: state.nights })}
                </div>
            )}

            <StepNav showBack={false} onNext={onNext} nextLabel={t('nav.next')} disabled={!canNext} />
        </div>
    );
}

// ─── Step 2: Room Selector ────────────────────────────────────────────────────

function StepRoom({ state, onChange, onNext, onBack }: {
    state: BookingState;
    onChange: (k: keyof BookingState, v: any) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    const t = useTranslations('booking');
    const locale = useLocale();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch(`/api/booking/availability?checkIn=${state.checkIn}&checkOut=${state.checkOut}`)
            .then(r => r.json())
            .then(data => {
                const mapped: Room[] = (data.availableRooms || []).map((r: any) => ({
                    roomId: r.id,
                    name: ROOM_NAME_OVERRIDES[r.id] || r.name,
                    description: r.description || '',
                    capacity: `${r.maxAdults} adult${r.maxAdults !== 1 ? 's' : ''}${r.maxChildren > 0 ? ` + ${r.maxChildren} child${r.maxChildren !== 1 ? 'ren' : ''}` : ''}`,
                    maxAdults: r.maxAdults,
                    maxChildren: r.maxChildren,
                    minNights: r.minNights,
                    basePrice: r.basePrice,
                    amenities: ROOM_AMENITY_OVERRIDES[r.id] || (() => {
                        const raw = typeof r.amenities === 'string' ? JSON.parse(r.amenities) : (r.amenities || []);
                        return Array.isArray(raw) ? raw.flat(Infinity).filter((a: any) => typeof a === 'string') : [];
                    })(),
                    totalPrice: r.pricing?.totalPrice ?? 0,
                    pricePerNight: r.pricing?.averagePerNight ?? r.basePrice,
                    currency: r.pricing?.currency ?? 'PLN',
                    nights: r.pricing?.nights ?? state.nights,
                    size: r.size,
                    sizeUnit: r.sizeUnit,
                    cleaningFee: r.cleaningFee,
                    rackRate: r.rackRate,
                })).filter((room: Room) => room.totalPrice > 0);
                setRooms(mapped);
                setLoading(false);
            })
            .catch(() => { setError('Unable to check availability. Please try again.'); setLoading(false); });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.checkIn, state.checkOut]);

    const selectRoom = (room: Room) => {
        onChange('selectedRoom', room);
        // Track room selection into GA4
        trackSelectRoom({ roomId: room.roomId, roomName: room.name, price: room.totalPrice, nights: room.nights || state.nights });
        // Use totalPrice from API; fall back to basePrice * nights, then rackRate * nights
        const nights = room.nights || state.nights || 1;
        let effectiveTotal = room.totalPrice > 0 ? room.totalPrice : 0;
        if (!effectiveTotal && room.basePrice > 0) effectiveTotal = room.basePrice * nights;
        if (!effectiveTotal && room.rackRate && room.rackRate > 0) effectiveTotal = room.rackRate * nights;
        if (!effectiveTotal || isNaN(effectiveTotal)) effectiveTotal = 0;
        const deposit = Math.round(effectiveTotal * 0.1);
        onChange('depositAmount', deposit);
        onChange('balanceAmount', effectiveTotal - deposit);
        onChange('totalAmount', effectiveTotal);
        // Patch the room object so summary/payment steps show the correct price
        onChange('selectedRoom', { ...room, totalPrice: effectiveTotal, pricePerNight: Math.round(effectiveTotal / room.nights) });
    };

    return (
        <div>
            <h2 className={stepTitleCls}>{t('rooms.title')}</h2>
            <p className={stepSubCls}>{t('rooms.dateRange', { checkIn: state.checkIn, checkOut: state.checkOut, nights: state.nights })}</p>

            {loading && (
                <div className="flex items-center justify-center gap-3 py-12 text-stone-400">
                    <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    {t('rooms.checking')}
                </div>
            )}
            {error && (
                <div className="rounded-xl border border-red-800 bg-red-950/30 text-red-300 p-4 text-sm mb-4">{error}</div>
            )}
            {!loading && !error && rooms.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-stone-400 mb-4">{t('rooms.noRooms')}</p>
                    <Button variant="outline" onClick={onBack} className="border-stone-600 text-stone-300 hover:bg-stone-700 bg-transparent rounded-xl">
                        {t('rooms.tryDifferent')}
                    </Button>
                </div>
            )}

            <div className="flex flex-col gap-5">
                {rooms.map(room => {
                    const images = LOCAL_ROOM_IMAGES[room.roomId];
                    const isSelected = state.selectedRoom?.roomId === room.roomId;
                    return (
                        <button
                            key={room.roomId}
                            onClick={() => selectRoom(room)}
                            className={`rounded-2xl overflow-hidden border text-left transition-all duration-300 w-full
                                ${isSelected
                                    ? 'border-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.3)] shadow-emerald-500/20'
                                    : 'border-stone-700 hover:border-stone-500 hover:shadow-xl'
                                }`}
                        >
                            {/* Photo gallery */}
                            {images && (
                                <RoomPhotoGallery photos={images} roomName={room.name} />
                            )}

                            {/* Info panel */}
                            <div className="bg-stone-900 p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-white">{room.name}</h3>
                                    <div className="flex items-center gap-2">
                                        {isSelected && (
                                            <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                                <Check className="w-3 h-3" /> {t('rooms.selected')}
                                            </span>
                                        )}
                                        <span className="text-xs text-stone-400 bg-stone-800 px-2.5 py-1 rounded-full border border-stone-700">
                                            👥 {room.capacity}
                                        </span>
                                    </div>
                                </div>

                                {room.description && (
                                    <p className="text-stone-400 text-sm mb-4 leading-relaxed">{room.description}</p>
                                )}

                                {/* Room size */}
                                {room.size && (
                                    <p className="text-stone-500 text-xs mb-3">
                                        📐 {room.size} {room.sizeUnit || 'sqm'}
                                    </p>
                                )}

                                {/* Amenities — collapsible 2-col grid */}
                                {room.amenities.length > 0 && (
                                    <details className="mb-4 group">
                                        <summary className="cursor-pointer text-sm text-stone-400 hover:text-stone-200 transition-colors select-none list-none flex items-center gap-1.5">
                                            <span className="text-xs transition-transform group-open:rotate-90">▶</span>
                                            {room.amenities.length} amenities included
                                        </summary>
                                        <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
                                            {room.amenities.map((code: string) => (
                                                <li key={code} className="flex items-center gap-2 text-sm text-stone-300">
                                                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                                    {formatAmenity(code)}
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                )}

                                {/* Pricing — emerald callout matching site pattern */}
                                {(() => {
                                    const nights = room.nights || state.nights || 1;
                                    let effectiveTotal = room.totalPrice > 0 ? room.totalPrice : 0;
                                    if (!effectiveTotal && room.basePrice > 0) effectiveTotal = room.basePrice * nights;
                                    if (!effectiveTotal && room.rackRate && room.rackRate > 0) effectiveTotal = room.rackRate * nights;
                                    if (!effectiveTotal || isNaN(effectiveTotal)) effectiveTotal = 0;
                                    const effectivePPN = nights > 0 ? Math.round(effectiveTotal / nights) : 0;
                                    return (
                                        <div className="bg-emerald-950/60 border border-emerald-800/50 rounded-xl p-4 flex justify-between items-end">
                                            <div>
                                                <div className="text-2xl font-bold text-emerald-400">
                                                    {effectiveTotal > 0 ? `${effectiveTotal.toLocaleString(locale === 'en' ? 'en-US' : locale)} PLN` : t('rooms.priceOnRequest')}
                                                </div>
                                                {effectiveTotal > 0 && (
                                                    <div className="text-sm text-emerald-600">
                                                        {t('rooms.totalStay', { nights, price: effectivePPN })}
                                                    </div>
                                                )}
                                                {room.cleaningFee && room.cleaningFee > 0 && (
                                                    <div className="text-xs text-stone-500 mt-1">
                                                        {t('rooms.cleaningFee', { amount: room.cleaningFee })}
                                                    </div>
                                                )}
                                            </div>
                                            {effectiveTotal > 0 && (
                                                <div className="text-right">
                                                    <div className="text-xs text-stone-400">{t('rooms.depositToday')}</div>
                                                    <div className="text-lg font-bold text-white">
                                                        {Math.round(effectiveTotal * 0.1).toLocaleString(locale === 'en' ? 'en-US' : locale)} PLN
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                        </button>
                    );
                })}
            </div>

            <StepNav onBack={onBack} onNext={onNext} disabled={!state.selectedRoom} />
        </div>
    );
}

// ─── Step 3: Guest Details ────────────────────────────────────────────────────

function Counter({ value, onChange, min = 1, max = 6 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={() => onChange(Math.max(min, value - 1))}
                className="w-9 h-9 rounded-full border border-stone-600 text-stone-300 hover:border-emerald-500 hover:text-emerald-400 flex items-center justify-center text-lg font-bold transition-colors"
            >
                −
            </button>
            <span className="text-white font-semibold w-6 text-center">{value}</span>
            <button
                type="button"
                onClick={() => onChange(Math.min(max, value + 1))}
                className="w-9 h-9 rounded-full border border-stone-600 text-stone-300 hover:border-emerald-500 hover:text-emerald-400 flex items-center justify-center text-lg font-bold transition-colors"
            >
                +
            </button>
        </div>
    );
}

function StepGuests({ state, onChange, onNext, onBack }: {
    state: BookingState;
    onChange: (k: keyof BookingState, v: any) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    const t = useTranslations('booking');
    const _locale = useLocale();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.guestEmail);
    const phoneValid = /^\+?[\d\s\-()]{7,20}$/.test(state.guestPhone.trim());

    const updateChildAge = (index: number, age: number) => {
        const next = [...state.children];
        next[index] = { age };
        onChange('children', next);
    };

    const addChild = () => {
        if (state.children.length < 4) onChange('children', [...state.children, { age: 0 }]);
    };

    const removeChild = (i: number) => {
        onChange('children', state.children.filter((_, idx) => idx !== i));
    };

    const ageValid = state.children.every(c => c.age >= 0 && c.age <= 15);
    const canNext = state.guestName && emailValid && phoneValid && state.adults >= 1 && ageValid;

    return (
        <div>
            <h2 className={stepTitleCls}>{t('details.title')}</h2>
            <p className={stepSubCls}>{t('details.subtitle')}</p>

            <div className="space-y-4">
                <div>
                    <label className={labelCls}>{t('details.fullName')} *</label>
                    <input className={inputCls} value={state.guestName} onChange={e => onChange('guestName', e.target.value)} placeholder="Anna Kowalski" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelCls}>{t('details.email')} *</label>
                        <input className={`${inputCls} ${state.guestEmail && !emailValid ? 'border-red-500 focus:ring-red-500' : ''}`} type="email" value={state.guestEmail} onChange={e => onChange('guestEmail', e.target.value)} placeholder="anna@example.com" />
                        {state.guestEmail && !emailValid && (
                            <p className="text-red-400 text-xs mt-1">Please enter a valid email address</p>
                        )}
                    </div>
                    <div>
                        <label className={labelCls}>{t('details.phone')} *</label>
                        <input className={`${inputCls} ${state.guestPhone && !phoneValid ? 'border-red-500 focus:ring-red-500' : ''}`} type="tel" value={state.guestPhone} onChange={e => onChange('guestPhone', e.target.value)} placeholder="+48 123 456 789" />
                        {state.guestPhone && !phoneValid && (
                            <p className="text-red-400 text-xs mt-1">Please enter a valid phone number</p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelCls}>{t('guests.adults')} *</label>
                        <Counter value={state.adults} onChange={v => onChange('adults', v)} min={1} max={6} />
                    </div>
                    <div>
                        <label className={labelCls}>{t('guests.children')}</label>
                        <button
                            type="button"
                            onClick={addChild}
                            disabled={state.children.length >= 4}
                            className="text-sm text-emerald-400 hover:text-emerald-300 border border-emerald-700 hover:border-emerald-500 rounded-lg px-3 py-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            + Add child
                        </button>
                    </div>
                </div>

                {state.children.map((child, i) => (
                    <div key={i} className="flex items-center gap-3 bg-stone-800 rounded-xl p-3 border border-stone-700">
                        <span className="text-stone-300 text-sm flex-1">Child {i + 1} age</span>
                        <input
                            type="number"
                            className="w-20 bg-stone-700 border border-stone-600 text-white rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            min={0} max={15}
                            value={child.age}
                            onChange={e => updateChildAge(i, Number(e.target.value))}
                            placeholder="Age"
                        />
                        {child.age > 15 && <span className="text-red-400 text-xs">Must be under 16</span>}
                        <button type="button" onClick={() => removeChild(i)} className="text-stone-500 hover:text-red-400 text-sm transition-colors">Remove</button>
                    </div>
                ))}
            </div>

            <StepNav onBack={onBack} onNext={onNext} disabled={!canNext} />
        </div>
    );
}

// ─── Step 4: Extras / Voucher ─────────────────────────────────────────────────

function StepExtras({ state, onChange, onNext, onBack }: {
    state: BookingState;
    onChange: (k: keyof BookingState, v: any) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    const t = useTranslations('booking');
    const locale = useLocale();
    const [validating, setValidating] = useState(false);

    const validateVoucher = async () => {
        if (!state.voucherCode) return;
        setValidating(true);
        onChange('voucherError', '');
        try {
            const res = await fetch('/api/booking/voucher', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: state.voucherCode }),
            });
            const data = await res.json();
            if (data.valid) {
                onChange('voucherValid', true);
                onChange('voucherDiscountType', data.discountType);
                const discountAmount = data.discountType === 'PERCENT'
                    ? Math.round(state.totalAmount * data.discountValue / 100)
                    : data.discountValue;
                onChange('voucherDiscount', discountAmount);
                trackVoucherApplied({ code: state.voucherCode, discount: discountAmount });
                const discountedTotal = Math.max(0, state.totalAmount - discountAmount);
                const newDeposit = Math.round(discountedTotal * 0.3);
                onChange('depositAmount', newDeposit);
                onChange('balanceAmount', discountedTotal - newDeposit);
            } else {
                onChange('voucherValid', false);
                onChange('voucherDiscount', 0);
                onChange('voucherError', data.error || 'Invalid voucher code');
            }
        } catch {
            onChange('voucherError', 'Unable to validate voucher. Please try again.');
        } finally {
            setValidating(false);
        }
    };

    return (
        <div>
            <h2 className={stepTitleCls}>{t('voucher.title')}</h2>
            <p className={stepSubCls}>{t('voucher.subtitle')}</p>

            <div className="space-y-5">
                <div>
                    <label className={labelCls}>Voucher / promo code</label>
                    <div className="flex gap-2">
                        <input
                            className={`${inputCls} flex-1 ${state.voucherValid ? 'border-emerald-500' : state.voucherError ? 'border-red-600' : ''}`}
                            value={state.voucherCode}
                            onChange={e => {
                                onChange('voucherCode', e.target.value.toUpperCase());
                                onChange('voucherValid', false);
                                onChange('voucherError', '');
                                onChange('voucherDiscount', 0);
                            }}
                            placeholder={t('voucher.placeholder')}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={validateVoucher}
                            disabled={!state.voucherCode || validating}
                            className="border-stone-600 text-stone-300 hover:bg-stone-700 bg-transparent rounded-xl px-5 disabled:opacity-40"
                        >
                            {validating ? t('payment.processing') : t('voucher.apply')}
                        </Button>
                    </div>
                    {state.voucherValid && (
                        <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
                            <Check className="w-4 h-4" /> {t('voucher.discount', { amount: state.voucherDiscount.toLocaleString(locale === 'en' ? 'en-US' : locale) })}
                        </p>
                    )}
                    {state.voucherError && <p className="text-red-400 text-sm mt-2">{state.voucherError}</p>}
                </div>

                <div>
                    <label className={labelCls}>{t('details.specialRequests')}</label>
                    <textarea
                        className={inputCls}
                        value={state.specialRequests}
                        onChange={e => onChange('specialRequests', e.target.value)}
                        placeholder="Dietary requirements, bed preferences, accessibility needs…"
                        rows={3}
                    />
                </div>

                <div>
                    <label className={labelCls}>{t('details.nipNumber')}</label>
                    <input
                        className={inputCls}
                        value={state.nipNumber}
                        onChange={e => onChange('nipNumber', e.target.value)}
                        placeholder="1234567890"
                        maxLength={10}
                    />
                    <p className="text-stone-500 text-xs mt-1.5">Only required if you need a VAT invoice.</p>
                </div>
            </div>

            <StepNav onBack={onBack} onNext={onNext} />
        </div>
    );
}

// ─── Step 5: Summary ──────────────────────────────────────────────────────────

function StepSummary({ state, onNext, onBack }: {
    state: BookingState;
    onNext: () => void;
    onBack: () => void;
}) {
    const t = useTranslations('booking');
    const locale = useLocale();
    const room = state.selectedRoom!;

    const SummaryRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
        <div className={`flex justify-between items-center py-3 border-b border-stone-700/50 ${highlight ? 'text-white' : ''}`}>
            <span className={highlight ? 'font-semibold text-white' : 'text-stone-400 text-sm'}>{label}</span>
            <strong className={highlight ? 'text-emerald-400 text-lg' : 'text-white'}>{value}</strong>
        </div>
    );

    return (
        <div>
            <h2 className={stepTitleCls}>{t('summary.title')}</h2>

            <div className="bg-stone-900 border border-stone-700 rounded-2xl overflow-hidden mb-5 mt-4">
                <div className="px-5 py-4">
                    <SummaryRow label={t('summary.room')} value={room.name} />
                    <SummaryRow label={t('summary.dates')} value={`${state.checkIn} → ${state.checkOut} (${t(state.nights === 1 ? 'dates.nights' : 'dates.nights_plural', { count: state.nights })})`} />
                    <SummaryRow
                        label={t('summary.guests')}
                        value={`${state.adults} adult${state.adults !== 1 ? 's' : ''}${state.children.length > 0 ? `, ${state.children.length} child${state.children.length !== 1 ? 'ren' : ''}` : ''}`}
                    />
                    {state.voucherDiscount > 0 && (
                        <div className="flex justify-between items-center py-3 border-b border-stone-700/50">
                            <span className="text-stone-400 text-sm">{t('summary.voucherDiscount')} ({state.voucherCode})</span>
                            <strong className="text-emerald-400">−{state.voucherDiscount.toLocaleString(locale === 'en' ? 'en-US' : locale)} PLN</strong>
                        </div>
                    )}
                </div>
                <div className="bg-emerald-950/50 border-t border-emerald-800/50 px-5 py-4">
                    <SummaryRow label={t('summary.depositNow')} value={`${state.depositAmount.toLocaleString(locale === 'en' ? 'en-US' : locale)} PLN`} highlight />
                    <div className="flex justify-between items-center pt-3">
                        <span className="text-stone-500 text-xs">{t('summary.balanceDue')}</span>
                        <span className="text-stone-400 text-sm font-semibold">{state.balanceAmount.toLocaleString(locale === 'en' ? 'en-US' : locale)} PLN</span>
                    </div>
                </div>
            </div>

            <div className="bg-stone-800/50 border border-stone-700 rounded-xl p-4 text-sm text-stone-400 leading-relaxed">
                <strong className="text-stone-300 block mb-1">{t('summary.cancellation')}</strong>
                {t('summary.cancellationText')}
            </div>

            <StepNav onBack={onBack} onNext={onNext} nextLabel={t('summary.proceedToPayment')} />
        </div>
    );
}

// ─── Step 6: Payment (Stripe Elements) ───────────────────────────────────────

function PaymentForm({ state, onSuccess, locale }: { state: BookingState; onSuccess: (ref: string) => void; locale: string }) {
    const t = useTranslations('booking');

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setProcessing(true);
        setError('');

        const { error: submitError, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: `${window.location.origin}/${locale}/stay?booking=confirmed` },
            redirect: 'if_required',
        });

        if (submitError) {
            setError(submitError.message || 'Payment failed. Your card was not charged.');
            setProcessing(false);
            return;
        }

        if (paymentIntent?.status === 'succeeded') {
            onSuccess(paymentIntent.id);
        } else {
            setError('Payment was not completed. Your card was not charged.');
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-emerald-950/50 border border-emerald-800/50 rounded-xl p-4 text-sm">
                <strong className="text-white block mb-0.5">{t('payment.chargingDeposit', { amount: state.depositAmount?.toLocaleString(locale === 'en' ? 'en-US' : locale) })}</strong>
                <p className="text-emerald-400/80">{t('payment.cardSaved')}</p>
            </div>
            <PaymentElement />
            {error && (
                <div className="bg-red-950/40 border border-red-800 text-red-300 rounded-xl p-4 text-sm" role="alert">
                    <strong>⚠ {error}</strong>
                </div>
            )}
            <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl py-3 text-base disabled:opacity-40"
                disabled={!stripe || processing}
            >
                {processing ? t('payment.processing') : t('payment.payButton', { amount: state.depositAmount?.toLocaleString(locale === 'en' ? 'en-US' : locale) })}
            </Button>
        </form>
    );
}

function StepPayment({ state, onSuccess, onBack, locale }: {
    state: BookingState;
    onSuccess: (ref: string) => void;
    onBack: () => void;
    locale: string;
}) {
    const t = useTranslations('booking');
    const [clientSecret, setClientSecret] = useState('');
    const [intentError, setIntentError] = useState('');
    const stateRef = useRef(state);

    useEffect(() => {
        const s = stateRef.current;
        fetch('/api/booking/intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                roomId: s.selectedRoom?.roomId,
                roomName: s.selectedRoom?.name,
                checkIn: s.checkIn,
                checkOut: s.checkOut,
                nights: s.nights,
                depositAmount: s.depositAmount,
                balanceAmount: s.balanceAmount,
                totalAmount: s.totalAmount,
                adults: s.adults,
                children: s.children,
                guestName: s.guestName,
                guestEmail: s.guestEmail,
                guestPhone: s.guestPhone,
                specialRequests: s.specialRequests,
                nipNumber: s.nipNumber,
                voucherCode: s.voucherValid ? s.voucherCode : undefined,
                voucherAmount: s.voucherValid ? s.voucherDiscount : undefined,
                locale,
            }),
        })
            .then(r => r.json())
            .then(data => {
                if (data.clientSecret) setClientSecret(data.clientSecret);
                else setIntentError(t('payment.error'));
            })
            .catch(() => setIntentError(t('payment.error')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h2 className={stepTitleCls}>{t('payment.title')}</h2>
            <p className={stepSubCls}>{t('payment.subtitle')}</p>

            {intentError && (
                <div className="bg-red-950/40 border border-red-800 text-red-300 rounded-xl p-4 text-sm mb-4">{intentError}</div>
            )}
            {!clientSecret && !intentError && (
                <div className="flex items-center justify-center gap-3 py-12 text-stone-400">
                    <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    {t('payment.preparing')}
                </div>
            )}
            {clientSecret && (
                <Elements
                    stripe={stripePromise}
                    options={{ clientSecret, appearance: { theme: 'night', variables: { colorPrimary: '#10b981' } } }}
                >
                    <PaymentForm state={state} onSuccess={onSuccess} locale={locale} />
                </Elements>
            )}

            <button
                onClick={onBack}
                className="mt-4 text-stone-500 hover:text-stone-300 text-sm transition-colors"
            >
                {t('payment.backToSummary')}
            </button>
        </div>
    );
}

// ─── Step 7: Confirmation ─────────────────────────────────────────────────────

function StepConfirmation({ state }: { state: BookingState }) {
    const t = useTranslations('booking');
    const locale = useLocale();
    return (
        <div className="text-center py-6">
            <div className="text-6xl mb-4">🦙</div>
            <h2 className="text-3xl font-bold text-white mb-2">{t('confirmation.title')}</h2>
            <p className="text-stone-400 mb-8">{t('confirmation.thankYou', { name: state.guestName.split(' ')[0] })} We can&apos;t wait to welcome you to the alpaca farm.</p>

            <div className="bg-stone-900 border border-stone-700 rounded-2xl text-left px-5 py-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-stone-400">{t('summary.room')}</span>
                    <strong className="text-white">{state.selectedRoom?.name}</strong>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-stone-400">{t('summary.dates')}</span>
                    <strong className="text-white">{state.checkIn} → {state.checkOut}</strong>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-stone-400">{t('confirmation.depositPaid')}</span>
                    <strong className="text-emerald-400">{state.depositAmount.toLocaleString(locale === 'en' ? 'en-US' : locale)} PLN</strong>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-stone-400">{t('confirmation.balanceDue')}</span>
                    <strong className="text-white">{state.balanceAmount.toLocaleString(locale === 'en' ? 'en-US' : locale)} PLN</strong>
                </div>
            </div>

            <p className="text-stone-400 text-sm">
                {t('confirmation.emailSent')} <strong className="text-white">{state.guestEmail}</strong>.<br />
                {t('confirmation.balanceNote')}
            </p>
        </div>
    );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────

function BookingWidgetInner({ locale }: Props) {
    const [step, setStep] = useState(0);
    const [_bookingRef, setBookingRef] = useState('');
    const [state, setState] = useState<BookingState>({
        checkIn: '', checkOut: '', nights: 0,
        selectedRoom: null,
        guestName: '', guestEmail: '', guestPhone: '', adults: 2, children: [],
        specialRequests: '', nipNumber: '',
        voucherCode: '', voucherValid: false, voucherDiscount: 0, voucherDiscountType: 'FIXED', voucherError: '',
        depositAmount: 0, balanceAmount: 0, totalAmount: 0,
    });

    const set = useCallback((k: keyof BookingState, v: any) => {
        setState(prev => ({ ...prev, [k]: v }));
    }, []);

    // Step-aware next — fires the appropriate GA4 event when moving forward
    const next = () => {
        const s = state;
        switch (step) {
            case 0: // Dates → Rooms
                trackBeginCheckout({ checkIn: s.checkIn, checkOut: s.checkOut, nights: s.nights });
                break;
            case 1: // Room selected → Guest details
                if (s.selectedRoom) {
                    trackAddToCart({
                        roomId: s.selectedRoom.roomId,
                        roomName: s.selectedRoom.name,
                        totalPrice: s.selectedRoom.totalPrice,
                        depositAmount: s.depositAmount,
                        nights: s.nights,
                    });
                }
                break;
            case 3: // Extras → Summary (voucher may have been applied already)
                break;
            case 4: // Summary → Payment
                if (s.selectedRoom) {
                    trackAddPaymentInfo({
                        roomId: s.selectedRoom.roomId,
                        roomName: s.selectedRoom.name,
                        totalPrice: s.totalAmount,
                        depositAmount: s.depositAmount,
                    });
                }
                break;
        }
        setStep(prev => Math.min(prev + 1, 6));
    };
    const back = () => setStep(s => Math.max(s - 1, 0));

    const handlePaymentSuccess = (ref: string) => {
        setBookingRef(ref);
        setStep(6);
        // Fire GA4 purchase event on confirmed booking
        if (state.selectedRoom) {
            trackBookingConfirmed({
                bookingRef: ref,
                roomId: state.selectedRoom.roomId,
                roomName: state.selectedRoom.name,
                totalPrice: state.totalAmount,
                depositAmount: state.depositAmount,
                nights: state.nights,
                checkIn: state.checkIn,
                checkOut: state.checkOut,
            });
        }
    };

    const _handlePaymentError = (error: string) => {
        if (state.selectedRoom) {
            trackPaymentFailed({ roomName: state.selectedRoom.name, error });
        }
    };

    return (
        <div>
            <ProgressBar step={step} />
            {step === 0 && <StepDates state={state} onChange={set} onNext={next} />}
            {step === 1 && <StepRoom state={state} onChange={set} onNext={next} onBack={back} />}
            {step === 2 && <StepGuests state={state} onChange={set} onNext={next} onBack={back} />}
            {step === 3 && <StepExtras state={state} onChange={set} onNext={next} onBack={back} />}
            {step === 4 && <StepSummary state={state} onNext={next} onBack={back} />}
            {step === 5 && <StepPayment state={state} onSuccess={handlePaymentSuccess} onBack={back} locale={locale} />}
            {step === 6 && <StepConfirmation state={state} />}
        </div>
    );
}

export default function BookingWidget(props: Props) {
    return (
        <BookingErrorBoundary>
            <BookingWidgetInner {...props} />
        </BookingErrorBoundary>
    );
}
