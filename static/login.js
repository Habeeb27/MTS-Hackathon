const themeToggle = document.getElementById("themeToggle");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const body = document.body;

const navLogo = document.querySelector(".logo-image");
const loginIcon = document.getElementById("loginIcon");
const signupIcon = document.getElementById("signupIcon");
const forgotPasswordIcon = document.getElementById("forgotPasswordIcon");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");

const showSignupBtn = document.getElementById("showSignup");
const showLoginBtn = document.getElementById("showLogin");
const showLoginFromForgotBtn = document.getElementById("showLoginFromForgot");
const forgotPasswordLink = document.getElementById("forgotPassword");

const loginFormElement = document.getElementById("loginFormElement");
const signupFormElement = document.getElementById("signupFormElement");
const forgotPasswordFormElement = document.getElementById(
  "forgotPasswordFormElement",
);

const toggleLoginPasswordBtn = document.getElementById("toggleLoginPassword");
const toggleSignupPasswordBtn = document.getElementById("toggleSignupPassword");
const toggleConfirmPasswordBtn = document.getElementById(
  "toggleConfirmPassword",
);

const signupPasswordInput = document.getElementById("signupPassword");
const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
const confirmPasswordInput = document.getElementById("confirmPassword");

const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");
const forgotPasswordMessage = document.getElementById("forgotPasswordMessage");

function toggleTheme() {
  body.classList.toggle("dark-theme");

  const themeIcon = document.querySelector("#themeToggle i");
  const mobileThemeIcon = document.querySelector("#mobileThemeToggle i");

  if (body.classList.contains("dark-theme")) {
    themeIcon.className = "fas fa-sun";
    mobileThemeIcon.className = "fas fa-sun";
    mobileThemeIcon.parentNode.innerHTML =
      '<i class="fas fa-sun"></i> Toggle Theme';
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.className = "fas fa-moon";
    mobileThemeIcon.className = "fas fa-moon";
    mobileThemeIcon.parentNode.innerHTML =
      '<i class="fas fa-moon"></i> Toggle Theme';
    localStorage.setItem("theme", "light");
  }
}

function showForm(formToShow) {
  loginForm.classList.add("hidden");
  signupForm.classList.add("hidden");
  forgotPasswordForm.classList.add("hidden");
  clearMessages();

  if (formToShow === signupForm) {
    confirmPasswordGroup.classList.remove("visible");
    confirmPasswordInput.value = "";
  }

  formToShow.classList.remove("hidden");

  formToShow.style.animation = "none";
  setTimeout(() => {
    formToShow.style.animation = "fadeIn 0.5s ease";
  }, 10);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clearMessages() {
  loginMessage.classList.add("hidden");
  signupMessage.classList.add("hidden");
  forgotPasswordMessage.classList.add("hidden");
  loginMessage.textContent = "";
  signupMessage.textContent = "";
  forgotPasswordMessage.textContent = "";
}

function showMessage(messageElement, message, type) {
  messageElement.textContent = message;
  messageElement.className = `message ${type}-message`;
  messageElement.classList.remove("hidden");

  messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
}

function togglePasswordVisibility(inputId, toggleBtn) {
  const passwordInput = document.getElementById(inputId);
  const icon = toggleBtn.querySelector("i");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    icon.className = "fas fa-eye-slash";
  } else {
    passwordInput.type = "password";
    icon.className = "fas fa-eye";
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isStrongPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}

function toggleConfirmPasswordField() {
  const passwordValue = signupPasswordInput.value.trim();

  if (passwordValue.length > 0) {
    confirmPasswordGroup.classList.add("visible");
    confirmPasswordInput.required = true;
  } else {
    confirmPasswordGroup.classList.remove("visible");
    confirmPasswordInput.required = false;
    confirmPasswordInput.value = "";
  }
}

function simulateApiCall(data, endpoint) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `${endpoint === "login" ? "Login" : "Signup"} successful! Redirecting...`,
        user: data.email
          ? { email: data.email, name: data.name || "User" }
          : null,
      });
    }, 1500);
  });
}

function setAuthImages(
  logoPath,
  loginIconPath,
  signupIconPath,
  forgotPasswordIconPath,
) {
  if (navLogo && logoPath) {
    navLogo.src = logoPath;
  }

  if (loginIcon && loginIconPath) {
    loginIcon.src = loginIconPath;
  }

  if (signupIcon && signupIconPath) {
    signupIcon.src = signupIconPath;
  }

  if (forgotPasswordIcon && forgotPasswordIconPath) {
    forgotPasswordIcon.src = forgotPasswordIconPath;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    const themeIcon = document.querySelector("#themeToggle i");
    themeIcon.className = "fas fa-sun";
    document.querySelector("#mobileThemeToggle i").className = "fas fa-sun";
    document.getElementById("mobileThemeToggle").innerHTML =
      '<i class="fas fa-sun"></i> Toggle Theme';
  }

  const mobileLinks = document.querySelectorAll(
    ".mobile-nav-links a, .mobile-theme-toggle",
  );
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      menuToggle.querySelector("i").className = "fas fa-bars";
    });
  });

  const navLinks = document.querySelectorAll(
    ".nav-links a, .mobile-nav-links a",
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  window.scrollTo(0, 0);

  // Add event listener for password input to show confirm field
  signupPasswordInput.addEventListener("input", toggleConfirmPasswordField);
});

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
mobileThemeToggle.addEventListener("click", toggleTheme);

showSignupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showForm(signupForm);

  document
    .querySelectorAll(".nav-links a, .mobile-nav-links a")
    .forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#signup") link.classList.add("active");
    });
});

showLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showForm(loginForm);

  document
    .querySelectorAll(".nav-links a, .mobile-nav-links a")
    .forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#login") link.classList.add("active");
    });
});

showLoginFromForgotBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showForm(loginForm);

  document
    .querySelectorAll(".nav-links a, .mobile-nav-links a")
    .forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#login") link.classList.add("active");
    });
});

forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  showForm(forgotPasswordForm);
});
toggleLoginPasswordBtn.addEventListener("click", () => {
  togglePasswordVisibility("loginPassword", toggleLoginPasswordBtn);
});

toggleSignupPasswordBtn.addEventListener("click", () => {
  togglePasswordVisibility("signupPassword", toggleSignupPasswordBtn);
});

toggleConfirmPasswordBtn.addEventListener("click", () => {
  togglePasswordVisibility("confirmPassword", toggleConfirmPasswordBtn);
});

loginFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const rememberMe = document.getElementById("rememberMe").checked;

  if (!email || !password) {
    showMessage(loginMessage, "Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showMessage(loginMessage, "Please enter a valid email address", "error");
    return;
  }

  const submitBtn = loginFormElement.querySelector(".auth-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Signing In...";
  submitBtn.disabled = true;

  try {
    const result = await simulateApiCall(
      { email, password, rememberMe },
      "login",
    );

    if (result.success) {
      showMessage(loginMessage, result.message, "success");

      setTimeout(() => {
        alert(
          `Welcome back! Login successful.\n\nEmail: ${email}\nRemember me: ${rememberMe ? "Yes" : "No"}\n\n(In a real app, you would be redirected to the dashboard.)`,
        );

        // Reset form
        loginFormElement.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    } else {
      showMessage(loginMessage, result.message, "error");
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  } catch (error) {
    showMessage(loginMessage, "An error occurred. Please try again.", "error");
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

signupFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  const isConfirmPasswordVisible =
    confirmPasswordGroup.classList.contains("visible");

  if (!name || !email || !password) {
    showMessage(signupMessage, "Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showMessage(signupMessage, "Please enter a valid email address", "error");
    return;
  }

  if (!isStrongPassword(password)) {
    showMessage(
      signupMessage,
      "Password must be at least 8 characters with uppercase, lowercase, and a number",
      "error",
    );
    return;
  }

  if (isConfirmPasswordVisible && password !== confirmPassword) {
    showMessage(signupMessage, "Passwords do not match", "error");
    return;
  }

  const submitBtn = signupFormElement.querySelector(".auth-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Creating Account...";
  submitBtn.disabled = true;

  try {
    const result = await simulateApiCall({ name, email, password }, "signup");

    if (result.success) {
      showMessage(signupMessage, result.message, "success");

      setTimeout(() => {
        alert(
          `Welcome to Pathfinder, ${name}!\n\nAccount created successfully.\nEmail: ${email}\n\n(In a real app, you would be redirected to complete your profile.)`,
        );

        signupFormElement.reset();
        confirmPasswordGroup.classList.remove("visible");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
          showForm(loginForm);
          document.getElementById("loginEmail").value = email;
        }, 1500);
      }, 1000);
    } else {
      showMessage(signupMessage, result.message, "error");
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  } catch (error) {
    showMessage(signupMessage, "An error occurred. Please try again.", "error");
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

forgotPasswordFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("forgotEmail").value.trim();

  if (!email) {
    showMessage(
      forgotPasswordMessage,
      "Please enter your email address",
      "error",
    );
    return;
  }

  if (!isValidEmail(email)) {
    showMessage(
      forgotPasswordMessage,
      "Please enter a valid email address",
      "error",
    );
    return;
  }

  const submitBtn = forgotPasswordFormElement.querySelector(".auth-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending Reset Link...";
  submitBtn.disabled = true;

  setTimeout(() => {
    showMessage(
      forgotPasswordMessage,
      `Password reset link sent to ${email}. Please check your inbox.`,
      "success",
    );

    forgotPasswordFormElement.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    setTimeout(() => {
      showForm(loginForm);
    }, 3000);
  }, 1500);
});

document.addEventListener("click", (e) => {
  if (
    !mobileMenu.contains(e.target) &&
    !menuToggle.contains(e.target) &&
    mobileMenu.classList.contains("active")
  ) {
    mobileMenu.classList.remove("active");
    menuToggle.querySelector("i").className = "fas fa-bars";
  }
});
