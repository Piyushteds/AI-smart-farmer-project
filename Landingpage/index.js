const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const counters = document.querySelectorAll(".impact-card strong");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.transform = "translateY(0)";
      entry.target.style.opacity = "1";
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => {
  counter.style.opacity = "0";
  counter.style.transform = "translateY(10px)";
  counter.style.transition = "opacity 500ms ease, transform 500ms ease";
  observer.observe(counter);
});
