const quizData = {
  title: "openSUSE Brutal",
  subtitle:
    "Challenge other users in our leaderboard. 30 seconds per question. Stop anytime.",
  submitAnytime: true,
  timeout: 30,
  randomizeQuestions: true,
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
      { text: "At the University of Helsinky", correct: false },
    ],
  },
  {
    text: "What is the default filesystem in openSUSE?",
    type: "mc",
    answers: [
      { text: "ReiserFS", correct: false },
      { text: "Btrfs", correct: true },
      { text: "XFS", correct: false },
      { text: " InterPlanetary File System", correct: false },
    ],
  },
  {
    text: "What’s the name of the new installer in Leap 16?",
    type: "mc",
    answers: [
      { text: "Sypper", correct: false },
      { text: "Agama", correct: true },
      { text: "Anaconda", correct: false },
      { text: " Cayman", correct: false },
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
    text: "Which desktop environment is the default for openSUSE Leap 15?",
    type: "mc",
    answers: [
      { text: "GNOME", correct: false },
      { text: "KDE Plasma", correct: false },
      { text: "Xfce", correct: false },
      {
        text: "There is no default. We leave choice to the user.",
        correct: true,
      },
    ],
  },
  {
    text: "What is the name of the openSUSE build system?",
    type: "mc",
    answers: [
      { text: "OBS (Open Build Service)", correct: true },
      { text: "Weblate", correct: false },
      { text: "Koji", correct: false },
      { text: "Autobuilder", correct: false },
    ],
  },
  {
    text: "How can you make changes to a root partition on a transactional-update based system?",
    type: "mc",
    answers: [
      {
        text: "Use transactional-update command and reboot into a new snapshot",
        correct: true,
      },
      { text: "By using sudo-sudo to gain giga privileges", correct: false },
      { text: "By using Salt or Ansible", correct: false },
      {
        text: "You have to edit files under a user netrunner and cross fingers",
        correct: false,
      },
    ],
  },
  {
    text: "What is 'YaST'?",
    type: "mc",
    answers: [
      { text: "A chameleon species native to Africa", correct: true },
      {
        text: "A free software for configuration of operating system",
        correct: false,
      },
      { text: "The default web browser", correct: false },
      { text: "A programming language", correct: false },
    ],
  },
  {
    text: "What is the primary goal of the openSUSE Aeon distribution?",
    type: "mc",
    answers: [
      {
        text: "A modern transactional-desktop system with GNOME",
        correct: true,
      },
      { text: "Scientific research", correct: false },
      { text: "Containerization", correct: false },
      { text: "Enterprise use", correct: false },
    ],
  },
  {
    text: "What is the go-to place to learn about projects from Rancher and SUSE?",
    type: "mc",
    answers: [
      { text: "Rancher Academy", correct: true },
      { text: "Cow College", correct: false },
      { text: "Moo University", correct: false },
      { text: "Cowboy Hat", correct: false },
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
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

module.exports = { quizData, questions };
