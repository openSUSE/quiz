// Execute by PORT=4000 node server.js

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Quiz app running at http://localhost:${PORT}`);
});
