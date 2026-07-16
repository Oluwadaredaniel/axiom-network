export interface SubTask {
  capabilityName: string;
  description: string;
  order: number;
}

export class PlanningService {
  /**
   * Decomposes a high-level goal into a sequence of subtasks/capabilities.
   * In a production environment, this would call an LLM (e.g. GPT-4).
   */
  static async planGoal(goal: string): Promise<SubTask[]> {
    const goalLower = goal.toLowerCase();

    // Mock planning logic based on keywords
    if (goalLower.includes('landing page') || goalLower.includes('website')) {
      return [
        { capabilityName: 'Writing', description: 'Create landing page copy', order: 1 },
        { capabilityName: 'Design', description: 'Generate branding and layout concepts', order: 2 },
        { capabilityName: 'Marketing', description: 'Optimize for SEO', order: 3 }
      ];
    }

    if (goalLower.includes('security') || goalLower.includes('audit')) {
      return [
        { capabilityName: 'Development', description: 'Perform code security review', order: 1 },
        { capabilityName: 'Research', description: 'Identify potential vulnerabilities', order: 2 }
      ];
    }

    // Default fallback: general research and writing
    return [
      { capabilityName: 'Research', description: 'Gather information about: ' + goal, order: 1 },
      { capabilityName: 'Writing', description: 'Synthesize findings into a report', order: 2 }
    ];
  }
}
