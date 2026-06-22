const fs = require("fs");
const path = require("path");

const databasePath = path.join(__dirname, "..", "..", "Database", "appData.json");

const defaultData = {
  users: [],
  orders: [],
  bookings: [],
  bills: [],
  payments: []
};

function ensureDatabase() {
  const folder = path.dirname(databasePath);
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
  if (!fs.existsSync(databasePath)) writeDatabase(defaultData);
}

function readDatabase() {
  ensureDatabase();
  try {
    const raw = fs.readFileSync(databasePath, "utf8").replace(/^\uFEFF/, "");
    const parsed = JSON.parse(raw);
    return { ...defaultData, ...parsed };
  } catch (error) {
    writeDatabase(defaultData);
    return { ...defaultData };
  }
}

function writeDatabase(data) {
  fs.writeFileSync(databasePath, JSON.stringify({ ...defaultData, ...data }, null, 2));
}

function addRecord(collection, record) {
  const data = readDatabase();
  data[collection] = Array.isArray(data[collection]) ? data[collection] : [];
  data[collection].unshift(record);
  writeDatabase(data);
  return record;
}

function updateUserStatus(userId, status) {
  const data = readDatabase();
  const user = data.users.find((item) => item.id === userId);
  if (!user) return null;
  user.status = status;
  user.updatedAt = new Date().toISOString();
  writeDatabase(data);
  return user;
}

module.exports = {
  databasePath,
  readDatabase,
  writeDatabase,
  addRecord,
  updateUserStatus
};

