const themeToggle = document.getElementById("themeToggle");
const requestsThemeToggle = document.getElementById("requestsThemeToggle");
const usersGrid = document.getElementById("usersGrid");
const requestsGrid = document.getElementById("requestsGrid");
const particlesContainer = document.getElementById("particlesContainer");
const profileModal = document.getElementById("profileModal");
const modalContent = document.getElementById("modalContent");
const userProfileBtn = document.getElementById("userProfileBtn");
const requestsPage = document.getElementById("requestsPage");
const backToConnect = document.getElementById("backToConnect");
const requestCount = document.getElementById("requestCount");
const body = document.body;

const users = [
  {
    id: 1,
    name: "Adewunmi Abdul Azeez",
    title: "Frontend Developer",
    avatar: "https://i.postimg.cc/mgV2hXsb/cyber.jpg",
    skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Next.js"],
    bio: "Passionate about creating beautiful and responsive user interfaces. Currently exploring advanced React patterns and performance optimization.",
    online: true,
    connectionStatus: "available",
  },
  {
    id: 2,
    name: "Olatundun Tesleem",
    title: "Backend Developer",
    avatar: "https://i.postimg.cc/TY7rm9Gp/Teslim.jpg",
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker"],
    bio: "Specialized in building scalable backend systems and RESTful APIs. Enthusiastic about database optimization and system architecture.",
    online: false,
    connectionStatus: "available",
  },
  {
    id: 3,
    name: "Aremu Habeebullah",
    title: "Aspiring Software Engineer",
    avatar: "https://i.postimg.cc/jdgzNXKC/Habeeb.jpg",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    bio: "Passionate about building scalable web applications and learning new technologies.",
    online: true,
    connectionStatus: "available",
  },
  {
    id: 4,
    name: "Akintayo Abdul Samad",
    title: "Aspiring Cybersecurity Analyst",
    avatar: "https://i.postimg.cc/wBvxNX6S/Samad.jpg",
    skills: ["Network Security", "Ethical Hacking", "Python", "Linux"],
    bio: "Focusing on network security and penetration testing. Always looking for CTF challenges.",
    online: false,
    connectionStatus: "available",
  },
  {
    id: 5,
    name: "Chinwe Nnaji",
    title: "UX/UI Designer",
    avatar: "https://i.postimg.cc/50Ks0MPd/3.jpg",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    bio: "Creating beautiful and functional user experiences. Passionate about accessibility and user-centered design.",
    online: true,
    connectionStatus: "available",
  },
  {
    id: 6,
    name: "David Chen",
    title: "Full Stack Developer",
    avatar: "https://i.postimg.cc/GhWSGdbj/1.jpg",
    skills: ["React", "Node.js", "AWS", "GraphQL", "TypeScript"],
    bio: "Building full-stack applications with modern technologies. Love open source and mentoring junior developers.",
    online: false,
    connectionStatus: "available",
  },
];

const connectionRequests = [
  {
    id: 101,
    name: "Zainab Ahmed",
    title: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    time: "2 hours ago",
    message: "Would love to connect and discuss tech career paths!",
  },
  {
    id: 102,
    name: "Michael Johnson",
    title: "Senior Developer",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    time: "1 day ago",
    message: "Interested in your work with React. Let's connect!",
  },
];

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    if (requestsThemeToggle) {
      requestsThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }
}

// Create particles
function createParticles() {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 3 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(particle);
  }
}

function createUserCard(user) {
  return `
          <div class="user-card" data-user-id="${user.id}">
            <div class="user-header">
              <img src="${user.avatar}" alt="${user.name}" class="user-avatar" onerror="this.src='https://i.postimg.cc/3x3QzSGq/user1.png'">
              <div class="user-info">
                <h3 class="user-name">${user.name}</h3>
                <p class="user-title">${user.title}</p>
                <div class="user-connectivity">
                  <div class="online-dot" style="display: ${user.online ? "block" : "none"}"></div>
                  <span>${user.online ? "Online now" : "Last seen 2h ago"}</span>
                </div>
              </div>
            </div>
            <p class="user-bio">${user.bio}</p>
            <div class="user-skills">
              ${user.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
            </div>
            <div class="user-actions">
              <button class="btn btn-primary connect-btn" data-user-id="${user.id}">
                <i class="fas fa-user-plus"></i> Connect
              </button>
              <button class="btn btn-secondary" onclick="viewProfile(${user.id})">
                <i class="fas fa-eye"></i> View Profile
              </button>
            </div>
          </div>
        `;
}

function createRequestCard(request) {
  return `
          <div class="request-card" data-request-id="${request.id}">
            <div class="request-header">
              <img src="${request.avatar}" alt="${request.name}" class="request-avatar">
              <div class="request-info">
                <h4 class="request-name">${request.name}</h4>
                <p class="request-title">${request.title}</p>
                <p class="request-time">${request.time}</p>
              </div>
            </div>
            <p class="request-message">"${request.message}"</p>
            <div class="request-actions">
              <button class="btn btn-success" onclick="acceptRequest(${request.id})">
                <i class="fas fa-check"></i> Accept
              </button>
              <button class="btn btn-secondary" onclick="declineRequest(${request.id})">
                <i class="fas fa-times"></i> Decline
              </button>
            </div>
          </div>
        `;
}

function loadUsers() {
  usersGrid.innerHTML = "";

  users.forEach((user, index) => {
    const card = document.createElement("div");
    card.innerHTML = createUserCard(user);
    card.style.animationDelay = `${index * 0.1}s`;
    usersGrid.appendChild(card.firstElementChild);
  });

  document.querySelectorAll(".connect-btn").forEach((button) => {
    button.addEventListener("click", handleConnectClick);
  });
}

function loadConnectionRequests() {
  requestsGrid.innerHTML = "";

  if (connectionRequests.length === 0) {
    requestsGrid.innerHTML = `
            <div class="empty-state">
              <i class="fas fa-user-clock"></i>
              <h3>No pending connection requests</h3>
              <p>When someone sends you a connection request, it will appear here.</p>
            </div>
          `;
    return;
  }

  connectionRequests.forEach((request) => {
    const card = document.createElement("div");
    card.innerHTML = createRequestCard(request);
    requestsGrid.appendChild(card.firstElementChild);
  });

  requestCount.textContent = connectionRequests.length;
}

function handleConnectClick(event) {
  const button = event.currentTarget;
  const userId = button.getAttribute("data-user-id");
  const userCard = button.closest(".user-card");
  const userName = userCard.querySelector(".user-name").textContent;

  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = '<i class="fas fa-clock"></i> Pending';
    button.className = "btn btn-secondary connect-btn";
    button.disabled = true;

    showNotification(`Connection request sent to ${userName}!`, "success");

    const currentCount = parseInt(requestCount.textContent);
    requestCount.textContent = currentCount + 1;
  }, 1000);
}

function viewProfile(userId) {
  const user = users.find((u) => u.id === userId);
  if (!user) return;

  const modalHTML = `
          <button class="modal-close" onclick="closeProfileModal()">
            <i class="fas fa-times"></i>
          </button>
          <div class="modal-header">
            <img src="${user.avatar}" alt="${user.name}" class="modal-avatar" onerror="this.src='https://i.postimg.cc/3x3QzSGq/user1.png'">
            <h3 class="modal-name">${user.name}</h3>
            <p class="modal-title">${user.title}</p>
            <p class="modal-online">
              <i class="fas fa-circle" style="color: ${user.online ? "#4caf50" : "#999"}; font-size: 10px;"></i>
              ${user.online ? "Online now" : "Offline"}
            </p>
          </div>
          <div class="modal-content">
            <div class="modal-section">
              <h4 class="modal-section-title">
                <i class="fas fa-user"></i>
                About
              </h4>
              <p class="modal-bio">${user.bio}</p>
            </div>
            <div class="modal-section">
              <h4 class="modal-section-title">
                <i class="fas fa-code"></i>
                Skills & Technologies
              </h4>
              <div class="modal-skills">
                ${user.skills.map((skill) => `<span class="modal-skill">${skill}</span>`).join("")}
              </div>
            </div>
            <div class="modal-section">
              <h4 class="modal-section-title">
                <i class="fas fa-heart"></i>
                Looking For
              </h4>
              <p class="modal-bio">${
                user.title.includes("Frontend")
                  ? "Collaboration on React projects, mentorship opportunities, and frontend architecture discussions."
                  : user.title.includes("Backend")
                    ? "Database optimization tips, system design discussions, and backend architecture mentorship."
                    : "Learning opportunities, project collaborations, and career guidance."
              }</p>
            </div>
            <div style="margin-top: 30px; display: flex; gap: 10px;">
              <button class="btn btn-primary" style="flex: 1;" onclick="connectFromModal(${user.id})">
                <i class="fas fa-user-plus"></i> Connect
              </button>
              <button class="btn btn-secondary" style="flex: 1;" onclick="closeProfileModal()">
                <i class="fas fa-times"></i> Close
              </button>
            </div>
          </div>
        `;

  modalContent.innerHTML = modalHTML;
  profileModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function connectFromModal(userId) {
  const user = users.find((u) => u.id === userId);
  if (!user) return;

  const connectBtn = document.querySelector(
    `[data-user-id="${userId}"] .connect-btn`,
  );
  if (connectBtn) {
    connectBtn.click();
  }

  showNotification(`Connection request sent to ${user.name}!`, "success");
  closeProfileModal();
}

// Close profile modal
function closeProfileModal() {
  profileModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
          <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
          <span>${message}</span>
        `;

  document.body.appendChild(notification);

  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
            .notification {
              position: fixed;
              top: 100px;
              right: 20px;
              padding: 15px 20px;
              background: var(--white);
              border-radius: 10px;
              box-shadow: 0 5px 20px var(--shadow);
              display: flex;
              align-items: center;
              gap: 10px;
              z-index: 9999;
              animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
              border-left: 4px solid var(--accent-blue);
            }
            .dark-theme .notification {
              background: var(--off-white);
            }
            .notification-success {
              border-left-color: var(--success-green);
            }
            .notification i {
              font-size: 18px;
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
            @keyframes fadeOut {
              to {
                opacity: 0;
                transform: translateX(100%);
              }
            }
          `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function acceptRequest(requestId) {
  const requestCard = document.querySelector(
    `[data-request-id="${requestId}"]`,
  );
  if (requestCard) {
    requestCard.style.animation = "fadeOut 0.3s ease forwards";
    setTimeout(() => {
      requestCard.remove();
      const currentCount = parseInt(requestCount.textContent);
      requestCount.textContent = Math.max(0, currentCount - 1);
      if (requestsGrid.children.length === 0) {
        loadConnectionRequests();
      }
    }, 300);
  }
  showNotification("Connection request accepted!", "success");
}

function declineRequest(requestId) {
  const requestCard = document.querySelector(
    `[data-request-id="${requestId}"]`,
  );
  if (requestCard) {
    requestCard.style.animation = "fadeOut 0.3s ease forwards";
    setTimeout(() => {
      requestCard.remove();
      const currentCount = parseInt(requestCount.textContent);
      requestCount.textContent = Math.max(0, currentCount - 1);
      if (requestsGrid.children.length === 0) {
        loadConnectionRequests();
      }
    }, 300);
  }
  showNotification("Connection request declined", "info");
}

function showRequestsPage() {
  requestsPage.classList.add("active");
  document.body.style.overflow = "hidden";
  loadConnectionRequests();
}

function hideRequestsPage() {
  requestsPage.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Initialize
function init() {
  initTheme();
  createParticles();
  loadUsers();

  // Event listeners
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

  if (requestsThemeToggle) {
    requestsThemeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      if (body.classList.contains("dark-theme")) {
        requestsThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem("theme", "dark");
      } else {
        requestsThemeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem("theme", "light");
      }
    });
  }

  userProfileBtn.addEventListener("click", showRequestsPage);
  backToConnect.addEventListener("click", hideRequestsPage);

  profileModal.addEventListener("click", (e) => {
    if (e.target === profileModal) {
      closeProfileModal();
    }
  });

  requestsPage.addEventListener("click", (e) => {
    if (e.target === requestsPage) {
      hideRequestsPage();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
