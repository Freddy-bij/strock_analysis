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
      </section>

      {/* Our Impact */}
      <section id="impact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Proven Results
            </h2>
            <p className="text-lg text-gray-600">
              Our system delivers measurable improvements in stroke prevention
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-600 mb-2">40%</h3>
              <p className="text-gray-600">Reduction in Stroke Cases</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-600 mb-2">60%</h3>
              <p className="text-gray-600">Earlier Detection</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-600 mb-2">50%</h3>
              <p className="text-gray-600">Cost Reduction</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-600 mb-2">85%</h3>
              <p className="text-gray-600">User Satisfaction</p>
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
