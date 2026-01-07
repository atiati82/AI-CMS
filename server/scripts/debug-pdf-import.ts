
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

async function debug() {
    try {
        const dynamicImport = await import('pdf-parse');
        console.log('Dynamic Import:', dynamicImport);
        const pdfParser = dynamicImport.default || (typeof dynamicImport === 'function' ? dynamicImport : null);
        console.log('Detected Parser:', pdfParser);

        try {
            const reqImport = require('pdf-parse');
            console.log('Require:', reqImport);
        } catch (e) { console.log('Require failed', e.message) }

    } catch (e) {
        console.log('Error', e);
    }
}
debug();
