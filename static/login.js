      // DOM Elements
      const themeToggle = document.getElementById("themeToggle");
      const mobileThemeToggle = document.getElementById("mobileThemeToggle");
      const menuToggle = document.getElementById("menuToggle");
      const mobileMenu = document.getElementById("mobileMenu");
      const body = document.body;

      // Form containers
      const loginFormContainer = document.getElementById("loginFormContainer");
      const signupFormContainer = document.getElementById(
        "signupFormContainer",
      );
      const forgotPasswordFormContainer = document.getElementById(
        "forgotPasswordFormContainer",
      );

      // Navigation links
      const showSignupBtn = document.getElementById("showSignup");
      const showLoginBtn = document.getElementById("showLogin");
      const showLoginFromForgotBtn = document.getElementById(
        "showLoginFromForgot",
      );
      const forgotPasswordLink = document.getElementById("forgotPassword");

      // Form elements
      const loginFormElement = document.getElementById("loginFormElement");
      const signupFormElement = document.getElementById("signupFormElement");
      const forgotPasswordFormElement = document.getElementById(
        "forgotPasswordFormElement",
      );

      // Password toggles
      const toggleLoginPasswordBtn = document.getElementById(
        "toggleLoginPassword",
      );
      const toggleSignupPasswordBtn = document.getElementById(
        "toggleSignupPassword",
      );
      const toggleConfirmPasswordBtn = document.getElementById(
        "toggleConfirmPassword",
      );

      // Password fields
      const signupPasswordInput = document.getElementById("signupPassword");
      const confirmPasswordGroup = document.getElementById(
        "confirmPasswordGroup",
      );
      const confirmPasswordInput = document.getElementById("confirmPassword");

      // Message elements
      const loginMessage = document.getElementById("loginMessage");
      const signupMessage = document.getElementById("signupMessage");
      const forgotPasswordMessage = document.getElementById(
        "forgotPasswordMessage",
      );

      // Theme toggle function
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

      // Form switching with animation
      function showForm(formToShow) {
        // Get all form containers
        const allForms = [
          loginFormContainer,
          signupFormContainer,
          forgotPasswordFormContainer,
        ];

        // Hide all forms with animation
        allForms.forEach((form) => {
          if (form.classList.contains("active")) {
            form.classList.remove("active");
            setTimeout(() => {
              form.style.display = "none";
            }, 300); // Wait for fade out animation
          }
        });

        // Clear all messages
        clearMessages();

        // Show the requested form with animation
        setTimeout(() => {
          formToShow.style.display = "block";
          // Trigger reflow
          formToShow.offsetHeight;
          formToShow.classList.add("active");

          // Reset confirm password field for signup form
          if (formToShow === signupFormContainer) {
            confirmPasswordGroup.classList.remove("visible");
            confirmPasswordInput.value = "";
            confirmPasswordInput.required = false;
          }
        }, 350);
      }

      // Clear all messages
      function clearMessages() {
        [loginMessage, signupMessage, forgotPasswordMessage].forEach(
          (message) => {
            message.textContent = "";
            message.classList.remove(
              "active",
              "success-message",
              "error-message",
            );
          },
        );
      }

      // Show message function
      function showMessage(messageElement, message, type) {
        messageElement.textContent = message;
        messageElement.className = `message ${type}-message active`;
        messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      // Toggle password visibility
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

      // Email validation
      function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

      // Password strength validation
      function isStrongPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
      }

      // Toggle confirm password field
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

      // Simulate API call
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

      // Initialize page
      document.addEventListener("DOMContentLoaded", () => {
        // Load saved theme
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
          body.classList.add("dark-theme");
          const themeIcon = document.querySelector("#themeToggle i");
          themeIcon.className = "fas fa-sun";
          document.querySelector("#mobileThemeToggle i").className =
            "fas fa-sun";
          document.getElementById("mobileThemeToggle").innerHTML =
            '<i class="fas fa-sun"></i> Toggle Theme';
        }

        // Only show login form initially
        loginFormContainer.style.display = "block";
        signupFormContainer.style.display = "none";
        forgotPasswordFormContainer.style.display = "none";

        // Set all logos to use the same image
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

        // Smooth scroll to top
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

      // Password toggle buttons
      toggleLoginPasswordBtn.addEventListener("click", () => {
        togglePasswordVisibility("loginPassword", toggleLoginPasswordBtn);
      });

      toggleSignupPasswordBtn.addEventListener("click", () => {
        togglePasswordVisibility("signupPassword", toggleSignupPasswordBtn);
      });

      toggleConfirmPasswordBtn.addEventListener("click", () => {
        togglePasswordVisibility("confirmPassword", toggleConfirmPasswordBtn);
      });

      // Signup password input listener
      signupPasswordInput.addEventListener("input", toggleConfirmPasswordField);

      // Form submissions
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
          showMessage(
            loginMessage,
            "Please enter a valid email address",
            "error",
          );
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
                `Welcome back! Login successful.\n\nEmail: ${email}\nRemember me: ${
                  rememberMe ? "Yes" : "No"
                }\n\n(In a real app, you would be redirected to the dashboard.)`,
              );

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
          showMessage(
            loginMessage,
            "An error occurred. Please try again.",
            "error",
          );
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
          showMessage(
            signupMessage,
            "Please enter a valid email address",
            "error",
          );
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
          const result = await simulateApiCall(
            { name, email, password },
            "signup",
          );

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
                showForm(loginFormContainer);
                document.getElementById("loginEmail").value = email;
              }, 1500);
            }, 1000);
          } else {
            showMessage(signupMessage, result.message, "error");
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
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
            showForm(loginFormContainer);
          }, 3000);
        }, 1500);
      });

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
    