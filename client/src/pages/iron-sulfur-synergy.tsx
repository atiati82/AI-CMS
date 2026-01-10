import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function IronSulfurSynergyPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#ef4444";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>Iron-Sulfur Synergy – Ancient Molecular Partnerships | Andara</title>
                <meta name="description" content="Explore iron-sulfur clusters – one of biology's oldest and most essential cofactors. Learn how iron and sulfur work together in electron transfer and energy production." />
                <meta name="keywords" content="iron sulfur clusters, Fe-S clusters, ferredoxin, electron transfer, mitochondria, ATP synthesis" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="mineral" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <SmartVideoEmbed keywords={["iron", "sulfur", "synergy", "biology", "catalyst"]} className="absolute inset-0 w-full h-full object-cover opacity-20" aspectRatio="video" autoPlay muted loop />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#180808]/90 to-[#020617]" />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Mineral Science</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Iron-Sulfur<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef4444] via-[#f97316] to-[#ef4444]">Synergy</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Ancient Molecular Partnerships</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Iron-sulfur clusters are among the oldest cofactors in biology – present at the origin of life. They remain essential for energy production, electron transfer, and countless enzymatic reactions.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>Explore the Partnership</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1 */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What Are Iron-Sulfur Clusters?</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-6">Iron-sulfur (Fe-S) clusters are inorganic cofactors where iron atoms are bound to sulfur atoms in geometric arrangements. Common types include:</p>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="p-4 rounded-lg bg-white/5 text-center">
                                        <p className="font-mono text-lg" style={{ color: accentColor }}>[2Fe-2S]</p>
                                        <p className="text-white/40 text-xs mt-2">Diamond shape</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5 text-center">
                                        <p className="font-mono text-lg" style={{ color: accentColor }}>[3Fe-4S]</p>
                                        <p className="text-white/40 text-xs mt-2">Incomplete cube</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5 text-center">
                                        <p className="font-mono text-lg" style={{ color: accentColor }}>[4Fe-4S]</p>
                                        <p className="text-white/40 text-xs mt-2">Cubane cage</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Functions */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Key Functions</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "⚡", title: "Electron Transfer", desc: "Core of respiratory chain" },
                                { icon: "🔋", title: "ATP Synthesis", desc: "Powers cellular energy" },
                                { icon: "🧬", title: "DNA Repair", desc: "Maintains genetic integrity" },
                                { icon: "🛡️", title: "Sensing", desc: "Oxygen and iron sensors" }
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

                {/* SECTION 3: The Andara Connection */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Sulfate Connection</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border border-amber-500/30 bg-amber-950/10">
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-6">Sulfur is half of the iron-sulfur partnership. Ionic sulfates provide bioavailable sulfur that can participate in sulfur metabolism and potentially support the body's Fe-S cluster assembly pathways.</p>
                                <p className="text-amber-400 text-center">Andara Ionic's sulfate minerals may support sulfur availability for these essential processes.</p>
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
                                <Link href="/sulfate-chemistry"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-red-500/50 transition-all group">
                                    <span className="text-white group-hover:text-red-400">Sulfate Chemistry →</span>
                                    <p className="text-white/50 text-sm mt-2">The tetrahedral SO₄²⁻ ion</p>
                                </a></Link>
                                <Link href="/proton-gradients-energy-transfer"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-red-500/50 transition-all group">
                                    <span className="text-white group-hover:text-red-400">Proton Gradients →</span>
                                    <p className="text-white/50 text-sm mt-2">ATP and cellular energy</p>
                                </a></Link>
                                <Link href="/trace-minerals-rare-earths"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-red-500/50 transition-all group">
                                    <span className="text-white group-hover:text-red-400">Trace Minerals →</span>
                                    <p className="text-white/50 text-sm mt-2">The mineral orchestra</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-red-500/50 transition-all group">
                                    <span className="text-white group-hover:text-red-400">Science Library →</span>
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
