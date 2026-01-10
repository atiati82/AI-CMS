// CANONICAL_LAYOUT_V1 — Do not overwrite. Generator must use props only.
// client/src/templates/gpt/IONLayout.tsx
// ION Layout - "Charged Intelligence" | Deep Indigo + Electric Blue + Particle Physics

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import { IONParticleField } from "@/components/visuals/IONParticleField";
import { IONFieldLines } from "@/components/visuals/IONFieldLines";

type Section = {
    id: string;
    headline: string;
    content: React.ReactNode;
    visual?: React.ReactNode;
    layout?: 'default' | 'full-width' | 'centered';
};

type CTABlock = {
    headline: string;
    body?: string;
    buttonLabel: string;
    buttonHref: string;
};

type RelatedPage = {
    title: string;
    href: string;
    description?: string;
};

type Props = {
    title: string;
    subtitle: string;
    heroVisual?: React.ReactNode;
    sections: Section[];
    cta?: CTABlock;
    relatedPages?: RelatedPage[];
    showParticles?: boolean;
    particleVariant?: 'hero-only' | 'full-page';
};

export function IONLayout({
    title,
    subtitle,
    heroVisual,
    sections,
    cta,
    relatedPages = [],
    showParticles = true,
    particleVariant = 'hero-only'
}: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-950 to-indigo-950 text-white">
            {/* Header: Sticky navigation with ION branding */}
            <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-indigo-950/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6 lg:px-8 py-3">
                    <Link href="/" className="font-semibold tracking-wide text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        Andara Ionic
                    </Link>
                    <nav className="flex items-center gap-4 text-sm text-white/70">
                        <Link href="/ion" className="hover:text-cyan-400 transition-colors">ION Hub</Link>
                        <Link href="/science" className="hover:text-cyan-400 transition-colors">Science</Link>
                        <Link href="/shop">
                            <Button className="rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold hover:opacity-90 shadow-lg shadow-yellow-500/20">
                                Shop
                            </Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10">

                {/* Hero Section with Particle Field */}
                <section className="relative min-h-[60vh] flex items-center justify-center mb-16 rounded-3xl overflow-hidden border border-cyan-500/20">
                    {/* Particle Background */}
                    {showParticles && (
                        <div className="absolute inset-0">
                            <IONParticleField particleCount={150} interactive />
                            <IONFieldLines variant="radial" centerX={50} centerY={50} />
                        </div>
                    )}

                    {/* Hero Content */}
                    <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-12">
                        <motion.div
                            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 mb-6 backdrop-blur-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Sparkles className="w-3 h-3" />
                            ION Intelligence
                        </motion.div>

                        <motion.h1
                            className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {title}
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {subtitle}
                        </motion.p>

                        {/* Hero Visual (optional) */}
                        {heroVisual && (
                            <motion.div
                                className="mt-8"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                {heroVisual}
                            </motion.div>
                        )}
                    </div>

                    {/* Glassmorphic overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/50 to-indigo-950 pointer-events-none" />
                </section>

                {/* Content Sections */}
                <div className="space-y-12">
                    {sections.map((section, index) => {
                        const isEven = index % 2 === 0;
                        const layoutClass = section.layout === 'full-width'
                            ? 'col-span-full'
                            : section.layout === 'centered'
                                ? 'col-span-full max-w-3xl mx-auto'
                                : '';

                        return (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                className={`relative rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 backdrop-blur-sm p-8 md:p-10 ${layoutClass}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {/* Subtle field lines background */}
                                {particleVariant === 'full-page' && showParticles && (
                                    <div className="absolute inset-0 opacity-20 overflow-hidden rounded-3xl">
                                        <IONFieldLines variant="flow" />
                                    </div>
                                )}

                                {/* Section Content */}
                                <div className={`grid gap-8 ${section.visual ? 'lg:grid-cols-2 lg:items-center' : ''}`}>
                                    <div className={`space-y-4 ${section.visual && !isEven ? 'lg:order-2' : ''}`}>
                                        <h2 className="text-2xl md:text-3xl font-bold text-cyan-300">
                                            {section.headline}
                                        </h2>
                                        <div className="prose prose-invert prose-lg max-w-none text-white/80">
                                            {section.content}
                                        </div>
                                    </div>

                                    {/* Visual Element */}
                                    {section.visual && (
                                        <motion.div
                                            className={`rounded-2xl border border-white/10 bg-black/30 p-6 ${!isEven ? 'lg:order-1' : ''}`}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            {section.visual}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.section>
                        );
                    })}
                </div>

                {/* CTA Block */}
                {cta && (
                    <motion.section
                        className="mt-16 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-transparent to-cyan-500/10 p-8 md:p-10 text-center relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Subtle vortex background */}
                        {showParticles && (
                            <div className="absolute inset-0 opacity-30">
                                <IONFieldLines variant="vortex" centerX={50} centerY={50} />
                            </div>
                        )}

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-semibold mb-4">{cta.headline}</h3>
                            {cta.body && (
                                <p className="text-white/70 max-w-2xl mx-auto mb-6">{cta.body}</p>
                            )}
                            <Link href={cta.buttonHref}>
                                <Button className="rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 px-8 py-6 text-base font-semibold text-black hover:opacity-90 shadow-lg shadow-yellow-500/20">
                                    {cta.buttonLabel}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </motion.section>
                )}

                {/* Related Pages Grid */}
                {relatedPages.length > 0 && (
                    <section className="mt-16">
                        <h3 className="text-xl font-semibold mb-6 text-cyan-300">Explore ION Worlds</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {relatedPages.map((page, index) => (
                                <motion.div
                                    key={page.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <Link href={page.href}>
                                        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all cursor-pointer group">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                                                        {page.title}
                                                    </div>
                                                    {page.description && (
                                                        <div className="mt-1 text-sm text-white/60">
                                                            {page.description}
                                                        </div>
                                                    )}
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-cyan-500/10 pt-8 text-sm text-white/50">
                    <div>© {new Date().getFullYear()} Andara Ionic</div>
                    <div className="flex gap-4">
                        <Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy</Link>
                    </div>
                </footer>
            </main>
        </div>
    );
}

export default IONLayout;
