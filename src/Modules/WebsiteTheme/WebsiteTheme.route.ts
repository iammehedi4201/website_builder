import { authorize } from "@/helper/errorHelper/authorize";
import ValidateRequest from "@/middlewares/common/ValidationRequest";
import { Router } from "express";
import { WebsiteThemeController } from "./WebsiteTheme.controller";
import {
  getThemeSchema,
  mongoIdSchema,
  upsertThemeSchema,
} from "./WebsiteTheme.validation";

const router = Router();

/**
 * WebsiteTheme Routes
 * All routes require authentication
 */

// Get theme presets (public to authenticated users)
router.get(
  "/themes/presets",
  authorize("User", "Admin", "Super_Admin"),
  WebsiteThemeController.getThemePresets,
);

// Get theme for a website
router.get(
  "/websites/:websiteId/theme",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(getThemeSchema),
  WebsiteThemeController.getTheme,
);

// Create/update theme
router.post(
  "/websites/:websiteId/theme",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(upsertThemeSchema),
  WebsiteThemeController.upsertTheme,
);

// Reset theme to default
router.post(
  "/websites/:websiteId/theme/reset",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(getThemeSchema),
  WebsiteThemeController.resetTheme,
);

// Apply theme preset
router.post(
  "/websites/:websiteId/theme/preset",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(getThemeSchema),
  WebsiteThemeController.applyThemePreset,
);

// Update theme by ID
router.put(
  "/themes/:id",
  authorize("User", "Admin", "Super_Admin"),
  ValidateRequest(mongoIdSchema),
  ValidateRequest(upsertThemeSchema),
  WebsiteThemeController.updateTheme,
);

export const WebsiteThemeRoutes = router;
