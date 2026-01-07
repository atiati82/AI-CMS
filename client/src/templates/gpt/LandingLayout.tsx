// CANONICAL_LAYOUT_V1 — Do not overwrite. Generator must use props only.
// client/src/templates/gpt/LandingLayout.tsx
// Landing Layout - "The Closer" | Spacing System v1.0 (8px grid)
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

type Props = {
    brandName?: string;
    headline: string;
    subheadline: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    proofLine?: string;
    heroRightVisual: React.ReactNode;
    painPoints: { title: string; body: string }[];
    proofCards: { title: string; body: string }[];
    finalCtaLabel: string;
    finalCtaHref: string;
};

export function LandingLayout({
    brandName = "Andara Ionic",
    headline,
    subheadline,
    primaryCtaLabel,
    primaryCtaHref,
    proofLine = "★★★★★ 4.9/5 • Verified Buyers • 30-Day Money-Back",
    heroRightVisual,
    painPoints,
    proofCards,
    finalCtaLabel,
    finalCtaHref,
}: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header: py-3 = 12px (tight navigation) */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6 lg:px-8 py-3">
                    <Link href="/" className="font-semibold tracking-wide text-white">
                        {brandName}
                    </Link>
                    <Link href={primaryCtaHref}>
                        <Button className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:opacity-90 shadow-lg shadow-amber-500/20">
                            Shop Now
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main: py-10 = 40px (macro), max-w-6xl, responsive gutters */}
            <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10">

                {/* HERO: gap-10 = 40px between grid items */}
                <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-6">
                        {/* Proof badge: py-2 = 8px, px-4 = 16px */}
                        <motion.div
                            className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {proofLine}
                        </motion.div>

                        {/* Headline: mb-4 = 16px (H1 → subtitle) */}
                        <motion.h1
                            className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                                {headline}
                            </span>
                        </motion.h1>

                        {/* Subheadline: mt-4 = 16px */}
                        <motion.p
                            className="text-lg text-white/80 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {subheadline}
                        </motion.p>

                        {/* CTA group: gap-4 = 16px */}
                        <motion.div
                            className="flex flex-wrap items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Link href={primaryCtaHref}>
                                <Button className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6 text-base font-semibold text-black hover:opacity-90 shadow-lg shadow-amber-500/20">
                                    {primaryCtaLabel}
                                </Button>
                            </Link>
                            <div className="text-sm text-white/60">
                                30-Day Money-Back • Fast Shipping • Secure Checkout
                            </div>
                        </motion.div>

                        {/* Credibility block: p-5 = 20px (comfortable card padding) */}
                        <motion.div
                            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-sm text-white/75"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.4 }}
                        >
                            <span className="font-semibold text-emerald-400">Clarity → Structure → Mineral Intelligence.</span>{" "}
                            A focused system designed to support clean, coherent water workflows.
                        </motion.div>
                    </div>

                    {/* Hero visual: p-6 = 24px (standard card padding) */}
                    <motion.div
                        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {heroRightVisual}
                    </motion.div>
                </section>

                {/* PAIN → PROOF: mt-16 = 64px (section gap), gap-8 = 32px */}
                <section className="mt-16 grid gap-8 lg:grid-cols-2">
                    {/* Pain section: p-6 = 24px (standard), space-y-4 = 16px */}
                    <motion.div
                        className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-xs font-semibold uppercase tracking-widest text-red-400">
                            The Old Way
                        </div>
                        <h2 className="mt-2 text-2xl font-semibold">Why most water feels "dead"</h2>
                        <div className="mt-5 space-y-4">
                            {painPoints.map((p, i) => (
                                <motion.div
                                    key={i}
                                    className="rounded-2xl border border-red-500/10 bg-black/30 p-5"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                >
                                    <div className="font-semibold text-red-300">{p.title}</div>
                                    <div className="mt-2 text-white/70">{p.body}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Proof section */}
                    <motion.div
                        className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                            The Proof
                        </div>
                        <h2 className="mt-2 text-2xl font-semibold">What changes when structure returns</h2>
                        <div className="mt-5 grid gap-4">
                            {proofCards.map((c, i) => (
                                <motion.div
                                    key={i}
                                    className="rounded-2xl border border-emerald-500/10 bg-black/30 p-5"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                >
                                    <div className="font-semibold text-emerald-300">{c.title}</div>
                                    <div className="mt-2 text-white/70">{c.body}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* FINAL CTA: mt-16 = 64px, p-8 = 32px (spacious) */}
                <motion.section
                    className="mt-16 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/10 p-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-2xl md:text-3xl font-semibold">Ready to experience coherent water?</h3>
                    <p className="mt-2 text-white/70 max-w-2xl mx-auto">
                        Simple. Focused. Built to convert curiosity into a real daily ritual.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <Link href={finalCtaHref}>
                            <Button className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6 text-base font-semibold text-black hover:opacity-90 shadow-lg shadow-amber-500/20">
                                {finalCtaLabel}
                            </Button>
                        </Link>
                    </div>
                </motion.section>

                {/* Footer: mt-12 = 48px (macro), pt-8 = 32px */}
                <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50">
                    <div>© {new Date().getFullYear()} {brandName}</div>
                    <div className="flex gap-4">
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                    </div>
                </footer>
            </main>
        </div>
    );
}

export default LandingLayout;
