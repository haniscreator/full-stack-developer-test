'use client'

import React, { useState, useRef, MouseEvent } from 'react'

interface Interactive3DCardProps {
  children: React.ReactNode
  className?: string
}

export function Interactive3DCard({ children, className = '' }: Interactive3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transformStyle, setTransformStyle] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
  const [transitionStyle, setTransitionStyle] = useState<string>('all 0.5s ease-out')

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Mouse coordinates relative to card
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Normalize coordinates (-0.5 to 0.5)
    const normalizedX = (x / width) - 0.5
    const normalizedY = (y / height) - 0.5

    // Map to rotation angles (max 10 degrees)
    const rotateY = normalizedX * 12
    const rotateX = -normalizedY * 12 // invert X axis

    setTransitionStyle('none') // disable transition for instant response
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
  }

  const handleMouseLeave = () => {
    setTransitionStyle('all 0.5s cubic-bezier(0.25, 1, 0.5, 1)')
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer select-none ${className}`}
      style={{
        transform: transformStyle,
        transition: transitionStyle,
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  )
}
