// DOM Elements
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const contactForm = document.getElementById("contactForm");
const body = document.body;

function toggleTheme() {
  body.classList.toggle("dark-theme");

  const themeIcon = themeToggle.querySelector("i");

  if (body.classList.contains("dark-theme")) {
    themeIcon.className = "fas fa-sun";
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.className = "fas fa-moon";
    localStorage.setItem("theme", "light");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    const themeIcon = themeToggle.querySelector("i");
    themeIcon.className = "fas fa-sun";
  }

  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll(".mobile-nav-links a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
});

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");

  // Update menu icon
  const menuIcon = menuToggle.querySelector("i");
  if (mobileMenu.classList.contains("active")) {
    menuIcon.className = "fas fa-times";
  } else {
    menuIcon.className = "fas fa-bars";
  }
});

themeToggle.addEventListener("click", toggleTheme);

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  alert(
    `Thank you ${name}! Your message has been received. We'll contact you at ${email} soon.`,
  );

  contactForm.reset();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "var(--white)";
    navbar.style.boxShadow = "0 4px 12px var(--shadow)";
  } else {
    navbar.style.backgroundColor = "var(--white)";
    navbar.style.boxShadow = "0 4px 12px var(--shadow)";
  }
});

function setImageSources(logoPath, heroIconPath, footerLogoPath) {
  const navLogo = document.querySelector(".logo-image");
  if (navLogo && logoPath) {
    navLogo.src = logoPath;
  }

  const heroImage = document.querySelector(".hero-circle-image");
  if (heroImage && heroIconPath) {
    heroImage.src = heroIconPath;
  }

  const footerLogo = document.querySelector(".footer-logo-image");
  if (footerLogo && footerLogoPath) {
    footerLogo.src = footerLogoPath;
  }
}
