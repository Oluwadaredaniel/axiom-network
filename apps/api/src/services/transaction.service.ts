import prisma from 'database';
import { TransactionType, TransactionStatus } from 'database';

export class TransactionService {
  static async createTransaction(data: {
    senderWalletId: string;
    receiverWalletId: string;
    amount: number;
    type: TransactionType;
  }) {
    return await prisma.$transaction(async (tx) => {
      // 1. Verify sender balance if it's not a top-up
      if (data.type !== TransactionType.TOP_UP) {
        const senderWallet = await tx.wallet.findUnique({
          where: { id: data.senderWalletId }
        });

        if (!senderWallet || senderWallet.balance < data.amount) {
          throw new Error('Insufficient balance');
        }

        // 2. Deduct from sender
        await tx.wallet.update({
          where: { id: data.senderWalletId },
          data: { balance: { decrement: data.amount } }
        });
      }

      // 3. Add to receiver
      await tx.wallet.update({
        where: { id: data.receiverWalletId },
        data: { balance: { increment: data.amount } }
      });

      // 4. Record transaction
      return await tx.transaction.create({
        data: {
          senderWalletId: data.senderWalletId,
          receiverWalletId: data.receiverWalletId,
          amount: data.amount,
          type: data.type,
          status: TransactionStatus.SUCCESS, // Immediate success for simulated MVP
        }
      });
    });
  }

  static async getHistory(walletId: string) {
    return await prisma.transaction.findMany({
      where: {
        OR: [
          { senderWalletId: walletId },
          { receiverWalletId: walletId }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
