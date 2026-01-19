@echo off
REM Script pour lancer l'application sur Windows rapidement
echo Demarrage de Drone Secure...
docker-compose up -d
echo.
echo Application lancee !
echo - Frontend + Backend : http://localhost:5000
echo.
pause
