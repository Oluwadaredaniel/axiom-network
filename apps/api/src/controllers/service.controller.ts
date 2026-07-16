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

  static async discoverServices(req: Request, res: Response) {
    try {
      const { q, category, sort } = req.query;
      const services = await ServiceService.getAllServices({
        query: q as string,
        category: category as string,
        sort: sort as any
      });
      return sendSuccess(res, services);
    } catch (error: any) {
      return sendError(res, 'Failed to discover services');
    }
  }

  static async getServiceDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = await ServiceService.getServiceById(id);
      if (!service) return sendError(res, 'Service not found', 404);
      return sendSuccess(res, service);
    } catch (error: any) {
      return sendError(res, 'Failed to fetch service details');
    }
  }

  static async updateService(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = await ServiceService.updateService(id, req.body);
      return sendSuccess(res, service);
    } catch (error: any) {
      return sendError(res, 'Failed to update service');
    }
  }
}
