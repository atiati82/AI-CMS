import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import {
    Sprout,
    Stethoscope,
    Scale,
    ArrowRight,
    Activity
} from "lucide-react";
import { Link } from "wouter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TerrainVsSymptomPage() {
    return (
        <StandardPageLayout
            title={<>Terrain vs <span className="text-green-400">Symptom</span></>}
            subtitle="Changing the Question."
            heroVariant="green"
            heroIcon={Sprout}
            registryId="terrain-landscape"
            badges={[{ text: "Holistic Model", icon: Scale }]}
            seoTitle="Terrain vs Symptom – Changing the Question | Andara"
            seoDescription="Understand the Terrain Model of health. Why treating the symptoms often misses the underlying bio-electric environment (the terrain)."
        >
            {/* 1. HERO CONTEXT */}
            <div className="prose prose-invert max-w-3xl mx-auto mb-20 text-center">
                <p className="text-2xl font-light text-white leading-relaxed mb-6">
                    "Instead of asking 'What’s wrong?', ask 'What’s the terrain like?'"
                </p>
                <p className="text-xl text-muted-foreground">
                    A symptom is just a signal light on the dashboard. The Terrain is the engine, the oil, and the road. To change the signal, you must tend to the environment.
                </p>
            </div>

            {/* 2. DEFINITION */}
            <section className="mb-24 flex flex-col items-center">
                <div className="bg-green-900/10 border border-green-500/20 p-8 rounded-2xl max-w-3xl text-center">
                    <h2 className="text-2xl font-display text-green-400 mb-4">What Is "Terrain"?</h2>
                    <p className="text-green-100/80 leading-relaxed">
                        Your inner ecosystem. It is the sum of your fluids (blood, lymph, water), your mineral balance, your voltage reserves, your microbiome, and your emotional climate. If the terrain is healthy, pathogens cannot take hold.
                    </p>
                </div>
            </section>

            {/* 3. COMPARISON TABLE */}
            <section className="mb-24">
                <h3 className="text-xl font-display text-white mb-6 text-center">Two Ways of Seeing</h3>
                <div className="bg-black/20 border border-white/10 rounded-xl overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/10 hover:bg-transparent">
                                <TableHead className="w-[50%] text-center">Symptom Model</TableHead>
                                <TableHead className="w-[50%] text-center">Terrain Model</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="border-white/5 hover:bg-white/5">
                                <TableCell className="text-center text-muted-foreground">Focus on the disease name</TableCell>
                                <TableCell className="text-center text-green-300">Focus on the body's load</TableCell>
                            </TableRow>
                            <TableRow className="border-white/5 hover:bg-white/5">
                                <TableCell className="text-center text-muted-foreground">Kill the pathogen (War)</TableCell>
                                <TableCell className="text-center text-green-300">Balance the ecosystem (Gardening)</TableCell>
                            </TableRow>
                            <TableRow className="border-white/5 hover:bg-white/5">
                                <TableCell className="text-center text-muted-foreground">Suppress the signal</TableCell>
                                <TableCell className="text-center text-green-300">Decode the signal</TableCell>
                            </TableRow>
                            <TableRow className="border-white/5 hover:bg-white/5">
                                <TableCell className="text-center text-muted-foreground">Static "Diagnosis"</TableCell>
                                <TableCell className="text-center text-green-300">Dynamic "Flow"</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>

            {/* 4. TERRAIN LEVERS */}
            <section className="mb-24">
                <h2 className="text-2xl font-display text-white mb-8 text-center">The Primary Terrain Levers</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <strong className="block text-primary mb-2">Hydration</strong>
                        <span className="text-sm text-muted-foreground">Is the water structured and reaching inside the cell?</span>
                    </div>
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <strong className="block text-primary mb-2">Minerals</strong>
                        <span className="text-sm text-muted-foreground">Are the conductive elements present to hold charge?</span>
                    </div>
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <strong className="block text-primary mb-2">Voltage</strong>
                        <span className="text-sm text-muted-foreground">Is there enough electron donor energy (-mV) to run repair?</span>
                    </div>
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <strong className="block text-primary mb-2">Flow</strong>
                        <span className="text-sm text-muted-foreground">Is the lymph moving? Is the gut clearing?</span>
                    </div>
                </div>
            </section>

            {/* 5. CTA */}
            <section className="text-center bg-green-900/5 rounded-2xl p-12 border border-green-500/10">
                <Activity className="w-12 h-12 text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl font-display text-white mb-4">Tend Your Garden</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Andara Ionic is a tool for the "Water & Mineral" lever. It is not a foundation builder, it is an optimizer.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/science/voltage-detox-pathways">
                        <a className="inline-flex items-center gap-2 text-white hover:text-green-400 transition-colors">
                            Next: Detox Pathways <ArrowRight className="w-4 h-4" />
                        </a>
                    </Link>
                </div>
            </section>
        </StandardPageLayout>
    );
}
