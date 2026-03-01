/**
 * GA4 event helpers — typed wrappers around window.gtag
 * Used throughout the booking funnel and key conversion points.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function gtag(...args: any[]) {
    if (typeof window === 'undefined' || !window.gtag) return;
    window.gtag(...args);
}

// ─── Booking Funnel Events ──────────────────────────────────────────────────

/** Step 1: Guest has selected dates and moves to room selection */
export function trackBeginCheckout(params: {
    checkIn: string;
    checkOut: string;
    nights: number;
}) {
    gtag('event', 'begin_checkout', {
        currency: 'PLN',
        value: 0, // unknown until room selected
        items: [],
        check_in_date: params.checkIn,
        check_out_date: params.checkOut,
        nights: params.nights,
    });
}

/** Step 2: Guest clicks on a specific room */
export function trackSelectRoom(params: {
    roomId: string;
    roomName: string;
    price: number;
    nights: number;
}) {
    gtag('event', 'select_item', {
        item_list_name: 'Available Rooms',
        items: [{
            item_id: params.roomId,
            item_name: params.roomName,
            item_category: 'Accommodation',
            price: params.price,
            quantity: 1,
        }],
        nights: params.nights,
        value: params.price,
        currency: 'PLN',
    });
}

/** Step 3: Guest views the room detail / proceeds to guest details */
export function trackAddToCart(params: {
    roomId: string;
    roomName: string;
    totalPrice: number;
    depositAmount: number;
    nights: number;
}) {
    gtag('event', 'add_to_cart', {
        currency: 'PLN',
        value: params.totalPrice,
        items: [{
            item_id: params.roomId,
            item_name: params.roomName,
            item_category: 'Accommodation',
            price: params.totalPrice,
            quantity: 1,
        }],
        nights: params.nights,
        deposit_amount: params.depositAmount,
    });
}

/** Step 4: Guest reaches payment step */
export function trackAddPaymentInfo(params: {
    roomId: string;
    roomName: string;
    totalPrice: number;
    depositAmount: number;
}) {
    gtag('event', 'add_payment_info', {
        currency: 'PLN',
        value: params.depositAmount,
        payment_type: 'Stripe',
        items: [{
            item_id: params.roomId,
            item_name: params.roomName,
            item_category: 'Accommodation',
            price: params.totalPrice,
            quantity: 1,
        }],
    });
}

/** Step 5 (client-side): Booking confirmation page reached */
export function trackBookingConfirmed(params: {
    bookingRef: string;
    roomId: string;
    roomName: string;
    totalPrice: number;
    depositAmount: number;
    nights: number;
    checkIn: string;
    checkOut: string;
}) {
    gtag('event', 'purchase', {
        transaction_id: params.bookingRef,
        currency: 'PLN',
        value: params.depositAmount,      // deposit paid now (revenue recognised)
        tax: 0,
        shipping: 0,
        items: [{
            item_id: params.roomId,
            item_name: params.roomName,
            item_category: 'Accommodation',
            price: params.totalPrice,
            quantity: 1,
        }],
        nights: params.nights,
        check_in_date: params.checkIn,
        check_out_date: params.checkOut,
        booking_value: params.totalPrice, // full stay value
    });
}

/** Voucher applied in booking flow */
export function trackVoucherApplied(params: {
    code: string;
    discount: number;
}) {
    gtag('event', 'select_promotion', {
        promotion_id: params.code,
        discount_value: params.discount,
    });
}

/** Payment failed */
export function trackPaymentFailed(params: {
    roomName: string;
    error: string;
}) {
    gtag('event', 'payment_failed', {
        room_name: params.roomName,
        error_message: params.error,
    });
}

// ─── Campaign / Landing Page Events ────────────────────────────────────────────

/** Generic custom event */
export function trackEvent(
    name: string,
    params?: Record<string, string | number | boolean>,
) {
    gtag('event', name, params);
}

// ── Scroll Depth ───────────────────────────────────────────────────────────────

const firedThresholds = new Set<number>();

/**
 * Call once on mount. Tracks scroll depth at 25 / 50 / 75 / 100 %.
 * Returns a cleanup function for useEffect.
 */
export function initScrollDepthTracking(pageName: string): () => void {
    firedThresholds.clear();

    const handler = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;

        const pct = Math.round((scrollTop / docHeight) * 100);

        for (const threshold of [25, 50, 75, 100]) {
            if (pct >= threshold && !firedThresholds.has(threshold)) {
                firedThresholds.add(threshold);
                trackEvent('scroll_depth', {
                    page: pageName,
                    percent: threshold,
                });
            }
        }
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
}

// ── CTA Click ──────────────────────────────────────────────────────────────────

/** Track which CTA was clicked and in which section */
export function trackCTAClick(ctaName: string, section: string) {
    trackEvent('cta_click', { cta_name: ctaName, section });
}

// ── Section View (Intersection Observer) ───────────────────────────────────────

const viewedSections = new Set<string>();

/**
 * Observe a DOM element. Fires `section_view` once when ≥ 30% visible.
 * Returns a cleanup function.
 */
export function observeSection(
    element: HTMLElement | null,
    sectionName: string,
): () => void {
    if (!element || typeof IntersectionObserver === 'undefined') return () => { };

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && !viewedSections.has(sectionName)) {
                viewedSections.add(sectionName);
                trackEvent('section_view', { section: sectionName });
            }
        },
        { threshold: 0.3 },
    );

    observer.observe(element);
    return () => observer.disconnect();
}
