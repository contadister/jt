// lib/pricing/engine.ts
// All keys use camelCase to match Prisma schema & form state

export const FEATURE_PRICES: Record<string, number> = {
  base: 100,
  featureBlog: 20,
  featureEcommerce: 50,
  featureBooking: 30,
  featureContactForm: 0,       // FREE
  featureSeoTools: 0,          // FREE
  featureAnalytics: 0,         // FREE
  featureCustomDomain: 0,      // Yearly charge (GHS 200/yr), NOT monthly
  featureGallery: 0,           // FREE
  featureRestaurantMenu: 15,
  featureSocialLinks: 0,       // FREE
  featureNewsletter: 15,
  featurePasswordProtection: 10,
  featureMultiplePages: 0,     // FREE
  featureGoogleMaps: 0,        // FREE
  featureVideoEmbed: 10,
  featureTestimonials: 0,      // FREE
  featureCountdown: 0,         // FREE
  featureLiveChat: 10,
  featureWhatsappButton: 0,    // FREE
  featurePushNotifications: 15,
  featureHeatmaps: 20,
  featureMultiLanguage: 20,
  featureSiteSearch: 10,
  featureCoupons: 10,
  featureProductReviews: 10,
  featureDeliveryZones: 10,
  featureAffiliate: 15,
  featureAbTesting: 20,
  featureSocialAutoPost: 15,
  featureEventTicketing: 20,
  featureLinkInBio: 0,         // FREE
};

export const FEATURE_LABELS: Record<string, string> = {
  featureBlog: "Blog / News",
  featureEcommerce: "E-commerce & Payments",
  featureBooking: "Appointment Booking",
  featureContactForm: "Contact Forms",
  featureSeoTools: "SEO Tools",
  featureAnalytics: "Analytics Dashboard",
  featureCustomDomain: "Custom Domain",
  featureGallery: "Photo Gallery",
  featureRestaurantMenu: "Restaurant Menu",
  featureSocialLinks: "Social Links",
  featureNewsletter: "Newsletter System",
  featurePasswordProtection: "Password-Protected Pages",
  featureMultiplePages: "Multiple Pages",
  featureGoogleMaps: "Google Maps",
  featureVideoEmbed: "Video Embed",
  featureTestimonials: "Testimonials",
  featureCountdown: "Countdown Timer",
  featureLiveChat: "Live Chat Widget",
  featureWhatsappButton: "WhatsApp Button",
  featurePushNotifications: "Push Notifications",
  featureHeatmaps: "Visitor Heatmaps",
  featureMultiLanguage: "Multi-Language",
  featureSiteSearch: "Site Search",
  featureCoupons: "Coupon Codes",
  featureProductReviews: "Product Reviews",
  featureDeliveryZones: "Delivery Zones",
  featureAffiliate: "Affiliate Program",
  featureAbTesting: "A/B Testing",
  featureSocialAutoPost: "Social Auto-Post",
  featureEventTicketing: "Event Ticketing",
  featureLinkInBio: "Link in Bio",
};

// Custom domain is a one-time yearly charge, separate from monthly billing
export const CUSTOM_DOMAIN_YEARLY_GHS = 200;

export const PRICE_MIN = 100;
export const PRICE_MAX = 500;
export const AD_SUPPORTED_DISCOUNT = 30;

export type SiteFeatures = Record<string, boolean | undefined>;

export function calculatePrice(features: SiteFeatures, adSupported = false): number {
  let total = FEATURE_PRICES.base;
  for (const [key, enabled] of Object.entries(features)) {
    if (enabled && FEATURE_PRICES[key] !== undefined) {
      total += FEATURE_PRICES[key];
    }
  }
  if (adSupported) total -= AD_SUPPORTED_DISCOUNT;
  return Math.max(PRICE_MIN, Math.min(total, PRICE_MAX));
}

export interface PriceBreakdownItem {
  key: string;
  label: string;
  price: number;
}

export interface PriceBreakdown {
  items: PriceBreakdownItem[];
  subtotal: number;
  adDiscount: number;
  total: number;
}

export function getPriceBreakdown(features: SiteFeatures, adSupported = false): PriceBreakdown {
  const items: PriceBreakdownItem[] = [
    { key: "base", label: "Base Website", price: FEATURE_PRICES.base },
  ];
  for (const [key, enabled] of Object.entries(features)) {
    if (
      enabled &&
      FEATURE_PRICES[key] !== undefined &&
      FEATURE_PRICES[key] > 0 &&
      FEATURE_LABELS[key] &&
      key !== "featureCustomDomain" // handled separately as yearly charge
    ) {
      items.push({ key, label: FEATURE_LABELS[key], price: FEATURE_PRICES[key] });
    }
  }
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const adDiscount = adSupported ? AD_SUPPORTED_DISCOUNT : 0;
  const total = Math.max(PRICE_MIN, Math.min(subtotal - adDiscount, PRICE_MAX));
  return { items, subtotal, adDiscount, total };
}
