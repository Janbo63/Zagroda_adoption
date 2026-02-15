'use client';

import { BookingWizard } from '@/components/booking/BookingWizard';
import { AlpacaTinderMagical } from '@/components/animals/AlpacaTinderMagical'; // Fairy/Princess
import { AlpacaTinderNature } from '@/components/animals/AlpacaTinderNature';   // Royal Natural
import { AlpacaTinderGolden } from '@/components/animals/AlpacaTinderGolden';   // Golden Hour
import { AlpacaTinderPlayful } from '@/components/animals/AlpacaTinderPlayful'; // Pink/Playful (Original)
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Leaf, Sun, Heart } from 'lucide-react';

export default function BookingPage() {
    const [theme, setTheme] = useState<'magical' | 'nature' | 'golden' | 'playful'>('magical');

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="container mx-auto">

                {/* Theme Switcher - VISIBLE ONLY DURING DEV/REVIEW */}
                <div className="mb-8 p-4 bg-white rounded-xl shadow-md border border-gray-200 text-center max-w-2xl mx-auto">
                    <p className="text-sm text-gray-500 mb-3 font-bold uppercase tracking-wider">Select a Design Theme</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <Button
                            variant={theme === 'magical' ? 'default' : 'outline'}
                            onClick={() => setTheme('magical')}
                            className={theme === 'magical' ? "bg-purple-600 hover:bg-purple-700" : ""}
                        >
                            <Sparkles className="w-4 h-4 mr-2" /> Fairy/Magical
                        </Button>
                        <Button
                            variant={theme === 'nature' ? 'default' : 'outline'}
                            onClick={() => setTheme('nature')}
                            className={theme === 'nature' ? "bg-emerald-700 hover:bg-emerald-800" : ""}
                        >
                            <Leaf className="w-4 h-4 mr-2" /> Royal Nature
                        </Button>
                        <Button
                            variant={theme === 'golden' ? 'default' : 'outline'}
                            onClick={() => setTheme('golden')}
                            className={theme === 'golden' ? "bg-orange-500 hover:bg-orange-600" : ""}
                        >
                            <Sun className="w-4 h-4 mr-2" /> Golden Hour
                        </Button>
                        <Button
                            variant={theme === 'playful' ? 'default' : 'outline'}
                            onClick={() => setTheme('playful')}
                            className={theme === 'playful' ? "bg-pink-500 hover:bg-pink-600" : ""}
                        >
                            <Heart className="w-4 h-4 mr-2" /> Playful (Pink)
                        </Button>
                    </div>
                </div>

                <div className="mb-16">
                    {theme === 'magical' && <AlpacaTinderMagical />}
                    {theme === 'nature' && <AlpacaTinderNature />}
                    {theme === 'golden' && <AlpacaTinderGolden />}
                    {theme === 'playful' && <AlpacaTinderPlayful />}
                </div>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Start Your Adventure</h1>
                    <p className="text-lg text-gray-600">Select your dates and let the magic begin.</p>
                </div>
                <BookingWizard />
            </div>
        </div>
    );
}
