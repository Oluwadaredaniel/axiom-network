const express = require('express');
const router = express.Router();
const gatewayController = require('../controllers/gateway.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public-ish entry point for the service (called by agents)
router.post('/call/:capabilityId', gatewayController.callService);

// Protected endpoint for an agent to "buy" a receipt
router.post('/pay', authMiddleware, gatewayController.requestReceipt);

module.exports = router;
