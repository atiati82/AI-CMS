import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter rate limiter for authentication endpoints
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: 'Too many login attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // Don't count successful requests
});

// Rate limiter for AI endpoints (generous for development and testing)
export const aiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 AI requests per minute (increased from 10 for better UX)
    message: 'Too many AI requests, please slow down.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter for file uploads
export const uploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Limit each IP to 20 uploads per hour
    message: 'Upload limit reached, please try again later.',
    legacyHeaders: false,
});

// Rate limiter for autonomous agent workflows (strict limit to prevent token runaway)
export const autonomousAgentLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 autonomous runs per hour
    message: 'Autonomous agent rate limit reached. Please wait before triggering more complex workflows.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter for efficient design generation (Magic Pages)
export const designGenLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // Limit each IP to 50 drafts per hour
    message: 'Design draft limit reached (50/hr). Please refine existing drafts or wait.',
    standardHeaders: true,
    legacyHeaders: false,
});

