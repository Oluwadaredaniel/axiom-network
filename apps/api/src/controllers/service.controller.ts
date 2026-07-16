import { Request, Response } from 'express';
import { ServiceService } from '../services/service.service';
import { sendSuccess, sendError } from '../utils/response';

export class ServiceController {
  static async registerService(req: Request, res: Response) {
    try {
      const { name, description, categoryName, endpoint, price, paymentRequired, providerId } = req.body;

      // Basic check: in a real app we'd verify the user is the owner of the provider agent
      const service = await ServiceService.createService({
        providerId,
        name,
        description,
        categoryName,
        endpoint,
        price,
        paymentRequired
      });

      return sendSuccess(res, service, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to register service');
    }
  }
}
