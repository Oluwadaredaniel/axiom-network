import { CopywritingAgent } from './copywriter.service';
import { SEOAgent } from './seo.service';
import { ResearchAgent } from './research.service';
import { BrandingAgent } from './branding.service';
import { CodeReviewAgent } from './codereview.service';
import { BaseCapability } from '../capability.sdk';

export class CapabilityManager {
  private static instances: Map<string, BaseCapability> = new Map();

  static async initialize() {
    const services = [
      new CopywritingAgent(),
      new SEOAgent(),
      new ResearchAgent(),
      new BrandingAgent(),
      new CodeReviewAgent()
    ];

    for (const service of services) {
      await service.register();
      this.instances.set(service.manifest.name.toLowerCase().replace(/\s+/g, '-'), service);
    }
  }

  static getService(id: string): BaseCapability | undefined {
    return this.instances.get(id);
  }
}
