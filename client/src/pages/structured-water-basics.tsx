import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function StructuredWaterBasicsRootPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#06b6d4";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>Structured Water Basics – Understanding Water Organization | Andara</title>
                <meta name="description" content="Learn the basics of structured water – how water molecules organize into ordered patterns, what influences structure, and why it matters for hydration and health." />
                <meta name="keywords" content="structured water basics, water structure, organized water, hexagonal water, water clusters, EZ water basics" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="water" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO with Video */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <SmartVideoEmbed keywords={["water", "molecular", "bond", "hydrogen", "dipole"]} className="absolute inset-0 w-full h-full object-cover opacity-10" aspectRatio="video" autoPlay muted loop />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#051520]/90 to-[#020617]" />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Water Science</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Structured Water<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] to-[#06b6d4]">Basics</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Understanding Water Organization</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Water is not just H₂O – it's a dynamic medium that organizes itself based on its environment. Learn the fundamentals of how water structure forms and what influences it.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Learn the Basics</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1 */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What is "Structured" Water?</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2 text-center" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <p className="text-white/80 text-lg leading-relaxed mb-6">Structured water refers to water where molecules arrange in more ordered patterns than bulk water. Think of it as the difference between a crowd milling randomly vs. a marching band in formation.</p>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 rounded-lg bg-white/5">
                                        <p className="text-white/50 text-sm mb-2">Bulk Water</p>
                                        <p className="text-2xl">🌀</p>
                                        <p className="text-white/40 text-xs mt-2">Random, chaotic motion</p>
                                    </div>
                                    <div className="p-4 rounded-lg border" style={{ borderColor: `${accentColor}30` }}>
                                        <p className="text-sm mb-2" style={{ color: accentColor }}>Structured Water</p>
                                        <p className="text-2xl">⬡</p>
                                        <p className="text-white/40 text-xs mt-2">Ordered, coherent layers</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: What Creates Structure */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What Creates Structure?</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "💎", title: "Minerals", desc: "Ionic minerals organize water around them" },
                                { icon: "📐", title: "Surfaces", desc: "Hydrophilic surfaces seed structure" },
                                { icon: "🌀", title: "Movement", desc: "Vortexing and flow patterns" },
                                { icon: "☀️", title: "Light", desc: "Infrared light builds EZ layers" }
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
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Why Structure Matters</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🔋", title: "Energy Storage", desc: "Structured water zones may store charge and energy like a biological battery." },
                                { icon: "💧", title: "Hydration", desc: "Some theorize structured water hydrates cells more effectively than bulk water." },
                                { icon: "📡", title: "Information", desc: "Ordered patterns may carry and transmit biological signals." }
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="text-xl text-white font-medium mb-3">{item.title}</h3>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-amber-500/30 bg-amber-950/10 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <p className="text-amber-400/80 text-sm">Note: Structured water research is an emerging field. We present these ideas for exploration, not as proven medical claims.</p>
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
                                    <p className="text-white/50 text-sm mt-2">The fourth phase of water</p>
                                </a></Link>
                                <Link href="/science/structured-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Structured Water Deep Dive →</span>
                                    <p className="text-white/50 text-sm mt-2">Advanced concepts</p>
                                </a></Link>
                                <Link href="/vortex-technologies"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Vortex Technologies →</span>
                                    <p className="text-white/50 text-sm mt-2">Movement and structure</p>
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
