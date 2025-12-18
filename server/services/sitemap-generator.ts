
import { storage } from "../storage";

const SITE_URL = process.env.SITE_URL || 'https://andara-ionic.com'; // Fallback for local/dev

/**
 * Generates a standard XML sitemap string
 */
export async function generateSitemapXml(): Promise<string> {
    const pages = await storage.getAllPages();
    const products = await storage.getAllProducts();
    const articles = await storage.getAllScienceArticles();

    const urls: string[] = [];

    // 1. Static/Hardcoded high-priority routes
    urls.push(createUrlEntry('/', 1.0, 'daily'));
    urls.push(createUrlEntry('/shop', 0.9, 'daily'));
    urls.push(createUrlEntry('/science', 0.9, 'weekly'));

    // 2. Dynamic Pages
    for (const page of pages) {
        if (page.status === 'published' && page.isInSitemap) {
            // Priority: from DB (0-100) -> 0.0-1.0, default 0.7
            const priority = (page.sitemapPriority || 70) / 100;
            urls.push(createUrlEntry(page.path, priority, 'weekly', page.updatedAt));
        }
    }

    // 3. Products
    for (const product of products) {
        if (product.isInSitemap) {
            // Products are high priority
            const priority = (product.sitemapPriority || 80) / 100;
            urls.push(createUrlEntry(`/shop/${product.slug}`, priority, 'daily', product.createdAt));
        }
    }

    // 4. Science Articles
    for (const article of articles) {
        if (article.isInSitemap) {
            const priority = (article.sitemapPriority || 60) / 100;
            // Assuming path structure /science/:slug based on routes
            urls.push(createUrlEntry(`/science/${article.slug}`, priority, 'monthly', article.updatedAt));
        }
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

function createUrlEntry(path: string, priority: number, changefreq: string, lastMod?: Date | null): string {
    // Ensure path starts with /
    const safePath = path.startsWith('/') ? path : `/${path}`;
    const fullUrl = `${SITE_URL}${safePath}`;

    const lastModTag = lastMod ? `    <lastmod>${lastMod.toISOString()}</lastmod>` : '';

    return `  <url>
    <loc>${fullUrl}</loc>
${lastModTag}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}
