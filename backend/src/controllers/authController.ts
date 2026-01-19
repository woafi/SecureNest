import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

/**
 * Create user after Firebase signup
 */
export const signup = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, name } = req.body;
    const firebaseUid = req.user!.uid;

    const user = await prisma.user.create({
      data: {
        firebaseUid,
        email,
        name: name || null,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

/**
 * Login user by Firebase token
 */
export const login = async (req: AuthRequest, res: Response): Promise<void> => {
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
      res.status(404).json({ error: "User not found. Please sign up first." });
      return;
    }

    res.json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};
