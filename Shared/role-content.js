(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const page = window.location.pathname.split(/[\\/]/).pop().toLowerCase();
    if (["index.html", "login.html", "main.html"].includes(page)) return;

    const role =
      localStorage.getItem("smartFarmerRole") ||
      sessionStorage.getItem("smartFarmerRole") ||
      "farmer";
    const name =
      localStorage.getItem("smartFarmerName") ||
      sessionStorage.getItem("smartFarmerName") ||
      "Smart User";

    const data = {
      farmer: {
        icon: "fa-seedling",
        title: "Farmer Workspace",
        text: "Crop planning, weather alerts, disease upload, equipment booking, and expert support are ready for your farm.",
        items: [
          "Crop health tracking",
          "Irrigation reminder",
          "Disease detection",
          "Equipment booking",
        ],
      },
      vendor: {
        icon: "fa-store",
        title: "Vendor Workspace",
        text: "Manage product listings, rental equipment, customer requests, and marketplace orders from this project.",
        items: [
          "Product inventory",
          "Rental requests",
          "Customer leads",
          "Order follow-up",
        ],
      },
      user: {
        icon: "fa-user",
        title: "User Workspace",
        text: "Explore farming tools, weather, marketplace products, and consultation options after login.",
        items: [
          "Browse services",
          "Save products",
          "Book experts",
          "Track requests",
        ],
      },
      admin: {
        icon: "fa-user-shield",
        title: "Admin Workspace",
        text: "Monitor users, vendors, equipment requests, weather usage, and platform modules.",
        items: [
          "User management",
          "Vendor approval",
          "Reports",
          "System controls",
        ],
      },
    };

    const info = data[role] || data.farmer;
    const style = document.createElement("style");
   style.textContent = `
.role-strip{
    max-width:1180px;
    margin:16px auto;
    padding:16px;
    display:grid;
    grid-template-columns:1.2fr .8fr;
    gap:14px;
    background:#ecfdf5;
    border:1px solid #bbf7d0;
    border-radius:10px;
    color:#14532d;
    font-family:Arial,sans-serif;
}

.role-strip h2{
    margin:0 0 6px;
    font-size:22px;
}

.role-strip p{
    margin:0;
    color:#475569;
    line-height:1.5;
}

.role-strip ul{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:8px;
    margin:0;
    padding:0;
    list-style:none;
}

.role-strip li{
    background:#fff;
    padding:10px;
    border-radius:8px;
    font-weight:700;
}

.role-strip i{
    margin-right:8px;
}

.mini-switch{
    display:flex;
    gap:10px;
    align-items:center;
    margin-top:12px;
}

.mini-switch button{
    border:0;
    background:#14532d;
    color:#fff;
    padding:9px 12px;
    border-radius:8px;
    font-weight:800;
    cursor:pointer;
}

.mini-switch span{
    font-weight:800;
}

@media(max-width:760px){
    .role-strip{
        grid-template-columns:1fr;
        margin:12px;
    }

    .role-strip ul{
        grid-template-columns:1fr;
    }
}
`;
    document.head.appendChild(style);

    const banner = document.createElement("section");
    banner.className = "role-strip";
    banner.innerHTML = `<div><h2><i class="fa-solid ${info.icon}"></i>${info.title}</h2><p>Welcome, ${name}. ${info.text}</p><div class="mini-switch"><button id="globalPumpBtn" type="button">Switch ON</button><span id="globalPumpState">Remote device OFF</span></div></div><ul>${info.items.map((item) => `<li><i class="fa-solid fa-circle-check"></i>${item}</li>`).join("")}</ul>`;
    document.body.prepend(banner);

    const btn = document.getElementById("globalPumpBtn");
    const state = document.getElementById("globalPumpState");
    let on = localStorage.getItem("smartDeviceState") === "on";
    function renderSwitch() {
      btn.textContent = on ? "Switch OFF" : "Switch ON";
      state.textContent = on ? "Remote device ON" : "Remote device OFF";
    }
    btn.addEventListener("click", () => {
      on = !on;
      localStorage.setItem("smartDeviceState", on ? "on" : "off");
      renderSwitch();
    });
    renderSwitch();
  });
})();

