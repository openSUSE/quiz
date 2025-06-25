// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("Immutability"),
  subtitle: _("Let's learn something about our Immutable distros."),
  timeout: 30,
  submitAnytime: false,
  randomizeQuestions: false, // We want to build Immutable story, don't randomize
  randomizeAnswers: false, // Keep order for users, many times "all options are correct"
};

const questions = [
  {
    text: _("In simple terms, how does 'transactional-update' powering our Immutable distros work?"),
    answers: [
      { text: _("Most system partitions are mounted read-only, preventing changes on disk."), correct: false },
      { text: _("Updates don’t affect the running system until rebooting into a new snapshot."), correct: false },
      { text: _("The system uses transactional-update for safe, atomic upgrades and easy rollback."), correct: false },
      { text: _("All options are correct"), correct: true },
    ],
  },
  {
    text: _("Which of these are openSUSE Immutable distros?"),
    answers: [
      { text: _("Silverblue, CoreOS"), correct: false },
      { text: _("MicroOS, Leap Micro, Aeon, Kalpa"), correct: true },
      { text: _("Argon, Krypton"), correct: false },
      { text: _("Hurd, Darwin"), correct: false },
    ],
  },
  {
    text: _("What is openSUSE MicroOS?"),
    answers: [
      { text: _("A rolling-release web browser"), correct: false },
      { text: _("Micro Service OS built by the openSUSE community"), correct: true },
      { text: _("A package manager"), correct: false },
      { text: _("A container runtime"), correct: false },
    ],
  },
  {
    text: _("Which desktop environment does openSUSE Aeon use by default?"),
    answers: [
      { text: _("KDE Plasma"), correct: false },
      { text: _("Xfce"), correct: false },
      { text: _("GNOME"), correct: true },
      { text: _("Enlightenment"), correct: false },
    ],
  },
  {
    text: _("Which desktop environment does openSUSE Kalpa use by default?"),
    answers: [
      { text: _("KDE Plasma"), correct: true },
      { text: _("Xfce"), correct: false },
      { text: _("GNOME"), correct: false },
      { text: _("Enlightenment"), correct: false },
    ],
  },
  {
    text: _("What is the name of installer in openSUSE Aeon?"),
    answers: [
      { text: _("tik"), correct: true, },
      { text: _("tak"), correct: false },
      { text: _("Anaconda"), correct: false },
      { text: _("Agama"), correct: false },
    ],
  },
  {
    text: _("What bootloader is used by default in openSUSE Aeon?"),
    answers: [
      { text: _("lilo"), correct: false },
      { text: _("systemd-boot"), correct: true,},
      { text: _("grub2"), correct: false },
      { text: _("BOOTMGR"), correct: false },
    ],
  },
  {
    text: _("What do Aeon and Kalpa have in common?"),
    answers: [
      { text: _("Both are based on MicroOS with a ready-to-use desktop."), correct: false },
      { text: _("Both use transactional-updates for rpm installation."), correct: false },
      { text: _("Both promote distrobox and flatpaks for extra apps."), correct: false },
      { text: _("All options are correct."), correct: true },
    ],
  },
  {
    text: _("Both Aeon and Kalpa have interesting names indirectly referring to a rolling release. How so?"),
    answers: [
      {
        text: _("Both are ancient terms meaning long periods or cosmic cycles."),
        correct: true,
      },
      {
        text: _("Both are names of famous Western movies where rolling tumbleweed appeared."),
        correct: false,
      },
      {
        text: _("Both are very old nicknames of the original architect behind MicroOS."),
        correct: false,
      },
      {
        text: _("Both refer to software update tools in openSUSE."),
        correct: false,
      },
    ],
  },
  {
    text: _("There was an experiment with a Sway-based immutable desktop in 2023. Do you know its name?"),
    answers: [
      { text: _("Greyhound"), correct: false },
      { text: _("Greybeard"), correct: true },
      { text: _("Bluehair"), correct: false },
      { text: _("Ultraviolet"), correct: false },
    ],
  },
  {
    text: _("Which tool is used to safely update the base system in our Immutable distributions?"),
    answers: [
      { text: _("zypper dup"), correct: false },
      { text: _("dnf upgrade"), correct: false },
      { text: _("transactional-update"), correct: true },
      { text: _("ostree pull"), correct: false },
    ],
  },
  {
    text: _("How can you install an additional package?"),
    answers: [
      { text: _("zypper in"), correct: false },
      { text: _("dnf install"), correct: false },
      { text: _("transactional-update pkg install"), correct: true },
      { text: _("rpm-ostree install"), correct: false },
    ],
  },
  {
    text: _("Why is 'transactional-update shell' generally not recommended?"),
    answers: [
      { text: _("While it can be helpful, this command should ideally never be used. It can be dangerous and brick the system."), correct: true },
      { text: _("It creates wormholes into another dimension."), correct: false },
      { text: _("It can secretly migrate your system to Fedora."), correct: false },
      { text: _("Geeko loses a hair every time you use it."), correct: false },
    ],
  },
  {
    text: _("How do our Immutable distros allow writing to /etc at runtime?"),
    answers: [
      { text: _("By using overlayfs on top of /etc"), correct: true },
      { text: _("By mounting a writable Btrfs subvolume directly"), correct: false },
      { text: _("By disabling read-only mode during boot"), correct: false },
      { text: _("Through rpm-ostree layering"), correct: false },
    ],
  },
  {
    text: _("Aside from the update mechanism in Immutable distros, what other components SUPPORT transactional-updates?"),
    answers: [
      { text: _("DNF"), correct: false },
      { text: _("Salt and Ansible"), correct: false },
      { text: _("cockpit-tukit"), correct: false },
      { text: _("All options are correct"), correct: true },
    ],
  },
  {
    text: _("Only one of the following immutable distributions has regular point releases, the rest are rolling. Which one?"),
    answers: [
      { text: _("Leap Micro"), correct: true },
      { text: _("MicroOS"), correct: false },
      { text: _("Aeon"), correct: false },
      { text: _("Kalpa"), correct: false },
    ],
  },
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

// Randomize answers here if enabled
// This doesn't work particularly well with "All options are correct" type of answers
if (quizData.randomizeAnswers) {
  questions.forEach((q) => {
    q.answers.sort(() => Math.random() - 0.5);
  });
}

module.exports = { quizData, questions };