
import { db } from "../db";
import { pages } from "@shared/schema";
import { eq } from "drizzle-orm";

const SHOP_CONTENT: Record<string, { title: string, content: string }> = {
    "/products/andara-ionic-1l": {
        title: "Andara Ionic (1L) - Professional Bulk Source",
        content: `
<h1>The Professional Source</h1>
<p class="lead">Primordial Ionic Sulfate Minerals in their most efficient form. The 1 Liter bottle is designed for consistent usage, families, and practitioner supply.</p>

<section class="andara-section">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
      <div class="glass-card p-6 border-l-4 border-amber-400/50">
          <h3 class="text-amber-300 text-xl font-display mb-2">Bulk Economics</h3>
          <p>By switching to the 1L Source bottle, your effective cost drops to <strong>€0.04 per liter</strong> of treated water. This is the "Hydration Economics" standard for daily life.</p>
      </div>
      <div class="glass-card p-6 border-l-4 border-emerald-400/50">
          <h3 class="text-emerald-300 text-xl font-display mb-2">Usage Protocol</h3>
          <p>Add 2.5ml per liter of water. One bottle treats 400 Liters of water—enough for 6 months of high-density hydration for an individual.</p>
      </div>
  </div>
</section>

<section class="andara-section">
  <h2>Why Sulfates?</h2>
  <p>Sulfate is the architect of water structure. It drives the formation of the Exclusion Zone (EZ) and acts as the delivery system for all other trace minerals.</p>
</section>
        `
    },
    "/products/andara-ionic-100ml-bundles": {
        title: "100ml Ritual Bundles",
        content: `
<h1>Ritual & Travel Bundles</h1>
<p class="lead">The Blue Bottle (100ml) is your companion for travel, work, and sharing. Pure clarity in a ritual size.</p>

<section class="andara-section">
    <h2>Choose Your Supply</h2>
    <div class="space-y-4">
        <div class="glass-card p-4 flex justify-between items-center">
             <div>
                <h3 class="font-bold text-white">Try & Feel (1x)</h3>
                <p class="text-sm text-slate-400">The entry point. Experience the taste and clarity shift.</p>
             </div>
             <span class="text-cyan-400 font-mono">Starter</span>
        </div>
        <div class="glass-card p-4 flex justify-between items-center bg-cyan-900/20 border-cyan-500/30">
             <div>
                <h3 class="font-bold text-white">Ritual Bundle (3+1 Free)</h3>
                <p class="text-sm text-slate-400">Our most popular choice. Stock your home and office.</p>
             </div>
             <span class="text-cyan-400 font-mono">Best Value</span>
        </div>
    </div>
</section>
        `
    },
    "/shop": {
        title: "Andara Ionic Shop",
        content: `
<h1>Hydration Economics</h1>
<p class="lead">From the "Ritual" blue bottle to the "Source" liter. Choose the format that fits your flow.</p>

<section class="andara-section">
    <h2>The 100ml / 1L Split</h2>
    <p>We offer two primary lines: The <strong>100ml "Bali Line"</strong> for clarity, travel, and ritual use, and the <strong>1L "EU Line"</strong> for bulk efficiency and biological foundation.</p>
</section>
        `
    }
};

async function hydrateShop() {
    console.log("Hydrating Shop Pages...");

    for (const [path, data] of Object.entries(SHOP_CONTENT)) {
        const existingPageResult = await db.select().from(pages).where(eq(pages.path, path)).limit(1);
        const page = existingPageResult[0];

        if (page) {
            console.log(`Updating: ${path}`);
            await db.update(pages)
                .set({
                    title: data.title,
                    content: data.content,
                    aiStartupHtml: data.content,
                    updatedAt: new Date()
                })
                .where(eq(pages.id, page.id));
        } else {
            console.log(`[WARN] Shop page not found: ${path}`);
        }
    }

    console.log("Shop Hydration Complete.");
    process.exit(0);
}

hydrateShop().catch(console.error);
