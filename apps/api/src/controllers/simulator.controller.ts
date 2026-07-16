import { Request, Response } from 'express';
import { PaymentSimulatorService } from '../services/paymentSimulator.service';
import { sendSuccess, sendError } from '../utils/response';

export const runSimulation = async (req: Request, res: Response) => {
  try {
    const { payerAgentId, serviceId } = req.body;
    const result = await PaymentSimulatorService.simulateAgentFlow(payerAgentId, serviceId);
    return sendSuccess(res, result);
  } catch (error: any) {
    return sendError(res, error.message);
  }
};
