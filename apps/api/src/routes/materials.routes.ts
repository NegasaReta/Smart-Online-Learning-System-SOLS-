import { Router } from "express";
import {
  addVideoController,
  addPdfController,
  getMaterialsController,
  deleteVideoController,
  deletePdfController,
} from "../modules/materials/materials.controller";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const router = Router();

// POST /api/lessons/:id/videos — teacher adds video
router.post(
  "/lessons/:id/videos",
  authenticateJWT,
  authorizeRoles("teacher", "admin"),
  addVideoController
);

// POST /api/lessons/:id/pdfs — teacher adds PDF
router.post(
  "/lessons/:id/pdfs",
  authenticateJWT,
  authorizeRoles("teacher", "admin"),
  addPdfController
);

// GET /api/lessons/:id/materials — all roles view materials
router.get(
  "/lessons/:id/materials",
  authenticateJWT,
  authorizeRoles("student", "teacher", "parent", "admin"),
  getMaterialsController
);

// DELETE /api/lessons/videos/:id — teacher/admin deletes video
router.delete(
  "/lessons/videos/:id",
  authenticateJWT,
  authorizeRoles("teacher", "admin"),
  deleteVideoController
);

// DELETE /api/lessons/pdfs/:id — teacher/admin deletes PDF
router.delete(
  "/lessons/pdfs/:id",
  authenticateJWT,
  authorizeRoles("teacher", "admin"),
  deletePdfController
);

export default router;