const cardTitle = document.getElementById("cardTitle");
const createCardBtn = document.getElementById("createCardBtn");
const renameFirstBtn = document.getElementById("renameFirstBtn");
const toggleCardsBtn = document.getElementById("toggleCardsBtn");
const cardBoard = document.getElementById("cardBoard");
const cardCount = document.getElementById("cardCount");

const counterBtn = document.getElementById("counterBtn");
const counterOutput = document.getElementById("counterOutput");
const liveInput = document.getElementById("liveInput");
const liveOutput = document.getElementById("liveOutput");
const scrollBox = document.getElementById("scrollBox");
const scrollProgress = document.getElementById("scrollProgress");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const eventLog = document.getElementById("eventLog");
const clearLogBtn = document.getElementById("clearLogBtn");

const profileForm = document.getElementById("profileForm");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const loadProfileBtn = document.getElementById("loadProfileBtn");
const clearProfileBtn = document.getElementById("clearProfileBtn");
const profileOutput = document.getElementById("profileOutput");

const STORAGE_KEY = "revice-profile";

let clickCount = 0;
let cardIndex = 0;
let taskIndex = taskList.children.length;

function updateCardCount() {
  const totalCards = cardBoard.children.length;
  cardCount.textContent = `${totalCards} cards created`;
}

function createCard(title) {
  cardIndex += 1;
  const card = document.createElement("article");
  card.className = "topic-card";
  card.dataset.cardId = String(cardIndex);
  card.textContent = title || `DOM Topic ${cardIndex}`;
  cardBoard.append(card);
  updateCardCount();
}

createCardBtn.addEventListener("click", () => {
  createCard(cardTitle.value.trim());
  cardTitle.value = "";
  cardTitle.focus();
});

renameFirstBtn.addEventListener("click", () => {
  const firstCard = cardBoard.querySelector(".topic-card");

  if (!firstCard) {
    counterOutput.textContent = "Create a card first, then rename it.";
    return;
  }

  firstCard.textContent = "Updated with textContent";
});

toggleCardsBtn.addEventListener("click", () => {
  const cards = cardBoard.querySelectorAll(".topic-card");
  cards.forEach((card) => card.classList.toggle("is-highlighted"));
});

counterBtn.addEventListener("click", () => {
  clickCount += 1;
  counterOutput.textContent = `Button clicked ${clickCount} times.`;
});

liveInput.addEventListener("input", (event) => {
  const value = event.target.value.trim();
  liveOutput.textContent = value
    ? `Mirror: ${value}`
    : "Mirror: nothing typed yet.";
});

scrollBox.addEventListener("scroll", () => {
  const maxScroll = scrollBox.scrollHeight - scrollBox.clientHeight;
  const scrollPercent = maxScroll === 0 ? 0 : (scrollBox.scrollTop / maxScroll) * 100;
  scrollProgress.style.width = `${scrollPercent}%`;
});

function updateTaskCount() {
  taskCount.textContent = `${taskList.children.length} tasks in list`;
}

function buildTaskItem(label) {
  taskIndex += 1;
  const listItem = document.createElement("li");
  listItem.className = "task-item";
  listItem.dataset.id = String(taskIndex);
  listItem.innerHTML = `
    <span></span>
    <div class="task-actions">
      <button data-action="complete" type="button">Complete</button>
      <button data-action="remove" type="button">Remove</button>
    </div>
  `;
  listItem.querySelector("span").textContent = label;
  return listItem;
}

addTaskBtn.addEventListener("click", () => {
  const value = taskInput.value.trim();

  if (!value) {
    taskInput.focus();
    return;
  }

  taskList.append(buildTaskItem(value));
  taskInput.value = "";
  updateTaskCount();
});

taskList.addEventListener("click", (event) => {
  const actionButton = event.target.closest("button[data-action]");

  if (!actionButton) {
    return;
  }

  const taskItem = actionButton.closest(".task-item");
  const { action } = actionButton.dataset;

  if (action === "complete") {
    taskItem.classList.toggle("is-complete");
  }

  if (action === "remove") {
    taskItem.remove();
    updateTaskCount();
  }
});

function addEventLogEntry(phase, label) {
  const item = document.createElement("li");
  item.textContent = `${phase}: ${label}`;
  eventLog.prepend(item);
}

function registerPropagation(nodeId, label) {
  const node = document.getElementById(nodeId);
  node.addEventListener("click", () => addEventLogEntry("capture", label), true);
  node.addEventListener("click", () => addEventLogEntry("bubble", label));
}

registerPropagation("outerBox", "outer box");
registerPropagation("middleBox", "middle box");
registerPropagation("innerBox", "inner box");

clearLogBtn.addEventListener("click", () => {
  eventLog.innerHTML = "";
});

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function renderProfile(profile) {
  if (!profile) {
    profileOutput.textContent = "No profile saved yet.";
    return;
  }

  profileOutput.innerHTML = `
    <strong>Name:</strong> ${profile.username}<br />
    <strong>Email:</strong> ${profile.email}<br />
    <strong>Favorite topic:</strong> ${profile.favoriteTopic}
  `;
}

emailInput.addEventListener("input", () => {
  if (!emailInput.value.trim()) {
    emailError.textContent = "";
    return;
  }

  emailError.textContent = isValidEmail(emailInput.value)
    ? ""
    : "Enter a valid email address.";
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(profileForm);
  const profile = Object.fromEntries(formData.entries());

  if (!isValidEmail(profile.email)) {
    emailError.textContent = "Enter a valid email address before saving.";
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  renderProfile(profile);
  profileForm.reset();
  emailError.textContent = "";
});

loadProfileBtn.addEventListener("click", () => {
  const savedProfile = localStorage.getItem(STORAGE_KEY);
  renderProfile(savedProfile ? JSON.parse(savedProfile) : null);
});

clearProfileBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  renderProfile(null);
});

updateCardCount();
updateTaskCount();
loadProfileBtn.click();