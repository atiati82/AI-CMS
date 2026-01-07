import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Droplets, Gem, Hexagon, Beaker, BookOpen, Map, ArrowRight,
    Activity, Search, FlaskConical, HelpCircle, Lightbulb, ArrowUpRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function StickyNav() {
    return (
        <div className="sticky top-6 z-50 flex justify-center pointer-events-none mix-blend-difference">
            <nav className="pointer-events-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-2 py-2 flex items-center gap-2">
                {["Pillars", "Beginner", "Experiments", "Topics", "DAQ"].map(item => (
                    <button
                        key={item}
                        onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-4 py-1.5 rounded-full text-xs font-medium text-white/80 hover:bg-white/20 transition-all"
                    >
                        {item}
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default function ScienceHubV2() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Image Parallax
            gsap.to(".hero-constellation", {
                yPercent: 15,
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Staggered Cards
            const sections = gsap.utils.toArray(".stagger-grid");
            sections.forEach((section: any) => {
                gsap.from(section.children, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Section Headers
            gsap.utils.toArray(".section-head").forEach((head: any) => {
                gsap.from(head, {
                    opacity: 0,
                    x: -30,
                    duration: 1,
                    scrollTrigger: {
                        trigger: head,
                        start: "top 85%",
                    }
                })
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#020204] min-h-screen text-slate-200 font-sans selection:bg-teal-500/30">
            <StickyNav />
            {/* Hero Section */}
            <section className="hero-section relative min-h-[60vh] flex items-center justify-center overflow-hidden pb-20">
                <div
                    className="hero-constellation absolute inset-0 bg-cover bg-center opacity-80"
                    style={{ backgroundImage: "url('/images/concepts/science-hub-constellation.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020204]/60 to-[#020204]" />

                <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs tracking-widest uppercase backdrop-blur-md">
                        <Search size={12} /> Knowledge Nexus
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-none">
                        Science <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400">Library</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Water Science · Mineral Blueprints · Crystalline Fields
                    </p>
                    <p className="mt-6 text-sm text-slate-500 max-w-lg mx-auto">
                        A living map of connected domains. Turn complex theory into structured understanding.
                    </p>
                </div>
            </section>

            {/* Organization Grid */}
            <section className="py-12 px-6 relative z-10 -mt-12">
                <div className="max-w-6xl mx-auto stagger-grid grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Hubs", desc: "Main Pillars", icon: Map, color: "text-teal-400" },
                        { label: "Articles", desc: "Concepts", icon: BookOpen, color: "text-blue-400" },
                        { label: "Protocols", desc: "Experiments", icon: FlaskConical, color: "text-purple-400" },
                        { label: "Glossary", desc: "Definitions", icon: Search, color: "text-amber-400" },
                    ].map((item, i) => (
                        <div key={i} className="bg-[#0b0c15]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-white/30 transition-all group cursor-default">
                            <item.icon className={`w-8 h-8 ${item.color} mb-4 group-hover:scale-110 transition-transform`} />
                            <div className="font-bold text-white text-lg">{item.label}</div>
                            <div className="text-xs text-white/40">{item.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Three Pillars */}
            <section id="pillars" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="section-head mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">The Three Pillars</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full" />
                    </div>

                    <div className="stagger-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Pillar 1 */}
                        <Link href="/water-science-architecture-of-life" className="group bg-[#080910] border border-white/10 rounded-3xl p-8 hover:bg-[#0f111a] hover:border-teal-500/30 transition-all flex flex-col h-full">
                            <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Droplets className="text-teal-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Water Science</h3>
                            <p className="text-slate-400 mb-6 flex-grow">Liquid architecture, EZ phases, and structuring via vortex technologies. Understanding water as a programmable medium.</p>
                            <div className="flex items-center gap-2 text-sm text-teal-400 font-medium mt-auto group-hover:translate-x-2 transition-transform">
                                Explore Domain <ArrowRight size={16} />
                            </div>
                        </Link>

                        {/* Pillar 2 */}
                        <Link href="/mineral-science-blueprint" className="group bg-[#080910] border border-white/10 rounded-3xl p-8 hover:bg-[#0f111a] hover:border-blue-500/30 transition-all flex flex-col h-full">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Gem className="text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Mineral Science</h3>
                            <p className="text-slate-400 mb-6 flex-grow">Elemental blueprints, Ionic vs Colloidal states, and Sulphate chemistry pathways. The hardware of biology.</p>
                            <div className="flex items-center gap-2 text-sm text-blue-400 font-medium mt-auto group-hover:translate-x-2 transition-transform">
                                Explore Domain <ArrowRight size={16} />
                            </div>
                        </Link>

                        {/* Pillar 3 */}
                        <Link href="/crystalline-matrix-hub" className="group bg-[#080910] border border-white/10 rounded-3xl p-8 hover:bg-[#0f111a] hover:border-purple-500/30 transition-all flex flex-col h-full">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Hexagon className="text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Crystalline Fields</h3>
                            <p className="text-slate-400 mb-6 flex-grow">Geometry, lattice language, and field interactions. How form and pattern dictate energy flow in nature.</p>
                            <div className="flex items-center gap-2 text-sm text-purple-400 font-medium mt-auto group-hover:translate-x-2 transition-transform">
                                Explore Domain <ArrowRight size={16} />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Beginner Path */}
            <section id="beginner" className="py-32 px-6 bg-[#05060a] border-y border-white/5 relative overflow-hidden">
                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

                <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="section-head">
                        <div className="inline-block px-3 py-1 rounded bg-amber-400/10 text-amber-400 text-xs font-bold uppercase mb-6">Start Here</div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">New to this? <br />Start with definitions.</h2>
                        <p className="text-lg text-slate-400 mb-8">
                            Don't start with exotic theory. Start with definitions + measurement. This sequence builds your foundation step-by-step.
                        </p>

                        <div className="space-y-4">
                            {[
                                { step: "01", label: "Water Basics", link: "/structured-water-basics" },
                                { step: "02", label: "EZ Overview", link: "/ez-water-overview" },
                                { step: "03", label: "Ionic Minerals", link: "/ionic-minerals" },
                                { step: "04", label: "Sulfate Bridge", link: "/sulfate-ion" },
                                { step: "05", label: "Measurement", link: "/home-water-test-kit" },
                            ].map((item) => (
                                <Link key={item.step} href={item.link} className="flex items-center gap-6 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-amber-400/30 group">
                                    <span className="text-sm font-mono text-amber-400/50 group-hover:text-amber-400">STEP {item.step}</span>
                                    <span className="text-lg font-medium text-white">{item.label}</span>
                                    <ArrowRight className="ml-auto text-white/20 group-hover:text-amber-400 transition-colors" size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="relative flex justify-center">
                        <div className="w-[400px] h-[400px] rounded-full border border-amber-400/10 flex items-center justify-center relative animate-[spin_60s_linear_infinite]">
                            <div className="absolute inset-0 border border-t-amber-400/30 border-r-transparent border-b-amber-400/30 border-l-transparent rounded-full" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <Lightbulb className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                            <div className="text-white font-bold text-xl">Beginner <br />Sequence</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Topics Explorer */}
            <section id="topics" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="section-head mb-16 text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">Topic Explorer</h2>
                        <div className="h-1 w-20 bg-white/20 rounded-full mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            {
                                title: "Water Science", icon: Droplets, color: "text-teal-400",
                                links: [
                                    { t: "Architecture of Life", h: "/water-science-architecture-of-life" },
                                    { t: "Phases of Water", h: "/phases-of-water" },
                                    { t: "EZ Water Overview", h: "/ez-water-overview" },
                                    { t: "Vortex Technologies", h: "/vortex-technologies" }
                                ]
                            },
                            {
                                title: "Mineral Science", icon: Gem, color: "text-blue-400",
                                links: [
                                    { t: "Mineral Blueprint", h: "/mineral-science-blueprint" },
                                    { t: "Ionic Minerals", h: "/ionic-minerals" },
                                    { t: "Sulphate Minerals", h: "/sulphate-minerals" },
                                    { t: "Sulfate Chemistry", h: "/sulfate-chemistry" }
                                ]
                            },
                            {
                                title: "Crystalline Fields", icon: Hexagon, color: "text-purple-400",
                                links: [
                                    { t: "Matrix Hub", h: "/crystalline-matrix-hub" },
                                    { t: "Tetrahedral Geometry", h: "/tetrahedral-sulfate-geometry" },
                                    { t: "3-6-9 Harmonics", h: "/three-six-nine-harmonics" },
                                    { t: "Light Lattices", h: "/light-lattices-photonic-flow" }
                                ]
                            },
                            {
                                title: "Bioelectricity", icon: Activity, color: "text-red-400",
                                links: [
                                    { t: "Bioelectric Water", h: "/bioelectric-water" },
                                    { t: "Invisible Voltage", h: "/bioelectricity-invisible-voltage" },
                                    { t: "Proton Gradients", h: "/proton-gradients-energy-transfer" },
                                    { t: "Cell Battery Model", h: "/cell-membrane-electric-model" }
                                ]
                            }
                        ].map((cluster, i) => (
                            <div key={i} className="space-y-6 stagger-grid">
                                <div className="flex items-center gap-3 text-xl font-bold text-white">
                                    <cluster.icon className={`w-5 h-5 ${cluster.color}`} /> {cluster.title}
                                </div>
                                <ul className="space-y-3">
                                    {cluster.links.map((l, j) => (
                                        <li key={j}>
                                            <Link href={l.h} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                                <div className={`w-1 h-1 rounded-full ${cluster.color.replace('text', 'bg')} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                                {l.t}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experiments Section */}
            <section id="experiments" className="py-24 px-6 bg-[#080910] text-center">
                <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#10121d] to-[#05050a] border border-white/10 p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />

                    <div className="relative z-10">
                        <FlaskConical className="w-12 h-12 text-blue-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">Citizen Science & Measurement</h2>
                        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                            Verify our claims yourself. This library is designed to produce repeatable observations using standard water quality tools.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/experiments-index" className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors">
                                Experiments Index
                            </Link>
                            <Link href="/experiments-measurements-overview" className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors">
                                Measurement Overview
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-20 text-center text-slate-800 text-sm">
                <p>ANDARA IONIC · KNOWLEDGE NEXUS</p>
            </footer>
        </div>
    );
}
