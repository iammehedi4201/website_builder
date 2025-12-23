import { z } from "zod";
import { StatusEnum } from "../Website/Website.constant";

/**
 * Webpage Validation Schemas using Zod
 */

// Create Webpage Validation
export const createWebpageSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Page name cannot be empty")
      .max(100, "Page name cannot exceed 100 characters")
      .trim(),
  }),
  params: z.object({
    websiteId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid website ID"),
  }),
});

// Update Webpage Validation
export const updateWebpageSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Page name cannot be empty")
      .max(100, "Page name cannot exceed 100 characters")
      .trim()
      .optional(),
    status: z.nativeEnum(StatusEnum).optional(),
    order: z.number().int().min(0).optional(),
  }),
});

// Reorder Page Validation
export const reorderPageSchema = z.object({
  body: z.object({
    newOrder: z.number().int().min(0, "Order must be a positive number"),
  }),
});

// Bulk Reorder Pages Validation
export const bulkReorderPagesSchema = z.object({
  body: z.object({
    pages: z
      .array(
        z.object({
          pageId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid page ID"),
          newOrder: z.number().int().min(0),
        }),
      )
      .min(1, "At least one page must be provided"),
  }),
});

// MongoDB ObjectId Validation
export const mongoIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
  }),
});

// Website ID Validation
export const websiteIdSchema = z.object({
  params: z.object({
    websiteId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid website ID"),
  }),
});

export type CreateWebpageInput = z.infer<typeof createWebpageSchema>;
export type UpdateWebpageInput = z.infer<typeof updateWebpageSchema>;
export type ReorderPageInput = z.infer<typeof reorderPageSchema>;
export type BulkReorderPagesInput = z.infer<typeof bulkReorderPagesSchema>;
