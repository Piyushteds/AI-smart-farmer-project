const { addRecord } = require("../services/databaseService");

function createPayment(req, res) {
  const amount = Number(req.body?.amount || 0);
  const method = req.body?.method || "upi";
  const payment = {
    paymentId: `PAY-${Date.now()}`,
    method,
    amount,
    status: method === "cod" ? "COD Pending" : "Payment Simulated",
    createdAt: new Date().toISOString()
  };
  addRecord("payments", payment);
  res.status(201).json({ ok: true, ...payment });
}

module.exports = { createPayment };
