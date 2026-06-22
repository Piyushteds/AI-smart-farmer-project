const { readDatabase, updateUserStatus } = require("../services/databaseService");

function overview(req, res) {
  const db = readDatabase();
  const users = db.users || [];
  const totals = {
    users: users.length,
    farmers: users.filter((user) => user.role === "farmer").length,
    vendors: users.filter((user) => user.role === "vendor").length,
    customers: users.filter((user) => user.role === "user").length,
    blocked: users.filter((user) => user.status === "blocked").length,
    orders: (db.orders || []).length,
    bookings: (db.bookings || []).length,
    bills: (db.bills || []).length,
    payments: (db.payments || []).length,
    revenue: (db.payments || []).reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
  };

  res.json({
    ok: true,
    totals,
    users,
    orders: db.orders || [],
    bookings: db.bookings || [],
    bills: db.bills || [],
    payments: db.payments || []
  });
}

function changeUserStatus(req, res) {
  const { userId } = req.params;
  const status = req.body?.status === "blocked" ? "blocked" : "active";
  const user = updateUserStatus(userId, status);
  if (!user) return res.status(404).json({ ok: false, error: "User not found" });
  res.json({ ok: true, user });
}

module.exports = { overview, changeUserStatus };
