import { Router } from 'express';
import { getReputation } from '../controllers/reputation.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.get('/:agentId', authenticateUser as any, getReputation as any);

export default router;
