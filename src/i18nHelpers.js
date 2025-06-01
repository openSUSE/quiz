function localizeQuizData({ quizData, questions }, __) {
  return {
    quizData: {
      ...quizData,
      title: __(quizData.title),
      subtitle: __(quizData.subtitle),
    },
    questions: questions.map((q) => ({
      ...q,
      text: __(q.text),
      answers: q.answers.map((a) => ({
        ...a,
        text: __(a.text),
      })),
    })),
  };
}

function getUiStrings(_, name = "Anonymous") {
  return {
    startQuiz: _("Start Quiz"),
    startButton: _("Start"),
    backButton: _("Back"),
    submitButton: _("Submit"),
    nextButton: _("Next"),
    quit: _("Quit"),
    quitAndSubmit: _("Submit and Quit"),
    timeLeft: _("Time left"),
    submit: _("Submit"),
    score: _("Score"),
    final: _("Final"),
    restart: _("Restart"),
    question: _("Question"),
    usernamePrompt: _("Please enter a username to start."),
    welcome: _("Welcome, %s").replace("%s", name),
    confirmSubmit: _("Are you sure you want to quit and submit?"),
    confirmQuit: _(
      "Are you sure you want to quit? Your progress will not be saved.",
    ),
  };
}

module.exports = {
  localizeQuizData,
  getUiStrings,
};
