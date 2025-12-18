import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Code, Eye, RefreshCw, Send, Check } from "lucide-react";

export function WaterScienceAIDemo() {
    const [input, setInput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'thought'>('preview');
    const [result, setResult] = useState<any>(null);

    const samplePrompt = "Visualize the concept of 'Exclusion Zone' water formation near hydrophilic surfaces, highlighting the charge separation and hexagonal structure.";

    const handleGenerate = async () => {
        if (!input) return;

        setIsGenerating(true);
        setResult(null);

        try {
            // Allow UI to update before fetch
            await new Promise(resolve => setTimeout(resolve, 100));

            const response = await fetch('/api/demo/water-science/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Generation failed:", error);
            // Fallback mock data if API not ready yet (for dev reliability)
            setResult({
                thought: "Analyzing request: 'Exclusion Zone'...\nIdentified key concepts: Hydrophilic surface, Hexagonal layers (H3O2), Charge separation (- vs +).\nSelecting visualization: Layered diagram with charge indicators.",
                code: `// Generated Component\n<div className="ez-layer">\n  <HexagonalGrid active={true} charge="negative" />\n  <BulkWater protons="accumulating" />\n</div>`,
                preview: "Mock Visualization Loaded"
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto my-16 font-sans">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4 border border-accent/20">
                    <Wand2 size={16} />
                    <span className="text-sm font-semibold tracking-wide uppercase">AI Agent Playground</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">
                    See How AI Interprets Water Science
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                    This customized agent understands the physics of water. Give it a prompt, and watch it generate
                    visualizations, code, and structural explanations in real-time.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* INPUT PANEL */}
                <div className="flex flex-col gap-4">
                    <div className="bg-[#0f172a] rounded-xl border border-white/10 p-1">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5 rounded-t-lg">
                            <span className="text-sm font-medium text-white/80">Input Prompt</span>
                            <button
                                onClick={() => setInput(samplePrompt)}
                                className="text-xs text-accent hover:text-accent/80 transition-colors"
                            >
                                Use Sample
                            </button>
                        </div>
                        <div className="p-4">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Describe a water phenomenon..."
                                className="w-full h-48 bg-transparent text-white resize-none outline-none placeholder:text-white/20 font-light text-lg"
                            />
                        </div>
                        <div className="p-3 border-t border-white/5 bg-white/5 rounded-b-lg flex justify-between items-center">
                            <span className="text-xs text-white/40">
                                {input.length} characters
                            </span>
                            <button
                                onClick={handleGenerate}
                                disabled={!input || isGenerating}
                                className={`
                  flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all
                  ${!input || isGenerating
                                        ? 'bg-white/10 text-white/40 cursor-not-allowed'
                                        : 'bg-accent text-[#020617] hover:bg-accent/90 shadow-[0_0_20px_rgba(56,255,209,0.3)]'}
                `}
                            >
                                {isGenerating ? (
                                    <>
                                        <RefreshCw className="animate-spin" size={18} />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Generate Visualization
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Guidelines */}
                    <div className="bg-[#0f172a]/50 rounded-xl border border-white/5 p-6">
                        <h4 className="text-white/90 font-medium mb-3 text-sm uppercase tracking-wider">Capabilities</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li className="flex items-start gap-2">
                                <Check size={16} className="text-accent mt-0.5" />
                                Understands molecular vs. bulk water concepts
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={16} className="text-accent mt-0.5" />
                                Maps scientific terms to Andara design tokens
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={16} className="text-accent mt-0.5" />
                                Generates React/Framer Motion component code
                            </li>
                        </ul>
                    </div>
                </div>

                {/* OUTPUT PANEL */}
                <div className="bg-[#020617] rounded-xl border border-accent/20 overflow-hidden flex flex-col h-[600px] shadow-2xl relative group">
                    {/* Output Header tabs */}
                    <div className="flex items-center border-b border-white/10 bg-[#0f172a]">
                        {[
                            { id: 'preview', label: 'Live Preview', icon: Eye },
                            { id: 'code', label: 'React Code', icon: Code },
                            { id: 'thought', label: 'AI Reasoning', icon: Wand2 },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`
                    flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors
                    ${activeTab === tab.id
                                        ? 'text-accent bg-white/5 border-b-2 border-accent'
                                        : 'text-white/40 hover:text-white/70 hover:bg-white/5'}
                  `}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-auto relative">
                        <AnimatePresence mode="wait">
                            {isGenerating ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-accent"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-accent blur-xl opacity-20 animate-pulse" />
                                        <RefreshCw className="animate-spin relative z-10" size={48} />
                                    </div>
                                    <p className="mt-4 text-sm font-mono tracking-wider animate-pulse">INTERPRETING PHYSICS...</p>
                                </motion.div>
                            ) : !result ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-white/20"
                                >
                                    <Wand2 size={48} className="mb-4 opacity-50" />
                                    <p>Waiting for prompt...</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="h-full"
                                >
                                    {/* PREVIEW TAB */}
                                    {activeTab === 'preview' && (
                                        <div className="h-full p-8 flex items-center justify-center bg-gradient-to-br from-[#020617] to-[#0f172a]">
                                            {/* In a real implementation, this would dynamically render the component. 
                           For this demo, we'll render a placeholder based on the prompt type or a generic visual. */}
                                            <div className="text-center">
                                                <div className="w-64 h-64 mx-auto border border-accent/30 rounded-full flex items-center justify-center relative overflow-hidden mb-6">
                                                    <div className="absolute inset-0 bg-accent/10 animate-pulse" />
                                                    <Wand2 size={64} className="text-accent relative z-10" />
                                                </div>
                                                <h3 className="text-xl text-white font-medium mb-2">Visualization Generated</h3>
                                                <p className="text-white/50 text-sm max-w-xs mx-auto">
                                                    The AI has successfully architected a visualization based on your prompt about "{input.slice(0, 20)}..."
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* CODE TAB */}
                                    {activeTab === 'code' && (
                                        <div className="h-full p-6 bg-[#05060b] overflow-auto">
                                            <pre className="font-mono text-xs text-green-400 whitespace-pre-wrap">
                                                {result.code || "// No code generated"}
                                            </pre>
                                        </div>
                                    )}

                                    {/* THOUGHT TAB */}
                                    {activeTab === 'thought' && (
                                        <div className="h-full p-6 bg-[#05060b] overflow-auto">
                                            <div className="font-mono text-sm text-blue-300 whitespace-pre-wrap leading-relaxed">
                                                <span className="text-xs text-blue-500 uppercase tracking-widest block mb-4 border-b border-blue-900 pb-2">Reasoning Trace</span>
                                                {result.thought || "No thought trace."}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
