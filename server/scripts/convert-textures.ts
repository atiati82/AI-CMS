
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const TEXTURE_DIR = path.resolve(process.cwd(), 'client/public/images/textures');
const ASSETS = [
    'shop_light_texture',
    'source_volcanic_texture',
    'lab_optical_texture'
];

async function convertToWebP() {
    console.log("Converting textures to WebP...");

    for (const asset of ASSETS) {
        const inputPath = path.join(TEXTURE_DIR, `${asset}.png`);
        const outputPath = path.join(TEXTURE_DIR, `${asset}.webp`);

        if (fs.existsSync(inputPath)) {
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            console.log(`Converted: ${asset}.png -> ${asset}.webp`);
        } else {
            console.error(`Missing input: ${inputPath}`);
        }
    }
}

convertToWebP().catch(console.error);
