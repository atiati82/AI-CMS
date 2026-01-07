/**
 * LivingGrid - Animated background grid effect
 * Creates a subtle pulsing grid pattern for hero backgrounds
 */

import { motion } from "framer-motion";

interface LivingGridProps {
    variant?: "bioelectric" | "crystalline" | "water" | "default";
    className?: string;
}

export function LivingGrid({ variant = "default", className = "" }: LivingGridProps) {
    const colors = {
        bioelectric: { primary: "rgba(138, 43, 226, 0.1)", secondary: "rgba(0, 255, 255, 0.05)" },
        crystalline: { primary: "rgba(147, 51, 234, 0.1)", secondary: "rgba(168, 85, 247, 0.05)" },
        water: { primary: "rgba(59, 130, 246, 0.1)", secondary: "rgba(6, 182, 212, 0.05)" },
        default: { primary: "rgba(255, 255, 255, 0.05)", secondary: "rgba(255, 255, 255, 0.02)" }
    };

    const colorSet = colors[variant] || colors.default;

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Grid Pattern */}
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id={`living-grid-${variant}`}
                        width="60"
                        height="60"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M60 0 L0 0 0 60"
                            fill="none"
                            stroke={colorSet.primary}
                            strokeWidth="1"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#living-grid-${variant})`} />
            </svg>

            {/* Pulsing Overlay */}
            <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: colorSet.secondary }}
                animate={{
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Radial Glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at center, ${colorSet.primary} 0%, transparent 70%)`
                }}
            />
        </div>
    );
}

export default LivingGrid;
