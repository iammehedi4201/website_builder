import { z } from "zod";
import { BrandEnum, StatusEnum, WebsiteTypeEnum } from "./Website.constant";

/**
 * Website Validation Schemas using Zod
 */

// Create Website Validation
export const createWebsiteSchema = z.object({
  body: z.object({
    brand: z.nativeEnum(BrandEnum, {
      message: "Invalid brand type",
    }),
    websiteName: z
      .string()
      .min(1, "Website name cannot be empty")
      .max(100, "Website name cannot exceed 100 characters")
      .trim(),
    websiteType: z.nativeEnum(WebsiteTypeEnum, {
      message: "Invalid website type",
    }),
    description: z
      .string()
      .min(1, "Description cannot be empty")
      .max(500, "Description cannot exceed 500 characters")
      .trim(),
  }),
});

// Update Website Validation
export const updateWebsiteSchema = z.object({
  body: z.object({
    brand: z.nativeEnum(BrandEnum).optional(),
    websiteName: z
      .string()
      .min(1, "Website name cannot be empty")
      .max(100, "Website name cannot exceed 100 characters")
      .trim()
      .optional(),
    websiteType: z.nativeEnum(WebsiteTypeEnum).optional(),
    description: z
      .string()
      .min(1, "Description cannot be empty")
      .max(500, "Description cannot exceed 500 characters")
      .trim()
      .optional(),
  }),
});

// Update Website Status Validation
export const updateWebsiteStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(StatusEnum, {
      message: "Invalid status. Must be active or inactive",
    }),
  }),
});

// Get Websites Query Validation
export const getWebsitesQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10)),
    sortBy: z.string().optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
    searchTerm: z.string().optional(),
    status: z.nativeEnum(StatusEnum).optional(),
    websiteType: z.nativeEnum(WebsiteTypeEnum).optional(),
    brand: z.nativeEnum(BrandEnum).optional(),
  }),
});

// MongoDB ObjectId Validation
export const mongoIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
  }),
});

// Slug Validation
export const slugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, "Slug is required"),
  }),
});

export type CreateWebsiteInput = z.infer<typeof createWebsiteSchema>;
export type UpdateWebsiteInput = z.infer<typeof updateWebsiteSchema>;
export type UpdateWebsiteStatusInput = z.infer<
  typeof updateWebsiteStatusSchema
>;
export type GetWebsitesQueryInput = z.infer<typeof getWebsitesQuerySchema>;
