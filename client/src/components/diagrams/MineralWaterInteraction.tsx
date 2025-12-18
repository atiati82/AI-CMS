import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MineralWaterInteraction() {
    const [activeMineral, setActiveMineral] = useState<string | null>(null);

    const minerals = [
        { id: 'Mg', name: 'Magnesium', role: 'Stabilizer', color: '#1aa7ff', cx: 200, cy: 150 },
        { id: 'SO4', name: 'Sulfate', role: 'Connector', color: '#f2c76c', cx: 400, cy: 100 },
        { id: 'Fe', name: 'Iron', role: 'Activator', color: '#ff5f5f', cx: 600, cy: 150 },
        { id: 'Si', name: 'Silica', role: 'Architect', color: '#38ffd1', cx: 400, cy: 300 }
    ];

    return (
        <div className="w-full overflow-hidden bg-[#020617] rounded-2xl border border-[rgba(255,255,255,0.1)] p-8 my-8 relative">
            {/* Instruction Overlay */}
            <div className="absolute top-4 left-4 text-white/50 text-sm">
                Hover nodes to see mineral roles
            </div>

            <svg viewBox="0 0 800 400" className="w-full h-auto" style={{ overflow: "visible" }}>

                {/* Background Network Mist */}
                <motion.circle
                    cx="400" cy="200" r="150"
                    fill="radial-gradient(circle, rgba(26,167,255,0.1) 0%, transparent 70%)"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Connections Network */}
                <g strokeLinecap="round">
                    {minerals.map((m1, i) => (
                        minerals.map((m2, j) => {
                            if (i >= j) return null; // Avoid duplicate lines
                            return (
                                <motion.line
                                    key={`${m1.id}-${m2.id}`}
                                    x1={m1.cx} y1={m1.cy}
                                    x2={m2.cx} y2={m2.cy}
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.2 }}
                                    transition={{ duration: 2, delay: i * 0.2 }}
                                />
                            );
                        })
                    ))}
                    {/* Active Connections Highlight */}
                    {activeMineral && minerals.map((m) => {
                        if (m.id === activeMineral) return null;
                        const active = minerals.find(min => min.id === activeMineral);
                        if (!active) return null;
                        return (
                            <motion.line
                                key={`active-${active.id}-${m.id}`}
                                x1={active.cx} y1={active.cy}
                                x2={m.cx} y2={m.cy}
                                stroke={active.color}
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5 }}
                                opacity="0.6"
                            />
                        )
                    })}
                </g>

                {/* Mineral Nodes */}
                {minerals.map((mineral) => (
                    <motion.g
                        key={mineral.id}
                        onHoverStart={() => setActiveMineral(mineral.id)}
                        onHoverEnd={() => setActiveMineral(null)}
                        style={{ cursor: 'pointer' }}
                    >
                        {/* Pulsing Aura */}
                        <motion.circle
                            cx={mineral.cx}
                            cy={mineral.cy}
                            r="30"
                            fill={mineral.color}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: activeMineral === mineral.id ? 0.3 : 0.1,
                                scale: activeMineral === mineral.id ? 1.2 : 1
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.circle
                            cx={mineral.cx}
                            cy={mineral.cy}
                            r="30"
                            fill={mineral.color}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [0.8, 1.5], opacity: [0.2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Core Node */}
                        <circle
                            cx={mineral.cx}
                            cy={mineral.cy}
                            r="20"
                            fill="#0f172a"
                            stroke={mineral.color}
                            strokeWidth="2"
                        />
                        <text
                            x={mineral.cx}
                            y={mineral.cy + 5}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize="14"
                            fontWeight="bold"
                        >
                            {mineral.id}
                        </text>

                        {/* Label (Always visible or on hover?) - Let's do always visible name, role on hover */}
                        <text
                            x={mineral.cx}
                            y={mineral.cy + 40}
                            textAnchor="middle"
                            fill={mineral.color}
                            fontSize="12"
                            fontWeight="600"
                            opacity="0.8"
                        >
                            {mineral.name}
                        </text>
                    </motion.g>
                ))}

            </svg>

            {/* Info Panel Overlay */}
            <AnimatePresence>
                {activeMineral && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0f172a]/90 backdrop-blur border border-white/10 px-6 py-4 rounded-xl text-center shadow-xl"
                    >
                        {(() => {
                            const m = minerals.find(min => min.id === activeMineral);
                            if (!m) return null;
                            return (
                                <>
                                    <h4 className="text-lg font-bold" style={{ color: m.color }}>{m.name} ({m.id})</h4>
                                    <p className="text-white text-sm">Role: <span className="font-semibold">{m.role}</span></p>
                                    <p className="text-white/60 text-xs mt-1">Acts as a node for structure & {m.role.toLowerCase()}</p>
                                </>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
