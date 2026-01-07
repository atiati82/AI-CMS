import React, { useRef } from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { ArrowDown, Droplet, Layers, Hexagon, Component, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function ConceptMonolith() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroTextRef = useRef<HTMLHeadingElement>(null);
    const bottleRef = useRef<HTMLImageElement>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Hero Text Parallax (Slow down)
        gsap.to(heroTextRef.current, {
            yPercent: 50,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "20% top",
                scrub: true
            }
        });

        // 2. The Bottle Journey - Animation Only (CSS Fixed)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".monolith-scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // NOTE: We rely on CSS 'fixed' positioning for the bottle wrapper, 
        // effectively "pinning" it without GSAP's pin-spacer which causes the layout gap.

        // Bottle Animations aligned with scroll sections
        // Section 1 (Source): Deep and dark. Bottle is small, mysterious.
        // Section 2 (Structure): Brightens. Bottle scales up.
        // Section 3 (Ritual): Moves to side? Or stays center and content flows around.

        // Initial State (set in CSS): Filter blur, opacity 0, y 100
        tl.to(bottleRef.current, { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.out" }) // Reveal
            .to(bottleRef.current, { scale: 1.2, duration: 4, ease: "none" }, "+=2") // Slow grow during Source
            .to(bottleRef.current, { filter: "brightness(1.2) drop-shadow(0 0 30px rgba(56, 255, 209, 0.3))", duration: 2 }, "+=0") // Energetic charge during Structure

    }, { scope: containerRef });

    return (
        <StandardPageLayout
            title="The Monolith | Andara"
            seoTitle="The Monolith - Cinematic Design Concept"
            seoDescription="A radical minimalistic approach to product storytelling."
        >
            <div ref={containerRef} className="bg-black min-h-screen text-white overflow-x-hidden selection:bg-emerald-500/30">

                {/* --- HERO SECTION --- */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden z-10">
                    <div className="absolute inset-0 z-0 bg-black">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-60" />
                        {/* Subtle geometric texture */}
                        <div className="absolute inset-0 opacity-20 bg-[url('/images/water/geometry.png')] bg-cover mix-blend-overlay animate-pulse-slow" />
                    </div>

                    <h1 ref={heroTextRef} className="absolute z-10 text-[18vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none pointer-events-none text-center">
                        LIQUID<br />ALCHEMY
                    </h1>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
                        <span className="text-[10px] uppercase tracking-[0.4em]">Begin The Journey</span>
                        <div className="h-12 w-px bg-gradient-to-b from-white to-transparent" />
                    </div>
                </section>

                {/* --- SCROLL CONTAINER --- */}
                <div className="monolith-scroll-container relative w-full">

                    {/* STICKY BOTTLE (Pinned Element) */}
                    <div className="bottle-sticky-wrapper fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-30 mix-blend-screen">
                        {/* Dynamic Backlight */}
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-purple-500/10 opacity-30 blur-[100px]" />
                        <img
                            ref={bottleRef}
                            src="/assets/generated_images/andara-ionic-100ml-transparent-v4.png"
                            alt="Andara Ionic 100ml"
                            className="relative w-auto h-[60vh] object-contain opacity-0 blur-xl translate-y-12"
                        />
                    </div>

                    {/* --- SECTION 1: THE SOURCE (Volcanic) --- */}
                    <section className="relative min-h-[150vh] flex items-center justify-center bg-black z-20">
                        <div className="absolute inset-0 z-0">
                            <img src="/images/minerals/volcanic.png" className="w-full h-full object-cover opacity-50 mask-gradient-b" alt="Volcanic Source" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                        </div>

                        <div className="relative z-10 text-center max-w-4xl px-6 mt-32">
                            <div className="inline-block mb-6 px-4 py-1 border border-amber-900/30 rounded-full bg-amber-950/20 backdrop-blur-md">
                                <span className="text-xs text-amber-500 tracking-[0.3em] font-bold">ORIGIN</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-display font-light text-white mb-8 tracking-tight">
                                Born from <span className="italic text-amber-700/80">Fire</span>
                            </h2>
                            <p className="text-2xl text-stone-400 font-light leading-relaxed max-w-2xl mx-auto">
                                Sourced from ancient volcanic fumaroles. A primordial sulfate complex forged by heat, pressure, and time.
                            </p>
                        </div>
                    </section>

                    {/* --- SECTION 2: THE STRUCTURE (Geometry) --- */}
                    <section className="relative min-h-[150vh] flex items-center justify-center bg-black z-20">
                        <div className="absolute inset-0 z-0">
                            <img src="/images/water/geometry.png" className="w-full h-full object-cover opacity-40" alt="Geometric Structure" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                        </div>

                        <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                            {/* Left Side (Empty for Bottle) */}
                            <div className="hidden md:block" />

                            {/* Right Side Content */}
                            <div className="text-left space-y-12">
                                <div>
                                    <div className="flex items-center gap-4 mb-4 text-cyan-500 opacity-60">
                                        <Hexagon className="w-6 h-6" />
                                        <span className="text-xs tracking-[0.3em] font-bold uppercase">Structure</span>
                                    </div>
                                    <h2 className="text-5xl md:text-7xl font-display font-light text-white mb-6">
                                        Liquid <span className="text-cyan-500">Crystal</span>
                                    </h2>
                                    <p className="text-xl text-slate-400 leading-relaxed max-w-md">
                                        Water is not just a solvent. It is a programmable liquid crystal. Our processing restores the hexagonal coherence found in living cells.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                    <div>
                                        <div className="text-4xl font-display text-white mb-1">H₃O₂</div>
                                        <div className="text-xs text-slate-500 uppercase tracking-widest">Structured Phase</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-display text-white mb-1">-mV</div>
                                        <div className="text-xs text-slate-500 uppercase tracking-widest">Charge Potential</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- SECTION 3: THE RITUAL (Usage) --- */}
                    <section className="relative min-h-[120vh] flex items-center justify-center bg-black z-20">
                        <div className="relative z-10 w-full max-w-5xl px-6 text-center">
                            <h2 className="text-xs text-emerald-500 tracking-[0.5em] font-bold uppercase mb-8">The Daily Ritual</h2>
                            <h2 className="text-5xl md:text-7xl font-display text-white mb-24">
                                Integration
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { icon: Droplet, title: "Dispense", desc: "Add 2-3 pumps (5ml) to pure water." },
                                    { icon: Layers, title: "Structure", desc: "Allow to integrate for 30 seconds." },
                                    { icon: Component, title: "Assimilation", desc: "Consume mid-morning for optimal absorption." }
                                ].map((step, i) => (
                                    <div key={i} className="group p-8 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl backdrop-blur-sm">
                                        <step.icon className="w-10 h-10 text-emerald-400 mb-6 mx-auto opacity-80 group-hover:scale-110 transition-transform" />
                                        <h3 className="text-xl font-display text-white mb-4">{step.title}</h3>
                                        <p className="text-stone-400 font-light">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                </div>
                {/* End Scroll Container */}

                {/* --- FOOTER: ACQUIRE --- */}
                <section className="relative h-screen flex items-center justify-center bg-stone-950 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/minerals/volcanic.png')] opacity-20 bg-cover bg-center mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

                    <div className="relative z-10 text-center max-w-2xl px-6">
                        <div className="mb-12">
                            <div className="h-24 w-px bg-gradient-to-b from-transparent via-emerald-500 to-transparent mx-auto opacity-50" />
                        </div>

                        <h2 className="text-6xl md:text-9xl font-display text-white mb-8 tracking-tighter">
                            Andara.
                        </h2>
                        <p className="text-xl text-stone-400 mb-12 max-w-lg mx-auto">
                            The Primordial Architect of Biological Life in a 100ml concentrate.
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <button className="px-12 py-5 bg-white text-black hover:bg-emerald-400 hover:text-black hover:scale-105 transition-all rounded-full text-lg font-bold tracking-widest uppercase shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                                Acquire - $65.00
                            </button>
                            <button className="px-12 py-5 border border-white/20 text-white hover:bg-white/10 hover:border-white/50 transition-all rounded-full text-lg font-light tracking-widest uppercase flex items-center gap-4 justify-center group">
                                Explore Science <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>

            </div>
        </StandardPageLayout>
    );
}
