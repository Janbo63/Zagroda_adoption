'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Music, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { Howl } from 'howler'

interface AlpacaSoundButtonProps {
    soundUrl?: string
    color?: string
}

export function AlpacaSoundButton({ soundUrl, color = "bg-primary-500" }: AlpacaSoundButtonProps) {
    const [isPlaying, setIsPlaying] = useState(false)

    const playSound = () => {
        if (isPlaying) return

        setIsPlaying(true)

        // In a real implementation, this would play the actual file
        // const sound = new Howl({ src: [soundUrl] })
        // sound.play()
        // sound.on('end', () => setIsPlaying(false))

        // Simulation for now
        setTimeout(() => {
            setIsPlaying(false)
        }, 2000)
    }

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <Button
                size="icon"
                className={`rounded-full shadow-md ${color} text-white border-2 border-white/50`}
                onClick={(e) => {
                    e.stopPropagation() // Prevent triggering card click
                    playSound()
                }}
                aria-label="Play alpaca sound"
            >
                {isPlaying ? (
                    <Music className="h-4 w-4 animate-bounce" />
                ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                )}
            </Button>
        </motion.div>
    )
}
