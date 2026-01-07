
const fs = require('fs');
const path = require('path');

const APP_FILE = path.join(__dirname, '../client/src/App.tsx');
const SRC_DIR = path.join(__dirname, '../client/src');

function checkRoutes() {
    if (!fs.existsSync(APP_FILE)) {
        console.error(`Error: App.tsx not found at ${APP_FILE}`);
        process.exit(1);
    }

    const content = fs.readFileSync(APP_FILE, 'utf8');
    const regex = /lazy\(\(\) => import\(['"]([^'"]+)['"]\)\)/g;
    let match;
    let missing = 0;
    let checked = 0;

    console.log('Checking lazy loaded routes in App.tsx...');

    while ((match = regex.exec(content)) !== null) {
        const importPath = match[1];
        checked++;

        let resolvedPath;
        if (importPath.startsWith('@/')) {
            resolvedPath = path.join(SRC_DIR, importPath.substring(2));
        } else {
            // Relative path? App.tsx is in SRC_DIR
            resolvedPath = path.join(SRC_DIR, importPath);
        }

        // Check extensions .tsx, .ts, .jsx, .js, or directory index
        const extensions = ['.tsx', '.ts', '.jsx', '.js'];
        let exists = false;
        let foundPath = '';

        // Check exact file with extensions
        for (const ext of extensions) {
            if (fs.existsSync(resolvedPath + ext)) {
                exists = true;
                foundPath = resolvedPath + ext;
                break;
            }
        }

        // Check directory index
        if (!exists) {
            for (const ext of extensions) {
                if (fs.existsSync(path.join(resolvedPath, 'index' + ext))) {
                    exists = true;
                    foundPath = path.join(resolvedPath, 'index' + ext);
                    break;
                }
            }
        }

        if (!exists) {
            console.error(`[MISSING] ${importPath}`);
            missing++;
        } else {
            // console.log(`[OK] ${importPath}`);
        }
    }

    console.log(`\nChecked ${checked} routes.`);
    if (missing > 0) {
        console.error(`FAILED: Found ${missing} missing route files.`);
        process.exit(1);
    } else {
        console.log('SUCCESS: All routes resolve correctly.');
        process.exit(0);
    }
}

checkRoutes();
