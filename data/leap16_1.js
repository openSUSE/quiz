// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("openSUSE Leap 16.1 Release Party"),
  subtitle: _("Leap 16.1 is out! Test what you know about the release and come celebrate with us."),
  submitAnytime: false,
  randomizeQuestions: false, // Tell the release story in order, ending with where to get it
  randomizeAnswers: true,
  timeout: 30,
  difficulty: 1,
};

const questions = [
  {
    text: _("When was openSUSE Leap 16.1 released?"),
    answers: [
      { text: _("Tuesday, November 3rd 2026"), correct: true },
      { text: _("Friday, November 13th 2026"), correct: false },
      { text: _("April 1st 2026"), correct: false },
      { text: _("Not yet, still in Factory"), correct: false },
    ],
  },
  {
    text: _("Where can I download Leap 16.1 images?"),
    answers: [
      { text: _("get.opensuse.org"), correct: true },
      { text: _("download.windows.com"), correct: false },
      { text: _("A random torrent from a forum signature"), correct: false },
      { text: _("You have to order DVDs by mail"), correct: false },
    ],
  },
  {
    text: _("Why doesn't Leap 16.1 ship the newest GNOME?"),
    answers: [
      { text: _("Leap follows SLES: new GNOME every 2nd release, next in 16.2"), correct: true },
      { text: _("GNOME was dropped, Leap now ships only KDE"), correct: false },
      { text: _("The new GNOME didn't fit on the DVD"), correct: false },
      { text: _("The newest GNOME is available only as a Flatpak"), correct: false },
    ],
  },
  {
    text: _("Liked Leap Micro? What do you use with 16.1?"),
    answers: [
      { text: _("Leap 16.1 Immutable images in Alternative Downloads"), correct: true },
      { text: _("Leap Micro 16.1 from its own website"), correct: false },
      { text: _("Leap Nano, its renamed successor"), correct: false },
      { text: _("Nothing, Micro fans must switch distro"), correct: false },
    ],
  },
  {
    text: _("How do you install Leap 16.1 as immutable?"),
    answers: [
      { text: _("Pick Immutable mode in the Agama installer"), correct: true },
      { text: _("Install standard Leap, then run chattr +i /"), correct: false },
      { text: _("Only by recompiling the kernel"), correct: false },
      { text: _("You can't, Leap is standard only"), correct: false },
    ],
  },
  {
    text: _("What's special about the 16.1 parties?"),
    answers: [
      { text: _("Most release parties ever"), correct: true },
      { text: _("There are none"), correct: false },
      { text: _("They happen only on IRC"), correct: false },
      { text: _("Entry requires a fresh zypper dup"), correct: false },
    ],
  },
  {
    text: _("How could you join a party on Sat, Nov 7th from home?"),
    answers: [
      { text: _("At the virtual release party, online"), correct: true },
      { text: _("By sending a fax to the openSUSE Board"), correct: false },
      { text: _("By filing a 'party' bug"), correct: false },
      { text: _("You couldn't, parties are only in person"), correct: false },
    ],
  },
  {
    text: _("When do the Wed, Nov 11th SUSE office parties start?"),
    answers: [
      { text: _("Prague at 18:30, Nuremberg at 16:00"), correct: true },
      { text: _("Prague at 16:00, Nuremberg at 18:30"), correct: false },
      { text: _("Both at 16:01, after the build"), correct: false },
      { text: _("Both at midnight UTC"), correct: false },
    ],
  },
  {
    text: _("Which Czech sites advertised the parties?"),
    answers: [
      { text: _("root.cz, abclinuxu.cz, linuxexpres.cz"), correct: true },
      { text: _("idnes.cz, lide.cz, emimino.cz"), correct: false },
      { text: _("Only emimino.cz, in the baby forum"), correct: false },
      { text: _("Only lide.cz, in the dating chat"), correct: false },
    ],
  },
  {
    text: _("Besides Czechia and Germany, where are parties Nov 7th–14th?"),
    answers: [
      { text: _("Indonesia and India, thanks to active communities"), correct: true },
      { text: _("Antarctica and Atlantis, thanks to penguin users"), correct: false },
      { text: _("Vatican City and Monaco, by royal decree"), correct: false },
      { text: _("Nowhere else, no other communities exist"), correct: false },
    ],
  },
  {
    text: _("Where can you find all parties and public events?"),
    answers: [
      { text: _("calendar.opensuse.org"), correct: true },
      { text: _("On a flyer in the SUSE office kitchen"), correct: false },
      { text: _("Nowhere, ask on IRC and hope"), correct: false },
      { text: _("In the zypper changelog"), correct: false },
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
