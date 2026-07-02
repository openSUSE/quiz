// Execute by PORT=4000 node server.js

const app = require("./app");
const { RESET_TOKEN } = require("./consts");

if (!RESET_TOKEN || RESET_TOKEN.length < 16) {
  console.error(
    "FATAL: RESET_TOKEN environment variable must be set (>=16 chars). Refusing to start."
  );
  process.exit(1);
}

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`✅ Quiz app running at http://localhost:${PORT}`);
});

const shutdown = (signal) => {
  console.log(`Shutting down on SIG${signal} ...`);
  server.close(() => {
    console.log("Server closed, bye.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Could not close connections in time, aborting.");
    process.exit(1);
  }, 5000);
};

process.on("SIGINT", () => shutdown("INT"));
process.on("SIGTERM", () => shutdown("TERM"));
