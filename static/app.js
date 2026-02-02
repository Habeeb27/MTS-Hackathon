// DOM Elements
        const themeToggle = document.getElementById("themeToggle");
        const menuToggle = document.getElementById("menuToggle");
        const mobileMenu = document.getElementById("mobileMenu");
        const contactForm = document.getElementById("contactForm");
        const popupOverlay = document.getElementById("popupOverlay");
        const popupOkButton = document.getElementById("popupOkButton");
        const popupCountdown = document.getElementById("popupCountdown");
        const countdownNumber = document.getElementById("countdownNumber");
        const popupParticles = document.getElementById("popupParticles");
        const body = document.body;

        const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvqoarv";

        let countdownTimer = null;
        let countdownSeconds = 5;
        let autoCloseTimer = null;

        // -------------------------
        // Create Floating Particles
        // -------------------------
        function createParticles() {
            popupParticles.innerHTML = '';
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random size
                const size = Math.random() * 3 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random animation delay
                particle.style.animationDelay = `${Math.random() * 15}s`;
                
                // Random color opacity
                const opacity = Math.random() * 0.4 + 0.3;
                particle.style.opacity = opacity;
                
                popupParticles.appendChild(particle);
            }
        }

        // -------------------------
        // Popup Functions
        // -------------------------
        function showPopup() {
            // Create particles
            createParticles();
            
            // Show popup with animations
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset countdown
            countdownSeconds = 5;
            updateCountdown();
            
            // Start countdown timer
            countdownTimer = setInterval(() => {
                countdownSeconds--;
                updateCountdown();
                
                if (countdownSeconds <= 0) {
                    closePopup();
                }
            }, 1000);
            
            // Auto-close after 5 seconds
            autoCloseTimer = setTimeout(() => {
                if (popupOverlay.classList.contains('active')) {
                    closePopup();
                }
            }, 5000);
        }

        function updateCountdown() {
            countdownNumber.textContent = countdownSeconds;
            popupCountdown.innerHTML = `Auto-closing in <span class="countdown-number">${countdownSeconds}</span> seconds`;
        }

        function closePopup() {
            // Clear timers
            if (countdownTimer) {
                clearInterval(countdownTimer);
            }
            if (autoCloseTimer) {
                clearTimeout(autoCloseTimer);
            }
            
            // Hide popup with animation
            popupOverlay.classList.remove('active');
            
            // Wait for animation to complete before restoring scroll
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 500);
        }

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
        // FORMSPREE FORM HANDLING
        // -------------------------
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;
            
            try {
                // Get form data
                const formData = new FormData(contactForm);
                
                // Send to Formspree
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success popup
                    showPopup();
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Scroll to top smoothly
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // Handle Formspree error
                    const errorData = await response.json();
                    console.error('Formspree error:', errorData);
                    alert('Sorry, there was an error sending your message. Please try again.');
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('Network error. Please check your connection and try again.');
            } finally {
                // Restore button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });

        // -------------------------
        // Popup Button Event
        // -------------------------
        popupOkButton.addEventListener('click', closePopup);

        // -------------------------
        // Close popup when clicking outside
        // -------------------------
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopup();
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
        // Quick Chatbot Logic
        // -------------------------
        document.addEventListener("DOMContentLoaded", () => {
            const chatbox = document.getElementById("chatbox");
            if (!chatbox) return;

            const questions = [
                {
                    key: "interest",
                    text: "👋 Hi! Let's start. What do you enjoy doing the most?",
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
                    options: ["Student", "Graduate", "Working professional", "Career switcher"]
                },
                {
                    key: "goal",
                    text: "What do you want most from your career?",
                    options: ["High income", "Stability", "Flexibility / remote work", "Impact & creativity"]
                },
                {
                    key: "effort",
                    text: "How much time can you realistically commit weekly?",
                    options: ["Less than 5 hours", "5-10 hours", "10-20 hours", "20+ hours"]
                }
            ];

            let currentQuestion = 0;
            let answers = {};

            function addMessage(text, sender = "bot") {
                const msg = document.createElement("div");
                msg.className = `chat-message ${sender}`;
                msg.textContent = text;
                chatbox.appendChild(msg);
                chatbox.scrollTop = chatbox.scrollHeight;
            }

            function showOptions(options, key) {
                const optionsDiv = document.createElement("div");
                optionsDiv.className = "user-options";

                options.forEach(option => {
                    const btn = document.createElement("button");
                    btn.textContent = option;

                    btn.onclick = () => {
                        answers[key] = option;
                        optionsDiv.remove();
                        addMessage(option, "user");
                        currentQuestion++;

                        if (currentQuestion < questions.length) {
                            setTimeout(askQuestion, 400);
                        } else {
                            setTimeout(showTeaser, 600);
                        }
                    };

                    optionsDiv.appendChild(btn);
                });

                chatbox.appendChild(optionsDiv);
                chatbox.scrollTop = chatbox.scrollHeight;
            }

            function askQuestion() {
                const q = questions[currentQuestion];
                addMessage(q.text, "bot");
                showOptions(q.options, q.key);
            }

            async function showTeaser() {
                addMessage("🔍 Analyzing your responses...");

                try {
                    const res = await fetch("/chatbot", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(answers)
                    });

                    const data = await res.json();

                    addMessage("🧭 Career Preview", "bot");
                    addMessage(data.teaser, "bot");

                    const cta = document.createElement("a");
                    cta.href = "/login";
                    cta.className = "chat-cta-btn";
                    cta.textContent = "🔐 Learn more → Create an account";

                    chatbox.appendChild(cta);
                    chatbox.scrollTop = chatbox.scrollHeight;
                } catch {
                    addMessage("⚠️ Something went wrong. Try again later.", "bot");
                }
            }

            // 🚀 START CHAT
            askQuestion();
        });