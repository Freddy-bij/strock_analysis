'use client'

import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  userType: 'patient' | 'doctor' | 'admin'
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      
      if (token && userStr) {
        try {
          const userData = JSON.parse(userStr)
          setIsAuthenticated(true)
          setUser(userData)
        } catch (error) {
          console.error('Error parsing user data:', error)
          setIsAuthenticated(false)
          setUser(null)
        }
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
      
      setLoading(false)
    }

    // Check auth on mount
    checkAuth()

    // Listen for storage changes (for tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuth()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
  }

  const getDashboardPath = () => {
    if (!user) return '/auth/login'
    
    switch (user.userType) {
      case 'doctor':
        return '/dashboard/doctor'
      case 'patient':
        return '/dashboard/patient'
      case 'admin':
        return '/dashboard/admin'
      default:
        return '/dashboard/patient'
    }
  }

  const getUserInitials = () => {
    if (!user) return 'U'
    
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    }
    
    return user.email?.charAt(0).toUpperCase() || 'U'
  }

  const getDisplayName = () => {
    if (!user) return 'User'
    
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    
    return user.email?.split('@')[0] || 'User'
  }

  return {
    isAuthenticated,
    user,
    loading,
    logout,
    getDashboardPath,
    getUserInitials,
    getDisplayName
  }
}
