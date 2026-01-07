import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type IconTopic = string;

interface AndaraDynamicIconProps {
    topic: string;
    className?: string;
    size?: number;
    showGlow?: boolean;
}

// SVG Gradient Definitions (reusable)
const GradientDefs = () => (
    <defs>
        <linearGradient id="andaraGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B8860B" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#DAA520" />
        </linearGradient>
        <linearGradient id="andaraCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="andaraPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="andaraEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="andaraAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
    </defs>
);

export function AndaraDynamicIcon({
    topic,
    className,
    size = 48,
    showGlow = true
}: AndaraDynamicIconProps) {

    // Normalize topic to key
    const getTopicKey = (t: string): IconTopic => {
        const lower = t.toLowerCase();

        // Specific page matches first
        if (lower.match(/bioelectric|voltage|cell-voltage/)) return "bioelectric";
        if (lower.match(/proton|gradient|atp/)) return "proton";
        if (lower.match(/turbidity|clarity|flocculation/)) return "turbidity";
        if (lower.match(/magnetics|magnetic|field/)) return "magnetics";
        if (lower.match(/crystalline|matrix|geometry|hexagon/)) return "crystalline";
        if (lower.match(/microbiome|gut|bacteria|ferment/)) return "microbiome";
        if (lower.match(/phase|phases|liquid|gas|solid/)) return "waterPhases";
        if (lower.match(/ez-water|ez|exclusion|h3o2/)) return "ezWater";
        if (lower.match(/vortex|spiral|flow|spin/)) return "vortex";
        if (lower.match(/sulfate|sulfur|so4/)) return "sulfate";
        if (lower.match(/science|library|research/)) return "science";
        if (lower.match(/shop|product|buy|cart/)) return "shop";
        if (lower.match(/trust|quality|lab|certif/)) return "trust";
        if (lower.match(/about|story|mission|vision/)) return "about";
        if (lower.match(/terrain|model|symptom/)) return "terrain";
        if (lower.match(/dna|collagen|liquid-crystal/)) return "dna";
        if (lower.match(/consciousness|spirit|ion-intelligence/)) return "consciousness";
        if (lower.match(/sacred-dna|helix|strand/)) return "sacredDna";
        if (lower.match(/sacred-hex|honeycomb|sacred-triangle/)) return "sacredHexTriangle";
        if (lower.match(/sacred-matrix|lattice|geometric-matrix/)) return "sacredMatrix";
        if (lower.match(/sacred-network|mesh|node-network/)) return "sacredNetwork";

        // Generic category fallbacks
        if (lower.match(/water|hydration|fluid/)) return "water";
        if (lower.match(/energy|detox|charge/)) return "energy";
        if (lower.match(/mineral|crystal|structure|solid/)) return "mineral";
        return "default";
    };

    const key = getTopicKey(topic);

    // Extended SVG Paths with Andara Gradient Styling
    const paths: Record<string, React.ReactElement> = {
        // === WATER SCIENCE ===
        water: (
            <g>
                <GradientDefs />
                <path d="M50 20 L76 35 L76 65 L50 80 L24 65 L24 35 Z" stroke="url(#andaraCyan)" strokeWidth="2" fill="none" />
                <path d="M50 35 L63 42.5 L63 57.5 L50 65 L37 57.5 L37 42.5 Z" stroke="url(#andaraCyan)" strokeWidth="1" fill="rgba(6,182,212,0.15)" />
                <circle cx="50" cy="50" r="4" fill="#06b6d4" />
            </g>
        ),
        ezWater: (
            <g>
                <GradientDefs />
                {/* Hexagonal EZ layer representation */}
                <path d="M50 15 L75 30 L75 60 L50 75 L25 60 L25 30 Z" stroke="url(#andaraCyan)" strokeWidth="2" fill="none" />
                <path d="M50 25 L67 35 L67 55 L50 65 L33 55 L33 35 Z" stroke="url(#andaraCyan)" strokeWidth="1.5" fill="rgba(6,182,212,0.1)" />
                <path d="M50 35 L59 40 L59 52 L50 57 L41 52 L41 40 Z" stroke="url(#andaraCyan)" strokeWidth="1" fill="rgba(6,182,212,0.2)" />
                <text x="50" y="52" textAnchor="middle" fill="#06b6d4" fontSize="8" fontWeight="bold">EZ</text>
            </g>
        ),
        waterPhases: (
            <g>
                <GradientDefs />
                {/* Three droplets representing phases */}
                <path d="M30 55 Q30 35 30 35 Q20 50 30 60 Q40 50 30 35" stroke="url(#andaraCyan)" strokeWidth="1.5" fill="rgba(6,182,212,0.2)" />
                <path d="M50 45 Q50 25 50 25 Q35 45 50 55 Q65 45 50 25" stroke="url(#andaraCyan)" strokeWidth="2" fill="rgba(6,182,212,0.3)" />
                <path d="M70 55 Q70 35 70 35 Q60 50 70 60 Q80 50 70 35" stroke="url(#andaraCyan)" strokeWidth="1.5" fill="rgba(6,182,212,0.2)" />
                <text x="50" y="72" textAnchor="middle" fill="#0891b2" fontSize="7">H₂O</text>
            </g>
        ),
        turbidity: (
            <g>
                <GradientDefs />
                {/* Wave pattern for clarity */}
                <path d="M20 40 Q35 30 50 40 Q65 50 80 40" stroke="url(#andaraCyan)" strokeWidth="2" fill="none" />
                <path d="M20 50 Q35 40 50 50 Q65 60 80 50" stroke="url(#andaraCyan)" strokeWidth="2" fill="none" opacity="0.7" />
                <path d="M20 60 Q35 50 50 60 Q65 70 80 60" stroke="url(#andaraCyan)" strokeWidth="2" fill="none" opacity="0.4" />
                <circle cx="50" cy="50" r="3" fill="#06b6d4" />
            </g>
        ),
        vortex: (
            <g>
                <GradientDefs />
                {/* Spiral vortex pattern */}
                <path d="M50 50 m0 0 a2 2 0 0 1 4 4 a6 6 0 0 1 -10 10 a14 14 0 0 1 20 -20 a24 24 0 0 1 -32 32" stroke="url(#andaraPurple)" fill="none" strokeWidth="2" strokeLinecap="round" />
                <circle cx="50" cy="50" r="4" fill="url(#andaraPurple)" />
            </g>
        ),

        // === BIOELECTRICITY ===
        bioelectric: (
            <g>
                <GradientDefs />
                {/* Lightning bolt with cellular pattern */}
                <path d="M55 15 L40 45 L55 45 L45 85" stroke="url(#andaraAmber)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="30" cy="35" r="8" stroke="url(#andaraAmber)" strokeWidth="1" fill="none" opacity="0.5" />
                <circle cx="70" cy="65" r="8" stroke="url(#andaraAmber)" strokeWidth="1" fill="none" opacity="0.5" />
            </g>
        ),
        proton: (
            <g>
                <GradientDefs />
                {/* Proton gradient flow */}
                <path d="M25 50 L40 35 L60 35 L75 50 L60 65 L40 65 Z" stroke="url(#andaraGold)" strokeWidth="2" fill="none" />
                <path d="M30 50 L75 50" stroke="url(#andaraCyan)" strokeWidth="2" strokeDasharray="4 2" />
                <circle cx="30" cy="50" r="5" fill="url(#andaraCyan)" />
                <circle cx="70" cy="50" r="5" fill="url(#andaraGold)" />
                <text x="50" y="54" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">H⁺</text>
            </g>
        ),
        energy: (
            <g>
                <GradientDefs />
                <path d="M55 10 L35 45 L60 45 L45 90" stroke="url(#andaraAmber)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M55 10 L35 45 L60 45 L45 90" strokeWidth="6" stroke="rgba(251,191,36,0.15)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        ),

        // === MINERAL SCIENCE ===
        mineral: (
            <g>
                <GradientDefs />
                <path d="M50 15 L80 70 L20 70 Z" stroke="url(#andaraGold)" strokeWidth="2" fill="none" />
                <path d="M50 15 L50 45 L80 70" stroke="url(#andaraGold)" strokeWidth="1" fill="none" opacity="0.5" />
                <path d="M50 45 L20 70" stroke="url(#andaraGold)" strokeWidth="1" fill="none" opacity="0.5" />
                <circle cx="50" cy="15" r="3" fill="#FFD700" />
                <circle cx="80" cy="70" r="3" fill="#DAA520" />
                <circle cx="20" cy="70" r="3" fill="#B8860B" />
            </g>
        ),
        sulfate: (
            <g>
                <GradientDefs />
                {/* Tetrahedral SO4 structure */}
                <path d="M50 20 L75 45 L50 70 L25 45 Z" stroke="url(#andaraAmber)" strokeWidth="2" fill="none" />
                <line x1="50" y1="20" x2="50" y2="70" stroke="url(#andaraAmber)" strokeWidth="1" opacity="0.5" />
                <line x1="25" y1="45" x2="75" y2="45" stroke="url(#andaraAmber)" strokeWidth="1" opacity="0.5" />
                <circle cx="50" cy="45" r="8" fill="url(#andaraAmber)" opacity="0.8" />
                <text x="50" y="48" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">S</text>
                <circle cx="50" cy="20" r="4" fill="#fbbf24" />
                <circle cx="75" cy="45" r="4" fill="#fbbf24" />
                <circle cx="50" cy="70" r="4" fill="#fbbf24" />
                <circle cx="25" cy="45" r="4" fill="#fbbf24" />
            </g>
        ),
        crystalline: (
            <g>
                <GradientDefs />
                {/* Hexagonal matrix */}
                <path d="M50 15 L75 30 L75 55 L50 70 L25 55 L25 30 Z" stroke="url(#andaraGold)" strokeWidth="2" fill="none" />
                <path d="M50 30 L62 38 L62 52 L50 60 L38 52 L38 38 Z" stroke="url(#andaraGold)" strokeWidth="1.5" fill="rgba(255,215,0,0.1)" />
                <circle cx="50" cy="45" r="5" fill="url(#andaraGold)" />
            </g>
        ),

        // === BIOLOGY ===
        microbiome: (
            <g>
                <GradientDefs />
                {/* Cellular organic pattern */}
                <circle cx="50" cy="50" r="20" stroke="url(#andaraEmerald)" strokeWidth="2" fill="none" />
                <circle cx="40" cy="45" r="6" stroke="url(#andaraEmerald)" strokeWidth="1" fill="rgba(16,185,129,0.2)" />
                <circle cx="55" cy="40" r="4" stroke="url(#andaraEmerald)" strokeWidth="1" fill="rgba(16,185,129,0.3)" />
                <circle cx="60" cy="55" r="5" stroke="url(#andaraEmerald)" strokeWidth="1" fill="rgba(16,185,129,0.2)" />
                <circle cx="45" cy="58" r="3" stroke="url(#andaraEmerald)" strokeWidth="1" fill="rgba(16,185,129,0.4)" />
            </g>
        ),
        dna: (
            <g>
                <GradientDefs />
                {/* DNA double helix hint */}
                <path d="M35 20 Q50 35 65 20 Q50 35 35 50 Q50 65 65 50 Q50 65 35 80" stroke="url(#andaraPurple)" strokeWidth="2" fill="none" />
                <path d="M65 20 Q50 35 35 20 Q50 35 65 50 Q50 65 35 50 Q50 65 65 80" stroke="url(#andaraCyan)" strokeWidth="2" fill="none" />
                <circle cx="50" cy="35" r="3" fill="#a855f7" />
                <circle cx="50" cy="65" r="3" fill="#06b6d4" />
            </g>
        ),
        terrain: (
            <g>
                <GradientDefs />
                {/* Terrain/landscape layers */}
                <path d="M20 70 L35 45 L50 55 L65 40 L80 60 L80 70 Z" stroke="url(#andaraEmerald)" strokeWidth="2" fill="rgba(16,185,129,0.2)" />
                <path d="M20 55 Q50 45 80 55" stroke="url(#andaraCyan)" strokeWidth="1" fill="none" opacity="0.5" />
                <circle cx="50" cy="30" r="8" stroke="url(#andaraGold)" strokeWidth="1" fill="rgba(255,215,0,0.2)" />
            </g>
        ),

        // === FIELD PHYSICS ===
        magnetics: (
            <g>
                <GradientDefs />
                {/* Magnetic field lines */}
                <path d="M30 50 Q50 20 70 50 Q50 80 30 50" stroke="url(#andaraPurple)" strokeWidth="2" fill="none" />
                <path d="M35 50 Q50 30 65 50 Q50 70 35 50" stroke="url(#andaraPurple)" strokeWidth="1.5" fill="none" opacity="0.7" />
                <path d="M40 50 Q50 38 60 50 Q50 62 40 50" stroke="url(#andaraPurple)" strokeWidth="1" fill="none" opacity="0.4" />
                <circle cx="50" cy="50" r="4" fill="url(#andaraPurple)" />
            </g>
        ),
        field: (
            <g>
                <GradientDefs />
                <path d="M50 50 m0 0 a1 1 0 0 1 2 2 a4 4 0 0 1 -6 6 a10 10 0 0 1 14 -14 a18 18 0 0 1 -24 24 a28 28 0 0 1 36 -36" stroke="url(#andaraPurple)" fill="none" strokeWidth="2" strokeLinecap="round" />
                <circle cx="50" cy="50" r="3" fill="#c084fc" />
            </g>
        ),
        consciousness: (
            <g>
                <GradientDefs />
                {/* Third eye / consciousness symbol */}
                <ellipse cx="50" cy="50" rx="25" ry="15" stroke="url(#andaraPurple)" strokeWidth="2" fill="none" />
                <circle cx="50" cy="50" r="8" stroke="url(#andaraGold)" strokeWidth="2" fill="rgba(255,215,0,0.2)" />
                <circle cx="50" cy="50" r="3" fill="url(#andaraGold)" />
                <path d="M50 30 L50 20" stroke="url(#andaraPurple)" strokeWidth="1" />
                <path d="M65 38 L72 32" stroke="url(#andaraPurple)" strokeWidth="1" />
                <path d="M35 38 L28 32" stroke="url(#andaraPurple)" strokeWidth="1" />
            </g>
        ),

        // === NAVIGATION ICONS ===
        science: (
            <g>
                <GradientDefs />
                {/* Atom/orbital */}
                <ellipse cx="50" cy="50" rx="25" ry="10" stroke="url(#andaraCyan)" strokeWidth="1.5" fill="none" transform="rotate(-30 50 50)" />
                <ellipse cx="50" cy="50" rx="25" ry="10" stroke="url(#andaraCyan)" strokeWidth="1.5" fill="none" transform="rotate(30 50 50)" />
                <ellipse cx="50" cy="50" rx="25" ry="10" stroke="url(#andaraCyan)" strokeWidth="1.5" fill="none" transform="rotate(90 50 50)" />
                <circle cx="50" cy="50" r="6" fill="url(#andaraCyan)" />
            </g>
        ),
        shop: (
            <g>
                <GradientDefs />
                {/* Shopping bag */}
                <path d="M30 35 L30 75 L70 75 L70 35 L60 35 L60 30 Q50 20 40 30 L40 35 Z" stroke="url(#andaraGold)" strokeWidth="2" fill="none" />
                <path d="M40 35 L40 40 Q50 50 60 40 L60 35" stroke="url(#andaraGold)" strokeWidth="1.5" fill="none" />
            </g>
        ),
        trust: (
            <g>
                <GradientDefs />
                {/* Shield with checkmark */}
                <path d="M50 20 L75 30 L75 55 Q75 70 50 80 Q25 70 25 55 L25 30 Z" stroke="url(#andaraEmerald)" strokeWidth="2" fill="none" />
                <path d="M38 50 L46 58 L62 42" stroke="url(#andaraEmerald)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        ),
        about: (
            <g>
                <GradientDefs />
                {/* Andara crystal/diamond */}
                <path d="M50 15 L75 40 L50 85 L25 40 Z" stroke="url(#andaraGold)" strokeWidth="2" fill="none" />
                <path d="M25 40 L75 40" stroke="url(#andaraGold)" strokeWidth="1" />
                <path d="M50 15 L40 40 L50 85 L60 40 L50 15" stroke="url(#andaraGold)" strokeWidth="1" fill="rgba(255,215,0,0.1)" />
            </g>
        ),
        default: (
            <g>
                <GradientDefs />
                {/* Andara Spark */}
                <path d="M50 20 L55 45 L80 50 L55 55 L50 80 L45 55 L20 50 L45 45 Z" stroke="url(#andaraGold)" strokeWidth="2" fill="none" />
                <circle cx="50" cy="50" r="3" fill="url(#andaraGold)" />
            </g>
        ),
        // === SACRED GEOMETRY (NEW) ===
        sacredDna: (
            <g>
                <GradientDefs />
                {/* DNA Helix - Double Strand with Draw Animation */}
                {/* Strand 1 */}
                <motion.path
                    d="M35 15 Q50 30 65 15 Q50 30 35 45 Q50 60 65 45 Q50 60 35 75 Q50 90 65 75"
                    stroke="url(#andaraCyan)" strokeWidth="1.5" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }}
                />
                {/* Strand 2 */}
                <motion.path
                    d="M65 15 Q50 30 35 15 Q50 30 65 45 Q50 60 35 45 Q50 60 65 75 Q50 90 35 75"
                    stroke="url(#andaraCyan)" strokeWidth="1.5" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                />

                {/* Connecting Rungs (Staggered Draw) */}
                {[20, 35, 50, 65, 80].map((y, i) => (
                    <motion.line
                        key={i} x1="38" y1={y} x2="62" y2={y}
                        stroke="url(#andaraPurple)" strokeWidth="1" opacity="0.6"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 0.5, delay: 1 + (i * 0.2) }}
                    />
                ))}

                {/* Pulsing Nodes at crossings */}
                {[30, 45, 60, 75].map((y, i) => (
                    <motion.circle
                        key={i} cx="50" cy={y} r="2" fill="#06b6d4"
                        animate={{ r: [1.5, 3, 1.5], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                ))}
            </g>
        ),

        sacredHexTriangle: (
            <g>
                <GradientDefs />
                {/* Rotating Hexagon Container */}
                <motion.path
                    d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z"
                    stroke="url(#andaraCyan)" strokeWidth="1" fill="rgba(6,182,212,0.05)"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "50px 50px" }}
                />

                {/* Build-up Triangle */}
                <motion.path
                    d="M50 25 L75 75 L25 75 Z"
                    stroke="url(#andaraGold)" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Inner Pattern */}
                <motion.path
                    d="M50 25 L50 55 M75 75 L50 55 M25 75 L50 55"
                    stroke="url(#andaraCyan)" strokeWidth="1" opacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                />

                {/* Central Pulse */}
                <motion.circle
                    cx="50" cy="55" r="3" fill="#06b6d4"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </g>
        ),

        sacredMatrix: (
            <g>
                <GradientDefs />
                {/* Triangular Network with glowing nodes */}
                <motion.path
                    d="M50 15 L80 80 L20 80 Z"
                    stroke="url(#andaraCyan)" strokeWidth="1.5" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }}
                />
                {/* Internal Geometry */}
                <motion.path
                    d="M50 15 L50 55 M80 80 L50 55 M20 80 L50 55"
                    stroke="url(#andaraCyan)" strokeWidth="1" opacity="0.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
                />
                <motion.path
                    d="M35 48 L65 48 M35 48 L50 80 M65 48 L50 80"
                    stroke="url(#andaraCyan)" strokeWidth="1" opacity="0.3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1 }}
                />

                {/* Glowing Nodes (Staggered Pulse) */}
                {[
                    { x: 50, y: 15 }, { x: 80, y: 80 }, { x: 20, y: 80 }, // Outer
                    { x: 50, y: 55 }, // Center
                    { x: 35, y: 48 }, { x: 65, y: 48 }, { x: 50, y: 80 } // Mid
                ].map((p, i) => (
                    <motion.circle
                        key={i} cx={p.x} cy={p.y} r={i === 3 ? 3 : 2} fill={i === 3 ? "#06b6d4" : "#0891b2"}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 1, 0.6],
                            boxShadow: "0 0 10px #06b6d4"
                        }}
                        transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: i * 0.2 }}
                    />
                ))}
            </g>
        ),

        sacredNetwork: (
            <g>
                <GradientDefs />
                {/* Complex Node Mesh */}
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "50px 50px" }}
                >
                    {/* Outer Ring */}
                    <circle cx="50" cy="50" r="40" stroke="url(#andaraPurple)" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
                </motion.g>

                {/* Hex Geometry */}
                <motion.path
                    d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z"
                    stroke="url(#andaraCyan)" strokeWidth="1.5" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5 }}
                />

                {/* Internal Web */}
                <motion.path
                    d="M50 10 L85 70 M85 30 L50 90 M85 70 L15 30 M50 90 L15 30 M15 70 L85 30 M15 30 L85 70"
                    stroke="url(#andaraCyan)" strokeWidth="0.5" opacity="0.4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.5 }}
                />

                {/* Central Triangle */}
                <motion.path
                    d="M50 30 L68 62 L32 62 Z"
                    stroke="url(#andaraGold)" strokeWidth="1.5" fill="rgba(6,182,212,0.1)"
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}
                    style={{ transformOrigin: "50px 50px" }}
                />

                {/* Many Glowing Nodes */}
                {[
                    { x: 50, y: 10 }, { x: 85, y: 30 }, { x: 85, y: 70 }, { x: 50, y: 90 }, { x: 15, y: 70 }, { x: 15, y: 30 }, // Outer Hex
                    { x: 50, y: 50 }, // Center
                    { x: 50, y: 30 }, { x: 68, y: 62 }, { x: 32, y: 62 } // Inner Triangle
                ].map((p, i) => (
                    <motion.circle
                        key={i} cx={p.x} cy={p.y} r={2} fill="#06b6d4"
                        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: Math.random() }}
                    />
                ))}
            </g>
        ),
    };

    const glowColors: Record<string, string> = {
        water: "bg-cyan-500",
        ezWater: "bg-cyan-500",
        waterPhases: "bg-cyan-500",
        turbidity: "bg-cyan-400",
        vortex: "bg-purple-500",
        bioelectric: "bg-amber-500",
        proton: "bg-amber-400",
        energy: "bg-amber-500",
        mineral: "bg-amber-400",
        sulfate: "bg-amber-500",
        crystalline: "bg-amber-400",
        microbiome: "bg-emerald-500",
        dna: "bg-purple-500",
        terrain: "bg-emerald-400",
        magnetics: "bg-purple-500",
        field: "bg-purple-400",
        consciousness: "bg-purple-500",
        sacredDna: "bg-cyan-500",
        sacredHexTriangle: "bg-cyan-500",
        sacredMatrix: "bg-cyan-500",
        sacredNetwork: "bg-cyan-500",
        science: "bg-cyan-500",
        shop: "bg-amber-500",
        trust: "bg-emerald-500",
        about: "bg-amber-500",
        default: "bg-slate-500"
    };

    return (
        <div
            className={cn("relative flex items-center justify-center", className)}
            style={{ width: size, height: size }}
            title={`Topic: ${topic} (${key})`}
        >
            {showGlow && (
                <div className={cn(
                    "absolute inset-0 rounded-full blur-xl opacity-20",
                    glowColors[key] || glowColors.default
                )} />
            )}

            <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {paths[key] ?? paths.default}
            </motion.svg>
        </div>
    );
}

// Export individual icon components for direct use
export const WaterIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="water" size={size} className={className} />
);

export const EZWaterIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="ez-water" size={size} className={className} />
);

export const BioelectricIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="bioelectric" size={size} className={className} />
);

export const MineralIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="mineral" size={size} className={className} />
);

export const SulfateIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="sulfate" size={size} className={className} />
);

export const CrystallineIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="crystalline" size={size} className={className} />
);

export const VortexIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="vortex" size={size} className={className} />
);

export const ScienceIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="science" size={size} className={className} />
);

export const ShopIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="shop" size={size} className={className} />
);

export const TrustIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="trust" size={size} className={className} />
);

export const AboutIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="about" size={size} className={className} />
);

// === SACRED GEOMETRY EXPORTS ===

export const SacredDnaIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="sacred-dna" size={size} className={className} />
);

export const SacredHexTriangleIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="sacred-hex" size={size} className={className} />
);

export const SacredMatrixIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="sacred-matrix" size={size} className={className} />
);

export const SacredNetworkIcon = ({ size = 48, className }: { size?: number; className?: string }) => (
    <AndaraDynamicIcon topic="sacred-network" size={size} className={className} />
);
