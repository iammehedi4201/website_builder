import { Document, Types } from "mongoose";
import {
  ButtonStyleEnum,
  MediaTypeEnum,
  StatusEnum,
} from "../Website/Website.constant";

/**
 * Section Content Interface
 * Defines the structure of a SectionContent document
 */

export interface IMedia {
  type: MediaTypeEnum;
  url: string;
  alt?: string;
  caption?: string;
}

export interface IButton {
  text: string;
  url: string;
  style: ButtonStyleEnum;
}

export interface ISectionContent extends Document {
  sectionId: Types.ObjectId;
  title?: string;
  subtitle?: string;
  description?: string;
  media?: IMedia[];
  buttons?: IButton[];
  listItems?: string[];
  customData?: Record<string, any>;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create/Update Section Content DTO
 */
export interface IUpsertSectionContent {
  title?: string;
  subtitle?: string;
  description?: string;
  media?: IMedia[];
  buttons?: IButton[];
  listItems?: string[];
  customData?: Record<string, any>;
  status?: StatusEnum;
}
