/**
 * GET /api/booking/availability?checkIn=&checkOut=
 * Proxies to Beds25 availability endpoint.
 * Falls back to stub data when BEDS25_API_KEY is not set (dev mode).
 */

import { NextResponse } from 'next/server';
import { getAvailability } from '@/lib/beds25';

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
        const result = await getAvailability(checkIn, checkOut);
        return NextResponse.json(result);
    } catch (err: any) {
        console.error('[Availability] Error:', err);
        return NextResponse.json({ error: 'Unable to check availability' }, { status: 500 });
    }
}
