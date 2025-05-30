const quizData = {
  title: "test",
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
module.exports = { quizData, questions };
