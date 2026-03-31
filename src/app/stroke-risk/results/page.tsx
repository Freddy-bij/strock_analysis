'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Heart, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronRight,
  Calendar,
  User,
  Phone,
  Download,
  TrendingUp,
  TrendingDown,
  Minus
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

interface RiskResult {
  level: 'low' | 'medium' | 'high'
  score: number
  percentage: number
  factors: {
    name: string
    impact: 'positive' | 'negative' | 'neutral'
    description: string
  }[]
  recommendations: string[]
  nextCheckup: string
}

export default function StrokeRiskResultsPage() {
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedData = sessionStorage.getItem('strokeRiskData')
    if (!storedData) {
      router.push('/stroke-risk')
      return
    }

    const data = JSON.parse(storedData) as HealthData
    setHealthData(data)
    
    // Calculate risk based on health data
    const result = calculateStrokeRisk(data)
    setRiskResult(result)
    setLoading(false)
  }, [router])

  const calculateStrokeRisk = (data: HealthData): RiskResult => {
    let score = 0
    const factors: RiskResult['factors'] = []
    const recommendations: string[] = []

    // Age factor
    const age = parseInt(data.age)
    if (age >= 65) {
      score += 3
      factors.push({
        name: 'Age',
        impact: 'negative',
        description: 'Age 65+ increases stroke risk significantly'
      })
      recommendations.push('Consider more frequent health screenings')
    } else if (age >= 55) {
      score += 2
      factors.push({
        name: 'Age',
        impact: 'negative',
        description: 'Age 55-64 moderately increases stroke risk'
      })
    } else {
      factors.push({
        name: 'Age',
        impact: 'positive',
        description: 'Age is within lower risk range'
      })
    }

    // Blood pressure factor
    const systolic = parseInt(data.systolicBP)
    const diastolic = parseInt(data.diastolicBP)
    if (systolic >= 140 || diastolic >= 90) {
      score += 3
      factors.push({
        name: 'Blood Pressure',
        impact: 'negative',
        description: 'High blood pressure is a major stroke risk factor'
      })
      recommendations.push('Monitor blood pressure regularly and follow treatment plan')
      recommendations.push('Reduce sodium intake and maintain healthy weight')
    } else if (systolic >= 120 || diastolic >= 80) {
      score += 1
      factors.push({
        name: 'Blood Pressure',
        impact: 'negative',
        description: 'Elevated blood pressure increases stroke risk'
      })
      recommendations.push('Consider lifestyle modifications to lower blood pressure')
    } else {
      factors.push({
        name: 'Blood Pressure',
        impact: 'positive',
        description: 'Blood pressure is within healthy range'
      })
    }

    // BMI factor
    const bmi = parseFloat(data.bmi)
    if (bmi >= 30) {
      score += 2
      factors.push({
        name: 'BMI',
        impact: 'negative',
        description: 'Obesity significantly increases stroke risk'
      })
      recommendations.push('Work with healthcare provider on weight management plan')
      recommendations.push('Incorporate regular physical activity and balanced diet')
    } else if (bmi >= 25) {
      score += 1
      factors.push({
        name: 'BMI',
        impact: 'negative',
        description: 'Overweight status increases stroke risk'
      })
      recommendations.push('Consider weight management through diet and exercise')
    } else {
      factors.push({
        name: 'BMI',
        impact: 'positive',
        description: 'Healthy weight reduces stroke risk'
      })
    }

    // Smoking factor
    if (data.smokingStatus === 'current') {
      score += 3
      factors.push({
        name: 'Smoking',
        impact: 'negative',
        description: 'Current smoking doubles stroke risk'
      })
      recommendations.push('Seek smoking cessation support immediately')
      recommendations.push('Consider nicotine replacement therapy or counseling')
    } else if (data.smokingStatus === 'former') {
      score += 1
      factors.push({
        name: 'Smoking',
        impact: 'positive',
        description: 'Former smoker - risk decreases over time'
      })
      recommendations.push('Maintain smoke-free lifestyle')
    } else {
      factors.push({
        name: 'Smoking',
        impact: 'positive',
        description: 'Non-smoker status reduces stroke risk'
      })
    }

    // Diabetes factor
    if (data.diabetesStatus === 'type1' || data.diabetesStatus === 'type2') {
      score += 2
      factors.push({
        name: 'Diabetes',
        impact: 'negative',
        description: 'Diabetes increases stroke risk significantly'
      })
      recommendations.push('Maintain tight blood sugar control')
      recommendations.push('Regular diabetes monitoring and medication adherence')
    } else if (data.diabetesStatus === 'prediabetes') {
      score += 1
      factors.push({
        name: 'Diabetes',
        impact: 'negative',
        description: 'Prediabetes increases future stroke risk'
      })
      recommendations.push('Implement lifestyle changes to prevent diabetes progression')
    } else {
      factors.push({
        name: 'Diabetes',
        impact: 'positive',
        description: 'No diabetes reduces stroke risk'
      })
    }

    // Physical activity factor
    if (data.physicalActivity === 'sedentary') {
      score += 2
      factors.push({
        name: 'Physical Activity',
        impact: 'negative',
        description: 'Sedentary lifestyle increases stroke risk'
      })
      recommendations.push('Start with 10-15 minutes of daily activity and gradually increase')
      recommendations.push('Consider activities like walking, swimming, or cycling')
    } else if (data.physicalActivity === 'active') {
      factors.push({
        name: 'Physical Activity',
        impact: 'positive',
        description: 'Regular physical activity significantly reduces stroke risk'
      })
    } else {
      factors.push({
        name: 'Physical Activity',
        impact: 'positive',
        description: 'Moderate activity helps reduce stroke risk'
      })
      recommendations.push('Consider increasing physical activity to 150 minutes per week')
    }

    // Family history factor
    if (data.familyHistory === 'yes') {
      score += 1
      factors.push({
        name: 'Family History',
        impact: 'negative',
        description: 'Family history increases genetic stroke risk'
      })
      recommendations.push('Be extra vigilant about other risk factors')
      recommendations.push('Consider genetic counseling if appropriate')
    } else {
      factors.push({
        name: 'Family History',
        impact: 'positive',
        description: 'No family history reduces genetic risk'
      })
    }

    // Determine risk level
    let level: 'low' | 'medium' | 'high'
    let percentage: number
    
    if (score <= 4) {
      level = 'low'
      percentage = Math.max(5, 15 - score * 2)
    } else if (score <= 8) {
      level = 'medium'
      percentage = 20 + (score - 4) * 5
    } else {
      level = 'high'
      percentage = Math.min(75, 40 + (score - 8) * 7)
    }

    // Add general recommendations
    recommendations.push('Schedule regular check-ups with your healthcare provider')
    recommendations.push('Maintain a heart-healthy diet rich in fruits and vegetables')
    recommendations.push('Limit alcohol consumption and manage stress levels')

    return {
      level,
      score,
      percentage,
      factors,
      recommendations: [...new Set(recommendations)], // Remove duplicates
      nextCheckup: level === 'high' ? '3 months' : level === 'medium' ? '6 months' : '12 months'
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'high': return 'text-red-600 bg-red-100 border-red-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'medium': return <Minus className="w-6 h-6 text-yellow-600" />
      case 'high': return <AlertTriangle className="w-6 h-6 text-red-600" />
      default: return <Info className="w-6 h-6 text-gray-600" />
    }
  }

  const getFactorIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingDown className="w-4 h-4 text-green-600" />
      case 'negative': return <TrendingUp className="w-4 h-4 text-red-600" />
      default: return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your stroke risk...</p>
        </div>
      </div>
    )
  }

  if (!riskResult || !healthData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/stroke-risk" className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Back to Assessment</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Heart className="w-6 h-6 text-red-500" />
              <h1 className="text-xl font-semibold text-gray-900">Stroke Risk Results</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Risk Level Summary */}
        <div className={`rounded-xl p-6 mb-8 border-2 ${getRiskColor(riskResult.level)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getRiskIcon(riskResult.level)}
              <div>
                <h2 className="text-2xl font-bold capitalize">
                  {riskResult.level} Stroke Risk
                </h2>
                <p className="text-sm opacity-80 mt-1">
                  Risk Score: {riskResult.score}/15 • {riskResult.percentage}% estimated 10-year risk
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{riskResult.percentage}%</div>
              <div className="text-sm opacity-80">10-year risk</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Factors Analysis */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Risk Factors Analysis</h3>
                <p className="text-sm text-gray-600 mt-1">
                  How your health factors contribute to stroke risk
                </p>
              </div>
              <div className="p-6 space-y-4">
                {riskResult.factors.map((factor, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="mt-1">
                      {getFactorIcon(factor.impact)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{factor.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          factor.impact === 'positive' ? 'bg-green-100 text-green-800' :
                          factor.impact === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {factor.impact}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{factor.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border mt-8">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Personalized Recommendations</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Actionable steps to reduce your stroke risk
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {riskResult.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions & Next Steps */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Next Steps</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Recommended Check-up</h4>
                  </div>
                  <p className="text-blue-800">
                    Schedule your next check-up in <strong>{riskResult.nextCheckup}</strong>
                  </p>
                </div>

                <Link
                  href="/appointments/book"
                  className="block w-full text-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Calendar className="w-5 h-5 inline mr-2" />
                  Book Appointment
                </Link>

                <Link
                  href="/dashboard/patient/chat"
                  className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone className="w-5 h-5 inline mr-2" />
                  Consult Doctor
                </Link>

                <button
                  onClick={() => {
                    // Mock download functionality
                    const link = document.createElement('a')
                    link.href = '#'
                    link.download = 'stroke-risk-report.pdf'
                    link.click()
                  }}
                  className="block w-full text-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-5 h-5 inline mr-2" />
                  Download Report
                </button>
              </div>
            </div>

            {/* Emergency Warning */}
            {riskResult.level === 'high' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900 mb-2">Immediate Action Recommended</h4>
                    <p className="text-red-800 text-sm">
                      Given your high stroke risk, please consult with a healthcare provider as soon as possible 
                      to develop a comprehensive prevention plan.
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/dashboard/patient/chat"
                        className="text-red-700 hover:text-red-600 font-medium text-sm flex items-center"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Talk to a doctor now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
