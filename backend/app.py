"""
Drone Secure - Flask Backend API
Projet: Détection de drones
"""

import os
from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__, static_folder='static_dist', static_url_path='')
CORS(app)

# Configuration base de données
DATABASE_URL = os.environ.get('DATABASE_URL', 'postgresql://drone_user:drone_pass@db:5432/drone_db')


def get_db_connection():
    """Crée une connexion à la base de données PostgreSQL."""
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn


# Routes pour servir le frontend React
@app.route('/')
def index():
    """Sert la page principale du frontend."""
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:path>')
def serve_static(path):
    """Sert les fichiers statiques ou retourne index.html pour le routing React."""
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


# API Endpoints
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
        
        # Convertir les timestamps en chaînes ISO
        for detection in detections:
            if detection.get('timestamp'):
                detection['timestamp'] = detection['timestamp'].isoformat()
        
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
            '''INSERT INTO detections (timestamp, drone_id, detection_type, frequency, rssi, position_gps, status)
               VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id''',
            (
                datetime.utcnow(),
                data.get('drone_id', 'UNKNOWN'),
                data.get('detection_type', 'Unknown Signal'),
                data['frequency'],
                data['rssi'],
                data['position_gps'],
                data.get('status', 'unknown')
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
        
        if detection.get('timestamp'):
            detection['timestamp'] = detection['timestamp'].isoformat()
            
        return jsonify({
            'success': True,
            'data': detection
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/detections/<int:detection_id>', methods=['DELETE'])
def delete_detection(detection_id):
    """Supprime une détection par son ID."""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM detections WHERE id = %s RETURNING id', (detection_id,))
        deleted = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        
        if deleted is None:
            return jsonify({
                'success': False,
                'error': 'Détection non trouvée'
            }), 404
            
        return jsonify({
            'success': True,
            'message': 'Détection supprimée'
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
        
        cur.execute('''
            SELECT 
                COUNT(*) as total_detections,
                COUNT(CASE WHEN frequency = '2.4 GHz' THEN 1 END) as freq_2_4ghz,
                COUNT(CASE WHEN frequency = '5.8 GHz' THEN 1 END) as freq_5_8ghz,
                COUNT(CASE WHEN status = 'threat' THEN 1 END) as threats,
                COUNT(CASE WHEN status = 'friendly' THEN 1 END) as friendly,
                COUNT(CASE WHEN status = 'unknown' THEN 1 END) as unknown
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
