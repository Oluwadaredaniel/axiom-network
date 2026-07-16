import prisma from 'database';

export interface CapabilityManifest {
  name: string;
  version: string;
  description: string;
  category: string;
  capabilities: string[];
  price: number;
  currency: string;
  provider: string;
  endpoint: string;
}

export abstract class BaseCapability {
  abstract manifest: CapabilityManifest;

  async register() {
    console.log(`[SDK] Registering capability: ${this.manifest.name}...`);

    // Find or create a provider agent for this service
    // In a real scenario, this would be a specific agent owned by Axiom Labs
    let providerAgent = await prisma.agent.findFirst({
      where: { name: this.manifest.provider }
    });

    if (!providerAgent) {
      // Find an admin user to own these official services
      const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
      if (!admin) {
        console.error('[SDK] No admin user found to own official services. Registration failed.');
        return;
      }

      providerAgent = await prisma.agent.create({
        data: {
          name: this.manifest.provider,
          description: 'Official Axiom Capability Provider',
          ownerId: admin.id,
          reputation: { create: { score: 100 } }, // Official services start with perfect reputation
          wallet: { create: { balance: 0 } }
        }
      });
    }

    // Register or update the service in the marketplace
    await prisma.service.upsert({
      where: { id: this.manifest.name.toLowerCase().replace(/\s+/g, '-') },
      update: {
        description: this.manifest.description,
        price: this.manifest.price,
        categoryName: this.manifest.category,
        endpoint: this.manifest.endpoint,
        status: 'ACTIVE'
      },
      create: {
        id: this.manifest.name.toLowerCase().replace(/\s+/g, '-'),
        name: this.manifest.name,
        description: this.manifest.description,
        price: this.manifest.price,
        categoryName: this.manifest.category,
        endpoint: this.manifest.endpoint,
        providerId: providerAgent.id,
        status: 'ACTIVE',
        paymentRequired: true,
        analytics: { create: {} }
      }
    });

    console.log(`[SDK] Capability ${this.manifest.name} registered successfully.`);
  }

  abstract execute(capability: string, input: any): Promise<any>;
}
