// Marks strings for xgettext extraction without affecting runtime.
// Useful for translation: _("translatable string") vs. plain strings.
function _(str) {
  return str;
}

const quizData = {
  title: _("9. Pułk Strzelców Konnych im. Gen. K. Pułaskiego"),
  subtitle: _(
    "Manewry Mundurowe \"PĘTLA TAKTYCZNA\" 2025",
  ),
  submitAnytime: false,
  randomizeQuestions: true,
  randomizeAnswers: true,
  difficulty: 0,
  maxQuestions: 20,
};

const questions = [
  {
    text: _("Który z poniższych oficerów, należących do 9PSK, jest ofiarą zbrodni katyńskiej?"),
    answers: [
      { text: _("Wiktor Konopka"), correct: false },
      { text: _("Epifaniusz Drowniak"), correct: false },
      { text: _("Bogumił Nowicki"), correct: true },
      { text: _("Grzegorz Gardocki"), correct: false },
    ],
  },
  {
    text: _("Kto jest patronem 9. Pułku Strzelców Konnych?"),
    answers: [
      { text: _("Witold Ginel"), correct: false },
      { text: _("Kazimierz Pułaski"), correct: true },
      { text: _("Władysław Anders"), correct: false },
      { text: _("Tadeusz Kościuszko"), correct: false },
    ],
  },
  {
    text: _("Kiedy obchodzimy święto 9. Pułku Strzelców Konnych?"),
    answers: [
      { text: _("29 czerwca"), correct: true },
      { text: _("15 października"), correct: false },
      { text: _("11 listopada"), correct: false },
      { text: _("Nie ma takiego święta"), correct: false },
    ],
  },
  {
    text: _("Kiedy został sformowany 9. Pułk Strzelców Konnych?"),
    answers: [
      { text: _("15.10.1920 r."), correct: false },
      { text: _("10.10.1921 r."), correct: true },
      { text: _("29.06.1921 r."), correct: false },
      { text: _("25.09.1921 r."), correct: false },
    ],
  },
  {
    text: _("Czy na dzień dzisiejszy istnieją jakieś miejsca upamiętniające 9. Pułk Strzelców Konnych? W jakich miastach się znajdują? "),
    answers: [
      { text: _("Tak, w Giżycku"), correct: false },
      { text: _("Tak, w Grajewie"), correct: true },
      { text: _("Tak, w Grajewie i Giżycku"), correct: false },
      { text: _("Tak, w Białymstoku"), correct: false },
    ],
  },
  {
    text: _("W którym roku 9PSK zmienił funkcję z kawalerii dywizyjnej na samodzielną?"),
    answers: [
      { text: _("1924 r."), correct: true },
      { text: _("1919 r."), correct: false },
      { text: _("1920 r."), correct: false },
      { text: _("1925 r."), correct: false },
    ],
  },
  {
    text: _("Jakie napisy nosili żołnierze pułku na naremiennikach kurtek i płaszczy w 1939 roku?"),
    answers: [
      { text: _("9"), correct: false },
      { text: _("Honor i Ojczyzna"), correct: false },
      { text: _("K.P."), correct: true },
      { text: _("PSK"), correct: false },
    ],
  },
  {
    text: _("Jakim rodzajem sił zbrojnych był 9PSK?"),
    answers: [
      { text: _("Wojska Specjalne"), correct: false },
      { text: _("Wojsko przeznaczenia ogólnego"), correct: false },
      { text: _("Wojska Lądowe"), correct: true },
      { text: _("Marynarka Wojenna"), correct: false },
    ],
  },
  {
    text: _("Kiedy 9PSK został rozformowany?"),
    answers: [
      { text: _("1939 r."), correct: true },
      { text: _("1941 r."), correct: false },
      { text: _("1936 r."), correct: false },
      { text: _("1940 r."), correct: false },
    ],
  },
  {
    text: _("Jaki rodzaj wojsk reprezentowało 9PSK?"),
    answers: [
      { text: _("Strzelcy konni"), correct: false },
      { text: _("Kawaleria konna"), correct: true },
      { text: _("Jazda konna"), correct: false },
      { text: _("Artyleria konna"), correct: false },
    ],
  },
  {
    text: _("Jednym z żołnierzy 9PSK odznaczonych Krzyżem Srebrnym Orderu Wojennego Virtuti Militari był:"),
    answers: [
      { text: _("Jerzy Gliński"), correct: true },
      { text: _("Tadeusz Falewicz"), correct: false },
      { text: _("Józef Trenkwald"), correct: false },
      { text: _("Kazimierz Pułaski"), correct: false },
    ],
  },
  {
    text: _("Kiedy 9. Pułk Strzelców Konnych otrzymał imię patrona?"),
    answers: [
      { text: _("14.05.1936 r."), correct: true },
      { text: _("5.12.1921 r."), correct: false },
      { text: _("29.06.1924 r."), correct: false },
      { text: _("15.09.1937 r."), correct: false },
    ],
  },
  {
    text: _("Generał dywizji Wojska Polskiego, wiceminister spraw wojskowych I szef administracji Armii, kawaler orderu Virtuti Militari"),
    answers: [
      { text: _("Daniel Konarzewski"), correct: true },
      { text: _("Stanisław Wojciechowski"), correct: false },
      { text: _("Zygmunt Tucewicz"), correct: false },
      { text: _("Franciszek Kaczkowski"), correct: false },
    ],
  },
  {
    text: _("Rotmistrz Wojska Polskiego, dowodził 9PSK AK na terenach powiatu grajewskiego, poległ na Czerwonym Bagnie 8/9 września 1944 roku, pochowany w Szczuczynie"),
    answers: [
      { text: _("Wiktor Konopka"), correct: true },
      { text: _("Witold Ginel"), correct: false },
      { text: _("Władysław Traugutt-Tejchman"), correct: false },
      { text: _("Tadeusz Grabowski"), correct: false },
    ],
  },
  {
    text: _("Pułkownik dyplomowany kawalerii Wojska Polskiego, jeden z dowódców 9PSK, wspierał grajewskiego strzelca w 2RP, ofiara zbrodni katyńskiej"),
    answers: [
      { text: _("Tadeusz Grabowski"), correct: true },
      { text: _("Lucjan Żeligowski"), correct: false },
      { text: _("Franciszek Kaczkowski"), correct: false },
      { text: _("Daniel Konarzewski"), correct: false },
    ],
  },
  {
    text: _("Jaka Jednostka Wojskowa kultywuje tradycje 9. Pułku Strzelców Konnych?"),
    answers: [
      { text: _("15. Giżycka Brygada Zmechanizowana"), correct: true },
      { text: _("15. Mazurski Batalion Saperów"), correct: false },
      { text: _("25. Brygada Kawalerii Powietrznej"), correct: false },
      { text: _("1 Dywizja Piechoty Legionów"), correct: false },
    ],
  },
  {
    text: _("Jakie są barwy 9PSK?"),
    answers: [
      { text: _("Zielone, żółte, amarantowe"), correct: true },
      { text: _("Białe, żółte, purpurowe"), correct: false },
      { text: _("Oliwkowe, żółte, czerwone"), correct: false },
      { text: _("Czerwone, białe, niebieskie"), correct: false },
    ],
  },
  {
    text: _("Który z dowódców 9PSK walczył w szeregach Legionów Polskich?"),
    answers: [
      { text: _("Tadeusz Grabowski"), correct: true },
      { text: _("Wiktor Konopka"), correct: false },
      { text: _("Witold Ginel"), correct: false },
      { text: _("Franciszek Kaczkowski"), correct: false },
    ],
  },
  {
    text: _("W niektórych rodzajach wojsk używano innych nazw dla stopni wojskowych. Jakim stopniem wojskowym oznaczano szeregowego w 9PSK?"),
    answers: [
      { text: _("Strzelec Konny"), correct: true },
      { text: _("Szeregowy"), correct: false },
      { text: _("Ułan"), correct: false },
      { text: _("Kanonier"), correct: false },
    ],
  },
  {
    text: _("Który z poniższych oficerów był ostatnim dowódcą 9. Pułku Strzelców Konnych?"),
    answers: [
      { text: _("Płk Tadeusz Falewicz"), correct: true },
      { text: _("Rtm. Wiktor Konopka"), correct: false },
      { text: _("Gen. Bryg. Bohdan Sawicki"), correct: false },
      { text: _("Płk Franciszek Kaczkowski"), correct: false },
    ],
  },
  {
    text: _("W którym mieście został pierwotnie sformowany 9. Pułk Strzelców Konnych?"),
    answers: [
      { text: _("Hrubieszów"), correct: true },
      { text: _("Grajewo"), correct: false },
      { text: _("Włodawa"), correct: false },
      { text: _("Białystok"), correct: false },
    ],
  },
  {
    text: _("Kto był pierwszym dowódcą 9. Pułku Strzelców Konnych?"),
    answers: [
      { text: _("Płk Franciszek Kaczkowski"), correct: true },
      { text: _("Płk Tadeusz Falewicz"), correct: false },
      { text: _("Rtm. Wiktor Konopka"), correct: false },
      { text: _("Gen. Kazimierz Pułaski"), correct: false },
    ],
  },
  {
    text: _("W skład jakiej brygady wszedł 9PSK po reorganizacji w 1924 roku?"),
    answers: [
      { text: _("IX Brygada Kawalerii"), correct: true },
      { text: _("XI Brygada Kawalerii"), correct: false },
      { text: _("Podlaska Brygada Kawalerii"), correct: false },
      { text: _("XV Brygada Kawalerii"), correct: false },
    ],
  },
  {
    text: _("W której bitwie zakończył swój szlak bojowy 9PSK w 1939 roku?"),
    answers: [
      { text: _("Bitwa pod Kockiem"), correct: true },
      { text: _("Bitwa nad Bzurą"), correct: false },
      { text: _("Bitwa pod Komarowem"), correct: false },
      { text: _("Bitwa pod Mokrą"), correct: false },
    ],
  },
  {
    text: _("W którym garnizonie stacjonował 9PSK od listopada 1921 do maja 1924?"),
    answers: [
      { text: _("Włodawa"), correct: true },
      { text: _("Grajewo"), correct: false },
      { text: _("Hrubieszów"), correct: false },
      { text: _("Osowiec"), correct: false },
    ],
  },
  {
    text: _("Ile szwadronów wchodziło w skład 9PSK w pełnej organizacji?"),
    answers: [
      { text: _("Cztery szwadrony strzelców + szwadron ckm + szwadron zapasowy"), correct: true },
      { text: _("Trzy szwadrony strzelców"), correct: false },
      { text: _("Pięć szwadronów strzelców"), correct: false },
      { text: _("Dwa szwadrony strzelców"), correct: false },
    ],
  },
  {
    text: _("Która szkoła w Grajewie nosi imię 9. Pułku Strzelców Konnych?"),
    answers: [
      { text: _("Zespół Szkół nr 2"), correct: true },
      { text: _("Liceum Ogólnokształcące nr 1"), correct: false },
      { text: _("Zespół Szkół nr 1"), correct: false },
      { text: _("Gimnazjum nr 3"), correct: false },
    ],
  },
  {
    text: _("W którym roku IX Brygada Kawalerii została przemianowana na Podlaską Brygadę Kawalerii?"),
    answers: [
      { text: _("1937"), correct: true },
      { text: _("1936"), correct: false },
      { text: _("1938"), correct: false },
      { text: _("1935"), correct: false },
    ],
  },
  {
    text: _("Pod jakim DOK znajdował się 9PSK w latach 1921-1924?"),
    answers: [
      { text: _("DOK IX (Brześć)"), correct: true },
      { text: _("DOK II (Lublin)"), correct: false },
      { text: _("DOK III (Grodno)"), correct: false },
      { text: _("DOK I (Warszawa)"), correct: false },
    ],
  },
  {
    text: _("Co stanowiło trzon 1. szwadronu 9PSK przy jego formowaniu?"),
    answers: [
      { text: _("IV Dywizjon 1 psk"), correct: true },
      { text: _("I Dywizjon 2 psk"), correct: false },
      { text: _("3 siedlecki pułk jazdy ochotniczej"), correct: false },
      { text: _("10 pułk ułanów litewskich"), correct: false },
    ],
  }
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

// Limit questions if maxQuestions is set
if (quizData.maxQuestions && quizData.maxQuestions < questions.length) {
  questions.splice(quizData.maxQuestions);
}

module.exports = { quizData, questions };
