import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Droplets, Gem, Hexagon, BookOpen, Layers, Shield, ArrowRight, Sparkles, Brain, Microscope } from "lucide-react";
import { VideoBackground } from "@/components/SmartVideoEmbed";

// Custom components
import { ScienceLibraryHeroIllustration } from "@/components/science-library/ScienceLibraryHeroIllustration";
import { PillarCard } from "@/components/science-library/PillarCard";
import { NeuralLibraryMap } from "@/components/science-library/NeuralLibraryMap";

// Section IDs for navigation
const SECTIONS = [
    { id: "hero", label: "Welcome" },
    { id: "how-it-works", label: "How It Works" },
    { id: "pillars", label: "Three Pillars" },
    { id: "journey", label: "Learning Journey" },
    { id: "map", label: "Library Map" },
    { id: "example", label: "Applied Example" },
    { id: "disclaimer", label: "Disclaimer" },
    { id: "next", label: "Next Steps" },
];

/**
 * Science Library Master Page
 * 
 * The main entry point into all Andara scientific content.
 * "High-end future lab meets sacred nature" — calm, precise, visionary.
 */
export default function ScienceLibraryMaster() {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const [activeSection, setActiveSection] = useState("hero");

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Parallax transforms for hero elements
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.97]);
    const heroTextY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
    const heroIllustrationY = useTransform(scrollYProgress, [0, 0.1], [0, 30]);

    // Generate particles only once with useMemo (reduced from 30 to 15)
    const particles = useMemo(() =>
        Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            width: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: i % 3 === 0 ? "#1aa7ff" : i % 3 === 1 ? "#f6d56a" : "#38ffd1",
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5,
        })), []
    );

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
                data-tree="mineral"
                style={{ backgroundColor: "#020617" }}
            >
                {/* Scroll Progress Bar */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1aa7ff] via-[#63b4ff] to-[#f6d56a] z-50 origin-left"
                    style={{ scaleX: scrollYProgress }}
                />

                {/* Section Waypoint Navigation */}
                <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
                    {SECTIONS.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                            className="group flex items-center gap-3"
                            aria-label={`Go to ${label}`}
                        >
                            <span
                                className={`text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${activeSection === id ? "text-[#63b4ff]" : "text-white/50"
                                    }`}
                            >
                                {label}
                            </span>
                            <span
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === id
                                    ? "bg-[#63b4ff] scale-125 shadow-[0_0_8px_rgba(99,180,255,0.5)]"
                                    : "bg-white/20 group-hover:bg-white/40"
                                    }`}
                            />
                        </button>
                    ))}
                </nav>

                {/* ============================================ */}
                {/* SECTION 1: HERO - Welcome to the Science Library */}
                {/* ============================================ */}
                <motion.section
                    id="hero"
                    className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
                    style={{ opacity: heroOpacity, scale: heroScale }}
                >
                    {/* Ambient Background */}
                    <div className="absolute inset-0 z-0">
                        <VideoBackground keywords={["science", "library", "abstract", "particles", "blue", "network"]} overlayOpacity={0.3} />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#070a12] to-[#020617]" />
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#1aa7ff]/5 blur-[120px]" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#f6d56a]/5 blur-[120px]" />

                        {/* Floating Particles (memoized, reduced motion aware) */}
                        {!prefersReducedMotion && particles.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute rounded-full"
                                style={{
                                    width: p.width,
                                    height: p.width,
                                    left: p.left,
                                    top: p.top,
                                    backgroundColor: p.color,
                                }}
                                animate={{
                                    y: [0, -80, 0],
                                    opacity: [0, 0.5, 0],
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: p.delay,
                                }}
                            />
                        ))}
                    </div>

                    <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
                        {/* Left: Text Content (with parallax) */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" as Easing }}
                            style={{ y: prefersReducedMotion ? 0 : heroTextY }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#63b4ff]/10 border border-[#63b4ff]/20 text-[#63b4ff] mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span className="text-xs font-bold tracking-widest uppercase">Zone 2 · Educational Library</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Science Library
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1aa7ff] via-[#63b4ff] to-[#f6d56a]">
                                    Water, Minerals &amp; Crystalline Fields
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-6 max-w-xl">
                                This is the living archive where water physics, ionic minerals, and crystalline fields meet — explained in clear language, layered from beginner-friendly to deep research.
                            </p>

                            <ul className="space-y-3 text-white/60 mb-8">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1aa7ff] mt-2" />
                                    Water phases, EZ &amp; structuring
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#f6d56a] mt-2" />
                                    Ionic sulfate mineral pathways
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#38ffd1] mt-2" />
                                    Crystalline &amp; bioelectric field interactions
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#63b4ff] mt-2" />
                                    Terrain model (body as living environment)
                                </li>
                            </ul>

                            <button
                                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                                className="px-8 py-4 bg-gradient-to-r from-[#1aa7ff] to-[#63b4ff] text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-[0_0_30px_rgba(26,167,255,0.3)]"
                            >
                                Explore the Library
                            </button>
                        </motion.div>

                        {/* Right: Hero Illustration (with parallax) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.2 }}
                            style={{ y: prefersReducedMotion ? 0 : heroIllustrationY }}
                        >
                            <ScienceLibraryHeroIllustration />
                            <p className="text-center text-white/30 text-xs mt-4 font-mono">
                                Interactive: The Science Library Core with orbiting mineral signatures
                            </p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* ============================================ */}
                {/* SECTION 2: How This Library Is Structured */}
                {/* ============================================ */}
                <section id="how-it-works" className="section py-24 relative z-10">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                How the Science Library Works
                            </h2>
                            <p className="text-lg text-white/60">
                                A unified system of knowledge where water, minerals, and crystalline fields connect through layered depth.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Layers className="w-8 h-8" />,
                                    title: "Three Pillars, One Field",
                                    desc: "Water, minerals, crystalline fields are not separate — they are three views on the same energetic architecture.",
                                    color: "#1aa7ff",
                                },
                                {
                                    icon: <BookOpen className="w-8 h-8" />,
                                    title: "Layered Depth",
                                    desc: "Every pillar has overview pages (simple explanations), deep dives (for science lovers), and visual maps.",
                                    color: "#63b4ff",
                                },
                                {
                                    icon: <Shield className="w-8 h-8" />,
                                    title: "Educational Zone",
                                    desc: "No medical promises. Focus on physics, chemistry, and field behavior. Andara Ionic appears as example, not as medical product.",
                                    color: "#f6d56a",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="p-8 rounded-2xl border border-white/10 bg-[#0b1020]/50 backdrop-blur-sm"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    whileHover={{ y: -4, borderColor: `${item.color}40` }}
                                >
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                    >
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-display font-semibold text-white mb-3">{item.title}</h3>
                                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 3: The Three Pillars Overview */}
                {/* ============================================ */}
                <section id="pillars" className="section py-24 bg-[#05060b]/50 border-y border-white/5">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                The Three Pillars
                            </h2>
                            <p className="text-lg text-white/60">
                                Each pillar offers a unique lens on the same underlying architecture of life.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0 }}
                            >
                                <PillarCard
                                    type="water"
                                    title="Water Science — Phases, Structure & Activation"
                                    href="/science/water-science"
                                    icon={<Droplets className="w-6 h-6" />}
                                    bullets={[
                                        "Liquid, vapor, ice — plus structured / EZ-like water",
                                        "How minerals and surfaces shape water's internal architecture",
                                        "Why charge separation, pH, and ORP matter for clarity and coherence",
                                        "How vortexing, flow and environment influence water's memory-like behavior",
                                    ]}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                            >
                                <PillarCard
                                    type="mineral"
                                    title="Mineral Science — Ionic Codes & Elemental Pathways"
                                    href="/science/mineral-science"
                                    icon={<Gem className="w-6 h-6" />}
                                    bullets={[
                                        "Difference between ionic, colloidal, and solid minerals",
                                        "Why sulfate is a key geometry for water and redox chemistry",
                                        "Cofactors: how minerals sit behind enzymes, charge transfer, and energy conversion",
                                        "Why mineral quality, form, and balance matter more than marketing words",
                                    ]}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <PillarCard
                                    type="matrix"
                                    title="Crystalline Fields — Geometry, Charge & Coherence"
                                    href="/science/crystalline-matrix"
                                    icon={<Hexagon className="w-6 h-6" />}
                                    bullets={[
                                        "How crystalline structures (ice, minerals, collagen, fascia) guide charge flow",
                                        "The idea of the body as liquid crystal + ionic conductor",
                                        "Bioelectric patterns, membrane potentials, and field coherence",
                                        "Sacred geometry as a language for repeating natural patterns (not as dogma)",
                                    ]}
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 4: Choose Your Learning Journey */}
                {/* ============================================ */}
                <section id="journey" className="section py-24 relative z-10">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                Choose How Deep You Want to Go
                            </h2>
                            <p className="text-lg text-white/60">
                                Whether you're just curious or love technical papers, the Science Library is designed in layers. Start where you feel comfortable and go as deep as you like.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Beginner / Curious Explorer */}
                            <motion.div
                                className="group relative p-8 rounded-2xl border border-white/10 bg-[#0b1020]/50 backdrop-blur-sm cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -6, borderColor: "rgba(56, 255, 209, 0.3)" }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#38ffd1]/10 flex items-center justify-center mb-6">
                                    <Sparkles className="w-5 h-5 text-[#38ffd1]" />
                                </div>
                                <span className="text-xs font-bold tracking-widest uppercase text-[#38ffd1] mb-2 block">
                                    Beginner
                                </span>
                                <h3 className="text-xl font-display font-semibold text-white mb-3">Curious Explorer</h3>
                                <p className="text-white/50 text-sm italic mb-6">"Explain it to me like I'm new to this."</p>
                                <ul className="space-y-2 text-sm text-white/60 mb-6">
                                    <li><Link href="/science/water-basics" className="hover:text-[#38ffd1] transition-colors">→ Water Science – Basics</Link></li>
                                    <li><Link href="/science/mineral-basics" className="hover:text-[#38ffd1] transition-colors">→ Mineral Science – Basics</Link></li>
                                    <li><Link href="/science/crystalline-basics" className="hover:text-[#38ffd1] transition-colors">→ Crystalline Fields – Basics</Link></li>
                                </ul>
                                <p className="text-xs text-white/40">Simple metaphors, visuals, story-based explanations</p>
                            </motion.div>

                            {/* Deep Diver / Science Lover */}
                            <motion.div
                                className="group relative p-8 rounded-2xl border border-white/10 bg-[#0b1020]/50 backdrop-blur-sm cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                whileHover={{ y: -6, borderColor: "rgba(99, 180, 255, 0.3)" }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#63b4ff]/10 flex items-center justify-center mb-6">
                                    <Microscope className="w-5 h-5 text-[#63b4ff]" />
                                </div>
                                <span className="text-xs font-bold tracking-widest uppercase text-[#63b4ff] mb-2 block">
                                    Deep Diver
                                </span>
                                <h3 className="text-xl font-display font-semibold text-white mb-3">Science Lover</h3>
                                <p className="text-white/50 text-sm italic mb-6">"Show me the mechanisms and data."</p>
                                <ul className="space-y-2 text-sm text-white/60 mb-6">
                                    <li><Link href="/science/ez-water" className="hover:text-[#63b4ff] transition-colors">→ EZ Water &amp; structured domains</Link></li>
                                    <li><Link href="/science/ionic-colloidal" className="hover:text-[#63b4ff] transition-colors">→ Ionic vs. Colloidal vs. Solid</Link></li>
                                    <li><Link href="/science/proton-gradients" className="hover:text-[#63b4ff] transition-colors">→ Proton gradients &amp; energy transfer</Link></li>
                                    <li><Link href="/science/minerals-microbiome" className="hover:text-[#63b4ff] transition-colors">→ Minerals &amp; microbiome</Link></li>
                                </ul>
                                <p className="text-xs text-white/40">References to parameters, lab behavior, diagrams</p>
                            </motion.div>

                            {/* Practitioner / System Thinker */}
                            <motion.div
                                className="group relative p-8 rounded-2xl border border-white/10 bg-[#0b1020]/50 backdrop-blur-sm cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ y: -6, borderColor: "rgba(246, 213, 106, 0.3)" }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#f6d56a]/10 flex items-center justify-center mb-6">
                                    <Brain className="w-5 h-5 text-[#f6d56a]" />
                                </div>
                                <span className="text-xs font-bold tracking-widest uppercase text-[#f6d56a] mb-2 block">
                                    Practitioner
                                </span>
                                <h3 className="text-xl font-display font-semibold text-white mb-3">System Thinker</h3>
                                <p className="text-white/50 text-sm italic mb-6">"I want to see the big landscape."</p>
                                <ul className="space-y-2 text-sm text-white/60 mb-6">
                                    <li><Link href="/science/terrain-model" className="hover:text-[#f6d56a] transition-colors">→ Terrain Model overview</Link></li>
                                    <li><Link href="/science/sulfate-pathways" className="hover:text-[#f6d56a] transition-colors">→ Sulfate pathways in water, soil, body</Link></li>
                                    <li><Link href="/science/liquid-crystal" className="hover:text-[#f6d56a] transition-colors">→ Liquid crystal biology</Link></li>
                                </ul>
                                <p className="text-xs text-white/40">Maps, frameworks, relationship diagrams</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 5: Map of the Science Library */}
                {/* ============================================ */}
                <section id="map" className="section py-24 bg-gradient-to-b from-[#020617] to-[#05060b] border-t border-white/5">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                A Living Map of Water, Minerals &amp; Crystalline Fields
                            </h2>
                            <p className="text-lg text-white/60">
                                Each pillar has subtopics. They interlink. The library keeps expanding. Click any node to explore.
                            </p>
                        </motion.header>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <NeuralLibraryMap />
                        </motion.div>

                        <p className="text-center text-white/30 text-xs mt-8 font-mono">
                            The Andara Science Brain — Neural map of interconnected knowledge
                        </p>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 6: Applied Example — Sulfate Minerals in Water */}
                {/* ============================================ */}
                <section id="example" className="section py-24 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <motion.header
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                Applied Example: Sulfate Minerals in Water
                            </h2>
                            <p className="text-lg text-white/60 max-w-3xl mx-auto">
                                How do the principles from this library show up in real water conditioning? Here's a case study of sulfate-driven clarification.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {/* Mechanism 1: Flocculation */}
                            <motion.div
                                className="p-6 rounded-2xl border border-white/10 bg-[#0b1020]/50"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-[#1aa7ff]/15 flex items-center justify-center mb-4">
                                    <span className="text-[#1aa7ff] font-bold text-sm">1</span>
                                </div>
                                <h3 className="text-lg font-display font-semibold text-white mb-3">
                                    Sulfate-Driven Flocculation
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed">
                                    Sulfate ions (SO₄²⁻) carry a strong negative charge. When introduced to water containing suspended particles, they neutralize positive charges on colloids, causing tiny particles to clump together and settle — a process called <strong>flocculation</strong>.
                                </p>
                            </motion.div>

                            {/* Mechanism 2: Ionic Charge */}
                            <motion.div
                                className="p-6 rounded-2xl border border-white/10 bg-[#0b1020]/50"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-[#63b4ff]/15 flex items-center justify-center mb-4">
                                    <span className="text-[#63b4ff] font-bold text-sm">2</span>
                                </div>
                                <h3 className="text-lg font-display font-semibold text-white mb-3">
                                    Ionic Charge & Water Parameters
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed">
                                    Adding ionic minerals shifts water's <strong>conductivity</strong>, <strong>pH</strong>, and <strong>ORP</strong> (oxidation-reduction potential). These measurable parameters reflect how water's charge landscape changes — affecting both clarity and chemical reactivity.
                                </p>
                            </motion.div>

                            {/* Mechanism 3: Mineral Complexity */}
                            <motion.div
                                className="p-6 rounded-2xl border border-white/10 bg-[#0b1020]/50"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-[#f6d56a]/15 flex items-center justify-center mb-4">
                                    <span className="text-[#f6d56a] font-bold text-sm">3</span>
                                </div>
                                <h3 className="text-lg font-display font-semibold text-white mb-3">
                                    Mineral Complexity & Structure
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed">
                                    Natural mineral waters contain multiple ion species (Mg²⁺, Ca²⁺, SiO₄⁴⁻, etc.) that interact with each other and with water's hydrogen-bond network. This <strong>mineral complexity</strong> influences how water organizes at the molecular level.
                                </p>
                            </motion.div>
                        </div>

                        {/* Andara Context Box */}
                        <motion.div
                            className="p-8 rounded-2xl border border-white/5 bg-[#05060b]/50"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <Gem className="w-5 h-5 text-white/40" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-display font-semibold text-white mb-2">
                                        Andara Ionic as One Practical Example
                                    </h4>
                                    <p className="text-sm text-white/60 leading-relaxed">
                                        Andara Ionic is a sulfate-based ionic mineral solution used for <strong>water clarification and conditioning</strong>.
                                        Within the Science Library, it serves as a concrete example of the principles above — not as a product promotion,
                                        but as a way to illustrate how sulfate chemistry, ionic charge, and mineral profiles work together in practice.
                                    </p>
                                </div>
                            </div>

                            <div className="pl-14 text-sm text-white/50 space-y-2">
                                <p>Its sulfate concentrations overlap ranges found in:</p>
                                <ul className="ml-4 space-y-1">
                                    <li>• Natural mineral springs and volcanic aquifers</li>
                                    <li>• Classical water treatment processes</li>
                                    <li>• Biologically occurring sulfate levels in living systems</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 7: Reading Safety & Disclaimer */}
                {/* ============================================ */}
                <section id="disclaimer" className="section py-16 bg-[#05060b]/30 border-y border-white/5">
                    <div className="container px-4 max-w-3xl mx-auto">
                        <motion.div
                            className="flex flex-col md:flex-row items-start gap-6 p-8 rounded-2xl border border-white/10 bg-[#0b1020]/30"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                                <div className="relative">
                                    <BookOpen className="w-6 h-6 text-white/60" />
                                    <Shield className="w-4 h-4 text-white/40 absolute -bottom-1 -right-1" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-display font-semibold text-white mb-4">A Note on This Content</h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    The Science Library explores the physics, chemistry, and field behavior of water, minerals, and crystalline structures.
                                    It's designed for curiosity, learning, and deeper understanding — not as medical or diagnostic guidance.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 8: Next Steps & Featured Entries */}
                {/* ============================================ */}
                <section id="next" className="section py-24">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                Where to Go Next
                            </h2>
                        </motion.header>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    title: "Water Science",
                                    subtitle: "Phases, Structure & Activation",
                                    href: "/science/water-science",
                                    icon: <Droplets className="w-6 h-6" />,
                                    color: "#1aa7ff",
                                },
                                {
                                    title: "Mineral Science",
                                    subtitle: "Ionic vs. Colloidal vs. Solid",
                                    href: "/science/mineral-science",
                                    icon: <Gem className="w-6 h-6" />,
                                    color: "#63b4ff",
                                },
                                {
                                    title: "Crystalline Matrix",
                                    subtitle: "Geometry & Fields",
                                    href: "/science/crystalline-matrix",
                                    icon: <Hexagon className="w-6 h-6" />,
                                    color: "#f6d56a",
                                },
                                {
                                    title: "Terrain Model",
                                    subtitle: "The Body as Living Ecosystem",
                                    href: "/science/terrain-model",
                                    icon: <Brain className="w-6 h-6" />,
                                    color: "#38ffd1",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link href={item.href}>
                                        <motion.div
                                            className="group p-6 rounded-2xl border border-white/10 bg-[#0b1020]/50 h-full cursor-pointer"
                                            whileHover={{ y: -4, borderColor: `${item.color}40` }}
                                        >
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                                style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                            >
                                                {item.icon}
                                            </div>
                                            <h3 className="text-lg font-display font-semibold text-white mb-1">{item.title}</h3>
                                            <p className="text-sm text-white/50 mb-4">{item.subtitle}</p>
                                            <span
                                                className="text-sm font-semibold flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity"
                                                style={{ color: item.color }}
                                            >
                                                Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
