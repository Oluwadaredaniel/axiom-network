import { Router } from 'express';
import { getProfile } from '../controllers/user.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.get('/profile', authenticateUser as any, getProfile as any);

export default router;
