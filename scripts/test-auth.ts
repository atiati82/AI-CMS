import { GoogleAuth } from 'google-auth-library';
import 'dotenv/config';
import fs from 'fs';

async function testAuth() {
    console.log('--- Auth Test ---');
    const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    console.log('Path:', credsPath);

    if (!credsPath) {
        console.error('❌ GOOGLE_APPLICATION_CREDENTIALS not set in env.');
        return;
    }

    if (!fs.existsSync(credsPath)) {
        console.error('❌ Creds file does not exist at path.');
        return;
    }

    try {
        const auth = new GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        });
        const client = await auth.getClient();
        const token = await client.getAccessToken();
        console.log('✅ Auth successful. Token obtained.');
        console.log('Project:', await auth.getProjectId());
    } catch (e) {
        console.error('❌ Auth failed:', e);
    }
}

testAuth();
