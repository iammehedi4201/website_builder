import {
  generateSlug,
  generateUniqueSlug,
  isReservedSlug,
} from "../../helper/slugify.helper";
import { Website } from "./Website.model";

/**
 * Website Utility Functions
 * Helper functions specific to Website module
 */

/**
 * Generate a unique slug for a website
 * @param websiteName - The website name to generate slug from
 * @param userId - The user ID to check uniqueness within user's scope
 * @returns Unique slug
 */
export const generateWebsiteSlug = async (
  websiteName: string,
  userId: string,
): Promise<string> => {
  const baseSlug = generateSlug(websiteName);

  // Check if slug is reserved
  if (isReservedSlug(baseSlug)) {
    throw new Error(`The slug "${baseSlug}" is reserved and cannot be used`);
  }

  // Check if slug already exists for this user
  const existingSlugCheck = async (slug: string): Promise<boolean> => {
    const existing = await Website.findOne({ userId, slug, isDeleted: false });
    return !!existing;
  };

  return await generateUniqueSlug(baseSlug, existingSlugCheck);
};

/**
 * Check if user owns a website
 * @param websiteId - The website ID
 * @param userId - The user ID
 * @returns True if user owns the website
 */
export const checkWebsiteOwnership = async (
  websiteId: string,
  userId: string,
): Promise<boolean> => {
  const website = await Website.findOne({
    _id: websiteId,
    userId,
    isDeleted: false,
  });
  return !!website;
};

/**
 * Validate website exists and user owns it
 * @param websiteId - The website ID
 * @param userId - The user ID
 * @returns Website document or throws error
 */
export const validateWebsiteOwnership = async (
  websiteId: string,
  userId: string,
) => {
  const website = await Website.findOne({
    _id: websiteId,
    userId,
    isDeleted: false,
  });

  if (!website) {
    throw new Error(
      "Website not found or you do not have permission to access it",
    );
  }

  return website;
};
