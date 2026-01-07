import "dotenv/config";
import { storage } from "../server/storage";
import { db } from "../server/db";
import { pages } from "../shared/schema";
import { eq, inArray } from "drizzle-orm";

const pathsToDelete = [
    "/shop/line-comparison",
    "/science/water/ez-experiments",
    "/shop/price-comparison",
    "/compare-bundles",
    "/science/microbiome/bifido",
    "/science/microbiome/studies",
    "/science/microbiome/mineral-roots",
    "/science/microbiome",
    "/science/microbiome/scfa",
    "/science/experiments/clarity",
    "/science/experiments",
    "/science/experiments/test-kit",
    "/science/experiments/magnets",
    "/science/experiments/tracking",
    "/science/experiments/vortex"
];

async function deletePages() {
    console.log("Deleting pages with paths:", pathsToDelete);

    try {
        const result = await db.delete(pages).where(inArray(pages.path, pathsToDelete)).returning({ title: pages.title, path: pages.path });

        console.log(`Deleted ${result.length} pages:`);
        result.forEach(p => console.log(`- ${p.title} (${p.path})`));
    } catch (error) {
        console.error("Error deleting pages:", error);
    } finally {
        process.exit(0);
    }
}

deletePages();
