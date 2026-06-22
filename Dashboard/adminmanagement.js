const metricGrid = document.getElementById("metricGrid");
const usersBody = document.getElementById("usersBody");
const refreshBtn = document.getElementById("refreshBtn");

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const adminHeaders = { "x-smart-role": localStorage.getItem("smartFarmerRole") || sessionStorage.getItem("smartFarmerRole") || "" };

function showToast(type, message) {
  if (window.showSmartPopup) window.showSmartPopup(type, type === "danger" ? "Admin Alert" : "Admin Update", message);
}

function metric(icon, value, label) {
  return `<article class="metric-card"><i class="fa-solid ${icon}"></i><strong>${value}</strong><span>${label}</span></article>`;
}

function renderMetrics(totals) {
  metricGrid.innerHTML = [
    metric("fa-users", totals.users, "Total users"),
    metric("fa-user-slash", totals.blocked, "Blocked users"),
    metric("fa-basket-shopping", totals.orders, "Orders"),
    metric("fa-tractor", totals.bookings, "Bookings"),
    metric("fa-indian-rupee-sign", money.format(totals.revenue || 0), "Payment revenue")
  ].join("");
}

function renderUsers(users) {
  usersBody.innerHTML = users.map((user) => {
    const blocked = user.status === "blocked";
    return `
      <tr>
        <td><div class="user-line"><span class="avatar"><i class="fa-solid fa-user"></i></span><div><strong>${user.name}</strong><br><small>${user.username}</small></div></div></td>
        <td>${user.role}</td>
        <td>${user.city || "-"}</td>
        <td><span class="badge ${blocked ? "blocked" : ""}">${user.status}</span></td>
        <td><button class="action-btn ${blocked ? "" : "warning"}" data-user-id="${user.id}" data-next-status="${blocked ? "active" : "blocked"}">${blocked ? "Unblock" : "Block"}</button></td>
      </tr>`;
  }).join("");
}

function listItem(title, subtitle, amount) {
  return `<article class="activity-item"><div><strong>${title}</strong><small>${subtitle}</small></div>${amount ? `<span class="amount">${amount}</span>` : ""}</article>`;
}

function renderList(id, rows, builder) {
  const box = document.getElementById(id);
  box.innerHTML = rows.length ? rows.slice(0, 8).map(builder).join("") : '<div class="empty">No records yet.</div>';
}

function renderData(data) {
  renderMetrics(data.totals);
  renderUsers(data.users || []);
  renderList("ordersList", data.orders || [], (order) => listItem(order.orderId, `${order.customer || "Customer"} - ${order.status}`, money.format(order.total || 0)));
  renderList("bookingsList", data.bookings || [], (booking) => listItem(booking.bookingId, `${booking.equipmentName} - ${booking.status}`, booking.userName || ""));
  renderList("billsList", data.bills || [], (bill) => listItem(bill.billId, `${bill.days} days rental`, money.format(bill.total || 0)));
  renderList("paymentsList", data.payments || [], (payment) => listItem(payment.paymentId, `${payment.method.toUpperCase()} - ${payment.status}`, money.format(payment.amount || 0)));
}

async function loadAdminData() {
  try {
    const response = await fetch("/api/admin/overview", { headers: adminHeaders });
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || "Failed to load admin data");
    renderData(data);
  } catch (error) {
    showToast("danger", "Admin database data load nahi hua. Backend server check karo.");
  }
}

async function changeStatus(button) {
  const userId = button.dataset.userId;
  const status = button.dataset.nextStatus;
  button.disabled = true;
  try {
    const response = await fetch(`/api/admin/users/${userId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...adminHeaders },
      body: JSON.stringify({ status })
    });
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || "Status update failed");
    showToast("success", `${data.user.name} ${status === "blocked" ? "blocked" : "unblocked"} successfully.`);
    await loadAdminData();
  } catch (error) {
    showToast("danger", "User status update nahi hua.");
  } finally {
    button.disabled = false;
  }
}

usersBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-user-id]");
  if (button) changeStatus(button);
});
refreshBtn.addEventListener("click", loadAdminData);
loadAdminData();

