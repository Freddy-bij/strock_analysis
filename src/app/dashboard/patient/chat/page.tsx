'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Send, 
  Phone, 
  Video, 
  Paperclip, 
  MoreVertical,
  ChevronLeft,
  User,
  Clock,
  CheckCircle
} from 'lucide-react'

interface Message {
  id: string
  sender: 'user' | 'doctor'
  content: string
  timestamp: string
  read: boolean
}

interface Doctor {
  id: string
  firstName: string
  lastName: string
  specialization: string
  avatar?: string
  isOnline: boolean
}

export default function PatientChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Mock data for development
    const mockDoctors: Doctor[] = [
      {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        specialization: 'General Practice',
        isOnline: true
      },
      {
        id: '2',
        firstName: 'Michael',
        lastName: 'Brown',
        specialization: 'Cardiology',
        isOnline: false
      }
    ]

    const mockMessages: Message[] = [
      {
        id: '1',
        sender: 'doctor',
        content: 'Hello! How can I help you today?',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: true
      },
      {
        id: '2',
        sender: 'user',
        content: 'I have been experiencing headaches for the past few days.',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        read: true
      },
      {
        id: '3',
        sender: 'doctor',
        content: 'I understand. Can you describe the type of headache and when it usually occurs?',
        timestamp: new Date(Date.now() - 2400000).toISOString(),
        read: true
      }
    ]

    setDoctors(mockDoctors)
    setSelectedDoctor(mockDoctors[0])
    setMessages(mockMessages)
    setLoading(false)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedDoctor) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')

    // Simulate doctor response
    setTimeout(() => {
      const doctorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'doctor',
        content: 'Thank you for sharing that information. Let me help you with this concern.',
        timestamp: new Date().toISOString(),
        read: false
      }
      setMessages(prev => [...prev, doctorMessage])
    }, 2000)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chat...</p>
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
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Doctor Consultation</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Doctors List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-900">Available Doctors</h2>
              </div>
              <div className="divide-y">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedDoctor?.id === doctor.id ? 'bg-green-50 border-l-4 border-green-600' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        {doctor.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          Dr. {doctor.firstName} {doctor.lastName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{doctor.specialization}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border h-[600px] flex flex-col">
              {/* Chat Header */}
              {selectedDoctor && (
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      {selectedDoctor.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{selectedDoctor.specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-end mt-1 space-x-1 ${
                        message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{formatTime(message.timestamp)}</span>
                        {message.sender === 'user' && message.read && (
                          <CheckCircle className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
