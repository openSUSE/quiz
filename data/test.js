const quizData = {
  title: "test",
  subtitle: "test",
  submitAnytime: false,
  randomizeQuestions: false,
};

const questions = [
  {
    text: "What is the mascot of openSUSE project?",
    type: "mc",
    answers: [
      { text: "Pascal", correct: false },
      { text: "TwoPac", correct: false },
      { text: "Geeko", correct: true },
      { text: "BeefyMiracle", correct: false },
    ],
  },
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

module.exports = { quizData, questions };
