'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FileText, 
  Search, 
  Filter,
  Calendar,
  User,
  Download,
  ChevronRight,
  AlertCircle,
  Activity,
  Heart,
  Stethoscope
} from 'lucide-react'
import { patientsAPI } from '@/lib/api'
import { MedicalRecord } from '@/types'

export default function PatientMedicalRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const router = useRouter()

  useEffect(() => {
    fetchMedicalRecords()
  }, [])

  const fetchMedicalRecords = async () => {
    try {
      setLoading(true)
      const data = await patientsAPI.getMedicalHistory() as MedicalRecord[]
      setRecords(data)
    } catch (error) {
      setError('Failed to load medical records')
      console.error('Error fetching medical records:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRecords = records.filter(record => 
    `${record.doctor?.firstName} ${record.doctor?.lastName} ${record.description}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'all' || record.type === filterType)
  )

  const downloadRecord = async (recordId: string) => {
    try {
      // In a real app, this would call the download API
      console.log('Downloading medical record:', recordId)
      // Mock download
      const link = document.createElement('a')
      link.href = '#'
      link.download = `medical-record-${recordId}.pdf`
      link.click()
    } catch (error) {
      console.error('Error downloading medical record:', error)
    }
  }

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'diagnosis':
        return <Stethoscope className="w-5 h-5 text-blue-600" />
      case 'follow-up':
        return <Activity className="w-5 h-5 text-green-600" />
      case 'lab-result':
        return <FileText className="w-5 h-5 text-purple-600" />
      case 'vaccination':
        return <Heart className="w-5 h-5 text-red-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading medical records...</p>
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
            onClick={fetchMedicalRecords}
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
              <Link href="/dashboard/patient" className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Medical Records</h1>
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
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-gray-500 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Types</option>
                <option value="diagnosis">Diagnosis</option>
                <option value="follow-up">Follow-up</option>
                <option value="lab-result">Lab Results</option>
                <option value="vaccination">Vaccination</option>
              </select>
            </div>
          </div>
        </div>

        {/* Medical Records List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Medical History ({filteredRecords.length})
            </h2>
          </div>
          
          {filteredRecords.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No medical records found</p>
              <p className="text-sm text-gray-400">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Your medical records will appear here'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredRecords.map((record) => (
                <div key={record.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {getRecordIcon(record.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="font-medium text-gray-900 capitalize">
                            {record.type.replace('-', ' ')}
                          </p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            record.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {record.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <User className="w-4 h-4 mr-1" />
                          Dr. {record.doctor?.firstName} {record.doctor?.lastName}
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(record.date).toLocaleDateString()}
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700">{record.description}</p>
                        </div>

                        {record.type === 'diagnosis' && (
                          <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Stethoscope className="w-4 h-4 mr-1" />
                              {record.doctor?.specialization}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => downloadRecord(record.id)}
                        className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                      
                      <Link
                        href="/dashboard/patient/chat"
                        className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                      >
                        Ask Doctor
                      </Link>
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
