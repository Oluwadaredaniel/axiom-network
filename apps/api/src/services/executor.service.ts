import { EconomicService } from './economic.service';
import prisma from 'database';

export class ExecutorService {
  /**
   * Executes a single capability by handling the x402 flow.
   */
  static async executeStep(
    payerAgentId: string,
    serviceId: string,
    input: any
  ) {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) throw new Error('Service not found');

    // 1. Check if payment is required
    if (service.paymentRequired) {
      // 2. Perform x402 Settlement
      // In real x402, we'd get a 402 error first, but here the conductor handles it pro-actively.
      const settlement = await EconomicService.processServicePayment({
        payerAgentId,
        receiverAgentId: service.providerId,
        serviceId: service.id,
        amount: service.price
      });

      const receiptId = settlement.receipt.receiptHash;

      // 3. Invoke service with receipt
      // This simulates calling the endpoint with the receipt header.
      return {
        success: true,
        output: `Result from ${service.name}: Executed with input "${JSON.stringify(input)}"`,
        cost: service.price,
        transactionId: settlement.transaction.id,
        receiptId
      };
    }

    // No payment required
    return {
      success: true,
      output: `Result from ${service.name} (Free): Executed with input "${JSON.stringify(input)}"`,
      cost: 0,
      transactionId: null,
      receiptId: null
    };
  }
}
