import React from 'react';

export function MoleculeBuilder() {
    return (
        <div className="p-12 bg-slate-900 border border-white/10 rounded-3xl text-center">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-400" />
            </div>
            <h3 className="text-xl font-display text-white mb-2">Molecule Builder</h3>
            <p className="text-slate-500 text-sm">Interactive molecular geometry engine - Standby Mode</p>
        </div>
    );
}

export default MoleculeBuilder;
