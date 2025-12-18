import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

type PillarType = "water" | "mineral" | "matrix";

interface PillarCardProps {
    type: PillarType;
    title: string;
    bullets: string[];
    href: string;
    icon: React.ReactNode;
}

// Pillar theme configurations
const pillarThemes: Record<PillarType, {
    color: string;
    bgPattern: string;
    glowColor: string;
}> = {
    water: {
        color: "#1aa7ff",
        bgPattern: "radial-gradient(ellipse at 50% 100%, rgba(26, 167, 255, 0.15) 0%, transparent 60%)",
        glowColor: "rgba(26, 167, 255, 0.3)",
    },
    mineral: {
        color: "#63b4ff",
        bgPattern: "radial-gradient(ellipse at 50% 100%, rgba(99, 180, 255, 0.12) 0%, transparent 60%)",
        glowColor: "rgba(99, 180, 255, 0.3)",
    },
    matrix: {
        color: "#f6d56a",
        bgPattern: "radial-gradient(ellipse at 50% 100%, rgba(246, 213, 106, 0.12) 0%, transparent 60%)",
        glowColor: "rgba(246, 213, 106, 0.3)",
    },
};

/**
 * PillarCard - Reusable card for the three science pillars
 * 
 * Features:
 * - Tree-themed styling based on pillar type
 * - Hover lift and glow effects
 * - Icon slot and bullet points
 */
export function PillarCard({ type, title, bullets, href, icon }: PillarCardProps) {
    const theme = pillarThemes[type];

    return (
        <Link href={href}>
            <motion.div
                className="group relative h-full cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* Glow Effect (appears on hover) */}
                <motion.div
                    className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                    style={{ backgroundColor: theme.glowColor }}
                />

                {/* Card */}
                <div
                    className="relative h-full p-8 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:border-opacity-30"
                    style={{
                        background: `linear-gradient(180deg, rgba(11, 16, 32, 0.9) 0%, rgba(5, 6, 11, 0.95) 100%)`,
                        borderColor: `${theme.color}20`,
                    }}
                    data-pillar={type}
                >
                    {/* Background Pattern */}
                    <div
                        className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: theme.bgPattern }}
                    />

                    {/* Hexagon Pattern Overlay for Water */}
                    {type === "water" && (
                        <div className="absolute inset-0 opacity-10">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <pattern id="hexPattern" width="20" height="17.32" patternUnits="userSpaceOnUse">
                                    <polygon
                                        points="10,0 20,5.77 20,17.32 10,23.09 0,17.32 0,5.77"
                                        fill="none"
                                        stroke={theme.color}
                                        strokeWidth="0.3"
                                    />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#hexPattern)" />
                            </svg>
                        </div>
                    )}

                    {/* Periodic Table Pattern for Mineral */}
                    {type === "mineral" && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-5 flex gap-1 p-4 overflow-hidden">
                            {["Mg", "Fe", "Si", "Ca", "Zn"].map((el, i) => (
                                <div
                                    key={el}
                                    className="w-8 h-8 border border-current rounded text-[8px] flex items-center justify-center"
                                    style={{ color: theme.color }}
                                >
                                    {el}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Lattice Pattern for Matrix */}
                    {type === "matrix" && (
                        <div className="absolute inset-0 opacity-10">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <line x1="0" y1="0" x2="100" y2="100" stroke={theme.color} strokeWidth="0.2" />
                                <line x1="100" y1="0" x2="0" y2="100" stroke={theme.color} strokeWidth="0.2" />
                                <line x1="50" y1="0" x2="50" y2="100" stroke={theme.color} strokeWidth="0.2" />
                                <line x1="0" y1="50" x2="100" y2="50" stroke={theme.color} strokeWidth="0.2" />
                            </svg>
                        </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Icon */}
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
                            style={{
                                backgroundColor: `${theme.color}15`,
                                border: `1px solid ${theme.color}30`,
                            }}
                        >
                            <div style={{ color: theme.color }}>{icon}</div>
                        </div>

                        {/* Title */}
                        <h3
                            className="text-xl font-display font-semibold mb-4 transition-colors duration-300"
                            style={{ color: theme.color }}
                        >
                            {title}
                        </h3>

                        {/* Bullets */}
                        <ul className="space-y-3">
                            {bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                                    <span
                                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                        style={{ backgroundColor: theme.color }}
                                    />
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Explore Link */}
                        <div
                            className="mt-6 text-sm font-semibold flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity"
                            style={{ color: theme.color }}
                        >
                            Explore Pillar
                            <motion.span
                                className="inline-block"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

export default PillarCard;
