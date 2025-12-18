import React from 'react';
import { motion } from 'framer-motion';

interface MagnetPlacementDiagramProps {
    mode?: 'side' | 'two-sided' | 'flow';
    size?: number;
}

export const MagnetPlacementDiagram: React.FC<MagnetPlacementDiagramProps> = ({
    mode = 'side',
    size = 300
}) => {
    // Scaling factor based on standard 300px width
    const s = size / 300;

    const colors = {
        glass: "rgba(200, 230, 255, 0.4)",
        water: "rgba(50, 150, 255, 0.2)",
        waterOutline: "rgba(50, 150, 255, 0.6)",
        magnetRed: "#EF4444", // North
        magnetBlue: "#3B82F6", // South
        fieldLine: "rgba(100, 100, 255, 0.3)",
        text: "currentColor"
    };

    // Helper for Magnet Component
    const Magnet = ({ x, y, rotation = 0, label = "N", color = colors.magnetRed }: any) => (
        <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            transform={`translate(${x}, ${y}) rotate(${rotation})`}
        >
            <rect x="-15" y="-30" width="30" height="60" rx="4" fill={color} stroke="white" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14" style={{ pointerEvents: 'none' }}>{label}</text>
        </motion.g>
    );

    // Field Lines Animation
    const FieldLine = ({ path }: { path: string }) => (
        <motion.path
            d={path}
            stroke={colors.fieldLine}
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            animate={{ strokeDashoffset: [0, -10] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
    );

    return (
        <div className="diagram-container relative flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <svg width={size} height={size * 0.8} viewBox="0 0 300 240" className="overflow-visible">

                {/* Common Container Elements (Glass) */}
                {mode !== 'flow' && (
                    <g transform="translate(150, 120)">
                        {/* Water Fill */}
                        <path d="M-40,-50 L40,-50 L40,60 C40,75 25,80 0,80 C-25,80 -40,75 -40,60 Z" fill={colors.water} />
                        {/* Glass Outline */}
                        <path d="M-40,-60 L-40,60 C-40,75 -25,85 0,85 C25,85 40,75 40,60 L40,-60" fill="none" stroke={colors.waterOutline} strokeWidth="3" strokeLinecap="round" />
                        <ellipse cx="0" cy="-60" rx="40" ry="10" fill={colors.glass} stroke={colors.waterOutline} strokeWidth="2" />
                    </g>
                )}

                {/* --- MODE: SIDE PLACEMENT --- */}
                {mode === 'side' && (
                    <>
                        {/* Field Lines curving into water */}
                        <FieldLine path="M90,120 Q120,120 150,120" />
                        <FieldLine path="M90,100 Q120,110 150,100" />
                        <FieldLine path="M90,140 Q120,130 150,140" />

                        {/* Magnet on Left */}
                        <Magnet x={75} y={120} rotation={90} label="N" color={colors.magnetRed} />

                        {/* Text Label */}
                        <text x="150" y="230" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="600">Side Placement (Fixed Distance)</text>
                    </>
                )}

                {/* --- MODE: TWO-SIDED --- */}
                {mode === 'two-sided' && (
                    <>
                        {/* Field Lines going straight through */}
                        <FieldLine path="M90,120 L210,120" />
                        <FieldLine path="M90,100 L210,100" />
                        <FieldLine path="M90,140 L210,140" />

                        {/* Magnet Left (North facing in) */}
                        <Magnet x={75} y={120} rotation={90} label="N" color={colors.magnetRed} />
                        {/* Magnet Right (South facing in) */}
                        <Magnet x={225} y={120} rotation={-90} label="S" color={colors.magnetBlue} />

                        <text x="150" y="230" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="600">Through-Field (N ↔ S)</text>
                    </>
                )}

                {/* --- MODE: FLOW-THROUGH --- */}
                {mode === 'flow' && (
                    <g transform="translate(150, 120)">
                        {/* Pipe */}
                        <rect x="-120" y="-20" width="240" height="40" fill="url(#pipeGradient)" stroke={colors.waterOutline} strokeWidth="2" />
                        <defs>
                            <linearGradient id="pipeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={colors.glass} stopOpacity="0.8" />
                                <stop offset="50%" stopColor={colors.water} stopOpacity="0.5" />
                                <stop offset="100%" stopColor={colors.glass} stopOpacity="0.8" />
                            </linearGradient>
                        </defs>

                        {/* Arrows indicating flow */}
                        <motion.path
                            d="M-100,0 L100,0"
                            stroke="white"
                            strokeWidth="2"
                            strokeDasharray="10,10"
                            animate={{ strokeDashoffset: -20 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                        <path d="M100,0 L90,-5 M100,0 L90,5" stroke="white" strokeWidth="2" fill="none" />

                        {/* Ring Magnet (Simulated as top/bottom blocks) */}
                        <rect x="-20" y="-35" width="40" height="15" fill={colors.magnetRed} rx="2" stroke="white" />
                        <rect x="-20" y="20" width="40" height="15" fill={colors.magnetBlue} rx="2" stroke="white" />

                        {/* Field Lines Vertical */}
                        <FieldLine path="M0,-20 L0,20" />
                        <FieldLine path="M-15,-20 L-15,20" />
                        <FieldLine path="M15,-20 L15,20" />

                        <text x="0" y="80" textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="600">Flow-Through (Orthogonal Field)</text>
                    </g>
                )}

            </svg>
        </div>
    );
};

export default MagnetPlacementDiagram;
