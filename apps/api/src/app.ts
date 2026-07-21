import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import walletRoutes from './routes/wallet.routes';
import reputationRoutes from './routes/reputation.routes';
import paymentRoutes from './routes/payment.routes';
import serviceRoutes from './routes/service.routes';
import categoryRoutes from './routes/category.routes';
import analyticsRoutes from './routes/analytics.routes';
import conductorRoutes from './routes/conductor.routes';
import officialRoutes from './routes/official.routes';
import agentRoutes from './routes/agent.routes';
import transactionRoutes from './routes/transaction.routes';
import executionRoutes from './routes/execution.routes';
import prisma from 'database';

dotenv.config();

const app: Application = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/executions', executionRoutes);
app.use('/api/reputation', reputationRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/conductor', conductorRoutes);
app.use('/api/services', officialRoutes);
app.use('/api/agents', agentRoutes);

// Health check
app.get('/api/health', async (req: Request, res: Response) => {
  let dbStatus = 'UP';
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (e) {
    dbStatus = 'DOWN';
  }

  res.status(dbStatus === 'UP' ? 200 : 503).json({
    success: dbStatus === 'UP',
    status: dbStatus,
    database: dbStatus,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/market-health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Marketplace services online' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

export default app;
