'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface LeafDecorationProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export function LeafDecoration({ position, className = '' }: LeafDecorationProps) {
  const positionClasses = {
    'top-left': 'top-0 left-0 -translate-x-1/4 -translate-y-1/4',
    'top-right': 'top-0 right-0 translate-x-1/4 -translate-y-1/4 -scale-x-100',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4 -scale-y-100',
    'bottom-right': 'bottom-0 right-0 translate-x-1/4 translate-y-1/4 -scale-x-100 -scale-y-100',
  }

  return (
    <motion.div
      className={`absolute w-24 h-24 sm:w-32 sm:h-32 pointer-events-none select-none z-0 ${positionClasses[position]} ${className}`}
      animate={{ rotate: [0, 2, -1, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <Image
        src="/images/textures/botanical-leaves.png"
        alt=""
        fill
        className="object-contain opacity-50"
        sizes="128px"
      />
    </motion.div>
  )
}
