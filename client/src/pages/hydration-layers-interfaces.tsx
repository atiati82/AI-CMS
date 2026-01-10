import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function HydrationLayersInterfacesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#0ea5e9";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>Hydration Layers & Interfaces – Water at Biological Surfaces | Andara</title>
                <meta name="description" content="Explore how water organizes at biological interfaces – cell membranes, proteins, and mineral surfaces. Understand hydration layers and their role in cellular function." />
                <meta name="keywords" content="hydration layers, water interfaces, EZ water, cell membrane water, protein hydration, surface water, exclusion zone" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="water" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <SmartVideoEmbed keywords={["water", "layers", "interface", "membrane", "hydration"]} className="absolute inset-0 w-full h-full object-cover opacity-30" aspectRatio="video" autoPlay muted loop />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#051520]/90 to-[#020617]" />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Water Science</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Hydration Layers<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] via-[#38bdf8] to-[#0ea5e9]">& Interfaces</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Water at Biological Surfaces</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">At every membrane, every protein, every mineral surface – water organizes into ordered layers. These interfaces are where biology happens.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>Explore Interfaces</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: The Interface Zone */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Interface Zone</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-8">When water meets a surface, it doesn't stay random. It organizes into layers – each with different properties than bulk water.</p>
                                <div className="relative h-48 rounded-lg overflow-hidden bg-slate-900">
                                    {/* Surface */}
                                    <div className="absolute bottom-0 left-0 right-0 h-3 bg-amber-500" />
                                    {/* Layer 1 */}
                                    <div className="absolute bottom-3 left-0 right-0 h-12 bg-gradient-to-t from-cyan-500/50 to-cyan-500/30 flex items-center justify-center">
                                        <span className="text-cyan-200 text-xs font-medium">Layer 1 – Strongly Ordered</span>
                                    </div>
                                    {/* Layer 2 */}
                                    <div className="absolute bottom-[60px] left-0 right-0 h-12 bg-gradient-to-t from-cyan-500/30 to-cyan-500/10 flex items-center justify-center">
                                        <span className="text-cyan-300 text-xs">Layer 2 – Moderately Ordered</span>
                                    </div>
                                    {/* Layer 3 */}
                                    <div className="absolute bottom-[108px] left-0 right-0 h-12 bg-gradient-to-t from-cyan-500/10 to-transparent flex items-center justify-center">
                                        <span className="text-cyan-400/80 text-xs">Layer 3 – Transition Zone</span>
                                    </div>
                                    {/* Bulk */}
                                    <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-center">
                                        <span className="text-white/40 text-xs">Bulk Water</span>
                                    </div>
                                </div>
                                <p className="text-center text-white/50 text-sm mt-4">Water forms structured layers that extend from surfaces into the bulk</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Where Interfaces Exist */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Biological Interfaces</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🧫", title: "Cell Membranes", desc: "Every cell is coated in structured water" },
                                { icon: "🧬", title: "Proteins", desc: "Hydration shells enable folding & function" },
                                { icon: "💎", title: "Minerals", desc: "Ions organize water in hydration shells" },
                                { icon: "🦴", title: "Collagen", desc: "Connective tissue maintains water order" }
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

                {/* SECTION 3: Why It Matters */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Why Interfaces Matter</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "⚡", title: "Charge Separation", desc: "Ordered water layers create electrical gradients that power cellular processes." },
                                { icon: "🎯", title: "Selectivity", desc: "Interface water acts as a filter, controlling what can access membrane surfaces." },
                                { icon: "📡", title: "Signal Transmission", desc: "Structured water may transmit signals along cell surfaces faster than diffusion." }
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

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Continue Exploring</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/science/ez-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-sky-500/50 transition-all group">
                                    <span className="text-white group-hover:text-sky-400">EZ Water →</span>
                                    <p className="text-white/50 text-sm mt-2">The exclusion zone phenomenon</p>
                                </a></Link>
                                <Link href="/cell-voltage"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-sky-500/50 transition-all group">
                                    <span className="text-white group-hover:text-sky-400">Cell Voltage →</span>
                                    <p className="text-white/50 text-sm mt-2">Membrane potentials and water</p>
                                </a></Link>
                                <Link href="/sulfate-structuring-ez"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-sky-500/50 transition-all group">
                                    <span className="text-white group-hover:text-sky-400">Sulfate & EZ →</span>
                                    <p className="text-white/50 text-sm mt-2">How sulfate builds structure</p>
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
