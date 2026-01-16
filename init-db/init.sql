-- Drone Secure - Database Initialization Script
-- Projet: Détection de drones
-- Réalisation: 12-29 janvier 2026
-- Ce script est automatiquement exécuté au premier démarrage de PostgreSQL

-- Création de la table des détections de drones
CREATE TABLE IF NOT EXISTS detections (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    frequency VARCHAR(20) NOT NULL CHECK (frequency IN ('2.4 GHz', '5.8 GHz')),
    rssi INTEGER NOT NULL CHECK (rssi >= -100 AND rssi <= 0),
    position_gps VARCHAR(50) NOT NULL
);

-- Index pour améliorer les performances des requêtes
CREATE INDEX IF NOT EXISTS idx_detections_timestamp ON detections(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_detections_frequency ON detections(frequency);

-- Commentaires sur la table et les colonnes
COMMENT ON TABLE detections IS 'Table des détections de drones par le système Drone Secure';
COMMENT ON COLUMN detections.id IS 'Identifiant unique de la détection';
COMMENT ON COLUMN detections.timestamp IS 'Horodatage de la détection';
COMMENT ON COLUMN detections.frequency IS 'Fréquence du signal détecté (2.4 GHz ou 5.8 GHz)';
COMMENT ON COLUMN detections.rssi IS 'Puissance du signal reçu (RSSI) en dBm, entre -100 et 0';
COMMENT ON COLUMN detections.position_gps IS 'Position GPS au format latitude,longitude';

-- Insertion de données de test
INSERT INTO detections (timestamp, frequency, rssi, position_gps) VALUES
    ('2026-01-15 10:30:00', '2.4 GHz', -45, '48.8566,2.3522'),
    ('2026-01-15 11:15:00', '5.8 GHz', -62, '48.8584,2.2945'),
    ('2026-01-15 14:22:00', '2.4 GHz', -38, '48.8606,2.3376'),
    ('2026-01-16 09:45:00', '5.8 GHz', -55, '48.8530,2.3499'),
    ('2026-01-16 12:00:00', '2.4 GHz', -72, '48.8649,2.3800');

-- Log de confirmation
DO $$
BEGIN
    RAISE NOTICE 'Drone Secure: Base de données initialisée avec succès!';
    RAISE NOTICE 'Table detections créée avec % enregistrements de test.', 
        (SELECT COUNT(*) FROM detections);
END $$;
