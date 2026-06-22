# Smart Farmer Database Setup

## Files

- `smart_farmer_database.sql` - MySQL/MariaDB database schema with sample data.

## How to import in phpMyAdmin

1. Open XAMPP and start `Apache` + `MySQL`.
2. Open browser and go to `http://localhost/phpmyadmin`.
3. Click `Import`.
4. Choose `smart_farmer_database.sql`.
5. Click `Go`.
6. A database named `smart_farmer_db` will be created.

## Main tables

- `roles` - farmer, vendor, user, admin
- `users` - login users and profile data
- `products`, `orders`, `order_items` - marketplace
- `weather_alerts` - city weather warning/success/danger records
- `disease_reports` - crop image upload and disease result
- `equipment`, `equipment_bookings` - rental module
- `experts`, `consultations` - expert help module
- `iot_devices`, `device_logs` - remote pump/device switch logs
- `chatbot_messages` - chatbot question/answer history

## Important note

Your current project is static HTML/CSS/JS, so it cannot directly save to MySQL without a backend. To connect this database, add a backend using PHP, Node.js, or Python API.
