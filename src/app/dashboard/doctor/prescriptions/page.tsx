'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Pill, 
  Search, 
  Filter,
  User,
  Calendar,
  ChevronRight,
  AlertCircle,
  Download,
  FileText,
  Plus
} from 'lucide-react'
import { doctorsAPI } from '@/lib/api'
import { Prescription } from '@/types'

export default function DoctorPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const router = useRouter()

  useEffect(() => {
    fetchPrescriptions()
  }, [])

  const fetchPrescriptions = async () => {
    try {
      setLoading(true)
      const response = await doctorsAPI.getPrescriptions() as any
      // Handle both direct array and wrapped response formats
      const prescriptions = Array.isArray(response) ? response : response.data || []
      setPrescriptions(prescriptions)
    } catch (error) {
      setError('Failed to load prescriptions')
      console.error('Error fetching prescriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const patient = typeof prescription.patientId === 'object' ? prescription.patientId : prescription.patient;
    const patientName = patient ? `${patient.firstName} ${patient.lastName}` : '';
    return patientName.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (filterStatus === 'all' || prescription.status === filterStatus);
  })

  const downloadPrescription = async (prescriptionId: string) => {
    try {
      // In a real app, this would call the download API
      console.log('Downloading prescription:', prescriptionId)
      // Mock download
      const link = document.createElement('a')
      link.href = '#'
      link.download = `prescription-${prescriptionId}.pdf`
      link.click()
    } catch (error) {
      console.error('Error downloading prescription:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading prescriptions...</p>
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
            onClick={fetchPrescriptions}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
              <Link href="/dashboard/doctor" className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Prescriptions</h1>
              <Link 
                href="/dashboard/doctor/prescriptions/create"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create New</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search prescriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-gray-500 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prescriptions List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              All Prescriptions ({filteredPrescriptions.length})
            </h2>
          </div>
          
          {filteredPrescriptions.length === 0 ? (
            <div className="p-8 text-center">
              <Pill className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No prescriptions found</p>
              <p className="text-sm text-gray-400">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Your prescriptions will appear here'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredPrescriptions.map((prescription) => (
                <div key={prescription._id || prescription.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Pill className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Prescription for {
                            typeof prescription.patientId === 'object' 
                              ? `${prescription.patientId.firstName} ${prescription.patientId.lastName}`
                              : prescription.patient 
                                ? `${prescription.patient.firstName} ${prescription.patient.lastName}`
                                : 'Unknown Patient'
                          }
                        </p>
                        <p className="text-sm text-gray-600">
                          Dr. {
                            typeof prescription.doctorId === 'object' 
                              ? `${prescription.doctorId.firstName} ${prescription.doctorId.lastName}`
                              : prescription.doctor 
                                ? `${prescription.doctor.firstName} ${prescription.doctor.lastName}`
                                : 'Unknown Doctor'
                          }
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(prescription.prescribedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        prescription.status === 'active' ? 'bg-green-100 text-green-800' :
                        prescription.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {prescription.status}
                      </span>
                      
                      <button
                        onClick={() => downloadPrescription(prescription._id || prescription.id || '')}
                        className="text-green-600 hover:text-green-500 text-sm font-medium flex items-center"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
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
