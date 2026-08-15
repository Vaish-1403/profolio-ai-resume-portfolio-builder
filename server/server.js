import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resumeRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    // Also allow any localhost origin during development (different dev ports like 3004)
    const isLocalhost = typeof origin === 'string' && (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1'));
    if (!origin || allowedOrigins.includes(origin) || isLocalhost) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} is not allowed.`));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));

// Simple Request Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    app: 'ProFolio AI API Backend',
    version: '1.0.0',
    geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'development_demo_key_placeholder'),
    timestamp: new Date().toISOString()
  });
});

// Register Core API Routes
app.use('/api/resume', resumeRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 ProFolio AI Backend running on http://localhost:${PORT}`);
});
