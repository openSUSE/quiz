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
    text: _("What is the correct spelling of the CPU architecture supported by openSUSE on Raspberry Pi 5?"),
    answers: [
      { text: _("arm"), correct: false },
      { text: _("Arm"), correct: true },
      { text: _("ARM!"), correct: false },
      { text: _("Armmm… not sure"), correct: false },
    ],
  },
  {
    text: _("Does openSUSE still provide 32-bit Armv7 images?"),
    answers: [
      { text: _("Yes, Raspberry Pi Zero is the most demanded use case"), correct: true },
      { text: _("No, 32-bit is so 2012"), correct: false },
      { text: _("Only on Tuesdays"), correct: false },
      { text: _("Only if you compile them on a toaster"), correct: false },
    ],
  },
{
  text: _("Who is responsible for enablement of Raspberry Pi 5 in the upstream Linux kernel?"),
  answers: [
    { text: _("SUSE Hardware Enablement team"), correct: true },
    { text: _("Linus Torvalds"), correct: false },
    { text: _("Richard Stallman"), correct: false },
    { text: _("Eric S. Raymond "), correct: false },
  ],
},
  {
    text: _("Which kernel branch includes SUSE’s Raspberry Pi 5 support?"),
    answers: [
      { text: _("Upstream mainline kernel (merged contributions)"), correct: true },
      { text: _("A secret fork called linux-armageddon"), correct: false },
      { text: _("Kernel 2.6.18 with duct tape"), correct: false },
      { text: _("Only available as firmware for your keyboard"), correct: false },
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
      { text: _("Follow arm@lists.opensuse.org and #arm:opensuse.org"), correct: true },
      { text: _("Ask ChatGPT for daily firmware leaks"), correct: false },
      { text: _("Consult the stars under a full moon"), correct: false },
      { text: _("Refresh get.opensuse.org until it blinks"), correct: false },
    ],
  },
  {
    text: _("If you win this Raspberry Pi 5, what should you run first?"),
    answers: [
      { text: _("openSUSE Tumbleweed for Arm"), correct: true },
      { text: _("A tiny dancing ASCII penguin benchmark"), correct: false },
      { text: _("Minecraft in kernel space"), correct: false },
      { text: _("Windows 95 in a QEMU loop for nostalgia"), correct: false },
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
