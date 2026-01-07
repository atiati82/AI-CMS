import React, { useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import StandardPageLayout from "@/components/StandardPageLayout";
import { StackedCard } from "@/components/visuals/StackedCard";
import {
    Radio,
    Wifi,
    Shield,
    Activity,
    Zap,
    Layers,
    HelpCircle,
    ArrowRight,
    ShieldCheck,
    Ban,
    Home
} from "lucide-react";

export default function EmfMineralsShieldingPage() {
    // --- JSON-LD Call ---
    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "EMF, Minerals & Shielding Basics",
            "description": "Educational guide on electromagnetic fields (ELF vs RF), bioelectric terrain coupling, and practical shielding principles."
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is EMF?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Electromagnetic fields produced by electricity and wireless systems; they span a wide range of frequencies." }
                },
                {
                    "@type": "Question",
                    "name": "What’s the difference between ELF and RF?",
                    "acceptedAnswer": { "@type": "Answer", "text": "ELF is very low frequency (often associated with power systems); RF is higher frequency (wireless communications)." }
                },
                {
                    "@type": "Question",
                    "name": "Do trace minerals electrolytes shield EMF?",
                    "acceptedAnswer": { "@type": "Answer", "text": "No. They relate to the internal carrier environment (electrolyte context). Shielding is an external attenuation problem solved through design, distance, and materials." }
                },
                {
                    "@type": "Question",
                    "name": "Are there official safety guidelines?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yes. ICNIRP publishes guidelines for RF fields (100 kHz–300 GHz), and regulators like the FCC provide RF safety information." }
                },
                {
                    "@type": "Question",
                    "name": "What should I read next?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Read bioelectricity-invisible-voltage and black-mica-sulfated-minerals next." }
                }
            ]
        }
    ];

    // Scrollytelling Layers - Education
    const layers = [
        {
            title: "ELF vs RF",
            subtitle: "Know The Difference",
            desc: "ELF (Power) and RF (Wireless) are different worlds. What blocks one might ignore the other. Shielding starts with identification.",
            link: "#types",
            image: "/bioelectric-bg.png",
            color: "blue",
            Icon: Radio
        },
        {
            title: "Terrain Coupling",
            subtitle: "Internal Response",
            desc: "Fields induce currents in conductive media. Your 'terrain' (electrolytes, boundaries) determines how readily these currents move.",
            link: "/bioelectricity-invisible-voltage",
            image: "/cell-membrane-bg.png",
            color: "cyan",
            Icon: Activity
        },
        {
            title: "Shielding Reality",
            subtitle: "Engineering, Not Magic",
            desc: "Shielding is physics: distance, material attenuation, and geometry. Stickers don't change physics. Distance does.",
            link: "#checklist",
            image: "/proton-gradient-bg.png",
            color: "orange",
            Icon: Shield
        },
        {
            title: "Mineral Role",
            subtitle: "Carrier Context",
            desc: "Minerals tune the carrier environment. They don't block external fields; they shape the internal conductive medium.",
            link: "/ionic-vs-colloidal-vs-solid",
            image: "/ion-channels-bg.png",
            color: "purple",
            Icon: Layers
        }
    ];

    return (
        <StandardPageLayout
            title={<>EMF, Minerals & <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">Shielding Basics</span></>}
            subtitle={<>Field Types · Terrain Coupling · Practical Protection<br />What Actually Works (Without Hype).</>}
            heroVariant="slate"
            heroIcon={ShieldCheck}
            badges={[{ text: "Terrain-Safe Guide", icon: ShieldCheck }]}
            
            seoTitle="EMF, Minerals & Shielding Basics: Field Types, Bioelectric Terrain, and Protection"
            seoDescription="Learn EMF basics (ELF vs RF), how fields couple into living terrain, and what 'shielding' really means. Clear myths vs reality for minerals and environmental design."
            backgroundElement={
                <>
                    <div className="absolute inset-0 bg-[#020617]" />
                    <motion.div
                        className="absolute inset-0 bg-[url('/images/water/magnetic-flux.png')] bg-cover bg-center opacity-30 mix-blend-overlay"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                </>
            }
        >
            {schemas.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}

            {/* DEFINITION SECTION */}
            <section className="relative z-10 py-24 bg-[#020617] border-b border-white/5">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <ShieldCheck className="w-5 h-5 text-rose-400" />
                            <span className="text-xs font-bold text-white/50 tracking-widest uppercase">The Truth</span>
                        </div>
                        <p className="text-white/80 leading-relaxed text-2xl font-display mb-6">
                            "Minerals tune the internal carrier terrain; shielding is about external field control."
                        </p>
                        <p className="text-white/60 text-lg">
                            This page exists for clean understanding. "EMF" is not one thing—it's a spectrum. And mitigation is engineering, not magic.
                        </p>
                    </div>
                </div>
            </section>

            {/* SCROLLYTELLING - EDUCATION LAYERS */}
            {/* Note: We place this directly here as it's a custom layout component */}
            <section className="relative z-10 w-full bg-[#020617] py-20 border-b border-white/5">

                <div className="container px-4 mx-auto">
                    <div className="relative pb-16 text-center z-20 pointer-events-none">
                        <h2 className="text-3xl font-display text-white mb-4">The Core Concepts</h2>
                        <p className="text-white/50 max-w-xl mx-auto">
                            Separating the physics from the noise.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        {layers.map((layer: any, i: number) => (
                            <StackedCard key={i} index={i} total={layers.length} {...layer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* EMF TYPES BREAKDOWN */}
            <section className="py-24 bg-[#05060b] border-b border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-16 text-center">Two Worlds of EMF</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* ELF */}
                        <div className="p-8 bg-[#0b1020] rounded-2xl border border-white/10 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Zap className="w-24 h-24 text-yellow-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /> ELF (Extremely Low Frequency)</h3>
                            <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6">Power Systems (50/60 Hz)</p>

                            <p className="text-white/70 text-sm leading-relaxed mb-6">
                                Fields from power lines, wiring, and transformers. Related to <strong>induced currents</strong>.
                            </p>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-xs text-white/50">
                                <strong>Note:</strong> Typical RF shielding (mesh) often does little for ELF magnetic fields.
                            </div>
                        </div>

                        {/* RF */}
                        <div className="p-8 bg-[#0b1020] rounded-2xl border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Wifi className="w-24 h-24 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><Wifi className="w-5 h-5 text-blue-400" /> RF (Radiofrequency)</h3>
                            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">Wireless (100 kHz - 300 GHz)</p>

                            <p className="text-white/70 text-sm leading-relaxed mb-6">
                                Fields from Wi-Fi, Bluetooth, mobile towers. Related to <strong>tissue heating</strong> and other effects.
                            </p>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-xs text-white/50">
                                <strong>Note:</strong> Faraday-style shielding works here, but design matters (leaks/reflections).
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MYTH FILTER */}
            <section className="py-24 bg-[#020617] border-b border-white/5">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Myth Filter</h2>

                    <div className="space-y-4">
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/10 flex gap-4 items-start">
                            <Ban className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-white mb-1">Myth: "All EMF is the same."</h4>
                                <p className="text-sm text-white/60">Reality: ELF and RF behave differently and need different solutions. Don't mix them up.</p>
                            </div>
                        </div>

                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/10 flex gap-4 items-start">
                            <Ban className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-white mb-1">Myth: "Minerals block EMF."</h4>
                                <p className="text-sm text-white/60">Reality: Minerals tune the internal carrier context. They do not physically block external radiation like lead or copper.</p>
                            </div>
                        </div>

                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/10 flex gap-4 items-start">
                            <Ban className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-white mb-1">Myth: "One sticker fixes everything."</h4>
                                <p className="text-sm text-white/60">Reality: Shielding is physics (attenuation). Without significant material interaction, effects are minimal.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRACTICAL CHECKLIST */}
            <section className="py-24 bg-[#05060b] border-b border-white/5">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10 text-xs uppercase tracking-widest mb-4">
                            <Home className="w-3 h-3" /> Design Hygiene
                        </div>
                        <h2 className="text-3xl font-display text-white mb-4">Practical Home Checklist</h2>
                        <p className="text-white/60">No experiments. Just environmental design logic.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 1 */}
                        <div className="group p-8 bg-[#0b1020] rounded-3xl border border-white/5 hover:border-white/10 transition-all">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">1. Identify</h3>
                            <p className="text-white/60 leading-relaxed">
                                Is it power (wiring) or wireless (Wi-Fi)? You cannot mitigate what you haven't defined.
                            </p>
                        </div>

                        {/* 2 */}
                        <div className="group p-8 bg-[#0b1020] rounded-3xl border border-white/5 hover:border-white/10 transition-all">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">2. Distance First</h3>
                            <p className="text-white/60 leading-relaxed">
                                Distance is the strongest shield (Inverse Square Law). Move the source or move yourself before buying products.
                            </p>
                        </div>

                        {/* 3 */}
                        <div className="group p-8 bg-[#0b1020] rounded-3xl border border-white/5 hover:border-white/10 transition-all">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">3. Reduce Unused</h3>
                            <p className="text-white/60 leading-relaxed">
                                Turn off sources that aren't serving you. Unpluggers, timers, and "Airplane Mode" are the most effective shielding tools.
                            </p>
                        </div>

                        {/* 4 */}
                        <div className="group p-8 bg-[#0b1020] rounded-3xl border border-white/5 hover:border-white/10 transition-all">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">4. Design Path</h3>
                            <p className="text-white/60 leading-relaxed">
                                Keep emitters away from sleep areas. Route cables cleanly. Think of "quiet zones" in your home architecture.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#020617] border-b border-white/5">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                    <div className="space-y-6">
                        {schemas[1]?.mainEntity?.map((item: any, i: number) => (
                            <div key={i} className="border-b border-white/10 pb-6">
                                <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                    {item.name}
                                </h3>
                                <p className="text-white/60 pl-8 leading-relaxed">{item.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEXT STEPS */}
            <section className="py-20 bg-gradient-to-t from-[#020617] to-[#05060b] text-center">
                <div className="container px-4">
                    <Link href="/science/mineral-sources">
                        <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/10 shadow-lg backdrop-blur-sm group">
                            Next: Black Mica & Sulfated Minerals
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </section>
        </StandardPageLayout>
    );
}
