import React from "react";

interface SulfateTetrahedronProps {
    className?: string;
    size?: number;
    animated?: boolean;
}

export function SulfateTetrahedron({
    className = "",
    size = 200,
    animated = true
}: SulfateTetrahedronProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                className={animated ? "animate-pulse" : ""}
            >
                {/* Tetrahedron structure representing SO4 sulfate */}
                <defs>
                    <linearGradient id="sulfateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Central sulfur atom */}
                <circle cx="50" cy="50" r="8" fill="url(#sulfateGrad)" filter="url(#glow)" />

                {/* Four oxygen atoms at tetrahedral positions */}
                <circle cx="50" cy="20" r="5" fill="#f472b6" opacity="0.8" />
                <circle cx="25" cy="70" r="5" fill="#f472b6" opacity="0.8" />
                <circle cx="75" cy="70" r="5" fill="#f472b6" opacity="0.8" />
                <circle cx="50" cy="85" r="5" fill="#f472b6" opacity="0.8" />

                {/* Bonds connecting sulfur to oxygen */}
                <line x1="50" y1="42" x2="50" y2="25" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
                <line x1="44" y1="55" x2="30" y2="67" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
                <line x1="56" y1="55" x2="70" y2="67" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
                <line x1="50" y1="58" x2="50" y2="80" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />

                {/* Labels */}
                <text x="50" y="52" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">S</text>
                <text x="50" y="18" textAnchor="middle" fill="white" fontSize="5">O</text>
                <text x="22" y="73" textAnchor="middle" fill="white" fontSize="5">O</text>
                <text x="78" y="73" textAnchor="middle" fill="white" fontSize="5">O</text>
                <text x="50" y="93" textAnchor="middle" fill="white" fontSize="5">O</text>
            </svg>
        </div>
    );
}

export default SulfateTetrahedron;
