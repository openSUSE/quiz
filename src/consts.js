const path = require("path");

const DATA_DIR_BASEPATH = process.env.LAMBDA_TASK_ROOT
  ? path.join(process.env.LAMBDA_TASK_ROOT, "src")
  : __dirname;

const DATA_DIR_PATH = path.join(DATA_DIR_BASEPATH, "..", "data");
const RESET_TOKEN = process.env.RESET_TOKEN || "nots3cr3t";
const STATS_MODE = process.env.STATS_MODE || "STATS_FILE"; // "STATS_FILE" or "STATS_MEMORY"

module.exports = {
  DATA_DIR_BASEPATH,
  DATA_DIR_PATH,
  RESET_TOKEN,
  STATS_MODE,
};
