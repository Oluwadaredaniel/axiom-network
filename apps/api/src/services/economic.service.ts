import { TransactionService } from './transaction.service';
import { ReceiptService } from './receipt.service';
import { ReputationService } from './reputation.service';
import { WalletService } from './wallet.service';
import { TransactionType } from 'database';

export class EconomicService {
  /**
   * Simulates a full payment flow between two agents for a service.
   */
  static async processServicePayment(data: {
    payerAgentId: string;
    receiverAgentId: string;
    serviceId: string;
    amount: number;
  }) {
    // 1. Get wallets
    const payerWallet = await WalletService.getWalletByAgentId(data.payerAgentId);
    const receiverWallet = await WalletService.getWalletByAgentId(data.receiverAgentId);

    if (!payerWallet || !receiverWallet) {
      throw new Error('One or both agents do not have a wallet');
    }

    // 2. Process transaction (Check balance, deduct, add)
    // TransactionService.createTransaction is already atomic
    const transaction = await TransactionService.createTransaction({
      senderWalletId: payerWallet.id,
      receiverWalletId: receiverWallet.id,
      amount: data.amount,
      type: TransactionType.SERVICE_PAYMENT
    });

    // 3. Create Receipt
    const receipt = await ReceiptService.createReceipt({
      transactionId: transaction.id,
      serviceId: data.serviceId,
      payerId: data.payerAgentId,
      receiverId: data.receiverAgentId,
      amount: data.amount
    });

    // 4. Update Reputation
    // Increase for both since it's a successful transaction
    await ReputationService.increaseReputation(data.payerAgentId);
    await ReputationService.increaseReputation(data.receiverAgentId);

    return {
      success: true,
      transaction,
      receipt,
      message: 'Payment processed successfully'
    };
  }
}
