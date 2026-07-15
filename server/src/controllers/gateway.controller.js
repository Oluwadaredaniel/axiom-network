const paymentService = require('../services/payment.service');
const prisma = require('../utils/prisma');

const callService = async (req, res) => {
  const { capabilityId } = req.params;
  const receipt = req.headers['x-axiom-receipt'];

  try {
    const capability = await prisma.capability.findUnique({
      where: { id: capabilityId }
    });

    if (!capability) {
      return res.status(404).json({ error: 'Capability not found' });
    }

    if (!receipt) {
      // Step 1: Challenge
      return res.status(402).json({
        error: 'Payment Required',
        price: capability.pricePerCall,
        capabilityId: capability.id,
        message: `This service requires a payment of ${capability.pricePerCall} credits.`
      });
    }

    // Step 2: Verification
    const decoded = paymentService.verifyReceipt(receipt);
    if (!decoded || decoded.capabilityId !== capabilityId) {
      return res.status(403).json({ error: 'Invalid or expired payment receipt' });
    }

    // Step 3: Execution (Mocked response for now)
    // In a real scenario, this would call the actual provider endpointUrl
    const mockResults = {
      'seo-agent': 'SEO Analysis: Keywords optimized. Visibility score: 85/100.',
      'copywriter': 'Generated Copy: Axiom is the future of AI economics.',
      'researcher': 'Research Summary: The AI agent market is expected to grow by 40% CAGR.'
    };

    const result = mockResults[capability.slug] || `Execution successful for ${capability.name}.`;

    // Log the call
    // If there's a jobId (from orchestrator), we log it
    const jobId = req.query.jobId;
    if (jobId) {
      await prisma.callLog.create({
        data: {
          jobId,
          capabilityId,
          requestData: req.body,
          responseData: { result },
          cost: capability.pricePerCall
        }
      });
    }

    res.json({
      success: true,
      data: result,
      transactionId: decoded.transactionId
    });

  } catch (error) {
    console.error('Gateway Error:', error);
    res.status(500).json({ error: 'Internal gateway error' });
  }
};

/**
 * Endpoint for the agent to request a receipt (after getting a 402)
 */
const requestReceipt = async (req, res) => {
  const { capabilityId } = req.body;
  const userId = req.user.userId;

  try {
    const { receipt, transaction } = await paymentService.generateReceipt(userId, capabilityId);
    res.json({ receipt, transaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { callService, requestReceipt };
