const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

const RECEIPT_SECRET = process.env.RECEIPT_SECRET || 'axiom_receipt_secret_456';

class PaymentService {
  /**
   * Generates a signed payment receipt after deducting credits.
   */
  async generateReceipt(userId, capabilityId) {
    const capability = await prisma.capability.findUnique({
      where: { id: capabilityId }
    });

    if (!capability) throw new Error('Capability not found');

    const wallet = await prisma.wallet.findUnique({
      where: { userId }
    });

    if (wallet.balance < capability.pricePerCall) {
      throw new Error('Insufficient balance');
    }

    // atomic transaction: deduct balance and create transaction log
    return await prisma.$transaction(async (tx) => {
      await tx.wallet.update({
        where: { userId },
        data: { balance: { decrement: capability.pricePerCall } }
      });

      const transaction = await tx.transaction.create({
        data: {
          amount: capability.pricePerCall,
          type: 'PAYMENT',
          status: 'COMPLETED',
          senderId: userId,
          receiverId: capability.providerId,
          capabilityId: capability.id
        }
      });

      // Generate a signed receipt (JWT) that the provider can verify
      const receipt = jwt.sign(
        {
          transactionId: transaction.id,
          userId,
          capabilityId,
          amount: capability.pricePerCall,
          timestamp: Date.now()
        },
        RECEIPT_SECRET,
        { expiresIn: '10m' }
      );

      return { receipt, transaction };
    });
  }

  /**
   * Verifies a payment receipt (used by provider agents).
   */
  verifyReceipt(receipt) {
    try {
      return jwt.verify(receipt, RECEIPT_SECRET);
    } catch (error) {
      return null;
    }
  }
}

module.exports = new PaymentService();
