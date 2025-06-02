const quizData = {
  title: "Chameleon Fun for kids!",
  subtitle: "A colorful quiz about chameleons and openSUSE for curious kids!",
  submitAnytime: false,
  randomizeQuestions: true,
};

const questions = [
  {
    text: "What color can a chameleon turn into?",
    type: "mc",
    answers: [
      { text: "Only green", correct: false },
      { text: "Any color, even purple!", correct: false },
      { text: "Many colors like green, brown, yellow", correct: true },
      { text: "Only black and white", correct: false },
    ],
  },
  {
    text: "What is the mascot of openSUSE?",
    type: "mc",
    answers: [
      { text: "A penguin", correct: false },
      { text: "A chameleon called Geeko", correct: true },
      { text: "A dragon", correct: false },
      { text: "A robot", correct: false },
    ],
  },
  {
    text: "Why do chameleons change color?",
    type: "mc",
    answers: [
      { text: "To show how they feel or to hide", correct: true },
      { text: "Because they are bored", correct: false },
      { text: "Because they are cold-blooded robots", correct: false },
      { text: "To glow in the dark", correct: false },
    ],
  },
  {
    text: "Chameleons are primarily found in which part of the world?",
    type: "mc",
    answers: [
      { text: "South America", correct: false },
      { text: "Africa and Madagascar", correct: true },
      { text: "Southeast Asia", correct: false },
      { text: "Antarctica", correct: false },
    ],
  },
  {
    text: "How do chameleons catch their food?",
    type: "mc",
    answers: [
      { text: "With their hands", correct: false },
      { text: "With their long sticky tongue", correct: true },
      { text: "By shouting at it", correct: false },
      { text: "With a net", correct: false },
    ],
  },
  {
    text: "What do chameleons eat?",
    type: "mc",
    answers: [
      { text: "Ice cream", correct: false },
      { text: "Insects", correct: true },
      { text: "Pineapples", correct: false },
      { text: "Hot dogs", correct: false },
    ],
  },
  {
    text: "What makes openSUSE special?",
    type: "mc",
    answers: [
      { text: "It can talk to animals", correct: false },
      { text: "It’s a modern, free operating system anyone can use — including you!", correct: true },
      { text: "It’s made of chameleon scales", correct: false },
      { text: "It’s only for secret agents", correct: false },
    ],
  },
  {
    text: "Do all chameleons look the same?",
    type: "mc",
    answers: [
      { text: "Yes, they are all green and grumpy", correct: false },
      {
        text: "No, they come in many shapes, sizes, and colors",
        correct: true,
      },
      { text: "Yes, they all wear hats", correct: false },
      { text: "They all wear openSUSE stickers", correct: false },
    ],
  },
  {
    text: "What does the word 'open' in openSUSE mean?",
    type: "mc",
    answers: [
      { text: "It’s a password", correct: false },
      {
        text: "It means everyone can use it and help make it better",
        correct: true,
      },
      { text: "It’s only for opening doors", correct: false },
      { text: "It’s about opening candy wrappers", correct: false },
    ],
  },
  {
    text: "Can chameleons move their eyes separately?",
    type: "mc",
    answers: [
      { text: "No, they blink both eyes together", correct: false },
      { text: "Yes, they can look in two directions at once!", correct: true },
      { text: "They close one eye when sleeping", correct: false },
      { text: "No, their eyes are always closed", correct: false },
    ],
  },
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

module.exports = { quizData, questions };
