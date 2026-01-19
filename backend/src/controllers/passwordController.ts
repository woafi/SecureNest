import { Response } from "express";
import { validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";
import { encryptPassword, decryptPassword } from "../utils/encryption";

const prisma = new PrismaClient();

export const getAllPasswords = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const firebaseUid = req.user!.uid;

        const user = await prisma.user.findUnique({
            where: { firebaseUid },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

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
            orderBy: { updatedAt: "desc" },
        });

        res.json({ passwords });
        return;
    } catch (error) {
        console.error("Get passwords error:", error);
        res.status(500).json({ error: "Failed to fetch passwords" });
        return;
    }
};

export const createPassword = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const firebaseUid = req.user!.uid;
        const { title, password, username, url, notes } = req.body;

        const user = await prisma.user.findUnique({
            where: { firebaseUid },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const encryptedPassword = encryptPassword(password);

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
            message: "Password created successfully",
            password: newPassword,
        });
        return;
    } catch (error) {
        console.error("Create password error:", error);
        res.status(500).json({ error: "Failed to create password" });
        return;
    }
};

export const getPasswordById = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const firebaseUid = req.user!.uid;
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { firebaseUid },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const passwordEntry = await prisma.password.findFirst({
            where: { id, userId: user.id },
        });

        if (!passwordEntry) {
            res.status(404).json({ error: "Password not found" });
            return;
        }

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
        return;
    } catch (error) {
        console.error("Get password error:", error);
        res.status(500).json({ error: "Failed to fetch password" });
        return;
    }
};

export const updatePassword = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const firebaseUid = req.user!.uid;
        const { id } = req.params;
        const { title, password, username, url, notes } = req.body;

        const user = await prisma.user.findUnique({
            where: { firebaseUid },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const existingPassword = await prisma.password.findFirst({
            where: { id, userId: user.id },
        });

        if (!existingPassword) {
            res.status(404).json({ error: "Password not found" });
            return;
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (username !== undefined) updateData.username = username;
        if (url !== undefined) updateData.url = url;
        if (notes !== undefined) updateData.notes = notes;
        if (password !== undefined) {
            updateData.encryptedPassword = encryptPassword(password);
        }

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
            message: "Password updated successfully",
            password: updatedPassword,
        });
        return;
    } catch (error) {
        console.error("Update password error:", error);
        res.status(500).json({ error: "Failed to update password" });
        return;
    }
};

export const deletePassword = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const firebaseUid = req.user!.uid;
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { firebaseUid },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const existingPassword = await prisma.password.findFirst({
            where: { id, userId: user.id },
        });

        if (!existingPassword) {
            res.status(404).json({ error: "Password not found" });
            return;
        }

        await prisma.password.delete({
            where: { id },
        });

        res.json({ message: "Password deleted successfully" });
        return;
    } catch (error) {
        console.error("Delete password error:", error);
        res.status(500).json({ error: "Failed to delete password" });
        return;
    }
};
