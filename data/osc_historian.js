// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("oSC Historian"),
  subtitle: _("Are you an openSUSE Conference Historian? Prove it!"),
  submitAnytime: false,
  timeout: 20,
  randomizeQuestions: false,
};

const questions = [
  {
    text: _("In what year was the first-ever openSUSE Conference held?"),
    answers: [
      { text: _("2006"), correct: false },
      { text: _("2009"), correct: true },
      { text: _("2012"), correct: false },
      { text: _("2008"), correct: false },
    ],
  },
  {
    text: _("Who delivered the opening keynote 'Working in a virtual community' back in 2009?"),
    answers: [
      { text: _("Leslie Hawthorn from Google"), correct: false },
      { text: _("Gianugo Rabellino from the Apache Software Foundation"), correct: false },
      { text: _("Joe 'Zonker' Brockmeier, openSUSE community manager"), correct: false },
      { text: _("Lenz Grimmer from MySQL"), correct: true },
    ],
  },
  {
    text: _("Which company owned and sponsored openSUSE Conference in 2009?"),
    answers: [
        { text: _("Novell"), correct: true },
        { text: _("Micro Focus"), correct: false },
        { text: _("Attachmate"), correct: false },
        { text: _("SUSE"), correct: false },
    ],
  },
  {
    text: _("Back to the present. Who delivered the opening keynote at the oSC 2024?"),
    answers: [
        { text: _("Dirk-Peter van Leeuwen"), correct: true },
        { text: _("Rick Spencer"), correct: false },
        { text: _("Melissa Di Donato"), correct: false },
        { text: _("Mark Shuttleworth"), correct: false },
    ],
  },
  {
    text: _("Can you guess how many sessions are scheduled for oSC 2025?"),
    answers: [
      { text: _("78 sessions"), correct: true },
      { text: _("108 sessions"), correct: false },
      { text: _("58 sessions"), correct: false },
      { text: _("42.3 sessions"), correct: false },
    ],
  },
  {
    text: _("Which of these cities has NOT hosted an openSUSE Conference yet?"),
    answers: [
      { text: _("Prague, Czech Republic"), correct: false },
      { text: _("The Hague, Netherlands"), correct: false },
      { text: _("Paris, France"), correct: true },
      { text: _("Thessaloniki, Greece"), correct: false },
    ],
  },
  {
    text: _("Where does the openSUSE Conference pre-party usually happen in Nuremberg?"),
    answers: [
      { text: _("At Kater Murr"), correct: true },
      { text: _("At ZypperHaus"), correct: false },
      { text: _("In the SESU club run by SUSE interns at the local university"), correct: false },
      { text: _("At the virtual /bar on meet.opensuse.org"), correct: false },
    ],
  },
  {
    text: _("What unusual item has appeared as official openSUSE swag?"),
    answers: [
      { text: _("openSUSE branded surströmming"), correct: false },
      { text: _("Geeko flavored toothpaste"), correct: false },
      { text: _("openSUSE beer"), correct: true },
      { text: _("FIPS certified socks"), correct: false },
    ],
  },
  {
    text: _("Our ex-Treasurer Andrew received enormous applause for a surprising 'creation' during his talk. What was it?"),
    answers: [
      { text: _("Dirty Dancing with Geeko"), correct: true },
      { text: _("Singing a Free Software song"), correct: false },
      { text: _("Playing the banjo"), correct: false },
      { text: _("Deep dived into open bugs wearing a swimsuit"), correct: false },
    ],
  },
  {
    text: _("What happened to the openSUSE Conference during 2020–2021?"),
    answers: [
      { text: _("It was held in orbit via SpaceX"), correct: false },
      { text: _("It was virtual due to COVID-19"), correct: true },
      { text: _("It merged with Novel Digital"), correct: false },
      { text: _("Canceled due to lack of pizza"), correct: false },
    ],
  },
  {
    text: _("The oSC 2016 Friday night party once went loooooooong because of a special live act. What made it unforgettable?"),
    answers: [
      { text: _("The famous SUSE band rocked the Z-Bau"), correct: true },
      { text: _("A surprise keynote by Linus Torvalds"), correct: false },
      { text: _("A spontaneous YaST karaoke contest"), correct: false },
      { text: _("An epic dance-off between Geeko mascots"), correct: false },
    ],
  },
];

// Randomize questions here if enabled
if (quizData.randomizeQuestions) {
  questions.sort(() => Math.random() - 0.5);
}

module.exports = { quizData, questions };
