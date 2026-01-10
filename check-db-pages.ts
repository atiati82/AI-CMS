
import { DatabaseStorage } from "./server/storage";

async function check() {
    const storage = new DatabaseStorage();
    const stats = await storage.getContentStats();
    console.log("=== DB STATS ===");
    console.log(`Total Pages: ${stats.totalPages}`);
    console.log(`Published Pages: ${stats.publishedPages}`);
    console.log(`Draft Pages: ${stats.draftPages}`);

    const allPages = await storage.getAllPages();
    const paths = allPages.map(p => p.path);
    console.log("=== PUBLISHED PATHS ===");
    console.log(JSON.stringify(paths, null, 2));
    process.exit(0);
}

check().catch(err => {
    console.error(err);
    process.exit(1);
});
