/**
 * Ingest 65 NotebookLM Sources into the Admin UI "Documents" table.
 * 
 * This writes to the `documents` table (read by /api/admin/documents)
 * rather than `knowledge_base`.
 * 
 * Run with: npx tsx scripts/ingest-sources-to-documents.ts
 */

import 'dotenv/config';
import fs from 'fs/promises';
import { storage } from '../server/storage';

async function main() {
    console.log('🚀 Ingesting 65 Sources into Admin UI Documents table...\n');

    // Parse the inventory
    const inventoryPath = '/Users/atti/.gemini/antigravity/brain/2a789a65-dbd8-4e9f-a417-600451f9866c/source_inventory.md';
    let inventoryContent = '';
    try {
        inventoryContent = await fs.readFile(inventoryPath, 'utf-8');
    } catch (e) {
        console.error('❌ Could not find inventory at:', inventoryPath);
        process.exit(1);
    }

    const lines = inventoryContent.split('\n');
    let count = 0;

    for (const line of lines) {
        // Parse table row: | 1 | Type | Title | Status |
        const match = line.match(/^\|\s*(\d+)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|/);
        if (!match) continue;

        const id = match[1];
        const type = match[2].trim();
        const title = match[3].trim();

        // Skip header
        if (type === 'Type') continue;

        // Determine sourceType for Admin UI
        let sourceType = 'paste'; // Default for text
        if (type.includes('YouTube') || type.includes('Video')) {
            sourceType = 'youtube';
        } else if (type.includes('Web Link')) {
            sourceType = 'url';
        } else if (type.includes('PDF') || type.includes('Document')) {
            sourceType = 'upload'; // Indicates file upload type
        }

        // Create the document with minimal content (we don't have the full text)
        const contentPlaceholder = `Imported Source #${id}: ${title}\n\nType: ${type}\n\n(Full text not available via automated scrape. This record links to the NotebookLM source inventory.)`;

        console.log(`[${id}] Creating: ${title.substring(0, 50)}...`);

        try {
            await storage.createDocument({
                title: title,
                sourceType: sourceType,
                rawText: contentPlaceholder,
                cleanText: contentPlaceholder,
                wordCount: contentPlaceholder.split(/\s+/).length,
                status: 'pending', // Marked as pending so user can update content
                metadata: {
                    source: 'notebooklm-import',
                    originalType: type,
                    importedAt: new Date().toISOString(),
                    tags: ['notebooklm', 'source-import', sourceType]
                }
            });
            count++;
        } catch (err: any) {
            console.error(`   ❌ Error: ${err.message}`);
        }
    }

    console.log(`\n✨ Complete! Created ${count} documents.`);
    console.log('📋 Refresh the Admin > Knowledge Base tab to see them.');
    process.exit(0);
}

main();
