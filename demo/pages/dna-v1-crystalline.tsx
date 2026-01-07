import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function DnaV1Crystalline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Parallax
            gsap.to(".hero-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Text Fade In
            gsap.from(".hero-title span", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "power4.out",
            });

            // Content Reveal
            gsap.utils.toArray(".reveal-text").forEach((el: any) => {
                gsap.from(el, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#050510] min-h-screen text-slate-100 font-sans selection:bg-teal-500/30">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link href="/science/dna-mineral-codes" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-teal-400 transition-colors">
                    <ArrowLeft size={16} /> Back to Classic
                </Link>
                <div className="text-xs tracking-[0.3em] opacity-60">CONCEPT V1 · CRYSTALLINE</div>
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="hero-bg absolute inset-0 w-full h-[120%] bg-cover bg-center z-0 opacity-80"
                    style={{ backgroundImage: "url('/images/concepts/dna-crystalline.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050510]/30 to-[#050510] z-10" />

                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                    <h1 className="hero-title text-6xl md:text-9xl font-sans tracking-tight font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6 leading-none">
                        <span className="block">The Living</span>
                        <span className="block">Crystalline</span>
                        <span className="block italic font-light text-teal-200">Antenna</span>
                    </h1>
                    <p className="reveal-text text-lg md:text-xl font-light tracking-wide text-slate-300 max-w-2xl mx-auto mt-8">
                        DNA is not just code. It is a helix of light, suspended in a mineral lattice.
                    </p>
                </div>
            </section>

            {/* Content Section 1 */}
            <section className="relative py-32 px-6 z-20">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="reveal-text">
                        <h2 className="text-4xl md:text-5xl font-sans font-bold mb-6 text-white leading-tight">
                            A Structural <br /> <span className="text-teal-400 italic">Memory field</span>
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed mb-6">
                            When we look at DNA through the lens of terrain, we see more than a sequence of letters. We see a geometric antenna that resonates with the minerals and water around it.
                        </p>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Magnesium, Zinc, and Phosphate form the crystalline scaffold that holds this antenna in tune.
                        </p>
                    </div>
                    <div className="reveal-text relative aspect-square border border-teal-500/20 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-teal-500/10 animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3/4 h-3/4 border border-teal-500/30 rounded-full flex items-center justify-center">
                                <div className="w-1/2 h-1/2 bg-teal-500/20 blur-2xl rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Parallax Strip */}
            <section className="relative h-[60vh] flex items-center overflow-hidden my-20">
                <div
                    className="absolute inset-0 bg-fixed bg-cover bg-center opacity-40"
                    style={{ backgroundImage: "url('/images/concepts/dna-crystalline.png')" }}
                />
                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <p className="reveal-text text-4xl md:text-6xl font-sans font-light leading-tight text-white tracking-tight">
                        "The body behaves like a <span className="text-teal-300 font-bold italic">liquid crystal</span>.<br />
                        Ordered water and molecules forming structured, field-sensitive phases."
                    </p>
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-32 px-6 bg-[#080814]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Magnesium", desc: "The silent guardian that stabilizes the helix backbone." },
                            { title: "Structured Water", desc: "The liquid medium that allows charge separation." },
                            { title: "Terrain Memory", desc: "How environment shapes structural habits over time." }
                        ].map((item, i) => (
                            <div key={i} className="reveal-text group p-8 border border-white/10 hover:border-teal-500/30 transition-colors duration-500">
                                <div className="text-teal-500 mb-4 text-sm tracking-widest font-mono">0{i + 1}</div>
                                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-teal-200 transition-colors">{item.title}</h3>
                                <p className="text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-20 text-center text-slate-600 text-sm">
                <p>CONCEPT V1 · ANDARA IONIC</p>
            </footer>
        </div>
    );
}
