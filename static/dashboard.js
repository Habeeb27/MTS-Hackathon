const themeToggle = document.getElementById("themeToggle");
const chatThemeToggle = document.getElementById("chatThemeToggle");
const historyBtn = document.getElementById("historyBtn");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const questionnaireOverlay = document.getElementById("questionnaireOverlay");
const questionnaireContainer = document.getElementById(
  "questionnaireContainer",
);
const aiInputPane = document.getElementById("aiInputPane");
const aiInput = document.getElementById("aiInput");
const inputBtn = document.getElementById("inputBtn");
const demoPrompts = document.getElementById("demoPrompts");
const chatPage = document.getElementById("chatPage");
const chatNavbar = document.getElementById("chatNavbar");
const dashboardContainer = document.getElementById("dashboardContainer");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");
const chatMessages = document.getElementById("chatMessages");
const backToDashboard = document.getElementById("backToDashboard");
const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileDetails = document.getElementById("profileDetails");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMessage = document.getElementById("welcomeMessage");
const welcomeText = document.getElementById("welcomeText");
const body = document.body;

// User data storage - REMOVED name and email from initial data
let userData = {
  age: "",
  careerPath: "",
  isStudent: "",
  school: "",
  level: "", // Will now store 100, 200, 300, 400, or 500
};

// Questions will be loaded from the database
let questions = [];

let currentQuestionIndex = 0;

const demoPromptList = [
  "What's your desired career in life?",
  "I need help with my future goals",
  "How can you help me plan my career goals?",
  "What skills should I develop for my dream job?",
  "Can you suggest courses for my career path?",
  "How do I balance studies and income?",
  "What are the emerging careers in tech?",
];

let currentPromptIndex = 0;

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    chatThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

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

historyBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

profileBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
    profileDropdown.classList.remove("active");
  }
});

function updateProfileDetails() {
  // Since we removed name and email from questionnaire, use default values
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
    details.push(
      { label: "School", value: userData.school || "Not specified" },
      { label: "Level", value: userData.level || "Not specified" },
    );
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

function showCurrentQuestion() {
  if (currentQuestionIndex >= questions.length) {
    completeQuestionnaire();
    return;
  }

  const question = questions[currentQuestionIndex];

  if (question.showIf && userData.isStudent !== question.showIf) {
    currentQuestionIndex++;
    showCurrentQuestion();
    return;
  }

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
                        `,
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
                        `,
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
        const value =
          question.type === "select" ? input.value : input.value.trim();

        if (question.required && !value) {
          alert("Please provide an answer");
          return;
        }

        handleAnswer(question.id, value);
      });
    }

    // Add Enter key support
    if (
      question.type === "text" ||
      question.type === "number" ||
      question.type === "email"
    ) {
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

async function completeQuestionnaire() {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) {
    console.error('User email not found');
    return;
  }

  try {
    const response = await fetch('/save-questionnaire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        answers: userData
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Since we don't have a name, show generic welcome
      welcomeText.textContent = `Welcome to Pathfinder!`;
      welcomeMessage.style.display = "block";

      updateProfileDetails();

      questionnaireOverlay.style.opacity = "0";

      setTimeout(() => {
        questionnaireOverlay.style.display = "none";
      }, 500);
    } else {
      console.error('Failed to save questionnaire:', data.message);
      alert('Failed to save your answers. Please try again.');
    }
  } catch (error) {
    console.error('Error saving questionnaire:', error);
    alert('An error occurred while saving your answers.');
  }
}

function createDemoPrompts() {
  demoPrompts.innerHTML = "";

  const startIndex = currentPromptIndex % demoPromptList.length;

  for (let i = 0; i < 4; i++) {
    const promptIndex = (startIndex + i) % demoPromptList.length;
    const prompt = demoPromptList[promptIndex];

    const button = document.createElement("button");
    button.className = "demo-prompt";
    button.textContent = prompt;
    button.style.animationDelay = `${i * 0.1}s`;

    button.addEventListener("click", () => {
      aiInput.value = prompt;
      aiInput.focus();
    });

    demoPrompts.appendChild(button);
  }

  currentPromptIndex = (currentPromptIndex + 1) % demoPromptList.length;
}

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

function goBackToDashboard() {
  chatPage.classList.remove("active");

  chatNavbar.classList.remove("active");

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

function logout() {
  // Clear user data from localStorage
  localStorage.removeItem("userData");
  localStorage.removeItem("userEmail");

  // Reset user data
  userData = {
    age: "",
    careerPath: "",
    isStudent: "",
    school: "",
    level: "",
  };

  welcomeText.textContent = "Welcome to Pathfinder!";

  // Update to remember
  profileDetails.innerHTML = "";
  profileName.textContent = "";
  profileEmail.textContent = "";

  profileDropdown.classList.remove("active");

  // Go back to dashboard if in chat
  if (chatPage.classList.contains("active")) {
    goBackToDashboard();
  }

  // Redirect to login page
  window.location.href = '/login';
}

function sendChatMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, "user");

  chatInput.value = "";

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    const aiResponse = generateAIResponse(message);
    addMessage(aiResponse, "ai");

    addToChatHistory(message);
  }, 1500);
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
  const chatHistory = document.getElementById("chatHistory");
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

async function loadQuestions() {
  try {
    const response = await fetch('/get-questions');
    const data = await response.json();
    if (data.status === 'success') {
      questions = data.questions;
    } else {
      console.error('Failed to load questions:', data.message);
      // Fallback to hardcoded questions if API fails
      questions = [
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
          id: "school",
          text: "Which school are you attending?",
          type: "text",
          placeholder: "Enter your school name",
          required: false,
          showIf: "Yes",
        },
        {
          id: "level",
          text: "Which level are you in?",
          type: "select",
          options: ["100 Level", "200 Level", "300 Level", "400 Level", "500 Level"],
          required: false,
          showIf: "Yes",
        },
      ];
    }
  } catch (error) {
    console.error('Error loading questions:', error);
    // Fallback to hardcoded questions
    questions = [
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
        id: "school",
        text: "Which school are you attending?",
        type: "text",
        placeholder: "Enter your school name",
        required: false,
        showIf: "Yes",
      },
      {
        id: "level",
        text: "Which level are you in?",
        type: "select",
        options: ["100 Level", "200 Level", "300 Level", "400 Level", "500 Level"],
        required: false,
        showIf: "Yes",
      },
    ];
  }
}

function generateAIResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  const responses = {
    career:
      "Based on your profile, I'd recommend exploring courses in that field. Would you like specific recommendations?",
    goal: "That's a great career goal! Let me help you create a roadmap to achieve that.",
    balance:
      "Balancing studies and income is crucial. I recommend exploring part-time remote work or freelancing opportunities.",
    skill:
      "Skill development is key to career success. Based on your interests, I suggest focusing on both technical and soft skills.",
    course:
      "For your educational path, I recommend courses that combine theoretical knowledge with practical applications.",
    help: "I'm here to help! Tell me more about what specific areas you need assistance with.",
    future:
      "Planning for the future is important. Let's discuss your long-term goals and create a step-by-step plan.",
  };

  if (lowerMessage.includes("career") || lowerMessage.includes("path")) {
    return responses.career;
  } else if (lowerMessage.includes("goal") || lowerMessage.includes("future")) {
    return responses.goal;
  } else if (
    lowerMessage.includes("balance") ||
    lowerMessage.includes("income")
  ) {
    return responses.balance;
  } else if (lowerMessage.includes("skill") || lowerMessage.includes("learn")) {
    return responses.skill;
  } else if (
    lowerMessage.includes("course") ||
    lowerMessage.includes("study")
  ) {
    return responses.course;
  } else if (lowerMessage.includes("help")) {
    return responses.help;
  } else {
    return responses.future;
  }
}

async function init() {
  initTheme();

  // Load questions from database first
  await loadQuestions();

  // Check if user has already filled questionnaire by fetching profile
  const userEmail = localStorage.getItem('userEmail');
  if (userEmail) {
    try {
      const response = await fetch(`/get-profile?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();

      if (response.ok && data.status === 'success') {
        const profile = data.profile;
        // Check if questionnaire fields are filled
        if (profile.age && profile.career_path && profile.is_student !== null) {
          // User has already filled questionnaire, load data
          userData = {
            age: profile.age ? profile.age.toString() : "",
            careerPath: profile.career_path || "",
            isStudent: profile.is_student ? "Yes" : "No",
            school: profile.school || "",
            level: profile.level || ""
          };
          questionnaireOverlay.style.display = "none";

          // Since we don't have a name, show generic welcome
          welcomeText.textContent = `Welcome to Pathfinder!`;
          welcomeMessage.style.display = "block";

          updateProfileDetails();
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
      console.error('Error fetching profile:', error);
      // On error, show questionnaire
      questionnaireOverlay.style.display = "flex";
      showCurrentQuestion();
    }
  } else {
    // No user email, redirect to login
    window.location.href = '/login';
  }

  createDemoPrompts();
  setInterval(createDemoPrompts, 5000);

  aiInputPane.addEventListener("click", () => {
    aiInput.focus();
  });

  aiInput.addEventListener("focus", () => {
    showChatPage();
  });

  inputBtn.addEventListener("click", () => {
    if (aiInput.value.trim()) {
      showChatPage(aiInput.value.trim());
    }
  });

  aiInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && aiInput.value.trim()) {
      showChatPage(aiInput.value.trim());
    }
  });

  // Event listeners for chat page
  chatSendBtn.addEventListener("click", sendChatMessage);

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendChatMessage();
    }
  });

  backToDashboard.addEventListener("click", goBackToDashboard);

  logoutBtn.addEventListener("click", logout);
}

document.addEventListener("DOMContentLoaded", init);
