import React, { useState, useEffect } from 'react';
import {
    Shield, LayoutDashboard, History, Settings, Radio, Signal, AlertTriangle,
    Wifi, Activity, Download, X, Volume2, VolumeX, Filter, ChevronRight,
    Target, Clock, AlertCircle, CheckCircle2, RefreshCw, LogIn
} from 'lucide-react';
import MapView from './MapView';
import HistoryPage from './HistoryPage';
import TrackingPage from './TrackingPage';
import ConfigPage from './ConfigPage';
import { initialDrones, getStatusColor } from './data';
import ExportPage from './export';
import LoginPage from './LoginPage';


export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [selectedDrone, setSelectedDrone] = useState(null);
    const [drones, setDrones] = useState(initialDrones);
    const [filterStatus, setFilterStatus] = useState('all');
    const [detections, setDetections] = useState([
        { id: 1, type: 'DJI OcuSync 3.0', freq: '2.4 GHz', rssi: -42, droneId: 'DX-9901', timestamp: new Date(), status: 'threat', isNew: true },
        { id: 2, type: 'Wi-Fi Broadcast', freq: '5.8 GHz', rssi: -65, droneId: 'FR-0042', timestamp: new Date(Date.now() - 120000), status: 'friendly', isNew: false },
        { id: 3, type: 'Signal Inconnu', freq: '2.4 GHz', rssi: -78, droneId: 'UK-3371', timestamp: new Date(Date.now() - 300000), status: 'unknown', isNew: false }
    ]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Simulate drone movement
    useEffect(() => {
        const moveTimer = setInterval(() => {
            setDrones(prev => prev.map(drone => {
                if (drone.status === 'threat') {
                    return { ...drone, lat: drone.lat + (Math.random() - 0.5) * 0.002, lng: drone.lng + (Math.random() - 0.5) * 0.002 };
                }
                return drone;
            }));
        }, 3000);
        return () => clearInterval(moveTimer);
    }, []);

    // Add new detections periodically
    useEffect(() => {
        const detectionTimer = setInterval(() => {
            const rssi = -40 - Math.floor(Math.random() * 50);
            setDetections(prev => [{
                id: Date.now(), type: rssi > -50 ? 'Signal Puissant' : 'Scan Routine', freq: Math.random() > 0.5 ? '2.4 GHz' : '5.8 GHz',
                rssi, droneId: rssi > -50 ? 'DX-9901' : null, timestamp: new Date(), status: rssi > -50 ? 'threat' : 'neutral', isNew: true
            }, ...prev.map(d => ({ ...d, isNew: false })).slice(0, 9)]);
        }, 8000);
        return () => clearInterval(detectionTimer);
    }, []);

    const filteredDetections = filterStatus === 'all' ? detections : detections.filter(d => d.status === filterStatus);
    const timeAgo = (date) => { const s = Math.floor((new Date() - date) / 1000); return s < 60 ? "À l'instant" : s < 3600 ? `${Math.floor(s / 60)}m` : `${Math.floor(s / 3600)}h`; };

    return (
        <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800/50 flex flex-col z-20 transition-all duration-300 relative`}>
                <div className={`p-4 flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} border-b border-slate-800/50`}>
                    <div className="relative"><div className="absolute inset-0 bg-blue-500 blur-xl opacity-30 rounded-full"></div><Shield className="w-10 h-10 text-blue-400 relative" /></div>
                    {!sidebarCollapsed && <div><h1 className="font-black text-lg tracking-wider bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">DRONE SECURE</h1><span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Sainte-Croix</span></div>}
                </div>
                <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="absolute top-4 -right-3 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all z-30">
                    <ChevronRight className={`w-4 h-4 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
                </button>
                <nav className="flex-1 py-6 px-3 space-y-2">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Accueil" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} collapsed={sidebarCollapsed} />
                    <NavItem icon={<History size={20} />} label="Historique" active={activeTab === 'history'} onClick={() => setActiveTab('history')} collapsed={sidebarCollapsed} />
                    <NavItem icon={<Target size={20} />} label="Tracking" active={activeTab === 'tracking'} onClick={() => setActiveTab('tracking')} collapsed={sidebarCollapsed} badge={drones.length} />
                    <NavItem icon={<Settings size={20} />} label="Configuration" active={activeTab === 'config'} onClick={() => setActiveTab('config')} collapsed={sidebarCollapsed} />
                    <NavItem icon={<Download size={20} />} label="Export" active={activeTab === 'export'} onClick={() => setActiveTab('export')} collapsed={sidebarCollapsed} />
                </nav>
                {!sidebarCollapsed && <div className="p-4 border-t border-slate-800/50"><div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"><div className="flex items-center gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-xs font-semibold text-slate-400 uppercase">Système Actif</span></div><div className="text-sm text-slate-300">Uptime: 12h 34m</div></div></div>}
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-800/50 flex items-center justify-between px-6">
                    <div className="flex items-center gap-6">
                        <h2 className="text-xl font-bold text-white">{activeTab === 'dashboard' ? 'Surveillance Zone' : activeTab === 'history' ? 'Historique' : activeTab === 'tracking' ? 'Tracking' : activeTab === 'config' ? 'Configuration' : activeTab === 'export' ? 'Export' : '-'}</h2>
                        <div className="hidden md:flex items-center gap-3">
                            <StatusPill icon={<Activity size={14} />} label="Système" value="EN LIGNE" color="emerald" />
                            <StatusPill icon={<Radio size={14} />} label="Antennes" value="2/2" color="blue" />
                            <StatusPill icon={<AlertTriangle size={14} />} label="Menaces" value="1" color="red" pulse />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-slate-400 text-sm font-mono hidden sm:flex items-center gap-2"><Clock size={14} />{currentTime.toLocaleTimeString('fr-FR')}</span>
                        <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg transition-all ${soundEnabled ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>{soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}</button>
                        <button onClick={() => setActiveTab('login')} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2">
                            <LogIn size={16} />
                            <span className="hidden sm:inline">Connexion</span>
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 flex overflow-hidden">
                    {activeTab === 'dashboard' && (
                        <>
                            <main className="flex-1 relative overflow-hidden">
                                <MapView drones={drones} selectedDrone={selectedDrone} onSelectDrone={setSelectedDrone} />
                                {selectedDrone && (
                                    <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-96 z-[1000]">
                                        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
                                            <div className="flex items-start justify-between mb-4">
                                                <div><div className="flex items-center gap-2 mb-1"><span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getStatusColor(selectedDrone.status).bg} text-white`}>{selectedDrone.status === 'threat' ? 'Menace' : selectedDrone.status === 'friendly' ? 'Ami' : 'Inconnu'}</span><span className="text-slate-500 text-xs font-mono">#{selectedDrone.id}</span></div><h3 className="text-lg font-bold text-white">{selectedDrone.type}</h3></div>
                                                <button onClick={() => setSelectedDrone(null)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all"><X size={18} /></button>
                                            </div>
                                            <div className="grid grid-cols-4 gap-3"><StatItem label="Altitude" value={`${selectedDrone.altitude}m`} /><StatItem label="Vitesse" value={`${selectedDrone.speed} km/h`} /><StatItem label="Direction" value={selectedDrone.direction} /><StatItem label="Distance" value={`${selectedDrone.distance}m`} /></div>
                                            {selectedDrone.status === 'threat' && <div className="mt-4 flex gap-2"><button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"><AlertTriangle size={16} />Neutraliser</button><button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"><Target size={16} />Suivre</button></div>}
                                        </div>
                                    </div>
                                )}
                            </main>
                            <aside className="w-80 bg-gradient-to-b from-slate-900 to-slate-950 border-l border-slate-800/50 flex flex-col">
                                <div className="p-4 border-b border-slate-800/50"><div className="flex items-center justify-between mb-3"><h3 className="font-bold text-white flex items-center gap-2"><Signal size={18} className="text-blue-400" />Détections Live</h3><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span></div>
                                    <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">{['all', 'threat', 'friendly', 'unknown'].map(f => <button key={f} onClick={() => setFilterStatus(f)} className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${filterStatus === f ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}>{f === 'all' ? 'Tous' : f === 'threat' ? 'Menaces' : f === 'friendly' ? 'Amis' : 'Inconnus'}</button>)}</div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-3 space-y-2">{filteredDetections.map(d => <DetectionCard key={d.id} detection={d} timeAgo={timeAgo} />)}{filteredDetections.length === 0 && <div className="text-center py-8 text-slate-500"><Filter size={32} className="mx-auto mb-2 opacity-50" /><p className="text-sm">Aucune détection</p></div>}</div>
                                <div className="p-3 border-t border-slate-800/50"><button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"><RefreshCw size={16} />Actualiser</button></div>
                            </aside>
                        </>
                    )}
                    {activeTab === 'history' && <HistoryPage />}
                    {activeTab === 'tracking' && <TrackingPage drones={drones} />}
                    {activeTab === 'config' && <ConfigPage />}
                    {activeTab === 'export' && (
                        <div className="flex-1 flex items-center justify-center">
                            <ExportPage />
                        </div>
                    )}
                    {activeTab === 'login' && <LoginPage />}
                </div>
            </div>
        </div>
    );
}

function NavItem({ icon, label, active, onClick, collapsed, badge }) { return <button onClick={onClick} className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-3 rounded-xl transition-all duration-200 group relative ${active ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}><span className={`transition-all ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{icon}</span>{!collapsed && <><span className="text-sm font-medium">{label}</span>{badge && <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}</>}{collapsed && badge && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{badge}</span>}</button> }
function StatusPill({ icon, label, value, color, pulse }) { const c = { emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400', red: 'bg-red-500/10 border-red-500/20 text-red-400' }; return <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${c[color]}`}>{pulse && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>}{!pulse && icon}<span className="text-xs font-medium"><span className="text-slate-500">{label}:</span> {value}</span></div> }
function StatItem({ label, value }) { return <div className="bg-slate-800/50 rounded-lg p-2 text-center"><div className="text-[10px] text-slate-500 uppercase mb-0.5">{label}</div><div className="text-sm font-bold text-white">{value}</div></div> }
function DetectionCard({ detection, timeAgo }) { return <div className={`p-3 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer ${detection.isNew ? 'animate-pulse' : ''} ${detection.status === 'threat' ? 'bg-gradient-to-r from-red-950/50 to-red-900/20 border-red-500/30' : detection.status === 'friendly' ? 'bg-gradient-to-r from-emerald-950/30 to-slate-900/50 border-emerald-500/20' : 'bg-slate-800/30 border-slate-700/50'}`}><div className="flex justify-between items-start mb-2"><div className="flex items-center gap-2">{detection.status === 'threat' ? <AlertCircle size={16} className="text-red-400" /> : detection.status === 'friendly' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Signal size={16} className="text-slate-400" />}<span className={`text-xs font-bold px-2 py-0.5 rounded-full ${detection.status === 'threat' ? 'bg-red-500/20 text-red-400' : detection.status === 'friendly' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>{detection.status === 'threat' ? 'ALERTE' : detection.status === 'friendly' ? 'AMI' : 'LOG'}</span></div><span className="text-[10px] text-slate-500">{timeAgo(detection.timestamp)}</span></div><h4 className="font-medium text-sm text-white mb-2">{detection.type}</h4><div className="flex items-center justify-between text-xs"><div className="flex items-center gap-3"><span className="flex items-center gap-1 text-slate-400"><Wifi size={12} />{detection.freq}</span><span className={`flex items-center gap-1 font-mono font-bold ${detection.rssi > -50 ? 'text-red-400' : detection.rssi > -70 ? 'text-amber-400' : 'text-emerald-400'}`}><Signal size={12} />{detection.rssi} dBm</span></div>{detection.droneId && <span className="text-slate-500 font-mono">#{detection.droneId}</span>}</div></div> }
