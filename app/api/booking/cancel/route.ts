import { NextResponse } from 'next/server';
import { cancelBeds25Booking } from '@/lib/beds25';
import { updateBookingDealStatus } from '@/lib/zoho-booking';

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
        const expectedSecret = process.env.CRON_SECRET;

        if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { zohoDealId, beds25BookingRef } = await req.json();

        if (!zohoDealId || !beds25BookingRef) {
            return NextResponse.json({ error: 'Missing zohoDealId or beds25BookingRef' }, { status: 400 });
        }

        // 1. Cancel in Beds25 (frees up the calendar)
        await cancelBeds25Booking(beds25BookingRef);

        // 2. Update Deal in Zoho CRM
        await updateBookingDealStatus(zohoDealId, 'CANCELLED');

        return NextResponse.json({ success: true, message: 'Booking cancelled successfully' });

    } catch (error: any) {
        console.error('[Cancel Booking API Error]', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
