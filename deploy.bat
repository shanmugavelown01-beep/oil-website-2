@echo off
REM Deploy script to push bug fixes to GitHub/Vercel

cd /d "%~dp0"

echo ============================================
echo Oil Website - Deploy to Vercel
echo ============================================
echo.

echo [1/4] Checking git status...
git status

echo.
echo [2/4] Staging all changes...
git add .

echo.
echo [3/4] Committing changes...
git commit -m "Fix: Order tracking case-insensitive lookup and order history error handling - Deploy to Vercel"

echo.
echo [4/4] Pushing to GitHub (this triggers Vercel deployment)...
git push origin main

echo.
echo ============================================
echo SUCCESS! Changes pushed to GitHub.
echo Vercel will automatically deploy in 1-2 minutes.
echo Visit: https://levioils.vercel.app/
echo ============================================
pause
