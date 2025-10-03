// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("Asia Summit Dragon"),
  subtitle: _("Challenge the dragon of knowledge"),
  submitAnytime: false,
  timeout: 20,
  randomizeQuestions: true,
  randomizeAnswers: true,
  difficulty: 5,
};

const questions = [
  {
    text: _("In which city was the first openSUSE Asia Summit hosted?"),
    answers: [
      { text: _("Taipei, Taiwan"), correct: false },
      { text: _("Beijing, China"), correct: true },
      { text: _("Jakarta, Indonesia"), correct: false },
      { text: _("Tokyo, Japan"), correct: false },
    ],
  },
  {
    text: _("When was openSUSE Asia Summit hosted in Tokyo, Japan?"),
    answers: [
      { text: _("2022"), correct: false },
      { text: _("2017 and 2024"), correct: true },
      { text: _("2018"), correct: false },
      { text: _("Only 2024"), correct: false },
    ],
  },
  {
    text: _("Which of the following cities has NEVER hosted the openSUSE Asia Summit?"),
    answers: [
      { text: _("Denpasar"), correct: false },
      { text: _("Mumbai"), correct: true },
      { text: _("Taipei"), correct: false },
      { text: _("Faridabad"), correct: false },
    ],
  },
  {
    text: _("The 2018 edition of openSUSE Asia Summit took place in which city?"),
    answers: [
      { text: _("Hong Kong"), correct: false },
      { text: _("Taipei"), correct: true },
      { text: _("Jakarta"), correct: false },
      { text: _("Tokyo"), correct: false },
    ],
  },
  {
    text: _("Which of the following countries has never hosted an openSUSE Asia Summit?"),
    answers: [
      { text: _("Vietnam"), correct: true },
      { text: _("India"), correct: false },
      { text: _("Indonesia"), correct: false },
      { text: _("Taiwan"), correct: false },
    ],
  },
  {
    text: _("In 2016, the summit was hosted at Universitas Islam Indonesia. What city is that university located in?"),
    answers: [
      { text: _("Jakarta"), correct: false },
      { text: _("Yogyakarta"), correct: true },
      { text: _("Bandung"), correct: false },
      { text: _("Surabaya"), correct: false },
    ],
  },
  {
    text: _("Where was the openSUSE Asia Summit held in 2019?"),
    answers: [
      { text: _("Seoul"), correct: false },
      { text: _("Denpasar (Bali)"), correct: true },
      { text: _("Tokyo"), correct: false },
      { text: _("Hong Kong"), correct: false },
    ],
  },
  {
    text: _("The openSUSE Asia Summit 2020 and 2021 were held online. What was the main reason?"),
    answers: [
      { text: _("Budget cuts"), correct: false },
      { text: _("Lack of organizers"), correct: false },
      { text: _("COVID-19 pandemic"), correct: true },
      { text: _("Scheduling conflicts"), correct: false },
    ],
  },
  {
    text: _("Who typically designs the official logo for the openSUSE Asia Summit?"),
    answers: [
      { text: _("Geenardo Da Vinci"), correct: false },
      { text: _("A professional graphic designer hired by the openSUSE Foundation"), correct: false },
      { text: _("The community through an annual design contest"), correct: true },
      { text: _("The developers from the openSUSE infrastructure team"), correct: false },
    ],
  },
  {
    text: _("Which openSUSE Asia Summit had a red logo?"),
    answers: [
      { text: _("2016 in Beijing"), correct: false },
      { text: _("2017 in Tokyo"), correct: true },
      { text: _("2018 in Taipei"), correct: false },
      { text: _("2019 in Bali"), correct: false }
    ]
  },
  {
    text: _("Which openSUSE Asia Summit used the openSUSE Quiz app for the first time?"),
    answers: [
      { text: _("2025 in Faridabad"), correct: true },
      { text: _("2017 in Tokyo"), correct: false },
      { text: _("2018 in Taipei"), correct: false },
      { text: _("2014 in Beijing"), correct: false }
    ]
  },
  {
    text: _("The longest elevator trip to openSUSE Asia summit was in?"),
    answers: [
      { text: _("Tokyo"), correct: true },
      { text: _("Jakarta"), correct: false },
      { text: _("Denpasar"), correct: false },
      { text: _("Beijing"), correct: false }
    ]
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
