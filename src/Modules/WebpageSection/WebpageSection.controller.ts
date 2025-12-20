import CatchAsync from "@/Utils/CatchAsync";
import sendResponse from "@/Utils/SendResponse";
import { Request, Response } from "express";
import { WebpageSectionService } from "./WebpageSection.service";

/**
 * WebpageSection Controller
 * HTTP request handlers for WebpageSection endpoints
 */

/**
 * Create a new section
 * POST /api/pages/:pageId/sections
 */
const createSection = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { pageId } = req.params;

  const result = await WebpageSectionService.CreateSection(
    pageId,
    userId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    data: result,
    message: "Section created successfully",
  });
});

/**
 * Get all sections for a page
 * GET /api/pages/:pageId/sections
 */
const getSections = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { pageId } = req.params;

  const result = await WebpageSectionService.GetSections(pageId, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Sections fetched successfully",
  });
});

/**
 * Get a single section by ID
 * GET /api/sections/:id
 */
const getSectionById = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await WebpageSectionService.GetSectionById(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Section fetched successfully",
  });
});

/**
 * Update a section
 * PUT /api/sections/:id
 */
const updateSection = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await WebpageSectionService.UpdateSection(
    id,
    userId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Section updated successfully",
  });
});

/**
 * Delete a section
 * DELETE /api/sections/:id
 */
const deleteSection = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await WebpageSectionService.DeleteSection(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Section deleted successfully",
  });
});

/**
 * Reorder a section
 * PATCH /api/sections/:id/reorder
 */
const reorderSection = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;
  const { newOrder } = req.body;

  const result = await WebpageSectionService.ReorderSection(
    id,
    userId,
    newOrder,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Section reordered successfully",
  });
});

/**
 * Duplicate a section
 * POST /api/sections/:id/duplicate
 */
const duplicateSection = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await WebpageSectionService.DuplicateSection(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    data: result,
    message: "Section duplicated successfully",
  });
});

export const WebpageSectionController = {
  createSection,
  getSections,
  getSectionById,
  updateSection,
  deleteSection,
  reorderSection,
  duplicateSection,
};
