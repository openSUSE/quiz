require("dotenv").config();
const path = require("path");

const DATA_DIR_BASEPATH = process.env.LAMBDA_TASK_ROOT
  ? path.join(process.env.LAMBDA_TASK_ROOT, "src")
  : __dirname;

const DATA_DIR_PATH = path.join(DATA_DIR_BASEPATH, "..", "data");

const projectRoot = path.join(__dirname, "..");

// STATS_MODE defaults to "STATS_FILE" if not set in .env or if .env doesn't exist.
const STATS_MODE = process.env.STATS_MODE || "STATS_FILE";

// prefer STATS_FILE_PATH from environment and fall back to file inside repository root
let resolvedStatsFilePath =
  process.env.STATS_FILE_PATH || path.join(projectRoot, "data", "stats.json");
const STATS_FILE_PATH = resolvedStatsFilePath;

const RESET_TOKEN = process.env.RESET_TOKEN;

// controls used logo of the quiz
const THEME = process.env.THEME || "openSUSE";

// optional instance name used for booth-specific URLs
const INSTANCE = process.env.INSTANCE || "";

const ENABLED_QUIZZES = process.env.QUIZZES
  ? process.env.QUIZZES.split(",")
  : [];

// Just a helper function to detect _() by gettext
function _(str) {
  return str;
}
const USERNAME_POLICY =
  process.env.USERNAME_POLICY ||
  _(
    "Use a recognizable nickname, like ZypperJedi, or preferably your real name (NameSurname)."
  );

// Scoring, keep in sync with public/quizRenderer.js and public/agility.js
const QUESTION_MAX_POINTS = 1000;
const AGILITY_MAX_POINTS = 1000;
// Quizzes shorter than this only get the final agility round.
const AGILITY_HALFTIME_MIN_QUESTIONS = 10;

// Question counts after which an agility round is played: half-time and
// the end. Keep in sync with agilityCheckpoints() in public/quizRenderer.js
function agilityCheckpoints(total) {
  if (total < 1) return [];
  if (total < AGILITY_HALFTIME_MIN_QUESTIONS) return [total];
  return [Math.ceil(total / 2), total];
}

module.exports = {
  QUESTION_MAX_POINTS,
  AGILITY_MAX_POINTS,
  AGILITY_HALFTIME_MIN_QUESTIONS,
  agilityCheckpoints,
  DATA_DIR_BASEPATH,
  DATA_DIR_PATH,
  RESET_TOKEN,
  STATS_MODE,
  STATS_FILE_PATH,
  USERNAME_POLICY,
  ENABLED_QUIZZES,
  THEME,
  INSTANCE,
};
