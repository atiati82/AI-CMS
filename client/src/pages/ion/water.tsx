/**
 * Ions in Water Page
 * /ion/water
 * 
 * The Water domain page of the ION educational cluster.
 */

import React from 'react';
import { motion } from 'framer-motion';
// SEO handled by IONLayout
import { IONLayout } from '@/templates/gpt/IONLayout';
import { SmartVideoEmbed, VideoBackground } from '@/components/SmartVideoEmbed';
import { SmartImage } from '@/components/ui/SmartImage';
import { Link } from 'wouter';
import { ArrowRight, Droplets, Zap, RotateCcw, Scale, Waves, Activity, type LucideIcon } from 'lucide-react';
import { IONParticleField } from '@/components/visuals/IONParticleField';
import { IONFieldLines } from '@/components/visuals/IONFieldLines';

// Animated behavior card
function BehaviorCard({
  num,
  title,
  description,
  href,
  icon: Icon,
  delay = 0
}: {
  num: string;
  title: string;
  description: string;
  href?: string;
  icon: LucideIcon;
  delay?: number;
}) {
  const content = (
    <motion.div
      className={`rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/5 p-5 ${href ? 'cursor-pointer hover:border-cyan-500/40 hover:bg-cyan-500/15' : ''} transition-all`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={href ? { scale: 1.02 } : undefined}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-cyan-500/20 p-3">
          <Icon className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-cyan-400">{num}</span>
            <h4 className="font-semibold text-white">{title}</h4>
            {href && <ArrowRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </div>
          <p className="text-sm text-white/60">{description}</p>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href} className="group block">{content}</Link>;
  }
  return content;
}

// Water type card with unique visuals
function WaterTypeCard({
  title,
  ec,
  ions,
  buffering,
  gradient
}: {
  title: string;
  ec: string;
  ions: string;
  buffering: string;
  gradient: string;
}) {
  return (
    <motion.div
      className={`rounded-xl border border-white/10 p-5 ${gradient}`}
      whileHover={{ scale: 1.02 }}
    >
      <h4 className="font-semibold text-white mb-3">{title}</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-white/50">EC:</span>
          <span className="text-cyan-300">{ec}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/50">Ions:</span>
          <span className="text-purple-300">{ions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/50">Buffering:</span>
          <span className="text-amber-300">{buffering}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function IonWaterPage() {
  const sections = [
    {
      id: 'dissolved-minerals',
      headline: 'What Are "Dissolved Minerals" Actually Doing?',
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            When minerals dissolve, they don't float as rocks.<br />
            They become <strong className="text-cyan-300">charged ions</strong>.
          </p>
          <p className="text-white/70">
            That charge means they:
          </p>
          <motion.ul
            className="space-y-2 mt-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
          >
            {[
              { icon: Zap, text: 'Carry electricity (conductivity)' },
              { icon: RotateCcw, text: 'Attach to surfaces (filters, clays, biofilms)' },
              { icon: Scale, text: 'Participate in buffering chemistry' },
              { icon: Waves, text: 'Influence clustering and settling of particles' }
            ].map((item, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-3 text-white/70"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <item.icon className="w-4 h-4 text-cyan-400" />
                {item.text}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      ),
      visual: (
        <div className="relative h-64 rounded-xl overflow-hidden">
          <SmartImage
            registryId="ion-flow-circuit"
            className="w-full h-full object-contain"
            interaction="reveal"
          />
        </div>
      )
    },
    {
      id: 'core-behaviors',
      headline: 'The 5 Core Ion Behaviors in Water',
      layout: 'full-width' as const,
      content: (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <BehaviorCard
            num="01"
            title="Conductivity (EC)"
            description="Pure H₂O barely conducts electricity. Ions are the carriers of current."
            href="/ion/conductivity-ec-tds"
            icon={Zap}
            delay={0}
          />
          <BehaviorCard
            num="02"
            title="Buffering (pH Stability)"
            description="Buffers are ion pairs that resist pH swings. Bicarbonate systems are nature's classic example."
            icon={Scale}
            delay={0.1}
          />
          <BehaviorCard
            num="03"
            title="Ion Exchange"
            description="Minerals like clays and zeolites swap ions with water — nature's key purification process."
            href="/ion/ion-exchange"
            icon={RotateCcw}
            delay={0.2}
          />
          <BehaviorCard
            num="04"
            title="Binding + Adsorption"
            description="Unwanted compounds are removed by binding to charged surfaces, then settling or filtering."
            icon={Droplets}
            delay={0.3}
          />
          <BehaviorCard
            num="05"
            title="Redox / ORP"
            description="Not 'good/bad' — it's a readout of electron flow potential. Shifts with minerals and reactions."
            href="/ion/orp-redox"
            icon={Activity}
            delay={0.4}
          />
        </div>
      )
    },
    {
      id: 'flocculation',
      headline: 'Why Water Turns Yellow or Forms Floc',
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            Sometimes when ionic minerals meet processed water, you can see:
          </p>
          <motion.div
            className="flex flex-wrap gap-3 my-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm">Yellow tint</span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">Floating clouds</span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">Sinking particles</span>
          </motion.div>
          <p className="text-white/70">
            This can be a sign of <strong className="text-cyan-300">charge-based flocculation</strong>: particles that were stable and invisible become destabilized and clump.
          </p>
          <p className="text-white/60 text-sm">
            These can include dissolved organics, iron complexes, or colloids that were previously dispersed.
          </p>
          <Link href="/ion/faq">
            <span className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm mt-2 cursor-pointer">
              Learn more in FAQ <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      ),
      visual: (
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-amber-900/30 to-cyan-900/30">
          <IONFieldLines variant="flow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-6xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              💧
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'natural-waters',
      headline: 'Conductivity in Natural Waters',
      content: (
        <div className="space-y-4">
          <p className="text-white/70 mb-6">
            Nature uses <strong className="text-cyan-300">context</strong>, not targets:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <WaterTypeCard
              title="Mountain Spring"
              ec="Moderate"
              ions="Diverse minerals"
              buffering="Stable"
              gradient="bg-gradient-to-br from-cyan-900/30 to-green-900/20"
            />
            <WaterTypeCard
              title="Ocean"
              ec="Very High"
              ions="Na⁺/Cl⁻ dominant"
              buffering="Massive reservoir"
              gradient="bg-gradient-to-br from-blue-900/30 to-cyan-900/20"
            />
            <WaterTypeCard
              title="Rainwater"
              ec="Very Low"
              ions="Few carriers"
              buffering="Aggressive (hungry)"
              gradient="bg-gradient-to-br from-slate-800/30 to-purple-900/20"
            />
          </div>
        </div>
      )
    },
    {
      id: 'river-purification',
      headline: 'How Rivers Purify Themselves',
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            A river becomes clearer downstream not by "stopping dirt," but by:
          </p>
          <motion.div
            className="grid gap-2 mt-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
              hidden: {}
            }}
          >
            {[
              'Mineral contact (ions released from stones)',
              'Turbulence and oxygenation',
              'Settling zones',
              'Biological processing',
              'Adsorption onto sediments'
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <span className="text-white/70 text-sm">{item}</span>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-white/60 text-sm mt-4 italic">
            Your goal is to mimic this intelligence in a controlled way.
          </p>
        </div>
      ),
      visual: (
        <div className="relative h-64 rounded-xl overflow-hidden">
          <IONParticleField particleCount={80} interactive />
        </div>
      )
    },
    {
      id: 'andara-bridge',
      headline: 'Andara Ionic Bridge',
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            Andara Ionic Sulfates are designed to support water behavior via:
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm">
              Spectrum ions
            </span>
            <span className="px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm">
              Charge-based interaction
            </span>
            <span className="px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm">
              Settling & binding
            </span>
            <span className="px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-sm">
              Mineral coherence
            </span>
          </div>
          <div className="flex gap-4 mt-6">
            <Link href="/ion/ionic-sulfates">
              <motion.span
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/30 px-5 py-3 text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                Ionic Sulfates <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link href="/shop">
              <motion.span
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 px-5 py-3 text-cyan-300 hover:bg-cyan-500/30 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                Shop <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </div>
        </div>
      )
    }
  ];

  return (
    <IONLayout
      title="Ions in Water – The Charged State of Liquidity"
      subtitle="Water becomes more than H₂O when ions are present. They provide the conductivity, buffering, and signal-carrying capacity that makes water biologically active."
      heroVisual={<VideoBackground keywords={["hydration", "shell", "molecule"]} overlayOpacity={0.4} className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20" />}
      sections={sections}
      showParticles={true}
      particleVariant="hero-only"
      cta={{
        headline: "Want to understand your water readings?",
        body: "Start with the measurements that matter.",
        buttonLabel: "Learn About Conductivity",
        buttonHref: "/ion/conductivity-ec-tds"
      }}
      relatedPages={[
        { title: "Ion Exchange", href: "/ion/ion-exchange", description: "Nature's filter mechanism" },
        { title: "Conductivity (EC/TDS)", href: "/ion/conductivity-ec-tds", description: "What measurements reveal" },
        { title: "ORP & Redox", href: "/ion/orp-redox", description: "Electron flow explained" },
        { title: "Ionic Sulfates", href: "/ion/ionic-sulfates", description: "Product education" }
      ]}
    />
  );
}
