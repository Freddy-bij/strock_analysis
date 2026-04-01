'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { 
  User, 
  ChevronDown, 
  LogOut,
  Settings,
  Heart,
  Activity
} from 'lucide-react'
import SraCosLogo from '@/components/SraCosLogo'

interface NavbarProps {
  isScrolled?: boolean
}

export default function Navbar({ isScrolled = false }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { isAuthenticated, user, logout, getDashboardPath, getUserInitials, getDisplayName } = useAuth()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setIsDropdownOpen(false)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout fails, redirect to home
      setIsDropdownOpen(false)
      window.location.href = '/'
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <SraCosLogo 
              size="md" 
              isScrolled={isScrolled}
              className="font-bold"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#features" 
              className={`transition-colors font-medium ${
                isScrolled 
                  ? 'text-gray-700 hover:text-green-600' 
                  : 'text-white hover:text-green-300'
              }`}
            >
              Features
            </Link>
            <Link 
              href="#impact" 
              className={`transition-colors font-medium ${
                isScrolled 
                  ? 'text-gray-700 hover:text-green-600' 
                  : 'text-white hover:text-green-300'
              }`}
            >
              Impact
            </Link>
            <Link 
              href="#about" 
              className={`transition-colors font-medium ${
                isScrolled 
                  ? 'text-gray-700 hover:text-green-600' 
                  : 'text-white hover:text-green-300'
              }`}
            >
              About
            </Link>
          </div>

          {/* Right Side - Auth */}
          <div className="flex items-center">
            {isAuthenticated && user ? (
              /* User Profile Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    isScrolled
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                  }`}
                >
                  {/* User Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    isScrolled ? 'bg-green-600 text-white' : 'bg-white text-green-600'
                  }`}>
                    {getUserInitials()}
                  </div>
                  
                  {/* User Name */}
                  <span className="font-medium">
                    {getDisplayName()}
                  </span>
                  
                  {/* Dropdown Arrow */}
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {getDisplayName()}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user?.userType || 'User'}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href={getDashboardPath()}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Activity className="w-4 h-4" />
                        <span>My Dashboard</span>
                      </Link>
                      
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button */
              <Link
                href="/auth/login"
                className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                  isScrolled
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
