@echo off
echo ===================================================
echo   PREPARATION CLE USB - DRONE SECURE
echo ===================================================
echo.

set TARGET_DIR=drone_usb_installer
echo [1/5] Nettoyage du dossier %TARGET_DIR%...
if exist %TARGET_DIR% rmdir /s /q %TARGET_DIR%
mkdir %TARGET_DIR%
mkdir %TARGET_DIR%\images
mkdir %TARGET_DIR%\src

echo [2/5] Construction de l'image complete (Front + Back)...
docker build -t drone-full-stack .

echo [3/5] Sauvegarde des images Docker (Cela peut prendre du temps)...
echo    - Sauvegarde de postgres:15...
docker pull postgres:15
docker save -o %TARGET_DIR%\images\postgres.tar postgres:15

echo    - Sauvegarde de drone-full-stack...
docker save -o %TARGET_DIR%\images\drone-app.tar drone-full-stack

echo [4/5] Copie des fichiers de configuration...
xcopy docker-compose.yml %TARGET_DIR%\ /Y
xcopy init-db %TARGET_DIR%\init-db\ /E /I /Y

echo [5/5] Creation du script d'installation Linux...
(
echo #!/bin/bash
echo echo "========================================="
echo echo "  INSTALLATION DRONE SECURE (OFFLINE)"
echo echo "========================================="
echo.
echo echo "[1/3] Chargement des images Docker..."
echo docker load -i images/postgres.tar
echo docker load -i images/drone-app.tar
echo.
echo echo "[2/3] Demarrage des services..."
echo # Modification de docker-compose pour utiliser l'image locale si besoin
echo # ici on suppose que docker-compose.yml utilise deja les bons noms ou build
echo # Mais pour la version USB, on va forcer l'usage de l'image chargee
echo.
echo export IMAGE_NAME=drone-full-stack
echo docker-compose up -d
echo.
echo echo "[3/3] Termine !"
echo echo "L'application est accessible sur : http://localhost:5000"
echo read -p "Appuyez sur Entree pour quitter..."
) > %TARGET_DIR%\install.sh

echo [6/6] Creation du raccourci Linux (Desktop Entry)...
(
echo [Desktop Entry]
echo Name=Lancer Drone Secure
echo Comment=Installation et demarrage de Drone Secure
echo Exec=bash -c "cd \"$(dirname \"%%k\")\"; bash install.sh"
echo Icon=utilities-terminal
echo Terminal=true
echo Type=Application
echo Categories=Utility;Application;
) > %TARGET_DIR%\LANCER_DRONE.desktop

echo.
echo ===================================================
echo   SUCCES !
echo ===================================================
echo Copiez le dossier '%TARGET_DIR%' sur votre cle USB.
echo.
echo Sur le PC Linux :
echo 1. Copiez le dossier (ou executez depuis la cle si permis)
echo 2. Clic-droit sur 'LANCER_DRONE.desktop' -^> "Autoriser l'execution" (Allow Launching)
echo 3. Double-cliquez dessus !
pause
