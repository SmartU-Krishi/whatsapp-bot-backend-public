const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const path = require("path");
const compression = require("compression");

const whatsAppRoutes = require("./routes/whatsAppBotRoutes");
const globalErrHandler = require("./controllers/errorController");
const setLanguage = require("./middleware/setLanguage");
require("express-async-errors");

const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit requests from the same IP
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Requests from this IP, please try again in an hour",
});
app.use("/whatsappbot", limiter);

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Language middleware
app.use(setLanguage);

// Routes
app.use("/whatsappbot", whatsAppRoutes);

// Handle undefined Routes
app.use("*", (req, res, next) => {
  return res
    .status(200)
    .json({ status: "1", message: "Welcome to SmartU WhatsApp Bot Backend" });
});

app.use(globalErrHandler);
app.use(compression());

module.exports = app;
