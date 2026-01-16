# Drone Secure - Flask Backend
# Projet: Détection de drones
# Réalisation: 12-29 janvier 2026

# Image de base optimisée
FROM python:3.9-slim

# Variables d'environnement
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Répertoire de travail
WORKDIR /app

# Installation des dépendances système pour psycopg2
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copie et installation des dépendances Python
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copie du code de l'application
COPY backend/ .

# Exposition du port
EXPOSE 5000

# Commande de démarrage (production avec gunicorn)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "app:app"]
