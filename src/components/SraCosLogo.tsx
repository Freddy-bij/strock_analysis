'use client'

import Link from 'next/link'
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
  const accentColor = isScrolled ? '#dc2626' : '#dc2626' // red for stroke risk alert

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg 
        className={`${sizeClasses[size]}`}
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Brain shape for stroke analysis */}
        <path 
          d="M50 20C35 20 25 30 25 45C25 55 30 65 40 70C45 75 55 75 60 70C70 65 75 55 75 45C75 30 65 20 50 20Z" 
          fill={primaryColor}
          opacity="0.9"
        />
        
        {/* Stroke analysis blood vessels */}
        <g opacity="0.7">
          <path d="M30 35C35 30 40 35 45 30C50 25 55 30 60 35C65 40 70 35 70 35" 
            stroke={accentColor} strokeWidth="2" fill="none"/>
          <path d="M30 50C35 45 40 50 45 45C50 40 55 45 60 50C65 55 70 50 70 50" 
            stroke={accentColor} strokeWidth="2" fill="none"/>
          <path d="M30 65C35 60 40 65 45 60C50 55 55 60 60 65C65 70 70 65 70 65" 
            stroke={accentColor} strokeWidth="2" fill="none"/>
        </g>
        
        {/* Stroke risk indicators */}
        <circle cx="35" cy="35" r="4" fill={accentColor} opacity="0.8"/>
        <circle cx="65" cy="35" r="4" fill={accentColor} opacity="0.8"/>
        <circle cx="50" cy="50" r="5" fill={accentColor} opacity="0.9"/>
        
        {/* Blocked vessel indicator */}
        <rect x="47" y="48" width="6" height="4" fill={secondaryColor} opacity="0.8"/>
        
        {/* Stroke analysis center - brain with warning */}
        <circle cx="50" cy="45" r="8" fill={secondaryColor} opacity="0.9"/>
        <path 
          d="M46 45H54M50 41V49" 
          stroke={accentColor} 
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* ECG/EKG waveform for stroke monitoring */}
        <path 
          d="M15 50L20 50L22 45L24 55L26 40L28 60L30 50L35 50" 
          stroke={accentColor} 
          strokeWidth="2" 
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path 
          d="M65 50L70 50L72 45L74 55L76 40L78 60L80 50L85 50" 
          stroke={accentColor} 
          strokeWidth="2" 
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Risk level indicators */}
        <g opacity="0.6">
          <circle cx="25" cy="25" r="2" fill={accentColor}/>
          <circle cx="75" cy="25" r="2" fill={accentColor}/>
          <circle cx="25" cy="75" r="2" fill={accentColor}/>
          <circle cx="75" cy="75" r="2" fill={accentColor}/>
        </g>
        
        {/* Analysis connections */}
        <path d="M25 25L35 35M75 25L65 35M25 75L35 65M75 75L65 65" 
          stroke={accentColor} strokeWidth="1" opacity="0.4"/>
      </svg>
      
      {showText && (
       <Link href="/">
        <span className={`${textSizes[size]} font-bold`} style={{ color: primaryColor }}>
          SraCos
        </span>
       </Link>
      
      )}
    </div>
  )
}
