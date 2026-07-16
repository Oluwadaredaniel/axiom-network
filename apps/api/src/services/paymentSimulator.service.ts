import prisma from 'database';
import { EconomicService } from './economic.service';

export class PaymentSimulatorService {
  static async simulateAgentFlow(payerAgentId: string, serviceId: string) {
    const logs: string[] = [];
    logs.push(`[Agent] Initiating request for service: ${serviceId}`);

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) throw new Error('Service not found');

    if (service.paymentRequired) {
      logs.push(`[Service] 402 Payment Required challenge issued.`);
      logs.push(`[Agent] Challenge received. Price: ${service.price} AXC`);

      logs.push(`[Economic Engine] Settling payment...`);
      const settlement = await EconomicService.processServicePayment({
        payerAgentId,
        receiverAgentId: service.providerId,
        serviceId: service.id,
        amount: service.price
      });

      const receiptId = settlement.receipt.receiptHash;
      logs.push(`[Agent] Payment successful. Receipt obtained: ${receiptId}`);

      logs.push(`[Agent] Retrying request with X-Axiom-Payment-Receipt: ${receiptId}`);

      logs.push(`[Service] Receipt ${receiptId} verified via PaymentVerificationService.`);
      logs.push(`[Service] Execution successful. Result: Capability output for ${service.name}`);

      return {
        success: true,
        receiptId,
        logs
      };
    } else {
      logs.push(`[Service] No payment required. Executing...`);
      return {
        success: true,
        logs
      };
    }
  }
}
