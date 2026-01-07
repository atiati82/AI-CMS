
import fs from 'fs';
import path from 'path';
import { loaderRegistry } from './loaders';
import { ingestDocument } from './knowledge-base';
import { db } from '../db';
import { documents } from '../../shared/schema';
import { eq } from 'drizzle-orm';
import { ContentZone } from './content-firewall';

export interface ScanStats {
    totalFiles: number;
    processedCallback?: (current: number, total: number, file: string) => void;
    processed: number;
    skipped: number;
    errors: number;
    details: Array<{ file: string; status: 'processed' | 'skipped' | 'error'; message?: string }>;
}

export class DocumentScanner {
    private async walkDirectory(dir: string, fileList: string[] = []) {
        const files = await fs.promises.readdir(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = await fs.promises.stat(filePath);
            if (stat.isDirectory()) {
                if (file !== 'node_modules' && !file.startsWith('.')) {
                    await this.walkDirectory(filePath, fileList);
                }
            } else {
                fileList.push(filePath);
            }
        }
        return fileList;
    }

    async scanAndIngest(directoryPath: string, zone: ContentZone = 'science'): Promise<ScanStats> {
        const stats: ScanStats = {
            totalFiles: 0,
            processed: 0,
            skipped: 0,
            errors: 0,
            details: []
        };

        try {
            // 1. Gather all files
            if (!fs.existsSync(directoryPath)) {
                throw new Error(`Directory not found: ${directoryPath}`);
            }
            const allFiles = await this.walkDirectory(directoryPath);
            stats.totalFiles = allFiles.length;

            console.log(`[DocumentScanner] Found ${stats.totalFiles} files in ${directoryPath}`);

            // 2. Process each file
            for (const filePath of allFiles) {
                try {
                    // Check if file is supported
                    const ext = path.extname(filePath).toLowerCase();
                    // We don't have mime-type from fs easily without another lib, 
                    // relying on extension match which our registry supports.
                    // Or we could mock a mimetype for the registry check.

                    // Simple check if any loader supports this extension
                    // Actually loaderRegistry.getLoaderForFile checks extension fallback
                    const loader = loaderRegistry.getLoaderForFile('application/octet-stream', path.basename(filePath));

                    if (!loader) {
                        stats.skipped++;
                        // stats.details.push({ file: filePath, status: 'skipped', message: 'Unsupported type' });
                        continue;
                    }

                    // Check if already ingested (by source path)
                    // relative path as source id
                    const relPath = path.relative(process.cwd(), filePath);
                    const sourceId = `file://${relPath}`;

                    const existing = await db.select().from(documents).where(eq(documents.sourceUrl, sourceId)).limit(1);
                    if (existing.length > 0) {
                        stats.skipped++;
                        // stats.details.push({ file: filePath, status: 'skipped', message: 'Already exists' });
                        continue;
                    }

                    console.log(`[DocumentScanner] Processing: ${relPath}`);
                    const buffer = await fs.promises.readFile(filePath);
                    const text = await loader.parse(buffer);

                    if (!text || text.trim().length === 0) {
                        stats.errors++;
                        stats.details.push({ file: relPath, status: 'error', message: 'No text extracted' });
                        continue;
                    }

                    await ingestDocument({
                        title: path.basename(filePath),
                        content: text,
                        source: sourceId,
                        type: 'document',
                        zone: zone,
                        metadata: {
                            originalPath: filePath,
                            size: buffer.length
                        }
                    });

                    stats.processed++;
                    stats.details.push({ file: relPath, status: 'processed' });

                } catch (err: any) {
                    console.error(`[DocumentScanner] Error processing ${filePath}:`, err);
                    stats.errors++;
                    stats.details.push({ file: filePath, status: 'error', message: err.message });
                }
            }

        } catch (error: any) {
            throw new Error(`Scan failed: ${error.message}`);
        }

        return stats;
    }
}

export const documentScanner = new DocumentScanner();
