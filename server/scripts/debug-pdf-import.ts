
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

async function debug() {
    console.log('--- Starting PDF Parse Debug ---');
    try {
        const pdfModule = await import('pdf-parse');
        // Handle the way pdf-parse is exported in different environments
        const pdfParser = (pdfModule as any).default || pdfModule;
        console.log('Resolved Parser Type:', typeof pdfParser);

        if (typeof pdfParser !== 'function') {
            console.warn('Warning: pdfParser is not a function. Check exports.');
        }

        try {
            const reqImport = require('pdf-parse');
            console.log('Require succeeded. Type:', typeof reqImport);
        } catch (e: any) {
            console.log('Require failed (as expected in pure ESM):', e.message);
        }

    } catch (e: any) {
        console.error('Fatal Error during import:', e);
    }
}
debug().then(() => console.log('--- Debug Complete ---'));
