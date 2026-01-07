import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
    // Server configuration
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',

    // Security
    jwtSecret: process.env.JWT_SECRET || "andara-ionic-jwt-secret-2024",
    jwtExpiresIn: "24h",

    // Database (if needed here later)
    // dbUrl: process.env.DATABASE_URL
};
