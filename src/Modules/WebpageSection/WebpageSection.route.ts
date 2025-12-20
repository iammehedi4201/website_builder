import { authorize } from "@/helper/errorHelper/authorize";
import ValidateRequest from "@/middlewares/common/ValidationRequest";
import { Router } from "express";
import { WebpageSectionController } from "./WebpageSection.controller";
import {
  createSectionSchema,
  mongoIdSchema,
  pageIdSchema,
  reorderSectionSchema,
  updateSectionSchema,
} from "./WebpageSection.validation";

const router = Router();

/**
 * WebpageSection Routes
 * All routes require authentication
 */

// Create section for a page
router.post(
  "/pages/:pageId/sections",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(createSectionSchema),
  WebpageSectionController.createSection,
);

// Get all sections for a page
router.get(
  "/pages/:pageId/sections",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(pageIdSchema),
  WebpageSectionController.getSections,
);

// Get section by ID
router.get(
  "/sections/:id",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  WebpageSectionController.getSectionById,
);

// Update section
router.put(
  "/sections/:id",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  ValidateRequest(updateSectionSchema),
  WebpageSectionController.updateSection,
);

// Reorder section
router.patch(
  "/sections/:id/reorder",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  ValidateRequest(reorderSectionSchema),
  WebpageSectionController.reorderSection,
);

// Duplicate section
router.post(
  "/sections/:id/duplicate",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  WebpageSectionController.duplicateSection,
);

// Delete section
router.delete(
  "/sections/:id",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  WebpageSectionController.deleteSection,
);

export const WebpageSectionRoutes = router;
