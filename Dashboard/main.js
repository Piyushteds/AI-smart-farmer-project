const chatIcon = document.getElementById("chatIcon");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const clearChat = document.getElementById("clearChat");
const regenerateChat = document.getElementById("regenerateChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");
const themeBtn = document.getElementById("themeBtn");
const voiceBtn = document.getElementById("voiceBtn");
const sidebarToggle = document.getElementById("sidebarToggle");
const languageSelect = document.getElementById("languageSelect");
const welcomeMessage = document.getElementById("welcomeMessage");
const chatTitle = document.getElementById("chatTitle");
const quickQuestions = document.getElementById("quickQuestions");
const chatStatus = document.getElementById("chatStatus");
const CHAT_API_URL =
  ["http://smartfarmer:2005", "http://localhost:2005", "http://127.0.0.1:2005"].includes(window.location.origin) ? "/api/chat" : "http://smartfarmer:2005/api/chat";

const languageVoiceMap = {
  en: "en-IN",
  hi: "hi-IN",
  gu: "gu-IN",
  mr: "mr-IN",
};

const translations = {
  en: {
    heroTitle: "Welcome back, Farmer",
    heroText:
      "Manage weather, marketplace orders, crop disease checks, equipment rental, and expert help from one clean home page.",
    marketBtn: "Open Marketplace",
    weatherBtn: "Check Weather",
    farmToolsTitle: "Farm tools",
    expertHelpLink: "Need help? Talk to expert",
    recommendedTitle: "Recommended today",
    projectModulesTitle: "Project modules",
    footerTitle: "Smart Farmer Project",
    footerText:
      "Empowering farmers through weather, marketplace, disease detection, equipment rental, and expert consultation.",
    chatTitle: "Smart Farmer AI",
    chatPlaceholder: "Ask Smart Farmer AI...",
    chatWelcome:
      "Hello Farmer! Ask me about crops, weather, disease, irrigation, marketplace, login, equipment, or this project.",
    send: "Send",
  },
  hi: {
    heroTitle: "वापस स्वागत है, किसान",
    heroText:
      "मौसम, मार्केटप्लेस ऑर्डर, फसल रोग जांच, उपकरण किराया और विशेषज्ञ मदद एक ही होम पेज से मैनेज करें।",
    marketBtn: "मार्केटप्लेस खोलें",
    weatherBtn: "मौसम देखें",
    farmToolsTitle: "खेती के टूल्स",
    expertHelpLink: "मदद चाहिए? विशेषज्ञ से बात करें",
    recommendedTitle: "आज की सलाह",
    projectModulesTitle: "प्रोजेक्ट मॉड्यूल",
    footerTitle: "स्मार्ट फार्मर प्रोजेक्ट",
    footerText:
      "मौसम, मार्केटप्लेस, रोग पहचान, उपकरण किराया और विशेषज्ञ सलाह से किसानों को सशक्त बनाना।",
    chatTitle: "स्मार्ट फार्मर AI",
    chatPlaceholder: "Smart Farmer AI से पूछें...",
    chatWelcome:
      "नमस्ते किसान! फसल, मौसम, रोग, सिंचाई, मार्केटप्लेस, लॉगिन या प्रोजेक्ट के बारे में पूछें।",
    send: "भेजें",
  },
  gu: {
    heroTitle: "ફરી સ્વાગત છે, ખેડૂત",
    heroText:
      "હવામાન, માર્કેટપ્લેસ ઓર્ડર, પાક રોગ તપાસ, સાધન ભાડું અને નિષ્ણાત મદદ એક જ હોમ પેજથી મેનેજ કરો.",
    marketBtn: "માર્કેટપ્લેસ ખોલો",
    weatherBtn: "હવામાન જુઓ",
    farmToolsTitle: "ખેતીના ટૂલ્સ",
    expertHelpLink: "મદદ જોઈએ? નિષ્ણાત સાથે વાત કરો",
    recommendedTitle: "આજની સલાહ",
    projectModulesTitle: "પ્રોજેક્ટ મોડ્યુલ્સ",
    footerTitle: "સ્માર્ટ ફાર્મર પ્રોજેક્ટ",
    footerText:
      "હવામાન, માર્કેટપ્લેસ, રોગ ઓળખ, સાધન ભાડું અને નિષ્ણાત સલાહથી ખેડૂતોને સશક્ત બનાવવું.",
    chatTitle: "સ્માર્ટ ફાર્મર AI",
    chatPlaceholder: "Smart Farmer AI ને પૂછો...",
    chatWelcome:
      "નમસ્તે ખેડૂત! પાક, હવામાન, રોગ, સિંચાઈ, માર્કેટપ્લેસ, લૉગિન અથવા પ્રોજેક્ટ વિશે પૂછો.",
    send: "મોકલો",
  },
  mr: {
    heroTitle: "पुन्हा स्वागत आहे, शेतकरी",
    heroText:
      "हवामान, मार्केटप्लेस ऑर्डर, पीक रोग तपासणी, उपकरण भाडे आणि तज्ञ मदत एका होम पेजवरून व्यवस्थापित करा.",
    marketBtn: "मार्केटप्लेस उघडा",
    weatherBtn: "हवामान पहा",
    farmToolsTitle: "शेतीची साधने",
    expertHelpLink: "मदत हवी आहे? तज्ञांशी बोला",
    recommendedTitle: "आजची शिफारस",
    projectModulesTitle: "प्रोजेक्ट मॉड्यूल्स",
    footerTitle: "स्मार्ट फार्मर प्रोजेक्ट",
    footerText:
      "हवामान, मार्केटप्लेस, रोग ओळख, उपकरण भाडे आणि तज्ञ सल्ल्याद्वारे शेतकऱ्यांना सक्षम करणे.",
    chatTitle: "स्मार्ट फार्मर AI",
    chatPlaceholder: "Smart Farmer AI ला विचारा...",
    chatWelcome:
      "नमस्कार शेतकरी! पीक, हवामान, रोग, सिंचन, मार्केटप्लेस, लॉगिन किंवा प्रोजेक्टबद्दल विचारा.",
    send: "पाठवा",
  },
};

const botReplies = {
  en: {
    greeting:
      "Hello! I am Smart Farmer AI. I can help with crops, weather, irrigation, disease, equipment, marketplace, login, and project navigation.",
    weather:
      "Open the Weather page for live city weather, AQI, warnings, danger alerts, success popups, and farming advice. Avoid spraying during rain, strong wind, or poor AQI.",
    disease:
      "For crop disease, open Disease Upload, upload a clear leaf photo, and check symptoms like spots, yellowing, curling, powder, or rot. Remove infected leaves and avoid overhead watering.",
    irrigation:
      "Best irrigation time is early morning or evening. If soil is dry 2-3 cm below the surface, irrigate lightly. Avoid over-watering during cloudy or rainy weather.",
    crop: "Crop choice depends on season and area: wheat/mustard in winter, paddy/maize in monsoon, cotton/groundnut in warm dry regions, and vegetables with proper irrigation.",
    soil: "Do soil testing before fertilizer planning. Maintain organic matter with compost, avoid excess urea, and use NPK according to crop requirement.",
    fertilizer:
      "Use compost for soil health, nitrogen for leaf growth, phosphorus for roots, and potassium for fruit quality. Apply fertilizer in split doses after checking soil moisture.",
    pesticide:
      "Spray pesticide only in calm weather. Wear mask/gloves, follow label dose, avoid afternoon heat, and do not spray before rain.",
    marketplace:
      "Marketplace helps users buy seeds, fertilizer, tools, and irrigation products. Vendors can manage products and equipment listings.",
    equipment:
      "Equipment Rental is for tractors, sprayers, pumps, harvesters, and tools. Check booking date, rent price, owner contact, and machine condition.",
    login:
      "Login roles are Farmer, Vendor, User, and Admin. After login, each role sees only useful pages for that role.",
    project:
      "This project includes landing page, role login, dashboard, weather alerts, marketplace, disease upload, equipment rental, expert consultation, and chatbot.",
    contact:
      "Developer links are available in the footer: LinkedIn, GitHub, and Gmail.",
    remote:
      "Remote device control is a demo IoT idea: sensor detects distance/status and a relay can switch pump ON/OFF from far away.",
    fallback:
      "I can help with that. For this project, tell me the topic clearly: crop, weather, disease, irrigation, soil, fertilizer, marketplace, equipment, login, admin, vendor, farmer, or project design.",
  },
  hi: {
    greeting:
      "नमस्ते! मैं Smart Farmer AI हूं। मैं फसल, मौसम, सिंचाई, रोग, उपकरण, मार्केटप्लेस, लॉगिन और प्रोजेक्ट नेविगेशन में मदद कर सकता हूं।",
    weather:
      "Weather page खोलें। वहां live city weather, AQI, warning, danger alert, success popup और farming advice मिलती है। बारिश, तेज हवा या खराब AQI में spray avoid करें।",
    disease:
      "फसल रोग के लिए Disease Upload page खोलें और साफ leaf photo upload करें। दाग, पीलापन, leaf curl, powder या rot जैसे symptoms check करें।",
    irrigation:
      "सिंचाई का best time सुबह जल्दी या शाम है। मिट्टी 2-3 cm नीचे सूखी लगे तो हल्की सिंचाई करें। बारिश/बादल में over-watering avoid करें।",
    crop: "फसल season और area पर depend करती है: winter में wheat/mustard, monsoon में paddy/maize, dry area में cotton/groundnut और irrigation हो तो vegetables।",
    soil: "Fertilizer planning से पहले soil testing करें। Compost से organic matter बढ़ाएं और urea ज्यादा न डालें।",
    fertilizer:
      "Compost soil health के लिए, nitrogen leaves के लिए, phosphorus roots के लिए और potassium fruit quality के लिए use करें।",
    pesticide:
      "Pesticide calm weather में spray करें। Mask/gloves पहनें, label dose follow करें, afternoon heat और rain से पहले spray avoid करें।",
    marketplace:
      "Marketplace में seeds, fertilizer, tools और irrigation products मिलते हैं। Vendor products और equipment listing manage कर सकता है।",
    equipment:
      "Equipment Rental में tractor, sprayer, pump, harvester और tools book कर सकते हैं। Date, rent price और machine condition check करें।",
    login:
      "Login roles Farmer, Vendor, User और Admin हैं। Login के बाद हर role को उसके useful pages दिखते हैं।",
    project:
      "इस project में landing page, role login, dashboard, weather alerts, marketplace, disease upload, equipment rental, expert consultation और chatbot है।",
    contact: "Developer links footer में हैं: LinkedIn, GitHub और Gmail।",
    remote:
      "Remote device control demo IoT idea है: sensor status/distance detect करता है और relay से pump ON/OFF किया जा सकता है।",
    fallback:
      "मैं इसमें मदद कर सकता हूं। Topic साफ लिखें: crop, weather, disease, irrigation, soil, fertilizer, marketplace, equipment, login, admin, vendor, farmer या project design।",
  },
  gu: {
    greeting:
      "નમસ્તે! હું Smart Farmer AI છું. હું પાક, હવામાન, સિંચાઈ, રોગ, સાધન, માર્કેટપ્લેસ, લૉગિન અને પ્રોજેક્ટ નેવિગેશનમાં મદદ કરી શકું છું.",
    weather:
      "Weather page ખોલો. ત્યાં live city weather, AQI, warning, danger alert, success popup અને farming advice મળે છે. વરસાદ, જોરદાર પવન અથવા poor AQI માં spray avoid કરો.",
    disease:
      "પાક રોગ માટે Disease Upload page ખોલો અને clear leaf photo upload કરો. spots, yellowing, leaf curl, powder અથવા rot symptoms check કરો.",
    irrigation:
      "સિંચાઈ માટે સવાર વહેલી અથવા સાંજ best છે. માટી 2-3 cm નીચે સૂકી હોય તો હળવી સિંચાઈ કરો. વરસાદમાં over-watering avoid કરો.",
    crop: "પાક season અને area પર depend કરે છે: winter માં wheat/mustard, monsoon માં paddy/maize, dry area માં cotton/groundnut, અને irrigation હોય તો vegetables.",
    soil: "Fertilizer planning પહેલાં soil testing કરો. Compost થી organic matter વધારો અને urea વધારે ન નાખો.",
    fertilizer:
      "Compost soil health માટે, nitrogen leaf growth માટે, phosphorus roots માટે અને potassium fruit quality માટે ઉપયોગી છે.",
    pesticide:
      "Pesticide calm weather માં spray કરો. Mask/gloves પહેરો, label dose follow કરો અને rain પહેલાં spray avoid કરો.",
    marketplace:
      "Marketplace માં seeds, fertilizer, tools અને irrigation products મળે છે. Vendor products/equipment manage કરી શકે છે.",
    equipment:
      "Equipment Rental માં tractor, sprayer, pump, harvester અને tools book કરી શકો છો. Date, rent price અને condition check કરો.",
    login:
      "Login roles Farmer, Vendor, User અને Admin છે. Login પછી role પ્રમાણે useful pages દેખાય છે.",
    project:
      "આ project માં landing page, role login, dashboard, weather alerts, marketplace, disease upload, equipment rental, expert consultation અને chatbot છે.",
    contact: "Developer links footer માં છે: LinkedIn, GitHub અને Gmail.",
    remote:
      "Remote device control demo IoT idea છે: sensor status/distance detect કરે છે અને relay થી pump ON/OFF થઈ શકે છે.",
    fallback:
      "હું મદદ કરી શકું છું. Topic clear લખો: crop, weather, disease, irrigation, soil, fertilizer, marketplace, equipment, login, admin, vendor, farmer અથવા project design.",
  },
  mr: {
    greeting:
      "नमस्कार! मी Smart Farmer AI आहे. मी पीक, हवामान, सिंचन, रोग, उपकरणे, मार्केटप्लेस, लॉगिन आणि प्रोजेक्ट नेव्हिगेशनमध्ये मदत करू शकतो.",
    weather:
      "Weather page उघडा. तिथे live city weather, AQI, warning, danger alert, success popup आणि farming advice मिळते. पाऊस, जोराचा वारा किंवा poor AQI मध्ये spray टाळा.",
    disease:
      "पीक रोगासाठी Disease Upload page उघडा आणि clear leaf photo upload करा. spots, yellowing, leaf curl, powder किंवा rot symptoms check करा.",
    irrigation:
      "सिंचनासाठी सकाळी लवकर किंवा संध्याकाळ best आहे. माती 2-3 cm खाली कोरडी असेल तर हलके सिंचन करा. पावसात over-watering टाळा.",
    crop: "पीक season आणि area वर depend करते: winter मध्ये wheat/mustard, monsoon मध्ये paddy/maize, dry area मध्ये cotton/groundnut, irrigation असेल तर vegetables.",
    soil: "Fertilizer planning आधी soil testing करा. Compost ने organic matter वाढवा आणि urea जास्त वापरू नका.",
    fertilizer:
      "Compost soil health साठी, nitrogen leaf growth साठी, phosphorus roots साठी आणि potassium fruit quality साठी उपयोगी आहे.",
    pesticide:
      "Pesticide calm weather मध्ये spray करा. Mask/gloves वापरा, label dose follow करा आणि rain आधी spray टाळा.",
    marketplace:
      "Marketplace मध्ये seeds, fertilizer, tools आणि irrigation products मिळतात. Vendor products/equipment manage करू शकतो.",
    equipment:
      "Equipment Rental मध्ये tractor, sprayer, pump, harvester आणि tools book करू शकता. Date, rent price आणि condition check करा.",
    login:
      "Login roles Farmer, Vendor, User आणि Admin आहेत. Login नंतर role प्रमाणे useful pages दिसतात.",
    project:
      "या project मध्ये landing page, role login, dashboard, weather alerts, marketplace, disease upload, equipment rental, expert consultation आणि chatbot आहे.",
    contact: "Developer links footer मध्ये आहेत: LinkedIn, GitHub आणि Gmail.",
    remote:
      "Remote device control demo IoT idea आहे: sensor status/distance detect करतो आणि relay ने pump ON/OFF करता येतो.",
    fallback:
      "मी मदत करू शकतो. Topic clear लिहा: crop, weather, disease, irrigation, soil, fertilizer, marketplace, equipment, login, admin, vendor, farmer किंवा project design.",
  },
};

function getLanguage() {
  return localStorage.getItem("smartFarmerLanguage") || "en";
}

function setElementText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

function setButtonText(id, iconClass, text) {
  const element = document.getElementById(id);
  if (element)
    element.innerHTML = `<i class="fa-solid ${iconClass}"></i> ${text}`;
}

function applyLanguage() {
  const language = getLanguage();
  const text = translations[language] || translations.en;

  if (languageSelect) languageSelect.value = language;
  document.documentElement.lang = language;
  setElementText("heroTitle", text.heroTitle);
  setElementText("heroText", text.heroText);
  setButtonText("marketBtn", "fa-store", text.marketBtn);
  setButtonText("weatherBtn", "fa-cloud-sun", text.weatherBtn);
  setElementText("farmToolsTitle", text.farmToolsTitle);
  setElementText("expertHelpLink", text.expertHelpLink);
  setElementText("recommendedTitle", text.recommendedTitle);
  setElementText("projectModulesTitle", text.projectModulesTitle);
  setElementText("footerTitle", text.footerTitle);
  setElementText("footerText", text.footerText);

  if (chatTitle)
    chatTitle.innerHTML = `<i class="fa-solid fa-seedling"></i> ${text.chatTitle}`;
  if (userInput) userInput.placeholder = text.chatPlaceholder;
  if (sendBtn) sendBtn.textContent = text.send;
  if (welcomeMessage) welcomeMessage.textContent = text.chatWelcome;
}

function renderThemeIcon() {
  if (!themeBtn) return;
  const isDark = document.body.classList.contains("dark-mode");
  themeBtn.innerHTML = `<i class="fa-solid ${isDark ? "fa-sun" : "fa-moon"}"></i><span>${isDark ? "Light" : "Theme"}</span>`;
}

function setupTheme() {
  if (localStorage.getItem("smartFarmerTheme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  renderThemeIcon();

  if (!themeBtn) return;
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "smartFarmerTheme",
      document.body.classList.contains("dark-mode") ? "dark" : "light",
    );
    renderThemeIcon();
  });
}

function renderSidebarProfile() {
  const userName = document.getElementById("sidebarUserName");
  const userRole = document.getElementById("sidebarUserRole");
  if (!userName || !userRole) return;
  const role = localStorage.getItem("smartFarmerRole") || sessionStorage.getItem("smartFarmerRole") || "farmer";
  const name = localStorage.getItem("smartFarmerName") || sessionStorage.getItem("smartFarmerName") || "Smart Farmer";
  const roleLabels = { farmer: "Farmer Panel", vendor: "Vendor Panel", user: "User Panel", admin: "Admin Control" };
  userName.textContent = name;
  userRole.textContent = roleLabels[role] || "AI Dashboard";
}
function setupSidebarToggle() {
  if (!sidebarToggle) return;

  function render() {
    const isCollapsed = document.body.classList.contains("sidebar-collapsed");
    sidebarToggle.innerHTML = `<i class="fa-solid ${isCollapsed ? "fa-angles-right" : "fa-bars-staggered"}"></i><span>${isCollapsed ? "Open" : "Menu"}</span>`;
  }

  if (localStorage.getItem("smartSidebarCollapsed") === "yes") {
    document.body.classList.add("sidebar-collapsed");
  }
  render();

  sidebarToggle.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-collapsed");
    localStorage.setItem(
      "smartSidebarCollapsed",
      document.body.classList.contains("sidebar-collapsed") ? "yes" : "no",
    );
    render();
  });
}

function setupLanguageSwitcher() {
  if (!languageSelect) return;
  languageSelect.value = getLanguage();
  languageSelect.addEventListener("change", () => {
    localStorage.setItem("smartFarmerLanguage", languageSelect.value);
    applyLanguage();
    addMessage(botReplies[getLanguage()].greeting, "bot");
  });
}

function openChat() {
  if (!chatBox) return;
  chatBox.style.display = "block";
  if (window.location.protocol === "file:") {
    addMessage(
      "AI API ab localhost server se connect hoga. Agar answer na aaye to START_SMART_FARMER.bat double-click karo, phir chatbot use karo.",
      "bot",
    );
  }
  if (userInput) userInput.focus();
}

function closeChatBox() {
  if (chatBox) chatBox.style.display = "none";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatInlineChatText(value) {
  return escapeHtml(value)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function formatChatText(text) {
  const lines = String(text || "").split(/\r?\n/);
  const html = [];
  let listOpen = false;

  function closeList() {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  }

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      return;
    }

    const heading = trimmed.match(/^#{1,3}\s+(.+)/);
    if (heading) {
      closeList();
      html.push(`<h4>${formatInlineChatText(heading[1])}</h4>`);
      return;
    }

    const bullet = trimmed.match(/^(?:[-*•]|\d+[.)])\s+(.+)/);
    if (bullet) {
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${formatInlineChatText(bullet[1])}</li>`);
      return;
    }

    closeList();
    html.push(`<p>${formatInlineChatText(trimmed)}</p>`);
  });

  closeList();
  return html.join("");
}
function getStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch (error) {
    return [];
  }
}

function formatMoney(value) {
  return `Rs ${Number(value || 0).toLocaleString("en-IN")}`;
}

function getRole() {
  return (
    localStorage.getItem("smartFarmerRole") ||
    sessionStorage.getItem("smartFarmerRole") ||
    "farmer"
  );
}

function getProjectSnapshot() {
  const cart = getStoredArray("smartFarmerCart");
  const orders = getStoredArray("smartFarmerOrders");
  const bookings = getStoredArray("smartEquipmentBookings");
  const bills = getStoredArray("smartRentalBills");
  const role = getRole();
  const city = localStorage.getItem("weatherCity") || "Ahmedabad";
  const deviceOn = localStorage.getItem("smartDeviceState") === "on";

  return { cart, orders, bookings, bills, role, city, deviceOn };
}

function formatChatTime(dateValue = new Date()) {
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function setChatStatus(text, state = "ready") {
  if (!chatStatus) return;
  chatStatus.className = `chat-status ${state}`;
  chatStatus.innerHTML = `<span></span> ${escapeHtml(text)}`;
}

function getLastUserMessage() {
  return localStorage.getItem("smartChatLastQuestion") || "";
}
function saveChatMessage(text, type, source = "") {
  if (!text || type === "typing") return;
  const history = getStoredArray("smartChatHistory");
  history.push({ text, type, source, time: new Date().toISOString() });
  localStorage.setItem("smartChatHistory", JSON.stringify(history.slice(-50)));
}

function addMessage(text, type, shouldSave = true, source = "") {
  if (!chatBody) return;
  const div = document.createElement("div");
  div.className = `message ${type}-message`;

  if (type === "bot") {
    const badge =
      source === "api" ? "AI" : source === "local" ? "Local" : "Smart Farmer";
    div.innerHTML = `
      <div class="message-content">${formatChatText(text)}</div>
      <div class="message-meta">
        <span>${badge} · ${formatChatTime()}</span>
        <button type="button" class="copy-message" title="Copy answer" aria-label="Copy answer">
          <i class="fa-solid fa-copy"></i>
        </button>
      </div>
    `;
    div.dataset.copy = text;
  } else {
    div.textContent = text;
    const meta = document.createElement("small");
    meta.className = "message-time";
    meta.textContent = formatChatTime();
    div.appendChild(meta);
  }

  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
  if (shouldSave) saveChatMessage(text, type, source);
}

function loadChatHistory() {
  if (!chatBody) return;
  const history = getStoredArray("smartChatHistory");
  if (!history.length) return;
  chatBody.innerHTML = "";
  history.forEach((item) =>
    addMessage(item.text, item.type || "bot", false, item.source || ""),
  );
}

function clearChatHistory() {
  if (!chatBody) return;
  localStorage.removeItem("smartChatHistory");
  chatBody.innerHTML = "";
  addMessage(
    (translations[getLanguage()] || translations.en).chatWelcome,
    "bot",
  );
}

function renderQuickQuestions() {
  if (!quickQuestions) return;
  const questions = [
    ["Weather alert", "city weather alert danger success"],
    ["My orders", "show my marketplace orders"],
    ["Rental bills", "show my rental bill and booking"],
    ["Payment help", "upi scanner payment help"],
    ["Disease help", "crop disease leaf spots help"],
    ["Login roles", "farmer vendor user admin username password"],
  ];
  quickQuestions.innerHTML = questions
    .map(
      ([label, question]) =>
        `<button type="button" data-question="${question}">${label}</button>`,
    )
    .join("");
}

function showTyping() {
  if (!chatBody) return;
  removeTyping();
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.id = "typing";
  typing.innerHTML = "<span></span><span></span><span></span>";
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = languageVoiceMap[getLanguage()] || "en-IN";
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}

function includesAny(message, words) {
  return words.some((word) => message.includes(word));
}

function summarizeCart(snapshot) {
  if (!snapshot.cart.length) {
    return "Cart abhi empty hai. Marketplace page me product ke Add to Cart button se item add karo, phir checkout me UPI/COD payment kar sakte ho.";
  }
  const total = snapshot.cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1),
    0,
  );
  const itemNames = snapshot.cart
    .slice(0, 4)
    .map((item) => `${item.name || "Item"} x${item.qty || 1}`)
    .join(", ");
  return `Cart me ${snapshot.cart.length} product hai: ${itemNames}. Estimated total ${formatMoney(total)}. Checkout ke liye marketplace.html open karo.`;
}

function summarizeOrders(snapshot) {
  if (!snapshot.orders.length) {
    return "Abhi koi marketplace order saved nahi hai. Marketplace me cart add karke checkout complete karoge to order yaha track hoga.";
  }
  const latest = snapshot.orders[0];
  const total = latest.total || latest.subtotal || 0;
  return `Latest order: ${latest.orderId || "Order"}. Items: ${(latest.items || []).length || "multiple"}. Amount: ${formatMoney(total)}. Method: ${(latest.method || "payment").toUpperCase()}. Status: ${latest.status || "Placed"}.`;
}

function summarizeRental(snapshot) {
  if (snapshot.bills.length) {
    const bill = snapshot.bills[0];
    return `Latest rental bill ${bill.billId || "saved"}: ${bill.equipmentName || "equipment"}, booking ${bill.bookingId || "ID"}, total ${formatMoney(bill.total)}, case ${bill.statusText || "Normal rental case"}, payment ${bill.paymentStatus || "Pending"}.`;
  }
  if (snapshot.bookings.length) {
    const booking = snapshot.bookings[0];
    return `Latest equipment booking: ${booking.id || "Booking"} for ${booking.name || "equipment"} at ${booking.place || "selected location"}. Rent ${formatMoney(booking.price)}/day. Open equipmentbilling.html to create bill, deposit, late/damage case.`;
  }
  return "Abhi koi equipment booking ya rental bill saved nahi hai. Equipment Rental page me Book Now dabao, phir Rental Billing page bill create karega.";
}

function getCredentialReply() {
  return "Login credentials: farmer/farmer123, vendor/vendor123, user/user123, admin/admin123. Old admin login admin/1234 bhi accepted hai. Login ke baad role ke hisaab se dashboard aur pages dikhte hain.";
}

function getWeatherProjectReply(snapshot) {
  const status = snapshot.deviceOn ? "ON" : "OFF";
  return `${snapshot.city} weather page city ke hisaab se success, warning aur danger popup show karta hai. Farm score me pump/device ${status} hai. Rain, strong wind, low visibility, high AQI ya heat ho to spraying avoid karo aur irrigation carefully plan karo.`;
}

function getDatabaseReply() {
  return "Database ke liye smart_farmer_database.sql file ready hai. Usme users/roles, products, orders, equipment bookings, rental bills, weather alerts, disease reports aur consultation tables ka structure hai. Static demo localStorage use karta hai; backend add karne par SQL database connect ho sakta hai.";
}
function buildApiPayload(message) {
  return {
    message,
    language: getLanguage(),
    context: getProjectSnapshot(),
    history: getStoredArray("smartChatHistory").slice(-10),
  };
}

async function getApiBotReply(message) {
  const response = await fetch(CHAT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildApiPayload(message)),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Chat API unavailable");
  }

  if (!data.answer) throw new Error("Empty AI answer");
  return data.answer;
}

function getBotReply(message) {
  const msg = message.toLowerCase().trim();
  const replies = botReplies[getLanguage()] || botReplies.en;
  const snapshot = getProjectSnapshot();

  if (
    includesAny(msg, [
      "hello",
      "hi",
      "hey",
      "namaste",
      "नमस्ते",
      "kem cho",
      "કેમ",
      "नमस्कार",
    ])
  )
    return replies.greeting;
  if (
    includesAny(msg, [
      "credential",
      "username",
      "password",
      "login",
      "role",
      "farmer",
      "vendor",
      "admin",
      "user",
      "लॉगिन",
    ])
  )
    return getCredentialReply();
  if (
    includesAny(msg, [
      "my order",
      "orders",
      "order status",
      "transaction",
      "payment status",
      "market order",
    ])
  )
    return summarizeOrders(snapshot);
  if (includesAny(msg, ["cart", "basket", "selected product"]))
    return summarizeCart(snapshot);
  if (
    includesAny(msg, [
      "rental bill",
      "bill",
      "billing",
      "booking",
      "damage",
      "late",
      "deposit",
      "lost",
      "equipment booking",
    ])
  )
    return summarizeRental(snapshot);
  if (
    includesAny(msg, ["upi", "qr", "scanner", "scan", "payment", "cod", "pay"])
  )
    return "Payment flow ready hai: Marketplace checkout me UPI QR scanner aur COD option hai. UPI choose karne par QR scan karo, confirm payment dabao, aur order localStorage me save ho jayega.";
  if (includesAny(msg, ["database", "sql", "table", "backend", "mysql", "php"]))
    return getDatabaseReply();
  if (
    includesAny(msg, [
      "weather",
      "mausam",
      "मौसम",
      "હવામાન",
      "हवामान",
      "rain",
      "aqi",
      "alert",
      "warning",
      "danger",
      "success",
    ])
  )
    return getWeatherProjectReply(snapshot);
  if (
    includesAny(msg, [
      "remote",
      "device",
      "switch",
      "on",
      "off",
      "iot",
      "relay",
      "automatic",
      "distance",
      "pump",
    ])
  )
    return `Remote device demo me pump abhi ${snapshot.deviceOn ? "ON" : "OFF"} hai. Real project me distance/sensor data backend ko jayega, backend relay module ko ON/OFF command bhejega, aur dashboard status update karega.`;
  if (
    includesAny(msg, [
      "language",
      "hindi",
      "english",
      "gujarati",
      "marathi",
      "भाषा",
    ])
  )
    return "Language selector sidebar me hai: Hindi, English, Gujarati, Marathi. UI text switch hota hai aur chatbot voice input selected language ke hisaab se set hota hai.";
  if (
    includesAny(msg, [
      "disease",
      "रोग",
      "બીમારી",
      "leaf",
      "spot",
      "yellow",
      "curl",
      "fungal",
    ])
  )
    return replies.disease;
  if (
    includesAny(msg, [
      "irrigation",
      "water",
      "pani",
      "पानी",
      "सिंचाई",
      "સિંચાઈ",
      "सिंचन",
    ])
  )
    return replies.irrigation;
  if (
    includesAny(msg, [
      "crop",
      "फसल",
      "પાક",
      "पीक",
      "wheat",
      "rice",
      "cotton",
      "maize",
      "paddy",
      "vegetable",
    ])
  )
    return replies.crop;
  if (includesAny(msg, ["soil", "मिट्टी", "માટી", "माती", "ph", "test"]))
    return replies.soil;
  if (
    includesAny(msg, [
      "fertilizer",
      "urea",
      "npk",
      "compost",
      "खाद",
      "ખાતર",
      "खत",
    ])
  )
    return replies.fertilizer;
  if (
    includesAny(msg, [
      "pesticide",
      "spray",
      "chemical",
      "कीटनाशक",
      "દવા",
      "औषध",
    ])
  )
    return replies.pesticide;
  if (
    includesAny(msg, [
      "market",
      "marketplace",
      "price",
      "buy",
      "sell",
      "vendor",
      "मार्केट",
      "બજાર",
    ])
  )
    return replies.marketplace;
  if (
    includesAny(msg, [
      "equipment",
      "tractor",
      "rental",
      "rent",
      "sprayer",
      "harvester",
      "tool",
      "उपकरण",
      "સાધન",
      "उपकरणे",
    ])
  )
    return replies.equipment;
  if (
    includesAny(msg, [
      "project",
      "page",
      "dashboard",
      "sidebar",
      "chatbot",
      "design",
      "navigation",
      "प्रोजेक्ट",
    ])
  )
    return `${replies.project} Current role: ${snapshot.role}. Main pages: index.html, login.html, main.html, marketplace.html, weather.html, diseaseupload.html, eqipmentrental.html, equipmentbilling.html, expertconsulation.html.`;
  if (
    includesAny(msg, [
      "linkedin",
      "github",
      "gmail",
      "email",
      "contact",
      "profile",
    ])
  )
    return replies.contact;

  if (
    msg.endsWith("?") ||
    msg.startsWith("what") ||
    msg.startsWith("how") ||
    msg.startsWith("why") ||
    msg.startsWith("kaise") ||
    msg.startsWith("kya")
  ) {
    return `Short answer: ${replies.fallback} Aap mujhe orders, cart, rental bill, UPI scanner, weather alert, disease, irrigation, login password, database ya dashboard ke baare me puch sakte ho.`;
  }

  return `Mujhe topic thoda clear batao. Main project ke orders/cart/rental bill/payment/weather/login/database ke live saved data se answer de sakta hoon. Example: "my orders", "rental bill", "UPI scanner", "weather alert", "login password".`;
}

async function sendMessage() {
  if (!userInput) return;
  const userText = userInput.value.trim();
  if (!userText) return;

  localStorage.setItem("smartChatLastQuestion", userText);
  addMessage(userText, "user");
  userInput.value = "";
  if (sendBtn) sendBtn.disabled = true;
  setChatStatus("AI thinking about your farm question...", "thinking");
  showTyping();

  try {
    const reply = await getApiBotReply(userText);
    removeTyping();
    addMessage(reply, "bot", true, "api");
    setChatStatus("AI connected · answer ready", "ready");
    speak(reply);
  } catch (error) {
    removeTyping();
    const reply = getBotReply(userText);
    addMessage(
      `${reply}\n\nAPI status: ${error.message}. Local fallback answer shown. START_SMART_FARMER.bat run karo ya http://smartfarmer:2005/Dashboard/main.html open karo.`,
      "bot",
      true,
      "local",
    );
    setChatStatus("Local fallback active · API not connected", "error");
    speak(reply);
  } finally {
    if (sendBtn) sendBtn.disabled = false;
  }
}

function regenerateLastAnswer() {
  const lastQuestion = getLastUserMessage();
  if (!lastQuestion) {
    addMessage(
      "Regenerate ke liye pehle koi farmer question pucho.",
      "bot",
      true,
      "local",
    );
    return;
  }
  if (userInput) userInput.value = lastQuestion;
  sendMessage();
}

function setupChatbot() {
  renderQuickQuestions();
  loadChatHistory();

  if (chatIcon) chatIcon.addEventListener("click", openChat);
  if (closeChat) closeChat.addEventListener("click", closeChatBox);
  if (clearChat) clearChat.addEventListener("click", clearChatHistory);
  if (sendBtn) sendBtn.addEventListener("click", sendMessage);
  if (chatBody) {
    chatBody.addEventListener("click", async (event) => {
      const button = event.target.closest(".copy-message");
      if (!button) return;
      const message = button.closest(".message");
      const text = message ? message.dataset.copy || "" : "";
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        button.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(
          () => (button.innerHTML = '<i class="fa-solid fa-copy"></i>'),
          1100,
        );
      } catch (error) {
        setChatStatus("Copy not supported in this browser", "error");
      }
    });
  }
  if (quickQuestions) {
    quickQuestions.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-question]");
      if (!button || !userInput) return;
      userInput.value = button.dataset.question;
      openChat();
      sendMessage();
    });
  }
  if (userInput) {
    userInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") sendMessage();
    });
  }

  if (voiceBtn) {
    voiceBtn.addEventListener("click", () => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        addMessage(
          "Voice input is not supported in this browser.",
          "bot",
          true,
          "local",
        );
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = languageVoiceMap[getLanguage()] || "en-IN";
      recognition.start();
      recognition.onresult = (event) => {
        userInput.value = event.results[0][0].transcript;
        sendMessage();
      };
    });
  }
}
function clampScore(value) {
  return Math.max(45, Math.min(99, Math.round(value)));
}

function getFarmScoreStatus(score) {
  if (score >= 85)
    return { label: "Excellent", color: "#22c55e", icon: "fa-circle-check" };
  if (score >= 72)
    return { label: "Good", color: "#f59e0b", icon: "fa-circle-check" };
  if (score >= 58)
    return {
      label: "Warning",
      color: "#f97316",
      icon: "fa-triangle-exclamation",
    };
  return { label: "Danger", color: "#ef4444", icon: "fa-circle-exclamation" };
}

function calculateFarmScore() {
  const distanceRange = document.getElementById("distanceRange");
  const role =
    localStorage.getItem("smartFarmerRole") ||
    sessionStorage.getItem("smartFarmerRole") ||
    "farmer";
  const city = localStorage.getItem("weatherCity") || "Ahmedabad";
  const deviceOn = localStorage.getItem("smartDeviceState") === "on";
  const distance = distanceRange ? Number(distanceRange.value) : 65;
  const hour = new Date().getHours();

  let score = 82;
  if (role === "admin") score += 4;
  if (role === "vendor") score += 2;
  if (deviceOn) score += 5;
  if (distance > 70 && !deviceOn) score -= 9;
  if (distance < 35) score += 4;
  if (hour >= 11 && hour <= 16) score -= 4;
  if (["Mumbai", "Kolkata", "Chennai", "Surat"].includes(city)) score -= 2;
  if (["Pune", "Bangalore", "Ranchi"].includes(city)) score += 2;

  const dayVariation = new Date().getDate() % 5;
  score += dayVariation;

  return clampScore(score);
}

function renderFarmScore() {
  const scoreValue = document.getElementById("farmScoreValue");
  const scoreRing = document.getElementById("farmScoreRing");
  const scoreLabel = document.getElementById("farmScoreLabel");
  const scoreList = document.getElementById("farmScoreList");
  if (!scoreValue || !scoreRing || !scoreLabel || !scoreList) return;

  const score = calculateFarmScore();
  const status = getFarmScoreStatus(score);
  const city = localStorage.getItem("weatherCity") || "Ahmedabad";
  const deviceOn = localStorage.getItem("smartDeviceState") === "on";
  const distanceRange = document.getElementById("distanceRange");
  const distance = distanceRange ? Number(distanceRange.value) : 65;
  const marketplaceCount = document.querySelectorAll(".feature-card").length;

  scoreValue.textContent = `${score}%`;
  scoreValue.classList.add("score-pop");
  setTimeout(() => scoreValue.classList.remove("score-pop"), 260);
  scoreRing.style.setProperty("--score", score);
  scoreRing.style.setProperty("--score-color", status.color);
  scoreLabel.textContent = status.label;

  const distanceClass = distance > 70 && !deviceOn ? "warning" : "";
  const deviceClass = deviceOn ? "" : "warning";
  const healthClass = score < 60 ? "danger" : score < 75 ? "warning" : "";

  scoreList.innerHTML = `
    <p class="${healthClass}"><i class="fa-solid ${status.icon}"></i> ${city} farm score updated just now</p>
    <p><i class="fa-solid fa-store"></i> ${marketplaceCount} project modules ready</p>
    <p class="${deviceClass}"><i class="fa-solid fa-power-off"></i> Pump is ${deviceOn ? "ON and controlled" : "OFF, switch on if irrigation needed"}</p>
    <p class="${distanceClass}"><i class="fa-solid fa-location-dot"></i> Field distance: ${distance} km</p>
  `;
}

function setupFarmScore() {
  const refresh = document.getElementById("farmScoreRefresh");
  if (refresh) {
    refresh.addEventListener("click", () => {
      refresh.classList.add("updating");
      renderFarmScore();
      setTimeout(() => refresh.classList.remove("updating"), 650);
    });
  }
  renderFarmScore();
}
function renderRoleDashboard() {
  const roleTitle = document.getElementById("roleTitle");
  const roleDescription = document.getElementById("roleDescription");
  const roleActions = document.getElementById("roleActions");
  if (!roleTitle || !roleDescription || !roleActions) return;

  const role =
    localStorage.getItem("smartFarmerRole") ||
    sessionStorage.getItem("smartFarmerRole") ||
    "farmer";
  const name =
    localStorage.getItem("smartFarmerName") ||
    sessionStorage.getItem("smartFarmerName") ||
    "Farmer";
  const dashboards = {
    farmer: {
      title: `Farmer Dashboard - ${name}`,
      description:
        "Track crops, weather, disease reports and equipment bookings.",
      actions: [
        ["Weather Advisory", "../Weather/weather.html"],
        ["Disease Upload", "../Services/diseaseupload.html"],
        ["Rent Equipment", "../Services/eqipmentrental.html"],
        ["Talk to Expert", "../Services/expertconsulation.html"],
      ],
    },
    vendor: {
      title: `Vendor Dashboard - ${name}`,
      description: "Manage products, rentals and marketplace orders.",
      actions: [
        ["Marketplace", "../Marketplace/marketplace.html"],
        ["Equipment", "../Services/eqipmentrental.html"],
        ["Expert Help", "../Services/expertconsulation.html"],
      ],
    },
    user: {
      title: `User Dashboard - ${name}`,
      description: "Browse smart farming services and weather.",
      actions: [
        ["Browse Market", "../Marketplace/marketplace.html"],
        ["Check Weather", "../Weather/weather.html"],
        ["Book Expert", "../Services/expertconsulation.html"],
      ],
    },
    admin: {
      title: `Admin Dashboard - ${name}`,
      description: "Monitor users, marketplace and platform modules.",
      actions: [
        ["Review Market", "../Marketplace/marketplace.html"],
        ["Weather Module", "../Weather/weather.html"],
        ["Disease Module", "../Services/diseaseupload.html"],
      ],
    },
  };

  const current = dashboards[role] || dashboards.farmer;
  roleTitle.textContent = current.title;
  roleDescription.textContent = current.description;
  roleActions.innerHTML = current.actions
    .map(
      ([label, href]) =>
        `<a href="${href}"><i class="fa-solid fa-arrow-right"></i>${label}</a>`,
    )
    .join("");
}

function setupSmartDeviceControl() {
  const range = document.getElementById("distanceRange");
  const distanceText = document.getElementById("distanceText");
  const deviceStatus = document.getElementById("deviceStatus");
  const deviceToggle = document.getElementById("deviceToggle");
  if (!range || !distanceText || !deviceStatus || !deviceToggle) return;

  let isOn = localStorage.getItem("smartDeviceState") === "on";
  function renderDevice() {
    const distance = Number(range.value);
    distanceText.textContent = `Distance: ${distance} km`;
    deviceStatus.textContent = isOn ? "Pump is ON" : "Pump is OFF";
    deviceStatus.classList.toggle("on", isOn);
    deviceToggle.innerHTML = `<i class="fa-solid fa-power-off"></i>${isOn ? "Switch OFF" : "Switch ON"}`;
  }

  range.addEventListener("input", renderDevice);
  deviceToggle.addEventListener("click", () => {
    isOn = !isOn;
    localStorage.setItem("smartDeviceState", isOn ? "on" : "off");
    renderDevice();
  });
  renderDevice();
}

setupTheme();
setupSidebarToggle();
renderSidebarProfile();
setupLanguageSwitcher();
setupChatbot();
setupFarmScore();
renderRoleDashboard();
setupSmartDeviceControl();
applyLanguage();




