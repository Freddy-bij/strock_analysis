'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  FileText, 
  Heart, 
  Bell, 
  User, 
  Settings,
  Video,
  Phone,
  AlertCircle,
  TrendingUp,
  Activity,
  Pill,
  Stethoscope,
  ChevronRight,
  LogOut,
  AlertTriangle
} from 'lucide-react'
import { PatientDashboardStats, Appointment, Prescription, MedicalRecord } from '@/types'
import { patientsAPI, authAPI } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import UserAvatar from '@/components/UserAvatar'
import SraCosLogo from '@/components/SraCosLogo'

interface StrokeRiskData {
  riskScore: number
  riskLevel: 'low' | 'medium' | 'high'
  lastAssessmentDate: string
  recommendations: string[]
}

export default function PatientDashboard() {
  const [stats, setStats] = useState<PatientDashboardStats | null>(null)
  const [strokeRiskData, setStrokeRiskData] = useState<StrokeRiskData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  // Calculate health score based on available data - TEMPORARILY DISABLED
  const calculateHealthScore = (appointments: any, prescriptions: any, records: any): number => {
    return 75
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      console.log('=== STARTING DASHBOARD DATA FETCH ===')
      
      // Set minimal safe data first to prevent crashes
      const safeData = {
        upcomingAppointments: [],
        recentPrescriptions: [],
        medicalRecords: [],
        healthMetrics: {
          lastCheckup: '',
          upcomingVaccinations: [],
          medicationReminders: []
        },
        healthScore: 75
      }
      
      setStats(safeData)
      
      // Now try to get real data with maximum safety
      try {
        console.log('Making API calls...')
        
        // First, let's just test the API call without any processing
        const appointmentsResult = await patientsAPI.getAppointments()
        console.log('RAW Appointments API result:', appointmentsResult)
        console.log('Type of result:', typeof appointmentsResult)
        console.log('Is array?:', Array.isArray(appointmentsResult))
        
        // Try to access the filter method directly
        try {
          const testFilter = (appointmentsResult as any).filter
          console.log('Filter method exists:', typeof testFilter === 'function')
        } catch (filterError) {
          console.error('Error accessing filter method:', filterError)
        }
        
        // Check if the result has a filter method
        if (appointmentsResult && typeof (appointmentsResult as any).filter === 'function') {
          console.log('Appointments result has filter method')
        } else {
          console.log('Appointments result does NOT have filter method')
        }
        
        // Ensure we have an array and filter for confirmed/approved appointments only
        let appointmentsArray: any[] = []
        if (appointmentsResult && (appointmentsResult as any).success && Array.isArray((appointmentsResult as any).data)) {
          appointmentsArray = (appointmentsResult as any).data
        } else if (Array.isArray(appointmentsResult)) {
          appointmentsArray = appointmentsResult
        }
        
        console.log('=== APPOINTMENTS DEBUG ===')
        console.log('Total appointments:', appointmentsArray.length)
        console.log('All appointments:', appointmentsArray)
        
        // Log each appointment's structure to understand the data
        appointmentsArray.forEach((apt: any, index: number) => {
          console.log(`Appointment ${index} structure:`, apt)
          console.log(`  - Keys: ${Object.keys(apt)}`)
          console.log(`  - id: ${apt.id}`)
          console.log(`  - _id: ${apt._id}`)
          console.log(`  - appointmentId: ${apt.appointmentId}`)
        })
        
        // Filter for confirmed/approved appointments only
        const confirmedAppointments = appointmentsArray.filter((apt: any) => {
          // Check if there's a localStorage update for this appointment
          const localStorageUpdate = localStorage.getItem(`appointment-${apt.id}`)
          if (localStorageUpdate) {
            const update = JSON.parse(localStorageUpdate)
            apt.status = update.status // Update the status from localStorage
            console.log(`Found localStorage update for appointment ${apt.id}: ${update.status}`)
          }
          
          const isApproved = apt.status === 'confirmed' || apt.status === 'in-progress' || apt.status === 'completed'
          const appointmentDate = new Date(apt.date)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const isUpcoming = appointmentDate >= today
          
          console.log(`Appointment ${apt.id}:`)
          console.log(`  - status: ${apt.status}`)
          console.log(`  - date: ${apt.date}`)
          console.log(`  - appointmentDate: ${appointmentDate}`)
          console.log(`  - today: ${today}`)
          console.log(`  - isApproved: ${isApproved}`)
          console.log(`  - isUpcoming: ${isUpcoming}`)
          console.log(`  - will show: ${isApproved && isUpcoming}`)
          
          return isApproved && isUpcoming
        })
        
        console.log('Confirmed appointments:', confirmedAppointments.length)
        console.log('Confirmed appointments details:', confirmedAppointments)
        
        // Update with safe appointments data (only confirmed ones)
        setStats(prev => prev ? {
          ...prev,
          upcomingAppointments: confirmedAppointments.slice(0, 3) as unknown as Appointment[]
        } : safeData)
        
      } catch (apiError) {
        console.error('Appointments API failed:', apiError)
        console.error('API Error details:', (apiError as any).stack)
      }
      
      // Try other APIs separately
      try {
        const prescriptionsResult = await patientsAPI.getPrescriptions()
        const prescriptionsArray = Array.isArray(prescriptionsResult) ? prescriptionsResult : []
        
        setStats(prev => prev ? {
          ...prev,
          recentPrescriptions: prescriptionsArray.slice(0, 3) as unknown as Prescription[]
        } : safeData)
      } catch (apiError) {
        console.error('Prescriptions API failed:', apiError)
      }
      
      try {
        const recordsResult = await patientsAPI.getMedicalHistory()
        const recordsArray = Array.isArray(recordsResult) ? recordsResult : []
        
        setStats(prev => prev ? {
          ...prev,
          medicalRecords: recordsArray.slice(0, 3) as unknown as MedicalRecord[]
        } : safeData)
      } catch (apiError) {
        console.error('Medical history API failed:', apiError)
      }
      
      // Load stroke risk data
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/stroke-risk/latest`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          
          if (response.ok) {
            const strokeRiskResults = await response.json()
            console.log('Stroke risk API response:', strokeRiskResults)
            
            if (strokeRiskResults.success && strokeRiskResults.data) {
              const results = strokeRiskResults.data
              setStrokeRiskData({
                riskScore: results.riskScore,
                riskLevel: results.riskLevel,
                lastAssessmentDate: results.assessmentDate,
                recommendations: results.recommendations
              })
            }
          }
        }
      } catch (strokeError) {
        console.error('Stroke risk API failed:', strokeError)
      }
      
      // TEMPORARILY DISABLED FOR DEBUGGING
      // Update health score separately
      /*
      try {
        const currentStats = stats
        if (currentStats) {
          const healthScore = calculateHealthScore(
            currentStats.upcomingAppointments,
            currentStats.recentPrescriptions,
            currentStats.medicalRecords
          )
          setStats(prev => prev ? { ...prev, healthScore } : null)
        }
      } catch (scoreError) {
        console.error('Health score calculation failed:', scoreError)
      }
      */
      
    } catch (err) {
      console.error('Dashboard error:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      // Call backend logout API
      await authAPI.logout()
      
      // Clear local storage regardless of backend response
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Redirect to login
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
      
      // Even if backend logout fails, clear local storage and redirect
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/auth/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="text-green-600 hover:text-green-500 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-
        auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
             <SraCosLogo size="lg" showText={true} />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard/patient/appointments" className="flex items-center text-gray-600 hover:text-green-600">
                <Calendar className="w-4 h-4 mr-2" />
                Appointments
              </Link>
              <Link href="/dashboard/patient/prescriptions" className="flex items-center text-gray-600 hover:text-green-600">
                <Pill className="w-4 h-4 mr-2" />
                Prescriptions
              </Link>
              <Link href="/dashboard/patient/records" className="flex items-center text-gray-600 hover:text-green-600">
                <FileText className="w-4 h-4 mr-2" />
                Medical Records
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-green-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {user && <UserAvatar user={user} size="md" />}
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600">Here's your health overview for today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">This Week</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.upcomingAppointments.length || 0}</h3>
            <p className="text-gray-600">Upcoming Appointments</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Pill className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.healthMetrics.medicationReminders.length || 0}</h3>
            <p className="text-gray-600">Medications</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.medicalRecords.length || 0}</h3>
            <p className="text-gray-600">Medical Records</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-500">Health Score</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.healthScore || 0}%</h3>
            <p className="text-gray-600">Overall Health</p>
          </div>
        </div>

        {/* Stroke Risk Status */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Stroke Risk Status</h2>
            <Link 
              href="/stroke-risk"
              className="text-green-600 hover:text-green-500 text-sm font-medium flex items-center"
            >
              Retake Assessment
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {strokeRiskData ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    strokeRiskData.riskLevel === 'low' ? 'bg-green-100' :
                    strokeRiskData.riskLevel === 'medium' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <Heart className={`w-8 h-8 ${
                      strokeRiskData.riskLevel === 'low' ? 'text-green-600' :
                      strokeRiskData.riskLevel === 'medium' ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-lg font-bold ${
                        strokeRiskData.riskLevel === 'low' ? 'text-green-600' :
                        strokeRiskData.riskLevel === 'medium' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {strokeRiskData.riskLevel.toUpperCase()} RISK
                      </span>
                      {strokeRiskData.riskLevel === 'high' && (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Risk Score: {strokeRiskData.riskScore}/100
                    </p>
                    <p className="text-xs text-gray-500">
                      Last assessed: {new Date(strokeRiskData.lastAssessmentDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    strokeRiskData.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                    strokeRiskData.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {strokeRiskData.riskLevel === 'low' && '✓ Good'}
                    {strokeRiskData.riskLevel === 'medium' && '⚠ Moderate'}
                    {strokeRiskData.riskLevel === 'high' && '! High Risk'}
                  </div>
                </div>
              </div>
              
              {strokeRiskData.recommendations.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Recommendations</h3>
                  <div className="space-y-2">
                    {strokeRiskData.recommendations.slice(0, 3).map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-600">{rec}</p>
                      </div>
                    ))}
                    {strokeRiskData.recommendations.length > 3 && (
                      <p className="text-xs text-gray-500">
                        +{strokeRiskData.recommendations.length - 3} more recommendations
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No stroke risk assessment completed yet</p>
              <Link 
                href="/stroke-risk"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Activity className="w-4 h-4 mr-2" />
                Take Assessment
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link 
              href="/appointments/book"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white hover:bg-opacity-30 transition-colors"
            >
              <Calendar className="w-6 h-6 mb-2" />
              <p className="font-medium">Book Appointment</p>
            </Link>
            <Link 
              href="/dashboard/patient/chat"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white hover:bg-opacity-30 transition-colors"
            >
              <Phone className="w-6 h-6 mb-2" />
              <p className="font-medium">Start Consultation</p>
            </Link>
            <Link 
              href="/dashboard/patient/prescriptions"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white hover:bg-opacity-30 transition-colors"
            >
              <Pill className="w-6 h-6 mb-2" />
              <p className="font-medium">View Prescriptions</p>
            </Link>
            <Link 
              href="/stroke-risk"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white hover:bg-opacity-30 transition-colors"
            >
              <Activity className="w-6 h-6 mb-2" />
              <p className="font-medium">Stroke Risk Test</p>
            </Link>
            <Link 
              href="/dashboard/patient/records"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white hover:bg-opacity-30 transition-colors"
            >
              <FileText className="w-6 h-6 mb-2" />
              <p className="font-medium">Medical Records</p>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                  <Link 
                    href="/dashboard/patient/appointments"
                    className="text-green-600 hover:text-green-500 text-sm font-medium flex items-center"
                  >
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {stats?.upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming appointments</p>
                    <Link 
                      href="/appointments/book"
                      className="text-green-600 hover:text-green-500 font-medium mt-2 inline-block"
                    >
                      Book an Appointment
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats?.upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Stethoscope className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Dr. {appointment.doctor?.lastName}</p>
                            <p className="text-sm text-gray-600">{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {appointment.consultationType === 'video' && (
                            <Video className="w-4 h-4 text-blue-500" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Prescriptions */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Prescriptions</h2>
                  <Link 
                    href="/dashboard/patient/prescriptions"
                    className="text-green-600 hover:text-green-500 text-sm font-medium flex items-center"
                  >
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {stats?.recentPrescriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <Pill className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No recent prescriptions</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats?.recentPrescriptions.map((prescription) => (
                      <div key={prescription.id} className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-900 mb-2">
                          {prescription.medications.length} Medication{prescription.medications.length > 1 ? 's' : ''}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          Dr. {prescription.doctor?.lastName}
                        </p>
                        <div className="space-y-1">
                          {prescription.medications.slice(0, 2).map((med, index) => (
                            <p key={index} className="text-xs text-gray-500">
                              • {med.name} - {med.dosage}
                            </p>
                          ))}
                        </div>
                        <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                          prescription.status === 'active' ? 'bg-green-100 text-green-800' :
                          prescription.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {prescription.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
