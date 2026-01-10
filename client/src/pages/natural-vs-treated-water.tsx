import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function NaturalVsTreatedWaterPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#22c55e";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>Natural vs Treated Water – Understanding Water Quality | Andara</title>
                <meta name="description" content="Compare natural spring water with municipal treated water. Understand how processing affects mineral content, structure, and bioelectrical properties of drinking water." />
                <meta name="keywords" content="natural water, treated water, spring water, municipal water, water quality, mineral water, water processing" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="water" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <SmartVideoEmbed keywords={["natural", "clean", "treated", "tap", "purity"]} className="absolute inset-0 w-full h-full object-cover opacity-10" aspectRatio="video" autoPlay muted loop />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#051810]/90 to-[#020617]" />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Water Science</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Natural vs<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#22c55e]">Treated Water</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Understanding Water Quality</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">What happens between a mountain spring and your tap? And what can we do to recondition water towards its natural state?</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Compare Waters</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: Comparison */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Comparison</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <h3 className="text-2xl font-medium mb-6" style={{ color: accentColor }}>🏔️ Natural Spring Water</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Natural mineral content from geology",
                                        "Structured by underground flow",
                                        "Negative ORP (electron-rich)",
                                        "Balanced pH from mineral buffering",
                                        "Microbiome from natural environment"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                                            <span style={{ color: accentColor }}>✓</span>{item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-slate-600/30 bg-slate-800/10">
                                <h3 className="text-2xl font-medium text-slate-400 mb-6">🚰 Treated Municipal Water</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Minerals often removed/imbalanced",
                                        "Chlorine/chloramine disinfection",
                                        "Positive ORP (oxidizing)",
                                        "May contain fluoride, added chemicals",
                                        "Pressure-piped, de-structured"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-white/50 text-sm">
                                            <span className="text-slate-500">—</span>{item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: What Processing Removes */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What Processing Changes</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "💎", title: "Mineral Balance", desc: "Filtration may remove beneficial minerals along with contaminants" },
                                { icon: "⚡", title: "Electrical Charge", desc: "ORP shifts from negative (antioxidant) to positive (oxidant)" },
                                { icon: "🌀", title: "Structure", desc: "Pressure, pipes, and processing disrupt molecular organization" }
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

                {/* SECTION 3: Reconditioning */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Reconditioning Water</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border border-amber-500/30 bg-amber-950/10">
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-6">While we can't recreate a mountain spring, we can nudge treated water back towards natural characteristics:</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-lg bg-white/5">
                                        <p className="text-amber-400 font-medium mb-2">Add Minerals</p>
                                        <p className="text-white/50 text-xs">Ionic minerals restore balance</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5">
                                        <p className="text-amber-400 font-medium mb-2">Vortex Flow</p>
                                        <p className="text-white/50 text-xs">Re-structure through movement</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5">
                                        <p className="text-amber-400 font-medium mb-2">Sunlight</p>
                                        <p className="text-white/50 text-xs">Build EZ layers with IR light</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5">
                                        <p className="text-amber-400 font-medium mb-2">Time & Rest</p>
                                        <p className="text-white/50 text-xs">Allow reorganization</p>
                                    </div>
                                </div>
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
                                <Link href="/vortex-technologies"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all group">
                                    <span className="text-white group-hover:text-green-400">Vortex Technologies →</span>
                                    <p className="text-white/50 text-sm mt-2">Re-structure through flow</p>
                                </a></Link>
                                <Link href="/springs"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all group">
                                    <span className="text-white group-hover:text-green-400">Spring Water Sources →</span>
                                    <p className="text-white/50 text-sm mt-2">Nature's water wisdom</p>
                                </a></Link>
                                <Link href="/how-to-use"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all group">
                                    <span className="text-white group-hover:text-green-400">How to Use Andara →</span>
                                    <p className="text-white/50 text-sm mt-2">Recondition your water</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all group">
                                    <span className="text-white group-hover:text-green-400">Science Library →</span>
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
