// CANONICAL_LAYOUT_V1 — Do not overwrite. Generator must use props only.
// client/src/templates/gpt/ArticleLayout.tsx
// Article Layout - "The Net" / Citation Engine | Spacing System v1.0 (8px grid)
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, ArrowRight, Clock, User } from "lucide-react";

type Props = {
    title: string;
    introHookSentence: string;
    definition40to60Words: string;
    updatedAtLabel?: string;
    authorLine?: string;
    sidebarCta: {
        imageOrVisual: React.ReactNode;
        headline: string;
        buttonLabel: string;
        buttonHref: string;
        microCopy?: string;
    };
    fanOutQuestions: { q: string; anchor: string }[];
    contentHtml: string;
    factBlock?: React.ReactNode;
    bottomCta?: { headline: string; body: string; buttonLabel: string; buttonHref: string };
};

export function ArticleLayout({
    title,
    introHookSentence,
    definition40to60Words,
    updatedAtLabel = "Updated recently",
    authorLine,
    sidebarCta,
    fanOutQuestions,
    contentHtml,
    factBlock,
    bottomCta,
}: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header: py-3 = 12px */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6 lg:px-8 py-3">
                    <Link href="/" className="font-semibold tracking-wide text-white">Andara Ionic</Link>
                    <nav className="flex items-center gap-4 text-sm text-white/70">
                        <Link href="/science" className="hover:text-white transition-colors">Library</Link>
                        <Link href="/trust" className="hover:text-white transition-colors">Trust</Link>
                        <Link href="/shop">
                            <Button className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:opacity-90 shadow-lg shadow-amber-500/20">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Get the Product
                            </Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main: py-10 = 40px */}
            <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10">
                {/* Article grid: gap-10 = 40px (comfortable sidebar offset) */}
                <div className="grid gap-10 lg:grid-cols-12">

                    {/* Article: lg:col-span-8, space-y-6 = 24px */}
                    <article className="lg:col-span-8 space-y-6">
                        {/* Meta: gap-3 = 12px */}
                        <motion.div
                            className="flex flex-wrap items-center gap-3 text-sm text-white/50"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="inline-flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {updatedAtLabel}
                            </span>
                            {authorLine && (
                                <>
                                    <span className="text-white/30">•</span>
                                    <span className="inline-flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {authorLine}
                                    </span>
                                </>
                            )}
                        </motion.div>

                        {/* H1: mb implicit via space-y-6 */}
                        <motion.h1
                            className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {title}
                        </motion.h1>

                        {/* Hook sentence */}
                        <motion.p
                            className="text-xl md:text-2xl text-white/85 leading-relaxed font-light"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {introHookSentence}
                        </motion.p>

                        {/* Definition block: p-6 = 24px */}
                        <motion.section
                            className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                                Quick Definition (for AI Search)
                            </div>
                            <p className="text-base text-white/85 leading-relaxed">{definition40to60Words}</p>
                        </motion.section>

                        {/* Fan-out: p-6 = 24px, gap-2 = 8px for tags */}
                        <motion.section
                            className="rounded-2xl border border-white/10 bg-white/5 p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="text-sm font-semibold text-white/80">People also ask</div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {fanOutQuestions.map((f) => (
                                    <a
                                        key={f.anchor}
                                        href={`#${f.anchor}`}
                                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-all"
                                    >
                                        {f.q}
                                    </a>
                                ))}
                            </div>
                        </motion.section>

                        {/* Fact block: p-6 = 24px */}
                        {factBlock && (
                            <motion.section
                                className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35 }}
                            >
                                {factBlock}
                            </motion.section>
                        )}

                        {/* Content prose: p-6 md:p-8 = 24/32px */}
                        <motion.div
                            className="prose prose-invert prose-lg max-w-none rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35 }}
                        />

                        {/* Bottom CTA: p-8 = 32px */}
                        {bottomCta && (
                            <motion.section
                                className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/10 p-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold">{bottomCta.headline}</h3>
                                <p className="mt-2 text-white/70">{bottomCta.body}</p>
                                <div className="mt-6">
                                    <Link href={bottomCta.buttonHref}>
                                        <Button className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-6 text-black font-semibold hover:opacity-90 shadow-lg shadow-amber-500/20">
                                            {bottomCta.buttonLabel}
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.section>
                        )}
                    </article>

                    {/* Sidebar: lg:col-span-4, space-y-6 = 24px */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* Sticky CTA: p-6 = 24px */}
                        <motion.section
                            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-xl lg:sticky lg:top-24"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 overflow-hidden">
                                {sidebarCta.imageOrVisual}
                            </div>
                            <div className="mt-4 text-lg font-semibold">{sidebarCta.headline}</div>
                            {sidebarCta.microCopy && <div className="mt-2 text-sm text-white/70">{sidebarCta.microCopy}</div>}
                            <Link href={sidebarCta.buttonHref} className="mt-4 block">
                                <Button className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:opacity-90 shadow-lg shadow-amber-500/20">
                                    {sidebarCta.buttonLabel}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </motion.section>

                        {/* Related pages: p-6 = 24px, space-y-2 = 8px */}
                        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <div className="text-sm font-semibold text-white/80">Explore More</div>
                            <div className="mt-3 space-y-2 text-sm text-white/60">
                                <Link href="/science/water" className="block hover:text-white transition-colors">→ Water Science</Link>
                                <Link href="/science/minerals" className="block hover:text-white transition-colors">→ Mineral Science</Link>
                                <Link href="/science/bioelectricity" className="block hover:text-white transition-colors">→ Bioelectricity</Link>
                            </div>
                        </section>
                    </aside>
                </div>
            </main>
        </div>
    );
}

export default ArticleLayout;
