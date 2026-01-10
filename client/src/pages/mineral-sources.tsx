import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import {
    Waves, Leaf, Mountain, Sparkles, Gem, Droplets, Zap,
    FlaskConical, ArrowRight, Star, Hexagon, Layers
} from "lucide-react";
import { VideoBackground } from "@/components/SmartVideoEmbed";

// Section IDs for navigation
const SECTIONS = [
    { id: "intro", label: "Overview" },
    { id: "ocean", label: "Ocean" },
    { id: "plant", label: "Plant" },
    { id: "fulvic", label: "Fulvic" },
    { id: "salts", label: "Salts" },
    { id: "volcanic", label: "Volcanic" },
    { id: "compare", label: "Compare" },
];

// Star rating component
function StarRating({ rating, color }: { rating: number; color: string }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className="w-3 h-3"
                    style={{
                        color: i <= rating ? color : "rgba(255,255,255,0.1)",
                        fill: i <= rating ? color : "transparent"
                    }}
                />
            ))}
        </div>
    );
}

/**
 * Mineral Sources Comparison Page
 * 
 * Comparing Ocean, Plant, Fulvic, Salt & Mica/Volcanic mineral sources.
 * Educational content with visual infographic elements.
 */
export default function MineralSourcesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const [activeSection, setActiveSection] = useState("intro");

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
                {/* SECTION 0: INTRO - Five Faces of Earth */}
                {/* ============================================ */}
                <section id="intro" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
                    {/* Background */}
                    <div className="absolute inset-0">
                        <VideoBackground
                            videoId="mineral-cofactors-bg"
                            keywords={["minerals", "sources", "nature"]}
                            overlayOpacity={0.7}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#f6d56a]/5 blur-[150px]" />
                        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#1aa7ff]/5 blur-[120px]" />
                    </div>

                    <div className="container relative z-10 px-4 text-center max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f6d56a]/10 border border-[#f6d56a]/20 text-[#f6d56a] mb-8">
                                <Gem className="w-4 h-4" />
                                <span className="text-sm font-semibold tracking-wide">Mineral Science</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-[1.1] mb-8">
                                Five Mineral Gateways
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1aa7ff] via-[#f6d56a] to-[#38ffd1]">
                                    How Earth Feeds Water & Life
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                                All five are mineral expressions of the same planet — but each has a very different feeling, chemistry, and best use-case.
                            </p>

                            {/* Five Temple Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                                {[
                                    { icon: <Waves className="w-6 h-6" />, name: "Ocean", desc: "Liquid, flowing", color: "#1aa7ff" },
                                    { icon: <Leaf className="w-6 h-6" />, name: "Plant", desc: "Green, food-like", color: "#38ffd1" },
                                    { icon: <Mountain className="w-6 h-6" />, name: "Fulvic", desc: "Dark, alchemical", color: "#8b5a2b" },
                                    { icon: <Gem className="w-6 h-6" />, name: "Salts", desc: "Bright crystals", color: "#e8e4e0" },
                                    { icon: <Zap className="w-6 h-6" />, name: "Volcanic", desc: "Fire-born, ionic", color: "#f6d56a" },
                                ].map((temple, i) => (
                                    <motion.div
                                        key={temple.name}
                                        className="p-4 rounded-2xl border border-white/10 bg-[#0b1020]/50 text-center cursor-pointer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        whileHover={{ y: -4, borderColor: `${temple.color}40` }}
                                        onClick={() => document.getElementById(temple.name.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                                            style={{ backgroundColor: `${temple.color}15`, color: temple.color }}
                                        >
                                            {temple.icon}
                                        </div>
                                        <h3 className="text-sm font-bold text-white mb-1">{temple.name}</h3>
                                        <p className="text-xs text-white/50">{temple.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 1: OCEAN MINERALS */}
                {/* ============================================ */}
                <section id="ocean" className="py-24 relative">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <motion.div
                            className="p-10 rounded-3xl border border-[#1aa7ff]/20 bg-gradient-to-b from-[#1aa7ff]/5 to-transparent"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-[#1aa7ff]/15 flex items-center justify-center">
                                    <Waves className="w-8 h-8 text-[#1aa7ff]" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-[#1aa7ff] tracking-widest uppercase">Gateway 1</span>
                                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-white">Ocean Minerals</h2>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left: Feel & Description */}
                                <div>
                                    <div className="mb-6">
                                        <p className="text-sm text-[#1aa7ff]/80 italic mb-2">Feels like: Being held by the sea. Wide, soft, rhythmic.</p>
                                        <p className="text-sm text-white/50">Archetype: <strong className="text-white/70">The Mother Ocean</strong> — not too intense, always there, consistent.</p>
                                    </div>

                                    <p className="text-white/60 leading-relaxed mb-6">
                                        Deep ocean water microfiltered from specific zones. Main ions: sodium, chloride, magnesium, calcium, potassium, sulfate — plus 70–80 trace elements. Minerals dissolved as ionic salts in a ratio similar to human plasma.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/60">Spectrum breadth</span>
                                            <StarRating rating={4} color="#1aa7ff" />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/60">Water reactivity</span>
                                            <StarRating rating={2} color="#1aa7ff" />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/60">Sulfate dominance</span>
                                            <StarRating rating={2} color="#1aa7ff" />
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Strengths & Limitations */}
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-[#1aa7ff]/10">
                                        <h4 className="text-sm font-bold text-[#1aa7ff] mb-2">Strengths</h4>
                                        <ul className="text-sm text-white/60 space-y-1">
                                            <li>• Broad-spectrum trace-mineral profile</li>
                                            <li>• Marine ratios resemble blood plasma</li>
                                            <li>• Gentle mineral background field</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5">
                                        <h4 className="text-sm font-bold text-white/70 mb-2">Limitations</h4>
                                        <ul className="text-sm text-white/50 space-y-1">
                                            <li>• Na + Cl dominant — high salt to get traces</li>
                                            <li>• Weak flocculation/purification effect</li>
                                            <li>• Stable medium, not strong reactive purifier</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 2: PLANT & SEAWEED MINERALS */}
                {/* ============================================ */}
                <section id="plant" className="py-24 bg-[#05060b]/50 border-y border-white/5">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <motion.div
                            className="p-10 rounded-3xl border border-[#38ffd1]/20 bg-gradient-to-b from-[#38ffd1]/5 to-transparent"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-[#38ffd1]/15 flex items-center justify-center">
                                    <Leaf className="w-8 h-8 text-[#38ffd1]" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-[#38ffd1] tracking-widest uppercase">Gateway 2</span>
                                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-white">Plant & Seaweed Minerals</h2>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <div className="mb-6">
                                        <p className="text-sm text-[#38ffd1]/80 italic mb-2">Feels like: Garden, forest, tidepools.</p>
                                        <p className="text-sm text-white/50">Archetype: <strong className="text-white/70">The Herbalist</strong> — slow, wise, integrated with living systems.</p>
                                    </div>

                                    <p className="text-white/60 leading-relaxed mb-6">
                                        Kelp, seaweeds, red algae, chlorella, spirulina. Minerals bound to amino acids, polysaccharides, and plant pigments. Seaweeds: iodine, Mg, K. Red algae: Ca–Mg carbonate. Greens: K/Mg/Ca + antioxidants.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/60">Spectrum breadth</span>
                                            <StarRating rating={4} color="#38ffd1" />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/60">Phytonutrients</span>
                                            <StarRating rating={5} color="#38ffd1" />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/60">Water reactivity</span>
                                            <StarRating rating={1} color="#38ffd1" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-[#38ffd1]/10">
                                        <h4 className="text-sm font-bold text-[#38ffd1] mb-2">Strengths</h4>
                                        <ul className="text-sm text-white/60 space-y-1">
                                            <li>• Food-form — easy to integrate nutritionally</li>
                                            <li>• Minerals + phytonutrients together</li>
                                            <li>• Gentle daily background diversity</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5">
                                        <h4 className="text-sm font-bold text-white/70 mb-2">Limitations</h4>
                                        <ul className="text-sm text-white/50 space-y-1">
                                            <li>• Varies by species, region, season</li>
                                            <li>• Lower sulfate & iron than volcanic</li>
                                            <li>• Doesn't restructure water or flocculate</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 3: FULVIC & HUMIC MINERALS */}
                {/* ============================================ */}
                <section id="fulvic" className="py-24">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <motion.div
                            className="p-10 rounded-3xl border border-[#8b5a2b]/30 bg-gradient-to-b from-[#8b5a2b]/10 to-transparent"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-[#8b5a2b]/20 flex items-center justify-center">
                                    <Mountain className="w-8 h-8 text-[#c4915c]" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-[#c4915c] tracking-widest uppercase">Gateway 3</span>
                                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-white">Fulvic & Humic Minerals</h2>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <div className="mb-6">
                                        <p className="text-sm text-[#c4915c]/80 italic mb-2">Feels like: Dark soil in your hands, forest floor after rain.</p>
                                        <p className="text-sm text-white/50">Archetype: <strong className="text-white/70">The Alchemist</strong> — transforms death into new life.</p>
                                    </div>

                                    <p className="text-white/60 leading-relaxed mb-6">
                                        Decayed organic matter transformed over long time scales into humus, leonardite, shilajit. Fulvic & humic acids — vast mixtures of carbon-based fragments that chelate metals and carry minerals in organic-mineral matrices.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/60">Spectrum breadth</span>
                                            <StarRating rating={4} color="#c4915c" />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/60">Chelation & binding</span>
                                            <StarRating rating={5} color="#c4915c" />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/60">Source variability</span>
                                            <StarRating rating={5} color="#c4915c" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-[#8b5a2b]/15">
                                        <h4 className="text-sm font-bold text-[#c4915c] mb-2">Strengths</h4>
                                        <ul className="text-sm text-white/60 space-y-1">
                                            <li>• Broad spectrum + organic ligands</li>
                                            <li>• Strong metal binding & chelation</li>
                                            <li>• Carrier — keeps minerals mobile</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5">
                                        <h4 className="text-sm font-bold text-white/70 mb-2">Limitations</h4>
                                        <ul className="text-sm text-white/50 space-y-1">
                                            <li>• Extreme deposit-to-deposit variability</li>
                                            <li>• Requires careful sourcing & testing</li>
                                            <li>• Rare-earth elements often lower than volcanic</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 4: SEA SALTS */}
                {/* ============================================ */}
                <section id="salts" className="py-24 bg-[#05060b]/50 border-y border-white/5">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <motion.div
                            className="p-10 rounded-3xl border border-white/20 bg-gradient-to-b from-white/5 to-transparent"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <Gem className="w-8 h-8 text-white/80" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-white/60 tracking-widest uppercase">Gateway 4</span>
                                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-white">Sea Salts</h2>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <div className="mb-6">
                                        <p className="text-sm text-white/60 italic mb-2">Feels like: Sun, wind, salt on the skin.</p>
                                        <p className="text-sm text-white/50">Archetype: <strong className="text-white/70">The Crystal Worker</strong> — clear, sharp, structurally strong.</p>
                                    </div>

                                    <p className="text-white/60 leading-relaxed mb-6">
                                        Celtic ocean salts, Himalayan rock salts, evaporated brines. Sodium chloride is king — plus small amounts of Ca, Mg, K, sulfate, and traces of many elements. Pink and grey salts show surprisingly rich trace fingerprints.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/60">Spectrum breadth</span>
                                            <StarRating rating={2} color="#e8e4e0" />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/60">Sodium load</span>
                                            <StarRating rating={5} color="#e8e4e0" />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/60">Practical supplement</span>
                                            <StarRating rating={2} color="#e8e4e0" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-white/10">
                                        <h4 className="text-sm font-bold text-white/80 mb-2">Strengths</h4>
                                        <ul className="text-sm text-white/60 space-y-1">
                                            <li>• Simple electrolyte with trace support</li>
                                            <li>• Rich trace fingerprint in quality salts</li>
                                            <li>• Great for flavor & base electrolytes</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5">
                                        <h4 className="text-sm font-bold text-white/70 mb-2">Limitations</h4>
                                        <ul className="text-sm text-white/50 space-y-1">
                                            <li>• NaCl dominates — high salt for traces</li>
                                            <li>• More culinary than concentrated mineral source</li>
                                            <li>• Raises conductivity, limited structuring</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 5: VOLCANIC / MICA SULFATE */}
                {/* ============================================ */}
                <section id="volcanic" className="py-24">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <motion.div
                            className="p-10 rounded-3xl border border-[#f6d56a]/30 bg-gradient-to-b from-[#f6d56a]/10 to-transparent relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {/* Subtle glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f6d56a]/10 blur-[100px] rounded-full" />

                            <div className="relative">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-[#f6d56a]/15 flex items-center justify-center">
                                        <Zap className="w-8 h-8 text-[#f6d56a]" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-[#f6d56a] tracking-widest uppercase">Gateway 5</span>
                                        <h2 className="text-2xl md:text-3xl font-display font-semibold text-white">Volcanic Sulfate Minerals</h2>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <div className="mb-6">
                                            <p className="text-sm text-[#f6d56a]/80 italic mb-2">Feels like: Standing at the edge of a volcano-fed hot spring.</p>
                                            <p className="text-sm text-white/50">Archetype: <strong className="text-white/70">The Volcanic Architect</strong> — deep Earth intelligence shaping water and fields.</p>
                                        </div>

                                        <p className="text-white/60 leading-relaxed mb-6">
                                            Black mica (biotite) and deep-crust minerals processed into sulfated ionic concentrate. High sulfate (SO₄²⁻), significant multivalent metals (Fe³⁺, Al³⁺, Mg²⁺), rare earth traces. Fully water-soluble ionic form.
                                        </p>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-white/60">Spectrum + rare elements</span>
                                                <StarRating rating={5} color="#f6d56a" />
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-white/60">Water reactivity & structuring</span>
                                                <StarRating rating={5} color="#f6d56a" />
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-white/60">Sulfate dominance</span>
                                                <StarRating rating={5} color="#f6d56a" />
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-white/60">Sodium load</span>
                                                <StarRating rating={1} color="#f6d56a" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl bg-[#f6d56a]/15">
                                            <h4 className="text-sm font-bold text-[#f6d56a] mb-2">Strengths</h4>
                                            <ul className="text-sm text-white/60 space-y-1">
                                                <li>• High reactivity — clarification, charge reorganization</li>
                                                <li>• Diverse profile including rare-earth traces</li>
                                                <li>• Sulfate aligns with biological structuring roles</li>
                                                <li>• Small dose / big effect in water</li>
                                            </ul>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5">
                                            <h4 className="text-sm font-bold text-white/70 mb-2">Considerations</h4>
                                            <ul className="text-sm text-white/50 space-y-1">
                                                <li>• Powerful chemistry — careful dosing needed</li>
                                                <li>• Precision tool, not "soft" food-like source</li>
                                                <li>• Requires quality control & transparency</li>
                                            </ul>
                                        </div>

                                        {/* Water effects */}
                                        <div className="p-4 rounded-xl border border-[#f6d56a]/20 bg-[#f6d56a]/5">
                                            <h4 className="text-sm font-bold text-[#f6d56a] mb-3">Water Effects</h4>
                                            <div className="flex gap-4">
                                                <div className="flex-1 text-center">
                                                    <Droplets className="w-5 h-5 text-[#1aa7ff] mx-auto mb-1" />
                                                    <span className="text-xs text-white/60">Clarification</span>
                                                </div>
                                                <div className="flex-1 text-center">
                                                    <Hexagon className="w-5 h-5 text-[#38ffd1] mx-auto mb-1" />
                                                    <span className="text-xs text-white/60">Structuring</span>
                                                </div>
                                                <div className="flex-1 text-center">
                                                    <Layers className="w-5 h-5 text-[#f6d56a] mx-auto mb-1" />
                                                    <span className="text-xs text-white/60">Rare-earth</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* SECTION 6: COMPARATIVE OVERVIEW */}
                {/* ============================================ */}
                <section id="compare" className="py-24 bg-gradient-to-b from-[#020617] to-[#05060b]">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                Comparative Overview
                            </h2>
                            <p className="text-lg text-white/60">
                                Each gateway serves a different purpose. Here's how they compare.
                            </p>
                        </motion.header>

                        {/* Comparison Table */}
                        <motion.div
                            className="overflow-x-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <table className="w-full min-w-[700px] text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-4 px-4 text-white/50 font-medium">Source</th>
                                        <th className="text-center py-4 px-2 text-white/50 font-medium">Spectrum</th>
                                        <th className="text-center py-4 px-2 text-white/50 font-medium">Water Effect</th>
                                        <th className="text-center py-4 px-2 text-white/50 font-medium">Sulfate</th>
                                        <th className="text-center py-4 px-2 text-white/50 font-medium">Sodium</th>
                                        <th className="text-left py-4 px-4 text-white/50 font-medium">Best For</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: "Ocean", color: "#1aa7ff", spectrum: 4, water: 2, sulfate: 2, sodium: 4, best: "Broad, gentle electrolyte" },
                                        { name: "Plant", color: "#38ffd1", spectrum: 4, water: 1, sulfate: 1, sodium: 1, best: "Food-form nutrition" },
                                        { name: "Fulvic", color: "#c4915c", spectrum: 4, water: 2, sulfate: 2, sodium: 1, best: "Chelation & transport" },
                                        { name: "Salts", color: "#e8e4e0", spectrum: 2, water: 2, sulfate: 2, sodium: 5, best: "Flavor & basic electrolytes" },
                                        { name: "Volcanic", color: "#f6d56a", spectrum: 5, water: 5, sulfate: 5, sodium: 1, best: "Water clarification & structuring" },
                                    ].map((row) => (
                                        <tr key={row.name} className="border-b border-white/5">
                                            <td className="py-4 px-4">
                                                <span className="font-semibold text-white flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                                                    {row.name}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 text-center"><StarRating rating={row.spectrum} color={row.color} /></td>
                                            <td className="py-4 px-2 text-center"><StarRating rating={row.water} color={row.color} /></td>
                                            <td className="py-4 px-2 text-center"><StarRating rating={row.sulfate} color={row.color} /></td>
                                            <td className="py-4 px-2 text-center"><StarRating rating={row.sodium} color={row.color} /></td>
                                            <td className="py-4 px-4 text-white/60">{row.best}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>

                        {/* Summary Quote */}
                        <motion.div
                            className="mt-16 text-center max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-lg text-white/70 italic leading-relaxed mb-8">
                                "Organic matter is just mineral matter rearranged by life. To understand water and biology, you must first understand the minerals themselves — and how each source shapes the field."
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/science-library">
                                    <button className="px-8 py-4 bg-gradient-to-r from-[#f6d56a] to-[#e8b923] text-black font-bold rounded-lg hover:opacity-90 transition-all">
                                        Back to Science Library
                                    </button>
                                </Link>
                                <Link href="/how-andara-works">
                                    <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:border-white/40 transition-all flex items-center gap-2">
                                        How Andara Works <ArrowRight className="w-4 h-4" />
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
