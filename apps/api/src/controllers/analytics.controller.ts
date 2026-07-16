import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';
import { sendSuccess, sendError } from '../utils/response';

export class AnalyticsController {
  static async getServiceAnalytics(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const analytics = await AnalyticsService.getServiceAnalytics(id);
      if (!analytics) return sendError(res, 'Analytics not found', 404);
      return sendSuccess(res, analytics);
    } catch (error: any) {
      return sendError(res, 'Failed to fetch analytics');
    }
  }
}
