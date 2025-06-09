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

let resolvedStatsFilePath;
if (!envFileExists) {
  // If .env does not exist, use /tmp/stats.json and STATS_MODE is already "STATS_FILE" by default
  resolvedStatsFilePath = "/tmp/stats.json";
} else {
  // If .env exists, use STATS_FILE_PATH from .env or the original default path
  resolvedStatsFilePath =
    process.env.STATS_FILE_PATH ||
    path.join(__dirname, "..", "data", "stats.json");
}
const STATS_FILE_PATH = resolvedStatsFilePath;

// RESET_TOKEN defaults to "supersecret" if not set in .env or if .env doesn't exist.
const RESET_TOKEN = envFileExists
  ? process.env.RESET_TOKEN || ""
  : "supersecret";

const EVENT = process.env.EVENT || "openSUSE";

module.exports = {
  DATA_DIR_BASEPATH,
  DATA_DIR_PATH,
  RESET_TOKEN,
  STATS_MODE,
  STATS_FILE_PATH,
  EVENT,
};
