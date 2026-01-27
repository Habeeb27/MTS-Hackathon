// DOM Elements
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const contactForm = document.getElementById("contactForm");
const body = document.body;

// -------------------------
// Theme Toggle
// -------------------------
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

// -------------------------
// Mobile Menu Toggle
// -------------------------
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");

  const menuIcon = menuToggle.querySelector("i");
  if (mobileMenu.classList.contains("active")) {
    menuIcon.className = "fas fa-times";
  } else {
    menuIcon.className = "fas fa-bars";
  }
});

themeToggle.addEventListener("click", toggleTheme);

// -------------------------
// CONTACT FORM (FIXED)
// -------------------------
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);

  try {
    const response = await fetch("/contact", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.status === "success") {
      alert(result.message);
      contactForm.reset();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("Server error. Please try again later.");
  }
});

// -------------------------
// Smooth Scroll
// -------------------------
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

// -------------------------
// Navbar Scroll Effect
// -------------------------
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.style.backgroundColor = "var(--white)";
  navbar.style.boxShadow = "0 4px 12px var(--shadow)";
});

// -------------------------
// Image Setter Utility
// -------------------------
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
const questions = [
    {
        key: "interest",
        text: "What do you enjoy doing the most?",
        options: [
            "Solving problems / logic",
            "Creating or designing things",
            "Working with data or numbers",
            "Communicating / leading people"
        ]
    },
    {
        key: "stage",
        text: "Where are you right now in your journey?",
        options: ["Student","Graduate","Working professional","Career switcher"]
    },
    {
        key: "goal",
        text: "What do you want most from your career?",
        options: ["High income","Stability","Flexibility / remote work","Impact & creativity"]
    },
    {
        key: "effort",
        text: "How much time can you realistically commit weekly?",
        options: ["Less than 5 hours","5–10 hours","10–20 hours","20+ hours"]
    }
];

const chatbox = document.getElementById("chatbox");
let currentQuestion = 0;
let answers = {};

function addMessage(text, sender = "chatbot") {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", sender);
    msgDiv.innerHTML = `<div class="${sender}">${text}</div>`;
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function showOptions(options, key) {
    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("user-options");
    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.addEventListener("click", () => {
            answers[key] = opt;
            optionsDiv.remove();
            addMessage(opt, "user");
            currentQuestion++;
            if(currentQuestion < questions.length){
                setTimeout(() => askQuestion(currentQuestion), 300);
            } else {
                showTeaser();
            }
        });
        optionsDiv.appendChild(btn);
    });
    chatbox.appendChild(optionsDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function askQuestion(index) {
    const q = questions[index];
    addMessage(q.text);
    showOptions(q.options, q.key);
}

async function showTeaser() {
    addMessage("Analyzing your answers... 🔍");
    try {
        const response = await fetch("/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answers)
        });
        const data = await response.json();
        addMessage(data.teaser || "Great! You're ready to explore your career path.");
        // Add Learn More button
        const learnMore = document.createElement("a");
        learnMore.href = "./login.html";
        learnMore.textContent = "Learn More";
        learnMore.className = "btn";
        learnMore.style.display = "inline-block";
        learnMore.style.marginTop = "10px";
        chatbox.appendChild(learnMore);
        chatbox.scrollTop = chatbox.scrollHeight;
    } catch(err) {
        addMessage("Oops! Something went wrong. Please try again later.");
    }
}

// Start the chatbot
askQuestion(0);
