import { storage } from '../../storage';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "andara-ionic-jwt-secret-2024";

/**
 * Admin authentication middleware
 * Verifies JWT token and attaches admin user to request
 */
export const requireAdmin = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
        const user = await storage.getAdminUser(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.adminUser = user;
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
