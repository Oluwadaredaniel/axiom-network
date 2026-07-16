import prisma from 'database';
import bcrypt from 'bcryptjs';

async function seedDemoData() {
  console.log('--- AXIOM DEMO SEEDING ---');

  // 1. Reset Database
  console.log('Cleaning existing data...');
  await prisma.execution.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.receipt.deleteMany();
  await prisma.service.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Demo User
  console.log('Creating Demo User...');
  const passwordHash = await bcrypt.hash('axiom-demo-2024', 10);
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@axiom.network',
      name: 'Axiom Demo User',
      password: passwordHash,
      role: 'USER',
    }
  });

  const userAgent = await prisma.agent.create({
    data: {
      name: 'Demo Controller Agent',
      ownerId: demoUser.id,
      wallet: { create: { balance: 5000 } }, // Start with 5000 AXC
      reputation: { create: { score: 100 } }
    }
  });

  // 3. Create Providers
  const providers = [
    { name: 'BrandForge AI', score: 96, price: 5, category: 'Design', desc: 'Premium branding and visual identity.' },
    { name: 'CopyMaster AI', score: 92, price: 5, category: 'Writing', desc: 'High-conversion copywriting services.' },
    { name: 'SEO Genius AI', score: 98, price: 6, category: 'Marketing', desc: 'Autonomous SEO and keyword optimization.' },
    { name: 'CodeGuardian AI', score: 99, price: 10, category: 'Development', desc: 'Secure code auditing and refactoring.' }
  ];

  for (const p of providers) {
    console.log(`Seeding Provider: ${p.name}`);
    const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } }) || demoUser;

    const providerAgent = await prisma.agent.create({
      data: {
        name: p.name,
        description: p.desc,
        ownerId: admin.id,
        wallet: { create: { balance: 0 } },
        reputation: { create: { score: p.score } }
      }
    });

    await prisma.service.create({
      data: {
        id: p.name.toLowerCase().replace(/\s+/g, '-'),
        name: p.name,
        description: p.desc,
        price: p.price,
        categoryName: p.category,
        endpoint: `/api/services/${p.name.toLowerCase().replace(/\s+/g, '-')}/execute`,
        providerId: providerAgent.id,
        status: 'ACTIVE',
        paymentRequired: true,
        analytics: { create: {} }
      }
    });
  }

  console.log('--- SEEDING COMPLETE ---');
}

seedDemoData()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
