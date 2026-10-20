// Maaz Digital Solutions — small, dependency-free interactions.
// IMPORTANT: Replace the placeholder below with your real business email before publishing.
const BUSINESS_EMAIL = "maazmehmood10@gmail.com";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();

// Reveal sections as they enter the viewport. Keep all content visible when reduced motion is preferred.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  if (BUSINESS_EMAIL === "YOUR_EMAIL@example.com" || !BUSINESS_EMAIL.includes("@")) {
    formStatus.textContent = "Before publishing, open script.js and replace YOUR_EMAIL@example.com with your real business email. The form is ready to prepare an email inquiry.";
    return;
  }

  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Website inquiry from ${data.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company") || "Not provided"}\nIndustry: ${data.get("industry")}\nService: ${data.get("service")}\n\nProject details:\n${data.get("details")}`
  );
  formStatus.textContent = "Opening your email app with the inquiry details. Please review and send the email there.";
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
});
