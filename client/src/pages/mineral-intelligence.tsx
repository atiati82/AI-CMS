// @ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Brain, Zap, Network, Dna, Sparkles, ArrowRight, Activity, Droplets, Shield, CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';

// ============================================================================
// MINERAL INTELLIGENCE - State of the Art Animated Marketing Demo
// ============================================================================

// Particle Network Canvas Component
const ParticleNetwork = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }>>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize particles
        const particleCount = 80;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2
        }));

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        let animationId: number;
        const animate = () => {
            ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle, i) => {
                // Mouse attraction
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    particle.vx += dx * 0.00005;
                    particle.vy += dy * 0.00005;
                }

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Boundary wrap
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(52, 211, 153, ${particle.opacity})`;
                ctx.fill();

                // Draw connections
                particlesRef.current.slice(i + 1).forEach(other => {
                    const d = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2);
                    if (d < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - d / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const step = target / (duration * 60);
        const interval = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        return () => clearInterval(interval);
    }, [isInView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

// Progress Ring Component
const ProgressRing = ({ progress, size = 120, strokeWidth = 8, color = '#34d399' }: { progress: number; size?: number; strokeWidth?: number; color?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (isInView ? progress / 100 : 0) * circumference;

    return (
        <svg ref={ref} width={size} height={size} className="transform -rotate-90">
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={strokeWidth}
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
            />
        </svg>
    );
};

// Intelligence Pillar Card
const PillarCard = ({ icon: Icon, title, description, delay, color }: { icon: any; title: string; description: string; delay: number; color: string }) => (
    <motion.div
        className="relative flex-shrink-0 w-[300px] md:w-[350px] h-[400px] rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl overflow-hidden group cursor-pointer"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ scale: 1.03, borderColor: 'rgba(52, 211, 153, 0.5)' }}
    >
        {/* Glow effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${color}`} />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-cover" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-4">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

// Journey Stage Component
const JourneyStage = ({ number, title, description, isLast, delay }: { number: number; title: string; description: string; isLast?: boolean; delay: number }) => (
    <motion.div
        className="relative flex items-start gap-6"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        {/* Number badge */}
        <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xl font-bold text-black shadow-[0_0_30px_rgba(52,211,153,0.4)]">
            {number}
        </div>

        {/* Connector line */}
        {!isLast && (
            <motion.div
                className="absolute left-7 top-14 w-0.5 h-24 bg-gradient-to-b from-emerald-500/50 to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: delay + 0.3 }}
                style={{ originY: 0 }}
            />
        )}

        {/* Content */}
        <div className="pt-2">
            <h4 className="text-xl font-display font-bold text-white mb-2">{title}</h4>
            <p className="text-slate-400 max-w-md leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

// Comparison Card
const ComparisonCard = ({ title, features, type, icon: Icon }: { title: string; features: string[]; type: 'before' | 'after'; icon: any }) => (
    <motion.div
        className={`relative flex-1 rounded-3xl p-8 ${type === 'before'
            ? 'bg-slate-900/80 border border-slate-700/50'
            : 'bg-gradient-to-br from-emerald-950/80 to-slate-900/80 border border-emerald-500/30'
            } backdrop-blur-xl overflow-hidden`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
    >
        {/* Glow for 'after' card */}
        {type === 'after' && (
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
        )}

        <div className="relative z-10">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${type === 'before'
                ? 'bg-slate-800 text-slate-400'
                : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                <Icon className="w-3.5 h-3.5" />
                {type === 'before' ? 'Conventional' : 'Mineral Intelligence'}
            </div>

            <h3 className="text-3xl font-display font-bold text-white mb-6">{title}</h3>

            <ul className="space-y-4">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${type === 'before' ? 'text-slate-500' : 'text-emerald-400'
                            }`} />
                        <span className={type === 'before' ? 'text-slate-400' : 'text-slate-300'}>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
);

// ============================================================================
// SCROLL TRANSITION EFFECTS
// ============================================================================

// Scrolling Text Marquee Band
const ScrollTextMarquee = ({ text, direction = 'left', speed = 30 }: { text: string[]; direction?: 'left' | 'right'; speed?: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const x = useTransform(scrollYProgress, [0, 1], direction === 'left' ? [0, -500] : [-500, 0]);

    return (
        <div ref={ref} className="py-16 overflow-hidden relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10" />

            <motion.div
                className="flex whitespace-nowrap gap-16"
                style={{ x }}
            >
                {[...text, ...text, ...text].map((word, i) => (
                    <span
                        key={i}
                        className="text-7xl md:text-8xl font-display font-bold text-white/[0.03] uppercase tracking-wider"
                    >
                        {word}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

// Glowing Gradient Line Divider
const GradientDivider = ({ color = 'emerald' }: { color?: 'emerald' | 'cyan' | 'purple' }) => {
    const colors = {
        emerald: 'from-transparent via-emerald-500/50 to-transparent',
        cyan: 'from-transparent via-cyan-500/50 to-transparent',
        purple: 'from-transparent via-purple-500/50 to-transparent',
    };
    const glowColors = {
        emerald: 'rgba(52,211,153,0.3)',
        cyan: 'rgba(6,182,212,0.3)',
        purple: 'rgba(168,85,247,0.3)',
    };

    return (
        <motion.div
            className="relative py-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <motion.div
                className={`h-px w-full bg-gradient-to-r ${colors[color]}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            {/* Glow pulse */}
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 rounded-full blur-xl"
                style={{ background: glowColors[color] }}
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.div>
    );
};

// SVG Wave Transition
const WaveTransition = ({ flip = false }: { flip?: boolean }) => (
    <div className={`relative w-full h-24 overflow-hidden ${flip ? 'rotate-180' : ''}`}>
        <motion.svg
            viewBox="0 0 1440 120"
            className="absolute bottom-0 w-full h-full"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <motion.path
                d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
                fill="url(#waveGradient)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
            />
            <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(52,211,153,0.1)" />
                    <stop offset="50%" stopColor="rgba(6,182,212,0.2)" />
                    <stop offset="100%" stopColor="rgba(52,211,153,0.1)" />
                </linearGradient>
            </defs>
        </motion.svg>
    </div>
);

// Section Reveal Wrapper with scale effect
const SectionReveal = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
    >
        {children}
    </motion.div>
);

// Floating Particles Divider
const ParticleDivider = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
    }));

    return (
        <div className="relative h-32 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-emerald-400"
                    style={{
                        left: `${p.x}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [-20, 60],
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        </div>
    );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MineralIntelligenceDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Mouse parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    const pillars = [
        { icon: Network, title: 'Signal Recognition', description: 'Ionic minerals carry electromagnetic signatures that cells recognize and respond to at the quantum level.', color: 'from-cyan-500/10 to-transparent' },
        { icon: Brain, title: 'Neural Resonance', description: 'The brain\'s electrical network harmonizes with mineral frequencies, enhancing cognitive coherence.', color: 'from-purple-500/10 to-transparent' },
        { icon: Dna, title: 'Genetic Expression', description: 'Trace minerals activate dormant genetic pathways, unlocking cellular potential.', color: 'from-emerald-500/10 to-transparent' },
        { icon: Sparkles, title: 'Bioelectric Amplification', description: 'Sulfate structures amplify the body\'s natural voltage, powering detox and repair.', color: 'from-pink-500/10 to-transparent' },
    ];

    const journeyStages = [
        { title: 'Primordial Source', description: 'Harvested from ancient volcanic mineral veins, untouched for millennia.' },
        { title: 'Ionic Purification', description: 'Dissolved into pure ionic form — the most bioavailable state possible.' },
        { title: 'Structural Activation', description: 'Energetically aligned through crystalline lattice structuring.' },
        { title: 'Cellular Integration', description: 'Delivered to every cell, speaking the language of biology.' },
    ];

    return (
        <div
            ref={containerRef}
            className="relative min-h-[600vh] bg-[#020617] text-slate-100 font-sans overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Particle Network Background */}
            <ParticleNetwork />

            {/* Ambient Gradient Orbs */}
            <div className="fixed inset-0 pointer-events-none z-[1]">
                <motion.div
                    className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(52,211,153,0.6) 0%, transparent 70%)',
                        x: useTransform(smoothMouseX, [-0.5, 0.5], [-80, 80]),
                        y: useTransform(smoothMouseY, [-0.5, 0.5], [-80, 80]),
                    }}
                />
                <motion.div
                    className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-25"
                    style={{
                        background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)',
                        x: useTransform(smoothMouseX, [-0.5, 0.5], [60, -60]),
                        y: useTransform(smoothMouseY, [-0.5, 0.5], [60, -60]),
                    }}
                />
            </div>

            {/* =========================================== */}
            {/* SECTION 1: HERO - THE NEURAL FIELD */}
            {/* =========================================== */}
            <section className="relative min-h-screen flex items-center justify-center z-10 perspective-[1000px]">
                <motion.div
                    className="relative text-center z-20 px-6"
                    style={{
                        rotateX: useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]),
                        rotateY: useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]),
                    }}
                >
                    {/* Floating Keywords */}
                    <div className="absolute inset-0 pointer-events-none">
                        {['IONIC', 'SULFATE', 'COHERENCE', 'RESONANCE'].map((word, i) => (
                            <motion.span
                                key={word}
                                className="absolute text-[10px] tracking-[0.4em] text-emerald-500/30 font-bold uppercase"
                                style={{
                                    left: `${20 + i * 20}%`,
                                    top: `${30 + (i % 2) * 40}%`,
                                }}
                                animate={{
                                    y: [0, -15, 0],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 4 + i,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: i * 0.5,
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>

                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs tracking-[0.3em] uppercase mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Brain className="w-4 h-4" />
                        Next-Generation Mineral Science
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        className="text-[12vw] md:text-[10vw] font-display font-bold leading-[0.9] tracking-tighter mb-6"
                        initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-emerald-100 to-slate-400">
                            Mineral
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 animate-gradient bg-300%">
                            Intelligence
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Beyond supplementation. Minerals that <em className="text-emerald-400">communicate</em> with your cells,
                        carrying encoded information from Earth's deepest layers.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Link href="/products/andara-ionic-100ml">
                            <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] transition-all duration-300 flex items-center gap-2">
                                Experience Intelligence
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <button className="px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/5 transition-all backdrop-blur-sm">
                            Explore the Science
                        </button>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500">Scroll to Discover</span>
                    <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* SCROLL TRANSITION: Hero to Pillars */}
            <ScrollTextMarquee text={['IONIC', 'INTELLIGENCE', 'PRIMORDIAL', 'COHERENCE', 'STRUCTURED']} direction="left" />
            <GradientDivider color="emerald" />

            {/* =========================================== */}
            {/* SECTION 2: THE INTELLIGENCE SPECTRUM */}
            {/* =========================================== */}
            <section className="relative min-h-screen py-32 z-10">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-emerald-400 text-sm tracking-[0.3em] uppercase font-bold mb-4 block">The Four Pillars</span>
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
                            <span className="text-white">How Minerals</span><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Think</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Every ion carries information. Here's how they communicate with your biology.
                        </p>
                    </motion.div>

                    {/* Pillar Cards */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {pillars.map((pillar, i) => (
                            <PillarCard key={pillar.title} {...pillar} delay={i * 0.15} />
                        ))}
                    </div>
                </div>
            </section>

            {/* SCROLL TRANSITION: Pillars to Data */}
            <ParticleDivider />
            <WaveTransition />

            {/* =========================================== */}
            {/* SECTION 3: DATA VISUALIZATION */}
            {/* =========================================== */}
            <section className="relative min-h-screen py-32 z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-cyan-400 text-sm tracking-[0.3em] uppercase font-bold mb-4 block">Quantified Intelligence</span>
                        <h2 className="text-5xl md:text-6xl font-display font-bold text-white">
                            The Numbers Speak
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Stat Card 1 */}
                        <motion.div
                            className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0 }}
                        >
                            <div className="flex justify-center mb-6">
                                <ProgressRing progress={98} color="#34d399" />
                            </div>
                            <div className="text-5xl font-display font-bold text-white mb-2">
                                <AnimatedCounter target={98} suffix="%" />
                            </div>
                            <p className="text-slate-400">Ionic Bioavailability</p>
                        </motion.div>

                        {/* Stat Card 2 */}
                        <motion.div
                            className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                        >
                            <div className="flex justify-center mb-6">
                                <ProgressRing progress={72} color="#06b6d4" />
                            </div>
                            <div className="text-5xl font-display font-bold text-white mb-2">
                                <AnimatedCounter target={72} />+
                            </div>
                            <p className="text-slate-400">Trace Mineral Elements</p>
                        </motion.div>

                        {/* Stat Card 3 */}
                        <motion.div
                            className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex justify-center mb-6">
                                <ProgressRing progress={100} color="#a855f7" />
                            </div>
                            <div className="text-5xl font-display font-bold text-white mb-2">
                                <AnimatedCounter target={12} />M+
                            </div>
                            <p className="text-slate-400">Years of Mineral Formation</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SCROLL TRANSITION: Data to Journey */}
            <GradientDivider color="cyan" />
            <ScrollTextMarquee text={['SOURCE', 'PURIFICATION', 'ACTIVATION', 'INTEGRATION', 'RESONANCE']} direction="right" />

            {/* =========================================== */}
            {/* SECTION 4: THE JOURNEY */}
            {/* =========================================== */}
            <section className="relative min-h-screen py-32 z-10">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-purple-400 text-sm tracking-[0.3em] uppercase font-bold mb-4 block">From Source to Cell</span>
                        <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
                            The Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Journey</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-16">
                        {journeyStages.map((stage, i) => (
                            <JourneyStage
                                key={stage.title}
                                number={i + 1}
                                title={stage.title}
                                description={stage.description}
                                isLast={i === journeyStages.length - 1}
                                delay={i * 0.2}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* SCROLL TRANSITION: Journey to Comparison */}
            <GradientDivider color="purple" />

            {/* =========================================== */}
            {/* SECTION 5: INTERACTIVE COMPARISON */}
            {/* =========================================== */}
            <section className="relative min-h-screen py-32 z-10">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-emerald-400 text-sm tracking-[0.3em] uppercase font-bold mb-4 block">The Difference</span>
                        <h2 className="text-5xl md:text-6xl font-display font-bold text-white">
                            Intelligence vs. <span className="text-slate-500">Standard</span>
                        </h2>
                    </motion.div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <ComparisonCard
                            type="before"
                            icon={Droplets}
                            title="Standard Minerals"
                            features={[
                                'Solid particle form — limited absorption',
                                'No structural coherence',
                                'Generic sourcing from processed deposits',
                                'Basic elemental composition only',
                            ]}
                        />
                        <ComparisonCard
                            type="after"
                            icon={Zap}
                            title="Andara Ionic"
                            features={[
                                '98% bioavailable ionic state',
                                'Structured for cellular recognition',
                                'Primordial volcanic source — 12M years',
                                '72+ trace elements with encoded information',
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* SCROLL TRANSITION: Comparison to CTA */}
            <ParticleDivider />
            <WaveTransition flip />
            <ScrollTextMarquee text={['ACTIVATE', 'TRANSFORM', 'ELEVATE', 'AWAKEN', 'THRIVE']} direction="left" />

            {/* =========================================== */}
            {/* SECTION 6: CTA - THE AWAKENING */}
            {/* =========================================== */}
            <section className="relative min-h-screen flex items-center justify-center z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/30 via-transparent to-transparent pointer-events-none" />

                <motion.div
                    className="relative text-center px-6 z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Glowing orb behind */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                        <motion.div
                            className="w-[400px] h-[400px] rounded-full blur-[100px] bg-emerald-500/20"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.3, 0.2],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </div>

                    <motion.div
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs tracking-[0.3em] uppercase mb-8"
                        animate={{ boxShadow: ['0 0 0 rgba(52,211,153,0)', '0 0 30px rgba(52,211,153,0.3)', '0 0 0 rgba(52,211,153,0)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Activity className="w-4 h-4" />
                        Begin Your Awakening
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Activate</span>?
                    </h2>

                    <p className="text-xl text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
                        Join the thousands who have upgraded their water with primordial mineral intelligence.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products/andara-ionic-100ml">
                            <motion.button
                                className="group px-10 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-lg rounded-full flex items-center gap-3 mx-auto"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(52,211,153,0.4)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Shield className="w-5 h-5" />
                                Get Andara Ionic
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </div>

                    <p className="mt-8 text-slate-500 text-sm">
                        Free shipping on orders over €50 · 30-day satisfaction guarantee
                    </p>
                </motion.div>
            </section>

            {/* Footer spacing */}
            <div className="h-32" />
        </div>
    );
}
