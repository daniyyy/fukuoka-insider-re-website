@echo off
chcp 65001 >nul
title Fukuoka Insider 網站預覽
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo 找不到 Node.js。請先到 https://nodejs.org 下載安裝 LTS 版本，然後再按兩下這個檔案。
  pause
  exit /b
)

where pnpm >nul 2>nul
if errorlevel 1 (
  echo 正在啟用 pnpm...
  call corepack enable
)

echo.
echo [1/2] 正在準備（第一次約需 1-3 分鐘）...
call pnpm install
if errorlevel 1 (
  echo 準備失敗，請把上面的訊息截圖給 Claude。
  pause
  exit /b
)

echo.
echo [2/2] 正在啟動網站，瀏覽器會自動打開：http://localhost:5173/re/zh-TW/
echo 看完後直接關閉這個黑色視窗即可。
start "" cmd /c "timeout /t 15 >nul & start http://localhost:5173/re/zh-TW/"
call pnpm dev
pause
