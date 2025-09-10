const WORK_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

let timeLeft = WORK_TIME;
let isRunning = false;
let onBreak = false;
let timer = null;

const statusEl = document.getElementById("status");
const timerEl = document.getElementById("timer");
const startPauseBtn = document.getElementById("start-pause");
const resetBtn = document.getElementById("reset");

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateDisplay() {
  timerEl.textContent = formatTime(timeLeft);
  statusEl.textContent = onBreak ? "Pause" : "Travail";
  startPauseBtn.textContent = isRunning ? "Pause" : "Démarrer";
}

function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    // switch phase
    if (onBreak) {
      timeLeft = WORK_TIME;
      onBreak = false;
    } else {
      timeLeft = BREAK_TIME;
      onBreak = true;
    }
    updateDisplay();
  }
}

startPauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  } else {
    timer = setInterval(tick, 1000);
    isRunning = true;
  }
  updateDisplay();
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  onBreak = false;
  timeLeft = WORK_TIME;
  updateDisplay();
});

// Init
updateDisplay();
