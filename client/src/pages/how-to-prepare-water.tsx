import React, { useEffect } from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn, StaggerContainer } from "@/components/animations";
import {
    Globe,
    Map,
    Fingerprint,
    Droplets,
    Mountain,
    Waves,
    Building2,
    FlaskConical,
    ArrowRight,
    HelpCircle,
    Component,
    MapPin
} from "lucide-react";

export default function WaterCaseStudiesWorldPage() {

    // Background Map Visuals
    const heroBackground = (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Abstract Global Lines */}
                <path d="M10,50 Q30,20 50,50 T90,50" stroke="#38ffd1" strokeWidth="0.1" fill="none" />
                <path d="M10,60 Q30,30 50,60 T90,60" stroke="#38ffd1" strokeWidth="0.05" fill="none" />
                <circle cx="20" cy="40" r="1" fill="#38ffd1" opacity="0.5" />
                <circle cx="70" cy="30" r="1.5" fill="#38ffd1" opacity="0.3" />
                <circle cx="50" cy="70" r="0.8" fill="#38ffd1" opacity="0.6" />
            </svg>
        </div>
    );

    return (
        <StandardPageLayout
            title={<>Water <span className="text-blue-400">Case Studies</span></>}
            subtitle={<>Source Patterns, Mineral Context & Coherence.<br /><span className="text-blue-400/80">Learning to read water beyond the label.</span></>}
            heroVariant="blue"
            heroIcon={Globe}
            badges={[{ text: "Global Pattern Library", icon: Globe }]}
            backgroundElement={heroBackground}
            seoTitle="Water Case Studies Worldwide: Source Patterns & Mineral Context"
            seoDescription="Explore water case studies worldwide. Learn how different regions, sources, and mineral contexts shape conductivity, clarity, and coherence patterns."
        >
            {/* INTRO: WHY IT MATTERS */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-6">Why compare globally?</h2>
                        <p className="text-white/60 text-lg mb-12">
                            When you compare water, you really compare <span className="text-white font-bold">geology, treatment, and climate</span>.
                            Andara teaches that baseline context is always part of the story.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5">
                                <div className="flex items-start gap-4">
                                    <Map className="w-6 h-6 text-blue-400 mt-1" />
                                    <div>
                                        <h3 className="text-white font-bold mb-2">Location = Context</h3>
                                        <p className="text-white/60 text-sm">Volcanic rock creates different water than limestone aquifers or municipal pipes.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5">
                                <div className="flex items-start gap-4">
                                    <Fingerprint className="w-6 h-6 text-emerald-400 mt-1" />
                                    <div>
                                        <h3 className="text-white font-bold mb-2">Unique Signatures</h3>
                                        <p className="text-white/60 text-sm">Every source has a mineral and energetic signature. One isn't "better," just different.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ANDARA PROFILE TEMPLATE */}
            <section className="py-24 bg-[#020617]">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-display text-white">The Profile Template</h2>
                            <span className="text-xs font-mono text-white/40 bg-white/5 px-3 py-1 rounded">ANDARA STANDARD v1.0</span>
                        </div>

                        <div className="bg-[#0b1020] p-8 rounded-2xl border border-blue-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-blue-400 font-bold font-mono text-lg mb-6 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> [Location / Region]
                                    </h3>
                                    <ul className="space-y-4 text-sm text-white/70">
                                        <li className="flex justify-between border-b border-white/5 pb-2">
                                            <span>Source Type</span>
                                            <span className="text-white">Tap / Spring / Well / RO</span>
                                        </li>
                                        <li className="flex justify-between border-b border-white/5 pb-2">
                                            <span>Baseline Stability</span>
                                            <span className="text-white">Stable / Variable</span>
                                        </li>
                                        <li className="flex justify-between border-b border-white/5 pb-2">
                                            <span>Mineral Context</span>
                                            <span className="text-white">Low / Medium / High</span>
                                        </li>
                                        <li className="flex justify-between border-b border-white/5 pb-2">
                                            <span>Conductivity/TDS</span>
                                            <span className="text-white">Descriptive Range</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="bg-[#020617] p-6 rounded-xl border border-white/10">
                                        <h4 className="text-white font-bold text-sm mb-2">Andara Note (The "Why")</h4>
                                        <p className="text-white/50 text-xs italic leading-relaxed">
                                            "Here we document what matters most for comparison—not claims, but context. For example: 'High silica content provides distinct smooth mouthfeel.'"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 6 GLOBAL PATTERNS */}
            <section className="py-24 bg-[#05060b]">
                <div className="container px-4 max-w-6xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-display text-white mb-12 text-center">6 Global Patterns</h2>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Pattern 1 */}
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-colors">
                            <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center mb-4 text-orange-400"><Mountain className="w-5 h-5" /></div>
                            <h3 className="text-white font-bold mb-2">1. Volcanic Regions</h3>
                            <p className="text-white/60 text-xs mb-4">Mineral-dense, unique signatures. Often high conductivity context.</p>
                            <Link href="/mineral-science-blueprint" className="text-[10px] font-bold text-orange-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                view mineral science <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Pattern 2 */}
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-colors">
                            <div className="w-10 h-10 bg-slate-500/10 rounded-full flex items-center justify-center mb-4 text-slate-400"><Component className="w-5 h-5" /></div>
                            <h3 className="text-white font-bold mb-2">2. Limestone / Karst</h3>
                            <p className="text-white/60 text-xs mb-4">Calcium-Magnesium dominant. "Hard water" feel. Distinct taste profiles.</p>
                            <Link href="/science/mineral-sources" className="text-[10px] font-bold text-slate-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                view trace elements <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Pattern 3 */}
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-colors">
                            <div className="w-10 h-10 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 text-cyan-400"><Droplets className="w-5 h-5" /></div>
                            <h3 className="text-white font-bold mb-2">3. Glacial Springs</h3>
                            <p className="text-white/60 text-xs mb-4">Crisp taste. Often lower mineral/conductivity text. High clarity.</p>
                            <Link href="/natural-vs-treated-water" className="text-[10px] font-bold text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                view source types <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Pattern 4 */}
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-colors">
                            <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 text-amber-400"><Fingerprint className="w-5 h-5" /></div>
                            <h3 className="text-white font-bold mb-2">4. Deep Aquifers</h3>
                            <p className="text-white/60 text-xs mb-4">Stable signatures if well-maintained. Excellent baselines.</p>
                            <Link href="/natural-vs-treated-water" className="text-[10px] font-bold text-amber-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                view source types <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Pattern 5 */}
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-colors">
                            <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 text-indigo-400"><Waves className="w-5 h-5" /></div>
                            <h3 className="text-white font-bold mb-2">5. Coastal / Marine</h3>
                            <p className="text-white/60 text-xs mb-4">Trace mineral patterns from sea aerosols. Unique ionic profiles.</p>
                            <Link href="/science/mineral-sources" className="text-[10px] font-bold text-indigo-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                view ocean minerals <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Pattern 6 */}
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-colors">
                            <div className="w-10 h-10 bg-rose-500/10 rounded-full flex items-center justify-center mb-4 text-rose-400"><Building2 className="w-5 h-5" /></div>
                            <h3 className="text-white font-bold mb-2">6. Municipal Systems</h3>
                            <p className="text-white/60 text-xs mb-4">Consistent delivery but variable chemistry (chlorine, pipes). Interfaces matter.</p>
                            <Link href="/natural-vs-treated-water" className="text-[10px] font-bold text-rose-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                view treated water <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                    </StaggerContainer>
                </div>
            </section>

            {/* EXAMPLE CASE STUDIES */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-12 text-center">Sample Case Studies</h2>
                    </FadeIn>
                    <StaggerContainer className="space-y-4">
                        {/* Example A */}
                        <div className="andara-glass-card p-6 flex flex-col md:flex-row gap-6 items-start border-l-4 border-orange-500">
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg mb-1">Volcanic Spring Water</h3>
                                <div className="flex gap-2 mb-3">
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/60">Spring</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/60">High Mineral</span>
                                </div>
                                <p className="text-white/60 text-sm">Strong mineral signature acts as a dominant context. Baseline stability is usually high if the source is protected.</p>
                            </div>
                            <div className="text-right text-xs text-white/40 font-mono min-w-[140px]">
                                Clarity: High<br />
                                Cond: Med-High<br />
                                Stability: High
                            </div>
                        </div>

                        {/* Example B */}
                        <div className="andara-glass-card p-6 flex flex-col md:flex-row gap-6 items-start border-l-4 border-purple-500">
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg mb-1">RO + Remineralized</h3>
                                <div className="flex gap-2 mb-3">
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/60">Treated</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/60">Low-Med Mineral</span>
                                </div>
                                <p className="text-white/60 text-sm">Very clean baseline, but "thin" ionic context unless remineralization is robust. Distinctly different mouthfeel from spring water.</p>
                            </div>
                            <div className="text-right text-xs text-white/40 font-mono min-w-[140px]">
                                Clarity: High<br />
                                Cond: Low-Med<br />
                                Stability: High
                            </div>
                        </div>

                        {/* Example C */}
                        <div className="andara-glass-card p-6 flex flex-col md:flex-row gap-6 items-start border-l-4 border-rose-500">
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg mb-1">Municipal Tap (Seasonal)</h3>
                                <div className="flex gap-2 mb-3">
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/60">Tap</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/60">Variable</span>
                                </div>
                                <p className="text-white/60 text-sm">Treatment changes (chlorine/chloramine) and pipe age create a variable baseline. Can be "noisy" for sensitive hydration routines.</p>
                            </div>
                            <div className="text-right text-xs text-white/40 font-mono min-w-[140px]">
                                Clarity: Variable<br />
                                Cond: Variable<br />
                                Stability: Low-Med
                            </div>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* ANDARA CONNECTION */}
            <section className="py-24 bg-[#05060b]">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-3xl font-display text-white mb-8">Where Andara Fits</h2>
                        <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                            We don't sell water. We sell the <span className="text-blue-400">consistency layer</span> for your water.
                            Whether you use RO, Spring, or Tap, Andara Ionic provides the stable mineral context needed to make your routine readable.
                        </p>

                        <div className="flex justify-center gap-4">
                            <Link href="/getting-started-first-7-days" className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-500/20">
                                See 7-Day Protocol
                            </Link>
                            <Link href="/andara-dilution-calculator" className="px-6 py-3 border border-white/10 hover:border-white/30 text-white rounded-full font-bold transition-all flex items-center gap-2">
                                <FlaskConical className="w-4 h-4" /> Dosing Calc
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#020617]">
                <div className="container px-4 max-w-3xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-display text-white mb-12 text-center">Global Cases FAQ</h2>
                        <div className="space-y-6">
                            {[
                                { name: "Are these lab-certified profiles?", text: "No. This is an education-first pattern library. It may include optional measured markers when available, but it is not presented as clinical proof." },
                                { name: "What is the best way to use this page?", text: "Use it to choose a baseline source for a 7-day routine window and to understand why different waters produce different experiences." },
                                { name: "What should I read next?", text: "Read Conductivity & TDS and Turbidity & Clarity to understand the two most useful comparison markers." }
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
                    </FadeIn>
                </div>
            </section>

        </StandardPageLayout>
    );
}
