import prisma from 'database';

export class ServiceService {
  static async createService(data: {
    providerId: string;
    name: string;
    description: string;
    categoryName: string;
    endpoint: string;
    price: number;
    paymentRequired?: boolean;
  }) {
    return await prisma.service.create({
      data: {
        providerId: data.providerId,
        name: data.name,
        description: data.description,
        categoryName: data.categoryName,
        endpoint: data.endpoint,
        price: data.price,
        paymentRequired: data.paymentRequired ?? true,
        analytics: {
          create: {}
        }
      }
    });
  }

  static async getServiceById(id: string) {
    return await prisma.service.findUnique({
      where: { id },
      include: {
        provider: {
          include: {
            reputation: true
          }
        },
        analytics: true
      }
    });
  }

  static async getAllServices(filters: {
    query?: string;
    category?: string;
    sort?: 'rating' | 'price' | 'newest' | 'popular';
  }) {
    const where: any = {};

    if (filters.query) {
      where.OR = [
        { name: { contains: filters.query, mode: 'insensitive' } },
        { description: { contains: filters.query, mode: 'insensitive' } }
      ];
    }

    if (filters.category) {
      where.categoryName = filters.category;
    }

    let orderBy: any = { createdAt: 'desc' };
    if (filters.sort === 'rating') orderBy = { rating: 'desc' };
    if (filters.sort === 'price') orderBy = { price: 'asc' };
    if (filters.sort === 'popular') orderBy = { usageCount: 'desc' };

    return await prisma.service.findMany({
      where,
      orderBy,
      include: {
        provider: {
          include: {
            reputation: true
          }
        }
      }
    });
  }

  static async updateService(id: string, data: any) {
    return await prisma.service.update({
      where: { id },
      data
    });
  }

  static async deleteService(id: string) {
    return await prisma.service.delete({
      where: { id }
    });
  }

  static async incrementUsage(id: string) {
    return await prisma.service.update({
      where: { id },
      data: {
        usageCount: { increment: 1 }
      }
    });
  }
}
