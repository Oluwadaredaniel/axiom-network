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
}
