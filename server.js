const express = require("express");
const app = express();
const fs = require("fs");

// Temporary in-memory database. Flush
var results = {}; // { nickname: { correct: 0, wrong: 0 } }

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/data", express.static(__dirname + "/data"));

const quizFileDir = fs
  .readdirSync("./data")
  .filter((name) => name.endsWith(".js"));

const quizzes = [];

for (const file of quizFileDir) {
  const quizFile = require(`./data/${file}`);
  quizzes.push({
    title: quizFile.quizData.title,
    slug: file.replace(".js", ""),
  });
}

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs", { quizzes });
});

app.get("/quiz", (req, res) => {
  res.render("quiz.ejs", { query: req.query.name });
});

app.get("/stats", (req, res) => {
  res.render("stats.ejs", { results });
});

app.get("/bingo", (req, res) => {
  res.render("bingo.ejs", { results });
});

app.get("/reset", (req, res) => {
  results = {};
  res.statusCode = 302;
  res.setHeader("Location", "/stats");
  return res.end();
});

app.post("/submit", (req, res) => {
  results[req.body.username] = {
    correct: req.body.correct,
    total: req.body.total,
  };
  res.statusCode = 302;
  res.setHeader("Location", "/stats");
  return res.end();
});
app.listen(3000);
