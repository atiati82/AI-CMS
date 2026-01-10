import React from 'react';
import { motion } from 'framer-motion';

const GoldGradient = () => (
    <linearGradient id="grad-369-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c0963b" />
        <stop offset="50%" stopColor="#fdf8d0" />
        <stop offset="100%" stopColor="#c0963b" />
    </linearGradient>
);

export const Loading369 = ({ size = 64, className }: { size?: number, className?: string }) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <motion.svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            >
                <defs>
                    <GoldGradient />
                    <filter id="glow-369">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Outer Ring - The Universe (0/9) */}
                <motion.circle
                    cx="50" cy="50" r="46"
                    stroke="url(#grad-369-gold)"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ scale: [0.9, 1, 0.9], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* The 3-6-9 Triangle */}
                <motion.g
                    filter="url(#glow-369)"
                >
                    {/* 9 - Top */}
                    <circle cx="50" cy="8" r="3" fill="#fdf8d0" />

                    {/* 3 - Bottom Right */}
                    <circle cx="86.3" cy="71" r="3" fill="#c0963b" />

                    {/* 6 - Bottom Left */}
                    <circle cx="13.7" cy="71" r="3" fill="#c0963b" />

                    {/* Connecting Lines */}
                    <path
                        d="M50 8 L86.3 71 L13.7 71 Z"
                        stroke="url(#grad-369-gold)"
                        strokeWidth="1.5"
                        fill="none"
                    />
                </motion.g>

                {/* Inner Spinner - The Flux */}
                <motion.path
                    d="M50 25 L65 65 L35 65 Z"
                    stroke="url(#grad-369-gold)"
                    strokeWidth="1"
                    fill="url(#grad-369-gold)"
                    fillOpacity="0.1"
                    animate={{ rotate: -360 }}
                    style={{ transformOrigin: "50% 50%" }}
                    transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                />

                {/* Center Point - The Singularity */}
                <circle cx="50" cy="50" r="2" fill="#fff" />

            </motion.svg>
        </div>
    );
};
