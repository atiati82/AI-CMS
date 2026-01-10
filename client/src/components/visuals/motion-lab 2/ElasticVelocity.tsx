import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, MotionValue } from 'framer-motion';

export function ElasticVelocity() {
    // We need to track the global scroll for velocity
    const { scrollY } = useScroll();

    // Velocity Physics
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

    // Map velocity to transforms
    const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-20, 20]);
    const scaleYVelocity = useTransform(smoothVelocity, [-1000, 0, 1000], [1.5, 1, 1.5]);
    const rotateVelocity = useTransform(scrollY, [0, 5000], [0, 720], { clamp: false });

    return (
        <div className="flex items-center justify-center p-12">
            <motion.div
                style={{
                    rotate: rotateVelocity,
                    skewX: skewVelocity,
                    scaleY: scaleYVelocity,
                }}
                className="w-64 h-64 relative"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-orange-600 rounded-3xl opacity-80 blur-md" />
                <div className="absolute inset-0 bg-gradient-to-bl from-rose-400 to-orange-500 rounded-3xl border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                    <div className="w-32 h-32 border-4 border-white/20 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
