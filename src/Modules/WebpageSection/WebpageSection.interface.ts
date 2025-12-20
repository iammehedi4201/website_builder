import { Document, Types } from "mongoose";
import { StatusEnum } from "../Website/Website.constant";

/**
 * Webpage Section Interface
 * Defines the structure of a WebpageSection document
 */
export interface IWebpageSection extends Document {
  webpageId: Types.ObjectId;
  name: string;
  sectionType: string;
  order: number;
  status: StatusEnum;
  settings?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  isDefault: boolean;
  isDeleted: boolean;
}

/**
 * Create Section DTO
 */
export interface ICreateSection {
  webpageId: string;
  name: string;
  sectionType: string;
  settings?: Record<string, any>;
}

/**
 * Update Section DTO
 */
export interface IUpdateSection {
  name?: string;
  sectionType?: string;
  status?: StatusEnum;
  order?: number;
  settings?: Record<string, any>;
}

/**
 * Reorder Section Payload
 */
export interface IReorderSection {
  newOrder: number;
}
