/**
 * Webpage Constants
 * Contains default pages configuration for each website type
 */

import { WebsiteTypeEnum } from "../Website/Website.constant";

/**
 * Default page definition
 */
export interface IDefaultPage {
  name: string;
  slug: string;
  order: number;
  isDefault: boolean;
}

/**
 * Default Pages Configuration by Website Type
 */
export const DEFAULT_PAGES: Record<WebsiteTypeEnum, IDefaultPage[]> = {
  [WebsiteTypeEnum.E_COMMERCE]: [
    { name: "Home", slug: "home", order: 1, isDefault: true },
    { name: "Shop", slug: "shop", order: 2, isDefault: true },
    {
      name: "Product Details",
      slug: "product-details",
      order: 3,
      isDefault: true,
    },
    { name: "Cart", slug: "cart", order: 4, isDefault: true },
    { name: "Checkout", slug: "checkout", order: 5, isDefault: true },
    { name: "About Us", slug: "about-us", order: 6, isDefault: true },
    { name: "Contact", slug: "contact", order: 7, isDefault: true },
  ],
  [WebsiteTypeEnum.BUSINESS_PORTFOLIO]: [
    { name: "Home", slug: "home", order: 1, isDefault: true },
    { name: "Services", slug: "services", order: 2, isDefault: true },
    { name: "Projects", slug: "projects", order: 3, isDefault: true },
    { name: "About Us", slug: "about-us", order: 4, isDefault: true },
    { name: "Contact", slug: "contact", order: 5, isDefault: true },
  ],
  [WebsiteTypeEnum.PERSONAL_PORTFOLIO]: [
    { name: "Home", slug: "home", order: 1, isDefault: true },
    { name: "Projects", slug: "projects", order: 2, isDefault: true },
    { name: "About", slug: "about", order: 3, isDefault: true },
    { name: "Contact", slug: "contact", order: 4, isDefault: true },
  ],
  [WebsiteTypeEnum.REAL_ESTATE]: [
    { name: "Home", slug: "home", order: 1, isDefault: true },
    { name: "Listings", slug: "listings", order: 2, isDefault: true },
    {
      name: "Property Details",
      slug: "property-details",
      order: 3,
      isDefault: true,
    },
    { name: "About", slug: "about", order: 4, isDefault: true },
    { name: "Contact", slug: "contact", order: 5, isDefault: true },
  ],
  [WebsiteTypeEnum.EDUCATIONAL]: [
    { name: "Home", slug: "home", order: 1, isDefault: true },
    { name: "Courses", slug: "courses", order: 2, isDefault: true },
    { name: "About", slug: "about", order: 3, isDefault: true },
    { name: "Contact", slug: "contact", order: 4, isDefault: true },
  ],
  [WebsiteTypeEnum.HEALTHCARE]: [
    { name: "Home", slug: "home", order: 1, isDefault: true },
    { name: "Services", slug: "services", order: 2, isDefault: true },
    { name: "About", slug: "about", order: 3, isDefault: true },
    { name: "Contact", slug: "contact", order: 4, isDefault: true },
  ],
  [WebsiteTypeEnum.TRAVEL_TOURISM]: [
    { name: "Home", slug: "home", order: 1, isDefault: true },
    { name: "Destinations", slug: "destinations", order: 2, isDefault: true },
    { name: "Packages", slug: "packages", order: 3, isDefault: true },
    { name: "About", slug: "about", order: 4, isDefault: true },
    { name: "Contact", slug: "contact", order: 5, isDefault: true },
  ],
  [WebsiteTypeEnum.OTHERS]: [
    { name: "Home", slug: "home", order: 1, isDefault: true },
    { name: "About", slug: "about", order: 2, isDefault: true },
    { name: "Services", slug: "services", order: 3, isDefault: true },
    { name: "Contact", slug: "contact", order: 4, isDefault: true },
  ],
};

/**
 * Get default pages for a website type
 * @param websiteType - The type of website
 * @returns Array of default page configurations
 */
export const getDefaultPages = (
  websiteType: WebsiteTypeEnum,
): IDefaultPage[] => {
  return DEFAULT_PAGES[websiteType] || DEFAULT_PAGES[WebsiteTypeEnum.OTHERS];
};
