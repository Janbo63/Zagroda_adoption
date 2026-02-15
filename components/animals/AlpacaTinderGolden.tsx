
'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { X, Heart, RotateCcw, Sun } from 'lucide-react';
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

export function AlpacaTinderGolden() {
    const [cards, setCards] = useState(MOCK_ALPACAS);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);
    if (!isMounted) return null;

    const activeCard = cards[cards.length - 1];

    const removeCard = (id: string, swipe: 'left' | 'right') => {
        setCards((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[700px] w-full bg-orange-50 py-12 relative overflow-hidden">
            {/* Sun Gradient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/40 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-200/40 to-transparent rounded-full blur-3xl" />

            <h2 className="text-4xl font-heading font-black text-orange-900 mb-2 tracking-tight relative z-10 flex items-center gap-3">
                <Sun className="w-10 h-10 text-orange-500" />
                Słoneczne Stado
            </h2>
            <p className="text-orange-700/60 mb-8 relative z-10 font-medium">Znajdź towarzysza na idealny dzień!</p>

            <div className="relative w-[340px] h-[520px] z-10">
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-3xl p-6 text-center shadow-lg">
                        <Heart className="h-16 w-16 text-orange-500 mb-4 animate-pulse" />
                        <h3 className="text-xl font-bold text-orange-800 mb-2">Świetny wybór!</h3>
                        <Button
                            onClick={() => setCards(MOCK_ALPACAS)}
                            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 py-3 font-bold shadow-orange-500/20 shadow-xl transition-all"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" /> Jeszcze raz
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function Card({ data, active, removeCard }: { data: AlpacaProfile, active: boolean, removeCard: (id: string, swipe: 'left' | 'right') => void }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-5, 5]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (_: any, info: any) => {
        if (Math.abs(info.offset.x) > 100) {
            removeCard(data.id, info.offset.x > 0 ? 'right' : 'left');
        }
    };

    if (!active) return (
        <div className="absolute inset-0 bg-orange-100 rounded-[32px] shadow-sm transform scale-95 translate-y-3 opacity-60 border border-orange-200 pointer-events-none"></div>
    );

    return (
        <motion.div
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 bg-white rounded-[32px] shadow-2xl shadow-orange-900/10 overflow-hidden cursor-grab active:cursor-grabbing border border-orange-100"
        >
            {/* Full Image */}
            <div className="absolute inset-0">
                <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Info Section */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-4xl font-heading font-black tracking-tight text-white mb-0 leading-none">
                        {data.name}
                    </h2>
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-bold border border-white/30">{data.age} lat</span>
                </div>

                <p className="text-orange-100 font-medium text-lg mb-6 flex items-center">
                    {data.role}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-between items-center px-2">
                    <button
                        onClick={() => removeCard(data.id, 'left')}
                        className="w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
                    >
                        <X className="w-6 h-6 stroke-[3]" />
                    </button>

                    <button
                        onClick={() => removeCard(data.id, 'right')}
                        className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/40 hover:bg-orange-400 hover:scale-105 transition-all"
                    >
                        <Heart className="w-8 h-8 fill-current" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
