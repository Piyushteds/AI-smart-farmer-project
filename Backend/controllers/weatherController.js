const { weatherAlerts } = require("../data/demoData");

function alerts(req, res) {
  const city = String(req.query.city || "").toLowerCase();
  const data = city ? weatherAlerts.filter((item) => item.city.toLowerCase() === city) : weatherAlerts;
  res.json({ ok: true, alerts: data });
}

module.exports = { alerts };
