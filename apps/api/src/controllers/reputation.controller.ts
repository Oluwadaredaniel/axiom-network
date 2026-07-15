import { Request, Response } from 'express';
import { ReputationService } from '../services/reputation.service';
import { sendSuccess, sendError } from '../utils/response';

export const getReputation = async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    const reputation = await ReputationService.getReputation(agentId);
    return sendSuccess(res, reputation);
  } catch (error) {
    return sendError(res, 'Failed to fetch reputation');
  }
};
