const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplace.controller');

// Discovery
router.get('/services', marketplaceController.getAllCapabilities);
router.get('/services/:slug', marketplaceController.getCapabilityBySlug);

// Registration (Should eventually be protected)
router.post('/register', marketplaceController.registerCapability);

module.exports = router;
