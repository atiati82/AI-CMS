import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FlaskConical } from 'lucide-react';
import { FlipCard3D } from '@/components/visuals/motion-lab/FlipCard3D';
import { HexagonalLatticeDraw } from '@/components/visuals/motion-lab/HexagonalLatticeDraw';
import { ElasticVelocity } from '@/components/visuals/motion-lab/ElasticVelocity';
import { LivingGrid } from '@/components/visuals/motion-lab/LivingGrid';

export default function MotionKitchen() {
    return (
        <div className="min-h-screen bg-[#020617] text-white p-8">
            <header className="mb-12 flex items-center gap-4">
                <Link href="/demo/layout-v2">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-4xl font-display font-medium text-white flex items-center gap-3">
                        <FlaskConical className="w-8 h-8 text-emerald-500" />
                        Motion Kitchen
                    </h1>
                    <p className="text-slate-400 mt-2">Cookbook of isolated animation recipes.</p>
                </div>
            </header>

            <main className="max-w-5xl mx-auto space-y-24">

                {/* 1. 3D Card Flip */}
                <section className="space-y-12">
                    <div className="border-l-2 border-emerald-500 pl-6">
                        <h3 className="text-3xl font-bold mb-2">1. 3D Card Flip</h3>
                        <p className="text-slate-400">Pure CSS/Framer transform-style: preserve-3d. No WebGL.</p>
                        <div className="mt-4 inline-flex gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded">
                            &lt;FlipCard3D /&gt;
                        </div>
                    </div>
                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-12 flex items-center justify-center min-h-[500px]">
                        <FlipCard3D />
                    </div>
                </section>

                {/* 2. Hexagonal Lattice */}
                <section className="space-y-12">
                    <div className="border-l-2 border-purple-500 pl-6">
                        <h3 className="text-3xl font-bold mb-2">2. Hexagonal Lattice Draw</h3>
                        <p className="text-slate-400">SVG path animation driven by scroll progress. Perfect for 'Crystalline Matrix'.</p>
                        <div className="mt-4 inline-flex gap-2 text-xs font-mono text-purple-400 bg-purple-950/30 px-2 py-1 rounded">
                            &lt;HexagonalLatticeDraw /&gt;
                        </div>
                    </div>
                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-12 flex items-center justify-center min-h-[500px]">
                        <HexagonalLatticeDraw />
                    </div>
                </section>

                {/* 3. Elastic Velocity */}
                <section className="space-y-12">
                    <div className="border-l-2 border-rose-500 pl-6">
                        <h3 className="text-3xl font-bold mb-2">3. Elastic Velocity</h3>
                        <p className="text-slate-400">Elements that physically deform (skew/stretch) based on scroll speed.</p>
                        <div className="mt-4 inline-flex gap-2 text-xs font-mono text-rose-400 bg-rose-950/30 px-2 py-1 rounded">
                            &lt;ElasticVelocity /&gt;
                        </div>
                    </div>
                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-12 min-h-[500px] flex items-center justify-center overflow-hidden">
                        <ElasticVelocity />
                    </div>
                </section>

                {/* 4. Living Grid */}
                <section className="space-y-12">
                    <div className="border-l-2 border-cyan-500 pl-6">
                        <h3 className="text-3xl font-bold mb-2">4. Living Grid</h3>
                        <p className="text-slate-400">Interactive background field that ripples on hover.</p>
                        <div className="mt-4 inline-flex gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded">
                            &lt;LivingGrid /&gt;
                        </div>
                    </div>
                    <div className="h-[600px]">
                        <LivingGrid rows={8} cols={12} />
                    </div>
                </section>

            </main>
        </div>
    );
}
