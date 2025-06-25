// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("openSUSE Expert"),
  subtitle: _(
    "Challenge other users in our leaderboard. 30 seconds per question. Stop anytime.",
  ),
  submitAnytime: true,
  timeout: 30,
  randomizeQuestions: true,
  randomizeAnswers: true,
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
      "Which openSUSE rolling distribution offers a calmer alternative to Tumbleweed for users who prefer fewer surprises?",
    ),
    answers: [
      { text: _("Tumblebleed"), correct: false },
      { text: _("Leapfrog"), correct: false },
      { text: _("Slowroll"), correct: true },
      { text: _("Zyppernap"), correct: false },
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
    text: _("Which desktop environment is the default for openSUSE Leap 15?"),
    answers: [
      { text: _("GNOME"), correct: false },
      { text: _("KDE Plasma"), correct: false },
      { text: _("Xfce"), correct: false },
      {
        text: _("There is no default. We leave choice to the user."),
        correct: true,
      },
    ],
  },
  {
    text: _("What is the name of the openSUSE build system?"),
    answers: [
      { text: _("OBS (Open Build Service)"), correct: true },
      { text: _("Weblate"), correct: false },
      { text: _("Koji"), correct: false },
      { text: _("Autobuilder"), correct: false },
    ],
  },
  {
    text: _(
      "How can you make changes to a root partition on a transactional-update based system?",
    ),
    answers: [
      {
        text: _(
          "Use transactional-update command and reboot into a new snapshot",
        ),
        correct: true,
      },
      { text: _("By using sudo-sudo to gain giga privileges"), correct: false },
      { text: _("By using Salt or Ansible"), correct: false },
      {
        text: _(
          "You have to edit files under a user netrunner and cross fingers",
        ),
        correct: false,
      },
    ],
  },
  {
    text: _("What is 'YaST'?"),
    answers: [
      { text: _("A chameleon species native to Africa"), correct: false },
      {
        text: _("A free software for configuration of operating system"),
        correct: true,
      },
      { text: _("The default web browser"), correct: false },
      { text: _("A programming language"), correct: false },
    ],
  },
  {
    text: _("What is the name of installer in openSUSE Aeon?"),
    answers: [
      { text: _("tik"), correct: true, },
      { text: _("tak"), correct: false },
      { text: _("tao"), correct: false },
      { text: _("Agama"), correct: false },
    ],
  },
  {
    text: _(
      "What is the go-to place to learn about projects from Rancher and SUSE?",
    ),
    answers: [
      { text: _("Rancher Academy"), correct: true },
      { text: _("Cow College"), correct: false },
      { text: _("Moo University"), correct: false },
      { text: _("Cowboy Hat"), correct: false },
    ],
  },
  {
    text: _("Chameleons are primarily found in which part of the world?"),
    answers: [
      { text: _("South America"), correct: false },
      { text: _("Africa and Madagascar"), correct: true },
      { text: _("Southeast Asia"), correct: false },
      { text: _("Antarctica"), correct: false },
    ],
  },
  {
    text: _(
      "Where can you install additional packages or packages with changes that didn't make it into the main distribution?",
    ),
    answers: [
      {
        text: _("With a single click from software.opensuse.org"),
        correct: false,
      },
      {
        text: _("By browsing the myriad of projects on OBS build.opensuse.org"),
        correct: false,
      },
      {
        text: _(
          "Through command opi, from the Packman repository or from Flathub",
        ),
        correct: false,
      },
      { text: _("All options are correct"), correct: true },
    ],
  },
  {
    text: _(
      "When submitting packages to openSUSE, where do you send them (metaphorically)?",
    ),
    answers: [
      { text: _("build.opensuse.org, not a carrier pigeon"), correct: true },
      { text: _("To the cloud (literally)"), correct: false },
      { text: _("By email to the Geeko mascot"), correct: false },
      { text: _("Via smoke signals from Nuremberg"), correct: false },
    ],
  },
  {
    text: _(
      "Where can you check the current status of openSUSE infrastructure?",
    ),
    answers: [
      { text: _("status.opensuse.org"), correct: true },
      { text: _("isopensusedown.com"), correct: false },
      { text: _("yast-status-viewer"), correct: false },
      { text: _("zypper up --ping"), correct: false },
    ],
  },
  {
    text: _("What is the name of the new package manager GUI replacing YaST?"),
    answers: [
      { text: _("Gandalf"), correct: false },
      { text: _("Zypperella"), correct: false },
      { text: _("Myrlyn"), correct: true },
      { text: _("DnfDumbledore"), correct: false },
    ],
  },
  {
    text: _("How often does openSUSE Leap release a new stable version?"),
    answers: [
      { text: _("Every 5 years when the stars align"), correct: false },
      { text: _("Every 12 months with 6 months overlap"), correct: true },
      { text: _("Every month"), correct: false },
      { text: _("When the Geeko gets bored"), correct: false },
    ],
  },
  {
    text: _(
      "Which openSUSE service is used for localization and translation management?",
    ),
    answers: [
      { text: _("Weblate"), correct: true },
      { text: _("OBS"), correct: false },
      { text: _("Build Service"), correct: false },
      { text: _("Kickstart"), correct: false },
    ],
  },
  {
    text: _(
      "What command would you use to update software packages on openSUSE from the terminal?",
    ),
    answers: [
      { text: _("zypper update"), correct: true },
      { text: _("apt-get update"), correct: false },
      { text: _("dnf upgrade"), correct: false },
      { text: _("pacman -Syu"), correct: false },
    ],
  },
  {
    text: _("What does Tumbleweed represent in openSUSE?"),
    answers: [
      { text: _("A rolling release distribution"), correct: true },
      { text: _("A desktop environment"), correct: false },
      { text: _("The mascot"), correct: false },
      { text: _("An installer"), correct: false },
    ],
  },
  {
    text: _(
      "Which openSUSE distribution is known for being a stable point release?",
    ),
    answers: [
      { text: _("Leap"), correct: true },
      { text: _("Tumbleweed"), correct: false },
      { text: _("MicroOS"), correct: false },
      { text: _("Slowroll"), correct: false },
    ],
  },
  {
    text: _("What is the primary focus of openSUSE MicroOS?"),
    answers: [
      {
        text: _("Immutable OS optimized for containers and microservices"),
        correct: true,
      },
      { text: _("Gaming"), correct: false },
      { text: _("Desktop productivity"), correct: false },
      { text: _("Scientific computing"), correct: false },
    ],
  },
  {
    text: _("What tool is used to create and manage snapshots on openSUSE?"),
    answers: [
      { text: _("snapper"), correct: true },
      { text: _("timeshift"), correct: false },
      { text: _("btrfs-snap"), correct: false },
      { text: _("rsnapshot"), correct: false },
    ],
  },
  {
    text: _("What is openSUSE's default text editor?"),
    answers: [
      { text: _("vim"), correct: true },
      { text: _("nano"), correct: false },
      { text: _("emacs"), correct: false },
      { text: _("gedit"), correct: false },
    ],
  },
  {
    text: _("Which command would install a package in openSUSE?"),
    answers: [
      { text: _("zypper install package-name"), correct: true },
      { text: _("apt-get install package-name"), correct: false },
      { text: _("dnf install package-name"), correct: false },
      { text: _("pacman -S package-name"), correct: false },
    ],
  },
  {
    text: _("What is the name of the official openSUSE community forum?"),
    answers: [
      { text: _("forums.opensuse.org"), correct: true },
      { text: _("discuss.opensuse.com"), correct: false },
      { text: _("geeko-talk.net"), correct: false },
      { text: _("opensuse-chat.org"), correct: false },
    ],
  },
  {
    text: _(
      "Which tool is recommended for managing software repositories and packages in openSUSE?",
    ),
    answers: [
      { text: _("zypper"), correct: true },
      { text: _("yum"), correct: false },
      { text: _("apt"), correct: false },
      { text: _("pacman"), correct: false },
    ],
  },
  {
    text: _("What is the name of openSUSE's flagship rolling release?"),
    answers: [
      { text: _("Tumbleweed"), correct: true },
      { text: _("Leap"), correct: false },
      { text: _("MicroOS"), correct: false },
      { text: _("Slowroll"), correct: false },
    ],
  },
  {
    text: _("What command will list all repositories in openSUSE?"),
    answers: [
      { text: _("zypper repos"), correct: true },
      { text: _("apt list"), correct: false },
      { text: _("dnf repolist"), correct: false },
      { text: _("pacman -Q"), correct: false },
    ],
  },
  {
    text: _("What is the primary license used by openSUSE?"),
    answers: [
      { text: _("GPL (GNU General Public License)"), correct: true },
      { text: _("MIT License"), correct: false },
      { text: _("Apache License"), correct: false },
      { text: _("Proprietary"), correct: false },
    ],
  },
  {
    text: _("What does OBS stand for in openSUSE context?"),
    answers: [
      { text: _("Open Build Service"), correct: true },
      { text: _("Online Backup System"), correct: false },
      { text: _("Open Box Scheduler"), correct: false },
      { text: _("Official Build System"), correct: false },
    ],
  },
  {
    text: _(
      "Which openSUSE service provides live build environments and package repositories?",
    ),
    answers: [
      { text: _("Open Build Service (OBS)"), correct: true },
      { text: _("Weblate"), correct: false },
      { text: _("YaST"), correct: false },
      { text: _("Snapper"), correct: false },
    ],
  },
  {
    text: _("What is the openSUSE project's primary goal?"),
    answers: [
      {
        text: _("Promoting and supporting free and open source software"),
        correct: true,
      },
      { text: _("Creating proprietary software"), correct: false },
      { text: _("Developing video games"), correct: false },
      { text: _("Providing cloud services"), correct: false },
    ],
  },
  {
    text: _(
      "Which openSUSE tool is used for system configuration and management?",
    ),
    answers: [
      { text: _("YaST"), correct: true },
      { text: _("Gnome Control Center"), correct: false },
      { text: _("KDE System Settings"), correct: false },
      { text: _("Synaptic"), correct: false },
    ],
  },
  {
    text: _("What is the command to check system snapshots on openSUSE?"),
    answers: [
      { text: _("snapper list"), correct: true },
      { text: _("timeshift --list"), correct: false },
      { text: _("btrfs subvolume list"), correct: false },
      { text: _("rsnapshot config"), correct: false },
    ],
  },
  {
    text: _("What package format does openSUSE use?"),
    answers: [
      { text: _("RPM"), correct: true },
      { text: _("DEB"), correct: false },
      { text: _("PKG"), correct: false },
      { text: _("APK"), correct: false },
    ],
  },
  {
    text: _("What is the default shell in openSUSE?"),
    answers: [
      { text: _("bash"), correct: true },
      { text: _("zsh"), correct: false },
      { text: _("fish"), correct: false },
      { text: _("csh"), correct: false },
    ],
  },
  {
    text: _("Which of these is a community-driven openSUSE version?"),
    answers: [
      { text: _("Tumbleweed"), correct: true },
      { text: _("Leap Micro"), correct: false },
      { text: _("SUSE Linux Enterprise"), correct: false },
      { text: _("MicroOS"), correct: false },
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
