/**
 * Beds25 API Client
 * Calls our internal Beds25 service (admin.zagrodaalpakoterapii.com)
 * for availability checks, room images, and booking creation/management.
 */

const BEDS25_BASE_URL = process.env.BEDS25_BASE_URL || 'https://admin.zagrodaalpakoterapii.com';
const BEDS25_API_KEY = process.env.BEDS25_API_KEY || '';

async function beds25Fetch(path: string, options: RequestInit = {}): Promise<any> {
    const url = `${BEDS25_BASE_URL}${path}`;
    const res = await fetch(url, {
        ...options,
        headers: {
            'Authorization': `Bearer ${BEDS25_API_KEY}`,
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Beds25 API error ${res.status} ${path}: ${text}`);
    }

    return res.json();
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NightlyPrice {
    date: string;
    price: number;
}

export interface RoomPricing {
    nights: number;
    totalPrice: number;
    averagePerNight: number;
    currency: string;
    nightlyBreakdown: NightlyPrice[];
}

export interface AvailableRoom {
    id: string;           // Beds25 room ID
    name: string;
    capacity: number;     // max guests
    maxAdults: number;
    maxChildren: number;
    minNights: number;
    basePrice: number;    // per-night base
    amenities: string[];
    pricing: RoomPricing;
}

export interface AvailabilityResult {
    checkIn: string;
    checkOut: string;
    nights: number;
    availableRooms: AvailableRoom[];
}

export interface RoomImage {
    id: string;
    url: string;
    type: 'HERO' | 'GALLERY' | 'THUMBNAIL' | 'PROPERTY';
    altText?: string;
    sortOrder: number;
}

export interface CreateBookingPayload {
    bookingRef: string;           // From Zoho — same ref in Zoho, Beds25, Beds24, guest email
    zohoBookingDealId: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    adults: number;
    children: { age: number }[];
    specialRequests?: string;
    nipNumber?: string;
    voucherCode?: string;
    voucherAmount?: number;
    depositAmount: number;
    balanceAmount: number;
    stripeDepositId: string;
    stripeCustomerId: string;
    stripePaymentMethodId: string;
    locale: string;
    source: 'alpaca-site';
}

export interface Beds25BookingResult {
    bookingRef: string;
    beds24BookingId: string | null;  // null if Beds24 temporarily unreachable — non-fatal
    status: string;
    nights: number;
    balanceDueDate: string;  // checkIn - 3 days
}

// ─── API Functions ─────────────────────────────────────────────────────────────

/**
 * Check room availability for a date range.
 * Uses stub data when BEDS25_API_KEY is not configured (dev mode).
 */
export async function getAvailability(
    checkIn: string,
    checkOut: string
): Promise<AvailabilityResult> {
    const nights = Math.round(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
    );

    if (!BEDS25_API_KEY) {
        // Stub matching the actual Beds25 response shape
        return {
            checkIn,
            checkOut,
            nights,
            availableRooms: [
                {
                    id: 'room-garden',
                    name: 'Garden Room',
                    capacity: 3,
                    maxAdults: 2,
                    maxChildren: 1,
                    minNights: 2,
                    basePrice: 330,
                    amenities: ['WiFi', 'Breakfast', 'Private bathroom'],
                    pricing: { nights, totalPrice: 330 * nights, averagePerNight: 330, currency: 'PLN', nightlyBreakdown: [] },
                },
                {
                    id: 'room-jungle',
                    name: 'Jungle Room',
                    capacity: 3,
                    maxAdults: 2,
                    maxChildren: 1,
                    minNights: 2,
                    basePrice: 330,
                    amenities: ['WiFi', 'Breakfast', 'Private bathroom'],
                    pricing: { nights, totalPrice: 330 * nights, averagePerNight: 330, currency: 'PLN', nightlyBreakdown: [] },
                },
                {
                    id: 'room-forest',
                    name: 'Forest Apartment',
                    capacity: 5,
                    maxAdults: 2,
                    maxChildren: 3,
                    minNights: 2,
                    basePrice: 410,
                    amenities: ['WiFi', 'Breakfast', 'Kitchen', 'Separate bedroom'],
                    pricing: { nights, totalPrice: 410 * nights, averagePerNight: 410, currency: 'PLN', nightlyBreakdown: [] },
                },
            ],
        };
    }

    return beds25Fetch(`/api/public/availability?checkIn=${checkIn}&checkOut=${checkOut}`);
}

/**
 * Get images for a specific room, optionally filtered by type.
 */
export async function getRoomImages(
    roomId: string,
    type?: 'HERO' | 'GALLERY' | 'THUMBNAIL' | 'PROPERTY'
): Promise<RoomImage[]> {
    if (!BEDS25_API_KEY) {
        // Stub images pointing to existing local assets
        return [
            { id: 'stub-1', url: '/images/Rooms/garden1.jpg', type: 'HERO' as const, altText: 'Room hero', sortOrder: 0 },
            { id: 'stub-2', url: '/images/Rooms/garden2.jpg', type: 'GALLERY' as const, altText: 'Room gallery', sortOrder: 1 },
        ];
    }

    const qs = type ? `?type=${type}` : '';
    const result = await beds25Fetch(`/api/public/rooms/${roomId}/images${qs}`);
    return result.images || [];
}

/**
 * Create a booking in Beds25 after Stripe payment confirmed.
 * Beds25 mirrors the booking to Beds24 to block OTA calendar.
 */
export async function createBeds25Booking(
    payload: CreateBookingPayload
): Promise<Beds25BookingResult> {
    if (!BEDS25_API_KEY) {
        // Stub response for development
        const nights = Math.round(
            (new Date(payload.checkOut).getTime() - new Date(payload.checkIn).getTime()) / 86400000
        );
        const balanceDate = new Date(payload.checkIn);
        balanceDate.setDate(balanceDate.getDate() - 3);
        console.warn('[Beds25] API key not set — using stub booking creation');
        return {
            bookingRef: payload.bookingRef,
            beds24BookingId: 'STUB-99999',
            status: 'DEPOSIT_PAID',
            nights,
            balanceDueDate: balanceDate.toISOString().split('T')[0],
        };
    }

    return beds25Fetch('/api/public/booking/create', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

/**
 * Cancel a booking — updates Beds25 status and releases Beds24 OTA dates.
 */
export async function cancelBeds25Booking(bookingRef: string): Promise<void> {
    if (!BEDS25_API_KEY) {
        console.warn('[Beds25] API key not set — stub cancel');
        return;
    }

    await beds25Fetch(`/api/public/booking/${bookingRef}/cancel`, { method: 'POST' });
}

/**
 * Validate a voucher code against Zoho CRM via Beds25 proxy.
 * Returns discount info or throws if invalid/expired.
 */
export interface VoucherValidationResult {
    valid: boolean;
    code: string;
    discountType: 'PERCENT' | 'FIXED';
    discountValue: number;
    description?: string;
    error?: string;
}

export async function validateVoucher(code: string): Promise<VoucherValidationResult> {
    // Direct Zoho voucher validation — Beds25 not needed for this
    // This calls our own /api/booking/voucher route which queries Zoho
    const res = await fetch('/api/booking/voucher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
    });

    if (!res.ok) {
        return { valid: false, code, discountType: 'FIXED', discountValue: 0, error: 'Validation failed' };
    }

    return res.json();
}
