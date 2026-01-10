import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function StructuredWaterPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#0ea5e9";
    const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>Structured Water – Beyond the Molecular Formula | Andara</title>
                <meta name="description" content="Learn about structured water – how water molecules organize beyond bulk liquid into ordered arrangements that may carry information, support life, and respond to environment." />
                <meta name="keywords" content="structured water, water structure, hexagonal water, coherent water, water organization, water science" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="water" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#041520] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
                    </div>

                    <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Water Science</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Structured<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] via-[#38bdf8] to-[#0ea5e9]">Water</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-xl">Beyond the Molecular Formula</p>
                            <p className="text-lg text-white/60 mb-8 max-w-xl">H₂O tells us the ingredients. But water's behavior depends on how those molecules arrange themselves – their geometry, coherence, and relationship to surfaces.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>Explore Structure</button>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                            <SmartVideoEmbed keywords={["structured water", "hexagonal", "crystalline water"]} className="w-full rounded-2xl shadow-2xl" aspectRatio="video" />
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1 */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What Makes Water "Structured"?</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🔗", title: "Hydrogen Bonding", desc: "Water molecules connect through hydrogen bonds, creating temporary networks that constantly form and break." },
                                { icon: "🔷", title: "Geometric Order", desc: "Near surfaces and at low temperatures, these bonds can align into more stable hexagonal or tetrahedral patterns." },
                                { icon: "🌊", title: "Coherent Domains", desc: "Quantum electrodynamics suggests water can form coherent domains where molecules oscillate in phase." }
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="text-xl text-white font-medium mb-3">{item.title}</h3>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2 */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Types of Water Structure</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/10">
                                <h3 className="text-lg text-cyan-400 font-medium mb-3">💧 Bulk Water</h3>
                                <p className="text-white/60 text-sm">Random, constantly shifting network. What flows from your tap. High entropy, low coherence.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-blue-500/30 bg-blue-950/10">
                                <h3 className="text-lg text-blue-400 font-medium mb-3">🔷 Interfacial Water</h3>
                                <p className="text-white/60 text-sm">Water near surfaces. More ordered, different properties. The first few molecular layers behave differently.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-indigo-500/30 bg-indigo-950/10">
                                <h3 className="text-lg text-indigo-400 font-medium mb-3">⚡ EZ Water</h3>
                                <p className="text-white/60 text-sm">Exclusion Zone water. Gel-like, negatively charged, excludes particles. Found near hydrophilic surfaces.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-purple-500/30 bg-purple-950/10">
                                <h3 className="text-lg text-purple-400 font-medium mb-3">🌀 Coherent Domains</h3>
                                <p className="text-white/60 text-sm">Theoretical quantum-coherent regions where water molecules oscillate together at specific frequencies.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3 */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What Influences Structure?</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🌡️", title: "Temperature", desc: "Cold water holds structure longer" },
                                { icon: "💎", title: "Minerals", desc: "Ions organize water around them" },
                                { icon: "📐", title: "Surfaces", desc: "Hydrophilic materials create order" },
                                { icon: "🌀", title: "Movement", desc: "Vortex flow may enhance structure" }
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="text-white font-medium mb-2">{item.title}</h3>
                                    <p className="text-white/60 text-xs">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Continue Exploring</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/science/ez-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-sky-500/50 transition-all group">
                                    <span className="text-white group-hover:text-sky-400">EZ Water →</span>
                                    <p className="text-white/50 text-sm mt-2">The fourth phase of water</p>
                                </a></Link>
                                <Link href="/hexagonal-water-structures"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-sky-500/50 transition-all group">
                                    <span className="text-white group-hover:text-sky-400">Hexagonal Structures →</span>
                                    <p className="text-white/50 text-sm mt-2">Geometry of water clusters</p>
                                </a></Link>
                                <Link href="/vortex-technologies"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-sky-500/50 transition-all group">
                                    <span className="text-white group-hover:text-sky-400">Vortex Technologies →</span>
                                    <p className="text-white/50 text-sm mt-2">Movement and structure</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-sky-500/50 transition-all group">
                                    <span className="text-white group-hover:text-sky-400">Science Library →</span>
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
