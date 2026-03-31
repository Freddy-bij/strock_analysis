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
  LogOut
} from 'lucide-react'
import { PatientDashboardStats, Appointment, Prescription, MedicalRecord } from '@/types'
import { patientsAPI } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import UserAvatar from '@/components/UserAvatar'

export default function PatientDashboard() {
  const [stats, setStats] = useState<PatientDashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  // Calculate health score based on available data
  const calculateHealthScore = (appointments: Appointment[], prescriptions: Prescription[], records: MedicalRecord[]): number => {
    let score = 75 // Base score
    
    // Bonus points for recent medical records (indicating regular care)
    const recentRecords = records.filter(r => 
      new Date(r.date) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
    ).length
    score += Math.min(recentRecords * 3, 15) // Max 15 points for recent records
    
    // Bonus points for medication adherence
    const activeMedications = prescriptions.filter(p => p.status === 'active').length
    if (activeMedications > 0 && activeMedications <= 3) {
      score += 10 // Good medication management
    }
    
    // Bonus points for upcoming appointments (proactive care)
    const upcomingAppointments = appointments.filter(a => 
      new Date(a.date) >= new Date() && a.status !== 'cancelled'
    ).length
    score += Math.min(upcomingAppointments * 3, 9) // Max 9 points for appointments
    
    // Ensure score stays within 0-100 range
    return Math.min(Math.max(score, 0), 100)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [appointments, prescriptions, records] = await Promise.all([
        patientsAPI.getAppointments() as Promise<Appointment[]>,
        patientsAPI.getPrescriptions() as Promise<Prescription[]>,
        patientsAPI.getMedicalHistory() as Promise<MedicalRecord[]>
      ])

      setStats({
        upcomingAppointments: appointments.filter((a: Appointment) => 
          new Date(a.date) >= new Date() && a.status !== 'cancelled'
        ).slice(0, 3),
        recentPrescriptions: prescriptions.slice(0, 3),
        medicalRecords: records.slice(0, 3),
        healthMetrics: {
          lastCheckup: records.find((r: MedicalRecord) => r.type === 'diagnosis')?.date || '',
          upcomingVaccinations: [],
          medicationReminders: prescriptions
            .filter((p: Prescription) => p.status === 'active')
            .flatMap(p => p.medications)
        },
        // Calculate health score based on available data
        healthScore: calculateHealthScore(appointments, prescriptions, records)
      })
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/auth/login')
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">SRACOS</span>
              </Link>
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
