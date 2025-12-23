import { getDefaultSectionsForPage } from "@/config/defaultContent.config";
import { AppError } from "@/helper/errorHelper/appError";
import { Webpage } from "../Webpage/Webpage.model";
import { ICreateSection, IUpdateSection } from "./WebpageSection.interface";
import { WebpageSection } from "./WebpageSection.model";
import { getNextSectionOrder } from "./WebpageSection.utils";

/**
 * WebpageSection Service
 * Business logic for WebpageSection operations
 */

/**
 * Create default sections for a page
 * Called automatically when a page is created
 * @param pageId - Page ID
 * @param pageName - Name of the page
 * @param websiteType - Type of website
 * @returns Created sections
 */
const CreateDefaultSections = async (
  pageId: string,
  pageName: string,
  websiteType: string,
) => {
  const defaultSections = getDefaultSectionsForPage(websiteType, pageName);

  if (!defaultSections || defaultSections.length === 0) {
    return []; // No default sections for this page type
  }

  const sections = await Promise.all(
    defaultSections.map((sectionConfig) =>
      WebpageSection.create({
        webpageId: pageId,
        name: sectionConfig.name,
        sectionType: sectionConfig.sectionType,
        order: sectionConfig.order,
      }),
    ),
  );

  return sections;
};

/**
 * Create a custom section
 * @param pageId - Page ID
 * @param userId - User ID
 * @param payload - Section data
 * @returns Created section
 */
const CreateSection = async (
  pageId: string,
  userId: string,
  payload: ICreateSection,
) => {
  // Verify page exists and user owns it
  const page = await Webpage.findOne({
    _id: pageId,
    isDeleted: false,
  }).populate({
    path: "websiteId",
    match: { userId, isDeleted: false },
  });

  if (!page || !page.websiteId) {
    throw new AppError("Page not found or you do not have permission", 404);
  }

  // Get next order
  const order = await getNextSectionOrder(pageId);

  // Create section
  const section = await WebpageSection.create({
    webpageId: pageId,
    name: payload.name,
    sectionType: payload.sectionType,
    settings: payload.settings || {},
    order,
  });

  if (!section) {
    throw new AppError("Failed to create section", 500);
  }

  return section;
};

/**
 * Get all sections for a page
 * @param pageId - Page ID
 * @param userId - User ID
 * @returns Array of sections
 */
const GetSections = async (pageId: string, userId: string) => {
  // Verify page exists and user owns it
  const page = await Webpage.findOne({
    _id: pageId,
    isDeleted: false,
  }).populate({
    path: "websiteId",
    match: { userId, isDeleted: false },
  });

  if (!page || !page.websiteId) {
    throw new AppError("Page not found or you do not have permission", 404);
  }

  const sections = await WebpageSection.find({
    webpageId: pageId,
    isDeleted: false,
  })
    .sort({ order: 1 })
    .populate("content");

  return sections;
};

/**
 * Get a single section by ID
 * @param sectionId - Section ID
 * @param userId - User ID
 * @returns Section with content
 */
const GetSectionById = async (sectionId: string, userId: string) => {
  const section = await WebpageSection.findOne({
    _id: sectionId,
    isDeleted: false,
  }).populate([
    {
      path: "webpageId",
      populate: {
        path: "websiteId",
        match: { userId, isDeleted: false },
      },
    },
    {
      path: "content",
    },
  ]);

  if (!section || !section.webpageId || !(section.webpageId as any).websiteId) {
    throw new AppError("Section not found or you do not have permission", 404);
  }

  return section;
};

/**
 * Update a section
 * @param sectionId - Section ID
 * @param userId - User ID
 * @param payload - Update data
 * @returns Updated section
 */
const UpdateSection = async (
  sectionId: string,
  userId: string,
  payload: IUpdateSection,
) => {
  // Get section and verify ownership
  const section = await WebpageSection.findOne({
    _id: sectionId,
    isDeleted: false,
  }).populate({
    path: "webpageId",
    populate: {
      path: "websiteId",
      match: { userId, isDeleted: false },
    },
  });

  if (!section || !section.webpageId || !(section.webpageId as any).websiteId) {
    throw new AppError("Section not found", 404);
  }

  // If order is being updated, handle shifting
  if (payload.order !== undefined && payload.order !== section.order) {
    const oldOrder = section.order;
    const newOrder = payload.order;
    const pageId = section.webpageId._id;

    if (newOrder > oldOrder) {
      // Moving down: decrement orders between old and new position
      await WebpageSection.updateMany(
        {
          webpageId: pageId,
          order: { $gt: oldOrder, $lte: newOrder },
          _id: { $ne: sectionId },
          isDeleted: false,
        },
        { $inc: { order: -1 } },
      );
    } else if (newOrder < oldOrder) {
      // Moving up: increment orders between new and old position
      await WebpageSection.updateMany(
        {
          webpageId: pageId,
          order: { $gte: newOrder, $lt: oldOrder },
          _id: { $ne: sectionId },
          isDeleted: false,
        },
        { $inc: { order: 1 } },
      );
    }
  }

  // Update section
  const updatedSection = await WebpageSection.findByIdAndUpdate(
    sectionId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedSection) {
    throw new AppError("Failed to update section", 500);
  }

  return updatedSection;
};

/**
 * Delete a section
 * @param sectionId - Section ID
 * @param userId - User ID
 * @returns Success message
 */
const DeleteSection = async (sectionId: string, userId: string) => {
  // Get section and verify ownership
  const section = await WebpageSection.findOne({
    _id: sectionId,
    isDeleted: false,
  }).populate({
    path: "webpageId",
    populate: {
      path: "websiteId",
      match: { userId, isDeleted: false },
    },
  });

  if (!section || !section.webpageId || !(section.webpageId as any).websiteId) {
    throw new AppError("Section not found", 404);
  }

  // Soft delete
  section.isDeleted = true;
  const deletedOrder = section.order;
  await section.save();

  // Automatic reorder: Decrement order of all sections that were after the deleted section
  await WebpageSection.updateMany(
    {
      webpageId: section.webpageId._id,
      order: { $gt: deletedOrder },
      isDeleted: false,
    },
    { $inc: { order: -1 } },
  );

  return { message: "Section deleted successfully" };
};

/**
 * Reorder a section
 * @param sectionId - Section ID
 * @param userId - User ID
 * @param newOrder - New order value
 * @returns Updated section
 */
const ReorderSection = async (
  sectionId: string,
  userId: string,
  newOrder: number,
) => {
  return UpdateSection(sectionId, userId, { order: newOrder });
};

/**
 * Duplicate a section
 * @param sectionId - Section ID to duplicate
 * @param userId - User ID
 * @returns Duplicated section
 */
const DuplicateSection = async (sectionId: string, userId: string) => {
  // Get original section
  const originalSection = await WebpageSection.findOne({
    _id: sectionId,
    isDeleted: false,
  }).populate({
    path: "webpageId",
    populate: {
      path: "websiteId",
      match: { userId, isDeleted: false },
    },
  });

  if (
    !originalSection ||
    !originalSection.webpageId ||
    !(originalSection.webpageId as any).websiteId
  ) {
    throw new AppError("Section not found", 404);
  }

  // Get next order
  const order = await getNextSectionOrder(
    originalSection.webpageId._id.toString(),
  );

  // Create duplicate
  const duplicatedSection = await WebpageSection.create({
    webpageId: originalSection.webpageId,
    name: `${originalSection.name} (Copy)`,
    sectionType: originalSection.sectionType,
    settings: originalSection.settings,
    order,
  });

  if (!duplicatedSection) {
    throw new AppError("Failed to duplicate section", 500);
  }

  return duplicatedSection;
};

export const WebpageSectionService = {
  CreateDefaultSections,
  CreateSection,
  GetSections,
  GetSectionById,
  UpdateSection,
  DeleteSection,
  ReorderSection,
  DuplicateSection,
};
