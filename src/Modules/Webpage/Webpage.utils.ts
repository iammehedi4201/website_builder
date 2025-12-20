import { generateSlug } from "../../helper/slugify.helper";
import { Webpage } from "./Webpage.model";

/**
 * Webpage Utility Functions
 * Helper functions specific to Webpage module
 */

/**
 * Generate a unique slug for a webpage within a website
 * @param pageName - The page name to generate slug from
 * @param websiteId - The website ID to check uniqueness within
 * @returns Unique slug
 */
export const generatePageSlug = async (
  pageName: string,
  websiteId: string,
): Promise<string> => {
  const baseSlug = generateSlug(pageName);
  let slug = baseSlug;
  let counter = 1;

  // Check if slug already exists within this website
  while (await Webpage.findOne({ websiteId, slug, isDeleted: false })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

/**
 * Get next order number for a page within a website
 * @param websiteId - The website ID
 * @returns Next order number
 */
export const getNextPageOrder = async (websiteId: string): Promise<number> => {
  const lastPage = await Webpage.findOne({ websiteId, isDeleted: false })
    .sort({ order: -1 })
    .limit(1);

  if (!lastPage) {
    return 10; // Start from 10 to allow insertion
  }

  return lastPage.order + 10;
};

/**
 * Validate webpage ownership through website
 * @param pageId - The page ID
 * @param userId - The user ID
 * @returns True if user owns the page through website ownership
 */
export const validatePageOwnership = async (
  pageId: string,
  userId: string,
): Promise<boolean> => {
  const page = await Webpage.findOne({
    _id: pageId,
    isDeleted: false,
  }).populate({
    path: "websiteId",
    match: { userId, isDeleted: false },
  });

  return !!(page && page.websiteId);
};
