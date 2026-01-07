
import { db } from "../db";
import { pages } from "@shared/schema";
import { eq, isNull } from "drizzle-orm";

// Theme mappings based on clusters
const THEMES = {
    science: {
        water: { variant: 'cyan', motion: 'flow', palette: ['#06b6d4', '#0891b2', '#164e63'] },
        mineral: { variant: 'emerald', motion: 'crystalline', palette: ['#34d399', '#059669', '#064e3b'] },
        bioelectric: { variant: 'gold', motion: 'vortex', palette: ['#fbbf24', '#d97706', '#78350f'] },
        matrix: { variant: 'violet', motion: 'grid', palette: ['#a78bfa', '#7c3aed', '#4c1d95'] }
    },
    shop: { variant: 'slate', motion: 'fade', palette: ['#94a3b8', '#475569', '#0f172a'] }
};

function getThemeForPath(path: string): any {
    if (path.includes('shop') || path.includes('product')) return THEMES.shop;

    if (path.includes('water') || path.includes('ez') || path.includes('phases') || path.includes('hydration')) return THEMES.science.water;
    if (path.includes('mineral') || path.includes('sulfate') || path.includes('magnesium') || path.includes('ionic')) return THEMES.science.mineral;
    if (path.includes('bioelectric') || path.includes('voltage') || path.includes('charge')) return THEMES.science.bioelectric;
    if (path.includes('matrix') || path.includes('geometry') || path.includes('crystal')) return THEMES.science.matrix;

    return THEMES.science.water; // Default fallback
}

async function batchVisualConfig() {
    console.log("Starting Batch Visual Config...");

    // Find pages with missing visualConfig (or where it's empty/null)
    // Note: 'json' columns can be tricky to query for "empty json" in all drivers, so we fetch all and filter in app logic safely
    const allPages = await db.select().from(pages);

    const targetPages = allPages.filter(p => !p.visualConfig || Object.keys(p.visualConfig as object).length === 0);

    console.log(`Found ${targetPages.length} pages needing Visual Intelligence.`);

    for (const p of targetPages) {
        const theme = getThemeForPath(p.path);
        const config = {
            heroVariant: theme.variant,
            motionPreference: theme.motion,
            colorPalette: theme.palette,
            designSystem: 'andara-glass-v2',
            imagePrompts: [`Abstract ${theme.variant} data visualization for ${p.title}`]
        };

        console.log(`Applying '${theme.variant}' theme to: ${p.path}`);

        await db.update(pages)
            .set({
                visualConfig: config,
                updatedAt: new Date()
            })
            .where(eq(pages.id, p.id));
    }

    console.log("Batch Visual Config Complete.");
    process.exit(0);
}

batchVisualConfig().catch(console.error);
