
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
    { id: '1', name: 'TEDDY', role: 'Spokojny Lider', age: 7, image: '/images/alpacas/teddy.jpg', color: '' },
    { id: '2', name: 'FREDDY', role: 'Bystry Czarus', age: 6, image: '/images/alpacas/freddy.jpg', color: '' },
    { id: '3', name: 'RICKY', role: 'Slodka Gadula', age: 5, image: '/images/alpacas/ricky.jpg', color: '' },
    { id: '4', name: 'MICKEY', role: 'Ciekawski podroznik', age: 7, image: '/images/alpacas/mickey.jpg', color: '' },
    { id: '5', name: 'SURI', role: 'Prawdziwy Elegant', age: 7, image: '/images/alpacas/suri.jpg', color: '' },
];

export function AlpacaTinderNature() {
    const [cards, setCards] = useState(MOCK_ALPACAS);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);
    if (!isMounted) return null;

    const activeCard = cards[cards.length - 1];

    const removeCard = (id: string, swipe: 'left' | 'right') => {
        setCards((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[700px] w-full bg-[#fdfbf7] py-12 relative overflow-hidden border-b-4 border-stone-200">
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-green-50/50 to-transparent pointer-events-none" />

            <h2 className="text-4xl font-heading font-bold text-stone-800 mb-2 tracking-tight relative z-10">Poznaj Stado (Nature)</h2>
            <p className="text-stone-500 mb-8 relative z-10 font-medium">Przesuń w prawo, aby polubić!</p>

            <div className="relative w-[320px] h-[480px] z-10">
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border-2 border-dashed border-stone-300 rounded-3xl p-6 text-center shadow-sm">
                        <Heart className="h-16 w-16 text-green-600 mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-stone-700 mb-2">To już wszystkie alpaki!</h3>
                        <Button
                            onClick={() => setCards(MOCK_ALPACAS)}
                            className="bg-green-700 hover:bg-green-800 text-white rounded-full px-8 py-2 font-bold shadow-md transition-all"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" /> Zacznij od nowa
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function Card({ data, active, removeCard }: { data: AlpacaProfile, active: boolean, removeCard: (id: string, swipe: 'left' | 'right') => void }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-10, 10]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (_: any, info: any) => {
        if (Math.abs(info.offset.x) > 100) {
            removeCard(data.id, info.offset.x > 0 ? 'right' : 'left');
        }
    };

    if (!active) return (
        <div className="absolute inset-0 bg-stone-100 rounded-3xl shadow-sm transform scale-95 translate-y-4 opacity-60 border border-stone-200 pointer-events-none"></div>
    );

    return (
        <motion.div
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing border-[6px] border-white ring-1 ring-stone-900/5"
        >
            <div className="absolute top-3 left-3 right-3 bottom-36 bg-stone-100 rounded-2xl overflow-hidden">
                <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-36 bg-white px-6 pt-4">
                <div className="flex items-baseline justify-between mb-1">
                    <h2 className="text-3xl font-heading font-black text-stone-800 uppercase tracking-tight">
                        {data.name}
                    </h2>
                    <span className="text-sm font-bold text-stone-400 border border-stone-200 px-2 py-0.5 rounded-full">{data.age} lat</span>
                </div>

                <p className="text-green-700 font-bold text-sm mb-6 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    {data.role}
                </p>

                <div className="flex justify-center gap-8 mb-4">
                    <button
                        onClick={() => removeCard(data.id, 'left')}
                        className="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center text-stone-400 hover:bg-stone-100 hover:border-stone-300 transition-colors"
                    >
                        <X className="w-6 h-6 stroke-[3]" />
                    </button>

                    <button
                        onClick={() => removeCard(data.id, 'right')}
                        className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-600/30 hover:bg-green-700 hover:scale-105 transition-all"
                    >
                        <Heart className="w-6 h-6 fill-current" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
