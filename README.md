# 🛡️ Drone Secure - Système de Détection de Drones

Dashboard de surveillance en temps réel pour la détection et le suivi de drones.

![Dashboard Preview](https://img.shields.io/badge/Status-Operational-brightgreen)
![Version](https://img.shields.io/badge/Version-2.5-blue)

---

## 🚀 Démarrage Rapide

### Option 1 : Double-clic (Windows)
1. **Double-cliquez sur `START.bat`**
2. C'est tout ! Le dashboard s'ouvre automatiquement dans votre navigateur.

### Option 2 : Ligne de commande
```bash
npm install
npm run dev
```
Puis ouvrez [http://localhost:5173](http://localhost:5173)

---

## 📋 Prérequis

- **Node.js** (version 18 ou supérieure) - [Télécharger ici](https://nodejs.org/)

Pour vérifier si Node.js est installé :
```bash
node -v
```

---

## 🎯 Fonctionnalités

| Section | Description |
|---------|-------------|
| **Dashboard** | Carte interactive de Sainte-Croix avec détection en temps réel |
| **Historique** | Tableau des détections passées avec filtres et recherche |
| **Tracking** | Suivi détaillé des drones actifs (GPS, altitude, vitesse) |
| **Configuration** | Paramètres système, alertes et préférences |

---

## 🛠️ Technologies

- **React 18** - Interface utilisateur
- **Tailwind CSS** - Styles
- **Leaflet** - Cartographie
- **Lucide React** - Icônes
- **Vite** - Build tool

---

## 📁 Structure du Projet

```
drone/
├── src/
│   ├── App.jsx          # Application principale
│   ├── MapView.jsx      # Composant carte
│   ├── HistoryPage.jsx  # Page historique
│   ├── TrackingPage.jsx # Page tracking
│   ├── ConfigPage.jsx   # Page configuration
│   ├── data.js          # Données et constantes
│   └── index.css        # Styles globaux
├── START.bat            # Script de lancement Windows
└── package.json         # Dépendances
```

---

## 👥 Équipe

Développé pour le projet de sécurité aérienne.

---

## 📝 Notes

- La carte utilise OpenStreetMap (pas de clé API requise)
- Les données des drones sont simulées pour la démonstration
- Thème sombre optimisé pour les environnements de surveillance
