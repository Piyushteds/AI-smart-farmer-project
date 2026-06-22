const API_KEY = "6a1c0e4bd2b7cf7ed8697ae896b022fc";

const citySelect = document.getElementById("citySelect");
const mainTemp = document.getElementById("mainTemp");
const weatherStatus = document.getElementById("weatherStatus");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");
const sceneImage = document.getElementById("sceneImage");
const hourlyRow = document.getElementById("hourlyRow");
const weekRow = document.getElementById("weekRow");
const rain = document.getElementById("rain");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const airQuality = document.getElementById("airQuality");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const liveTime = document.getElementById("liveTime");
const celsiusBtn = document.getElementById("celsiusBtn");
const fahrenheitBtn = document.getElementById("fahrenheitBtn");
const statusBox = document.getElementById("statusBox");
const refreshBtn = document.getElementById("refreshBtn");
const locationName = document.getElementById("locationName");
const updatedAt = document.getElementById("updatedAt");
const forecastSummary = document.getElementById("forecastSummary");
const adviceTitle = document.getElementById("adviceTitle");
const adviceText = document.getElementById("adviceText");
const irrigationTag = document.getElementById("irrigationTag");
const sprayTag = document.getElementById("sprayTag");
const weatherAlertPanel = document.getElementById("weatherAlertPanel");
const weatherAlertIcon = document.getElementById("weatherAlertIcon");
const weatherAlertTitle = document.getElementById("weatherAlertTitle");
const weatherAlertText = document.getElementById("weatherAlertText");
const cropImage = document.getElementById("cropImage");
const cropImageTitle = document.getElementById("cropImageTitle");
const cropImageText = document.getElementById("cropImageText");
const actionImage = document.getElementById("actionImage");
const actionImageTitle = document.getElementById("actionImageTitle");
const actionImageText = document.getElementById("actionImageText");
const riskImage = document.getElementById("riskImage");
const riskImageTitle = document.getElementById("riskImageTitle");
const riskImageText = document.getElementById("riskImageText");
const cityWeatherTitle = document.getElementById("cityWeatherTitle");
const cityWeatherText = document.getElementById("cityWeatherText");
const citySafetyText = document.getElementById("citySafetyText");
const weatherGallery = document.getElementById("weatherGallery");

let currentUnit = localStorage.getItem("weatherUnit") || "metric";
let lastWeatherAlertKey = "";
const savedCity = localStorage.getItem("weatherCity");
if (savedCity) citySelect.value = savedCity;
const cityProfiles = {
  Ahmedabad: { crop: "cotton, groundnut aur cumin", note: "Dry heat me drip irrigation aur mulching par focus rakho." },
  Mumbai: { crop: "vegetables, flowers aur coastal crops", note: "Coastal humidity me fungal disease aur drainage ka risk jaldi badhta hai." },
  Delhi: { crop: "wheat, mustard aur vegetables", note: "Air quality aur temperature swing ko dhyan me rakhkar outdoor work plan karo." },
  Bangalore: { crop: "vegetables, flowers aur ragi", note: "Mild climate me leaf disease aur sudden shower dono par nazar rakho." },
  Chennai: { crop: "paddy, vegetables aur banana", note: "Humidity aur heat ke time water management ko priority do." },
  Kolkata: { crop: "paddy, jute aur vegetables", note: "High moisture me drainage aur fungal control important hai." },
  Hyderabad: { crop: "cotton, chilli aur pulses", note: "Heat aur dry wind me early morning irrigation best rahega." },
  Pune: { crop: "grapes, onion aur vegetables", note: "Grapes/vegetables ke liye humidity aur spray window carefully check karo." },
  Jaipur: { crop: "mustard, bajra aur cumin", note: "Dry wind me soil moisture bachane ke liye mulch aur drip useful hai." },
  Surat: { crop: "cotton, sugarcane aur vegetables", note: "Cloudy weather me pest aur water logging dono check karo." },
  Patna: { crop: "paddy, wheat aur maize", note: "Fog, humidity aur rain ke time disease monitoring zaruri hai." },
  Ranchi: { crop: "paddy, pulses aur vegetables", note: "Uneven rain me drainage channel aur soil moisture dono monitor karo." }
};

function unitSymbol() {
  return currentUnit === "metric" ? " C" : " F";
}

function windUnit() {
  return currentUnit === "metric" ? " m/s" : " mph";
}

function setStatus(message, type = "info") {
  statusBox.textContent = message;
  statusBox.classList.add("show");
  statusBox.style.background = type === "error" ? "#fef2f2" : "#fff7ed";
  statusBox.style.color = type === "error" ? "#991b1b" : "#9a3412";
}

function hideStatus() {
  statusBox.classList.remove("show");
}

function setLoading(isLoading) {
  document.body.classList.toggle("loading", isLoading);
  refreshBtn.disabled = isLoading;
}

function updateLiveTime() {
  const now = new Date();
  liveTime.textContent = now.toLocaleString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour24: true,
  });
}

function formatTime(unixSeconds, timezoneOffset) {
  const date = new Date((unixSeconds + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function getWeatherIcon(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function setActiveUnitButton() {
  celsiusBtn.classList.toggle("active", currentUnit === "metric");
  fahrenheitBtn.classList.toggle("active", currentUnit === "imperial");
}

function setWeatherScene(weatherData) {
  const weatherType = weatherData.weather[0].main;
  const iconCode = weatherData.weather[0].icon;
  weatherIcon.src = getWeatherIcon(iconCode);

  if (weatherType.includes("Rain")) {
    sceneImage.src =
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200";
  } else if (weatherType.includes("Cloud")) {
    sceneImage.src =
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200";
  } else if (weatherType.includes("Thunderstorm")) {
    sceneImage.src =
      "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1200";
  } else if (iconCode.includes("n")) {
    sceneImage.src =
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200";
  } else {
    sceneImage.src =
      "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1200";
  }
}

function getAQIText(aqi) {
  if (aqi === 1) return "Good";
  if (aqi === 2) return "Fair";
  if (aqi === 3) return "Moderate";
  if (aqi === 4) return "Poor";
  return "Very Poor";
}

function getWeatherInsight(weather, aqi) {
  const tempC =
    currentUnit === "metric"
      ? weather.main.temp
      : ((weather.main.temp - 32) * 5) / 9;
  const windMs =
    currentUnit === "metric"
      ? weather.wind.speed
      : weather.wind.speed * 0.44704;
  const humid = weather.main.humidity;
  const clouds = weather.clouds.all;
  const type = weather.weather[0].main;

  const base = {
    severity: "success",
    popupType: "success",
    icon: "fa-circle-check",
    title: "Success: Field work looks safe",
    message:
      "Weather stable hai. Normal irrigation, crop checking aur marketplace planning ke liye time achha hai.",
    cropTitle: "Healthy crop window",
    cropText:
      "Aaj ka weather routine crop inspection ke liye balanced lag raha hai. Soil moisture check karke light field work continue kar sakte ho.",
    actionTitle: "Continue normal work",
    actionText:
      "Morning ya evening me irrigation ka decision soil ke hisaab se lo. Spray karna ho toh wind aur humidity ek baar check kar lo.",
    riskTitle: "Low risk today",
    riskText:
      "Abhi koi strong danger signal nahi hai. Phir bhi leaf spots, pest movement aur water logging par nazar rakho.",
    cropImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900",
    actionImage:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=900",
    riskImage:
      "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=900",
  };

  if (type.includes("Thunderstorm")) {
    return {
      ...base,
      severity: "danger",
      popupType: "danger",
      icon: "fa-triangle-exclamation",
      title: "Danger: Thunderstorm alert",
      message:
        "Bijli aur tez baarish ka risk hai. Field work, spray aur equipment movement abhi avoid karo.",
      cropTitle: "Storm protection needed",
      cropText:
        "Standing crop aur nursery area ko storm se damage ho sakta hai. Loose covers, pipes aur tools secure rakho.",
      actionTitle: "Stop outdoor work",
      actionText:
        "Workers ko safe jagah par rakho, pump/electric switch ko dry area se operate karo, aur open field me rukna avoid karo.",
      riskTitle: "High danger level",
      riskText:
        "Lightning, water logging aur crop lodging ka risk high hai. Weather calm hone ke baad hi field inspection karo.",
      cropImage:
        "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=900",
      actionImage:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=900",
      riskImage:
        "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?auto=format&fit=crop&w=900",
    };
  }

  if (tempC >= 40 || windMs > 12 || aqi >= 5) {
    return {
      ...base,
      severity: "danger",
      popupType: "danger",
      icon: "fa-circle-exclamation",
      title: "Danger: Extreme weather risk",
      message:
        "Heat, wind ya air quality risky level par hai. Outdoor work short rakho aur safety gear use karo.",
      cropTitle: "Stress risk on crop",
      cropText:
        "High heat ya dry wind se leaves curl ho sakte hain. Mulching, shade net aur morning irrigation useful rahega.",
      actionTitle: "Protect workers and crop",
      actionText:
        "Afternoon me spray mat karo. Irrigation early morning me karo aur livestock/workers ko paani aur shade do.",
      riskTitle: "High safety risk",
      riskText:
        "AQI ya heat danger level par ho toh mask, cap aur breaks zaruri hain. Chemical spray drift bhi badh sakta hai.",
      cropImage:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900",
      actionImage:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900",
      riskImage:
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900",
    };
  }

  if (type.includes("Rain") || clouds > 85) {
    return {
      ...base,
      severity: "warning",
      popupType: "warning",
      icon: "fa-cloud-rain",
      title: "Warning: Rain chance is high",
      message:
        "Drainage open rakho. Pesticide spray aur extra irrigation abhi avoid karna better hai.",
      cropTitle: "Drainage focus",
      cropText:
        "Rain ke time root zone me extra water jama ho sakta hai. Field channels clean rakho aur low area inspect karo.",
      actionTitle: "Delay spray work",
      actionText:
        "Spray baarish me wash ho sakta hai. Fertilizer ya chemical apply karne se pehle next clear window ka wait karo.",
      riskTitle: "Water logging watch",
      riskText:
        "Cloudy aur wet weather fungal disease ko badha sakta hai. Leaves par spots aur stem rot signs check karo.",
      cropImage:
        "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=900",
      actionImage:
        "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=900",
      riskImage:
        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900",
    };
  }

  if (tempC >= 35) {
    return {
      ...base,
      severity: "warning",
      popupType: "warning",
      icon: "fa-temperature-high",
      title: "Alert: Heat stress possible",
      message:
        "Garmi zyada hai. Irrigation morning me karo aur afternoon spray avoid karo.",
      cropTitle: "Heat stress watch",
      cropText:
        "Seedling aur vegetable crops heat se jaldi stress me aa sakte hain. Soil moisture aur leaf wilting check karo.",
      actionTitle: "Morning irrigation best",
      actionText:
        "Early morning me paani dene se evaporation kam hota hai. Afternoon me heavy field work short rakho.",
      riskTitle: "Medium heat alert",
      riskText:
        "Workers ke liye water breaks zaruri hain. Spray droplets heat me jaldi evaporate ho sakte hain.",
      cropImage:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900",
      actionImage:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900",
      riskImage:
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900",
    };
  }

  if (humid > 78) {
    return {
      ...base,
      severity: "alert",
      popupType: "alert",
      icon: "fa-bug",
      title: "Alert: Humidity disease risk",
      message:
        "Humidity high hai. Fungal disease aur leaf spot ke signs regularly check karo.",
      cropTitle: "Fungal risk watch",
      cropText:
        "High humidity me leaves wet reh sakte hain. Crop spacing, airflow aur infected leaves removal par dhyan do.",
      actionTitle: "Spray carefully",
      actionText:
        "Need ho toh recommended fungicide ka use clear weather window me karo. Overhead watering avoid karo.",
      riskTitle: "Disease alert",
      riskText:
        "Early detection important hai. Disease upload page par photo upload karke quick check bhi kar sakte ho.",
      cropImage:
        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900",
      actionImage:
        "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=900",
      riskImage:
        "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=900",
    };
  }

  if (windMs > 8 || aqi >= 4) {
    return {
      ...base,
      severity: "alert",
      popupType: "alert",
      icon: "fa-wind",
      title: "Alert: Wind or air quality issue",
      message:
        "Spray drift ya dust exposure ka risk hai. Mask use karo aur spray ko hold par rakho.",
      cropTitle: "Wind drift control",
      cropText:
        "Strong wind chemical spray ko crop se hata sakti hai. Coverage poor hoga aur wastage badhega.",
      actionTitle: "Wait for calm weather",
      actionText:
        "Wind kam hone par spray karo. Air quality poor ho toh outdoor kaam me mask aur short shifts rakho.",
      riskTitle: "Moderate alert level",
      riskText:
        "Dust, smoke ya wind sensitive crops ko stress de sakte hain. Young plants ko support do.",
      cropImage:
        "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=900",
      actionImage:
        "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=900",
      riskImage:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=900",
    };
  }

  return base;
}

function updateWeatherAlert(insight) {
  weatherAlertPanel.className = `weather-alert-panel ${insight.severity}`;
  weatherAlertIcon.innerHTML = `<i class="fa-solid ${insight.icon}"></i>`;
  weatherAlertTitle.textContent = insight.title;
  weatherAlertText.textContent = insight.message;
}

function updateWeatherVisuals(insight) {
  cropImage.src = insight.cropImage;
  cropImageTitle.textContent = insight.cropTitle;
  cropImageText.textContent = insight.cropText;

  actionImage.src = insight.actionImage;
  actionImageTitle.textContent = insight.actionTitle;
  actionImageText.textContent = insight.actionText;

  riskImage.src = insight.riskImage;
  riskImageTitle.textContent = insight.riskTitle;
  riskImageText.textContent = insight.riskText;
}


function getCityProfile(city) {
  return cityProfiles[city] || {
    crop: "local crops",
    note: "Selected city ke live weather ke according irrigation, spray aur safety plan update karo."
  };
}

function updateCityWeatherCopy(weather, aqi, insight, selectedCity) {
  const city = selectedCity || weather.name;
  const profile = getCityProfile(city);
  const temp = Math.round(weather.main.temp);
  const clouds = weather.clouds.all;
  const windSpeed = Math.round(weather.wind.speed);
  const aqiText = getAQIText(aqi);

  cityWeatherTitle.textContent = `${city} weather: ${insight.title}`;
  cityWeatherText.textContent = `${city} me abhi ${temp}${unitSymbol()}, ${clouds}% cloud cover, wind ${windSpeed}${windUnit()} aur AQI ${aqiText} hai. Is area me ${profile.crop} common farming focus ho sakta hai. ${profile.note}`;
  citySafetyText.textContent = `Safety sentence: ${insight.message} Field team ko city weather ke hisaab se water, mask, shade aur spray timing ka decision lena chahiye.`;
}

function updateWeatherGallery(weather, aqi, insight, selectedCity) {
  const city = selectedCity || weather.name;
  const profile = getCityProfile(city);
  const temp = Math.round(weather.main.temp);
  const humid = weather.main.humidity;
  const windSpeed = Math.round(weather.wind.speed);
  const aqiText = getAQIText(aqi);
  const cards = [
    {
      label: "Irrigation",
      title: `${city} water plan`,
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=900",
      text: `${temp}${unitSymbol()} temperature me irrigation ko soil moisture ke saath match karo. ${insight.severity === "danger" ? "Heavy work avoid karo aur water stress check karo." : "Morning ya evening timing best rahega."}`
    },
    {
      label: "Spray",
      title: "Spray window",
      image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=900",
      text: `Wind ${windSpeed}${windUnit()} hai. Wind high ho ya rain signal ho toh pesticide/fungicide spray delay karo.`
    },
    {
      label: "Disease",
      title: "Disease watch",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900",
      text: `Humidity ${humid}% hai. Humidity high hone par ${profile.crop} me fungal spot, leaf curl aur pest activity check karo.`
    },
    {
      label: "Equipment",
      title: "Machine safety",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900",
      text: `${city} weather ${insight.severity} mode me hai. Tractor, pump aur electric switch ko wet area se door rakho.`
    },
    {
      label: "Market",
      title: "Harvest decision",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900",
      text: `Weather stable ho toh harvesting aur market transport plan karo. Rain/wind warning me produce ko covered storage me rakho.`
    },
    {
      label: "Worker Safety",
      title: "Field team care",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900",
      text: `AQI ${aqiText} hai. Heat, dust ya bad air quality me mask, cap, drinking water aur short breaks zaruri hain.`
    }
  ];

  weatherGallery.innerHTML = cards.map((card) => `
    <article class="gallery-card">
      <img src="${card.image}" alt="${card.title}">
      <div>
        <span>${card.label}</span>
        <h3>${card.title}</h3>
        <p>${card.text}</p>
      </div>
    </article>
  `).join("");
}
function showWeatherPopup(insight, city) {
  const key = `${city}-${insight.severity}-${insight.title}`;
  if (lastWeatherAlertKey === key) return;
  lastWeatherAlertKey = key;

  if (typeof window.showSmartPopup === "function") {
    window.showSmartPopup(insight.popupType, `${city}: ${insight.title}`, insight.message);
    return;
  }

  window.alert(`${city}: ${insight.title}\n${insight.message}`);
}

function updateFarmAdvice(weather, aqi, insight) {
  const temp = weather.main.temp;
  const humid = weather.main.humidity;
  const clouds = weather.clouds.all;
  const windSpeed = weather.wind.speed;
  const type = weather.weather[0].main;

  let title = "Good day for field monitoring";
  let advice =
    "Check soil moisture before irrigation and inspect crop leaves for early stress signs.";
  let irrigation = "Normal";
  let spray = "Allowed";

  if (type.includes("Rain") || clouds > 80) {
    title = "Rain chance is high";
    advice =
      "Delay pesticide spray and avoid over-irrigation. Make sure drainage paths are open.";
    irrigation = "Skip";
    spray = "Avoid";
  } else if (temp >= (currentUnit === "metric" ? 35 : 95)) {
    title = "Heat stress possible";
    advice =
      "Prefer early morning irrigation and avoid spraying during afternoon heat.";
    irrigation = "Morning";
    spray = "Morning only";
  } else if (humid > 78) {
    title = "Humidity is high";
    advice =
      "Watch for fungal disease. Keep spacing and airflow around crops where possible.";
    irrigation = "Light";
    spray = "Careful";
  } else if (windSpeed > (currentUnit === "metric" ? 8 : 18)) {
    title = "Wind is strong";
    advice =
      "Avoid spraying now because wind can waste chemicals and reduce coverage.";
    irrigation = "Normal";
    spray = "Avoid";
  }

  if (aqi >= 4) {
    advice += " Air quality is poor, so use a mask during outdoor work.";
  }

  advice += ` ${insight.riskText}`;
  adviceTitle.textContent = title;
  adviceText.textContent = advice;
  irrigationTag.textContent = `Irrigation: ${irrigation}`;
  sprayTag.textContent = `Spray: ${spray}`;
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  const data = await response.json();
  if (data.cod && String(data.cod) !== "200")
    throw new Error(data.message || "Weather data unavailable");
  return data;
}

function renderHourly(forecast) {
  hourlyRow.innerHTML = forecast.list
    .slice(0, 8)
    .map((item) => {
      const time = new Date(item.dt_txt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour24: true,
      });
      return `
      <div class="hour-card">
        <h3>${Math.round(item.main.temp)}${unitSymbol()}</h3>
        <img src="${getWeatherIcon(item.weather[0].icon)}" alt="${item.weather[0].main}">
        <p>${time}</p>
        <span class="mini">${item.weather[0].main}</span>
      </div>
    `;
    })
    .join("");
}

function renderWeek(forecast) {
  const daily = forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5);
  weekRow.innerHTML = daily
    .map((item) => {
      const day = new Date(item.dt_txt).toLocaleDateString("en-IN", {
        weekday: "short",
      });
      return `
      <div class="day-card">
        <h3>${day}</h3>
        <img src="${getWeatherIcon(item.weather[0].icon)}" alt="${item.weather[0].main}">
        <p>${Math.round(item.main.temp)}${unitSymbol()}</p>
        <span class="mini">${item.weather[0].main}</span>
      </div>
    `;
    })
    .join("");

  const firstRain = forecast.list.find((item) =>
    item.weather[0].main.includes("Rain"),
  );
  forecastSummary.textContent = firstRain
    ? `Rain expected around ${new Date(firstRain.dt_txt).toLocaleString("en-IN", { weekday: "short", hour: "2-digit", hour24: true })}`
    : "No strong rain signal in the next forecast window.";
}

async function loadWeather(city) {
  try {
    setLoading(true);
    setStatus(`Fetching latest weather for ${city}...`);
    localStorage.setItem("weatherCity", city);

    const weather = await fetchJson(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=${currentUnit}&appid=${API_KEY}`,
    );
    locationName.textContent = `${weather.name}, ${weather.sys.country}`;
    mainTemp.textContent = `${Math.round(weather.main.temp)}${unitSymbol()}`;
    weatherStatus.textContent = weather.weather[0].description.replace(
      /\b\w/g,
      (letter) => letter.toUpperCase(),
    );
    feelsLike.textContent = `Feels like ${Math.round(weather.main.feels_like)}${unitSymbol()}`;
    rain.textContent = `${weather.clouds.all}%`;
    wind.textContent = `${Math.round(weather.wind.speed)}${windUnit()}`;
    humidity.textContent = `${weather.main.humidity}%`;
    pressure.textContent = `${weather.main.pressure} hPa`;
    visibility.textContent = `${(weather.visibility / 1000).toFixed(1)} km`;
    sunrise.textContent = formatTime(weather.sys.sunrise, weather.timezone);
    sunset.textContent = formatTime(weather.sys.sunset, weather.timezone);
    updatedAt.textContent = `Updated ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour24: true })}`;
    setWeatherScene(weather);

    const air = await fetchJson(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=${API_KEY}`,
    );
    const aqi = air.list[0].main.aqi;
    const insight = getWeatherInsight(weather, aqi);
    airQuality.textContent = getAQIText(aqi);
    updateFarmAdvice(weather, aqi, insight);
    updateWeatherAlert(insight);
    updateWeatherVisuals(insight);
    updateCityWeatherCopy(weather, aqi, insight, city);
    updateWeatherGallery(weather, aqi, insight, city);
    showWeatherPopup(insight, city);

    const forecast = await fetchJson(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&units=${currentUnit}&appid=${API_KEY}`,
    );
    renderHourly(forecast);
    renderWeek(forecast);
    hideStatus();
  } catch (error) {
    console.error(error);
    setStatus(
      "Weather data could not load. Check internet/API key and try again.",
      "error",
    );
  } finally {
    setLoading(false);
  }
}

citySelect.addEventListener("change", () => loadWeather(citySelect.value));
refreshBtn.addEventListener("click", () => {
  lastWeatherAlertKey = "";
  loadWeather(citySelect.value);
});
celsiusBtn.addEventListener("click", () => {
  currentUnit = "metric";
  localStorage.setItem("weatherUnit", currentUnit);
  setActiveUnitButton();
  lastWeatherAlertKey = "";
  loadWeather(citySelect.value);
});
fahrenheitBtn.addEventListener("click", () => {
  currentUnit = "imperial";
  localStorage.setItem("weatherUnit", currentUnit);
  setActiveUnitButton();
  lastWeatherAlertKey = "";
  loadWeather(citySelect.value);
});

setActiveUnitButton();
updateLiveTime();
loadWeather(citySelect.value);
setInterval(updateLiveTime, 1000);
setInterval(() => loadWeather(citySelect.value), 300000);




