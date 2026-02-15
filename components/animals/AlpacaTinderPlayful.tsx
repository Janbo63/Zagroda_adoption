
'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { X, Heart, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AlpacaProfile {
    id: string;
    name: string;
    role: string;
    age: number;
    image: string;
    color: string;
}

const MOCK_ALPACAS: AlpacaProfile[] = [
    { id: '1', name: 'TEDDY', role: 'Spokojny Lider', age: 7, image: '/images/alpacas/teddy.jpg', color: 'bg-pink-200' },
    { id: '2', name: 'FREDDY', role: 'Bystry Czarus', age: 6, image: '/images/alpacas/freddy.jpg', color: 'bg-pink-200' },
    { id: '3', name: 'RICKY', role: 'Slodka Gadula', age: 5, image: '/images/alpacas/ricky.jpg', color: 'bg-pink-200' },
    { id: '4', name: 'MICKEY', role: 'Ciekawski podroznik', age: 7, image: '/images/alpacas/mickey.jpg', color: 'bg-pink-200' },
    { id: '5', name: 'SURI', role: 'Prawdziwy Elegant', age: 7, image: '/images/alpacas/suri.jpg', color: 'bg-pink-200' },
];

export function AlpacaTinderPlayful() {
    const [cards, setCards] = useState(MOCK_ALPACAS);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);
    if (!isMounted) return null;

    const activeCard = cards[cards.length - 1];

    const removeCard = (id: string, swipe: 'left' | 'right') => {
        setCards((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[700px] w-full bg-pink-50/50 py-12 border-b-4 border-pink-200">
            <h2 className="text-4xl font-heading font-bold text-pink-500 mb-8 tracking-wide">Znajdź swoją parę! (Playful)</h2>

            <div className="relative w-[320px] h-[480px]">
                <AnimatePresence>
                    {cards.map((card, index) => (
                        <Card
                            key={card.id}
                            data={card}
                            active={index === cards.length - 1}
                            removeCard={removeCard}
                        />
                    ))}
                </AnimatePresence>

                {cards.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border-4 border-pink-300 rounded-3xl p-6 text-center shadow-xl">
                        <Heart className="h-16 w-16 text-pink-500 mb-4 animate-bounce" />
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">That's everyone!</h3>
                        <Button
                            onClick={() => setCards(MOCK_ALPACAS)}
                            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-2 font-bold"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" /> Start Again
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function Card({ data, active, removeCard }: { data: AlpacaProfile, active: boolean, removeCard: (id: string, swipe: 'left' | 'right') => void }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (_: any, info: any) => {
        if (Math.abs(info.offset.x) > 100) {
            removeCard(data.id, info.offset.x > 0 ? 'right' : 'left');
        }
    };

    if (!active) return (
        <div className="absolute inset-0 bg-white rounded-3xl shadow-xl transform scale-95 translate-y-4 opacity-50 border-4 border-pink-300/50 pointer-events-none"></div>
    );

    return (
        <motion.div
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 bg-pink-100 rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing border-8 border-white ring-4 ring-pink-200"
        >
            {/* Decorative Frame */}
            <div className="absolute top-2 left-2 right-2 bottom-32 bg-white rounded-t-2xl rounded-b-lg p-2 shadow-inner">
                {/* Photo */}
                <div className="w-full h-full bg-gray-200 rounded overflow-hidden relative group">
                    <img
                        src={data.image}
                        alt={data.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-pink-300 rounded-tl-md"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-pink-300 rounded-tr-md"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-pink-300 rounded-bl-md"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-pink-300 rounded-br-md"></div>
                </div>
            </div>

            {/* Text Details */}
            <div className="absolute bottom-20 left-0 right-0 text-center">
                <h2 className="text-3xl font-black text-pink-500 uppercase tracking-wider drop-shadow-sm flex justify-center items-center gap-2">
                    {data.name}
                    <span className="text-xl text-blue-400">♂</span>
                </h2>
                <p className="text-pink-600 font-bold text-sm">{data.role}</p>
                <p className="text-pink-400 text-xs font-semibold">wiek: {data.age} lat</p>
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-16 px-8">
                <div className="relative group">
                    <button
                        onClick={() => removeCard(data.id, 'left')}
                        className="w-14 h-14 bg-white rounded-full border-4 border-gray-600 flex items-center justify-center shadow-lg transition-transform transform group-hover:scale-110"
                    >
                        <X className="w-8 h-8 text-gray-600 stroke-[3]" />
                    </button>
                </div>

                <div className="relative group">
                    <button
                        onClick={() => removeCard(data.id, 'right')}
                        className="w-14 h-14 bg-pink-500 rounded-full border-4 border-pink-500 flex items-center justify-center shadow-lg transition-transform transform group-hover:scale-110"
                    >
                        <Heart className="w-8 h-8 text-white fill-current" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
