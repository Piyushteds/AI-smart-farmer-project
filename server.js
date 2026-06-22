const express = require("express");
const path = require("path");
const { getConfig } = require("./Backend/config/env");
const { redirects } = require("./Backend/config/paths");
const { corsMiddleware } = require("./Backend/middleware/cors");
const { createApiRouter } = require("./Backend/routes/apiRoutes");

const app = express();
const config = getConfig(__dirname);

app.use(corsMiddleware);
app.use(express.json({ limit: config.maxJsonSize }));

Object.entries(redirects).forEach(([from, to]) => {
  app.get(from, (req, res) => res.redirect(302, `${to}${req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""}`));
});

app.use("/api", createApiRouter(config));
app.use(express.static(config.rootDir));

app.use((req, res) => {
  res.status(404).type("text/plain").send("File not found");
});

app.listen(config.port, () => {
  console.log(`Smart Farmer backend running at http://smartfarmer:${config.port}`);
  console.log("Backend structure: Express routes + controllers + services");
});

