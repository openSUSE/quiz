const express = require("express");
const fs = require("fs");
const path = require("path");
require('ejs');

const app = express();
const dataDirBasePath = process.env.LAMBDA_TASK_ROOT || __dirname;
const dataDirPath = path.join(dataDirBasePath, "data");

const RESET_TOKEN = process.env.RESET_TOKEN || "nots3cr3t";

// Temporary in-memory database
let results = {}; // { nickname: { correct: 0, total: 0 } }

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/data", express.static(path.join(__dirname, "data")));

const quizFileDir = fs
  .readdirSync(dataDirPath)
  .filter((name) => name.endsWith(".js"));

const quizzes = quizFileDir.map((file) => {
  const quizFile = require(path.join(dataDirPath, file));
  return {
    title: quizFile.quizData.title,
    slug: file.replace(".js", ""),
  };
});

// Routes
app.get("/", (req, res) => res.render("index", { quizzes }));
app.get("/quiz", (req, res) => res.render("quiz", { query: req.query.name }));
app.get("/stats", (req, res) => res.render("stats", { results }));
app.get("/bingo", (req, res) => res.render("bingo", { results }));

app.get("/reset", (req, res) => {
  if (req.query.token !== RESET_TOKEN) {
    return res.status(403).send("Forbidden: Invalid reset token");
  }

  results = {};
  res.redirect("/stats");
});

app.post("/submit", (req, res) => {
  results[req.body.username] = {
    correct: req.body.correct,
    total: req.body.total,
  };
  res.redirect("/stats");
});

module.exports = app;
