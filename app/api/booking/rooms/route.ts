/**
 * GET /api/booking/rooms
 * Returns the full room catalogue from Beds25.
 * Used by BookingWidget to display room descriptions, amenities, and metadata.
 */

import { NextResponse } from 'next/server';
import { getRooms } from '@/lib/beds25';

export async function GET() {
    try {
        const rooms = await getRooms();
        return NextResponse.json(rooms);
    } catch (err: any) {
        console.error('[Rooms API] Error:', err);
        return NextResponse.json({ error: 'Unable to fetch rooms' }, { status: 500 });
    }
}
