const app = require("./app");
const dbConnection = require("./db");

const PORT = process.env.PORT || 8080;

dbConnection
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Server failed to start because MongoDB connection failed:", err);
    process.exit(1);
  });
