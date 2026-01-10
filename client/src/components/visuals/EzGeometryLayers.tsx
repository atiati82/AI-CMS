import React from 'react';

export const EzGeometryLayers: React.FC = () => {
    return (
        <div className="w-full aspect-video bg-slate-900 rounded-2xl border border-dashed border-emerald-500/30 flex items-center justify-center p-8 overflow-hidden relative">
            {/* Visual background effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent)]" />

            <div className="relative z-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 mx-auto flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/40 animate-pulse" />
                </div>
                <div>
                    <h4 className="text-emerald-400 font-display text-lg">EZ Layer Mapping</h4>
                    <p className="text-white/40 text-xs mt-1">Structure vs. Bulk Water Interface</p>
                </div>

                {/* Visual layers mock */}
                <div className="flex flex-col gap-2 max-w-[200px] mx-auto mt-4">
                    <div className="h-2 w-full bg-emerald-500/20 rounded-full" />
                    <div className="h-2 w-3/4 bg-emerald-500/15 rounded-full mx-auto" />
                    <div className="h-2 w-1/2 bg-emerald-500/10 rounded-full mx-auto" />
                </div>
            </div>
        </div>
    );
};
