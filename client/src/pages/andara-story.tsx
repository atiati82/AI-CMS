
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export default function AndaraStoryPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="The Andara Story"
      subtitle="From Volcanoes to Vitality"
      vibeKeywords={['Origins', 'Primordial', 'Evolution']}
      seoTitle="The Andara Story – From Volcanoes to Vitality"
      seoDescription="Follow the Andara Ionic journey from volcanic mineral origins to a modern water clarification and conditioning concept focused on structure, minerals and terrain."
      seoKeywords={["andara ionic story", "from volcanoes to vitality", "primordial mineral water", "ionic sulfate mineral story", "origin of andara ionic", "structured water narrative"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-24">

        {/* Chapter 1: Rocks */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-emerald-500 font-mono text-xs tracking-[0.2em] uppercase">Chapter 1</span>
            <h2 className="text-3xl font-light text-slate-100">It Starts with Rocks, Not Marketing</h2>
            <p className="text-slate-400 leading-relaxed">
              Long before there was a logo or a blue bottle, there were rocks. Volcanic, layered, ancient – carrying sulfate-rich mineral signatures shaped by heat, pressure and time.
            </p>
            <blockquote className="border-l-2 border-emerald-500/50 pl-6 italic text-slate-300">
              “If we can read these mineral codes, can we teach modern water to behave more like primordial spring water?”
            </blockquote>
          </div>
          <div className="relative h-64 md:h-80 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950" />
            <p className="relative z-10 text-amber-700/50 font-mono">VOLCANIC_ORIGIN_LAYER</p>
          </div>
        </section>

        {/* Chapter 2: Primordial Ionic */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="md:order-2 space-y-6">
            <span className="text-emerald-500 font-mono text-xs tracking-[0.2em] uppercase">Chapter 2</span>
            <h2 className="text-3xl font-light text-slate-100">Discovering Primordial Ionic Sulfate Minerals</h2>
            <p className="text-slate-400 leading-relaxed">
              The aim was not to “dump minerals” into water, but to whisper a structure into it. The Andara path moved towards:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4 p-4 bg-emerald-950/10 rounded-lg border border-emerald-500/10">
                <span className="text-emerald-400 font-bold">Ionic</span>
                <span className="text-slate-400 text-sm">Minerals dissolved into charged particles for bioavailability.</span>
              </li>
              <li className="flex gap-4 p-4 bg-emerald-950/10 rounded-lg border border-emerald-500/10">
                <span className="text-emerald-400 font-bold">Sulfate Partners</span>
                <span className="text-slate-400 text-sm">A form known from nature, springs, and classical water treatment.</span>
              </li>
              <li className="flex gap-4 p-4 bg-emerald-950/10 rounded-lg border border-emerald-500/10">
                <span className="text-emerald-400 font-bold">Micro-Dosed</span>
                <span className="text-slate-400 text-sm">Operating in small bands where water becomes clearer and organised.</span>
              </li>
            </ul>
          </div>
          <div className="md:order-1 relative h-64 md:h-80 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30" />
            <p className="relative z-10 text-emerald-500/30 font-mono">IONIC_DISPERSION</p>
          </div>
        </section>

        {/* Chapter 3: Terrain Shift */}
        <section className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-emerald-500 font-mono text-xs tracking-[0.2em] uppercase">Chapter 3</span>
          <h2 className="text-3xl md:text-4xl font-light text-white">The Shift from “Supplements” to “Water Terrain”</h2>
          <p className="text-slate-400 text-lg">
            Andara looked underneath the "more supplements, more hacks" culture and asked a deeper question.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <Card className="p-6 bg-slate-950 border-slate-800">
              <h3 className="text-emerald-400 mb-2">Quality & Structure</h3>
              <p className="text-slate-500 text-sm">What if we start with water quality and structure?</p>
            </Card>
            <Card className="p-6 bg-slate-950 border-slate-800">
              <h3 className="text-emerald-400 mb-2">Carrier Capacity</h3>
              <p className="text-slate-500 text-sm">What if water itself becomes a better carrier of information, charge, and minerals?</p>
            </Card>
            <Card className="p-6 bg-slate-950 border-slate-800">
              <h3 className="text-emerald-400 mb-2">Terrain First</h3>
              <p className="text-slate-500 text-sm">What if a terrain-first approach can support everything else?</p>
            </Card>
          </div>
          <p className="text-slate-400 italic">
            This is why Andara is not presented as a pill or cure, but as a water clarification and conditioning companion.
          </p>
        </section>

        {/* Chapter 4: The Library */}
        <section className="relative p-8 md:p-12 rounded-3xl overflow-hidden border border-emerald-500/30 bg-emerald-950/20">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl text-emerald-300">Building the Andara Library</h2>
              <p className="text-slate-400">
                If we want people to truly understand water again, we must open the library. The Andara Story is not just a product story—it is a structured universe for anyone who feels the call to go deeper.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Water Science', 'Mineral Science', 'Crystalline Matrix', 'Bioelectricity', 'Microbiome'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/science-library">
                <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                  Explore the Library <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center opacity-50">
              {/* Abstract Library Visual */}
              <div className="grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-12 h-16 bg-emerald-500/20 rounded-sm border border-emerald-500/10" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Today */}
        <section className="text-center space-y-6 pt-12 border-t border-slate-800">
          <h2 className="text-2xl text-white font-light">Today – A Simple Blue Bottle with a Large Background</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Behind the simplicity of our 100ml and 1L bottles stands a long trail of curiosity, testing, and refining language so that regulators feel safe, curious minds feel seen, and your water glass becomes a little more like a spring.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/shop">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[200px]">
                Visit the Shop
              </Button>
            </Link>
          </div>
        </section>

      </div>
    </StandardPageLayout>
  );
}
