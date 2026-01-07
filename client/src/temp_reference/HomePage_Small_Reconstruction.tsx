
import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { Link } from "wouter";
import {
  Mountain,
  Hexagon,
  Droplets,
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  FlaskConical,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlocculationSequence } from "@/components/visuals/FlocculationSequence";
import { SmartImage } from "@/components/ui/SmartImage";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  // Reconstructing "Master Home Landing Page" (Dec 24 Standard)
  return (
    <StandardPageLayout
      title={<>Structure Your <span className="text-emerald-400">Living Water</span></>}
      subtitle="The primordial ionic sulfate mineral solution for cellular hydration."
      heroVariant="transparent"
      heroIcon={Mountain}
      registryId="glass-origin" // Use a strong hero image
      badges={[{ text: "Mineral Science", icon: Hexagon }]}
    >
      {/* 1. POSITIONING: What Is Andara? (3-Column Grid) */}
      {/* "From Primordial Source to Household Clarity" */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
            <Mountain className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-display text-white mb-2">Primordial Source</h3>
            <p className="text-muted-foreground text-sm">Harvested from ancient volcanic mineral deposits, untouched by modern pollution.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
            <Activity className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-display text-white mb-2">Sulfate Activation</h3>
            <p className="text-muted-foreground text-sm">Targeting the <strong>17–30 mg/L</strong> sulfate window to initiate water structuring.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
            <Droplets className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-display text-white mb-2">Conscious Design</h3>
            <p className="text-muted-foreground text-sm">A precise tool for creating rapid exclusion zone (EZ) water at home.</p>
          </div>
        </div>
      </section>

      {/* 2. MECHANISM: Flocculation & Clarification (Interactive) */}
      <section className="mb-24 bg-slate-900/50 rounded-3xl overflow-hidden border border-white/10">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs tracking-widest uppercase mb-6 w-fit">
              Mechanism of Action
            </div>
            <h2 className="text-3xl font-display text-white mb-6">Clarification &<br />Coherence</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span><strong>Flocculation:</strong> Naturally binds to suspended solids and turbidity.</span>
              </li>
              <li className="flex gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span><strong>Precipitation:</strong> Heavies fall to the bottom, leaving clear water.</span>
              </li>
              <li className="flex gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span><strong>Structure:</strong> Sets the geometric foundation for hydration.</span>
              </li>
            </ul>
            <Link href="/science/turbidity-clarity-flocculation">
              <Button variant="outline" className="w-fit gap-2">Deep Dive: Flocculation <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
          {/* Visual Side */}
          <div className="relative h-[400px] md:h-auto bg-black/50 border-t md:border-t-0 md:border-l border-white/10">
            <FlocculationSequence />
          </div>
        </div>
      </section>

      {/* 3. HYDRATION ECONOMICS & PRICING */}
      <section className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-display text-white mb-4">Hydration Economics</h2>
          <p className="text-muted-foreground">Choose your format. The 1 Liter Refill offers the best value for daily whole-household use.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* 100ml */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-medium text-white mb-2">The Ritual</h3>
              <div className="text-4xl font-display text-emerald-400 mb-2">100ml</div>
              <p className="text-sm text-muted-foreground mb-6">Glass Dropper Bottle</p>
              <SmartImage registryId="product-100ml-nature" className="h-40 mx-auto object-contain mb-6" />
              <div className="text-2xl text-white font-bold mb-6">€19.90</div>
              <Link href="/shop/andara-ionic-100ml">
                <Button className="w-full bg-white/10 hover:bg-white/20">Select 100ml</Button>
              </Link>
            </CardContent>
          </Card>

          {/* 1 Liter (Highlighted) */}
          <Card className="bg-emerald-900/10 border-emerald-500/30 relative transform md:-translate-y-4 shadow-2xl shadow-emerald-900/20">
            <div className="absolute top-0 inset-x-0 -mt-3 text-center">
              <span className="bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Best Value</span>
            </div>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-medium text-white mb-2">Source Refill</h3>
              <div className="text-4xl font-display text-emerald-400 mb-2">1 Liter</div>
              <p className="text-sm text-muted-foreground mb-6">Bulk HDPE Container</p>
              <SmartImage registryId="product-1l-refill" className="h-48 mx-auto object-contain mb-6 grayscale opacity-90 hover:grayscale-0 transition-all" />
              <div className="text-2xl text-white font-bold mb-2">€129.00</div>
              <p className="text-xs text-emerald-400 mb-6">Save €70 vs 10x 100ml</p>
              <Link href="/shop/andara-ionic-1l">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold">Select 1 Liter</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Bundle */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-medium text-white mb-2">The Setup</h3>
              <div className="text-4xl font-display text-emerald-400 mb-2">Bundle</div>
              <p className="text-sm text-muted-foreground mb-6">1L Refill + 100ml Bottle</p>
              <div className="h-40 flex items-center justify-center gap-2 mb-6">
                <SmartImage registryId="product-1l-refill" className="h-32 object-contain" />
                <span className="text-slate-500">+</span>
                <SmartImage registryId="product-100ml-nature" className="h-24 object-contain" />
              </div>
              <div className="text-2xl text-white font-bold mb-6">€139.00</div>
              <Link href="/products/andara-ionic-1l-bundles">
                <Button className="w-full bg-white/10 hover:bg-white/20">View Bundles</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. DISCOVERY: Science Pillars */}
      <section className="mb-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-display text-white">Science Library</h2>
          <Link href="/science">
            <Button variant="ghost" className="gap-2">View All <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Phases of Water", icon: FlaskConical, href: "/science/water-phases" },
            { title: "Sulfate Chemistry", icon: Hexagon, href: "/science/sulfate-chemistry" },
            { title: "Bioelectric Field", icon: Activity, href: "/science/bioelectric-water" },
            { title: "Crystalline Matrix", icon: Mountain, href: "/science/crystalline-matrix" },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <a className="group block p-6 bg-white/5 border border-white/10 rounded-xl hover:border-emerald-500/50 transition-colors">
                <item.icon className="w-8 h-8 text-slate-400 group-hover:text-emerald-400 mb-4 transition-colors" />
                <h3 className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">{item.title}</h3>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. AUTHORITY: Lab & Trust */}
      <section className="mb-24 py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="col-span-1">
            <h2 className="text-3xl font-display text-white mb-6">Verified<br />Quality</h2>
            <Link href="/trust/lab-methods">
              <Button variant="secondary">View Lab Reports</Button>
            </Link>
          </div>
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Heavy Metal Free</h4>
                <p className="text-sm text-slate-400">Rigorously tested for lead, arsenic, and mercury. Free from common environmental contaminants.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Scale className="w-8 h-8 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Standardized Potency</h4>
                <p className="text-sm text-slate-400">Every batch is verified for specific gravity and ionic sulfate concentration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SUPPORT: FAQ */}
      <section className="max-w-3xl mx-auto mb-20">
        <h2 className="text-2xl font-display text-white mb-8 text-center">Common Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-white/10">
            <AccordionTrigger className="text-white">Is this a supplement?</AccordionTrigger>
            <AccordionContent className="text-slate-400">
              Andara Ionic is classified as a Mineral Water Additive for water treatment and structuring. While it contains beneficial minerals, its primary regulatory function is water purification and conditioning.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-white/10">
            <AccordionTrigger className="text-white">How much should I use?</AccordionTrigger>
            <AccordionContent className="text-slate-400">
              For standard drinking water, use 1ml (approx 20 drops) per Liter. For aggressive purification of tap water, use up to 2-3ml per Liter. Consult the Dilution Table for specific applications.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-white/10">
            <AccordionTrigger className="text-white">Can I use it on plants?</AccordionTrigger>
            <AccordionContent className="text-slate-400">
              Yes, plants thrive on structured mineral water. Use a lower dose (0.5ml per Liter) for watering to improve soil conductivity and nutrient uptake.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

    </StandardPageLayout>
  );
}
