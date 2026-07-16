import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
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

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/reputation', reputationRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/conductor', conductorRoutes);
app.use('/api/services', officialRoutes);
// Placeholder for other routes
app.use('/api/agents', (req, res) => res.json({ message: 'Agents API placeholder' }));
app.use('/api/services', (req, res) => res.json({ message: 'Services API placeholder' }));
app.use('/api/transactions', (req, res) => res.json({ message: 'Transactions API placeholder' }));

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Axiom backend running' });
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
