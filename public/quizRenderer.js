var startBtn = document.querySelector(".start-btn"),
  submitBtn = document.querySelector(".submit-btn"),
  nextBtn = document.querySelector(".next-btn"),
  questionElement = document.querySelector(".question"),
  answersContainer = document.querySelector(".q-container"),
  quizTitleElement = document.querySelector(".quiz-title"),
  quizSubTitleElement = document.querySelector(".quiz-subtitle"),
  correctCount = document.querySelector(".correct-count"),
  submitAnytimeBtn = document.querySelector(".submit-anytime-btn");

let currentQuestion = 0;
let correct = 0;
let questionTimeout = null;
let timerInterval = null;

window.addEventListener("load", () => {
  quizTitleElement.innerHTML = quizData.title;
  quizSubTitleElement.innerHTML = quizData.subtitle;

  const usernameInput = document.getElementById("username");
  usernameInput.addEventListener("input", () => {
    if (usernameInput.classList.contains("input-error")) {
      usernameInput.classList.remove("input-error");
      usernameInput.removeAttribute("title");
    }
  });

  // Add event listener to the form for the submit event
  const usernameForm = document.querySelector(".username-form");
  if (usernameForm) {
    usernameForm.addEventListener("submit", () => {
      const actualUsernameInput = document.getElementById("username");
      if (actualUsernameInput) {
        actualUsernameInput.disabled = false;
      }
      // The form will now submit with the username field enabled.
    });
  }
});

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const usernameInput = document.getElementById("username");
  const usernameForm = document.querySelector(".username-form");

  if (startBtn.textContent === "Restart") {
    // Handle Restart action
    usernameForm.classList.remove("hide");
    usernameInput.disabled = false;
    usernameInput.value = "";
    usernameInput.classList.remove("input-error");
    usernameInput.removeAttribute("title");

    // Hide quiz elements
    questionElement.classList.add("hide");
    answersContainer.classList.add("hide");
    correctCount.classList.add("hide");
    nextBtn.classList.add("hide");
    submitBtn.classList.add("hide");

    // Reset quiz variables
    correct = 0;
    currentQuestion = 0;

    startBtn.textContent = "Start";
    usernameInput.focus();
    return;
  }

  // Handle Start action
  if (usernameInput.value.trim() !== "") {
    usernameInput.disabled = true;
    usernameInput.classList.remove("input-error");
    usernameInput.removeAttribute("title");

    if (quizData.submitAnytime) {
      submitAnytimeBtn.classList.remove("hide");
    }

    startQuiz();
  } else {
    usernameInput.classList.add("input-error");
    usernameInput.setAttribute("title", "Please enter a username to start.");
    usernameInput.focus();
  }
});

nextBtn.addEventListener("click", () => {
  loadQuestion(currentQuestion);
});

submitAnytimeBtn.addEventListener("click", () => {
  endQuiz();
});

function startQuiz() {
  const usernameForm = document.querySelector(".username-form");
  usernameForm.classList.add("hide");

  nextBtn.classList.remove("hide");
  questionElement.classList.remove("hide");
  answersContainer.classList.remove("hide");
  correctCount.classList.remove("hide");

  const usernameBox = document.getElementById("username");
  updateScoreDisplay(usernameBox.value);

  loadQuestion(currentQuestion);
}

function endQuiz() {
  const usernameBox = document.getElementById("username");
  const correctBox = document.getElementById("correct");
  const totalBox = document.getElementById("total");

  correctBox.value = correct;
  totalBox.value = currentQuestion;

  submitBtn.classList.remove("hide");
  nextBtn.classList.add("hide");
  questionElement.classList.add("hide");
  answersContainer.classList.add("hide");

  correctCount.innerHTML = `👤 ${usernameBox.value} ✅ <span class="score-correct">${correct}</span>/<span class="score-total">${currentQuestion}</span>`;
}

function loadQuestion(questionNum) {
  var usernameBox = document.getElementById("username");
  var correctBox = document.getElementById("correct");
  var totalBox = document.getElementById("total");

  clearTimeout(questionTimeout); // Clear previous timeout
  clearInterval(timerInterval); // Clear previous interval too

  let timerDisplay = document.getElementById("timer");
  if (!timerDisplay) {
    // Timer should already exist in the HTML, but create if missing
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

      // Add visual warnings based on time left
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

  // set values before posting
  correctBox.value = correct;
  totalBox.value = questions.length;

  if (currentQuestion === questions.length) {
    const usernameForm = document.querySelector(".username-form");
    usernameForm.classList.remove("hide");
    usernameBox.disabled = true;

    submitBtn.classList.remove("hide");
    nextBtn.classList.add("hide");
    questionElement.classList.add("hide");
    answersContainer.classList.add("hide");
    startBtn.textContent = "Restart";
    updateScoreDisplay(usernameBox.value, true);
  } else {
    while (answersContainer.firstChild) {
      answersContainer.removeChild(answersContainer.firstChild);
    }
    answersContainer.dataset.type = null;
    questionElement.innerHTML = questions[questionNum].text;

    // Question types

    if (questions[questionNum].type === "mc") {
      var btnGrid = document.createElement("div");
      answersContainer.appendChild(btnGrid);
      questions[questionNum].answers.forEach((answer) => {
        var answerElement = document.createElement("button");
        btnGrid.classList.add("btn-grid");
        answerElement.innerHTML = answer.text;
        answerElement.dataset.correct = answer.correct;
        answerElement.addEventListener("click", (e) => {
          Array.from(btnGrid.children).forEach(
            (element) => (element.disabled = true),
          );
          e.target.dataset.clicked = "true";
          checkAnswer();
        });
        btnGrid.appendChild(answerElement);
      });
      answersContainer.dataset.type = "mc";
    } else if (questions[questionNum].type === "txt") {
      var inputElement = document.createElement("input");
      var checkBtn = document.createElement("button");
      checkBtn.innerHTML = "Check";
      checkBtn.classList.add("check-btn");
      inputElement.type = "text";
      checkBtn.addEventListener("click", () => {
        checkAnswer();
      });
      answersContainer.appendChild(inputElement);
      answersContainer.appendChild(checkBtn);
      answersContainer.dataset.type = "txt";
    }

    //End types
    // Update score display
    updateScoreDisplay(usernameBox.value);
  }
}

function checkAnswer(isTimeout = false) {
  clearTimeout(questionTimeout); // cancel timeout to avoid multiple calls

  switch (answersContainer.dataset.type) {
    case "mc":
      Array.from(answersContainer.children[0].children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
          if (button.dataset.clicked === "true" && !isTimeout) {
            correct++;
          }
        } else {
          button.classList.add("wrong");
        }
        button.disabled = true; // Disable all buttons
      });
      break;

    case "txt":
      var qInputElement = answersContainer.children[0];
      var foundValues = questions[currentQuestion].answers.find(
        (answer) => answer.toUpperCase() === qInputElement.value.toUpperCase(),
      );
      if (foundValues && !isTimeout) {
        qInputElement.classList.add("correct");
        correct++;
      } else {
        qInputElement.classList.add("wrong");
      }
      break;

    default:
      return;
  }

  currentQuestion++;
}

// Helper function to update timer display with better formatting
function updateTimerDisplay(timerElement, timeLeft) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString =
    minutes > 0
      ? `${minutes}:${seconds.toString().padStart(2, "0")}`
      : `${seconds}s`;

  timerElement.innerHTML = `⏱️ ${timeString}`;
}

// Helper function to update score display with green color for correct answers
function updateScoreDisplay(username, isFinal = false) {
  const correctSpan = `<span class="score-correct">${correct}</span>`;
  const totalSpan = `<span class="score-total">${questions.length}</span>`;
  const separator = '<span class="score-separator">/</span>';

  if (isFinal) {
    correctCount.innerHTML = `
      <span class="username-display">🎯 ${username}</span>
      <span class="score">FINAL: ${correctSpan}${separator}${totalSpan}</span>
    `;
  } else {
    correctCount.innerHTML = `
      <span class="username-display">👤 ${username}</span>
      <span class="score">Score: ${correctSpan}${separator}${totalSpan}</span>
    `;
  }
}
