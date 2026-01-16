import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { SAINTE_CROIX_CENTER, getStatusColor } from './data';
import 'leaflet/dist/leaflet.css';

// Custom drone icons
const createDroneIcon = (status) => {
    const color = status === 'threat' ? '#ef4444' : status === 'friendly' ? '#10b981' : '#f59e0b';
    return L.divIcon({
        className: 'custom-drone-icon',
        html: `<div style="
      width: 24px; height: 24px; 
      background: ${color}; 
      border: 3px solid white; 
      border-radius: 50%; 
      box-shadow: 0 0 15px ${color};
    "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

export default function MapView({ drones, selectedDrone, onSelectDrone }) {
    return (
        <MapContainer
            center={SAINTE_CROIX_CENTER}
            zoom={14}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                className="map-tiles"
            />

            {/* Detection range circle */}
            <Circle
                center={SAINTE_CROIX_CENTER}
                radius={2500}
                pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.05, weight: 1 }}
            />
            <Circle
                center={SAINTE_CROIX_CENTER}
                radius={1500}
                pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.03, weight: 1, dashArray: '5, 5' }}
            />

            {/* Drone markers */}
            {drones.map(drone => (
                <Marker
                    key={drone.id}
                    position={[drone.lat, drone.lng]}
                    icon={createDroneIcon(drone.status)}
                    eventHandlers={{ click: () => onSelectDrone(drone) }}
                >
                    <Popup className="drone-popup">
                        <div className="text-slate-900 p-1">
                            <div className="font-bold">{drone.type}</div>
                            <div className="text-sm">ID: {drone.id}</div>
                            <div className="text-sm">Alt: {drone.altitude}m | {drone.speed} km/h</div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
