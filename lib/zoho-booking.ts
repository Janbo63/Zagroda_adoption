/**
 * Zoho CRM — Booking operations
 * Creates and manages booking records in the custom 'Bookings' module.
 * If the Zoho API name differs (e.g. 'CustomModule5'), update ZOHO_BOOKINGS_MODULE below.
 */

import { zoho } from '@/lib/zoho';

// Zoho custom module API names — update if different in your setup
const ZOHO_BOOKINGS_MODULE = 'Bookings';
const ZOHO_ROOMS_MODULE = 'Rooms';

export interface BookingGuestDetails {
    name: string;
    email: string;
    phone: string;
    adults: number;
    children: { age: number }[];
    specialRequests?: string;
    nipNumber?: string;
}

export interface CreateBookingDealParams {
    room: { id: string; name: string };
    checkIn: string;   // YYYY-MM-DD
    checkOut: string;  // YYYY-MM-DD
    nights: number;
    guest: BookingGuestDetails;
    depositAmount: number;   // in PLN (not cents)
    balanceAmount: number;   // in PLN
    totalAmount: number;     // in PLN
    voucherCode?: string;
    voucherAmount?: number;
    stripeDepositId?: string;
    stripeCustomerId?: string;
    stripePaymentMethodId?: string;
    locale: string;
}

export interface BookingDealResult {
    zohoBookingRef: string;
    zohoDealId: string;
}

export async function createBookingDeal(
    params: CreateBookingDealParams
): Promise<BookingDealResult> {
    const nameParts = params.guest.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || firstName;

    // 1. Create or find the guest as a Contact
    const contactId = await zoho.createOrFindContact({
        email: params.guest.email,
        firstName,
        lastName,
        phone: params.guest.phone,
    });

    // 2. Look up the Room record by Beds24_Room_ID
    let zohoRoomId: string | null = null;
    try {
        const roomResult = await zoho.searchRecord(
            ZOHO_ROOMS_MODULE,
            `(Beds24_Room_ID:equals:${params.room.id})`
        );
        zohoRoomId = roomResult?.data?.[0]?.id || null;
    } catch {
        console.warn(`[Booking] Room lookup failed for Beds24 ID ${params.room.id} — will store name only`);
    }

    const childrenSummary = params.guest.children.length > 0
        ? params.guest.children.map((c, i) => `Child ${i + 1}: ${c.age}y`).join(', ')
        : 'No children';

    const bookingData: Record<string, any> = {
        // ─── Fields that ALREADY EXIST in your Bookings module ───
        Check_In: params.checkIn,
        Check_Out: params.checkOut,
        Booking_status: 'DEPOSIT_PAID',
        Payment_status: 'Deposit Paid',
        Channel: 'Website',
        Payment_Method: 'Stripe',
        Booking_Notes: params.guest.specialRequests || '',
        Arrival_time: '15:00',
        Email: params.guest.email,
        Number_of_Adults: params.guest.adults,
        Number_of_Children: params.guest.children.length,
        Guest_Ages: childrenSummary,
        Total_Price: params.totalAmount,
        Locale: params.locale,

        // ─── Fields you NEED TO CREATE in Zoho if not present ───
        Nights: params.nights,
        NIP_Number: params.guest.nipNumber || '',
        Deposit_Amount: params.depositAmount,
        Balance_Amount: params.balanceAmount,
        Stripe_Deposit_ID: params.stripeDepositId,
        Stripe_Customer_ID: params.stripeCustomerId,
        Stripe_Payment_Method_ID: params.stripePaymentMethodId,
    };

    // Link to Room record if found, otherwise store name as text
    if (zohoRoomId) {
        bookingData.Room = zohoRoomId;
    }

    if (params.voucherCode) {
        bookingData.Voucher_code = params.voucherCode;
        bookingData.Discount_amount = params.voucherAmount || 0;
    }

    if (contactId) {
        bookingData.Guest = contactId;
    }

    const result = await zoho.createRecord(ZOHO_BOOKINGS_MODULE, bookingData);
    const dealId = result?.data?.[0]?.details?.id;

    if (!dealId) {
        throw new Error('Failed to create Zoho booking record — no ID returned');
    }

    // Zoho Deal Name is used as the booking ref (Zoho auto-generates or we set it)
    // We use dealId as fallback ref if no formatted ref available
    const zohoBookingRef = result?.data?.[0]?.details?.name || `ZAP-${dealId.slice(-6)}`;

    return { zohoBookingRef, zohoDealId: dealId };
}

export async function updateBookingStatus(
    bookingId: string,
    status: 'DEPOSIT_PAID' | 'BALANCE_PENDING' | 'FULLY_PAID' | 'PAYMENT_FAILED' | 'CANCELLED',
    extraFields?: Record<string, any>
): Promise<void> {
    await zoho.updateRecord(ZOHO_BOOKINGS_MODULE, bookingId, {
        Booking_status: status,
        ...(extraFields || {}),
    });
}

export async function redeemVoucherInZoho(
    voucherCode: string,
    zohoDealId: string
): Promise<void> {
    // Search for the voucher record in Zoho by code
    const result = await zoho.searchRecord('Vouchers', `(Voucher_Code:equals:${voucherCode})`);
    const voucher = result?.data?.[0];
    if (!voucher) {
        console.warn(`Voucher ${voucherCode} not found in Zoho — skipping redemption`);
        return;
    }

    await zoho.updateRecord('Vouchers', voucher.id, {
        Status: 'Redeemed',
        Redeemed_Date: new Date().toISOString().split('T')[0],
        Booking_Deal_ID: zohoDealId,
    });
}
