import { Response } from 'express';
import prisma from 'database';
import { ConductorService } from '../services/conductor.service';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middleware/auth.middleware';

export class ConductorController {
  static async execute(req: AuthRequest, res: Response) {
    try {
      const { goal } = req.body;
      const userId = req.user?.userId;

      if (!userId) return sendError(res, 'Unauthorized', 401);
      if (!goal) return sendError(res, 'Goal is required', 400);

      const execution = await ConductorService.executeGoal(userId, goal);

      return sendSuccess(res, {
        summary: execution.summary,
        servicesUsed: execution.steps.map(s => s.capabilityName),
        payments: execution.steps.filter(s => s.cost > 0).map(s => ({
          service: s.capabilityName,
          cost: s.cost,
          tx: s.transactionId
        })),
        cost: execution.totalCost,
        result: execution.result,
        executionId: execution.id
      });
    } catch (error: any) {
      return sendError(res, error.message || 'Execution failed');
    }
  }

  static async getStatus(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const { id } = req.params;
      if (!id) return sendError(res, 'Execution ID is required', 400);

      const execution = await prisma.execution.findFirst({
        where: { id, userId },
        select: {
          id: true,
          status: true,
          totalCost: true,
          summary: true,
          duration: true,
          createdAt: true,
          updatedAt: true,
          steps: {
            orderBy: { order: 'asc' },
            select: {
              id: true,
              capabilityName: true,
              status: true,
              cost: true,
            }
          }
        }
      });

      if (!execution) return sendError(res, 'Execution not found', 404);
      return sendSuccess(res, execution);
    } catch (error: any) {
      return sendError(res, error.message);
    }
  }
}
