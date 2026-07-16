import prisma from 'database';

export class AnalyticsService {
  static async getServiceAnalytics(serviceId: string) {
    return await prisma.serviceAnalytics.findUnique({
      where: { serviceId }
    });
  }

  static async recordCall(serviceId: string, success: boolean, revenue: number = 0) {
    return await prisma.serviceAnalytics.update({
      where: { serviceId },
      data: {
        totalCalls: { increment: 1 },
        successfulCalls: success ? { increment: 1 } : undefined,
        revenue: { increment: revenue }
      }
    });
  }
}
