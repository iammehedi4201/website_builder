import { authorize } from "@/helper/errorHelper/authorize";
import ValidateRequest from "@/middlewares/common/ValidationRequest";
import { Router } from "express";
import { WebpageController } from "./Webpage.controller";
import {
  bulkReorderPagesSchema,
  createWebpageSchema,
  mongoIdSchema,
  reorderPageSchema,
  updateWebpageSchema,
  websiteIdSchema,
} from "./Webpage.validation";

const router = Router();

/**
 * Webpage Routes
 * All routes require authentication
 */

// Create page for a website
router.post(
  "/websites/:websiteId/pages",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(createWebpageSchema),
  WebpageController.createPage,
);

// Get all pages for a website
router.get(
  "/websites/:websiteId/pages",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(websiteIdSchema),
  WebpageController.getPages,
);

// Bulk reorder pages
router.patch(
  "/pages/bulk-reorder",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(bulkReorderPagesSchema),
  WebpageController.bulkReorderPages,
);

// Get page by ID
router.get(
  "/pages/:id",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  WebpageController.getPageById,
);

// Update page
router.put(
  "/pages/:id",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  ValidateRequest(updateWebpageSchema),
  WebpageController.updatePage,
);

// Reorder page
router.patch(
  "/pages/:id/reorder",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  ValidateRequest(reorderPageSchema),
  WebpageController.reorderPage,
);

// Delete page
router.delete(
  "/pages/:id",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  WebpageController.deletePage,
);

export const WebpageRoutes = router;
