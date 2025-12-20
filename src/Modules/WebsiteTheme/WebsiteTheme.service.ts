import { getDefaultTheme, getThemePresets } from "@/config/themePresets.config";
import { AppError } from "@/helper/errorHelper/appError";
import { validateWebsiteOwnership } from "../Website/Website.utils";
import { IThemePreset, IUpsertTheme } from "./WebsiteTheme.interface";
import { WebsiteTheme } from "./WebsiteTheme.model";

/**
 * WebsiteTheme Service
 * Business logic for WebsiteTheme operations
 */

/**
 * Create default theme for a website
 * Called automatically when a website is created
 * @param websiteId - Website ID
 * @returns Created theme
 */
const CreateDefaultTheme = async (websiteId: string) => {
  const defaultTheme = getDefaultTheme();

  const theme = await WebsiteTheme.create({
    websiteId,
    themeMode: defaultTheme.themeMode,
    colors: defaultTheme.colors,
    typography: defaultTheme.typography,
  });

  if (!theme) {
    throw new AppError("Failed to create default theme", 500);
  }

  return theme;
};

/**
 * Get or create theme for a website
 * @param websiteId - Website ID
 * @param userId - User ID
 * @returns Theme
 */
const GetTheme = async (websiteId: string, userId: string) => {
  // Verify user owns the website
  await validateWebsiteOwnership(websiteId, userId);

  let theme = await WebsiteTheme.findOne({ websiteId });

  // If no theme exists, create default theme
  if (!theme) {
    theme = await CreateDefaultTheme(websiteId);
  }

  return theme;
};

/**
 * Create or update theme (upsert)
 * @param websiteId - Website ID
 * @param userId - User ID
 * @param payload - Theme data
 * @returns Created/updated theme
 */
const UpsertTheme = async (
  websiteId: string,
  userId: string,
  payload: IUpsertTheme,
) => {
  // Verify user owns the website
  await validateWebsiteOwnership(websiteId, userId);

  // Find existing theme
  let theme = await WebsiteTheme.findOne({ websiteId });

  if (theme) {
    // Update existing theme
    if (payload.themeMode) theme.themeMode = payload.themeMode;
    if (payload.colors) {
      theme.colors = {
        ...theme.colors,
        ...payload.colors,
      };
    }
    if (payload.typography) theme.typography = payload.typography;
    if (payload.customFont !== undefined) theme.customFont = payload.customFont;

    await theme.save();
  } else {
    // Create new theme
    const defaultTheme = getDefaultTheme();
    theme = await WebsiteTheme.create({
      websiteId,
      themeMode: payload.themeMode || defaultTheme.themeMode,
      colors: {
        primary: payload.colors?.primary || defaultTheme.colors.primary,
        secondary: payload.colors?.secondary || defaultTheme.colors.secondary,
        tertiary: payload.colors?.tertiary || defaultTheme.colors.tertiary,
      },
      typography: payload.typography || defaultTheme.typography,
      customFont: payload.customFont,
    });
  }

  if (!theme) {
    throw new AppError("Failed to save theme", 500);
  }

  return theme;
};

/**
 * Update theme by ID
 * @param themeId - Theme ID
 * @param userId - User ID
 * @param payload - Theme data
 * @returns Updated theme
 */
const UpdateTheme = async (
  themeId: string,
  userId: string,
  payload: IUpsertTheme,
) => {
  // Get theme and verify ownership through website
  const theme = await WebsiteTheme.findById(themeId).populate({
    path: "websiteId",
    match: { userId, isDeleted: false },
  });

  if (!theme || !theme.websiteId) {
    throw new AppError("Theme not found or you do not have permission", 404);
  }

  // Update theme
  if (payload.themeMode) theme.themeMode = payload.themeMode;
  if (payload.colors) {
    theme.colors = {
      ...theme.colors,
      ...payload.colors,
    };
  }
  if (payload.typography) theme.typography = payload.typography;
  if (payload.customFont !== undefined) theme.customFont = payload.customFont;

  await theme.save();

  return theme;
};

/**
 * Reset theme to default
 * @param websiteId - Website ID
 * @param userId - User ID
 * @returns Reset theme
 */
const ResetTheme = async (websiteId: string, userId: string) => {
  // Verify user owns the website
  await validateWebsiteOwnership(websiteId, userId);

  const defaultTheme = getDefaultTheme();

  // Find and update or create
  let theme = await WebsiteTheme.findOne({ websiteId });

  if (theme) {
    theme.themeMode = defaultTheme.themeMode;
    theme.colors = defaultTheme.colors;
    theme.typography = defaultTheme.typography;
    theme.customFont = undefined;
    await theme.save();
  } else {
    theme = await CreateDefaultTheme(websiteId);
  }

  return theme;
};

/**
 * Get all available theme presets
 * @returns Array of theme presets
 */
const GetThemePresets = (): IThemePreset[] => {
  return getThemePresets();
};

/**
 * Apply a theme preset
 * @param websiteId - Website ID
 * @param userId - User ID
 * @param presetName - Name of the preset to apply
 * @returns Updated theme
 */
const ApplyThemePreset = async (
  websiteId: string,
  userId: string,
  presetName: string,
) => {
  // Verify user owns the website
  await validateWebsiteOwnership(websiteId, userId);

  const presets = getThemePresets();
  const preset = presets.find((p) => p.name === presetName);

  if (!preset) {
    throw new AppError("Theme preset not found", 404);
  }

  // Apply preset
  let theme = await WebsiteTheme.findOne({ websiteId });

  if (theme) {
    theme.themeMode = preset.themeMode;
    theme.colors = preset.colors;
    theme.typography = preset.typography;
    await theme.save();
  } else {
    theme = await WebsiteTheme.create({
      websiteId,
      themeMode: preset.themeMode,
      colors: preset.colors,
      typography: preset.typography,
    });
  }

  return theme;
};

export const WebsiteThemeService = {
  CreateDefaultTheme,
  GetTheme,
  UpsertTheme,
  UpdateTheme,
  ResetTheme,
  GetThemePresets,
  ApplyThemePreset,
};
