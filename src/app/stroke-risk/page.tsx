'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Heart, 
  Activity, 
  Calculator,
  AlertTriangle,
  CheckCircle,
  User,
  Calendar,
  ChevronRight,
  Info
} from 'lucide-react'

interface HealthData {
  age: string
  systolicBP: string
  diastolicBP: string
  bmi: string
  smokingStatus: string
  diabetesStatus: string
  physicalActivity: string
  familyHistory: string
}

export default function StrokeRiskAssessmentPage() {
  const [healthData, setHealthData] = useState<HealthData>({
    age: '',
    systolicBP: '',
    diastolicBP: '',
    bmi: '',
    smokingStatus: '',
    diabetesStatus: '',
    physicalActivity: '',
    familyHistory: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<HealthData>>({})
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (!token || !user) {
      // Redirect to login page
      router.push('/auth/login?redirect=/stroke-risk')
    } else {
      setIsAuthenticated(true)
      setAuthLoading(false)
    }
  }, [router])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect
  }

  const validateForm = () => {
    const newErrors: Partial<HealthData> = {}
    
    if (!healthData.age || parseInt(healthData.age) < 30 || parseInt(healthData.age) > 120) {
      newErrors.age = 'Please enter a valid age (30-120)'
    }
    if (!healthData.systolicBP || parseInt(healthData.systolicBP) < 70 || parseInt(healthData.systolicBP) > 250) {
      newErrors.systolicBP = 'Please enter valid systolic BP (70-250 mmHg)'
    }
    if (!healthData.diastolicBP || parseInt(healthData.diastolicBP) < 40 || parseInt(healthData.diastolicBP) > 150) {
      newErrors.diastolicBP = 'Please enter valid diastolic BP (40-150 mmHg)'
    }
    if (!healthData.bmi || parseFloat(healthData.bmi) < 10 || parseFloat(healthData.bmi) > 50) {
      newErrors.bmi = 'Please enter valid BMI (10-50)'
    }
    if (!healthData.smokingStatus) {
      newErrors.smokingStatus = 'Please select smoking status'
    }
    if (!healthData.diabetesStatus) {
      newErrors.diabetesStatus = 'Please select diabetes status'
    }
    if (!healthData.physicalActivity) {
      newErrors.physicalActivity = 'Please select activity level'
    }
    if (!healthData.familyHistory) {
      newErrors.familyHistory = 'Please select family history'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateRisk = async () => {
    if (!validateForm()) return

    setLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8080/api/stroke-risk/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(healthData)
      })

      const result = await response.json()

      if (result.success) {
        // Store results for the results page
        sessionStorage.setItem('strokeRiskResults', JSON.stringify(result.data))
        router.push('/stroke-risk/results')
      } else {
        setError('Failed to calculate risk. Please try again.')
      }
    } catch (err: any) {
      console.error('Risk calculation error:', err)
      setError('Failed to calculate risk. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof HealthData, value: string) => {
    setHealthData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard/patient" className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Heart className="w-6 h-6 text-red-500" />
              <h1 className="text-xl font-semibold text-gray-900">Stroke Risk Assessment</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Know Your Stroke Risk</h2>
          </div>
          <p className="text-green-100 mb-4">
            Early detection is key to stroke prevention. This assessment evaluates your risk factors 
            and provides personalized recommendations to help you maintain optimal brain health.
          </p>
          <div className="flex items-center space-x-2 text-sm text-green-100">
            <Info className="w-4 h-4" />
            <span>This assessment takes 2-3 minutes and is completely confidential</span>
          </div>
        </div>

        {/* Assessment Form */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-green-600" />
              Health Information
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Please provide accurate information for the most reliable risk assessment
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={healthData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
                  placeholder="Enter your age"
                  min="30"
                  max="120"
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.age}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BMI (Body Mass Index) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={healthData.bmi}
                  onChange={(e) => handleInputChange('bmi', e.target.value)}
                  className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
                  placeholder="Enter your BMI"
                  min="10"
                  max="50"
                />
                {errors.bmi && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.bmi}
                  </p>
                )}
              </div>
            </div>

            {/* Blood Pressure */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Pressure <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    value={healthData.systolicBP}
                    onChange={(e) => handleInputChange('systolicBP', e.target.value)}
                    className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
                    placeholder="Systolic (upper number)"
                    min="70"
                    max="250"
                  />
                  {errors.systolicBP && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.systolicBP}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    value={healthData.diastolicBP}
                    onChange={(e) => handleInputChange('diastolicBP', e.target.value)}
                    className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
                    placeholder="Diastolic (lower number)"
                    min="40"
                    max="150"
                  />
                  {errors.diastolicBP && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.diastolicBP}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Lifestyle Factors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Smoking Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={healthData.smokingStatus}
                  onChange={(e) => handleInputChange('smokingStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select status</option>
                  <option value="never">Never smoked</option>
                  <option value="former">Former smoker</option>
                  <option value="current">Current smoker</option>
                </select>
                {errors.smokingStatus && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.smokingStatus}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diabetes Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={healthData.diabetesStatus}
                  onChange={(e) => handleInputChange('diabetesStatus', e.target.value)}
                  className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select status</option>
                  <option value="no">No Diabetes</option>
                  <option value="yes">Diabetes (Type 1 or Type 2)</option>
                </select>
                {errors.diabetesStatus && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.diabetesStatus}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Physical Activity Level <span className="text-red-500">*</span>
                </label>
                <select
                  value={healthData.physicalActivity}
                  onChange={(e) => handleInputChange('physicalActivity', e.target.value)}
                  className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select activity level</option>
                  <option value="low">Low activity (0-1 days/week)</option>
                  <option value="moderate">Moderate activity (3-5 days/week)</option>
                  <option value="high">High activity (6-7 days/week)</option>
                </select>
                {errors.physicalActivity && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.physicalActivity}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Family History of Stroke <span className="text-red-500">*</span>
                </label>
                <select
                  value={healthData.familyHistory}
                  onChange={(e) => handleInputChange('familyHistory', e.target.value)}
                  className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select family history</option>
                  <option value="no">No family history</option>
                  <option value="yes">Yes, immediate family member</option>
                  <option value="extended">Yes, extended family member</option>
                </select>
                {errors.familyHistory && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.familyHistory}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={calculateRisk}
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Calculating Risk...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate My Stroke Risk
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        </main>
    </div>
  )
}
