const path = require("path");
const dotenv = require("dotenv");

function loadEnv(rootDir) {
  dotenv.config({ path: path.join(rootDir, ".env") });
}

function getConfig(rootDir) {
  loadEnv(rootDir);
  return {
    rootDir,
    port: Number(process.env.PORT || 2005),
    openaiApiKey: process.env.OPENAI_API_KEY || "",
    openaiModel: process.env.OPENAI_MODEL || "gpt-5.4-mini",
    maxJsonSize: process.env.MAX_JSON_SIZE || "1mb"
  };
}

module.exports = { getConfig };

