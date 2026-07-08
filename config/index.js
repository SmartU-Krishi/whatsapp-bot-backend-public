const dotenv = require("dotenv");
const path = require("path");

// Load correct .env file
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.SERVERPORT || 8080,

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  },

  db: {
    name: process.env.DB,
    username: process.env.USERNAMES,
    host: process.env.HOST,
    password: process.env.DB_PASSWORDS,
    port: process.env.DBPORT || 5432,
  },

  azure: {
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    advisoryContainer: process.env.AZURE_ADVISORY_CONTAINER,
  },
};
