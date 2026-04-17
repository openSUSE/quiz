require("dotenv").config();
const path = require("path");
const fs = require("fs"); // Added fs module

const DATA_DIR_BASEPATH = process.env.LAMBDA_TASK_ROOT
  ? path.join(process.env.LAMBDA_TASK_ROOT, "src")
  : __dirname;

const DATA_DIR_PATH = path.join(DATA_DIR_BASEPATH, "..", "data");

// Check for .env file existence in the project root
const projectRoot = path.join(__dirname, "..");
const envPath = path.join(projectRoot, ".env");
const envFileExists = fs.existsSync(envPath);

// STATS_MODE defaults to "STATS_FILE" if not set in .env or if .env doesn't exist.
const STATS_MODE = process.env.STATS_MODE || "STATS_FILE";

// prefer STATS_FILE_PATH from environment and fall back to file inside repository root
let resolvedStatsFilePath =
  process.env.STATS_FILE_PATH || path.join(projectRoot, "data", "stats.json");
const STATS_FILE_PATH = resolvedStatsFilePath;

function generateReadableToken() {
  const words1 = ["Happy", "Blue", "Fast", "Lucky"];
  const words2 = ["Horse", "Chicken", "Tiger", "Eagle"];
  const num = Math.floor(Math.random() * 1000);

  return (
    words1[Math.floor(Math.random() * words1.length)] +
    words2[Math.floor(Math.random() * words2.length)] +
    num
  );
}
let RESET_TOKEN = process.env.RESET_TOKEN;

if (!RESET_TOKEN) {
  RESET_TOKEN = generateReadableToken();

  console.log("=================================");
  console.log("⚠️  No RESET_TOKEN provided!");
  console.log("Generated RESET_TOKEN:", RESET_TOKEN);
  console.log("Share this token with the operator/admin.");
  console.log("=================================");
}

// controls used logo of the quiz
const THEME = process.env.THEME || "openSUSE";

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

module.exports = {
  DATA_DIR_BASEPATH,
  DATA_DIR_PATH,
  RESET_TOKEN,
  STATS_MODE,
  STATS_FILE_PATH,
  USERNAME_POLICY,
  ENABLED_QUIZZES,
  THEME,
};