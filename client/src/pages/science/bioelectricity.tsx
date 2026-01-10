import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function BioelectricityOverviewPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#6366f1";
    const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>Bioelectricity Overview – The Electrical Nature of Life | Andara</title>
                <meta name="description" content="Explore bioelectricity – the electrical currents and voltages that govern cellular function, nerve signaling, and healing. Understand how ions create the body's electrical system." />
                <meta name="keywords" content="bioelectricity, bioelectric, cell voltage, membrane potential, ion currents, electrical healing" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="bioelectric" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO with Video */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <SmartVideoEmbed keywords={["bioelectricity", "electric", "neural", "voltage", "current"]} className="absolute inset-0 w-full h-full object-cover opacity-30" aspectRatio="video" autoPlay muted loop />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0a0818]/90 to-[#020617]" />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Bioelectric Science</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Bioelectricity<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#6366f1]">Overview</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">The Electrical Nature of Life</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Every cell in your body maintains an electrical charge. Every nerve impulse, every heartbeat, every thought is an electrical event. Welcome to the world of bioelectricity.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>Explore Bioelectricity</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1 */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What is Bioelectricity?</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2 text-center" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <p className="text-white/80 text-lg leading-relaxed mb-6">Bioelectricity refers to the electrical currents and potentials generated by living cells. Unlike electronics that use electrons, biological systems primarily use <strong className="text-white">ions</strong> – charged atoms like Na⁺, K⁺, Ca²⁺, and Cl⁻.</p>
                                <div className="grid grid-cols-4 gap-4">
                                    {["Na⁺", "K⁺", "Ca²⁺", "Cl⁻"].map((ion) => (
                                        <div key={ion} className="p-3 rounded-lg bg-white/5">
                                            <p className="text-lg font-mono" style={{ color: accentColor }}>{ion}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Key Concepts */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Key Bioelectric Concepts</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "⚡", title: "Membrane Potential", desc: "Every cell maintains a voltage difference across its membrane – typically -70mV at rest. This is powered by ion pumps.", color: "#6366f1" },
                                { icon: "🔌", title: "Ion Channels", desc: "Protein gates in cell membranes that open and close, allowing ions to flow and creating electrical signals.", color: "#8b5cf6" },
                                { icon: "📡", title: "Action Potentials", desc: "Rapid voltage spikes that travel along nerves, carrying information at speeds up to 100 m/s.", color: "#a78bfa" }
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="text-xl text-white font-medium mb-3" style={{ color: item.color }}>{item.title}</h3>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: Bioelectric Systems */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Bioelectric Systems in the Body</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🧠", title: "Brain", desc: "100 billion neurons firing in patterns" },
                                { icon: "❤️", title: "Heart", desc: "Electrical pacemaker drives rhythm" },
                                { icon: "💪", title: "Muscles", desc: "Voltage triggers contraction" },
                                { icon: "🦴", title: "Bones", desc: "Piezoelectric stress signaling" }
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

                {/* SECTION 4: Minerals Connection */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Mineral Connection</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border border-amber-500/30 bg-amber-950/10">
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-6">Ionic minerals are the <strong className="text-amber-400">charge carriers</strong> of the bioelectric system. Without adequate ionic minerals, cellular voltage drops, signaling slows, and function degrades.</p>
                                <p className="text-center text-amber-400">Andara Ionic provides sulfate-form minerals that support the body's electrical infrastructure.</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Continue Exploring</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/cell-voltage"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-500/50 transition-all group">
                                    <span className="text-white group-hover:text-indigo-400">Cell Voltage →</span>
                                    <p className="text-white/50 text-sm mt-2">The -70mV that runs your cells</p>
                                </a></Link>
                                <Link href="/ion-transport"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-500/50 transition-all group">
                                    <span className="text-white group-hover:text-indigo-400">Ion Transport →</span>
                                    <p className="text-white/50 text-sm mt-2">How ions move through membranes</p>
                                </a></Link>
                                <Link href="/charge-coherence"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-500/50 transition-all group">
                                    <span className="text-white group-hover:text-indigo-400">Charge Coherence →</span>
                                    <p className="text-white/50 text-sm mt-2">Whole-body electrical harmony</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-500/50 transition-all group">
                                    <span className="text-white group-hover:text-indigo-400">Science Library →</span>
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
