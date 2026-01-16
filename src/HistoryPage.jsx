import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertTriangle, Search } from 'lucide-react';
import { historyData } from './data';

export default function HistoryPage() {
    const [filter, setFilter] = React.useState('all');
    const [search, setSearch] = React.useState('');

    const filteredData = historyData.filter(item => {
        const matchesFilter = filter === 'all' || item.status === filter;
        const matchesSearch = item.droneId.toLowerCase().includes(search.toLowerCase()) ||
            item.type.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'neutralized': return <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full text-xs"><CheckCircle2 size={12} /> Neutralisé</span>;
            case 'escaped': return <span className="flex items-center gap-1 text-red-400 bg-red-500/20 px-2 py-1 rounded-full text-xs"><XCircle size={12} /> Échappé</span>;
            case 'completed': return <span className="flex items-center gap-1 text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full text-xs"><CheckCircle2 size={12} /> Terminé</span>;
            case 'lost': return <span className="flex items-center gap-1 text-amber-400 bg-amber-500/20 px-2 py-1 rounded-full text-xs"><AlertTriangle size={12} /> Perdu</span>;
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Historique des Détections</h2>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">Tous</option>
                        <option value="neutralized">Neutralisés</option>
                        <option value="escaped">Échappés</option>
                        <option value="completed">Terminés</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full">
                    <thead className="bg-slate-900 sticky top-0">
                        <tr className="text-left text-xs text-slate-500 uppercase tracking-wider">
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Heure</th>
                            <th className="px-4 py-3">ID Drone</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Durée</th>
                            <th className="px-4 py-3">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {filteredData.map(item => (
                            <tr key={item.id} className="hover:bg-slate-900/50 transition-colors cursor-pointer">
                                <td className="px-4 py-4 text-sm text-slate-300">{item.date}</td>
                                <td className="px-4 py-4 text-sm text-slate-400 font-mono">{item.time}</td>
                                <td className="px-4 py-4 text-sm text-white font-mono">#{item.droneId}</td>
                                <td className="px-4 py-4 text-sm text-slate-300">{item.type}</td>
                                <td className="px-4 py-4 text-sm text-slate-400 flex items-center gap-1"><Clock size={14} /> {item.duration}</td>
                                <td className="px-4 py-4">{getStatusBadge(item.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredData.length === 0 && (
                    <div className="text-center py-12 text-slate-500">Aucun résultat trouvé</div>
                )}
            </div>
        </div>
    );
}
