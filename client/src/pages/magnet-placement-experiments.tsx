import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Helmet } from "@/lib/react-helmet-stub";

export default function MagnetPlacementExperimentsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#3b82f6";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>Magnet Placement Experiments – Magnetic Field Effects on Water | Andara</title>
                <meta name="description" content="Explore how magnets might affect water. Simple experiments with different magnet placements, polarities, and exposure times." />
                <meta name="keywords" content="magnet water experiment, magnetic water, water magnets, magnet placement, magnetic field water" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="experiments" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#050815]/90 to-[#020617]" />
                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Experiments · Magnetics</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Magnet Placement<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#3b82f6]">Experiments</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Testing Magnetic Field Effects on Water</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Can magnets influence water? Try these simple experiments and observe for yourself.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>Try It</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: Materials */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What You'll Need</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🧲", title: "Strong Magnets", desc: "Neodymium preferred" },
                                { icon: "🥛", title: "Glass Containers", desc: "Non-magnetic, clear" },
                                { icon: "💧", title: "Water + Andara", desc: "Your test solution" },
                                { icon: "📏", title: "Compass", desc: "To verify polarity" }
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

                {/* SECTION 2: Placements */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Placement Options</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { title: "Under Container", desc: "Place magnet(s) beneath the glass, N pole up or S pole up", icon: "⬇️" },
                                { title: "Around Container", desc: "Place magnets on opposite sides of glass, N-S or N-N alignment", icon: "↔️" },
                                { title: "Flow-Through", desc: "Pour water past magnets (magnetic stirrer concept)", icon: "🔄" }
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

                {/* SECTION 3: Variables */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Variables to Track</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-xl text-white font-medium mb-4">Control Variables</h3>
                                <ul className="space-y-2">
                                    {["Magnet strength (Gauss)", "Distance from water", "Exposure duration", "Polarity orientation"].map((item) => (
                                        <li key={item} className="text-white/60 text-sm flex items-center gap-2"><span style={{ color: accentColor }}>→</span>{item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-xl text-white font-medium mb-4">What to Measure</h3>
                                <ul className="space-y-2">
                                    {["Taste difference", "Clarification speed", "Plant growth (long-term)", "Scale prevention"].map((item) => (
                                        <li key={item} className="text-white/60 text-sm flex items-center gap-2"><span style={{ color: accentColor }}>→</span>{item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                        <motion.div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-amber-500/30 bg-amber-950/10 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <p className="text-amber-400/80 text-sm">Note: Results from magnetic water experiments are often subjective and difficult to replicate. Approach these as exploratory play, not rigorous science.</p>
                        </motion.div>
                    </div>
                </section>

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">More to Explore</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/magnetics-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 transition-all group">
                                    <span className="text-white group-hover:text-blue-400">Magnetic Water Science →</span>
                                    <p className="text-white/50 text-sm mt-2">What we know and don't know</p>
                                </a></Link>
                                <Link href="/vortex-spin-experiments"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 transition-all group">
                                    <span className="text-white group-hover:text-blue-400">Vortex Experiments →</span>
                                    <p className="text-white/50 text-sm mt-2">Create spiral flow</p>
                                </a></Link>
                                <Link href="/diy-clarity-tests"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 transition-all group">
                                    <span className="text-white group-hover:text-blue-400">Clarity Tests →</span>
                                    <p className="text-white/50 text-sm mt-2">Simple observation</p>
                                </a></Link>
                                <Link href="/experiments-index"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 transition-all group">
                                    <span className="text-white group-hover:text-blue-400">All Experiments →</span>
                                    <p className="text-white/50 text-sm mt-2">Return to hub</p>
                                </a></Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
