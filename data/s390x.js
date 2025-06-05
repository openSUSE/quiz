const quizData = {
  title: "s390x Expert",
  subtitle: "A quiz for friends of mainframes and exotic architectures.",
  submitAnytime: false,
  randomizeQuestions: true,
};

const questions = [
  {
    text: "What’s the difference between Big Endian and Little Endian?",
    answers: [
      {
        text: "s390x are using only 31b, that’s why they’re called Little Endian",
        correct: false,
      },
      {
        text: "It’s about byte ordering; s390x being Big Endian",
        correct: true,
      },
      {
        text: "It’s about byte ordering; s390x being Little Endian",
        correct: false,
      },
      { text: "It’s not used anymore, s390x are Bi-endianess", correct: false },
    ],
  },
  {
    text: "DASD is?",
    answers: [
      { text: "A German word", correct: false },
      { text: "Direct-access storage device", correct: true },
      {
        text: "Swear word repeated often by s390x administrators",
        correct: false,
      },
      { text: "A scsi disk", correct: false },
    ],
  },
  {
    text: "HMC is?",
    answers: [
      {
        text: "Home mc, just a new friendlier Midnight Commander",
        correct: false,
      },
      {
        text: "The administration of mainframe machine through web interface",
        correct: true,
      },
      {
        text: "A command for listing hardware network addresses.",
        correct: false,
      },
      { text: "A hidden module control unit", correct: false },
    ],
  },
  {
    text: "z/VM is?",
    answers: [
      { text: "Virtual Machine on Z (meaning s390x)", correct: false },
      {
        text: "z/VM is operating system usually used as hypervisor",
        correct: true,
      },
      { text: "Remote desktop viewer", correct: false },
      { text: "Zombie Virtual Memory", correct: false },
    ],
  },
  {
    text: "What does storage mean in the mainframe world?",
    answers: [
      { text: "Memory (RAM)", correct: true },
      { text: "Data storage (disks) counted in cylinders", correct: false },
      { text: "A room where the mainframe is located", correct: false },
      {
        text: "Compartment within a mainframe where the disks are located",
        correct: false,
      },
    ],
  },
  {
    text: "What is x3270?",
    answers: [
      {
        text: "Special file encoding, which is a must for files on s390x",
        correct: false,
      },
      {
        text: "Terminal emulator for connection to a machine",
        correct: true,
      },
      { text: "Hexa code used as default admin password", correct: false },
      { text: "None of these ridiculous choices", correct: false },
    ],
  },
  {
    text: "What does IPL 150 mean?",
    answers: [
      { text: "Give me additional 150MB of memory", correct: false },
      { text: "IP to my Linux machine", correct: false },
      { text: "Boot from disk 150.", correct: true },
      { text: "Install Python Libraries version 1.5.0", correct: false },
    ],
  },
  {
    text: "What is IFL?",
    answers: [
      { text: "A filtration unit for cooling fluid", correct: false },
      { text: "A core to run Linux on mainframe", correct: true },
      { text: "Made up word to confuse laptop users", correct: false },
      { text: "Integrated FLat circuit", correct: false },
    ],
  },
  {
    text: "What is cio_ignore?",
    answers: [
      { text: "A command masking visibility of devices", correct: true },
      {
        text: "Ignore input/output data until the line is ready to receive",
        correct: false,
      },
      { text: "It actually means ignore CIO", correct: false },
      { text: "A z/VM syslog filter", correct: false },
    ],
  },
  {
    text: "What is the most used operating system on mainframes?",
    answers: [
      { text: "z/OS", correct: true },
      { text: "Linux", correct: false },
      { text: "Windows", correct: false },
      { text: "z/VM", correct: false },
    ],
  },
  {
    text: "Do mainframes have any special AI capabilities?",
    answers: [
      { text: "Yes, latest models have Spyre accelerator.", correct: true },
      { text: "No, it's too old technology.", correct: false },
      { text: "Yes, but it can't be used on Linux.", correct: false },
      { text: "No, mainframes are not useful for running AI tasks.", correct: false },
    ],
  },
  {
    text: "Which of the following I/O devices is not used with mainframes?",
    answers: [
      { text: "Disks", correct: false },
      { text: "Tape drives", correct: false },
      { text: "Network", correct: false },
      { text: "Bluetooth", correct: true },
    ],
  },
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

module.exports = { quizData, questions };
