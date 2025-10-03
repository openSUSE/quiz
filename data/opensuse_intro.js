// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation.
function _(str) {
  return str;
}

const quizData = {
  title: _("openSUSE Introduction"),
  subtitle: _("Discover openSUSE, one click at a time."),
  submitAnytime: false,
  randomizeQuestions: false,
  randomizeAnswers: false,
  difficulty: 1,
};

const questions = [
  {
    text: _("What is openSUSE?"),
    answers: [
      { text: _("A project supported by SUSE, made for everyone"), correct: false },
      { text: _("More than just one Linux distribution"), correct: false },
      { text: _("A friendly place to build software and learn new tools"), correct: false },
      { text: _("All of these things together"), correct: true },
    ],
  },
  {
    text: _("openSUSE just celebrated its 20th birthday! In which year did that happen?"),
    answers: [
      { text: _("2025 – this year! 🎉"), correct: true },
      { text: _("1998 – that’s when Google started, not openSUSE"), correct: false },
      { text: _("1994 – that’s the first SUSE Linux, not openSUSE"), correct: false },
      { text: _("2005 – the year openSUSE was born, but not 20 years ago"), correct: false },
    ],
  },
  {
    text: _("openSUSE has two main ways of getting updates. One is a big release once a year, the other gives updates all the time. What are they called?"),
    answers: [
      { text: _("Stable and Rolling"), correct: true },
      { text: _("Stable and Wobbly"), correct: false },
      { text: _("Rolling and Sitting"), correct: false },
      { text: _("Rolling and Leaping"), correct: false },
    ],
  },
  {
    text: _("Which openSUSE versions are Rolling (always up-to-date)?"),
    answers: [
      { text: _("Aeon, Kalpa, and MicroOS"), correct: false },
      { text: _("Slowroll and Slowroll Micro"), correct: false },
      { text: _("Tumbleweed"), correct: false },
      { text: _("All of these are Rolling"), correct: true },
    ],
  },
    {
    text: _("Leap and Leap Micro are our Stable distributions. What does that mean?"),
    answers: [
        { text: _("Each minor release receive updates for about 24 months"), correct: false },
        { text: _("They have one big release every 12 months"), correct: false },
        { text: _("They come with release parties everyone can join 🎉"), correct: false },
        { text: _("All of the above (and you can stay on Leap 16 until 2033!)"), correct: true },
    ],
  },
  {
    text: _("openSUSE also has “immutable” editions. What does that mean?"),
    answers: [
      { text: _("They use a read-only system base and update safely with special tools"), correct: true },
      { text: _("They cannot be installed on laptops"), correct: false },
      { text: _("They are distributions that never change wallpapers"), correct: false },
      { text: _("They come only as DVDs by mail"), correct: false },
    ],
  },
  {
    text: _("What is Slowroll?"),
    answers: [
      { text: _("A variant of Tumbleweed with updates grouped into tested batches"), correct: true },
      { text: _("A racing game mode in Linux"), correct: false },
      { text: _("A distribution that only updates once per decade"), correct: false },
      { text: _("The mascot’s new nickname"), correct: false },
    ],
  },
  {
    text: _("What are some of the key openSUSE community tools and projects?"),
    answers: [
      { text: _("Open Build Service (OBS) for building software"), correct: false },
      { text: _("openQA for automated testing"), correct: false },
      { text: _("The Wiki, Weblate, forums, and more"), correct: false },
      { text: _("All of these are part of openSUSE"), correct: true },
    ],
  },
  {
    text: _("The team that takes care of openSUSE infrastructure is called openSUSE...?"),
    answers: [
      { text: _("Heroes"), correct: true },
      { text: _("Avengers"), correct: false },
      { text: _("Thunderbolts"), correct: false },
      { text: _("Villains"), correct: false },
    ],
  },
  {
    text: _("Windows 10 is out of support. What could you do with that laptop?"),
    answers: [
      { text: _("Install openSUSE on your laptop"), correct: false },
      { text: _("Install openSUSE on your friend’s laptop"), correct: false },
      { text: _("Install openSUSE on your grandmother’s laptop"), correct: false },
      { text: _("All of these are great ideas"), correct: true },
    ],
  },
  {
    text: _("What is the mascot of openSUSE?"),
    answers: [
      { text: _("A chameleon named Geeko"), correct: true },
      { text: _("A penguin named Tux"), correct: false },
      { text: _("A tumbleweed rolling in the desert"), correct: false },
      { text: _("A lizard in sunglasses"), correct: false },
    ],
  },
  {
    text: _("Why do people love openSUSE?"),
    answers: [
      { text: _("Stable Leap releases and fast-moving Tumbleweed updates"), correct: false },
      { text: _("Modern tools like Agama, Myrlyn, zypper, OBS, and openQA"), correct: false },
      { text: _("A friendly worldwide community that welcomes everyone"), correct: false },
      { text: _("All of these together"), correct: true },
    ],
  },
  {
    text: _("Where can you help translate openSUSE (and even this quiz)?"),
    answers: [
      { text: _("Weblate at l10n.opensuse.org"), correct: true },
      { text: _("By whispering translations into the chameleon’s ear"), correct: false },
      { text: _("At Google Translate headquarters in a secret bunker"), correct: false },
      { text: _("By posting translations on random Reddit threads"), correct: false },
    ],
  },
  {
    text: _("Where can you get help with openSUSE?"),
    answers: [
        { text: _("Ask your friend who uses Linux"), correct: false },
        { text: _("forums.opensuse.org"), correct: false },
        { text: _("On many local Linux portals and websites"), correct: false },
        { text: _("All of the above"), correct: true },
    ],
  },
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

// Randomize answers here if enabled
if (quizData.randomizeAnswers) {
  questions.forEach((q) => {
    q.answers.sort(() => Math.random() - 0.5);
  });
}

module.exports = { quizData, questions };
