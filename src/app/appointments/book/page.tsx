'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  Video, 
  MapPin, 
  DollarSign,
  Star,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  MessageCircle
} from 'lucide-react'
import { Doctor, TimeSlot, AppointmentBookingForm } from '@/types'
import { useAuth } from '@/hooks/useAuth'
import UserAvatar from '@/components/UserAvatar'
import { appointmentsAPI, patientsAPI, doctorsAPI } from '@/lib/api'

export default function BookAppointment() {
  const [step, setStep] = useState(1)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [loading, setLoading] = useState(false)
  const [doctorsLoading, setDoctorsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [specialization, setSpecialization] = useState('')
  const { user } = useAuth()
  const [formData, setFormData] = useState<AppointmentBookingForm>({
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    consultationType: 'in-person',
    notes: ''
  })

  const router = useRouter()

  const specializations = [
    'Neurology',
    'Cardiology', 
    'Stroke Medicine',
    'Preventive Medicine',
    'Internal Medicine',
    'Vascular Medicine',
    'General Practice',
    'Emergency Medicine'
  ]

  useEffect(() => {
    // Fetch real doctors from API
    const fetchDoctors = async () => {
      setDoctorsLoading(true)
      try {
        const result = await doctorsAPI.getAllDoctors() as any
        console.log('Doctors API response:', result)
        
        if (result && result.success && Array.isArray(result.data)) {
          // Transform backend data to match frontend Doctor interface
          const transformedDoctors = result.data.map((doctor: any) => ({
            id: doctor._id,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            email: doctor.email,
            phone: doctor.phone || '+1234567890',
            dateOfBirth: doctor.dateOfBirth || '1980-01-01',
            role: doctor.userType,
            status: doctor.status,
            specialization: doctor.specialization,
            licenseNumber: doctor.licenseNumber || 'MD000000',
            experience: doctor.experience || 0,
            education: doctor.education || [],
            certifications: doctor.certifications || [],
            consultationFee: doctor.consultationFee || 100,
            rating: doctor.rating || 0,
            availableSlots: [],
            createdAt: doctor.createdAt || '2020-01-01',
            updatedAt: doctor.updatedAt || '2024-01-01'
          }))
          setDoctors(transformedDoctors)
        } else {
          console.warn('Invalid doctors API response:', result)
          // Fallback to mock data if API fails
          const mockDoctors: Doctor[] = [
            {
              id: '1',
              firstName: 'John',
              lastName: 'Smith',
              email: 'john.smith@example.com',
              phone: '+1234567890',
              dateOfBirth: '1980-01-01',
              role: 'doctor',
              status: 'active',
              specialization: 'Neurology',
              licenseNumber: 'MD123456',
              experience: 15,
              education: ['Harvard Medical School'],
              certifications: ['Board Certified Neurologist', 'Stroke Specialist'],
              consultationFee: 150,
              rating: 4.8,
              availableSlots: [],
              createdAt: '2020-01-01',
              updatedAt: '2024-01-01'
            },
            {
              id: '2',
              firstName: 'Sarah',
              lastName: 'Johnson',
              email: 'sarah.johnson@example.com',
              phone: '+1234567891',
              dateOfBirth: '1982-05-15',
              role: 'doctor',
              status: 'active',
              specialization: 'Stroke Medicine',
              licenseNumber: 'MD789012',
              experience: 12,
              education: ['Johns Hopkins School of Medicine'],
              certifications: ['Board Certified Stroke Specialist'],
              consultationFee: 175,
              rating: 4.9,
              availableSlots: [],
              createdAt: '2020-01-01',
              updatedAt: '2024-01-01'
            }
          ]
          setDoctors(mockDoctors)
        }
      } catch (error) {
        console.error('Failed to fetch doctors:', error)
        // Fallback to mock data if API fails
        const mockDoctors: Doctor[] = [
          {
            id: '1',
            firstName: 'John',
            lastName: 'Smith',
            email: 'john.smith@example.com',
            phone: '+1234567890',
            dateOfBirth: '1980-01-01',
            role: 'doctor',
            status: 'active',
            specialization: 'Neurology',
            licenseNumber: 'MD123456',
            experience: 15,
            education: ['Harvard Medical School'],
            certifications: ['Board Certified Neurologist', 'Stroke Specialist'],
            consultationFee: 150,
            rating: 4.8,
            availableSlots: [],
            createdAt: '2020-01-01',
            updatedAt: '2024-01-01'
          },
          {
            id: '2',
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@example.com',
            phone: '+1234567891',
            dateOfBirth: '1982-05-15',
            role: 'doctor',
            status: 'active',
            specialization: 'Stroke Medicine',
            licenseNumber: 'MD789012',
            experience: 12,
            education: ['Johns Hopkins School of Medicine'],
            certifications: ['Board Certified Stroke Specialist'],
            consultationFee: 175,
            rating: 4.9,
            availableSlots: [],
            createdAt: '2020-01-01',
            updatedAt: '2024-01-01'
          }
        ]
        setDoctors(mockDoctors)
      } finally {
        setDoctorsLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchAvailableSlots()
    }
  }, [selectedDoctor, selectedDate])

  const fetchAvailableSlots = async () => {
    if (!selectedDoctor || !selectedDate) return

    setLoading(true)
    try {
      console.log('Fetching available slots for doctor:', selectedDoctor.id, 'on date:', selectedDate)
      const slotsData = await appointmentsAPI.getAvailableSlots(selectedDoctor.id, selectedDate) as any
      console.log('Available slots response:', slotsData)
      
      if (slotsData && slotsData.success && Array.isArray(slotsData.data)) {
        const transformedSlots = slotsData.data.map((slot: string, index: number) => ({
          id: (index + 1).toString(),
          startTime: slot,
          endTime: getNextTimeSlot(slot),
          available: true
        }))
        setAvailableSlots(transformedSlots)
      } else {
        // Fallback to mock slots if API fails or returns unexpected data
        const mockSlots: TimeSlot[] = [
          { id: '1', startTime: '09:00', endTime: '09:30', available: true },
          { id: '2', startTime: '09:30', endTime: '10:00', available: true },
          { id: '3', startTime: '10:00', endTime: '10:30', available: false },
          { id: '4', startTime: '10:30', endTime: '11:00', available: true },
          { id: '5', startTime: '11:00', endTime: '11:30', available: true },
          { id: '6', startTime: '11:30', endTime: '12:00', available: false },
          { id: '7', startTime: '14:00', endTime: '14:30', available: true },
          { id: '8', startTime: '14:30', endTime: '15:00', available: true },
          { id: '9', startTime: '15:00', endTime: '15:30', available: true },
          { id: '10', startTime: '15:30', endTime: '16:00', available: false }
        ]
        setAvailableSlots(mockSlots)
      }
    } catch (error) {
      console.error('Error fetching available slots:', error)
      // Fallback to mock slots on error
      const mockSlots: TimeSlot[] = [
        { id: '1', startTime: '09:00', endTime: '09:30', available: true },
        { id: '2', startTime: '09:30', endTime: '10:00', available: true },
        { id: '3', startTime: '10:00', endTime: '10:30', available: false },
        { id: '4', startTime: '10:30', endTime: '11:00', available: true },
        { id: '5', startTime: '11:00', endTime: '11:30', available: true },
        { id: '6', startTime: '11:30', endTime: '12:00', available: false },
        { id: '7', startTime: '14:00', endTime: '14:30', available: true },
        { id: '8', startTime: '14:30', endTime: '15:00', available: true },
        { id: '9', startTime: '15:00', endTime: '15:30', available: true },
        { id: '10', startTime: '15:30', endTime: '16:00', available: false }
      ]
      setAvailableSlots(mockSlots)
    } finally {
      setLoading(false)
    }
  }

  const getNextTimeSlot = (currentTime: string): string => {
    const [hours, minutes] = currentTime.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes + 30
    const newHours = Math.floor(totalMinutes / 60)
    const newMinutes = totalMinutes % 60
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`
  }

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialization = !specialization || doctor.specialization === specialization
    return matchesSearch && matchesSpecialization
  })

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setFormData(prev => ({ ...prev, doctorId: doctor.id }))
    setStep(2)
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setFormData(prev => ({ ...prev, date }))
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot)
    setFormData(prev => ({ ...prev, time: slot.startTime }))
    setStep(3)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Submitting appointment booking:', formData)
      const result = await appointmentsAPI.createAppointment({
        doctorId: formData.doctorId,
        date: formData.date,
        time: formData.time,
        duration: 30,
        type: formData.consultationType,
        notes: formData.notes,
        reason: formData.reason
      }) as any
      console.log('Booking result:', result)
      
      if (result && result.success) {
        router.push('/dashboard/patient/appointments?success=true')
      } else {
        console.error('Booking failed:', result)
        alert('Failed to book appointment. Please try again.')
      }
    } catch (error) {
      console.error('Error booking appointment:', error)
      alert('Failed to book appointment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    return maxDate.toISOString().split('T')[0]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard/patient" className="flex items-center space-x-2">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">Back to Dashboard</span>
              </Link>
            </div>
            {user && <UserAvatar user={user} size="md" />}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${
                    step >= stepNumber ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {stepNumber === 1 ? 'Select Doctor' : stepNumber === 2 ? 'Choose Date & Time' : 'Confirm Details'}
                  </p>
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step > stepNumber ? 'bg-green-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Select Doctor */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Doctor</h2>
            
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-gray-500 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
                >
                  <option value="">All Specializations</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Doctor List */}
            <div className="space-y-4">
              {doctorsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading doctors...</p>
                </div>
              ) : (
                filteredDoctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                         onClick={() => handleDoctorSelect(doctor)}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Dr. {doctor.firstName} {doctor.lastName}
                          </h3>
                          <p className="text-gray-600">{doctor.specialization}</p>
                          <div className="flex items-center mt-2 space-x-4">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600 ml-1">${doctor.consultationFee}</span>
                            </div>
                            <div className="flex items-center">
                              <Stethoscope className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600 ml-1">{doctor.experience} years</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Step 2: Choose Date & Time */}
        {step === 2 && selectedDoctor && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Date & Time</h2>
            
            {/* Selected Doctor Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                  </h3>
                  <p className="text-gray-600">{selectedDoctor.specialization}</p>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
              <input
                type="date"
                min={getMinDate()}
                max={getMaxDate()}
                value={selectedDate}
                onChange={(e) => handleDateSelect(e.target.value)}
                className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots</h3>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading available slots...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && handleSlotSelect(slot)}
                        disabled={!slot.available}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          !slot.available 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-gray-300 hover:border-green-500 hover:bg-green-50 cursor-pointer'
                        }`}
                      >
                        <p className="font-medium">{slot.startTime}</p>
                        <p className="text-sm text-gray-600">- {slot.endTime}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Confirm Details */}
        {step === 3 && selectedDoctor && selectedDate && selectedSlot && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Appointment Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Appointment Summary */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium">Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialization:</span>
                    <span className="font-medium">{selectedDoctor.specialization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedSlot.startTime} - {selectedSlot.endTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultation Fee:</span>
                    <span className="font-medium">${selectedDoctor.consultationFee}</span>
                  </div>
                </div>
              </div>

              {/* Consultation Type */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Type</h3>
                <div className="grid grid-cols-3 gap-4">
                  <label className="relative">
                    <input
                      type="radio"
                      name="consultationType"
                      value="in-person"
                      checked={formData.consultationType === 'in-person'}
                      onChange={(e) => setFormData(prev => ({ ...prev, consultationType: 'in-person' }))}
                      className="sr-only text-gray-500"
                    />
                    <div className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      formData.consultationType === 'in-person' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300'
                    }`}>
                      <MapPin className="w-6 h-6 mb-2" />
                      <p className="font-medium">In-Person</p>
                      <p className="text-sm text-gray-600">Visit the clinic</p>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="consultationType"
                      value="video"
                      checked={formData.consultationType === 'video'}
                      onChange={(e) => setFormData(prev => ({ ...prev, consultationType: 'video' }))}
                      className="sr-only text-gray-500"
                    />
                    <div className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      formData.consultationType === 'video' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300'
                    }`}>
                      <Video className="w-6 h-6 mb-2" />
                      <p className="font-medium">Video Call</p>
                      <p className="text-sm text-gray-600">Online video</p>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="consultationType"
                      value="chat"
                      checked={formData.consultationType === 'chat'}
                      onChange={(e) => setFormData(prev => ({ ...prev, consultationType: 'chat' }))}
                      className="sr-only text-gray-500"
                    />
                    <div className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      formData.consultationType === 'chat' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300'
                    }`}>
                      <MessageCircle className="w-6 h-6 mb-2" />
                      <p className="font-medium">Chat</p>
                      <p className="text-sm text-gray-600">Text consultation</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Reason for Visit */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reason for Visit</h3>
                <textarea
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Please describe your symptoms or reason for consultation..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              {/* Additional Notes */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes (Optional)</h3>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional information you'd like to share..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Booking...' : 'Confirm Appointment'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
