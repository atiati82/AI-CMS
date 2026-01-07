import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { StackedCard } from "@/components/visuals/StackedCard";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { motion } from "framer-motion";
import {
    Atom,
    Layers,
    Cpu,
    Hexagon,
    Droplets,
    Activity,
    Zap,
    Mountain,
    ShieldAlert,
    HelpCircle,
    ArrowRight,
    Scale,
    FlaskConical,
    Waves,
    Sparkles,
    Play
} from "lucide-react";
// import StandardCard from "@/components/visuals/StandardCard";

export default function MineralsPage() {
    // Redesigned Layers Data
    const layers = [
        {
            title: "The Carrier Layer",
            subtitle: "Conductivity & Flow",
            desc: "Minerals are the electrical nervous system of water. Without ions, water is an insulator. With them, it becomes a superconductor of biological signals.",
            link: "/conductivity-tds-water",
            registryId: "mineral-job-transport",
            color: "blue",
            icon: Zap,
            stats: [{ label: "Role", value: "Signal Transport" }, { label: "State", value: "Ionic Fluid" }]
        },
        {
            title: "The Interface Layer",
            subtitle: "Structure & Exclusion",
            desc: "Where water meets mineral, structure is born. Hydrophilic mineral surfaces act as templates, organizing bulk water into ordered, living liquid crystals.",
            link: "/hydration-layers-interfaces",
            registryId: "mineral-water-interface",
            color: "cyan",
            icon: Layers,
            stats: [{ label: "Zone", value: "Exclusion Zone (EZ)" }, { label: "Effect", value: "Charge Separation" }]
        },
        {
            title: "The Cofactor Layer",
            subtitle: "Enzymatic Keys",
            desc: "Biology is a lock; minerals are the keys. Every major enzymatic process requires specific mineral geometries to unlock metabolic potential.",
            link: "/mineral-cofactors-enzymes",
            registryId: "mineral-bioelectric-context",
            color: "purple",
            icon: Cpu,
            stats: [{ label: "Target", value: "Metabo-Regulation" }, { label: "Action", value: "Catalysis" }]
        },
        {
            title: "The Geometry Layer",
            subtitle: "Sulfate & Lattice",
            desc: "The shape of the ion determines the shape of the water. Tetrahedral sulfates create stable scaffolds protecting the cell's energetic integrity.",
            link: "/tetrahedral-sulfate-geometry",
            registryId: "geo-tetrahedral",
            color: "yellow",
            icon: Hexagon,
            stats: [{ label: "Shape", value: "Tetrahedral" }, { label: "Function", value: "Entropy Management" }]
        }
    ];

    return (
        <StandardPageLayout
            title={<>The Architecture of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">Biological Intelligence</span></>}
            subtitle="Minerals are not supplements. They are the ancient, conductive codes that program water to sustain life."
            heroVariant="indigo"
            heroIcon={Sparkles}
            badges={[{ text: "Core Science Pillar", icon: Atom }, { text: "Research Hub", icon: FlaskConical }]}
            // Fallback, will leverage registry if StandardPageLayout handles it well, else specific path
            // Explicitly requesting deep ocean texture
            seoTitle="Minerals: The Bioelectric Interpreters | Andara Science"
            seoDescription="Redefining minerals as conductive keys. Explore the 4 layers of mineral function: Carrier, Interface, Cofactor, and Geometry."
        >
            {/* MANIFESTO SECTION */}
            <section className="relative z-10 py-12 md:py-24">
                <BackgroundLayer
                    registryId="mineral-ocean"
                    // Replaced path with valid registry ID
                    opacity={3} // Adjusted from 0.03 (which was for 0-1 scale) to integer scale used in BL component or keep as is if component handles it. Checking BL: uses opacity/100. So 0.03 -> 3.
                    // variant="orb" - Removed unknown prop
                    overlayGradient="none" // Mapped from 'blendMode="overlay"' roughly, or just use overlayGradient
                // blendMode prop is not on BL props interface shown in file view. It uses `overlayGradient` or internal registry blend mode.
                />
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-xs font-bold text-indigo-400 tracking-[0.2em] uppercase mb-6">
                            Beyond Nutrition
                        </h2>
                        <p className="text-2xl md:text-4xl md:leading-relaxed font-display text-white/90 mb-8">
                            "We often think of minerals as solid rocks. But in the body, <span className="text-cyan-300 italic">they are light</span>."
                        </p>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            When a mineral dissolves, it liberates its electrons and becomes an <strong>ion</strong>. This ion is a packet of energy, a specific frequency that allows the body's water to conduct information. We don't just 'eat' minerals; we download their codes.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* INTERACTIVE LAYERS - Redesigned as cards for clarity first, could be carousel later */}
            <section className="relative z-10 w-full pb-24 md:pb-32">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/5 pb-8">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-2">The 4 Layers of Function</h2>
                            <p className="text-white/50">The Andara Blueprint for Mineral Science.</p>
                        </div>
                        <div className="hidden md:block">
                            <span className="text-xs text-white/30 uppercase tracking-widest">• Scroll to Explore •</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-12">
                        {layers.map((layer, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                                className={`flex flex-col md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16 items-center`}
                            >
                                {/* Visual Side */}
                                <div className="w-full md:w-1/2 relative group">
                                    <div className={`absolute -inset-4 bg-${layer.color}-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-1000`} />
                                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0b1020]">
                                        <BackgroundLayer registryId={layer.registryId} opacity={60} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />

                                        {/* Floating Badge */}
                                        <div className="absolute top-4 left-4">
                                            <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                                                <layer.icon className={`w-5 h-5 text-${layer.color}-400`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-1/2 text-left space-y-6">
                                    <div>
                                        <h3 className={`text-sm font-bold text-${layer.color}-400 uppercase tracking-widest mb-2`}>Layer 0{i + 1}</h3>
                                        <h2 className="text-3xl md:text-4xl font-display text-white mb-4">{layer.title}</h2>
                                        <h4 className="text-xl text-white/50 font-light mb-6">{layer.subtitle}</h4>
                                    </div>
                                    <p className="text-white/70 leading-relaxed text-lg">
                                        {layer.desc}
                                    </p>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
                                        {layer.stats.map((stat, idx) => (
                                            <div key={idx}>
                                                <div className="text-xs text-white/30 uppercase tracking-widest mb-1">{stat.label}</div>
                                                <div className="text-white font-mono">{stat.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <Link href={layer.link}>
                                        <div className="inline-flex items-center gap-2 text-white hover:text-cyan-300 transition-colors group cursor-pointer text-sm font-bold uppercase tracking-widest mt-4">
                                            Deep Dive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SOURCE MATRIX - High Fidelity Grid */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative overflow-hidden">
                <BackgroundLayer registryId="mineral-ocean" opacity={2} />
                <div className="container px-4 max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display text-white mb-4">Origin Defines Frequency</h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Not all minerals are created equal. The source determines the complexity, assimilation, and energetic signature.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {/* Card Design Idea: Vertical thin cards that expand on hover? Keeping it simple grid for now but polished */}
                        {[
                            { title: "Ocean", icon: Waves, color: "blue", desc: "Full Spectrum", sub: "Primordial Balance" },
                            { title: "Plant", icon: Droplets, color: "green", desc: "Bio-Chelated", sub: "Specific Uptake" },
                            { title: "Fulvic", icon: Layers, color: "amber", desc: "Transporter", sub: "Humic Complex" },
                            { title: "Salt", icon: FlaskConical, color: "white", desc: "Crystalline", sub: "Solid State" },
                            { title: "Volcanic", icon: Mountain, color: "red", desc: "Sulfate Rich", sub: "Geothermal" },
                        ].map((source, i) => (
                            <div key={i} className="group relative p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 hover:bg-white/10">
                                <div className={`w-12 h-12 rounded-full bg-${source.color}-500/10 flex items-center justify-center mb-6 border border-${source.color}-500/20 group-hover:scale-110 transition-transform`}>
                                    <source.icon className={`w-5 h-5 text-${source.color}-400`} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{source.title}</h3>
                                <div className="h-0.5 w-6 bg-white/10 mb-3 group-hover:w-full transition-all duration-500" />
                                <p className="text-xs font-bold text-white/80 uppercase tracking-wide mb-1">{source.desc}</p>
                                <p className="text-xs text-white/50">{source.sub}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/trust/comparison-other-mineral-products">
                            <span className="inline-block px-8 py-3 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 text-white transition-all cursor-pointer">
                                Compare All Sources
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FORM FACTOR & SAFETY - Two Columns */}
            <section className="py-24 bg-[#020617]">
                <div className="container px-4 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

                        {/* LEFT: IONIC vs COLLOIDAL */}
                        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/30 to-[#020617] border border-indigo-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Atom className="w-32 h-32 text-indigo-500" />
                            </div>

                            <h3 className="text-indigo-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4" /> Form Factor
                            </h3>
                            <h2 className="text-3xl font-display text-white mb-6">Ionic vs. Colloidal</h2>
                            <p className="text-white/70 mb-8 leading-relaxed">
                                Size matters physically, but state matters electrically. An ion is dissolved (invisible). A colloid is suspended (visible). Only ions can pass freely through cellular ion channels.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                    <span className="text-white/90"><strong>Ionic:</strong> Angstrom size, fully dissolved, electric.</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-3 h-3 rounded-full border border-white/40 bg-white/10" />
                                    <span className="text-white/60"><strong>Colloidal:</strong> Micron size, particulate, inert.</span>
                                </div>
                            </div>

                            <Link href="/science/ionic-vs-colloidal-vs-solid">
                                <span className="text-indigo-300 border-b border-indigo-500/50 hover:text-white hover:border-white transition-colors pb-1">Read the full breakdown &rarr;</span>
                            </Link>
                        </div>

                        {/* RIGHT: SAFETY */}
                        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-red-950/20 to-[#020617] border border-red-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <ShieldAlert className="w-32 h-32 text-red-500" />
                            </div>

                            <h3 className="text-red-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Scale className="w-4 h-4" /> Integrity
                            </h3>
                            <h2 className="text-3xl font-display text-white mb-6">Boundaries & Toxicity</h2>
                            <p className="text-white/70 mb-8 leading-relaxed">
                                Power requires boundaries. We extensively map the difference between nutrition and toxicity, especially regarding Aluminum, Lead, and heavy metals.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <Link href="/trust/faq-safety-quality">
                                    <div className="p-4 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-all cursor-pointer">
                                        <h4 className="font-bold text-red-100 mb-1 text-sm">Toxicity Map</h4>
                                        <p className="text-xs text-red-200/50">Where help becomes harm.</p>
                                    </div>
                                </Link>
                                <Link href="/science/mineral-science-blueprint">
                                    <div className="p-4 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-all cursor-pointer">
                                        <h4 className="font-bold text-red-100 mb-1 text-sm">Aluminum</h4>
                                        <p className="text-xs text-red-200/50">The great misunderstanding.</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
