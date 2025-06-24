const express = require("express");
const path = require("path");
const fs = require("fs");
const consts = require("./consts");
const PO_DIR = path.join(consts.DATA_DIR_BASEPATH, "..", "po");
const {
  localizeQuizData,
  getUiStrings,
  getAvailableLanguages,
} = require("./i18nHelpers");
const availableLanguages = getAvailableLanguages(PO_DIR);

module.exports = (dependencies) => {
  const router = express.Router();
  const {
    loadTranslations,
    quizzes,
    gt,
    results,
    RESET_TOKEN,
    clearResults,
    saveResultsToFile,
  } = dependencies;

  router.get("/", async (req, res) => {
    const lang = req.query.lang || "en";
    await loadTranslations(lang);
    res.render("index", {
      quizzes,
      lang,
      availableLanguages,
      event: consts.EVENT,
      t: (text) => gt.gettext(text),
    });
  });

  router.get("/quiz", async (req, res) => {
    const name = req.query.name || "Anonymous";
    const lang = req.query.lang || "en";
    const quizSlug = req.query.name;

    await loadTranslations(lang);
    gt.setLocale(lang);
    const _ = gt.gettext.bind(gt);

    const quizPath = path.join(consts.DATA_DIR_PATH, `${quizSlug}.js`);
    if (!fs.existsSync(quizPath)) {
      return res.status(404).send("Quiz not found");
    }

    const { quizData, questions } = require(quizPath);
    const localized = localizeQuizData({ quizData, questions }, _);
    const uiStrings = getUiStrings(_, name);
    const existingLoginsLower = Object.keys(results || {}).map((k) =>
      k.toLowerCase()
    );

    res.render("quiz", {
      nickname: name,
      lang,
      availableLanguages,
      event: consts.EVENT,
      usernamePolicy: consts.USERNAME_POLICY,
      quizData: JSON.stringify(localized.quizData),
      questions: JSON.stringify(localized.questions),
      uiStrings: uiStrings,
      quizTitle: localized.quizData.title,
      existingLogins: JSON.stringify(existingLoginsLower),
    });
  });

  router.get("/stats", async (req, res) => {
    const lang = req.query.lang || "en";
    await loadTranslations(lang);
    res.render("stats", {
      results,
      lang,
      availableLanguages,
      t: (text) => gt.gettext(text),
    });
  });
  router.get("/bingo", (req, res) => res.render("bingo", { results }));

  router.get("/reset", (req, res) => {
    if (req.query.token !== RESET_TOKEN) {
      return res.status(403).send("Forbidden: Invalid reset token");
    }
    clearResults(); // Call the callback to reset results
    const lang = req.query.lang || "en";
    res.redirect(`/stats?lang=${lang}`);
  });

  const Filter = require("bad-words");
  const filter = new Filter();

  router.post("/submit", (req, res) => {
    const lang = req.body.lang || "en";
    const username = req.body.username;
    const quizTitle = req.body.quizTitle;
    const correct = Number(req.body.correct) || 0;
    const total = Number(req.body.total) || 0;

    if (!username || !quizTitle) {
      return res.status(400).send("Missing username or quiz title.");
    }

    // Profanity check on username
    if (filter.isProfane(username)) {
      return res
        .status(400)
        .send(
          "Inappropriate username detected. Please choose a different username."
        );
    }

    if (!results[username]) {
      results[username] = {
        quizzes: {},
        aggregate: { correct: 0, wrong: 0, score: 0 },
      };
    }

    // Save or update the quiz result
    results[username].quizzes[quizTitle] = { correct, total };

    // Aggregate totals
    let aggregateCorrect = 0;
    let aggregateTotal = 0;

    for (const quizData of Object.values(results[username].quizzes)) {
      aggregateCorrect += quizData.correct;
      aggregateTotal += quizData.total;
    }

    const aggregateWrong = aggregateTotal - aggregateCorrect;

    // Calculate aggregate score
    let aggregateScore =
      aggregateCorrect * 1 + aggregateTotal * 0.05 - aggregateWrong * 0.1;
    aggregateScore = Math.max(aggregateScore, 0);

    // Store aggregate results
    results[username].aggregate = {
      correct: aggregateCorrect,
      wrong: aggregateWrong,
      score: aggregateScore,
    };

    saveResultsToFile();

    res.redirect(`/stats?lang=${lang}`);
  });
  return router;
};
