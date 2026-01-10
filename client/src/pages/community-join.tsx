import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function CommunityJoinPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    // Warm coral/rose accent for Community
    const accentColor = "#f43f5e";
    const accentGradient = "from-[#f43f5e] via-[#fb7185] to-[#f43f5e]";

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as Easing } }
    };

    const staggerContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
    };

    return (
        <Layout>
            <Helmet>
                <title>Join the Andara Community – Terrain Observers Welcome | Andara</title>
                <meta name="description" content="Join a community of thoughtful observers, water-curious explorers, and terrain-minded individuals. Share findings, ask questions, and help the knowledge grow. No guru culture, just shared curiosity." />
                <meta name="keywords" content="andara community, join andara, terrain community, water science community, mineral water explorers, wellness community" />
            </Helmet>

            <div
                ref={containerRef}
                className="andara-page"
                data-tree="community"
                style={{ backgroundColor: "#020617" }}
            >
                {/* Scroll Progress */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
                    style={{ scaleX: scrollYProgress, backgroundColor: accentColor }}
                />

                {/* --- HERO SECTION --- */}
                <motion.section
                    className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
                    style={{ opacity: heroOpacity, scale: heroScale }}
                >
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0508] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}12` }} />
                        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 blur-[120px] rounded-full" style={{ backgroundColor: "#8b5cf612" }} />
                        {/* Floating community particles */}
                        {Array.from({ length: 15 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: Math.random() * 10 + 5,
                                    height: Math.random() * 10 + 5,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    backgroundColor: `${accentColor}30`,
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    x: [0, Math.random() * 20 - 10, 0],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: Math.random() * 8 + 6,
                                    repeat: Infinity,
                                    ease: "easeInOut" as Easing
                                }}
                            />
                        ))}
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6"
                                style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Community · Onboarding</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Join the <br />
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentGradient} bg-[length:200%_auto] animate-gradient`}>
                                    Community
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-4 max-w-2xl mx-auto">
                                <strong className="text-white">A Space for Observers, Not Followers</strong>
                            </p>
                            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto">
                                No cult. No guru. No "I will tell you what to believe".
                                Just a shared landscape of explorers comparing notes on water, minerals and terrain.
                            </p>

                            <button
                                onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105"
                                style={{ backgroundColor: accentColor, color: "white", boxShadow: `0 0 30px ${accentColor}40` }}
                            >
                                Learn How to Join
                            </button>
                        </motion.div>
                    </div>
                </motion.section>


                {/* --- SECTION 1: WHO IS THIS FOR --- */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                1. Who Is This For?
                            </h2>
                        </motion.header>

                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {[
                                { icon: "🌊", title: "Water-Curious Explorers", desc: "Those experimenting with filters, structuring, mineralization and wondering what actually works." },
                                { icon: "🔬", title: "Terrain Thinkers", desc: "Anyone who resonates with the idea that health is less about symptoms and more about the medium they arise from." },
                                { icon: "📸", title: "Documentation Enthusiasts", desc: "People who enjoy taking photos, measuring values, and comparing notes rather than arguing ideologies." },
                                { icon: "🪴", title: "Gardeners & Farmers", desc: "Practical-minded folks using minerals on soil, plants, seeds, and noticing what the terrain responds to." },
                                { icon: "🐾", title: "Pet & Animal Observers", desc: "Those adding minerals to animal water and watching behavior, coat quality, or vitality signals." },
                                { icon: "🧘", title: "Wellness Practitioners", desc: "Therapists, coaches, or facilitators interested in terrain language for hydration & mineral education." },
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp}
                                    className="p-6 rounded-2xl border border-white/10 bg-white/5">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="text-lg text-white font-medium mb-2">{item.title}</h3>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 2: WHAT COMMUNITY LOOKS LIKE --- */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                2. What Does the Community Look Like?
                            </h2>
                        </motion.header>

                        <motion.div
                            className="max-w-4xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <div className="p-8 rounded-2xl border border-white/20 bg-white/5">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl text-white font-medium mb-4">🌐 Online Spaces</h3>
                                        <ul className="space-y-3 text-white/70 text-sm">
                                            <li className="flex items-start gap-2">
                                                <span style={{ color: accentColor }}>→</span>
                                                <span>Optional Telegram or private forum (invite-based, low volume)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span style={{ color: accentColor }}>→</span>
                                                <span>Shared photo albums and experiment logs</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span style={{ color: accentColor }}>→</span>
                                                <span>Q&A threads where questions live longer than tweets</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl text-white font-medium mb-4">📧 Email Touchpoints</h3>
                                        <ul className="space-y-3 text-white/70 text-sm">
                                            <li className="flex items-start gap-2">
                                                <span style={{ color: accentColor }}>→</span>
                                                <span>Periodic updates: new library articles, product news, experiments</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span style={{ color: accentColor }}>→</span>
                                                <span>Invitations to deeper resources or events</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span style={{ color: accentColor }}>→</span>
                                                <span>Not daily flooding. Curated rhythm.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 3: COMMUNITY VALUES --- */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                3. The Values That Shape This Space
                            </h2>
                        </motion.header>

                        <motion.div
                            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {[
                                { value: "Kindness Over Expertise", desc: "We don't need to prove who knows more. Newcomers are welcome, questions are never dumb." },
                                { value: "No Diagnosis Culture", desc: "We do not tell each other what to do with our health. We share observations, never prescriptions." },
                                { value: "Document Before Claim", desc: "Photos, measurements, logs – we admire evidence and accept 'I don't know' as a valid answer." },
                                { value: "Slow Rhythm", desc: "No pressure to respond fast. Asynchronous, thoughtful, no FOMO mechanics." },
                            ].map((item) => (
                                <motion.div key={item.value} variants={fadeUp}
                                    className="p-6 rounded-xl border border-white/10 bg-white/5">
                                    <h3 className="text-lg font-medium mb-2" style={{ color: accentColor }}>{item.value}</h3>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 4: HOW TO JOIN --- */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                4. How to Join
                            </h2>
                        </motion.header>

                        <motion.div
                            className="max-w-3xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <div className="space-y-6">
                                {[
                                    { step: "1", title: "Join the Email List", desc: "Start by signing up for our newsletter. Low-frequency, zero spam, always opt-out friendly." },
                                    { step: "2", title: "Get the Welcome Sequence", desc: "A few emails introducing the terrain framework, the library structure, and how to navigate." },
                                    { step: "3", title: "Receive Invitations", desc: "After some time, you'll be invited to deeper community layers – groups, calls, or shared experiments." },
                                    { step: "4", title: "Contribute (If You Want)", desc: "Share photos, logs, questions, or simply observe. No pressure to perform." },
                                ].map((item) => (
                                    <motion.div key={item.step} variants={fadeUp}
                                        className="flex gap-6 items-start p-6 rounded-xl border border-white/10 bg-white/5">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
                                            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                                            {item.step}
                                        </div>
                                        <div>
                                            <h3 className="text-lg text-white font-medium mb-1">{item.title}</h3>
                                            <p className="text-white/60 text-sm">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                className="mt-12 p-8 rounded-2xl border-2 text-center"
                                variants={fadeUp}
                                style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}08` }}
                            >
                                <h3 className="text-2xl text-white font-medium mb-4">Ready to Join?</h3>
                                <p className="text-white/70 mb-6">
                                    Enter your email to receive the Welcome Sequence and stay connected.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-rose-500"
                                    />
                                    <button
                                        className="px-6 py-3 font-bold rounded-lg transition-all hover:scale-105"
                                        style={{ backgroundColor: accentColor, color: "white" }}
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                <p className="text-white/40 text-xs mt-4">
                                    We respect your inbox. Unsubscribe anytime.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 5: NOT FOR EVERYONE --- */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                5. This Might Not Be For You If...
                            </h2>
                        </motion.header>

                        <motion.div
                            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {[
                                "You want quick-fix protocols and bold promises",
                                "You prefer debate over documentation",
                                "You want to be told exactly what to do",
                                "You're looking for a guru or spiritual leader",
                            ].map((item) => (
                                <motion.div key={item} variants={fadeUp}
                                    className="p-5 rounded-xl border border-red-500/20 bg-red-950/10 flex items-center gap-4">
                                    <span className="text-red-400 text-xl">✕</span>
                                    <p className="text-white/70 text-sm">{item}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-white/10 bg-white/5 text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <p className="text-white/80">
                                This is a space for <strong className="text-white">curious, patient, self-directed people</strong>
                                who want to explore terrain with kindness and without pressure.
                            </p>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 6: NEXT STEPS --- */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div
                            className="max-w-3xl mx-auto text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">
                                Explore More
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/vision-mission">
                                    <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-rose-500/50 transition-all group">
                                        <span className="text-white group-hover:text-rose-400 transition-colors">Vision & Mission →</span>
                                        <p className="text-white/50 text-sm mt-2">Why Andara exists</p>
                                    </a>
                                </Link>
                                <Link href="/timeline">
                                    <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-rose-500/50 transition-all group">
                                        <span className="text-white group-hover:text-rose-400 transition-colors">Timeline →</span>
                                        <p className="text-white/50 text-sm mt-2">Our journey so far</p>
                                    </a>
                                </Link>
                                <Link href="/science-library">
                                    <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-rose-500/50 transition-all group">
                                        <span className="text-white group-hover:text-rose-400 transition-colors">Science Library →</span>
                                        <p className="text-white/50 text-sm mt-2">Start learning</p>
                                    </a>
                                </Link>
                                <Link href="/shop">
                                    <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-rose-500/50 transition-all group">
                                        <span className="text-white group-hover:text-rose-400 transition-colors">Shop →</span>
                                        <p className="text-white/50 text-sm mt-2">Explore products</p>
                                    </a>
                                </Link>
                            </div>

                            <p className="text-white/50 text-sm mt-12 max-w-xl mx-auto">
                                Join when it feels right. We'll be here, slowly building, observing,
                                and sharing what we notice along the way.
                            </p>
                        </motion.div>
                    </div>
                </section>

            </div>
        </Layout>
    );
}
