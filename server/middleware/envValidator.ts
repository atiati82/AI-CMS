/**
 * Environment variable validation
 * Ensures all required environment variables are set before starting the server
 */

interface RequiredEnvVars {
    DATABASE_URL: string;
    SESSION_SECRET: string;
}

interface OptionalEnvVars {
    PORT?: string;
    GOOGLE_API_KEY?: string;
    OPENAI_API_KEY?: string;
    STRIPE_SECRET_KEY?: string;
    STRIPE_PUBLISHABLE_KEY?: string;
    STRIPE_WEBHOOK_SECRET?: string;
    GITHUB_CLIENT_ID?: string;
    GITHUB_CLIENT_SECRET?: string;
}

const INSECURE_DEFAULTS = [
    'your-secret-key-change-this',
    'andara-ionic-cms-secret-key-2024',
    'andara-ionic-jwt-secret-2024',
    'change-this',
    'secret',
];

export function validateEnvironment(): void {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required variables
    if (!process.env.DATABASE_URL) {
        errors.push('DATABASE_URL is required');
    }

    if (!process.env.SESSION_SECRET) {
        errors.push('SESSION_SECRET is required');
    } else if (INSECURE_DEFAULTS.includes(process.env.SESSION_SECRET)) {
        warnings.push(
            'SESSION_SECRET is using a default value. Please set a secure random string in production.'
        );
    }

    // Check for insecure JWT secret
    const jwtSecret = process.env.JWT_SECRET || 'andara-ionic-jwt-secret-2024';
    if (INSECURE_DEFAULTS.includes(jwtSecret)) {
        warnings.push(
            'JWT_SECRET is using a default value. Please set a secure random string in production.'
        );
    }

    // Warn about missing optional but recommended variables
    if (!process.env.GOOGLE_API_KEY && !process.env.OPENAI_API_KEY) {
        warnings.push(
            'No AI API keys configured (GOOGLE_API_KEY or OPENAI_API_KEY). AI features will be disabled.'
        );
    }

    // Log warnings
    if (warnings.length > 0) {
        console.warn('\n⚠️  Environment Warnings:');
        warnings.forEach((warning) => console.warn(`   - ${warning}`));
        console.warn('');
    }

    // Throw errors if any required variables are missing
    if (errors.length > 0) {
        console.error('\n❌ Environment Validation Failed:');
        errors.forEach((error) => console.error(`   - ${error}`));
        console.error('');
        throw new Error('Missing required environment variables');
    }

    // Success message
    if (errors.length === 0 && warnings.length === 0) {
        console.log('✅ Environment validation passed');
    }
}

/**
 * Generate a secure random secret for use in .env file
 * Usage: node -e "require('./server/middleware/envValidator.ts').generateSecret()"
 */
export function generateSecret(length: number = 64): string {
    const crypto = require('crypto');
    return crypto.randomBytes(length).toString('base64url');
}
