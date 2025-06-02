const quizData = {
  title: "openSUSE Expert",
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
    text: "Which openSUSE rolling distribution offers a calmer alternative to Tumbleweed for users who prefer fewer surprises?",  
    type: "mc",
    answers: [
      { text: "Tumblebleed", correct: false },
      { text: "Leapfrog", correct: false },
      { text: "Slowroll", correct: true },
      { text: "Zyppernap", correct: false },
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
    {
    text: "Where can you check the current status of openSUSE infrastructure?",
    type: "mc",
    answers: [
      { text: "status.opensuse.org", correct: true },
      { text: "isopensusedown.com", correct: false },
      { text: "yast-status-viewer", correct: false },
      { text: "zypper up --ping", correct: false },
    ],
  },
  {
    text: "Where can you install additional packages or packages with changes that didn't make it into the main distribution?",
    type: "mc",
    answers: [
      { text: "With a single click from software.opensuse.org", correct: false },
      { text: "By browsing the myriad of projects on OBS build.opensuse.org", correct: false },
      { text: "Through command opi, from the Packman repository or from Flathub", correct: false },
      { text: "All options are correct", correct: true },
    ],
  },
  {
    text: "When submitting packages to openSUSE, where do you send them (metaphorically)?",
    type: "mc",
    answers: [
      { text: "build.opensuse.org, not a carrier pigeon", correct: true },
      { text: "To the cloud (literally)", correct: false },
      { text: "By email to the Geeko mascot", correct: false },
      { text: "Via smoke signals from Nuremberg", correct: false },
    ],
  },
    {
    text: "Where can you check the current status of openSUSE infrastructure?",
    type: "mc",
    answers: [
      { text: "status.opensuse.org", correct: true },
      { text: "isopensusedown.com", correct: false },
      { text: "yast-status-viewer", correct: false },
      { text: "zypper up --ping", correct: false },
    ],
  },
  {
    text: "What is the name of the new package manager GUI replacing YaST?",
    type: "mc",
    answers: [
      { text: "Gandalf", correct: false },
      { text: "Zypperella", correct: false },
      { text: "Myrlyn", correct: true },
      { text: "DnfDumbledore", correct: false },
    ],
  },
  {
    text: "How often does openSUSE Leap release a new stable version?",
    type: "mc",
    answers: [
      { text: "Every 5 years when the stars align", correct: false },
      { text: "Monthly, to keep everyone on their toes", correct: false },
      { text: "Annually", correct: true },
      { text: "Every time a tumbleweed rolls by", correct: false },
    ],
  },
  {
    text: "Which openSUSE mailing list is focused on development discussions?",
    type: "mc",
    answers: [
      { text: "factory@lists.opensuse.org", correct: true },
      { text: "support@opensuse.org", correct: false },
      { text: "users@opensuse.org", correct: false },
      { text: "fun@opensuse.org", correct: false },
    ],
  },
  {
    text: "openSUSE's build service allows you to build packages for how many different distributions?",
    type: "mc",
    answers: [
      { text: "Just openSUSE Leap", correct: false },
      { text: "Over 100, including Fedora and Debian", correct: true },
      { text: "Only Tumbleweed", correct: false },
      { text: "None, it only builds source code", correct: false },
    ],
  },
  {
    text: "openSUSE Leap is based on which upstream distribution?",
    type: "mc",
    answers: [
      { text: "Fedora", correct: false },
      { text: "Debian", correct: false },
      { text: "SUSE Linux Enterprise", correct: true },
      { text: "Arch Linux", correct: false },
    ],
  },
  {
    text: "Which tool does openSUSE use for system snapshots and rollback?",
    type: "mc",
    answers: [
      { text: "Timeshift", correct: false },
      { text: "Snapper", correct: true },
      { text: "Btrfs Manager", correct: false },
      { text: "Rollbackinator", correct: false },
    ],
  },
  {
    text: "What command can you use to refresh zypper repositories?",
    type: "mc",
    answers: [
      { text: "zypper refresh", correct: true },
      { text: "zypper update", correct: false },
      { text: "zypper reload", correct: false },
      { text: "zypper repolist", correct: false },
    ],
  },
  {
    text: "Where can you submit bug reports related to openSUSE packages?",
    type: "mc",
    answers: [
      { text: "bugzilla.opensuse.org", correct: true },
      { text: "issues.opensuse.org", correct: false },
      { text: "bugs.opensuse.com", correct: false },
      { text: "bugs.opensuse.net", correct: false },
    ],
  },
  {
    text: "Which openSUSE service mirrors openSUSE software repositories worldwide?",
    type: "mc",
    answers: [
      { text: "mirror.opensuse.org", correct: true },
      { text: "mirror.opensuse.net", correct: false },
      { text: "mirrors.opensuse.com", correct: false },
      { text: "repos.opensuse.org", correct: false },
    ],
  },
  {
    text: "Where can you find endless wisdom, occasional rants, and a lot of helpful penguin-powered advice from the openSUSE community?",
    type: "mc",
    answers: [
      { text: "under Geeko’s pillow", correct: false },
      { text: "forums.opensuse.org", correct: true },
      { text: "i-seek-you-opensuse", correct: false },
      { text: "yast --help", correct: false },
    ],
  },
  {
    text: "Which security module is now used by default in new openSUSE Tumbleweed and Leap 16.0 installations?",
    type: "mc",
    answers: [
      { text: "AppArmor", correct: false },
      { text: "SELinux", correct: true },
      { text: "grsecurity", correct: false },
      { text: "Firewalld", correct: false },
    ],
  },
  {
    text: "What is the official slogan of openSUSE?",
    type: "mc",
    answers: [
      { text: "Have a lot of fun!", correct: true },
      { text: "Innovate and Collaborate", correct: false },
      { text: "Open Source, Open Future", correct: false },
      { text: "Power to the Users", correct: false },
    ],
  },
  {
    text: "When was the openSUSE project officially started?",
    type: "mc",
    answers: [
      { text: "2047", correct: false },
      { text: "0 AD", correct: false },
      { text: "2005", correct: true },
      { text: "1991", correct: false },
    ],
  },
  {
    text: "What cannot be tested in openQA?",
    type: "mc",
    answers: [
      { text: "ASCII art", correct: false },
      { text: "Displaying websites in Mozilla Firefox", correct: false },
      { text: "Installing Debian", correct: false },
      { text: "Covid-19", correct: true },
    ],
  },
  {
    text: "Which of the following has the highest compression?",
    type: "mc",
    answers: [
      { text: "tar", correct: false },
      { text: "echo", correct: false },
      { text: "mkfile", correct: false },
      { text: "steam roller", correct: true },
    ],
  },
  {
    text: "Who is known as the father of Linux?",
    type: "mc",
    answers: [
      { text: "Torwald Linuksson", correct: false },
      { text: "Linus Torvalds", correct: true },
      { text: "Linux Tyrnux", correct: false },
      { text: "Sinus Urvaald", correct: false },
    ],
  },
  {
    text: "What is the default shell in openSUSE?",
    type: "mc",
    answers: [
      { text: "ash", correct: false },
      { text: "bash", correct: true },
      { text: "zshpicture", correct: false },
      { text: "dash", correct: false },
    ],
  },
  {
    text: "What does GNOME do?",
    type: "mc",
    answers: [
      { text: "Mine gold and diamonds", correct: false },
      { text: "Create a desktop environment for Linux", correct: true },
      { text: "Install Linux programs and applications", correct: false },
      { text: "Fix MacOS drivers", correct: false },
    ],
  },
  {
    text: "What is the main openSUSE conference called?",
    type: "mc",
    answers: [
      { text: "openSUSE Gathering", correct: false },
      { text: "openSUSE Fest", correct: false },
      { text: "openSUSE Conference (OSC)", correct: true },
      { text: "openSUSE Flock", correct: false },
    ],
  },
  {
    text: "What does the new openSUSE-repos package manage?",
    type: "mc",
    answers: [
      { text: "Repository definitions in /etc/zypp/repos.d/ managed by RIS", correct: true },
      { text: "Kernel modules for openSUSE Leap", correct: false },
      { text: "Desktop themes and icons", correct: false },
      { text: "System logs and journal settings", correct: false },
    ],
  },
  {
    text: "Where can you help translate this quiz?",
    type: "mc",
    answers: [
      { text: "At the openSUSE forum", correct: false },
      { text: "On GitHub issues", correct: false },
      { text: "Lookup quiz at https://l10n.opensuse.org", correct: true },
      { text: "In the IRC chat", correct: false },
    ],
  },
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

module.exports = { quizData, questions };
