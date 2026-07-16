import { Router } from 'express';
import { x402Middleware } from '../middleware/x402.middleware';
import { CapabilityManager } from '../services/capabilities/manager';
import { sendSuccess, sendError } from '../utils/response';

const router = Router();

router.post('/:serviceId/execute', x402Middleware as any, async (req, res) => {
  const { serviceId } = req.params;
  const { capability, input } = req.body;

  try {
    const service = CapabilityManager.getService(serviceId);
    if (!service) return sendError(res, 'Official service not found', 404);

    const result = await service.execute(capability, input || {});

    return sendSuccess(res, {
      service: service.manifest.name,
      capability,
      result
    });
  } catch (error: any) {
    return sendError(res, error.message || 'Execution failed');
  }
});

export default router;
