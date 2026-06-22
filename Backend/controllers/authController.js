const { credentials, rolePages } = require("../data/demoData");
const { readDatabase } = require("../services/databaseService");

function login(req, res) {
  const { role, username, password } = req.body || {};
  const expected = credentials[role];
  const legacyAdmin = username === "admin" && password === "1234";

  if (!legacyAdmin && (!expected || username !== expected.username || password !== expected.password)) {
    return res.status(401).json({ ok: false, error: "Invalid credentials" });
  }

  const resolvedRole = legacyAdmin ? "admin" : role;
  const dbUser = readDatabase().users.find((item) => item.username === username && item.role === resolvedRole);
  if (dbUser?.status === "blocked") {
    return res.status(403).json({ ok: false, error: "This account is blocked by admin" });
  }
  res.json({
    ok: true,
    user: {
      username,
      role: resolvedRole,
      label: credentials[resolvedRole]?.label || "Admin",
      pages: rolePages[resolvedRole] || rolePages.farmer
    }
  });
}

function roles(req, res) {
  res.json({ ok: true, credentials, rolePages });
}

module.exports = { login, roles };

