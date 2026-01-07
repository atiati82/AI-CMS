
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function IonTransportPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Ion Transport: Channels, Pumps & Fields"
      subtitle="The Music of Charge"
      vibeKeywords={['Flow', 'Gradient', 'Voltage']}
      seoTitle="Ion Transport – Channels, Pumps & Fields"
      seoDescription="Discover how ions move through channels, pumps and fields in water and biology. Explains ion transport in clear, visual language showing how minerals and charge shape life."
      seoKeywords={["ion transport", "ion channels", "ion pumps", "electrochemical gradients", "membrane potential", "ion movement in water", "charge separation"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">Life's Invisible Current</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Wherever there is life, there is movement of ions. Tiny charged particles drifting, flowing, and being pumped against the gradient. This movement builds the voltage that powers everything—from a thought to a heartbeat.
          </p>
        </section>

        {/* What are ions */}
        <section className="text-center space-y-8">
          <div className="inline-block bg-slate-900 border border-slate-800 rounded-full px-6 py-2 text-sm text-slate-400">
            <span className="text-emerald-400 font-bold mr-2">Cations (+)</span> Na, K, Ca, Mg
            <span className="mx-4 text-slate-600">|</span>
            <span className="text-blue-400 font-bold mr-2">Anions (-)</span> Cl, SO₄, HCO₃
          </div>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Imagine water as a soft medium, and ions as tiny lit-up particles. Their movement forms the landscape of charge.
          </p>
        </section>

        {/* The 4 Drivers */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-slate-900 border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-slate-500">1</div>
            <h3 className="text-emerald-300 mb-2 relative z-10">Diffusion</h3>
            <p className="text-slate-400 text-xs relative z-10">
              High to Low. Spreading out until even. Powered by random motion.
            </p>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-slate-500">2</div>
            <h3 className="text-blue-300 mb-2 relative z-10">Electric Field</h3>
            <p className="text-slate-400 text-xs relative z-10">
              Opposites attract. +/- pull. Guides ions like gravity guides stones.
            </p>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-slate-500">3</div>
            <h3 className="text-purple-300 mb-2 relative z-10">Flow</h3>
            <p className="text-slate-400 text-xs relative z-10">
              Riding the river. Bulk water movement carries ions along.
            </p>
          </Card>

          <Card className="p-6 bg-emerald-950/20 border-emerald-500/30 relative overflow-hidden group shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-emerald-500">4</div>
            <h3 className="text-emerald-400 mb-2 relative z-10">Pumps</h3>
            <p className="text-emerald-100/70 text-xs relative z-10">
              Pushing uphill. Spending energy to create a battery (gradient).
            </p>
          </Card>
        </section>

        {/* Channels vs Pumps Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div className="space-y-6">
            <h2 className="text-2xl text-white">Channels vs. Pumps</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 rounded-lg border-l-2 border-blue-500">
                <h3 className="text-white font-medium">Ion Channels (Doors)</h3>
                <p className="text-slate-400 text-sm">
                  Allow ions to rush <span className="text-blue-400">down</span> their gradient. Passive, fast, like opening a floodgate.
                </p>
              </div>
              <div className="p-4 bg-slate-900 rounded-lg border-l-2 border-emerald-500">
                <h3 className="text-white font-medium">Ion Pumps (Workers)</h3>
                <p className="text-slate-400 text-sm">
                  Push ions <span className="text-emerald-400">against</span> the gradient. Active, slow, constantly recharging the battery.
                </p>
              </div>
            </div>
          </div>

          <div className="h-64 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center p-8 space-y-4">
            <p className="text-slate-500 text-sm italic">
              "Pumps charge the battery. Channels use the charge."
            </p>
            <div className="flex gap-2">
              <div className="h-2 w-12 bg-emerald-500 rounded-full animate-pulse" />
              <div className="h-2 w-12 bg-emerald-500/50 rounded-full" />
              <div className="h-2 w-12 bg-emerald-500/20 rounded-full" />
            </div>
          </div>
        </section>

        <Separator className="bg-slate-800" />

        {/* Musical Metaphor */}
        <section className="bg-slate-900/50 rounded-3xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-2xl text-white">The Music of Charge</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Think of ions as notes, channels as instruments, and the field as the tempo. When gradients are clear and pumps are steady, you get a coherent song. When gradients collapse, the music becomes noise.
          </p>
          <div className="flex justify-center gap-8 text-xs text-slate-500 uppercase tracking-widest font-mono mt-4">
            <span>Rhythm</span>
            <span>•</span>
            <span>Flow</span>
            <span>•</span>
            <span>Harmony</span>
          </div>
        </section>

        {/* Andara Relevance */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl text-emerald-300">Water Quality & Transport</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            Ions move through water. If the medium is chaotic, transport suffers. Andara Ionic focuses on conditioning the water itself—clarifying the medium and providing a stable sulfate mineral background—so the music of charge can play clearly.
          </p>
        </section>

        {/* Footer */}
        <div className="text-center text-xs text-slate-600 pt-8 border-t border-slate-800">
          We teach the physics of ion transport to explain bioelectricity. This map is for educational purposes and does not constitute medical advice or treatment.
        </div>

      </div>
    </StandardPageLayout>
  );
}
