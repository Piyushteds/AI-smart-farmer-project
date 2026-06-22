@echo off
net session >nul 2>&1
if %errorLevel% neq 0 (
  echo Requesting Administrator permission to add smartfarmer host...
  powershell -Command "Start-Process '%~f0' -Verb RunAs"
  exit /b
)
powershell -NoProfile -ExecutionPolicy Bypass -Command "$hosts='C:\Windows\System32\drivers\etc\hosts'; $entry='127.0.0.1 smartfarmer'; $content=Get-Content -Path $hosts -Raw; if($content -notmatch '(?m)^\s*127\.0\.0\.1\s+smartfarmer\s*$'){ Add-Content -Path $hosts -Value ('`r`n' + $entry) -Encoding ASCII }; ipconfig /flushdns"
echo smartfarmer host mapping added.
echo Now open: http://smartfarmer:2005/index.html
pause
