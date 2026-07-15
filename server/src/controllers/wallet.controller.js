const prisma = require('../utils/prisma');

const getBalance = async (req, res) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId: req.user.userId }
    });
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
};

const topup = async (req, res) => {
  try {
    const { amount } = req.body;
    const wallet = await prisma.wallet.update({
      where: { userId: req.user.userId },
      data: {
        balance: { increment: amount }
      }
    });

    // Log transaction
    await prisma.transaction.create({
      data: {
        amount,
        type: 'DEPOSIT',
        status: 'COMPLETED',
        senderId: req.user.userId, // Self-deposit for now
        receiverId: req.user.userId
      }
    });

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to topup' });
  }
};

const getHistory = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          { senderId: req.user.userId },
          { receiverId: req.user.userId }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

module.exports = { getBalance, topup, getHistory };
