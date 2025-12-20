import CatchAsync from "@/Utils/CatchAsync";
import sendResponse from "@/Utils/SendResponse";
import { Request, Response } from "express";
import { WebpageService } from "./Webpage.service";

/**
 * Webpage Controller
 * HTTP request handlers for Webpage endpoints
 */

/**
 * Create a new page
 * POST /api/websites/:websiteId/pages
 */
const createPage = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { websiteId } = req.params;

  const result = await WebpageService.CreatePage(websiteId, userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    data: result,
    message: "Page created successfully",
  });
});

/**
 * Get all pages for a website
 * GET /api/websites/:websiteId/pages
 */
const getPages = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { websiteId } = req.params;

  const result = await WebpageService.GetPages(websiteId, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Pages fetched successfully",
  });
});

/**
 * Get a single page by ID
 * GET /api/pages/:id
 */
const getPageById = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await WebpageService.GetPageById(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Page fetched successfully",
  });
});

/**
 * Update a page
 * PUT /api/pages/:id
 */
const updatePage = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await WebpageService.UpdatePage(id, userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Page updated successfully",
  });
});

/**
 * Delete a page
 * DELETE /api/pages/:id
 */
const deletePage = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await WebpageService.DeletePage(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Page deleted successfully",
  });
});

/**
 * Reorder a page
 * PATCH /api/pages/:id/reorder
 */
const reorderPage = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;
  const { newOrder } = req.body;

  const result = await WebpageService.ReorderPage(id, userId, newOrder);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Page reordered successfully",
  });
});

/**
 * Bulk reorder pages
 * PATCH /api/pages/bulk-reorder
 */
const bulkReorderPages = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const result = await WebpageService.BulkReorderPages(userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Pages reordered successfully",
  });
});

export const WebpageController = {
  createPage,
  getPages,
  getPageById,
  updatePage,
  deletePage,
  reorderPage,
  bulkReorderPages,
};
