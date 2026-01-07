/**
 * Layout Guard Script
 * Ensures canonical layout files maintain their signature.
 * Run as: npx tsx scripts/guard-layouts.ts
 */
import fs from "fs";
import path from "path";

const CANONICAL_SIGNATURE = "CANONICAL_LAYOUT_V1";

const protectedLayouts = [
    "client/src/templates/gpt/LandingLayout.tsx",
    "client/src/templates/gpt/ProductLayout.tsx",
    "client/src/templates/gpt/ArticleLayout.tsx",
    "client/src/templates/gpt/UtilityLayout.tsx",
];

let failed = false;

console.log("🔒 Layout Guard: Checking canonical layouts...\n");

for (const relativePath of protectedLayouts) {
    const fullPath = path.resolve(process.cwd(), relativePath);

    if (!fs.existsSync(fullPath)) {
        console.error("❌ MISSING: " + relativePath);
        failed = true;
        continue;
    }

    const content = fs.readFileSync(fullPath, "utf8");

    if (!content.includes(CANONICAL_SIGNATURE)) {
        console.error("❌ TAMPERED: " + relativePath + " — Missing canonical signature");
        failed = true;
    } else {
        console.log("✅ Protected: " + relativePath);
    }
}

if (failed) {
    console.error("\n🚨 Layout guard FAILED. Build aborted.");
    console.error("   Restore canonical layouts from git or add CANONICAL_LAYOUT_V1 signature.\n");
    process.exit(1);
}

console.log("\n✅ All canonical layouts verified.\n");
