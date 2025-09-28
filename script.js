//your code here
let timer = null;
let startTime = 0;       // when stopwatch started
let elapsedTime = 0;     // total time passed (ms)
let isPaused = false;

function updateTime() {
  const now = Date.now();
  const diff = now - startTime + elapsedTime;

  let hours = Math.floor(diff / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // format HH:MM:SS
  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  document.getElementById("time").textContent = `${hours}:${minutes}:${seconds}`;
}

function start() {
  if (timer) return; // already running

  startTime = Date.now();
  timer = setInterval(updateTime, 100);

  document.getElementById("start").disabled = true;
  document.getElementById("pause").disabled = false;
  document.getElementById("stop").disabled = false;
}

function pause() {
  const pauseBtn = document.getElementById("pause");

  if (!isPaused) {
    // pause
    clearInterval(timer);
    timer = null;
    elapsedTime += Date.now() - startTime;
    isPaused = true;
    pauseBtn.textContent = "continue";
  } else {
    // continue
    startTime = Date.now();
    timer = setInterval(updateTime, 100);
    isPaused = false;
    pauseBtn.textContent = "pause";
  }
}

function stop() {
  clearInterval(timer);
  timer = null;
  startTime = 0;
  elapsedTime = 0;
  isPaused = false;

  document.getElementById("time").textContent = "00:00:00";

  document.getElementById("start").disabled = false;
  document.getElementById("pause").disabled = true;
  document.getElementById("stop").disabled = true;

  document.getElementById("pause").textContent = "pause";
}
