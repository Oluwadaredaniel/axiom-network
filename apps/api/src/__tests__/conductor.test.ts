import { ConductorService } from '../services/conductor.service';
import { PlanningService } from '../services/planning.service';
import { SelectionService } from '../services/selection.service';

describe('Axiom Conductor (Orchestration)', () => {
  it('should define core orchestration services', () => {
    expect(ConductorService).toBeDefined();
    expect(PlanningService).toBeDefined();
    expect(SelectionService).toBeDefined();
  });

  describe('Planning Logic', () => {
    it('should decompose a landing page goal into correct subtasks', async () => {
      const plan = await PlanningService.planGoal('Create a landing page for my startup');
      expect(plan.length).toBe(3);
      expect(plan[0].capabilityName).toBe('Writing');
      expect(plan[1].capabilityName).toBe('Design');
      expect(plan[2].capabilityName).toBe('Marketing');
    });

    it('should decompose a security goal correctly', async () => {
        const plan = await PlanningService.planGoal('Audit my code security');
        expect(plan.length).toBe(2);
        expect(plan[0].capabilityName).toBe('Development');
    });
  });
});
