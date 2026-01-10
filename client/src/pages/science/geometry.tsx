import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function CrystallineGeometryPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#f59e0b";
    const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>Crystalline Matrix Geometry – Sacred Patterns in Water & Minerals | Andara</title>
                <meta name="description" content="Explore crystalline matrix geometry – how minerals, water, and living systems organize into sacred geometric patterns. Hexagonal water, tetrahedral sulfate, and the Platonic solids." />
                <meta name="keywords" content="crystalline geometry, sacred geometry water, hexagonal water, tetrahedral sulfate, platonic solids, crystal matrix" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="crystalline" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO with Video */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <SmartVideoEmbed keywords={["crystal", "geometry", "hexagon", "sacred", "matrix"]} className="absolute inset-0 w-full h-full object-cover opacity-30" aspectRatio="video" autoPlay muted loop />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0a0805]/90 to-[#020617]" />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Crystalline Matrix</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Crystalline<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b]">Geometry</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Sacred Patterns in Water & Minerals</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Nature builds with geometry. From snowflake hexagons to sulfate tetrahedra, crystalline patterns encode information and organize energy at every scale.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Explore Geometry</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: Platonic Solids */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Platonic Solids</h2>
                        </motion.header>
                        <motion.div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { name: "Tetrahedron", faces: 4, element: "Fire", icon: "🔺" },
                                { name: "Cube", faces: 6, element: "Earth", icon: "🟫" },
                                { name: "Octahedron", faces: 8, element: "Air", icon: "💎" },
                                { name: "Dodecahedron", faces: 12, element: "Ether", icon: "⬡" },
                                { name: "Icosahedron", faces: 20, element: "Water", icon: "🔵" }
                            ].map((solid) => (
                                <motion.div key={solid.name} variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
                                    <div className="text-3xl mb-3">{solid.icon}</div>
                                    <h3 className="text-white font-medium text-sm mb-1">{solid.name}</h3>
                                    <p className="text-white/40 text-xs">{solid.faces} faces · {solid.element}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Geometry in Nature */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Geometry in Water & Minerals</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-cyan-500/30 bg-cyan-950/10">
                                <h3 className="text-xl text-cyan-400 font-medium mb-4">⬡ Hexagonal Water</h3>
                                <p className="text-white/60 text-sm mb-4">Water molecules naturally form hexagonal clusters. Ice is a hexagonal crystal. EZ water layers in hexagonal sheets.</p>
                                <p className="text-cyan-400/80 text-sm">The hexagon: 6-fold symmetry, optimal packing, found throughout nature.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <h3 className="text-xl font-medium mb-4" style={{ color: accentColor }}>🔺 Tetrahedral Sulfate</h3>
                                <p className="text-white/60 text-sm mb-4">The sulfate ion (SO₄²⁻) is a perfect tetrahedron – one sulfur at center, four oxygens at vertices.</p>
                                <p className="text-sm" style={{ color: `${accentColor}cc` }}>The tetrahedron: Simplest 3D form, strongest structure, fundamental to chemistry.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: Why Geometry Matters */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Why Geometry Matters</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "📡", title: "Information Storage", desc: "Geometric patterns can encode and transmit information at molecular scales." },
                                { icon: "⚡", title: "Energy Efficiency", desc: "Crystalline structures minimize energy, maximize stability, and optimize flow." },
                                { icon: "🔗", title: "Coherence", desc: "Geometric order creates coherence – aligned, synchronized, resonant systems." }
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
                                <Link href="/tetrahedral-sulfate-geometry"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">Tetrahedral Sulfate →</span>
                                    <p className="text-white/50 text-sm mt-2">Deep dive into SO₄²⁻ geometry</p>
                                </a></Link>
                                <Link href="/liquid-crystal-memory"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">Liquid Crystal Memory →</span>
                                    <p className="text-white/50 text-sm mt-2">How crystals store information</p>
                                </a></Link>
                                <Link href="/sacred-geometry-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">Sacred Geometry & Water →</span>
                                    <p className="text-white/50 text-sm mt-2">Ancient wisdom meets science</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">Science Library →</span>
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
