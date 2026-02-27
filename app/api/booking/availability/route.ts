import { NextResponse } from 'next/server';
import { getAvailability, getRooms } from '@/lib/beds25';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');

    if (!checkIn || !checkOut) {
        return NextResponse.json({ error: 'checkIn and checkOut are required' }, { status: 400 });
    }

    // Basic date validation
    const ci = new Date(checkIn);
    const co = new Date(checkOut);
    if (isNaN(ci.getTime()) || isNaN(co.getTime()) || co <= ci) {
        return NextResponse.json({ error: 'Invalid date range' }, { status: 400 });
    }

    try {
        // Fetch availability and full room catalogue in parallel
        const [availability, rooms] = await Promise.all([
            getAvailability(checkIn, checkOut),
            getRooms().catch(() => []),  // non-fatal — amenities are nice-to-have
        ]);

        // Build a lookup by room ID for enrichment
        const roomMap = new Map(rooms.map(r => [r.id, r]));

        // Enrich available rooms with amenities, descriptions, rack rate from catalogue
        availability.availableRooms = availability.availableRooms.map(room => {
            const catalogue = roomMap.get(room.id);
            if (catalogue) {
                room.amenities = room.amenities?.length ? room.amenities : catalogue.amenities || [];
                room.description = room.description || catalogue.description || '';
                room.rackRate = room.rackRate ?? catalogue.rackRate ?? undefined;
            }
            return room;
        });

        return NextResponse.json(availability);
    } catch (err: any) {
        console.error('[Availability] Error:', err);
        return NextResponse.json({ error: 'Unable to check availability' }, { status: 500 });
    }
}
