
import { ingestInternalDocument } from '../server/services/knowledge-base';
import fs from 'fs';
import path from 'path';

async function ingestReports() {
    console.log('📚 Ingesting Learning Reports & Session Summaries...');

    // List of report files to ingest
    const files = [
        "chat-history-admin-tsx-fix.md",
        "replit.md",
        "AI_LEARNING_SESSION_2025-12-17.md",
        "AI_LEARNING_SESSION_2025-12-17_PART2.md",
        "AI_LEARNING_SESSION_2025-12-17_UPGRADES.md"
    ];

    let successCount = 0;

    for (const filename of files) {
        const filePath = path.resolve(process.cwd(), filename);

        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️  File not found: ${filename} (Skipping)`);
            continue;
        }

        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const titleMatch = content.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1].trim() : filename.replace(/-/g, ' ').replace('.md', '');

            console.log(`📄 Ingesting: ${title} (${filename})`);

            const id = await ingestInternalDocument({
                title: title,
                content: content,
                source: `report:${filename}`,
                type: 'document',
                metadata: {
                    filename,
                    ingested_at: new Date().toISOString(),
                    category: 'Development Learning'
                }
            });

            console.log(`   ✅ Success! ID: ${id}`);
            successCount++;

        } catch (error) {
            console.error(`   ❌ Failed to ingest ${filename}:`, error);
        }
    }

    console.log(`\n🎉 Ingested ${successCount} learning reports.`);
}

ingestReports().catch(console.error);
