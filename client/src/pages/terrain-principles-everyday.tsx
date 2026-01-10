
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { VideoBackground } from "@/components/SmartVideoEmbed";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TerrainPrinciplesEverydayPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Terrain Principles in Everyday Life"
      subtitle="Simple Ways to Support Your Inner Landscape"
      backgroundElement={<VideoBackground keywords={["terrain", "daily", "ritual"]} overlayOpacity={0.3} />}
      vibeKeywords={['Daily Practice', 'Rhythm', 'Minerals']}
      seoTitle="Terrain Principles in Everyday Life – Simple Ways to Support Your Inner Landscape"
      seoDescription="Learn practical terrain principles you can apply in daily life: water quality, mineral signals, rhythm, light, and emotional climate. An educational guide to supporting your inner landscape."
      seoKeywords={["terrain principles", "everyday terrain", "terrain-based lifestyle", "supporting the terrain", "water and mineral terrain", "holistic terrain approach", "simple terrain practices"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">The Background Field of Your Day</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Terrain is not a theory you think about once a year. It is the water you drink, the light you meet, and the rhythms you keep. This page translates terrain awareness into simple principles—no protocols, no perfectionism, just direction.
          </p>
        </section>

        {/* Principle 1: Terrain First */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase">Principle 1</span>
            <h2 className="text-2xl text-white">Terrain First, Symptoms Second</h2>
            <p className="text-slate-400">
              In the old model, we fix symptoms. In terrain language, we reverse the order:
            </p>
            <div className="bg-slate-900 border-l-2 border-emerald-500 p-4 text-emerald-100 italic">
              "First ask: What is the state of my terrain? Then ask: What is this symptom trying to say?"
            </div>
            <p className="text-slate-500 text-sm">
              Instead of asking "What's wrong with me?", ask "What is my landscape trying to adjust?"
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 opacity-60">Symptom → Suppression</div>
            <div className="flex justify-center text-emerald-500">↓ vs</div>
            <div className="p-4 bg-emerald-950/20 rounded-lg border border-emerald-500/30 text-emerald-300">Environment → Listening → Adjustment</div>
          </div>
        </section>

        <Separator className="bg-slate-800" />

        {/* Principle 2: Water */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase">Principle 2</span>
            <h2 className="text-2xl text-white mb-2">Water as the Medium of Change</h2>
            <p className="text-slate-400">
              If you want to change your terrain gently, change what it is made of.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="text-emerald-200 mb-2">Quality</h3>
              <p className="text-slate-400 text-sm">Is it flat and lifeless, or clarified and mineral-aware? Andara Ionic helps here by conditioning the medium.</p>
            </Card>
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="text-emerald-200 mb-2">Timing</h3>
              <p className="text-slate-400 text-sm">Steady hydration vs. sudden flooding. Drinking with presence, not just rush.</p>
            </Card>
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="text-emerald-200 mb-2">Structure</h3>
              <p className="text-slate-400 text-sm">Water structuring on membranes depends on the water you bring in.</p>
            </Card>
          </div>
        </section>

        {/* Principle 3: Minerals */}
        <section className="bg-emerald-950/20 rounded-2xl p-8 border border-emerald-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase">Principle 3</span>
              <h2 className="text-2xl text-white">Minerals as Architecture</h2>
              <p className="text-slate-400">
                Minerals are the scaffolding. They buffer acids, build crystals, and carry charge.
              </p>
              <ul className="space-y-2 text-sm text-emerald-200/80">
                <li className="flex gap-2"><span>•</span> Not just numbers on a lab report.</li>
                <li className="flex gap-2"><span>•</span> They allow water and charge to organize.</li>
                <li className="flex gap-2"><span>•</span> Andara provides the sulfate signal here.</li>
              </ul>
            </div>
            <div className="p-6 bg-black/20 rounded-xl border border-emerald-500/10 text-center">
              <span className="block text-4xl mb-2">🏗️</span>
              <p className="text-slate-400 text-sm">Scaffolding & Wiring</p>
            </div>
          </div>
        </section>

        {/* Principle 4: Rhythm */}
        <section className="text-center space-y-6">
          <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase">Principle 4</span>
          <h2 className="text-2xl text-white">Rhythm Before Intensity</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Most try to fix terrain with extreme detoxes. The terrain responds better to small, repeatable gestures: one stable water ritual, one deep breath, one moment of light.
          </p>
          <p className="text-lg text-emerald-300 font-light">"Micro-consistency &gt; Macro-drama"</p>
        </section>

        {/* Principles 5-7 Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase">Principle 5</span>
            <h3 className="text-xl text-white">Charge & Calm</h3>
            <p className="text-slate-400 text-sm">
              Healthy terrain feels like clear current, not a power surge. Sometimes "more energy" isn't the answer—clearer flow is.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase">Principle 6</span>
            <h3 className="text-xl text-white">Expression is Communication</h3>
            <p className="text-slate-400 text-sm">
              Symptoms are often pressure valves. The terrain says "Something needs to move." Listen before you suppress.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase">Principle 7</span>
            <h3 className="text-xl text-white">Small Gestures Multiply</h3>
            <p className="text-slate-400 text-sm">
              A glass of clarified water. 10 mins of light. A pause. Small shifts in terrain accumulate into a different life.
            </p>
          </div>
        </section>

        <Separator className="bg-slate-800" />

        {/* Andara Integration */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl text-white">Andara in Everyday Terrain</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Andara Ionic is not a cure. It fits into the water layer: a primordial sulfate signal designed to clarify and condition the medium of your terrain. Make it a stable rhythm, not a short experiment.
          </p>
        </section>

      </div>
    </StandardPageLayout>
  );
}
