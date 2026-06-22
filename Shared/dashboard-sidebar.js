(function () {
  const dashboardLinks = [
    { label: "Home", icon: "fa-house", href: "role-home", roles: ["farmer", "vendor", "user", "admin"] },
    { label: "Farmer Panel", icon: "fa-seedling", href: "../Dashboard/farmerdashboard.html", roles: ["farmer", "admin"] },
    { label: "Vendor Panel", icon: "fa-store", href: "../Dashboard/vendordashboard.html", roles: ["vendor", "admin"] },
    { label: "User Panel", icon: "fa-user", href: "../Dashboard/userdashboard.html", roles: ["user", "admin"] },
    { label: "Admin Panel", icon: "fa-user-shield", href: "../Dashboard/admindashboard.html", roles: ["admin"] },
    { label: "Admin Management", icon: "fa-users-gear", href: "../Dashboard/adminmanagement.html", roles: ["admin"] },
    { label: "Marketplace", icon: "fa-basket-shopping", href: "../Marketplace/marketplace.html", roles: ["farmer", "vendor", "user", "admin"] },
    { label: "Weather", icon: "fa-cloud-sun-rain", href: "../Weather/weather.html", roles: ["farmer", "user", "admin"] },
    { label: "Disease Upload", icon: "fa-microscope", href: "../Services/diseaseupload.html", roles: ["farmer", "admin"] },
    { label: "Equipment", icon: "fa-tractor", href: "../Services/eqipmentrental.html", roles: ["farmer", "vendor", "admin"] },
    { label: "Rental Billing", icon: "fa-file-invoice", href: "../Services/equipmentbilling.html", roles: ["farmer", "vendor", "admin"] },
    { label: "Experts", icon: "fa-headset", href: "../Services/expertconsulation.html", roles: ["farmer", "vendor", "user", "admin"] }
  ];

  function getRole() {
    return (
      localStorage.getItem("smartFarmerRole") ||
      sessionStorage.getItem("smartFarmerRole") ||
      document.body.dataset.requiredRole ||
      "user"
    ).toLowerCase();
  }

  function getName() {
    return localStorage.getItem("smartFarmerName") || sessionStorage.getItem("smartFarmerName") || "Smart Farmer";
  }

  function isDashboardPage() {
    return window.location.pathname.toLowerCase().includes("/dashboard/");
  }

  function roleHomeHref(role) {
    const homes = {
      farmer: "../Dashboard/farmerdashboard.html",
      vendor: "../Dashboard/vendordashboard.html",
      user: "../Dashboard/userdashboard.html",
      admin: "../Dashboard/admindashboard.html"
    };
    return homes[role] || "../Dashboard/main.html";
  }

  function createLink(item, role, currentFile) {
    if (!item.roles.includes(role) && role !== "admin") return "";
    const href = item.href === "role-home" ? roleHomeHref(role) : item.href;
    const active = href.toLowerCase().endsWith(currentFile) ? " active" : "";
    return `<a class="side-link${active}" href="${href}"><i class="fa-solid ${item.icon}"></i><span>${item.label}</span></a>`;
  }

  function logout(event) {
    event.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "../Loginpage/login.html";
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!isDashboardPage() || document.querySelector(".sidebar")) return;

    const role = getRole();
    const currentFile = window.location.pathname.split("/").pop().toLowerCase();
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar shared-dashboard-sidebar";
    sidebar.innerHTML = `
      <a class="shared-brand" href="${roleHomeHref(role)}">
        <span class="brand-icon"><i class="fa-solid fa-leaf"></i></span>
        <span><strong>Smart Farmer</strong><small>${role} workspace</small></span>
      </a>
      <div class="sidebar-profile">
        <span class="profile-ring"><i class="fa-solid fa-user-check"></i></span>
        <div><strong>${getName()}</strong><small>${role.toUpperCase()} dashboard</small></div>
      </div>
      <nav class="side-nav">${dashboardLinks.map((item) => createLink(item, role, currentFile)).join("")}</nav>
      <div class="side-footer">
        <a href="../index.html"><i class="fa-solid fa-earth-asia"></i><span>Landing Page</span></a>
        <a href="../Loginpage/login.html" data-shared-logout><i class="fa-solid fa-right-from-bracket"></i><span>Logout</span></a>
      </div>
    `;

    document.body.classList.add("has-shared-dashboard-sidebar");
    document.body.insertBefore(sidebar, document.body.firstChild);
    const logoutLink = sidebar.querySelector("[data-shared-logout]");
    if (logoutLink) logoutLink.addEventListener("click", logout);
  });
})();


