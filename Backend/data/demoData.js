const credentials = {
  farmer: { username: "farmer", password: "farmer123", label: "Farmer" },
  vendor: { username: "vendor", password: "vendor123", label: "Vendor" },
  user: { username: "user", password: "user123", label: "User" },
  admin: { username: "admin", password: "admin123", label: "Admin" }
};

const rolePages = {
  farmer: ["Dashboard/main.html", "Dashboard/farmerdashboard.html", "Weather/weather.html", "Marketplace/marketplace.html", "Services/diseaseupload.html", "Services/eqipmentrental.html", "Services/equipmentbilling.html", "Services/expertconsulation.html"],
  vendor: ["Dashboard/main.html", "Dashboard/vendordashboard.html", "Marketplace/marketplace.html", "Services/eqipmentrental.html", "Services/equipmentbilling.html", "Services/expertconsulation.html"],
  user: ["Dashboard/main.html", "Dashboard/userdashboard.html", "Marketplace/marketplace.html", "Weather/weather.html", "Services/expertconsulation.html"],
  admin: ["Dashboard/main.html", "Dashboard/admindashboard.html", "Dashboard/adminmanagement.html", "Dashboard/farmerdashboard.html", "Dashboard/vendordashboard.html", "Dashboard/userdashboard.html", "Marketplace/marketplace.html", "Weather/weather.html", "Services/diseaseupload.html", "Services/eqipmentrental.html", "Services/equipmentbilling.html", "Services/expertconsulation.html"]
};

const products = [
  { id: 1, name: "Hybrid Wheat Seeds", category: "Seeds", price: 850, stock: 42 },
  { id: 2, name: "Organic Compost", category: "Fertilizer", price: 450, stock: 75 },
  { id: 3, name: "Drip Irrigation Kit", category: "Irrigation", price: 2400, stock: 18 },
  { id: 4, name: "Battery Sprayer", category: "Tools", price: 3200, stock: 12 }
];

const equipment = [
  { id: "EQ-101", name: "Tractor", rentPerDay: 2500, location: "Ahmedabad", status: "Available" },
  { id: "EQ-102", name: "Power Sprayer", rentPerDay: 650, location: "Surat", status: "Available" },
  { id: "EQ-103", name: "Water Pump", rentPerDay: 500, location: "Vadodara", status: "Available" }
];

const weatherAlerts = [
  { city: "Ahmedabad", type: "warning", title: "Heat Advisory", message: "Afternoon spraying avoid karo. Early morning irrigation better rahega." },
  { city: "Surat", type: "alert", title: "Humidity Alert", message: "Fungal disease risk high ho sakta hai. Leaf inspection karo." },
  { city: "Pune", type: "success", title: "Good Field Window", message: "Weather irrigation aur field work ke liye suitable hai." }
];

module.exports = { credentials, rolePages, products, equipment, weatherAlerts };

