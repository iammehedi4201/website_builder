import { Document, Types } from "mongoose";
import { BrandEnum, StatusEnum, WebsiteTypeEnum } from "./Website.constant";

/**
 * Website Interface
 * Defines the structure of a Website document
 */
export interface IWebsite extends Document {
  userId: Types.ObjectId;
  brand: BrandEnum;
  websiteName: string;
  websiteType: WebsiteTypeEnum;
  description: string;
  status: StatusEnum;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

/**
 * Create Website DTO
 */
export interface ICreateWebsite {
  userId: string;
  brand: BrandEnum;
  websiteName: string;
  websiteType: WebsiteTypeEnum;
  description: string;
}

/**
 * Update Website DTO
 */
export interface IUpdateWebsite {
  brand?: BrandEnum;
  websiteName?: string;
  websiteType?: WebsiteTypeEnum;
  description?: string;
}

/**
 * Website Query Params
 */
export interface IWebsiteQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  status?: StatusEnum;
  websiteType?: WebsiteTypeEnum;
  brand?: BrandEnum;
}

/**
 * Website with Pages (populated response)
 */
export interface IWebsiteWithPages extends IWebsite {
  pages: any[]; // Will be typed when Webpage interface is created
}
