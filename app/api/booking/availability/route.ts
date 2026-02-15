import { NextResponse } from 'next/server';
import { z } from 'zod';

// Schema for availability query
const AvailabilityQuerySchema = z.object({
    dateFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    dateTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    guests: z.string().transform((val) => parseInt(val, 10)).optional(),
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // Validate query params
    const result = AvailabilityQuerySchema.safeParse({
        dateFrom: searchParams.get('from'),
        dateTo: searchParams.get('to'),
        guests: searchParams.get('guests') || '2',
    });

    if (!result.success) {
        return NextResponse.json(
            { error: 'Invalid parameters', details: result.error.formErrors },
            { status: 400 }
        );
    }

    const { dateFrom, dateTo, guests } = result.data;

    // TODO: Integrate with Zoho CRM here
    // For now, return mock availability based on the "Magical Pasture" concept

    const mockAvailability = {
        rooms: [
            {
                id: 'room-1',
                name: 'The Alpaca View Suite',
                description: 'Wake up to the sight of alpacas grazing right outside your window.',
                available: true,
                pricePerNight: 120,
                currency: 'EUR',
                maxGuests: 4,
                features: ['King Bed', 'Patio', 'Alpaca Treats included'],
                images: ['/images/rooms/suite-view.jpg']
            },
            {
                id: 'room-2',
                name: 'Shepherd’s Hut',
                description: 'Cozy and rustic, perfect for a romantic getaway.',
                available: false, // Mocking unavailability
                pricePerNight: 85,
                currency: 'EUR',
                maxGuests: 2,
                features: ['Queen Bed', 'Fireplace', 'Private Garden'],
                images: ['/images/rooms/hut.jpg']
            }
        ],
        activities: [
            {
                id: 'act-1',
                name: 'Morning Feeding',
                time: '09:00',
                availableSlots: 4,
                price: 20
            },
            {
                id: 'act-2',
                name: 'Alpaca Walk',
                time: '14:00',
                availableSlots: 0, // Sold out
                price: 35
            }
        ]
    };

    return NextResponse.json(mockAvailability);
}
