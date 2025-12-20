import { Document, Types } from "mongoose";
import { StatusEnum } from "../Website/Website.constant";

/**
 * Webpage Interface
 * Defines the structure of a Webpage document
 */
export interface IWebpage extends Document {
  websiteId: Types.ObjectId;
  name: string;
  slug: string;
  status: StatusEnum;
  order: number;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

/**
 * Create Webpage DTO
 */
export interface ICreateWebpage {
  websiteId: string;
  name: string;
}

/**
 * Update Webpage DTO
 */
export interface IUpdateWebpage {
  name?: string;
  status?: StatusEnum;
  order?: number;
}

/**
 * Reorder Pages Payload
 */
export interface IReorderPages {
  pageId: string;
  newOrder: number;
}

/**
 * Bulk Reorder Pages
 */
export interface IBulkReorderPages {
  pages: IReorderPages[];
}
