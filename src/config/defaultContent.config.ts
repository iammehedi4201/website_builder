/**
 * Default Sections Configuration
 * Contains default sections for each page type across all website types
 */

export interface IDefaultSection {
  name: string;
  sectionType: string;
  order: number;
}

/**
 * E-Commerce Website Sections
 */
const E_COMMERCE_SECTIONS = {
  Home: [
    { name: "Hero", sectionType: "hero-offer", order: 10, isDefault: true },
    {
      name: "Featured Categories",
      sectionType: "category-grid",
      order: 20,
      isDefault: true,
    },
    {
      name: "New Arrivals",
      sectionType: "product-grid",
      order: 30,
      isDefault: true,
    },
    {
      name: "Best Sellers",
      sectionType: "product-grid",
      order: 40,
      isDefault: true,
    },
    {
      name: "Value Propositions",
      sectionType: "features",
      order: 50,
      isDefault: true,
    },
    {
      name: "Promotional Banner",
      sectionType: "banner",
      order: 60,
      isDefault: true,
    },
    {
      name: "Testimonials",
      sectionType: "testimonials",
      order: 70,
      isDefault: true,
    },
    {
      name: "Brand Logos",
      sectionType: "logo-grid",
      order: 80,
      isDefault: true,
    },
    { name: "Call to Action", sectionType: "cta", order: 90, isDefault: true },
    { name: "Footer", sectionType: "footer", order: 100, isDefault: true },
  ],
  Shop: [
    {
      name: "Product Listing",
      sectionType: "product-grid",
      order: 10,
      isDefault: true,
    },
    {
      name: "Filters & Sorting",
      sectionType: "filters",
      order: 20,
      isDefault: true,
    },
    {
      name: "Category Highlights",
      sectionType: "category-list",
      order: 30,
      isDefault: true,
    },
  ],
  "Product Details": [
    {
      name: "Product Gallery",
      sectionType: "image-gallery",
      order: 10,
      isDefault: true,
    },
    {
      name: "Product Information",
      sectionType: "product-info",
      order: 20,
      isDefault: true,
    },
    {
      name: "Add to Cart / Buy Now",
      sectionType: "product-actions",
      order: 30,
      isDefault: true,
    },
    {
      name: "Key Benefits",
      sectionType: "features",
      order: 40,
      isDefault: true,
    },
    {
      name: "Specifications",
      sectionType: "specifications",
      order: 50,
      isDefault: true,
    },
    {
      name: "Reviews & Ratings",
      sectionType: "reviews",
      order: 60,
      isDefault: true,
    },
    {
      name: "Related Products",
      sectionType: "product-grid",
      order: 70,
      isDefault: true,
    },
  ],
  Cart: [
    {
      name: "Cart Items",
      sectionType: "cart-items",
      order: 10,
      isDefault: true,
    },
    {
      name: "Price Breakdown",
      sectionType: "price-summary",
      order: 20,
      isDefault: true,
    },
    {
      name: "Coupon / Discount",
      sectionType: "coupon",
      order: 30,
      isDefault: true,
    },
    { name: "Checkout CTA", sectionType: "cta", order: 40, isDefault: true },
  ],
  Checkout: [
    {
      name: "Shipping Information",
      sectionType: "form",
      order: 10,
      isDefault: true,
    },
    {
      name: "Payment Method",
      sectionType: "payment",
      order: 20,
      isDefault: true,
    },
    {
      name: "Order Summary",
      sectionType: "order-summary",
      order: 30,
      isDefault: true,
    },
    {
      name: "Trust Badges",
      sectionType: "trust-badges",
      order: 40,
      isDefault: true,
    },
  ],
  "About Us": [
    { name: "Brand Story", sectionType: "content", order: 10, isDefault: true },
    {
      name: "Mission & Vision",
      sectionType: "content",
      order: 20,
      isDefault: true,
    },
    { name: "Team", sectionType: "team-grid", order: 30, isDefault: true },
    { name: "Timeline", sectionType: "timeline", order: 40, isDefault: true },
  ],
  Contact: [
    { name: "Contact Form", sectionType: "form", order: 10, isDefault: true },
    { name: "Store Location", sectionType: "map", order: 20, isDefault: true },
    {
      name: "Support Information",
      sectionType: "contact-info",
      order: 30,
      isDefault: true,
    },
  ],
};

/**
 * Business Portfolio Sections
 */
const BUSINESS_PORTFOLIO_SECTIONS = {
  Home: [
    { name: "Hero", sectionType: "hero", order: 10, isDefault: true },
    {
      name: "Services Snapshot",
      sectionType: "services-grid",
      order: 20,
      isDefault: true,
    },
    {
      name: "Industries Served",
      sectionType: "content",
      order: 30,
      isDefault: true,
    },
    {
      name: "Why Choose Us",
      sectionType: "features",
      order: 40,
      isDefault: true,
    },
    {
      name: "Case Highlights",
      sectionType: "case-studies",
      order: 50,
      isDefault: true,
    },
    {
      name: "Client Logos",
      sectionType: "logo-grid",
      order: 60,
      isDefault: true,
    },
    {
      name: "Testimonials",
      sectionType: "testimonials",
      order: 70,
      isDefault: true,
    },
    { name: "Call to Action", sectionType: "cta", order: 80, isDefault: true },
    { name: "Footer", sectionType: "footer", order: 90, isDefault: true },
  ],
  Services: [
    {
      name: "Service List",
      sectionType: "services-grid",
      order: 10,
      isDefault: true,
    },
    {
      name: "Service Detail Blocks",
      sectionType: "content",
      order: 20,
      isDefault: true,
    },
    {
      name: "Process",
      sectionType: "process-steps",
      order: 30,
      isDefault: true,
    },
    { name: "Pricing", sectionType: "pricing", order: 40, isDefault: true },
  ],
  Projects: [
    {
      name: "Project Grid",
      sectionType: "portfolio-grid",
      order: 10,
      isDefault: true,
    },
    {
      name: "Individual Case Details",
      sectionType: "case-study",
      order: 20,
      isDefault: true,
    },
  ],
  "About Us": [
    {
      name: "Company Overview",
      sectionType: "content",
      order: 10,
      isDefault: true,
    },
    {
      name: "Mission & Vision",
      sectionType: "content",
      order: 20,
      isDefault: true,
    },
    {
      name: "Leadership",
      sectionType: "team-grid",
      order: 30,
      isDefault: true,
    },
    { name: "Culture", sectionType: "content", order: 40, isDefault: true },
  ],
  Contact: [
    { name: "Inquiry Form", sectionType: "form", order: 10, isDefault: true },
    {
      name: "Office Locations",
      sectionType: "map",
      order: 20,
      isDefault: true,
    },
    { name: "Call to Action", sectionType: "cta", order: 30, isDefault: true },
  ],
};

/**
 * Personal Portfolio Sections
 */
const PERSONAL_PORTFOLIO_SECTIONS = {
  Home: [
    { name: "Hero", sectionType: "hero", order: 10, isDefault: true },
    {
      name: "Featured Work",
      sectionType: "portfolio-grid",
      order: 20,
      isDefault: true,
    },
    {
      name: "Testimonials",
      sectionType: "testimonials",
      order: 30,
      isDefault: true,
    },
    { name: "Call to Action", sectionType: "cta", order: 40, isDefault: true },
  ],

  About: [
    { name: "Bio", sectionType: "content", order: 10, isDefault: true },
    {
      name: "Experience Timeline",
      sectionType: "timeline",
      order: 20,
      isDefault: true,
    },
    {
      name: "Skills & Tools",
      sectionType: "skills",
      order: 30,
      isDefault: true,
    },
  ],

  Projects: [
    {
      name: "All Projects",
      sectionType: "portfolio-grid",
      order: 10,
      isDefault: true,
    },
  ],

  Contact: [
    {
      name: "Contact Info",
      sectionType: "contact-info",
      order: 5,
      isDefault: true,
    },
    { name: "Contact Form", sectionType: "form", order: 10, isDefault: true },
  ],
};

/**
 * Real Estate Website Sections
 */
const REAL_ESTATE_SECTIONS = {
  Home: [
    { name: "Hero", sectionType: "hero", order: 10, isDefault: true },
    {
      name: "Featured Properties",
      sectionType: "property-grid",
      order: 20,
      isDefault: true,
    },
    {
      name: "Property Categories",
      sectionType: "category-grid",
      order: 30,
      isDefault: true,
    },
    {
      name: "Why Choose Us",
      sectionType: "features",
      order: 40,
      isDefault: true,
    },
    {
      name: "Agent Highlights",
      sectionType: "team-grid",
      order: 50,
      isDefault: true,
    },
    {
      name: "Testimonials",
      sectionType: "testimonials",
      order: 60,
      isDefault: true,
    },
    { name: "Call to Action", sectionType: "cta", order: 70, isDefault: true },
    { name: "Footer", sectionType: "footer", order: 80, isDefault: true },
  ],
  Listings: [
    {
      name: "Property Grid",
      sectionType: "property-grid",
      order: 10,
      isDefault: true,
    },
    { name: "Filters", sectionType: "filters", order: 20, isDefault: true },
  ],
  "Property Details": [
    {
      name: "Image Gallery",
      sectionType: "image-gallery",
      order: 10,
      isDefault: true,
    },
    {
      name: "Property Overview",
      sectionType: "content",
      order: 20,
      isDefault: true,
    },
    { name: "Amenities", sectionType: "amenities", order: 30, isDefault: true },
    { name: "Location Map", sectionType: "map", order: 40, isDefault: true },
    {
      name: "Agent Contact CTA",
      sectionType: "cta",
      order: 50,
      isDefault: true,
    },
  ],
  About: [
    {
      name: "Company Overview",
      sectionType: "content",
      order: 10,
      isDefault: true,
    },
    { name: "Experience", sectionType: "features", order: 20, isDefault: true },
    {
      name: "Trust Badges",
      sectionType: "trust-badges",
      order: 30,
      isDefault: true,
    },
  ],
  Contact: [
    { name: "Inquiry Form", sectionType: "form", order: 10, isDefault: true },
    { name: "Office Location", sectionType: "map", order: 20, isDefault: true },
  ],
};

/**
 * Educational Website Sections
 */
const EDUCATIONAL_SECTIONS = {
  Home: [
    { name: "Hero", sectionType: "hero", order: 10, isDefault: true },
    { name: "Courses", sectionType: "course-list", order: 20, isDefault: true },
    {
      name: "Why Choose Us",
      sectionType: "features",
      order: 30,
      isDefault: true,
    },
    {
      name: "Statistics",
      sectionType: "statistics",
      order: 40,
      isDefault: true,
    },
    {
      name: "Testimonials",
      sectionType: "testimonials",
      order: 50,
      isDefault: true,
    },
    { name: "Call to Action", sectionType: "cta", order: 60, isDefault: true },
    { name: "Footer", sectionType: "footer", order: 70, isDefault: true },
  ],
  Courses: [
    {
      name: "Course List",
      sectionType: "course-list",
      order: 10,
      isDefault: true,
    },
    {
      name: "Course Details",
      sectionType: "course-details",
      order: 20,
      isDefault: true,
    },
  ],
  About: [
    {
      name: "Institution Overview",
      sectionType: "content",
      order: 10,
      isDefault: true,
    },
    { name: "Mission", sectionType: "content", order: 20, isDefault: true },
    { name: "Faculty", sectionType: "team-grid", order: 30, isDefault: true },
  ],
  Contact: [
    { name: "Inquiry Form", sectionType: "form", order: 10, isDefault: true },
    {
      name: "Campus Information",
      sectionType: "contact-info",
      order: 20,
      isDefault: true,
    },
  ],
};

/**
 * Travel / Tourism Website Sections
 */
const TRAVEL_TOURISM_SECTIONS = {
  Home: [
    { name: "Hero", sectionType: "hero", order: 10, isDefault: true },
    {
      name: "Popular Packages",
      sectionType: "package-grid",
      order: 20,
      isDefault: true,
    },
    {
      name: "Experiences",
      sectionType: "experiences",
      order: 30,
      isDefault: true,
    },
    {
      name: "Why Travel With Us",
      sectionType: "features",
      order: 40,
      isDefault: true,
    },
    {
      name: "Testimonials",
      sectionType: "testimonials",
      order: 50,
      isDefault: true,
    },
    { name: "Call to Action", sectionType: "cta", order: 60, isDefault: true },
    { name: "Footer", sectionType: "footer", order: 70, isDefault: true },
  ],
  Destinations: [
    {
      name: "Destination Grid",
      sectionType: "destination-grid",
      order: 10,
      isDefault: true,
    },
    {
      name: "Destination Details",
      sectionType: "content",
      order: 20,
      isDefault: true,
    },
  ],
  Packages: [
    {
      name: "Package List",
      sectionType: "package-grid",
      order: 10,
      isDefault: true,
    },
    {
      name: "Package Details",
      sectionType: "content",
      order: 20,
      isDefault: true,
    },
  ],
  About: [
    {
      name: "Company Story",
      sectionType: "content",
      order: 10,
      isDefault: true,
    },
    { name: "Expertise", sectionType: "features", order: 20, isDefault: true },
  ],
  Contact: [
    { name: "Booking Form", sectionType: "form", order: 10, isDefault: true },
    {
      name: "Support Information",
      sectionType: "contact-info",
      order: 20,
      isDefault: true,
    },
  ],
};

/**
 * Others (Default) Sections
 */
const OTHERS_SECTIONS = {
  Home: [
    { name: "Hero", sectionType: "hero", order: 10, isDefault: true },
    {
      name: "Key Offerings",
      sectionType: "features",
      order: 20,
      isDefault: true,
    },
    {
      name: "Why Choose Us",
      sectionType: "content",
      order: 30,
      isDefault: true,
    },
    {
      name: "Social Proof",
      sectionType: "testimonials",
      order: 40,
      isDefault: true,
    },
    { name: "Call to Action", sectionType: "cta", order: 50, isDefault: true },
    { name: "Footer", sectionType: "footer", order: 60, isDefault: true },
  ],
  About: [
    { name: "Overview", sectionType: "content", order: 10, isDefault: true },
    { name: "Mission", sectionType: "content", order: 20, isDefault: true },
    { name: "Team", sectionType: "team-grid", order: 30, isDefault: true },
  ],
  Services: [
    {
      name: "Service List",
      sectionType: "services-grid",
      order: 10,
      isDefault: true,
    },
    {
      name: "Service Details",
      sectionType: "content",
      order: 20,
      isDefault: true,
    },
  ],
  Contact: [
    { name: "Contact Form", sectionType: "form", order: 10, isDefault: true },
    {
      name: "Contact Information",
      sectionType: "contact-info",
      order: 20,
      isDefault: true,
    },
  ],
};

/**
 * Healthcare Website Sections
 */
const HEALTHCARE_SECTIONS = {
  Home: [
    { name: "Hero", sectionType: "hero", order: 10, isDefault: true },
    {
      name: "Services Snapshot",
      sectionType: "services-grid",
      order: 20,
      isDefault: true,
    },
    { name: "Specialties", sectionType: "content", order: 30, isDefault: true },
    {
      name: "Why Choose Us",
      sectionType: "features",
      order: 40,
      isDefault: true,
    },
    {
      name: "Patient Stories",
      sectionType: "testimonials",
      order: 50,
      isDefault: true,
    },
    { name: "Call to Action", sectionType: "cta", order: 60, isDefault: true },
    { name: "Footer", sectionType: "footer", order: 70, isDefault: true },
  ],
  Services: [
    {
      name: "Service List",
      sectionType: "services-grid",
      order: 10,
      isDefault: true,
    },
    {
      name: "Department Details",
      sectionType: "content",
      order: 20,
      isDefault: true,
    },
    { name: "Facilities", sectionType: "features", order: 30, isDefault: true },
  ],
  About: [
    {
      name: "Hospital Overview",
      sectionType: "content",
      order: 10,
      isDefault: true,
    },
    {
      name: "Mission & Values",
      sectionType: "content",
      order: 20,
      isDefault: true,
    },
    {
      name: "Medical Team",
      sectionType: "team-grid",
      order: 30,
      isDefault: true,
    },
    {
      name: "Accreditations",
      sectionType: "trust-badges",
      order: 40,
      isDefault: true,
    },
  ],
  Contact: [
    {
      name: "Book Appointment",
      sectionType: "form",
      order: 10,
      isDefault: true,
    },
    {
      name: "Emergency Contacts",
      sectionType: "contact-info",
      order: 20,
      isDefault: true,
    },
    { name: "Location Map", sectionType: "map", order: 30, isDefault: true },
  ],
};

/**
 * Default sections configuration mapped by website type and page name
 */
export const DEFAULT_SECTIONS_CONFIG: Record<
  string,
  Record<string, IDefaultSection[]>
> = {
  "E-Commerce": E_COMMERCE_SECTIONS,
  "Business Portfolio": BUSINESS_PORTFOLIO_SECTIONS,
  "Personal Portfolio": PERSONAL_PORTFOLIO_SECTIONS,
  "Real Estate": REAL_ESTATE_SECTIONS,
  Educational: EDUCATIONAL_SECTIONS,
  Healthcare: HEALTHCARE_SECTIONS,
  "Travel / Tourism": TRAVEL_TOURISM_SECTIONS,
  Others: OTHERS_SECTIONS,
};

/**
 * Get default sections for a specific page
 * @param websiteType - Type of website
 * @param pageName - Name of the page
 * @returns Array of default section configurations
 */
export const getDefaultSectionsForPage = (
  websiteType: string,
  pageName: string,
): IDefaultSection[] => {
  const websiteSections =
    DEFAULT_SECTIONS_CONFIG[websiteType] || DEFAULT_SECTIONS_CONFIG["Others"];
  return websiteSections[pageName] || [];
};
