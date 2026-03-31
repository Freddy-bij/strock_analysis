'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  User, 
  Settings, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Shield, 
  Bell, 
  Lock,
  Camera,
  Edit2,
  Save,
  X,
  Heart,
  Activity,
  FileText,
  ChevronLeft,
  LogOut
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import UserAvatar from '@/components/UserAvatar'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const { user, logout } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: ''
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update localStorage user data
      const updatedUser = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))

      setMessage('Profile updated successfully!')
      setMessageType('success')
      setIsEditing(false)
    } catch (error) {
      setMessage('Failed to update profile. Please try again.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form to original values
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: ''
      })
    }
    setIsEditing(false)
    setMessage('')
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
          <Link href="/auth/login" className="text-green-600 hover:text-green-700 mt-4 inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href={user.userType === 'doctor' ? '/dashboard/doctor' : '/dashboard/patient'} className="flex items-center space-x-2">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-green-600">
                <Bell className="w-5 h-5" />
              </button>
              <UserAvatar user={user} size="md" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and account settings</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            messageType === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <p className="text-sm">{message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Picture and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <UserAvatar user={user} size="lg" className="mx-auto" />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'User'}
                </h2>
                <p className="text-gray-600 capitalize">{user.userType}</p>
                {user.specialization && (
                  <p className="text-sm text-green-600 mt-1">{user.specialization}</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
                
                <Link 
                  href="/auth/change-password"
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
                >
                  <Lock className="w-4 h-4" />
                  <span>Change Password</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="text-gray-900">March 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Account Status</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Login</span>
                  <span className="text-gray-900">Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSave} className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={true} // Email cannot be changed
                      className="block w-full text-gray-500 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="+1 (555) 123-4567"
                      className="block w-full text-gray-500 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full text-gray-500 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={3}
                      placeholder="Enter your address"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Emergency contact name"
                      className="block w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Emergency contact phone"
                      className="block w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
