import prisma from 'database';

export class SelectionService {
  /**
   * Ranks providers for a given capability category and returns the best one.
   */
  static async selectBestProvider(categoryName: string) {
    const services = await prisma.service.findMany({
      where: {
        categoryName,
        status: 'ACTIVE'
      },
      include: {
        provider: {
          include: {
            reputation: true
          }
        }
      }
    });

    if (services.length === 0) {
      return null;
    }

    // Ranking algorithm: Score = Reputation / (Price + 1)
    // High reputation and low price are preferred.
    const rankedServices = services.sort((a, b) => {
      const scoreA = (a.provider.reputation?.score || 50) / (a.price + 1);
      const scoreB = (b.provider.reputation?.score || 50) / (b.price + 1);
      return scoreB - scoreA;
    });

    return rankedServices[0];
  }
}
