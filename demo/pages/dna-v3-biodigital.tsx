import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Terminal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function DnaV3Biodigital() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [codeText, setCodeText] = useState("");

    useEffect(() => {
        // Typing effect simulation
        const fullText = "LOADING MINERAL_CODES... \n> INITIALIZING MAGNESIUM_LATTICE... \n> SYNCING WATER_PHASES... \n> STATUS: ACTIVE";
        let i = 0;
        const interval = setInterval(() => {
            setCodeText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);

        const ctx = gsap.context(() => {
            // Glitch reveals
            gsap.utils.toArray(".glitch-reveal").forEach((el: any) => {
                gsap.fromTo(el,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Scanline effect on image
            gsap.to(".scanner-line", {
                top: "100%",
                duration: 3,
                repeat: -1,
                ease: "linear"
            });

        }, containerRef);
        return () => {
            clearInterval(interval);
            ctx.revert();
        }
    }, []);

    return (
        <div ref={containerRef} className="bg-[#020202] min-h-screen text-[#00ff9d] font-mono selection:bg-[#00ff9d] selection:text-black">
            {/* Grid Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
                style={{ backgroundImage: "linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            {/* Nav */}
            <nav className="fixed top-0 left-0 w-full z-50 p-4 border-b border-[#00ff9d]/20 bg-black/90 flex justify-between items-center text-xs">
                <Link href="/science/dna-mineral-codes" className="hover:bg-[#00ff9d] hover:text-black px-2 py-1 transition-colors flex items-center gap-2">
                    [<ArrowLeft size={10} /> BACK]
                </Link>
                <div>SYSTEM: BIO-DIGITAL_V3</div>
                <div>STATUS: ONLINE</div>
            </nav>

            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 border-b border-[#00ff9d]/20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="order-2 lg:order-1 self-end">
                        <div className="mb-8 min-h-[100px] text-sm opacity-70 whitespace-pre-line border-l-2 border-[#00ff9d] pl-4">
                            {codeText}<span className="animate-pulse">_</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold uppercase leading-none tracking-tighter mb-4 glitch-reveal">
                            Structural<br />
                            Memory<br />
                            Protocol
                        </h1>
                        <p className="glitch-reveal text-white/60 max-w-md text-sm mt-6">
                            [DATA] DNA is the hard drive. Minerals are the read/write heads. The Terrain is the operating system.
                        </p>
                        <button className="mt-8 border border-[#00ff9d] text-[#00ff9d] px-6 py-3 text-sm hover:bg-[#00ff9d] hover:text-black transition-all uppercase tracking-widest glitch-reveal">
                            Initialize Sequence
                        </button>
                    </div>

                    <div className="order-1 lg:order-2 relative aspect-square border border-[#00ff9d]/30 p-2">
                        {/* Image Container with Scanline */}
                        <div className="relative w-full h-full overflow-hidden bg-black">
                            <img src="/images/concepts/dna-biodigital.png" className="w-full h-full object-cover opacity-80" alt="Bio Digital DNA" />
                            <div className="scanner-line absolute left-0 right-0 h-[2px] bg-[#00ff9d] shadow-[0_0_10px_#00ff9d] top-0" />
                            <div className="absolute bottom-4 left-4 text-[10px] text-[#00ff9d]">FIG. 01: DIGITAL HELIX VISUALIZATION</div>
                        </div>
                        {/* Decorative Corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#00ff9d]" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#00ff9d]" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#00ff9d]" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#00ff9d]" />
                    </div>
                </div>
            </section>

            {/* Data Blocks */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { head: "INPUT_A", label: "Magnesium", val: "STABLE" },
                            { head: "INPUT_B", label: "Zinc Ions", val: "DETECTED" },
                            { head: "FIELD_Z", label: "Bio-Voltage", val: "OPTIMAL" },
                            { head: "MATRIX", label: "Hydration", val: "EZ-PHASE" }
                        ].map((item, i) => (
                            <div key={i} className="glitch-reveal border border-[#00ff9d]/20 p-4 hover:bg-[#00ff9d]/5 transition-colors">
                                <div className="text-[10px] opacity-50 mb-2">{item.head}</div>
                                <div className="text-xl font-bold mb-1">{item.label}</div>
                                <div className="text-xs text-white/50 flex justify-between">
                                    <span>STATUS:</span>
                                    <span className="text-[#00ff9d]">{item.val}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Terminal */}
            <section className="py-20 px-6 max-w-5xl mx-auto">
                <div className="border border-[#00ff9d]/30 bg-black/50 p-6 md:p-12 relative">
                    <div className="absolute -top-3 -left-3 bg-black border border-[#00ff9d] px-2 text-xs">TERMINAL_OUTPUT</div>
                    <p className="glitch-reveal text-lg md:text-2xl leading-relaxed text-white/90">
                        &gt;&gt; "The body behaves like a liquid crystal. Ordered water and molecules forming structured, field-sensitive phases." <br /><br />
                        &gt;&gt; SYSTEM_NOTE: DNA lives inside this liquid crystal body. It is not just floating code; it is embedded in a dynamic, field-sensitive matrix.
                    </p>
                </div>
            </section>

            <footer className="border-t border-[#00ff9d]/20 py-12 px-6 text-center text-[10px] opacity-50">
                END_OF_LINE // CONCEPT V3
            </footer>
        </div>
    );
}
