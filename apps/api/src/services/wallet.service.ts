import prisma from 'database';

export class WalletService {
  static async createWallet(agentId: string) {
    return await prisma.wallet.create({
      data: {
        agentId,
        balance: 0,
        currency: 'AXC',
      },
    });
  }

  static async getWalletByAgentId(agentId: string) {
    return await prisma.wallet.findUnique({
      where: { agentId },
      include: {
        agent: {
          select: { name: true }
        }
      }
    });
  }

  static async checkBalance(agentId: string) {
    const wallet = await this.getWalletByAgentId(agentId);
    return wallet?.balance || 0;
  }

  static async addCredits(agentId: string, amount: number) {
    const wallet = await prisma.wallet.update({
      where: { agentId },
      data: {
        balance: { increment: amount }
      }
    });
    return wallet;
  }

  static async deductCredits(agentId: string, amount: number) {
    const balance = await this.checkBalance(agentId);
    if (balance < amount) {
      throw new Error('Insufficient balance');
    }

    const wallet = await prisma.wallet.update({
      where: { agentId },
      data: {
        balance: { decrement: amount }
      }
    });
    return wallet;
  }
}
