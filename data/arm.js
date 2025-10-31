// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation.
function _(str) {
  return str;
}

const quizData = {
  title: _("openSUSE Arm"),
  subtitle: _("Hardware Enablement journey on Arm."),
  submitAnytime: false,
  randomizeQuestions: false,
  randomizeAnswers: false,
  difficulty: 2,
};

const questions = [
  {
    text: _("What is Arm, in the context of computing?"),
    answers: [
      { text: _("A family of energy-efficient CPU architectures widely used in mobile devices, embedded systems, and servers"), correct: true },
      { text: _("A robotic limb that compiles your code"), correct: false },
      { text: _("A special SUSE department for arm wrestling kernel bugs"), correct: false },
      { text: _("A new kind of filesystem invented by Geeko"), correct: false },
    ],
  },
  {
  text: _("What is the Raspberry Pi 5?"),
  answers: [
    { text: _("A credit-card-sized computer using Arm architecture"), correct: false },
    { text: _("An affordable and energy-efficient little desktop — perfect for kids to browse the web, watch YouTube, learn coding, or play light games"), correct: false },
    { text: _("A tiny but capable server for running a home NAS, Home Assistant, Nextcloud, or even a local openSUSE mirror"), correct: false },
    { text: _("All of the above"), correct: true },
  ],
  },
  {
    text: _("What is the correct spelling of the CPU architecture supported by openSUSE on Raspberry Pi 5?"),
    answers: [
      { text: _("arm"), correct: false },
      { text: _("Arm"), correct: true },
      { text: _("ARM!"), correct: false },
      { text: _("Armmm… not sure"), correct: false },
    ],
  },
  {
    text: _("Who is behind Raspberry PI5 u-boot support in upstream Linux kernel?"),
    answers: [
      { text: _("Ivan Ivanov and Matthias Brugger from SUSE HW Enablement team."), correct: true },
      { text: _("Linus Torvalds"), correct: false },
      { text: _("Richard Stallman"), correct: false },
      { text: _("Eric S. Raymond "), correct: false },
    ],
  },
  {
    text: _("Which openSUSE editions offer specialized Raspberry Pi images?"),
    answers: [
      { text: _("Leap, Leap Micro, Tumbleweed, and MicroOS"), correct: true },
      { text: _("Only Tumbleweed, because it never stops rolling"), correct: false },
      { text: _("Just Leap 42.3 because it’s eternal"), correct: false },
      { text: _("Only MicroOS, everything else melted"), correct: false },
    ],
  },
  {
    text: _("What is the preferred image format for openSUSE on Raspberry Pi?"),
    answers: [
      { text: _("Raw disk image (.raw.xz)"), correct: true },
      { text: _(".exe installer"), correct: false },
      { text: _(".iso DVD image with manual soldering required"), correct: false },
      { text: _(".tar.gz full of dreams"), correct: false },
    ],
  },
  {
    text: _("openSUSE can run on mobile phones too! What installation images are available for the PinePhone?"),
    answers: [
      { text: _("Tumbleweed with Phosh (for Purism fans) and Tumbleweed with Plasma Mobile (for KDE lovers)"), correct: true },
      { text: _("Leap Micro with GNOME Shell for refrigerators"), correct: false },
      { text: _("Tumbleweed LXQt Edition for rotary phones"), correct: false },
      { text: _("MicroOS Text Edition with Morse input mode"), correct: false },
    ],
  },
  {
    text: _("Where can you find openSUSE images for Arm devices such as Raspberry Pi, PinePhone, or Pinebook?"),
    answers: [
      { text: _("get.opensuse.org – the friendly starting point for most used openSUSE images"), correct: false },
      { text: _("en.opensuse.org/Portal:Arm – the Arm portal with links and documentation"), correct: false },
      { text: _("download.opensuse.org/ports/aarch64/tumbleweed – for the brave who like manual browsing"), correct: false },
      { text: _("All of the above"), correct: true },
    ],
  },
  {
    text: _("Is openSUSE Tumbleweed Arm built together with x86_64 packages?"),
    answers: [
      { text: _("No, it’s built separately as part of openSUSE Ports"), correct: true },
      { text: _("Yes, it all comes from one magical build server"), correct: false },
      { text: _("Only if the moon is in retrograde"), correct: false },
      { text: _("Yes, but it’s compiled by penguins"), correct: false },
    ],
  },
  {
    text: _("Which command is commonly used to write the openSUSE image to an SD card?"),
    answers: [
      { text: _("dd if=image.raw.xz of=/dev/sdX bs=4M status=progress"), correct: true },
      { text: _("sudo print-image-now"), correct: false },
      { text: _("cat image > coffee"), correct: false },
      { text: _("rpm -i image.raw.xz"), correct: false },
    ],
  },
  {
    text: _("What type of storage can openSUSE Raspberry Pi images boot from?"),
    answers: [
      { text: _("SD card, USB, or NVMe (on Pi 5)"), correct: true },
      { text: _("Only floppy disks with patience"), correct: false },
      { text: _("Cloud sync via pigeon post"), correct: false },
      { text: _("Tape backup, if you believe hard enough"), correct: false },
    ],
  },
{
  text: _("What’s the best way to stay updated on openSUSE Arm development?"),
  answers: [
    { text: _("Follow the openSUSE Arm mailing list and Matrix channel (details below)"), correct: true },
    { text: _("Ask ChatGPT for daily firmware leaks"), correct: false },
    { text: _("Consult the stars under a full moon"), correct: false },
    { text: _("Refresh get.opensuse.org until it blinks"), correct: false },
  ],
},
{
  text: _("If you win this Raspberry Pi 5, what could you run on it first?"),
  answers: [
    { text: _("Start with openSUSE Tumbleweed for Arm and explore a full Linux desktop experience"), correct: false },
    { text: _("Set up a personal home server with Nextcloud, Home Assistant, or your own openSUSE mirror"), correct: false },
    { text: _("Try fun experiments like retro gaming, media centers, or coding projects for kids"), correct: false },
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
