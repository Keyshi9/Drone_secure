import React from 'react';
import { Target, Navigation, Battery, Gauge, Wifi, MapPin } from 'lucide-react';
import { getStatusColor } from './data';

export default function TrackingPage({ drones }) {
    const [selectedId, setSelectedId] = React.useState(drones[0]?.id);
    const selected = drones.find(d => d.id === selectedId);

    return (
        <div className="h-full flex bg-slate-950">
            {/* Drone List */}
            <div className="w-80 bg-slate-900 border-r border-slate-800 p-4 overflow-auto">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Target size={20} className="text-blue-400" />
                    Drones Actifs ({drones.length})
                </h3>
                <div className="space-y-2">
                    {drones.map(drone => {
                        const colors = getStatusColor(drone.status);
                        return (
                            <button
                                key={drone.id}
                                onClick={() => setSelectedId(drone.id)}
                                className={`w-full p-3 rounded-xl text-left transition-all ${selectedId === drone.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-mono text-sm">#{drone.id}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} text-white`}>
                                        {drone.status === 'threat' ? 'Menace' : drone.status === 'friendly' ? 'Ami' : 'Inconnu'}
                                    </span>
                                </div>
                                <div className="text-xs opacity-70">{drone.type}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Drone Details */}
            {selected && (
                <div className="flex-1 p-6 overflow-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getStatusColor(selected.status).bg}/20`}>
                                <Target size={32} className={getStatusColor(selected.status).text} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{selected.type}</h2>
                                <p className="text-slate-400 font-mono">ID: #{selected.id}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <StatCard icon={<Navigation />} label="Altitude" value={`${selected.altitude} m`} />
                            <StatCard icon={<Gauge />} label="Vitesse" value={`${selected.speed} km/h`} />
                            <StatCard icon={<MapPin />} label="Direction" value={selected.direction} />
                            <StatCard icon={<Battery />} label="Batterie" value={selected.battery ? `${selected.battery}%` : 'N/A'} color={selected.battery > 50 ? 'emerald' : 'amber'} />
                        </div>

                        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                            <h3 className="text-lg font-bold text-white mb-4">Position GPS</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-slate-500">Latitude:</span> <span className="text-white font-mono">{selected.lat.toFixed(6)}°N</span></div>
                                <div><span className="text-slate-500">Longitude:</span> <span className="text-white font-mono">{selected.lng.toFixed(6)}°E</span></div>
                                <div><span className="text-slate-500">Distance:</span> <span className="text-white font-mono">{selected.distance} m</span></div>
                                <div><span className="text-slate-500">Signal:</span> <span className="text-emerald-400 font-mono flex items-center gap-1"><Wifi size={14} /> Fort</span></div>
                            </div>
                        </div>

                        {selected.status === 'threat' && (
                            <div className="mt-6 flex gap-3">
                                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all">
                                    🎯 Neutraliser
                                </button>
                                <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition-all">
                                    📍 Suivre
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ icon, label, value, color = 'blue' }) {
    const colorClass = color === 'emerald' ? 'text-emerald-400' : color === 'amber' ? 'text-amber-400' : 'text-blue-400';
    return (
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className={`${colorClass} mb-2`}>{icon}</div>
            <div className="text-xs text-slate-500 uppercase">{label}</div>
            <div className="text-xl font-bold text-white">{value}</div>
        </div>
    );
}
