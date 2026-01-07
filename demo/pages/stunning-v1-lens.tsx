
import React, { useRef, useState, useEffect } from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Search } from "lucide-react";

export default function StunningV1Lens() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the lens
    const lensX = useSpring(mouseX, { stiffness: 400, damping: 30 });
    const lensY = useSpring(mouseY, { stiffness: 400, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <StandardPageLayout
            title="Quantum Lens"
            subtitle="Phase I: Interactive X-Ray"
            seoTitle="Quantum Lens Demo"
            seoDescription="Interactive lens revealing hidden atomic structures."
        >
            <div className="min-h-screen p-8 flex items-center justify-center">
                <div
                    ref={containerRef}
                    className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl cursor-none group"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Layer 1: The Cinematic Base (Visible by default) */}
                    <div className="absolute inset-0 bg-black">
                        <img
                            src="/volcanic-flow-cinematic.png"
                            alt="Cinematic Base"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        {/* Static Overlay Text */}
                        <div className="absolute bottom-12 left-12 max-w-lg pointer-events-none">
                            <h2 className="text-4xl font-display font-bold text-white mb-4">Volcanic Origins</h2>
                            <p className="text-white/60">Hover to analyze the chaotic molecular matrix underneath the calm surface.</p>
                        </div>
                    </div>

                    {/* Layer 2: The Quantum Reveal (Visible only inside the lens) */}
                    <motion.div
                        className="absolute inset-0 bg-indigo-950"
                        style={{
                            clipPath: useTransform(
                                [lensX, lensY],
                                ([x, y]) => isHovering ? `circle(150px at ${x}px ${y}px)` : `circle(0px at 50% 50%)`
                            )
                        }}
                    >
                        {/* Wireframe / Technical View */}
                        <div className="absolute inset-0 opacity-100"
                            style={{
                                backgroundImage: "radial-gradient(circle, rgba(56, 255, 209, 0.2) 2px, transparent 2px)",
                                backgroundSize: "30px 30px"
                            }}
                        />

                        {/* X-Ray Content: Slightly zoomed in or different */}
                        <img
                            src="/volcanic-flow-cinematic.png"
                            alt="X-Ray View"
                            className="w-full h-full object-cover filter saturate-0 contrast-150 brightness-150 invert mix-blend-overlay"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <h3 className="text-cyan-400 font-mono text-xl tracking-[0.5em] uppercase mb-2">Analysis Mode</h3>
                                <div className="text-xs font-mono text-cyan-200">
                                    IONIC STABILITY: 98%<br />
                                    SULFUR CONCENTRATION: CRITICAL
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* The Lens UI Ring */}
                    <motion.div
                        className="absolute w-[300px] h-[300px] rounded-full border-2 border-cyan-400/50 pointer-events-none flex items-center justify-center backdrop-blur-[1px]"
                        style={{
                            x: lensX,
                            y: lensY,
                            translateX: "-50%",
                            translateY: "-50%",
                            opacity: isHovering ? 1 : 0,
                            scale: isHovering ? 1 : 0.5
                        }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-950/80 px-2 py-1 rounded text-[10px] text-cyan-400 font-mono border border-cyan-500/30">
                            QUANTUM_LENS_V1
                        </div>
                        <Search className="text-cyan-400/20 w-12 h-12" />

                        {/* Decorative ticks */}
                        {[0, 90, 180, 270].map(deg => (
                            <div
                                key={deg}
                                className="absolute w-1 h-3 bg-cyan-500/50"
                                style={{ transform: `rotate(${deg}deg) translateY(-148px)` }}
                            />
                        ))}
                    </motion.div>

                </div>
            </div>
        </StandardPageLayout>
    );
}
