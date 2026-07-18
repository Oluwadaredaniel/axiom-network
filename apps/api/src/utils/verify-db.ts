import prisma from 'database';

async function verify() {
  console.log('--- AXIOM DB VERIFICATION ---');
  try {
    // 1. Test Connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Connection successful.');

    // 2. Count Users
    const userCount = await prisma.user.count();
    console.log(`📊 Total Users: ${userCount}`);

    // 3. Count Agents
    const agentCount = await prisma.agent.count();
    console.log(`📊 Total Agents: ${agentCount}`);

    console.log('--- VERIFICATION COMPLETE ---');
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
