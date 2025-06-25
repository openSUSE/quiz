// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("The Ultimate YaST Challenge"),
  subtitle: _("Think you know YaST? Think again."),
  submitAnytime: false,
  randomizeQuestions: false,
  randomizeAnswers: true,
};

const questions = [
  {
    text: _("How many YaST2 translation packages are there in Tumbleweed?"),
    answers: [
      { text: _("about 25"), correct: false },
      { text: _("about 40"), correct: false },
      { text: _("about 60"), correct: false },
      { text: _("about 80"), correct: true },
    ],
  },
  {
    text: _(
      "How many YaST2 packages (without translation packages) are there in Tumbleweed?",
    ),
    answers: [
      { text: _("about 30"), correct: false },
      { text: _("about 50"), correct: false },
      { text: _("about 100"), correct: true },
      { text: _("about 150"), correct: false },
    ],
  },
  {
    text: _("When was the first YaST2 released?"),
    answers: [
      { text: _("1999"), correct: true },
      { text: _("2002"), correct: false },
      { text: _("2004"), correct: false },
      { text: _("2006"), correct: false },
    ],
  },
  {
    text: _("When did YaST2 reach the German legal drinking age?"),
    answers: [
      { text: _("2010"), correct: false },
      { text: _("2015"), correct: true },
      { text: _("2021"), correct: false },
      { text: _("2024"), correct: false },
    ],
  },
  {
    text: _("What happens when you press the F2 key in yast2 sw_single (Qt)?"),
    answers: [
      { text: _('You get the "Patches" view'), correct: true },
      { text: _("It crashes"), correct: false },
      { text: _("It installs a random package"), correct: false },
      { text: _("The Mogwai get hungry"), correct: false },
    ],
  },
  {
    text: _("How can you get an xterm in a YaST2 installation?"),
    answers: [
      { text: _("you can't"), correct: false },
      {
        text: _("you click the Geeko icon on the top left 7 times"),
        correct: false,
      },
      { text: _("Ctrl-Shift-Alt-X"), correct: true },
      {
        text: _('you speak clearly "xterm" into the microphone (laptops only)'),
        correct: false,
      },
    ],
  },
  {
    text: _(
      "Can you inspect the widget hierarchy of a YaST2 window while it is running?",
    ),
    answers: [
      { text: _("Yes, click the page heading 7 times"), correct: false },
      { text: _("Yes, middle-click any widget"), correct: false },
      { text: _("Yes, use Ctrl-Shift-Alt-Y"), correct: true },
      { text: _("No - use the source, Luke"), correct: false },
    ],
  },
  {
    text: _("What happens if you right-click a button in YaST2?"),
    answers: [
      { text: _("It opens the button's context menu"), correct: false },
      { text: _("It resets the page to defaults"), correct: false },
      {
        text: _("It asks if you want to switch the mouse to left-handed mode"),
        correct: true,
      },
      {
        text: _("It switches to the dark widget theme or back"),
        correct: false,
      },
    ],
  },
  {
    text: _(
      "Can the YaST (Qt) color palette be changed for visually impaired users?",
    ),
    answers: [
      { text: _("No"), correct: false },
      { text: _("Yes, click the sun/moon icon"), correct: true },
      { text: _("Yes, use Shift-F3"), correct: true },
      { text: _('Yes, right-click the "Help" button'), correct: false },
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