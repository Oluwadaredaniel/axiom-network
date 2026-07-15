import prisma from 'database';
import crypto from 'crypto';

export class ReceiptService {
  static async createReceipt(data: {
    transactionId: string;
    serviceId?: string;
    payerId: string;
    receiverId: string;
    amount: number;
  }) {
    const receiptHash = `AXM_TX_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    return await prisma.paymentReceipt.create({
      data: {
        transactionId: data.transactionId,
        serviceId: data.serviceId,
        payer: data.payerId,
        receiver: data.receiverId,
        amount: data.amount,
        receiptHash: receiptHash
      }
    });
  }

  static async getReceiptByTransactionId(transactionId: string) {
    return await prisma.paymentReceipt.findUnique({
      where: { transactionId }
    });
  }
}
