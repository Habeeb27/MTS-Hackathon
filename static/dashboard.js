      const themeToggle = document.getElementById("themeToggle");
      const chatThemeToggle = document.getElementById("chatThemeToggle");
<<<<<<< HEAD
      const assessmentThemeToggle = document.getElementById("assessmentThemeToggle");
=======
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
      const roadmapThemeToggle = document.getElementById("roadmapThemeToggle");
      const historyBtn = document.getElementById("historyBtn");
      const newChatBtn = document.getElementById("newChatBtn");
      const closeSidebar = document.getElementById("closeSidebar");
      const sidebar = document.getElementById("sidebar");
      const questionnaireOverlay = document.getElementById("questionnaireOverlay");
      const questionnaireContainer = document.getElementById("questionnaireContainer");
      const cardsGrid = document.getElementById("cardsGrid");
      const aiChatCard = document.getElementById("aiChatCard");
<<<<<<< HEAD
      const assessmentCard = document.getElementById("assessmentCard");
=======
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
      const roadmapCard = document.getElementById("roadmapCard");
      const connectCard = document.getElementById("connectCard");
      const chatPage = document.getElementById("chatPage");
      const chatNavbar = document.getElementById("chatNavbar");
<<<<<<< HEAD
      const assessmentPage = document.getElementById("assessmentPage");
      const assessmentNavbar = document.getElementById("assessmentNavbar");
=======
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
      const roadmapPage = document.getElementById("roadmapPage");
      const roadmapNavbar = document.getElementById("roadmapNavbar");
      const dashboardContainer = document.getElementById("dashboardContainer");
      const chatInput = document.getElementById("chatInput");
      const chatSendBtn = document.getElementById("chatSendBtn");
      const chatMessages = document.getElementById("chatMessages");
      const chatHistory = document.getElementById("chatHistory");
      const emptyHistory = document.getElementById("emptyHistory");
      const backToDashboard = document.getElementById("backToDashboard");
      const backToDashboardFromRoadmap = document.getElementById("backToDashboardFromRoadmap");
      const profileBtn = document.getElementById("profileBtn");
      const profileDropdown = document.getElementById("profileDropdown");
      const profileName = document.getElementById("profileName");
      const profileEmail = document.getElementById("profileEmail");
      const profileDetails = document.getElementById("profileDetails");
      const logoutBtn = document.getElementById("logoutBtn");
      const welcomeMessage = document.getElementById("welcomeMessage");
      const welcomeText = document.getElementById("welcomeText");
      const roadmapCardsGrid = document.getElementById("roadmapCardsGrid");
      const dashboardBackground = document.getElementById("dashboardBackground");
      const body = document.body;

      // The cards buttons
      const startChatBtn = document.getElementById("startChatBtn");
<<<<<<< HEAD
      const startAssessmentBtn = document.getElementById("startAssessmentBtn");
=======
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
      const startRoadmapBtn = document.getElementById("startRoadmapBtn");
      const startConnectBtn = document.getElementById("startConnectBtn");

      // Animation containers for cards
      const aiCardAnimation = document.getElementById("aiCardAnimation");
<<<<<<< HEAD
      const assessmentCardAnimation = document.getElementById("assessmentCardAnimation");
=======
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
      const roadmapCardAnimation = document.getElementById("roadmapCardAnimation");
      const connectCardAnimation = document.getElementById("connectCardAnimation");

      // User data storage
      let userData = {
        age: "",
        careerPath: "",
        isStudent: "",
        level: "",
      };

      // Questions for the logged in user
      let questions = [];
      let currentQuestionIndex = 0;

      // Chat history
      let chatSessions = [];

      // Initialize dashboard background circles
      function createDashboardBackground() {
        dashboardBackground.innerHTML = "";
        
        // Create 15-20 background circles
        for (let i = 0; i < 20; i++) {
          const circle = document.createElement("div");
          circle.className = "background-circle";
          
          // Random size between 50px and 200px
          const size = Math.random() * 150 + 50;
          
          // Random position
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          
          // Random animation delay
          const delay = Math.random() * 10;
          
          // Random animation duration
          const duration = Math.random() * 10 + 15;
          
          circle.style.width = `${size}px`;
          circle.style.height = `${size}px`;
          circle.style.left = `${left}%`;
          circle.style.top = `${top}%`;
          circle.style.animationDelay = `${delay}s`;
          circle.style.animationDuration = `${duration}s`;
          circle.style.opacity = Math.random() * 0.1 + 0.05;
          
          dashboardBackground.appendChild(circle);
        }
      }

      // Changing the theme
      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
          body.classList.add("dark-theme");
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          chatThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
<<<<<<< HEAD
          if (assessmentThemeToggle) {
            assessmentThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          }
=======
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
          if (roadmapThemeToggle) {
            roadmapThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          }
        }
      }

      // Theme toggle functionality
      themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-theme");

        if (body.classList.contains("dark-theme")) {
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          localStorage.setItem("theme", "dark");
        } else {
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
          localStorage.setItem("theme", "light");
        }
      });

      chatThemeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-theme");

        if (body.classList.contains("dark-theme")) {
          chatThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          localStorage.setItem("theme", "dark");
        } else {
          chatThemeToggle.innerHTML = '<i class="fas fa-moon"></i>';
          localStorage.setItem("theme", "light");
        }
      });

      if (roadmapThemeToggle) {
        roadmapThemeToggle.addEventListener("click", () => {
          body.classList.toggle("dark-theme");

          if (body.classList.contains("dark-theme")) {
            roadmapThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem("theme", "dark");
          } else {
            roadmapThemeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem("theme", "light");
          }
        });
      }

      // Sidebar functionality
      historyBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
        updateChatHistoryDisplay();
      });

      closeSidebar.addEventListener("click", () => {
        sidebar.classList.remove("active");
      });

      // New chat functionality
      newChatBtn.addEventListener("click", () => {
        // Clear current chat
        chatMessages.innerHTML = `
          <div class="message ai">
            Hello! I'm your Pathfinder AI assistant. How can I help you with your career journey today?
            <div class="message-time">Just now</div>
          </div>
        `;
        chatInput.value = "";
        chatInput.focus();
      });

      // Profile dropdown
      profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle("active");
      });

      document.addEventListener("click", (e) => {
        if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
          profileDropdown.classList.remove("active");
        }
      });

      // Update profile details
      function updateProfileDetails() {
        profileName.textContent = "Student User";
        profileEmail.textContent = "student@example.com";

        profileDetails.innerHTML = "";

        const details = [
          { label: "Age", value: userData.age || "Not specified" },
          {
            label: "Career Path",
            value: userData.careerPath || "Not specified",
          },
          {
            label: "Student Status",
            value: userData.isStudent || "Not specified",
          },
        ];

        if (userData.isStudent === "Yes") {
          details.push({ label: "Level", value: userData.level || "Not specified" });
        }

        details.forEach((detail, index) => {
          const item = document.createElement("div");
          item.className = "profile-item";
          item.style.animationDelay = `${index * 0.1}s`;
          item.innerHTML = `
            <span class="profile-label">${detail.label}</span>
            <span class="profile-value">${detail.value}</span>
          `;
          profileDetails.appendChild(item);
        });
      }

      // Questionnaire functions
      function showCurrentQuestion() {
        if (currentQuestionIndex >= questions.length) {
          completeQuestionnaire();
          return;
        }

        const question = questions[currentQuestionIndex];

        let questionHTML = `
          <h2 class="question-title">Welcome to Pathfinder!</h2>
          <p class="question-text">${question.text}</p>
        `;

        if (question.type === "choice") {
          questionHTML += `
            <div class="btn-group">
              ${question.options
                .map(
                  (option) => `
                  <button class="question-btn btn-secondary" data-value="${option}">
                    ${option}
                  </button>
                `
                )
                .join("")}
            </div>
          `;
        } else if (question.type === "select") {
          questionHTML += `
            <select class="question-input" id="questionInput">
              <option value="">Select your level</option>
              ${question.options
                .map(
                  (option) => `
                  <option value="${option}">${option}</option>
                `
                )
                .join("")}
            </select>
            <div class="btn-group">
              <button class="question-btn btn-primary" id="nextBtn">
                Continue
              </button>
            </div>
          `;
        } else {
          questionHTML += `
            <input type="${question.type}"
                   class="question-input"
                   id="questionInput"
                   placeholder="${question.placeholder}"
                   ${question.required ? "required" : ""}
                   autocomplete="off">
            <div class="btn-group">
              <button class="question-btn btn-primary" id="nextBtn">
                Continue
              </button>
            </div>
          `;
        }

        questionnaireContainer.innerHTML = questionHTML;

        if (question.type === "choice") {
          const buttons = questionnaireContainer.querySelectorAll(".btn-secondary");
          buttons.forEach((button) => {
            button.addEventListener("click", (e) => {
              const value = e.target.getAttribute("data-value");
              handleAnswer(question.id, value);
            });
          });
        } else {
          const nextBtn = document.getElementById("nextBtn");
          if (nextBtn) {
            nextBtn.addEventListener("click", () => {
              const input = document.getElementById("questionInput");
              const value = question.type === "select" ? input.value : input.value.trim();

              if (question.required && !value) {
                alert("Please provide an answer");
                return;
              }

              handleAnswer(question.id, value);
            });
          }

          // Add Enter key support
          if (question.type === "text" || question.type === "number" || question.type === "email") {
            const input = document.getElementById("questionInput");
            input.addEventListener("keypress", (e) => {
              if (e.key === "Enter") {
                const nextBtn = document.getElementById("nextBtn");
                nextBtn.click();
              }
            });

            setTimeout(() => {
              input.focus();
            }, 100);
          }
        }

        questionnaireContainer.style.opacity = "0";
        questionnaireContainer.style.transform = "translateY(20px)";

        setTimeout(() => {
          questionnaireContainer.style.transition = "all 0.3s ease";
          questionnaireContainer.style.opacity = "1";
          questionnaireContainer.style.transform = "translateY(0)";
        }, 10);
      }

      function handleAnswer(questionId, answer) {
        userData[questionId] = answer;

        questionnaireContainer.style.opacity = "0";
        questionnaireContainer.style.transform = "translateY(-20px)";

        setTimeout(() => {
          currentQuestionIndex++;
          showCurrentQuestion();
        }, 300);
      }

      // Backend API call to save questionnaire
      async function completeQuestionnaire() {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          console.error("User email not found");
          return;
        }

        try {
          const response = await fetch("/save-questionnaire", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userEmail,
              answers: userData,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            welcomeText.textContent = `Welcome to Pathfinder!`;
            welcomeMessage.style.display = "block";

            updateProfileDetails();

            questionnaireOverlay.style.opacity = "0";

            setTimeout(() => {
              questionnaireOverlay.style.display = "none";
              // Start bubble animations for cards
              startBubbleAnimations();
            }, 500);
          } else {
            console.error("Failed to save questionnaire:", data.message);
            alert("Failed to save your answers. Please try again.");
          }
        } catch (error) {
          console.error("Error saving questionnaire:", error);
          alert("An error occurred while saving your answers.");
        }
      }

      // Bubble animation for cards
      function createBubbles(container) {
        // Clear any existing bubbles
        if (!container) return;
        container.innerHTML = "";

        // Create 10-15 bubbles at random positions
        for (let i = 0; i < 15; i++) {
          const bubble = document.createElement("div");
          bubble.className = "bubble";

          // Random size between 5px and 25px
          const size = Math.random() * 20 + 5;

          // Random position
          const left = Math.random() * 100;
          const top = Math.random() * 100;

          // Random animation delay
          const delay = Math.random() * 2;

          // Random animation duration
          const duration = Math.random() * 2 + 2;

          bubble.style.width = `${size}px`;
          bubble.style.height = `${size}px`;
          bubble.style.left = `${left}%`;
          bubble.style.top = `${top}%`;
          bubble.style.animationDelay = `${delay}s`;
          bubble.style.animationDuration = `${duration}s`;

          container.appendChild(bubble);
        }
      }

      function startBubbleAnimations() {
        // Create bubble animations for each card
        createBubbles(aiCardAnimation);
        createBubbles(roadmapCardAnimation);
        createBubbles(connectCardAnimation);

        // Refresh bubbles every 4 seconds
        setInterval(() => {
          createBubbles(aiCardAnimation);
          createBubbles(roadmapCardAnimation);
          createBubbles(connectCardAnimation);
        }, 4000);
      }

      // Start button click handlers
      startChatBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent card click
        createBubbleBurst(aiChatCard);
        setTimeout(() => {
          showChatPage();
        }, 500);
      });

<<<<<<< HEAD
      startAssessmentBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent card click
        createBubbleBurst(assessmentCard);
        setTimeout(() => {
          showAssessmentPage();
        }, 500);
      });

=======
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
      startRoadmapBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent card click
        createBubbleBurst(roadmapCard);
        setTimeout(() => {
          showRoadmapPage();
        }, 500);
      });

      startConnectBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent card click
        createBubbleBurst(connectCard);
        setTimeout(() => {
          // Will navigate via the link
        }, 500);
      });

      // Card click handlers (still work for clicking anywhere on card)
      aiChatCard.addEventListener("click", () => {
        createBubbleBurst(aiChatCard);
        setTimeout(() => {
          showChatPage();
        }, 500);
      });

<<<<<<< HEAD
      assessmentCard.addEventListener("click", () => {
        createBubbleBurst(assessmentCard);
        setTimeout(() => {
          showAssessmentPage();
        }, 500);
      });

=======
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
      roadmapCard.addEventListener("click", () => {
        createBubbleBurst(roadmapCard);
        setTimeout(() => {
          showRoadmapPage();
        }, 500);
      });

      connectCard.addEventListener("click", () => {
        createBubbleBurst(connectCard);
        setTimeout(() => {
          // Will navigate via the link
        }, 500);
      });

      // Bubble burst effect on click
      function createBubbleBurst(card) {
        const container = card.querySelector(".card-animation-container");
        if (!container) return;

        // Create 20 burst bubbles
        for (let i = 0; i < 20; i++) {
          const bubble = document.createElement("div");
          bubble.className = "bubble";

          // Random size between 10px and 40px
          const size = Math.random() * 30 + 10;

          // Start from center
          const startX = 50;
          const startY = 50;

          // Random direction
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 100 + 50;

          bubble.style.width = `${size}px`;
          bubble.style.height = `${size}px`;
          bubble.style.left = `${startX}%`;
          bubble.style.top = `${startY}%`;
          bubble.style.transform = `translate(-50%, -50%)`;
          bubble.style.animation = `bubbleFloat 1s ease-out forwards`;
          bubble.style.animationDelay = `0s`;

          // Calculate end position
          setTimeout(() => {
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;
            bubble.style.left = `${endX}%`;
            bubble.style.top = `${endY}%`;
          }, 10);

          container.appendChild(bubble);

          // Remove bubble after animation
          setTimeout(() => {
            if (bubble.parentNode === container) {
              bubble.remove();
            }
          }, 1000);
        }
      }

      // Show chat page
      function showChatPage(initialMessage = "") {
        dashboardContainer.style.opacity = "0";
        dashboardContainer.style.transform = "scale(0.95)";

        setTimeout(() => {
          dashboardContainer.style.display = "none";

          chatNavbar.classList.add("active");

          chatPage.classList.add("active");

          if (initialMessage) {
            chatInput.value = initialMessage;
            setTimeout(() => {
              sendChatMessage();
            }, 500);
          } else {
            setTimeout(() => {
              chatInput.focus();
            }, 300);
          }
        }, 500);
      }

<<<<<<< HEAD
      // Show assessment page
      function showAssessmentPage() {
        dashboardContainer.style.opacity = "0";
        dashboardContainer.style.transform = "scale(0.95)";

        setTimeout(() => {
          dashboardContainer.style.display = "none";

          assessmentNavbar.classList.add("active");

          assessmentPage.classList.add("active");

          startCareerAssessment();
        }, 500);
      }

=======
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
      // Show roadmap page
      function showRoadmapPage() {
        dashboardContainer.style.opacity = "0";
        dashboardContainer.style.transform = "scale(0.95)";

        setTimeout(() => {
          dashboardContainer.style.display = "none";

          roadmapNavbar.classList.add("active");

          roadmapPage.classList.add("active");

          createRoadmapVisualization();
        }, 500);
      }

      // Create roadmap visualization with cards side by side
      function createRoadmapVisualization() {
        roadmapCardsGrid.innerHTML = "";

        // Create 6 roadmap cards in a grid
        const cardData = [
          {
            title: "Self-Assessment",
            description: "Identify your strengths, interests, and values to understand your career potential",
            icon: "fas fa-search",
            color: "#1a237e",
          },
          {
            title: "Skill Development",
            description: "Learn essential skills and competencies for your chosen career path",
            icon: "fas fa-graduation-cap",
            color: "#283593",
          },
          {
            title: "Education Planning",
            description: "Plan your educational path, courses, and certifications needed",
            icon: "fas fa-book",
            color: "#3949ab",
          },
          {
            title: "Career Exploration",
            description: "Explore different career options, industries, and growth opportunities",
            icon: "fas fa-briefcase",
            color: "#5c6bc0",
          },
          {
            title: "Networking Strategy",
            description: "Build professional connections and network within your industry",
            icon: "fas fa-network-wired",
            color: "#1a237e",
          },
          {
            title: "Goal Setting",
            description: "Set SMART goals and create actionable steps to achieve them",
            icon: "fas fa-bullseye",
            color: "#283593",
          },
        ];

        // Create cards and add them to the grid
        cardData.forEach((card, index) => {
          const cardElement = document.createElement("div");
          cardElement.className = "roadmap-card";
          cardElement.innerHTML = `
            <div class="card-animation-container"></div>
            <div class="roadmap-card-icon">
              <i class="${card.icon}"></i>
            </div>
            <h3 class="roadmap-card-title">${card.title}</h3>
            <p class="roadmap-card-desc">${card.description}</p>
          `;

          roadmapCardsGrid.appendChild(cardElement);

          // Add bubble animation to each roadmap card
          setTimeout(() => {
            const container = cardElement.querySelector(".card-animation-container");
            createBubbles(container);
          }, 100);
        });

        // Refresh bubble animations every 4 seconds
        setInterval(() => {
          const containers = document.querySelectorAll(".roadmap-card .card-animation-container");
          containers.forEach((container) => {
            createBubbles(container);
          });
        }, 4000);
      }

      // Go back to dashboard
      function goBackToDashboard() {
        chatPage.classList.remove("active");
<<<<<<< HEAD
        assessmentPage.classList.remove("active");
        roadmapPage.classList.remove("active");

        chatNavbar.classList.remove("active");
        assessmentNavbar.classList.remove("active");
=======
        roadmapPage.classList.remove("active");

        chatNavbar.classList.remove("active");
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
        roadmapNavbar.classList.remove("active");

        sidebar.classList.remove("active");

        setTimeout(() => {
          dashboardContainer.style.display = "block";
          dashboardContainer.style.opacity = "0";
          dashboardContainer.style.transform = "scale(0.95)";

          setTimeout(() => {
            dashboardContainer.style.transition = "all 0.5s ease";
            dashboardContainer.style.opacity = "1";
            dashboardContainer.style.transform = "scale(1)";
          }, 50);
        }, 300);
      }

      // Logout function
      function logout() {
        // Clear frontend storage
        localStorage.removeItem("userData");
        localStorage.removeItem("userEmail");

        // Reset user data
        userData = {
          age: "",
          careerPath: "",
          isStudent: "",
          level: "",
        };

        // Update UI
        welcomeText.textContent = "Welcome to Pathfinder!";
        profileDetails.innerHTML = "";
        profileName.textContent = "";
        profileEmail.textContent = "";
        profileDropdown.classList.remove("active");

        // Navigate back if needed
<<<<<<< HEAD
        if (chatPage.classList.contains("active") || assessmentPage.classList.contains("active") || roadmapPage.classList.contains("active")) {
=======
        if (chatPage.classList.contains("active") || roadmapPage.classList.contains("active")) {
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
          goBackToDashboard();
        }

        // Redirect to login
        window.location.href = "/login";
      }

      // Chat functions
<<<<<<< HEAD
      async function sendChatMessage() {
=======
      function sendChatMessage() {
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage(message, "user");

        chatInput.value = "";

<<<<<<< HEAD
        // Check if career assessment is in progress
        if (assessmentInProgress) {
          handleAssessmentResponse(message);
          return;
        }

        // Check if career selection is pending
        if (window.careerOptions) {
          handleCareerSelection(message);
          return;
        }

        // Check for assessment trigger
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('assessment') || lowerMessage.includes('career test') || lowerMessage.includes('evaluate me')) {
          startCareerAssessment();
          return;
        }

        showTypingIndicator();

        try {
          const response = await fetch('/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
          });

          const data = await response.json();

          removeTypingIndicator();

          if (response.ok && data.status === 'success') {
            addMessage(data.response, "ai");
            addToChatHistory(message);
          } else {
            addMessage("I'm sorry, I'm having trouble responding right now. Please try again later.", "ai");
          }
        } catch (error) {
          console.error('Error sending chat message:', error);
          removeTypingIndicator();
          addMessage("I'm sorry, I'm having trouble responding right now. Please try again later.", "ai");
        }
=======
        showTypingIndicator();

        setTimeout(() => {
          removeTypingIndicator();
          const aiResponse = generateAIResponse(message);
          addMessage(aiResponse, "ai");

          addToChatHistory(message);
        }, 1500);
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
      }

      function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}`;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        messageDiv.innerHTML = `
          ${text}
          <div class="message-time">${timeString}</div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      function addToChatHistory(message) {
        // Hide empty message
        if (emptyHistory.style.display !== "none") {
          emptyHistory.style.display = "none";
        }

        const now = new Date();
        const dateString =
          now.toLocaleDateString() +
          ", " +
          now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        const historyItem = document.createElement("div");
        historyItem.className = "chat-history-item";
        historyItem.innerHTML = `
          <div class="chat-history-date">${dateString}</div>
          ${message.substring(0, 50)}${message.length > 50 ? "..." : ""}
        `;

        historyItem.addEventListener("click", () => {
          addMessage("Loading previous conversation about: " + message, "ai");
        });

        chatHistory.insertBefore(historyItem, chatHistory.firstChild);

        // Store in sessions array
        chatSessions.unshift({
          id: Date.now(),
          date: dateString,
          preview: message.substring(0, 50),
          fullMessage: message,
        });
      }

      function updateChatHistoryDisplay() {
        if (chatSessions.length === 0) {
          emptyHistory.style.display = "block";
        } else {
          emptyHistory.style.display = "none";
        }
      }

      function showTypingIndicator() {
        const typingDiv = document.createElement("div");
        typingDiv.className = "message ai typing";
        typingDiv.id = "typingIndicator";
        typingDiv.innerHTML = `
          <div style="display: flex; align-items: center; gap: 5px;">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
          <div class="message-time">typing...</div>
        `;

        const style = document.createElement("style");
        style.textContent = `
          .typing-dot {
            width: 8px;
            height: 8px;
            background: var(--primary-blue);
            border-radius: 50%;
            animation: typingBounce 1.4s infinite ease-in-out;
          }
          .dark-theme .typing-dot {
            background: var(--light-blue);
          }
          .typing-dot:nth-child(1) { animation-delay: -0.32s; }
          .typing-dot:nth-child(2) { animation-delay: -0.16s; }
          .typing-dot:nth-child(3) { animation-delay: 0s; }
          @keyframes typingBounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `;
        document.head.appendChild(style);

        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      function removeTypingIndicator() {
        const typingIndicator = document.getElementById("typingIndicator");
        if (typingIndicator) {
          typingIndicator.remove();
        }
      }

      // Load questions from database
      async function loadQuestions() {
        try {
          const response = await fetch("/get-questions");
          const data = await response.json();
          if (data.status === "success") {
            questions = data.questions;
          } else {
            console.error("Failed to load questions:", data.message);
            // Fallback to default questions
            questions = getDefaultQuestions();
          }
        } catch (error) {
          console.error("Error loading questions:", error);
          // Fallback to default questions
          questions = getDefaultQuestions();
        }
      }

      // Default questions if backend fails
      function getDefaultQuestions() {
        return [
          {
            id: "age",
            text: "How old are you?",
            type: "number",
            placeholder: "Enter your age",
            required: true,
          },
          {
            id: "careerPath",
            text: "What's your current or desired career path?",
            type: "text",
            placeholder: "e.g., Software Engineering, Medicine, Business",
            required: true,
          },
          {
            id: "isStudent",
            text: "Are you currently a student?",
            type: "choice",
            options: ["Yes", "No"],
            required: true,
          },
          {
            id: "level",
            text: "Which educational level are you in?",
            type: "select",
            options: ["Undergraduate", "High School", "Graduate", "Professional"],
            required: false,
            showIf: "Yes",
          },
        ];
      }

<<<<<<< HEAD

=======
      // AI response generator
      function generateAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        // Simulated AI responses
        const responses = {
          career: "Based on your profile, I'd recommend exploring courses in that field. Would you like specific recommendations?",
          goal: "That's a great career goal! Let me help you create a roadmap to achieve that.",
          balance: "Balancing studies and income is crucial. I recommend exploring part-time remote work or freelancing opportunities.",
          skill: "Skill development is key to career success. Based on your interests, I suggest focusing on both technical and soft skills.",
          course: "For your educational path, I recommend courses that combine theoretical knowledge with practical applications.",
          help: "I'm here to help! Tell me more about what specific areas you need assistance with.",
          future: "Planning for the future is important. Let's discuss your long-term goals and create a step-by-step plan.",
        };

        if (lowerMessage.includes("career") || lowerMessage.includes("path")) {
          return responses.career;
        } else if (lowerMessage.includes("goal") || lowerMessage.includes("future")) {
          return responses.goal;
        } else if (lowerMessage.includes("balance") || lowerMessage.includes("income")) {
          return responses.balance;
        } else if (lowerMessage.includes("skill") || lowerMessage.includes("learn")) {
          return responses.skill;
        } else if (lowerMessage.includes("course") || lowerMessage.includes("study")) {
          return responses.course;
        } else if (lowerMessage.includes("help")) {
          return responses.help;
        } else {
          return responses.future;
        }
      }
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9

      // Initialize the application
      async function init() {
        // Initialize frontend features
        initTheme();
        
        // Create dashboard background circles
        createDashboardBackground();

        // Load questions from backend
        await loadQuestions();

        // Check user authentication and questionnaire status
        await checkUserStatus();

        // Set up event listeners
        setupEventListeners();
      }

      // Check user status with backend
      async function checkUserStatus() {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
          try {
            const response = await fetch(`/get-profile?email=${encodeURIComponent(userEmail)}`);
            const data = await response.json();

            if (response.ok && data.status === "success") {
              const profile = data.profile;
              // Check if questionnaire fields are filled
              if (profile.age && profile.career_path && profile.is_student !== null) {
                // User has already filled questionnaire, load data
                userData = {
                  age: profile.age ? profile.age.toString() : "",
                  careerPath: profile.career_path || "",
                  isStudent: profile.is_student ? "Yes" : "No",
                  level: profile.level || "",
                };
                questionnaireOverlay.style.display = "none";

                welcomeText.textContent = `Welcome to Pathfinder!`;
                welcomeMessage.style.display = "block";

                updateProfileDetails();

                // Start bubble animations for cards
                startBubbleAnimations();
              } else {
                // User hasn't filled questionnaire yet
                questionnaireOverlay.style.display = "flex";
                showCurrentQuestion();
              }
            } else {
              // Error fetching profile, show questionnaire
              questionnaireOverlay.style.display = "flex";
              showCurrentQuestion();
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
            // On error, show questionnaire
            questionnaireOverlay.style.display = "flex";
            showCurrentQuestion();
          }
        } else {
          // No user email, redirect to login
          window.location.href = "/login";
        }
      }

      // Set up event listeners
      function setupEventListeners() {
        // Chat event listeners
        chatSendBtn.addEventListener("click", sendChatMessage);
        chatInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            sendChatMessage();
          }
        });

        // Navigation event listeners
        backToDashboard.addEventListener("click", goBackToDashboard);
        backToDashboardFromRoadmap.addEventListener("click", goBackToDashboard);
<<<<<<< HEAD
        const backToDashboardFromAssessment = document.getElementById("backToDashboardFromAssessment");
        if (backToDashboardFromAssessment) {
          backToDashboardFromAssessment.addEventListener("click", goBackToDashboard);
        }
=======
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9

        // Logout event listener
        logoutBtn.addEventListener("click", logout);
      }

<<<<<<< HEAD
      // Career Assessment Variables
      let assessmentQuestions = [];
      let currentAssessmentQuestion = 0;
      let assessmentAnswers = {};
      let assessmentInProgress = false;

      // Career Assessment Functions
      async function startCareerAssessment() {
        try {
          const response = await fetch('/get-assessment-questions');
          const data = await response.json();

          if (response.ok && data.status === 'success') {
            assessmentQuestions = data.questions;
            assessmentAnswers = {};
            currentAssessmentQuestion = 0;
            assessmentInProgress = true;

            addMessage("Great! Let's start your career assessment. I'll ask you 10 questions to help identify the best career paths for you. You can answer them in any order - just let me know which question you'd like to answer first!", "ai");

            showAssessmentOptions();
          } else {
            addMessage("Sorry, I'm having trouble starting the assessment right now. Please try again later.", "ai");
          }
        } catch (error) {
          console.error('Error starting assessment:', error);
          addMessage("Sorry, I'm having trouble starting the assessment right now. Please try again later.", "ai");
        }
      }

      function showAssessmentOptions() {
        if (currentAssessmentQuestion >= assessmentQuestions.length) {
          // All questions answered, submit assessment
          submitAssessment();
          return;
        }

        const unansweredQuestions = assessmentQuestions.filter(q => !assessmentAnswers.hasOwnProperty(q.id));

        if (unansweredQuestions.length === 0) {
          submitAssessment();
          return;
        }

        let optionsHTML = "Here are the remaining questions you can answer:\n\n";
        unansweredQuestions.forEach((question, index) => {
          optionsHTML += `${index + 1}. ${question.question}\n`;
        });
        optionsHTML += "\nReply with the number of the question you'd like to answer, or type 'done' to finish the assessment.";

        addMessage(optionsHTML, "ai");
      }

      function handleAssessmentResponse(message) {
        const lowerMessage = message.toLowerCase().trim();

        if (lowerMessage === 'done' || lowerMessage === 'finish') {
          submitAssessment();
          return;
        }

        // Check if user selected a question number
        const questionNumber = parseInt(message);
        if (!isNaN(questionNumber) && questionNumber >= 1 && questionNumber <= assessmentQuestions.length) {
          const questionIndex = questionNumber - 1;
          const question = assessmentQuestions[questionIndex];

          if (assessmentAnswers.hasOwnProperty(question.id)) {
            addMessage(`You've already answered question ${questionNumber}. Please choose a different question or type 'done' to finish.`, "ai");
            showAssessmentOptions();
            return;
          }

          // Ask the specific question
          addMessage(`Question ${questionNumber}: ${question.question}`, "ai");

          // Store that we're waiting for this question's answer
          assessmentAnswers[question.id] = null; // Placeholder
          return;
        }

        // Check if we're waiting for a specific question answer
        const waitingQuestion = assessmentQuestions.find(q => assessmentAnswers[q.id] === null);
        if (waitingQuestion) {
          // This is the answer to the current question
          assessmentAnswers[waitingQuestion.id] = message;

          addMessage(`Thanks for your answer! Question recorded.`, "ai");

          currentAssessmentQuestion++;
          showAssessmentOptions();
          return;
        }

        // Default response
        addMessage("Please reply with a question number (1-10) to answer that question, or type 'done' to finish the assessment.", "ai");
      }

      async function submitAssessment() {
        assessmentInProgress = false;

        addMessage("Great! I've collected your answers. Let me analyze them and provide you with personalized career suggestions. This may take a moment...", "ai");

        showTypingIndicator();

        try {
          const response = await fetch('/submit-assessment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers: assessmentAnswers })
          });

          const data = await response.json();

          removeTypingIndicator();

          if (response.ok && data.status === 'success') {
            displayCareerSuggestions(data.analysis);
          } else {
            addMessage("Sorry, I had trouble analyzing your assessment. Please try again later.", "ai");
          }
        } catch (error) {
          console.error('Error submitting assessment:', error);
          removeTypingIndicator();
          addMessage("Sorry, I had trouble analyzing your assessment. Please try again later.", "ai");
        }
      }

      function displayCareerSuggestions(analysis) {
        let suggestionsHTML = `🎯 **Career Assessment Results**\n\n`;
        suggestionsHTML += `${analysis.summary}\n\n`;
        suggestionsHTML += `**Recommended Career Paths:**\n\n`;

        analysis.careers.forEach((career, index) => {
          suggestionsHTML += `${index + 1}. **${career.title}**\n`;
          suggestionsHTML += `   ${career.description}\n`;
          suggestionsHTML += `   💼 **Skills:** ${career.skills.join(', ')}\n`;
          suggestionsHTML += `   🎓 **Education:** ${career.education}\n`;
          suggestionsHTML += `   💰 **Salary Range:** ${career.salary_range}\n`;
          suggestionsHTML += `   📈 **Outlook:** ${career.outlook}\n\n`;
          suggestionsHTML += `   **Next Steps:**\n`;
          career.action_steps.forEach(step => {
            suggestionsHTML += `   • ${step}\n`;
          });
          suggestionsHTML += `\n`;
        });

        suggestionsHTML += `Reply with the number (1-3) of the career path you'd like to select as your primary career goal, or type 'none' if none appeal to you.`;

        addMessage(suggestionsHTML, "ai");

        // Store career options for selection
        window.careerOptions = analysis.careers;
      }

      async function handleCareerSelection(message) {
        const lowerMessage = message.toLowerCase().trim();

        if (lowerMessage === 'none') {
          addMessage("No problem! You can always retake the assessment later or explore other options. Feel free to ask me anything else about career guidance!", "ai");
          window.careerOptions = null;
          return;
        }

        const selectionNumber = parseInt(message);
        if (!isNaN(selectionNumber) && selectionNumber >= 1 && selectionNumber <= 3 && window.careerOptions) {
          const selectedCareer = window.careerOptions[selectionNumber - 1];

          // Get user email from localStorage
          const userEmail = localStorage.getItem("userEmail");
          if (!userEmail) {
            addMessage("I need to know your email to save your career selection. Please make sure you're logged in.", "ai");
            return;
          }

          try {
            const response = await fetch('/select-career', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: userEmail,
                career_title: selectedCareer.title
              })
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
              addMessage(`Perfect! I've saved "${selectedCareer.title}" as your primary career goal. You can view your updated profile in the top-right corner. Is there anything specific about this career path you'd like to know more about?`, "ai");

              // Update profile details
              updateProfileDetails();
            } else {
              addMessage("I saved your career selection, but there was an issue updating your profile. You can still see your selection in our conversation!", "ai");
            }
          } catch (error) {
            console.error('Error saving career selection:', error);
            addMessage("I saved your career selection, but there was an issue updating your profile. You can still see your selection in our conversation!", "ai");
          }

          window.careerOptions = null;
          return;
        }

        addMessage("Please reply with a number (1-3) to select a career path, or 'none' if none appeal to you.", "ai");
      }

      // Initialize when DOM is loaded
      document.addEventListener("DOMContentLoaded", init);
=======
      // Initialize when DOM is loaded
      document.addEventListener("DOMContentLoaded", init);
>>>>>>> 14434cc07aaed12711de37b217337c9331a0a6a9
