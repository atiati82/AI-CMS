import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CosmicPulseProps {
    className?: string;
    color?: string;
    size?: number;
}

export function CosmicPulse({ className, color = "currentColor", size = 200 }: CosmicPulseProps) {
    return (
        <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
            {/* Core */}
            <motion.div
                className="absolute rounded-full bg-current opacity-20 blur-xl"
                style={{ width: size * 0.4, height: size * 0.4, color }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Inner Ring */}
            <motion.div
                className="absolute rounded-full border border-current opacity-30"
                style={{ width: size * 0.6, height: size * 0.6, color }}
                animate={{
                    scale: [0.9, 1.1, 0.9],
                    opacity: [0.2, 0.5, 0.2],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Outer Ring */}
            <motion.div
                className="absolute rounded-full border border-dashed border-current opacity-20"
                style={{ width: size * 0.9, height: size * 0.9, color }}
                animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, -180, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Pulse Wave */}
            <motion.div
                className="absolute rounded-full border border-current"
                style={{ width: size * 0.4, height: size * 0.4, color }}
                animate={{
                    scale: [1, 2.5],
                    opacity: [0.5, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                }}
            />
        </div>
    );
}
