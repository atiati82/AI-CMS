import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to products assets
const ASSETS_DIR = path.resolve(__dirname, '../../client/src/assets/products');

async function optimizeAssets() {
    console.log('Use Sharp to optimize assets in:', ASSETS_DIR);

    if (!fs.existsSync(ASSETS_DIR)) {
        console.error('Assets directory not found');
        return;
    }

    const files = fs.readdirSync(ASSETS_DIR);
    let totalSavedBytes = 0;

    for (const file of files) {
        if (file.endsWith('.png')) {
            const inputPath = path.join(ASSETS_DIR, file);
            const outputPath = path.join(ASSETS_DIR, file.replace('.png', '.webp'));

            // Check if webp already exists and is newer? No, just overwrite or check existence.
            // For this task, let's just create them.

            console.log(`Optimizing ${file}...`);

            try {
                await sharp(inputPath)
                    .webp({ quality: 85 })
                    .toFile(outputPath);

                const inputStats = fs.statSync(inputPath);
                const outputStats = fs.statSync(outputPath);
                const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(2);
                const savedBytes = inputStats.size - outputStats.size;
                totalSavedBytes += savedBytes;

                console.log(`✅ Generated ${path.basename(outputPath)}`);
                console.log(`   Size: ${(inputStats.size / 1024).toFixed(2)}KB -> ${(outputStats.size / 1024).toFixed(2)}KB (Saved ${savings}%)`);
            } catch (err) {
                console.error(`❌ Error converting ${file}:`, err);
            }
        }
    }

    console.log('------------------------------------------------');
    console.log(`Total Space Saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
}

optimizeAssets();
