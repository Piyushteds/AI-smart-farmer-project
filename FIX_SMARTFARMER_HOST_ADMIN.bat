@echo off
net session >nul 2>&1
if %errorLevel% neq 0 (
  echo Administrator permission required to repair smartfarmer host.
  powershell -NoProfile -Command "Start-Process '%~f0' -Verb RunAs"
  exit /b
)
echo Repairing smartfarmer host mapping...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$hosts='C:\Windows\System32\drivers\etc\hosts'; $lines=Get-Content -Path $hosts | Where-Object { $_ -notmatch 'smartfarmer' -and $_ -notmatch 'smartframer' }; Set-Content -Path $hosts -Value $lines -Encoding ASCII; Add-Content -Path $hosts -Value '127.0.0.1 smartfarmer' -Encoding ASCII; ipconfig /flushdns | Out-Null"
echo Done. Correct entry added: 127.0.0.1 smartfarmer
echo Now open: http://smartfarmer:2005/index.html
pause
