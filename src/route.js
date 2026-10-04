const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const QRCode = require("qrcode");
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

const qrBufferCache = new Map();
const QR_CACHE_TTL_MS = 10 * 60 * 1000;
const QR_CACHE_MAX_ITEMS = 64;

function safeJsonForScript(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

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

  const USERNAME_RE = /^[\p{L}\p{N} ._-]{1,32}$/u;
  function isValidUsername(name) {
    return typeof name === "string" && USERNAME_RE.test(name);
  }

  function checkAuthToken(req) {
    const header = req.get("authorization") || "";
    const match = header.match(/^Bearer\s+(.+)$/i);
    if (!match) return false;
    const provided = Buffer.from(match[1]);
    const expected = Buffer.from(RESET_TOKEN);
    return (
      provided.length === expected.length &&
      crypto.timingSafeEqual(provided, expected)
    );
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
      quizData: safeJsonForScript(localized.quizData),
      questions: safeJsonForScript(localized.questions),
      uiStrings: uiStrings,
      uiStringsJson: safeJsonForScript(uiStrings),
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

  router.get("/bingo", (req, res) => {
    res.render("bingo", { results, resultsJson: safeJsonForScript(results) });
  });

  router.post("/reset", (req, res) => {
    if (!checkAuthToken(req)) {
      return res.status(403).json({ error: "Forbidden: Invalid reset token" });
    }
    clearResults();
    res.json({ success: true });
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

    if (!isValidUsername(username)) {
      return res.status(400).send("Invalid username.");
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

    // Initialize user results if needed
    if (!results[username]) {
      results[username] = {
        quizzes: {},
      };
    }

    if (!results[username].quizzes[quizSlug]) {
      results[username].quizzes[quizSlug] = {
        correct,
        total,
        retakes: 0,
      };
    } else {
      results[username].quizzes[quizSlug].retakes += 1;
      results[username].quizzes[quizSlug].correct = correct;
      results[username].quizzes[quizSlug].total = total;
    }

    saveResultsToFile();
    res.redirect(`/stats?lang=${lang}`);
  });

  // API endpoint to get winner call time
  router.get("/api/winner-call-time", (req, res) => {
    const { getWinnerCallTime } = dependencies;
    res.json({ time: getWinnerCallTime() });
  });

  // API endpoint to set winner call time (requires token)
  router.post("/api/winner-call-time", (req, res) => {
    if (!checkAuthToken(req)) {
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
