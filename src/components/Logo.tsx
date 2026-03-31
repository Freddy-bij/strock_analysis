'use client'

import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  className?: string
}

export default function Logo({ size = 'md', color = 'currentColor', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  // Example medical/health logo - replace with your actual logo SVG path
  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Heart with medical cross - example design */}
      <path 
        d="M50 25C45 15 30 15 30 30C30 45 50 65 50 65C50 65 70 45 70 30C70 15 55 15 50 25Z" 
        fill={color}
        stroke={color}
        strokeWidth="2"
      />
      <path 
        d="M40 35H60M50 25V45" 
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Optional: Add brain/neural network pattern */}
      <circle cx="25" cy="25" r="3" fill={color} opacity="0.6"/>
      <circle cx="75" cy="25" r="3" fill={color} opacity="0.6"/>
      <circle cx="25" cy="75" r="3" fill={color} opacity="0.6"/>
      <circle cx="75" cy="75" r="3" fill={color} opacity="0.6"/>
      <path d="M25 25L50 50L75 25" stroke={color} strokeWidth="1" opacity="0.4"/>
      <path d="M25 75L50 50L75 75" stroke={color} strokeWidth="1" opacity="0.4"/>
    </svg>
  )
}

// Alternative: Text-based logo component
export function TextLogo({ size = 'md', color = 'currentColor', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl', 
    lg: 'text-2xl',
    xl: 'text-3xl'
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Logo size={size} color={color} />
      <span className={`${sizeClasses[size]} font-bold`} style={{ color }}>
        SraCos
      </span>
    </div>
  )
}

// Alternative: Simple medical icon
export function MedicalLogo({ size = 'md', color = 'currentColor', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stethoscope design */}
      <circle cx="50" cy="30" r="15" fill="none" stroke={color} strokeWidth="3"/>
      <path d="M35 30C35 20 25 15 20 25C15 35 25 45 35 40" fill="none" stroke={color} strokeWidth="3"/>
      <path d="M65 30C65 20 75 15 80 25C85 35 75 45 65 40" fill="none" stroke={color} strokeWidth="3"/>
      <circle cx="50" cy="70" r="10" fill={color} opacity="0.8"/>
      <path d="M50 40V60" stroke={color} strokeWidth="3"/>
    </svg>
  )
}

// Alternative: Brain/Neural network logo
export function BrainLogo({ size = 'md', color = 'currentColor', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Brain shape */}
      <path 
        d="M50 20C35 20 25 30 25 45C25 55 30 65 40 70C45 75 55 75 60 70C70 65 75 55 75 45C75 30 65 20 50 20Z" 
        fill={color}
        opacity="0.8"
      />
      
      {/* Neural connections */}
      <circle cx="35" cy="35" r="3" fill="white"/>
      <circle cx="50" cy="30" r="3" fill="white"/>
      <circle cx="65" cy="35" r="3" fill="white"/>
      <circle cx="40" cy="50" r="3" fill="white"/>
      <circle cx="60" cy="50" r="3" fill="white"/>
      <circle cx="50" cy="65" r="3" fill="white"/>
      
      {/* Connections */}
      <path d="M35 35L50 30L65 35M35 35L40 50M65 35L60 50M40 50L50 65L60 50" 
        stroke="white" strokeWidth="1"/>
    </svg>
  )
}
