// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("Bezpieczeństwie w ruchu drogowym"),
  subtitle: _(
    "Manewry Mundurowe \"PĘTLA TAKTYCZNA\" 2025",
  ),
  submitAnytime: false,
  randomizeQuestions: true,
  randomizeAnswers: true,
  difficulty: 0,
};

const questions = [
  {
    text: _("Pojazd samochodowy to pojazd silnikowy, którego konstrukcja umożliwia jazdę z prędkością przekraczającą"),
    answers: [
      { text: _("45 km/h"), correct: false },
      { text: _("40 km/h"), correct: false },
      { text: _("25 km/h"), correct: true },
      { text: _("30 km/h"), correct: false },
    ],
  },
  {
    text: _("Pieszy poruszający się po drodze po zmierzchu poza obszarem zabudowanym, nie jest obowiązany używać elementów odblaskowych w sposób widoczny dla innych uczestników ruchu, gdy"),
    answers: [
      { text: _("porusza się po poboczu"), correct: false },
      { text: _("porusza się przyspieszonym krokiem po lewej stronie jezdni"), correct: false },
      { text: _("porusza się po drodze przeznaczonej wyłącznie dla pieszych, lub po chodniku"), correct: true },
      { text: _("porusza się w dobrych warunkach atmosferycznych"), correct: false },
    ],
  },
  {
    text: _("Pieszy idący po poboczu lub jezdni jest obowiązny iść:"),
    answers: [
      { text: _("prawą stroną drogi"), correct: false },
      { text: _("po nowelizacji przepisów, nie ma to już znaczenia"), correct: false },
      { text: _("lewą stroną drogi"), correct: true },
      { text: _("środkiem pobocza"), correct: false },
    ],
  },
  {
    text: _("Wymagany minimalny wiek do kierowania pojazdami określonymi w prawie jazdy kategorii AM wynosi"),
    answers: [
      { text: _("12 lat"), correct: false },
      { text: _("10 lat"), correct: false },
      { text: _("14 lat"), correct: true },
      { text: _("16 lat"), correct: false },
    ],
  },
  {
    text: _("Przechodzenie przez jezdnię poza przejściem dla pieszych jest dozwolone, gdy odległość od przejścia przekracza"),
    answers: [
      { text: _("50m"), correct: false },
      { text: _("150m"), correct: false },
      { text: _("100m"), correct: true },
      { text: _("75m"), correct: false },
    ],
  },
  {
    text: _("Kierujący motorowerem, który przewozi dziecko w wieku 5 lat, może jechać z prędkością:"),
    answers: [
      { text: _("nie można przewozić tak małych dzieci motorowerem"), correct: false },
      { text: _("zgodnie ze znakami"), correct: false },
      { text: _("40 km/h"), correct: true },
      { text: _("90 km/h"), correct: false },
    ],
  },
  {
    text: _("Kierujący rowerem, korzystając z drogi dla rowerów i pieszych, jest obowiązany"),
    answers: [
      { text: _("używać dzwonka lub innych sygnałów dźwiękowych nadjeżdżając do pieszych"), correct: false },
      { text: _("jechać lewą stroną"), correct: false },
      { text: _("ustępować miejsca pieszym"), correct: true },
      { text: _("jechać z prędkością nie większą niż 20 km/h"), correct: false },
    ],
  },
  {
    text: _("Podczas wyprzedzania roweru, kierujący pojazdem jest obowiązany zachować odstęp nie mniejszy niż"),
    answers: [
      { text: _("1,5 metra"), correct: false },
      { text: _("2 metry"), correct: false },
      { text: _("1 metr"), correct: true },
      { text: _("3 metry"), correct: false },
    ],
  },
  {
    text: _("Który z obowiązków dotyczy właściciela samochodu osobowego?"),
    answers: [
      { text: _("Zawarcie umowy ubezpieczenia NW"), correct: false },
      { text: _("Zawarcie umowy ubezpieczenia Autocasco"), correct: false },
      { text: _("Poddawanie pojazdu okresowym badaniom technicznym"), correct: true },
      { text: _("Posiadanie kamerki samochodowej"), correct: false },
    ],
  },
  {
    text: _("W jaki sposób wolno Ci przewozić ładunek w przyczepie ciągniętej przez samochód osobowy?"),
    answers: [
      { text: _("Ładunek może zasłaniać niektóre światła przyczepy"), correct: false },
      { text: _("Ładunek nie musi być zabezpieczony przed zmianą położenia"), correct: false },
      { text: _("Ładunek nie może naruszać stateczności pojazdu"), correct: true },
      { text: _("Ładunek może przekraczać wymiary przyczepy o 20%"), correct: false },
    ],
  },
  {
    text: _("Jak umieścisz bagaż w samochodzie osobowym?"),
    answers: [
      { text: _("W dowolny sposób"), correct: false },
      { text: _("Najcięższe bagaże włożę w górnej części bagażnika, nad lżejszymi"), correct: false },
      { text: _("Najcięższe bagaże włożę najgłębiej i najniżej, w centralnej części bagażnika"), correct: true },
      { text: _("Rozłożę bagaże równomiernie na tylnej kanapie"), correct: false },
    ],
  },
  {
    text: _("Który z wymienionych sposobów przewożenia gaśnicy w samochodzie osobowym jest właściwy?"),
    answers: [
      { text: _("Gaśnica umieszczona w bagażniku"), correct: false },
      { text: _("Gaśnica umieszczona jest luźno między siedzeniami"), correct: false },
      { text: _("Gaśnica zamocowana pod fotelem pasażera"), correct: true },
      { text: _("Gaśnica umieszczona w schowku przy kierownicy"), correct: false },
    ],
  },
  {
    text: _("Jak zabezpieczysz krwawienie z rany przy braku jałowego opatrunku?"),
    answers: [
      { text: _("Wstrzymam się z opatrywaniem"), correct: false },
      { text: _("Uciskanie rany ciężarem własnego ciała"), correct: false },
      { text: _("Użyję do opatrunku odzieży poszkodowanego"), correct: true },
      { text: _("Najpierw przemyję ranę wodą"), correct: false },
    ],
  },
  {
    text: _("Kiedy należy założyć opatrunek uciskowy?"),
    answers: [
      { text: _("W przypadku zmiażdżenia kończyny"), correct: false },
      { text: _("W przypadku wycieku krwistej wydzieliny z ucha"), correct: false },
      { text: _("W przypadku krwotoku"), correct: true },
      { text: _("W przypadku złamania otwartego"), correct: false },
    ],
  },
  {
    text: _("Jak długo należy ręcznie stabilizować głowę poszkodowanego z podejrzeniem urazu kręgosłupa szyjnego?"),
    answers: [
      { text: _("Do czasu stwierdzenia ruchomości jego nóg"), correct: false },
      { text: _("Do czasu odzyskania przytomności przez poszkodowanego"), correct: false },
      { text: _("Do przejęcia stabilizacji przez członka zespołu ratownictwa medycznego"), correct: true },
      { text: _("Maksymalnie 15 minut"), correct: false },
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
