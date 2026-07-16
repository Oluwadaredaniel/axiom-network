import prisma from 'database';
import { PlanningService } from './planning.service';
import { SelectionService } from './selection.service';
import { ExecutorService } from './executor.service';
import { ServiceService } from './service.service';

export class ConductorService {
  /**
   * Main orchestration loop.
   */
  static async executeGoal(userId: string, goal: string) {
    const startTime = Date.now();

    // 1. Plan the goal
    const plan = await PlanningService.planGoal(goal);

    // 2. Create Execution record
    const execution = await prisma.execution.create({
      data: {
        goal,
        userId,
        status: 'RUNNING'
      }
    });

    const results: any[] = [];
    let totalCost = 0;

    try {
      // 3. Sequential Execution (MVP simplified loop)
      for (const task of plan) {
        // 3a. Discovery & Selection
        const selectedProvider = await SelectionService.selectBestProvider(task.capabilityName);

        if (!selectedProvider) {
          // Failure recovery: Skip if no provider found, or mark as failed
          await prisma.executionStep.create({
            data: {
              executionId: execution.id,
              capabilityName: task.capabilityName,
              status: 'FAILED',
              error: 'No suitable provider found in marketplace',
              order: task.order
            }
          });
          continue;
        }

        // 3b. Execution (includes payment)
        // For MVP, we use the first agent owned by the user as the payer
        const userAgents = await prisma.agent.findMany({ where: { ownerId: userId } });
        if (userAgents.length === 0) throw new Error('User has no agents to perform payments');

        const payerAgentId = userAgents[0].id;

        const stepResult = await ExecutorService.executeStep(
          payerAgentId,
          selectedProvider.id,
          { task: task.description, previousResults: results }
        );

        // 3c. Record Step
        await prisma.executionStep.create({
          data: {
            executionId: execution.id,
            capabilityName: task.capabilityName,
            serviceId: selectedProvider.id,
            providerAgentId: selectedProvider.providerId,
            status: 'COMPLETED',
            cost: stepResult.cost,
            output: stepResult.output as any,
            transactionId: stepResult.transactionId,
            order: task.order
          }
        });

        // Update usage analytics
        await ServiceService.incrementUsage(selectedProvider.id);

        results.push(stepResult.output);
        totalCost += stepResult.cost;
      }

      const duration = Date.now() - startTime;

      // 4. Result Aggregation
      const summary = `Successfully completed goal "${goal}" using ${results.length} capabilities. Total cost: ${totalCost} AXC.`;

      const finalExecution = await prisma.execution.update({
        where: { id: execution.id },
        data: {
          status: 'COMPLETED',
          totalCost,
          summary,
          result: results as any,
          duration
        },
        include: {
          steps: true
        }
      });

      return finalExecution;

    } catch (error: any) {
      console.error('Orchestration Failure:', error);
      await prisma.execution.update({
        where: { id: execution.id },
        data: {
          status: 'FAILED',
          summary: 'Execution failed: ' + error.message
        }
      });
      throw error;
    }
  }
}
