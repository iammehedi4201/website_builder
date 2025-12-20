import { AppError } from "@/helper/errorHelper/appError";
import { WebpageSectionService } from "../WebpageSection/WebpageSection.service";
import { WebsiteTypeEnum } from "../Website/Website.constant";
import { validateWebsiteOwnership } from "../Website/Website.utils";
import { getDefaultPages } from "./Webpage.constant";
import {
  IBulkReorderPages,
  ICreateWebpage,
  IUpdateWebpage,
  IWebpage,
} from "./Webpage.interface";
import { Webpage } from "./Webpage.model";
import { generatePageSlug, getNextPageOrder } from "./Webpage.utils";

/**
 * Webpage Service
 * Business logic for Webpage operations
 */

/**
 * Create default pages for a website
 * Called automatically when a website is created
 * @param websiteId - Website ID
 * @param websiteType - Type of website
 * @returns Created pages
 */
const CreateDefaultPages = async (
  websiteId: string,
  websiteType: WebsiteTypeEnum,
) => {
  const defaultPages = getDefaultPages(websiteType);

  const pages = await Promise.all(
    defaultPages.map((pageConfig) =>
      Webpage.create({
        websiteId,
        name: pageConfig.name,
        slug: pageConfig.slug,
        order: pageConfig.order,
        isDefault: pageConfig.isDefault,
      }),
    ),
  );

  if (!pages || pages.length === 0) {
    throw new AppError("Failed to create default pages", 500);
  }

  // Create default sections for each page
  await Promise.all(
    pages.map((page) =>
      WebpageSectionService.CreateDefaultSections(
        page._id.toString(),
        page.name,
        websiteType,
      ),
    ),
  );

  return pages;
};

/**
 * Create a custom page
 * @param websiteId - Website ID
 * @param userId - User ID
 * @param payload - Page data
 * @returns Created page
 */
const CreatePage = async (
  websiteId: string,
  userId: string,
  payload: ICreateWebpage,
) => {
  // Verify user owns the website
  await validateWebsiteOwnership(websiteId, userId);

  // Generate slug and order
  const slug = await generatePageSlug(payload.name, websiteId);
  const order = await getNextPageOrder(websiteId);

  // Create page
  const page = await Webpage.create({
    websiteId,
    name: payload.name,
    slug,
    order,
    isDefault: false,
  });

  if (!page) {
    throw new AppError("Failed to create page", 500);
  }

  return page;
};

/**
 * Get all pages for a website
 * @param websiteId - Website ID
 * @param userId - User ID
 * @returns Array of pages
 */
const GetPages = async (websiteId: string, userId: string) => {
  // Verify user owns the website
  await validateWebsiteOwnership(websiteId, userId);

  const pages = await Webpage.find({ websiteId, isDeleted: false }).sort({
    order: 1,
  });

  return pages;
};

/**
 * Get a single page by ID with sections
 * @param pageId - Page ID
 * @param userId - User ID
 * @returns Page with populated sections
 */
const GetPageById = async (pageId: string, userId: string) => {
  const page = await Webpage.findOne({
    _id: pageId,
    isDeleted: false,
  }).populate([
    {
      path: "websiteId",
      match: { userId, isDeleted: false },
    },
    {
      path: "sections",
      match: { isDeleted: false },
      options: { sort: { order: 1 } },
    },
  ]);

  if (!page || !page.websiteId) {
    throw new AppError(
      "Page not found or you do not have permission to access it",
      404,
    );
  }

  return page;
};

/**
 * Update a page
 * @param pageId - Page ID
 * @param userId - User ID
 * @param payload - Update data
 * @returns Updated page
 */
const UpdatePage = async (
  pageId: string,
  userId: string,
  payload: IUpdateWebpage,
) => {
  // Get page and verify ownership
  const page = await Webpage.findOne({
    _id: pageId,
    isDeleted: false,
  }).populate({
    path: "websiteId",
    match: { userId, isDeleted: false },
  });

  if (!page || !page.websiteId) {
    throw new AppError("Page not found", 404);
  }

  // If name is being updated, regenerate slug
  if (payload.name && payload.name !== page.name) {
    const newSlug = await generatePageSlug(
      payload.name,
      page.websiteId.toString(),
    );
    Object.assign(payload, { slug: newSlug });
  }

  // Update page
  const updatedPage = await Webpage.findByIdAndUpdate(pageId, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedPage) {
    throw new AppError("Failed to update page", 500);
  }

  return updatedPage;
};

/**
 * Delete a page
 * @param pageId - Page ID
 * @param userId - User ID
 * @returns Success message
 */
const DeletePage = async (pageId: string, userId: string) => {
  // Get page and verify ownership
  const page = await Webpage.findOne({
    _id: pageId,
    isDeleted: false,
  }).populate({
    path: "websiteId",
    match: { userId, isDeleted: false },
  });

  if (!page || !page.websiteId) {
    throw new AppError("Page not found", 404);
  }

  // Prevent deletion of default pages
  if (page.isDefault) {
    throw new AppError("Cannot delete default pages", 400);
  }

  // Soft delete
  page.isDeleted = true;
  await page.save();

  // TODO: Cascade delete to sections and content
  // This will be implemented when other modules are created

  return { message: "Page deleted successfully" };
};

/**
 * Reorder a single page
 * @param pageId - Page ID
 * @param userId - User ID
 * @param newOrder - New order value
 * @returns Updated page
 */
const ReorderPage = async (
  pageId: string,
  userId: string,
  newOrder: number,
) => {
  // Get page and verify ownership
  const page = await Webpage.findOne({
    _id: pageId,
    isDeleted: false,
  }).populate({
    path: "websiteId",
    match: { userId, isDeleted: false },
  });

  if (!page || !page.websiteId) {
    throw new AppError("Page not found", 404);
  }

  const oldOrder = page.order;
  const websiteId = page.websiteId._id;

  // Update the page order
  page.order = newOrder;
  await page.save();

  // Adjust other pages' orders
  if (newOrder > oldOrder) {
    // Moving down: decrement orders between old and new position
    await Webpage.updateMany(
      {
        websiteId,
        order: { $gt: oldOrder, $lte: newOrder },
        _id: { $ne: pageId },
        isDeleted: false,
      },
      { $inc: { order: -1 } },
    );
  } else if (newOrder < oldOrder) {
    // Moving up: increment orders between new and old position
    await Webpage.updateMany(
      {
        websiteId,
        order: { $gte: newOrder, $lt: oldOrder },
        _id: { $ne: pageId },
        isDeleted: false,
      },
      { $inc: { order: 1 } },
    );
  }

  return page;
};

/**
 * Bulk reorder pages
 * @param userId - User ID
 * @param payload - Array of page IDs with new orders
 * @returns Success message
 */
const BulkReorderPages = async (userId: string, payload: IBulkReorderPages) => {
  // Update each page's order
  const updatePromises = payload.pages.map(async ({ pageId, newOrder }) => {
    // Verify ownership
    const page = await Webpage.findOne({
      _id: pageId,
      isDeleted: false,
    }).populate({
      path: "websiteId",
      match: { userId, isDeleted: false },
    });

    if (!page || !page.websiteId) {
      throw new AppError(`Page ${pageId} not found or unauthorized`, 404);
    }

    // Update order
    page.order = newOrder;
    return page.save();
  });

  await Promise.all(updatePromises);

  return { message: "Pages reordered successfully" };
};

export const WebpageService = {
  CreateDefaultPages,
  CreatePage,
  GetPages,
  GetPageById,
  UpdatePage,
  DeletePage,
  ReorderPage,
  BulkReorderPages,
};
