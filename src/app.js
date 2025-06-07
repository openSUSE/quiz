const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");


const express = require("express");
const Gettext = require("node-gettext");
require("ejs"); // Only for side effects, no variable assignment

const consts = require("./consts");
const routes = require("./route");

const app = express();

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

function saveResultsToFile() {
  const shortResult = JSON.stringify(results).slice(0, 10);
  const filePath = consts.STATS_FILE_PATH;

  console.log(`Saving results (first 10 chars): "${shortResult}" to ${filePath}`);

  // Write to file
  fs.writeFileSync(filePath, JSON.stringify(results, null, 2), "utf-8");

  // Get file stats
  const stats = fs.statSync(filePath);
  const mode = "0" + (stats.mode & 0o777).toString(8); // e.g. 0644
  const size = stats.size;
  const uid = stats.uid;
  const gid = stats.gid;

  // Resolve user and group names (may fail in containers)
  let owner = uid;
  let group = gid;
  try {
    owner = execSync(`getent passwd ${uid} | cut -d: -f1`).toString().trim();
    group = execSync(`getent group ${gid} | cut -d: -f1`).toString().trim();
  } catch (err) {
    // fallback to UID/GID if getent fails
  }

  // Current running user
  let whoami = "unknown";
  try {
    whoami = execSync("whoami").toString().trim();
  } catch (err) {
    whoami = os.userInfo().username || "unknown";
  }

  // Log metadata
  console.log(`File written to ${filePath}`);
  console.log(` - Permissions: ${mode}`);
  console.log(` - Size: ${size} bytes`);
  console.log(` - Owner: ${owner} (UID ${uid})`);
  console.log(` - Group: ${group} (GID ${gid})`);
  console.log(` - Current user: ${whoami}`);
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
      `Translation file not found for lang '${lang}' at path: ${filePath}. Falling back to 'en'.`
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
