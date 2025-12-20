import { authorize } from "@/helper/errorHelper/authorize";
import ValidateRequest from "@/middlewares/common/ValidationRequest";
import { Router } from "express";
import { WebsiteController } from "./Website.controller";
import {
  createWebsiteSchema,
  getWebsitesQuerySchema,
  mongoIdSchema,
  slugSchema,
  updateWebsiteSchema,
  updateWebsiteStatusSchema,
} from "./Website.validation";

const router = Router();

/**
 * Website Routes
 * All routes require authentication
 */

// Create website
router.post(
  "/",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(createWebsiteSchema),
  WebsiteController.createWebsite,
);

// Get all websites for user (with filtering and pagination)
router.get(
  "/",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(getWebsitesQuerySchema),
  WebsiteController.getWebsites,
);

// Get website by slug
router.get(
  "/slug/:slug",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(slugSchema),
  WebsiteController.getWebsiteBySlug,
);

// Get website by ID
router.get(
  "/:id",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  WebsiteController.getWebsiteById,
);

// Update website
router.put(
  "/:id",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  ValidateRequest(updateWebsiteSchema),
  WebsiteController.updateWebsite,
);

// Update website status
router.patch(
  "/:id/status",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  ValidateRequest(updateWebsiteStatusSchema),
  WebsiteController.updateWebsiteStatus,
);

// Clone website
router.post(
  "/:id/clone",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  WebsiteController.cloneWebsite,
);

// Delete website
router.delete(
  "/:id",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  WebsiteController.deleteWebsite,
);

export const WebsiteRoutes = router;
