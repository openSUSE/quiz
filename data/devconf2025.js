// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("openSUSE Devconf 2025"),
  subtitle: _(
    "Don't worry this quiz is mostly educational. No need to know all the answers.",
  ),
  submitAnytime: false,
  randomizeQuestions: false, // quiz tells a story some questions might be relevant
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
  {
    text: _("What is the main goal of the openSUSE project?"),
    answers: [
      {
        text: _("Supporting and spreading open-source software"),
        correct: true,
      },
      { text: _("Developing mobile applications"), correct: false },
      { text: _("Producing video games"), correct: false },
      { text: _("Research in artificial intelligence"), correct: false },
    ],
  },
  {
    text: _("What are Aeon and Kalpa?"),
    answers: [
      {
        text: _("Modern 'Immutable' desktops with GNOME and KDE"),
        correct: false,
      },
      {
        text: _(
          "Rolling distributions with transactional updates using flatpaks on the desktop",
        ),
        correct: false,
      },
      { text: _("Distributions built on top of MicroOS"), correct: false },
      { text: _("All options are correct"), correct: true },
    ],
  },
  {
    text: _("Where was the openSUSE project founded?"),
    answers: [
      { text: _("In Choustníkovo Hradiště"), correct: false },
      {
        text: _("At LinuxWorld Conference & Expo 2005 in San Francisco"),
        correct: true,
      },
      { text: _("In Redmont"), correct: false },
      { text: _("At the University of Helsinki"), correct: false },
    ],
  },
  {
    text: _("What is the default filesystem in openSUSE?"),
    answers: [
      { text: _("ReiserFS"), correct: false },
      { text: _("Btrfs"), correct: true },
      { text: _("XFS"), correct: false },
      { text: _("InterPlanetary File System"), correct: false },
    ],
  },
  {
    text: _("What’s the name of the new installer in Leap 16?"),
    answers: [
      { text: _("Sypper"), correct: false },
      { text: _("Agama"), correct: true },
      { text: _("Anaconda"), correct: false },
      { text: _("Cayman"), correct: false },
    ],
  },
  {
    text: _(
      "Which openSUSE distribution is optimized for running containers and micro services?",
    ),
    answers: [
      { text: _("MicroOS and Leap Micro"), correct: true },
      { text: _("Tumbleweed"), correct: false },
      { text: _("Leap"), correct: false },
      { text: _("Slowroll"), correct: false },
    ],
  },
  {
    text: _(
      "Which of the following package managers is commonly used in openSUSE?",
    ),
    answers: [
      { text: _("Yum"), correct: false },
      { text: _("DNF"), correct: false },
      { text: _("Zypper"), correct: true },
      { text: _("Pacman"), correct: false },
    ],
  },
  {
    text: _("What is Leap 16.0?"),
    answers: [
      {
        text: _(
          "A traditional Linux distribution, the successor to Leap 15.6, released in Fall 2025",
        ),
        correct: true,
      },
      {
        text: _("An immutable distribution with GNOME and KDE"),
        correct: false,
      },
      { text: _("A rolling release for mobile devices"), correct: false },
      { text: _("A container-focused system like MicroOS"), correct: false },
    ],
  },
  {
    text: _("Can you play Windows games on openSUSE?"),
    answers: [
      { text: _("No way, only Windows can do that"), correct: false },
      { text: _("Of course! Just fire up Steam and game on"), correct: true },
      { text: _("Only if you summon the gaming gods"), correct: false },
      { text: _("You need a secret handshake first"), correct: false },
    ],
  },
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

module.exports = { quizData, questions };
