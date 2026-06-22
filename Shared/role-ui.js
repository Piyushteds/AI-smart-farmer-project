(function () {
  const role = (
    localStorage.getItem("smartFarmerRole") ||
    sessionStorage.getItem("smartFarmerRole") ||
    document.body?.dataset?.requiredRole ||
    "farmer"
  ).toLowerCase();
  const name =
    localStorage.getItem("smartFarmerName") ||
    sessionStorage.getItem("smartFarmerName") ||
    role;
  const page = window.location.pathname.split(/[\\/]/).pop().toLowerCase();
  const pageMap = {
    "index.html": "index.html",
    "login.html": "Loginpage/login.html",
    "main.html": "Dashboard/main.html",
    "farmerdashboard.html": "Dashboard/farmerdashboard.html",
    "vendordashboard.html": "Dashboard/vendordashboard.html",
    "userdashboard.html": "Dashboard/userdashboard.html",
    "admindashboard.html": "Dashboard/admindashboard.html",
    "adminmanagement.html": "Dashboard/adminmanagement.html",
    "marketplace.html": "Marketplace/marketplace.html",
    "weather.html": "Weather/weather.html",
    "diseaseupload.html": "Services/diseaseupload.html",
    "eqipmentrental.html": "Services/eqipmentrental.html",
    "equipmentbilling.html": "Services/equipmentbilling.html",
    "expertconsulation.html": "Services/expertconsulation.html"
  };

  function projectLink(value) {
    if (!value || /^(https?:|mailto:|tel:|data:|#|javascript:)/i.test(value)) return value;
    if (value.startsWith("../")) return value;
    const [withoutHash, hash = ""] = value.split("#");
    const [pathPart, query = ""] = withoutHash.split("?");
    const file = pathPart.split("/").pop();
    const mapped = pageMap[file] || pathPart;
    const currentPath = window.location.pathname.replace(/\\/g, "/");
    const inSubFolder = /\/(Dashboard|Marketplace|Weather|Services|Loginpage|Landingpage)\//i.test(currentPath);
    return `${inSubFolder ? "../" : ""}${mapped}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
  }
  const access = {
    farmer: [
      "main.html",
      "farmerdashboard.html",
      "weather.html",
      "diseaseupload.html",
      "eqipmentrental.html",
            "equipmentbilling.html",
      "expertconsulation.html",
      "marketplace.html",
    ],
    vendor: [
      "main.html",
      "vendordashboard.html",
      "marketplace.html",
      "eqipmentrental.html",
            "equipmentbilling.html",
      "expertconsulation.html",
    ],
    user: [
      "main.html",
      "userdashboard.html",
      "marketplace.html",
      "weather.html",
      "expertconsulation.html",
    ],
    admin: [
      "main.html",
      "admindashboard.html",
      "adminmanagement.html",
      "farmerdashboard.html",
      "vendordashboard.html",
      "userdashboard.html",
      "marketplace.html",
      "weather.html",
      "diseaseupload.html",
      "eqipmentrental.html",
            "equipmentbilling.html",
      "expertconsulation.html",
    ],
  };

  function allowedForRole(roles) {
    if (!roles) return true;
    return (
      roles
        .split(",")
        .map((item) => item.trim())
        .includes(role) || role === "admin"
    );
  }

  function roleHomePage() {
    const homes = {
      farmer: "farmerdashboard.html",
      vendor: "vendordashboard.html",
      user: "userdashboard.html",
      admin: "admindashboard.html",
    };
    return homes[role] || "main.html";
  }

  function ensurePopupStack() {
    let box = document.getElementById("smartPopupStack");
    if (box) return box;
    const style = document.createElement("style");
    style.textContent = `
.card[data-href]{
    cursor:pointer;
}

.card[data-href]:hover{
    transform:translateY(-4px);
    transition:.2s ease;
}

.mini-action{
    border:0;
    background:#14532d;
    color:#fff;
    padding:9px 12px;
    border-radius:8px;
    font-weight:800;
    margin:8px 0;
    cursor:pointer;
}

.smart-popup-stack{
    position:fixed;
    right:20px;
    top:20px;
    display:grid;
    gap:10px;
    z-index:99999;
}

.smart-popup{
    min-width:280px;
    max-width:360px;
    background:#fff;
    border-left:6px solid #16a34a;
    border-radius:10px;
    padding:14px 16px;
    box-shadow:0 15px 35px rgba(15,23,42,.2);
    font-family:Arial,sans-serif;
}

.smart-popup h3{
    margin:0 0 5px;
    color:#17210f;
}

.smart-popup p{
    margin:0;
    color:#475569;
}

.smart-popup.warning{
    border-left-color:#f59e0b;
}

.smart-popup.alert{
    border-left-color:#2563eb;
}

.smart-popup.danger{
    border-left-color:#dc2626;
}

.smart-popup.success{
    border-left-color:#16a34a;
}
`;
    document.head.appendChild(style);
    box = document.createElement("div");
    box.id = "smartPopupStack";
    box.className = "smart-popup-stack";
    document.body.appendChild(box);
    return box;
  }

  function showPopup(type, title, message) {
    const box = ensurePopupStack();
    const popup = document.createElement("div");
    popup.className = `smart-popup ${type}`;
    popup.innerHTML = `<h3>${title}</h3><p>${message}</p>`;
    box.appendChild(popup);
    setTimeout(() => popup.remove(), 4200);
  }
  window.showSmartPopup = showPopup;

  document.addEventListener("DOMContentLoaded", () => {
    const requiredRole = (document.body?.dataset?.requiredRole || "").toLowerCase();
    if (requiredRole && requiredRole !== role && role !== "admin") {
      showPopup(
        "danger",
        "Wrong Role",
        `Please login as ${requiredRole} to open this dashboard. Redirecting to login.`,
      );
      setTimeout(() => {
        window.location.href = projectLink(`login.html?next=${page}`);
      }, 1200);
      return;
    }

    if (
      page &&
      access[role] &&
      !access[role].includes(page) &&
      !["index.html", "login.html"].includes(page)
    ) {
      showPopup(
        "danger",
        "Access Denied",
        role === "admin"
          ? "Admin can access all panels. Redirecting to Admin Home."
          : `This page is locked for ${role}. Redirecting to your dashboard.`,
      );
      setTimeout(() => {
        window.location.href = projectLink(`${roleHomePage()}?login=success`);
      }, 1400);
      return;
    }

    // normalize local navigation links after files are organized into folders
    document.querySelectorAll("a[href]").forEach((anchor) => {
      anchor.setAttribute("href", projectLink(anchor.getAttribute("href")));
    });
    document.querySelectorAll("[data-href]").forEach((element) => {
      element.dataset.href = projectLink(element.dataset.href);
    });
    document.querySelectorAll("[data-roles]").forEach((element) => {
      if (!allowedForRole(element.dataset.roles)) element.remove();
    });

    const roleLabels = {
      farmer: "Farmer",
      vendor: "Vendor",
      user: "User",
      admin: "Admin",
    };
    showPopup(
      "success",
      `${roleLabels[role] || role} Login Active`,
      `Welcome ${name}. Only useful pages for your role are visible.`,
    );

    document.querySelectorAll("[data-href]").forEach((card) => {
      card.addEventListener("click", (event) => {
        if (event.target.closest("button,a")) return;
        window.location.href = projectLink(card.dataset.href);
      });
    });

    document.querySelectorAll("[data-warning]").forEach((button) => {
      button.addEventListener("click", () =>
        showPopup("warning", "Warning", button.dataset.warning),
      );
    });
    document.querySelectorAll("[data-danger]").forEach((button) => {
      button.addEventListener("click", () =>
        showPopup("danger", "Danger", button.dataset.danger),
      );
    });
    document.querySelectorAll("[data-success]").forEach((button) => {
      button.addEventListener("click", () =>
        showPopup("success", "Success", button.dataset.success),
      );
    });

    document.querySelectorAll("[data-device-toggle]").forEach((button) => {
      const state = button.parentElement.querySelector("[data-device-state]");
      let on = localStorage.getItem("smartDeviceState") === "on";
      function render() {
        button.textContent = on ? "Switch OFF" : "Switch ON";
        if (state) state.textContent = on ? "ON" : "OFF";
      }
      button.addEventListener("click", () => {
        on = !on;
        localStorage.setItem("smartDeviceState", on ? "on" : "off");
        showPopup(
          on ? "success" : "warning",
          "Remote Device",
          on ? "Device switched ON successfully." : "Device switched OFF.",
        );
        render();
      });
      render();
    });
  });
})();









