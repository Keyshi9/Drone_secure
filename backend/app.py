"""
Drone Secure - Flask Backend API
Projet: Détection de drones
Réalisation: 12-29 janvier 2026
"""

import os
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)

# Configuration de la connexion à la base de données via variable d'environnement
DATABASE_URL = os.environ.get('DATABASE_URL', 'postgresql://drone_user:drone_pass@db:5432/drone_db')


def get_db_connection():
    """Établit une connexion à la base de données PostgreSQL."""
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn


@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint de vérification de l'état du service."""
    return jsonify({
        'status': 'healthy',
        'service': 'drone-secure-api',
        'timestamp': datetime.utcnow().isoformat()
    })


@app.route('/api/detections', methods=['GET'])
def get_detections():
    """Récupère toutes les détections de drones."""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM detections ORDER BY timestamp DESC LIMIT 100')
        detections = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify({
            'success': True,
            'data': detections,
            'count': len(detections)
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/detections', methods=['POST'])
def create_detection():
    """Crée une nouvelle détection de drone."""
    try:
        data = request.get_json()
        
        # Validation des données requises
        required_fields = ['frequency', 'rssi', 'position_gps']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f'Champ requis manquant: {field}'
                }), 400
        
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            '''INSERT INTO detections (timestamp, frequency, rssi, position_gps)
               VALUES (%s, %s, %s, %s) RETURNING id''',
            (
                datetime.utcnow(),
                data['frequency'],
                data['rssi'],
                data['position_gps']
            )
        )
        detection_id = cur.fetchone()['id']
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Détection enregistrée',
            'id': detection_id
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/detections/<int:detection_id>', methods=['GET'])
def get_detection(detection_id):
    """Récupère une détection spécifique par son ID."""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM detections WHERE id = %s', (detection_id,))
        detection = cur.fetchone()
        cur.close()
        conn.close()
        
        if detection is None:
            return jsonify({
                'success': False,
                'error': 'Détection non trouvée'
            }), 404
            
        return jsonify({
            'success': True,
            'data': detection
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/detections/stats', methods=['GET'])
def get_stats():
    """Récupère les statistiques des détections."""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Statistiques générales
        cur.execute('''
            SELECT 
                COUNT(*) as total_detections,
                COUNT(CASE WHEN frequency = '2.4 GHz' THEN 1 END) as freq_2_4ghz,
                COUNT(CASE WHEN frequency = '5.8 GHz' THEN 1 END) as freq_5_8ghz,
                AVG(rssi) as avg_rssi,
                MIN(rssi) as min_rssi,
                MAX(rssi) as max_rssi
            FROM detections
        ''')
        stats = cur.fetchone()
        cur.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'data': stats
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
