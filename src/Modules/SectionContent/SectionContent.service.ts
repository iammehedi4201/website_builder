import { AppError } from "@/helper/errorHelper/appError";
import { WebpageSection } from "../WebpageSection/WebpageSection.model";
import { IUpsertSectionContent } from "./SectionContent.interface";
import { SectionContent } from "./SectionContent.model";

/**
 * SectionContent Service
 * Business logic for SectionContent operations
 */

/**
 * Get content for a section
 * @param sectionId - Section ID
 * @param userId - User ID
 * @returns Section content
 */
const GetContent = async (sectionId: string, userId: string) => {
  // Verify section exists and user owns it
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
    throw new AppError("Section not found or you do not have permission", 404);
  }

  // Get content
  const content = await SectionContent.findOne({ sectionId });

  // Return empty content structure if none exists
  if (!content) {
    return {
      sectionId,
      title: "",
      subtitle: "",
      description: "",
      media: [],
      buttons: [],
      listItems: [],
      customData: {},
      status: "active",
    };
  }

  return content;
};

/**
 * Create or update content for a section (Upsert)
 * @param sectionId - Section ID
 * @param userId - User ID
 * @param payload - Content data
 * @returns Created/updated content
 */
const UpsertContent = async (
  sectionId: string,
  userId: string,
  payload: IUpsertSectionContent,
) => {
  // Verify section exists and user owns it
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
    throw new AppError("Section not found or you do not have permission", 404);
  }

  // Find existing content
  let content = await SectionContent.findOne({ sectionId });

  if (content) {
    // Update existing content
    Object.assign(content, payload);
    await content.save();
  } else {
    // Create new content
    content = await SectionContent.create({
      sectionId,
      ...payload,
    });
  }

  if (!content) {
    throw new AppError("Failed to save content", 500);
  }

  return content;
};

/**
 * Update content by ID
 * @param contentId - Content ID
 * @param userId - User ID
 * @param payload - Content data
 * @returns Updated content
 */
const UpdateContent = async (
  contentId: string,
  userId: string,
  payload: IUpsertSectionContent,
) => {
  // Get content and verify ownership
  const content = await SectionContent.findById(contentId).populate({
    path: "sectionId",
    populate: {
      path: "webpageId",
      populate: {
        path: "websiteId",
        match: { userId, isDeleted: false },
      },
    },
  });

  if (
    !content ||
    !content.sectionId ||
    !(content.sectionId as any).webpageId ||
    !((content.sectionId as any).webpageId as any).websiteId
  ) {
    throw new AppError("Content not found or you do not have permission", 404);
  }

  // Update content
  Object.assign(content, payload);
  await content.save();

  return content;
};

/**
 * Add media to content
 * @param contentId - Content ID
 * @param userId - User ID
 * @param mediaUrl - URL of the uploaded media
 * @param mediaType - Type of media (image/video)
 * @param alt - Alt text
 * @param caption - Caption
 * @returns Updated content
 */
const AddMedia = async (
  contentId: string,
  userId: string,
  mediaUrl: string,
  mediaType: "image" | "video",
  alt?: string,
  caption?: string,
) => {
  // Get content and verify ownership
  const content = await SectionContent.findById(contentId).populate({
    path: "sectionId",
    populate: {
      path: "webpageId",
      populate: {
        path: "websiteId",
        match: { userId, isDeleted: false },
      },
    },
  });

  if (
    !content ||
    !content.sectionId ||
    !(content.sectionId as any).webpageId ||
    !((content.sectionId as any).webpageId as any).websiteId
  ) {
    throw new AppError("Content not found or you do not have permission", 404);
  }

  // Add media
  if (!content.media) {
    content.media = [];
  }

  content.media.push({
    type: mediaType as any,
    url: mediaUrl,
    alt,
    caption,
  });

  await content.save();

  return content;
};

/**
 * Remove media from content
 * @param contentId - Content ID
 * @param userId - User ID
 * @param mediaId - Media item ID to remove (index in array)
 * @returns Updated content
 */
const RemoveMedia = async (
  contentId: string,
  userId: string,
  mediaId: string,
) => {
  // Get content and verify ownership
  const content = await SectionContent.findById(contentId).populate({
    path: "sectionId",
    populate: {
      path: "webpageId",
      populate: {
        path: "websiteId",
        match: { userId, isDeleted: false },
      },
    },
  });

  if (
    !content ||
    !content.sectionId ||
    !(content.sectionId as any).webpageId ||
    !((content.sectionId as any).webpageId as any).websiteId
  ) {
    throw new AppError("Content not found or you do not have permission", 404);
  }

  // Remove media by ID (assuming mediaId is the MongoDB _id of the subdocument)
  if (content.media && content.media.length > 0) {
    content.media = content.media.filter(
      (item: any) => item._id.toString() !== mediaId,
    );
    await content.save();
  }

  return content;
};

export const SectionContentService = {
  GetContent,
  UpsertContent,
  UpdateContent,
  AddMedia,
  RemoveMedia,
};
