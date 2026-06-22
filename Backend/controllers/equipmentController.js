const { equipment } = require("../data/demoData");
const { addRecord } = require("../services/databaseService");

function listEquipment(req, res) {
  res.json({ ok: true, equipment });
}

function createBooking(req, res) {
  const booking = {
    bookingId: `EQB-${Date.now()}`,
    equipmentName: req.body?.equipmentName || "Farm Equipment",
    userName: req.body?.userName || req.body?.name || "Guest Farmer",
    status: "Pending",
    createdAt: new Date().toISOString()
  };
  addRecord("bookings", booking);
  res.status(201).json({ ok: true, ...booking });
}

function createBill(req, res) {
  const days = Number(req.body?.days || 1);
  const rentPerDay = Number(req.body?.rentPerDay || 0);
  const damageCharge = Number(req.body?.damageCharge || 0);
  const lateCharge = Number(req.body?.lateCharge || 0);
  const total = days * rentPerDay + damageCharge + lateCharge;
  const bill = {
    billId: `BILL-${Date.now()}`,
    days,
    rentPerDay,
    damageCharge,
    lateCharge,
    total,
    createdAt: new Date().toISOString()
  };
  addRecord("bills", bill);
  res.status(201).json({ ok: true, ...bill });
}

module.exports = { listEquipment, createBooking, createBill };
