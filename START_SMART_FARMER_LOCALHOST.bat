@echo off
cd /d "C:\Users\Piyush\OneDrive\Desktop\main_project"
echo Starting Smart Farmer backend on port 2005...
start "Smart Farmer Backend" cmd /k "cd /d C:\Users\Piyush\OneDrive\Desktop\main_project && npm start"
timeout /t 2 /nobreak >nul
start "" "http://localhost:2005/index.html"
echo Website opened at http://localhost:2005/index.html
echo After running FIX_SMARTFARMER_HOST_ADMIN.bat as administrator, this also works: http://smartfarmer:2005/index.html
pause
