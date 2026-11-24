const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const QRCode = require("qrcode");
const consts = require("./consts");
const { publicAttempt } = require("./attemptStore");
const PO_DIR = path.join(consts.DATA_DIR_BASEPATH, "..", "po");
const {
  localizeQuizData,
  getUiStrings,
  getAvailableLanguages,
} = require("./i18nHelpers");
const availableLanguages = getAvailableLanguages(PO_DIR);

const themeConfig = require("./config/theme.json");
const theme = themeConfig[consts.THEME];

const qrBufferCache = new Map();
const QR_CACHE_TTL_MS = 10 * 60 * 1000;
const QR_CACHE_MAX_ITEMS = 64;

function cleanupQrCache() {
  const now = Date.now();
  for (const [key, entry] of qrBufferCache.entries()) {
    if (now - entry.createdAt > QR_CACHE_TTL_MS) {
      qrBufferCache.delete(key);
    }
  }

  while (qrBufferCache.size > QR_CACHE_MAX_ITEMS) {
    const firstKey = qrBufferCache.keys().next().value;
    qrBufferCache.delete(firstKey);
  }
}

async function getCachedQrBuffer(url, size) {
  cleanupQrCache();
  const cacheKey = crypto
    .createHash("sha256")
    .update(`${size}:${url}`)
    .digest("hex");
  const cached = qrBufferCache.get(cacheKey);

  if (cached) {
    return cached.buffer;
  }

  const buffer = await QRCode.toBuffer(url, {
    type: "png",
    width: size,
    margin: 2,
    errorCorrectionLevel: "M",
  });

  qrBufferCache.set(cacheKey, {
    buffer,
    createdAt: Date.now(),
  });

  return buffer;
}

module.exports = (dependencies) => {
  const router = express.Router();
  const {
    loadTranslations,
    quizzes,
    gt,
    results,
    attemptStore,
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
      encodeURIComponent(k.toLowerCase())
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

  router.get("/qr", async (req, res) => {
    const rawUrl = String(req.query.url || "").trim();
    const requestedSize = Number(req.query.size);
    const size =
      Number.isFinite(requestedSize) &&
      requestedSize >= 128 &&
      requestedSize <= 2048
        ? Math.floor(requestedSize)
        : 700;

    if (!rawUrl || !/^https?:\/\//i.test(rawUrl)) {
      return res.status(400).send("Invalid URL");
    }

    try {
      const qrPng = await getCachedQrBuffer(rawUrl, size);
      res.set("Content-Type", "image/png");
      res.set("Cache-Control", "public, max-age=300");
      return res.send(qrPng);
    } catch (error) {
      return res.status(500).send("Failed to generate QR code");
    }
  });

  router.get("/stats", async (req, res) => {
    const lang = req.query.lang || "en";
    await loadTranslations(lang);
    const { getWinnerCallTime } = dependencies;
    res.render("stats", {
      results,
      lang,
      INSTANCE: consts.INSTANCE,
      availableLanguages,
      THEME_IMAGE: theme.IMAGE,
      THEME_TITLE: theme.TITLE,
      THEME_COLOR: theme.PRIMARY_COLOR,
      winnerCallTime: getWinnerCallTime(),
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

  function getQuiz(quizSlug) {
    if (!isValidQuizSlug(quizSlug)) return null;
    return require(path.join(consts.DATA_DIR_PATH, `${quizSlug}.js`));
  }

  function validParticipant(username) {
    return (
      typeof username === "string" &&
      username.trim().length >= 4 &&
      username.trim().length <= 50 &&
      !filter.isProfane(username.trim())
    );
  }

  function persistAttempt(res, attempt) {
    try {
      saveResultsToFile();
      return res.json({ attempt: publicAttempt(attempt) });
    } catch (error) {
      return res.status(503).json({ error: "Unable to save quiz progress." });
    }
  }

  router.post("/api/attempt/start", (req, res) => {
    const username = String(req.body.username || "").trim();
    const quizSlug = req.body.quizSlug;
    const quiz = getQuiz(quizSlug);
    if (!validParticipant(username)) {
      return res.status(400).json({ error: "Invalid participant name." });
    }
    if (!quiz) return res.status(400).json({ error: "Invalid quiz." });

    const existing = attemptStore.get(username, quizSlug);
    if (existing && existing.id !== req.body.attemptId) {
      return res
        .status(409)
        .json({ error: "This quiz already has an active attempt." });
    }

    const attempt = attemptStore.start({
      username,
      quizSlug,
      questionCount: quiz.questions.length,
    });
    return persistAttempt(res, attempt);
  });

  router.post("/api/attempt/question", (req, res) => {
    const username = String(req.body.username || "").trim();
    const quizSlug = req.body.quizSlug;
    const attempt = attemptStore.get(username, quizSlug);
    if (
      !attempt ||
      attempt.username !== username ||
      attempt.id !== req.body.attemptId
    ) {
      return res.status(404).json({ error: "Quiz attempt not found." });
    }
    const result = attemptStore.startQuestion({
      username,
      quizSlug,
      questionIndex: Number(req.body.questionIndex),
    });
    if (result.error) {
      return res.status(409).json({ error: "Question is out of sequence." });
    }
    return persistAttempt(res, result.attempt);
  });

  router.post("/api/attempt/answer", (req, res) => {
    const username = String(req.body.username || "").trim();
    const quizSlug = req.body.quizSlug;
    const quiz = getQuiz(quizSlug);
    const attempt = attemptStore.get(username, quizSlug);
    if (
      !quiz ||
      !attempt ||
      attempt.username !== username ||
      attempt.id !== req.body.attemptId
    ) {
      return res.status(404).json({ error: "Quiz attempt not found." });
    }

    const questionIndex = Number(req.body.questionIndex);
    const answerIndex =
      req.body.answerIndex === null ? null : Number(req.body.answerIndex);
    if (
      !Number.isInteger(questionIndex) ||
      (answerIndex !== null &&
        (!Number.isInteger(answerIndex) ||
          answerIndex < 0 ||
          answerIndex >= quiz.questions[questionIndex]?.answers.length))
    ) {
      return res.status(400).json({ error: "Invalid answer." });
    }

    const question = quiz.questions[questionIndex];
    if (!question)
      return res.status(409).json({ error: "Quiz is already complete." });
    if (
      questionIndex === attempt.currentQuestion - 1 &&
      attempt.answers[questionIndex]?.answerIndex === answerIndex
    ) {
      return persistAttempt(res, attempt);
    }
    if (attempt.questionStartedAt === null) {
      return res.status(409).json({ error: "Question has not started." });
    }
    const elapsedMs = Math.max(0, Date.now() - attempt.questionStartedAt);
    const timeoutSeconds = Number(quiz.quizData.timeout);
    const timedOut =
      Number.isFinite(timeoutSeconds) &&
      timeoutSeconds > 0 &&
      elapsedMs >= timeoutSeconds * 1000;
    if (answerIndex === null && !timedOut) {
      return res.status(409).json({ error: "Question has not timed out." });
    }

    const isCorrect =
      !timedOut &&
      answerIndex !== null &&
      question.answers[answerIndex].correct === true;
    const textLength = String(question.text || "").replace(
      /<[^>]*>/g,
      ""
    ).length;
    const graceMs = Math.min(6000, 2000 + textLength * 35);
    const factor = Math.max(
      0.5,
      Math.min(1, 1 - (Math.max(0, elapsedMs - graceMs) / 15000) * 0.5)
    );
    const gained = isCorrect
      ? Math.round(consts.QUESTION_MAX_POINTS * factor)
      : 0;
    const result = attemptStore.answer({
      username,
      quizSlug,
      questionIndex,
      answerIndex,
      correct: isCorrect,
      points: gained,
    });
    if (result.error === "not_found") {
      return res.status(404).json({ error: "Quiz attempt not found." });
    }
    if (result.error)
      return res.status(409).json({ error: "Question is out of sequence." });
    return persistAttempt(res, result.attempt);
  });

  router.post("/api/attempt/agility/start", (req, res) => {
    const username = String(req.body.username || "").trim();
    const quizSlug = req.body.quizSlug;
    const quiz = getQuiz(quizSlug);
    const attempt = attemptStore.get(username, quizSlug);
    const checkpoint = Number(req.body.checkpoint);
    const validCheckpoint =
      quiz &&
      quiz.quizData.agility !== false &&
      consts.agilityCheckpoints(quiz.questions.length).includes(checkpoint) &&
      checkpoint === attempt?.currentQuestion;
    if (
      !attempt ||
      attempt.username !== username ||
      attempt.id !== req.body.attemptId ||
      !validCheckpoint
    ) {
      return res.status(409).json({ error: "Invalid agility round." });
    }
    const result = attemptStore.startAgilityRound({
      username,
      quizSlug,
      checkpoint,
    });
    return persistAttempt(res, result.attempt);
  });

  router.post("/api/attempt/agility", (req, res) => {
    const username = String(req.body.username || "").trim();
    const quizSlug = req.body.quizSlug;
    const quiz = getQuiz(quizSlug);
    const attempt = attemptStore.get(username, quizSlug);
    const checkpoint = Number(req.body.checkpoint);
    const pending = attempt?.agility[checkpoint];
    const validCheckpoint =
      quiz &&
      quiz.quizData.agility !== false &&
      consts.agilityCheckpoints(quiz.questions.length).includes(checkpoint) &&
      checkpoint === attempt?.currentQuestion &&
      pending?.startedAt &&
      !pending.finished;
    if (
      !attempt ||
      attempt.username !== username ||
      attempt.id !== req.body.attemptId ||
      !validCheckpoint
    ) {
      return res.status(409).json({ error: "Invalid agility result." });
    }
    const result = attemptStore.addAgilityPoints({
      username,
      quizSlug,
      checkpoint,
      points: req.body.points,
      maxPoints: consts.AGILITY_MAX_POINTS,
    });
    return persistAttempt(res, result.attempt);
  });

  router.post("/submit", (req, res) => {
    const lang = req.body.lang || "en";
    const username = String(req.body.username || "").trim();
    const quizTitle = req.body.quizTitle;
    const quizSlug = req.body.quizSlug;
    const attemptId = req.body.attemptId;

    if (!username || !quizTitle) {
      return res.status(400).send("Missing username or quiz title.");
    }
    if (!validParticipant(username)) {
      return res.status(400).send("Inappropriate username detected.");
    }

    const quiz = getQuiz(quizSlug);
    const attempt = attemptStore.get(username, quizSlug);
    if (!quiz) {
      return res.status(400).send("Invalid quiz slug.");
    }
    if (!attempt || attempt.username !== username || attempt.id !== attemptId) {
      const previous = results[username]?.quizzes?.[quizSlug];
      if (previous?.lastAttemptId === attemptId && attemptId) {
        return res.redirect(`/stats?lang=${encodeURIComponent(lang)}`);
      }
      return res.status(409).send("Quiz attempt is no longer active.");
    }
    const completed = results[username]?.quizzes?.[quizSlug];
    if (completed?.lastAttemptId === attemptId) {
      return res.redirect(`/stats?lang=${encodeURIComponent(lang)}`);
    }
    const total = attempt.currentQuestion;
    if (
      total === 0 ||
      (total < quiz.questions.length && !quiz.quizData.submitAnytime)
    ) {
      return res.status(409).send("Quiz attempt cannot be submitted yet.");
    }
    const { correct, points } = attempt;

    const previousUserResult = results[username]
      ? JSON.parse(JSON.stringify(results[username]))
      : null;
    // Initialize user results if needed
    if (!results[username]) {
      results[username] = {
        quizzes: {},
        aggregate: { correct: 0, wrong: 0, score: 0 },
      };
    }

    if (!results[username].quizzes[quizSlug]) {
      results[username].quizzes[quizSlug] = {
        correct,
        total,
        points,
        retakes: 0,
        lastAttemptId: attempt.id,
      };
    } else {
      results[username].quizzes[quizSlug].retakes += 1;
      results[username].quizzes[quizSlug].correct = correct;
      results[username].quizzes[quizSlug].total = total;
      results[username].quizzes[quizSlug].points = points;
      results[username].quizzes[quizSlug].lastAttemptId = attempt.id;
    }

    attemptStore.finish(username, quizSlug);
    try {
      saveResultsToFile();
      res.redirect(`/stats?lang=${encodeURIComponent(lang)}`);
    } catch (error) {
      if (previousUserResult) results[username] = previousUserResult;
      else delete results[username];
      attemptStore.restore(attempt);
      return res.status(503).send("Unable to save quiz result. Please retry.");
    }
  });

  // API endpoint to get winner call time
  router.get("/api/winner-call-time", (req, res) => {
    const { getWinnerCallTime } = dependencies;
    res.json({ time: getWinnerCallTime() });
  });

  // API endpoint to set winner call time (requires token)
  router.post("/api/winner-call-time", (req, res) => {
    if (req.query.token !== RESET_TOKEN) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    const { setWinnerCallTime } = dependencies;
    const { time } = req.body;

    if (typeof time !== "string" || !/^\d{2}:\d{2}$/.test(time)) {
      return res.status(400).json({ error: "Invalid time format. Use HH:MM" });
    }

    setWinnerCallTime(time);
    res.json({ success: true, time });
  });

  // Admin page for setting winner call time
  router.get("/admin", async (req, res) => {
    const lang = req.query.lang || "en";
    await loadTranslations(lang);

    const { getWinnerCallTime } = dependencies;
    res.render("admin", {
      lang,
      availableLanguages,
      THEME_IMAGE: theme.IMAGE,
      THEME_TITLE: theme.TITLE,
      THEME_COLOR: theme.PRIMARY_COLOR,
      t: (text) => gt.gettext(text),
      currentTime: getWinnerCallTime(),
    });
  });

  return router;
};
