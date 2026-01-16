// Drone data and detection data
export const SAINTE_CROIX_CENTER = [46.8219, 6.5033];

export const initialDrones = [
    { id: 'DX-9901', lat: 46.825, lng: 6.510, status: 'threat', type: 'DJI Mavic 3', altitude: 120, speed: 45, direction: 'NE', distance: 450, battery: 67 },
    { id: 'FR-0042', lat: 46.818, lng: 6.498, status: 'friendly', type: 'Patrol Unit', altitude: 80, speed: 0, direction: 'S', distance: 120, battery: 89 },
    { id: 'UK-3371', lat: 46.830, lng: 6.520, status: 'unknown', type: 'Non identifié', altitude: 200, speed: 30, direction: 'W', distance: 890, battery: null }
];

export const historyData = [
    { id: 1, date: '2026-01-13', time: '10:45:22', droneId: 'DX-8821', type: 'Intrusion', status: 'neutralized', duration: '4m 32s' },
    { id: 2, date: '2026-01-12', time: '22:15:08', droneId: 'UK-1102', type: 'Survol suspect', status: 'escaped', duration: '12m 05s' },
    { id: 3, date: '2026-01-12', time: '14:30:45', droneId: 'FR-0041', type: 'Patrouille', status: 'completed', duration: '45m 00s' },
    { id: 4, date: '2026-01-11', time: '08:22:11', droneId: 'DX-7703', type: 'Intrusion', status: 'neutralized', duration: '2m 18s' },
    { id: 5, date: '2026-01-10', time: '19:55:33', droneId: 'UK-0099', type: 'Signal inconnu', status: 'lost', duration: '1m 45s' },
];

export const configSections = [
    {
        id: 'detection', label: 'Détection', icon: 'Radio', settings: [
            { key: 'sensitivity', label: 'Sensibilité', type: 'range', value: 75, min: 0, max: 100 },
            { key: 'range', label: 'Portée (km)', type: 'range', value: 2.5, min: 0.5, max: 5, step: 0.1 },
            { key: 'autoAlert', label: 'Alertes automatiques', type: 'toggle', value: true },
        ]
    },
    {
        id: 'alerts', label: 'Alertes', icon: 'Bell', settings: [
            { key: 'sound', label: 'Notifications sonores', type: 'toggle', value: true },
            { key: 'email', label: 'Alertes email', type: 'toggle', value: false },
            { key: 'threshold', label: 'Seuil RSSI (dBm)', type: 'range', value: -50, min: -90, max: -30 },
        ]
    },
    {
        id: 'system', label: 'Système', icon: 'Settings', settings: [
            { key: 'darkMode', label: 'Mode sombre', type: 'toggle', value: true },
            { key: 'language', label: 'Langue', type: 'select', value: 'fr', options: ['fr', 'en', 'de'] },
            { key: 'refresh', label: 'Rafraîchissement (s)', type: 'range', value: 5, min: 1, max: 30 },
        ]
    },
];

export const getStatusColor = (status) => {
    switch (status) {
        case 'threat': return { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500/30' };
        case 'friendly': return { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/30' };
        case 'unknown': return { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/30' };
        default: return { bg: 'bg-slate-500', text: 'text-slate-400', border: 'border-slate-500/30' };
    }
};
