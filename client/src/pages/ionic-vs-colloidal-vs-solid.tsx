import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { StackedCard } from "@/components/visuals/StackedCard";
import { IonicScaleDiagram } from "@/components/visuals/IonicScaleDiagram";
import {
    Zap,
    Droplets,
    Mountain,
    AlertTriangle,
    HelpCircle,
    ArrowRight,
    Split,
    Beaker
} from "lucide-react";

export default function IonicVsColloidalVsSolidPage() {
    // Scrollytelling Layers - The 3 Core Forms
    const layers = [
        {
            title: "Ionic Minerals",
            subtitle: "Dissolved Charge Carriers",
            desc: "Truly dissolved ions. They are invisible, mobile, and carry electric charge (electrolytes). They drive Conductivity.",
            link: "#ionic",
            image: "/bioelectric-bg.png",
            color: "blue",
            Icon: Zap
        },
        {
            title: "Colloidal Minerals",
            subtitle: "Suspended Particles",
            desc: "Tiny particles suspended in liquid. They don't fully dissolve. They scatter light and create 'turbidity' context.",
            link: "#colloidal",
            image: "/proton-gradient-bg.png",
            color: "purple",
            Icon: Droplets
        },
        {
            title: "Solid Minerals",
            subtitle: "Surface Lattices",
            desc: "Rocks, crystals, and lattices. They act through their surfaces—creating interfaces where water organizes.",
            link: "#solid",
            image: "/cell-membrane-bg.png",
            color: "orange",
            Icon: Mountain
        },
        {
            title: "The Confusion",
            subtitle: "Trace vs Form",
            desc: "'Trace' refers to amount. 'Ionic/Colloidal' refers to form. Don't mix them up.",
            link: "#confusion",
            image: "/ion-channels-bg.png",
            color: "red",
            Icon: AlertTriangle
        }
    ];

    return (
        <StandardPageLayout
            title={<>Ionic vs Colloidal <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">vs Solid Minerals</span></>}
            subtitle={<>Dissolved vs Suspended.<br />Why Form Dictates Function.</>}

            heroVariant="blue"
            heroIcon={Split}
            badges={[{ text: "Mineral Form Series", icon: Zap }]}
            seoTitle="Ionic vs Colloidal vs Solid Minerals: Forms, Behavior & Terrain Context"
            seoDescription="Minerals are not all the same. Learn the difference between ionic minerals (dissolved charge carriers), colloidal minerals (suspended particles), and solid minerals (lattice surfaces)."
        >

            {/* DEFINITION SECTION */}
            <section className="relative z-10 py-24 bg-[#020617]">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 mb-12">
                        <p className="text-white/80 leading-relaxed text-2xl font-display mb-6">
                            "Two products can list the same mineral, yet behave completely differently—because one is ionic, one is colloidal, and one is solid."
                        </p>
                        <p className="text-white/60 text-lg">
                            This page separates the marketing from the physics.
                        </p>
                    </div>

                    <div className="mb-12">
                        <IonicScaleDiagram />
                    </div>
                </div>
            </section>

            {/* SCROLLYTELLING - CORE FORMS */}
            <section className="relative z-10 w-full bg-[#020617] pb-32">
                <div className="container px-4 mx-auto">
                    <div className="relative py-20 text-center z-20 pointer-events-none">
                        <h2 className="text-3xl font-display text-white mb-4">The 3-Layer Effect Model</h2>
                        <p className="text-white/50 max-w-xl mx-auto">
                            Different forms act on different layers of the terrain.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        {layers.map((layer, i) => (
                            <StackedCard key={i} index={i} total={layers.length} {...layer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* DETAILED COMPARISON */}
            <section id="ionic" className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-16 text-center">How They Show Up in Water</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Layer 1: Ionic */}
                        <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 hover:border-blue-500/30 transition-colors">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Layer A: Carrier</h3>
                            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">Ionic Environment</p>

                            <p className="text-white/70 text-sm mb-6 leading-relaxed">
                                Ions are the mobile workforce. They carry charge between boundaries.
                            </p>

                            <div className="p-4 bg-white/5 rounded-lg border border-white/5 mb-4">
                                <strong className="block text-white text-xs mb-1">Impacts:</strong>
                                <Link href="/conductivity-tds-water" className="text-white/60 text-xs hover:text-blue-400 transition-colors block">• Conductivity (EC)</Link>
                                <span className="text-white/60 text-xs block">• TDS Estimates</span>
                            </div>
                        </div>

                        {/* Layer 2: Colloidal */}
                        <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 hover:border-purple-500/30 transition-colors">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
                                <Droplets className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Layer B: Suspension</h3>
                            <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">Particle Environment</p>

                            <p className="text-white/70 text-sm mb-6 leading-relaxed">
                                Particles exist in suspension. They create vast interface area within the liquid but aren't fully dissolved.
                            </p>

                            <div className="p-4 bg-white/5 rounded-lg border border-white/5 mb-4">
                                <strong className="block text-white text-xs mb-1">Impacts:</strong>
                                <Link href="/science/turbidity-clarity-flocculation" className="text-white/60 text-xs hover:text-purple-400 transition-colors block">• Clarity / Turbidity</Link>
                                <span className="text-white/60 text-xs block">• Light Scattering</span>
                            </div>
                        </div>

                        {/* Layer 3: Solid */}
                        <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 hover:border-orange-500/30 transition-colors">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
                                <Mountain className="w-6 h-6 text-orange-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Layer C: Surface</h3>
                            <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">Interface Environment</p>

                            <p className="text-white/70 text-sm mb-6 leading-relaxed">
                                Lattices create physical boundaries. Water organizes on these surfaces (EZ/Hydration layers).
                            </p>

                            <div className="p-4 bg-white/5 rounded-lg border border-white/5 mb-4">
                                <strong className="block text-white text-xs mb-1">Impacts:</strong>
                                <Link href="/science/water-structure" className="text-white/60 text-xs hover:text-orange-400 transition-colors block">• Hydration Layers</Link>
                                <span className="text-white/60 text-xs block">• Adsorption (Binding)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRACE DROPS CLARITY */}
            <section id="confusion" className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <h2 className="text-3xl font-display text-white mb-6">"Trace Minerals Drops"</h2>
                            <p className="text-white/60 mb-6 leading-relaxed">
                                People assume "Trace" means "Ionic." It doesn't.
                                <br /><br />
                                <strong>Trace</strong> = Amount (Microgram scale).<br />
                                <strong>Ionic/Colloidal</strong> = Form (Dissolved vs Suspended).
                            </p>
                            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-red-400 mb-1">Common Misunderstanding</h4>
                                        <p className="text-red-200/60 text-sm">
                                            Just because a bottle says "Trace Minerals" does not guarantee it is ionic. Check the label: "Ionic" vs "Colloidal" matters for how your body processes it.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="w-64 h-64 bg-[#0b1020] rounded-full border border-white/10 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-blue-500/5 rounded-full animate-pulse" />
                                <div className="text-center">
                                    <Beaker className="w-12 h-12 text-white/20 mx-auto mb-2" />
                                    <span className="block text-white/40 text-xs">Form Check</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SAFETY & INTEGRITY */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-6">Source Integrity & Safety</h2>
                    <p className="text-white/60 max-w-2xl mx-auto mb-8">
                        Mineral form affects safety discussions too. Solids can carry different contaminants than solutions.
                    </p>
                    <Link href="/trust/faq-safety-quality">
                        <span className="inline-flex items-center gap-2 text-red-400 hover:text-white transition-colors cursor-pointer text-sm font-bold uppercase tracking-widest border-b border-red-400/30 pb-1">
                            Read Toxicity Boundaries <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                </div>
            </section>

            {/* HUB NAVIGATION */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Library Connections</h2>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/conductivity-tds-water">
                            <button className="px-6 py-3 rounded-lg bg-[#0b1020] border border-white/10 hover:border-blue-500/50 text-white/70 hover:text-white transition-all text-sm">
                                Conductivity (Ionic Link)
                            </button>
                        </Link>
                        <Link href="/science/turbidity-clarity-flocculation">
                            <button className="px-6 py-3 rounded-lg bg-[#0b1020] border border-white/10 hover:border-purple-500/50 text-white/70 hover:text-white transition-all text-sm">
                                Turbidity (Colloidal Link)
                            </button>
                        </Link>
                        <Link href="/science/mineral-science-blueprint">
                            <button className="px-6 py-3 rounded-lg bg-[#0b1020] border border-white/10 hover:border-orange-500/50 text-white/70 hover:text-white transition-all text-sm">
                                Mineral Science Hub (Solid Link)
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                    <div className="space-y-6">
                        {[
                            { name: "What are ionic minerals?", text: "Minerals dissolved as ions in water. They act as mobile charge carriers (electrolytes) and influence conductivity context." },
                            { name: "What are colloidal minerals?", text: "Very small mineral particles suspended in water. They behave like particles, often influencing clarity and interface behavior, not like true dissolved ions." },
                            { name: "What are solid minerals?", text: "Minerals in a solid lattice form. They influence water mostly through surfaces, adsorption, and sometimes limited dissolution depending on mineral type." },
                            { name: "Are trace minerals drops always ionic?", text: "No. “Trace” describes amount; drops can be ionic, colloidal, or mixed. Always separate dosage scale from mineral form." },
                            { name: "What should I read next?", text: "Read /trust/comparison-other-mineral-products next, then mineral-cofactors-enzymes." }
                        ].map((item, i) => (
                            <div key={i} className="border-b border-white/10 pb-6">
                                <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                    {item.name}
                                </h3>
                                <p className="text-white/60 pl-8 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </StandardPageLayout>
    );
}
