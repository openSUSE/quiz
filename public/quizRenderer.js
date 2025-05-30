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
});

startBtn.addEventListener("click", () => {
  const username = document.getElementById("username");
  if (username.value !== "") {
    username.style.display = "none";

    if (quizData.submitAnytime) {
      submitAnytimeBtn.classList.remove("hide");
    }

    startQuiz();
  }
});

nextBtn.addEventListener("click", () => {
  loadQuestion(currentQuestion);
});

submitAnytimeBtn.addEventListener("click", () => {
  endQuiz();
});

function startQuiz() {
  startBtn.classList.add("hide");
  //submitBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
  questionElement.classList.remove("hide");
  answersContainer.classList.remove("hide");
  correctCount.classList.remove("hide");
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

  correctCount.innerHTML = `👤 ${usernameBox.value} ✅ ${correct}/${currentQuestion}`;
}

function loadQuestion(questionNum) {
  var usernameBox = document.getElementById("username");
  var correctBox = document.getElementById("correct");
  var totalBox = document.getElementById("total");

  clearTimeout(questionTimeout);   // Clear previous timeout
  clearInterval(timerInterval);    // Clear previous interval too

  let timerDisplay = document.getElementById("timer");
  if (!timerDisplay) {
    timerDisplay = document.createElement("div");
    timerDisplay.id = "timer";
    timerDisplay.style.fontWeight = "bold";
    document.body.insertBefore(timerDisplay, answersContainer);
  }
  
  if (quizData.timeout && !isNaN(quizData.timeout)) {
    timerDisplay.classList.remove("hide");
    let timeLeft = quizData.timeout;
    timerDisplay.textContent = `⏱️ Time left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `⏱️ Time left: ${timeLeft}s`;
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
  total.value = questions.length;

  if (currentQuestion === questions.length) {
    //startBtn.classList.remove("hide"); // allow restart
    submitBtn.classList.remove("hide");
    nextBtn.classList.add("hide");
    questionElement.classList.add("hide");
    answersContainer.classList.add("hide");
    startBtn.innerHTML = "Restart";
    correctCount.innerHTML = `👤 ${usernameBox.value} ✅ ${correct}/${currentQuestion}`;

    correct = 0;
    currentQuestion = 0;
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
      checkBtn.addEventListener("click", (e) => {
        checkAnswer();
      });
      answersContainer.appendChild(inputElement);
      answersContainer.appendChild(checkBtn);
      answersContainer.dataset.type = "txt";
    }

    //End types

    correctCount.innerHTML = `👤 ${usernameBox.value} ✅ ${correct}/${currentQuestion}`;
  }
}

function checkAnswer(isTimeout = false) {
  clearTimeout(questionTimeout); // cancel timeout to avoid multiple calls

  switch (answersContainer.dataset.type) {
    case "mc":
      Array.from(answersContainer.children[0].children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
          if (
            button.dataset.clicked === "true" &&
            !isTimeout
          ) {
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
        (answer) =>
          answer.toUpperCase() === qInputElement.value.toUpperCase(),
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
