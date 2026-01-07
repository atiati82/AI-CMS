
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SulfateStructuringEZPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Sulfate & EZ Interfaces"
      subtitle="Where Minerals Shape Structured Water"
      vibeKeywords={['Interfaces', 'Charge', 'Structure']}
      seoTitle="Sulfate & EZ Interfaces – How Minerals Shape Structured Water Layers"
      seoDescription="Explore how sulfate ions interact with hydrophilic surfaces and Exclusion Zone (EZ) water, shaping charge separation, structure and flow at interfaces – without health claims."
      seoKeywords={["sulfate and ez water", "sulfate ez interfaces", "sulfate structured water", "exclusion zone sulfate", "mineral interfaces water", "charged surfaces and ez", "sulfate ions and structure"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">Two Worlds Overlapping</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            At first glance, Sulfate (classical chemistry) and EZ Water (the fourth phase) seem distinct. But at interfaces—membranes, gels, glass, minerals—they overlap. Sulfate ions participate in charge, structure, and flow, helping to shape the very layers that define organized water.
          </p>
        </section>

        {/* Concept Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* EZ Reminder */}
          <Card className="p-8 bg-slate-900 border-slate-800 space-y-4">
            <Badge variant="outline" className="text-cyan-400 border-cyan-500/30 mb-2">The Concept</Badge>
            <h3 className="text-2xl text-white">What Is EZ Water?</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dr. Pollack describes a layer of structured water forming next to hydrophilic surfaces. Solutes are excluded, negative charge builds up, and molecules arrange in quasi-crystalline patterns.
            </p>
            <div className="h-1 w-full bg-gradient-to-r from-cyan-900/0 via-cyan-500/50 to-cyan-900/0 opacity-50" />
            <p className="text-cyan-200/80 italic text-sm">
              "Wherever water meets a suitable surface and energy, it tends to self-organize."
            </p>
          </Card>

          {/* Sulfate Role */}
          <Card className="p-8 bg-slate-900 border-slate-800 space-y-4">
            <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 mb-2">The Architect</Badge>
            <h3 className="text-2xl text-white">Sulfate: The Quiet Architect</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sulfate (SO₄²⁻) carries two negative charges and is strongly hydrated. It doesn't just float; it influences the ordering of water around itself and participates in double-layer formation near surfaces.
            </p>
            <div className="h-1 w-full bg-gradient-to-r from-emerald-900/0 via-emerald-500/50 to-emerald-900/0 opacity-50" />
            <p className="text-emerald-200/80 italic text-sm">
              "Where you have interfaces + flow, sulfate helps organize the water."
            </p>
          </Card>

        </section>

        {/* Interaction Mechanism */}
        <section className="bg-slate-950 rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden">
          {/* Abstract Layer Visual */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-900/10 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl text-emerald-300">Where Interactions Happen</h2>
              <p className="text-slate-400 max-w-2xl">
                Imagine a hydrophilic surface + water + light + ions. Several things happen simultaneously:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <span className="text-emerald-500 font-mono text-xs">01</span>
                <h3 className="text-white font-medium">EZ Formation</h3>
                <p className="text-slate-500 text-sm">Water reorganizes, solutes are excluded, negative charge builds.</p>
              </div>
              <div className="space-y-2">
                <span className="text-emerald-500 font-mono text-xs">02</span>
                <h3 className="text-white font-medium">Charge Separation</h3>
                <p className="text-slate-500 text-sm">Protons accumulate away from the EZ. The system acts like a tiny battery.</p>
              </div>
              <div className="space-y-2">
                <span className="text-emerald-500 font-mono text-xs">03</span>
                <h3 className="text-white font-medium">Sulfate anchoring</h3>
                <p className="text-slate-500 text-sm">Sulfate screens charges and stabilizes the double layer, allowing structured zones to persist.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Activation Range */}
        <section className="bg-emerald-950/20 rounded-2xl p-8 border border-emerald-500/20 text-center space-y-6">
          <h2 className="text-2xl text-white">Why Range Matters (17–30 mg/L)</h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            In classical treatment and biological observations, a specific window appears. Too low, and flocculation is weak. Too high, and the system becomes overly saline. In the <strong>17–30 mg/L</strong> band, water often appears clearer, softer, and measurements suggest more stable interfacial organization.
          </p>
          <p className="text-emerald-400 font-medium">
            "A tuned sulfate activation range forms structured layers without overwhelming the system."
          </p>
        </section>

        {/* Andara Concept */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl text-emerald-300">How Andara Engages Interfaces</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Andara Ionic is designed to bring water into this activation band. Conceptually, this supports clarification (flocculation), charge conductivity, and a supportive environment for EZ formation—all while remaining palatable for daily use.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-500 uppercase tracking-widest font-mono">
            <span>Clarification</span>
            <span>•</span>
            <span>Conductivity</span>
            <span>•</span>
            <span>Structure</span>
          </div>
        </section>

        {/* Lab Bridge */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm text-slate-400">
          <div className="p-4 border-t border-slate-800">
            <strong className="block text-white mb-1">Pollack Lab</strong>
            Microsopes, gels, lasers.
          </div>
          <div className="p-4 border-t border-slate-800">
            <strong className="block text-white mb-1">Spring Field Lab</strong>
            Natural mineral deposits & flow.
          </div>
          <div className="p-4 border-t border-emerald-500/50">
            <strong className="block text-emerald-400 mb-1">Andara Home Lab</strong>
            Conditioned water in your glass. Simple clarity & feel.
          </div>
        </section>

        {/* Disclaimer */}
        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-600">
          We explain interactions between ions, water, and surfaces. We do not tell people what EZ interfaces will do in their body, nor do we make medical claims. We invite experimentation with precise, mineral-intelligent water conditioning.
        </div>

      </div>
    </StandardPageLayout>
  );
}
