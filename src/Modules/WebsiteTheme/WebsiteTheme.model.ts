import { model, Schema } from "mongoose";
import { ThemeModeEnum, TypographyEnum } from "../Website/Website.constant";
import { IWebsiteTheme } from "./WebsiteTheme.interface";

const websiteThemeSchema = new Schema<IWebsiteTheme>(
  {
    websiteId: {
      type: Schema.Types.ObjectId,
      ref: "Website",
      required: [true, "Website ID is required"],
      unique: true, // One-to-one relationship
      index: true,
    },
    themeMode: {
      type: String,
      enum: Object.values(ThemeModeEnum),
      default: ThemeModeEnum.LIGHT,
    },
    colors: {
      primary: {
        type: String,
        required: [true, "Primary color is required"],
        default: "#3B82F6", // Blue
      },
      secondary: {
        type: String,
        required: [true, "Secondary color is required"],
        default: "#8B5CF6", // Purple
      },
      tertiary: {
        type: String,
        required: [true, "Tertiary color is required"],
        default: "#10B981", // Green
      },
    },
    typography: {
      type: String,
      enum: Object.values(TypographyEnum),
      default: TypographyEnum.SANS_SERIF,
    },
    customFont: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete (ret as any).__v;
        return ret;
      },
    },
  },
);

// Index for quick lookup
websiteThemeSchema.index({ websiteId: 1 });

export const WebsiteTheme = model<IWebsiteTheme>(
  "WebsiteTheme",
  websiteThemeSchema,
);
