import prisma from 'database';

export class PaymentChallengeService {
  static async createChallenge(serviceId: string) {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { provider: { include: { wallet: true } } }
    });

    if (!service) {
      throw new Error('Service not found');
    }

    if (!service.provider.wallet) {
      throw new Error('Service provider has no wallet');
    }

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // Challenge expires in 15 mins

    return await prisma.paymentChallenge.create({
      data: {
        serviceId: service.id,
        amount: service.price,
        currency: 'AXC',
        recipientWallet: service.provider.wallet.id,
        status: 'PENDING',
        expiresAt
      }
    });
  }

  static async getChallenge(challengeId: string) {
    return await prisma.paymentChallenge.findUnique({
      where: { id: challengeId }
    });
  }
}
