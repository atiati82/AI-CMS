import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface MapNode {
    id: string;
    label: string;
    href: string;
    x: number;
    y: number;
    branch: "water" | "mineral" | "matrix" | "core";
}

// Branch color configurations
const branchColors = {
    core: "#ffffff",
    water: "#1aa7ff",
    mineral: "#63b4ff",
    matrix: "#f6d56a",
};

// Node definitions
const nodes: MapNode[] = [
    // Core
    { id: "core", label: "Science Library", href: "/science", x: 250, y: 200, branch: "core" },

    // Water Branch (left)
    { id: "water-main", label: "Water Science", href: "/science/water-science", x: 80, y: 120, branch: "water" },
    { id: "ez-water", label: "EZ Water", href: "/science/ez-water", x: 40, y: 60, branch: "water" },
    { id: "ph-orp", label: "pH & ORP", href: "/science/ph-orp", x: 100, y: 40, branch: "water" },
    { id: "vortex", label: "Vortexing", href: "/science/vortexing", x: 30, y: 160, branch: "water" },

    // Mineral Branch (right)
    { id: "mineral-main", label: "Mineral Science", href: "/science/mineral-science", x: 420, y: 120, branch: "mineral" },
    { id: "sulfate", label: "Sulfate Chemistry", href: "/science/sulfate", x: 460, y: 60, branch: "mineral" },
    { id: "ionic-colloidal", label: "Ionic vs Colloidal", href: "/science/ionic-colloidal", x: 400, y: 40, branch: "mineral" },
    { id: "rare-earth", label: "Rare Earths", href: "/science/rare-earth", x: 470, y: 160, branch: "mineral" },

    // Matrix Branch (bottom)
    { id: "matrix-main", label: "Crystalline Fields", href: "/science/crystalline-matrix", x: 250, y: 320, branch: "matrix" },
    { id: "fascia", label: "Fascia Matrix", href: "/science/fascia", x: 150, y: 360, branch: "matrix" },
    { id: "bioelectric", label: "Bioelectric Patterns", href: "/science/bioelectricity", x: 250, y: 380, branch: "matrix" },
    { id: "geometry", label: "Geometry Maps", href: "/science/sacred-geometry", x: 350, y: 360, branch: "matrix" },
];

// Connection definitions
const connections: [string, string][] = [
    // Core to main branches
    ["core", "water-main"],
    ["core", "mineral-main"],
    ["core", "matrix-main"],

    // Water sub-nodes
    ["water-main", "ez-water"],
    ["water-main", "ph-orp"],
    ["water-main", "vortex"],

    // Mineral sub-nodes
    ["mineral-main", "sulfate"],
    ["mineral-main", "ionic-colloidal"],
    ["mineral-main", "rare-earth"],

    // Matrix sub-nodes
    ["matrix-main", "fascia"],
    ["matrix-main", "bioelectric"],
    ["matrix-main", "geometry"],
];

/**
 * NeuralLibraryMap - Interactive node visualization
 * 
 * Features:
 * - Central pulsing "Science Library Core" node
 * - Three branch nodes with sub-topics
 * - Hover effects with line highlighting
 * - Clickable nodes for navigation
 */
export function NeuralLibraryMap() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Get connected nodes for highlighting
    const getConnectedNodes = (nodeId: string): string[] => {
        const connected: string[] = [nodeId];
        connections.forEach(([a, b]) => {
            if (a === nodeId) connected.push(b);
            if (b === nodeId) connected.push(a);
        });
        return connected;
    };

    const connectedNodes = hoveredNode ? getConnectedNodes(hoveredNode) : [];

    return (
        <div className="relative w-full max-w-3xl mx-auto aspect-[5/4]">
            <svg
                viewBox="0 0 500 420"
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 0 30px rgba(99, 180, 255, 0.1))" }}
            >
                <defs>
                    {/* Gradients for lines */}
                    <linearGradient id="lineWater" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1aa7ff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#1aa7ff" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="lineMineral" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#63b4ff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#63b4ff" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="lineMatrix" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f6d56a" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f6d56a" stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                {/* Connection Lines */}
                {connections.map(([fromId, toId], i) => {
                    const fromNode = nodes.find((n) => n.id === fromId);
                    const toNode = nodes.find((n) => n.id === toId);
                    if (!fromNode || !toNode) return null;

                    const isHighlighted =
                        connectedNodes.includes(fromId) && connectedNodes.includes(toId);
                    const lineColor = branchColors[toNode.branch];

                    return (
                        <motion.line
                            key={`line-${i}`}
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke={lineColor}
                            strokeWidth={isHighlighted ? 2 : 1}
                            strokeOpacity={isHighlighted ? 0.9 : 0.25}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                    const isCore = node.id === "core";
                    const isMainBranch = node.id.includes("-main");
                    const isHovered = hoveredNode === node.id;
                    const isConnected = connectedNodes.includes(node.id);
                    const nodeColor = branchColors[node.branch];

                    const nodeRadius = isCore ? 35 : isMainBranch ? 20 : 12;

                    return (
                        <Link key={node.id} href={node.href}>
                            <g
                                className="cursor-pointer"
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                            >
                                {/* Glow */}
                                {(isHovered || (isCore && !hoveredNode)) && (
                                    <motion.circle
                                        cx={node.x}
                                        cy={node.y}
                                        r={nodeRadius + 15}
                                        fill={nodeColor}
                                        opacity={0.15}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 0.15 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                {/* Node Circle */}
                                <motion.circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={nodeRadius}
                                    fill={isCore ? "#0b1020" : `${nodeColor}20`}
                                    stroke={nodeColor}
                                    strokeWidth={isHovered ? 2 : 1}
                                    animate={
                                        isCore
                                            ? {
                                                scale: [1, 1.05, 1],
                                            }
                                            : isConnected
                                                ? { scale: 1.1 }
                                                : {}
                                    }
                                    transition={
                                        isCore
                                            ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                            : { duration: 0.2 }
                                    }
                                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                                />

                                {/* Node Label */}
                                <text
                                    x={node.x}
                                    y={isCore ? node.y + 4 : node.y + nodeRadius + 16}
                                    textAnchor="middle"
                                    fill={isHovered ? nodeColor : "white"}
                                    fontSize={isCore ? 12 : 9}
                                    fontWeight={isCore || isMainBranch ? "bold" : "normal"}
                                    opacity={isHovered || isCore ? 1 : 0.7}
                                >
                                    {isCore ? "SCIENCE LIBRARY" : node.label}
                                </text>
                            </g>
                        </Link>
                    );
                })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 text-xs text-white/50">
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: branchColors.water }} />
                    Water
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: branchColors.mineral }} />
                    Minerals
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: branchColors.matrix }} />
                    Crystalline
                </span>
            </div>
        </div>
    );
}

export default NeuralLibraryMap;
