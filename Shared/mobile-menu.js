(function () {
  function hasMenuTarget() {
    return Boolean(
      document.querySelector(".sidebar") ||
      document.querySelector(".nav") ||
      document.querySelector(".quick-nav") ||
      document.querySelector(".nav-row") ||
      document.querySelector(".nav-links") ||
      document.querySelector(".top-nav")
    );
  }

  function closeMenuOnLinkClick() {
    document.querySelectorAll(".sidebar a, .nav a, .quick-nav a, .nav-row a, .nav-links a, .top-nav a").forEach((link) => {
      link.addEventListener("click", () => document.body.classList.remove("mobile-menu-open"));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("mobileMenuToggle")) return;

    const button = document.createElement("button");
    button.id = "mobileMenuToggle";
    button.className = "mobile-menu-toggle";
    button.type = "button";
    button.setAttribute("aria-label", "Open menu");
    button.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
    document.body.appendChild(button);

    button.addEventListener("click", () => {
      const open = document.body.classList.toggle("mobile-menu-open");
      button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      button.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-ellipsis-vertical"></i>';
    });

    closeMenuOnLinkClick();
  });
})();

