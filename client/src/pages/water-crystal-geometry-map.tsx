import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function WaterCrystalGeometryMapPage() {
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
                <title>Water Crystal Geometry Map – Patterns in Frozen Water | Andara</title>
                <meta name="description" content="Explore the geometric patterns found in water crystals. From snowflake hexagons to ice formations, discover how water reveals its structure through crystalline geometry." />
                <meta name="keywords" content="water crystal, snowflake geometry, ice crystal, hexagonal water, water pattern, crystal formation" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="crystalline" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO with Video */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <SmartVideoEmbed keywords={["crystal", "snowflake", "ice", "hexagon", "frozen"]} className="absolute inset-0 w-full h-full object-cover opacity-30" aspectRatio="video" autoPlay muted loop />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#051520]/90 to-[#020617]" />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Crystalline Matrix</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Water Crystal<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] to-[#06b6d4]">Geometry Map</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Patterns in Frozen Water</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">When water freezes, it reveals its inner geometry. Snowflakes, ice crystals, and frost patterns all speak the language of hexagonal symmetry.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Explore Crystals</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: The Hexagonal Foundation */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Hexagonal Foundation</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <div className="text-center mb-6">
                                    <span className="text-6xl">❄️</span>
                                </div>
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-6">Every snowflake has <strong className="text-white">six-fold symmetry</strong>. This isn't random – it emerges from the 104.5° angle of the water molecule and how hydrogen bonds organize in 3D space.</p>
                                <p className="text-center text-cyan-400">No two snowflakes are exactly alike, yet all share the hexagonal template.</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Crystal Types */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Crystal Types</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "❄️", title: "Dendrites", desc: "Branching tree-like crystals" },
                                { icon: "⬡", title: "Plates", desc: "Flat hexagonal discs" },
                                { icon: "📍", title: "Columns", desc: "Hexagonal prisms" },
                                { icon: "🌟", title: "Stellar", desc: "Star-shaped with branches" }
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

                {/* SECTION 3: What Determines Shape */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What Shapes a Crystal</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🌡️", title: "Temperature", desc: "Different temps produce different shapes – plates, dendrites, or columns" },
                                { icon: "💧", title: "Humidity", desc: "More moisture leads to more branch growth and complexity" },
                                { icon: "⚡", title: "Charge", desc: "Electric fields and ions can influence crystal formation" }
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
                                <Link href="/science/geometry"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Crystalline Geometry →</span>
                                    <p className="text-white/50 text-sm mt-2">Platonic solids and symmetry</p>
                                </a></Link>
                                <Link href="/sacred-geometry-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Sacred Geometry & Water →</span>
                                    <p className="text-white/50 text-sm mt-2">Ancient patterns in water</p>
                                </a></Link>
                                <Link href="/science/ez-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">EZ Water →</span>
                                    <p className="text-white/50 text-sm mt-2">Liquid hexagonal structure</p>
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
