// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("Cockpit System Management"),
  subtitle: _("Discover Cockpit, one click at a time."),
  submitAnytime: false,
  randomizeQuestions: false,
  randomizeAnswers: true,
  difficulty: 1,
};

const questions = [
  {
    text: _("What is Cockpit?"),
    answers: [
      { text: _("The secret place where SUSE Developers live"), correct: false },
      { text: _("A flight simulator for Linux"), correct: false },
      { text: _("The new installer for openSUSE Tumbleweed and Leap"), correct: false },
      { text: _("A web based system management utility for SUSE Linux"), correct: true },
    ],
  },
  {
    text: _("How do you usually access the Cockpit interface?"),
    answers: [
      { text: _("Via a special VR headset provided by SUSE"), correct: false },
      { text: _("Through email"), correct: false },
      { text: _("From the shell, or through ssh"), correct: false },
      { text: _("Through a webbrowser, port 9090"), correct: true },
    ],
  },
  {
    text: _("If your SUSE server is acting grumpy, which location allows you to see CPU and Memory usage graphs?"),
    answers: [
      { text: _("The Horoscope Section"), correct: false },
      { text: _("The Canteen Menu"), correct: false },
      { text: _("The Overview Tab, under System"), correct: true },
      { text: _("The Complaints Department (take a number)"), correct: false },
    ],
  },
  {
    text: _("What happens if you use the Terminal Tab?"),
    answers: [
      { text: _("You'll get a Linux command line prompt in your browser"), correct: true },
      { text: _("It opens a chat room with other SUSE Linux users"), correct: false },
      { text: _("You can play Tetris"), correct: false },
      { text: _("It shows DON'T PANIC, in large friendly letters"), correct: false },
    ],
  },
  {
    text: _("Your server is running out of space, where do you go to manage disks?"),
    answers: [
      { text: _("The Backpack Tab"), correct: false },
      { text: _("The Attic Tab"), correct: false },
      { text: _("The Storage Tab"), correct: true },
      { text: _("The Closet Tab"), correct: false },
    ],
  },
  {
    text: _("Who can directly log into Cockpit?"),
    answers: [
      { text: _("All regular users on the system"), correct: true },
      { text: _("Only root is allowed for system management"), correct: false },
      { text: _("The dedicated Cockpit user"), correct: false },
      { text: _("Everyone in the Cockpit group"), correct: false },
    ],
  },
  {
    text: _("Can Cockpit be extended, can I customize it?"),
    answers: [
      { text: _("The starter-kit from the upstream project provides a fully featured template"), correct: false },
      { text: _("It's written in JavaScript and well understood by coding agents"), correct: false },
      { text: _("It can be properly packaged in the SUSE Build Service"), correct: false },
      { text: _("All of the answers"), correct: true },
    ],
  },
  {
    text: _("Which of the features are included?"),
    answers: [
      { text: _("VM managment, Network config, Firewall"), correct: false },
      { text: _("Container management, User and groups management, SELinux troubleshoot"), correct: false },
      { text: _("Update and Repository management, systemd services management"), correct: false },
      { text: _("All of them"), correct: true },
    ],
  },
  {
    text: _("Does Cockpit replace the command line?"),
    answers: [
      { text: _("It includes every feature that exists in your shell"), correct: false },
      { text: _("With speech-to-text along with AI Cockpit even replaces itself"), correct: false },
      { text: _("No, it's a companion that works alongside the command line"), correct: true },
      { text: _("Cockpit and command line are mutually exclusive"), correct: false },
    ],
  },
  {
    text: _("Web based you say, I'm concerned about security. What additional measures does Cockpit implement?"),
    answers: [
      { text: _("Zero-factor authentication"), correct: false },
      { text: _("One-factor authentication"), correct: false },
      { text: _("Two-factor authentication"), correct: true },
      { text: _("Three-factor authentication"), correct: false },
    ],
  },
  {
    text: _("I don't need this too often, why would I permenently run a web service in the background?"),
    answers: [
      { text: _("Cockpit is started through a systemd socket and only on demand"), correct: true },
      { text: _("Web services do not use any resources nowadays"), correct: false },
      { text: _("The firewall blocks it from using CPU and RAM"), correct: false },
      { text: _("The combination of C, Python and JavaScript makes it so lightweight"), correct: false },
    ],
  },
  {
    text: _("Bsides English, which languages does it support?"),
    answers: [
      { text: _("Español, Deutsch, Svenska"), correct: false },
      { text: _("中文（中国）, English, Česky"), correct: false },
      { text: _("All of them, and many more"), correct: true },
      { text: _("日本語, Português Français"), correct: false },
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
