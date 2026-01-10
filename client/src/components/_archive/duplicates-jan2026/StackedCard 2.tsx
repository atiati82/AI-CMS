import { useRef } from "react";
import { Link } from "wouter";
import { useScroll, useTransform, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";

interface StackedCardProps {
    index: number;
    total: number;
    title: string;
    subtitle: string;
    desc: string;
    link?: string;
    image?: string;      // Legacy support
    registryId?: string; // New Smart Registry support
    color: string;
    Icon: React.ComponentType<{ className?: string }>;
    zIndex?: number;
}

export function StackedCard({ index, total, title, subtitle, desc, link, image, registryId, color, Icon, zIndex }: StackedCardProps) {
    // STICKY LOGIC
    // - Standard cards: minHeight 110vh creates a scroll track for the next card to overlap
    // - Last card: minHeight should be smaller so the next section (footer/features) comes up immediately
    const cardRef = useRef(null);
    const isLast = index === total - 1;
    const heightStyle = isLast ? '85vh' : '110vh';
    const topOffset = 120 + (index * 60);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <div
            ref={cardRef}
            className="sticky flex items-start justify-center py-10 w-full"
            style={{ top: topOffset, minHeight: heightStyle, zIndex }}
        >
            <motion.div
                style={{ scale, opacity }}
                className={`relative w-full max-w-5xl h-[65vh] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-[#020617]`}
            >
                {/* Fallback Gradient (Visible if image fails) */}
                <div className={`absolute inset-0 bg-gradient-to-br from-slate-900 to-${color}-900/30`} />

                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    {registryId ? (
                        <>
                            <BackgroundLayer
                                registryId={registryId}
                                opacity={100}
                                className="mix-blend-normal"
                                overlayGradient="bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent"
                            />
                            <div className={`absolute inset-0 bg-${color}-500/20 mix-blend-overlay pointer-events-none`} />
                        </>
                    ) : (
                        <>
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover transition-opacity duration-500"
                                onError={(e) => {
                                    // Hide broken image so fallback gradient shows
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
                            <div className={`absolute inset-0 bg-${color}-500/20 mix-blend-overlay`} />
                        </>
                    )}
                </div>

                {/* Content Container - Glass */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-14 bg-black/30">
                    <div className="relative z-20 w-full">
                        <div className="flex justify-between items-end">
                            <div className="max-w-2xl">
                                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-${color}-300 mb-6`}>
                                    <Icon className="w-4 h-4" />
                                    <span className="text-xs font-bold tracking-widest uppercase">Layer 0{index + 1}</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 leading-tight drop-shadow-xl text-balance">
                                    {title}
                                </h2>
                                <p className="text-2xl text-white/90 font-light mb-4 drop-shadow-lg text-pretty">
                                    {subtitle}
                                </p>
                                <p className="text-white/80 text-lg max-w-2xl leading-relaxed bg-black/60 p-6 rounded-xl backdrop-blur-md border border-white/10 shadow-lg text-pretty">
                                    {desc}
                                </p>
                            </div>

                            {link && (
                                <Link href={link}>
                                    <button className={`hidden md:flex group flex-col items-center justify-center w-24 h-24 rounded-full bg-white/10 hover:bg-${color}-500 backdrop-blur-xl border border-white/10 transition-all duration-300`}>
                                        <ArrowRight className="w-8 h-8 text-white mb-1 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] uppercase font-bold text-white/60 group-hover:text-white">Open</span>
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Big Index Number */}
                <div className="absolute top-4 right-8 text-[120px] font-display font-bold text-white/10 leading-none pointer-events-none z-0 mix-blend-overlay">
                    0{index + 1}
                </div>
            </motion.div>
        </div>
    );
}
