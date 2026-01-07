
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { ingestDocument } from '../server/services/knowledge-base';
import { pool } from '../server/db';

async function main() {
    console.log('🚀 Ingesting 65 Individual Sources into Knowledge Base...\n');

    // Path to the inventory file we generated earlier
    // Try both absolute (from context) and relative locations
    const possiblePaths = [
        '.gemini/antigravity/brain/2a789a65-dbd8-4e9f-a417-600451f9866c/source_inventory.md',
        '/Users/atti/.gemini/antigravity/brain/2a789a65-dbd8-4e9f-a417-600451f9866c/source_inventory.md',
        'source_inventory.md'
    ];

    let inventoryContent = '';
    for (const p of possiblePaths) {
        try {
            inventoryContent = await fs.readFile(p, 'utf-8');
            console.log(`✅ Found inventory at: ${p}`);
            break;
        } catch (e) { /* ignore */ }
    }

    if (!inventoryContent) {
        console.error('❌ Could not find source_inventory.md in expected locations.');
        process.exit(1);
    }

    // Parse the Markdown Table
    // Format: | 1 | Type | Title | Status |
    const lines = inventoryContent.split('\n');
    let count = 0;

    for (const line of lines) {
        const match = line.match(/^\|\s*(\d+)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|/);
        if (match) {
            const id = match[1];
            const type = match[2].trim();
            const title = match[3].trim();

            // Skip header if it matched digit (unlikely but safe)
            if (type === 'Type') continue;

            console.log(`Processing [${id}]: ${title.substring(0, 50)}...`);

            // Determine metadata based on type
            let docType = 'document'; // default for KB
            let zone = 'science'; // default

            // Map Inventory Type to KB Type/Tags
            const tags = ['notebooklm', 'source-import'];
            if (type.includes('PDF') || type.includes('Document')) {
                tags.push('pdf', 'text');
            } else if (type.includes('YouTube') || type.includes('Video')) {
                docType = 'video';
                tags.push('video', 'youtube');
            } else if (type.includes('Web Link')) {
                docType = 'link';
                tags.push('web', 'reference');
            } else if (type.includes('Notebook Report')) {
                tags.push('report');
            }

            // Since we don't have the full text, we create a Stub/Metadata-only entry.
            // But ingestDocument requires content. 
            // We will add a description to the content so it's searchable.
            const description = `Imported Source: ${title}\nType: ${type}\n\n(Full text content was not accessible via automated scrape. This entry serves as a metadata record for the Admin Library.)`;

            await ingestDocument({
                title: title,
                content: description,
                source: `notebooklm:import:${id}`,
                type: docType,
                zone: zone as any,
                metadata: {
                    original_id: id,
                    original_type: type,
                    tags: tags,
                    imported_at: new Date().toISOString()
                }
            });
            count++;
        }
    }

    console.log(`\n✨ Successfully ingested ${count} individual source records.`);
    await pool.end();
}

main();
