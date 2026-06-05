'use client'

import Image from 'next/image'

interface TornPaperDividerProps {
  variant?: 'top' | 'bottom'
  className?: string
}

export function TornPaperDivider({ variant = 'bottom', className = '' }: TornPaperDividerProps) {
  return (
    <div className={`relative w-full h-16 sm:h-24 overflow-hidden pointer-events-none select-none ${className}`}>
      <Image
        src="/images/textures/torn-paper.png"
        alt=""
        fill
        className={`object-cover object-center ${variant === 'top' ? 'rotate-180' : ''}`}
        sizes="100vw"
        aria-hidden="true"
      />
    </div>
  )
}
