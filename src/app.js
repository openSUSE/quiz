const express = require("express");
const fs = require("fs");
const path = require("path");
const Gettext = require("node-gettext");
const consts = require("./consts");
const app = express();
const routes = require("./route");
require("ejs");

const gt = new Gettext();

// Temporary in-memory database
let results = {}; // { nickname: { correct: 0, total: 0 } }

// Function to clear results
function clearResults() {
  results = {};
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
  const filePath = path.join(
    consts.DATA_DIR_BASEPATH,
    "..",
    "locales",
    lang,
    "LC_MESSAGES",
    "messages.po",
  );
  if (fs.existsSync(filePath)) {
    const poFileContent = fs.readFileSync(filePath);
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
});
app.use("/", router);

module.exports = app;
