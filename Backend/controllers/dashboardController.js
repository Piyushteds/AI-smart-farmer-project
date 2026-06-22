const { rolePages, products, equipment, weatherAlerts } = require("../data/demoData");

function summary(req, res) {
  const role = req.query.role || "farmer";
  res.json({
    ok: true,
    role,
    modules: rolePages[role] || rolePages.farmer,
    stats: {
      products: products.length,
      equipment: equipment.length,
      weatherAlerts: weatherAlerts.length,
      farmScore: 86
    }
  });
}

module.exports = { summary };
