import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import walletRoutes from './routes/wallet.routes';
import reputationRoutes from './routes/reputation.routes';
import paymentRoutes from './routes/payment.routes';
import serviceRoutes from './routes/service.routes';

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
// Placeholder for other routes
app.use('/api/agents', (req, res) => res.json({ message: 'Agents API placeholder' }));
app.use('/api/services', (req, res) => res.json({ message: 'Services API placeholder' }));
app.use('/api/transactions', (req, res) => res.json({ message: 'Transactions API placeholder' }));

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Axiom backend running' });
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
