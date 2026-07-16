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

    if (receipt.used) {
      return { verified: false, reason: 'Receipt already used' };
    }

    // Mark receipt as used to prevent replay attacks
    await prisma.paymentReceipt.update({
      where: { id: receipt.id },
      data: { used: true }
    });

    return { verified: true };
  }
}
