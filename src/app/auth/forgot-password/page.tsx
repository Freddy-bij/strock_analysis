'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, CheckCircle, Shield } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: Implement actual API call
    console.log('Password reset request for:', email)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent password reset instructions to:<br />
              <span className="font-medium text-gray-900">{email}</span>
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-green-600 hover:text-green-500 font-medium"
                >
                  try again
                </button>
              </p>
              <Link 
                href="/auth/login"
                className="inline-flex items-center text-green-600 hover:text-green-500 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800">
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4">Reset Password</h1>
            <p className="text-xl opacity-90">Recover access to your healthcare dashboard</p>
          </div>
          <div className="space-y-4 max-w-md">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <p className="text-left">Quick email verification process</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <p className="text-left">Secure password reset link</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <p className="text-left">Back to your account in minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Back to Login Button */}
          <Link 
            href="/auth/login"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">Reset Password</h2>
            <p className="text-green-100 mt-2">We'll send you reset instructions</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full text-gray-500 pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-600"
                    placeholder="Enter your email address"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter the email associated with your account
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link href="/auth/login" className="text-green-600 hover:text-green-500 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
