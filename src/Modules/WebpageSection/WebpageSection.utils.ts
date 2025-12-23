import { WebpageSection } from "./WebpageSection.model";

/**
 * WebpageSection Utility Functions
 */

/**
 * Get next order number for a section within a page
 * @param pageId - The page ID
 * @returns Next order number
 */
export const getNextSectionOrder = async (pageId: string): Promise<number> => {
  const lastSection = await WebpageSection.findOne({
    webpageId: pageId,
    isDeleted: false,
  })
    .sort({ order: -1 })
    .limit(1);

  if (!lastSection) {
    return 1; // Start from 1
  }

  return lastSection.order + 1;
};

/**
 * Validate section ownership through page ownership
 * @param sectionId - The section ID
 * @param userId - The user ID
 * @returns True if user owns the section through page/website ownership
 */
export const validateSectionOwnership = async (
  sectionId: string,
  userId: string,
): Promise<boolean> => {
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

  return !!(
    section &&
    section.webpageId &&
    (section.webpageId as any).websiteId
  );
};
