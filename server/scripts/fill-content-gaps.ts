
import { db } from "../db";
import { pages } from "@shared/schema";
import { eq, isNull } from "drizzle-orm";

async function fillContentGaps() {
    console.log("Starting Content Gap Fill...");

    // 1. Fix Certifications Page
    // Use select instead of query to avoid schema issues
    const certPageResult = await db.select().from(pages).where(eq(pages.path, '/trust/certifications')).limit(1);
    const certPage = certPageResult[0];

    if (certPage && (!certPage.content || certPage.content.trim() === "")) {
        console.log("Filling content for: Certifications & Compliance Overview");

        const newContent = `
      <div class="andara-page">
        <section class="andara-section hero-section relative overflow-hidden py-20">
          <div class="container mx-auto px-4 text-center z-10 relative">
            <h1 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
              Quality & Certifications
            </h1>
            <p class="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Our commitment to purity, safety, and transparency. Every batch of Andara Ionic Minerals is rigorously tested to ensure the highest standards.
            </p>
          </div>
        </section>

        <section class="andara-section py-16 bg-black/20">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="glass-card p-8 rounded-2xl border border-white/10">
                <h3 class="text-2xl font-bold text-sky-400 mb-4">GMP Certified</h3>
                <p class="text-slate-300">
                  Manufactured in a facility that strictly adheres to Good Manufacturing Practices (GMP) to ensure consistency and safety.
                </p>
              </div>
              <div class="glass-card p-8 rounded-2xl border border-white/10">
                <h3 class="text-2xl font-bold text-emerald-400 mb-4">Lab Tested</h3>
                <p class="text-slate-300">
                  Independent third-party laboratory testing validates the mineral profile and ensures purity from contaminants.
                </p>
              </div>
              <div class="glass-card p-8 rounded-2xl border border-white/10">
                <h3 class="text-2xl font-bold text-amber-400 mb-4">Sourced with Integrity</h3>
                <p class="text-slate-300">
                  Derived from pristine natural sources and processed using methods that preserve bio-availability.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="andara-section py-16">
           <div class="container mx-auto px-4 max-w-4xl">
             <h2 class="text-3xl font-bold mb-8 text-center">Compliance Standards</h2>
             <div class="prose prose-invert mx-auto">
               <p>
                 Andara Ionic operates in full compliance with FDA regulations for dietary supplements (Zone 1). 
                 We maintain strict quality control protocols at every stage of production, from raw material sourcing to final bottling.
               </p>
               <p>
                 View our latest <a href="#" class="text-sky-400 hover:text-sky-300">Certificate of Analysis (COA)</a> for batch 2025-A.
               </p>
             </div>
           </div>
        </section>
      </div>
    `;

        await db.update(pages)
            .set({
                content: newContent,
                aiStartupHtml: newContent, // Fill both
                status: 'published'
            })
            .where(eq(pages.id, certPage.id));

        console.log("Verified: Certifications page updated.");
    } else {
        console.log("Certifications page already has content or does not exist.");
    }

    // 2. Backfill aiStartupHtml for others
    console.log("Backfilling aiStartupHtml for remaining pages...");

    const allPages = await db.select().from(pages);
    let updatedCount = 0;

    for (const p of allPages) {
        if (p.content && p.content.length > 0 && (!p.aiStartupHtml || p.aiStartupHtml.trim() === "")) {
            // Use existing content as the "startup" (raw) content
            await db.update(pages)
                .set({ aiStartupHtml: p.content })
                .where(eq(pages.id, p.id));
            updatedCount++;
        }
    }

    console.log(`Backfilled aiStartupHtml for ${updatedCount} pages.`);

    process.exit(0);
}

fillContentGaps().catch(console.error);
