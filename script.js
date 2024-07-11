let startTime, updatedTime, difference, tInterval, running = false, lapCount = 0;
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const timeDisplay = document.getElementById('time-display');
const lapsList = document.getElementById('laps-list');

function startTimer() {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    running = true;
    startStopButton.innerHTML = "Stop";
    lapButton.disabled = false;
    resetButton.disabled = false;
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
    startStopButton.innerHTML = "Start";
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    timeDisplay.innerHTML = "00:00:00";
    startStopButton.innerHTML = "Start";
    lapButton.disabled = true;
    resetButton.disabled = true;
    lapsList.innerHTML = '';
    lapCount = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timeDisplay.innerHTML = hours + ":" + minutes + ":" + seconds;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = timeDisplay.innerHTML;
        const li = document.createElement('li');
        li.innerHTML = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(li);
    }
}

startStopButton.addEventListener('click', () => {
    if (!running) {
        startTimer();
    } else {
        stopTimer();
    }
});

resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
lapButton.disabled = true;
resetButton.disabled = true;
