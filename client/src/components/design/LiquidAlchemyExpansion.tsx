import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --- Types ---

interface GridItem {
    id: string;
    title: string;
    description?: string;
    className?: string; // For col-span/row-span
    content?: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
    header?: React.ReactNode;
}

interface LiquidBentoGridProps {
    items: GridItem[];
    className?: string;
}

// --- Components ---

/**
 * ActiveGlassCard
 * A card with a "spotlight" effect using GSAP for high-performance tracking.
 */
export function ActiveGlassCard({
    children,
    className,
    spotlightColor = "rgba(226, 184, 94, 0.15)", // Gold tint default
    borderColor = "rgba(226, 184, 94, 0.25)"
}: {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    borderColor?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const borderRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Create quickSetter functions for better performance than standard .to()
        const xTo = gsap.quickTo([spotlightRef.current, borderRef.current], "x", { duration: 0, ease: "power3" });
        const yTo = gsap.quickTo([spotlightRef.current, borderRef.current], "y", { duration: 0, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            xTo(e.clientX - rect.left);
            yTo(e.clientY - rect.top);
        };

        // Add event listener to the container
        const currentContainer = containerRef.current;
        if (currentContainer) {
            currentContainer.addEventListener("mousemove", onMouseMove);
        }

        return () => {
            if (currentContainer) {
                currentContainer.removeEventListener("mousemove", onMouseMove);
            }
        };
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={cn(
                "group relative border border-white/10 overflow-hidden rounded-xl bg-slate-900/40 backdrop-blur-md transition-all duration-300 hover:border-white/20",
                className
            )}
        >
            {/* Spotlight Effect */}
            <div
                ref={spotlightRef}
                className="pointer-events-none absolute -top-[325px] -left-[325px] w-[650px] h-[650px] opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
                style={{
                    background: `radial-gradient(circle, ${spotlightColor}, transparent 70%)`
                }}
            />
            {/* Border Highlight Effect */}
            <div
                ref={borderRef}
                className="pointer-events-none absolute -top-[150px] -left-[150px] w-[300px] h-[300px] opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
                style={{
                    background: `radial-gradient(circle, ${borderColor}, transparent 70%)`
                }}
            />

            <div className="relative h-full z-10 transition-transform duration-300 group-hover:translate-x-1">
                {children}
            </div>
        </div>
    );
}

/**
 * LiquidBentoGrid
 * A responsive grid layout that handles spanned items gracefully.
 */
export function LiquidBentoGrid({ items, className }: LiquidBentoGridProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]",
                className
            )}
        >
            {items.map((item) => (
                <ActiveGlassCard
                    key={item.id}
                    className={cn(item.className, "flex flex-col")}
                >
                    {item.header && (
                        <div className="w-full h-40 md:h-48 overflow-hidden relative">
                            {item.header}
                            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900/80 to-transparent" />
                        </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                            {item.icon && (
                                <div className="p-2 rounded-lg bg-white/5 text-emerald-400 ring-1 ring-white/10">
                                    <item.icon className="w-5 h-5" />
                                </div>
                            )}
                            <h3 className="text-lg font-semibold text-white/90 group-hover:text-emerald-300 transition-colors">
                                {item.title}
                            </h3>
                        </div>
                        {item.description && (
                            <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">
                                {item.description}
                            </p>
                        )}
                        {/* Optional Content Slot */}
                        {item.content && (
                            <div className="mt-auto pt-4 border-t border-white/5">
                                {item.content}
                            </div>
                        )}

                        {/* Default Call to Action Arrow */}
                        <div className="mt-auto pt-4 flex items-center text-xs font-bold text-emerald-500/80 uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
                            Explore <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </ActiveGlassCard>
            ))}
        </div>
    );
}

/**
 * FlowSection
 * A container with a GSAP-driven liquid background animation.
 */
export function FlowSection({ children, className, variant = "obsidian" }: { children: React.ReactNode, className?: string, variant?: "obsidian" | "aurora" }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const blob1Ref = useRef<HTMLDivElement>(null);
    const blob2Ref = useRef<HTMLDivElement>(null);
    const blob3Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Helper to animate blobs in a random floating pattern
        const floatBlob = (element: HTMLDivElement | null, delay: number) => {
            if (!element) return;

            // Random movement within a range
            const randomX = () => Math.random() * 200 - 100; // -100 to 100
            const randomY = () => Math.random() * 200 - 100;
            const randomScale = () => 0.8 + Math.random() * 0.4; // 0.8 to 1.2

            const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: delay });

            tl.to(element, {
                x: randomX(),
                y: randomY(),
                scale: randomScale(),
                duration: 4 + Math.random() * 3, // 4-7s
                ease: "sine.inOut"
            })
                .to(element, {
                    x: randomX(),
                    y: randomY(),
                    scale: randomScale(),
                    duration: 4 + Math.random() * 3,
                    ease: "sine.inOut"
                })
                .to(element, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 4 + Math.random() * 3,
                    ease: "sine.inOut"
                });
        };

        floatBlob(blob1Ref.current, 0);
        floatBlob(blob2Ref.current, 1);
        floatBlob(blob3Ref.current, 2);

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={cn("relative w-full overflow-hidden py-16", className)}>
            <div className="absolute inset-0 z-0">
                {/* Simulated Liquid Mesh Gradient */}
                <div className={cn(
                    "absolute inset-0 opacity-40 blur-3xl saturate-150 transform-gpu",
                    variant === "obsidian" && "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black",
                    variant === "aurora" && "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-900 to-black"
                )}>
                    <div ref={blob1Ref} className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full mix-blend-screen" />
                    <div ref={blob2Ref} className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full mix-blend-screen" />
                    <div ref={blob3Ref} className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-purple-500/10 rounded-full mix-blend-screen" />
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="relative z-10 container mx-auto px-4">
                {children}
            </div>
        </section>
    );
}
