import CatchAsync from "@/Utils/CatchAsync";
import sendResponse from "@/Utils/SendResponse";
import { Request, Response } from "express";
import { WebsiteThemeService } from "./WebsiteTheme.service";

/**
 * WebsiteTheme Controller
 * HTTP request handlers for WebsiteTheme endpoints
 */

/**
 * Get theme for a website
 * GET /api/websites/:websiteId/theme
 */
const getTheme = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { websiteId } = req.params;

  const result = await WebsiteThemeService.GetTheme(websiteId, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Theme fetched successfully",
  });
});

/**
 * Create or update theme
 * POST /api/websites/:websiteId/theme
 */
const upsertTheme = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { websiteId } = req.params;

  const result = await WebsiteThemeService.UpsertTheme(
    websiteId,
    userId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Theme saved successfully",
  });
});

/**
 * Update theme by ID
 * PUT /api/themes/:id
 */
const updateTheme = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await WebsiteThemeService.UpdateTheme(id, userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Theme updated successfully",
  });
});

/**
 * Reset theme to default
 * POST /api/websites/:websiteId/theme/reset
 */
const resetTheme = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { websiteId } = req.params;

  const result = await WebsiteThemeService.ResetTheme(websiteId, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Theme reset to default successfully",
  });
});

/**
 * Get theme presets
 * GET /api/themes/presets
 */
const getThemePresets = CatchAsync(async (req: Request, res: Response) => {
  const result = WebsiteThemeService.GetThemePresets();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Theme presets fetched successfully",
  });
});

/**
 * Apply theme preset
 * POST /api/websites/:websiteId/theme/preset
 */
const applyThemePreset = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { websiteId } = req.params;
  const { presetName } = req.body;

  const result = await WebsiteThemeService.ApplyThemePreset(
    websiteId,
    userId,
    presetName,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Theme preset applied successfully",
  });
});

export const WebsiteThemeController = {
  getTheme,
  upsertTheme,
  updateTheme,
  resetTheme,
  getThemePresets,
  applyThemePreset,
};
