'use client'

import Image from 'next/image'

export function TestImages() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* Test a few different images */}
      <div className="relative w-full h-[300px]">
        <Image
          src="/images/Ricky.jpeg"
          alt="Ricky"
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="relative w-full h-[300px]">
        <Image
          src="/images/Farmhouse-rooms.jpg"
          alt="Farmhouse rooms"
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="relative w-full h-[300px]">
        <Image
          src="/images/Meet-and-Greet.jpg"
          alt="Meet and Greet"
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="relative w-full h-[300px]">
        <Image
          src="/images/zagrodalogo.png"
          alt="Logo"
          fill
          className="object-contain rounded"
        />
      </div>
    </div>
  )
} 