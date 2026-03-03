export type SiteStatus = "BUILDING" | "DEPLOYED" | "SUSPENDED" | "EXPIRED" | "CANCELLED";

export type SiteType =
  | "BUSINESS"
  | "PORTFOLIO"
  | "ECOMMERCE"
  | "BLOG"
  | "RESTAURANT"
  | "NGO"
  | "PERSONAL"
  | "LANDING"
  | "LINK_IN_BIO"
  | "EVENT";

export interface SiteFeatureFlags {
  featureEcommerce: boolean;
  featureBlog: boolean;
  featureBooking: boolean;
  featureContactForm: boolean;
  featureSeoTools: boolean;
  featureAnalytics: boolean;
  featureCustomDomain: boolean;
  featureGallery: boolean;
  featureRestaurantMenu: boolean;
  featureSocialLinks: boolean;
  featureNewsletter: boolean;
  featurePasswordProtection: boolean;
  featureMultiplePages: boolean;
  featureGoogleMaps: boolean;
  featureVideoEmbed: boolean;
  featureTestimonials: boolean;
  featureCountdown: boolean;
  featureLiveChat: boolean;
  featureWhatsappButton: boolean;
  featurePushNotifications: boolean;
  featureHeatmaps: boolean;
  featureMultiLanguage: boolean;
  featureSiteSearch: boolean;
  featureCoupons: boolean;
  featureProductReviews: boolean;
  featureDeliveryZones: boolean;
  featureAdsEnabled: boolean;
  featureAffiliate: boolean;
  featureAbTesting: boolean;
  featureSocialAutoPost: boolean;
  featureEventTicketing: boolean;
  featureLinkInBio: boolean;
}

export interface Site extends SiteFeatureFlags {
  id: string;
  userId: string;
  name: string;
  description?: string;
  slug: string;
  status: SiteStatus;
  siteType: SiteType;
  builderJson?: BuilderJSON;
  templateId?: string;
  vercelDeploymentUrl?: string;
  vercelDomain?: string;
  customDomain?: string;
  customDomainVerified: boolean;
  monthlyPriceGhs: number;
  adSupportedTier: boolean;
  subscriptionStart?: string;
  subscriptionEnd?: string;
  totalVisits: number;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  faviconUrl?: string;
  logoUrl?: string;
  whatsappNumber?: string;
  seoTitle?: string;
  seoDescription?: string;
  adTotalEarningsGhs: number;
  adPendingPayoutGhs: number;
  createdAt: string;
  updatedAt: string;
}

export interface BuilderJSON {
  pages: BuilderPage[];
  globalStyles: GlobalStyles;
  siteSettings: SiteSettings;
}

export interface SiteSettings {
  favicon?: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  siteName: string;
  seoDescription?: string;
  seoTitle?: string;
  seoKeywords?: string;
  seoOgImage?: string;
  whatsappNumber?: string;
  tawkToPropertyId?: string;
}

export interface GlobalStyles {
  bodyBackground: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
}

export interface BuilderPage {
  isHomePage?: boolean;
  id: string;
  name: string;
  slug: string;
  sections: BuilderSection[];
  seo: { title: string; description: string };
}

export interface BuilderSection {
  id: string;
  type: string;
  elements: BuilderElement[];
  styles: SectionStyles;
  isVisible?: boolean;
  label?: string;
}

export interface SectionStyles {
  backgroundColor: string;
  backgroundImage?: string;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  maxWidth?: string;
}

export type ElementType =
  | "text"
  | "heading"
  | "image"
  | "button"
  | "hero"
  | "gallery"
  | "form"
  | "map"
  | "video"
  | "testimonial"
  | "pricing-table"
  | "countdown"
  | "social-links"
  | "divider"
  | "spacer"
  | "product-card"
  | "blog-preview"
  | "menu-section"
  | "booking-widget"
  | "newsletter-signup"
  | "stats-counter"
  | "team-member"
  | "faq-accordion"
  | "icon"
  | "logo"
  | "navigation"
  | "footer"
  | "whatsapp-button"
  | "link-in-bio";

export interface BuilderElement {
  id: string;
  type: ElementType;
  content: Record<string, unknown>;
  styles: ElementStyles;
  isVisible?: boolean;
}

export interface ElementStyles {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  width?: string;
  height?: string;
  opacity?: number;
  [key: string]: unknown;
}
