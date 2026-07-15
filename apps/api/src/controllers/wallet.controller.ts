import { Request, Response } from 'express';
import { WalletService } from '../services/wallet.service';
import { sendSuccess, sendError } from '../utils/response';

export const getWallet = async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    const wallet = await WalletService.getWalletByAgentId(agentId);

    if (!wallet) return sendError(res, 'Wallet not found', 404);

    return sendSuccess(res, {
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

    const wallet = await WalletService.addCredits(agentId, amount);

    // We will later add a transaction record here

    return sendSuccess(res, wallet);
  } catch (error) {
    return sendError(res, 'Failed to topup wallet');
  }
};
