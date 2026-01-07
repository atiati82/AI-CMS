
import "dotenv/config";
import { db } from "../server/db";
import { pages } from "../shared/schema";
import { eq } from "drizzle-orm";

// V4: Using inline styles instead of Tailwind arbitrary classes for backgrounds
// This ensures the styles work even when injected from the database

const premiumMineralsHtmlV4 = `
<main class="andara-page min-h-screen bg-slate-950 text-slate-200 font-sans">
  
  <!-- HERO SECTION -->
  <section id="hero" class="andara-hero relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
    
    <!-- Background Layers - Using INLINE STYLES for image -->
    <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-cover bg-center opacity-50" style="background-image: url('/ion-field-bg.png'); mix-blend-mode: overlay;"></div>
        <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(2,6,23,0.8), rgba(2,6,23,0.4), rgba(2,6,23,1));"></div>
        <div class="absolute inset-0" style="background: radial-gradient(ellipse at bottom left, rgba(120,53,15,0.2), transparent);"></div>
    </div>

    <div class="relative z-10 px-6 mx-auto max-w-5xl text-center">
        <!-- Badge -->
        <div class="mb-8">
            <span class="inline-flex items-center gap-2 rounded-full border border-amber-500/30 px-5 py-2 text-xs font-bold uppercase tracking-widest text-amber-300" style="background: rgba(120,53,15,0.3); backdrop-filter: blur(12px);">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                Science Library
            </span>
        </div>

        <!-- Headline -->
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8" style="text-shadow: 0 4px 40px rgba(0,0,0,0.5);">
            <span style="background: linear-gradient(135deg, #fcd34d, #f59e0b, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Mineral Science</span>
        </h1>
        
        <p class="max-w-3xl mx-auto text-xl md:text-2xl font-light leading-relaxed text-slate-300 mb-12">
            Decode the elemental blueprint behind <span class="text-amber-300 font-medium">water, body & soil</span>. Understand how ionic sulfate minerals connect every layer of terrain.
        </p>

        <!-- Quick Nav Bullets -->
        <ul class="andara-hero__bullets flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-400 uppercase tracking-widest">
            <li class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                Ionic Forms
            </li>
            <li class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-cyan-500"></span>
                Trace Elements
            </li>
            <li class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-amber-500"></span>
                Sulfate Backbone
            </li>
        </ul>
        
        <!-- Scroll Indicator -->
        <div class="mt-16">
            <div class="mx-auto h-12 w-7 rounded-full border border-white/20 p-1.5" style="background: rgba(255,255,255,0.05);">
                <div class="h-3 w-full rounded-full bg-white/50 animate-bounce"></div>
            </div>
        </div>
    </div>
  </section>

  <!-- SECTION: TL;DR Summary -->
  <section class="py-16 relative z-10 border-b border-white/5">
    <div class="container px-6 mx-auto max-w-4xl">
        <div class="p-8 rounded-3xl border border-amber-500/20" style="background: linear-gradient(90deg, rgba(120,53,15,0.1), rgba(15,23,42,0.5), rgba(120,53,15,0.1)); backdrop-filter: blur(12px);">
            <p class="text-center text-lg md:text-xl text-amber-100/90 font-light leading-relaxed">
                <strong class="text-amber-400">TL;DR:</strong> Minerals have an architecture. They are not random supplements—they are the <em>"structural vocabulary"</em> of living terrain. The ionic sulfate form is the most compatible, absorbable, and structurally active language for water and biology.
            </p>
        </div>
    </div>
  </section>

  <!-- SECTION: The Three Forms (Animated Grid) -->
  <section id="forms" class="py-24 lg:py-32 relative z-10">
    <div class="container px-6 mx-auto max-w-7xl">
        <div class="mb-20 text-center max-w-3xl mx-auto">
            <h2 class="font-display text-3xl md:text-5xl font-bold text-white mb-6">The Three Mineral Forms</h2>
            <p class="text-lg text-slate-400">Same element. Radically different behaviour in water.</p>
        </div>

        <div class="andara-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <!-- Form 1: Solid -->
            <div class="andara-grid__item relative group p-8 rounded-3xl border border-white/10 transition-all duration-500 hover:-translate-y-2" style="background: rgba(11,16,32,0.8); backdrop-filter: blur(20px);">
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-slate-500/20" style="background: rgba(100,116,139,0.2);">
                    <svg class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                </div>
                <h3 class="text-2xl font-display font-bold text-white mb-4">Solid</h3>
                <p class="text-slate-400 leading-relaxed font-light mb-4">Rock, powder, tablets. Requires digestion & acid extraction. Low bioavailability in water systems.</p>
                <div class="mt-auto pt-4 border-t border-white/5">
                    <span class="text-xs uppercase tracking-widest text-slate-500">Absorption: Low</span>
                </div>
            </div>

            <!-- Form 2: Colloidal -->
            <div class="andara-grid__item relative group p-8 rounded-3xl border border-white/10 transition-all duration-500 hover:-translate-y-2" style="background: rgba(11,16,32,0.8); backdrop-filter: blur(20px);">
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20" style="background: rgba(6,182,212,0.1);">
                    <svg class="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                </div>
                <h3 class="text-2xl font-display font-bold text-white mb-4">Colloidal</h3>
                <p class="text-slate-400 leading-relaxed font-light mb-4">Suspended particles in water. Murky appearance. Larger particle size limits cellular uptake.</p>
                <div class="mt-auto pt-4 border-t border-white/5">
                    <span class="text-xs uppercase tracking-widest text-cyan-500">Absorption: Medium</span>
                </div>
            </div>

            <!-- Form 3: Ionic (Highlighted) -->
            <div class="andara-grid__item relative group p-8 rounded-3xl border border-amber-500/30 transition-all duration-500 hover:-translate-y-2" style="background: linear-gradient(to bottom, rgba(120,53,15,0.2), rgba(11,16,32,0.8)); backdrop-filter: blur(20px); box-shadow: 0 25px 50px -12px rgba(120,53,15,0.15);">
                <div class="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style="background: linear-gradient(90deg, #f59e0b, #fbbf24);"></div>
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-amber-500/20" style="background: rgba(120,53,15,0.2);">
                    <svg class="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <h3 class="text-2xl font-display font-bold text-amber-100 mb-4">Ionic</h3>
                <p class="text-amber-200/80 leading-relaxed font-light mb-4">Electrically charged. Fully dissolved. Moves through membranes. Participates in biochemistry directly.</p>
                <div class="mt-auto pt-4 border-t border-amber-500/20">
                    <span class="text-xs uppercase tracking-widest text-amber-400 font-bold">Absorption: Maximum</span>
                </div>
            </div>
        </div>
    </div>
  </section>

  <!-- SECTION: The Sulfate Architecture -->
  <section id="sulfate" class="py-24 border-t border-white/5" style="background: linear-gradient(to bottom, #020617, #0f172a);">
    <div class="container px-6 mx-auto max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-500/20 text-xs text-amber-400 font-bold uppercase tracking-wider mb-6">
                    The Backbone
                </div>
                <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-6">Why Sulfate?</h2>
                <p class="text-lg text-slate-300 leading-relaxed mb-6">
                    Sulfate (SO₄²⁻) is not just another mineral. It is the <strong class="text-amber-300">architectural backbone</strong> that gives water its structural coherence. Its tetrahedral geometry and double-negative charge make it a master organizer.
                </p>
                <ul class="space-y-4">
                    <li class="flex items-center gap-4 text-slate-300">
                        <span class="h-2 w-2 rounded-full bg-amber-500" style="box-shadow: 0 0 10px rgba(245,158,11,0.5);"></span>
                        Flocculates impurities (clarification)
                    </li>
                    <li class="flex items-center gap-4 text-slate-300">
                        <span class="h-2 w-2 rounded-full bg-amber-500" style="box-shadow: 0 0 10px rgba(245,158,11,0.5);"></span>
                        Manages ORP (redox potential)
                    </li>
                    <li class="flex items-center gap-4 text-slate-300">
                        <span class="h-2 w-2 rounded-full bg-amber-500" style="box-shadow: 0 0 10px rgba(245,158,11,0.5);"></span>
                        Supports EZ Water layer formation
                    </li>
                </ul>
            </div>
            
            <div class="relative">
                <div class="absolute inset-0 rounded-full" style="background: rgba(245,158,11,0.1); filter: blur(60px);"></div>
                <div class="relative p-1 rounded-3xl" style="background: linear-gradient(135deg, rgba(245,158,11,0.2), transparent);">
                    <div class="aspect-square rounded-3xl bg-slate-900/80 border border-white/10 flex items-center justify-center p-12">
                        <div class="text-center">
                            <span class="block text-6xl font-mono font-bold text-amber-400 mb-4">SO₄²⁻</span>
                            <span class="block text-sm uppercase tracking-widest text-slate-500">Tetrahedral Sulfate Ion</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>

  <!-- SECTION: Mineral Interactions -->
  <section id="interactions" class="py-24 border-t border-white/5">
    <div class="container px-6 mx-auto max-w-6xl text-center">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-white mb-6">Synergy & Antagonism</h2>
        <p class="text-slate-400 max-w-2xl mx-auto mb-16">Minerals don't work in isolation. Some enhance each other. Others compete.</p>
        
        <div class="andara-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Synergy -->
            <div class="andara-grid__item p-8 rounded-3xl border border-emerald-500/20 text-left" style="background: rgba(6,78,59,0.1);">
                <h3 class="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-3">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    Synergy Patterns
                </h3>
                <ul class="space-y-3 text-slate-300">
                    <li>• Zinc + Copper: Immune balance</li>
                    <li>• Magnesium + Calcium: Muscle & nerve</li>
                    <li>• Iron + Vitamin C: Enhanced uptake</li>
                    <li>• Sulfate + All: Carrier function</li>
                </ul>
            </div>
            
            <!-- Antagonism -->
            <div class="andara-grid__item p-8 rounded-3xl border border-red-500/20 text-left" style="background: rgba(127,29,29,0.1);">
                <h3 class="text-xl font-bold text-red-400 mb-4 flex items-center gap-3">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                    Antagonism Patterns
                </h3>
                <ul class="space-y-3 text-slate-300">
                    <li>• Calcium vs. Iron: Compete for uptake</li>
                    <li>• Zinc vs. Copper: High doses block</li>
                    <li>• Phosphorus vs Magnesium: Binding</li>
                    <li>• Aluminum vs. All: Displacement risk</li>
                </ul>
            </div>
        </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-32 text-center relative overflow-hidden">
    <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(120,53,15,0.15), #0f172a);"></div>
    <div class="relative z-10 container px-6 mx-auto max-w-4xl">
        <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-6">Explore the Full Mineral Library</h2>
        <p class="mb-10 text-xl text-slate-300">Dive into specific elements, pathways, and terrain applications.</p>
        <div class="flex flex-wrap justify-center gap-4">
            <a href="/science/sulfate-chemistry" class="inline-flex items-center gap-3 rounded-full bg-amber-500 px-8 py-4 text-base font-bold text-slate-950 transition hover:bg-amber-400 hover:-translate-y-1" style="box-shadow: 0 0 20px rgba(245,158,11,0.4);">
                Sulfate Chemistry
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
            <a href="/science/trace-minerals-rare-earths" class="inline-flex items-center gap-3 rounded-full border border-white/10 px-8 py-4 text-base font-medium text-white transition hover:bg-white/10 hover:-translate-y-1" style="background: rgba(255,255,255,0.05);">
                Trace Elements
            </a>
        </div>
    </div>
  </section>

</main>
`;

async function updateMineralsPageV4() {
    console.log("Updating /science/minerals with V4 (inline styles fix)...");

    try {
        const existingPage = await db.select().from(pages).where(eq(pages.path, "/science/minerals"));

        if (existingPage.length === 0) {
            console.error("Page not found: /science/minerals");
            process.exit(1);
        }

        // Get current metadata and remove contentJson flag
        const currentMetadata = existingPage[0].metadata || {};
        const newMetadata = { ...currentMetadata };
        delete newMetadata.contentJson; // Remove to bypass MagicPage

        const result = await db.update(pages)
            .set({
                content: null,
                aiStartupHtml: premiumMineralsHtmlV4,
                metadata: newMetadata,
                updatedAt: new Date()
            })
            .where(eq(pages.path, "/science/minerals"));

        console.log("✅ V4 Update successful!");
        console.log("Using inline styles for backgrounds. Length:", premiumMineralsHtmlV4.length);
    } catch (error) {
        console.error("Error updating page:", error);
    } finally {
        process.exit(0);
    }
}

updateMineralsPageV4();
