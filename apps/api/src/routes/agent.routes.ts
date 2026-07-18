import { Router } from 'express';
import { AgentController } from '../controllers/agent.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticateUser as any, AgentController.createAgent as any);
router.get('/my', authenticateUser as any, AgentController.getMyAgents as any);

export default router;
