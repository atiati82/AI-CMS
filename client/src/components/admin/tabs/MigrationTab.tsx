import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Check, AlertTriangle, Loader2, FileText, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

// --- CONFIGURATION ---
const STATIC_PAGES = [
    "/structured-water-basics",
    "/sulfate-chemistry",
    "/water-crystal-geometry-map",
    "/bioelectric-water",
    "/bioelectricity-invisible-voltage",
    "/mineral-sources",
    "/trust/comparison-other-mineral-products",
    "/aluminum-school-minerals",
    "/andara-dilution-calculator",
    "/andara-ionic-100ml",
    "/andara-ionic-1l",
    "/andara-ionic-dilution-table",
    "/andara-library-index",
    "article", // Template/Base
    "/bioelectric-case-studies",
    "/bioelectric-conductivity-tissues",
    "/bioelectric-maps-water-body-soil",
    "/black-mica-sulfated-minerals",
    "/bundle-savings-overview",
    "/cell-membrane-electric-model",
    "/checkout",
    "/conductivity-tds-water",
    "/contact-support",
    "/crystalline-matrix-hub",
    "/crystalline-matrix",
    "/design-simulation",
    "/eu-vs-bali-lines",
    "/experiments-index",
    "/ez-water-experiments",
    "/ez-water-overview",
    "/faq-product-application",
    "/getting-started-first-7-days",
    "/global-shipping-packaging",
    "/gold-icons-preview",
    "/gold-loader-preview",
    "/how-andara-works-clarification-conditioning",
    "/hydration-layers-interfaces",
    "/ion-channels-gradients",
    "/ionic-drops",
    "/ionic-vs-colloidal-vs-solid",
    "/iron-sulfur-synergy",
    "/legal-disclaimers",
    "/light-and-water",
    "/light-lattices-photonic-flow",
    "/magnet-placement-experiments",
    "/magnetics-water",
    "/mineral-cofactors-enzymes",
    "/mineral-science-blueprint",
    "/mineral-toxicity-boundaries",
    "/science/mineral-science-blueprint",
    "/motion-lab",
    "/natural-vs-treated-water",
    "/orp-redox-water",
    "/ph-balance-water",
    "/phases-of-water",
    "/price-per-liter-explainer",
    "/product-hub",
    "/product",
    "/proton-gradients-energy-transfer",
    "/safety-boundaries-legal-use",
    "/science-library-hub",
    "/science-library-master",
    "/science-library",

    "/shop",
    "/spiritual-electricity-ion-intelligence",
    "/terrain-concepts",
    "/terrain-vs-symptom",
    "/tetrahedral-sulfate-geometry",
    "/three-six-nine-harmonics",
    "/torus-preview",
    "/turbidity-clarity",
    "/voltage-detox-pathways",
    "/vortex-spin-experiments",
    "/vortex-technologies",
    "/water-case-studies-world",
    "/water-science-architecture-of-life",
    "/water-science-master",
    "/water-science",
    "/what-is-andara-ionic"
].filter(p => p !== "article" && !p.includes("preview") && !p.includes("demo"));

// --- VIBE MAPPING STRATEGY ---
const VIBE_MAP = [
    { keywords: ["water", "hydro", "ez", "liquid", "hydration"], archetype: "liquid-crystal-float", vibe: ["blue-depths", "clarity"] },
    { keywords: ["gold", "ionic", "mineral", "alchemy", "sulfate"], archetype: "living-gold-shimmer", vibe: ["royal-gold", "warmth"] },
    { keywords: ["geometry", "crystal", "matrix", "torus", "structure"], archetype: "krystal-bloom", vibe: ["prism-light", "geometric"] },
    { keywords: ["diagram", "chart", "map", "graph", "overview", "process", "workflow", "infographic"], archetype: "krystal-bloom", vibe: ["tech-teal", "data-viz"] },
    { keywords: ["science", "bioelectric", "voltage", "conductivity"], archetype: "nanotech-entrance", vibe: ["tech-teal", "academic"] },
    { keywords: ["shop", "product", "bundle", "save", "price"], archetype: "energetic-pulse", vibe: ["clean-commerce", "trust"] },
    // Default fallback
    { keywords: [], archetype: "scalar-slide", vibe: ["neutral-glass"] }
];

function getVibeForContent(title: string, content: string) {
    const text = (title + " " + content).toLowerCase();
    for (const map of VIBE_MAP) {
        if (map.keywords.some(k => text.includes(k))) {
            return {
                motionConfig: {
                    archetype: map.archetype,
                    exposure: "high"
                },
                vibeKeywords: map.vibe
            };
        }
    }
    return {
        motionConfig: { archetype: "scalar-slide", exposure: "medium" },
        vibeKeywords: ["standard"]
    };
}

// --- COMPONENT ---
export function MigrationTab() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [iframeSrc, setIframeSrc] = useState<string>("");
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { toast } = useToast();

    const currentPath = STATIC_PAGES[currentIndex];
    const progress = ((currentIndex) / STATIC_PAGES.length) * 100;

    const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

    const processPage = async (path: string) => {
        return new Promise<void>((resolve, reject) => {
            // 1. Load Page in Iframe
            setIframeSrc(path);
            addLog(`Loading ${path}...`);

            const handleLoad = async () => {
                try {
                    const doc = iframeRef.current?.contentDocument;
                    if (!doc) throw new Error("Could not access iframe content");

                    // Wait a bit for React to hydrate/render
                    await new Promise(r => setTimeout(r, 1500));

                    // 2. Snapshot Content using Selector Strategy
                    // Try standard layout containers first
                    let contentEl = doc.querySelector("main") || doc.querySelector(".andara-page") || doc.querySelector("#root");

                    if (!contentEl) throw new Error("No content container found");

                    // Clone to manipulate safely
                    const clone = contentEl.cloneNode(true) as HTMLElement;

                    // Cleanup: Remove scripts, iframes, dev tools
                    clone.querySelectorAll("script").forEach(el => el.remove());
                    clone.querySelectorAll("iframe").forEach(el => el.remove());
                    clone.querySelectorAll('[data-radix-portal]').forEach(el => el.remove()); // Remove portals/modals

                    const title = doc.title.split("|")[0].trim() || path.replace('/', '').replace(/-/g, ' ');
                    const contentHtml = clone.innerHTML;
                    const summary = doc.querySelector('meta[name="description"]')?.getAttribute("content") || "";

                    // 3. Apply Vibe Mapping
                    const visualConfig = getVibeForContent(title, contentHtml);

                    // 4. Send to API
                    const response = await fetch("/api/migration/import-page", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            path,
                            title,
                            content: contentHtml,
                            summary,
                            template: "article",
                            visualConfig,
                            vibeKeywords: visualConfig.vibeKeywords,
                            replace: true
                        })
                    });

                    if (!response.ok) throw new Error("API failed");

                    const result = await response.json();
                    addLog(`✅ Migrated: ${title} (${result.status})`);
                    resolve();

                } catch (e) {
                    addLog(`❌ Failed: ${path} - ${e}`);
                    resolve(); // Resolve anyway to continue queue
                }
            };

            // Set one-time listener for this load
            const iframe = iframeRef.current;
            if (iframe) {
                iframe.onload = handleLoad;
            } else {
                reject("Iframe ref missing");
            }
        });
    };

    const startMigration = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        setLogs([]);
        setCurrentIndex(0);

        // Initial delay
        await new Promise(r => setTimeout(r, 500));

        // Process Loop
        for (let i = 0; i < STATIC_PAGES.length; i++) {
            setCurrentIndex(i);
            await processPage(STATIC_PAGES[i]);
            // Small buffer between pages
            await new Promise(r => setTimeout(r, 500));
        }

        setIsProcessing(false);
        setIframeSrc("");
        toast({
            title: "Migration Complete",
            description: `Processed ${STATIC_PAGES.length} pages. Check logs for details.`
        });
        queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* CONTROL PANEL */}
                <div className="flex-1 space-y-6">
                    <Card className="andara-glass-card">
                        <CardHeader>
                            <CardTitle className="andara-h2--gold flex items-center gap-2">
                                <Globe className="w-5 h-5" />
                                Static Page Migration
                            </CardTitle>
                            <CardDescription>
                                Batch import {STATIC_PAGES.length} static file-based pages into the database.
                                This process captures the rendered HTML and applies "Visual Vibe" mappings automatically.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6 space-y-2">
                                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                                    <span>Progress: {currentIndex} / {STATIC_PAGES.length}</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                                {isProcessing && (
                                    <p className="text-xs text-primary animate-pulse">
                                        Processing: {currentPath}...
                                    </p>
                                )}
                            </div>

                            <Button
                                onClick={startMigration}
                                className="w-full andara-btn-gold"
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Migrating...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 mr-2" />
                                        Start Full Migration
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* LOGS */}
                    <Card className="andara-glass-panel">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-mono text-muted-foreground uppercase">Migration Logs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px] w-full rounded-md border border-white/5 bg-black/20 p-4 font-mono text-xs">
                                {logs.length === 0 ? (
                                    <span className="text-muted-foreground opacity-50">Waitng to start...</span>
                                ) : (
                                    logs.map((log, i) => (
                                        <div key={i} className={`mb-1 ${log.includes("❌") ? "text-red-400" : "text-green-400/80"}`}>
                                            {log}
                                        </div>
                                    ))
                                )}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                {/* PREVIEW / IFRAME CONTAINER */}
                <div className="w-full md:w-[400px]">
                    <Card className="andara-glass-panel h-full">
                        <CardHeader>
                            <CardTitle className="text-sm">Snapshot Preview</CardTitle>
                            <CardDescription className="text-xs">
                                Background renderer (scaled down)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative w-full aspect-[9/16] bg-black rounded-lg overflow-hidden border border-white/10">
                                {/* HIDDEN IFRAME FOR PROCESSING */}
                                <iframe
                                    ref={iframeRef}
                                    src={iframeSrc}
                                    className="absolute inset-0 w-[1000px] h-[1000px] origin-top-left scale-[0.34]"
                                    style={{
                                        pointerEvents: 'none',
                                        opacity: isProcessing ? 1 : 0.5,
                                        backgroundColor: '#000'
                                    }}
                                    sandbox="allow-same-origin allow-scripts"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
