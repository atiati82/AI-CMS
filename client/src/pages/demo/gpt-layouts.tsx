// Demo: GPT Layouts Showcase Hub
// Route: /demo/gpt-layouts

import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/layout";
import { ArrowRight, Home, ShoppingBag, BookOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const layouts = [
    {
        name: "Landing Layout",
        icon: Home,
        description: "Conversion-focused landing page with minimal nav, pain/proof sections, and strong CTAs. Best for: Home, start-here, campaign pages.",
        href: "/demo/gpt-layout-landing",
        color: "amber",
    },
    {
        name: "Product Layout",
        icon: ShoppingBag,
        description: "E-commerce product page with sticky buy box, bundle options, trust badges, and mobile CTA bar. Best for: Products, bundles, shop.",
        href: "/demo/gpt-layout-product",
        color: "emerald",
    },
    {
        name: "Article Layout",
        icon: BookOpen,
        description: "SEO-optimized article with citation bait, query fan-out, sidebar CTA bridge. Best for: Science, education, guides, cluster pages.",
        href: "/demo/gpt-layout-article",
        color: "cyan",
    },
    {
        name: "Utility Layout",
        icon: Settings,
        description: "Clean utility pages with FAQ accordion, tool slots, and optional noindex mode. Best for: Legal, support, tools, admin pages.",
        href: "/demo/gpt-layout-utility",
        color: "indigo",
    },
];

const colorMap = {
    amber: "from-amber-500/20 to-amber-600/10 border-amber-500/30 hover:border-amber-500/50",
    emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 hover:border-emerald-500/50",
    cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 hover:border-cyan-500/50",
    indigo: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 hover:border-indigo-500/50",
};

const iconColorMap = {
    amber: "text-amber-400",
    emerald: "text-emerald-400",
    cyan: "text-cyan-400",
    indigo: "text-indigo-400",
};

export default function GptLayoutsShowcase() {
    return (
        <Layout>
            <div className="min-h-screen py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/60 mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            GPT Layout System v1.0
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-amber-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                4 Strategic Page Templates
                            </span>
                        </h1>
                        <p className="text-lg text-white/60 max-w-2xl mx-auto">
                            Simplified from ChatGPT's 11-template proposal into 4 practical layouts that cover 100% of Andara's page types.
                        </p>
                    </motion.div>

                    {/* Layout Cards */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {layouts.map((layout, i) => {
                            const Icon = layout.icon;
                            return (
                                <motion.div
                                    key={layout.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <Link href={layout.href}>
                                        <div
                                            className={`group relative rounded-3xl border bg-gradient-to-br p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${colorMap[layout.color as keyof typeof colorMap]}`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center ${iconColorMap[layout.color as keyof typeof iconColorMap]}`}>
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                                                        {layout.name}
                                                    </h3>
                                                    <p className="text-sm text-white/60 leading-relaxed mb-4">
                                                        {layout.description}
                                                    </p>
                                                    <div className="inline-flex items-center gap-2 text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors">
                                                        View Demo
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Quick Stats */}
                    <motion.div
                        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        {[
                            { label: "Templates", value: "4" },
                            { label: "Page Coverage", value: "100%" },
                            { label: "Lines of Code", value: "~800" },
                            { label: "From ChatGPT", value: "11→4" },
                        ].map((stat) => (
                            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Back Link */}
                    <div className="mt-12 text-center">
                        <Link href="/demo">
                            <Button variant="outline" className="rounded-xl border-white/20 text-white hover:bg-white/10">
                                ← Back to All Demos
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
