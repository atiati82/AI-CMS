import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function VortexTechnologiesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#8b5cf6";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>Vortex Technologies – The Science of Spiral Water Flow | Andara</title>
                <meta name="description" content="Explore vortex technologies for water – how spiral flow patterns may structure water, increase dissolved oxygen, and mimic nature's way of moving and revitalizing water." />
                <meta name="keywords" content="vortex water, spiral flow, water vortex, Viktor Schauberger, implosion technology, water structuring, vortex device" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="water" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0818] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
                        {/* Spiral particles */}
                        {Array.from({ length: 15 }).map((_, i) => (
                            <motion.div key={i} className="absolute rounded-full" style={{ width: 4, height: 4, left: "50%", top: "50%", backgroundColor: `${accentColor}60` }}
                                animate={{
                                    x: [0, Math.cos(i * 0.4) * 150, Math.cos(i * 0.4) * 100, 0],
                                    y: [0, Math.sin(i * 0.4) * 150, Math.sin(i * 0.4) * 100 + 100, 200],
                                    opacity: [0.8, 0.6, 0.3, 0]
                                }} transition={{ duration: 4, delay: i * 0.2, repeat: Infinity }} />
                        ))}
                    </div>

                    <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Water Science</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Vortex<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#8b5cf6]">Technologies</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-xl">The Science of Spiral Flow</p>
                            <p className="text-lg text-white/60 mb-8 max-w-xl">Nature moves water in spirals – through rivers, whirlpools, and even blood vessels. Vortex technologies attempt to replicate this natural motion to structure and revitalize water.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>Explore the Spiral</button>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                            <SmartVideoEmbed keywords={["vortex", "spiral", "water flow", "whirlpool"]} className="w-full rounded-2xl shadow-2xl" aspectRatio="video" />
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1 */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Nature's Preferred Motion</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🌀", title: "Rivers", desc: "Healthy rivers meander in curves, creating natural vortices that cleanse and oxygenate water." },
                                { icon: "🌪️", title: "Whirlpools", desc: "Water naturally spirals inward, creating zones of different pressure and movement." },
                                { icon: "🩸", title: "Blood Flow", desc: "Blood moves through the body in spiral patterns, not straight lines." }
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

                {/* SECTION 2: Viktor Schauberger */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Viktor Schauberger's Vision</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border border-white/20 bg-white/5">
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-6">The Austrian forester and naturalist Viktor Schauberger (1885-1958) observed that water in nature always moves in spirals. He developed "implosion" technology – devices that spin water inward rather than outward.</p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-4 rounded-xl bg-white/5 text-center">
                                        <p className="text-white font-medium mb-2">Explosion</p>
                                        <p className="text-white/60 text-sm">Outward, destructive, entropic. How most machines work.</p>
                                    </div>
                                    <div className="p-4 rounded-xl border-2 text-center" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                        <p className="font-medium mb-2" style={{ color: accentColor }}>Implosion</p>
                                        <p className="text-white/60 text-sm">Inward, creative, negentropic. How nature moves water.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: Effects */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Reported Effects</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "💨", title: "Increased Oxygen", desc: "Vortexing may increase dissolved oxygen levels" },
                                { icon: "🔷", title: "Structure Formation", desc: "Spiral motion may encourage ordered molecular arrangements" },
                                { icon: "⚡", title: "Charge Separation", desc: "Movement creates electrical potential differences" },
                                { icon: "🧪", title: "Reduced Chlorine", desc: "Some report off-gassing of volatile substances" }
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="text-white font-medium mb-2">{item.title}</h3>
                                    <p className="text-white/60 text-xs">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-amber-500/30 bg-amber-950/10 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <p className="text-amber-400/80 text-sm">Note: Many vortex technology claims are based on observation and theory rather than peer-reviewed studies. We present this as an area of exploration, not proven science.</p>
                        </motion.div>
                    </div>
                </section>

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Continue Exploring</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/vortex-spin-experiments"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all group">
                                    <span className="text-white group-hover:text-purple-400">Vortex Experiments →</span>
                                    <p className="text-white/50 text-sm mt-2">DIY vortex testing</p>
                                </a></Link>
                                <Link href="/science/structured-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all group">
                                    <span className="text-white group-hover:text-purple-400">Structured Water →</span>
                                    <p className="text-white/50 text-sm mt-2">How water organizes</p>
                                </a></Link>
                                <Link href="/magnetics-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all group">
                                    <span className="text-white group-hover:text-purple-400">Magnetics & Water →</span>
                                    <p className="text-white/50 text-sm mt-2">Magnetic field effects</p>
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
