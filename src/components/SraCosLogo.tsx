'use client'

import React from 'react'
import { sraCosLogoData } from '@/utils/logoConverter'

interface SraCosLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  className?: string
  showText?: boolean
}

export default function SraCosLogo({ 
  size = 'md', 
  color = '#10b981', 
  className = '',
  showText = true 
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

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg 
        className={`${sizeClasses[size]}`}
        viewBox={sraCosLogoData.viewBox} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main heart shape */}
        <path 
          d="M50 15C40 15 35 25 35 35C35 45 40 55 50 65C60 55 65 45 65 35C65 25 60 15 50 15Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
        />
        
        {/* Medical cross */}
        <path 
          d="M42 35H58M50 27V43"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Neural network connections */}
        <path 
          d="M25 20L75 20M25 80L75 80"
          stroke={color}
          strokeWidth="2"
          opacity="0.3"
        />
        
        {/* Neural nodes */}
        <circle 
          cx="20" 
          cy="50" 
          r="4"
          fill={color}
          opacity="0.6"
        />
        <circle 
          cx="80" 
          cy="50" 
          r="4"
          fill={color}
          opacity="0.6"
        />
        
        {/* Brain-like connections */}
        <circle cx="35" cy="30" r="2" fill="white" opacity="0.8"/>
        <circle cx="50" cy="25" r="2" fill="white" opacity="0.8"/>
        <circle cx="65" cy="30" r="2" fill="white" opacity="0.8"/>
        <circle cx="40" cy="45" r="2" fill="white" opacity="0.8"/>
        <circle cx="60" cy="45" r="2" fill="white" opacity="0.8"/>
        
        {/* Neural pathways */}
        <path 
          d="M35 30L50 25L65 30M35 30L40 45M65 30L60 45" 
          stroke="white" 
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>
      
      {showText && (
        <span className={`${textSizes[size]} font-bold`} style={{ color }}>
          SraCos
        </span>
      )}
    </div>
  )
}
