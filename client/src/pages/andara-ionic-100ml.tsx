import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import {
    ShoppingCart, Check, Droplets, Zap, Hexagon, FlaskConical,
    ArrowRight, ChevronDown, Package, Sparkles, BookOpen,
    Beaker, Gauge, Waves, Mountain, Atom, Calculator, FileText
} from "lucide-react";

// Section IDs for navigation
const SECTIONS = [
    { id: "hero", label: "Overview" },
    { id: "what", label: "What It Is" },
    { id: "benefits", label: "Benefits" },
    { id: "how-to-use", label: "How To Use" },
    { id: "pricing", label: "Pricing" },
    { id: "science", label: "Science" },
    { id: "faq", label: "FAQ" },
];

/**
 * FAQ Item Component
 */
function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-white/10">
            <button
                className="w-full py-5 flex items-center justify-between text-left"
                onClick={() => setOpen(!open)}
            >
                <span className="font-semibold text-white">{question}</span>
                <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pb-5 text-white/60 leading-relaxed"
                >
                    {answer}
                </motion.div>
            )}
        </div>
    );
}

/**
 * Andara Ionic 100ml Product Page
 * 
 * Flagship product page with 8 sections.
 * Water treatment framing, not health claims.
 */
export default function AndaraIonic100ml() {
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
                data-tree="mineral"
                style={{ backgroundColor: "#020617" }}
            >
                {/* Scroll Progress Bar */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1aa7ff] via-[#f6d56a] to-[#38ffd1] z-50 origin-left"
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
                                className={`text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${activeSection === id ? "text-[#f6d56a]" : "text-white/50"
                                    }`}
                            >
                                {label}
                            </span>
                            <span
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === id
                                        ? "bg-[#f6d56a] scale-125 shadow-[0_0_8px_rgba(246,213,106,0.5)]"
                                        : "bg-white/20 group-hover:bg-white/40"
                                    }`}
                            />
                        </button>
                    ))}
                </nav>

                {/* ============================================ */}
                {/* SECTION 1: HERO */}
                {/* ============================================ */}
                <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
                    {/* Background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a1628] to-[#020617]" />
                        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#1aa7ff]/5 blur-[150px]" />
                        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#f6d56a]/5 blur-[120px]" />
                    </div>

                    <div className="container relative z-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f6d56a]/10 border border-[#f6d56a]/20 text-[#f6d56a] mb-6">
                                <Package className="w-4 h-4" />
                                <span className="text-sm font-semibold tracking-wide">Product & Application</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white leading-[1.15] mb-6">
                                Andara Ionic 100 ml
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1aa7ff] to-[#38ffd1]">
                                    Primordial ionic sulfate minerals for crystal-clear, activated water.
                                </span>
                            </h1>

                            <p className="text-lg text-white/80 font-medium mb-4">
                                A few drops of Andara Ionic 100 ml turn ordinary water into a clarified, mineral-structured and electrically more coherent medium.
                            </p>

                            <p className="text-white/60 mb-6">
                                This volcanic-origin ionic sulfate mineral concentrate is designed to work in the 17–30 mg/L sulfate activation zone — where biology, lab tests and water treatment overlap.
                            </p>

                            <ul className="space-y-3 text-white/60 mb-8">
                                <li className="flex items-start gap-3">
                                    <Mountain className="w-5 h-5 text-[#f6d56a] mt-0.5 flex-shrink-0" />
                                    <span><strong className="text-white/80">Volcanic mineral origin</strong> — deep-crust minerals, not plants</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Droplets className="w-5 h-5 text-[#1aa7ff] mt-0.5 flex-shrink-0" />
                                    <span><strong className="text-white/80">Clarifies & structures water</strong> — flocculation, turbidity, structure</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Package className="w-5 h-5 text-[#38ffd1] mt-0.5 flex-shrink-0" />
                                    <span><strong className="text-white/80">Compact 100 ml format</strong> — for home, travel, first experiments</span>
                                </li>
                            </ul>

                            <div className="flex flex-wrap gap-4 mb-6">
                                <button className="px-8 py-4 bg-gradient-to-r from-[#f6d56a] to-[#e8b923] text-black font-bold rounded-lg hover:opacity-90 transition-all shadow-[0_0_30px_rgba(246,213,106,0.2)] flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    Order Andara Ionic 100 ml
                                </button>
                                <button
                                    onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                                    className="px-6 py-4 border border-white/20 text-white font-semibold rounded-lg hover:border-white/40 transition-all"
                                >
                                    View dilution & bundle savings
                                </button>
                            </div>

                            <Link href="/science-library">
                                <span className="text-sm text-[#1aa7ff] hover:text-[#38ffd1] transition-colors flex items-center gap-2">
                                    Learn how sulfate minerals structure water <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        </motion.div>

                        {/* Right: Product Visual */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.2 }}
                        >
                            <div className="relative max-w-md mx-auto">
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#1aa7ff]/20 to-[#f6d56a]/10 blur-[60px] rounded-full" />

                                {/* Product bottle representation */}
                                <div className="relative flex items-end justify-center gap-6 p-8">
                                    {/* Before glass */}
                                    <div className="w-20 h-28 rounded-lg bg-gradient-to-b from-white/10 to-white/5 border border-white/20 flex items-end justify-center p-2 relative">
                                        <div className="absolute inset-2 bg-white/5 rounded" />
                                        <span className="relative text-[10px] text-white/40">Before</span>
                                    </div>

                                    {/* Main bottle */}
                                    <div className="w-28 h-48 rounded-2xl bg-gradient-to-b from-[#1a2744] to-[#0a1628] border border-[#1aa7ff]/30 flex flex-col items-center justify-center relative shadow-2xl">
                                        <div className="absolute -top-2 w-8 h-4 bg-[#1a2744] rounded-t-lg border-t border-l border-r border-[#1aa7ff]/30" />
                                        <Droplets className="w-10 h-10 text-[#1aa7ff] mb-2" />
                                        <span className="text-xs font-bold text-white/80 tracking-wider">ANDARA</span>
                                        <span className="text-[10px] text-white/40">100 ml</span>
                                    </div>

                                    {/* After glass */}
                                    <div className="w-20 h-28 rounded-lg bg-gradient-to-b from-[#1aa7ff]/20 to-[#38ffd1]/10 border border-[#38ffd1]/30 flex items-end justify-center p-2 relative">
                                        <div className="absolute inset-2 bg-[#38ffd1]/5 rounded" />
                                        {/* Hexagonal pattern hint */}
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2">
                                            <Hexagon className="w-6 h-6 text-[#38ffd1]/30" />
                                        </div>
                                        <span className="relative text-[10px] text-[#38ffd1]/80">After</span>
                                    </div>
                                </div>

                                <p className="text-center text-white/40 text-sm mt-4">
                                    Portable volcanic ionic sulfate minerals to clarify & condition water
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 2: WHAT IT IS */}
                {/* ============================================ */}
                <section id="what" className="py-24 bg-[#05060b]/50 border-y border-white/5">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-6">
                                What exactly is Andara Ionic 100 ml?
                            </h2>
                            <p className="text-lg text-white/80 font-medium mb-4">
                                Andara Ionic 100 ml is a concentrated ionic sulfate mineral solution for water treatment and conditioning.
                            </p>
                            <p className="text-white/60">
                                Inspired by volcanic mineral waters, it's designed to sit in the 17–30 mg/L sulfate range, where water shows clearer, more coherent behaviour.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Card 1: Volcanic Mineral Signature */}
                            <motion.div
                                className="p-8 rounded-2xl border border-[#f6d56a]/20 bg-gradient-to-b from-[#f6d56a]/5 to-transparent"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#f6d56a]/15 flex items-center justify-center mb-6">
                                    <Mountain className="w-7 h-7 text-[#f6d56a]" />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-white mb-4">Volcanic Mineral Signature</h3>
                                <ul className="space-y-3 text-white/60">
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-[#f6d56a] mt-1 flex-shrink-0" />
                                        Volcanic-origin mineral complex
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-[#f6d56a] mt-1 flex-shrink-0" />
                                        Rich in ionic, sulfate-bound minerals
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-[#f6d56a] mt-1 flex-shrink-0" />
                                        Supports flocculation, turbidity reduction
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-[#f6d56a] mt-1 flex-shrink-0" />
                                        pH buffering, redox stabilisation
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Card 2: Water Treatment */}
                            <motion.div
                                className="p-8 rounded-2xl border border-[#1aa7ff]/20 bg-gradient-to-b from-[#1aa7ff]/5 to-transparent"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#1aa7ff]/15 flex items-center justify-center mb-6">
                                    <Droplets className="w-7 h-7 text-[#1aa7ff]" />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-white mb-4">Water Treatment · Not a Supplement</h3>
                                <p className="text-white/60 mb-4">
                                    Andara Ionic is presented as a water treatment and conditioning agent.
                                </p>
                                <ul className="space-y-3 text-white/60">
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-[#1aa7ff] mt-1 flex-shrink-0" />
                                        Not a supplement, not a medicine
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-[#1aa7ff] mt-1 flex-shrink-0" />
                                        Focus: water parameters — clarity, structure, mineral chemistry
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 3: BENEFITS */}
                {/* ============================================ */}
                <section id="benefits" className="py-24">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-6">
                                What Andara Ionic 100 ml does for your water
                            </h2>
                            <p className="text-lg text-white/80 font-medium mb-4">
                                In a few millilitres per liter, Andara Ionic 100 ml can visibly change how your water looks and behaves.
                            </p>
                            <p className="text-white/60">
                                It's subtle in amount, but powerful in charge, flocculation & structuring.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    icon: <Droplets className="w-8 h-8" />,
                                    title: "Clarification & Flocculation",
                                    desc: "Charged sulfate minerals cause tiny particles to cluster into flocs. Over time, flocs settle — water gets visibly clearer. Turbidity goes down.",
                                    color: "#1aa7ff",
                                },
                                {
                                    icon: <Gauge className="w-8 h-8" />,
                                    title: "Sulfate Activation Range",
                                    desc: "Around 17–30 mg/L sulfate, water repeatedly shifts to a more ordered state. Andara 100 ml is designed to hit this zone with normal dosing.",
                                    color: "#f6d56a",
                                },
                                {
                                    icon: <Hexagon className="w-8 h-8" />,
                                    title: "Structured Interfaces",
                                    desc: "Sulfate charge supports stable hydration layers at interfaces. These zones interact differently with light, flow and charge — EZ-like phenomena.",
                                    color: "#38ffd1",
                                },
                            ].map((benefit, i) => (
                                <motion.div
                                    key={benefit.title}
                                    className="p-8 rounded-2xl border border-white/10 bg-[#0b1020]/50 text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div
                                        className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                                        style={{ backgroundColor: `${benefit.color}15`, color: benefit.color }}
                                    >
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-lg font-display font-semibold text-white mb-4">{benefit.title}</h3>
                                    <p className="text-sm text-white/60 leading-relaxed">{benefit.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 4: HOW TO USE */}
                {/* ============================================ */}
                <section id="how-to-use" className="py-24 bg-[#05060b]/50 border-y border-white/5">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-6">
                                How to use Andara Ionic 100 ml
                            </h2>
                            <p className="text-white/60">
                                Simple, drop-based dosing aligned with the Andara activation range.
                            </p>
                        </motion.header>

                        <div className="max-w-3xl mx-auto space-y-6">
                            {[
                                {
                                    num: "1",
                                    title: "Start with clean, filtered water",
                                    desc: "Use water already filtered (carbon, sediment, RO). The better the starting point, the clearer the visual change.",
                                },
                                {
                                    num: "2",
                                    title: "Dose around 1 ml per liter",
                                    desc: "This gives ~17–18 mg/L sulfate — placing you inside the activation zone found across biology, lab tests and water treatment.",
                                },
                                {
                                    num: "3",
                                    title: "Mix, vortex or oxygenate",
                                    desc: "Stir, shake, vortex — distribute minerals, encourage flocculation/structuring. Advanced setups can add vortex devices, magnets, special glassware.",
                                },
                                {
                                    num: "4",
                                    title: "Allow settling and observe",
                                    desc: "Let water rest. Flocs can form and sink. Clarity and mouthfeel can change. With simple tools (pH, TDS, EC, ORP, turbidity), you can measure before/after.",
                                },
                            ].map((step, i) => (
                                <motion.div
                                    key={step.num}
                                    className="flex gap-6 p-6 rounded-2xl border border-white/10 bg-[#0b1020]/30"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#f6d56a]/15 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl font-bold text-[#f6d56a]">{step.num}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-display font-semibold text-white mb-2">{step.title}</h4>
                                        <p className="text-white/60">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="mt-12 p-6 rounded-2xl border border-white/10 bg-[#0b1020]/30 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-sm text-white/50 text-center">
                                <strong className="text-white/70">Note:</strong> All usage is framed in water chemistry and physics. Andara Ionic is not a supplement and not for medical use.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 5: PRICING */}
                {/* ============================================ */}
                <section id="pricing" className="py-24">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-6">
                                Choose your Andara Ionic 100 ml pack
                            </h2>
                            <p className="text-lg text-white/80 font-medium mb-4">
                                Transparent pricing, clear savings — always showing effective price per liter.
                            </p>
                            <p className="text-white/60">
                                Same formula, different formats for different user types: single user, family, practitioner.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {/* Single */}
                            <motion.div
                                className="p-6 rounded-2xl border border-white/10 bg-[#0b1020]/50"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4 }}
                            >
                                <h4 className="text-lg font-display font-semibold text-white mb-1">Single Drop</h4>
                                <p className="text-sm text-white/50 mb-4">1 × 100 ml bottle</p>

                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-white">€19,90</span>
                                </div>

                                <div className="text-sm text-white/60 mb-4">~€199/L</div>

                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-start gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-[#38ffd1] mt-0.5 flex-shrink-0" />
                                        Perfect for testing
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-[#38ffd1] mt-0.5 flex-shrink-0" />
                                        Travel-friendly format
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-[#38ffd1] mt-0.5 flex-shrink-0" />
                                        First experiment
                                    </li>
                                </ul>

                                <button className="w-full px-4 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all">
                                    Order Single
                                </button>
                            </motion.div>

                            {/* Quad Pack - Featured */}
                            <motion.div
                                className="p-6 rounded-2xl border border-[#f6d56a]/40 bg-gradient-to-b from-[#f6d56a]/10 to-transparent relative"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="text-xs font-bold text-[#f6d56a] tracking-widest uppercase mb-4">Most Popular</div>
                                <h4 className="text-lg font-display font-semibold text-white mb-1">Quad Pack</h4>
                                <p className="text-sm text-white/50 mb-4">4 × 100 ml (3 + 1 free)</p>

                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-white">€59,70</span>
                                    <span className="text-sm text-white/40 ml-2">for 400 ml</span>
                                </div>

                                <div className="flex items-center gap-3 mb-4 text-sm">
                                    <span className="text-white/60">~€149/L</span>
                                    <span className="px-2 py-0.5 rounded bg-[#38ffd1]/20 text-[#38ffd1] text-xs font-bold">Save 25%</span>
                                </div>

                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-start gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-[#38ffd1] mt-0.5 flex-shrink-0" />
                                        Families & shared households
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-[#38ffd1] mt-0.5 flex-shrink-0" />
                                        Deeper testing
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-[#38ffd1] mt-0.5 flex-shrink-0" />
                                        Best value entry
                                    </li>
                                </ul>

                                <button className="w-full px-4 py-3 bg-gradient-to-r from-[#f6d56a] to-[#e8b923] text-black font-bold rounded-lg hover:opacity-90 transition-all">
                                    Order Quad Pack
                                </button>
                            </motion.div>

                            {/* Infinity Pack */}
                            <motion.div
                                className="p-6 rounded-2xl border border-white/10 bg-[#0b1020]/50"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ y: -4 }}
                            >
                                <h4 className="text-lg font-display font-semibold text-white mb-1">Infinity Pack</h4>
                                <p className="text-sm text-white/50 mb-4">8 × 100 ml (6 + 2 free)</p>

                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-white">€119,40</span>
                                    <span className="text-sm text-white/40 ml-2">for 800 ml</span>
                                </div>

                                <div className="flex items-center gap-3 mb-4 text-sm">
                                    <span className="text-white/60">~€149/L</span>
                                    <span className="px-2 py-0.5 rounded bg-[#38ffd1]/20 text-[#38ffd1] text-xs font-bold">Save 25%</span>
                                </div>

                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-start gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-[#38ffd1] mt-0.5 flex-shrink-0" />
                                        Practitioners & retreats
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-[#38ffd1] mt-0.5 flex-shrink-0" />
                                        Labs & long-term use
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-[#38ffd1] mt-0.5 flex-shrink-0" />
                                        Community sharing
                                    </li>
                                </ul>

                                <button className="w-full px-4 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all">
                                    Order Infinity Pack
                                </button>
                            </motion.div>
                        </div>

                        <motion.p
                            className="text-center text-white/40 text-sm mt-8 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            Per-liter pricing shown for transparency — helping you understand value difference between single and bundles.
                        </motion.p>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 6: SCIENCE SNIPPET */}
                {/* ============================================ */}
                <section id="science" className="py-24 bg-[#05060b]/50 border-y border-white/5">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-6">
                                Why sulfate-based ionic minerals matter for water
                            </h2>
                            <p className="text-lg text-white/80 font-medium mb-4">
                                Andara Ionic sits at the intersection of mineral science, structured water and bioelectric charge.
                            </p>
                            <p className="text-white/60">
                                The Science Library lets you go as deep as you wish — from school-level explanation to crystalline geometry.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {[
                                {
                                    icon: <Waves className="w-7 h-7" />,
                                    title: "Water Science",
                                    desc: "Phases of water, EZ water, pH, ORP — how ionic minerals influence charge separation, clustering, turbidity.",
                                    link: "/science/water-science",
                                    color: "#1aa7ff",
                                },
                                {
                                    icon: <Mountain className="w-7 h-7" />,
                                    title: "Mineral Science",
                                    desc: "Ionic vs colloidal vs solid minerals, sulfate chemistry, volcanic mineral complexes.",
                                    link: "/science/mineral-sources",
                                    color: "#f6d56a",
                                },
                                {
                                    icon: <Hexagon className="w-7 h-7" />,
                                    title: "Crystalline & Geometry",
                                    desc: "Tetrahedral sulfate geometry, hexagonal water, triangular harmonics.",
                                    link: "/science/crystalline-matrix",
                                    color: "#38ffd1",
                                },
                            ].map((card, i) => (
                                <Link key={card.title} href={card.link}>
                                    <motion.div
                                        className="p-6 rounded-2xl border border-white/10 bg-[#0b1020]/30 cursor-pointer h-full"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -4, borderColor: `${card.color}40` }}
                                    >
                                        <div
                                            className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center"
                                            style={{ backgroundColor: `${card.color}15`, color: card.color }}
                                        >
                                            {card.icon}
                                        </div>
                                        <h4 className="text-lg font-display font-semibold text-white mb-3">{card.title}</h4>
                                        <p className="text-sm text-white/60 mb-4">{card.desc}</p>
                                        <span className="text-sm font-medium flex items-center gap-2" style={{ color: card.color }}>
                                            Enter {card.title} <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 7: FAQ */}
                {/* ============================================ */}
                <section id="faq" className="py-24">
                    <div className="container px-4 max-w-3xl mx-auto">
                        <motion.header
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
                                Frequently Asked Questions
                            </h2>
                        </motion.header>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <FAQItem
                                question="Is Andara Ionic 100 ml a supplement or medicine?"
                                answer="No. Andara Ionic is a water treatment and conditioning agent. It is not meant to diagnose, treat, cure, or prevent any disease. All usage is framed within water chemistry and physics."
                            />
                            <FAQItem
                                question="How much do I add per liter?"
                                answer="Approximately 1 ml per liter gives you ~17–18 mg/L sulfate — placing you inside the activation zone. Use the Andara Dilution Calculator for precise measurements based on your water source."
                            />
                            <FAQItem
                                question="Can I see the effects without lab tools?"
                                answer="Yes. Many users observe visible flocs forming and settling, and increased water clarity. With basic meters (pH, TDS, EC, ORP), you can measure additional parameters."
                            />
                            <FAQItem
                                question="Can I combine it with structured-water devices?"
                                answer="Yes. Many combine Andara Ionic with vortexers, magnets, and special glass. Andara provides the ionic sulfate charge matrix — devices provide geometry and flow patterns."
                            />
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 8: NEURAL SCIENCE FOOTER */}
                {/* ============================================ */}
                <section className="py-16 bg-[#05060b]/80 border-t border-white/5">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-display text-white mb-3">
                                Keep exploring Andara Ionic
                            </h3>
                            <p className="text-white/60 text-sm">
                                Every Andara page connects back into a living Science Library.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-sm">
                            <div>
                                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                    <Waves className="w-4 h-4 text-[#1aa7ff]" />
                                    Water Science
                                </h4>
                                <ul className="space-y-2 text-white/50">
                                    <li><Link href="/science/water-science"><span className="hover:text-white/70 transition-colors cursor-pointer">Structured Water Basics</span></Link></li>
                                    <li><Link href="/science/ez-water"><span className="hover:text-white/70 transition-colors cursor-pointer">EZ Water & Charge</span></Link></li>
                                    <li><Link href="/science/water"><span className="hover:text-white/70 transition-colors cursor-pointer">pH · ORP · EC</span></Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                    <Hexagon className="w-4 h-4 text-[#38ffd1]" />
                                    Mineral & Crystalline
                                </h4>
                                <ul className="space-y-2 text-white/50">
                                    <li><Link href="/science/mineral-sources"><span className="hover:text-white/70 transition-colors cursor-pointer">Sulfate Chemistry</span></Link></li>
                                    <li><Link href="/science/crystalline-matrix"><span className="hover:text-white/70 transition-colors cursor-pointer">Tetrahedral Matrix</span></Link></li>
                                    <li><Link href="/science/water-science"><span className="hover:text-white/70 transition-colors cursor-pointer">Hexagonal Water</span></Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-[#f6d56a]" />
                                    Bioelectric & DNA
                                </h4>
                                <ul className="space-y-2 text-white/50">
                                    <li><Link href="/science/bioelectricity"><span className="hover:text-white/70 transition-colors cursor-pointer">Cell Voltage</span></Link></li>
                                    <li><Link href="/science/minerals/dna-mineral-codes"><span className="hover:text-white/70 transition-colors cursor-pointer">DNA Structure</span></Link></li>
                                    <li><Link href="/science-library"><span className="hover:text-white/70 transition-colors cursor-pointer">Mineral Cofactors</span></Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                    <Calculator className="w-4 h-4 text-white/60" />
                                    Tools & Guides
                                </h4>
                                <ul className="space-y-2 text-white/50">
                                    <li><Link href="/tools/dilution-calculator"><span className="hover:text-white/70 transition-colors cursor-pointer">Dilution Calculator</span></Link></li>
                                    <li><Link href="/science/lab"><span className="hover:text-white/70 transition-colors cursor-pointer">Lab & Measurements</span></Link></li>
                                    <li><Link href="/how-andara-works"><span className="hover:text-white/70 transition-colors cursor-pointer">How It Works</span></Link></li>
                                </ul>
                            </div>
                        </div>

                        <motion.p
                            className="text-center text-white/30 text-xs mt-12"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            All science pages are educational & non-medical, focused on water, minerals, and fields.
                        </motion.p>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
