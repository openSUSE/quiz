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

const themeConfig = require("./config/theme.json");
const theme = themeConfig[consts.THEME];

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

  // Filename whitelist
  const allowedQuizSlugs = fs
    .readdirSync(consts.DATA_DIR_PATH)
    .filter((file) => file.endsWith(".js"))
    .map((file) => path.basename(file, ".js"));

  // Helper to validate quizSlug
  function isValidQuizSlug(slug) {
    return allowedQuizSlugs.includes(slug);
  }

  router.get("/", async (req, res) => {
    const lang = req.query.lang || "en";
    await loadTranslations(lang);

    res.render("index", {
      // filter by passed ENABLED_QUIZZES variable
      // format [{ title: 'Immutability', slug: 'immutability' }, ...
      quizzes: consts.ENABLED_QUIZZES.length
        ? quizzes.filter((q) => consts.ENABLED_QUIZZES.includes(q.slug))
        : quizzes,
      lang,
      availableLanguages,
      THEME_IMAGE: theme.IMAGE,
      THEME_TITLE: theme.TITLE,
      THEME_COLOR: theme.PRIMARY_COLOR,
      t: (text) => gt.gettext(text),
    });
  });

  router.get("/quiz", async (req, res) => {
    const name = req.query.name || "Anonymous";
    const lang = req.query.lang || "en";
    const quizSlug = req.query.name;

    if (!isValidQuizSlug(quizSlug)) {
      return res.status(404).send("Quiz not found");
    }

    await loadTranslations(lang);
    gt.setLocale(lang);
    const _ = gt.gettext.bind(gt);

    const quizPath = path.join(consts.DATA_DIR_PATH, `${quizSlug}.js`);
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
      usernamePolicy: consts.USERNAME_POLICY,
      quizData: JSON.stringify(localized.quizData),
      questions: JSON.stringify(localized.questions),
      uiStrings: uiStrings,
      quizTitle: localized.quizData.title,
      quizSlug: quizSlug,
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
      THEME_IMAGE: theme.IMAGE,
      THEME_TITLE: theme.TITLE,
      THEME_COLOR: theme.PRIMARY_COLOR,
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
    const quizSlug = req.body.quizSlug;
    let correct = Number(req.body.correct) || 0;
    let total = Number(req.body.total) || 0;

    if (!username || !quizTitle) {
      return res.status(400).send("Missing username or quiz title.");
    }

    // Profanity check
    if (filter.isProfane(username)) {
      return res.status(400).send("Inappropriate username detected.");
    }

    // Validate quizSlug against allowed list
    if (!isValidQuizSlug(quizSlug)) {
      return res.status(400).send("Invalid quiz slug.");
    }

    const quizPath = path.join(consts.DATA_DIR_PATH, `${quizSlug}.js`);
    const { questions } = require(quizPath);
    const actualTotal = questions.length;

    // Clamp totals
    total = Math.min(total, actualTotal);
    correct = Math.min(correct, total);

    // Initialize user results if needed
    if (!results[username]) {
      results[username] = {
        quizzes: {},
        aggregate: { correct: 0, wrong: 0, score: 0 },
      };
    }

    results[username].quizzes[quizTitle] = { correct, total };

    // Recalculate aggregate results for user
    let aggregateCorrect = 0;
    let aggregateTotal = 0;
    for (const quizData of Object.values(results[username].quizzes)) {
      aggregateCorrect += quizData.correct;
      aggregateTotal += quizData.total;
    }

    const aggregateWrong = aggregateTotal - aggregateCorrect;
    let aggregateScore =
      aggregateCorrect * 1 + aggregateTotal * 0.05 - aggregateWrong * 0.1;
    aggregateScore = Math.max(aggregateScore, 0);

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
