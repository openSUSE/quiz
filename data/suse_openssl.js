// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("SUSE x openSSL"),
  subtitle: _("When SUSE meets openSSL, surprises await."),
  submitAnytime: false,
  randomizeQuestions: false,
  randomizeAnswers: false,
};

const questions = [
  {
    text: _("How many SUSE products use OpenSSL?"),
    answers: [
      { text: _("1"), correct: false },
      { text: _("5"), correct: false },
      { text: _("10"), correct: false },
      { text: _("All of them"), correct: true },
    ],
  },
  {
    text: _("How many SUSE engineers are actively working on OpenSSL?"),
    answers: [
      { text: _("0"), correct: false },
      { text: _("3"), correct: true },
      { text: _("42.3"), correct: false },
      { text: _("19"), correct: false },
    ],
  },
  {
    text: _("Enabling FIPS mode on a SUSE system can have which of the following side effects?"),
    answers: [
      { text: _("It allows all cryptographic algorithms, including insecure ones."), correct: false },
      { text: _("It restricts the use of cryptography to only FIPS-validated algorithms and binaries."), correct: true },
      { text: _("It has no impact on system performance or compatibility."), correct: false },
      { text: _("You start smiling like 'Hide the Pain Harold' meme guy."), correct: false },
    ],
  },
  {
    text: _("From where will SUSE engineers in Brno, Czechia participate in SUSE Hackweek 25?"),
    answers: [
      { text: _("The OpenSSL office"), correct: true },
      { text: _("Starbucks"), correct: false },
      { text: _("Red Hat office"), correct: false },
      { text: _("Vaňkovka shopping gallery"), correct: false },
    ],
  },
  {
    text: _("Why does SUSE invest in OpenSSL?"),
    answers: [
      { text: _("To contribute back to the community SUSE and many others relies on"), correct: true },
      { text: _("To make chameleons browse the web safely"), correct: false },
      { text: _("To win a race against penguins"), correct: false },
      { text: _("To shorten Linux kernel boot times"), correct: false },
    ],
  },
  {
    text: _("SUSE engineers contribute to OpenSSL by"),
    answers: [
      { text: _("Active development and code reviews"), correct: false },
      { text: _("Contributing fixes and new features"), correct: false },
      { text: _("Running enterprise-grade testing with tools like openQA"), correct: false },
      { text: _("All of the above"), correct: true },
    ],
  },
  {
    text: _("What role does OpenSSL play in SUSE Linux Enterprise?"),
    answers: [
      { text: _("It secures communication and cryptographic operations"), correct: true },
      { text: _("It only adds fancy wallpapers"), correct: false },
      { text: _("It makes Open Build Service run faster"), correct: false },
      { text: _("It manages Rancher clusters"), correct: false },
    ],
  },
  {
    text: _("Why is FIPS certification in OpenSSL important for SUSE?"),
    answers: [
      { text: _("It allows SUSE customers in regulated industries to meet strict security standards"), correct: true },
      { text: _("It makes the chameleon change colors faster"), correct: false },
      { text: _("It guarantees free coffee for certified systems"), correct: false },
      { text: _("It is only useful for retro Linux distributions"), correct: false },
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