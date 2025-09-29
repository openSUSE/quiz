// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("SUSE Story"),
  subtitle: _("Discover SUSE, one click at a time."),
  submitAnytime: false,
  randomizeQuestions: false,
  randomizeAnswers: false,
};

const questions = [
  {
    text: _("What is SUSE’s business?"),
    answers: [
      { text: _("Providing Enterprise Linux solutions for mission-critical systems"), correct: false },
      { text: _("Delivering modern container and VM management with Rancher and Harvester"), correct: false },
      { text: _("Securing cloud-native workloads with NeuVector"), correct: false },
      { text: _("All of the above"), correct: true },
    ],
  },
  {
    text: _("What does the acronym SUSE stand for?"),
    answers: [
      { text: _("Software- und System-Entwicklung (Software and Systems Development)"), correct: true },
      { text: _("Super User Space Explorer"), correct: false },
      { text: _("Silly Unix Shell Enthusiasts"), correct: false },
      { text: _("System Upgrade & Security Engine"), correct: false },
    ],
  },
  {
    text: _("How many employees does SUSE have worldwide?"),
    answers: [
      { text: _("Around 500"), correct: false },
      { text: _("Around 1,200"), correct: false },
      { text: _("Around 2,500"), correct: true },
      { text: _("Around 10,000"), correct: false },
    ],
  },
  {
    text: _("SUSECON 2026 is coming in April! Which city will host the largest SUSE conference?"),
    answers: [
      { text: _("Prague"), correct: true },
      { text: _("Cupertino"), correct: false },
      { text: _("Redmont"), correct: false },
      { text: _("Raleigh"), correct: false },
    ],
  },
  {
    text: _("Which of the following is true about the SUSE Logo?"),
    answers: [
      { text: _("Hubert Mantel, one of the founders, asked a friend to design the logo, and everyone except him actually liked it."), correct: false },
      { text: _("We got much better in drawing chameleons. The current logo is the 6th generation since the first one in 1996"), correct: false },
      { text: _("The SUSE logo represents flexibility and adaptability, just like the chameleon"), correct: false },
      { text: _("All of the above"), correct: true },
    ],
  },
  {
    text: _("When was the first version of SUSE Linux released?"),
    answers: [
      { text: _("1989"), correct: false },
      { text: _("1991"), correct: false },
      { text: _("1994"), correct: true },
      { text: _("2014"), correct: false },
    ],
  },
  {
    text: _("What is Rancher primarily used for?"),
    answers: [
      { text: _("Managing and scaling Kubernetes clusters"), correct: true },
      { text: _("Herding virtual cows in the cloud"), correct: false },
      { text: _("Automating SUSE Linux installations only"), correct: false },
      { text: _("Playing old-school ranch simulation games"), correct: false },
    ],
  },
  {
    text: _("What does NeuVector focus on?"),
    answers: [
      { text: _("Cloud-native container security"), correct: true },
      { text: _("Making networking faster on Linux desktops"), correct: false },
      { text: _("Automating package builds"), correct: false },
      { text: _("Coloring the chameleon logo green"), correct: false },
    ],
  },
  {
    text: _("What is SUSE Harvester?"),
    answers: [
      { text: _("A virtualization platform that lets you easily create, migrate, back up, and restore VMs on bare metal servers"), correct: false },
      { text: _("A system built on Kubernetes that uses KubeVirt for virtualization, Longhorn for storage, and supports running containers alongside VMs"), correct: false },
      { text: _("A solution that integrates with Rancher, combining container and VM management with networking and observability"), correct: false },
      { text: _("All of the above"), correct: true },
    ],
  },
  {
    text: _("What is openSUSE?"),
    answers: [
      { text: _("A community project sponsored by SUSE"), correct: false },
      { text: _("More than just one community Linux distribution"), correct: false },
      { text: _("An amazing place to develop projects with tools like openQA, Open Build Service, and a welcoming community"), correct: false },
      { text: _("All of the above"), correct: true },
    ],
  },
  {
    text: _("SUSE is a top 6 Linux kernel contributor (LF 2017). About what percent of contributions does SUSE make?"),
    answers: [
      { text: _("Less than 1%"), correct: false },
      { text: _("Around 3%"), correct: true },
      { text: _("About 5%"), correct: false },
      { text: _("More than 20%"), correct: false },
    ],
  },
  {
    text: _("What are SUSE BCI (Base Container Images) known for?"),
    answers: [
      { text: _("Being bloated with unnecessary packages"), correct: false },
      { text: _("Only working on SUSE Linux Enterprise Server"), correct: false },
      { text: _("For offering truly open, flexible, and secure images based on SUSE Linux Enterprise"), correct: true },
      { text: _("Standing for 'Big Chameleon Initiative'"), correct: false },
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
