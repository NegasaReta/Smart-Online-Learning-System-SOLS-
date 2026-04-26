import { Router } from "express";
import { getMeController } from "../modules/users/me.controller";
import { authenticateJWT } from "../middlewares/authenticateJWT";

const router = Router();

// GET /api/me - returns authenticated user's profile
router.get("/", authenticateJWT, getMeController);

export default router;