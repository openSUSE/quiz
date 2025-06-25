// This helper function marks strings for translation.
// Tools like `xgettext` can extract strings wrapped in _("...").
// Plain string literals ("...") are ignored by such tools.
// This dummy function allows us to mark strings for translation
// without affecting runtime behavior — it simply returns the input.
function _(str) {
  return str;
}

const quizData = {
  title: _("s390x Expert"),
  subtitle: _("A quiz for friends of mainframes and exotic architectures."),
  submitAnytime: false,
  randomizeQuestions: true,
  randomizeAnswers: true,
};

const questions = [
  {
    text: _("What’s the difference between Big Endian and Little Endian?"),
    answers: [
      {
        text: _("It’s about byte ordering; s390x being Big Endian"),
        correct: true,
      },
      {
        text: _(
          "s390x are using only 31b, that’s why they’re called Little Endian",
        ),
        correct: false,
      },
      {
        text: _("It’s about byte ordering; s390x being Little Endian"),
        correct: false,
      },
      {
        text: _("It’s not used anymore, s390x are Bi-endianess"),
        correct: false,
      },
    ],
  },
  {
    text: _("DASD is?"),
    answers: [
      { text: _("A German word"), correct: false },
      {
        text: _("Swear word repeated often by s390x administrators"),
        correct: false,
      },
      { text: _("A scsi disk"), correct: false },
      { text: _("Direct-access storage device"), correct: true },
    ],
  },
  {
    text: _("HMC is?"),
    answers: [
      {
        text: _("Home mc, just a new friendlier Midnight Commander"),
        correct: false,
      },
      {
        text: _(
          "The administration of mainframe machine through web interface",
        ),
        correct: true,
      },
      {
        text: _("A command for listing hardware network addresses."),
        correct: false,
      },
      { text: _("A hidden module control unit"), correct: false },
    ],
  },
  {
    text: _("z/VM is?"),
    answers: [
      {
        text: _("z/VM is operating system usually used as hypervisor"),
        correct: true,
      },
      { text: _("Virtual Machine on Z (meaning s390x)"), correct: false },
      { text: _("Remote desktop viewer"), correct: false },
      { text: _("Zombie Virtual Memory"), correct: false },
    ],
  },
  {
    text: _("What does storage mean in the mainframe world?"),
    answers: [
      { text: _("Data storage (disks) counted in cylinders"), correct: false },
      { text: _("A room where the mainframe is located"), correct: false },
      { text: _("Memory (RAM)"), correct: true },
      {
        text: _("Compartment within a mainframe where the disks are located"),
        correct: false,
      },
    ],
  },
  {
    text: _("What is x3270?"),
    answers: [
      {
        text: _("Special file encoding, which is a must for files on s390x"),
        correct: false,
      },
      {
        text: _("Terminal emulator for connection to a machine"),
        correct: true,
      },
      { text: _("Hexa code used as default admin password"), correct: false },
      { text: _("None of these ridiculous choices"), correct: false },
    ],
  },
  {
    text: _("What does IPL 150 mean?"),
    answers: [
      { text: _("Give me additional 150MB of memory"), correct: false },
      { text: _("IP to my Linux machine"), correct: false },
      { text: _("Boot from disk 150."), correct: true },
      { text: _("Install Python Libraries version 1.5.0"), correct: false },
    ],
  },
  {
    text: _("What is IFL?"),
    answers: [
      { text: _("A filtration unit for cooling fluid"), correct: false },
      { text: _("Made up word to confuse laptop users"), correct: false },
      { text: _("Integrated FLat circuit"), correct: false },
      { text: _("A core to run Linux on mainframe"), correct: true },
    ],
  },
  {
    text: _("What is cio_ignore?"),
    answers: [
      { text: _("A command masking visibility of devices"), correct: true },
      {
        text: _("Ignore input/output data until the line is ready to receive"),
        correct: false,
      },
      { text: _("It actually means ignore CIO"), correct: false },
      { text: _("A z/VM syslog filter"), correct: false },
    ],
  },
  {
    text: _("What is the most used operating system on mainframes?"),
    answers: [
      { text: _("Linux"), correct: false },
      { text: _("Windows"), correct: false },
      { text: _("z/VM"), correct: false },
      { text: _("z/OS"), correct: true },
    ],
  },
  {
    text: _("Do mainframes have any special AI capabilities?"),
    answers: [
      { text: _("Yes, latest models have Spyre accelerator."), correct: true },
      { text: _("No, it's too old technology."), correct: false },
      { text: _("Yes, but it can't be used on Linux."), correct: false },
      {
        text: _("No, mainframes are not useful for running AI tasks."),
        correct: false,
      },
    ],
  },
  {
    text: _("Which of the following I/O devices is not used with mainframes?"),
    answers: [
      { text: _("Disks"), correct: false },
      { text: _("Tape drives"), correct: false },
      { text: _("Network"), correct: false },
      { text: _("Bluetooth"), correct: true },
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
