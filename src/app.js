const express = require("express");
const fs = require("fs");
const path = require("path");
const Gettext = require("node-gettext");
const consts = require("./consts");
const app = express();
const routes = require("./route");
require("ejs");

const gt = new Gettext();

if (
  !fs.existsSync(consts.STATS_FILE_PATH) &&
  consts.STATS_MODE === "STATS_FILE"
) {
  fs.writeFileSync(consts.STATS_FILE_PATH, JSON.stringify({}), "utf-8");
}

// Initialize results
let results = {};

// Function to load results from file
function loadResultsFromFile() {
  if (fs.existsSync(consts.STATS_FILE_PATH)) {
    const fileContent = fs.readFileSync(consts.STATS_FILE_PATH, "utf-8");
    results = JSON.parse(fileContent);
  } else {
    results = {};
  }
}

// Function to save results to file
function saveResultsToFile() {
  fs.writeFileSync(
    consts.STATS_FILE_PATH,
    JSON.stringify(results, null, 2),
    "utf-8",
  );
}

// Function to clear results
function clearResults() {
  results = {};
  if (consts.STATS_MODE === "STATS_FILE") {
    saveResultsToFile();
  }
}

// Load results based on STATS_MODE
if (consts.STATS_MODE === "STATS_FILE") {
  loadResultsFromFile();
}

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/data", express.static(consts.DATA_DIR_PATH));

const quizFileDir = fs
  .readdirSync(consts.DATA_DIR_PATH)
  .filter((name) => name.endsWith(".js"));

const quizzes = quizFileDir.map((file) => {
  const quizFile = require(path.join(consts.DATA_DIR_PATH, file));
  return {
    title: quizFile.quizData.title,
    slug: file.replace(".js", ""),
  };
});

async function loadTranslations(lang) {
  const { po } = await import("gettext-parser");

  // Special case for English – map 'en' to 'template.pot'
  const filename = lang === "en" ? "template.pot" : `${lang}.po`;
  const filePath = path.join(consts.DATA_DIR_BASEPATH, "..", "po", filename);

  if (fs.existsSync(filePath)) {
    const poFileContent = fs.readFileSync(filePath, "utf8");
    const translations = po.parse(poFileContent);
    gt.addTranslations(lang, "messages", translations);
    gt.setLocale(lang);
  } else {
    console.error(
      `Translation file not found for lang '${lang}' at path: ${filePath}. Falling back to 'en'.`,
    );
    gt.setLocale("en");
  }
}

// Pass dependencies to the router
const router = routes({
  loadTranslations,
  quizzes,
  gt,
  results,
  RESET_TOKEN: consts.RESET_TOKEN,
  clearResults,
  saveResultsToFile:
    consts.STATS_MODE === "STATS_FILE" ? saveResultsToFile : () => {},
});
app.use("/", router);

module.exports = app;
