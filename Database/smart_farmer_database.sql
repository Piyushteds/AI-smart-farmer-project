-- Smart Farmer Project Database
-- Use this file in MySQL / MariaDB / phpMyAdmin.
-- Database covers login roles, marketplace, weather alerts, disease upload,
-- equipment rental, expert consultation, IoT device control, and chatbot messages.

CREATE DATABASE IF NOT EXISTS smart_farmer_db;
USE smart_farmer_db;

CREATE TABLE roles (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  username VARCHAR(60) NOT NULL UNIQUE,
  email VARCHAR(120) UNIQUE,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  city VARCHAR(80),
  state VARCHAR(80),
  status ENUM('active', 'blocked') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  vendor_id INT,
  product_name VARCHAR(120) NOT NULL,
  category VARCHAR(60) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_qty INT DEFAULT 0,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vendor_id) REFERENCES users(user_id)
);

CREATE TABLE orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  buyer_id INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  order_status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (buyer_id) REFERENCES users(user_id)
);

CREATE TABLE order_items (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE weather_alerts (
  alert_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  city VARCHAR(80) NOT NULL,
  temperature DECIMAL(5,2),
  humidity INT,
  wind_speed DECIMAL(6,2),
  aqi VARCHAR(30),
  alert_type ENUM('success', 'warning', 'danger') NOT NULL,
  alert_message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE disease_reports (
  report_id INT AUTO_INCREMENT PRIMARY KEY,
  farmer_id INT NOT NULL,
  crop_name VARCHAR(80),
  image_url TEXT,
  disease_name VARCHAR(120),
  symptoms TEXT,
  recommendation TEXT,
  report_status ENUM('uploaded', 'reviewed', 'resolved') DEFAULT 'uploaded',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farmer_id) REFERENCES users(user_id)
);

CREATE TABLE equipment (
  equipment_id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT,
  equipment_name VARCHAR(120) NOT NULL,
  equipment_type VARCHAR(80),
  rent_per_day DECIMAL(10,2) NOT NULL,
  city VARCHAR(80),
  availability ENUM('available', 'booked', 'maintenance') DEFAULT 'available',
  image_url TEXT,
  FOREIGN KEY (owner_id) REFERENCES users(user_id)
);

CREATE TABLE equipment_bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  equipment_id INT NOT NULL,
  farmer_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_rent DECIMAL(10,2) NOT NULL,
  booking_status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id),
  FOREIGN KEY (farmer_id) REFERENCES users(user_id)
);

CREATE TABLE experts (
  expert_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  specialization VARCHAR(120),
  email VARCHAR(120),
  phone VARCHAR(20),
  experience_years INT DEFAULT 0,
  available_status ENUM('available', 'busy') DEFAULT 'available'
);

CREATE TABLE consultations (
  consultation_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  expert_id INT,
  topic VARCHAR(150) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  consultation_status ENUM('pending', 'answered', 'closed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (expert_id) REFERENCES experts(expert_id)
);

CREATE TABLE iot_devices (
  device_id INT AUTO_INCREMENT PRIMARY KEY,
  farmer_id INT NOT NULL,
  device_name VARCHAR(100) NOT NULL,
  device_type VARCHAR(80),
  location_name VARCHAR(120),
  device_status ENUM('on', 'off') DEFAULT 'off',
  distance_km DECIMAL(6,2) DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (farmer_id) REFERENCES users(user_id)
);

CREATE TABLE device_logs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  device_id INT NOT NULL,
  action ENUM('on', 'off') NOT NULL,
  distance_km DECIMAL(6,2),
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (device_id) REFERENCES iot_devices(device_id)
);

CREATE TABLE chatbot_messages (
  message_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  user_message TEXT NOT NULL,
  bot_reply TEXT NOT NULL,
  language_code VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO roles (role_name) VALUES
('farmer'),
('vendor'),
('user'),
('admin');

-- Demo passwords in the front-end are farmer123, vendor123, user123, admin123.
-- In a real backend, store hashed passwords only.
INSERT INTO users (role_id, full_name, username, email, phone, password_hash, city, state) VALUES
(1, 'Demo Farmer', 'farmer', 'farmer@example.com', '9000000001', 'farmer123_demo_only', 'Ahmedabad', 'Gujarat'),
(2, 'Demo Vendor', 'vendor', 'vendor@example.com', '9000000002', 'vendor123_demo_only', 'Surat', 'Gujarat'),
(3, 'Demo User', 'user', 'user@example.com', '9000000003', 'user123_demo_only', 'Mumbai', 'Maharashtra'),
(4, 'Demo Admin', 'admin', 'admin@example.com', '9000000004', 'admin123_demo_only', 'Delhi', 'Delhi');

INSERT INTO products (vendor_id, product_name, category, price, stock_qty, description) VALUES
(2, 'Hybrid Seeds Pack', 'Seeds', 450.00, 50, 'High quality crop seeds for seasonal farming.'),
(2, 'Organic Fertilizer', 'Fertilizer', 650.00, 35, 'Compost based fertilizer for soil health.'),
(2, 'Drip Irrigation Kit', 'Irrigation', 3200.00, 12, 'Water saving irrigation kit for small farms.');

INSERT INTO equipment (owner_id, equipment_name, equipment_type, rent_per_day, city, availability) VALUES
(2, 'Mini Tractor', 'Tractor', 1800.00, 'Ahmedabad', 'available'),
(2, 'Power Sprayer', 'Sprayer', 500.00, 'Surat', 'available'),
(2, 'Water Pump', 'Pump', 700.00, 'Pune', 'available');

INSERT INTO experts (full_name, specialization, email, phone, experience_years) VALUES
('Dr. Crop Advisor', 'Crop Disease', 'expert1@example.com', '9111111111', 8),
('Irrigation Specialist', 'Water Management', 'expert2@example.com', '9222222222', 6),
('Soil Consultant', 'Soil and Fertilizer', 'expert3@example.com', '9333333333', 10);

INSERT INTO iot_devices (farmer_id, device_name, device_type, location_name, device_status, distance_km) VALUES
(1, 'Field Pump 1', 'Water Pump Relay', 'North Field', 'off', 65.00);

CREATE TABLE payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  payment_method ENUM('upi', 'card', 'cod') NOT NULL,
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  transaction_id VARCHAR(120),
  amount DECIMAL(10,2) NOT NULL,
  paid_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
