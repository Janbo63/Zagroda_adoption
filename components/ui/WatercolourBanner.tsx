'use client'

import Image from 'next/image'

interface WatercolourBannerProps {
  className?: string
  children?: React.ReactNode
}

export function WatercolourBanner({ className = '', children }: WatercolourBannerProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/textures/watercolour-mountains.png"
          alt=""
          fill
          className="object-cover object-bottom opacity-40"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}
