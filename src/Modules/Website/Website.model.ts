import { model, Query, Schema } from "mongoose";
import { BrandEnum, StatusEnum, WebsiteTypeEnum } from "./Website.constant";
import { IWebsite } from "./Website.interface";

/**
 * Website Schema
 * MongoDB schema definition for Website entity
 */
const websiteSchema = new Schema<IWebsite>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    brand: {
      type: String,
      enum: Object.values(BrandEnum),
      required: [true, "Brand is required"],
    },
    websiteName: {
      type: String,
      required: [true, "Website name is required"],
      trim: true,
      maxlength: [100, "Website name cannot exceed 100 characters"],
    },
    websiteType: {
      type: String,
      enum: Object.values(WebsiteTypeEnum),
      required: [true, "Website type is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.ACTIVE,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete (ret as Record<string, any>).__v;
        return ret;
      },
    },
  },
);

// Compound unique index: userId + slug (slug must be unique per user)
websiteSchema.index({ userId: 1, slug: 1 }, { unique: true });

// Index for filtering
websiteSchema.index({ status: 1, isDeleted: 1 });

// Virtual populate for pages
websiteSchema.virtual("pages", {
  ref: "Webpage",
  localField: "_id",
  foreignField: "websiteId",
});

// Pre-save middleware to ensure slug is generated
websiteSchema.pre("save", function (next) {
  // Slug generation will be handled in service layer before save
  next();
});

// Query middleware to exclude soft-deleted documents by default
websiteSchema.pre(/^find/, function (next) {
  (this as Query<IWebsite[], IWebsite>).find({ isDeleted: { $ne: true } });
  next();
});

export const Website = model<IWebsite>("Website", websiteSchema);
