import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from 'database';
import { sendSuccess, sendError } from '../utils/response';
import { z } from 'zod';
import { WalletService } from '../services/wallet.service';

const createAgentSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
});

export class AgentController {
  static async createAgent(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const validatedData = createAgentSchema.parse(req.body);

      const agent = await prisma.$transaction(async (tx) => {
        const newAgent = await tx.agent.create({
          data: {
            ...validatedData,
            ownerId: userId,
            reputation: { create: { score: 50 } } // Starting reputation
          },
        });

        // Initialize wallet for the agent
        await tx.wallet.create({
          data: {
            agentId: newAgent.id,
            balance: 100, // Starting balance for demo purposes
            currency: 'AXC',
          }
        });

        return newAgent;
      });

      return sendSuccess(res, agent, 201);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return sendError(res, error.errors[0].message, 400);
      }
      console.error('Create Agent Error:', error);
      return sendError(res, 'Failed to create agent');
    }
  }

  static async getMyAgents(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const agents = await prisma.agent.findMany({
        where: { ownerId: userId },
        include: {
          wallet: true,
          reputation: true
        }
      });

      return sendSuccess(res, agents);
    } catch (error) {
      return sendError(res, 'Failed to fetch agents');
    }
  }
}
