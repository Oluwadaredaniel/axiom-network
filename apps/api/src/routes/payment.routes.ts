import { Router } from 'express';
import { createChallenge, settlePayment, verifyPayment, getPaymentStatus } from '../controllers/payment.controller';
import { runSimulation } from '../controllers/simulator.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.post('/challenge', authenticateUser as any, createChallenge);
router.post('/settle', authenticateUser as any, settlePayment);
router.post('/verify', authenticateUser as any, verifyPayment);
router.post('/simulate', authenticateUser as any, runSimulation);
router.get('/:id', authenticateUser as any, getPaymentStatus);

export default router;
