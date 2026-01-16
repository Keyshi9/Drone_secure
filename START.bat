@echo off
title Drone Secure Dashboard
color 0A

echo.
echo  ============================================
echo      DRONE SECURE - Systeme de Detection
echo  ============================================
echo.

:: Check if Node.js is available
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Node.js n'est pas installe ou pas dans le PATH.
    echo.
    echo Veuillez installer Node.js depuis: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js detecte
node -v

:: Check if node_modules exists
if not exist "node_modules" (
    echo.
    echo [INFO] Installation des dependances...
    echo Cela peut prendre quelques minutes...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERREUR] L'installation a echoue.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependances installees avec succes!
)

echo.
echo [INFO] Demarrage du serveur...
echo.
echo  ============================================
echo    Le dashboard va s'ouvrir dans votre
echo    navigateur a l'adresse:
echo    http://localhost:5173
echo  ============================================
echo.
echo  Appuyez sur Ctrl+C pour arreter le serveur.
echo.

:: Start the dev server and open browser
start http://localhost:5173
call npm run dev
