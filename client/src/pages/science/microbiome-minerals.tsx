import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed, VideoBackground } from "@/components/SmartVideoEmbed";

export default function MicrobiomeMineralsPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

    // Pink/Magenta accent for Microbiome cluster
    const accentColor = "#ec4899";
    const accentGradient = "from-[#ec4899] via-[#f472b6] to-[#ec4899]";

    return (
        <Layout>
            <div
                ref={containerRef}
                className="andara-page"
                data-tree="microbiome"
                style={{ backgroundColor: "#020617" }}
            >
                {/* --- SCROLL PROGRESS BAR --- */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
                    style={{ scaleX: scrollYProgress, backgroundColor: accentColor }}
                />

                {/* --- HERO SECTION --- */}
                <motion.section
                    className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
                    style={{ opacity: heroOpacity, scale: heroScale }}
                >
                    {/* Ambient Background */}
                    <div className="absolute inset-0 z-0">
                        <VideoBackground keywords={["microbiome", "bacteria", "network", "biology", "blue"]} overlayOpacity={0.3} />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#070a12] to-[#020617]" />
                        <div className="absolute top-0 inset-x-0 h-[500px] blur-[100px] rounded-full" style={{ backgroundColor: `${accentColor}10` }} />
                        {/* Floating Particles Background */}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: Math.random() * 4 + 1,
                                    height: Math.random() * 4 + 1,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    backgroundColor: `${accentColor}30`,
                                }}
                                animate={{
                                    y: [0, -100],
                                    opacity: [0, 0.5, 0]
                                }}
                                transition={{
                                    duration: Math.random() * 10 + 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </div>

                    <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6"
                                style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Microbiome & Minerals</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Minerals & <br />
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentGradient} bg-[length:200%_auto] animate-gradient`}>
                                    Microbiome
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-4 max-w-xl">
                                <strong className="text-white">The Mineral Roots of Gut Health</strong>
                            </p>
                            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
                                A resilient microbiome grows from a <strong>wisely mineralized terrain</strong>, not from isolated supplements alone.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {["Enzyme Activation", "pH Balance", "Terrain Support"].map((tag) => (
                                    <span key={tag} className="px-4 py-2 rounded-full text-sm font-medium border"
                                        style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30`, color: accentColor }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 font-bold rounded-lg transition-all"
                                    style={{ backgroundColor: accentColor, color: "#020617", boxShadow: `0 0 20px ${accentColor}50` }}
                                >
                                    Explore the Terrain
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative"
                        >
                            <SmartVideoEmbed
                                keywords={["microbiome", "bacteria", "gut", "terrain", "microscopic"]}
                                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                                aspectRatio="video"
                            />
                            <p className="text-center text-white/30 text-xs mt-4 font-mono">
                                The gut is not a container – it is a living ecosystem.
                            </p>
                        </motion.div>
                    </div>
                </motion.section>


                {/* --- SECTION 1: MINERALS AS HIDDEN ARCHITECTURE --- */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                1. Minerals as the Hidden Architecture <br />of the Microbiome
                            </h2>
                            <p className="text-lg text-white/70 leading-relaxed">
                                The gut is often described as a forest of microbes – but every forest grows from <strong>soil</strong>.
                                In microbiome language, minerals are that soil: they define the electrical, chemical and structural
                                conditions in which microorganisms organize themselves.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            {[
                                { title: "Minerals as Enzyme Keys", icon: "🔑", desc: "Microbes rely on thousands of enzymes to break down fibers and build structures. Many require mineral cofactors such as magnesium, zinc, manganese or iron." },
                                { title: "Minerals as Terrain Shapers", icon: "🌍", desc: "Minerals influence pH, buffering and redox balance, defining how acidic or alkaline the gut environment feels. These parameters determine which microbial species thrive." },
                                { title: "Minerals and Water Structure", icon: "💧", desc: "The microbiome exists in water. The mineral composition shapes how water clusters and how protons and electrons move across surfaces." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="panel facet pad p-8 bg-[#0b1020]/50 border border-white/5 rounded-2xl backdrop-blur-sm"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                >
                                    <div className="text-3xl mb-4">{item.icon}</div>
                                    <h3 className="text-xl font-display mb-3" style={{ color: accentColor }}>{item.title}</h3>
                                    <p className="text-white/60">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* --- SECTION 2: KEY MINERALS IN MICROBIAL METABOLISM --- */}
                <section className="section bg-[#05060b]/50 border-y border-white/5 relative z-10 py-24">
                    <div className="container px-4">
                        <motion.div
                            className="mb-12"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                2. Key Minerals in Microbial Metabolism
                            </h2>
                            <p className="text-white/60 max-w-2xl text-lg">
                                Each mineral has its own personality in the microbial orchestra.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Magnesium (Mg²⁺)", icon: "⚡", desc: "A master cofactor participating in hundreds of enzymatic reactions. Many ATP-dependent processes associate ATP with magnesium." },
                                { title: "Zinc (Zn²⁺)", icon: "🔩", desc: "Involved in structural and catalytic roles in proteins. Zinc-dependent enzymes help process nutrients." },
                                { title: "Manganese (Mn²⁺)", icon: "⚙️", desc: "Participates in redox-related enzymes and protective systems for microbes in fluctuating oxygen conditions." },
                                { title: "Iron (Fe²⁺/Fe³⁺)", icon: "🔋", desc: "Central element in many electron transfer chains, linking nutrient breakdown to energy-generating pathways." },
                                { title: "Sulfate (SO₄²⁻)", icon: "🧪", desc: "Participates in detoxification pathways, mucosal structure and redox cycling within the gut environment." },
                                { title: "Trace Elements", icon: "✨", desc: "Many enzymes depend on rare and ultra-trace elements whose roles are still being explored by science." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="panel facet pad p-8 bg-[#0b1020]/50 border border-white/5 rounded-2xl backdrop-blur-sm"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="text-3xl mb-4">{item.icon}</div>
                                    <h3 className="text-xl font-display text-[#f472b6] mb-3">{item.title}</h3>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* --- SECTION 3: TERRAIN MODEL --- */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                3. A Terrain Model for Minerals & Microbiome
                            </h2>
                            <p className="text-lg text-white/70">
                                Instead of focusing on individual microbe names, a terrain model asks:
                                <strong> what kind of environment are we creating?</strong>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center max-w-5xl mx-auto">
                            {[
                                { step: 1, title: "Water", desc: "The primary medium. Its structure defines the base signal.", color: "#1aa7ff" },
                                { step: 2, title: "Minerals", desc: "The elemental alphabet shaping pH, conductivity and redox.", color: "#f2c76c" },
                                { step: 3, title: "Bioelectric", desc: "Voltage gradients and ion distributions for signaling.", color: "#2cff9a" },
                                { step: 4, title: "Microbiome", desc: "The visible forest emerging from the underlying terrain.", color: accentColor }
                            ].map((item) => (
                                <motion.div
                                    key={item.step}
                                    className="p-6 rounded-xl bg-[#020617] border border-white/10"
                                    whileHover={{ y: -5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center text-[#020617] font-bold mb-4 mx-auto text-xl"
                                        style={{ backgroundColor: item.color }}
                                    >
                                        {item.step}
                                    </div>
                                    <h4 className="text-white font-bold mb-2">{item.title}</h4>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* --- SECTION 4: ANDARA PERSPECTIVE --- */}
                <section className="section bg-gradient-to-b from-[#020617] to-[#070a12] py-24 border-t border-white/5">
                    <div className="container px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-5xl font-display text-white mb-8">
                                    4. Where Andara Fits In
                                </h2>
                                <div className="prose prose-invert prose-lg text-white/70">
                                    <p className="mb-6">
                                        In the Andara universe, ionic sulfate minerals are one way to <strong>support the underlying terrain</strong> –
                                        adding charge coherence, buffering capacity, and structure to the water environment that the microbiome lives in.
                                    </p>
                                    <ul className="space-y-4 mb-8">
                                        <li className="flex items-start gap-3">
                                            <span style={{ color: accentColor }} className="mt-1">⬡</span>
                                            <span><strong>Not a probiotic replacement:</strong> Andara works on the terrain, not on individual species.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#f2c76c] mt-1">⬢</span>
                                            <span><strong>Foundational layer:</strong> Clean, structured, mineralized water as the base for all gut processes.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#2cff9a] mt-1">◎</span>
                                            <span><strong>Educational perspective:</strong> This is a model for thinking, not a protocol for treatment.</span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-gradient-to-br border"
                                style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30` }}
                            >
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🦠</div>
                                    <h4 className="text-xl font-bold text-white mb-4">The Andara Perspective</h4>
                                    <p className="text-white/60">
                                        We don't claim to fix the microbiome. We aim to <strong>support the conditions</strong> in which
                                        a healthy microbiome can naturally thrive.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>


                {/* --- FAQ SECTION --- */}
                <section className="section py-20 bg-[#05060b]/50 border-t border-white/5">
                    <div className="container max-w-3xl mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-display text-white mb-12 text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-6">
                            {[
                                { q: "Do minerals fix the microbiome by themselves?", a: "Minerals do not fix anything in isolation. They condition the terrain – affecting pH, redox state, and enzyme activity. A terrain perspective emphasizes supporting the whole context." },
                                { q: "Is this recommending a specific protocol?", a: "No. This page describes conceptual relationships between minerals, water and microbial communities. It is educational, not a therapeutic protocol." },
                                { q: "Can water and minerals alone resolve gut issues?", a: "Gut health arises from many layers: diet, lifestyle, stress, environment. Water and minerals are foundational pieces, but they interact with all other factors." }
                            ].map((faq, i) => (
                                <motion.div
                                    key={i}
                                    className="p-6 bg-white/5 rounded-xl border border-white/10"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <h4 className="text-white font-bold mb-2">{faq.q}</h4>
                                    <p className="text-white/60 text-sm">{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* --- FOOTER NAVIGATION --- */}
                <section className="section py-16 bg-[#020617]">
                    <div className="container px-4">
                        <h2 className="text-center text-white/40 font-display text-2xl mb-12">Continue the Journey</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link href="/science/bioelectricity">
                                <a className="block p-8 rounded-2xl bg-[#0b1020] border border-white/5 hover:border-[#2cff9a]/50 transition-all group">
                                    <span className="text-xs font-bold text-[#2cff9a] uppercase tracking-widest mb-2 block">Related Pillar</span>
                                    <h3 className="text-xl text-white font-display mb-2 group-hover:text-[#2cff9a] transition-colors">Bioelectricity</h3>
                                    <p className="text-white/50 text-sm">The invisible voltage system &rarr;</p>
                                </a>
                            </Link>
                            <Link href="/science/mineral-science">
                                <a className="block p-8 rounded-2xl bg-[#0b1020] border border-white/5 hover:border-[#f2c76c]/50 transition-all group">
                                    <span className="text-xs font-bold text-[#f2c76c] uppercase tracking-widest mb-2 block">Next Pillar</span>
                                    <h3 className="text-xl text-white font-display mb-2 group-hover:text-[#f2c76c] transition-colors">Mineral Science</h3>
                                    <p className="text-white/50 text-sm">Ionic codes & elemental pathways &rarr;</p>
                                </a>
                            </Link>
                            <Link href="/science/water">
                                <a className="block p-8 rounded-2xl bg-[#0b1020] border border-white/5 hover:border-[#1aa7ff]/50 transition-all group">
                                    <span className="text-xs font-bold text-[#1aa7ff] uppercase tracking-widest mb-2 block">Foundation</span>
                                    <h3 className="text-xl text-white font-display mb-2 group-hover:text-[#1aa7ff] transition-colors">Water Science</h3>
                                    <p className="text-white/50 text-sm">The hidden architecture of water &rarr;</p>
                                </a>
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    );
}
