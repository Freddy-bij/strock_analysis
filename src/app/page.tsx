'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import SraCosLogo from '@/components/SraCosLogo'

export default function Home() {
  const [currentStat, setCurrentStat] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const healthStats = [
    {
      value: '75%',
      label: 'Stroke Risk Reduction',
      description: 'Early detection saves lives'
    },
    {
      value: '2.5M',
      label: 'Lives Impacted',
      description: 'People screened worldwide'
    },
    {
      value: '85%',
      label: 'Accuracy Rate',
      description: 'Risk prediction precision'
    },
    {
      value: '24/7',
      label: 'Monitoring',
      description: 'Continuous health tracking'
    }
  ]

  const features = [
    {
      title: 'Risk Prediction Engine',
      description: 'Simple input of health data calculates personalized stroke risk levels (Low, Medium, High)',
      color: 'red'
    },
    {
      title: 'Personalized Recommendations',
      description: 'Tailored health advice based on your specific risk factors and lifestyle',
      color: 'blue'
    },
    {
      title: 'Patient Dashboards',
      description: 'Comprehensive monitoring interface for tracking health metrics over time',
      color: 'green'
    },
    {
      title: 'Alert Notifications',
      description: 'Immediate notifications for high-risk users requiring urgent attention',
      color: 'orange'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar isScrolled={isScrolled} />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/heroes/background.png)',
            backgroundPosition: '50% 0%',
            backgroundSize: 'cover'
          }}
        >
          {/* Lighter overlay for brighter image */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* All content sits above overlay */}
        <div className="relative z-10 flex flex-col flex-1">
          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                Transforming Lives with<br />
                <span className="text-green-400">Proactive Stroke Prevention</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-4" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                Early detection meets personalized care.
              </p>
              
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                Prevent strokes before they happen.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  href="/auth/login"
                  className="bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link 
                  href="#features"
                  className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-green-600 transition-all duration-300 font-semibold text-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Stroke Challenge
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stroke is a leading cause of death and disability. Most cases are preventable with early detection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Late Detection</h3>
              <p className="text-gray-600 text-sm">
                Most strokes are diagnosed after symptoms appear
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Reactive Care</h3>
              <p className="text-gray-600 text-sm">
                Healthcare treats strokes instead of preventing them
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-green-700 mb-2">No Prevention Tools</h3>
              <p className="text-gray-600 text-sm">
                Lack of accessible stroke risk assessment systems
              </p>
            </div>
          </div>
        </div>
      </section>

      // {/* Key Features */}
      {/* <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Our System Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple, proven technology that saves lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border-2 border-green-200 text-center">
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                1. Risk Analysis
              </h3>
              <p className="text-gray-600 text-sm">
                Users input basic health data (age, blood pressure, BMI, diabetes status)
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-green-200 text-center">
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                2. Risk Calculation
              </h3>
              <p className="text-gray-600 text-sm">
                Our algorithm calculates stroke risk levels: Low, Medium, or High
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-green-200 text-center">
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                3. Personalized Plan
              </h3>
              <p className="text-gray-600 text-sm">
                Generates specific health recommendations based on risk factors
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-green-200 text-center">
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                4. Continuous Monitoring
              </h3>
              <p className="text-gray-600 text-sm">
                Dashboard for tracking progress and health metrics over time
              </p>
            </div>
          </div>
        </div>
      </section>  */}

{/* The Problem */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        The Stroke Challenge
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Stroke is a leading cause of death and disability. Most cases are preventable with early detection.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Late Detection */}
      <div className="text-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-center mb-5">
          <svg viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="110" height="90">
            <circle cx="55" cy="45" r="32" fill="#fef9c3" stroke="#f59e0b" strokeWidth="2.5"/>
            <circle cx="55" cy="45" r="27" fill="#fff"/>
            <line x1="55" y1="20" x2="55" y2="25" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round"/>
            <line x1="55" y1="65" x2="55" y2="70" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round"/>
            <line x1="30" y1="45" x2="35" y2="45" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round"/>
            <line x1="75" y1="45" x2="80" y2="45" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round"/>
            <line x1="55" y1="45" x2="55" y2="26" stroke="#1f2937" strokeWidth="3" strokeLinecap="round"/>
            <line x1="55" y1="45" x2="40" y2="29" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="55" cy="45" r="3" fill="#1f2937"/>
            <path d="M29 22 Q27 18 25 22" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M81 22 Q83 18 85 22" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M44 78 L55 60 L66 78 Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
            <text x="55" y="74" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#b45309">!</text>
          </svg>
        </div>
        <span className="inline-block mb-2 text-xs font-semibold uppercase tracking-widest text-red-400">Problem 01</span>
        <h3 className="text-xl font-semibold text-green-700 mb-2">Late Detection</h3>
        <p className="text-gray-600 text-sm">
          Most strokes are diagnosed after symptoms appear, missing the critical prevention window.
        </p>
      </div>

      {/* Reactive Care */}
      <div className="text-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-center mb-5">
          <svg viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="110" height="90">
            <rect x="18" y="42" width="60" height="30" rx="5" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <rect x="68" y="50" width="18" height="22" rx="4" fill="#fecaca" stroke="#ef4444" strokeWidth="2"/>
            <rect x="71" y="53" width="12" height="9" rx="2" fill="#bfdbfe"/>
            <rect x="33" y="49" width="14" height="4" rx="2" fill="#ef4444"/>
            <rect x="38" y="44" width="4" height="14" rx="2" fill="#ef4444"/>
            <circle cx="35" cy="74" r="8" fill="#374151" stroke="#1f2937" strokeWidth="1.5"/>
            <circle cx="35" cy="74" r="3.5" fill="#9ca3af"/>
            <circle cx="72" cy="74" r="8" fill="#374151" stroke="#1f2937" strokeWidth="1.5"/>
            <circle cx="72" cy="74" r="3.5" fill="#9ca3af"/>
            <rect x="28" y="36" width="12" height="7" rx="3" fill="#ef4444"/>
            <line x1="21" y1="30" x2="25" y2="36" stroke="#fca5a5" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="34" y1="28" x2="34" y2="34" stroke="#fca5a5" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="47" y1="30" x2="43" y2="36" stroke="#fca5a5" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="90" cy="22" r="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5"/>
            <line x1="85" y1="17" x2="95" y2="27" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="95" y1="17" x2="85" y2="27" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="inline-block mb-2 text-xs font-semibold uppercase tracking-widest text-red-400">Problem 02</span>
        <h3 className="text-xl font-semibold text-green-700 mb-2">Reactive Care</h3>
        <p className="text-gray-600 text-sm">
          Healthcare treats strokes instead of preventing them — responding after damage is already done.
        </p>
      </div>

      {/* No Prevention Tools */}
      <div className="text-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-center mb-5">
          <svg viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="110" height="90">
            <path d="M55 10 L80 22 L80 52 Q80 70 55 80 Q30 70 30 52 L30 22 Z" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
            <path d="M50 15 L53 35 L47 42 L52 58 L55 70" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="72" cy="28" r="12" fill="#fff" stroke="#9ca3af" strokeWidth="2"/>
            <line x1="80" y1="36" x2="88" y2="44" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round"/>
            <line x1="67" y1="23" x2="77" y2="33" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            <line x1="77" y1="23" x2="67" y2="33" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            <rect x="38" y="45" width="18" height="14" rx="3" fill="#fef9c3" stroke="#f59e0b" strokeWidth="1.5"/>
            <path d="M41 45 Q41 36 47 36 Q53 36 53 45" fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
            <line x1="53" y1="42" x2="58" y2="38" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="47" cy="51" r="2.5" fill="#b45309"/>
          </svg>
        </div>
        <span className="inline-block mb-2 text-xs font-semibold uppercase tracking-widest text-red-400">Problem 03</span>
        <h3 className="text-xl font-semibold text-green-700 mb-2">No Prevention Tools</h3>
        <p className="text-gray-600 text-sm">
          Lack of accessible stroke risk assessment systems leaves patients without early warning.
        </p>
      </div>
    </div>
  </div>
</section>


{/* Key Features */}
<section id="features" className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        How Our System Works
      </h2>
      <p className="text-lg text-gray-600">
        Simple, proven technology that saves lives
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Step 1: Risk Analysis */}
      <div className="bg-white p-6 rounded-xl border-2 border-green-200 text-center relative hover:shadow-lg transition-shadow">
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-xs font-bold text-green-600">1</div>
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100" height="80">
            <rect x="20" y="8" width="60" height="64" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5"/>
            <rect x="30" y="4" width="40" height="10" rx="3" fill="#10b981"/>
            <rect x="28" y="24" width="44" height="6" rx="2" fill="#d1fae5"/>
            <text x="32" y="29.5" fontSize="5" fill="#065f46" fontFamily="sans-serif">Age: 52</text>
            <rect x="28" y="34" width="44" height="6" rx="2" fill="#d1fae5"/>
            <text x="32" y="39.5" fontSize="5" fill="#065f46" fontFamily="sans-serif">BP: 140/90 mmHg</text>
            <rect x="28" y="44" width="44" height="6" rx="2" fill="#d1fae5"/>
            <text x="32" y="49.5" fontSize="5" fill="#065f46" fontFamily="sans-serif">BMI: 27.4</text>
            <rect x="28" y="54" width="44" height="6" rx="2" fill="#d1fae5"/>
            <text x="32" y="59.5" fontSize="5" fill="#065f46" fontFamily="sans-serif">Diabetes: Yes</text>
            <path d="M46 8 L50 12 L56 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-700 mb-2">Risk Analysis</h3>
        <p className="text-gray-600 text-sm">
          Users input basic health data (age, blood pressure, BMI, diabetes status)
        </p>
      </div>

      {/* Step 2: Risk Calculation */}
      <div className="bg-white p-6 rounded-xl border-2 border-green-200 text-center relative hover:shadow-lg transition-shadow">
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-xs font-bold text-green-600">2</div>
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100" height="80">
            <path d="M50 15 C35 12 22 22 22 36 C22 44 26 50 33 53 L33 65 L67 65 L67 53 C74 50 78 44 78 36 C78 22 65 12 50 15Z" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.8"/>
            <path d="M38 28 Q44 24 50 28 Q56 32 62 28" stroke="#6ee7b7" strokeWidth="1.5" fill="none"/>
            <path d="M34 40 Q40 36 46 40" stroke="#6ee7b7" strokeWidth="1.5" fill="none"/>
            <path d="M54 40 Q60 36 66 40" stroke="#6ee7b7" strokeWidth="1.5" fill="none"/>
            <path d="M26 68 A30 30 0 0 1 74 68" stroke="#e5e7eb" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M26 68 A30 30 0 0 1 54 40" stroke="#10b981" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <line x1="50" y1="68" x2="57" y2="48" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="50" cy="68" r="4" fill="#1f2937"/>
            <text x="22" y="76" fontSize="5" fill="#10b981" fontFamily="sans-serif" fontWeight="bold">LOW</text>
            <text x="45" y="76" fontSize="5" fill="#f59e0b" fontFamily="sans-serif" fontWeight="bold">MED</text>
            <text x="68" y="76" fontSize="5" fill="#ef4444" fontFamily="sans-serif" fontWeight="bold">HIGH</text>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-700 mb-2">Risk Calculation</h3>
        <p className="text-gray-600 text-sm">
          Our algorithm calculates stroke risk levels: Low, Medium, or High
        </p>
      </div>

      {/* Step 3: Personalized Plan */}
      <div className="bg-white p-6 rounded-xl border-2 border-green-200 text-center relative hover:shadow-lg transition-shadow">
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-xs font-bold text-green-600">3</div>
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100" height="80">
            <circle cx="30" cy="22" r="10" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
            <path d="M14 55 Q14 38 30 38 Q46 38 46 55" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
            <rect x="52" y="10" width="38" height="58" rx="4" fill="#fff" stroke="#10b981" strokeWidth="1.2"/>
            <circle cx="59" cy="24" r="4" fill="#10b981"/>
            <path d="M57 24 L59 26 L62 21" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            <rect x="65" y="21" width="18" height="3" rx="1" fill="#d1fae5"/>
            <circle cx="59" cy="35" r="4" fill="#10b981"/>
            <path d="M57 35 L59 37 L62 32" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            <rect x="65" y="32" width="14" height="3" rx="1" fill="#d1fae5"/>
            <circle cx="59" cy="46" r="4" fill="#f59e0b"/>
            <rect x="65" y="43" width="16" height="3" rx="1" fill="#fef3c7"/>
            <circle cx="59" cy="57" r="4" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1"/>
            <rect x="65" y="54" width="12" height="3" rx="1" fill="#f3f4f6"/>
            <line x1="46" y1="30" x2="52" y2="30" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 1.5"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-700 mb-2">Personalized Plan</h3>
        <p className="text-gray-600 text-sm">
          Generates specific health recommendations based on individual risk factors
        </p>
      </div>

      {/* Step 4: Continuous Monitoring */}
      <div className="bg-white p-6 rounded-xl border-2 border-green-200 text-center relative hover:shadow-lg transition-shadow">
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-xs font-bold text-green-600">4</div>
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100" height="80">
            <rect x="12" y="10" width="76" height="52" rx="6" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5"/>
            <rect x="12" y="10" width="76" height="18" rx="6" fill="#10b981"/>
            <rect x="12" y="22" width="76" height="6" fill="#10b981"/>
            <circle cx="20" cy="19" r="2.5" fill="#34d399"/>
            <circle cx="28" cy="19" r="2.5" fill="#6ee7b7"/>
            <polyline points="20,52 30,48 40,50 50,42 60,38 70,34 80,30" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <polygon points="20,52 30,48 40,50 50,42 60,38 70,34 80,30 80,55 20,55" fill="#d1fae5" opacity="0.5"/>
            <circle cx="50" cy="42" r="3" fill="#10b981"/>
            <circle cx="70" cy="34" r="3" fill="#10b981"/>
            <circle cx="80" cy="30" r="4" fill="#059669" stroke="#fff" strokeWidth="1.5"/>
            <text x="14" y="34" fontSize="4" fill="#6b7280" fontFamily="sans-serif">Hi</text>
            <text x="14" y="44" fontSize="4" fill="#6b7280" fontFamily="sans-serif">Md</text>
            <text x="14" y="54" fontSize="4" fill="#6b7280" fontFamily="sans-serif">Lo</text>
            <rect x="46" y="62" width="8" height="6" rx="1" fill="#d1d5db"/>
            <rect x="38" y="68" width="24" height="3" rx="2" fill="#9ca3af"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-700 mb-2">Continuous Monitoring</h3>
        <p className="text-gray-600 text-sm">
          Dashboard for tracking progress and health metrics over time
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Get Started */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Stroke Prevention Journey
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands who are taking control of their health
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/auth/login"
              className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              Login to System
            </Link>
            <Link 
              href="/auth/signup"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-green-600 transition-colors font-semibold"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <SraCosLogo 
                  size="lg" 
                  showText={true}
                  className="text-white"
                />
              </div>
              <p className="text-gray-400">
                Stroke Risk Analysis & Prevention System
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/stroke-risk" className="hover:text-white transition-colors">Risk Assessment</Link></li>
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#impact" className="hover:text-white transition-colors">Impact</Link></li>
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Research</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Docs</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="mr-2">Email:</span> support@sracos.com
                </li>
                <li className="flex items-center">
                  <span className="mr-2">Emergency:</span> 1-800-STROKE
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 FlowState. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
