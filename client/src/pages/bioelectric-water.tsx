import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Easing, type Variants } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function BioelectricWaterPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    // Electric blue accent for Bioelectric Water
    const accentColor = "#3b82f6";
    const accentGradient = "from-[#3b82f6] via-[#60a5fa] to-[#3b82f6]";

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as Easing } }
    };

    const staggerContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
    };

    return (
        <Layout>
            <Helmet>
                <title>Bioelectric Water – Where Living Charge Meets Liquid Medium | Andara</title>
                <meta name="description" content="Explore how water serves as the primary medium for bioelectric activity in living systems. Learn about ion gradients, membrane potentials, and the electrical nature of hydration." />
                <meta name="keywords" content="bioelectric water, water electricity, ionic water, living water, water conductivity, bioelectricity hydration" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="bioelectric" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a1628] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
                        {Array.from({ length: 25 }).map((_, i) => (
                            <motion.div key={i} className="absolute rounded-full" style={{ width: 3, height: 3, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, backgroundColor: `${accentColor}60` }}
                                animate={{ y: [0, -50, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: Math.random() * 4 + 3, repeat: Infinity }} />
                        ))}
                    </div>

                    <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Bioelectricity</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Bioelectric<br /><span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentGradient}`}>Water</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-xl">Where Living Charge Meets Liquid Medium</p>
                            <p className="text-lg text-white/60 mb-8 max-w-xl">Water is not just a passive solvent. It is the primary medium through which bioelectric signals propagate, ions flow, and cellular voltage is maintained.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>Explore the Science</button>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                            <SmartVideoEmbed keywords={["bioelectric", "water", "electricity", "current"]} className="w-full rounded-2xl shadow-2xl" aspectRatio="video" />
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1 */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Water as Electrical Medium</h2>
                            <p className="text-lg text-white/70">The liquid that carries life's current.</p>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "⚡", title: "Ion Conductor", desc: "Water dissolves salts into ions that carry electrical charge throughout the body." },
                                { icon: "🔋", title: "Voltage Medium", desc: "Cell membranes maintain voltage gradients using water-dissolved ions as charge carriers." },
                                { icon: "🌊", title: "Signal Propagator", desc: "Nerve impulses, muscle contractions, and brain activity all depend on ion movement through water." }
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

                {/* SECTION 2 */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Ionic Dance</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10">
                                <h3 className="text-lg text-amber-400 font-medium mb-3">⊕ Cations</h3>
                                <p className="text-white/60 text-sm mb-3">Sodium (Na⁺), Potassium (K⁺), Calcium (Ca²⁺), Magnesium (Mg²⁺)</p>
                                <p className="text-white/50 text-xs">Carry positive charge, flow through channels, drive membrane potentials.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/10">
                                <h3 className="text-lg text-cyan-400 font-medium mb-3">⊖ Anions</h3>
                                <p className="text-white/60 text-sm mb-3">Chloride (Cl⁻), Sulfate (SO₄²⁻), Bicarbonate (HCO₃⁻), Phosphate (PO₄³⁻)</p>
                                <p className="text-white/50 text-xs">Balance charge, buffer pH, participate in metabolic pathways.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3 */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Structured Water & Charge</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2 text-center" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <p className="text-white/80 text-lg leading-relaxed mb-6">Near hydrophilic surfaces, water forms organized layers (EZ water) that exclude solutes and separate charge. These zones create natural batteries within the body.</p>
                                <p className="text-lg" style={{ color: accentColor }}>Structured water is not just "cleaner" water – it is electrically different water.</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 4: NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Continue Exploring</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/charge-coherence"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 transition-all group">
                                    <span className="text-white group-hover:text-blue-400">Charge Coherence →</span>
                                    <p className="text-white/50 text-sm mt-2">When bioelectric fields harmonize</p>
                                </a></Link>
                                <Link href="/ion-transport"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 transition-all group">
                                    <span className="text-white group-hover:text-blue-400">Ion Transport →</span>
                                    <p className="text-white/50 text-sm mt-2">Channels, pumps & gradients</p>
                                </a></Link>
                                <Link href="/science/ez-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 transition-all group">
                                    <span className="text-white group-hover:text-blue-400">EZ Water →</span>
                                    <p className="text-white/50 text-sm mt-2">The fourth phase of water</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 transition-all group">
                                    <span className="text-white group-hover:text-blue-400">Science Library →</span>
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
