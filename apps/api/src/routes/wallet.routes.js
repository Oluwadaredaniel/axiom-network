const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/balance', walletController.getBalance);
router.post('/topup', walletController.topup);
router.get('/history', walletController.getHistory);

module.exports = router;
