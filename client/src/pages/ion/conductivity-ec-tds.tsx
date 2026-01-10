/**
 * Conductivity (EC/TDS) Page
 * /ion/conductivity-ec-tds
 * 
 * Measurement & interpretation page with maximum visual education.
 */

import React from 'react';
import { motion } from 'framer-motion';
// SEO is handled by IONLayout
import { IONLayout } from '@/templates/gpt/IONLayout';
import { SmartImage } from '@/components/ui/SmartImage';
import { Link } from 'wouter';
import { ArrowRight, Zap, Activity, AlertTriangle, CheckCircle, XCircle, Scale, Droplets } from 'lucide-react';
import { IONFieldLines } from '@/components/visuals/IONFieldLines';
import { IONParticleField } from '@/components/visuals/IONParticleField';
import { SmartVideoEmbed, VideoBackground } from '@/components/SmartVideoEmbed';

// Animated comparison slider visual
function ConductivityMeter({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-black/30 p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/60">{label}</span>
        <span className={`text-sm font-mono ${color}`}>{value} µS/cm</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color === 'text-cyan-400' ? 'bg-cyan-400' : color === 'text-amber-400' ? 'bg-amber-400' : 'bg-purple-400'}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(value / 20, 100)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

// Myth busting card
function MythCard({ myth, truth, delay = 0 }: { myth: string; truth: string; delay?: number }) {
  return (
    <motion.div
      className="rounded-xl border border-red-500/20 bg-gradient-to-br from-red-500/10 via-transparent to-green-500/5 p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="flex gap-3 mb-3">
        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
        <p className="text-red-300 text-sm line-through decoration-red-400/50">{myth}</p>
      </div>
      <div className="flex gap-3">
        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
        <p className="text-green-300 text-sm">{truth}</p>
      </div>
    </motion.div>
  );
}

// Ion type badge
function IonBadge({ symbol, name, charge }: { symbol: string; name: string; charge: '+' | '-' }) {
  return (
    <motion.span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${charge === '+'
        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
        }`}
      whileHover={{ scale: 1.05 }}
    >
      <span className="font-mono font-bold">{symbol}</span>
      <span className="text-white/50">{name}</span>
    </motion.span>
  );
}

export default function ConductivityPage() {
  const sections = [
    {
      id: 'what-is-ec',
      headline: 'What Is Conductivity (EC)?',
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            <strong className="text-cyan-300">Electrical Conductivity (EC)</strong> measures how easily electricity flows through water.
          </p>
          <motion.blockquote
            className="border-l-4 border-cyan-500 pl-4 py-2 bg-cyan-500/5 rounded-r-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-cyan-200 italic">
              "Electricity in water moves through ions, not water molecules."
            </p>
          </motion.blockquote>
          <p className="text-white/70">
            Pure H₂O conducts almost nothing.<br />
            Add ions → conductivity rises.
          </p>
        </div>
      ),
      visual: (
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-900/30 to-indigo-900/30">
          <SmartImage
            registryId="ion-ec-measurement-schematic"
            className="w-full h-full object-contain"
            interaction="reveal"
          />
        </div>
      )
    },
    {
      id: 'what-is-tds',
      headline: 'What Is TDS?',
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            <strong className="text-purple-300">TDS (Total Dissolved Solids)</strong> is a calculated estimate derived from conductivity.
          </p>
          <motion.div
            className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-5 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <AlertTriangle className="w-5 h-5 text-amber-400 mb-2" />
            <p className="text-amber-200 font-semibold mb-2">Important Distinction:</p>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• TDS ≠ mineral quality</li>
              <li>• TDS ≠ bioavailability</li>
              <li>• TDS ≠ balance</li>
            </ul>
            <p className="text-white/60 text-sm mt-3">
              It is simply a <strong className="text-amber-300">quantity estimate</strong> of dissolved charged material.
            </p>
          </motion.div>
        </div>
      ),
      visual: (
        <div className="relative h-64 rounded-xl overflow-hidden">
          <SmartImage
            registryId="ion-tds-meter-limitations"
            className="w-full h-full object-cover"
            interaction="reveal"
          />
        </div>
      )
    },
    {
      id: 'ions-story',
      headline: 'Why Ions Are the Real Story',
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            Every dissolved ion contributes to conductivity:
          </p>
          <div className="flex flex-wrap gap-2 my-4">
            <IonBadge symbol="Na⁺" name="Sodium" charge="+" />
            <IonBadge symbol="Ca²⁺" name="Calcium" charge="+" />
            <IonBadge symbol="Mg²⁺" name="Magnesium" charge="+" />
            <IonBadge symbol="Cl⁻" name="Chloride" charge="-" />
            <IonBadge symbol="SO₄²⁻" name="Sulfate" charge="-" />
            <IonBadge symbol="HCO₃⁻" name="Bicarbonate" charge="-" />
          </div>
          <p className="text-white/70">
            But <strong className="text-cyan-300">not all ions behave the same</strong>.
          </p>
          <div className="grid gap-3 md:grid-cols-2 mt-4">
            <motion.div
              className="rounded-xl border border-green-500/20 bg-green-500/5 p-4"
              whileHover={{ scale: 1.02 }}
            >
              <CheckCircle className="w-4 h-4 text-green-400 mb-2" />
              <p className="text-green-300 text-sm font-semibold">Some ions:</p>
              <ul className="text-white/60 text-xs mt-2 space-y-1">
                <li>• Stabilize water</li>
                <li>• Support buffering</li>
                <li>• Bind unwanted compounds</li>
              </ul>
            </motion.div>
            <motion.div
              className="rounded-xl border border-red-500/20 bg-red-500/5 p-4"
              whileHover={{ scale: 1.02 }}
            >
              <XCircle className="w-4 h-4 text-red-400 mb-2" />
              <p className="text-red-300 text-sm font-semibold">Others:</p>
              <ul className="text-white/60 text-xs mt-2 space-y-1">
                <li>• Destabilize balance</li>
                <li>• Increase corrosion</li>
                <li>• Indicate contamination</li>
              </ul>
            </motion.div>
          </div>
          <p className="text-white/60 text-sm mt-4 italic">
            Conductivity cannot tell the difference alone.
          </p>
        </div>
      )
    },
    {
      id: 'same-tds-different',
      headline: 'Same TDS, Different Behavior',
      content: (
        <div className="space-y-4">
          <p className="text-white/80 mb-6">
            Why two waters with the same TDS can behave completely differently:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              className="relative rounded-xl border border-red-500/20 bg-gradient-to-br from-red-900/20 to-transparent p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-3 right-3 text-xs font-mono text-red-400/50">WATER A</div>
              <h4 className="font-semibold text-red-300 mb-3">Narrow Spectrum</h4>
              <ul className="text-white/60 text-sm space-y-2">
                <li>• Few ion types</li>
                <li>• Narrow mineral spectrum</li>
                <li>• Mostly sodium salts</li>
              </ul>
              <ConductivityMeter value={350} label="TDS" color="text-red-400" />
            </motion.div>

            <motion.div
              className="relative rounded-xl border border-green-500/20 bg-gradient-to-br from-green-900/20 to-transparent p-5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-3 right-3 text-xs font-mono text-green-400/50">WATER B</div>
              <h4 className="font-semibold text-green-300 mb-3">Broad Spectrum</h4>
              <ul className="text-white/60 text-sm space-y-2">
                <li>• Diverse mineral ions</li>
                <li>• Balanced cations/anions</li>
                <li>• Trace elements present</li>
              </ul>
              <ConductivityMeter value={350} label="TDS" color="text-green-400" />
            </motion.div>
          </div>
          <p className="text-center text-white/60 text-sm mt-4 italic">
            Same TDS. Completely different behavior.
          </p>
        </div>
      )
    },
    {
      id: 'misinterpretations',
      headline: 'Common Misinterpretations',
      layout: 'full-width' as const,
      content: (
        <div className="grid gap-4 md:grid-cols-3 mt-6">
          <MythCard
            myth="Low TDS is always better"
            truth="Extremely low-ion water can be corrosive, unstable, and mineral-stripping."
            delay={0}
          />
          <MythCard
            myth="High TDS means dirty"
            truth="Some of the cleanest waters on Earth are mineral-rich."
            delay={0.1}
          />
          <MythCard
            myth="Conductivity tells purity"
            truth="It only tells you how many charge carriers exist, not what they are."
            delay={0.2}
          />
        </div>
      )
    },
    {
      id: 'after-ionic-minerals',
      headline: 'Why Conductivity Changes After Adding Ionic Minerals',
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            When ionic minerals are introduced:
          </p>
          <motion.div
            className="grid gap-2 mt-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
          >
            {[
              { icon: Activity, text: 'EC often rises', color: 'text-cyan-400' },
              { icon: Scale, text: 'TDS readings shift', color: 'text-purple-400' },
              { icon: Droplets, text: 'Water behavior changes', color: 'text-amber-400' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-white/70">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-white/60 text-sm mt-4">
            This reflects increased ion availability and enhanced charge mobility — not necessarily "more solids."
          </p>
          <p className="text-white/60 text-sm">
            Sometimes you may also see flocculation, settling, and color change. These are <strong className="text-cyan-300">charge interactions</strong>, not contamination creation.
          </p>
          <Link href="/ion/ion-exchange">
            <span className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm mt-2 cursor-pointer">
              Deeper explanation <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      ),
      visual: (
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-cyan-900/30">
          <IONParticleField particleCount={100} interactive />
        </div>
      )
    },
    {
      id: 'three-lenses',
      headline: 'EC, ORP, and pH — Three Different Lenses',
      content: (
        <div className="space-y-4">
          <p className="text-white/70 mb-4">
            All three must be interpreted <strong className="text-cyan-300">together</strong>, not separately:
          </p>
          <div className="grid gap-3">
            <motion.div
              className="flex items-center gap-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4"
              whileHover={{ borderColor: 'rgba(6,182,212,0.4)' }}
            >
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="font-semibold text-cyan-300">EC / TDS</h4>
                <p className="text-white/60 text-sm">Quantity of ions</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center gap-4 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4"
              whileHover={{ borderColor: 'rgba(139,92,246,0.4)' }}
            >
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Scale className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-purple-300">pH</h4>
                <p className="text-white/60 text-sm">Balance of hydrogen activity</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
              whileHover={{ borderColor: 'rgba(245,158,11,0.4)' }}
            >
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-semibold text-amber-300">ORP</h4>
                <p className="text-white/60 text-sm">Electron availability / redox tendency</p>
              </div>
            </motion.div>
          </div>
          <Link href="/ion/orp-redox">
            <span className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm mt-4 cursor-pointer">
              Learn about ORP & Redox <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      )
    },
    {
      id: 'how-to-use',
      headline: 'How to Use Conductivity Wisely',
      content: (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              className="rounded-xl border border-green-500/20 bg-green-500/5 p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="w-5 h-5 text-green-400 mb-3" />
              <h4 className="font-semibold text-green-300 mb-2">Use EC/TDS to:</h4>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• Compare consistency</li>
                <li>• Monitor changes over time</li>
                <li>• Detect sudden anomalies</li>
              </ul>
            </motion.div>
            <motion.div
              className="rounded-xl border border-red-500/20 bg-red-500/5 p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <XCircle className="w-5 h-5 text-red-400 mb-3" />
              <h4 className="font-semibold text-red-300 mb-2">Do NOT use to:</h4>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• Judge health value</li>
                <li>• Rank water quality universally</li>
                <li>• Replace mineral analysis</li>
              </ul>
            </motion.div>
          </div>
          <p className="text-center text-white/60 text-sm mt-4 italic">
            Conductivity is a <strong className="text-cyan-300">dashboard gauge</strong>, not the engine.
          </p>
        </div>
      )
    }
  ];

  return (
    <IONLayout
      title="Conductivity — Reading the Electrical Language of Water"
      subtitle="Water quality is often reduced to a number. But numbers only speak one dialect of the full story. Conductivity measures how ions carry charge — not 'good' or 'bad.'"
      heroVisual={
        <VideoBackground
          videoId="water-structure-bg"
          keywords={["conductivity", "ion", "signal"]}
          overlayOpacity={0.4}
          className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20"
        />
      }
      sections={sections}
      showParticles={true}
      particleVariant="hero-only"
      cta={{
        headline: "Ready to understand electron flow?",
        body: "Learn how ORP and redox reactions reveal water's hidden dynamics.",
        buttonLabel: "Explore ORP & Redox",
        buttonHref: "/ion/orp-redox"
      }}
      relatedPages={[
        { title: "Ions in Water", href: "/ion/water", description: "Water behavior fundamentals" },
        { title: "Ion Exchange", href: "/ion/ion-exchange", description: "Nature's binding mechanism" },
        { title: "ORP & Redox", href: "/ion/orp-redox", description: "Electron flow explained" },
        { title: "Ionic Sulfates", href: "/ion/ionic-sulfates", description: "Product education" }
      ]}
    />
  );
}

