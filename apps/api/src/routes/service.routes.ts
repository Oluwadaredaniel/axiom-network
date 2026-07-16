import { Router } from 'express';
import { x402Middleware } from '../middleware/x402.middleware';
import { sendSuccess } from '../utils/response';

const router = Router();

router.post('/:serviceId/execute', x402Middleware as any, (req, res) => {
  return sendSuccess(res, {
      message: 'Service executed successfully',
      result: 'Capability output for ' + req.params.serviceId
  });
});

export default router;
