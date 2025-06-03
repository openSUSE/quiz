const quizData = {
  title: "Flock",
  subtitle:
    "Don't worry this quiz is mostly educational. No need to know all the answers.",
  submitAnytime: false,
  randomizeQuestions: false, // quiz tells a story some questions might be relevant
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
  {
    text: "What is the main goal of the openSUSE project?",
    type: "mc",
    answers: [
      { text: "Supporting and spreading open-source software", correct: true },
      { text: "Developing mobile applications", correct: false },
      { text: "Producing video games", correct: false },
      { text: "Research in artificial intelligence", correct: false },
    ],
  },
  {
    text: "What are Aeon and Kalpa?",
    type: "mc",
    answers: [
      {
        text: "Modern 'Immutable' desktops with GNOME and KDE",
        correct: false,
      },
      {
        text: "Rolling distributions with transactional updates using flatpaks on the desktop",
        correct: false,
      },
      { text: "Distributions built on top of MicroOS", correct: false },
      { text: "All options are correct", correct: true },
    ],
  },
  {
    text: "Where was the openSUSE project founded?",
    type: "mc",
    answers: [
      { text: "In Choustníkovo Hradiště", correct: false },
      {
        text: "At LinuxWorld Conference & Expo 2005 in San Francisco",
        correct: true,
      },
      { text: "In Redmont", correct: false },
      { text: "At the University of Helsinki", correct: false },
    ],
  },
  {
    text: "What is the default filesystem in openSUSE?",
    type: "mc",
    answers: [
      { text: "ReiserFS", correct: false },
      { text: "Btrfs", correct: true },
      { text: "XFS", correct: false },
      { text: "InterPlanetary File System", correct: false },
    ],
  },
  {
    text: "What’s the name of the new installer in Leap 16?",
    type: "mc",
    answers: [
      { text: "Sypper", correct: false },
      { text: "Agama", correct: true },
      { text: "Anaconda", correct: false },
      { text: "Cayman", correct: false },
    ],
  },
  {
    text: "Which openSUSE distribution is optimized for running containers and micro services?",
    type: "mc",
    answers: [
      { text: "MicroOS and Leap Micro", correct: true },
      { text: "Tumbleweed", correct: false },
      { text: "Leap", correct: false },
      { text: "Slowroll", correct: false },
    ],
  },
  {
    text: "Which of the following package managers is commonly used in openSUSE?",
    type: "mc",
    answers: [
      { text: "Yum", correct: false },
      { text: "DNF", correct: false },
      { text: "Zypper", correct: true },
      { text: "Pacman", correct: false },
    ],
  },
  {
    text: "What is Leap 16.0?",
    type: "mc",
    answers: [
      {
        text: "A traditional Linux distribution, the successor to Leap 15.6, released in Fall 2025",
        correct: true,
      },
      { text: "An immutable distribution with GNOME and KDE", correct: false },
      { text: "A rolling release for mobile devices", correct: false },
      { text: "A container-focused system like MicroOS", correct: false },
    ],
  },
  {
    text: "Can you play Windows games on openSUSE?",
    type: "mc",
    answers: [
      { text: "No way, only Windows can do that", correct: false },
      { text: "Of course! Just fire up Steam and game on", correct: true },
      { text: "Only if you summon the gaming gods", correct: false },
      { text: "You need a secret handshake first", correct: false },
    ],
  },
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

module.exports = { quizData, questions };
