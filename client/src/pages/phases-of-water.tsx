import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Helmet } from "@/lib/react-helmet-stub";

export default function PhasesOfWaterPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#06b6d4";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    const phases = [
        { phase: "Solid", icon: "🧊", temp: "< 0°C", color: "#a5f3fc", desc: "Ice. Rigid hexagonal crystal lattice. Molecules locked in place." },
        { phase: "Liquid", icon: "💧", temp: "0-100°C", color: "#22d3ee", desc: "Bulk water. Dynamic hydrogen bond network. Molecules constantly moving." },
        { phase: "Gas", icon: "💨", temp: "> 100°C", color: "#94a3b8", desc: "Steam. Individual molecules. No persistent structure." },
        { phase: "EZ/Fourth", icon: "🔷", temp: "Variable", color: "#8b5cf6", desc: "Exclusion Zone. Gel-like, ordered. H₃O₂. Found near hydrophilic surfaces." }
    ];

    return (
        <Layout>
            <Helmet>
                <title>Phases of Water – Solid, Liquid, Gas & Fourth Phase | Andara</title>
                <meta name="description" content="Explore the phases of water – from ice to steam to the emerging science of the fourth phase (EZ water). Learn how temperature, pressure, and surfaces create different water states." />
                <meta name="keywords" content="phases of water, water states, ice liquid gas, fourth phase water, EZ water phase, water transitions" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="water" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#051520] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Water Science</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Phases of<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] to-[#06b6d4]">Water</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">From Ice to Steam – and Beyond</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">We all learned three phases: solid, liquid, gas. But emerging research suggests there may be a fourth – and it's this phase that may be most relevant to living systems.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Explore the Phases</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: Four Phases */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Four Phases</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {phases.map((p) => (
                                <motion.div key={p.phase} variants={fadeUp} className="p-6 rounded-2xl border text-center relative overflow-hidden" style={{ borderColor: `${p.color}30`, backgroundColor: `${p.color}08` }}>
                                    <div className="text-4xl mb-3">{p.icon}</div>
                                    <h3 className="text-xl font-medium mb-2" style={{ color: p.color }}>{p.phase}</h3>
                                    <p className="text-white/50 text-xs mb-3">{p.temp}</p>
                                    <p className="text-white/60 text-sm">{p.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Phase Transitions */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Phase Transitions</h2>
                        </motion.header>
                        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border border-white/20 bg-white/5">
                                <div className="grid md:grid-cols-3 gap-6 text-center">
                                    <div className="p-4">
                                        <p className="text-cyan-400 font-medium mb-2">Melting</p>
                                        <p className="text-white/60 text-sm">Ice → Liquid</p>
                                        <p className="text-white/40 text-xs mt-2">Adding energy breaks crystal bonds</p>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-cyan-400 font-medium mb-2">Evaporation</p>
                                        <p className="text-white/60 text-sm">Liquid → Gas</p>
                                        <p className="text-white/40 text-xs mt-2">More energy frees individual molecules</p>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-purple-400 font-medium mb-2">EZ Formation</p>
                                        <p className="text-white/60 text-sm">Bulk → EZ</p>
                                        <p className="text-white/40 text-xs mt-2">Surfaces + infrared create order</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: Fourth Phase */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Fourth Phase</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2 text-center" style={{ borderColor: "#8b5cf630", backgroundColor: "#8b5cf608" }}>
                                <p className="text-white/80 text-lg leading-relaxed mb-6">Dr. Gerald Pollack's research reveals a gel-like phase of water that forms near hydrophilic surfaces. This "Exclusion Zone" water has properties between liquid and solid – ordered like ice but fluid like water.</p>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="p-3 rounded-lg bg-white/5">
                                        <p className="text-purple-400 font-medium">H₃O₂</p>
                                        <p className="text-white/50 text-xs">Different formula</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-white/5">
                                        <p className="text-purple-400 font-medium">⊖ Charge</p>
                                        <p className="text-white/50 text-xs">Net negative</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-white/5">
                                        <p className="text-purple-400 font-medium">Hexagonal</p>
                                        <p className="text-white/50 text-xs">Ordered layers</p>
                                    </div>
                                </div>
                                <p className="text-purple-400">This may be the phase most relevant to living systems.</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Continue Exploring</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/science/ez-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">EZ Water →</span>
                                    <p className="text-white/50 text-sm mt-2">Deep dive into fourth phase</p>
                                </a></Link>
                                <Link href="/hexagonal-water-structures"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Hexagonal Structures →</span>
                                    <p className="text-white/50 text-sm mt-2">Geometry of water</p>
                                </a></Link>
                                <Link href="/science/structured-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Structured Water →</span>
                                    <p className="text-white/50 text-sm mt-2">Beyond the formula</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Science Library →</span>
                                    <p className="text-white/50 text-sm mt-2">Return to library</p>
                                </a></Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
