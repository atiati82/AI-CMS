
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

async function debug() {
    try {
        const dynamicImport = await import('pdf-parse');
        console.log('Dynamic Import:', dynamicImport);
        console.log('Dynamic Import Default:', dynamicImport.default);

        try {
            const reqImport = require('pdf-parse');
            console.log('Require:', reqImport);
        } catch (e) { console.log('Require failed', e.message) }

    } catch (e) {
        console.log('Error', e);
    }
}
debug();
