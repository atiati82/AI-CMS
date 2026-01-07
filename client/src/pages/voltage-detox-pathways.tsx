import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import {
    Zap,
    Droplet,
    Wind,
    Activity,
    ArrowRight
} from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function VoltageDetoxPage() {
    return (
        <StandardPageLayout
            title={<>Voltage & <span className="text-yellow-400">Detox</span> Pathways</>}
            subtitle="How Charge Moves Waste and Water."
            heroVariant="gold"
            heroIcon={Zap}
            registryId="voltage-body"
            badges={[{ text: "Bio-Physics", icon: Zap }]}
            seoTitle="Voltage Detox Pathways – How Charge, Flow & Lightness Move Through Your Terrain | Andara"
            seoDescription="Detox isn't just chemistry, it's electricity. Learn how voltage gradients and structured water move waste through lymph, liver, and kidneys."
        >
            {/* 1. HERO CONTEXT */}
            <div className="prose prose-invert max-w-3xl mx-auto mb-20 text-center">
                <p className="text-2xl font-light text-white leading-relaxed mb-6">
                    "Detox is not just chemistry, it’s electricity."
                </p>
                <p className="text-xl text-muted-foreground">
                    To move a molecule across a membrane, you need energy. That energy often comes from a proton gradient (voltage). If your battery is flat, the trash doesn't circulate.
                </p>
            </div>

            {/* 2. THE PATHWAYS */}
            <section className="mb-24 space-y-12">
                <div className="text-center">
                    <h2 className="text-2xl font-display text-white mb-4">The 5 Voltage Highways</h2>
                    <p className="text-muted-foreground">Viewing organs as flow systems.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-yellow-900/10 border-yellow-500/20">
                        <CardHeader>
                            <Activity className="w-8 h-8 text-yellow-400 mb-2" />
                            <CardTitle>Liver & Gallbladder</CardTitle>
                            <CardDescription>The Chemical Processor</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Requires massive electron donor status to neutralize toxins. High bile flow depends on hydration structure.
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-900/10 border-blue-500/20">
                        <CardHeader>
                            <Droplet className="w-8 h-8 text-blue-400 mb-2" />
                            <CardTitle>Kidneys & Bladder</CardTitle>
                            <CardDescription>The Filter</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Filtration is pressure + voltage. Kidney tubules use ion gradients to decide what to keep and what to shed.
                        </CardContent>
                    </Card>

                    <Card className="bg-green-900/10 border-green-500/20">
                        <CardHeader>
                            <Wind className="w-8 h-8 text-green-400 mb-2" />
                            <CardTitle>Lungs & Breath</CardTitle>
                            <CardDescription>The pH Regulator</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Exhaling CO2 regulates blood pH. pH is a measure of voltage. Deep breath charges the system.
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-900/10 border-purple-500/20">
                        <CardHeader>
                            <Zap className="w-8 h-8 text-purple-400 mb-2" />
                            <CardTitle>Lymphatic System</CardTitle>
                            <CardDescription>The Sewer System</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Passive flow. Relies on movement and structured water (EZ water) to propel fluid through vessels without a pump.
                        </CardContent>
                    </Card>

                    <Card className="bg-orange-900/10 border-orange-500/20 md:col-span-2 lg:col-span-1">
                        <CardHeader>
                            <Activity className="w-8 h-8 text-orange-400 mb-2" />
                            <CardTitle>Skin & Sweat</CardTitle>
                            <CardDescription>The Third Kidney</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Direct release pathway. Ejection of acids. Needs open pores and hydrated fascia.
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* 3. TERRAIN-FRIENDLY PRACTICES */}
            <section className="mb-24">
                <h2 className="text-2xl font-display text-primary mb-8 text-center">How to Charge the Flow</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 text-center">
                        <strong className="block text-white mb-2">Structure Your Water</strong>
                        <p className="text-xs text-muted-foreground">Bio-available water enters cells easier, flushing wastes.</p>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 text-center">
                        <strong className="block text-white mb-2">Move Your Lymph</strong>
                        <p className="text-xs text-muted-foreground">Rebound, walk, or dry brush. Mechanical movement drives lymph.</p>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 text-center">
                        <strong className="block text-white mb-2">Ground / Earthing</strong>
                        <p className="text-xs text-muted-foreground">Connect to the earth to uptake free electrons (anti-inflammatory).</p>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 text-center">
                        <strong className="block text-white mb-2">Light</strong>
                        <p className="text-xs text-muted-foreground">Morning sun charges your mitochondrial battery water.</p>
                    </div>
                </div>
            </section>

            {/* 4. ANDARA MENTION */}
            <section className="text-center max-w-2xl mx-auto pt-8 border-t border-white/10">
                <h3 className="text-xl font-display text-white mb-4">Andara's Role</h3>
                <p className="text-muted-foreground mb-8">
                    By providing the ionic sulfates (electrolytes) and structuring the water you drink, Andara reduces the electrical cost of hydration for your body, leaving more voltage available for detox.
                </p>
                <Link href="/science/voltage-detox-pathways">
                    <a className="text-primary hover:underline">Read Bioelectric Case Studies <ArrowRight className="inline w-4 h-4" /></a>
                </Link>
            </section>
        </StandardPageLayout>
    );
}
