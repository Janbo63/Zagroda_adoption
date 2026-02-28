/**
 * GA4 event helpers — typed wrappers around window.gtag
 * Used throughout the booking funnel and key conversion points.
 */

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

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
