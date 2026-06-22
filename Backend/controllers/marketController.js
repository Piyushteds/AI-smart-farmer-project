const { products } = require("../data/demoData");
const { addRecord } = require("../services/databaseService");

function listProducts(req, res) {
  const search = String(req.query.search || "").toLowerCase();
  const data = search ? products.filter((item) => item.name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search)) : products;
  res.json({ ok: true, products: data });
}

function createOrder(req, res) {
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  const total = Number(req.body?.total || 0);
  const order = {
    orderId: `SF-${Date.now()}`,
    customer: req.body?.customer || req.body?.name || "Guest Customer",
    status: "Placed",
    items,
    total,
    createdAt: new Date().toISOString()
  };
  addRecord("orders", order);
  res.status(201).json({ ok: true, ...order });
}

module.exports = { listProducts, createOrder };
