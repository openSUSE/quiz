const express = require("express");

module.exports = (dependencies) => {
  const router = express.Router();
  const { loadTranslations, quizzes, gt, results, RESET_TOKEN, clearResults } =
    dependencies;

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
    const lang = req.query.lang || "en";
    const name = req.query.name;
    await loadTranslations(lang);
    res.render("quiz", {
      lang: lang,
      query: name,
      t: (text) => gt.gettext(text),
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
    res.redirect("/stats");
  });

  router.post("/submit", (req, res) => {
    results[req.body.username] = {
      correct: req.body.correct,
      total: req.body.total,
    };
    res.redirect("/stats");
  });

  return router;
};
