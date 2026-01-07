
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function CommunityJoinPage() {
    useScrollTop();

    return (
        <StandardPageLayout
            title="Join the Community"
            subtitle="Water, Minerals & Terrain Explorers"
            vibeKeywords={['Connection', 'Curiosity', 'Coherence']}
            seoTitle="Join the Andara Community – Water, Minerals & Terrain Explorers"
            seoDescription="Become part of the Andara community – a space for explorers who want clarity in water, science, and terrain thinking. No medical hype, just grounded education and connection."
            seoKeywords={["join Andara community", "water and mineral explorers", "terrain thinking community", "structured water community", "Andara newsletter", "Andara events"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">More Than Just a Bottle</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        You might be one of the people who sees a pattern: minerals, voltage, structure, behavior—all linked. The Andara Community is a home for those who care about cleaner water and clear explanations, not fear or miracle promises.
                    </p>
                </section>

                {/* Why Join Grid */}
                <section className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-8">
                    <div className="text-center">
                        <h2 className="text-2xl text-white">Why We Gather</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="mt-1 text-emerald-400 text-xl">🧩</div>
                                <div>
                                    <h3 className="text-white font-medium">A Coherent Story</h3>
                                    <p className="text-slate-400 text-sm">We connect the dots between water science, minerals, bioelectric terrain, and everyday use into one map.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 text-emerald-400 text-xl">🧪</div>
                                <div>
                                    <h3 className="text-white font-medium">Practical Guidance</h3>
                                    <p className="text-slate-400 text-sm">Learn how to read terrain signals (pH, ORP, EC) and use Andara in home, kitchen, and garden.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="mt-1 text-blue-400 text-xl">🤝</div>
                                <div>
                                    <h3 className="text-white font-medium">Kindred Spirits</h3>
                                    <p className="text-slate-400 text-sm">You aren't "too intense" for caring about water structure or ion transport here. It's the normal conversation.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 text-blue-400 text-xl">👁️</div>
                                <div>
                                    <h3 className="text-white font-medium">Visual Intelligence</h3>
                                    <p className="text-slate-400 text-sm">Access infographics, terrain maps, and deep-dive diagrams that simplify complex science.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What You Receive */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { icon: "📨", title: "Updates", desc: "Short stories, lab signals, and user journeys." },
                        { icon: "🔬", title: "Deep Dives", desc: "Science letters on Terrain, Voltage, and EZ Water." },
                        { icon: "🎟️", title: "Invites", desc: "Early access to Q&As, retreats, and workshops." },
                        { icon: "🗺️", title: "Maps", desc: "Downloadable guides and visual terrain tools." }
                    ].map((item, i) => (
                        <Card key={i} className="p-6 bg-slate-900 border-slate-800 text-center hover:bg-slate-800/50 transition-colors">
                            <div className="text-3xl mb-3">{item.icon}</div>
                            <h3 className="text-white font-medium mb-2">{item.title}</h3>
                            <p className="text-slate-500 text-xs">{item.desc}</p>
                        </Card>
                    ))}
                </section>

                {/* Join Form Placeholder */}
                <section className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-10 text-center space-y-8 max-w-2xl mx-auto backdrop-blur-sm">
                    <div className="space-y-2">
                        <h2 className="text-3xl text-white font-light">Join the Field</h2>
                        <p className="text-slate-400 text-sm">Simple. Transparent. No tricks.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <Input type="email" placeholder="Your email address" className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-600" />
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8">Join</Button>
                    </div>

                    <p className="text-xs text-slate-500">
                        You'll receive a welcome sequence with the Science Library Map and our "Firewall" explanation. Unsubscribe anytime.
                    </p>
                </section>

                {/* What This Is Not */}
                <section className="text-center space-y-6 max-w-3xl mx-auto">
                    <h2 className="text-xl text-white">Clear Boundaries</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Badge variant="outline" className="border-red-500/30 text-red-400">Not Medical Advice</Badge>
                        <Badge variant="outline" className="border-red-500/30 text-red-400">No Fear Narratives</Badge>
                        <Badge variant="outline" className="border-red-500/30 text-red-400">No Hype</Badge>
                    </div>
                    <p className="text-sm text-slate-400">
                        We acknowledge real challenges but refuse to amplify panic. We focus on Clarity, Education, and Co-creation.
                    </p>
                </section>

                <Separator className="bg-slate-800" />

                {/* Start Here */}
                <section className="text-center space-y-4">
                    <h2 className="text-xl text-white">A Quiet Invitation</h2>
                    <p className="text-slate-400 text-sm max-w-xl mx-auto">
                        If you sense that water is alive and minerals carry stories, you are in the right place. Join us to stay connected to that sense and contribute your own piece of the map.
                    </p>
                </section>

            </div>
        </StandardPageLayout>
    );
}
