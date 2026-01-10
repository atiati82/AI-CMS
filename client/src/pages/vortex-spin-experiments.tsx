import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function VortexSpinExperimentsPage() {
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
                <title>Vortex Spin Experiments – Create Spiral Water Flow | Andara</title>
                <meta name="description" content="Learn how to create vortex flow patterns in water. Simple experiments with stirring, funnels, and containers to explore natural spiral motion and its effects on water." />
                <meta name="keywords" content="vortex experiment, water vortex, spiral flow, water stirring, Schauberger, implosion" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="experiments" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO with Video */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <SmartVideoEmbed keywords={["vortex", "spiral", "water", "spin", "whirlpool"]} className="absolute inset-0 w-full h-full object-cover opacity-30" aspectRatio="video" autoPlay muted loop />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#051520]/90 to-[#020617]" />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Experiments · Vortex</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Vortex Spin<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] to-[#06b6d4]">Experiments</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Create Spiral Water Flow</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Nature loves spirals. Rivers meander, galaxies spin, water drains in vortices. Explore how you can create and observe vortex flow at home.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Spin It</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: Simple Vortex */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Experiment 1: Stirring Vortex</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl text-white font-medium mb-4">Materials</h3>
                                        <ul className="space-y-2">
                                            {["Clear cylindrical container", "Long spoon or stick", "Water with Andara drops", "Optional: floating particles"].map((item) => (
                                                <li key={item} className="text-white/60 text-sm flex items-center gap-2"><span style={{ color: accentColor }}>•</span>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl text-white font-medium mb-4">Method</h3>
                                        <ol className="space-y-2">
                                            {["Fill container 3/4 full", "Add 5 drops Andara", "Stir rapidly clockwise", "Remove spoon, observe vortex", "Note how long it sustains"].map((item, i) => (
                                                <li key={item} className="text-white/60 text-sm flex items-start gap-2"><span style={{ color: accentColor }}>{i + 1}.</span>{item}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Funnel Vortex */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Experiment 2: Funnel Vortex</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl text-white font-medium mb-4">Materials</h3>
                                        <ul className="space-y-2">
                                            {["2 plastic bottles", "Connector (tornado tube or tape)", "Water with Andara"].map((item) => (
                                                <li key={item} className="text-white/60 text-sm flex items-center gap-2"><span style={{ color: accentColor }}>•</span>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl text-white font-medium mb-4">Method</h3>
                                        <ol className="space-y-2">
                                            {["Fill one bottle 2/3 full", "Connect bottles end-to-end", "Flip so full bottle is on top", "Swirl to start vortex", "Watch water drain in spiral"].map((item, i) => (
                                                <li key={item} className="text-white/60 text-sm flex items-start gap-2"><span style={{ color: accentColor }}>{i + 1}.</span>{item}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: What to Observe */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What to Observe</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🌀", title: "Vortex Shape", desc: "Note the funnel shape and how it forms" },
                                { icon: "⏱️", title: "Duration", desc: "How long does the spin continue?" },
                                { icon: "💫", title: "Air Column", desc: "Watch for the central air core" }
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
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">More to Explore</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/vortex-technologies"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Vortex Science →</span>
                                    <p className="text-white/50 text-sm mt-2">Theory behind the spiral</p>
                                </a></Link>
                                <Link href="/diy-clarity-tests"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Clarity Tests →</span>
                                    <p className="text-white/50 text-sm mt-2">More simple experiments</p>
                                </a></Link>
                                <Link href="/magnet-placement-experiments"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Magnet Experiments →</span>
                                    <p className="text-white/50 text-sm mt-2">Magnetic field effects</p>
                                </a></Link>
                                <Link href="/experiments-index"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">All Experiments →</span>
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
