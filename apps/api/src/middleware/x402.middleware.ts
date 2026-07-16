import { Request, Response, NextFunction } from 'express';
import prisma from 'database';
import { sendError } from '../utils/response';
import { PaymentVerificationService } from '../services/paymentVerification.service';
import { PaymentChallengeService } from '../services/paymentChallenge.service';

export const x402Middleware = async (req: Request, res: Response, next: NextFunction) => {
  const { serviceId } = req.params;

  if (!serviceId) {
      return next();
  }

  try {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { provider: { include: { wallet: true } } }
    });

    if (!service || !service.paymentRequired) {
      return next();
    }

    const receiptId = req.headers['x-axiom-payment-receipt'] as string;

    if (!receiptId) {
      // Step 2: Return 402 challenge
      const challenge = await PaymentChallengeService.createChallenge(serviceId);
      return res.status(402).json({
        success: false,
        error: 'Payment Required',
        payment: {
          challengeId: challenge.id,
          amount: challenge.amount,
          currency: challenge.currency,
          recipientWallet: challenge.recipientWallet,
          serviceId: challenge.serviceId,
          expiresAt: challenge.expiresAt
        }
      });
    }

    // Step 7: Verify receipt
    const verification = await PaymentVerificationService.verifyPayment(receiptId, serviceId, service.price);

    if (!verification.verified) {
      return res.status(402).json({
          success: false,
          error: 'Payment Verification Failed',
          reason: verification.reason
      });
    }

    next();
  } catch (error: any) {
    console.error('x402 Middleware Error:', error);
    return sendError(res, 'Internal payment processing error');
  }
};
