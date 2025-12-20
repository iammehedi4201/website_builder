import { AppError } from "@/helper/errorHelper/appError";
import type { Types } from "mongoose";
import { Webpage } from "../Webpage/Webpage.model";
import { WebpageService } from "../Webpage/Webpage.service";
import { WebpageSection } from "../WebpageSection/WebpageSection.model";
import { WEBSITE_SEARCHABLE_FIELDS } from "./Website.constant";
import {
  ICreateWebsite,
  IUpdateWebsite,
  IWebsiteQueryParams,
} from "./Website.interface";
import { Website } from "./Website.model";
import { generateWebsiteSlug } from "./Website.utils";

/**
 * Website Service
 * Business logic for Website operations
 */

/**
 * Create a new website with default pages and sections
 * @param payload - Website creation data
 * @param userId - ID of the user creating the website
 * @returns Created website with default pages
 */
const CreateWebsite = async (payload: ICreateWebsite, userId: string) => {
  // Generate unique slug
  const slug = await generateWebsiteSlug(payload.websiteName, userId);

  // Create website
  const website = await Website.create({
    ...payload,
    userId,
    slug,
  });

  if (!website) {
    throw new AppError("Failed to create website", 500);
  }

  // Auto-generate default pages and sections
  await WebpageService.CreateDefaultPages(
    website?._id?.toString() || "",
    website.websiteType,
  );

  return website;
};

/**
 * Get all websites for a user with filtering and pagination
 * @param userId - User ID
 * @param queryParams - Query parameters
 * @returns Paginated websites
 */
const GetWebsites = async (
  userId: string,
  queryParams: IWebsiteQueryParams,
) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    searchTerm,
    status,
    websiteType,
    brand,
  } = queryParams;

  // Build filter query
  const filter: any = {
    userId,
    isDeleted: false,
  };

  // Add search term filter
  if (searchTerm) {
    filter.$or = WEBSITE_SEARCHABLE_FIELDS.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    }));
  }

  // Add status filter
  if (status) {
    filter.status = status;
  }

  // Add website type filter
  if (websiteType) {
    filter.websiteType = websiteType;
  }

  // Add brand filter
  if (brand) {
    filter.brand = brand;
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Build sort object
  const sort: any = {};
  sort[sortBy] = sortOrder === "asc" ? 1 : -1;

  // Execute query
  const websites = await Website.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();

  // Get total count
  const total = await Website.countDocuments(filter);

  return {
    data: websites,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get a single website by ID with pages
 * @param websiteId - Website ID
 * @param userId - User ID
 * @returns Website with populated pages
 */
const GetWebsiteById = async (websiteId: string, userId: string) => {
  const website = await Website.findOne({
    _id: websiteId,
    userId,
    isDeleted: false,
  }).populate({
    path: "pages",
    match: { isDeleted: false },
    options: { sort: { order: 1 } },
    populate: {
      path: "sections",
      match: { isDeleted: false },
      options: { sort: { order: 1 } },
    },
  });

  if (!website) {
    throw new AppError("Website not found", 404);
  }

  return website;
};

/**
 * Get a website by slug (public access)
 * @param slug - Website slug
 * @param userId - User ID
 * @returns Website data
 */
const GetWebsiteBySlug = async (slug: string, userId: string) => {
  const website = await Website.findOne({
    slug,
    userId,
    isDeleted: false,
  }).populate({
    path: "pages",
    match: { isDeleted: false },
    options: { sort: { order: 1 } },
    populate: {
      path: "sections",
      match: { isDeleted: false },
      options: { sort: { order: 1 } },
    },
  });

  if (!website) {
    throw new AppError("Website not found", 404);
  }

  return website;
};

/**
 * Update a website
 * @param websiteId - Website ID
 * @param userId - User ID
 * @param payload - Update data
 * @returns Updated website
 */
const UpdateWebsite = async (
  websiteId: string,
  userId: string,
  payload: IUpdateWebsite,
) => {
  // Check if website exists and user owns it
  const website = await Website.findOne({
    _id: websiteId,
    userId,
    isDeleted: false,
  });

  console.log("Website ", website);

  if (!website) {
    throw new AppError("Website not found", 404);
  }

  // If website name is being updated, regenerate slug
  if (payload.websiteName && payload.websiteName !== website.websiteName) {
    const newSlug = await generateWebsiteSlug(payload.websiteName, userId);
    Object.assign(payload, { slug: newSlug });
  }

  // If website type is being updated, handle content regeneration
  if (payload.websiteType && payload.websiteType !== website.websiteType) {
    // 1. Find all default pages for this website
    const defaultPages = await Webpage.find({
      websiteId,
      isDefault: true,
      isDeleted: false,
    });

    console.log("Default pages ", defaultPages);

    // 2. Delete sections for default pages and the pages themselves
    if (defaultPages.length > 0) {
      const pageIds = defaultPages.map((page) => page._id);

      // Delete sections associated with these pages
      await WebpageSection.deleteMany({ webpageId: { $in: pageIds } });

      // Delete the pages
      await Webpage.deleteMany({ _id: { $in: pageIds } });
    }

    // 3. Create new default pages for new website type
    await WebpageService.CreateDefaultPages(websiteId, payload.websiteType);
  }

  // Update website
  const updatedWebsite = await Website.findByIdAndUpdate(websiteId, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedWebsite) {
    throw new AppError("Failed to update website", 500);
  }

  return updatedWebsite;
};

/**
 * Update website status
 * @param websiteId - Website ID
 * @param userId - User ID
 * @param status - New status
 * @returns Updated website
 */
const UpdateWebsiteStatus = async (
  websiteId: string,
  userId: string,
  status: string,
) => {
  // Check if website exists and user owns it
  const website = await Website.findOne({
    _id: websiteId,
    userId,
    isDeleted: false,
  });

  if (!website) {
    throw new AppError("Website not found", 404);
  }

  // Update status
  website.status = status as any;
  await website.save();

  return website;
};

/**
 * Delete a website (soft delete)
 * @param websiteId - Website ID
 * @param userId - User ID
 * @returns Success message
 */
const DeleteWebsite = async (websiteId: string, userId: string) => {
  // Check if website exists and user owns it
  const website = await Website.findOne({
    _id: websiteId,
    userId,
    isDeleted: false,
  });

  if (!website) {
    throw new AppError("Website not found", 404);
  }

  // Soft delete
  website.isDeleted = true;
  await website.save();

  // TODO: Cascade delete to pages, sections, content, and theme
  // This will be implemented when other modules are created

  return { message: "Website deleted successfully" };
};

/**
 * Clone a website (duplicate with all pages and sections)
 * @param websiteId - Website ID to clone
 * @param userId - User ID
 * @returns Cloned website
 */
const CloneWebsite = async (websiteId: string, userId: string) => {
  // Get original website
  const originalWebsite = await Website.findOne({
    _id: websiteId,
    userId,
    isDeleted: false,
  });

  if (!originalWebsite) {
    throw new AppError("Website not found", 404);
  }

  // Create new website with copied data
  const newWebsiteName = `${originalWebsite.websiteName} (Copy)`;
  const newSlug = await generateWebsiteSlug(newWebsiteName, userId);

  const clonedWebsite = await Website.create({
    userId: originalWebsite.userId,
    brand: originalWebsite.brand,
    websiteName: newWebsiteName,
    websiteType: originalWebsite.websiteType,
    description: originalWebsite.description,
    status: originalWebsite.status,
    slug: newSlug,
  });

  if (!clonedWebsite) {
    throw new AppError("Failed to clone website", 500);
  }

  // TODO: Clone pages, sections, content, and theme
  // This will be implemented when other modules are created

  return clonedWebsite;
};

export const WebsiteService = {
  CreateWebsite,
  GetWebsites,
  GetWebsiteById,
  GetWebsiteBySlug,
  UpdateWebsite,
  UpdateWebsiteStatus,
  DeleteWebsite,
  CloneWebsite,
};
