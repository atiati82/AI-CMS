
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ARTICLES } from "@/lib/data";
import { motion } from "@/lib/motion";

export function ScienceFooterSnippet() {
    const [location] = useLocation();
    const [relevantArticles, setRelevantArticles] = useState(ARTICLES);

    useEffect(() => {
        // Smart filtering logic based on location
        let filtered = [...ARTICLES];

        if (location.startsWith("/product")) {
            // Show articles related to product or highly tagged with 'minerals'
            filtered = ARTICLES.filter(a =>
                a.relatedProductIds.includes("p1") || a.tags.includes("sulfate")
            );
        } else if (location.startsWith("/science")) {
            // If on a specific article, show others from same cluster (mock logic)
            // For now, just shuffle/randomize to keep it fresh or show top priority
            filtered = ARTICLES.filter(a => a.priority >= 8);
        } else {
            // Home/Generic: Show highest priority
            filtered = ARTICLES.sort((a, b) => b.priority - a.priority);
        }

        setRelevantArticles(filtered.slice(0, 3));
    }, [location]);

    if (relevantArticles.length === 0) return null;

    return (
        <section className="relative bg-slate-950/80 border-t border-white/5 py-10 sm:py-12 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-900/30 to-slate-950/60 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center sm:text-left w-full md:w-auto">
                        <h3 className="text-[10px] sm:text-xs font-bold andara-text-gold-gradient uppercase tracking-[0.2em] mb-1">Science Library</h3>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-display font-medium text-slate-100">Understand the Science of Water</h2>
                    </div>
                    <Link href="/science" className="text-xs font-semibold andara-text-gold-gradient hover:opacity-80 transition-opacity flex items-center gap-1.5 mx-auto md:mx-0">
                        Explore Full Library <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {relevantArticles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Link href={`/science/${article.slug}`} className="andara-glass-card block h-full cursor-pointer">
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    {article.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="andara-card-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h4 className="andara-card-title font-display">
                                    {article.title}
                                </h4>
                                <p className="andara-card-desc">
                                    {article.summary}
                                </p>
                                <div className="andara-card-link">
                                    READ ARTICLE <ArrowRight />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
