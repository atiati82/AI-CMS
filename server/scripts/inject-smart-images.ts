
import { db } from "../db";
import { pages } from "@shared/schema";
import { eq, like } from "drizzle-orm";

const TEXTURES = {
    water: "/images/textures/water_texture.png",
    mineral: "/images/textures/mineral_texture.png",
    bioelectric: "/images/textures/bioelectric_texture.png",
    matrix: "/images/textures/matrix_texture.png",
    shop: "/images/textures/shop_light_texture.webp",
    lab: "/images/textures/lab_optical_texture.webp",
    source: "/images/textures/source_volcanic_texture.webp"
};

const ICONS = {
    water: "Droplets",
    mineral: "Gem",
    bioelectric: "Zap",
    matrix: "Hexagon",
    shop: "ShoppingBag",
    about: "Droplets",
    trust: "ShieldCheck",
    community: "Users",
    concepts: "Map",
    support: "HelpCircle",
    blog: "BookOpen",
    legal: "Scale"
};

function getAssetsForPath(path: string): { image: string, icon: string } {
    const p = path.toLowerCase();

    // Core Pillars
    if (p.includes('water') || p.includes('ez') || p.includes('phases')) return { image: TEXTURES.water, icon: ICONS.water };
    if (p.includes('mineral') || p.includes('sulfate') || p.includes('ionic')) return { image: TEXTURES.mineral, icon: ICONS.mineral };
    if (p.includes('bioelectric') || p.includes('voltage') || p.includes('charge')) return { image: TEXTURES.bioelectric, icon: ICONS.bioelectric };
    if (p.includes('matrix') || p.includes('geometry') || p.includes('crystal')) return { image: TEXTURES.matrix, icon: ICONS.matrix };

    // Commerce
    if (p.includes('shop') || p.includes('product') || p.includes('cart')) return { image: TEXTURES.shop, icon: ICONS.shop };

    // Site Sections
    if (p.includes('about') || p.includes('story') || p.includes('vision') || p.includes('founder') || p.includes('overview') || p.includes('source') || p.includes('origin')) return { image: TEXTURES.source, icon: ICONS.about };

    if (p.includes('trust') || p.includes('lab') || p.includes('clarification') || p.includes('certifications') || p.includes('methods')) return { image: TEXTURES.lab, icon: ICONS.trust };

    if (p.includes('community') || p.includes('events') || p.includes('join') || p.includes('newsletter')) return { image: TEXTURES.bioelectric, icon: ICONS.community };
    if (p.includes('concepts') || p.includes('terrain')) return { image: TEXTURES.mineral, icon: ICONS.concepts };
    if (p.includes('support') || p.includes('contact') || p.includes('faq') || p.includes('shipping')) return { image: TEXTURES.shop, icon: ICONS.support };
    if (p.includes('blog')) return { image: TEXTURES.mineral, icon: ICONS.blog };
    if (p.includes('legal') || p.includes('privacy') || p.includes('terms') || p.includes('imprint')) return { image: TEXTURES.matrix, icon: ICONS.legal };

    return { image: TEXTURES.water, icon: ICONS.water }; // Universal Default
}

async function injectSmartImages() {
    console.log("Starting Universal Smart Image Injection (Tailored)...");

    // Fetch ALL pages
    const targets = await db.select().from(pages);

    let count = 0;

    for (const p of targets) {
        if (p.status !== 'published') continue;

        const assets = getAssetsForPath(p.path);
        const currentConfig = (p.visualConfig as any) || {};

        const newConfig = {
            ...currentConfig,
            heroImage: assets.image,
            heroIconName: assets.icon
        };

        await db.update(pages)
            .set({
                visualConfig: newConfig,
                updatedAt: new Date()
            })
            .where(eq(pages.id, p.id));

        count++;
    }

    console.log(`\nInjection Complete. Updated ${count} pages with Tailored High-Fidelity Assets.`);
    process.exit(0);
}

injectSmartImages().catch(console.error);
