# 🗄️ Guide Base de Données - Drone Secure

Votre projet utilise une base de données **PostgreSQL** qui tourne dans un conteneur Docker nommé `drone_secure_db`.

## 📊 Accès Rapide

Les données sont visibles en temps réel sur l'interface : [http://localhost:5000](http://localhost:5000)

## 🛠️ Outils de Simulation (Scripts)

J'ai créé des scripts pour vous permettre d'ajouter facilement des fausses données de drone pour tester l'application.

### Windows (PowerShell)
Double-cliquez ou lancez ce script pour ajouter une détection aléatoire :
```powershell
.\scripts\add_detection.ps1
```

### Python (Simulation continue)
Ce script envoie des détections en boucle toutes les quelques secondes :
```bash
python scripts/simulate_drones.py
```
*(Nécessite python et la librairie requests: `pip install requests`)*

## 🔌 Connexion Directe (Administration)

Pour voir les tables ou faire des requêtes SQL manuelles.

### Option 1 : Via Docker (Ligne de commande)
C'est la méthode la plus rapide, sans rien installer.

```bash
# Se connecter à la base
docker exec -it drone_secure_db psql -U drone_user -d drone_db
```

Une fois connecté :
```sql
\dt                  -- Lister les tables
SELECT * FROM detections; -- Voir toutes les détections
\q                   -- Quitter
```

### Option 2 : Via un logiciel (PgAdmin, DBeaver...)
Vous pouvez utiliser un logiciel graphique installé sur votre Windows.

- **Hôte** : `localhost`
- **Port** : `5432`
- **Base de données** : `drone_db`
- **Utilisateur** : `drone_user`
- **Mot de passe** : `drone_pass`

## 📝 Schéma des Données

La table principale est `detections`.

| Champ | Type | Notes |
|-------|------|-------|
| `frequency` | VARCHAR | '2.4 GHz' ou '5.8 GHz' |
| `rssi` | INT | De -100 à 0 (plus c'est haut, plus c'est proche) |
| `position_gps`| VARCHAR | "lat,lon" (ex: "48.8566,2.3522") |
| `status` | VARCHAR | 'threat' (rouge), 'friendly' (vert), 'unknown' (gris) |
