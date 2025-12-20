/**
 * Website Module Constants
 * Contains all enums and constant values for Website entity
 */

// Website Brand Types
export enum BrandEnum {
  FASHION = "Fashion",
  TECH = "Tech",
  FOOD = "Food",
  HEALTH = "Health",
  EDUCATION = "Education",
  FINANCE = "Finance",
  ENTERTAINMENT = "Entertainment",
  TRAVEL = "Travel",
  REAL_ESTATE = "Real Estate",
  AUTOMOTIVE = "Automotive",
  SPORTS = "Sports",
  BEAUTY = "Beauty",
  HOME_GARDEN = "Home & Garden",
  PETS = "Pets",
  PORTFOLIO = "Portfolio",
  OTHERS = "Others",
}

// Website Type Enum
export enum WebsiteTypeEnum {
  E_COMMERCE = "E-Commerce",
  BUSINESS_PORTFOLIO = "Business Portfolio",
  PERSONAL_PORTFOLIO = "Personal Portfolio",
  EDUCATIONAL = "Educational",
  HEALTHCARE = "Healthcare",
  REAL_ESTATE = "Real Estate",
  TRAVEL_TOURISM = "Travel / Tourism",
  OTHERS = "Others",
}

// Status Enum (used across all models)
export enum StatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

// Media Type Enum
export enum MediaTypeEnum {
  IMAGE = "image",
  VIDEO = "video",
}

// Button Style Enum
export enum ButtonStyleEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  OUTLINE = "outline",
}

// Theme Mode Enum
export enum ThemeModeEnum {
  LIGHT = "light",
  DARK = "dark",
}

// Typography Enum
export enum TypographyEnum {
  SERIF = "Serif",
  SANS_SERIF = "Sans-Serif",
  SCRIPT = "Script",
  OTHERS = "Others",
}

// Website searchable fields
export const WEBSITE_SEARCHABLE_FIELDS = [
  "websiteName",
  "description",
  "brand",
];

// Website filterable fields
export const WEBSITE_FILTERABLE_FIELDS = ["websiteType", "status", "brand"];
