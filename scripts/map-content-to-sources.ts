
/**
 * MAP CONTENT TO SOURCES
 * 
 * This script parses the `NOTEBOOK_SOURCE_SUMMARIES.md` file and maps the text content
 * to the individual documents we just created in the `documents` table.
 * 
 * It looks for citations like "1" or "2" in the text, but since we don't have
 * a perfect citation map, we will use a fuzzy matching strategy:
 * 
 * 1. Read the full summary text.
 * 2. For each document in the DB:
 *    - Search for its title in the summary text.
 *    - Extract the paragraph surrounding the mention or citation.
 *    - If no direct mention, look for related keywords.
 * 
 * Actually, looking at the export format:
 * "Based on the provided text The Body Electric..."
 * "Source Material: Product Manuals, Kory Drafts..."
 * 
 * It seems the summaries are thematic, not strictly per-file.
 * However, the user wants "Content".
 * 
 * Strategy:
 * We will populate the "Content" of each document with the "Master Summary" 
 * relevant to its topic.
 * 
 * - If title contains "Adya" -> Map "Product Identity" and "Water Chemistry" sections.
 * - If title contains "Sulfate" -> Map "Sulfate Mineral Science" section.
 * - If title contains "Body Electric" -> Map "Biology" section.
 * 
 * This gives meaningful content to every file.
 */

import 'dotenv/config';
import fs from 'fs/promises';
import { storage } from '../server/storage';
import { pool } from '../server/db';

async function main() {
    console.log('📝 Mapping content to documents...\n');

    // 1. Read the Master Summary
    const summaryPath = '../NOTEBOOK_SOURCE_SUMMARIES.md'; // Parent directory
    let summaryText = '';
    try {
        summaryText = await fs.readFile(summaryPath, 'utf-8');
    } catch (e) {
        console.error('❌ Could not read NOTEBOOK_SOURCE_SUMMARIES.md');
        process.exit(1);
    }

    // 2. Define Topic Clusters and their Content from the Summary
    // We extracted these clusters from the file structure
    const clusters = {
        'product': {
            keywords: ['adya', 'clarity', 'themarox', 'manual', 'instruction', 'bottle', 'drops', 'usage', 'application'],
            content: extractSection(summaryText, 'ROOT NODE: PRODUCT IDENTITY', '2. CLUSTER: GEOLOGICAL ORIGIN')
        },
        'geology': {
            keywords: ['gypsum', 'anhydrite', 'volcanic', 'mica', 'biotite', 'geology', 'rock', 'mineral', 'formation', 'evaporite'],
            content: extractSection(summaryText, '2. CLUSTER: GEOLOGICAL ORIGIN', '3. CLUSTER: WATER CHEMISTRY')
        },
        'chemistry': {
            keywords: ['sulfate', 'ion', 'bond', 'solubility', 'acid', 'ph', 'orp', 'conductivity', 'precipit', 'flocculat'],
            content: extractSection(summaryText, '3. CLUSTER: WATER CHEMISTRY', '4. CLUSTER: PHYSICS')
        },
        'physics': {
            keywords: ['structure', 'ez water', 'pollack', 'phase', 'crystal', 'energy', 'vibration', 'emoto', 'message'],
            content: extractSection(summaryText, '4. CLUSTER: PHYSICS', '5. CLUSTER: BIOLOGY')
        },
        'biology': {
            keywords: ['body', 'electric', 'cell', 'mitochondria', 'health', 'gut', 'microbiome', 'bacteria', 'srb', 'toxicity', 'detox'],
            content: extractSection(summaryText, '5. CLUSTER: BIOLOGY', '6. CLUSTER: ENVIRONMENTAL')
        },
        'environment': {
            keywords: ['pollution', 'remediation', 'mine', 'drainage', 'amd', 'soil', 'agriculture', 'plant', 'waste'],
            content: extractSection(summaryText, '6. CLUSTER: ENVIRONMENTAL', '7. KEYWORD')
        }
    };

    // 3. Fetch all documents
    const docs = await storage.getAllDocuments();
    let updatedCount = 0;

    for (const doc of docs) {
        // Skip if already has substantial content (manual upload likely > 500 chars)
        // detailed check: if it's just the placeholder we added
        if (doc.cleanText && !doc.cleanText.includes('(Full text not available')) {
            continue;
        }

        const titleLower = doc.title.toLowerCase();
        let matchedContent = '';
        let matchedCluster = '';

        // Find best matching cluster
        for (const [key, data] of Object.entries(clusters)) {
            if (data.keywords.some(k => titleLower.includes(k))) {
                matchedContent = data.content;
                matchedCluster = key;
                break; // Stop at first strong match
            }
        }

        // Fallback Content
        if (!matchedContent) {
            matchedContent = summaryText.substring(0, 2000) + "\n\n... (See full Research Report for more)";
            matchedCluster = 'general';
        }

        // Prepare new content
        const enrichedContent = `
# Content Summary (Derived from Research Database)

**Topic Cluster:** ${matchedCluster.toUpperCase()}

${matchedContent}

---
*Original Source Title:* ${doc.title}
*Note:* This text is an AI-generated summary of the topic area this document belongs to.
`;

        // Update the document
        console.log(`[${doc.id}] Updating '${doc.title.substring(0, 30)}...' -> Cluster: ${matchedCluster}`);

        await storage.updateDocument(doc.id, {
            rawText: enrichedContent,
            cleanText: enrichedContent,
            wordCount: enrichedContent.split(/\s+/).length,
            status: 'indexed', // Auto-mark as indexed since we have content now
            metadata: {
                ...doc.metadata,
                cluster: matchedCluster,
                contentSource: 'notebooklm-summary-map'
            }
        });
        updatedCount++;
    }

    console.log(`\n✨ Updated ${updatedCount} documents with relevant summary content.`);
    await pool.end();
}

// Helper to slice text between headers
function extractSection(text: string, startHeader: string, endHeader: string): string {
    const startIdx = text.indexOf(startHeader);
    if (startIdx === -1) return '';

    // If end header not found, go to relatively end of section or file
    let endIdx = text.indexOf(endHeader);
    if (endIdx === -1) endIdx = text.length;

    // Clean up the extraction
    let section = text.substring(startIdx, endIdx);
    // Remove the header itself from the content to avoid duplication if printed elsewhere
    // actually keeping it is fine for context.
    return section.trim();
}

main();
