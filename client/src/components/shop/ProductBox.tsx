import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
    ShoppingCart, Check, Droplets, Zap, Hexagon, FlaskConical,
    ArrowRight, ChevronDown, ExternalLink, Package, Sparkles,
    Beaker, Gauge, Waves
} from "lucide-react";

interface ProductBoxProps {
    variant?: "compact" | "standard" | "featured";
    showPricing?: boolean;
    showCTA?: boolean;
    className?: string;
}

/**
 * Reusable ProductBox Component
 * 
 * For embedding Andara Ionic 100ml product info on content pages.
 * Three variants: compact (inline), standard (card), featured (full width)
 */
export function ProductBox({
    variant = "standard",
    showPricing = true,
    showCTA = true,
    className = ""
}: ProductBoxProps) {

    // Compact: Small inline mention
    if (variant === "compact") {
        return (
            <Link href="/shop/andara-ionic-100ml">
                <div className={`inline-flex items-center gap-3 p-3 rounded-xl bg-[#f6d56a]/10 border border-[#f6d56a]/20 hover:border-[#f6d56a]/40 transition-all cursor-pointer ${className}`}>
                    <div className="w-10 h-10 rounded-lg bg-[#f6d56a]/15 flex items-center justify-center flex-shrink-0">
                        <Droplets className="w-5 h-5 text-[#f6d56a]" />
                    </div>
                    <div>
                        <span className="text-sm font-semibold text-white">Andara Ionic 100 ml</span>
                        {showPricing && <span className="text-xs text-white/50 ml-2">from €19,90</span>}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#f6d56a] ml-2" />
                </div>
            </Link>
        );
    }

    // Featured: Full-width callout
    if (variant === "featured") {
        return (
            <motion.div
                className={`p-8 rounded-3xl border border-[#f6d56a]/20 bg-gradient-to-r from-[#f6d56a]/10 via-[#f6d56a]/5 to-transparent ${className}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Product visual */}
                    <div className="w-32 h-44 rounded-2xl bg-gradient-to-b from-[#1a2744] to-[#0a1628] border border-white/10 flex items-center justify-center relative flex-shrink-0">
                        <div className="absolute inset-0 rounded-2xl bg-[#1aa7ff]/10 blur-xl" />
                        <div className="relative text-center">
                            <Droplets className="w-12 h-12 text-[#1aa7ff] mx-auto mb-2" />
                            <span className="text-[10px] font-bold text-white/60 tracking-wider uppercase">100 ml</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-display font-semibold text-white mb-3">
                            Andara Ionic 100 ml
                        </h3>
                        <p className="text-white/60 mb-4 max-w-lg">
                            Primordial ionic sulfate minerals for crystal-clear, activated water. A few drops turn ordinary water into a clarified, mineral-structured medium.
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white/50 mb-6">
                            <span className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#38ffd1]" />
                                Volcanic mineral origin
                            </span>
                            <span className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#38ffd1]" />
                                17–30 mg/L sulfate zone
                            </span>
                            <span className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#38ffd1]" />
                                ~1 ml per liter
                            </span>
                        </div>

                        {showCTA && (
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <Link href="/shop/andara-ionic-100ml">
                                    <button className="px-6 py-3 bg-gradient-to-r from-[#f6d56a] to-[#e8b923] text-black font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-2">
                                        <ShoppingCart className="w-4 h-4" />
                                        {showPricing ? "Order from €19,90" : "View Product"}
                                    </button>
                                </Link>
                                <Link href="/how-andara-works">
                                    <button className="px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:border-white/40 transition-all">
                                        How It Works
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    }

    // Standard: Card format (default)
    return (
        <motion.div
            className={`p-6 rounded-2xl border border-white/10 bg-[#0b1020]/80 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, borderColor: "rgba(246,213,106,0.3)" }}
        >
            <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-20 rounded-xl bg-gradient-to-b from-[#1a2744] to-[#0a1628] border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-6 h-6 text-[#1aa7ff]" />
                </div>
                <div>
                    <h4 className="text-lg font-display font-semibold text-white mb-1">Andara Ionic 100 ml</h4>
                    <p className="text-sm text-white/50">Ionic sulfate mineral drops</p>
                </div>
            </div>

            <ul className="space-y-2 text-sm text-white/60 mb-4">
                <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#f6d56a]" />
                    Volcanic mineral origin
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#f6d56a]" />
                    Clarifies & structures water
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#f6d56a]" />
                    Compact travel format
                </li>
            </ul>

            {showPricing && (
                <div className="text-lg font-bold text-white mb-4">
                    €19,90 <span className="text-sm font-normal text-white/40">/ 100 ml</span>
                </div>
            )}

            {showCTA && (
                <Link href="/shop/andara-ionic-100ml">
                    <button className="w-full px-4 py-3 bg-[#f6d56a]/10 border border-[#f6d56a]/30 text-[#f6d56a] font-semibold rounded-lg hover:bg-[#f6d56a]/20 transition-all flex items-center justify-center gap-2">
                        View Product <ArrowRight className="w-4 h-4" />
                    </button>
                </Link>
            )}
        </motion.div>
    );
}

/**
 * Pricing Card Component
 */
interface PricingCardProps {
    name: string;
    subtitle: string;
    volume: string;
    price: string;
    perLiter: string;
    savings?: string;
    bullets: string[];
    featured?: boolean;
    ctaText: string;
}

function PricingCard({ name, subtitle, volume, price, perLiter, savings, bullets, featured, ctaText }: PricingCardProps) {
    return (
        <motion.div
            className={`p-6 rounded-2xl border ${featured ? "border-[#f6d56a]/40 bg-gradient-to-b from-[#f6d56a]/10 to-transparent" : "border-white/10 bg-[#0b1020]/50"}`}
            whileHover={{ y: -4 }}
        >
            {featured && (
                <div className="text-xs font-bold text-[#f6d56a] tracking-widest uppercase mb-4">Most Popular</div>
            )}
            <h4 className="text-lg font-display font-semibold text-white mb-1">{name}</h4>
            <p className="text-sm text-white/50 mb-4">{subtitle}</p>

            <div className="mb-4">
                <span className="text-3xl font-bold text-white">{price}</span>
                <span className="text-sm text-white/40 ml-2">for {volume}</span>
            </div>

            <div className="flex items-center gap-3 mb-4 text-sm">
                <span className="text-white/60">{perLiter} per liter</span>
                {savings && <span className="px-2 py-0.5 rounded bg-[#38ffd1]/20 text-[#38ffd1] text-xs font-bold">{savings}</span>}
            </div>

            <ul className="space-y-2 mb-6">
                {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                        <Check className="w-4 h-4 text-[#38ffd1] mt-0.5 flex-shrink-0" />
                        {bullet}
                    </li>
                ))}
            </ul>

            <button className={`w-full px-4 py-3 font-bold rounded-lg transition-all ${featured
                    ? "bg-gradient-to-r from-[#f6d56a] to-[#e8b923] text-black hover:opacity-90"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}>
                {ctaText}
            </button>
        </motion.div>
    );
}

/**
 * FAQ Item Component
 */
function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="border-b border-white/10">
            <button
                className="w-full py-5 flex items-center justify-between text-left"
                onClick={() => setOpen(!open)}
            >
                <span className="font-semibold text-white">{question}</span>
                <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pb-5 text-white/60 leading-relaxed"
                >
                    {answer}
                </motion.div>
            )}
        </div>
    );
}

export default ProductBox;
