import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import {
    Droplets, Snowflake, Cloud, Hexagon, Zap, Sun, Magnet,
    Activity, Eye, Layers, FlaskConical, ArrowRight, ArrowDown,
    Gauge, Sparkles, Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Section IDs for navigation
const SECTIONS = [
    { id: "hero", label: "Introduction" },
    { id: "phases", label: "Four Phases" },
    { id: "structure", label: "Structure" },
    { id: "activation", label: "Activation" },
    { id: "measuring", label: "Measuring" },
    { id: "interfaces", label: "Interfaces" },
    { id: "practice", label: "In Practice" },
    { id: "andara", label: "Andara Context" },
    { id: "summary", label: "Summary" },
];

/**
 * Water Science Master Page
 * 
 * Phases, Structure & Activation
 * Educational content about water behavior and organization.
 */
export default function WaterScienceMaster() {
    const containerRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const [activeSection, setActiveSection] = useState("hero");

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Intersection Observer for section tracking
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
        );

        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <Layout>
            <div
                ref={containerRef}
                className="andara-page"
                data-tree="water"
                style={{ backgroundColor: "#020617" }}
            >
                {/* Scroll Progress Bar */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1aa7ff] via-[#38ffd1] to-[#63b4ff] z-50 origin-left"
                    style={{ scaleX: scrollYProgress }}
                />

                {/* Section Waypoint Navigation */}
                <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
                    {SECTIONS.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                            className="group flex items-center gap-3"
                            aria-label={`Go to ${label}`}
                        >
                            <span
                                className={`text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${activeSection === id ? "text-[#1aa7ff]" : "text-white/50"
                                    }`}
                            >
                                {label}
                            </span>
                            <span
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === id
                                    ? "bg-[#1aa7ff] scale-125 shadow-[0_0_8px_rgba(26,167,255,0.5)]"
                                    : "bg-white/20 group-hover:bg-white/40"
                                    }`}
                            />
                        </button>
                    ))}
                </nav>

                {/* ============================================ */}
                {/* SECTION 1: HERO */}
                {/* ============================================ */}
                <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
                    {/* Background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#061525] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[#1aa7ff]/8 blur-[150px]" />
                        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#38ffd1]/5 blur-[120px]" />
                    </div>

                    <div className="container relative z-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1aa7ff]/10 border border-[#1aa7ff]/20 text-[#1aa7ff] mb-6">
                                <Droplets className="w-4 h-4" />
                                <span className="text-sm font-semibold tracking-wide">Science Library</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-[1.1] mb-6">
                                Water Science
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1aa7ff] via-[#38ffd1] to-[#63b4ff]">
                                    Phases, Structure & Activation
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-8 max-w-xl">
                                Water is more than a liquid you drink. It's a living interface between matter, energy, and information — constantly shifting phases, rearranging its inner structure, and responding to light, minerals, motion and fields.
                            </p>

                            <ul className="space-y-3 text-white/60 mb-8">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1aa7ff] mt-2" />
                                    Four key expressions: ice, liquid, vapor, and structured water
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#38ffd1] mt-2" />
                                    Structure, not just chemistry — how molecules arrange determines behavior
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#f6d56a] mt-2" />
                                    Activation: what happens when water is moved, mineralized, lit and charged
                                </li>
                            </ul>

                            <button
                                onClick={() => document.getElementById("phases")?.scrollIntoView({ behavior: "smooth" })}
                                className="px-8 py-4 bg-gradient-to-r from-[#1aa7ff] to-[#38ffd1] text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-[0_0_30px_rgba(26,167,255,0.3)]"
                            >
                                Explore Water Science
                            </button>
                        </motion.div>

                        {/* Right: Phase Totem */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.2 }}
                        >
                            <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                                {[
                                    { icon: <Snowflake className="w-8 h-8" />, label: "Ice", desc: "Hexagonal crystals", color: "#a8d8ff", bg: "from-[#a8d8ff]/20 to-transparent" },
                                    { icon: <Droplets className="w-8 h-8" />, label: "Liquid", desc: "Flowing motion", color: "#1aa7ff", bg: "from-[#1aa7ff]/20 to-transparent" },
                                    { icon: <Cloud className="w-8 h-8" />, label: "Vapor", desc: "Rising mist", color: "#63b4ff", bg: "from-[#63b4ff]/20 to-transparent" },
                                    { icon: <Hexagon className="w-8 h-8" />, label: "Structured", desc: "Exclusion zone", color: "#38ffd1", bg: "from-[#38ffd1]/20 to-transparent" },
                                ].map((phase, i) => (
                                    <motion.div
                                        key={phase.label}
                                        className={`p-4 rounded-2xl border border-white/10 bg-gradient-to-r ${phase.bg}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-14 h-14 rounded-xl flex items-center justify-center"
                                                style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
                                            >
                                                {phase.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-display font-semibold text-white">{phase.label}</h3>
                                                <p className="text-sm text-white/50">{phase.desc}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ArrowDown className="w-6 h-6 text-white/30" />
                    </motion.div>
                </section>

                {/* ============================================ */}
                {/* SECTION 2: THE FOUR PHASES */}
                {/* ============================================ */}
                <section id="phases" className="py-24 relative">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                The Four Expressions of Water
                            </h2>
                            <p className="text-lg text-white/60">
                                Beyond the three phases we learn in school, there's a fourth expression that behaves differently at interfaces — often called structured or EZ-like water.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {[
                                {
                                    num: "1",
                                    title: "Solid (Ice)",
                                    desc: "Molecules locked into stable hexagonal arrangements. Holds shape, transmits patterns — snowflakes, crystal memory.",
                                    icon: <Snowflake className="w-6 h-6" />,
                                    color: "#a8d8ff",
                                },
                                {
                                    num: "2",
                                    title: "Liquid (Bulk Water)",
                                    desc: "Molecules in constant motion, forming and breaking hydrogen bonds. The everyday water we drink, bathe in, and see in rivers.",
                                    icon: <Droplets className="w-6 h-6" />,
                                    color: "#1aa7ff",
                                },
                                {
                                    num: "3",
                                    title: "Vapor (Gas)",
                                    desc: "Individual molecules drifting freely. Carries water information and charge into the air through humidity and clouds.",
                                    icon: <Cloud className="w-6 h-6" />,
                                    color: "#63b4ff",
                                },
                                {
                                    num: "4",
                                    title: "Structured / EZ-like Water",
                                    desc: "Appears at interfaces — along surfaces, gels, membranes. Molecules packed in layers, showing altered density, viscosity, and charge separation.",
                                    icon: <Hexagon className="w-6 h-6" />,
                                    color: "#38ffd1",
                                },
                            ].map((phase, i) => (
                                <motion.div
                                    key={phase.num}
                                    className="p-8 rounded-2xl border border-white/10 bg-[#0b1020]/50"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
                                        >
                                            {phase.icon}
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: phase.color }}>
                                                Phase {phase.num}
                                            </span>
                                            <h3 className="text-xl font-display font-semibold text-white">{phase.title}</h3>
                                        </div>
                                    </div>
                                    <p className="text-white/60 leading-relaxed">{phase.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            className="text-center text-white/50 mt-12 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            Water is not one thing. It's a shape-shifter — constantly reorganizing between these phases. The inner structure in each phase determines how water stores energy, transports ions, and supports life.
                        </motion.p>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 3: STRUCTURE */}
                {/* ============================================ */}
                <section id="structure" className="py-24 bg-[#05060b]/50 border-y border-white/5">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                From Random Molecules to Coherent Fields
                            </h2>
                            <p className="text-lg text-white/60">
                                At the microscopic level, water molecules form clusters, layers and domains that can be more or less ordered.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                            {[
                                {
                                    title: "Hydrogen Bonds",
                                    desc: "Each molecule connects to others like a tiny tetrahedral magnet. These bonds form and break on femto- to picosecond timescales.",
                                    icon: <Layers className="w-6 h-6" />,
                                },
                                {
                                    title: "Clusters & Micro-domains",
                                    desc: "Areas where molecules momentarily align into structures. These affect viscosity, diffusion, and ion movement.",
                                    icon: <Hexagon className="w-6 h-6" />,
                                },
                                {
                                    title: "Fields & Coherence",
                                    desc: "Under certain conditions, water shifts from chaotic to coherent. Coherent water holds charge, supports proton conduction, shows stability.",
                                    icon: <Sparkles className="w-6 h-6" />,
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    className="p-6 rounded-2xl border border-white/10 bg-[#0b1020]/30"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#1aa7ff]/10 flex items-center justify-center mb-4 text-[#1aa7ff]">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-display font-semibold text-white mb-3">{item.title}</h3>
                                    <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Visual: Chaos vs Coherence */}
                        <motion.div
                            className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex-1 p-8 rounded-2xl border border-white/10 bg-[#0b1020]/30 text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                    <span className="text-3xl">💧</span>
                                </div>
                                <p className="text-sm text-white/40">Low structural coherence</p>
                            </div>
                            <ArrowRight className="w-8 h-8 text-white/20 rotate-90 md:rotate-0" />
                            <div className="flex-1 p-8 rounded-2xl border border-[#38ffd1]/30 bg-gradient-to-b from-[#38ffd1]/10 to-transparent text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#38ffd1]/15 flex items-center justify-center">
                                    <Hexagon className="w-10 h-10 text-[#38ffd1]" />
                                </div>
                                <p className="text-sm text-[#38ffd1]/80">Higher structural coherence</p>
                            </div>
                        </motion.div>

                        <motion.p
                            className="text-center text-white/50 mt-12 max-w-2xl mx-auto text-lg"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            The quality of water is not only what's dissolved in it — but <strong className="text-white/80">how its molecules are structured</strong>.
                        </motion.p>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 4: ACTIVATION */}
                {/* ============================================ */}
                <section id="activation" className="py-24">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                Activation — When Water Wakes Up
                            </h2>
                            <p className="text-lg text-white/60">
                                In nature, water flows, spins, rises, falls, meets rock, light and air. Each input nudges water into a more organized state.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {[
                                {
                                    icon: <Activity className="w-8 h-8" />,
                                    title: "Movement & Vortexing",
                                    desc: "Spirals, vortices and turbulence rearrange water's inner geometry. Rivers 'knead' water into structure.",
                                    color: "#1aa7ff",
                                },
                                {
                                    icon: <FlaskConical className="w-8 h-8" />,
                                    title: "Minerals & Ions",
                                    desc: "Ionic minerals (sulfates, magnesium, silicates) provide charge carriers and scaffolding for structuring.",
                                    color: "#f6d56a",
                                },
                                {
                                    icon: <Sun className="w-8 h-8" />,
                                    title: "Light & Temperature",
                                    desc: "Sunlight, infrared, and thermal gradients drive phase shifts. Light feeds water with photon energy.",
                                    color: "#ff9f43",
                                },
                                {
                                    icon: <Magnet className="w-8 h-8" />,
                                    title: "Electric & Magnetic Fields",
                                    desc: "Earth fields, lightning, Schumann resonances influence ion distribution and structured domains.",
                                    color: "#38ffd1",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    className="p-6 rounded-2xl border border-white/10 bg-[#0b1020]/50 text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div
                                        className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                    >
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-display font-semibold text-white mb-3">{item.title}</h3>
                                    <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="mt-16 p-8 rounded-3xl border border-[#38ffd1]/20 bg-gradient-to-r from-[#38ffd1]/5 to-transparent max-w-3xl mx-auto text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <Sparkles className="w-12 h-12 text-[#38ffd1] mx-auto mb-4" />
                            <p className="text-lg text-white/70 leading-relaxed">
                                "Activated water" is water that has been moved, mineralized, lit and charged into a more coherent, information-rich state — closer to mountain springs and living cells.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 5: MEASURING */}
                {/* ============================================ */}
                <section id="measuring" className="py-24 bg-[#05060b]/50 border-y border-white/5">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                How We Measure What Eyes Can't See
                            </h2>
                            <p className="text-lg text-white/60">
                                Four parameters give us a fingerprint of water's inner environment.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {[
                                { param: "pH", label: "Acid–Base", desc: "Proton concentration. Slightly alkaline ranges often correlate with stability.", color: "#1aa7ff" },
                                { param: "ORP", label: "Redox Potential", desc: "Tendency to give or take electrons. Lower ORP = more reducing environment.", color: "#38ffd1" },
                                { param: "EC", label: "Conductivity", desc: "How well water conducts current. Higher EC = more ions, better charge movement.", color: "#f6d56a" },
                                { param: "NTU", label: "Turbidity", desc: "Suspended material. Clearer water = better conditions for structuring.", color: "#63b4ff" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.param}
                                    className="p-6 rounded-2xl border border-white/10 bg-[#0b1020]/30 text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div
                                        className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                                        style={{ backgroundColor: `${item.color}15` }}
                                    >
                                        <span className="text-xl font-bold" style={{ color: item.color }}>{item.param}</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-white/80 mb-2">{item.label}</h3>
                                    <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            className="text-center text-white/50 mt-12 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            These numbers don't tell the whole story — but together, they reveal a terrain that can be more or less friendly for coherence, charge and life processes.
                        </motion.p>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 6: INTERFACES */}
                {/* ============================================ */}
                <section id="interfaces" className="py-24">
                    <div className="container px-4 max-w-4xl mx-auto">
                        <motion.header
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                Interfaces — Where Water Becomes Biological
                            </h2>
                            <p className="text-lg text-white/60">
                                Life doesn't happen in bulk water. It happens where water touches surfaces.
                            </p>
                        </motion.header>

                        <motion.div
                            className="p-8 rounded-3xl border border-white/10 bg-[#0b1020]/50 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {["Cell membranes", "Collagen fibers", "Fascia & gels", "Mineral surfaces"].map((item) => (
                                    <div key={item} className="p-3 rounded-xl bg-white/5 text-center">
                                        <span className="text-sm text-white/70">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-white/60 leading-relaxed mb-6">
                                At these interfaces, water forms structured layers — partially ordered, EZ-like zones that support charge separation, act as slip layers for blood and lymph, and provide proton pathways along surfaces.
                            </p>

                            <p className="text-white/70 leading-relaxed">
                                In this view, the body is a <strong className="text-[#38ffd1]">liquid crystal</strong>: a matrix of minerals, proteins and water, continually restructuring based on the quality of the water phase.
                            </p>
                        </motion.div>

                        <motion.p
                            className="text-center text-white/50 italic"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            The question is not only "what's in your water?" but "what can your water become once it meets the surfaces of life?"
                        </motion.p>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 7: IN PRACTICE */}
                {/* ============================================ */}
                <section id="practice" className="py-24 bg-[#05060b]/50 border-y border-white/5">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                From Tap Water to Activated Terrain
                            </h2>
                            <p className="text-lg text-white/60">
                                Modern water often arrives fragmented after pipes, pressure and chemical treatment. Activation asks: how can we bring it closer to its natural, coherent state?
                            </p>
                        </motion.header>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
                            {[
                                { step: "1", title: "Clarification", desc: "Remove suspended particles", color: "#63b4ff" },
                                { step: "2", title: "Mineral Tuning", desc: "Adjust ionic balance", color: "#f6d56a" },
                                { step: "3", title: "Structural Stimulus", desc: "Movement, vortexing, flow", color: "#1aa7ff" },
                                { step: "4", title: "Energetic Conditioning", desc: "Light, fields, forms", color: "#38ffd1" },
                            ].map((item, i) => (
                                <React.Fragment key={item.step}>
                                    <motion.div
                                        className="flex-1 p-6 rounded-2xl border border-white/10 bg-[#0b1020]/30 text-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center"
                                            style={{ backgroundColor: `${item.color}15` }}
                                        >
                                            <span className="text-lg font-bold" style={{ color: item.color }}>{item.step}</span>
                                        </div>
                                        <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                                        <p className="text-xs text-white/50">{item.desc}</p>
                                    </motion.div>
                                    {i < 3 && <ArrowRight className="w-5 h-5 text-white/20 hidden md:block flex-shrink-0" />}
                                </React.Fragment>
                            ))}
                        </div>

                        <motion.div
                            className="mt-12 p-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/10 flex flex-col items-center text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            <Calculator className="w-8 h-8 text-cyan-400 mb-3" />
                            <h4 className="text-white font-bold mb-2">Ready for Precision Dosing?</h4>
                            <p className="text-sm text-white/60 mb-6">Access our interactive calculator and master table for all applications.</p>
                            <div className="flex gap-4">
                                <Link href="/andara-dilution-calculator">
                                    <Button size="sm" className="bg-cyan-500 hover:bg-cyan-400 text-black">Open Calculator</Button>
                                </Link>
                                <Link href="/andara-ionic-dilution-table">
                                    <Button size="sm" variant="outline" className="border-white/10 text-white">View Table</Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 8: ANDARA CONTEXT */}
                {/* ============================================ */}
                <section id="andara" className="py-24">
                    <div className="container px-4 max-w-4xl mx-auto">
                        <motion.div
                            className="p-10 rounded-3xl border border-white/10 bg-[#0b1020]/50"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mb-6">
                                Andara Ionic in the Water Science Context
                            </h2>

                            <p className="text-white/60 leading-relaxed mb-6">
                                Andara Ionic is a primordial ionic sulfate mineral solution designed for the <strong className="text-white/80">Clarification</strong> and <strong className="text-white/80">Mineral Tuning</strong> stages of the activation journey:
                            </p>

                            <ul className="space-y-3 text-white/60 mb-8">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#f6d56a] mt-2 flex-shrink-0" />
                                    Provides a defined band of ionic sulfates and companion minerals, inspired by volcanic–ocean interfaces
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#f6d56a] mt-2 flex-shrink-0" />
                                    Supports flocculation and clarification, helping suspended impurities cluster and settle
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#f6d56a] mt-2 flex-shrink-0" />
                                    Tunes water toward the 17–30 mg/L sulfate range associated with classical water treatment and natural mineral waters
                                </li>
                            </ul>

                            <p className="text-white/50 text-sm italic">
                                From there, vortexing, structural devices, light and architecture can build on a cleaner, better-tuned base.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 9: SUMMARY */}
                {/* ============================================ */}
                <section id="summary" className="py-24 bg-gradient-to-b from-[#020617] to-[#05060b]">
                    <div className="container px-4 text-center max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">
                                Water Science in One Breath
                            </h2>

                            <p className="text-xl text-white/70 leading-relaxed mb-8">
                                Water is the moving mirror between matter and consciousness. It shifts phases, reorganizes its structure, stores charge, and responds to every mineral, movement, photon and field it meets.
                            </p>

                            <p className="text-white/50 mb-12">
                                When we talk about phases, structure and activation, we're really asking how water chooses a form, arranges its molecules, and gets tuned closer to the water of mountain springs and living cells.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/science/ez-water">
                                    <button className="px-8 py-4 bg-gradient-to-r from-[#1aa7ff] to-[#38ffd1] text-white font-bold rounded-lg hover:opacity-90 transition-all">
                                        Explore Structured Water
                                    </button>
                                </Link>
                                <Link href="/science-library">
                                    <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:border-white/40 transition-all flex items-center gap-2">
                                        Back to Library <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
