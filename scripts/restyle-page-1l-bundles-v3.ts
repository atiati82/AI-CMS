
import "dotenv/config";
import { db } from "../server/db";
import { pages } from "../shared/schema";
import { eq } from "drizzle-orm";

const premiumContentV3 = `
<main class="andara-page min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
  
  <!-- HERO SECTION -->
  <section id="hero" class="andara-hero relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/5">
    
    <!-- Background Logic -->
    <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-[url('/water-interface-bg.png')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#020617]/50 to-[#020617]"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
    </div>

    <div class="container relative z-10 px-6 mx-auto text-center">
        <!-- Badge -->
        <div class="andara-hero__bullets inline-flex justify-center mb-8">
            <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-5 py-2 text-xs font-bold uppercase tracking-widest text-emerald-300 backdrop-blur-md shadow-lg shadow-emerald-900/20">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                The Foundation
            </div>
        </div>

        <!-- Headline -->
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 drop-shadow-2xl">
            <span class="bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">1 L Bundles</span>
        </h1>
        
        <!-- Subheadline & Bullets -->
        <div class="max-w-2xl mx-auto space-y-8">
            <p class="text-xl md:text-2xl font-light leading-relaxed text-slate-300">
                Create hundreds of liters of <span class="text-emerald-300 font-medium">mineral-coherent, structured water</span> from a single master bottle.
            </p>
            
            <ul class="andara-hero__bullets flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-medium text-slate-400 uppercase tracking-widest">
                <li class="flex items-center gap-2">
                    <svg class="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    Families
                </li>
                <li class="flex items-center gap-2">
                    <svg class="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    Studios
                </li>
                <li class="flex items-center gap-2">
                    <svg class="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    Professionals
                </li>
            </ul>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="absolute bottom-12 left-1/2 -translate-x-1/2">
            <div class="h-10 w-6 rounded-full border border-white/20 p-1">
                <div class="h-2 w-full rounded-full bg-white/50 animate-bounce"></div>
            </div>
        </div>
    </div>
  </section>

  <!-- SECTION: The "Why" Grid (Animated) -->
  <section id="features" class="andara-section py-24 lg:py-32 relative z-10">
    <div class="container px-6 mx-auto max-w-7xl">
        <div class="mb-20 text-center max-w-3xl mx-auto">
            <h2 class="font-display text-3xl md:text-5xl font-bold text-white mb-6">The Master Source</h2>
            <p class="text-lg text-slate-400">Why experienced practitioners switch from buying bottles to creating their own source.</p>
        </div>

        <div class="andara-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="andara-grid__item relative group p-8 rounded-3xl border border-white/10 bg-[#0b1020]/80 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/20">
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="w-14 h-14 rounded-2xl bg-emerald-900/30 flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <svg class="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                </div>
                <h3 class="text-xl font-display font-medium text-white mb-4">Total Clarity</h3>
                <p class="text-slate-400 leading-relaxed font-light">Structure bulk water instantly. Flocculate impurities and establish a coherent, liquid-crystal phase.</p>
            </div>

            <!-- Feature 2 -->
            <div class="andara-grid__item relative group p-8 rounded-3xl border border-white/10 bg-[#0b1020]/80 backdrop-blur-xl hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20">
                <div class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="w-14 h-14 rounded-2xl bg-amber-900/30 flex items-center justify-center mb-8 border border-amber-500/20 group-hover:scale-110 transition-transform">
                     <svg class="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <h3 class="text-xl font-display font-medium text-white mb-4">Bio-Electric Range</h3>
                <p class="text-slate-400 leading-relaxed font-light">Delivers sulfate minerals in the ~25mg/L activation window. Perfect for metabolic energy and cellular hydration.</p>
            </div>

            <!-- Feature 3 -->
            <div class="andara-grid__item relative group p-8 rounded-3xl border border-white/10 bg-[#0b1020]/80 backdrop-blur-xl hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/20">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="w-14 h-14 rounded-2xl bg-indigo-900/30 flex items-center justify-center mb-8 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                    <svg class="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <h3 class="text-xl font-display font-medium text-white mb-4">Massive Yield</h3>
                <p class="text-slate-400 leading-relaxed font-light">One 1L bottle treats 2000L+ of water. Far more sustainable and economical than bottled water.</p>
            </div>
        </div>
    </div>
  </section>

  <!-- SECTION: The Collection -->
  <section id="collection" class="andara-section py-24 bg-gradient-to-b from-[#020617] to-slate-950 border-t border-white/5">
    <div class="container px-6 mx-auto max-w-7xl">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
                 <h2 class="font-display text-4xl md:text-6xl font-bold text-white mb-4">Select Your Tier</h2>
                 <p class="text-emerald-400 font-mono text-sm tracking-widest uppercase">From Home Stations to Full Retreats</p>
            </div>
        </div>

        <div class="andara-grid grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <!-- Tier 1 -->
            <div class="andara-grid__item rounded-[2rem] border border-white/10 bg-[#0f1422] p-8 hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-3xl font-display font-bold text-white mb-2">1 L Core</h3>
                <p class="text-slate-500 text-sm font-medium uppercase tracking-wider mb-8">The Essential</p>
                <div class="h-px w-full bg-white/5 mb-8"></div>
                <ul class="space-y-4 mb-10">
                    <li class="flex items-center gap-3 text-slate-300 font-light"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Single Household</li>
                    <li class="flex items-center gap-3 text-slate-300 font-light"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>2,000L Yield</li>
                    <li class="flex items-center gap-3 text-slate-300 font-light"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Starter Guide included</li>
                </ul>
                <button class="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors">Select Option</button>
            </div>

            <!-- Tier 2 (Highlighted) -->
            <div class="andara-grid__item rounded-[2rem] border border-indigo-500/30 bg-[#161b2e] p-10 transform lg:-translate-y-8 shadow-2xl shadow-indigo-900/20 relative overflow-hidden group">
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400"></div>
                <div class="absolute top-6 right-6 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20">Most Popular</div>
                
                <h3 class="text-4xl font-display font-bold text-white mb-2">4 L Bundle</h3>
                <p class="text-indigo-400 text-sm font-medium uppercase tracking-wider mb-8">Family & Studio</p>
                <div class="h-px w-full bg-indigo-500/10 mb-8"></div>
                <ul class="space-y-4 mb-10">
                    <li class="flex items-center gap-3 text-white font-light"><svg class="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>Large Families / Yoga Studios</li>
                    <li class="flex items-center gap-3 text-white font-light"><svg class="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>8,000L Total Yield</li>
                    <li class="flex items-center gap-3 text-white font-light"><svg class="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>Significant Bulk Savings</li>
                </ul>
                <button class="w-full py-5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all hover:-translate-y-1">Select 4L Bundle</button>
            </div>

            <!-- Tier 3 -->
            <div class="andara-grid__item rounded-[2rem] border border-white/10 bg-[#0f1422] p-8 hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-3xl font-display font-bold text-white mb-2">9 L Pro</h3>
                <p class="text-slate-500 text-sm font-medium uppercase tracking-wider mb-8">Professional</p>
                <div class="h-px w-full bg-white/5 mb-8"></div>
                <ul class="space-y-4 mb-10">
                    <li class="flex items-center gap-3 text-slate-300 font-light"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Retreat Centers / Spas</li>
                    <li class="flex items-center gap-3 text-slate-300 font-light"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>18,000L+ Yield</li>
                    <li class="flex items-center gap-3 text-slate-300 font-light"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Maximum Volume Value</li>
                </ul>
                <button class="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors">Select Option</button>
            </div>
        </div>
    </div>
  </section>

  <!-- FAQ with Staggered Animation -->
  <section class="andara-section py-24 bg-[#020617] relative z-10 border-t border-white/5">
    <div class="container px-6 mx-auto max-w-4xl">
        <h2 class="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
        
        <div class="andara-faq space-y-4">
             <div class="andara-faq__item p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:bg-slate-900 transition-colors cursor-pointer group">
                <h3 class="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors mb-2 flex items-center justify-between">
                    How long does 1 liter last?
                    <svg class="w-5 h-5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </h3>
                <p class="text-slate-400 font-light">For a typical household of 2-4 people drinking 2L/day each, one bottle lasts approximately 3-4 months.</p>
             </div>
             
             <div class="andara-faq__item p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:bg-slate-900 transition-colors cursor-pointer group">
                <h3 class="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors mb-2 flex items-center justify-between">
                    Do the bundles expire?
                    <svg class="w-5 h-5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </h3>
                <p class="text-slate-400 font-light">The mineral concentrate is shelf-stable indefinitely if kept sealed and out of direct sunlight. We recommend using within 2 years for best energetic potency.</p>
             </div>
        </div>
        
        <div class="mt-16 text-center">
             <a href="/shop/andara-ionic-1l" class="inline-flex items-center gap-3 rounded-full bg-emerald-500 px-10 py-5 text-lg font-bold text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.5)] transition hover:bg-emerald-400 hover:shadow-[0_0_50px_rgba(16,185,129,0.7)] hover:-translate-y-1">
                Start Your System
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
        </div>
    </div>
  </section>

</main>
`;

async function updatePageContent() {
    console.log("Updating page with Premium V3 (Full-Width Animated) design...");

    try {
        const result = await db.update(pages)
            .set({
                content: null, // Clear content to bypass standard renderer
                aiStartupHtml: premiumContentV3, // Use the advanced renderer
                updatedAt: new Date()
            })
            .where(eq(pages.path, "/shop/andara-1l-bundles"));

        console.log("✅ Page updated successfully!");
        console.log("Content cleared, aiStartupHtml set. Length:", premiumContentV3.length);
    } catch (error) {
        console.error("Error updating page:", error);
    } finally {
        process.exit(0);
    }
}

updatePageContent();
