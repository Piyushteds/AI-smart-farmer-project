function cleanContext(context = {}) {
  return {
    role: context.role || "farmer",
    city: context.city || "Ahmedabad",
    deviceOn: Boolean(context.deviceOn),
    cartItems: Array.isArray(context.cart) ? context.cart.length : 0,
    orderCount: Array.isArray(context.orders) ? context.orders.length : 0,
    bookingCount: Array.isArray(context.bookings) ? context.bookings.length : 0,
    billCount: Array.isArray(context.bills) ? context.bills.length : 0,
    latestOrder: Array.isArray(context.orders) ? context.orders[0] || null : null,
    latestBooking: Array.isArray(context.bookings) ? context.bookings[0] || null : null,
    latestBill: Array.isArray(context.bills) ? context.bills[0] || null : null
  };
}

function getOutputText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  if (!Array.isArray(data.output)) return "";
  return data.output
    .flatMap((item) => (Array.isArray(item.content) ? item.content : []))
    .map((content) => content.text || "")
    .join("\n")
    .trim();
}

function buildInstructions() {
  return `You are Smart Farmer AI for a student agriculture web project. You are an advanced farming field assistant. Answer farmer-field related questions clearly, practically, and in the user's language style: Hinglish/Hindi for Hindi/Hinglish, otherwise simple English.

Always format answers with short markdown sections when useful:
### Quick Diagnosis
- likely causes based on symptoms
### Field Check
- 3 to 5 simple checks the farmer can do today
### Action Plan
- safe practical steps, irrigation/weather timing, isolation, organic/low-risk first steps
### Warning
- mention when to avoid spraying, when to consult local agriculture expert, and that exact chemical dose depends on crop stage/local label
### Next Step
- ask for crop name, city/weather, leaf photo symptoms, soil moisture, or pest details if missing

Also help with this project: marketplace, equipment rental, rental billing, UPI payment, dashboards, login roles, weather alerts, disease upload, database, and IoT pump ON/OFF demo. Do not invent exact pesticide dosage. Keep answers concise but complete.`;
}

async function askSmartFarmerAI({ apiKey, model, message, language, context, history }) {
  const input = [
    `Language: ${language || "en"}`,
    `Project context: ${JSON.stringify(cleanContext(context))}`,
    `Recent chat history: ${JSON.stringify(Array.isArray(history) ? history.slice(-8) : [])}`,
    `User question: ${message}`
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions: buildInstructions(),
      input,
      max_output_tokens: 900
    })
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error?.message || "OpenAI API request failed");
    error.status = response.status;
    throw error;
  }

  return getOutputText(data) || "Sorry, mujhe abhi answer generate nahi hua. Thoda clearly question pucho.";
}

module.exports = { askSmartFarmerAI, cleanContext };
