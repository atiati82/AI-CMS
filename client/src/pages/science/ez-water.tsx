import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function EzWaterPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#06b6d4";
    const accentGradient = "from-[#06b6d4] via-[#22d3ee] to-[#06b6d4]";

    const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>EZ Water – The Fourth Phase of Water | Andara</title>
                <meta name="description" content="Explore Exclusion Zone (EZ) water – the fourth phase of water discovered by Dr. Gerald Pollack. Learn how structured water near surfaces creates natural batteries and supports life." />
                <meta name="keywords" content="EZ water, exclusion zone water, fourth phase water, structured water, Gerald Pollack, water science" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="water" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#051515] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div key={i} className="absolute rounded-full" style={{ width: Math.random() * 8 + 4, height: Math.random() * 8 + 4, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, backgroundColor: `${accentColor}30` }}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: Math.random() * 5 + 4, repeat: Infinity }} />
                        ))}
                    </div>

                    <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Water Science</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                EZ<br /><span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentGradient}`}>Water</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-xl">The Fourth Phase of Water</p>
                            <p className="text-lg text-white/60 mb-8 max-w-xl">Beyond solid, liquid, and gas lies a fourth phase – Exclusion Zone water. Discovered by Dr. Gerald Pollack, EZ water forms near hydrophilic surfaces and exhibits unique electrical properties.</p>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {["H3O2", "Charge Separation", "Pollack Research"].map((tag) => (
                                    <span key={tag} className="px-4 py-2 rounded-full text-sm font-medium border" style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30`, color: accentColor }}>{tag}</span>
                                ))}
                            </div>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Explore the Science</button>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                            <SmartVideoEmbed keywords={["EZ water", "exclusion zone", "structured water", "pollack"]} className="w-full rounded-2xl shadow-2xl" aspectRatio="video" />
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: What is EZ Water */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What is Exclusion Zone Water?</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-xl text-white font-medium mb-4">📐 Structure</h3>
                                <p className="text-white/70 leading-relaxed">Near hydrophilic surfaces, water molecules organize into hexagonal layers. This zone excludes particles, solutes, and even microspheres – hence the name "Exclusion Zone".</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-xl text-white font-medium mb-4">⚡ Charge</h3>
                                <p className="text-white/70 leading-relaxed">EZ water carries a net negative charge, while the bulk water beyond it becomes positively charged. This charge separation creates a natural battery effect.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-xl text-white font-medium mb-4">🧪 Formula</h3>
                                <p className="text-white/70 leading-relaxed">Unlike regular H₂O, EZ water has the approximate formula H₃O₂ – a more ordered, gel-like state between liquid water and ice.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-xl text-white font-medium mb-4">☀️ Light-Powered</h3>
                                <p className="text-white/70 leading-relaxed">Infrared light (including sunlight) expands the EZ zone. This suggests water can harvest light energy to build structure and separate charge.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: In the Body */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">EZ Water in the Body</h2>
                        </motion.header>
                        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border border-white/20 bg-white/5">
                                <p className="text-white/80 text-lg text-center mb-8">Your body is approximately 99% water molecules. Many surfaces inside cells are hydrophilic – meaning EZ water likely forms extensively throughout the body.</p>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { icon: "🩸", title: "Blood Vessels", desc: "EZ zones may help propel blood flow beyond the heart's pumping action" },
                                        { icon: "🧬", title: "Cell Membranes", desc: "Structured water at membrane surfaces supports ion channel function" },
                                        { icon: "🌿", title: "Fascia & Collagen", desc: "Connective tissues are highly hydrophilic, creating extensive EZ networks" }
                                    ].map((item) => (
                                        <div key={item.title} className="p-4 rounded-xl bg-white/5 text-center">
                                            <span className="text-2xl mb-2 block">{item.icon}</span>
                                            <h4 className="text-white font-medium mb-1">{item.title}</h4>
                                            <p className="text-white/60 text-xs">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: Building EZ */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What Builds EZ Water?</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "☀️", title: "Infrared Light", color: "#f59e0b" },
                                { icon: "💧", title: "Hydrophilic Surfaces", color: "#06b6d4" },
                                { icon: "💎", title: "Certain Minerals", color: "#a855f7" },
                                { icon: "🌀", title: "Vortex Motion", color: "#22c55e" }
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp} className="p-6 rounded-2xl border text-center" style={{ borderColor: `${item.color}30`, backgroundColor: `${item.color}08` }}>
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="text-white font-medium">{item.title}</h3>
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
                                <Link href="/structured-water-basics"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Structured Water Basics →</span>
                                    <p className="text-white/50 text-sm mt-2">Foundation concepts</p>
                                </a></Link>
                                <Link href="/light-and-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Light & Water →</span>
                                    <p className="text-white/50 text-sm mt-2">How light powers water structure</p>
                                </a></Link>
                                <Link href="/bioelectric-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Bioelectric Water →</span>
                                    <p className="text-white/50 text-sm mt-2">Water as electrical medium</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Science Library →</span>
                                    <p className="text-white/50 text-sm mt-2">Return to library</p>
                                </a></Link>
                            </div>
                            <p className="text-white/50 text-sm mt-12">This page is educational. EZ water research is ongoing and not yet mainstream consensus.</p>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
