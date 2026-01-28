# Drone Secure

Système de détection et surveillance de drones avec interface React et backend Flask/PostgreSQL.

## Lancement avec Docker

### Prérequis
- Docker Desktop installé et en cours d'exécution
- Node.js (version 16 ou plus)
- npm

### Installation
1. Cloner le projet
2. Lancer `npm install` pour installer les dépendances.

### Démarrage


```bash
# Construire et lancer l'application
docker-compose up --build

# Ou en arrière-plan
docker-compose up --build -d
```

### Accès
- **Application**: http://localhost:5000
- **Base de données**: localhost:5432 (drone_user / drone_pass)

## API

### Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/detections` | Liste des détections |
| POST | `/api/detections` | Nouvelle détection |
| GET | `/api/detections/:id` | Détection par ID |
| DELETE | `/api/detections/:id` | Supprimer détection |
| GET | `/api/detections/stats` | Statistiques |
| GET | `/health` | État du service |

### Ajouter une détection (exemple)

```bash
curl -X POST http://localhost:5000/api/detections \
  -H "Content-Type: application/json" \
  -d '{
    "frequency": "2.4 GHz",
    "rssi": -55,
    "position_gps": "48.8566,2.3522",
    "drone_id": "TEST-001",
    "detection_type": "DJI Mavic",
    "status": "threat"
  }'
```

## Base de données

La base PostgreSQL est initialisée automatiquement avec des données de test au premier démarrage.

### Structure de la table `detections`

| Colonne | Type | Description |
|---------|------|-------------|
| id | SERIAL | Identifiant unique |
| timestamp | TIMESTAMP | Horodatage |
| drone_id | VARCHAR(50) | ID du drone |
| detection_type | VARCHAR(50) | Type de signal |
| frequency | VARCHAR(20) | 2.4 GHz ou 5.8 GHz |
| rssi | INTEGER | Puissance signal (-100 à 0 dBm) |
| position_gps | VARCHAR(50) | Coordonnées GPS |
| status | VARCHAR(20) | threat, friendly, unknown |

## Arrêt

```bash
# Arrêter les conteneurs
docker-compose down

# Arrêter et supprimer les données
docker-compose down -v
```
