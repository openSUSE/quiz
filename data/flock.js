const quizData = {
  title: "openSUSE Flock Day 1",
  subtitle:
    "Don't worry this quiz is mostly educational. No need to know all the answers.",
  submitAnytime: false,
  randomizeQuestions: false, // quiz tells a story some questions might be relevant
};

const questions = [
  {
    text: "What is the mascot of the openSUSE project?",
    answers: [
      { text: "Pascal", correct: false },
      { text: "Geeko", correct: true },
      { text: "Beefy Miracle", correct: false },
      { text: "Tux", correct: false },
    ],
  },
  {
    text: "What is the mascot of the Fedora Project?",
    answers: [
      { text: "Geeko", correct: false },
      { text: "Tux", correct: false },
      { text: "Beefy Miracle", correct: true },
      { text: "Shuttleworth", correct: false },
    ],
  },
  {
    text: "What is Fedora Silverblue?",
    answers: [
      {
        text: "An immutable desktop OS based on Fedora with rpm-ostree",
        correct: true,
      },
      { text: "A Fedora branding initiative", correct: false },
      { text: "A video editing application", correct: false },
      { text: "A hardware certification program", correct: false },
    ],
  },
  {
    text: "What are Aeon and Kalpa?",
    answers: [
      {
        text: "Modern immutable desktops from openSUSE with GNOME and KDE",
        correct: true,
      },
      { text: "Fedora spin-offs for IoT", correct: false },
      { text: "Legacy Leap add-ons", correct: false },
      { text: "Security frameworks", correct: false },
    ],
  },
  {
    text: "What is the default file system for openSUSE Leap and Tumbleweed?",
    answers: [
      { text: "Ext4", correct: false },
      { text: "Btrfs", correct: true },
      { text: "XFS", correct: false },
      { text: "ZFS", correct: false },
    ],
  },
  {
    text: "What edition of Fedora is optimized for containers and cloud?",
    answers: [
      { text: "Fedora CoreOS", correct: true },
      { text: "Fedora Server", correct: false },
      { text: "Fedora Workstation", correct: false },
      { text: "Fedora IoT", correct: false },
    ],
  },
  {
    text: "Which package manager is used in openSUSE?",
    answers: [
      { text: "Zypper", correct: true },
      { text: "DNF", correct: false },
      { text: "APT", correct: false },
      { text: "Flatpak", correct: false },
    ],
  },
  {
    text: "Which package manager is used in Fedora?",
    answers: [
      { text: "DNF", correct: true },
      { text: "Zypper", correct: false },
      { text: "Pacman", correct: false },
      { text: "Sypper", correct: false },
    ],
  },
  {
    text: "What’s the name of the new web-based installer in Fedora?",
    answers: [
      { text: "Agama", correct: false },
      { text: "Anaconda Web UI", correct: true },
      { text: "Calamares", correct: false },
      { text: "Kickstart", correct: false },
    ],
  },
  {
    text: "What’s the name of the new installer in openSUSE Leap 16?",
    answers: [
      { text: "Sypper", correct: false },
      { text: "Agama", correct: true },
      { text: "Anaconda", correct: false },
      { text: "Cayman", correct: false },
    ],
  },
  {
    text: "Can you play Windows games on openSUSE or Fedora?",
    answers: [
      { text: "Yes, with tools like Steam, Proton, or Lutris", correct: true },
      { text: "No, they only support Linux-native games", correct: false },
      { text: "Only with a dual-boot setup", correct: false },
      { text: "Not unless you disable SELinux", correct: false },
    ],
  },
  {
    text: "Where do Fedora and openSUSE primarily collaborate upstream?",
    answers: [
      { text: "GNOME, KDE, Linux kernel", correct: true },
      { text: "Apple kernel team", correct: false },
      { text: "Microsoft Build Conference", correct: false },
      { text: "Snap Store", correct: false },
    ],
  },
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

module.exports = { quizData, questions };
