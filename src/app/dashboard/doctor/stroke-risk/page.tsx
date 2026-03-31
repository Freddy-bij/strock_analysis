'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Heart, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Users,
  TrendingUp,
  Calendar,
  Filter,
  Search,
  ChevronRight,
  Download,
  Eye
} from 'lucide-react'

interface PatientRiskData {
  id: string
  patientName: string
  patientId: string
  age: number
  riskLevel: 'low' | 'medium' | 'high'
  riskScore: number
  lastAssessment: string
  nextCheckup: string
  criticalFactors: string[]
  trend: 'improving' | 'stable' | 'worsening'
}

export default function DoctorStrokeRiskPage() {
  const [patients, setPatients] = useState<PatientRiskData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRisk, setFilterRisk] = useState('all')
  const router = useRouter()

  useEffect(() => {
    fetchPatientRiskData()
  }, [])

  const fetchPatientRiskData = async () => {
    // Mock data for development
    const mockData: PatientRiskData[] = [
      {
        id: '1',
        patientName: 'Robert Johnson',
        patientId: 'P001',
        age: 65,
        riskLevel: 'high',
        riskScore: 12,
        lastAssessment: '2024-03-15',
        nextCheckup: '2024-06-15',
        criticalFactors: ['High Blood Pressure', 'Age 65+', 'Current Smoker'],
        trend: 'worsening'
      },
      {
        id: '2',
        patientName: 'Maria Garcia',
        patientId: 'P002',
        age: 45,
        riskLevel: 'medium',
        riskScore: 7,
        lastAssessment: '2024-03-20',
        nextCheckup: '2024-09-20',
        criticalFactors: ['Overweight', 'Family History'],
        trend: 'stable'
      },
      {
        id: '3',
        patientName: 'Robert Johnson',
        patientId: 'P003',
        age: 38,
        riskLevel: 'low',
        riskScore: 3,
        lastAssessment: '2024-03-10',
        nextCheckup: '2025-03-10',
        criticalFactors: ['None'],
        trend: 'improving'
      },
      {
        id: '4',
        patientName: 'Mary Williams',
        patientId: 'P004',
        age: 72,
        riskLevel: 'high',
        riskScore: 11,
        lastAssessment: '2024-03-18',
        nextCheckup: '2024-06-18',
        criticalFactors: ['Age 72', 'Diabetes', 'High BMI'],
        trend: 'stable'
      }
    ]

    setPatients(mockData)
    setLoading(false)
  }

  const filteredPatients = patients.filter(patient => 
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterRisk === 'all' || patient.riskLevel === filterRisk)
  )

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'worsening': return <TrendingUp className="w-4 h-4 text-green-700" />
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600'
      case 'worsening': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const riskStats = {
    total: patients.length,
    high: patients.filter(p => p.riskLevel === 'high').length,
    medium: patients.filter(p => p.riskLevel === 'medium').length,
    low: patients.filter(p => p.riskLevel === 'low').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patient risk data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard/doctor" className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Heart className="w-6 h-6 text-red-500" />
              <h1 className="text-xl font-semibold text-gray-900">Stroke Risk Monitoring</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Risk Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total Patients</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{riskStats.total}</h3>
            <p className="text-gray-600">Under monitoring</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm text-gray-500">High Risk</span>
            </div>
            <h3 className="text-2xl font-bold text-red-600">{riskStats.high}</h3>
            <p className="text-gray-600">Require immediate attention</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-500">Medium Risk</span>
            </div>
            <h3 className="text-2xl font-bold text-yellow-600">{riskStats.medium}</h3>
            <p className="text-gray-600">Need monitoring</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Low Risk</span>
            </div>
            <h3 className="text-2xl font-bold text-green-600">{riskStats.low}</h3>
            <p className="text-gray-600">Stable condition</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-gray-500 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
              />
            </div>
            
            <div className="relative ">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Risk Levels</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>
            </div>

            <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Patients List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Patient Risk Overview ({filteredPatients.length})
            </h2>
          </div>
          
          {filteredPatients.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No patients found</p>
              <p className="text-sm text-gray-400">
                {searchTerm || filterRisk !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Your patients will appear here'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <p className="font-medium text-gray-900">{patient.patientName}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.riskLevel)}`}>
                            {patient.riskLevel.toUpperCase()} RISK
                          </span>
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(patient.trend)}
                            <span className={`text-xs ${getTrendColor(patient.trend)}`}>
                              {patient.trend}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>ID: {patient.patientId}</span>
                          <span>Age: {patient.age}</span>
                          <span>Risk Score: {patient.riskScore}/15</span>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Last: {new Date(patient.lastAssessment).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Next: {new Date(patient.nextCheckup).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {patient.criticalFactors.map((factor, index) => (
                            <span key={index} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded">
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Link
                        href={`/dashboard/doctor/patients/${patient.patientId}`}
                        className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Link>
                      
                      {patient.riskLevel === 'high' && (
                        <Link
                          href="/dashboard/doctor/chat"
                          className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                        >
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Contact Now
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
