import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Database, Microscope, Search, ShieldCheck,
    Share2, Cpu, Grid, Maximize, AlertCircle
} from 'lucide-react';

const GridLayout = () => {
    const [selectedCell, setSelectedCell] = useState<number | null>(null);
    const [dataStream, setDataStream] = useState<string[]>([]);

    // Simulate real-time data stream
    useEffect(() => {
        const interval = setInterval(() => {
            const hex = Math.random().toString(16).substr(2, 8).toUpperCase();
            setDataStream(prev => [`0x${hex} :: ION_GATE_OPEN`, ...prev].slice(0, 10));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const gridItems = [
        { id: 1, type: 'hero', col: 'col-span-2 row-span-2', title: 'Primary Analysis' },
        { id: 2, type: 'stat', col: 'col-span-1', title: 'Voltage' },
        { id: 3, type: 'stat', col: 'col-span-1', title: 'pH Level' },
        { id: 4, type: 'visual', col: 'col-span-1 row-span-2', title: 'Spectral Map' },
        { id: 5, type: 'terminal', col: 'col-span-2', title: 'System Logs' },
        { id: 6, type: 'control', col: 'col-span-1', title: 'Calibration' },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-emerald-50 font-mono p-4 md:p-8 selection:bg-emerald-500/30 overflow-hidden">

            {/* --- HUD Elements --- */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none p-4 md:p-8 z-50 flex flex-col justify-between">
                <header className="flex justify-between items-start border-b border-emerald-900/50 pb-4 backdrop-blur-sm pointer-events-auto">
                    <div className="flex items-center gap-4">
                        <Grid className="text-emerald-500 animate-pulse" />
                        <div>
                            <h1 className="text-xl font-bold tracking-widest uppercase">Andara <span className="text-emerald-500 text-xs align-top">SYS.V9</span></h1>
                            <div className="text-[10px] text-emerald-700">SECURE CONNECTION ESTABLISHED</div>
                        </div>
                    </div>
                    <div className="flex gap-8 text-xs text-emerald-600 uppercase tracking-wider">
                        <div className="flex flex-col items-center">
                            <span>Sys.Load</span>
                            <span className="text-emerald-400 font-bold">12%</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>Net.Link</span>
                            <span className="text-emerald-400 font-bold">ACTIVE</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>Local.Time</span>
                            <span className="text-emerald-400 font-bold">14:02:59</span>
                        </div>
                    </div>
                </header>

                <footer className="flex justify-between items-end border-t border-emerald-900/50 pt-4 pointer-events-auto">
                    <div className="text-[10px] text-emerald-800 w-1/3">
                        Scanning frequency range 432Hz to 963Hz. Quantum coherence stable.
                    </div>
                    <div className="flex gap-2">
                        <div className="w-32 h-2 bg-emerald-900/30 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-emerald-500"
                                animate={{ width: ["10%", "60%", "30%"] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </div>
                </footer>
            </div>

            {/* --- Main Grid --- */}
            <div className="max-w-[1600px] mx-auto h-[calc(100vh-8rem)] mt-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 gap-4 h-full">

                    {/* Hero Module */}
                    <motion.div
                        className="col-span-1 md:col-span-2 row-span-2 bg-emerald-950/10 border border-emerald-500/20 rounded-lg p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors cursor-pointer backdrop-blur-md"
                        layoutId="card-1"
                        onClick={() => setSelectedCell(1)}
                    >
                        <div className="absolute top-2 right-2 text-emerald-800 group-hover:text-emerald-400">
                            <Maximize size={16} />
                        </div>
                        <h2 className="text-emerald-500 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Microscope size={16} /> Primary Analysis
                        </h2>
                        <div className="h-[80%] flex items-center justify-center relative">
                            {/* Simulated 3D Model Placeholder */}
                            <div className="w-48 h-48 border border-emerald-500/30 rounded-full animate-spin-slow flex items-center justify-center relative">
                                <div className="absolute inset-0 border-t-2 border-emerald-400 rounded-full animate-ping" />
                                <div className="w-32 h-32 border border-emerald-500/50 rounded-full animate-reverse-spin" />
                                <Cpu size={32} className="text-emerald-400" />
                            </div>
                            <div className="absolute bottom-0 w-full text-center">
                                <p className="text-2xl font-bold">Ionic Composition</p>
                                <p className="text-emerald-600 text-sm">Sample ID: #882-A</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stat Module 1 */}
                    <div className="bg-emerald-950/10 border border-emerald-500/20 rounded-lg p-6 relative group hover:bg-emerald-900/10">
                        <h3 className="text-emerald-600 text-xs uppercase mb-2">Cell Voltage</h3>
                        <div className="text-4xl font-bold text-white flex items-end gap-2">
                            -50 <span className="text-sm font-normal text-emerald-500 mb-2">mV</span>
                        </div>
                        <div className="w-full h-1 bg-emerald-900/50 mt-4">
                            <motion.div className="h-full bg-emerald-400" animate={{ width: "80%" }} />
                        </div>
                    </div>

                    {/* Stat Module 2 */}
                    <div className="bg-emerald-950/10 border border-emerald-500/20 rounded-lg p-6 relative group hover:bg-emerald-900/10">
                        <h3 className="text-emerald-600 text-xs uppercase mb-2">pH Level</h3>
                        <div className="text-4xl font-bold text-white flex items-end gap-2">
                            7.8 <span className="text-sm font-normal text-emerald-500 mb-2">alkaline</span>
                        </div>
                        <div className="flex gap-1 mt-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className={`h-2 flex-1 rounded-sm ${i < 6 ? 'bg-emerald-500' : 'bg-emerald-900'}`} />
                            ))}
                        </div>
                    </div>

                    {/* Terminal Module */}
                    <div className="col-span-1 md:col-span-2 row-span-1 bg-black border border-emerald-500/20 rounded-lg p-4 font-mono text-xs text-emerald-400/80 overflow-hidden relative">
                        <div className="absolute top-2 right-2 text-emerald-800"><Database size={14} /></div>
                        <h3 className="mb-2 text-emerald-700 uppercase">System Logs</h3>
                        <div className="flex flex-col-reverse h-full">
                            {dataStream.map((log, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1 - (i * 0.1), x: 0 }}>
                                    <span className="text-emerald-800">[{new Date().toLocaleTimeString()}]</span> {log}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Module */}
                    <div className="col-span-1 md:col-span-1 row-span-2 bg-emerald-950/5 border border-emerald-500/20 rounded-lg p-6 relative overflow-hidden">
                        <h3 className="text-emerald-600 text-xs uppercase mb-4 flex gap-2 items-center"><Activity size={12} /> Spectral Map</h3>
                        <div className="absolute inset-0 pt-16 px-4">
                            {/* Audio Visualizer Bars Simulation */}
                            <div className="flex items-end justify-between h-full pb-4 gap-1">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-full bg-emerald-500/40 rounded-t-sm"
                                        animate={{ height: ["20%", "80%", "30%"] }}
                                        transition={{
                                            duration: 0.5 + Math.random(),
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            delay: i * 0.1
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Control Module */}
                    <div className="col-span-1 md:col-span-1 bg-emerald-950/10 border border-emerald-500/20 rounded-lg p-6 flex flex-col justify-between">
                        <h3 className="text-emerald-600 text-xs uppercase">Security</h3>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 rounded-full">
                                <ShieldCheck className="text-emerald-400" size={24} />
                            </div>
                            <div>
                                <div className="font-bold">Protected</div>
                                <div className="text-xs text-emerald-600">AES-256 Encrypted</div>
                            </div>
                        </div>
                        <button className="w-full py-2 border border-emerald-500/50 text-emerald-400 text-xs uppercase hover:bg-emerald-500/20 transition-colors rounded">Run Diagnostics</button>
                    </div>

                    {/* CTA Module */}
                    <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-emerald-900/40 to-transparent border border-emerald-500/20 rounded-lg p-6 flex items-center justify-between group cursor-pointer hover:border-emerald-400/50 transition-all">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Access Full Database</h3>
                            <p className="text-sm text-emerald-400/70">Unlock deep research archives and study protocols.</p>
                        </div>
                        <div className="p-4 bg-emerald-500 text-black rounded-lg group-hover:scale-105 transition-transform">
                            <ArrowRightLink />
                        </div>
                    </div>

                </div>
            </div>

            {/* --- Overlay Modal (AnimatePresence) --- */}
            <AnimatePresence>
                {selectedCell && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-8"
                        onClick={() => setSelectedCell(null)}
                    >
                        <motion.div
                            layoutId={`card-${selectedCell}`}
                            className="bg-[#0a0a0a] border border-emerald-500 w-full max-w-4xl aspect-video rounded-xl p-8 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedCell(null)}
                                className="absolute top-4 right-4 text-emerald-500 hover:text-white"
                            >
                                CLOSE [ESC]
                            </button>
                            <h2 className="text-3xl font-bold text-emerald-400 mb-8">Detailed Ionic Analysis</h2>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="h-64 bg-emerald-900/10 border border-emerald-500/30 rounded flex items-center justify-center">
                                    [3D Model Viewport]
                                </div>
                                <div className="space-y-4">
                                    <div className="border-b border-emerald-900 pb-2">
                                        <div className="text-xs text-emerald-600 uppercase">Conductivity</div>
                                        <div className="text-xl">1250 µS/cm</div>
                                    </div>
                                    <div className="border-b border-emerald-900 pb-2">
                                        <div className="text-xs text-emerald-600 uppercase">Structure</div>
                                        <div className="text-xl">Hexagonal (H3O2)</div>
                                    </div>
                                    <div className="border-b border-emerald-900 pb-2">
                                        <div className="text-xs text-emerald-600 uppercase">TDS</div>
                                        <div className="text-xl">High Mineral</div>
                                    </div>
                                    <div className="p-4 bg-emerald-900/20 text-emerald-300 text-sm rounded mt-4">
                                        <AlertCircle size={16} className="inline mr-2" />
                                        Sample exhibits enhanced coherence field.
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ArrowRightLink = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
)

export default GridLayout;
