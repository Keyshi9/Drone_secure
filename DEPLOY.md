# GUIDE DE DÉPLOIEMENT - DRONE SECURE

## 1. Installation sur le PC Linux

### Pré-requis
- **Docker** et **Docker Compose** doivent être installés sur la machine.
- Accès Internet pour cloner le dépôt.

### Installation
1.  Ouvrez un terminal.
2.  Clonez le dépôt :
    ```bash
    git clone https://github.com/Keyshi9/Drone_secure.git
    cd Drone_secure
    ```

3.  Lancez l'application :
    ```bash
    docker-compose up -d --build
    ```

L'application sera accessible sur : **http://localhost:5000**

---

## 2. Informations pour l'Équipe Data / Antenne

L'application expose une API pour recevoir les détections en temps réel.

### Méthode Recommandée : API HTTP
Envoyez une requête POST à chaque détection.

- **URL** : `http://localhost:5000/api/detections`
- **Méthode** : `POST`
- **Headers** : `Content-Type: application/json`
- **Format JSON** :
  ```json
  {
      "frequency": "2.4 GHz",
      "rssi": -55,
      "position_gps": "48.8566,2.3522"
  }
  ```

### Méthode Alternative : Connexion BDD Directe
Si le script tourne sur la même machine.

- **Type** : PostgreSQL 15
- **Hôte** : `localhost`
- **Port** : `5432`
- **Utilisateur** : `drone_user`
- **Mot de passe** : `drone_pass`
- **Base** : `drone_db`
- **Table** : `detections`
