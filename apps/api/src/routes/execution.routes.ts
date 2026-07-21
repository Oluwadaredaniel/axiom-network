import { Router } from 'express';
import { ExecutionController } from '../controllers/execution.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateUser as any, ExecutionController.list as any);
router.get('/:id', authenticateUser as any, ExecutionController.getById as any);

export default router;
