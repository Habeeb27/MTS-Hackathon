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
        );

        const signupPasswordInput = document.getElementById("signupPassword");
        const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
        const confirmPasswordInput = document.getElementById("confirmPassword");

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