import { Router } from 'express';
import { ConductorController } from '../controllers/conductor.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.post('/execute', authenticateUser as any, ConductorController.execute as any);
router.get('/status/:id', authenticateUser as any, ConductorController.getStatus as any);

export default router;
