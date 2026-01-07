import React, { useState } from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
    Search, Filter, BookOpen, Droplets, Zap, Microscope, Hexagon,
    Mountain, Activity, Dna, FlaskConical, Atom, Globe, ArrowRight
} from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA: Library Index ---
const LIBRARY_ITEMS = [
    {
        id: "water-science",
        title: "Water Science",
        desc: "The architecture of life. Phases, memory, and the 'Fourth Phase' (EZ).",
        icon: Droplets,
        category: "Foundations",
        route: "/science/water-science",
        status: "Live"
    },
    {
        id: "mineral-science",
        title: "Mineral Science",
        desc: "Ionic vs Colloidal. Why sulfate minerals are the conductivity key.",
        icon: Microscope,
        category: "Foundations",
        route: "/science/mineral-science",
        status: "Live"
    },
    {
        id: "bioelectricity",
        title: "Bioelectricity",
        desc: "Voltage gradients, proton motive force, and the body electric.",
        icon: Zap,
        category: "Foundations",
        route: "/bioelectricity",
        status: "Live"
    },
    {
        id: "crystalline-matrix",
        title: "Crystalline Matrix",
        desc: "Light, Geometry, and the liquid crystal nature of biological water.",
        icon: Hexagon,
        category: "Advanced",
        route: "/crystalline-matrix-light-geometry",
        status: "Live"
    },
    {
        id: "sulfate-pathways",
        title: "Sulfate Pathways",
        desc: "The terrain model. Sulfur, Sulfate, and detoxification pathways.",
        icon: FlaskConical,
        category: "Biology",
        route: "/sulfate-pathways-terrain-model",
        status: "Live"
    },
    {
        id: "liquid-crystal-bio",
        title: "Liquid Crystal Biology",
        desc: "The body as a soft crystal. Fascia, collagen, and hydration.",
        icon: Activity,
        category: "Biology",
        route: "/liquid-crystal-biology",
        status: "Live"
    },
    {
        id: "dna-mineral",
        title: "DNA & Mineral Codes",
        desc: "The elemental script. How minerals influence genetic expression.",
        icon: Dna,
        category: "Advanced",
        route: "/dna-mineral-codes",
        status: "Live"
    },
    {
        id: "minerals-microbiome",
        title: "Minerals & Microbiome",
        desc: "The mineral roots of gut health and fermentation.",
        icon: Globe, // Using Globe for ecosystem
        category: "Biology",
        route: "/science/minerals-microbiome-research-hub",
        status: "Live"
    },
    {
        id: "natural-springs",
        title: "Natural Springs",
        desc: "The Mother Reference. How nature processes water underground.",
        icon: Mountain,
        category: "Foundations",
        route: "/natural-springs",
        status: "Live"
    },
    {
        id: "ez-water",
        title: "EZ Water",
        desc: "Deep dive into the Exclusion Zone and charge separation.",
        icon: Atom,
        category: "Foundations",
        route: "/ez-water-overview",
        status: "Live"
    },
    {
        id: "hydration-clusters",
        title: "Hydration Clusters",
        desc: "Microstructure magic. Chaos vs Order in water clusters.",
        icon: Hexagon,
        category: "Advanced",
        route: "/hydration-clusters-microstructure",
        status: "Live"
    },
    {
        id: "vortex-flow",
        title: "Vortexing & Flow",
        desc: "Spiral hydrodynamics and implosion physics in water.",
        icon: Zap, // Spiral not avail in basic set, using Zap for energy
        category: "Advanced",
        route: "/vortex-spiral-hydrodynamics",
        status: "Live"
    }
];

const CATEGORIES = ["All", "Foundations", "Biology", "Advanced"];

export default function ScienceLibrary() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    const filteredItems = LIBRARY_ITEMS.filter(item => {
        const matchesCategory = filter === "All" || item.category === filter;
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <StandardPageLayout
            title="The Science Library"
            subtitle="Explore the physics of living water. From ionic minerals to bioelectric fields."
            seoTitle="Andara Science Library | Water, Minerals & Bioelectricity"
            seoDescription="The central hub for Andara's scientific research. Explore topics on Structured Water, Ionic Minerals, Bioelectricity, and the Crystalline Matrix."
            heroVariant="dark" // Futuristic dark mode
            heroIcon={BookOpen}
            badges={[{ text: "Knowledge Base" }]}
        >

            {/* CONTROLS (Search & Filter) */}
            <section className="py-8 bg-[#020617] border-b border-white/5 sticky top-[70px] z-30 backdrop-blur-xl bg-[#020617]/80">
                <div className="container px-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">

                    {/* Filter Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filter === cat
                                    ? "bg-white text-black"
                                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>
                </div>
            </section>

            {/* THE GRID */}
            <section className="py-16 bg-[#020617] min-h-[60vh]">
                <div className="container px-4 max-w-6xl mx-auto">
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {filteredItems.map((item) => (
                                <StaggerItem key={item.id}>
                                    <Link href={item.route}>
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="andara-glass-card p-6 h-full hover:border-cyan-500/30 transition-all cursor-pointer group flex flex-col"
                                        >
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.category === 'Foundations' ? 'bg-indigo-900/30 text-indigo-400' :
                                                    item.category === 'Biology' ? 'bg-emerald-900/30 text-emerald-400' :
                                                        'bg-purple-900/30 text-purple-400'
                                                    }`}>
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <div className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wider ${item.status === 'Live'
                                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                                    : "bg-slate-800 border-slate-700 text-slate-500"
                                                    }`}>
                                                    {item.status}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                                {item.desc}
                                            </p>

                                            <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-xs">
                                                <span className="text-slate-500 uppercase tracking-widest">{item.category}</span>
                                                <span className="flex items-center gap-1 text-cyan-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Read <ArrowRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </motion.div>
                                    </Link>
                                </StaggerItem>
                            ))}
                        </AnimatePresence>
                    </StaggerContainer>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-500">No topics found matching "{search}".</p>
                            <button onClick={() => { setSearch(""); setFilter("All"); }} className="text-cyan-400 text-sm mt-4 hover:underline">
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

        </StandardPageLayout>
    );
}
