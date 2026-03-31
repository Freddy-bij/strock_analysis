'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Heart, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  ChevronLeft,
  Download,
  Share2,
  RefreshCw,
  ChevronRight,
  Phone
} from 'lucide-react'

interface StrokeRiskResults {
  riskScore: number
  riskLevel: 'low' | 'medium' | 'high'
  criticalFactors: string[]
  recommendations: string[]
  assessmentDate: string
  nextAssessmentDate: string
}

export default function StrokeRiskResultsPage() {
  const [results, setResults] = useState<StrokeRiskResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (!token || !user) {
      router.push('/auth/login?redirect=/stroke-risk')
      return
    } else {
      setIsAuthenticated(true)
      setAuthLoading(false)
    }

    // Load results from sessionStorage
    const storedResults = sessionStorage.getItem('strokeRiskResults')
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    } else {
      // If no results, redirect back to assessment
      router.push('/stroke-risk')
    }
    setLoading(false)
  }, [router])

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-8 h-8 text-green-600" />
      case 'medium': return <AlertTriangle className="w-8 h-8 text-yellow-600" />
      case 'high': return <AlertTriangle className="w-8 h-8 text-red-600" />
      default: return <Activity className="w-8 h-8 text-gray-600" />
    }
  }

  const getRiskMessage = (level: string) => {
    switch (level) {
      case 'low':
        return 'Your stroke risk is relatively low. Continue maintaining a healthy lifestyle.'
      case 'medium':
        return 'You have moderate stroke risk factors. Consider lifestyle modifications and regular monitoring.'
      case 'high':
        return 'Your stroke risk is elevated. Immediate medical consultation is recommended.'
      default:
        return 'Unable to determine risk level.'
    }
  }

  const handleRetakeAssessment = () => {
    sessionStorage.removeItem('strokeRiskResults')
    router.push('/stroke-risk')
  }

  const handleDownloadReport = () => {
    if (!results) return
    
    // Create a printable report
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Stroke Risk Assessment Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .risk-level { font-size: 24px; font-weight: bold; margin: 20px 0; }
              .section { margin: 20px 0; }
              .factor { margin: 5px 0; }
              .recommendation { margin: 5px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Stroke Risk Assessment Report</h1>
              <p>Assessment Date: ${new Date(results.assessmentDate).toLocaleDateString()}</p>
            </div>
            <div class="risk-level">
              Risk Level: ${results.riskLevel.toUpperCase()} (Score: ${results.riskScore})
            </div>
            <div class="section">
              <h3>Critical Risk Factors:</h3>
              ${results.criticalFactors.map(factor => `<div class="factor">• ${factor}</div>`).join('')}
            </div>
            <div class="section">
              <h3>Recommendations:</h3>
              ${results.recommendations.map(rec => `<div class="recommendation">• ${rec}</div>`).join('')}
            </div>
            <div class="section">
              <p><strong>Next Assessment Recommended:</strong> ${new Date(results.nextAssessmentDate).toLocaleDateString()}</p>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
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

  if (!results) {
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
        <div className={`rounded-xl p-6 mb-8 border-2 ${getRiskColor(results.riskLevel)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getRiskIcon(results.riskLevel)}
              <div>
                <h2 className="text-2xl font-bold capitalize">
                  {results.riskLevel} Stroke Risk
                </h2>
                <p className="text-sm opacity-80 mt-1">
                  Risk Score: {results.riskScore}/15
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{results.riskScore}</div>
              <div className="text-sm opacity-80">Risk Score</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Critical Factors */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
              Critical Risk Factors
            </h3>
            <div className="space-y-3">
              {results.criticalFactors.map((factor: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Recommendations
            </h3>
            <div className="space-y-3">
              {results.recommendations.map((recommendation: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assessment Timeline */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            Assessment Timeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Current Assessment</p>
              <p className="font-medium text-gray-900">
                {new Date(results.assessmentDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Next Recommended Assessment</p>
              <p className="font-medium text-gray-900">
                {new Date(results.nextAssessmentDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleRetakeAssessment}
            className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retake Assessment
          </button>
          
          <button
            onClick={handleDownloadReport}
            className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </button>
        </div>

                Please consult with your healthcare provider for proper diagnosis, treatment, and personalized medical recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Warning */}
        {results.riskLevel === 'high' && (
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medical Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Medical Disclaimer</h4>
              <p className="text-sm text-blue-800">
                This stroke risk assessment is for educational purposes only and should not replace professional medical advice. 
                Please consult with your healthcare provider for proper diagnosis, treatment, and personalized medical recommendations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
