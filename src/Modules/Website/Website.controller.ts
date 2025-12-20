import CatchAsync from "@/Utils/CatchAsync";
import sendResponse from "@/Utils/SendResponse";
import { Request, Response } from "express";
import { WebsiteService } from "./Website.service";

/**
 * Website Controller
 * HTTP request handlers for Website endpoints
 */

/**
 * Create a new website
 * POST /api/websites
 */
const createWebsite = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const result = await WebsiteService.CreateWebsite(req.body, userId);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    data: result,
    message: "Website created successfully",
  });
});

/**
 * Get all websites for authenticated user
 * GET /api/websites
 */
const getWebsites = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const result = await WebsiteService.GetWebsites(userId, req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result.data,
    meta: result.meta,
    message: "Websites fetched successfully",
  });
});

/**
 * Get a single website by ID
 * GET /api/websites/:id
 */
const getWebsiteById = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await WebsiteService.GetWebsiteById(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Website fetched successfully",
  });
});

/**
 * Get a website by slug
 * GET /api/websites/slug/:slug
 */
const getWebsiteBySlug = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { slug } = req.params;

  const result = await WebsiteService.GetWebsiteBySlug(slug, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Website fetched successfully",
  });
});

/**
 * Update a website
 * PUT /api/websites/:id
 */
const updateWebsite = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await WebsiteService.UpdateWebsite(id, userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Website updated successfully",
  });
});

/**
 * Update website status
 * PATCH /api/websites/:id/status
 */
const updateWebsiteStatus = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;
  const { status } = req.body;

  const result = await WebsiteService.UpdateWebsiteStatus(id, userId, status);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Website status updated successfully",
  });
});

/**
 * Delete a website
 * DELETE /api/websites/:id
 */
const deleteWebsite = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await WebsiteService.DeleteWebsite(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Website deleted successfully",
  });
});

/**
 * Clone a website
 * POST /api/websites/:id/clone
 */
const cloneWebsite = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await WebsiteService.CloneWebsite(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    data: result,
    message: "Website cloned successfully",
  });
});

export const WebsiteController = {
  createWebsite,
  getWebsites,
  getWebsiteById,
  getWebsiteBySlug,
  updateWebsite,
  updateWebsiteStatus,
  deleteWebsite,
  cloneWebsite,
};
