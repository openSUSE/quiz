const express = require("express");
const path = require("path");
const consts = require("./consts");
const { localizeQuizData, getUiStrings } = require("./i18nHelpers");
const fs = require("fs");

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

    res.render("quiz", {
      nickname: name,
      lang,
      quizData: JSON.stringify(localized.quizData),
      questions: JSON.stringify(localized.questions),
      uiStrings: uiStrings,
    });
  });

  router.get("/stats", async (req, res) => {
    const lang = req.query.lang || "en";
    await loadTranslations(lang);
    res.render("stats", {
      results,
      lang,
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

  router.post("/submit", (req, res) => {
    const lang = req.body.lang || "en";
    results[req.body.username] = {
      correct: req.body.correct,
      total: req.body.total,
    };
    saveResultsToFile(); // Save results after submit
    res.redirect(`/stats?lang=${lang}`);
  });

  return router;
};
