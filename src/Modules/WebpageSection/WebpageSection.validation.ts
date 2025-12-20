import { z } from "zod";
import { StatusEnum } from "../Website/Website.constant";

/**
 * WebpageSection Validation Schemas using Zod
 */

// Create Section Validation
export const createSectionSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Section name is required" })
      .min(1, "Section name cannot be empty")
      .max(100, "Section name cannot exceed 100 characters")
      .trim(),
    sectionType: z
      .string({ message: "Section type is required" })
      .min(1, "Section type cannot be empty")
      .trim(),
    settings: z.record(z.any()).optional(),
  }),
  params: z.object({
    pageId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid page ID"),
  }),
});

// Update Section Validation
export const updateSectionSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Section name cannot be empty")
      .max(100, "Section name cannot exceed 100 characters")
      .trim()
      .optional(),
    sectionType: z.string().min(1).trim().optional(),
    status: z.nativeEnum(StatusEnum).optional(),
    order: z.number().int().min(0).optional(),
    settings: z.record(z.any()).optional(),
  }),
});

// Reorder Section Validation
export const reorderSectionSchema = z.object({
  body: z.object({
    newOrder: z
      .number({ message: "New order is required" })
      .int()
      .min(0, "Order must be a positive number"),
  }),
});

// MongoDB ObjectId Validation
export const mongoIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
  }),
});

// Page ID Validation
export const pageIdSchema = z.object({
  params: z.object({
    pageId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid page ID"),
  }),
});

export type CreateSectionInput = z.infer<typeof createSectionSchema>;
export type UpdateSectionInput = z.infer<typeof updateSectionSchema>;
export type ReorderSectionInput = z.infer<typeof reorderSectionSchema>;
