# 🚀 Guide d'Installation et de Démarrage - Drone Secure

Ce guide vous explique comment installer et lancer l'application **Drone Secure** (Interface + Base de données) sur n'importe quelle machine (Windows, Mac, Linux) grâce à Docker.

## 📋 Prérequis

1.  **Docker** doit être installé et lancé sur la machine.
    *   [Télécharger Docker Desktop pour Windows/Mac](https://www.docker.com/products/docker-desktop/)
    *   Sur Linux : installer `docker` et `docker-compose`.

## 🛠️ Installation et Lancement

Cette méthode lance **tout** (Base de données + Backend + Frontend) en une seule commande.

1.  **Ouvrez un terminal** dans le dossier du projet.
2.  **Lancez l'application** avec la commande suivante :

    ```bash
    docker-compose up -d --build
    ```

    *   `up` : Démarre les conteneurs.
    *   `-d` : Mode "détaché" (tourne en arrière-plan).
    *   `--build` : Construit l'application (à faire la première fois ou après une modification de code).

3.  **Vérifiez que tout tourne** :
    ```bash
    docker-compose ps
    ```
    Vous devriez voir `drone_secure_db` (healthy) et `drone_secure_web` (running).

---

## 🌍 Accéder à l'application

### Depuis la machine locale (celle qui lance Docker)
*   **Interface Web** : [http://localhost:5000](http://localhost:5000)
*   **Base de Données** : `localhost:5432`

### Depuis une AUTRE machine (réseau local / WiFi)
Si vous voulez accéder à l'application depuis votre téléphone ou un autre ordinateur connecté au même WiFi :

1.  Trouvez l'**Adresse IP locale** de la machine qui lance Docker.
    *   **Windows** : Ouvrez un terminal, tapez `ipconfig` et cherchez "IPv4 Address" (ex: `192.168.1.15`).
    *   **Mac/Linux** : Tapez `ifconfig` ou `ip a` (ex: `192.168.1.15`).

2.  **Accédez via l'IP** :
    *   **Interface Web** : `http://<VOTRE_IP>:5000` (ex: `http://192.168.1.15:5000`)
    *   **Base de Données** : Connectez-vous à `<VOTRE_IP>:5432`.

> **⚠️ Note Importante (Pare-feu / Firewall)** :
> Si l'accès est bloqué depuis une autre machine, vérifiez que le **Pare-feu Windows** (ou autre) autorise les connexions entrantes sur les ports **5000** et **5432**.

---

## 🗄️ Accès à la Base de Données (DB Ouverte)

La base de données est configurée pour être accessible de l'extérieur du conteneur.

*   **Logiciel recommandé** : [DBeaver](https://dbeaver.io/) ou [PgAdmin](https://www.pgadmin.org/).
*   **Paramètres de connexion** :
    *   **Hôte (Host)** : `localhost` (ou l'IP si accès distant)
    *   **Port** : `5432`
    *   **Base de données** : `drone_db`
    *   **Nom d'utilisateur** : `drone_user`
    *   **Mot de passe** : `drone_pass`

---

## 🛑 Arrêter l'application

Pour tout arrêter proprement :

```bash
docker-compose down
```
(Ajoutez `-v` si vous voulez aussi supprimer le volume de données : `docker-compose down -v`)
