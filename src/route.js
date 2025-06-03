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
      availableLanguages,
      quizData: JSON.stringify(localized.quizData),
      questions: JSON.stringify(localized.questions),
      uiStrings: uiStrings,
      quizTitle: localized.quizData.title,
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

  router.post("/submit", (req, res) => {
    const lang = req.body.lang || "en";
    const username = req.body.username;
    const quizTitle = req.body.quizTitle;
    const correct = req.body.correct;
    const total = req.body.total;

    console.log(username);
    console.log(quizTitle);

    if (!username || !quizTitle) {
      return res.status(400).send("Missing username or quiz title.");
    }

    // Ensure user exists in results
    if (!results[username]) {
      results[username] = {};
    }

    // Save or update results for this quiz
    results[username][quizTitle] = {
      correct,
      total,
    };

    saveResultsToFile();

    res.redirect(`/stats?lang=${lang}`);
  });
  return router;
};
