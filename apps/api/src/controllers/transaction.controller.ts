import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';
import { WalletService } from '../services/wallet.service';
import { sendSuccess, sendError } from '../utils/response';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    if (!agentId) return sendError(res, 'Agent ID is required', 400);

    const wallet = await WalletService.getWalletByAgentId(agentId);
    if (!wallet) return sendError(res, 'Wallet not found', 404);

    const transactions = await TransactionService.getHistory(wallet.id);
    return sendSuccess(res, transactions);
  } catch (error) {
    return sendError(res, 'Failed to fetch transactions');
  }
};
