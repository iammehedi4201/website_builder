import {
  ThemeModeEnum,
  TypographyEnum,
} from "../Modules/Website/Website.constant";
import { IThemePreset } from "../Modules/WebsiteTheme/WebsiteTheme.interface";

/**
 * Theme Presets
 * Predefined theme configurations for quick setup
 */

export const THEME_PRESETS: IThemePreset[] = [
  {
    name: "Modern Blue",
    themeMode: ThemeModeEnum.LIGHT,
    colors: {
      primary: "#3B82F6",
      secondary: "#8B5CF6",
      tertiary: "#10B981",
    },
    typography: TypographyEnum.SANS_SERIF,
  },
  {
    name: "Classic Dark",
    themeMode: ThemeModeEnum.DARK,
    colors: {
      primary: "#60A5FA",
      secondary: "#A78BFA",
      tertiary: "#34D399",
    },
    typography: TypographyEnum.SERIF,
  },
  {
    name: "Bold Orange",
    themeMode: ThemeModeEnum.LIGHT,
    colors: {
      primary: "#F97316",
      secondary: "#EF4444",
      tertiary: "#F59E0B",
    },
    typography: TypographyEnum.SANS_SERIF,
  },
  {
    name: "Minimal",
    themeMode: ThemeModeEnum.LIGHT,
    colors: {
      primary: "#000000",
      secondary: "#4B5563",
      tertiary: "#9CA3AF",
    },
    typography: TypographyEnum.SANS_SERIF,
  },
  {
    name: "Elegant",
    themeMode: ThemeModeEnum.LIGHT,
    colors: {
      primary: "#7C3AED",
      secondary: "#EC4899",
      tertiary: "#F472B6",
    },
    typography: TypographyEnum.SCRIPT,
  },
];

/**
 * Get all theme presets
 */
export const getThemePresets = (): IThemePreset[] => {
  return THEME_PRESETS;
};

/**
 * Get default theme (Modern Blue)
 */
export const getDefaultTheme = (): IThemePreset => {
  return THEME_PRESETS[0];
};
