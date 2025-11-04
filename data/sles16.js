// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("SLES 16 in Numbers"),
  subtitle: _("For all geekos who like numbers. All numbers were taken on FCS date - Nov 4 2025 11:38."),
  submitAnytime: false,
  randomizeQuestions: true,
  randomizeAnswers: true,
  timeout: 60,
  difficulty: 1,
};

const questions = [
  {
    text: _("How many languages are available for the SLES 16 documentation (not including UI translations)?"),
    answers: [
      { text: _("7"), correct: true },
      { text: _("16"), correct: false },
      { text: _("42"), correct: false },
      { text: _("Just one: German!"), correct: false },
    ],
  },
  {
    text: _("How many features have been reported against SLES + SAP 16.0? "),
    answers: [
      { text: _("1099"), correct: true },
      { text: _("16"), correct: false },
      { text: _("404 – features not found"), correct: false },
      { text: _("9999 – we lost count"), correct: false },
    ],
  },
  {
    text: _("How many of those features were resolved in 16.0?"),
    answers: [
      { text: _("798"), correct: true },
      { text: _("789"), correct: false },
      { text: _("123"), correct: false },
      { text: _("666"), correct: false },
    ],
  },
  {
    text: _("When does LTS Support for SLES 16.0?"),
    answers: [
      { text: _("2030"), correct: true },
      { text: _("Never – it’s eternal like systemd"), correct: false },
      { text: _("2029"), correct: false },
      { text: _("2032"), correct: false },
    ],
  },
  {
    text: _("How many valid bugs were resolved in SLES 16.0?"),
    answers: [
      { text: _("999"), correct: true },
      { text: _("0, because it’s perfect"), correct: false },
      { text: _("16"), correct: false },
      { text: _("Too many to fit in Bugzilla"), correct: false },
    ],
  },
  {
    text: _("How many open P1 bugs are currently tracked for SLES + SAP 16.0?"),
    answers: [
      { text: _("11"), correct: true },
      { text: _("1 – we’re almost there!"), correct: false },
      { text: _("42"), correct: false },
      { text: _("0, No P1 shall pass RC!"), correct: false },
    ],
  },
  {
    text: _("When can we expect SLES 16.1 to be released?"),
    answers: [
      { text: _("November 3rd 2026"), correct: true },
      { text: _("June 16th, 2026"), correct: false },
      { text: _("4th of July 2026"), correct: false },
      { text: _("30th February 2026"), correct: false },
    ],
  },
  {
    text: _("Which slfo git branch corresponds to SLES 16.0 maintenance updates?"),
    answers: [
      { text: _("slfo-1.2 "), correct: true },
      { text: _("devel branch in src.opensuse.org/pool"), correct: false },
      { text: _("slfo-main"), correct: false },
      { text: _("slfo-1.0"), correct: false },
    ],
  },
  {
    text: _("How many shipped packages in SLES 16.0 have no assigned maintainer?"),
    answers: [
      { text: _("0"), correct: true },
      { text: _("16"), correct: false },
      { text: _("Thousands of packages in coldpool"), correct: false },
      { text: _("All of them. Maintainers are overrated"), correct: false },
    ],
  },
  {
    text: _("What is the current system Python version in SLES 16.0 (expected to stay until 16.3)?"),
    answers: [
      { text: _("python-3.13"), correct: true },
      { text: _("python-2.7"), correct: false },
      { text: _("python-3.11"), correct: false },
      { text: _("python-3.6"), correct: false },
    ],
  },
  {
    text: _("Ruby was a tough challenge in SLES 15.0. What is the Ruby version in SLES 16.0?"),
    answers: [
      { text: _("ruby-3.4"), correct: true },
      { text: _("ruby-2.7 LTS"), correct: false },
      { text: _("ruby-3.1"), correct: false },
      { text: _("ruby-3.2"), correct: false },
    ],
  },
  {
    text: _("How many tests are currently in openQA for SLES 16.0 (GA)?"),
    answers: [
      { text: _("None. We solely rely on testing in production."), correct: false },
      { text: _("1099"), correct: true },
      { text: _("1999"), correct: false },
      { text: _("9999"), correct: false },
    ],
  },
  {
    text: _("Who is the Release Manager Lead for SLES 16.1?"),
    answers: [
      { text: _("Radoslav Tsvetkov"), correct: true },
      { text: _("Libor Miksik"), correct: false },
      { text: _("Daniela Giri"), correct: false },
      { text: _("Prokop Vlasin"), correct: false },
    ],
  },
  {
  text: _("What component managed to survive its own death in SLES 16?"),
  answers: [
    { text: _("Desktop"), correct: true },
    { text: _("System Management"), correct: false },
    { text: _("Installer"), correct: false },
    { text: _("Migration tool"), correct: false },
  ],
},
];


// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

// Randomize answers here if enabled
// This doesn't work particularly well with "All of above" type of answers
if (quizData.randomizeAnswers) {
    questions.forEach((q) => {
        q.answers.sort(() => Math.random() - 0.5);
    });
}

module.exports = { quizData, questions };
