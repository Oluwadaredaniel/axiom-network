import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.get('/', CategoryController.getCategories);
router.post('/seed', authenticateUser as any, CategoryController.seed);

export default router;
