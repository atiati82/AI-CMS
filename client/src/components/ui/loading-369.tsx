/**
 * Loading369 - Sacred geometry inspired loading animation
 * Based on 3-6-9 pattern (Tesla's key to the universe)
 */

import React from 'react';
import { motion } from 'framer-motion';

interface Loading369Props {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | number;
}

export function Loading369({ className = '', size = 'md' }: Loading369Props) {
    // Convert size to pixel value
    const sizeValue = typeof size === 'number'
        ? size
        : { sm: 32, md: 64, lg: 96 }[size] || 64;

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <motion.div
                className="relative"
                style={{ width: sizeValue, height: sizeValue }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
                {/* 3 outer nodes */}
                {[0, 120, 240].map((angle, i) => (
                    <motion.div
                        key={`outer-${i}`}
                        className="absolute w-2 h-2 rounded-full bg-cyan-400"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${angle}deg) translateY(-150%) translateX(-50%)`
                        }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.33 }}
                    />
                ))}
                {/* 6 middle nodes */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <motion.div
                        key={`middle-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full bg-amber-400"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${angle}deg) translateY(-100%) translateX(-50%)`
                        }}
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                    />
                ))}
                {/* 9 inner core */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80"
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                />
            </motion.div>
        </div>
    );
}

export default Loading369;
