// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  const { amount, to } = req.body;

  try {
    await session.withTransaction(async () => {
      const account = await Account.findOne({ userId: req.userId }).session(session);
      if (!account || account.balance < amount) {
        throw new Error("Insufficient balance");
      }

      const toAccount = await Account.findOne({ userId: to }).session(session);
      if (!toAccount) {
        throw new Error("Invalid account");
      }

      // Perform the balance updates
      await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
      await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    });

    res.json({ message: "Transfer successful" });
  } catch (err) {
    // Will trigger automatic rollback
    console.error("❌ Transaction Error:", err);
    res.status(400).json({ message: err.message || "Transaction failed" });
  } finally {
    await session.endSession();
  }
});

module.exports = router;