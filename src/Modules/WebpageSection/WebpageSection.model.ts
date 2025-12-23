import { model, Query, Schema } from "mongoose";
import { is } from "zod/v4/locales";
import { StatusEnum } from "../Website/Website.constant";
import { IWebpageSection } from "./WebpageSection.interface";

const webpageSectionSchema = new Schema<IWebpageSection>(
  {
    webpageId: {
      type: Schema.Types.ObjectId,
      ref: "Webpage",
      required: [true, "Webpage ID is required"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Section name is required"],
      trim: true,
      maxlength: [100, "Section name cannot exceed 100 characters"],
    },
    sectionType: {
      type: String,
      required: [true, "Section type is required"],
      trim: true,
    },
    order: {
      type: Number,
      required: [true, "Order is required"],
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.ACTIVE,
    },
    settings: {
      type: Schema.Types.Mixed,
      default: {},
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

// Index for ordering within a webpage
webpageSectionSchema.index({ webpageId: 1, order: 1 });

// Index for filtering
webpageSectionSchema.index({ status: 1, isDeleted: 1 });

// Virtual populate for content
webpageSectionSchema.virtual("content", {
  ref: "SectionContent",
  localField: "_id",
  foreignField: "sectionId",
  justOne: true, // One-to-one relationship
});

// Query middleware to exclude soft-deleted documents by default
webpageSectionSchema.pre(
  /^find/,
  function (this: Query<IWebpageSection[], IWebpageSection>, next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  },
);

export const WebpageSection = model<IWebpageSection>(
  "WebpageSection",
  webpageSectionSchema,
);
