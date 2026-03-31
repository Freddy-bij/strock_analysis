'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from '@/lib/api'

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // In a real app, this would check the user's role from token or API
        const token = localStorage.getItem('token')
        
        if (!token) {
          router.push('/auth/login')
          return
        }

        // Get user role from localStorage
        const userStr = localStorage.getItem('user')
        const user = userStr ? JSON.parse(userStr) : null
        const userRole = user?.userType || 'patient'
        
        setUserRole(userRole)
        
        // Redirect to appropriate dashboard
        if (userRole === 'patient') {
          router.push('/dashboard/patient')
        } else if (userRole === 'doctor') {
          router.push('/dashboard/doctor')
        } else if (userRole === 'admin') {
          router.push('/dashboard/admin')
        }
      } catch (error) {
        console.error('Error checking user role:', error)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    checkUserRole()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Redirecting to your dashboard...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
        </div>
        <p className="text-gray-600">Please wait while we redirect you to the appropriate dashboard.</p>
      </div>
    </div>
  )
}
