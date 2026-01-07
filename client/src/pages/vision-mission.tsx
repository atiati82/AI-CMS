
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";

import { motion } from "framer-motion";

export default function VisionMissionPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Vision & Mission"
      subtitle="Why Andara Exists"
      vibeKeywords={['Restoration', 'Coherence', 'Living Water']}
      seoTitle="Andara Ionic Vision & Mission – Water, Minerals & the New Terrain"
      seoDescription="Discover why Andara Ionic exists: to reimagine water as a living, mineral-intelligent medium that supports clearer terrain, deeper coherence and a more connected way of living."
      seoKeywords={["andara ionic vision", "andara mission", "brand philosophy water", "mineral-based terrain model", "structured water vision", "ionic sulfate minerals purpose"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-light text-emerald-400">Why Andara Exists</h2>
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            Andara Ionic was born from a simple, radical question: <br />
            <span className="text-white italic">What happens if we treat water not as a commodity, but as a living, intelligent medium?</span>
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mx-auto" />
          <p className="text-slate-400">
            From there, everything unfolded – minerals, geometry, bioelectricity, and terrain. Andara is not “just another product”. It is a bridge: between volcano and glass, between science and experience, between inner terrain and outer environment.
          </p>
        </section>

        {/* The Core Vision */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl text-emerald-300">The Core Vision</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">From Dead Water to Living Medium</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 bg-black/40 border-emerald-500/20 backdrop-blur-sm hover:bg-black/60 transition-colors">
              <div className="h-12 w-12 rounded-full bg-emerald-900/30 flex items-center justify-center mb-4 text-emerald-400 text-xl font-bold">1</div>
              <h3 className="text-lg font-medium text-emerald-300 mb-3">Restore Mineral Architecture</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Not with heavy, muddy doses – but with primordial ionic sulfate minerals in small, targeted ranges.
              </p>
            </Card>

            <Card className="p-8 bg-black/40 border-emerald-500/20 backdrop-blur-sm hover:bg-black/60 transition-colors">
              <div className="h-12 w-12 rounded-full bg-emerald-900/30 flex items-center justify-center mb-4 text-emerald-400 text-xl font-bold">2</div>
              <h3 className="text-lg font-medium text-emerald-300 mb-3">Support Bioelectric Terrain</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The body, the microbiome and the environment all respond to charge, structure and minerals. Andara focuses on these three.
              </p>
            </Card>

            <Card className="p-8 bg-black/40 border-emerald-500/20 backdrop-blur-sm hover:bg-black/60 transition-colors">
              <div className="h-12 w-12 rounded-full bg-emerald-900/30 flex items-center justify-center mb-4 text-emerald-400 text-xl font-bold">3</div>
              <h3 className="text-lg font-medium text-emerald-300 mb-3">Reveal Hidden Architecture</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Through clear visuals, simple explanations and transparent lab logic – not mystification, not fear.
              </p>
            </Card>
          </div>
        </section>

        {/* Mission */}
        <section className="relative overflow-hidden rounded-3xl p-8 md:p-12">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl text-emerald-400 font-light">Mission: What Andara Does</h2>
              <p className="text-slate-300">Andara’s mission is practical and grounded in daily life.</p>

              <ul className="space-y-4">
                {[
                  { title: "Clarify & Condition", desc: "Help water release turbidity and invisible disorder." },
                  { title: "Natural Sulfate Ranges", desc: "Small bands inspired by biology and springs, not aggressive chemistry." },
                  { title: "Educate without Overwhelming", desc: "A Science Library for Water, Minerals, and Geometry." },
                  { title: "Safe Boundaries", desc: "Focus on water quality and environment support – no medical claims." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-emerald-200 block">{item.title}</strong>
                      <span className="text-slate-400 text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              {/* Visual Placeholder for Mission */}
              <div className="w-64 h-64 rounded-full border border-emerald-500/30 flex items-center justify-center bg-emerald-900/5 backdrop-blur-md animate-pulse-slow">
                <span className="text-emerald-500/50 font-mono tracking-widest text-xs">TERRAIN MISSION</span>
              </div>
            </div>
          </div>
        </section>

        {/* What We Stand For */}
        <section className="bg-slate-900/30 rounded-2xl p-8 border border-slate-800">
          <div className="text-center mb-10">
            <h2 className="text-2xl text-emerald-300">What Andara Stands For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-xl text-emerald-200 font-light">Clarity Over Hype</h3>
              <p className="text-slate-400 text-sm">No miracle promises. Instead: mechanisms, lab snapshots, before/after clarity, and mineral logic you can actually follow.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl text-emerald-200 font-light">Structure Over Noise</h3>
              <p className="text-slate-400 text-sm">Everything in Andara – labels, diagrams, code – follows a structured, crystalline logic: clusters, pillars, deep-links.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl text-emerald-200 font-light">Terrain Over Symptoms</h3>
              <p className="text-slate-400 text-sm">We invite a different question: Instead of “what symptom do I fight today?”, we ask: “What terrain do I want to build?”</p>
            </div>
          </div>
        </section>

      </div>
    </StandardPageLayout>
  );
}
