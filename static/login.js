const themeToggle = document.getElementById("themeToggle");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const body = document.body;

const loginFormContainer = document.getElementById("loginFormContainer");
const signupFormContainer = document.getElementById("signupFormContainer");
const verificationFormContainer = document.getElementById(
  "verificationFormContainer",
);
const forgotPasswordFormContainer = document.getElementById(
  "forgotPasswordFormContainer",
);

const showSignupBtn = document.getElementById("showSignup");
const showLoginBtn = document.getElementById("showLogin");
const showLoginFromForgotBtn = document.getElementById("showLoginFromForgot");
const showLoginFromVerifyBtn = document.getElementById("showLoginFromVerify");
const forgotPasswordLink = document.getElementById("forgotPassword");

const loginFormElement = document.getElementById("loginFormElement");
const signupFormElement = document.getElementById("signupFormElement");
const verificationFormElement = document.getElementById(
  "verificationFormElement",
);
const forgotPasswordFormElement = document.getElementById(
  "forgotPasswordFormElement",
);
const resendForm = document.getElementById("resendForm");

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
const verificationMessage = document.getElementById("verificationMessage");
const forgotPasswordMessage = document.getElementById("forgotPasswordMessage");

const verificationEmailSpan = document.getElementById("verificationEmail");
const resendCodeBtn = document.getElementById("resendCode");
const countdownText = document.getElementById("countdownText");
const countdownSpan = document.getElementById("countdown");
const verificationInputs = document.querySelectorAll(".verification-input");
const verificationCodeInput = document.getElementById("verificationCode");
const resendEmailInput = document.getElementById("resendEmail");

let pendingVerificationUser = null;
let countdownTimer = null;

// Function to store user data in localStorage
function storeUserData(userData) {
  try {
    if (userData.name) {
      localStorage.setItem("userName", userData.name);
    }
    if (userData.email) {
      localStorage.setItem("userEmail", userData.email);
    }
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("User data stored in localStorage:", userData);
    return true;
  } catch (error) {
    console.error("Error storing user data:", error);
    return false;
  }
}

// Function to get user data from localStorage
function getUserData() {
  try {
    const userDataStr = localStorage.getItem("userData");
    if (userDataStr) {
      return JSON.parse(userDataStr);
    }
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    if (name || email) {
      return { name, email };
    }
    return null;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
}

// Function to clear user data from localStorage
function clearUserData() {
  try {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userData");
    console.log("User data cleared from localStorage");
    return true;
  } catch (error) {
    console.error("Error clearing user data:", error);
    return false;
  }
}

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
  const allForms = [
    loginFormContainer,
    signupFormContainer,
    verificationFormContainer,
    forgotPasswordFormContainer,
  ];

  allForms.forEach((form) => {
    if (form.classList.contains("active")) {
      form.classList.remove("active");
      setTimeout(() => {
        form.style.display = "none";
      }, 300);
    }
  });

  clearMessages();

  setTimeout(() => {
    formToShow.style.display = "block";
    formToShow.offsetHeight;
    formToShow.classList.add("active");

    if (formToShow === signupFormContainer) {
      confirmPasswordGroup.classList.remove("visible");
      confirmPasswordInput.value = "";
      confirmPasswordInput.required = false;
    }

    if (formToShow === verificationFormContainer) {
      resetVerificationInputs();
      updateVerifyButtonState(); // ✅ Initialize button state
    }
  }, 350);
}

function clearMessages() {
  [
    loginMessage,
    signupMessage,
    verificationMessage,
    forgotPasswordMessage,
  ].forEach((message) => {
    message.textContent = "";
    message.classList.remove("active", "success-message", "error-message");
  });
}

function showMessage(messageElement, message, type) {
  messageElement.textContent = message;
  messageElement.className = `message ${type}-message active`;
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

function startResendCountdown(seconds = 60) {
  clearInterval(countdownTimer);
  countdownText.style.display = "block";
  resendCodeBtn.style.display = "none";

  let timeLeft = seconds;
  countdownSpan.textContent = timeLeft;

  countdownTimer = setInterval(() => {
    timeLeft--;
    countdownSpan.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      countdownText.style.display = "none";
      resendCodeBtn.style.display = "inline";
    }
  }, 1000);
}

function resetVerificationInputs() {
  verificationInputs.forEach((input) => {
    input.value = "";
    input.classList.remove("filled", "error");
  });
  verificationInputs[0].focus();
  updateVerifyButtonState(); // ✅ Reset button state
}

function handleVerificationInput(e, index) {
  const input = e.target;
  const value = input.value;

  if (!/^\d*$/.test(value)) {
    input.value = "";
    return;
  }

  if (value.length === 1 && index < verificationInputs.length - 1) {
    verificationInputs[index + 1].focus();
  }

  if (value.length === 1) {
    input.classList.add("filled");
  } else {
    input.classList.remove("filled");
  }

  if (e.key === "Backspace" && !value && index > 0) {
    verificationInputs[index - 1].focus();
  }
}

// ✅ FIXED: Single source of truth for verification code
function getVerificationCode() {
  let code = "";
  verificationInputs.forEach((input) => {
    code += input.value;
  });
  return code;
}

// ✅ FIXED: Single function to manage verify button state
function updateVerifyButtonState() {
  const code = getVerificationCode();
  const submitBtn = verificationFormElement.querySelector('.auth-btn');
  
  if (code.length === 6) {
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    submitBtn.style.cursor = 'pointer';
    submitBtn.textContent = 'Verify Email';
  } else {
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
    submitBtn.style.cursor = 'not-allowed';
    submitBtn.textContent = 'Enter Code';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    const themeIcon = document.querySelector("#themeToggle i");
    themeIcon.className = "fas fa-sun";
    document.querySelector("#mobileThemeToggle i").className = "fas fa-sun";
    document.getElementById("mobileThemeToggle").innerHTML =
      '<i class="fas fa-sun"></i> Toggle Theme';
  }

  // Load user data from localStorage and pre-fill login form
  const userData = getUserData();
  if (userData && userData.email) {
    document.getElementById("loginEmail").value = userData.email;
  }

  // 🚀 ENHANCED: Backend verification flag check
  const authWrapper = document.getElementById('authWrapper');
  const showVerificationFromServer = authWrapper?.dataset.showVerification === 'true';
  
  if (showVerificationFromServer) {
    showForm(verificationFormContainer);
    if (window.pendingEmail) {
      document.getElementById('verificationEmail').textContent = window.pendingEmail;
      document.getElementById('resendEmail').value = window.pendingEmail;
    }
    document.getElementById('resendCodeContainer').classList.add('init-countdown');
    startResendCountdown(60);
    verificationInputs[0].focus();
    console.log('✅ Backend verification mode activated');
  } else {
    // Default states - login active
    loginFormContainer.style.display = "block";
    signupFormContainer.style.display = "none";
    verificationFormContainer.style.display = "none";
    forgotPasswordFormContainer.style.display = "none";
    loginFormContainer.classList.add('active');
  }

  const logoImage = "https://i.postimg.cc/ry3JjZwG/img.png";
  document.querySelectorAll(".auth-circle-image").forEach((img) => {
    img.src = logoImage;
  });

  // Mobile menu links
  const mobileLinks = document.querySelectorAll(
    ".mobile-nav-links a, .mobile-theme-toggle",
  );
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      menuToggle.querySelector("i").className = "fas fa-bars";
    });
  });

  // ✅ FIXED: Complete verification input handlers
  verificationInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      handleVerificationInput(e, index);
      updateVerifyButtonState(); // ✅ KEY FIX: Update button on every input
    });
    
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        verificationInputs[index - 1].focus();
      }
      setTimeout(updateVerifyButtonState, 10); // ✅ KEY FIX
    });
    
    input.addEventListener("paste", function(e) {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text');
      const code = paste.replace(/\D/g, '').slice(0, 6);
      code.split('').forEach((digit, i) => {
        if (verificationInputs[i]) {
          verificationInputs[i].value = digit;
          verificationInputs[i].classList.add("filled");
        }
      });
      updateVerifyButtonState(); // ✅ KEY FIX
      if (code.length === 6) {
        verificationInputs[5].focus();
      }
    });
  });

  // ✅ Initialize verify button state
  updateVerifyButtonState();

  window.scrollTo(0, 0);
});

// Event Listeners
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
  showForm(signupFormContainer);
});

showLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showForm(loginFormContainer);
});

showLoginFromForgotBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showForm(loginFormContainer);
});

showLoginFromVerifyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showForm(loginFormContainer);
});

forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  showForm(forgotPasswordFormContainer);
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

signupPasswordInput.addEventListener("input", toggleConfirmPasswordField);

// Update resend email when signup email changes
document.getElementById("signupEmail").addEventListener("input", function() {
  resendEmailInput.value = this.value;
});

// Resend OTP form handler
resendForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitBtn = resendForm.querySelector("button");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Resending...";
  submitBtn.disabled = true;

  try {
    const formData = new FormData(resendForm);
    const response = await fetch("/resend_otp", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(verificationMessage, "New verification code sent!", "success");
      startResendCountdown(60);
      resetVerificationInputs(); // ✅ Clear inputs on resend
    } else {
      showMessage(verificationMessage, data.message || "Failed to resend code", "error");
    }
  } catch (error) {
    showMessage(verificationMessage, "Failed to resend code. Please try again.", "error");
  }

  submitBtn.textContent = originalText;
  submitBtn.disabled = false;
});

// LOGIN FORM - Use native form submission (works with Flask)
loginFormElement.addEventListener("submit", function(e) {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    e.preventDefault();
    showMessage(loginMessage, "Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(email)) {
    e.preventDefault();
    showMessage(loginMessage, "Please enter a valid email address", "error");
    return;
  }

  // Let native form submission handle it (Flask will redirect on success)
  const submitBtn = loginFormElement.querySelector(".auth-btn");
  submitBtn.textContent = "Signing In...";
  submitBtn.disabled = true;
});

// REGISTER FORM - Use native form submission
signupFormElement.addEventListener("submit", function(e) {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  const isConfirmPasswordVisible = confirmPasswordGroup.classList.contains("visible");

  if (!name || !email || !password) {
    e.preventDefault();
    showMessage(signupMessage, "Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(email)) {
    e.preventDefault();
    showMessage(signupMessage, "Please enter a valid email address", "error");
    return;
  }

  if (!isStrongPassword(password)) {
    e.preventDefault();
    showMessage(
      signupMessage,
      "Password must be at least 8 characters with uppercase, lowercase, and a number",
      "error",
    );
    return;
  }

  if (isConfirmPasswordVisible && password !== confirmPassword) {
    e.preventDefault();
    showMessage(signupMessage, "Passwords do not match", "error");
    return;
  }

  // Store pending user data for verification
  pendingVerificationUser = { name, email };
  resendEmailInput.value = email;

  // Let native form submission handle it (Flask will show verification form)
  const submitBtn = signupFormElement.querySelector(".auth-btn");
  submitBtn.textContent = "Creating Account...";
  submitBtn.disabled = true;
});

// ✅ FIXED VERIFICATION FORM - COMPLETE WORKING SOLUTION
verificationFormElement.addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const enteredCode = getVerificationCode();
 // ✅ FIXED VERIFICATION FORM - COMPLETE WORKING SOLUTION
verificationFormElement.addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const enteredCode = getVerificationCode();
  if (enteredCode.length !== 6) {
    showMessage(verificationMessage, "Please enter full 6-digit code", "error");
    verificationInputs.forEach((input) => input.classList.add("error"));
    setTimeout(() => {
      verificationInputs.forEach((input) => input.classList.remove("error"));
    }, 2000);
    return;
  }

  const submitBtn = verificationFormElement.querySelector(".auth-btn");
  submitBtn.textContent = "Verifying...";
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  try {
    // Populate hidden input and submit
    verificationCodeInput.value = enteredCode;
    
    const formData = new FormData(verificationFormElement);
    const response = await fetch(verificationFormElement.action, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // Success - let Flask handle redirect
      window.location.href = response.url || '/dashboard';
    } else {
      const data = await response.json().catch(() => ({}));
      showMessage(verificationMessage, data.message || "Verification failed. Please try again.", "error");
      resetVerificationInputs();
    }
  } catch (error) {
    console.error('Verification error:', error);
    showMessage(verificationMessage, "Network error. Please check your connection.", "error");
    resetVerificationInputs();
  } finally {
    submitBtn.textContent = "Verify Email";
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  }
});

// FORGOT PASSWORD - Basic placeholder (extend as needed)
forgotPasswordFormElement.addEventListener("submit", function(e) {
  const email = document.getElementById("forgotEmail").value.trim();

  if (!email) {
    e.preventDefault();
    showMessage(forgotPasswordMessage, "Please enter your email address", "error");
    return;
  }

  if (!isValidEmail(email)) {
    e.preventDefault();
    showMessage(forgotPasswordMessage, "Please enter a valid email address", "error");
    return;
  }

  const submitBtn = forgotPasswordFormElement.querySelector(".auth-btn");
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Show success message (extend with real backend endpoint later)
  setTimeout(() => {
    showMessage(
      forgotPasswordMessage,
      `Password reset instructions sent to ${email}`,
      "success",
    );
    submitBtn.textContent = "Reset Password";
    submitBtn.disabled = false;
  }, 1500);
});})
  const submitBtn = forgotPasswordFormElement.querySelector(".auth-btn");
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Show success message (extend with real backend endpoint later)
  setTimeout(() => {
    showMessage(
      forgotPasswordMessage,
      `Password reset instructions sent to ${email}`,
      "success",
    );
    submitBtn.textContent = "Reset Password";
    submitBtn.disabled = false;
  }, 1500);
});})