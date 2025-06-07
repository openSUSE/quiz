const fs = require("fs");
const path = require("path");

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
    usernamePrompt: _("Please enter a username to proceed."),
    welcome: _("Welcome, %s").replace("%s", name),
    confirmSubmit: _("Are you sure you want to quit and submit?"),
    tooSimpleUsername: _("Username is too short."),
    usernameTaken: _("Sorry, this login is already taken."),
    confirmQuit: _(
      "Are you sure you want to quit? Your progress will not be saved."
    ),
  };
}

function getAvailableLanguages(poDirPath) {
  // Your existing languageNames mapping
  // Unfortunately it requires manual addition here
  // otherwise it will fallback to lang_name_$code
  const languageNames = {
    en: "English",
    ca: "Català",
    cs: "Čeština",
    de: "Deutsch",
    es: "Español",
    he: "עברית",
    hi: "हिन्दी",
    ja: "日本語",
    nl: "Nederlands",
    sk: "Slovenčina",
    tr: "Türkçe",
    uk: "Українська",
  };

  return fs
    .readdirSync(poDirPath)
    .filter((file) => {
      return (
        (file.endsWith(".po") && !file.includes("template")) ||
        file === "template.pot"
      );
    })
    .map((file) => {
      const code = file === "template.pot" ? "en" : path.basename(file, ".po");
      return {
        code,
        name: languageNames[code] || code, // fallback to code if no name found
      };
    });
}

module.exports = {
  localizeQuizData,
  getUiStrings,
  getAvailableLanguages,
};
