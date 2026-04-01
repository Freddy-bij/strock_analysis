// User Types
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  role: 'patient' | 'doctor' | 'admin'
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
  updatedAt: string
}

export interface Patient extends User {
  role: 'patient'
  medicalHistory?: MedicalRecord[]
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
  }
  bloodType?: string
  allergies?: string[]
}

export interface Doctor extends User {
  role: 'doctor'
  specialization: string
  licenseNumber: string
  experience: number
  education: string[]
  certifications: string[]
  consultationFee: number
  rating: number
  availableSlots: TimeSlot[]
}

// Appointment Types
export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: string
  time: string
  duration: number
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  reason: string
  notes?: string
  consultationType: 'in-person' | 'video'
  createdAt: string
  updatedAt: string
  patient?: Patient
  doctor?: Doctor
}

export interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  available: boolean
}

// Prescription Types
export interface Prescription {
  _id?: string
  id?: string
  patientId: string | Patient
  doctorId: string | Doctor
  medications: Medication[]
  notes?: string
  prescribedAt: string
  expiresAt?: string
  status: 'active' | 'completed' | 'expired'
  createdAt: string
  patient?: Patient
  doctor?: Doctor
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
  sideEffects?: string[]
}

// Medical Record Types
export interface MedicalRecord {
  id: string
  patientId: string
  doctorId: string
  type: 'diagnosis' | 'lab-result' | 'imaging' | 'vaccination' | 'allergy' | 'condition'
  title: string
  description: string
  date: string
  attachments?: Attachment[]
  severity?: 'low' | 'moderate' | 'high' | 'critical'
  status: 'active' | 'resolved' | 'chronic'
  createdAt: string
  updatedAt: string
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedAt: string
}

// Chat Types
export interface Conversation {
  id: string
  participants: User[]
  lastMessage?: Message
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  type: 'text' | 'image' | 'file' | 'system'
  timestamp: string
  read: boolean
  sender?: User
}

// Video Consultation Types
export interface VideoConsultation {
  id: string
  appointmentId: string
  participantIds: string[]
  roomId: string
  status: 'waiting' | 'active' | 'ended'
  startedAt?: string
  endedAt?: string
  recordingUrl?: string
  createdAt: string
}

// Diagnosis Types
export interface Diagnosis {
  id: string
  patientId: string
  doctorId: string
  symptoms: string[]
  diagnosis: string
  recommendations: string[]
  severity: 'low' | 'moderate' | 'high' | 'critical'
  confidence: number
  requiresFollowUp: boolean
  followUpDate?: string
  createdAt: string
  updatedAt: string
  patient?: Patient
  doctor?: Doctor
}

export interface StrokePredictionInput {
  age: number
  gender: string
  hypertension: boolean
  heartDisease: boolean
  married: boolean
  workType: string
  residenceType: string
  avgGlucoseLevel: number
  bmi: number
  smokingStatus: string
}

export interface StrokePredictionResult {
  risk: 'low' | 'moderate' | 'high' | 'critical'
  probability: number
  factors: {
    name: string
    impact: 'positive' | 'negative'
    severity: number
  }[]
  recommendations: string[]
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'appointment' | 'prescription' | 'message' | 'system' | 'emergency'
  title: string
  message: string
  read: boolean
  data?: any
  createdAt: string
}

// Dashboard Types
export interface DashboardStats {
  totalPatients: number
  totalDoctors: number
  totalAppointments: number
  todayAppointments: number
  pendingAppointments: number
  completedAppointments: number
  revenue: number
  growth: {
    patients: number
    doctors: number
    appointments: number
  }
}

export interface PatientDashboardStats {
  upcomingAppointments: Appointment[]
  recentPrescriptions: Prescription[]
  medicalRecords: MedicalRecord[]
  healthMetrics: {
    lastCheckup: string
    upcomingVaccinations: string[]
    medicationReminders: Medication[]
  }
  healthScore: number
}

export interface DoctorDashboardStats {
  todayAppointments: Appointment[]
  totalPatients: number
  pendingConsultations: number
  completedConsultations: number
  averageRating: number
  earnings: {
    today: number
    week: number
    month: number
  }
}

// Form Types
export interface LoginForm {
  email: string
  password: string
  remember?: boolean
}

export interface SignupForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  password: string
  confirmPassword: string
  userType: 'patient' | 'doctor'
  specialization?: string
  licenseNumber?: string
  agreeToTerms: boolean
}

export interface AppointmentBookingForm {
  doctorId: string
  date: string
  time: string
  reason: string
  consultationType: 'in-person' | 'video'
  notes?: string
}

export interface PrescriptionForm {
  patientId: string
  medications: {
    name: string
    dosage: string
    frequency: string
    duration: string
    instructions?: string
  }[]
  notes?: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Error Types
export interface ApiError {
  message: string
  code?: string
  details?: any
}

// Chart Types
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }[]
}

// Filter and Search Types
export interface AppointmentFilters {
  status?: string
  dateFrom?: string
  dateTo?: string
  doctorId?: string
  patientId?: string
  consultationType?: string
}

export interface UserFilters {
  role?: string
  status?: string
  specialization?: string
  search?: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// System Types
export interface SystemConfig {
  appointmentDuration: number
  workingHours: {
    start: string
    end: string
  }
  bookingWindow: number
  cancellationPolicy: {
    hoursBeforeAppointment: number
    refundPercentage: number
  }
}

export interface ActivityLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId: string
  details: any
  ipAddress: string
  userAgent: string
  timestamp: string
}
