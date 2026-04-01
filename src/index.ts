import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { swaggerSpec, swaggerUi, swaggerUiOptions } from './config/swagger';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';
import strokeRiskRoutes from './routes/strokeRisk';
import userRoutes from './routes/users';
import doctorRoutes from './routes/doctors';
import appointmentRoutes from './routes/appointments';
import predictionRoutes from './routes/predictionRoutes';
import { seedAdmin } from './seeders/adminSeeder';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Body parsing middleware (must be before logging to capture body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Database connection
connectDB().then(() => {
  // Seed admin user after DB connection
  seedAdmin();
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stroke-risk', strokeRiskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/predictions', predictionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Stroke Analysis API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Stroke Analysis API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
});
