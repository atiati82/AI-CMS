import { Router } from 'express';
import { storage } from '../../storage';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "andara-ionic-jwt-secret-2024";
const JWT_EXPIRES_IN = "24h";

// POST /api/admin/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        const user = await storage.getAdminUserByUsername(username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.json({ success: true, token, user: { id: user.id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// POST /api/admin/logout
router.post('/logout', (req, res) => {
    res.json({ success: true });
});

// GET /api/admin/me
router.get('/me', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
        const user = await storage.getAdminUser(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        res.json({ id: user.id, username: user.username });
    } catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
});

export default router;
