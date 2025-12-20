import CatchAsync from "@/Utils/CatchAsync";
import sendResponse from "@/Utils/SendResponse";
import { Request, Response } from "express";
import { SectionContentService } from "./SectionContent.service";

/**
 * SectionContent Controller
 * HTTP request handlers for SectionContent endpoints
 */

/**
 * Get content for a section
 * GET /api/sections/:sectionId/content
 */
const getContent = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { sectionId } = req.params;

  const result = await SectionContentService.GetContent(sectionId, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Content fetched successfully",
  });
});

/**
 * Create or update content for a section (Upsert)
 * POST /api/sections/:sectionId/content
 */
const upsertContent = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { sectionId } = req.params;

  const result = await SectionContentService.UpsertContent(
    sectionId,
    userId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Content saved successfully",
  });
});

/**
 * Update content by ID
 * PUT /api/content/:id
 */
const updateContent = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await SectionContentService.UpdateContent(
    id,
    userId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Content updated successfully",
  });
});

/**
 * Upload media to content
 * POST /api/content/:id/media
 */
const uploadMedia = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;
  const { url, type, alt, caption } = req.body;

  // TODO: Implement actual file upload logic here
  // For now, accepting URL from request body
  // In production, use multer or similar for file uploads

  const result = await SectionContentService.AddMedia(
    id,
    userId,
    url,
    type,
    alt,
    caption,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Media uploaded successfully",
  });
});

/**
 * Remove media from content
 * DELETE /api/content/:id/media/:mediaId
 */
const removeMedia = CatchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id, mediaId } = req.params;

  const result = await SectionContentService.RemoveMedia(id, userId, mediaId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Media removed successfully",
  });
});

export const SectionContentController = {
  getContent,
  upsertContent,
  updateContent,
  uploadMedia,
  removeMedia,
};
