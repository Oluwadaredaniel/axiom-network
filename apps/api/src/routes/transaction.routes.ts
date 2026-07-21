import { Router } from 'express';
import { getTransactions } from '../controllers/transaction.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.get('/:agentId', authenticateUser as any, getTransactions as any);

export default router;
