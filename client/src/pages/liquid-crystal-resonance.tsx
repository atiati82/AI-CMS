
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function LiquidCrystalResonancePage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Resonance & Coherence"
      subtitle="The Language of Liquid Crystal Life"
      vibeKeywords={['Structured', 'Soft Matter', 'Oscillation']}
      seoTitle="Resonance & Coherence – The Language of Liquid Crystal Life"
      seoDescription="Discover how liquid crystalline structures in water and soft tissues can support resonance, coherence and field-based communication. Explains liquid crystals in clear language."
      seoKeywords={["liquid crystal resonance", "liquid crystal coherence", "soft matter fields", "biological liquid crystals", "resonant structures in water", "coherent oscillations"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">Between Solid & Liquid</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Life is rarely a rigid solid or a chaotic liquid. It thrives in the state between: the Liquid Crystal. Gels, membranes, and biological layers combine structure with flow, allowing them to resonate, communicate, and maintain coherence.
          </p>
        </section>

        {/* States Grid */}
        <section className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
          <div className="text-center mb-10">
            <h2 className="text-2xl text-white">Three States of Matter</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Solid */}
            <div className="text-center space-y-4">
              <div className="h-24 mx-auto bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-2">
                <div className="grid grid-cols-4 gap-1">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-slate-500 rounded-sm" />
                  ))}
                </div>
              </div>
              <h3 className="text-white font-medium">Solid</h3>
              <p className="text-slate-500 text-xs">Rigid order. Low adaptability. Like a frozen dance.</p>
            </div>

            {/* Liquid */}
            <div className="text-center space-y-4">
              <div className="h-24 mx-auto bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="absolute w-2 h-2 bg-blue-500/50 rounded-full" style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                  }} />
                ))}
              </div>
              <h3 className="text-white font-medium">Liquid</h3>
              <p className="text-slate-500 text-xs">High freedom. Low order. Like a chaotic crowd.</p>
            </div>

            {/* Liquid Crystal */}
            <div className="text-center space-y-4">
              <div className="h-24 mx-auto bg-emerald-950/20 rounded-xl border border-emerald-500/30 flex items-center justify-center relative overflow-hidden">
                <div className="flex flex-col gap-1.5 opacity-80">
                  <div className="flex gap-1.5 transform -skew-x-12">
                    {[...Array(5)].map((_, i) => <div key={`r1-${i}`} className="w-8 h-1 bg-emerald-400 rounded-full" />)}
                  </div>
                  <div className="flex gap-1.5 transform -skew-x-12 ml-2">
                    {[...Array(5)].map((_, i) => <div key={`r2-${i}`} className="w-8 h-1 bg-emerald-400 rounded-full" />)}
                  </div>
                </div>
              </div>
              <h3 className="text-emerald-300 font-medium">Liquid Crystal</h3>
              <p className="text-emerald-400/70 text-xs">Structured flow. Alignment with flexibility. The state of life.</p>
            </div>
          </div>
        </section>

        {/* Resonance & Coherence */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl text-white">Resonance</h2>
              <p className="text-slate-400 text-sm">
                A response is strongest when driving frequency matches natural structure. Like pushing a swing at the right moment.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl text-white">Coherence</h2>
              <p className="text-slate-400 text-sm">
                When many oscillators agree. Domains line up. The global signal becomes clear and strong instead of noisy.
              </p>
            </div>

            <div className="p-4 bg-slate-900 border-l-2 border-purple-500">
              <p className="text-slate-300 text-sm italic">
                "Resonance describes the fit. Coherence describes the collective agreement."
              </p>
            </div>
          </div>

          {/* Wave Viz */}
          <div className="h-64 bg-black/40 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-8 space-y-6 overflow-hidden">
            {/* Incoherent */}
            <div className="w-full flex items-center justify-center gap-1 h-8 opacity-30">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="w-1 bg-slate-400" style={{ height: `${Math.random() * 100}%` }} />
              ))}
            </div>
            {/* Coherent */}
            <div className="w-full flex items-center justify-center gap-0.5 h-12">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="w-1.5 bg-purple-500 rounded-t rounded-b" style={{
                  height: `${(Math.sin(i * 0.3) + 1) * 40 + 20}%`,
                  opacity: 0.8
                }} />
              ))}
            </div>
            <p className="text-xs text-purple-400 uppercase tracking-widest">Coherent Oscillations</p>
          </div>
        </section>

        <Separator className="bg-slate-800" />

        {/* Water & Minerals */}
        <section className="bg-emerald-950/10 rounded-2xl p-8 border border-emerald-500/20 space-y-6 text-center">
          <h2 className="text-2xl text-white">Water Layers as Soft Crystal</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            Near hydrophilic surfaces, water organizes into layered, ordered regions. These layers can support standing waves and communicate via resonance. Minerals (ions) tune the instrument, changing conductivity and how fields propagate.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">Ordered Layers</Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-500/30">Ionic Tuning</Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-500/30">Field Communication</Badge>
          </div>
        </section>

        {/* Terrain View */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-xl text-white">Terrain Thinking</h2>
          <p className="text-sm text-slate-400">
            We ask: How responsive is the medium? Are signals dissipated or amplified? "Resonance & Coherence" describes the quality of the bioelectric terrain—its ability to hold stable patterns—not a specific medical condition.
          </p>
        </section>

        {/* Footer */}
        <div className="text-center text-xs text-slate-600 pt-8 border-t border-slate-800 max-w-2xl mx-auto">
          This page maps the physics of soft matter and coherence for educational purposes. We do not make medical claims or promise specific health outcomes.
        </div>

      </div>
    </StandardPageLayout>
  );
}
