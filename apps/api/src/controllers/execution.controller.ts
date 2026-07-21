import { Response } from 'express';
import prisma from 'database';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middleware/auth.middleware';

export class ExecutionController {
  static async list(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const executions = await prisma.execution.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: {
          steps: {
            select: {
              id: true,
              capabilityName: true,
              status: true,
              cost: true,
              transactionId: true,
            }
          }
        }
      });

      return sendSuccess(res, executions);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch executions');
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const { id } = req.params;
      const execution = await prisma.execution.findFirst({
        where: { id, userId },
        include: {
          steps: {
            orderBy: { order: 'asc' }
          }
        }
      });

      if (!execution) return sendError(res, 'Execution not found', 404);
      return sendSuccess(res, execution);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch execution');
    }
  }
}
