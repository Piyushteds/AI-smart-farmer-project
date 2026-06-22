const express = require("express");
const { login, roles } = require("../controllers/authController");
const { summary } = require("../controllers/dashboardController");
const { listProducts, createOrder } = require("../controllers/marketController");
const { listEquipment, createBooking, createBill } = require("../controllers/equipmentController");
const { alerts } = require("../controllers/weatherController");
const { createPayment } = require("../controllers/paymentController");
const { createChatController } = require("../controllers/chatController");
const { overview, changeUserStatus } = require("../controllers/adminController");

function requireAdmin(req, res, next) {
  const role = String(req.headers["x-smart-role"] || "").toLowerCase();
  if (role !== "admin") return res.status(403).json({ ok: false, error: "Admin access required" });
  next();
}

function createApiRouter(config) {
  const router = express.Router();

  router.get("/health", (req, res) => {
    res.json({ ok: true, backend: "Node.js + Express.js", structure: "routes/controllers/services", port: config.port, aiConfigured: Boolean(config.openaiApiKey) });
  });

  router.post("/auth/login", login);
  router.get("/auth/roles", roles);
  router.get("/dashboard/summary", summary);
  router.get("/market/products", listProducts);
  router.post("/market/orders", createOrder);
  router.get("/equipment", listEquipment);
  router.post("/equipment/bookings", createBooking);
  router.post("/equipment/bills", createBill);
  router.get("/weather/alerts", alerts);
  router.post("/payments", createPayment);
  router.get("/admin/overview", requireAdmin, overview);
  router.patch("/admin/users/:userId/status", requireAdmin, changeUserStatus);
  router.post("/chat", createChatController(config));

  return router;
}

module.exports = { createApiRouter };


