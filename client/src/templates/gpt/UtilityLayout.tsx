// CANONICAL_LAYOUT_V1 — Do not overwrite. Generator must use props only.
// client/src/templates/gpt/UtilityLayout.tsx
// Utility Layout - Trust/Support/Tools | Spacing System v1.0 (8px grid)
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { HelpCircle, Shield, Mail, ArrowRight } from "lucide-react";

type Props = {
    title: string;
    intro?: string;
    mode?: "index" | "noindex";
    rightRail?: React.ReactNode;
    mainHtml: string;
    faqs?: { q: string; a: string }[];
    toolSlot?: React.ReactNode;
    cta?: { label: string; href: string };
};

export function UtilityLayout({
    title,
    intro,
    mode = "index",
    rightRail,
    mainHtml,
    faqs,
    toolSlot,
    cta,
}: Props) {
    useEffect(() => {
        const name = "robots";
        let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
        if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute("name", name);
            document.head.appendChild(tag);
        }
        tag.setAttribute("content", mode === "noindex" ? "noindex,nofollow" : "index,follow");
    }, [mode]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header: py-3 = 12px */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6 lg:px-8 py-3">
                    <Link href="/" className="font-semibold tracking-wide text-white">Andara Ionic</Link>
                    {mode === "noindex" ? (
                        <div className="text-sm text-white/50">System Page</div>
                    ) : (
                        <nav className="flex items-center gap-4 text-sm text-white/70">
                            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
                            <Link href="/science" className="hover:text-white transition-colors">Science</Link>
                            <Link href="/trust" className="hover:text-white transition-colors">Trust</Link>
                            <Link href="/support" className="hover:text-white transition-colors">Support</Link>
                        </nav>
                    )}
                </div>
            </header>

            {/* Main: py-10 = 40px */}
            <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10">
                {/* Grid: gap-10 = 40px (sidebar offset) */}
                <div className="grid gap-10 lg:grid-cols-12">

                    {/* Main content: lg:col-span-8, space-y-6 = 24px */}
                    <section className="lg:col-span-8 space-y-6">
                        <motion.h1
                            className="text-3xl font-bold md:text-4xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {title}
                        </motion.h1>

                        {intro && (
                            <motion.p
                                className="text-lg text-white/70 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {intro}
                            </motion.p>
                        )}

                        {/* Tool slot: p-6 = 24px */}
                        {toolSlot && (
                            <motion.div
                                className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-6"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                {toolSlot}
                            </motion.div>
                        )}

                        {/* FAQ: p-6 = 24px, mt-4 = 16px */}
                        {faqs && faqs.length > 0 && (
                            <motion.div
                                className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                <div className="flex items-center gap-2 text-lg font-semibold text-cyan-400 mb-4">
                                    <HelpCircle className="w-5 h-5" />
                                    Frequently Asked Questions
                                </div>
                                <Accordion type="single" collapsible className="w-full">
                                    {faqs.map((f, i) => (
                                        <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                                            <AccordionTrigger className="text-left text-white hover:text-cyan-400 transition-colors">
                                                {f.q}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="text-white/70 leading-relaxed">{f.a}</div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </motion.div>
                        )}

                        {/* Content prose: p-6 md:p-8 = 24/32px */}
                        <motion.div
                            className="prose prose-invert prose-lg max-w-none rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
                            dangerouslySetInnerHTML={{ __html: mainHtml }}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35 }}
                        />

                        {/* CTA: mt-2 = 8px (tight follow) */}
                        {cta && mode !== "noindex" && (
                            <motion.div
                                className="pt-2"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35 }}
                            >
                                <Link href={cta.href}>
                                    <Button className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-6 text-black font-semibold hover:opacity-90 shadow-lg shadow-amber-500/20">
                                        {cta.label}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </motion.div>
                        )}
                    </section>

                    {/* Sidebar: lg:col-span-4, space-y-6 = 24px */}
                    <aside className="lg:col-span-4 space-y-6">
                        {rightRail ? (
                            <motion.div
                                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-xl"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                {rightRail}
                            </motion.div>
                        ) : (
                            <motion.div
                                className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400 mb-3">
                                    <Shield className="w-4 h-4" />
                                    Trust Signals
                                </div>
                                <div className="text-sm text-white/60 leading-relaxed">
                                    Lab-tested quality, verified buyer reviews, transparent sourcing, and secure checkout.
                                </div>
                            </motion.div>
                        )}

                        {/* Help card: p-6 = 24px, mb-4 = 16px */}
                        <motion.div
                            className="rounded-3xl border border-white/10 bg-white/5 p-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-3">
                                <Mail className="w-4 h-4" />
                                Need Help?
                            </div>
                            <div className="text-sm text-white/60 leading-relaxed mb-4">
                                Our team is here to assist you with any questions.
                            </div>
                            <Link href="/support">
                                <Button variant="outline" className="w-full rounded-xl border-white/20 text-white hover:bg-white/10">
                                    Contact Support
                                </Button>
                            </Link>
                        </motion.div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

export default UtilityLayout;
