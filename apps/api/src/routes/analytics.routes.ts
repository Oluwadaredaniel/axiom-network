import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.get('/:id', authenticateUser as any, AnalyticsController.getServiceAnalytics);

export default router;
