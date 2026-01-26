import requests
import time
import random
import json
from datetime import datetime

# Configuration
API_URL = "http://localhost:5000/api/detections"

# Générateurs de données aléatoires
def generate_drone_data():
    types = ["DJI Mavic 3", "Autel Evo II", "Parrot Anafi", "DIY FPV", "Signal Inconnu"]
    statuses = ["threat", "friendly", "unknown"]
    
    # Simuler un drone autour de Paris (ou de la zone par défaut)
    lat_base = 48.8566
    lon_base = 2.3522
    lat = lat_base + random.uniform(-0.01, 0.01)
    lon = lon_base + random.uniform(-0.01, 0.01)
    
    rssi = random.randint(-90, -30)
    status = "threat" if rssi > -50 else "friendly" if rssi < -70 else "unknown"

    return {
        "frequency": random.choice(["2.4 GHz", "5.8 GHz"]),
        "rssi": rssi,
        "position_gps": f"{lat:.4f},{lon:.4f}",
        "drone_id": f"DRONE-{random.randint(1000, 9999)}",
        "detection_type": random.choice(types),
        "status": status
    }

def main():
    print(f"📡 Démarrage du simulateur de drones vers {API_URL}")
    print("Pret a envoyer des donnees... (CTRL+C pour arrêter)")
    
    try:
        while True:
            data = generate_drone_data()
            try:
                response = requests.post(API_URL, json=data)
                if response.status_code == 201:
                    print(f"✅ Détection envoyée: {data['drone_id']} ({data['status']}) - RSSI: {data['rssi']}dBm")
                else:
                    print(f"❌ Erreur: {response.status_code} - {response.text}")
            except requests.exceptions.ConnectionError:
                print("❌ Impossible de contacter le serveur (est-il lancé ?)")
            
            # Attendre entre 2 et 5 secondes
            time.sleep(random.uniform(2, 5))
            
    except KeyboardInterrupt:
        print("\n🛑 Simulation arrêtée.")

if __name__ == "__main__":
    main()
