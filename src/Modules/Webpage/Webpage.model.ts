import { model, Query, Schema } from "mongoose";
import { StatusEnum } from "../Website/Website.constant";
import { IWebpage } from "./Webpage.interface";

/**
 * Webpage Schema
 * MongoDB schema definition for Webpage entity
 */
const webpageSchema = new Schema<IWebpage>(
  {
    websiteId: {
      type: Schema.Types.ObjectId,
      ref: "Website",
      required: [true, "Website ID is required"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Page name is required"],
      trim: true,
      maxlength: [100, "Page name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.ACTIVE,
    },
    order: {
      type: Number,
      required: [true, "Order is required"],
      default: 0,
    },
    isDefault: {
      type: Boolean,
      default: false,
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
        delete (ret as any).__v;
        return ret;
      },
    },
  },
);

// Compound unique index: websiteId + slug (slug must be unique within website)
webpageSchema.index({ websiteId: 1, slug: 1 }, { unique: true });

// Index for ordering within a website
webpageSchema.index({ websiteId: 1, order: 1 });

// Index for filtering
webpageSchema.index({ status: 1, isDeleted: 1 });

// Virtual populate for sections
webpageSchema.virtual("sections", {
  ref: "WebpageSection",
  localField: "_id",
  foreignField: "webpageId",
});

// Query middleware to exclude soft-deleted documents by default
webpageSchema.pre(/^find/, function (this: Query<IWebpage[], IWebpage>, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Pre-delete middleware to prevent deletion of default pages
webpageSchema.pre("save", function (next) {
  if (this.isModified("isDeleted") && this.isDeleted && this.isDefault) {
    return next(new Error("Cannot delete default pages"));
  }
  next();
});

export const Webpage = model<IWebpage>("Webpage", webpageSchema);
