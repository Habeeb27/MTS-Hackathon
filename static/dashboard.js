const themeToggle = document.getElementById("themeToggle");
const profileThemeToggle = document.getElementById("profileThemeToggle");
const roadmapThemeToggle = document.getElementById("roadmapThemeToggle");
const chatThemeToggle = document.getElementById("chatThemeToggle");
const assessmentThemeToggle = document.getElementById("assessmentThemeToggle");
const historyBtn = document.getElementById("historyBtn");
const newChatBtn = document.getElementById("newChatBtn");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const cardsGrid = document.getElementById("cardsGrid");
const aiChatCard = document.getElementById("aiChatCard");
const roadmapCard = document.getElementById("roadmapCard");
const assessmentCard = document.getElementById("assessmentCard");
const connectCard = document.getElementById("connectCard");
const chatPage = document.getElementById("chatPage");
const chatNavbar = document.getElementById("chatNavbar");
const profilePage = document.getElementById("profilePage");
const profileNavbar = document.getElementById("profileNavbar");
const roadmapPage = document.getElementById("roadmapPage");
const roadmapNavbar = document.getElementById("roadmapNavbar");
const assessmentPage = document.getElementById("assessmentPage");
const assessmentNavbar = document.getElementById("assessmentNavbar");
const dashboardContainer = document.getElementById("dashboardContainer");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");
const chatMessages = document.getElementById("chatMessages");
const chatHistory = document.getElementById("chatHistory");
const emptyHistory = document.getElementById("emptyHistory");
const backToDashboardFromChat = document.getElementById(
  "backToDashboardFromChat",
);
const backToDashboardFromProfile = document.getElementById(
  "backToDashboardFromProfile",
);
const backToDashboardFromRoadmap = document.getElementById(
  "backToDashboardFromRoadmap",
);
const backToDashboardFromAssessment = document.getElementById(
  "backToDashboardFromAssessment",
);
const logoutBtnNav = document.getElementById("logoutBtnNav");
const profileLink = document.getElementById("profileLink");
const welcomeMessage = document.getElementById("welcomeMessage");
const welcomeText = document.getElementById("welcomeText");
const profileCardsGrid = document.getElementById("profileCardsGrid");
const roadmapCardsGrid = document.getElementById("roadmapCardsGrid");
const assessmentCardsGrid = document.getElementById("assessmentCardsGrid");
const dashboardBackground = document.getElementById("dashboardBackground");
const editModalOverlay = document.getElementById("editModalOverlay");
const editModalContainer = document.getElementById("editModalContainer");
const editModalTitle = document.getElementById("editModalTitle");
const editFieldLabel = document.getElementById("editFieldLabel");
const editFieldInput = document.getElementById("editFieldInput");
const editFieldSelect = document.getElementById("editFieldSelect");
const editForm = document.getElementById("editForm");
const closeEditModalBtn = document.getElementById("closeEditModal");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const saveEditBtn = document.getElementById("saveEditBtn");
const body = document.body;

const startChatBtn = document.getElementById("startChatBtn");
const startRoadmapBtn = document.getElementById("startRoadmapBtn");
const startAssessmentBtn = document.getElementById("startAssessmentBtn");
const startConnectBtn = document.getElementById("startConnectBtn");

const aiCardAnimation = document.getElementById("aiCardAnimation");
const roadmapCardAnimation = document.getElementById("roadmapCardAnimation");
const assessmentCardAnimation = document.getElementById(
  "assessmentCardAnimation",
);
const connectCardAnimation = document.getElementById("connectCardAnimation");

// User data
let userData = {
  name: "",
  email: "",
  age: "",
  careerPath: "",
  isStudent: "",
  educationLevel: "",
  skills: "",
  interests: "",
};

// Currently editing field
let currentEditField = null;

// Chat history
let chatSessions = [];

function createDashboardBackground() {
  dashboardBackground.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    const circle = document.createElement("div");
    circle.className = "background-circle";

    const size = Math.random() * 150 + 50;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 10;
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

// Load user data from localStorage
function loadUserData() {
  try {
    const userDataStr = localStorage.getItem("userData");
    if (userDataStr) {
      const storedData = JSON.parse(userDataStr);
      userData = { ...userData, ...storedData };
    } else {
      userData.name = localStorage.getItem("userName") || "";
      userData.email = localStorage.getItem("userEmail") || "";
      userData.age = localStorage.getItem("userAge") || "";
      userData.careerPath = localStorage.getItem("userCareerPath") || "";
      userData.isStudent = localStorage.getItem("userIsStudent") || "";
      userData.educationLevel =
        localStorage.getItem("userEducationLevel") || "";
      userData.skills = localStorage.getItem("userSkills") || "";
      userData.interests = localStorage.getItem("userInterests") || "";

      localStorage.setItem("userData", JSON.stringify(userData));
    }

    // Update profile button state
    updateProfileButtonState();
  } catch (error) {
    console.error("Error loading user data:", error);
  }
}

function saveUserData() {
  try {
    localStorage.setItem("userData", JSON.stringify(userData));

    localStorage.setItem("userName", userData.name);
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("userAge", userData.age);
    localStorage.setItem("userCareerPath", userData.careerPath);
    localStorage.setItem("userIsStudent", userData.isStudent);
    localStorage.setItem("userEducationLevel", userData.educationLevel);
    localStorage.setItem("userSkills", userData.skills);
    localStorage.setItem("userInterests", userData.interests);

    updateProfileButtonState();
  } catch (error) {
    console.error("Error saving user data:", error);
  }
}

function isProfileComplete() {
  return userData.age && userData.careerPath && userData.isStudent;
}

function updateProfileButtonState() {
  if (profileLink) {
    if (isProfileComplete()) {
      profileLink.classList.remove("warning");
    } else {
      profileLink.classList.add("warning");
    }
  }
}

function logout() {
  // Clear localStorage
  localStorage.removeItem("userData");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userAge");
  localStorage.removeItem("userCareerPath");
  localStorage.removeItem("userIsStudent");
  localStorage.removeItem("userEducationLevel");
  localStorage.removeItem("userSkills");
  localStorage.removeItem("userInterests");

  // Reset user data
  userData = {
    name: "",
    email: "",
    age: "",
    careerPath: "",
    isStudent: "",
    educationLevel: "",
    skills: "",
    interests: "",
  };

  if (
    chatPage.classList.contains("active") ||
    profilePage.classList.contains("active") ||
    roadmapPage.classList.contains("active") ||
    assessmentPage.classList.contains("active")
  ) {
    goBackToDashboard();
  }

  showNotification("Logged out successfully!", "success");

  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
}

if (logoutBtnNav) {
  logoutBtnNav.addEventListener("click", logout);
}

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    chatThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    if (profileThemeToggle)
      profileThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    if (roadmapThemeToggle)
      roadmapThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    if (assessmentThemeToggle)
      assessmentThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// Theme toggle event listeners
themeToggle.addEventListener("click", () => toggleTheme());
if (profileThemeToggle)
  profileThemeToggle.addEventListener("click", () => toggleTheme());
if (roadmapThemeToggle)
  roadmapThemeToggle.addEventListener("click", () => toggleTheme());
if (chatThemeToggle)
  chatThemeToggle.addEventListener("click", () => toggleTheme());
if (assessmentThemeToggle)
  assessmentThemeToggle.addEventListener("click", () => toggleTheme());

function toggleTheme() {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", "light");
  }
}

// Sidebar functionality
if (historyBtn)
  historyBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    updateChatHistoryDisplay();
  });

if (closeSidebar)
  closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });

if (newChatBtn)
  newChatBtn.addEventListener("click", () => {
    chatMessages.innerHTML = `
          <div class="message ai">
            Hello! I'm your Pathfinder AI assistant. How can I help you with your career journey today?
            <div class="message-time">Just now</div>
          </div>
        `;
    chatInput.value = "";
    chatInput.focus();
  });

if (profileLink) {
  profileLink.addEventListener("click", (e) => {
    e.preventDefault();
    createBubbleBurst(profileLink);
    setTimeout(() => {
      showProfilePage();
    }, 500);
  });
}

function openEditModal(fieldId, fieldType) {
  currentEditField = fieldId;

  const fieldLabels = {
    name: "Full Name",
    email: "Email Address",
    age: "Age",
    careerPath: "Career Path",
    isStudent: "Student Status",
    educationLevel: "Education Level",
    skills: "Skills",
    interests: "Interests",
  };

  editModalTitle.textContent = `Edit ${fieldLabels[fieldId]}`;
  editFieldLabel.textContent = fieldLabels[fieldId];

  if (fieldType === "select") {
    editFieldInput.style.display = "none";
    editFieldSelect.style.display = "block";
    editFieldSelect.value = userData[fieldId] || "";

    if (fieldId === "isStudent") {
      editFieldSelect.innerHTML = `
              <option value="">Select student status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            `;
    } else if (fieldId === "educationLevel") {
      editFieldSelect.innerHTML = `
              <option value="">Select education level</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Professional">Professional</option>
              <option value="Other">Other</option>
            `;
    }
  } else {
    editFieldInput.style.display = "block";
    editFieldSelect.style.display = "none";
    editFieldInput.value = userData[fieldId] || "";
    editFieldInput.type = fieldId === "age" ? "number" : "text";
    editFieldInput.placeholder = `Enter your ${fieldLabels[fieldId].toLowerCase()}`;
  }

  editModalOverlay.classList.add("active");
}

function closeEditModalFunction() {
  editModalOverlay.classList.remove("active");
  currentEditField = null;
}

// Edit modal event listeners
if (closeEditModalBtn)
  closeEditModalBtn.addEventListener("click", closeEditModalFunction);
if (cancelEditBtn)
  cancelEditBtn.addEventListener("click", closeEditModalFunction);

if (editModalOverlay) {
  editModalOverlay.addEventListener("click", (e) => {
    if (e.target === editModalOverlay) {
      closeEditModalFunction();
    }
  });
}

if (editForm) {
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let value;
    if (editFieldSelect.style.display === "block") {
      value = editFieldSelect.value.trim();
    } else {
      value = editFieldInput.value.trim();
    }

    if (!value) {
      alert("Please enter a value");
      return;
    }

    userData[currentEditField] = value;
    saveUserData();

    // Refresh profile page if active
    if (profilePage.classList.contains("active")) {
      createProfileCards();
    }

    closeEditModalFunction();
    showNotification("Information updated successfully!", "success");
  });
}

// Bubble animation for cards
function createBubbles(container) {
  if (!container) return;
  container.innerHTML = "";

  for (let i = 0; i < 15; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const size = Math.random() * 20 + 5;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 2;
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
  createBubbles(aiCardAnimation);
  createBubbles(roadmapCardAnimation);
  createBubbles(assessmentCardAnimation);
  createBubbles(connectCardAnimation);

  setInterval(() => {
    createBubbles(aiCardAnimation);
    createBubbles(roadmapCardAnimation);
    createBubbles(assessmentCardAnimation);
    createBubbles(connectCardAnimation);
  }, 4000);
}

// Bubble burst effect on click
function createBubbleBurst(element) {
  const container = element.querySelector
    ? element.querySelector(".card-animation-container")
    : null;
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const size = Math.random() * 30 + 10;
    const startX = 50;
    const startY = 50;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${startX}%`;
    bubble.style.top = `${startY}%`;
    bubble.style.transform = `translate(-50%, -50%)`;
    bubble.style.animation = `bubbleFloat 1s ease-out forwards`;
    bubble.style.animationDelay = `0s`;

    setTimeout(() => {
      const endX = startX + Math.cos(angle) * distance;
      const endY = startY + Math.sin(angle) * distance;
      bubble.style.left = `${endX}%`;
      bubble.style.top = `${endY}%`;
    }, 10);

    container.appendChild(bubble);

    setTimeout(() => {
      if (bubble.parentNode === container) {
        bubble.remove();
      }
    }, 1000);
  }
}

// Show notification
function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
            <span>${message}</span>
          </div>
        `;

  const style = document.createElement("style");
  style.textContent = `
          .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--white);
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px var(--shadow);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            border-left: 4px solid var(--accent-blue);
          }
          .dark-theme .notification {
            background: var(--off-white);
          }
          .notification-success {
            border-left-color: var(--success-green);
          }
          .notification i {
            color: var(--accent-blue);
          }
          .notification-success i {
            color: var(--success-green);
          }
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Card click handlers
if (startChatBtn)
  startChatBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    createBubbleBurst(aiChatCard);
    setTimeout(() => showChatPage(), 500);
  });

if (startRoadmapBtn)
  startRoadmapBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    createBubbleBurst(roadmapCard);
    setTimeout(() => showRoadmapPage(), 500);
  });

if (startAssessmentBtn)
  startAssessmentBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    createBubbleBurst(assessmentCard);
    setTimeout(() => showAssessmentPage(), 500);
  });

if (startConnectBtn)
  startConnectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    createBubbleBurst(connectCard);
  });

if (aiChatCard)
  aiChatCard.addEventListener("click", () => {
    createBubbleBurst(aiChatCard);
    setTimeout(() => showChatPage(), 500);
  });

if (roadmapCard)
  roadmapCard.addEventListener("click", () => {
    createBubbleBurst(roadmapCard);
    setTimeout(() => showRoadmapPage(), 500);
  });

if (assessmentCard)
  assessmentCard.addEventListener("click", () => {
    createBubbleBurst(assessmentCard);
    setTimeout(() => showAssessmentPage(), 500);
  });

if (connectCard)
  connectCard.addEventListener("click", () => {
    createBubbleBurst(connectCard);
  });

// Show profile page
function showProfilePage() {
  dashboardContainer.style.opacity = "0";
  dashboardContainer.style.transform = "scale(0.95)";

  setTimeout(() => {
    dashboardContainer.style.display = "none";
    profileNavbar.classList.add("active");
    profilePage.classList.add("active");
    createProfileCards();
  }, 500);
}

// Show chat page
function showChatPage() {
  dashboardContainer.style.opacity = "0";
  dashboardContainer.style.transform = "scale(0.95)";

  setTimeout(() => {
    dashboardContainer.style.display = "none";
    chatNavbar.classList.add("active");
    chatPage.classList.add("active");
    setTimeout(() => chatInput.focus(), 300);
  }, 500);
}

// Show roadmap page
function showRoadmapPage() {
  dashboardContainer.style.opacity = "0";
  dashboardContainer.style.transform = "scale(0.95)";

  setTimeout(() => {
    dashboardContainer.style.display = "none";
    roadmapNavbar.classList.add("active");
    roadmapPage.classList.add("active");
    createRoadmapCards();
  }, 500);
}

// Show assessment page
function showAssessmentPage() {
  dashboardContainer.style.opacity = "0";
  dashboardContainer.style.transform = "scale(0.95)";

  setTimeout(() => {
    dashboardContainer.style.display = "none";
    assessmentNavbar.classList.add("active");
    assessmentPage.classList.add("active");
    createAssessmentCards();
  }, 500);
}

// Create profile cards
function createProfileCards() {
  if (!profileCardsGrid) return;

  profileCardsGrid.innerHTML = "";

  const profileData = [
    {
      id: "name",
      title: "Full Name",
      value: userData.name || "Not set",
      icon: "fas fa-user",
      type: "text",
    },
    {
      id: "email",
      title: "Email Address",
      value: userData.email || "Not set",
      icon: "fas fa-envelope",
      type: "text",
    },
    {
      id: "age",
      title: "Age",
      value: userData.age || "Not set",
      icon: "fas fa-birthday-cake",
      type: "text",
    },
    {
      id: "careerPath",
      title: "Career Path",
      value: userData.careerPath || "Not set",
      icon: "fas fa-briefcase",
      type: "text",
    },
    {
      id: "isStudent",
      title: "Student Status",
      value: userData.isStudent || "Not set",
      icon: "fas fa-graduation-cap",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      id: "educationLevel",
      title: "Education Level",
      value: userData.educationLevel || "Not set",
      icon: "fas fa-book",
      type: "select",
      options: [
        "High School",
        "Undergraduate",
        "Graduate",
        "Professional",
        "Other",
      ],
    },
    {
      id: "skills",
      title: "Skills",
      value: userData.skills || "Not set",
      icon: "fas fa-tools",
      type: "text",
    },
    {
      id: "interests",
      title: "Interests",
      value: userData.interests || "Not set",
      icon: "fas fa-heart",
      type: "text",
    },
  ];

  profileData.forEach((item) => {
    const cardElement = document.createElement("div");
    cardElement.className = "profile-card";
    const isComplete = item.value && item.value !== "Not set";

    cardElement.innerHTML = `
            <div class="card-animation-container"></div>
            <div class="profile-card-icon">
              <i class="${item.icon}"></i>
            </div>
            <h3 class="profile-card-title">${item.title}</h3>
            <p class="profile-card-value ${isComplete ? "" : "incomplete"}">${item.value}</p>
            <button class="edit-profile-btn" data-field="${item.id}" data-type="${item.type}">
              <span>${isComplete ? "Edit" : "Add"}</span>
              <i class="fas fa-${isComplete ? "edit" : "plus"}"></i>
            </button>
          `;

    profileCardsGrid.appendChild(cardElement);

    // Add bubble animation
    setTimeout(() => {
      const container = cardElement.querySelector(".card-animation-container");
      createBubbles(container);
    }, 100);
  });

  // Add event listeners to edit buttons
  const editButtons = document.querySelectorAll(".edit-profile-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const fieldId = button.getAttribute("data-field");
      const fieldType = button.getAttribute("data-type");
      openEditModal(fieldId, fieldType);
    });
  });

  // Refresh bubble animations
  setInterval(() => {
    const containers = document.querySelectorAll(
      ".profile-card .card-animation-container",
    );
    containers.forEach((container) => {
      createBubbles(container);
    });
  }, 4000);
}

function createRoadmapCards() {
  if (!roadmapCardsGrid) return;

  roadmapCardsGrid.innerHTML = "";

  const roadmapData = [
    {
      title: "Self-Assessment",
      description:
        "Identify your strengths, weaknesses, interests, and values to understand your career potential and direction.",
      icon: "fas fa-search",
      step: "Step 1",
      duration: "Week 1-2",
    },
    {
      title: "Skill Development",
      description:
        "Acquire essential technical and soft skills needed for your chosen career path through courses and practice.",
      icon: "fas fa-graduation-cap",
      step: "Step 2",
      duration: "Month 2-4",
    },
    {
      title: "Education Planning",
      description:
        "Plan your educational path, select relevant courses, and pursue necessary certifications for career advancement.",
      icon: "fas fa-book",
      step: "Step 3",
      duration: "Month 4-6",
    },
    {
      title: "Career Exploration",
      description:
        "Research different career options, industries, companies, and growth opportunities in your field of interest.",
      icon: "fas fa-briefcase",
      step: "Step 4",
      duration: "Month 6-8",
    },
    {
      title: "Networking Strategy",
      description:
        "Build professional connections, attend industry events, and engage with mentors in your desired field.",
      icon: "fas fa-network-wired",
      step: "Step 5",
      duration: "Month 8-10",
    },
    {
      title: "Goal Setting & Execution",
      description:
        "Set SMART career goals and create actionable plans with milestones to track your progress and success.",
      icon: "fas fa-bullseye",
      step: "Step 6",
      duration: "Month 10-12",
    },
  ];

  roadmapData.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "roadmap-card";

    cardElement.innerHTML = `
            <div class="card-animation-container"></div>
            <div class="roadmap-card-icon">
              <i class="${card.icon}"></i>
            </div>
            <div class="roadmap-card-step">
              <i class="fas fa-map-marker-alt"></i>
              ${card.step} • ${card.duration}
            </div>
            <h3 class="roadmap-card-title">${card.title}</h3>
            <p class="roadmap-card-desc">${card.description}</p>
          `;

    roadmapCardsGrid.appendChild(cardElement);

    // Add bubble animation
    setTimeout(() => {
      const container = cardElement.querySelector(".card-animation-container");
      createBubbles(container);
    }, 100);
  });

  // Refresh bubble animations
  setInterval(() => {
    const containers = document.querySelectorAll(
      ".roadmap-card .card-animation-container",
    );
    containers.forEach((container) => {
      createBubbles(container);
    });
  }, 4000);
}

// Create assessment cards
function createAssessmentCards() {
  if (!assessmentCardsGrid) return;

  assessmentCardsGrid.innerHTML = "";

  const cardData = [
    {
      title: "Personality Assessment",
      description:
        "Discover your personality type and how it relates to career choices",
      icon: "fas fa-brain",
      questions: 20,
    },
    {
      title: "Skills Assessment",
      description:
        "Evaluate your current skills and identify areas for development",
      icon: "fas fa-tools",
      questions: 15,
    },
    {
      title: "Interest Assessment",
      description:
        "Identify your interests and match them with suitable careers",
      icon: "fas fa-heart",
      questions: 25,
    },
    {
      title: "Values Assessment",
      description:
        "Discover your core values and find careers that align with them",
      icon: "fas fa-star",
      questions: 18,
    },
    {
      title: "Career Readiness",
      description:
        "Assess your readiness for career transitions or advancement",
      icon: "fas fa-briefcase",
      questions: 22,
    },
    {
      title: "Learning Style",
      description:
        "Identify your preferred learning style for effective skill development",
      icon: "fas fa-graduation-cap",
      questions: 12,
    },
  ];

  cardData.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "assessment-card";
    cardElement.innerHTML = `
            <div class="card-animation-container"></div>
            <div class="assessment-card-icon">
              <i class="${card.icon}"></i>
            </div>
            <h3 class="assessment-card-title">${card.title}</h3>
            <p class="assessment-card-desc">${card.description}</p>
            <button class="start-btn start-assessment" data-index="${index}">
              <span>Start Assessment (${card.questions} questions)</span>
              <i class="fas fa-arrow-right"></i>
            </button>
          `;

    assessmentCardsGrid.appendChild(cardElement);

    // Add bubble animation
    setTimeout(() => {
      const container = cardElement.querySelector(".card-animation-container");
      createBubbles(container);
    }, 100);
  });

  // Add event listeners to assessment start buttons
  const startAssessmentButtons = document.querySelectorAll(".start-assessment");
  startAssessmentButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = button.getAttribute("data-index");
      alert(`Starting ${cardData[index].title} assessment...`);
    });
  });

  // Refresh bubble animations
  setInterval(() => {
    const containers = document.querySelectorAll(
      ".assessment-card .card-animation-container",
    );
    containers.forEach((container) => {
      createBubbles(container);
    });
  }, 4000);
}

// Go back to dashboard
function goBackToDashboard() {
  chatPage.classList.remove("active");
  profilePage.classList.remove("active");
  roadmapPage.classList.remove("active");
  assessmentPage.classList.remove("active");

  chatNavbar.classList.remove("active");
  profileNavbar.classList.remove("active");
  roadmapNavbar.classList.remove("active");
  assessmentNavbar.classList.remove("active");

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

// Back button event listeners
if (backToDashboardFromChat)
  backToDashboardFromChat.addEventListener("click", goBackToDashboard);
if (backToDashboardFromProfile)
  backToDashboardFromProfile.addEventListener("click", goBackToDashboard);
if (backToDashboardFromRoadmap)
  backToDashboardFromRoadmap.addEventListener("click", goBackToDashboard);
if (backToDashboardFromAssessment)
  backToDashboardFromAssessment.addEventListener("click", goBackToDashboard);

// Chat functions
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

// AI response generator
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
    profile:
      "I see you're working on your profile. Completing your information will help me provide better career guidance for you.",
    assessment:
      "Career assessments are a great way to discover your strengths and interests. Would you like to take one now?",
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
  } else if (
    lowerMessage.includes("profile") ||
    lowerMessage.includes("info")
  ) {
    return responses.profile;
  } else if (
    lowerMessage.includes("assessment") ||
    lowerMessage.includes("test")
  ) {
    return responses.assessment;
  } else if (lowerMessage.includes("help")) {
    return responses.help;
  } else {
    return responses.future;
  }
}

// Initialize the application
function init() {
  initTheme();
  createDashboardBackground();
  loadUserData();

  if (!userData.email) {
    window.location.href = "/login";
    return;
  }

  if (userData.name) {
    welcomeText.textContent = `Welcome ${userData.name}!`;
  } else {
    welcomeText.textContent = `Welcome to Pathfinder!`;
    setTimeout(() => {
      showNotification(
        "Please complete your profile for better career guidance!",
        "info",
      );
    }, 1000);
  }

  startBubbleAnimations();
  setupEventListeners();
}

function setupEventListeners() {
  if (chatSendBtn) chatSendBtn.addEventListener("click", sendChatMessage);

  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendChatMessage();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
