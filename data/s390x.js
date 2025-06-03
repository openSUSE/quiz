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
        text: "The administration of mainframe machine through web interface from the 90’s",
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
      { text: "Virtual Machine on Z (meaning s390x)", correct: true },
      {
        text: "z/VM is operating system with the best backward compatibility",
        correct: false,
      },
      { text: "Remote desktop viewer", correct: false },
      { text: "Zombie Virtual Memory", correct: false },
    ],
  },
  {
    text: "What does storage mean in the mainframe world?",
    answers: [
      { text: "Memory (RAM)", correct: false },
      { text: "Data storage (disks) counted in cylinders", correct: true },
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
        text: "Terminal using unsecured telnet for connection to a machine",
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
      { text: "A variant of lung disease", correct: false },
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
    text: "How is the operating system on s390x administered?",
    answers: [
      { text: "Prolog", correct: false },
      { text: "Lisp", correct: false },
      { text: "HMC", correct: true },
      { text: "Linux (installed on bare metal)", correct: false },
    ],
  },
  {
    text: "AI must be mentioned :) In which language(s) can’t you work with data models on s390x using hardware exploitation?",
    answers: [
      { text: "Prolog", correct: false },
      { text: "C/C++", correct: true },
      { text: "Python", correct: true },
      { text: "Java", correct: true },
    ],
  },
  {
    text: "Which of the following I/O devices is typically not used with mainframes?",
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
