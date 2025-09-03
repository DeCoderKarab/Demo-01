// Student profiles (mock)
const studentProfiles = [
  {
    name: "John Doe",
    standard: "6th",
    teacher: "Ms. Priya Sharma",
    school: "Green Valley Public School",
    avatar: "https://i.pravatar.cc/100?img=12",
    attendanceToday: "Present",
    subjects: [
      { title: "Math", summary: "Covered algebra and equations." },
      { title: "Science", summary: "Learned about photosynthesis." },
      { title: "English", summary: "Practiced essay writing." },
      { title: "History", summary: "Discussed ancient civilizations." },
      { title: "Geography", summary: "Studied climate zones." },
      { title: "Art", summary: "Created watercolor paintings." },
    ],
    performance: {
      "Midterm Exam": [
        { subject: "Math", score: 85 },
        { subject: "Science", score: 90 },
        { subject: "English", score: 78 },
        { subject: "History", score: 88 },
        { subject: "Geography", score: 80 },
        { subject: "Art", score: 92 },
      ],
      "Final Exam": [
        { subject: "Math", score: 90 },
        { subject: "Science", score: 85 },
        { subject: "English", score: 82 },
        { subject: "History", score: 91 },
        { subject: "Geography", score: 87 },
        { subject: "Art", score: 95 },
      ],
    },
  },
  {
    name: "Ananya Mehta",
    standard: "5th",
    teacher: "Mr. Rahul Sen",
    school: "Green Valley Public School",
    avatar: "https://i.pravatar.cc/100?img=65",
    attendanceToday: "Absent",
    subjects: [
      { title: "Math", summary: "Reviewed multiplication tables." },
      { title: "Science", summary: "Watched a video on ecosystems." },
      { title: "English", summary: "Learned new vocabulary words." },
      { title: "History", summary: "Read about medieval times." },
      { title: "Geography", summary: "Identified continents and oceans." },
      { title: "Art", summary: "Practiced sketching." },
    ],
    performance: {
      "Midterm Exam": [
        { subject: "Math", score: 75 },
        { subject: "Science", score: 70 },
        { subject: "English", score: 72 },
        { subject: "History", score: 68 },
        { subject: "Geography", score: 70 },
        { subject: "Art", score: 80 },
      ],
      "Final Exam": [
        { subject: "Math", score: 78 },
        { subject: "Science", score: 75 },
        { subject: "English", score: 74 },
        { subject: "History", score: 70 },
        { subject: "Geography", score: 75 },
        { subject: "Art", score: 82 },
      ],
    },
  },
];

let currentStudentIndex = 0;

// DOM elements
const avatarBtn = document.getElementById("avatarBtn");
const avatarPopup = document.getElementById("avatarPopup");
const popupAvatar = document.getElementById("popupAvatar");
const studentName = document.getElementById("studentName");
const studentClass = document.getElementById("studentClass");
const switchProfileBtn = document.getElementById("switchProfileBtn");
const mainContent = document.getElementById("mainContent");
const overlay = document.getElementById("overlay");

const tabs = document.querySelectorAll(".tab");

const subjectModal = document.getElementById("subjectModal");
const subjectTitle = document.getElementById("subjectTitle");
const subjectSummary = document.getElementById("subjectSummary");
const closeSubjectModal = document.getElementById("closeSubjectModal");
const backToHomeBtn = document.getElementById("backToHomeBtn");

// Update all UI content (default is Home tab)
function updateStudentUI() {
  const student = studentProfiles[currentStudentIndex];

  // Update avatar and popup
  avatarBtn.src = student.avatar;
  popupAvatar.src = student.avatar;
  studentName.textContent = student.name;
  studentClass.textContent = `📘 Class: ${student.standard}`;

  // Load home tab content by default
  loadHomeTab();
}

// Load Home tab content
function loadHomeTab() {
  const student = studentProfiles[currentStudentIndex];
  mainContent.innerHTML = `
    <section class="info-card">
      <h2>👋 Hi, ${student.name}</h2>
      <p><strong>Standard:</strong> ${student.standard}</p>
      <p><strong>Class Teacher:</strong> ${student.teacher}</p>
      <p><strong>School:</strong> ${student.school}</p>
    </section>

    <section class="notice-board">
      <h2>📢 Notices</h2>
      <ul>
        <li>🕒 PTM scheduled on 5th Sept</li>
        <li>📚 Submit homework before Friday</li>
        <li>🎉 Annual Day registrations open</li>
      </ul>
    </section>
  `;
}

// Load Today tab content
function loadTodayTab() {
  const student = studentProfiles[currentStudentIndex];

  // Attendance summary + subjects rack
  mainContent.innerHTML = `
    <div class="attendance-summary">
      Today's Attendance: <strong>${student.attendanceToday}</strong>
    </div>
    <div class="subjects-rack" id="subjectsRack"></div>
  `;

  const subjectsRack = document.getElementById("subjectsRack");

  // Create buttons for each subject
  student.subjects.forEach((subject, idx) => {
    const btn = document.createElement("button");
    btn.className = "subject-btn";
    btn.textContent = subject.title;
    btn.addEventListener("click", () => openSubjectModal(subject));
    subjectsRack.appendChild(btn);
  });
}

// Show the subject modal with summary
function openSubjectModal(subject) {
  subjectTitle.textContent = subject.title;
  subjectSummary.textContent = subject.summary;
  subjectModal.classList.add("show");
  overlay.style.display = "block";
}

// Close subject modal
function closeSubject() {
  subjectModal.classList.remove("show");
  overlay.style.display = "none";
}

// Load Performance tab - show exams list first
function loadPerformanceTab() {
  const student = studentProfiles[currentStudentIndex];
  const exams = Object.keys(student.performance);

  if (exams.length === 0) {
    mainContent.innerHTML = `<p style="text-align:center; margin-top: 50px;">No performance data available.</p>`;
    return;
  }

  mainContent.innerHTML = `
    <section class="info-card">
      <h2>📊 Select Exam</h2>
      <div id="examList" style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center;"></div>
    </section>
  `;

  const examList = document.getElementById("examList");
  exams.forEach((exam) => {
    const btn = document.createElement("button");
    btn.className = "subject-btn";
    btn.textContent = exam;
    btn.style.maxWidth = "120px";
    btn.addEventListener("click", () => showExamScores(exam));
    examList.appendChild(btn);
  });
}

// Show subject-wise scores for selected exam
function showExamScores(examName) {
  const student = studentProfiles[currentStudentIndex];
  const scores = student.performance[examName];

  // Calculate total and percentage
  const totalScore = scores.reduce((sum, entry) => sum + entry.score, 0);
  const maxScore = scores.length * 100;
  const percentage = ((totalScore / maxScore) * 100).toFixed(2);

  mainContent.innerHTML = `
    <section class="info-card">
      <h2>📄 ${examName} - Scores</h2>
      <ul class="score-list" id="scoreList" style="list-style:none; padding-left:0; text-align:left;"></ul>
      <p><strong>Total Score:</strong> ${totalScore} / ${maxScore}</p>
      <p><strong>Percentage:</strong> ${percentage} %</p>
      <button class="switch-btn" id="backToExamListBtn">🔙 Back to Exams</button>
    </section>
  `;

  const scoreList = document.getElementById("scoreList");
  scores.forEach((entry) => {
    const li = document.createElement("li");
    li.style.padding = "6px 0";
    li.innerHTML = `<strong>${entry.subject}:</strong> ${entry.score} / 100`;
    scoreList.appendChild(li);
  });

  document.getElementById("backToExamListBtn").addEventListener("click", loadPerformanceTab);
}

// Toggle avatar popup
avatarBtn.addEventListener("click", () => {
  if (avatarPopup.style.display === "block") {
    avatarPopup.style.display = "none";
    overlay.style.display = "none";
  } else {
    avatarPopup.style.display = "block";
    overlay.style.display = "block";
  }
});

// Hide avatar popup on outside click
overlay.addEventListener("click", () => {
  avatarPopup.style.display = "none";
  closeSubject();
  overlay.style.display = "none";
});

// Handle Switch Profile
switchProfileBtn.addEventListener("click", () => {
  currentStudentIndex = (currentStudentIndex + 1) % studentProfiles.length;
  updateStudentUI();
  avatarPopup.style.display = "none";
  overlay.style.display = "none";
});

// Tab switching
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const selectedTab = tab.getAttribute("data-tab");
    if (selectedTab === "home") {
      loadHomeTab();
    } else if (selectedTab === "today") {
      loadTodayTab();
    } else if (selectedTab === "homework") {
      loadPerformanceTab();
    }
  });
});

// Close subject modal buttons
closeSubjectModal.addEventListener("click", closeSubject);
backToHomeBtn.addEventListener("click", () => {
  closeSubject();
  tabs.forEach((t) => t.classList.remove("active"));
  const homeTab = document.querySelector('.tab[data-tab="home"]');
  homeTab.classList.add("active");
  loadHomeTab();
});

// Initial load
// Splash Screen Logic
window.addEventListener("load", () => {
  const splash = document.getElementById("splashScreen");
  setTimeout(() => {
    splash.style.display = "none";
    updateStudentUI(); // Load rest of the app
  }, 1000);
});

// Login 
const validUsername = "student";
const validPassword = "myschool123";

const loginScreen = document.getElementById("loginScreen");
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");

loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (username === validUsername && password === validPassword) {
    loginScreen.style.display = "none";
    const splash = document.getElementById("splashScreen");
    splash.style.display = "flex";
    
    setTimeout(() => {
      splash.style.display = "none";
      document.getElementById("appContainer").style.display = "block";
      updateStudentUI();
    }, 5000);
  } else {
    loginError.textContent = "Invalid username or password!";
  }
});

updateStudentUI();
