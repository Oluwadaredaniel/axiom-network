import prisma from 'database';

export class CategoryService {
  static async getAllCategories() {
    return await prisma.serviceCategory.findMany({
      include: {
        _count: {
          select: { services: true }
        }
      },
      orderBy: { name: 'asc' }
    });
  }

  static async seedCategories() {
    const categories = [
      'Development',
      'Marketing',
      'Design',
      'Research',
      'Writing',
      'Data',
      'Productivity'
    ];

    for (const name of categories) {
      await prisma.serviceCategory.upsert({
        where: { name },
        update: {},
        create: { name }
      });
    }
  }
}
