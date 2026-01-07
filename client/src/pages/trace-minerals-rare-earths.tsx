import React, { useRef } from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { StackedCard } from "@/components/visuals/StackedCard";
import {
    Mountain,
    Droplets,
    ShieldCheck,
    AlertTriangle,
    HelpCircle,
    ArrowRight,
    Beaker,
    Scale
} from "lucide-react";

export default function AluminumSchoolMineralsPage() {
    // Scrollytelling Layers 
    const layers = [
        {
            title: "The Category Trap",
            subtitle: "It's Not One Thing",
            desc: "Aluminum is an element category. But in reality, form decides behavior. Don't fall for binary thinking.",
            link: "#category-trap",
            image: "/bioelectric-bg.png",
            color: "blue",
            Icon: Scale
        },
        {
            title: "Lattice-Locked",
            subtitle: "Solid Frameworks",
            desc: "In geology (clays, silicates), aluminum is often locked in stable crystal structures. It acts via surfaces.",
            link: "#lattice-locked",
            image: "/cell-membrane-bg.png",
            color: "orange",
            Icon: Mountain
        },
        {
            title: "Soluble Forms",
            subtitle: "Reactive Chemistry",
            desc: "Aluminum salts or mobilized species behave differently. They participate in water chemistry directly.",
            link: "#soluble",
            image: "/proton-gradient-bg.png",
            color: "red",
            Icon: Beaker
        },
        {
            title: "The Gates",
            subtitle: "pH & Context",
            desc: "Mobility depends on pH gates and chemistry context. It's a system variable, not just a label.",
            link: "#gates",
            image: "/ion-channels-bg.png",
            color: "purple",
            Icon: Droplets
        }
    ];

    return (
        <StandardPageLayout
            title={<>Aluminum School:<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Rethinking Minerals</span></>}
            subtitle={<>Lattice-Locked vs Soluble. <br />Why <span className="text-white font-bold">Form Determines Behavior.</span></>}
            heroVariant="indigo"
            heroIcon={Mountain}
            badges={[{ text: "Mineral Education Series", icon: Mountain }]}

            seoTitle="Aluminum in Minerals: Forms, Boundaries & Context"
            seoDescription="Aluminum is everywhere in Earth minerals—but its behavior depends on form. Learn the difference between aluminum locked in silicate lattices vs soluble aluminum salts."
        >

            {/* DEFINITION SECTION */}
            <section className="relative z-10 py-24 bg-[#020617]">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 mb-12">
                        <p className="text-white/80 leading-relaxed text-2xl font-display mb-6">
                            "The correct question is not ‘Is aluminum present?’ The correct question is ‘In what form, in what context, and with what boundaries?’"
                        </p>
                        <p className="text-white/60 text-lg">
                            Aluminum is a category word. In mineral reality, <span className="text-indigo-400 font-bold">Speciation</span> is the issue.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                            <Mountain className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                            <span className="block text-white font-bold text-lg mb-1">Lattice-Locked</span>
                            <span className="block text-white/50 text-sm">Solid Frameworks<br />(Clays, Silicates)</span>
                        </div>
                        <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                            <Beaker className="w-8 h-8 text-red-400 mx-auto mb-3" />
                            <span className="block text-white font-bold text-lg mb-1">Soluble / Reactive</span>
                            <span className="block text-white/50 text-sm">Mobile Salts<br />(Salts, Coagulants)</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCROLLYTELLING - CORE CONCEPTS */}
            <section className="relative z-10 w-full bg-[#020617] pb-32">
                <div className="container px-4 mx-auto">
                    <div className="relative py-20 text-center z-20 pointer-events-none">
                        <h2 className="text-3xl font-display text-white mb-4">The Distinction</h2>
                        <p className="text-white/50 max-w-xl mx-auto">
                            Moving beyond binary thinking.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        {layers.map((layer, i) => (
                            <StackedCard key={i} index={i} total={layers.length} {...layer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* DETAILED CONTEXT: GEOLOGY & WATER */}
            <section id="lattice-locked" className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-16 text-center">Context Matters</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Geology Context */}
                        <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
                                <Mountain className="w-6 h-6 text-orange-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">In Geology</h3>
                            <p className="text-white/70 mb-6 leading-relaxed">
                                Aluminum is a key architect of the earth's crust. It builds stable lattices like clays, feldspars, and micas.
                            </p>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <strong className="block text-white text-sm mb-1">Terrain Translation:</strong>
                                <p className="text-white/50 text-xs">
                                    Here, aluminum is an <span className="text-orange-400">Interface Form</span> (Surface/Lattice), not a mobile carrier by default.
                                </p>
                            </div>
                        </div>

                        {/* Water System Context */}
                        <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
                                <Droplets className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">In Water Treatment</h3>
                            <p className="text-white/70 mb-6 leading-relaxed">
                                "Alum" (aluminum sulfate) acts as a coagulant. Here, it is introduced for reactivity—to grab particles.
                            </p>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <strong className="block text-white text-sm mb-1">Terrain Translation:</strong>
                                <p className="text-white/50 text-xs">
                                    different form = different function. This highlights why <span className="text-indigo-400">speciation</span> is everything.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SOURCING & RED FLAGS */}
            <section id="red-flags" className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Navigating Sourcing</h2>

                    <div className="flex flex-col gap-6">
                        <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-xl flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-white mb-2">Red Flag: "Proprietary Blend"</h4>
                                <p className="text-white/60 text-sm">
                                    If a product hides its source or composition, you cannot assess the form. Is it ionic? Colloidal? Geologic? Transparency is safety.
                                </p>
                            </div>
                        </div>

                        <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-xl flex items-start gap-4">
                            <ShieldCheck className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-white mb-2">The Clean Approach</h4>
                                <p className="text-white/60 text-sm">
                                    Look for clear labels: <br />
                                    1. <strong>Source Class</strong> (e.g. Sea Salt, Geologic)<br />
                                    2. <strong>Form Clarity</strong> (Ionic vs Colloidal)<br />
                                    3. <strong>Documentation</strong> (Signals of testing/QC)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                    <div className="space-y-6">
                        {[
                            { name: "Is aluminum naturally present in minerals?", text: "Yes. Aluminum is widely present in Earth minerals, often within aluminosilicate lattices." },
                            { name: "Is all aluminum the same?", text: "No. Aluminum can be lattice-locked in solids or present in more mobile soluble forms. Form determines behavior." },
                            { name: "Why does pH matter for aluminum?", text: "pH influences speciation and mobility—changing how aluminum behaves in water chemistry contexts." },
                            { name: "Does ionic minerals mean there is no aluminum?", text: "Not necessarily. 'Ionic minerals' describes dissolved ion form; purity depends on source, processing, and documentation." },
                            { name: "What should I read next?", text: "Read /trust/comparison-other-mineral-products and ionic-vs-colloidal-vs-solid next to evaluate mineral inputs cleanly." }
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
