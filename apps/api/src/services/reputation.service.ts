import prisma from 'database';

export class ReputationService {
  static async increaseReputation(agentId: string) {
    const reputation = await prisma.reputation.findUnique({
      where: { agentId }
    });

    if (!reputation) {
      return await prisma.reputation.create({
        data: {
          agentId,
          successfulTransactions: 1,
          score: 52 // 50 + 2
        }
      });
    }

    const newScore = Math.min(100, reputation.score + 2);

    return await prisma.reputation.update({
      where: { agentId },
      data: {
        successfulTransactions: { increment: 1 },
        score: newScore
      }
    });
  }

  static async decreaseReputation(agentId: string) {
    const reputation = await prisma.reputation.findUnique({
      where: { agentId }
    });

    if (!reputation) {
      return await prisma.reputation.create({
        data: {
          agentId,
          failedTransactions: 1,
          score: 45 // 50 - 5
        }
      });
    }

    const newScore = Math.max(0, reputation.score - 5);

    return await prisma.reputation.update({
      where: { agentId },
      data: {
        failedTransactions: { increment: 1 },
        score: newScore
      }
    });
  }

  static async getReputation(agentId: string) {
    const reputation = await prisma.reputation.findUnique({
      where: { agentId },
      include: {
        agent: {
          select: { name: true }
        }
      }
    });

    if (!reputation) {
      return {
        agent: agentId,
        score: 50,
        successfulPayments: 0,
        failedPayments: 0
      };
    }

    return {
      agent: reputation.agent.name,
      score: reputation.score,
      successfulPayments: reputation.successfulTransactions,
      failedPayments: reputation.failedTransactions
    };
  }
}
