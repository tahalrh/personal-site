@echo off
cd /d %~dp0
echo ---------------------------------------
echo 🚀 Déploiement du site vers GitHub Pages
echo ---------------------------------------

set /p commitmsg="Message de commit : "

git add .
git commit -m "%commitmsg%"
git push origin main

echo.
echo ✅ Site mis à jour sur GitHub Pages !
pause
