import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Hexagon, Droplet, Zap, Triangle, Search, Layers, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "@/components/layout";
import { HexagonalGridDiagram } from "@/components/diagrams";

const easeOut = [0.23, 0.82, 0.35, 1] as const;

const fadeUp: Variants = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 as const },
    transition: { duration: 0.6, ease: easeOut },
};

const staggerContainer: Variants = {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.25 as const },
    variants: {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.08 },
        },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easeOut },
    },
};

const coreConcepts = [
    { icon: Hexagon, title: "The Grid", desc: "Water molecules naturally link into 6-sided ring structures (H3O2) when energized." },
    { icon: Droplet, title: "Exclusion Zone", desc: "This structured phase expels solutes, creating a pure 'exclusion zone' (EZ)." },
    { icon: Zap, title: "Electron Treasury", desc: "Hexagonal layers store electric charge, acting as a biological battery." },
    { icon: Snowflake, title: "Liquid Crystal", desc: "Matter that flows like a liquid but maintains ordered geometry like a solid crystal." },
];

const faqs = [
    {
        question: "Is hexagonal water different from 'normal' water?",
        answer: "Chemically, it is still H2O. Structurally, it is different. Bulk water is chaotic (hodge-podge). Hexagonal water is coherent, forming a repeating lattice that changes its density, viscosity, and refractive index."
    },
    {
        question: "How does Andara Ionic create this structure?",
        answer: "Andara Ionic Minerals utilize sulfate minerals to provide a 'template' or scaffold. The ionic charge and geometry of the sulfate radical (SO4) help guide water molecules into stable hexagonal alignment."
    },
    {
        question: "Can I make hexagonal water at home?",
        answer: "Yes. Vortexing, magnetic exposure, and mineral conditioning (like Andara's protocol) all encourage water to assume this hexagonal phase."
    },
    {
        question: "What are the benefits for the body?",
        answer: "Proponents suggest that because biological water (inside cells) is highly structured, drinking hexagonal water requires less energy for the body to process and absorb, improving hydration efficiency."
    }
];

export default function HexagonalWaterStructuresPage() {
    return (
        <Layout>
            <article className="min-h-screen">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24 md:py-32">
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
                    </div>

                    <div className="container mx-auto px-4 max-w-6xl relative z-10">
                        <motion.div {...fadeUp}>
                            <Link
                                href="/science/crystalline-matrix"
                                className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Crystalline Matrix
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: "easeOut" as Easing }}
                                className="text-center lg:text-left"
                            >
                                <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                                    <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
                                        Phase 4 Science
                                    </div>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-6 leading-tight">
                                    Hexagonal Water
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                        Structure vs Chaos
                                    </span>
                                </h1>

                                <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-8 mx-auto lg:mx-0">
                                    Water is not just a liquid—it is a liquid crystal. Discover the stable, charged hexagonal geometry known
                                    as "EZ Water" that fuels cellular life.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Link href="/shop/andara-ionic-100ml">
                                        <Button size="lg" className="rounded-full bg-cyan-600 hover:bg-cyan-500 text-white">
                                            Get Structured
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                    <Link href="/science/water-science">
                                        <Button variant="outline" size="lg" className="rounded-full border-slate-700 hover:bg-slate-800 text-white">
                                            The Science of Water
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative"
                            >
                                {/* The New Hexagonal Grid Diagram */}
                                <div className="relative z-10 p-2 bg-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
                                    <div className="absolute top-4 left-4 z-20 bg-black/40 px-3 py-1 rounded text-xs text-white font-mono">
                                        LIVE SIMULATION: Structured Lattice
                                    </div>
                                    <HexagonalGridDiagram mode="structure" className="bg-slate-950/80" />
                                </div>

                                {/* Decorative elements */}
                                <Hexagon className="absolute -top-6 -right-6 w-24 h-24 text-cyan-500/10 animate-spin-slow duration-[20s]" />
                                <Hexagon className="absolute -bottom-8 -left-8 w-32 h-32 text-blue-500/10 animate-reverse-spin duration-[25s]" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Content Section: Chaos vs Order */}
                <section className="bg-slate-950 py-20 border-t border-slate-800/50">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <motion.div {...fadeUp} className="text-center mb-16">
                            <h2 className="text-3xl font-display font-medium text-white mb-4">
                                The Two States of Water
                            </h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                In nature, water oscillates between chaotic bulk phases and ordered crystalline phases.
                                Modern processing often locks water into the chaotic state.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            <motion.div
                                {...fadeUp}
                                className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8"
                            >
                                <div className="h-48 mb-6 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-950 relative flex items-center justify-center">
                                    <div className="absolute top-2 left-2 text-xs font-mono text-slate-500">MODE: CHAOS</div>
                                    {/* Re-using the component in chaos mode */}
                                    <HexagonalGridDiagram mode="chaos" className="w-full h-full bg-transparent" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Bulk Water (Chaotic)</h3>
                                <ul className="space-y-2 text-slate-400 text-sm">
                                    <li className="flex items-start gap-2"><span className="text-red-400">×</span> Random molecular arrangement</li>
                                    <li className="flex items-start gap-2"><span className="text-red-400">×</span> Poor charge retention</li>
                                    <li className="flex items-start gap-2"><span className="text-red-400">×</span> Higher surface tension (harder to absorb)</li>
                                    <li className="flex items-start gap-2"><span className="text-red-400">×</span> Typical of tap & bottled water</li>
                                </ul>
                            </motion.div>

                            <motion.div
                                {...fadeUp}
                                className="bg-gradient-to-b from-indigo-900/20 to-slate-900/40 border border-indigo-500/30 rounded-2xl p-6 md:p-8 relative"
                            >
                                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                                <div className="h-48 mb-6 overflow-hidden rounded-xl border border-indigo-500/30 bg-slate-950 relative flex items-center justify-center">
                                    <div className="absolute top-2 left-2 text-xs font-mono text-cyan-400">MODE: STRUCTURE</div>
                                    <HexagonalGridDiagram mode="structure" className="w-full h-full bg-transparent" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Hexagonal Water (Ordered)</h3>
                                <ul className="space-y-2 text-slate-300 text-sm">
                                    <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Repeating hexagonal lattice</li>
                                    <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Acts as a battery (charge store)</li>
                                    <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Lower surface tension (bio-available)</li>
                                    <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Found in glacial melt & healthy cells</li>
                                </ul>
                            </motion.div>
                        </div>

                        {/* Core Concepts Grid */}
                        <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {coreConcepts.map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={staggerItem}
                                    className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors"
                                >
                                    <item.icon className="w-8 h-8 text-cyan-400 mb-4" />
                                    <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-slate-900 py-20 border-y border-slate-800/50">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-3xl font-display font-medium text-white mb-10 text-center">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqs.map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`faq-${i}`}
                                    className="border border-slate-800 rounded-xl px-6 bg-slate-950/50 data-[state=open]:border-cyan-500/30 transition-colors"
                                >
                                    <AccordionTrigger className="text-left text-white font-medium hover:no-underline py-5 hover:text-cyan-400 transition-colors">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-400 pb-5 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>
            </article>
        </Layout>
    );
}
