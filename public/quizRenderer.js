var startBtn = document.querySelector(".start-btn"),
  submitBtn = document.querySelector(".submit-btn"),
  nextBtn = document.querySelector(".next-btn"),
  questionElement = document.querySelector(".question"),
  answersContainer = document.querySelector(".q-container"),
  quizTitleElement = document.querySelector(".quiz-title"),
  correctCount = document.querySelector(".correct-count");
let currentQuestion = 0;
let correct = 0;

window.addEventListener("load", () => {
  quizTitleElement.innerHTML = quizData.title;
});

startBtn.addEventListener("click", () => {
  username=document.getElementById("username")
  if (username.value != "") {
    username.style.display="none";
    startQuiz();
  }
});

nextBtn.addEventListener("click", () => {
  loadQuestion(currentQuestion);
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

function loadQuestion(questionNum) {
  var usernameBox = document.getElementById("username");
  var correctBox = document.getElementById("correct");
  var totalBox = document.getElementById("total");

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
    correctCount.innerHTML = `${usernameBox.value} Correct: ${correct}/${questions.length}`;

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
            (element) => (element.disabled = true)
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

    correctCount.innerHTML = `${usernameBox.value} Correct: ${correct}`;
  }
}

function checkAnswer() {
  // Check different types

  switch (answersContainer.dataset.type) {
    case "mc":
      Array.from(answersContainer.children[0].children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
          if (
            button.dataset.correct === "true" &&
            button.dataset.clicked === "true"
          ) {
            correct++;
          }
        } else {
          button.classList.add("wrong");
        }
      });
      currentQuestion++;
      break;

    case "txt":
      var qInputElement = answersContainer.children[0];
      var foundValues = questions[currentQuestion].answers.find(
        (answer) => answer.toUpperCase() === qInputElement.value.toUpperCase()
      );
      if (foundValues) {
        qInputElement.classList.add("correct");
        correct++;
      } else {
        qInputElement.classList.add("wrong");
      }
      currentQuestion++;
      break;

    default:
      return;
      break;
  }

  //End different types
}
