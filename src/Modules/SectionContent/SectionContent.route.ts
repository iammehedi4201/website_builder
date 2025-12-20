import { authorize } from "@/helper/errorHelper/authorize";
import ValidateRequest from "@/middlewares/common/ValidationRequest";
import { Router } from "express";
import { SectionContentController } from "./SectionContent.controller";
import {
  deleteMediaSchema,
  getContentSchema,
  updateContentByIdSchema,
  uploadMediaSchema,
  upsertContentSchema,
} from "./SectionContent.validation";

const router = Router();

/**
 * SectionContent Routes
 * All routes require authentication
 */

// Get content for a section
router.get(
  "/sections/:sectionId/content",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(getContentSchema),
  SectionContentController.getContent,
);

// Create or update content (Upsert)
router.post(
  "/sections/:sectionId/content",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(upsertContentSchema),
  SectionContentController.upsertContent,
);

// Update content by ID
router.put(
  "/content/:id",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(updateContentByIdSchema),
  SectionContentController.updateContent,
);

// Upload media to content
router.post(
  "/content/:id/media",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(uploadMediaSchema),
  SectionContentController.uploadMedia,
);

// Remove media from content
router.delete(
  "/content/:id/media/:mediaId",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(deleteMediaSchema),
  SectionContentController.removeMedia,
);

export const SectionContentRoutes = router;
