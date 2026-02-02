<<<<<<< HEAD
//The DOM Elements
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

let pendingVerificationUser = null;
let verificationCode = null;
let countdownTimer = null;

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
  // Get all form containers
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

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(email, code) {
  // This function is no longer needed - the backend handles email sending
  // Keeping it for compatibility but it should not be called
  console.log('Email sending handled by backend');
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
    input.classList.remove("filled");
  });
  verificationInputs[0].focus();
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

function getVerificationCode() {
  let code = "";
  verificationInputs.forEach((input) => {
    code += input.value;
  });
  return code;
}

function simulateApiCall(data, endpoint) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `${
          endpoint === "login" ? "Login" : "Signup"
        } successful! Redirecting...`,
        user: data.email
          ? { email: data.email, name: data.name || "User" }
          : null,
      });
    }, 1500);
  });
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

  loginFormContainer.style.display = "block";
  signupFormContainer.style.display = "none";
  verificationFormContainer.style.display = "none";
  forgotPasswordFormContainer.style.display = "none";

  const logoImage = "https://i.postimg.cc/ry3JjZwG/img.png";
  document.querySelectorAll(".auth-circle-image").forEach((img) => {
    img.src = logoImage;
  });

  const mobileLinks = document.querySelectorAll(
    ".mobile-nav-links a, .mobile-theme-toggle",
  );
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      menuToggle.querySelector("i").className = "fas fa-bars";
    });
  });

  verificationInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => handleVerificationInput(e, index));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        verificationInputs[index - 1].focus();
      }
    });
  });

  window.scrollTo(0, 0);
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

resendCodeBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!pendingVerificationUser) return;

  const submitBtn = verificationFormElement.querySelector(".auth-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Resending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch('/resend-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: pendingVerificationUser.email
      })
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(verificationMessage, "New verification code sent!", "success");
      startResendCountdown(60);
    } else {
      showMessage(
        verificationMessage,
        data.message || "Failed to resend code. Please try again.",
        "error",
      );
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  } catch (error) {
    showMessage(
      verificationMessage,
      "Failed to resend code. Please try again.",
      "error",
    );
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
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
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginEmail: email,
        loginPassword: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(loginMessage, data.message, "success");

      setTimeout(() => {
        // Redirect to dashboard on successful login
        window.location.href = '/dashboard';

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    } else {
      showMessage(loginMessage, data.message, "error");
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
    // Call backend signup endpoint
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signupName: name,
        signupEmail: email,
        signupPassword: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Store user data for verification process
      pendingVerificationUser = { name, email, password };

      verificationEmailSpan.textContent = email;
      showForm(verificationFormContainer);

      startResendCountdown(60);

      signupFormElement.reset();
      confirmPasswordGroup.classList.remove("visible");
    } else {
      showMessage(signupMessage, data.message || "Failed to create account", "error");
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  } catch (error) {
    showMessage(
      signupMessage,
      "An error occurred. Please try again.",
      "error",
    );
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

verificationFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  const enteredCode = getVerificationCode();

  if (enteredCode.length !== 6) {
    showMessage(verificationMessage, "Please enter the 6-digit code", "error");
    return;
  }

  const submitBtn = verificationFormElement.querySelector(".auth-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Verifying...";
  submitBtn.disabled = true;

  try {
    const response = await fetch('/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: pendingVerificationUser.email,
        code: enteredCode
      })
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(
        verificationMessage,
        "Email verified successfully! Your account has been created.",
        "success",
      );

      setTimeout(() => {
        alert(
          `Welcome to Pathfinder, ${pendingVerificationUser.name}!\n\nAccount created and verified successfully.\nEmail: ${pendingVerificationUser.email}`,
=======
      // DOM Elements
        const themeToggle = document.getElementById("themeToggle");
        const mobileThemeToggle = document.getElementById("mobileThemeToggle");
        const menuToggle = document.getElementById("menuToggle");
        const mobileMenu = document.getElementById("mobileMenu");
        const body = document.body;

        const loginFormContainer = document.getElementById("loginFormContainer");
        const signupFormContainer = document.getElementById("signupFormContainer");
        const forgotPasswordFormContainer = document.getElementById(
            "forgotPasswordFormContainer",
        );

        const showSignupBtn = document.getElementById("showSignup");
        const showLoginBtn = document.getElementById("showLogin");
        const showLoginFromForgotBtn = document.getElementById("showLoginFromForgot");
        const forgotPasswordLink = document.getElementById("forgotPassword");

        const toggleLoginPasswordBtn = document.getElementById("toggleLoginPassword");
        const toggleSignupPasswordBtn = document.getElementById("toggleSignupPassword");
        const toggleConfirmPasswordBtn = document.getElementById(
            "toggleConfirmPassword",
>>>>>>> 8e068b7a26f8c007d50de044adb73e903fb466e0
        );

        const signupPasswordInput = document.getElementById("signupPassword");
        const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
        const confirmPasswordInput = document.getElementById("confirmPassword");

<<<<<<< HEAD
        showForm(loginFormContainer);
        document.getElementById("loginEmail").value = data.email || "";

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    } else {
      showMessage(verificationMessage, data.message || "Invalid verification code", "error");
      verificationInputs.forEach((input) => input.classList.add("error"));
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  } catch (error) {
    showMessage(
      verificationMessage,
      "An error occurred. Please try again.",
      "error",
    );
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
=======
        function toggleTheme() {
            body.classList.toggle("dark-theme");

            const themeIcon = document.querySelector("#themeToggle i");
            const mobileThemeIcon = document.querySelector("#mobileThemeToggle i");
>>>>>>> 8e068b7a26f8c007d50de044adb73e903fb466e0

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
            // Get all form containers
            const allForms = [
                loginFormContainer,
                signupFormContainer,
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

            setTimeout(() => {
                formToShow.style.display = "block";
                formToShow.offsetHeight;
                formToShow.classList.add("active");

                if (formToShow === signupFormContainer) {
                    confirmPasswordGroup.classList.remove("visible");
                    confirmPasswordInput.value = "";
                    confirmPasswordInput.required = false;
                }
            }, 350);
        }

<<<<<<< HEAD
  try {
    const response = await fetch('/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        forgotEmail: email
      })
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(
        forgotPasswordMessage,
        `Password reset code sent to ${email}. Please check your inbox.`,
        "success",
      );

      forgotPasswordFormElement.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      setTimeout(() => {
        showForm(loginFormContainer);
      }, 3000);
    } else {
      showMessage(forgotPasswordMessage, data.message || "Failed to send reset code", "error");
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  } catch (error) {
    showMessage(forgotPasswordMessage, "An error occurred. Please try again.", "error");
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
=======
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

        function toggleConfirmPasswordField() {
            const passwordValue = signupPasswordInput.value.trim();
>>>>>>> 8e068b7a26f8c007d50de044adb73e903fb466e0

            if (passwordValue.length > 0) {
                confirmPasswordGroup.classList.add("visible");
                confirmPasswordInput.required = true;
            } else {
                confirmPasswordGroup.classList.remove("visible");
                confirmPasswordInput.required = false;
                confirmPasswordInput.value = "";
            }
        }

        // Initialize page
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

            // Set initial form visibility
            loginFormContainer.style.display = "block";
            signupFormContainer.style.display = "none";
            forgotPasswordFormContainer.style.display = "none";

            // Set logo images
            const logoImage = "https://i.postimg.cc/ry3JjZwG/img.png";
            document.querySelectorAll(".auth-circle-image").forEach((img) => {
                img.src = logoImage;
            });

            // Close mobile menu when clicking links
            const mobileLinks = document.querySelectorAll(
                ".mobile-nav-links a, .mobile-theme-toggle",
            );
            mobileLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    mobileMenu.classList.remove("active");
                    menuToggle.querySelector("i").className = "fas fa-bars";
                });
            });

            // Scroll to top
            window.scrollTo(0, 0);
        });

        // Mobile menu toggle
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");

            const menuIcon = menuToggle.querySelector("i");
            if (mobileMenu.classList.contains("active")) {
                menuIcon.className = "fas fa-times";
            } else {
                menuIcon.className = "fas fa-bars";
            }
        });

        // Theme toggle
        themeToggle.addEventListener("click", toggleTheme);
        mobileThemeToggle.addEventListener("click", toggleTheme);

        // Form navigation
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

        forgotPasswordLink.addEventListener("click", (e) => {
            e.preventDefault();
            showForm(forgotPasswordFormContainer);
        });

        // Password visibility toggles
        toggleLoginPasswordBtn.addEventListener("click", () => {
            togglePasswordVisibility("loginPassword", toggleLoginPasswordBtn);
        });

        toggleSignupPasswordBtn.addEventListener("click", () => {
            togglePasswordVisibility("signupPassword", toggleSignupPasswordBtn);
        });

        toggleConfirmPasswordBtn.addEventListener("click", () => {
            togglePasswordVisibility("confirmPassword", toggleConfirmPasswordBtn);
        });

        // Confirm password field visibility
        signupPasswordInput.addEventListener("input", toggleConfirmPasswordField);

        // Close mobile menu when clicking outside
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