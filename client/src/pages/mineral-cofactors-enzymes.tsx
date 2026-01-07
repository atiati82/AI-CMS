import React, { useRef } from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { StackedCard } from "@/components/visuals/StackedCard";
import {
    Leaf,
    Activity,
    Zap,
    Settings,
    HelpCircle,
    ArrowRight,
    ShieldCheck,
    Puzzle,
    Key
} from "lucide-react";

export default function MineralCofactorsEnzymesPage() {
    // Scrollytelling Layers 
    const layers = [
        {
            title: "The Electrolyte",
            subtitle: "Movement Layer",
            desc: "Carriers. They move charge and create conductivity. This is the 'Ionic' layer.",
            link: "/conductivity-tds-water",
            image: "/bioelectric-bg.png",
            color: "blue",
            Icon: Zap
        },
        {
            title: "The Cofactor",
            subtitle: "Regulatory Layer",
            desc: "Keys. They don't just move current; they enable specific biological machinery (enzymes).",
            link: "#cofactors",
            image: "/proton-gradient-bg.png", // Consider using registry ID here if StackedCard supports it, otherwise keep path
            color: "green",
            Icon: Key
        },
        {
            title: "The Interface",
            subtitle: "Surface Layer",
            desc: "Structure. Mineral surfaces create boundaries where water and molecules organize.",
            link: "/hydration-layers-interfaces",
            image: "/cell-membrane-bg.png",
            color: "orange",
            Icon: Settings
        },
        {
            title: "The Reality",
            subtitle: "No Magic",
            desc: "Presence ≠ Function. Just having minerals doesn't guarantee they work. Terrain context matters.",
            link: "/mineral-toxicity-boundaries",
            image: "/ion-channels-bg.png",
            color: "red",
            Icon: ShieldCheck
        }
    ];

    return (
        <StandardPageLayout
            title={<>Mineral Cofactors <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">& Enzymes</span></>}
            subtitle={<>The Silent Keys Strategy.<br />Beyond <span className="text-white font-bold">Electrolytes & Conductivity.</span></>}
            heroVariant="emerald"
            heroIcon={Leaf}
            badges={[{ text: "Regulatory Layer Series", icon: Leaf }]}
            
            seoTitle="Mineral Cofactors & Enzymes: Trace Minerals as Biological Keys"
            seoDescription="Trace minerals are more than electrolytes. They act as enzyme cofactors—silent keys that enable reactions. Learn the difference between ionic minerals (carriers) and mineral cofactors (regulators)."
        >

            {/* DEFINITION SECTION */}
            <section className="relative z-10 py-24 bg-[#020617]">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 mb-12">
                        <p className="text-white/80 leading-relaxed text-2xl font-display mb-6">
                            "Electrolytes influence how easily a system carries charge. Cofactors influence what the system can do with that charge."
                        </p>
                        <p className="text-white/60 text-lg">
                            A cofactor is a <strong>geometry + charge helper</strong> that allows enzymes to function.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 w-40">
                            <Zap className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                            <span className="block text-white font-bold text-sm">Electrolyte</span>
                            <span className="block text-white/40 text-xs mt-1">Carrier Context</span>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 w-40">
                            <Key className="w-5 h-5 text-green-400 mx-auto mb-2" />
                            <span className="block text-white font-bold text-sm">Cofactor</span>
                            <span className="block text-white/40 text-xs mt-1">Regulatory Context</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCROLLYTELLING - MECHANISMS */}
            <section className="relative z-10 w-full bg-[#020617] pb-32">
                <div className="container px-4 mx-auto">
                    <div className="relative py-20 text-center z-20 pointer-events-none">
                        <h2 className="text-3xl font-display text-white mb-4">How It Works</h2>
                        <p className="text-white/50 max-w-xl mx-auto">
                            The mechanisms behind the "key."
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        {layers.map((layer, i) => (
                            <StackedCard key={i} index={i} total={layers.length} {...layer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 4 MECHANISMS DETAIL */}
            <section id="cofactors" className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-16 text-center">The 4 Mechanism Keys</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-[#0b1020] rounded-2xl border border-white/10 flex gap-4">
                            <div className="mt-1"><Puzzle className="w-6 h-6 text-green-400" /></div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">1. Structural Stabilization</h3>
                                <p className="text-white/60 text-sm">Minerals act as scaffolding. They hold the enzyme in the correct 3D shape so the "lock" is open.</p>
                            </div>
                        </div>
                        <div className="p-8 bg-[#0b1020] rounded-2xl border border-white/10 flex gap-4">
                            <div className="mt-1"><Zap className="w-6 h-6 text-yellow-400" /></div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">2. Charge Balancing</h3>
                                <p className="text-white/60 text-sm">Reactions often involve unstable charges. Metal ions neutralize these locally to let the reaction proceed.</p>
                            </div>
                        </div>
                        <div className="p-8 bg-[#0b1020] rounded-2xl border border-white/10 flex gap-4">
                            <div className="mt-1"><Activity className="w-6 h-6 text-blue-400" /></div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">3. Catalytic Participation</h3>
                                <p className="text-white/60 text-sm">Sometimes the mineral itself is the hammer. It participates directly in breaking or making bonds.</p>
                            </div>
                        </div>
                        <div className="p-8 bg-[#0b1020] rounded-2xl border border-white/10 flex gap-4">
                            <div className="mt-1"><Settings className="w-6 h-6 text-orange-400" /></div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">4. Molecular Orientation</h3>
                                <p className="text-white/60 text-sm">Minerals guide molecules into the right position, like a docking magnet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* EXAMPLE COFACTORS */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Mineral Examples (Concept Only)</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="p-4 text-white/50 font-normal text-sm uppercase tracking-wider">Mineral</th>
                                    <th className="p-4 text-white font-bold text-sm">Primary Concept</th>
                                    <th className="p-4 text-white font-bold text-sm">Role</th>
                                </tr>
                            </thead>
                            <tbody className="text-white/70 text-sm">
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-white">Magnesium (Mg)</td>
                                    <td className="p-4 text-blue-400">Stability & Coordination</td>
                                    <td className="p-4">Structural Stabilizer</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-white">Zinc (Zn)</td>
                                    <td className="p-4 text-green-400">Precision Binding</td>
                                    <td className="p-4">Structural/Catalytic Helper</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-white">Iron (Fe)</td>
                                    <td className="p-4 text-orange-400">Electron Context</td>
                                    <td className="p-4">Redox & Oxygen Handling</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-white">Manganese (Mn)</td>
                                    <td className="p-4 text-purple-400">Catalytic Support</td>
                                    <td className="p-4">Alternate Catalytic Helper</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-center text-xs text-white/30 mt-6 italic">
                        *Educational references only. No medical claims implied.
                    </p>
                </div>
            </section>

            {/* QUALITY & BOUNDARIES */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-6">Source Integrity & Trace Drops</h2>
                    <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                        "Trace Minerals Drops" is a marketing term. Always ask: Is it Ionic (Carrier)? Is it Colloidal? Is it Pure?
                    </p>

                    <div className="p-6 bg-red-500/5 rounded-xl border border-red-500/10 inline-block text-left">
                        <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> The Firewall</h4>
                        <p className="text-xs text-white/60">
                            Education means clarity, boundaries, and honest uncertainty. No miracle claims. Check source documentation always.
                        </p>
                        <Link href="/trust/faq-safety-quality" className="text-xs font-bold text-red-400 hover:text-white mt-4 block transition-colors">
                            Read Toxicity Boundaries &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                    <div className="space-y-6">
                        {[
                            { name: "What is a mineral cofactor?", text: "A mineral cofactor is a mineral ion that an enzyme needs to function properly, often by stabilizing structure, balancing charge, or participating in catalysis." },
                            { name: "Are trace minerals electrolytes the same as cofactors?", text: "Not exactly. Electrolytes describe the carrier role (conductivity context). Cofactors describe enabling/regulatory roles inside enzyme systems." },
                            { name: "Are ionic trace minerals always better?", text: "Not automatically. Ionic form can support carrier context, but cofactor roles also depend on speciation, purity, and system terrain." },
                            { name: "Are trace minerals drops usually cofactors or electrolytes?", text: "They can be either—many products do not clarify form. Always separate trace (amount) from ionic/colloidal/solid (behavior)." },
                            { name: "What should I read next?", text: "Read mineral-toxicity-boundaries next for clean boundaries and thresholds." }
                        ].map((item, i) => (
                            <div key={i} className="border-b border-white/10 pb-6">
                                <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                    {item.name}
                                </h3>
                                <p className="text-white/60 pl-8 leading-relaxed text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </StandardPageLayout>
    );
}
