function _(str) {
  return str;
}

const quizData = {
  title: _("Zypper Jedi"),
  subtitle: _(
    "Fun and obscure facts about Zypper, openSUSE's package manager",
  ),
  submitAnytime: false,
  randomizeQuestions: true,
  randomizeAnswers: true,
};

const questions = [
  {
    text: _("What is the name of the library used by the default openSUSE package manager?"),
    answers: [
      { text: _("libzypp"), correct: true },
      { text: _("libdnf"), correct: false },
      { text: _("libapt"), correct: false },
      { text: _("libsuse"), correct: false },
    ],
    explanation: _("openSUSE uses libzypp as the backend library for its package manager, Zypper. It's known for powerful dependency resolution and support for delta RPMs."),
  },
  {
    text: _("Where was Zypper respective libzypp first introduced?"),
    answers: [
      { text: _("In SuSE Linux 7.1 (2001)"), correct: false },
      { text: _("In SUSE Linux 10.1 (2006)"), correct: true },
      { text: _("As part of openSUSE Leap 42.3 magical release (2017)"), correct: false },
      { text: _("It was there since the beginning. S.u.S.E. Linux 1.0 (1994)"), correct: false },
    ],
  },
  {
    text: _("What does 'zypper refs' do?"),
    answers: [
      { text: _("Refreshes all repositories"), correct: false },
      { text: _("Lists orphaned packages"), correct: false },
      { text: _("Lists soft package locks"), correct: false },
      { text: _("Refreshes defined repository index services."), correct: true },
    ],
  },
  {
    text: _("What does RIS (Repository Index Service) actually do in openSUSE?"),
    answers: [
      { text: _("Allows centralized and flexible repository management. openSUSE uses it to generate .repo files from rpm-managed repoindex.xml"), correct: true },
      { text: _("It injects RPMs into your system while you're not looking."), correct: false },
      { text: _("It schedules all recursive installs to happen only during coffee breaks."), correct: false },
      { text: _("It just exists to confuse people with too many acronyms."), correct: false },
    ],
  },
  {
    text: _("What does the Zypper command 'zypper dup' do?"),
    answers: [
      { text: _("Deletes unused packages"), correct: false },
      { text: _("Performs a distribution upgrade"), correct: true },
      { text: _("Downloads all updates in background"), correct: false },
      { text: _("Displays user preferences"), correct: false },
    ],
  },
  {
    text: _("Which Zypper command enables parallel package downloads?"),
    answers: [
      { text: _("zypper --fast"), correct: false },
      { text: _("zypper -p"), correct: false },
      { text: _("The latest zypper uses parallel downloads by default"), correct: true },
      { text: _("zypper turbo"), correct: false },
    ],
  },
  {
    text: _("Which file is the main configuration file for Zypper?"),
    answers: [
      { text: _("/etc/zypp/zypp.conf"), correct: true },
      { text: _("/etc/zypperrc"), correct: false },
      { text: _("/etc/package.conf"), correct: false },
      { text: _("/usr/lib/zypper/config"), correct: false },
    ],
  },
  {
    text: _("Which of the following Zypper commands will clean all cached packages?"),
    answers: [
      { text: _("zypper refresh --clean"), correct: false },
      { text: _("zypper clean --all"), correct: true },
      { text: _("zypper purge-cache"), correct: false },
      { text: _("zypper remove-cache"), correct: false },
    ],
  },
  {
    text: _("Zypper can install patterns. What is a pattern in Zypper terms?"),
    answers: [
      { text: _("A regex for matching package names"), correct: false },
      { text: _("A group of packages defining a role or use-case"), correct: true },
      { text: _("A theming configuration file"), correct: false },
      { text: _("A metadata tag for a repository"), correct: false },
    ],
  },
  {
    text: _("What happens if you run 'zypper dup --from packman'?"),
    answers: [
      { text: _("Only update the 'packman' repository metadata"), correct: false },
      { text: _("Remove all non-packman packages"), correct: false },
      { text: _("Force upgrade of installed packages to versions from packman repository"), correct: true },
      { text: _("Create a backup before upgrade"), correct: false },
    ],
  },
  {
    text: _("Leap 16.0 improved repository management with CDN by default, RIS-managed repos, and fewer total repositories. How many distribution repos does Leap 16.0 include by default?"),
    answers: [
      { text: _("14"), correct: false },
      { text: _("10"), correct: false },
      { text: _("8"), correct: false },
      { text: _("6"), correct: true },
    ],
  },
  {
    text: _("Leap 16.0 uses RIS-managed repos now. How do you tweak repo settings without breaking things?"),
    answers: [
      { text: _("/etc/zypp/repos.d/ like the good old days"), correct: false },
      { text: _("Don’t touch distribution .repo files, they will get overwritten! Use /etc/zypp/vars.d instead."), correct: true },
      { text: _("Run `zypper --edit-repo --force` — the official way."), correct: false },
      { text: _("Edit repoindex.xml manually and cross your fingers."), correct: false },
    ],
  },
  {
    text: _("What can users do at software.opensuse.org?"),
    answers: [
      { text: _("Install packages with zypper via a single click in the browser."), correct: false },
      { text: _("Browse and install additional software, including packages from home projects."), correct: false },
      { text: _("View screenshots and details of cool open source software."), correct: false },
      { text: _("All of the above."), correct: true },
    ],
  },
  {
    text: _("At what manpage section would you look for zypper docs?"),
    answers: [
      { text: _("8"), correct: true },
      { text: _("1"), correct: false },
      { text: _("6"), correct: false },
      { text: _("42"), correct: false },
    ],
  },
  {
    text: _("What is yzpper?"),
    answers: [
      { text: _("Turkish translation of zypper"), correct: false },
      { text: _("Reverse (undo) the last zypper command"), correct: false },
      { text: _("Symlink to zypper, to avoid error on keyboard with swapped Y and Z key [german]"), correct: true },
      { text: _("The project name of next gen zypper"), correct: false },
    ],
  },
  {
    text: _("This one is tricky! We all know zypper rm --clean deps but what happens if you run `zypper rm --clean-deps rm`?"),
    answers: [
      { text: _("You uninstall the `rm` command and all its leftover dependencies. Good luck removing files afterward!"), correct: false },
      { text: _("Only the `rm` command gets removed, dependencies stay put."), correct: false },
      { text: _("It cleans your system of the `rm` command but keeps a backup just in case."), correct: false },
      { text: _("Nothing happens `rm` command belongs to coreutils."), correct: true },
    ],
  }
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