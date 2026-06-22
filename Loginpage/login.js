 const loginForm = document.getElementById("loginForm");

      const credentials = {
        farmer: { username: "farmer", password: "farmer123", label: "Farmer" },
        vendor: { username: "vendor", password: "vendor123", label: "Vendor" },
        user: { username: "user", password: "user123", label: "User" },
        admin: { username: "admin", password: "admin123", label: "Admin" },
      };

      const pageMap = {
        "main.html": "Dashboard/main.html",
        "farmerdashboard.html": "Dashboard/farmerdashboard.html",
        "vendordashboard.html": "Dashboard/vendordashboard.html",
        "userdashboard.html": "Dashboard/userdashboard.html",
        "admindashboard.html": "Dashboard/admindashboard.html",
        "marketplace.html": "Marketplace/marketplace.html",
        "weather.html": "Weather/weather.html",
        "diseaseupload.html": "Services/diseaseupload.html",
        "eqipmentrental.html": "Services/eqipmentrental.html",
        "equipmentbilling.html": "Services/equipmentbilling.html",
        "expertconsulation.html": "Services/expertconsulation.html"
      };

      function normalizeNextPage(next) {
        const clean = (next || "main.html").replace(/^\.\.\//, "");
        const [pathPart, queryPart] = clean.split("?");
        const fileName = pathPart.split("/").pop();
        const mapped = pageMap[fileName] || pathPart || "Dashboard/main.html";
        return `../${mapped}${queryPart ? `?${queryPart}` : ""}`;
      }
      function saveLoginState(role, username) {
        const label = credentials[role]?.label || "Farmer";
        try {
          localStorage.setItem("smartFarmerLoggedIn", "true");
          localStorage.setItem("smartFarmerRole", role);
          localStorage.setItem("smartFarmerName", username || label);
        } catch (error) {}

        try {
          sessionStorage.setItem("smartFarmerLoggedIn", "true");
          sessionStorage.setItem("smartFarmerAccess", "true");
          sessionStorage.setItem("smartFarmerRole", role);
          sessionStorage.setItem("smartFarmerName", username || label);
        } catch (error) {}
      }


      function updateActiveRoleCard(role) {
        document.querySelectorAll("[data-role-pick]").forEach((card) => {
          card.classList.toggle("active", card.dataset.rolePick === role);
        });
      }

      function fillCredentialsForRole() {
        const roleSelect = document.getElementById("roleSelect");
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const selected = credentials[roleSelect.value];
        if (!selected || !username || !password) return;
        username.value = selected.username;
        password.value = selected.password;
        updateActiveRoleCard(roleSelect.value);
      }

      document.querySelectorAll("[data-role-pick]").forEach((card) => {
        card.addEventListener("click", () => {
          document.getElementById("roleSelect").value = card.dataset.rolePick;
          fillCredentialsForRole();
        });
      });

      document.getElementById("roleSelect").addEventListener("change", fillCredentialsForRole);
      fillCredentialsForRole();
      function getNextPage() {
        const params = new URLSearchParams(window.location.search);
        const role = document.getElementById("roleSelect").value;
        const roleHome = {
          farmer: "farmerdashboard.html",
          vendor: "vendordashboard.html",
          user: "userdashboard.html",
          admin: "admindashboard.html",
        };
        return normalizeNextPage(params.get("next") || roleHome[role] || "main.html");
      }

      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const role = document.getElementById("roleSelect").value;
        const user = document.getElementById("username").value.trim();
        const pass = document.getElementById("password").value.trim();
        const expected = credentials[role];
        const legacyAdmin = user === "admin" && pass === "1234";

        if (
          (expected &&
            user === expected.username &&
            pass === expected.password) ||
          legacyAdmin
        ) {
          saveLoginState(legacyAdmin ? "admin" : role, user);
          alert(
            `Login Successful as ${legacyAdmin ? "Admin" : expected.label}. Opening page...`,
          );
          const nextPage = getNextPage();
          window.location.href = `${nextPage}${nextPage.includes("?") ? "&" : "?"}login=success`;
          return;
        }

        alert(
          "Invalid details. Select correct role and use shown demo credentials.",
        );
      });





