// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};

let session = localStorage.getItem("session");
session = JSON.parse(session)
const sessionLength = session.length;
let breaks = session.breaks;
const breakCount = breaks.length;
const TIME_LIMIT = sessionLength;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let breakTimeElapsed = 0;
const breakTimeInterval = sessionLength > 0 ? Math.floor(sessionLength / (breakCount + 1)) : null;
let breakTimeLeft = breakTimeInterval;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
)}</span>
</div>
`;

document.getElementById("message").innerHTML = `
<div class="warning-msg">
        <i class="fa fa-warning"></i>
       <span id="message-label"> Your Next Break Will Start in ${formatTime(timeLeft)}</span>
    </div>
`;


startTimer();

function onTimesUp() {
    clearInterval(timerInterval);
    localStorage.removeItem("session")
    playSound();
    setTimeout(() => alert("way to go!!! You finished your session. You will be redirected to the tasks page so that you can check your completed tasks."))
    /**
     * Navigate away
     */
    var anchor = document.createElement('a');
    anchor.href = '../tasks';
    anchor.target="iframe_a";
    anchor.click();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        breakTimeElapsed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        breakTimeLeft = breakTimeInterval - breakTimeElapsed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        document.getElementById("message-label").innerHTML =  `Your Next Break Will Start in ${formatTime(breakTimeLeft)}`;
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            return onTimesUp();
        }

        if(breakTimeElapsed === breakTimeInterval) {
            breakTimeElapsed = 0;
            const myBreak = breaks.shift();
            playSound()
            setTimeout(() => {
                alert(myBreak.content)
            },100)
        }
    }, 1000);
}

function formatTime(time) {
    let hours = Math.floor(Math.floor(time / 60) / 60);
    let minutes = Math.floor((time / 60) % 60);
    let seconds = time % 60;

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}


function resumePauseTimer(e) {
    let txt = e.innerText;
    e.innerText = txt == 'PAUSE' ? 'RESUME' : 'PAUSE';

    if(txt === 'PAUSE') {
        clearInterval(timerInterval)
    } else {
        startTimer();
    }
}


function playSound() {
    let audioPlayer = Array.from(document.getElementsByTagName("audio"));
    const audio = audioPlayer[0];
    audio.play();
}


async function apiFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function renderQuote(response) {
    document.getElementById("quote").innerHTML = `
<blockquote><p>${response.content}</p></blockquote>
<p id="quote-author">--- ${response.author}</p>
<div class="quote">
    </div>
`;
}

apiFetch('https://quotable.io/random').then(renderQuote);
