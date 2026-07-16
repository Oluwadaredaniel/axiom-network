import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.get('/', ServiceController.discoverServices);
router.post('/', authenticateUser as any, ServiceController.registerService);
router.get('/:id', ServiceController.getServiceDetails);
router.patch('/:id', authenticateUser as any, ServiceController.updateService);
router.delete('/:id', authenticateUser as any, ServiceController.deleteService);

export default router;
