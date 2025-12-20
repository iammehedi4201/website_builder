import { model, Schema } from "mongoose";
import {
  ButtonStyleEnum,
  MediaTypeEnum,
  StatusEnum,
} from "../Website/Website.constant";
import { ISectionContent } from "./SectionContent.interface";

/**
 * Section Content Schema
 * MongoDB schema definition for SectionContent entity
 */
const sectionContentSchema = new Schema<ISectionContent>(
  {
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "WebpageSection",
      required: [true, "Section ID is required"],
      unique: true, // One-to-one relationship
      index: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [200, "Subtitle cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
    media: {
      type: String,
      trim: true,
    },
    buttons: [
      {
        text: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        style: {
          type: String,
          enum: Object.values(ButtonStyleEnum),
          default: ButtonStyleEnum.PRIMARY,
        },
      },
    ],
    listItems: [String],
    customData: {
      type: Schema.Types.Mixed,
      default: {},
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.ACTIVE,
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

// Index for filtering
sectionContentSchema.index({ status: 1 });

export const SectionContent = model<ISectionContent>(
  "SectionContent",
  sectionContentSchema,
);
