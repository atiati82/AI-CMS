import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface ParticleFlowProps {
    className?: string;
    color?: string;
    count?: number;
    direction?: "up" | "down" | "left" | "right";
}

export function ParticleFlow({ className, color = "var(--primary)", count = 20, direction = "up" }: ParticleFlowProps) {
    const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, duration: number, delay: number }>>([]);

    useEffect(() => {
        // Generate random particles
        const newParticles = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // percentage
            y: Math.random() * 100, // percentage
            size: Math.random() * 4 + 1, // 1-5px
            duration: Math.random() * 10 + 10, // 10-20s slow movement
            delay: Math.random() * 5
        }));
        setParticles(newParticles);
    }, [count]);

    const getAnimation = (p: typeof particles[0]) => {
        switch (direction) {
            case "up": return { y: [0, -100] };
            case "down": return { y: [0, 100] };
            case "left": return { x: [0, -100] };
            case "right": return { x: [0, 100] };
        }
    };

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full opacity-30"
                    style={{
                        backgroundColor: color,
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={getAnimation(p)}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
}
