import { NextResponse } from 'next/server';
import { z } from 'zod';

// Schema for booking submission
const BookingSubmissionSchema = z.object({
    contact: z.object({
        email: z.string().email(),
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        phone: z.string().optional(),
    }),
    booking: z.object({
        type: z.enum(['room', 'activity']),
        itemId: z.string(),
        date: z.string(),
        endDate: z.string().optional(), // Required for rooms
        guests: z.number().min(1),
    })
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = BookingSubmissionSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid booking data', details: result.error.formErrors },
                { status: 400 }
            );
        }

        const { contact, booking } = result.data;

        // TODO: 
        // 1. Create/Find Contact in Zoho (using existing lib/zoho.ts logic)
        // 2. Create Deal/Booking record in Zoho associated with Contact
        // 3. Trigger confirmation email

        console.log('Processing booking for:', contact.email, 'Item:', booking.itemId);

        // Mock successful response
        return NextResponse.json({
            success: true,
            bookingId: `BK-${Date.now()}`, // Temporary ID
            message: 'Booking request received! We are confirming with the alpacas.'
        });

    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
