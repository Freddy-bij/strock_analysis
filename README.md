# SRACOS Frontend

A modern, responsive healthcare management system built with Next.js, TypeScript, and Tailwind CSS. This frontend application provides a comprehensive platform for patients, doctors, and administrators to manage healthcare services seamlessly.

## 🚀 Features

### Core Functionality
- **Multi-role Authentication**: Secure login system for patients, doctors, and administrators
- **Patient Management**: Complete patient profiles, medical history, and health tracking
- **Doctor Dashboard**: Appointment management, patient records, and earnings tracking
- **Appointment Booking**: Intuitive 3-step booking process with real-time availability
- **Prescription Management**: Digital prescriptions with medication tracking
- **Real-time Chat**: Secure messaging between patients and healthcare providers
- **Video Consultations**: Telemedicine capabilities for remote consultations
- **Health Monitoring**: Stroke prediction and diagnostic tools

### Technical Features
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Component-based Architecture**: Reusable React components
- **API Integration**: Comprehensive backend communication layer
- **Real-time Updates**: WebSocket integration for live features
- **Mobile Responsive**: Optimized for all device sizes

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── dashboard/          # Role-based dashboards
│   │   ├── patient/
│   │   └── doctor/
│   ├── appointments/      # Appointment management
│   ├── prescriptions/     # Prescription management
│   ├── chat/             # Real-time messaging
│   ├── video/            # Video consultations
│   ├── diagnosis/        # Medical diagnosis tools
│   └── admin/            # Admin panel
├── components/           # Reusable React components
├── lib/                 # Utility functions and API layer
│   └── api.ts          # API integration layer
├── types/               # TypeScript type definitions
│   └── index.ts        # All type definitions
└── globals.css         # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sracos-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your API URL in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Authentication

The application supports three user roles:

### Demo Credentials
- **Patient**: `patient@demo.com` / `patient123`
- **Doctor**: `doctor@demo.com` / `doctor123`  
- **Admin**: `admin@demo.com` / `admin123`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 API Integration

The frontend includes a comprehensive API layer (`src/lib/api.ts`) with:

- **Authentication API**: Login, registration, password reset
- **Patient API**: Profile management, appointments, prescriptions
- **Doctor API**: Patient management, scheduling, earnings
- **Appointment API**: Booking, availability, rescheduling
- **Chat API**: Real-time messaging
- **Video API**: Consultation management
- **Diagnosis API**: Health predictions and assessments

## 🎨 UI Components

The application uses:
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Custom components** for consistent design
- **Responsive layouts** with mobile-first approach

## 🔄 State Management

- **React Hooks** for local state
- **Axios interceptors** for API communication
- **LocalStorage** for authentication tokens
- **Context API** for global state (if needed)

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please contact:
- Email: support@sracos.com
- Phone: 1-800-SRACOS

---

## 🔮 Future Enhancements

Planned features include:
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with wearable devices
- [ ] AI-powered health recommendations
- [ ] Multi-language support
- [ ] Offline mode capabilities
