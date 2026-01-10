import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function ThreeSixNineHarmonicsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#a855f7";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>3-6-9 Harmonics – Sacred Number Patterns in Nature | Andara</title>
                <meta name="description" content="Explore the significance of 3, 6, 9 in natural patterns, from Tesla's insights to sacred geometry. Understand how these numbers appear in vortex mathematics and water structure." />
                <meta name="keywords" content="3 6 9, Tesla, vortex math, sacred geometry, resonance, natural harmonics, golden ratio" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="geometry" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO with Video */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <SmartVideoEmbed keywords={["sacred", "geometry", "vortex", "spiral", "harmonics"]} className="absolute inset-0 w-full h-full object-cover opacity-30" aspectRatio="video" autoPlay muted loop />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0a0514]/90 to-[#020617]" />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Sacred Geometry</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#a855f7]">3 – 6 – 9</span><br />Harmonics
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Sacred Number Patterns in Nature</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">"If you only knew the magnificence of the 3, 6, and 9, then you would have the key to the universe." — Nikola Tesla</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>Explore the Numbers</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: The Numbers */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Special Numbers</h2>
                        </motion.header>
                        <motion.div className="flex justify-center gap-8 max-w-4xl mx-auto mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { num: "3", meaning: "Trinity, Triangle, Beginning" },
                                { num: "6", meaning: "Balance, Hexagon, Creation" },
                                { num: "9", meaning: "Completion, Cycle, Return" }
                            ].map((item, i) => (
                                <motion.div key={item.num} variants={fadeUp} className="text-center">
                                    <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl font-display mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                                        {item.num}
                                    </div>
                                    <p className="text-white/60 text-sm">{item.meaning}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <p className="text-white/80 text-lg leading-relaxed text-center">In vortex mathematics, these numbers behave differently from others. When you double any number and reduce to a single digit (1→2→4→8→7→5→1), numbers 3, 6, and 9 form their own separate cycle (3→6→3→6...) and 9 always returns to 9.</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Where They Appear */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Where They Appear</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "⬡", title: "Water Hexagons", desc: "6-fold symmetry in ice and EZ water" },
                                { icon: "🌀", title: "Vortex Flow", desc: "Natural spirals follow 3-6-9 patterns" },
                                { icon: "🧬", title: "DNA", desc: "3-letter codons, 6 bases paired, 9 Å pitch" },
                                { icon: "🎵", title: "Music", desc: "Octaves (8+1=9), thirds, sixths" },
                                { icon: "⚡", title: "Frequency", desc: "432Hz resonance and Solfeggio tones" },
                                { icon: "🌍", title: "Earth", desc: "360° circle, 24 hours, 12 months" }
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

                {/* SECTION 3: Connection to Water */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Water Connection</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border border-cyan-500/30 bg-cyan-950/10">
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-6">Water's hexagonal structure embodies the 6. The hydrogen bond angle (~104.5°) relates to tetrahedral geometry. Vortex flow creates 3-6-9 compression patterns. Some believe these geometric relationships allow water to receive and store harmonic information.</p>
                                <p className="text-cyan-400/80 text-center text-sm">Andara Ionic minerals may interact with these natural resonance patterns.</p>
                            </div>
                        </motion.div>
                        <motion.div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-amber-500/30 bg-amber-950/10 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <p className="text-amber-400/80 text-sm">Note: 3-6-9 harmonics blend ancient wisdom with modern observation. We share for exploration, not as verified science.</p>
                        </motion.div>
                    </div>
                </section>

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Continue Exploring</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/sacred-geometry-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all group">
                                    <span className="text-white group-hover:text-purple-400">Sacred Geometry & Water →</span>
                                    <p className="text-white/50 text-sm mt-2">Platonic solids and water</p>
                                </a></Link>
                                <Link href="/vortex-technologies"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all group">
                                    <span className="text-white group-hover:text-purple-400">Vortex Technologies →</span>
                                    <p className="text-white/50 text-sm mt-2">Spiral flow patterns</p>
                                </a></Link>
                                <Link href="/science/geometry"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all group">
                                    <span className="text-white group-hover:text-purple-400">Crystalline Geometry →</span>
                                    <p className="text-white/50 text-sm mt-2">Tetrahedral and hexagonal forms</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all group">
                                    <span className="text-white group-hover:text-purple-400">Science Library →</span>
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
