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
    slug: file.replace(".js", "")
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
  sresults=JSON.stringify(results);
  const html = ` 
        <!DOCTYPE html> 
        <html lang="en"> 
        <head> 
            <meta charset="UTF-8"> 
            <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
            <title>Bingo</title> 
        </head> 
        <body> 
            <container></container>
        </body> 
        <script src="./bingo.js"> 
            // Accessing the server-side variable from the HTML 
            const results = "${sresults}"; 
            console.log(results); // Use the variable in client-side JavaScript 
        </script> 
        </html> 
    `; 
 
    res.end(html); 
});

app.get("/reset", (req, res) => {
  results={}
  res.statusCode = 302;
  res.setHeader('Location', '/stats');
  return res.end();
});

app.post("/submit", (req, res) => {
  results[req.body.username] = { correct: req.body.correct, total: req.body.total }
  res.statusCode = 302;
  res.setHeader('Location', '/stats');
  return res.end();
});
app.listen(3000);
