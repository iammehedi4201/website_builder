import { z } from "zod";
import {
  ButtonStyleEnum,
  MediaTypeEnum,
  StatusEnum,
} from "../Website/Website.constant";

/**
 * SectionContent Validation Schemas using Zod
 */

// Media item validation
const mediaSchema = z.object({
  type: z.nativeEnum(MediaTypeEnum),
  url: z.string().url("Invalid media URL"),
  alt: z.string().optional(),
  caption: z.string().optional(),
});

// Button validation
const buttonSchema = z.object({
  text: z.string().min(1, "Button text is required"),
  url: z.string().min(1, "Button URL is required"),
  style: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val),
    z.nativeEnum(ButtonStyleEnum).default(ButtonStyleEnum.PRIMARY),
  ),
});

// Create/Update Section Content Validation (Upsert)
export const upsertContentSchema = z.object({
  body: z.object({
    title: z
      .string()
      .max(200, "Title cannot exceed 200 characters")
      .trim()
      .optional(),
    subtitle: z
      .string()
      .max(200, "Subtitle cannot exceed 200 characters")
      .trim()
      .optional(),
    description: z.string().trim().optional(),
    media: z.string().trim().optional(),
    buttons: z.array(buttonSchema).optional(),
    listItems: z.array(z.string()).optional(),
    customData: z.record(z.string(), z.any()).optional(),
    status: z.nativeEnum(StatusEnum).optional(),
  }),
  params: z.object({
    sectionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid section ID"),
  }),
});

// Get Content Validation
export const getContentSchema = z.object({
  params: z.object({
    sectionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid section ID"),
  }),
});

// Update Content by ID Validation
export const updateContentByIdSchema = z.object({
  body: z.object({
    title: z.string().max(200).trim().optional(),
    subtitle: z.string().max(200).trim().optional(),
    description: z.string().trim().optional(),
    media: z.array(mediaSchema).optional(),
    buttons: z.array(buttonSchema).optional(),
    listItems: z.array(z.string()).optional(),
    customData: z.record(z.string(), z.any()).optional(),
    status: z.nativeEnum(StatusEnum).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid content ID"),
  }),
});

// Upload Media Validation
export const uploadMediaSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid content ID"),
  }),
});

// Delete Media Validation
export const deleteMediaSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid content ID"),
    mediaId: z.string().min(1, "Media ID is required"),
  }),
});

export type UpsertContentInput = z.infer<typeof upsertContentSchema>;
export type GetContentInput = z.infer<typeof getContentSchema>;
export type UpdateContentByIdInput = z.infer<typeof updateContentByIdSchema>;
