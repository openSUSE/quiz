const path = require("path");

const DATA_DIR_BASEPATH = process.env.LAMBDA_TASK_ROOT
  ? path.join(process.env.LAMBDA_TASK_ROOT, "src")
  : __dirname;

const DATA_DIR_PATH = path.join(DATA_DIR_BASEPATH, "..", "data");
const RESET_TOKEN = process.env.RESET_TOKEN || "nots3cr3t";

module.exports = {
  DATA_DIR_PATH,
  DATA_DIR_BASEPATH,
  RESET_TOKEN,
};
