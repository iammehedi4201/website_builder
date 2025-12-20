import { Document, Types } from "mongoose";
import { ThemeModeEnum, TypographyEnum } from "../Website/Website.constant";

/**
 * Website Theme Interface
 * Defines the structure of a WebsiteTheme document
 */

export interface IThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface IWebsiteTheme extends Document {
  websiteId: Types.ObjectId;
  themeMode: ThemeModeEnum;
  colors: IThemeColors;
  typography: TypographyEnum;
  customFont?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create/Update Theme DTO
 */
export interface IUpsertTheme {
  themeMode?: ThemeModeEnum;
  colors?: Partial<IThemeColors>;
  typography?: TypographyEnum;
  customFont?: string;
}

/**
 * Theme Preset
 */
export interface IThemePreset {
  name: string;
  themeMode: ThemeModeEnum;
  colors: IThemeColors;
  typography: TypographyEnum;
}
