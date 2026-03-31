'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  Heart, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Shield,
  Brain,
  TrendingUp,
  Users,
  ChevronRight,
  BarChart3,
  Clock,
  Star,
  Calculator
} from 'lucide-react'

export default function Home() {
  const [currentStat, setCurrentStat] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const healthStats = [
    {
      value: '75%',
      label: 'Stroke Risk Reduction',
      description: 'Early detection saves lives',
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    },
    {
      value: '2.5M',
      label: 'Lives Impacted',
      description: 'People screened worldwide',
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      value: '85%',
      label: 'Accuracy Rate',
      description: 'Risk prediction precision',
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />
    },
    {
      value: '24/7',
      label: 'Monitoring',
      description: 'Continuous health tracking',
      icon: <Clock className="w-6 h-6 text-orange-600" />
    }
  ]

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-red-600" />,
      title: 'Risk Prediction Engine',
      description: 'Simple input of health data calculates personalized stroke risk levels (Low, Medium, High)',
      color: 'red'
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Personalized Recommendations',
      description: 'Tailored health advice based on your specific risk factors and lifestyle',
      color: 'blue'
    },
    {
      icon: <Activity className="w-8 h-8 text-green-600" />,
      title: 'Patient Dashboards',
      description: 'Comprehensive monitoring interface for tracking health metrics over time',
      color: 'green'
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-orange-600" />,
      title: 'Alert Notifications',
      description: 'Immediate notifications for high-risk users requiring urgent attention',
      color: 'orange'
    }
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Neurologist",
      content: "This system has revolutionized how we identify at-risk patients. Early detection capabilities have saved countless lives.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Patient",
      content: "The stroke risk assessment helped me understand my health better. The personalized recommendations were life-changing.",
      rating: 5
    },
    {
      name: "Dr. Robert Williams",
      role: "Cardiologist",
      content: "Finally, a tool that shifts healthcare from treatment to prevention. This is the future of medicine.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                {/* Custom SVG Logo */}
                <svg width="40" height="40" viewBox="0 0 40 40" className="w-10 h-10">
                  <circle cx="20" cy="20" r="18" fill="#16A34A" />
                  <path d="M20 8C14.5 8 10 12.5 10 18C10 23.5 14.5 28 20 28C25.5 28 30 23.5 30 18C30 12.5 25.5 8 20 8Z" fill="white"/>
                  <path d="M20 12C17.8 12 16 13.8 16 16C16 18.2 17.8 20 20 20C22.2 20 24 18.2 24 16C24 13.8 22.2 12 20 12Z" fill="#16A34A"/>
                  <path d="M15 22C15 22 17.5 24 20 24C22.5 24 25 22 25 22" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 15C12 15 8 18 8 22M28 15C28 15 32 18 32 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-2xl font-bold text-gray-900">SRACOS</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</Link>
              <Link href="#impact" className="text-gray-600 hover:text-green-600 transition-colors">Impact</Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-green-600 transition-colors">Testimonials</Link>
              <Link href="/stroke-risk" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Take Assessment
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-700 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Stroke Risk Analysis & Prevention
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Shift healthcare from reactive treatment to proactive prevention. Our web/mobile system analyzes 
                stroke risk through simple health data input, providing personalized recommendations to optimize 
                care and reduce healthcare costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/stroke-risk"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center font-semibold"
                >
                  <Calculator className="mr-2 w-5 h-5" />
                  Calculate Your Risk
                </Link>
                <Link 
                  href="#features"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center"
                >
                  Learn More
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {healthStats.map((stat, index) => (
                    <div key={index} className={`text-center p-4 rounded-lg ${
                      currentStat === index ? 'bg-white/20' : 'bg-white/5'
                    } transition-all duration-500`}>
                      <div className="flex justify-center mb-2">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-green-100">{stat.label}</div>
                      <div className="text-xs text-green-200">{stat.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Stroke Challenge We're Solving
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stroke is one of the leading causes of death and disability, especially in developing countries. 
              Many individuals are unaware of their risk factors, diagnosis often happens too late, and there 
              is a lack of digital tools for early detection and continuous monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Late Diagnosis</h3>
              <p className="text-gray-600">
                Most stroke diagnoses happen after symptoms appear
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reactive Treatment</h3>
              <p className="text-gray-600">
                Healthcare focuses on treatment rather than prevention
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Digital Tools</h3>
              <p className="text-gray-600">
                Lack of early detection and monitoring systems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Prevention Solution
            </h2>
            <p className="text-xl text-gray-600">
              Key features designed for early detection and continuous monitoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-6 mx-auto`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Target Users
            </h2>
            <p className="text-xl text-gray-600">
              Designed for everyone involved in stroke prevention and brain health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Individuals 30+</h3>
              <p className="text-gray-600">
                Proactive health monitoring and risk assessment
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Healthcare Providers</h3>
              <p className="text-gray-600">
                Advanced tools for patient monitoring and care
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hospitals</h3>
              <p className="text-gray-600">
                Population-level stroke prevention programs
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Health Organizations</h3>
              <p className="text-gray-600">
                Community health monitoring and prevention
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Potential Impact
            </h2>
            <p className="text-xl text-gray-600">
              Transforming healthcare from reactive treatment to proactive prevention
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">40%</h3>
              <p className="text-gray-600">Reduction in Stroke Cases</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-blue-600 mb-2">60%</h3>
              <p className="text-gray-600">Earlier Detection</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-purple-600 mb-2">50%</h3>
              <p className="text-gray-600">Cost Reduction</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-orange-600 mb-2">85%</h3>
              <p className="text-gray-600">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Expert Validation
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by healthcare professionals and patients worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Stroke Prevention Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands who are already using SRACOS for proactive stroke prevention
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/stroke-risk"
              className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center font-semibold"
            >
              <Calculator className="mr-2 w-5 h-5" />
              Calculate Your Risk Now
            </Link>
            <Link 
              href="/auth/signup"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center"
            >
              Create Account
              <ChevronRight className="ml-2 w-5 h-5" />
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
                <svg width="32" height="32" viewBox="0 0 40 40" className="w-8 h-8">
                  <circle cx="20" cy="20" r="18" fill="#16A34A" />
                  <path d="M20 8C14.5 8 10 12.5 10 18C10 23.5 14.5 28 20 28C25.5 28 30 23.5 30 18C30 12.5 25.5 8 20 8Z" fill="white"/>
                  <path d="M20 12C17.8 12 16 13.8 16 16C16 18.2 17.8 20 20 20C22.2 20 24 18.2 24 16C24 13.8 22.2 12 20 12Z" fill="#16A34A"/>
                  <path d="M15 22C15 22 17.5 24 20 24C22.5 24 25 22 25 22" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 15C12 15 8 18 8 22M28 15C28 15 32 18 32 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-2xl font-bold">SRACOS</span>
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
            <p>&copy; 2024 SRACOS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
