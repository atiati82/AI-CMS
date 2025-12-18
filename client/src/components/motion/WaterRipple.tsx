import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaterRippleProps {
    className?: string;
    color?: string;
    size?: number;
}

export function WaterRipple({ className, color = "currentColor", size = 200 }: WaterRippleProps) {
    return (
        <div className={cn("relative flex items-center justify-center overflow-hidden", className)} style={{ width: size, height: size }}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-current"
                    style={{
                        width: size * 0.2,
                        height: size * 0.2,
                        color,
                        zIndex: 10 - i
                    }}
                    animate={{
                        scale: [1, 4],
                        opacity: [0.6, 0],
                        borderWidth: ["2px", "0px"]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeOut",
                    }}
                />
            ))}

            {/* Center drop impact */}
            <motion.div
                className="absolute rounded-full bg-current opacity-50"
                style={{ width: size * 0.1, height: size * 0.1, color }}
                animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    times: [0, 0.1, 0.2],
                    ease: "easeOut",
                }}
            />
        </div>
    );
}
