import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '../../');
const VIDEO_DIRS = [
    path.join(PROJECT_ROOT, 'client/public/videos/processed'),
    path.join(PROJECT_ROOT, 'uploads/Videos/GSAP'),
    path.join(PROJECT_ROOT, 'andara-ionic-cms/uploads/Videos/GSAP') // Based on find results
];

const BACKUP_DIR = path.join(PROJECT_ROOT, 'backups/videos_pre_optimization');

function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function getFiles(dir: string, ext: string = '.mp4'): string[] {
    let results: string[] = [];
    if (!fs.existsSync(dir)) return results;

    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file, ext));
        } else if (file.endsWith(ext)) {
            results.push(file);
        }
    });
    return results;
}

interface VideoMetadata {
    width: number;
    height: number;
    bitrate: number;
}

function getMetadata(file: string): VideoMetadata | null {
    try {
        const cmd = `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,bit_rate -of csv=s=x:p=0 "${file}"`;
        const output = execSync(cmd).toString().trim();
        const [width, height, bitrate] = output.split('x').map(Number);
        return { width, height, bitrate: bitrate || 0 };
    } catch (e) {
        console.error(`Error probing ${file}:`, e);
        return null;
    }
}

async function optimizeVideo(file: string) {
    const meta = getMetadata(file);
    if (!meta) return;

    const is1080p = meta.width === 1920 && meta.height === 1080;
    const highBitrate = meta.bitrate > 5000000; // > 5Mbps is likely overkill for backgrounds

    if (is1080p && !highBitrate) {
        console.log(`✅ ${path.basename(file)} is already 1080p and optimized.`);
        return;
    }

    console.log(`🚀 Optimizing ${path.basename(file)} (${meta.width}x${meta.height}, ${Math.round(meta.bitrate / 1000)}kbps)...`);

    const relativePath = path.relative(PROJECT_ROOT, file);
    const backupPath = path.join(BACKUP_DIR, relativePath);
    ensureDir(path.dirname(backupPath));

    // Backup
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(file, backupPath);
        console.log(`   📦 Backed up to ${path.relative(PROJECT_ROOT, backupPath)}`);
    }

    const tempOutput = file + '.tmp.mp4';

    // FFmpeg options:
    // -vf upscale to 1080p with padding if needed
    // -c:v libx264 high profile
    // -crf 23 (good balance)
    // -preset medium
    // -movflags +faststart (web loading)
    // -maxrate 4M -bufsize 8M (bitrate control)

    const scaleFilter = 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2';
    const ffmpegCmd = `ffmpeg -y -i "${file}" -vf "${scaleFilter}" -c:v libx264 -profile:v high -level:v 4.1 -crf 23 -maxrate 4M -bufsize 8M -pix_fmt yuv420p -movflags +faststart -c:a copy "${tempOutput}"`;

    try {
        execSync(ffmpegCmd, { stdio: 'inherit' });

        const oldSize = fs.statSync(file).size;
        const newSize = fs.statSync(tempOutput).size;

        fs.renameSync(tempOutput, file);

        console.log(`   ✨ Done! Size: ${Math.round(oldSize / 1024 / 1024)}MB -> ${Math.round(newSize / 1024 / 1024)}MB`);
    } catch (e) {
        console.error(`   ❌ Failed to optimize ${file}`);
        if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);
    }
}

async function run() {
    console.log('--- Andara Video Optimizer ---');
    ensureDir(BACKUP_DIR);

    const allVideos = VIDEO_DIRS.flatMap(dir => getFiles(dir));
    console.log(`Found ${allVideos.length} videos to check.`);

    for (const video of allVideos) {
        await optimizeVideo(video);
    }

    console.log('--- All Processing Complete ---');
}

run();
