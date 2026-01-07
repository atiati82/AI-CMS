
import "dotenv/config";
import { db } from "../server/db";
import { pages } from "../shared/schema";
import { eq } from "drizzle-orm";

const premiumContent = `
<div class="relative w-full overflow-hidden bg-slate-950 text-slate-200">
  
  <!-- HERO SECTION -->
  <section class="relative border-b border-white/5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <!-- Cosmic Background Glow -->
    <div class="pointer-events-none absolute inset-0 opacity-40" style="background: radial-gradient(circle at 0% 0%, #4b0082 0%, #020617 50%), radial-gradient(circle at 100% 100%, #22c55e 0%, transparent 45%), radial-gradient(circle at 50% 120%, #38bdf8 0%, transparent 55%);"></div>
    
    <div class="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div class="flex flex-col items-center text-center">
            <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/30 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-300 backdrop-blur-md mb-8">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Shop Categories
            </div>
            
            <h1 class="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
                <span class="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">1 L Bundles</span>
            </h1>
            
            <p class="max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl font-light">
                For Families, Retreats & Professionals. From a single bottle, create hundreds of liters of clarified, mineral-coherent water.
            </p>
        </div>
    </div>
  </section>

  <!-- SECTION 1: Why 1L Bundles Exist -->
  <section class="relative py-24 lg:py-32">
    <div class="mx-auto max-w-6xl px-6">
        <div class="mb-16 text-center">
            <h2 class="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">The Heart of the Andara System</h2>
            <div class="mt-4 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"></div>
        </div>

        <div class="grid gap-8 md:grid-cols-3">
            <!-- Card 1 -->
            <div class="group relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-indigo-400/50 hover:bg-slate-900/60 hover:-translate-y-2">
                <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all group-hover:bg-indigo-500/30 group-hover:scale-110">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                </div>
                <h3 class="font-display text-xl font-semibold text-white">Families</h3>
                <p class="text-slate-400 leading-relaxed">One central water station in the kitchen for the whole household. Simple rituals for daily health.</p>
            </div>

            <!-- Card 2 -->
            <div class="group relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/50 hover:bg-slate-900/60 hover:-translate-y-2">
                <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all group-hover:bg-cyan-500/30 group-hover:scale-110">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                </div>
                <h3 class="font-display text-xl font-semibold text-white">Retreats & Studios</h3>
                <p class="text-slate-400 leading-relaxed">Serve structured drinking water all day. Create a specific frequency environment for your guests.</p>
            </div>

            <!-- Card 3 -->
            <div class="group relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-emerald-400/50 hover:bg-slate-900/60 hover:-translate-y-2">
                <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all group-hover:bg-emerald-500/30 group-hover:scale-110">
                   <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                </div>
                <h3 class="font-display text-xl font-semibold text-white">Practitioners</h3>
                <p class="text-slate-400 leading-relaxed">Prepare clarified, mineral-coherent water for clients. An essential tool for terrain support.</p>
            </div>
        </div>

        <!-- Highlight Box -->
        <div class="mt-16 rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-transparent p-8 lg:p-12 relative overflow-hidden">
             <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"></div>
             <div class="relative z-10">
                <p class="text-lg text-amber-100/90 italic font-medium">"Instead of buying endless bottles of 'special water', you create your own water quality on site. 1 L is your master bottle."</p>
             </div>
        </div>
    </div>
  </section>

  <!-- SECTION 2: What's Inside -->
  <section class="relative border-y border-white/5 bg-slate-900/50 py-24 lg:py-32">
    <div class="mx-auto max-w-6xl px-6 grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
            <div class="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-900/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-200 mb-6">
                Science Inside
            </div>
            <h2 class="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-6">Highly Concentrated Ionic Sulfate Minerals</h2>
            <p class="text-lg text-slate-300 leading-relaxed mb-8">Refined from volcanic mineral sources and tuned for water clarification & conditioning. Each bottle is produced in controlled batches with lab-tested mineral profiles.</p>
            
            <ul class="space-y-4">
                <li class="flex items-start gap-4">
                    <div class="mt-1 h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>
                    <span class="text-slate-300">Target sulfate range: <strong>17–30 mg/L</strong></span>
                </li>
                <li class="flex items-start gap-4">
                    <div class="mt-1 h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>
                    <span class="text-slate-300">Flocculation & structural influence</span>
                </li>
                <li class="flex items-start gap-4">
                    <div class="mt-1 h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>
                    <span class="text-slate-300">Charge balancing for coherence</span>
                </li>
            </ul>
        </div>
        
        <div class="relative">
             <!-- Abstract Visual Representation -->
             <div class="relative aspect-square w-full max-w-md mx-auto rounded-full border border-white/5 bg-gradient-to-b from-indigo-500/10 to-transparent backdrop-blur-md flex items-center justify-center shadow-[0_0_100px_rgba(99,102,241,0.1)]">
                <div class="absolute inset-4 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]"></div>
                <div class="absolute inset-12 rounded-full border border-white/5 border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
                
                <div class="text-center p-8">
                    <span class="block text-4xl font-display font-bold text-white mb-2">100 s</span>
                    <span class="block text-sm uppercase tracking-widest text-indigo-300">of Liters</span>
                    <span class="block text-xs text-slate-500 mt-2">from one bottle</span>
                </div>
             </div>
        </div>
    </div>
  </section>

  <!-- SECTION 3: Bundle Options -->
  <section class="relative py-24 lg:py-32">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
    
    <div class="relative mx-auto max-w-7xl px-6">
        <div class="text-center mb-16">
            <h2 class="font-display text-3xl font-bold text-white sm:text-5xl">Choose Your Scale</h2>
            <p class="mt-4 text-slate-400">Three tiers designed for your specific usage volume.</p>
        </div>
        
        <div class="grid gap-8 lg:grid-cols-3">
            <!-- Tier 1 -->
            <div class="relative flex flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl transition hover:border-slate-500/30">
                <div class="mb-6">
                    <h3 class="font-display text-2xl font-bold text-white">Home Core</h3>
                    <p class="text-sm font-medium uppercase tracking-wider text-slate-500">Single 1 L</p>
                </div>
                <ul class="mb-8 space-y-4 flex-1">
                    <li class="flex gap-3 text-slate-300 text-sm">
                        <svg class="h-5 w-5 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        Start your water station
                    </li>
                    <li class="flex gap-3 text-slate-300 text-sm">
                        <svg class="h-5 w-5 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        Perfect for 1–2 people
                    </li>
                </ul>
                <a href="#buy" class="block w-full rounded-xl border border-white/10 bg-white/5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10">Select Option</a>
            </div>
            
            <!-- Tier 2 - Featured -->
            <div class="relative flex flex-col transform scale-105 rounded-3xl border border-indigo-400/30 bg-slate-800/80 p-8 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
                 <div class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                    Most Popular
                 </div>
                <div class="mb-6">
                    <h3 class="font-display text-2xl font-bold text-white">Family & Studio</h3>
                    <p class="text-sm font-medium uppercase tracking-wider text-indigo-300">4 L Bundle</p>
                </div>
                <ul class="mb-8 space-y-4 flex-1">
                    <li class="flex gap-3 text-white text-sm">
                        <svg class="h-5 w-5 flex-shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        Conscious households & yoga studios
                    </li>
                    <li class="flex gap-3 text-white text-sm">
                        <svg class="h-5 w-5 flex-shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        Run multiple dispensers
                    </li>
                    <li class="flex gap-3 text-white text-sm">
                        <svg class="h-5 w-5 flex-shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        <span class="font-bold text-emerald-300">Better liter pricing</span>
                    </li>
                </ul>
                <a href="#buy" class="block w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 py-3 text-center text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:from-indigo-500 hover:to-cyan-500">Select 4L Bundle</a>
            </div>
            
            <!-- Tier 3 -->
            <div class="relative flex flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl transition hover:border-slate-500/30">
                <div class="mb-6">
                    <h3 class="font-display text-2xl font-bold text-white">Retreat & Pro</h3>
                    <p class="text-sm font-medium uppercase tracking-wider text-slate-500">9 L Bundle</p>
                </div>
                <ul class="mb-8 space-y-4 flex-1">
                    <li class="flex gap-3 text-slate-300 text-sm">
                        <svg class="h-5 w-5 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        For spas & practitioners
                    </li>
                    <li class="flex gap-3 text-slate-300 text-sm">
                        <svg class="h-5 w-5 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        High volume throughput
                    </li>
                     <li class="flex gap-3 text-slate-300 text-sm">
                        <svg class="h-5 w-5 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        Max planning security
                    </li>
                </ul>
                <a href="#buy" class="block w-full rounded-xl border border-white/10 bg-white/5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10">Select 9L Bundle</a>
            </div>
        </div>
        
        <div class="mt-12 text-center">
             <div class="inline-block rounded-lg bg-emerald-900/30 px-4 py-2 text-sm text-emerald-200 border border-emerald-500/20">
                ✨ <strong>Transparent Pricing:</strong> All bundles show price-per-liter savings at checkout.
             </div>
        </div>
    </div>
  </section>

  <!-- SECTION 4: Daily Integration Steps -->
  <section class="relative border-y border-white/5 bg-slate-900/30 py-24">
    <div class="mx-auto max-w-4xl px-6">
        <h2 class="mb-12 text-center font-display text-3xl font-bold text-white">Daily Integration</h2>
        
        <div class="space-y-4">
            <!-- Step 1 -->
            <div class="flex items-center gap-6 rounded-2xl border border-white/5 bg-slate-900/60 p-6 backdrop-blur-sm transition hover:bg-slate-800/60">
                <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 font-display text-xl font-bold text-white border border-white/10">1</div>
                <div>
                    <h3 class="font-semibold text-white">Choose your base water</h3>
                    <p class="text-sm text-slate-400">Filtered, spring, or high-quality tap.</p>
                </div>
            </div>
             <!-- Step 2 -->
            <div class="flex items-center gap-6 rounded-2xl border border-white/5 bg-slate-900/60 p-6 backdrop-blur-sm transition hover:bg-slate-800/60">
                <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 font-display text-xl font-bold text-white border border-white/10">2</div>
                <div>
                    <h3 class="font-semibold text-white">Dilute & Prepare</h3>
                    <p class="text-sm text-slate-400">Use the calculator. 5–10L for home, 20–50L for studios.</p>
                </div>
            </div>
             <!-- Step 3 -->
            <div class="flex items-center gap-6 rounded-2xl border border-white/5 bg-slate-900/60 p-6 backdrop-blur-sm transition hover:bg-slate-800/60">
                <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 font-display text-xl font-bold text-white border border-white/10">3</div>
                <div>
                    <h3 class="font-semibold text-white">Clarify & Serve</h3>
                    <p class="text-sm text-slate-400">Let stand to settle. Serve from glass dispensers.</p>
                </div>
            </div>
        </div>
    </div>
  </section>

  <!-- CTA FOOTER -->
  <section class="relative overflow-hidden py-32 text-center">
    <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-slate-950"></div>
    <div class="relative z-10 mx-auto max-w-4xl px-6">
        <h2 class="font-display text-4xl font-bold text-white mb-6">Ready to upgrade your water?</h2>
        <p class="mb-10 text-xl text-slate-300">Choose the bundle that matches your space and rhythm.</p>
        <a href="/shop/andara-ionic-1l" class="inline-flex items-center gap-3 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:-translate-y-1">
            View Pricing & Bundles
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </a>
    </div>
  </section>

</div>
`;

async function updatePageContent() {
    console.log("Updating page with Premium V2 design...");

    try {
        const result = await db.update(pages)
            .set({
                content: premiumContent,
                updatedAt: new Date()
            })
            .where(eq(pages.path, "/shop/andara-1l-bundles"));

        console.log("✅ Page updated successfully!");
        console.log("Content length:", premiumContent.length);
    } catch (error) {
        console.error("Error updating page:", error);
    } finally {
        process.exit(0);
    }
}

updatePageContent();
