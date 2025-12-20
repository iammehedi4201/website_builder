import { z } from "zod";
import { ThemeModeEnum, TypographyEnum } from "../Website/Website.constant";

/**
 * WebsiteTheme Validation Schemas using Zod
 */

// Color validation (HEX format)
const hexColorSchema = z
  .string()
  .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid HEX color format");

// Create/Update Theme Validation
export const upsertThemeSchema = z.object({
  body: z.object({
    themeMode: z.nativeEnum(ThemeModeEnum).optional(),
    colors: z
      .object({
        primary: hexColorSchema.optional(),
        secondary: hexColorSchema.optional(),
        tertiary: hexColorSchema.optional(),
      })
      .optional(),
    typography: z.nativeEnum(TypographyEnum).optional(),
    customFont: z.string().trim().optional(),
  }),
  params: z.object({
    websiteId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid website ID"),
  }),
});

// Get Theme Validation
export const getThemeSchema = z.object({
  params: z.object({
    websiteId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid website ID"),
  }),
});

// MongoDB ObjectId Validation
export const mongoIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
  }),
});

export type UpsertThemeInput = z.infer<typeof upsertThemeSchema>;
export type GetThemeInput = z.infer<typeof getThemeSchema>;
