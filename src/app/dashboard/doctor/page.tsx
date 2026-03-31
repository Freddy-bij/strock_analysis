'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
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
  DollarSign,
  Star,
  Heart
} from 'lucide-react'
import { DoctorDashboardStats, Appointment, Prescription, Patient } from '@/types'
import { doctorsAPI } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'

export default function DoctorDashboard() {
  const [stats, setStats] = useState<DoctorDashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [appointments, patients] = await Promise.all([
        doctorsAPI.getAppointments() as Promise<Appointment[]>,
        doctorsAPI.getPatients() as Promise<Patient[]>
      ])

      const todayAppointments = appointments.filter(a => 
        new Date(a.date).toDateString() === new Date().toDateString()
      )

      setStats({
        todayAppointments: todayAppointments,
        totalPatients: patients.length,
        pendingConsultations: appointments.filter(a => a.status === 'scheduled').length,
        completedConsultations: appointments.filter(a => a.status === 'completed').length,
        averageRating: 4.8, // This would come from API
        earnings: {
          today: todayAppointments.length * 150,
          week: appointments.filter(a => {
            const appointmentDate = new Date(a.date)
            const weekAgo = new Date()
            weekAgo.setDate(weekAgo.getDate() - 7)
            return appointmentDate >= weekAgo && a.status === 'completed'
          }).length * 150,
          month: appointments.filter(a => {
            const appointmentDate = new Date(a.date)
            const monthAgo = new Date()
            monthAgo.setMonth(monthAgo.getMonth() - 1)
            return appointmentDate >= monthAgo && a.status === 'completed'
          }).length * 150
        }
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
              <Link href="/dashboard/doctor/appointments" className="flex items-center text-gray-600 hover:text-green-600">
                <Calendar className="w-4 h-4 mr-2" />
                Appointments
              </Link>
              <Link href="/dashboard/doctor/patients" className="flex items-center text-gray-600 hover:text-green-600">
                <Users className="w-4 h-4 mr-2" />
                Patients
              </Link>
              <Link href="/dashboard/doctor/prescriptions" className="flex items-center text-gray-600 hover:text-green-600">
                <Pill className="w-4 h-4 mr-2" />
                Prescriptions
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-green-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Dr. Smith</span>
              </div>
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
            Welcome back, Dr. {user?.lastName || user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600">You have {stats?.todayAppointments.length || 0} appointments today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Today</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.todayAppointments.length || 0}</h3>
            <p className="text-gray-600">Appointments</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.totalPatients || 0}</h3>
            <p className="text-gray-600">Patients</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-500">Rating</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.averageRating || 0}</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Today</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">${stats?.earnings.today || 0}</h3>
            <p className="text-gray-600">Earnings</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-green-600 to-green-700  rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link 
              href="/dashboard/doctor/appointments"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white hover:bg-opacity-30 transition-colors"
            >
              <Calendar className="w-6 h-6 mb-2" />
              <p className="font-medium">View Schedule</p>
            </Link>
            <Link 
              href="/dashboard/doctor/patients"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white hover:bg-opacity-30 transition-colors"
            >
              <Users className="w-6 h-6 mb-2" />
              <p className="font-medium">Patient List</p>
            </Link>
            <Link 
              href="/dashboard/doctor/prescriptions/create"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white hover:bg-opacity-30 transition-colors"
            >
              <Pill className="w-6 h-6 mb-2" />
              <p className="font-medium">New Prescription</p>
            </Link>
            <Link 
              href="/dashboard/doctor/stroke-risk"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white hover:bg-opacity-30 transition-colors"
            >
              <Heart className="w-6 h-6 mb-2" />
              <p className="font-medium">Stroke Risk Monitor</p>
            </Link>
            <Link 
              href="/dashboard/doctor/chat"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white hover:bg-opacity-30 transition-colors"
            >
              <Phone className="w-6 h-6 mb-2" />
              <p className="font-medium">Messages</p>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
                  <Link 
                    href="/dashboard/doctor/appointments"
                    className="text-green-600 hover:text-green-500 text-sm font-medium flex items-center"
                  >
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {stats?.todayAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No appointments today</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats?.todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{appointment.patient?.firstName} {appointment.patient?.lastName}</p>
                            <p className="text-sm text-gray-600">{appointment.time} • {appointment.reason}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {appointment.consultationType === 'video' && (
                            <Video className="w-4 h-4 text-blue-500" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                            appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {appointment.status}
                          </span>
                          {appointment.status === 'scheduled' && (
                            <button className="text-green-600 hover:text-green-500 text-sm font-medium">
                              Start
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Earnings Overview */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Earnings Overview</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Today</span>
                    <span className="font-semibold text-gray-900">${stats?.earnings.today || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-semibold text-gray-900">${stats?.earnings.week || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-semibold text-gray-900">${stats?.earnings.month || 0}</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">12% increase from last month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
