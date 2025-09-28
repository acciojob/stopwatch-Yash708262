let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isPaused = false;

function formatTime(ms) {
  let hours = Math.floor(ms / (1000 * 60 * 60));
  let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((ms % (1000 * 60)) / 1000);

  return (
    String(hours).padStart(2, '0') + ":" +
    String(minutes).padStart(2, '0') + ":" +
    String(seconds).padStart(2, '0')
  );
}

function updateTime() {
  const now = Date.now();
  const diff = now - startTime + elapsedTime;
  document.getElementById("time").textContent = formatTime(diff);
}

function start() {
  if (timer) return;

  startTime = Date.now();
  timer = setInterval(updateTime, 100);

  document.getElementById("start").disabled = true;
  document.getElementById("pause").disabled = false;
  document.getElementById("stop").disabled = false;
}

function pause() {
  const pauseBtn = document.getElementById("pause");

  if (!isPaused) {
    clearInterval(timer);
    timer = null;
    elapsedTime += Date.now() - startTime;
    isPaused = true;
    pauseBtn.textContent = "continue";
  } else {
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

