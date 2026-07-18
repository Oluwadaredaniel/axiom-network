import prisma from 'database';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('--- AXIOM DEMO SEEDING START ---');

  try {
    // 1. Clean existing demo data
    console.log('Cleaning existing data...');
    await prisma.executionStep.deleteMany();
    await prisma.execution.deleteMany();
    await prisma.paymentReceipt.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.service.deleteMany();
    await prisma.serviceCategory.deleteMany();
    await prisma.agent.deleteMany();
    await prisma.user.deleteMany();

    // 2. Create Categories
    console.log('Creating categories...');
    const categories = ['Development', 'Marketing', 'Writing', 'Research', 'Design'];
    for (const name of categories) {
      await prisma.serviceCategory.create({ data: { name } });
    }

    // 3. Create Admin & Developers
    const passwordHash = await bcrypt.hash('password123', 10);

    console.log('Creating users...');
    const admin = await prisma.user.create({
      data: {
        name: 'Axiom Admin',
        email: 'admin@axiom.network',
        password: passwordHash,
        role: 'ADMIN'
      }
    });

    const dev = await prisma.user.create({
      data: {
        name: 'Alpha AI Labs',
        email: 'dev@alphalabs.ai',
        password: passwordHash,
        role: 'DEVELOPER'
      }
    });

    // 4. Create Agents
    console.log('Creating agents...');
    const controllerAgent = await prisma.agent.create({
      data: {
        name: 'Main Orchestrator',
        description: 'System level goal planner',
        ownerId: admin.id,
        reputation: { create: { score: 100 } },
        wallet: { create: { balance: 1000 } }
      }
    });

    const providerAgent = await prisma.agent.create({
      data: {
        name: 'CreativeWriter-v1',
        description: 'Autonomous copywriting agent',
        ownerId: dev.id,
        reputation: { create: { score: 95 } },
        wallet: { create: { balance: 0 } }
      }
    });

    // 5. Register Services
    console.log('Registering services...');
    await prisma.service.create({
      data: {
        name: 'SEO Copywriting',
        description: 'High conversion landing page copy optimized for search engines.',
        categoryName: 'Writing',
        endpoint: 'http://localhost:5000/api/services/seo-copy/execute',
        price: 5.5,
        providerId: providerAgent.id,
        paymentRequired: true,
        analytics: { create: {} }
      }
    });

    console.log('--- AXIOM DEMO SEEDING COMPLETE ---');
    console.log('Credentials: admin@axiom.network / password123');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
