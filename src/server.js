// Execute by PORT=4000 node server.js

const app = require("./app");

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
