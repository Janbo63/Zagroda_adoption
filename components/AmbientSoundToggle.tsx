"use client";

import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function AmbientSoundToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const soundRef = useRef<Howl | null>(null);

    const toggleSound = () => {
        if (!soundRef.current) {
            soundRef.current = new Howl({
                src: ["/ambient-nature.mp3"],
                loop: true,
                volume: 0,
            });
        }

        if (isPlaying) {
            soundRef.current.fade(0.3, 0, 1000);
            setTimeout(() => {
                soundRef.current?.pause();
            }, 1000);
        } else {
            soundRef.current.play();
            soundRef.current.fade(0, 0.3, 1000);
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.button
            onClick={toggleSound}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`relative p-2 rounded-full transition-all duration-300 ${isPlaying
                    ? "bg-green-600/80 text-white shadow-[0_0_15px_rgba(72,187,120,0.6)]"
                    : "bg-white/20 text-white/80 hover:bg-white/30"
                }`}
            aria-label={isPlaying ? "Wycisz odgłosy natury" : "Włącz odgłosy natury"}
        >
            {isPlaying ? (
                <Volume2 className="w-5 h-5" />
            ) : (
                <VolumeX className="w-5 h-5" />
            )}

            {/* Sound wave animation */}
            {isPlaying && (
                <span className="absolute inset-0 rounded-full border border-green-400 animate-ping opacity-20" />
            )}
        </motion.button>
    );
}
