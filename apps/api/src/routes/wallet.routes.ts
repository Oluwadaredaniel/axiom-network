import { Router } from 'express';
import { getWallet, topup } from '../controllers/wallet.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.get('/:agentId', authenticateUser as any, getWallet as any);
router.post('/topup', authenticateUser as any, topup as any);

export default router;
