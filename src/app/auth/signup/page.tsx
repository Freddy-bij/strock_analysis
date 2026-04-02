'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowLeft, User, Lock, Mail, Phone, Calendar, Stethoscope, Shield, Users } from 'lucide-react'

// Professional unDraw-style medical illustration for signup
function SignupIllustration() {
  return (
    <svg
      viewBox="0 0 520 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg"
      aria-hidden="true"
    >
      {/* Background decorative circles */}
      <circle cx="430" cy="55" r="55" fill="white" fillOpacity="0.05" />
      <circle cx="75" cy="390" r="65" fill="white" fillOpacity="0.05" />
      <circle cx="460" cy="370" r="30" fill="white" fillOpacity="0.06" />
      <circle cx="100" cy="100" r="25" fill="white" fillOpacity="0.05" />

      {/* ── Form / registration card ── */}
      <rect x="130" y="60" width="270" height="230" rx="14" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
      {/* card header */}
      <rect x="130" y="60" width="270" height="36" rx="14" fill="#16a34a" fillOpacity="0.65" />
      <rect x="130" y="82" width="270" height="14" fill="#16a34a" fillOpacity="0.65" />
      <rect x="148" y="72" width="80" height="10" rx="4" fill="white" fillOpacity="0.6" />
      <circle cx="376" cy="77" r="7" fill="white" fillOpacity="0.25" />
      <circle cx="358" cy="77" r="7" fill="white" fillOpacity="0.25" />

      {/* Avatar row */}
      <circle cx="165" cy="123" r="18" fill="white" fillOpacity="0.2" />
      <circle cx="165" cy="118" r="7" fill="white" fillOpacity="0.5" />
      <path d="M150 136 Q165 128 180 136" fill="white" fillOpacity="0.4" />
      <rect x="192" y="112" width="90" height="8" rx="4" fill="white" fillOpacity="0.35" />
      <rect x="192" y="124" width="60" height="7" rx="3" fill="white" fillOpacity="0.2" />

      {/* Input fields */}
      <rect x="148" y="150" width="108" height="22" rx="5" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="156" y="158" width="60" height="6" rx="2" fill="white" fillOpacity="0.3" />

      <rect x="264" y="150" width="108" height="22" rx="5" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="272" y="158" width="70" height="6" rx="2" fill="white" fillOpacity="0.3" />

      <rect x="148" y="182" width="224" height="22" rx="5" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="162" cy="193" r="5" fill="white" fillOpacity="0.3" />
      <rect x="172" y="190" width="80" height="6" rx="2" fill="white" fillOpacity="0.25" />

      <rect x="148" y="214" width="224" height="22" rx="5" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="162" cy="225" r="5" fill="white" fillOpacity="0.3" />
      <rect x="172" y="222" width="60" height="6" rx="2" fill="white" fillOpacity="0.25" />

      {/* Role selector pills */}
      <rect x="148" y="246" width="100" height="26" rx="13" fill="#16a34a" fillOpacity="0.5" />
      <rect x="257" y="246" width="115" height="26" rx="13" fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="165" cy="259" r="7" fill="white" fillOpacity="0.5" />
      <rect x="177" y="255" width="36" height="7" rx="3" fill="white" fillOpacity="0.6" />
      <circle cx="275" cy="259" r="7" fill="white" fillOpacity="0.3" />
      <rect x="287" y="255" width="44" height="7" rx="3" fill="white" fillOpacity="0.3" />

      {/* Submit button */}
      <rect x="148" y="283" width="224" height="26" rx="8" fill="#16a34a" fillOpacity="0.7" />
      <rect x="210" y="291" width="100" height="8" rx="3" fill="white" fillOpacity="0.6" />

      {/* ── Patient character (left) ── */}
      {/* Body */}
      <path d="M88 310 Q70 315 65 360 L115 360 Q120 315 100 310 Z" fill="#dbeafe" fillOpacity="0.9" />
      {/* Head */}
      <circle cx="94" cy="292" r="18" fill="#FDDBB4" />
      {/* Hair */}
      <path d="M78 287 Q80 273 94 271 Q108 273 110 287 Q106 279 94 277 Q82 279 78 287Z" fill="#92400e" />
      {/* Eyes */}
      <ellipse cx="88" cy="291" rx="2" ry="2.5" fill="#1f2937" />
      <ellipse cx="100" cy="291" rx="2" ry="2.5" fill="#1f2937" />
      <circle cx="89" cy="290" r="0.8" fill="white" />
      <circle cx="101" cy="290" r="0.8" fill="white" />
      {/* Smile */}
      <path d="M88 298 Q94 303 100 298" stroke="#c97b5a" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Ears */}
      <ellipse cx="76" cy="293" rx="3.5" ry="4.5" fill="#FDDBB4" />
      <ellipse cx="112" cy="293" rx="3.5" ry="4.5" fill="#FDDBB4" />
      {/* Arms */}
      <path d="M65 325 Q52 335 55 350" stroke="#dbeafe" strokeOpacity="0.85" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M123 325 Q136 335 133 350" stroke="#dbeafe" strokeOpacity="0.85" strokeWidth="10" strokeLinecap="round" fill="none" />
      {/* Hands */}
      <ellipse cx="55" cy="352" rx="6" ry="5" fill="#FDDBB4" />
      <ellipse cx="133" cy="352" rx="6" ry="5" fill="#FDDBB4" />
      {/* Legs */}
      <rect x="81" y="360" width="10" height="28" rx="4" fill="#1e3a5f" fillOpacity="0.5" />
      <rect x="94" y="360" width="10" height="28" rx="4" fill="#1e3a5f" fillOpacity="0.5" />
      {/* Shoes */}
      <ellipse cx="86" cy="389" rx="9" ry="4" fill="#1f2937" fillOpacity="0.7" />
      <ellipse cx="99" cy="389" rx="9" ry="4" fill="#1f2937" fillOpacity="0.7" />
      {/* Patient label tag */}
      <rect x="72" y="315" width="46" height="16" rx="4" fill="#16a34a" fillOpacity="0.5" />
      <rect x="78" y="320" width="34" height="5" rx="2" fill="white" fillOpacity="0.6" />

      {/* ── Doctor character (right) ── */}
      {/* Lab coat */}
      <path d="M366 310 Q348 315 343 360 L398 360 Q406 315 386 310 Z" fill="white" fillOpacity="0.88" />
      {/* Lapels */}
      <path d="M366 310 L372 330 L376 310" fill="#e5e7eb" />
      <path d="M386 310 L380 330 L376 310" fill="#e5e7eb" />
      {/* Stethoscope */}
      <path d="M360 328 Q350 342 355 352 Q360 360 367 356" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="367" cy="356" r="3.5" fill="#16a34a" />
      {/* Tie */}
      <rect x="373" y="315" width="5" height="20" rx="2.5" fill="#bbf7d0" />
      {/* Head */}
      <circle cx="376" cy="292" r="19" fill="#FDDBB4" />
      {/* Hair */}
      <path d="M359 287 Q361 272 376 270 Q391 272 393 287 Q389 278 376 276 Q363 278 359 287Z" fill="#1f2937" />
      {/* Eyes */}
      <ellipse cx="370" cy="291" rx="2.2" ry="2.8" fill="#1f2937" />
      <ellipse cx="382" cy="291" rx="2.2" ry="2.8" fill="#1f2937" />
      <circle cx="371" cy="290" r="0.9" fill="white" />
      <circle cx="383" cy="290" r="0.9" fill="white" />
      {/* Smile */}
      <path d="M370 299 Q376 304 382 299" stroke="#c97b5a" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {/* Ears */}
      <ellipse cx="357" cy="293" rx="3.5" ry="4.5" fill="#FDDBB4" />
      <ellipse cx="395" cy="293" rx="3.5" ry="4.5" fill="#FDDBB4" />
      {/* Arms */}
      <path d="M343 325 Q330 338 333 352" stroke="white" strokeOpacity="0.85" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M409 325 Q422 338 419 352" stroke="white" strokeOpacity="0.85" strokeWidth="11" strokeLinecap="round" fill="none" />
      {/* Hands */}
      <ellipse cx="333" cy="354" rx="6.5" ry="5.5" fill="#FDDBB4" />
      <ellipse cx="419" cy="354" rx="6.5" ry="5.5" fill="#FDDBB4" />
      {/* Clipboard */}
      <rect x="313" y="328" width="26" height="34" rx="3" fill="white" fillOpacity="0.9" />
      <rect x="323" y="324" width="7" height="7" rx="2" fill="#d1d5db" />
      <rect x="317" y="336" width="18" height="3" rx="1" fill="#9ca3af" />
      <rect x="317" y="343" width="14" height="3" rx="1" fill="#9ca3af" />
      <rect x="317" y="350" width="16" height="3" rx="1" fill="#9ca3af" />
      {/* Legs */}
      <rect x="363" y="360" width="10" height="28" rx="4" fill="#1e3a5f" fillOpacity="0.6" />
      <rect x="376" y="360" width="10" height="28" rx="4" fill="#1e3a5f" fillOpacity="0.6" />
      {/* Shoes */}
      <ellipse cx="368" cy="389" rx="9" ry="4" fill="#1f2937" />
      <ellipse cx="381" cy="389" rx="9" ry="4" fill="#1f2937" />

      {/* ── Connection / handshake arrow between characters ── */}
      <path d="M130 350 Q200 330 330 350" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="5 4" fill="none" />
      {/* Small plus/cross halfway */}
      <circle cx="230" cy="337" r="10" fill="white" fillOpacity="0.12" />
      <rect x="226" y="331" width="8" height="12" rx="2" fill="white" fillOpacity="0.4" />
      <rect x="224" y="333" width="12" height="8" rx="2" fill="white" fillOpacity="0.4" />

      {/* ── Desk / ground line ── */}
      <rect x="50" y="393" width="420" height="14" rx="7" fill="white" fillOpacity="0.12" />

      {/* ── Floating icons ── */}
      {/* Shield icon top-left */}
      <g transform="translate(60, 170)">
        <path d="M16 2 L28 7 L28 16 Q28 24 16 30 Q4 24 4 16 L4 7 Z" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
        <path d="M10 16 L14 20 L22 12" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Calendar icon top-right */}
      <g transform="translate(420, 170)">
        <rect x="0" y="4" width="32" height="28" rx="4" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <rect x="0" y="4" width="32" height="10" rx="4" fill="#16a34a" fillOpacity="0.5" />
        <rect x="8" y="0" width="4" height="8" rx="2" fill="white" fillOpacity="0.5" />
        <rect x="20" y="0" width="4" height="8" rx="2" fill="white" fillOpacity="0.5" />
        <rect x="4" y="18" width="5" height="5" rx="1" fill="white" fillOpacity="0.35" />
        <rect x="13" y="18" width="5" height="5" rx="1" fill="white" fillOpacity="0.35" />
        <rect x="22" y="18" width="5" height="5" rx="1" fill="white" fillOpacity="0.35" />
        <rect x="4" y="27" width="5" height="5" rx="1" fill="white" fillOpacity="0.35" />
        <rect x="13" y="27" width="5" height="5" rx="1" fill="white" fillOpacity="0.35" />
      </g>

      {/* Users / people icon bottom-left area */}
      <g transform="translate(55, 290)">
        <circle cx="10" cy="8" r="7" fill="white" fillOpacity="0.2" />
        <circle cx="24" cy="8" r="7" fill="white" fillOpacity="0.2" />
        <path d="M0 28 Q0 18 10 18 Q17 18 20 22 Q23 18 30 18 Q40 18 40 28" fill="white" fillOpacity="0.15" />
      </g>

      {/* Heart pulse icon right side */}
      <g transform="translate(428, 290)">
        <rect x="0" y="0" width="56" height="28" rx="8" fill="white" fillOpacity="0.12" />
        <path d="M6 14 l8-10 6 18 6-12 5 8 6-4" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Decorative dots */}
      <circle cx="95" cy="55" r="4" fill="white" fillOpacity="0.2" />
      <circle cx="108" cy="68" r="3" fill="white" fillOpacity="0.13" />
      <circle cx="445" cy="130" r="4" fill="white" fillOpacity="0.18" />
      <circle cx="458" cy="118" r="3" fill="white" fillOpacity="0.12" />
      <circle cx="440" cy="430" r="5" fill="white" fillOpacity="0.1" />
      <circle cx="70" cy="440" r="4" fill="white" fillOpacity="0.1" />
    </svg>
  )
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    licenseNumber: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const userData: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        userType,
        ...(userType === 'doctor' && {
          specialization: formData.specialization,
          licenseNumber: formData.licenseNumber
        })
      }

      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const result = await response.json()

      if (result.success) {
        // Show success message instead of immediate login
        setShowSuccess(true)
        setIsLoading(false)
        
        // After 3 seconds, redirect to login
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)
      } else {
        setError(result.error || 'Registration failed. Please try again.')
        setIsLoading(false)
      }
    } catch (err: any) {
      console.error('Signup error:', err)
      setError('Registration failed. Please check your connection and try again.')
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Side – Hero Section with Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800" />
        {/* Subtle dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center w-full h-full">
          {/* Text content at top */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Join SRACOS Today</h1>
            <p className="text-base opacity-80">Start your stroke prevention journey with us</p>
          </div>

          {/* Illustration */}
          <div className="mb-8">
            <SignupIllustration />
          </div>

          <div className="grid grid-cols-1 gap-3 w-full max-w-sm mx-auto">
            <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <p className="text-left text-sm opacity-90">Advanced stroke risk analysis</p>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-left text-sm opacity-90">Personalized prevention strategies</p>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <p className="text-left text-sm opacity-90">Continuous health monitoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side – Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-2xl">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
              <p className="text-green-100 mt-2">Join SRACOS stroke prevention platform</p>
            </div>

            <div className="p-8">
              {showSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Created Successfully!</h3>
                  <p className="text-gray-600 mb-4">
                    Your {userType === 'doctor' ? 'doctor' : 'patient'} account has been created successfully.
                  </p>
                  <p className="text-sm text-gray-500">
                    Redirecting to login page in <span className="font-medium text-green-600">3 seconds</span>...
                  </p>
                  <div className="mt-6">
                    <div className="inline-flex items-center text-sm text-green-600">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Preparing your login...
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  {/* User Type Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I am a:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setUserType('patient')}
                    className={`p-4 rounded-lg border-2  transition-all ${
                      userType === 'patient'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-500'
                    }`}
                  >
                    <User className="w-8 h-8 mx-auto mb-2" />
                    <span className="block font-medium">Patient</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('doctor')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      userType === 'doctor'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-500'
                    }`}
                  >
                    <Stethoscope className="w-8 h-8 mx-auto mb-2" />
                    <span className="block font-medium">Doctor</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full text-gray-500 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full text-gray-500 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

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
                      value={formData.email}
                      onChange={handleChange}
                      className="block text-gray-500 w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {userType === 'doctor' && (
                  <>
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                        Specialization 
                      </label>
                      <select
                        id="specialization"
                        name="specialization"
                        required
                        value={formData.specialization}
                        onChange={handleChange}
                        className="block w-full text-gray-500 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
                      >
                        <option value="">Select your specialization</option>
                        <option value="neurology">Neurology</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="stroke-medicine">Stroke Medicine</option>
                        <option value="preventive-medicine">Preventive Medicine</option>
                        <option value="internal-medicine">Internal Medicine</option>
                        <option value="vascular-medicine">Vascular Medicine</option>
                        <option value="general-practice">General Practice</option>
                        <option value="emergency-medicine">Emergency Medicine</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        License Number
                      </label>
                      <input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                        required
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className="block w-full text-gray-500 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                        placeholder="Enter your medical license number"
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full text-gray-500 pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm  font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="block w-full text-gray-500 pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-gray-500 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-green-600 hover:text-green-500">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-green-600 hover:text-green-500">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-green-600 hover:text-green-500 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}