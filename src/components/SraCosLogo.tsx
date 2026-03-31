'use client'

import React from 'react'

interface SraCosLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  className?: string
  showText?: boolean
  isScrolled?: boolean
}

export default function SraCosLogo({ 
  size = 'md', 
  color = '#10b981', 
  className = '',
  showText = true,
  isScrolled = false
}: SraCosLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  }

  // Dynamic colors based on scroll state
  const primaryColor = isScrolled ? '#000000' : '#10b981' // black when scrolled, green when not
  const secondaryColor = isScrolled ? '#ffffff' : '#ffffff' // always white
  const accentColor = isScrolled ? '#10b981' : '#10b981' // always green for accent

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg 
        className={`${sizeClasses[size]}`}
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Analytics brain shape */}
        <path 
          d="M50 20C35 20 25 30 25 45C25 55 30 65 40 70C45 75 55 75 60 70C70 65 75 55 75 45C75 30 65 20 50 20Z" 
          fill={primaryColor}
          opacity="0.9"
        />
        
        {/* Strong analytics grid pattern */}
        <g opacity="0.3">
          <path d="M30 30H70M30 35H70M30 40H70M30 45H70M30 50H70M30 55H70M30 60H70" stroke={secondaryColor} strokeWidth="1"/>
          <path d="M35 25V65M45 25V65M55 25V65M65 25V65" stroke={secondaryColor} strokeWidth="1"/>
        </g>
        
        {/* Analytics data points */}
        <circle cx="40" cy="35" r="3" fill={accentColor}/>
        <circle cx="50" cy="30" r="3" fill={accentColor}/>
        <circle cx="60" cy="35" r="3" fill={accentColor}/>
        <circle cx="45" cy="45" r="3" fill={accentColor}/>
        <circle cx="55" cy="45" r="3" fill={accentColor}/>
        <circle cx="50" cy="55" r="3" fill={accentColor}/>
        
        {/* Strong analytics connection lines */}
        <path d="M40 35L50 30L60 35M40 35L45 45M60 35L55 45M45 45L50 55L55 45" 
          stroke={accentColor} strokeWidth="2" opacity="0.8"/>
        
        {/* Heart pulse for health monitoring */}
        <path 
          d="M20 50C20 45 25 40 30 45C35 50 40 55 45 50" 
          fill="none" 
          stroke={accentColor} 
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path 
          d="M55 50C60 55 65 50 70 45C75 40 80 45 80 50" 
          fill="none" 
          stroke={accentColor} 
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Strong analytics center symbol */}
        <circle cx="50" cy="45" r="8" fill={secondaryColor} opacity="0.9"/>
        <path 
          d="M46 45H54M50 41V49" 
          stroke={accentColor} 
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Data flow indicators */}
        <path d="M25 25L30 30M75 25L70 30M25 65L30 60M75 65L70 60" 
          stroke={accentColor} strokeWidth="1.5" opacity="0.6"/>
      </svg>
      
      {showText && (
        <span className={`${textSizes[size]} font-bold`} style={{ color: primaryColor }}>
          SraCos
        </span>
      )}
    </div>
  )
}
