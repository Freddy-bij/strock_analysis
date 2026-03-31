'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowLeft, User, Lock, Mail, Phone } from 'lucide-react'

// Professional unDraw-style medical illustration
function MedicalIllustration() {
  return (
    <svg
      viewBox="0 0 520 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg"
      aria-hidden="true"
    >
      {/* Background decorative circles */}
      <circle cx="420" cy="60" r="50" fill="white" fillOpacity="0.06" />
      <circle cx="80" cy="400" r="70" fill="white" fillOpacity="0.05" />
      <circle cx="460" cy="380" r="35" fill="white" fillOpacity="0.07" />

      {/* Desk / surface */}
      <rect x="60" y="340" width="400" height="18" rx="9" fill="white" fillOpacity="0.15" />

      {/* Monitor stand */}
      <rect x="225" y="340" width="16" height="32" rx="4" fill="white" fillOpacity="0.25" />
      <rect x="200" y="368" width="66" height="10" rx="5" fill="white" fillOpacity="0.2" />

      {/* Monitor body */}
      <rect x="110" y="155" width="256" height="185" rx="14" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
      <rect x="122" y="166" width="232" height="163" rx="8" fill="white" fillOpacity="0.12" />

      {/* Screen content – medical dashboard */}
      {/* Header bar */}
      <rect x="126" y="170" width="224" height="22" rx="4" fill="#16a34a" fillOpacity="0.7" />
      <circle cx="140" cy="181" r="5" fill="white" fillOpacity="0.6" />
      <rect x="152" y="177" width="60" height="8" rx="3" fill="white" fillOpacity="0.5" />
      <rect x="310" y="177" width="32" height="8" rx="3" fill="white" fillOpacity="0.3" />

      {/* Card 1 – heart rate */}
      <rect x="130" y="198" width="68" height="52" rx="6" fill="white" fillOpacity="0.18" />
      <path d="M144 222 l5-7 4 12 4-9 4 7 5-4" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="136" y="242" width="40" height="5" rx="2" fill="white" fillOpacity="0.3" />

      {/* Card 2 – vitals */}
      <rect x="206" y="198" width="68" height="52" rx="6" fill="white" fillOpacity="0.18" />
      <rect x="214" y="208" width="24" height="6" rx="2" fill="#4ade80" fillOpacity="0.7" />
      <rect x="214" y="218" width="40" height="5" rx="2" fill="white" fillOpacity="0.25" />
      <rect x="214" y="227" width="32" height="5" rx="2" fill="white" fillOpacity="0.25" />
      <rect x="214" y="236" width="36" height="5" rx="2" fill="white" fillOpacity="0.25" />

      {/* Card 3 – pie chart */}
      <rect x="282" y="198" width="68" height="52" rx="6" fill="white" fillOpacity="0.18" />
      <circle cx="316" cy="218" r="13" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="8" />
      <circle cx="316" cy="218" r="13" fill="none" stroke="#4ade80" strokeOpacity="0.8" strokeWidth="8"
        strokeDasharray="30 52" strokeDashoffset="0" />
      <rect x="290" y="238" width="44" height="5" rx="2" fill="white" fillOpacity="0.3" />

      {/* Chart / graph area */}
      <rect x="130" y="257" width="220" height="60" rx="6" fill="white" fillOpacity="0.1" />
      <polyline points="140,305 160,285 185,298 210,272 240,280 268,262 295,270 325,258 340,266" stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="140,305 160,285 185,298 210,272 240,280 268,262 295,270 325,258 340,266 340,310 140,310" fill="#4ade80" fillOpacity="0.1" />
      {/* X-axis labels */}
      {[140, 185, 235, 285, 335].map((x, i) => (
        <rect key={i} x={x - 8} y="313" width="16" height="4" rx="2" fill="white" fillOpacity="0.2" />
      ))}

      {/* Doctor character */}
      {/* Lab coat body */}
      <path d="M310 290 Q290 295 284 340 L340 340 Q348 295 330 290 Z" fill="white" fillOpacity="0.9" />
      {/* Coat lapels */}
      <path d="M310 290 L316 310 L320 290" fill="#e5e7eb" />
      <path d="M330 290 L324 310 L320 290" fill="#e5e7eb" />
      {/* Stethoscope */}
      <path d="M305 308 Q295 322 300 332 Q305 340 312 336" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="312" cy="336" r="4" fill="#16a34a" />
      {/* Shirt / tie area */}
      <rect x="317" y="295" width="6" height="22" rx="3" fill="#bbf7d0" />
      {/* Head */}
      <circle cx="320" cy="270" r="20" fill="#FDDBB4" />
      {/* Hair */}
      <path d="M302 264 Q304 248 320 246 Q336 248 338 264 Q334 254 320 252 Q306 254 302 264Z" fill="#1f2937" />
      {/* Eyes */}
      <ellipse cx="313" cy="269" rx="2.5" ry="3" fill="#1f2937" />
      <ellipse cx="327" cy="269" rx="2.5" ry="3" fill="#1f2937" />
      <circle cx="314" cy="268" r="1" fill="white" />
      <circle cx="328" cy="268" r="1" fill="white" />
      {/* Smile */}
      <path d="M312 277 Q320 283 328 277" stroke="#c97b5a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Ears */}
      <ellipse cx="300" cy="271" rx="4" ry="5" fill="#FDDBB4" />
      <ellipse cx="340" cy="271" rx="4" ry="5" fill="#FDDBB4" />
      {/* Arms */}
      <path d="M284 310 Q272 320 275 335" stroke="white" strokeOpacity="0.85" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M356 310 Q368 320 365 335" stroke="white" strokeOpacity="0.85" strokeWidth="12" strokeLinecap="round" fill="none" />
      {/* Hands */}
      <ellipse cx="275" cy="337" rx="7" ry="6" fill="#FDDBB4" />
      <ellipse cx="365" cy="337" rx="7" ry="6" fill="#FDDBB4" />
      {/* Clipboard in left hand */}
      <rect x="256" y="315" width="28" height="36" rx="3" fill="white" fillOpacity="0.9" />
      <rect x="267" y="311" width="8" height="8" rx="2" fill="#d1d5db" />
      <rect x="260" y="323" width="20" height="3" rx="1" fill="#9ca3af" />
      <rect x="260" y="330" width="16" height="3" rx="1" fill="#9ca3af" />
      <rect x="260" y="337" width="18" height="3" rx="1" fill="#9ca3af" />
      {/* Legs */}
      <rect x="307" y="340" width="12" height="30" rx="4" fill="#1e3a5f" fillOpacity="0.7" />
      <rect x="322" y="340" width="12" height="30" rx="4" fill="#1e3a5f" fillOpacity="0.7" />
      {/* Shoes */}
      <ellipse cx="313" cy="371" rx="10" ry="5" fill="#1f2937" />
      <ellipse cx="328" cy="371" rx="10" ry="5" fill="#1f2937" />

      {/* Floating medical icons */}
      {/* Pill icon */}
      <g transform="translate(68, 200) rotate(-20)">
        <rect x="0" y="0" width="36" height="18" rx="9" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="18" y1="0" x2="18" y2="18" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
        <rect x="18" y="0" width="18" height="18" rx="0 9 9 0" fill="white" fillOpacity="0.15" />
      </g>

      {/* Heart icon */}
      <g transform="translate(415, 190)">
        <path d="M18 28 C18 28 4 18 4 10 C4 5.5 7.5 2 12 2 C14.5 2 16.8 3.2 18 5 C19.2 3.2 21.5 2 24 2 C28.5 2 32 5.5 32 10 C32 18 18 28 18 28Z" fill="white" fillOpacity="0.25" />
      </g>

      {/* Cross / plus medical icon */}
      <g transform="translate(72, 260)">
        <circle cx="16" cy="16" r="16" fill="white" fillOpacity="0.15" />
        <rect x="10" y="8" width="12" height="16" rx="2" fill="white" fillOpacity="0.5" />
        <rect x="8" y="10" width="16" height="12" rx="2" fill="white" fillOpacity="0.5" />
      </g>

      {/* DNA helix icon small */}
      <g transform="translate(418, 280)">
        <path d="M4 0 Q14 8 4 16 Q14 24 4 32" stroke="white" strokeOpacity="0.5" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M16 0 Q6 8 16 16 Q6 24 16 32" stroke="white" strokeOpacity="0.3" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="4" y1="8" x2="16" y2="8" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="4" y1="16" x2="16" y2="16" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="4" y1="24" x2="16" y2="24" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
      </g>

      {/* Small decorative dots */}
      <circle cx="90" cy="160" r="4" fill="white" fillOpacity="0.2" />
      <circle cx="102" cy="172" r="3" fill="white" fillOpacity="0.15" />
      <circle cx="440" cy="150" r="3" fill="white" fillOpacity="0.2" />
      <circle cx="452" cy="140" r="5" fill="white" fillOpacity="0.12" />
      <circle cx="430" cy="340" r="4" fill="white" fillOpacity="0.15" />
    </svg>
  )
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const [redirectUrl, setRedirectUrl] = useState('/dashboard')

  useEffect(() => {
    // Check for redirect parameter in URL
    const urlParams = new URLSearchParams(window.location.search)
    const redirect = urlParams.get('redirect')
    if (redirect) {
      setRedirectUrl(redirect)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      setTimeout(() => {
        const validCredentials = [
          { email: 'patient@demo.com', password: 'patient123' },
          { email: 'doctor@demo.com', password: 'doctor123' },
          { email: 'admin@demo.com', password: 'admin123' }
        ]

        const isValid = validCredentials.some(
          cred => cred.email === formData.email && cred.password === formData.password
        )

        if (isValid) {
          localStorage.setItem('userEmail', formData.email)
          router.push(redirectUrl)
        } else {
          setError('Invalid email or password. Please try again.')
        }
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError('Login failed. Please try again.')
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        {/* Subtle mesh overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative z-10 flex flex-col justify-center items-center text-white px-12 text-center w-full">

          {/* Illustration */}
         
          <div className=" w-full flex justify-center">
            <MedicalIllustration />
          </div>

          {/* Text content */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-base opacity-80">Continue your stroke prevention journey</p>
          </div>

          <div className="gap-1 grid  grid-cols-3 w-full">
            <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <p className="text-left text-sm opacity-90">Early stroke risk detection</p>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <p className="text-left text-sm opacity-90">Personalized health recommendations</p>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <p className="text-left text-sm opacity-90">Secure and confidential healthcare management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side – Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Access your stroke prevention dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

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
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

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
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:text-green-500">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-green-600 hover:text-green-500 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 text-gray-500 rounded-lg">
            <p className="text-xs font-bold mb-2">Demo Credentials:</p>
            <div className="text-xs space-y-1">
              <p><span className="font-medium">Patient:</span> patient@demo.com / patient123</p>
              <p><span className="font-medium">Doctor:</span> doctor@demo.com / doctor123</p>
              <p><span className="font-medium">Admin:</span> admin@demo.com / admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}