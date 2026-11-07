/* global uiStrings */
/* global existingLogins */
/* global Agility */

var startBtn = document.querySelector(".start-btn"),
  submitBtn = document.querySelector(".submit-btn"),
  nextBtn = document.querySelector(".next-btn"),
  questionElement = document.querySelector(".question"),
  questionContainer = document.querySelector(".question-container"),
  answersContainer = document.querySelector(".q-container"),
  quizTitleElement = document.querySelector(".quiz-title"),
  quizSubTitleElement = document.querySelector(".quiz-subtitle"),
  correctCount = document.querySelector(".correct-count"),
  submitAnytimeBtn = document.querySelector(".submit-anytime-btn"),
  quitBtn = document.querySelector(".quit-btn"),
  backBtnQuiz = document.querySelector(".back-btn-quiz");

let currentQuestion = 0;
let correct = 0;
let questionTimeout = null;
let timerInterval = null;

// Points: answers are worth more the faster they come, agility rounds
// (at half-time and at the end) add up to Agility.MAX_POINTS each.
const QUESTION_MAX_POINTS = 1000;
const QUESTION_MIN_FACTOR = 0.5; // slow but correct still earns half
const QUESTION_DECAY_MS = 15000; // time after the reading grace to hit the floor
// Quizzes shorter than this only get the final agility round.
const AGILITY_HALFTIME_MIN_QUESTIONS = 10;
const agilityEnabled =
  typeof Agility !== "undefined" && quizData.agility !== false;
let points = 0;
// Each quiz run plays a shuffled selection of the agility games, so the
// two rounds are always different and every game gets its turn over time.
function shuffledAgilityRounds() {
  if (!agilityEnabled) return [];
  const rounds = [...Agility.ROUND_TYPES];
  for (let i = rounds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rounds[i], rounds[j]] = [rounds[j], rounds[i]];
  }
  return rounds;
}
let agilityPlan = shuffledAgilityRounds();
let agilityRoundsPlayed = 0;
let lastAgilityAt = 0;
let questionShownAt = 0;
let answerClickedAt = 0;
let agilityRunning = false;

// Longer questions get a longer reading grace before points start dropping.
function readingGraceMs(question) {
  const len = String(question.text || "").replace(/<[^>]*>/g, "").length;
  return Math.min(6000, 2000 + len * 35);
}

function questionPoints(elapsedMs, question) {
  return Math.round(
    QUESTION_MAX_POINTS *
      Agility.speedFactor(
        elapsedMs,
        readingGraceMs(question),
        readingGraceMs(question) + QUESTION_DECAY_MS,
        QUESTION_MIN_FACTOR
      )
  );
}

// Keep in sync with agilityCheckpoints() in src/consts.js
function agilityCheckpoints(total) {
  if (total < 1) return [];
  if (total < AGILITY_HALFTIME_MIN_QUESTIONS) return [total];
  return [Math.ceil(total / 2), total];
}

function agilityDue() {
  return (
    agilityEnabled &&
    agilityCheckpoints(questions.length).includes(currentQuestion) &&
    lastAgilityAt !== currentQuestion
  );
}

async function runAgilityRound() {
  agilityRunning = true;
  lastAgilityAt = currentQuestion;
  const stage = document.querySelector(".agility-container");
  [questionContainer, answersContainer, nextBtn, submitAnytimeBtn, quitBtn]
    .filter(Boolean)
    .forEach((node) => node.classList.add("hide"));

  const type = agilityPlan[agilityRoundsPlayed++ % agilityPlan.length];
  const result = await Agility.runRound(type, stage, uiStrings);
  points += result.points;
  updateScoreDisplay(document.getElementById("username").value);

  // quit / submit-anytime are restored by loadQuestion(), Next is not
  questionContainer.classList.remove("hide");
  answersContainer.classList.remove("hide");
  nextBtn.classList.remove("hide");
  agilityRunning = false;
}

function showPointsGain(gained) {
  const pop = document.createElement("div");
  pop.className = `points-pop ${gained > 0 ? "good" : "bad"}`;
  pop.textContent = `+${gained}`;
  correctCount.appendChild(pop);
  setTimeout(() => pop.remove(), 1200);
}

function isLoginTaken(login) {
  const lowerLogin = login.toLowerCase();
  const storedNick = localStorage.getItem("quizNickname");

  if (storedNick && storedNick.toLowerCase() === lowerLogin) {
    return false;
  }
  return existingLogins.includes(lowerLogin);
}

function updateUsernameValues(value) {
  const usernameInput = document.getElementById("username");
  const usernameTopHidden = document.getElementById("username-top-hidden");
  if (usernameInput) usernameInput.value = value;
  if (usernameTopHidden) usernameTopHidden.value = value;
}

window.addEventListener("load", () => {
  quizTitleElement.innerHTML = quizData.title;
  quizSubTitleElement.innerHTML = quizData.subtitle;

  const usernameInput = document.getElementById("username");
  const usernameTopHidden = document.getElementById("username-top-hidden");

  // Load saved nickname from localStorage, if any
  const savedNickname = localStorage.getItem("quizNickname");
  if (savedNickname) {
    updateUsernameValues(savedNickname);
    // auto-skip start screen and go straight to quiz
    handleStartAction();
  }

  usernameInput.addEventListener("input", () => {
    if (isLoginTaken(usernameInput.value)) {
      usernameInput.classList.add("input-error");
      usernameInput.setAttribute("title", uiStrings.usernameTaken);
      return;
    }
    if (usernameInput.classList.contains("input-error")) {
      usernameInput.classList.remove("input-error");
      usernameInput.removeAttribute("title");
    }
    if (usernameTopHidden) usernameTopHidden.value = usernameInput.value;
    if (usernameInput.classList.contains("input-error")) {
      usernameInput.classList.remove("input-error");
      usernameInput.removeAttribute("title");
    }
  });

  const topForm = document.querySelector(".submit-form-top");
  if (topForm) {
    topForm.addEventListener("submit", (event) => {
      if (!confirm(uiStrings.confirmSubmit)) {
        event.preventDefault();
        return;
      }
      const actualUsernameInput = document.getElementById("username");
      document.getElementById("username-top-hidden").value =
        actualUsernameInput.value;
      document.getElementById("username-top-hidden").disabled = false;
    });
  }

  if (submitAnytimeBtn) {
    submitAnytimeBtn.addEventListener("click", () => {
      if (confirm(uiStrings.confirmSubmit)) {
        endQuiz(true);
      }
    });
  }

  if (quitBtn) {
    quitBtn.addEventListener("click", () => {
      if (confirm(uiStrings.confirmQuit)) {
        window.location.href = "/";
      }
    });
  }

  if (backBtnQuiz) {
    backBtnQuiz.addEventListener("click", () => {
      window.location.href = "/";
    });
  }

  const usernameForm = document.querySelector(".submit-form-bottom");
  if (usernameForm) {
    usernameForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default HTML form submission
      const usernameInput = document.getElementById("username");
      const username = usernameInput.value.trim();

      if (username === "") {
        usernameInput.classList.add("input-error");
        usernameInput.setAttribute("title", uiStrings.usernamePrompt);
        usernameInput.focus();
        return;
      }
      if (username.length < 4) {
        usernameInput.classList.add("input-error");
        usernameInput.setAttribute("title", uiStrings.tooSimpleUsername);
        usernameInput.focus();
        return;
      }

      endQuiz(true);
    });
  }
});

function handleStartAction() {
  const usernameInput = document.getElementById("username");
  const topForm = document.querySelector(".submit-form-top");

  if (startBtn.textContent === "Restart") {
    usernameInput.disabled = false;
    usernameInput.value = "";
    usernameInput.classList.remove("input-error");
    usernameInput.removeAttribute("title");

    questionContainer.classList.add("hide");
    answersContainer.classList.add("hide");
    correctCount.classList.add("hide");
    nextBtn.classList.add("hide");
    submitBtn.classList.add("hide");
    submitAnytimeBtn.classList.add("hide");
    quitBtn.classList.add("hide");
    topForm.classList.add("hide");

    correct = 0;
    currentQuestion = 0;
    points = 0;
    agilityPlan = shuffledAgilityRounds();
    agilityRoundsPlayed = 0;
    lastAgilityAt = 0;
    startBtn.textContent = "Start";
    usernameInput.focus();
    backBtnQuiz.classList.remove("hide");
    return;
  }

  const username = usernameInput.value.trim();

  // validate nickname
  if (username === "") {
    usernameInput.classList.add("input-error");
    alert(uiStrings.usernamePrompt);
    usernameInput.setAttribute("title", uiStrings.usernamePrompt);
    usernameInput.focus();
    return;
  }

  if (username.length < 4) {
    usernameInput.classList.add("input-error");
    alert(uiStrings.tooSimpleUsername);
    usernameInput.setAttribute("title", uiStrings.tooSimpleUsername);
    usernameInput.focus();
    return;
  }

  if (isLoginTaken(username)) {
    usernameInput.classList.add("input-error");
    alert(uiStrings.usernameTaken);
    usernameInput.setAttribute("title", uiStrings.usernameTaken);
    usernameInput.focus();
    return;
  }

  // passed validation — save nickname now
  localStorage.setItem("quizNickname", username);

  usernameInput.disabled = true;
  document.getElementById("username-top-hidden").value = username;
  usernameInput.classList.remove("input-error");
  usernameInput.removeAttribute("title");

  topForm.classList.remove("hide");
  if (quizData.submitAnytime) {
    submitAnytimeBtn.classList.remove("hide");
  }
  quitBtn.classList.remove("hide");
  backBtnQuiz.classList.add("hide");

  startQuiz();
}

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  handleStartAction();
});

nextBtn.addEventListener("click", async () => {
  if (agilityRunning) return;
  if (agilityDue()) {
    await runAgilityRound();
  }
  loadQuestion(currentQuestion);
});

function startQuiz() {
  const usernameForm = document.querySelector(".submit-form-bottom");
  const usernameInstructions = document.querySelector(".username-instructions");
  usernameForm.classList.add("hide");
  usernameInstructions.classList.add("hide");

  nextBtn.classList.remove("hide");
  questionContainer.classList.remove("hide");
  answersContainer.classList.remove("hide");
  correctCount.classList.remove("hide");

  const usernameBox = document.getElementById("username");
  updateScoreDisplay(usernameBox.value);

  loadQuestion(currentQuestion);
}

function endQuiz(isQuitAndSubmit = false) {
  const usernameBox = document.getElementById("username");
  const correctBoxTop = document.getElementById("correct-top-hidden");
  const totalBoxTop = document.getElementById("total-top-hidden");

  if (!isQuitAndSubmit && !isFinalQuestion()) {
    window.location.href = "/";
    return;
  }

  correctBoxTop.value = correct;
  totalBoxTop.value = currentQuestion > 0 ? currentQuestion : questions.length;
  document.getElementById("points-top-hidden").value = points;
  document.getElementById("username-top-hidden").value = usernameBox.value;

  submitBtn.classList.add("hide");
  nextBtn.classList.add("hide");
  questionContainer.classList.add("hide");
  answersContainer.classList.add("hide");
  submitAnytimeBtn.classList.add("hide");
  quitBtn.classList.add("hide");

  const topForm = document.querySelector(".submit-form-top");
  document.getElementById("username-top-hidden").disabled = false;

  // Mark this quiz as completed
  const params = new URLSearchParams(window.location.search);
  const quizSlug = params.get("name");
  if (quizSlug) {
    let completed = JSON.parse(
      localStorage.getItem("completedQuizzes") || "[]"
    );
    if (!completed.includes(quizSlug)) {
      completed.push(quizSlug);
      localStorage.setItem("completedQuizzes", JSON.stringify(completed));
    }
  }

  // Unlock next difficulty
  let currentDifficulty = parseInt(
    localStorage.getItem("quizDifficulty") || "1"
  );
  let nextDifficulty = parseInt(
    localStorage.getItem("quizNextDifficulty") || currentDifficulty + 1
  );
  if (nextDifficulty > currentDifficulty) {
    localStorage.setItem("quizDifficulty", nextDifficulty);
    localStorage.setItem("quizNextDifficulty", nextDifficulty + 1);
    // trigger animation on index.ejs when new quizzes are unlocked
    localStorage.setItem("newQuizzesUnlocked", "true");
  }

  if (isQuitAndSubmit || currentQuestion === questions.length) {
    topForm.submit();
  }

  correctCount.innerHTML = `👤 ${usernameBox.value} ✅
    <span class="score-correct">${correct}</span>/
    <span class="score-total">${currentQuestion > 0 ? currentQuestion : questions.length}</span>`;

  // Show start screen again
  const usernameForm = document.querySelector(".submit-form-bottom");
  const usernameInstructions = document.querySelector(".username-instructions");
  usernameForm.classList.remove("hide");
  usernameInstructions.classList.remove("hide");

  startBtn.textContent = "Restart";
  usernameBox.disabled = true;
}

function isFinalQuestion() {
  return currentQuestion === questions.length;
}

function loadQuestion(questionNum) {
  // End early if we’ve run out of questions
  if (currentQuestion === questions.length) {
    endQuiz();
    return;
  }

  var usernameBox = document.getElementById("username");
  var correctBoxTop = document.getElementById("correct-top-hidden");
  var totalBoxTop = document.getElementById("total-top-hidden");

  clearTimeout(questionTimeout);
  clearInterval(timerInterval);

  let timerDisplay = document.getElementById("timer");
  if (!timerDisplay) {
    timerDisplay = document.createElement("div");
    timerDisplay.id = "timer";
    timerDisplay.className = "hide";
    document.querySelector(".status-container").appendChild(timerDisplay);
  }

  if (quizData.timeout && !isNaN(quizData.timeout)) {
    timerDisplay.classList.remove("hide");
    let timeLeft = quizData.timeout;
    updateTimerDisplay(timerDisplay, timeLeft);

    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay(timerDisplay, timeLeft);
      if (timeLeft <= 5) timerDisplay.className = "critical";
      else if (timeLeft <= 10) timerDisplay.className = "warning";
      else timerDisplay.className = "";

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);

    questionTimeout = setTimeout(() => {
      clearInterval(timerInterval);
      checkAnswer(true);
    }, quizData.timeout * 1000);
  } else {
    timerDisplay.classList.add("hide");
  }

  correctBoxTop.value = correct;
  totalBoxTop.value = questions.length;
  document.getElementById("points-top-hidden").value = points;
  document.getElementById("username-top-hidden").value = usernameBox.value;

  // Normal question render
  submitBtn.classList.add("hide");
  if (quizData.submitAnytime) {
    submitAnytimeBtn.classList.remove("hide");
  }
  quitBtn.classList.remove("hide");

  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }

  questionElement.innerHTML = questions[questionNum].text;
  const btnGrid = document.createElement("div");
  btnGrid.classList.add("btn-grid");
  answersContainer.appendChild(btnGrid);

  questions[questionNum].answers.forEach((answer) => {
    const answerElement = document.createElement("button");
    answerElement.innerHTML = answer.text;
    answerElement.dataset.correct = answer.correct;
    answerElement.addEventListener("click", (e) => {
      Array.from(btnGrid.children).forEach(
        (element) => (element.disabled = true)
      );
      answerClickedAt = performance.now();
      answerElement.dataset.clicked = "true";
      checkAnswer();
    });
    btnGrid.appendChild(answerElement);
  });
  questionShownAt = performance.now();
}

function checkAnswer(isTimeout = false) {
  clearTimeout(questionTimeout);
  clearInterval(timerInterval);
  let gained = 0;

  Array.from(answersContainer.children[0].children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
      if (button.dataset.clicked === "true" && !isTimeout) {
        correct++;
        gained = questionPoints(
          answerClickedAt - questionShownAt,
          questions[currentQuestion]
        );
      }
    } else {
      button.classList.add("wrong");
    }
    button.disabled = true;
  });

  currentQuestion++;
  points += gained;
  const usernameBox = document.getElementById("username");
  updateScoreDisplay(usernameBox.value);
  showPointsGain(gained);
}

function updateTimerDisplay(timerElement, timeLeft) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString =
    minutes > 0
      ? `${minutes}:${seconds.toString().padStart(2, "0")}`
      : `${seconds}s`;
  timerElement.innerHTML = `⏱️ ${timeString}`;
}

function updateScoreDisplay(username, isFinal = false) {
  const correctSpan = `<span class="score-correct">${correct}</span>`;
  const totalSpan = `<span class="score-total">${questions.length}</span>`;
  const separator = '<span class="score-separator">/</span>';
  const pointsSpan = `<span class="score-points">⚡ ${points}</span>`;

  if (isFinal) {
    correctCount.innerHTML = `
      <span class="username-display">🎯 ${username}</span>
      <span class="score">${uiStrings.final}: ${correctSpan}${separator}${totalSpan}</span>
      ${pointsSpan}
    `;
  } else {
    correctCount.innerHTML = `
      <span class="username-display">👤 ${username}</span>
      <span class="score">${uiStrings.score}: ${correctSpan}${separator}${totalSpan}</span>
      ${pointsSpan}
    `;
  }
}
