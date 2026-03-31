'use client'

import React from 'react'

interface UserAvatarProps {
  user?: {
    firstName?: string
    lastName?: string
    email?: string
  }
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function UserAvatar({ user, size = 'md', className = '' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg'
  }

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    }
    return user?.email?.charAt(0).toUpperCase() || 'U'
  }

  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    return user?.firstName || user?.email?.split('@')[0] || 'User'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-green-600 text-white rounded-full flex items-center justify-center font-semibold`}>
        {getUserInitials()}
      </div>
      <span className="text-sm font-medium text-gray-700">
        {getDisplayName()}
      </span>
    </div>
  )
}
