import { Request, Response } from 'express';
import { z } from 'zod';
import { WalletService } from '../services/wallet.service';
import { TransactionService } from '../services/transaction.service';
import { sendSuccess, sendError } from '../utils/response';
import { TransactionType } from 'database';

const topupSchema = z.object({
  agentId: z.string().uuid(),
  amount: z.number().positive(),
});

const transferSchema = z.object({
  senderWallet: z.string().uuid(),
  receiverWallet: z.string().uuid(),
  amount: z.number().positive(),
});

export const getWallet = async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    if (!agentId) return sendError(res, 'Agent ID is required', 400);

    const wallet = await WalletService.getWalletByAgentId(agentId);

    if (!wallet) return sendError(res, 'Wallet not found', 404);

    return sendSuccess(res, {
      id: wallet.id,
      agent: wallet.agent.name,
      balance: wallet.balance,
      currency: wallet.currency
    });
  } catch (error) {
    return sendError(res, 'Failed to fetch wallet');
  }
};

export const topup = async (req: Request, res: Response) => {
  try {
    const validatedData = topupSchema.parse(req.body);
    const { agentId, amount } = validatedData;

    const wallet = await WalletService.getWalletByAgentId(agentId);
    if (!wallet) return sendError(res, 'Wallet not found', 404);

    const transaction = await TransactionService.createTransaction({
      senderWalletId: wallet.id, // For topup, sender is receiver
      receiverWalletId: wallet.id,
      amount,
      type: TransactionType.TOP_UP
    });

    return sendSuccess(res, { wallet, transaction });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendError(res, error.errors[0].message, 400);
    }
    return sendError(res, 'Failed to topup wallet');
  }
};

export const transfer = async (req: Request, res: Response) => {
  try {
    const validatedData = transferSchema.parse(req.body);
    const { senderWallet, receiverWallet, amount } = validatedData;

    const transaction = await TransactionService.createTransaction({
      senderWalletId: senderWallet,
      receiverWalletId: receiverWallet,
      amount,
      type: TransactionType.SERVICE_PAYMENT
    });

    return sendSuccess(res, {
      success: true,
      transactionId: transaction.id
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendError(res, error.errors[0].message, 400);
    }
    return sendError(res, error.message || 'Transfer failed');
  }
};
