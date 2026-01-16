import React, { useState } from 'react';
import { Settings, Radio, Bell, Save, RotateCcw } from 'lucide-react';
import { configSections } from './data';

export default function ConfigPage() {
    const [config, setConfig] = useState(() => {
        const initial = {};
        configSections.forEach(section => {
            section.settings.forEach(setting => {
                initial[setting.key] = setting.value;
            });
        });
        return initial;
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const getIcon = (name) => {
        switch (name) {
            case 'Radio': return <Radio size={20} />;
            case 'Bell': return <Bell size={20} />;
            default: return <Settings size={20} />;
        }
    };

    return (
        <div className="h-full bg-slate-950 p-6 overflow-auto">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Configuration</h2>
                    <div className="flex gap-3">
                        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center gap-2 transition-all">
                            <RotateCcw size={16} /> Réinitialiser
                        </button>
                        <button onClick={handleSave} className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                            <Save size={16} /> {saved ? 'Sauvegardé !' : 'Sauvegarder'}
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {configSections.map(section => (
                        <div key={section.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
                                <span className="text-blue-400">{getIcon(section.icon)}</span>
                                <h3 className="font-semibold text-white">{section.label}</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                {section.settings.map(setting => (
                                    <div key={setting.key} className="flex items-center justify-between">
                                        <label className="text-slate-300">{setting.label}</label>
                                        {setting.type === 'toggle' && (
                                            <button
                                                onClick={() => handleChange(setting.key, !config[setting.key])}
                                                className={`w-12 h-6 rounded-full transition-all ${config[setting.key] ? 'bg-blue-600' : 'bg-slate-700'}`}
                                            >
                                                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${config[setting.key] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                            </button>
                                        )}
                                        {setting.type === 'range' && (
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="range"
                                                    min={setting.min}
                                                    max={setting.max}
                                                    step={setting.step || 1}
                                                    value={config[setting.key]}
                                                    onChange={(e) => handleChange(setting.key, parseFloat(e.target.value))}
                                                    className="w-32 accent-blue-500"
                                                />
                                                <span className="text-white font-mono w-16 text-right">{config[setting.key]}</span>
                                            </div>
                                        )}
                                        {setting.type === 'select' && (
                                            <select
                                                value={config[setting.key]}
                                                onChange={(e) => handleChange(setting.key, e.target.value)}
                                                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                                            >
                                                {setting.options.map(opt => (
                                                    <option key={opt} value={opt}>{opt.toUpperCase()}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
