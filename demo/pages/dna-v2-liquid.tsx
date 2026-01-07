import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function DnaV2Liquid() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fluid Image Motion
            gsap.to(".liquid-img", {
                rotation: 360,
                duration: 200,
                repeat: -1,
                ease: "none"
            });

            // Soft reveals
            gsap.utils.toArray(".soft-reveal").forEach((el: any) => {
                gsap.fromTo(el,
                    { y: 30, opacity: 0, filter: "blur(10px)" },
                    {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 1.2,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                        }
                    }
                );
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#0b0b15] min-h-screen text-slate-100 font-sans selection:bg-purple-500/40">
            {/* Nav */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-[#0b0b15]/50 backdrop-blur-md border-b border-white/5">
                <Link href="/science/dna-mineral-codes" className="flex items-center gap-2 text-sm font-medium hover:text-purple-400 transition-colors text-white/80">
                    <ArrowLeft size={16} /> Classic View
                </Link>
                <div className="text-xs font-semibold tracking-wider text-purple-400/50">CONCEPT V2 · LIQUID DARK</div>
            </nav>

            {/* Hero */}
            <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-6 lg:px-20 pt-20 overflow-hidden relative">
                {/* Glow behind */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="order-2 lg:order-1 relative z-10">
                    <div className="soft-reveal inline-block px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider mb-6">
                        LIQUID CRYSTAL BIOLOGY
                    </div>
                    <h1 className="soft-reveal text-6xl lg:text-8xl font-light tracking-tight leading-[0.9] text-white mb-8">
                        The Fluid<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Architecture</span><br />
                        of Life.
                    </h1>
                    <p className="soft-reveal text-xl text-slate-400 max-w-md leading-relaxed">
                        DNA doesn't float in a vacuum. It dances in a structured water matrix, tuned by mineral ions.
                    </p>
                </div>
                <div className="order-1 lg:order-2 relative h-[50vh] lg:h-auto flex items-center justify-center">
                    {/* The Image acting as a fluid element */}
                    <div className="liquid-img w-[500px] h-[500px] rounded-full overflow-hidden blur-3xl opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600"></div>
                    <img
                        src="/images/concepts/dna-liquid.png"
                        alt="Liquid DNA"
                        className="relative z-10 w-full max-w-lg object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.2)] soft-reveal mix-blend-screen"
                    />
                </div>
            </section>

            {/* Editorial Section */}
            <section className="py-32 px-6 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="soft-reveal">
                        <h2 className="text-3xl font-light mb-6 text-white">"Water is the memory field."</h2>
                        <div className="h-px w-20 bg-gradient-to-r from-purple-500 to-transparent mb-6" />
                    </div>
                    <div className="space-y-8">
                        <p className="soft-reveal text-lg text-slate-400 leading-loose">
                            Interfacial water forms ordered layers around DNA, proteins, and membranes. These layers support charge separation, signal propagation, and mechanical stability.
                        </p>
                        <p className="soft-reveal text-lg text-slate-400 leading-loose">
                            When we talk about “epigenetics” in an energetic language, we’re really talking about how fields, flows, and structural context guide which parts of the DNA script are active.
                        </p>
                    </div>
                </div>
            </section>

            {/* Cards - Glassmorphism Dark */}
            <section className="py-20 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#101020]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Resonance", icon: "✺", text: "Minerals act as co-coders, tuning the helix." },
                            { title: "Flow", icon: "≈", text: "Proton gradients drive the energy of life." },
                            { title: "Geometry", icon: "⬡", text: "Lattices provide the stability for memory." }
                        ].map((card, i) => (
                            <div key={i} className="soft-reveal p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group">
                                <div className="text-4xl text-purple-400 mb-6 font-light group-hover:scale-110 transition-transform origin-left">{card.icon}</div>
                                <h3 className="text-xl font-medium text-white mb-3">{card.title}</h3>
                                <p className="text-slate-400">{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-20 text-center text-slate-600 text-sm">
                <p>CONCEPT V2 · ANDARA IONIC</p>
            </footer>
        </div>
    );
}
