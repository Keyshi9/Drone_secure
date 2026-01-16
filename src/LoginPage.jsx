import React from 'react';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4 relative">
                            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full"></div>
                            <Shield className="w-8 h-8 text-blue-400 relative" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Connexion Sécurisée</h2>
                        <p className="text-slate-400">Accédez au panneau de contrôle Drone Secure</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                    placeholder="admin@drone-secure.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0 focus:ring-offset-0" />
                                <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Rester connecté</span>
                            </label>
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">Mot de passe oublié ?</button>
                        </div>

                        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group">
                            <span>Se Connecter</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-800/50 text-center">
                        <p className="text-xs text-slate-500">
                            Accès restreint aux personnels autorisés.<br />
                            Toute tentative d'intrusion sera signalée.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
