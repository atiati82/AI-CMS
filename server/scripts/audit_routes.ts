
import fs from 'fs';
import path from 'path';

const CLIENT_DIR = path.resolve(process.cwd(), 'client/src');
const APP_TSX = path.join(CLIENT_DIR, 'App.tsx');
const NAV_CONFIG = path.join(CLIENT_DIR, 'data/navigation-config.ts');
const SITEMAP = path.join(CLIENT_DIR, 'lib/static-sitemap.ts');

function main() {
    console.log("Starting Frontend Route Health Check...");

    // 1. Get Defined Routes from App.tsx
    const appContent = fs.readFileSync(APP_TSX, 'utf-8');
    // Match <Route path="/..." ... /> and <RedirectTo to="/..." />
    // Also match lazy imports to find physically existing pages
    const routeMatches = [...appContent.matchAll(/path="([^"]+)"/g)];
    const redirectToMatches = [...appContent.matchAll(/to="([^"]+)"/g)];

    const validRoutes = new Set<string>();
    routeMatches.forEach(m => validRoutes.add(m[1]));
    redirectToMatches.forEach(m => validRoutes.add(m[1]));

    console.log(`Found ${validRoutes.size} valid routes in App.tsx.`);

    // 2. Check Navigation Config
    const navContent = fs.readFileSync(NAV_CONFIG, 'utf-8');
    // Match path: "..." and href: "..."
    const navLinks = [...navContent.matchAll(/(?:path|href):\s*["']([^"']+)["']/g)];

    console.log(`\n--- checking ${navLinks.length} navigation links ---`);
    let brokenNavs = 0;
    navLinks.forEach(m => {
        const link = m[1];
        if (link.startsWith('http') || link.startsWith('#')) return; // Ignore external/anchors

        // Remove query params for check
        const cleanLink = link.split('?')[0];

        if (!validRoutes.has(cleanLink)) {
            console.error(`[BROKEN NAV] ${link} -> Not found in App.tsx`);
            brokenNavs++;
        }
    });

    // 3. Check Sitemap
    const sitemapContent = fs.readFileSync(SITEMAP, 'utf-8');
    // Using simple regex for JSON-like string in TS file
    const sitemapPaths = [...sitemapContent.matchAll(/"path":\s*["']([^"']+)["']/g)];

    console.log(`\n--- checking ${sitemapPaths.length} sitemap entries ---`);
    let brokenSitemap = 0;
    sitemapPaths.forEach(m => {
        const path = m[1];
        if (!validRoutes.has(path)) {
            // Some sitemap paths might be root "/" which is usually fine, but check
            if (path === '/') return;
            console.error(`[BROKEN SITEMAP] ${path} -> Not found in App.tsx`);
            brokenSitemap++;
        }
    });

    // 4. Check Physical Pools (Orphans)
    // List all .tsx in pages/
    // (Simplification: just recursively find valid page files and check if they are imported/used)
    // For now, simpler check: do we have routes that don't map to files? (Harder to check dynamically) 

    // Summary
    console.log("\n--- HEALTH CHECK SUMMARY ---");
    console.log(`Broken Navigation Links: ${brokenNavs}`);
    console.log(`Broken Sitemap Entries: ${brokenSitemap}`);
    if (brokenNavs === 0 && brokenSitemap === 0) {
        console.log("✅ SYSTEM HEALTHY");
    } else {
        console.log("❌ SYSTEM ISSUES FOUND");
    }
}

main();
