import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { signup, login } from "../controllers/authController";

const router = Router();

router.post("/signup", verifyToken, signup);
router.post("/login", verifyToken, login);

export default router;
