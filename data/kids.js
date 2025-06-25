// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("Chameleon Fun for kids"),
  subtitle: _(
    "A colorful quiz about chameleons and openSUSE for curious kids!",
  ),
  submitAnytime: false,
  randomizeQuestions: true,
  randomizeAnswers: true,
};

const questions = [
  {
    text: _("What color can a chameleon turn into?"),
    answers: [
      { text: _("Only green"), correct: false },
      { text: _("Any color, even purple!"), correct: false },
      { text: _("Many colors like green, brown, yellow"), correct: true },
      { text: _("Only black and white"), correct: false },
    ],
  },
  {
    text: _("What is the mascot of openSUSE?"),
    answers: [
      { text: _("A penguin"), correct: false },
      { text: _("A chameleon called Geeko"), correct: true },
      { text: _("A dragon"), correct: false },
      { text: _("A robot"), correct: false },
    ],
  },
  {
    text: _("Why do chameleons change color?"),
    answers: [
      { text: _("To show how they feel or to hide"), correct: true },
      { text: _("Because they are bored"), correct: false },
      { text: _("Because they are cold-blooded robots"), correct: false },
      { text: _("To glow in the dark"), correct: false },
    ],
  },
  {
    text: _("Chameleons are primarily found in which part of the world?"),
    answers: [
      { text: _("South America"), correct: false },
      { text: _("Africa and Madagascar"), correct: true },
      { text: _("Southeast Asia"), correct: false },
      { text: _("Antarctica"), correct: false },
    ],
  },
  {
    text: _("How do chameleons catch their food?"),
    answers: [
      { text: _("With their hands"), correct: false },
      { text: _("With their long sticky tongue"), correct: true },
      { text: _("By shouting at it"), correct: false },
      { text: _("With a net"), correct: false },
    ],
  },
  {
    text: _("What do chameleons eat?"),
    answers: [
      { text: _("Ice cream"), correct: false },
      { text: _("Insects"), correct: true },
      { text: _("Pineapples"), correct: false },
      { text: _("Hot dogs"), correct: false },
    ],
  },
  {
    text: _("What makes openSUSE special?"),
    answers: [
      { text: _("It can talk to animals"), correct: false },
      {
        text: _(
          "It’s a modern, free operating system anyone can use — including you!",
        ),
        correct: true,
      },
      { text: _("It’s made of chameleon scales"), correct: false },
      { text: _("It’s only for secret agents"), correct: false },
    ],
  },
  {
    text: _("Do all chameleons look the same?"),
    answers: [
      { text: _("Yes, they are all green and grumpy"), correct: false },
      {
        text: _("No, they come in many shapes, sizes, and colors"),
        correct: true,
      },
      { text: _("Yes, they all wear hats"), correct: false },
      { text: _("They all wear openSUSE stickers"), correct: false },
    ],
  },
  {
    text: _("What does the word 'open' in openSUSE mean?"),
    answers: [
      { text: _("It’s a password"), correct: false },
      {
        text: _("It means everyone can use it and help make it better"),
        correct: true,
      },
      { text: _("It’s only for opening doors"), correct: false },
      { text: _("It’s about opening candy wrappers"), correct: false },
    ],
  },
  {
    text: _("Can chameleons move their eyes separately?"),
    answers: [
      { text: _("No, they blink both eyes together"), correct: false },
      {
        text: _("Yes, they can look in two directions at once!"),
        correct: true,
      },
      { text: _("They close one eye when sleeping"), correct: false },
      { text: _("No, their eyes are always closed"), correct: false },
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