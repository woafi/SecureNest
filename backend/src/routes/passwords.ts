import { Router, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, verifyToken } from '../middleware/auth';
import { encryptPassword, decryptPassword } from '../utils/encryption';

const router = Router();
const prisma = new PrismaClient();

// All routes are protected
router.use(verifyToken);

/**
 * GET /api/passwords
 * Get all passwords for authenticated user
 */
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const firebaseUid = req.user!.uid;

        // Find user
        const user = await prisma.user.findUnique({
            where: { firebaseUid },
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Get all passwords (without decrypting)
        const passwords = await prisma.password.findMany({
            where: { userId: user.id },
            select: {
                id: true,
                title: true,
                username: true,
                url: true,
                notes: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { updatedAt: 'desc' },
        });

        res.json({ passwords });
    } catch (error) {
        console.error('Get passwords error:', error);
        res.status(500).json({ error: 'Failed to fetch passwords' });
    }
});

/**
 * POST /api/passwords
 * Create a new password entry
 */
router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('password').notEmpty().withMessage('Password is required'),
        body('username').optional().isString(),
        body('url').optional().isURL().withMessage('Must be a valid URL'),
        body('notes').optional().isString(),
    ],
    async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const firebaseUid = req.user!.uid;
            const { title, password, username, url, notes } = req.body;

            // Find user
            const user = await prisma.user.findUnique({
                where: { firebaseUid },
            });

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            // Encrypt password
            const encryptedPassword = encryptPassword(password);

            // Create password entry
            const newPassword = await prisma.password.create({
                data: {
                    userId: user.id,
                    title,
                    username: username || null,
                    encryptedPassword,
                    url: url || null,
                    notes: notes || null,
                },
                select: {
                    id: true,
                    title: true,
                    username: true,
                    url: true,
                    notes: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            res.status(201).json({
                message: 'Password created successfully',
                password: newPassword,
            });
        } catch (error) {
            console.error('Create password error:', error);
            res.status(500).json({ error: 'Failed to create password' });
        }
    }
);

/**
 * GET /api/passwords/:id
 * Get a single password with decrypted password
 */
router.get(
    '/:id',
    param('id').isUUID().withMessage('Invalid password ID'),
    async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const firebaseUid = req.user!.uid;
            const { id } = req.params;

            // Find user
            const user = await prisma.user.findUnique({
                where: { firebaseUid },
            });

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            // Get password
            const passwordEntry = await prisma.password.findFirst({
                where: {
                    id,
                    userId: user.id,
                },
            });

            if (!passwordEntry) {
                res.status(404).json({ error: 'Password not found' });
                return;
            }

            // Decrypt password
            const decryptedPassword = decryptPassword(passwordEntry.encryptedPassword);

            res.json({
                password: {
                    id: passwordEntry.id,
                    title: passwordEntry.title,
                    username: passwordEntry.username,
                    password: decryptedPassword,
                    url: passwordEntry.url,
                    notes: passwordEntry.notes,
                    createdAt: passwordEntry.createdAt,
                    updatedAt: passwordEntry.updatedAt,
                },
            });
        } catch (error) {
            console.error('Get password error:', error);
            res.status(500).json({ error: 'Failed to fetch password' });
        }
    }
);

/**
 * PUT /api/passwords/:id
 * Update a password entry
 */
router.put(
    '/:id',
    [
        param('id').isUUID().withMessage('Invalid password ID'),
        body('title').optional().notEmpty().withMessage('Title cannot be empty'),
        body('password').optional().notEmpty().withMessage('Password cannot be empty'),
        body('username').optional().isString(),
        body('url').optional().isURL().withMessage('Must be a valid URL'),
        body('notes').optional().isString(),
    ],
    async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const firebaseUid = req.user!.uid;
            const { id } = req.params;
            const { title, password, username, url, notes } = req.body;

            // Find user
            const user = await prisma.user.findUnique({
                where: { firebaseUid },
            });

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            // Check if password exists and belongs to user
            const existingPassword = await prisma.password.findFirst({
                where: {
                    id,
                    userId: user.id,
                },
            });

            if (!existingPassword) {
                res.status(404).json({ error: 'Password not found' });
                return;
            }

            // Build update data
            const updateData: any = {};
            if (title !== undefined) updateData.title = title;
            if (username !== undefined) updateData.username = username;
            if (url !== undefined) updateData.url = url;
            if (notes !== undefined) updateData.notes = notes;
            if (password !== undefined) {
                updateData.encryptedPassword = encryptPassword(password);
            }

            // Update password
            const updatedPassword = await prisma.password.update({
                where: { id },
                data: updateData,
                select: {
                    id: true,
                    title: true,
                    username: true,
                    url: true,
                    notes: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            res.json({
                message: 'Password updated successfully',
                password: updatedPassword,
            });
        } catch (error) {
            console.error('Update password error:', error);
            res.status(500).json({ error: 'Failed to update password' });
        }
    }
);

/**
 * DELETE /api/passwords/:id
 * Delete a password entry
 */
router.delete(
    '/:id',
    param('id').isUUID().withMessage('Invalid password ID'),
    async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const firebaseUid = req.user!.uid;
            const { id } = req.params;

            // Find user
            const user = await prisma.user.findUnique({
                where: { firebaseUid },
            });

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            // Check if password exists and belongs to user
            const existingPassword = await prisma.password.findFirst({
                where: {
                    id,
                    userId: user.id,
                },
            });

            if (!existingPassword) {
                res.status(404).json({ error: 'Password not found' });
                return;
            }

            // Delete password
            await prisma.password.delete({
                where: { id },
            });

            res.json({ message: 'Password deleted successfully' });
        } catch (error) {
            console.error('Delete password error:', error);
            res.status(500).json({ error: 'Failed to delete password' });
        }
    }
);

export default router;
