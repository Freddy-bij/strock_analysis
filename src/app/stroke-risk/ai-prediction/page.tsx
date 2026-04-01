'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { predictionsAPI } from '@/lib/api'
import { 
  Brain,
  Activity,
  Calculator,
  AlertTriangle,
  ChevronRight,
  Info,
  User,
  Heart,
  Building2,
  Cigarette,
  Droplets,
  Home,
  Briefcase,
  CircleDot
} from 'lucide-react'

interface PredictionFormData {
  age: string
  gender: 'Male' | 'Female' | 'Other' | ''
  systolicBP: string
  diastolicBP: string
  heartDisease: boolean
  everMarried: boolean
  workType: 'Private' | 'Self-employed' | 'Govt_job' | 'children' | 'Never_worked' | ''
  residenceType: 'Urban' | 'Rural' | ''
  avgGlucoseLevel: string
  bmi: string
  smokingStatus: 'never' | 'formerly' | 'current' | 'unknown' | ''
}

interface PredictionResult {
  riskScore: number
  riskLevel: 'low' | 'medium' | 'high'
  probability: number
  criticalFactors: string[]
  recommendations: string[]
  timestamp: Date
}

export default function AIPredictionPage() {
  const [formData, setFormData] = useState<PredictionFormData>({
    age: '',
    gender: '',
    systolicBP: '',
    diastolicBP: '',
    heartDisease: false,
    everMarried: false,
    workType: '',
    residenceType: '',
    avgGlucoseLevel: '',
    bmi: '',
    smokingStatus: ''
  })
  const [loading, setLoading] = useState(false)
  const [checkingModel, setCheckingModel] = useState(true)
  const [modelReady, setModelReady] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof PredictionFormData, string>>>({})
  const [error, setError] = useState('')
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (!token || !user) {
      router.push('/auth/login?redirect=/stroke-risk/ai-prediction')
    } else {
      setIsAuthenticated(true)
      setAuthLoading(false)
      checkModelStatus()
    }
  }, [router])

  const checkModelStatus = async () => {
    try {
      const response: any = await predictionsAPI.getModelStatus()
      setModelReady(response.status.ready)
    } catch (err) {
      console.error('Failed to check model status:', err)
    } finally {
      setCheckingModel(false)
    }
  }

  const trainModel = async () => {
    try {
      setCheckingModel(true)
      const response: any = await predictionsAPI.trainModel()
      if (response.success) {
        setModelReady(true)
        alert('AI Model trained successfully! Accuracy: ' + response.accuracy.test)
      }
    } catch (err: any) {
      setError('Failed to train model: ' + err.message)
    } finally {
      setCheckingModel(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof PredictionFormData, string>> = {}
    
    if (!formData.age || parseInt(formData.age) < 30 || parseInt(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age (30-120)'
    }
    if (!formData.gender) {
      newErrors.gender = 'Please select gender'
    }
    if (!formData.systolicBP || parseInt(formData.systolicBP) < 70 || parseInt(formData.systolicBP) > 250) {
      newErrors.systolicBP = 'Please enter valid systolic BP (70-250 mmHg)'
    }
    if (!formData.diastolicBP || parseInt(formData.diastolicBP) < 40 || parseInt(formData.diastolicBP) > 150) {
      newErrors.diastolicBP = 'Please enter valid diastolic BP (40-150 mmHg)'
    }
    if (!formData.avgGlucoseLevel || parseFloat(formData.avgGlucoseLevel) < 50 || parseFloat(formData.avgGlucoseLevel) > 300) {
      newErrors.avgGlucoseLevel = 'Please enter valid glucose level (50-300 mg/dL)'
    }
    if (!formData.bmi || parseFloat(formData.bmi) < 10 || parseFloat(formData.bmi) > 50) {
      newErrors.bmi = 'Please enter valid BMI (10-50)'
    }
    if (!formData.workType) {
      newErrors.workType = 'Please select work type'
    }
    if (!formData.residenceType) {
      newErrors.residenceType = 'Please select residence type'
    }
    if (!formData.smokingStatus) {
      newErrors.smokingStatus = 'Please select smoking status'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
       if (!modelReady) {
      setError('AI Model is not ready. Please train the model first.')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const hypertension = parseInt(formData.systolicBP) >= 140 || parseInt(formData.diastolicBP) >= 90

      const response: any = await predictionsAPI.predictStroke({
        age: parseInt(formData.age),
        gender: formData.gender as 'Male' | 'Female' | 'Other',
        hypertension,
        heart_disease: formData.heartDisease,
        ever_married: formData.everMarried,
        work_type: formData.workType as 'Private' | 'Self-employed' | 'Govt_job' | 'children' | 'Never_worked',
        residence_type: formData.residenceType as 'Urban' | 'Rural',
        avg_glucose_level: parseFloat(formData.avgGlucoseLevel),
        bmi: parseFloat(formData.bmi),
        smoking_status: formData.smokingStatus as 'never' | 'formerly' | 'current' | 'unknown',
        userId: user.id || user._id
      })

      if (response.success) {
        setResult(response.prediction)
      } else {
        setError(response.message || 'Prediction failed')
      }
    } catch (err: any) {
      console.error('Prediction error:', err)
      setError(err.response?.data?.message || 'Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof PredictionFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard/patient" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Brain className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">AI Stroke Prediction</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-8 h-8" />
            <h2 className="text-2xl font-bold">AI-Powered Risk Assessment</h2>
          </div>
          <p className="text-blue-100 mb-4">
            Our machine learning model analyzes 5,000+ stroke cases to provide accurate risk predictions.
            Trained on real hospital data with 90%+ accuracy.
          </p>
          <div className="flex items-center space-x-4">
            {checkingModel ? (
              <span className="flex items-center text-sm text-blue-100">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Checking AI model status...
              </span>
            ) : modelReady ? (
              <span className="flex items-center text-sm text-green-300">
                <Activity className="w-4 h-4 mr-1" />
                AI Model Ready
              </span>
            ) : (
              <button
                onClick={trainModel}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Train AI Model
              </button>
            )}
          </div>
        </div>

        {result ? (
          /* Results Display */
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-blue-600" />
                AI Prediction Results
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Analysis completed on {new Date(result.timestamp).toLocaleString()}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Risk Score */}
              <div className={`p-6 rounded-xl border-2 ${getRiskColor(result.riskLevel)}`}>
                <div className="text-center">
                  <p className="text-sm font-medium uppercase tracking-wide mb-2">
                    {result.riskLevel === 'low' ? 'Low Risk' : result.riskLevel === 'medium' ? 'Medium Risk' : 'High Risk'}
                  </p>
                  <div className="text-5xl font-bold mb-2">
                    {(result.probability * 100).toFixed(1)}%
                  </div>
                  <p className="text-sm opacity-75">
                    Risk Score: {result.riskScore}/15
                  </p>
                </div>
              </div>

              {/* Critical Factors */}
              {result.criticalFactors.length > 0 && (
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <h4 className="font-semibold text-red-800 flex items-center mb-3">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Critical Risk Factors Identified
                  </h4>
                  <ul className="space-y-2">
                    {result.criticalFactors.map((factor, index) => (
                      <li key={index} className="flex items-center text-red-700 text-sm">
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <h4 className="font-semibold text-blue-800 flex items-center mb-3">
                  <Info className="w-5 h-5 mr-2" />
                  AI-Generated Recommendations
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start text-blue-700 text-sm">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  New Prediction
                </button>
                <Link
                  href="/dashboard/patient"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Assessment Form */
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                Health Information for AI Analysis
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Please provide accurate information for the most reliable AI prediction
              </p>
            </div>

            {error && (
              <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {error}
                </p>
              </div>
            )}

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your age"
                    min="30"
                    max="120"
                  />
                  {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                </div>
              </div>

              {/* Blood Pressure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Heart className="w-4 h-4 inline mr-1" />
                  Blood Pressure (mmHg) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      value={formData.systolicBP}
                      onChange={(e) => handleInputChange('systolicBP', e.target.value)}
                      className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Systolic (e.g., 120)"
                    />
                    {errors.systolicBP && <p className="mt-1 text-sm text-red-600">{errors.systolicBP}</p>}
                  </div>
                  <div>
                    <input
                      type="number"
                      value={formData.diastolicBP}
                      onChange={(e) => handleInputChange('diastolicBP', e.target.value)}
                      className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Diastolic (e.g., 80)"
                    />
                    {errors.diastolicBP && <p className="mt-1 text-sm text-red-600">{errors.diastolicBP}</p>}
                  </div>
                </div>
              </div>

              {/* Medical Conditions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="heartDisease"
                    checked={formData.heartDisease}
                    onChange={(e) => handleInputChange('heartDisease', e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="heartDisease" className="flex items-center text-gray-700">
                    <Heart className="w-4 h-4 mr-2 text-red-500" />
                    History of Heart Disease
                  </label>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="everMarried"
                    checked={formData.everMarried}
                    onChange={(e) => handleInputChange('everMarried', e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="everMarried" className="flex items-center text-gray-700">
                    <CircleDot className="w-4 h-4 mr-2 text-pink-500" />
                    Ever Married
                  </label>
                </div>
              </div>

              {/* Work & Residence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-1" />
                    Work Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.workType}
                    onChange={(e) => handleInputChange('workType', e.target.value)}
                    className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select work type</option>
                    <option value="Private">Private</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Govt_job">Government Job</option>
                    <option value="children">Children</option>
                    <option value="Never_worked">Never Worked</option>
                  </select>
                  {errors.workType && <p className="mt-1 text-sm text-red-600">{errors.workType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Home className="w-4 h-4 inline mr-1" />
                    Residence Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.residenceType}
                    onChange={(e) => handleInputChange('residenceType', e.target.value)}
                    className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select residence</option>
                    <option value="Urban">Urban</option>
                    <option value="Rural">Rural</option>
                  </select>
                  {errors.residenceType && <p className="mt-1 text-sm text-red-600">{errors.residenceType}</p>}
                </div>
              </div>

              {/* Health Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Droplets className="w-4 h-4 inline mr-1" />
                    Average Glucose Level (mg/dL) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.avgGlucoseLevel}
                    onChange={(e) => handleInputChange('avgGlucoseLevel', e.target.value)}
                    className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 100"
                  />
                  {errors.avgGlucoseLevel && <p className="mt-1 text-sm text-red-600">{errors.avgGlucoseLevel}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Activity className="w-4 h-4 inline mr-1" />
                    BMI (Body Mass Index) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.bmi}
                    onChange={(e) => handleInputChange('bmi', e.target.value)}
                    className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 25.5"
                  />
                  {errors.bmi && <p className="mt-1 text-sm text-red-600">{errors.bmi}</p>}
                </div>
              </div>

              {/* Smoking Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Cigarette className="w-4 h-4 inline mr-1" />
                  Smoking Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.smokingStatus}
                  onChange={(e) => handleInputChange('smokingStatus', e.target.value)}
                  className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select smoking status</option>
                  <option value="never">Never smoked</option>
                  <option value="formerly">Formerly smoked</option>
                  <option value="current">Currently smokes</option>
                  <option value="unknown">Unknown</option>
                </select>
                {errors.smokingStatus && <p className="mt-1 text-sm text-red-600">{errors.smokingStatus}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <button
                  onClick={handleSubmit}
                  disabled={loading || !modelReady}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      AI Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5 mr-2" />
                      Get AI Prediction
                    </>
                  )}
                </button>
                {!modelReady && (
                  <p className="mt-2 text-sm text-yellow-600">
                    Please train the AI model first before making predictions.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
