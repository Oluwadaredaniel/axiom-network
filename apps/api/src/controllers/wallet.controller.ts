import { Request, Response } from 'express';
import { WalletService } from '../services/wallet.service';
import { TransactionService } from '../services/transaction.service';
import { sendSuccess, sendError } from '../utils/response';
import { TransactionType } from 'database';

export const getWallet = async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
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
    const { agentId, amount } = req.body;
    if (!agentId || !amount) return sendError(res, 'Missing agentId or amount', 400);

    const wallet = await WalletService.getWalletByAgentId(agentId);
    if (!wallet) return sendError(res, 'Wallet not found', 404);

    const transaction = await TransactionService.createTransaction({
      senderWalletId: wallet.id, // For topup, sender is receiver
      receiverWalletId: wallet.id,
      amount,
      type: TransactionType.TOP_UP
    });

    return sendSuccess(res, { wallet, transaction });
  } catch (error) {
    return sendError(res, 'Failed to topup wallet');
  }
};

export const transfer = async (req: Request, res: Response) => {
  try {
    const { senderWallet, receiverWallet, amount } = req.body;
    if (!senderWallet || !receiverWallet || !amount) {
      return sendError(res, 'Missing required fields', 400);
    }

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
    return sendError(res, error.message || 'Transfer failed');
  }
};
