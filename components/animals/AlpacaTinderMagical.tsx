
'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { X, Heart, Info, RotateCcw, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AlpacaProfile {
    id: string;
    name: string;
    role: string;
    age: number;
    image: string;
    color: string;
}

const MOCK_ALPACAS: AlpacaProfile[] = [
    { id: '1', name: 'TEDDY', role: 'Spokojny Lider', age: 7, image: '/images/alpacas/teddy.jpg', color: 'bg-purple-100' },
    { id: '2', name: 'FREDDY', role: 'Bystry Czarus', age: 6, image: '/images/alpacas/freddy.jpg', color: 'bg-purple-100' },
    { id: '3', name: 'RICKY', role: 'Slodka Gadula', age: 5, image: '/images/alpacas/ricky.jpg', color: 'bg-purple-100' },
    { id: '4', name: 'MICKEY', role: 'Ciekawski podroznik', age: 7, image: '/images/alpacas/mickey.jpg', color: 'bg-purple-100' },
    { id: '5', name: 'SURI', role: 'Prawdziwy Elegant', age: 7, image: '/images/alpacas/suri.jpg', color: 'bg-purple-100' },
];

export function AlpacaTinderMagical() {
    const [cards, setCards] = useState(MOCK_ALPACAS);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);
    if (!isMounted) return null;

    const removeCard = (id: string, swipe: 'left' | 'right') => {
        setCards((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[800px] w-full bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 py-12 relative overflow-hidden">
            {/* Magical Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white opacity-40 blur-xl"
                        initial={{
                            x: Math.random() * 1000,
                            y: Math.random() * 800,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            x: [null, Math.random() * 100 - 50],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center relative z-10 mb-10"
            >
                <h2 className="text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 drop-shadow-sm">
                    Poznaj Naszych Książąt
                </h2>
                <p className="text-slate-500 text-lg font-light tracking-wide">
                    Wybierz swojego towarzysza spaceru ✨
                </p>
            </motion.div>

            <div className="relative w-[360px] h-[540px] z-10 perspective-1000">
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
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 text-center shadow-2xl"
                    >
                        <div className="bg-white/50 p-6 rounded-full mb-6 shadow-inner">
                            <Star className="h-12 w-12 text-yellow-500 animate-pulse fill-yellow-500" />
                        </div>
                        <h3 className="text-3xl font-heading font-bold text-slate-700 mb-3">Magia Dokonana!</h3>
                        <p className="text-slate-500 mb-8">Czy chciałbyś poznać ich jeszcze raz?</p>
                        <Button
                            onClick={() => setCards(MOCK_ALPACAS)}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-10 py-6 text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            <RotateCcw className="mr-2 h-5 w-5" /> Zaczaruj ponownie
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

function Card({ data, active, removeCard }: { data: AlpacaProfile, active: boolean, removeCard: (id: string, swipe: 'left' | 'right') => void }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-8, 8]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
    const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);

    // Smooth gradient overlay for delight
    const bgGradient = useTransform(
        x,
        [-200, 0, 200],
        ["linear-gradient(to right, rgba(239, 68, 68, 0.2), rgba(255,255,255,0))", "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0))", "linear-gradient(to left, rgba(34, 197, 94, 0.2), rgba(255,255,255,0))"]
    );

    const handleDragEnd = (_: any, info: any) => {
        if (Math.abs(info.offset.x) > 100) {
            removeCard(data.id, info.offset.x > 0 ? 'right' : 'left');
        }
    };

    if (!active) return (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-[40px] shadow-lg transform scale-90 translate-y-8 opacity-40 border border-white/30 pointer-events-none"></div>
    );

    return (
        <motion.div
            style={{ x, rotate, opacity, scale, background: bgGradient }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-[40px] shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/60"
        >
            {/* Image Container with Parallax Effect */}
            <div className="absolute top-0 left-0 right-0 h-[75%] overflow-hidden">
                <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/0 to-white/0" />
            </div>

            {/* Content Container */}
            <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-white via-white/95 to-transparent px-8 pb-8 flex flex-col justify-end">
                <div className="mb-4">
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-4xl font-heading font-black text-slate-800">
                            {data.name}
                        </h2>
                        <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {data.age} lat
                        </div>
                    </div>
                    <p className="text-lg text-purple-600/80 font-medium font-heading">{data.role}</p>
                </div>

                {/* Floating Action Buttons */}
                <div className="flex justify-between items-center px-4">
                    <button
                        onClick={() => removeCard(data.id, 'left')}
                        className="w-14 h-14 rounded-full bg-white border border-slate-100 shadow-lg text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-200 hover:scale-110 transition-all duration-300"
                    >
                        <X className="w-6 h-6 stroke-[2.5]" />
                    </button>

                    <button className="w-12 h-12 rounded-full bg-white/50 border border-white shadow-sm flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-500 transition-all">
                        <Info className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => removeCard(data.id, 'right')}
                        className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl shadow-purple-500/30 text-white flex items-center justify-center hover:scale-110 hover:shadow-purple-500/50 transition-all duration-300"
                    >
                        <Heart className="w-7 h-7 fill-white" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
