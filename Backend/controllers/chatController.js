const { askSmartFarmerAI } = require("../services/openaiService");

function createChatController(config) {
  return async function chat(req, res) {
    if (!config.openaiApiKey) {
      return res.status(500).json({ error: "OPENAI_API_KEY missing. Create .env file and add OPENAI_API_KEY=your_api_key_here" });
    }

    const message = String(req.body?.message || "").trim();
    if (!message) return res.status(400).json({ error: "Message is required" });

    try {
      const answer = await askSmartFarmerAI({
        apiKey: config.openaiApiKey,
        model: config.openaiModel,
        message,
        language: req.body?.language || "en",
        context: req.body?.context || {},
        history: req.body?.history || []
      });
      res.json({ answer });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message || "Chat API failed. Check internet connection and API key." });
    }
  };
}

module.exports = { createChatController };
