
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { VideoBackground } from "@/components/SmartVideoEmbed";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function TerrainModelOverviewPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Terrain Model Overview"
      subtitle="A New Way to See Health & Water"
      backgroundElement={<VideoBackground keywords={["terrain", "overview", "ecosystem", "landscape", "green"]} overlayOpacity={0.3} />}
      vibeKeywords={['Internal Landscape', 'Bioelectricity', 'Water']}
      seoTitle="Terrain Model Overview – A New Way to See Health, Water and Life"
      seoDescription="Discover the terrain model: a perspective that focuses on internal environment, water, minerals, and bioelectric balance instead of symptom hunting."
      seoKeywords={["terrain model overview", "terrain model philosophy", "terrain vs germ theory", "internal terrain concept", "bioelectric terrain", "water minerals terrain"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">From Fighting to Tending</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            For a century, the story was: "An enemy appears, and we must fight it." The terrain model starts differently. It asks about the environment—the water that carries signals, the minerals that set voltage, and the fields that organize flow. It is a map, not a magic bullet.
          </p>
        </section>

        {/* Paradigm Shift Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Germ Centered */}
          <div className="space-y-6 opacity-80">
            <h3 className="text-xl text-slate-400 font-medium border-b border-slate-800 pb-2">The Old Story (Germ-Centered)</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex gap-3">
                <span className="text-red-500/50 font-mono">01</span>
                <span>Identify problem (symptom, label).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500/50 font-mono">02</span>
                <span>Locate enemy (pathogen, defect).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500/50 font-mono">03</span>
                <span>Apply force (suppression, attack).</span>
              </li>
            </ul>
            <p className="text-xs text-slate-600 italic">
              Narrows attention to one enemy. Treats the body as a battlefield.
            </p>
          </div>

          {/* Terrain Centered */}
          <div className="space-y-6">
            <h3 className="text-xl text-emerald-400 font-medium border-b border-emerald-500/30 pb-2">The Terrain Perspective</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="text-emerald-500 font-mono">01</span>
                <span>What is the state of the internal environment?</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-mono">02</span>
                <span>How is water structured and flowing?</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-mono">03</span>
                <span>What do we need to restore so the system can do what it knows?</span>
              </li>
            </ul>
            <p className="text-xs text-emerald-500/70 italic">
              Restores capacity. Treats the body as a living landscape.
            </p>
          </div>
        </section>

        {/* The 4 Pillars */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl text-white">The 4 Pillars of Terrain</h2>
            <p className="text-slate-400">In the Andara perspective, terrain is a constellation of fields.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-slate-900 border-slate-800 hover:border-blue-500/30 transition-colors">
              <Badge variant="outline" className="mb-3 text-blue-400 border-blue-500/30">1. Water</Badge>
              <p className="text-slate-400 text-sm">Not just a solvent, but a structural matrix and signal carrier. Is it clear and coherent?</p>
            </Card>

            <Card className="p-6 bg-slate-900 border-slate-800 hover:border-amber-500/30 transition-colors">
              <Badge variant="outline" className="mb-3 text-amber-400 border-amber-500/30">2. Minerals</Badge>
              <p className="text-slate-400 text-sm">The elemental blueprint. Charge carriers, enzyme cofactors, and anchors for structure.</p>
            </Card>

            <Card className="p-6 bg-slate-900 border-slate-800 hover:border-purple-500/30 transition-colors">
              <Badge variant="outline" className="mb-3 text-purple-400 border-purple-500/30">3. Bioelectricity</Badge>
              <p className="text-slate-400 text-sm">The invisible wiring. Membrane voltage, proton gradients, and current loops.</p>
            </Card>

            <Card className="p-6 bg-slate-900 border-slate-800 hover:border-emerald-500/30 transition-colors">
              <Badge variant="outline" className="mb-3 text-emerald-400 border-emerald-500/30">4. Microbiome</Badge>
              <p className="text-slate-400 text-sm">The janitors and builders. They interpret the terrain—adapting to stagnation or flow.</p>
            </Card>
          </div>
        </section>

        {/* The Map Concept */}
        <section className="bg-emerald-950/10 rounded-3xl p-8 md:p-12 border border-emerald-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl text-emerald-200">A Multi-Layered Map</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                When you stop chasing symptoms, you start reading layers. Physical (tissues), Bioelectric (voltage), Biochemical (pH, redox), and Psycho-Emotional (stress/rest).
              </p>
              <div className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/10">
                <p className="text-emerald-400 italic text-sm">
                  "Each layer interacts with the others. Terrain coherence means bringing them back into harmony."
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 opacity-60">
              <div className="h-2 bg-emerald-500/20 rounded-full w-full" />
              <div className="h-2 bg-emerald-500/40 rounded-full w-3/4 self-end" />
              <div className="h-2 bg-emerald-500/60 rounded-full w-1/2 self-end" />
              <div className="h-2 bg-emerald-500/80 rounded-full w-full" />
              <div className="h-2 bg-emerald-500 rounded-full w-2/3" />
            </div>
          </div>
        </section>

        {/* Relevance to Andara */}
        <section className="text-center space-y-8">
          <h2 className="text-2xl text-emerald-300">Why This Matters for Andara</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Andara focuses on water, ionic sulfate minerals, and bioelectric behavior. Our goal is to clarify water so it becomes structurally and electrically more intelligent—restoring capacity rather than treating disease.
          </p>

          <div className="flex justify-center">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-sm">
              <h3 className="text-white font-medium mb-2">Shift Your Language</h3>
              <div className="text-sm space-y-3">
                <div>
                  <span className="block text-red-500/50 text-xs">From:</span>
                  <span className="text-slate-400">"What's wrong with me?"</span>
                </div>
                <div className="flex justify-center text-slate-600">↓</div>
                <div>
                  <span className="block text-emerald-500/50 text-xs">To:</span>
                  <span className="text-emerald-400">"What is my terrain trying to express?"</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="bg-slate-800" />

        {/* Library Context */}
        <section className="text-center space-y-4 text-sm text-slate-500">
          <h3 className="text-white font-medium">Part of the Andara Library</h3>
          <p>
            Use this page as a gateway to: <span className="text-emerald-500">Mineral Science</span>, <span className="text-emerald-500">Bioelectricity</span>, and <span className="text-emerald-500">Terrain Maps</span>.
          </p>
        </section>

      </div>
    </StandardPageLayout>
  );
}
