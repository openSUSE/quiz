// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("Kernel Ninja"),
  subtitle: _(
    "Interesting facts about kernel at SUSE and openSUSE",
  ),
  submitAnytime: false,
  randomizeQuestions: true,
};

const questions = [
  {
    text: _("What is the roughly the size (MB) of base (squashfs) image of SUSE Automotive Linux OS?"),
    answers: [
      { text: _("~ 20MB"), correct: false },
      { text: _("~ 60MB"), correct: true },
      { text: _("~ 240MB"), correct: false },
      { text: _("~ 520MB"), correct: false },
    ],
  },
  {
    text: _("How many configuration parameters (roughly) are adjusted in real-time Linux kernel for automotive compared to standard SLES RT?"),
    answers: [
      { text: _("~ 50"), correct: false },
      { text: _("~ 500"), correct: false },
      { text: _("~ 50000"), correct: true },
      { text: _("~ 500000"), correct: false },
    ],
  },
  {
    text: _("How many patches were applied on top of the upstream kernel 15.6 (SLES 15 SP6) as of June 11 2025?"),
    answers: [
      { text: _("4231"), correct: false },
      { text: _("16102"), correct: false },
      { text: _("32786"), correct: true },
      { text: _("346870"), correct: false },
    ],
  },
  {
    text: _("Which kernel flavor is used by default in openSUSE Leap?"),
    answers: [
      { text: _("kernel-suse"), correct: false },
      { text: _("kernel-default"), correct: true },
      { text: _("kernel-leap"), correct: false },
      { text: _("kernel-vanilla"), correct: false },
    ],
  },
  {
    text: _("What is the primary difference between kernel-default and kernel-rt in openSUSE?"),
    answers: [
      { text: _("kernel-rt supports older hardware"), correct: false },
      { text: _("kernel-rt disables preemption"), correct: false },
      { text: _("kernel-rt has full real-time preemption enabled"), correct: true },
      { text: _("kernel-rt has less security features"), correct: false },
    ],
  },
  {
    text: _("What does 'PREEMPT_RT' enable in the Linux kernel?"),
    answers: [
      { text: _("Real-time audio streaming"), correct: false },
      { text: _("Full preemption, reducing latency in critical sections"), correct: true },
      { text: _("Faster boot times"), correct: false },
      { text: _("Better energy efficiency"), correct: false },
    ],
  },
  {
    text: _("What is the name of a (very) fast tool for expanding kernel patches?"),
    answers: [
      { text: _("gitlab-kernel"), correct: false },
      { text: _("obs-kernel"), correct: false },
      { text: _("rapidquilt"), correct: true },
      { text: _("susepatch"), correct: false },
    ],
  },
  {
    text: _("In openSUSE, where are kernel build configs usually stored in the source tree?"),
    answers: [
      { text: _("configs/"), correct: true },
      { text: _("source/"), correct: false },
      { text: _("etc/"), correct: false },
      { text: _("boot/"), correct: false },
    ],
  },
  {
    text: _("What does the 'kernel-devel' package provide in openSUSE?"),
    answers: [
      { text: _("Common kernel headers used as a base for building external kernel modules"), correct: true },
      { text: _("Complete kernel source code required for debugging and building modules"), correct: false },
      { text: _("Documentation and manuals for the Linux kernel"), correct: false },
      { text: _("A hidden picture of the latest SUSE kernel team's team building event"), correct: false },
    ],
  },
  {
    text: _("Which of the following is a program to load kernel modules?"),
    answers: [
      { text: _("mkinitrd"), correct: false },
      { text: _("zypper"), correct: false },
      { text: _("modprobe"), correct: true },
      { text: _("systemctl"), correct: false },
    ],
  },
  {
    text: _("How often is openSUSE Tumbleweed's kernel updated (typically)?"),
    answers: [
      { text: _("Every 6 months"), correct: false },
      { text: _("Once a year"), correct: false },
      { text: _("Weekly or even more frequently"), correct: true },
      { text: _("Only when Linus pushes a new tag"), correct: false },
    ],
  },
  {
    text: _("What does the 'vanilla' kernel flavor in openSUSE represent?"),
    answers: [
      { text: _("Kernel with experimental SUSE patches"), correct: false },
      { text: _("Unmodified upstream Linux kernel"), correct: true },
      { text: _("Kernel optimized for servers"), correct: false },
      { text: _("Kernel with enhanced SELinux support"), correct: false },
    ],
  },
  {
    text: _("Which kernel boot parameter will typically help you while debuging video driver issues?"),
    answers: [
      { text: _("quiet"), correct: false },
      { text: _("nomodeset"), correct: true },
      { text: _("bumblebee"), correct: false },
      { text: _("noacpi"), correct: false },
    ],
  },
  {
    text: _("Which real-time scheduling policy is most deterministic in Linux?"),
    answers: [
      { text: _("SCHED_OTHER"), correct: false },
      { text: _("SCHED_FIFO"), correct: true },
      { text: _("SCHED_BATCH"), correct: false },
      { text: _("SCHED_IDLE"), correct: false },
    ],
  },
  {
    text: _("What is the name of the package that provides additional firmware in openSUSE Leap?"),
    answers: [
      { text: _("kernel-firmware-extra"), correct: false },
      { text: _("firmware-addon-leap"), correct: false },
      { text: _("kernel-default-extra"), correct: true },
      { text: _("suse-firmware-pack"), correct: false },
    ],
  },
  {
    text: _("How can you enable AppArmor via the GRUB kernel command line in openSUSE?"),
    answers: [
      { text: _("apparmor=1"), correct: false },
      { text: _("security=apparmor"), correct: true },
      { text: _("enable=apparmor"), correct: false },
      { text: _("selinux=off apparmor=on"), correct: false },
    ],
  },
  {
    text: _("In the openSUSE kernel world, what does 'KOTD' stand for?"),
    answers: [
      { text: _("Kernel Of The Day — daily built kernels on OBS Kernel:xxx projects"), correct: true },
      { text: _("Knights Of The Old Repositories — the legendary kernel defenders"), correct: false },
      { text: _("Keep Our Tux Dancing — the secret kernel dance party"), correct: false },
      { text: _("Kernel Operators Training Division — Jedi-level kernel ninjas"), correct: false },
    ],
  },
  {
    text: _("SUSE is a top 6 Linux kernel contributor (FSF 2017). About what percent of contributions does SUSE make?"),
    answers: [
      { text: _("Less than 1%"), correct: false },
      { text: _("Around 3%"), correct: true },
      { text: _("About 5%"), correct: false },
      { text: _("More than 20%"), correct: false },
    ],
  }
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

module.exports = { quizData, questions };
