import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, verifyToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

/**
 * POST /api/auth/signup
 * Create a new user in the database after Firebase signup
 */
router.post(
    '/signup',
    verifyToken,
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('name').optional().isString().trim(),
    ],
    async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const { email, name } = req.body;
            const firebaseUid = req.user!.uid;

            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
                where: { firebaseUid },
            });

            if (existingUser) {
                res.status(409).json({ error: 'User already exists' });
                return;
            }

            // Create new user
            const user = await prisma.user.create({
                data: {
                    firebaseUid,
                    email,
                    name: name || null,
                },
            });

            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    createdAt: user.createdAt,
                },
            });
        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
);

/**
 * POST /api/auth/login
 * Verify Firebase token and return user from database
 */
router.post('/login', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const firebaseUid = req.user!.uid;

        const user = await prisma.user.findUnique({
            where: { firebaseUid },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        });

        if (!user) {
            res.status(404).json({ error: 'User not found. Please sign up first.' });
            return;
        }

        res.json({
            message: 'Login successful',
            user,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

export default router;
