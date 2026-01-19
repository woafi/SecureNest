import { Router } from "express";
import { body, param } from "express-validator";
import { verifyToken } from "../middleware/auth";
import {
    getAllPasswords,
    createPassword,
    getPasswordById,
    updatePassword,
    deletePassword,
} from "../controllers/passwordController";

const router = Router();

// Protected routes
router.use(verifyToken);

// GET /api/passwords
router.get("/", getAllPasswords);

// POST /api/passwords
router.post(
    "/",
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("password").notEmpty().withMessage("Password is required"),
        body("username").optional().isString(),
        body("url").optional({ checkFalsy: true }).isURL().withMessage("Must be a valid URL"),
        body("notes").optional({ checkFalsy: true }).isString(),
    ],
    createPassword
);

// GET /api/passwords/:id
router.get(
    "/:id",
    param("id").isUUID().withMessage("Invalid password ID"),
    getPasswordById
);

// PUT /api/passwords/:id
router.put(
    "/:id",
    [
        param("id").isUUID().withMessage("Invalid password ID"),
        body("title").optional().notEmpty().withMessage("Title cannot be empty"),
        body("password").optional().notEmpty().withMessage("Password cannot be empty"),
        body("username").optional().isString(),
        body("url").optional({ checkFalsy: true }).isURL().withMessage("Must be a valid URL"),
        body("notes").optional({ checkFalsy: true }).isString(),
    ],
    updatePassword
);

// DELETE /api/passwords/:id
router.delete(
    "/:id",
    param("id").isUUID().withMessage("Invalid password ID"),
    deletePassword
);

export default router;
