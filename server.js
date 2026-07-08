const path = require("path");
const db = require("./config/db.config");
const app = require("./app");
const config = require("./config");

const port = config.port || 8080;

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Authenticate Database Connection without synchronization to ensure shared tables remain unaltered
db.sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
