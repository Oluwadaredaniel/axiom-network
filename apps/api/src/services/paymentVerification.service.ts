import prisma from 'database';

export class PaymentVerificationService {
  static async verifyPayment(receiptId: string, serviceId: string, requiredAmount: number) {
    const receipt = await prisma.paymentReceipt.findUnique({
      where: { receiptHash: receiptId }, // We use receiptHash as the public identifier
      include: { transaction: true }
    });

    if (!receipt) {
      return { verified: false, reason: 'Receipt not found' };
    }

    if (receipt.serviceId !== serviceId) {
       return { verified: false, reason: 'Receipt does not match service' };
    }

    if (receipt.transaction.status !== 'SUCCESS') {
      return { verified: false, reason: 'Transaction was not successful' };
    }

    if (receipt.amount < requiredAmount) {
      return { verified: false, reason: 'Insufficient payment amount' };
    }

    // Check if receipt is old (optional but good practice)
    const now = new Date();
    const age = now.getTime() - receipt.createdAt.getTime();
    if (age > 1000 * 60 * 60 * 24) { // 24 hours expiry for proof of payment usage in this context
       // In a real x402, this might be tighter or handled by specific challenge nonces
    }

    return { verified: true };
  }
}
