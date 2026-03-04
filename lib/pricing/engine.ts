// lib/pricing/engine.ts
export const FEATURE_PRICES: Record<string, number> = {
  base: 100,
  feature_blog: 20,
  feature_ecommerce: 50,
  feature_booking: 30,
  feature_contact_form: 10,
  feature_seo_tools: 20,
  feature_analytics: 15,
  feature_custom_domain: 0,   // Domain registration is GHS 200 one-time, separate from monthly
  feature_gallery: 10,
  feature_restaurant_menu: 20,
  feature_social_links: 0,
  feature_newsletter: 20,
  feature_password_protection: 15,
  feature_multiple_pages: 20,
  feature_google_maps: 5,
  feature_video_embed: 10,
  feature_testimonials: 0,
  feature_countdown: 5,
  feature_live_chat: 10,
  feature_whatsapp_button: 0,
  feature_push_notifications: 15,
  feature_heatmaps: 20,
  feature_multi_language: 25,
  feature_site_search: 10,
  feature_coupons: 10,
  feature_product_reviews: 10,
  feature_delivery_zones: 10,
  feature_affiliate: 15,
  feature_ab_testing: 20,
  feature_social_auto_post: 15,
  feature_event_ticketing: 25,
  feature_link_in_bio: 0,
};

export const FEATURE_LABELS: Record<string, string> = {
  feature_blog: "Blog / News",
  feature_ecommerce: "E-commerce & Payments",
  feature_booking: "Appointment Booking",
  feature_contact_form: "Contact Forms",
  feature_seo_tools: "SEO Tools",
  feature_analytics: "Analytics Dashboard",
  feature_custom_domain: "Custom Domain",
  feature_gallery: "Photo Gallery",
  feature_restaurant_menu: "Restaurant Menu",
  feature_social_links: "Social Links (Free)",
  feature_newsletter: "Newsletter System",
  feature_password_protection: "Password-Protected Pages",
  feature_multiple_pages: "Multiple Pages",
  feature_google_maps: "Google Maps Embed",
  feature_video_embed: "Video / Background Video",
  feature_testimonials: "Testimonials (Free)",
  feature_countdown: "Countdown Timer",
  feature_live_chat: "Live Chat Widget",
  feature_whatsapp_button: "WhatsApp Button (Free)",
  feature_push_notifications: "Push Notifications",
  feature_heatmaps: "Visitor Heatmaps",
  feature_multi_language: "Multi-Language Support",
  feature_site_search: "Site Search",
  feature_coupons: "Coupon / Discount Codes",
  feature_product_reviews: "Product Reviews",
  feature_delivery_zones: "Delivery Zones",
  feature_affiliate: "Affiliate / Referral Program",
  feature_ab_testing: "A/B Testing",
  feature_social_auto_post: "Social Media Auto-Post",
  feature_event_ticketing: "Event Ticketing",
  feature_link_in_bio: "Link in Bio (Free)",
};

export const PRICE_MIN = 100;
export const PRICE_MAX = 400;
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
    if (enabled && FEATURE_PRICES[key] !== undefined && FEATURE_PRICES[key] > 0 && FEATURE_LABELS[key]) {
      items.push({ key, label: FEATURE_LABELS[key], price: FEATURE_PRICES[key] });
    }
  }
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const adDiscount = adSupported ? AD_SUPPORTED_DISCOUNT : 0;
  const total = Math.max(PRICE_MIN, Math.min(subtotal - adDiscount, PRICE_MAX));
  return { items, subtotal, adDiscount, total };
}
