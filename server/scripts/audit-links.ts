
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const CLIENT_DIR = path.resolve(__dirname, '../../client/src');
const APP_TSX = path.resolve(CLIENT_DIR, 'App.tsx');
const REDIRECTS_TS = path.resolve(CLIENT_DIR, 'data/redirects.ts');

// --- 1. HARVEST VALID ROUTES ---
function getValidRoutes(): Set<string> {
    const routes = new Set<string>();

    // Scan App.tsx for <Route path="..." ... />
    if (fs.existsSync(APP_TSX)) {
        const content = fs.readFileSync(APP_TSX, 'utf-8');
        // Match path="X" or path='X'
        const matches = content.matchAll(/<Route[^>]*path=["']([^"']+)["'][^>]*>/g);
        for (const m of matches) {
            routes.add(m[1]);
        }
    }

    // Scan redirects.ts for "from" paths (these are valid legacy entry points)
    if (fs.existsSync(REDIRECTS_TS)) {
        const content = fs.readFileSync(REDIRECTS_TS, 'utf-8');
        const matches = content.matchAll(/from:\s*['"]([^'"]+)['"]/g);
        for (const m of matches) {
            routes.add(m[1]);
        }
    }

    // Add implicitly valid routes/patterns
    routes.add('/');

    return routes;
}

// --- 2. FILE SCANNER ---
function getFiles(dir: string): string[] {
    let results: string[] = [];
    if (!fs.existsSync(dir)) return results;

    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat && stat.isDirectory()) {
            // Skip node_modules, dist, etc. if strictly scanning src (already strictly inside src)
            results = results.concat(getFiles(fullPath));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(fullPath);
            }
        }
    }
    return results;
}

// --- 3. LINK EXTRACTOR ---
interface LinkIssue {
    file: string;
    line: number;
    link: string;
    type: 'href' | 'to';
}

function auditFiles(files: string[], validRoutes: Set<string>): LinkIssue[] {
    const issues: LinkIssue[] = [];

    for (const f of files) {
        const content = fs.readFileSync(f, 'utf-8');
        const lines = content.split('\n');

        lines.forEach((lineStr, idx) => {
            const lineNum = idx + 1;

            // Regex for href="..." and to="..."
            // We focus on static strings. Dynamic links {`...`} are harder to validate statically.
            const hrefMatches = lineStr.matchAll(/href=["'](\/[^"']*)["']/g);
            const toMatches = lineStr.matchAll(/to=["'](\/[^"']*)["']/g);

            // Process hrefs
            for (const m of hrefMatches) {
                const link = m[1];
                if (!isValid(link, validRoutes)) {
                    issues.push({ file: f, line: lineNum, link, type: 'href' });
                }
            }

            // Process tos
            for (const m of toMatches) {
                const link = m[1];
                if (!isValid(link, validRoutes)) {
                    issues.push({ file: f, line: lineNum, link, type: 'to' });
                }
            }
        });
    }

    return issues;
}

function isValid(link: string, validRoutes: Set<string>): boolean {
    // 1. Direct match
    if (validRoutes.has(link)) return true;

    // 2. Dynamic segments (e.g., /shop/:id)
    // Simple heuristic: if a valid route has :param, see if link matches the static part
    for (const valid of validRoutes) {
        if (valid.includes(':')) {
            const regexStr = '^' + valid.replace(/:[^\/]+/g, '[^\\/]+') + '$';
            const regex = new RegExp(regexStr);
            if (regex.test(link)) return true;
        }
    }

    // 3. Anchors/Queries
    const cleanLink = link.split('#')[0].split('?')[0];
    if (validRoutes.has(cleanLink)) return true;

    // 4. External/Assets (Validation usually skips these, but regex captured starting with /)
    if (link.startsWith('/assets') || link.startsWith('/images') || link.startsWith('/api')) return true;

    return false;
}

// --- MAIN ---
function main() {
    console.log('--- STARTING LINK AUDIT ---');

    // 1. Harvet Routes
    const validRoutes = getValidRoutes();
    console.log(`Found ${validRoutes.size} valid routes/redirects.`);
    // console.log([...validRoutes].sort()); // Debug

    // 2. Scan Files
    const files = getFiles(CLIENT_DIR);
    console.log(`Scanning ${files.length} files in ${CLIENT_DIR}...`);

    // 3. Audit
    const issues = auditFiles(files, validRoutes);

    // 4. Report
    if (issues.length === 0) {
        console.log('✅ No broken internal links found.');
    } else {
        console.log(`❌ Found ${issues.length} potentially broken links:\n`);

        // Group by Link for easier batch fixing
        const byLink: Record<string, LinkIssue[]> = {};
        issues.forEach(i => {
            if (!byLink[i.link]) byLink[i.link] = [];
            byLink[i.link].push(i);
        });

        for (const [link, occurrences] of Object.entries(byLink)) {
            console.log(`🔗 INVALID LINK: "${link}" (${occurrences.length} instances)`);
            occurrences.forEach(o => {
                const relativePath = path.relative(process.cwd(), o.file);
                console.log(`   - ${relativePath}:${o.line}`);
            });
            console.log('');
        }
    }
}

main();
