import { Request, Response } from 'express';
import { PaymentChallengeService } from '../services/paymentChallenge.service';
import { PaymentVerificationService } from '../services/paymentVerification.service';
import { EconomicService } from '../services/economic.service';
import { sendSuccess, sendError } from '../utils/response';

export const createChallenge = async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.body;
    const challenge = await PaymentChallengeService.createChallenge(serviceId);
    return sendSuccess(res, challenge);
  } catch (error: any) {
    return sendError(res, error.message);
  }
};

export const settlePayment = async (req: Request, res: Response) => {
  try {
    const { payerAgentId, receiverAgentId, serviceId, amount } = req.body;
    const result = await EconomicService.processServicePayment({
      payerAgentId,
      receiverAgentId,
      serviceId,
      amount
    });
    return sendSuccess(res, result);
  } catch (error: any) {
    return sendError(res, error.message);
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { receiptId, serviceId, amount } = req.body;
    const result = await PaymentVerificationService.verifyPayment(receiptId, serviceId, amount);
    return sendSuccess(res, result);
  } catch (error: any) {
    return sendError(res, error.message);
  }
};

export const getPaymentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const challenge = await PaymentChallengeService.getChallenge(id);
    if (!challenge) return sendError(res, 'Challenge not found', 404);
    return sendSuccess(res, challenge);
  } catch (error: any) {
    return sendError(res, error.message);
  }
};
