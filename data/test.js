// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("test"),
  subtitle: _("test"),
  submitAnytime: false,
  randomizeQuestions: false,
};

const questions = [
  {
    text: _("What is the mascot of openSUSE project?"),
    answers: [
      { text: _("Pascal"), correct: false },
      { text: _("TwoPac"), correct: false },
      { text: _("Geeko"), correct: true },
      { text: _("BeefyMiracle"), correct: false },
    ],
  },
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

module.exports = { quizData, questions };
