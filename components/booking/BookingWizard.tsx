
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, Users, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- Types & Schemas ---

const BookingStepSchema = z.object({
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    }),
    guests: z.number().min(1).max(6),
    selectedItem: z.string().optional(), // Room ID or Activity ID
    contact: z.object({
        firstName: z.string().min(2, "Name required"),
        email: z.string().email("Invalid email"),
    })
});

type BookingState = z.infer<typeof BookingStepSchema>;

export function BookingWizard() {
    const [step, setStep] = useState(1);
    const [availability, setAvailability] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<BookingState>({
        resolver: zodResolver(BookingStepSchema),
        defaultValues: {
            guests: 2,
            dateRange: {
                from: new Date(),
                to: addDays(new Date(), 2),
            },
            contact: { firstName: '', email: '' }
        }
    });

    const { watch, setValue, register, handleSubmit } = form;
    const formData = watch();

    // --- Actions ---

    const searchAvailability = async () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setAvailability([
                { id: 'room-1', name: 'Alpaca View Suite', price: 120, image: '/images/rooms/suite-view.jpg' },
                { id: 'room-2', name: 'Shepherd\'s Hut', price: 85, image: '/images/rooms/hut.jpg' },
            ]);
            setIsLoading(false);
            setStep(2);
        }, 1000);
    };

    const submitBooking = async (data: BookingState) => {
        console.log('Booking Submitted', data);
        setStep(4); // Success
    };

    // --- Render Steps ---

    return (
        <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-magical-gold/20">
            {/* Progress Bar */}
            <div className="h-2 bg-gray-100 flex">
                <div className={cn("h-full bg-magical-gold transition-all duration-500",
                    step === 1 && "w-1/4",
                    step === 2 && "w-1/2",
                    step === 3 && "w-3/4",
                    step === 4 && "w-full"
                )} />
            </div>

            <div className="p-6 md:p-8">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-heading font-bold text-gray-800">
                        {step === 1 && "When would you like to visit?"}
                        {step === 2 && "Choose your Magical Stay"}
                        {step === 3 && "Who is joining the adventure?"}
                        {step === 4 && "Pack your bags!"}
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Step {step} of 4 • {step === 1 ? 'Dates' : step === 2 ? 'Rooms' : step === 3 ? 'Details' : 'Success'}
                    </p>
                </div>

                {/* STEP 1: DATES */}
                {step === 1 && (
                    <div className="flex flex-col items-center space-y-6">
                        <div className="w-full max-w-md p-6 bg-blue-50/50 rounded-lg border border-blue-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                            <input
                                type="date"
                                className="w-full p-3 border rounded-md"
                                value={formData.dateRange.from.toISOString().split('T')[0]}
                                onChange={(e) => setValue('dateRange.from', new Date(e.target.value))}
                            />
                            <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">Guests</label>
                            <div className="flex items-center space-x-4">
                                <Button variant="outline" size="sm" onClick={() => setValue('guests', Math.max(1, formData.guests - 1))}>-</Button>
                                <span className="text-xl font-bold w-8 text-center">{formData.guests}</span>
                                <Button variant="outline" size="sm" onClick={() => setValue('guests', Math.min(6, formData.guests + 1))}>+</Button>
                            </div>
                        </div>
                        <Button variant="magical" size="lg" onClick={searchAvailability} disabled={isLoading}>
                            {isLoading ? 'Searching...' : 'Find Availability'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* STEP 2: ROOM SELECTION */}
                {step === 2 && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {availability.map((room) => (
                            <div key={room.id} className={cn(
                                "border rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg",
                                formData.selectedItem === room.id ? "border-magical-pasture ring-2 ring-magical-pasture bg-green-50" : "border-gray-200"
                            )} onClick={() => setValue('selectedItem', room.id)}>
                                <div className="h-40 bg-gray-200 rounded-md mb-4 overflow-hidden relative">
                                    {/* Placeholder for image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        [Image: {room.name}]
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">{room.name}</h3>
                                <p className="text-2xl font-bold text-magical-gold mt-2">€{room.price}<span className="text-sm text-gray-500 font-normal">/night</span></p>
                            </div>
                        ))}
                        <div className="col-span-full flex justify-between mt-6">
                            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                            <Button variant="magical" disabled={!formData.selectedItem} onClick={() => setStep(3)}>
                                Continue <ArrowRight className="ml-2" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* STEP 3: DETAILS */}
                {step === 3 && (
                    <form onSubmit={handleSubmit(submitBooking)} className="space-y-6 max-w-md mx-auto">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Your Name</label>
                            <input {...register('contact.firstName')} className="w-full p-3 border rounded-md" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <input {...register('contact.email')} className="w-full p-3 border rounded-md" placeholder="john@example.com" />
                        </div>
                        <div className="flex justify-between pt-4">
                            <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                            <Button type="submit" variant="magical" size="lg">Confirm Booking</Button>
                        </div>
                    </form>
                )}

                {/* STEP 4: SUCCESS */}
                {step === 4 && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <Check className="h-10 w-10" />
                        </div>
                        <h2 className="text-3xl font-heading font-bold mb-4">Adventure Awaits!</h2>
                        <p className="text-gray-600 mb-8">We have received your booking request. Alfie sent an email to <strong>{formData.contact.email}</strong> with next steps.</p>
                        <Button variant="outline" onClick={() => window.location.reload()}>Book Another</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
