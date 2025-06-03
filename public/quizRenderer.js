/* global uiStrings */

var startBtn = document.querySelector(".start-btn"),
  submitBtn = document.querySelector(".submit-btn"),
  nextBtn = document.querySelector(".next-btn"),
  questionElement = document.querySelector(".question"),
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
  }

  usernameInput.addEventListener("input", () => {
    localStorage.setItem("quizNickname", usernameInput.value);
    if (usernameTopHidden) usernameTopHidden.value = usernameInput.value;

    if (usernameInput.classList.contains("input-error")) {
      usernameInput.classList.remove("input-error");
      usernameInput.removeAttribute("title");
    }
  });

  const topForm = document.querySelector(".submit-form-top");
  if (topForm) {
    topForm.addEventListener("submit", (event) => {
      if (!confirm("Are you sure you want to submit?")) {
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
      // Triggered by the submitBtn in this form
      event.preventDefault(); // Prevent the default HTML form submission

      const usernameInput = document.getElementById("username");
      const username = usernameInput.value.trim();

      if (username === "") {
        usernameInput.classList.add("input-error");
        usernameInput.setAttribute(
          "title",
          "Please enter a username to submit.",
        );
        usernameInput.focus();
        return; // Stop if username is missing
      }
      if (username.length < 3) {
        usernameInput.classList.add("input-error");
        usernameInput.setAttribute(
          "title",
          "Username must be at least 3 characters long.",
        );
        usernameInput.focus();
        return; // Stop if username is too short
      }

      // Call endQuiz(true) to handle <the submission of results.
      // endQuiz will populate the hidden fields in the topForm and submit it.
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

    questionElement.classList.add("hide");
    answersContainer.classList.add("hide");
    correctCount.classList.add("hide");
    nextBtn.classList.add("hide");
    submitBtn.classList.add("hide");
    submitAnytimeBtn.classList.add("hide");
    quitBtn.classList.add("hide");
    topForm.classList.add("hide");

    correct = 0;
    currentQuestion = 0;
    startBtn.textContent = "Start";
    usernameInput.focus();
    backBtnQuiz.classList.remove("hide");
    return;
  }

  const username = usernameInput.value.trim();
  if (username !== "") {
    if (username.length < 3) {
      usernameInput.classList.add("input-error");
      usernameInput.setAttribute(
        "title",
        "Username must be at least 3 characters long.",
      );
      usernameInput.focus();
      return;
    }
    usernameInput.disabled = true;
    document.getElementById("username-top-hidden").value = usernameInput.value;
    usernameInput.classList.remove("input-error");
    usernameInput.removeAttribute("title");

    topForm.classList.remove("hide");
    if (quizData.submitAnytime) {
      submitAnytimeBtn.classList.remove("hide");
    }
    quitBtn.classList.remove("hide");
    backBtnQuiz.classList.add("hide");

    startQuiz();
  } else {
    usernameInput.classList.add("input-error");
    usernameInput.setAttribute("title", uiStrings.usernamePrompt);
    usernameInput.focus();
  }
}

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  handleStartAction();
});

nextBtn.addEventListener("click", () => {
  loadQuestion(currentQuestion);
});

function startQuiz() {
  const usernameForm = document.querySelector(".submit-form-bottom");
  usernameForm.classList.add("hide");

  nextBtn.classList.remove("hide");
  questionElement.classList.remove("hide");
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
  document.getElementById("username-top-hidden").value = usernameBox.value;

  submitBtn.classList.add("hide");
  nextBtn.classList.add("hide");
  questionElement.classList.add("hide");
  answersContainer.classList.add("hide");
  submitAnytimeBtn.classList.add("hide");
  quitBtn.classList.add("hide");

  const topForm = document.querySelector(".submit-form-top");

  const usernameTopHidden = document.getElementById("username-top-hidden");
  usernameTopHidden.disabled = false;

  if (isQuitAndSubmit || currentQuestion === questions.length) {
    topForm.submit();
  }

  correctCount.innerHTML = `👤 ${usernameBox.value} ✅ <span class="score-correct">${correct}</span>/<span class="score-total">${currentQuestion > 0 ? currentQuestion : questions.length}</span>`;

  const usernameForm = document.querySelector(".submit-form-bottom");
  usernameForm.classList.remove("hide");
  startBtn.textContent = "Restart";
  usernameBox.disabled = true;
}

function isFinalQuestion() {
  return currentQuestion === questions.length;
}

function loadQuestion(questionNum) {
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

      if (timeLeft <= 5) {
        timerDisplay.className = "critical";
      } else if (timeLeft <= 10) {
        timerDisplay.className = "warning";
      } else {
        timerDisplay.className = "";
      }

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
  document.getElementById("username-top-hidden").value = usernameBox.value;

  if (currentQuestion === questions.length) {
    const usernameForm = document.querySelector(".submit-form-bottom");
    usernameForm.classList.remove("hide");
    usernameBox.disabled = true;

    submitBtn.classList.remove("hide");
    submitAnytimeBtn.classList.add("hide");
    quitBtn.classList.add("hide");
    nextBtn.classList.add("hide");
    questionElement.classList.add("hide");
    answersContainer.classList.add("hide");
    startBtn.textContent = "Restart";
    updateScoreDisplay(usernameBox.value, true);
  } else {
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
        // disable all buttons
        Array.from(btnGrid.children).forEach(
          (element) => (element.disabled = true),
        );
        e.target.dataset.clicked = "true";
        checkAnswer();
      });
      btnGrid.appendChild(answerElement);
    });
  }
}

function checkAnswer(isTimeout = false) {
  clearTimeout(questionTimeout);

  Array.from(answersContainer.children[0].children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
      if (button.dataset.clicked === "true" && !isTimeout) {
        correct++;
      }
    } else {
      button.classList.add("wrong");
    }
    button.disabled = true;
  });

  currentQuestion++;
  const usernameBox = document.getElementById("username");
  updateScoreDisplay(usernameBox.value);
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

  if (isFinal) {
    correctCount.innerHTML = `
      <span class="username-display">🎯 ${username}</span>
      <span class="score">${uiStrings.final}: ${correctSpan}${separator}${totalSpan}</span>
    `;
  } else {
    correctCount.innerHTML = `
      <span class="username-display">👤 ${username}</span>
      <span class="score">${uiStrings.score}: ${correctSpan}${separator}${totalSpan}</span>
    `;
  }
}
