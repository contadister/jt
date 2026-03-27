// lib/templates/index.ts
// Pre-built site templates for Josett

type AnyStyles = Record<string, unknown>;

// Using a relaxed type for template definitions to avoid SectionStyles constraints
type TemplateBuilderJSON = Record<string, unknown>;

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  siteType?: string;
  thumbnail: string; // emoji placeholder until real thumbnails
  primaryColor: string;
  secondaryColor: string;
  featured?: boolean;
  builderJson: TemplateBuilderJSON;
}

export const TEMPLATE_METAS = [
  { id: "business-classic", name: "Business Pro", description: "Clean professional layout for SMEs, agencies & service businesses.", category: "Business", thumbnail: "🏢" },
  { id: "restaurant", name: "Restaurant & Chop Bar", description: "Showcase your menu, hours and location. Perfect for chop bars, restaurants & cafes.", category: "Food & Drink", thumbnail: "🍽️" },
  { id: "portfolio", name: "Creative Portfolio", description: "Showcase your work as a designer, photographer, developer or creative.", category: "Portfolio", thumbnail: "🎨" },
  { id: "shop", name: "Online Shop", description: "Sell products online with Paystack checkout. Perfect for fashion, electronics & more.", category: "E-commerce", thumbnail: "🛍️" },
  { id: "ngo", name: "NGO / Nonprofit", description: "Raise awareness, collect donations and showcase your impact.", category: "NGO", thumbnail: "🤝" },
  { id: "blog", name: "Personal Blog", description: "Share your ideas, stories and expertise with the world.", category: "Blog", thumbnail: "✍️" },
  { id: "link-in-bio", name: "Link in Bio", description: "One link to share everything — socials, products, bookings and more.", category: "Social", thumbnail: "🔗" },
  { id: "event", name: "Event Landing Page", description: "Promote conferences, concerts, workshops and events with ticket links.", category: "Event", thumbnail: "🎪" },
  { id: "salon", name: "Salon & Beauty", description: "Elegant template for salons, spas, and beauty studios", category: "Beauty", thumbnail: "💅" },
  { id: "church", name: "Church & Ministry", description: "Welcoming template for churches and faith-based organisations", category: "Religious", thumbnail: "⛪" },
  { id: "school", name: "School & Education", description: "Professional template for schools, colleges, and tutoring centres", category: "Education", thumbnail: "🎓" },
  { id: "real-estate", name: "Real Estate", description: "Professional template for property agents and real estate companies", category: "Property", thumbnail: "🏠" },
  { id: "gym", name: "Gym & Fitness", description: "High-energy template for gyms, fitness studios, and personal trainers", category: "Health", thumbnail: "💪" },
  { id: "medical", name: "Medical Clinic", description: "Clean, trustworthy template for clinics, hospitals and healthcare providers", category: "Healthcare", thumbnail: "🩺" },
  { id: "photography", name: "Photography Portfolio", description: "Stunning visual portfolio for photographers and creative professionals", category: "Creative", thumbnail: "📷" },
  { id: "hotel", name: "Hotel & Accommodation", description: "Elegant template for hotels, guesthouses and Airbnb properties", category: "Hospitality", thumbnail: "🏨" },
  { id: "law-firm", name: "Law Firm", description: "Authoritative, professional template for lawyers and legal practices", category: "Professional", thumbnail: "⚖️" },
  { id: "tech-startup", name: "Tech Startup / SaaS", description: "Modern, bold template for tech startups and software products", category: "Technology", thumbnail: "🚀" },
  { id: "clothing-store", name: "Clothing & Fashion", description: "Trendy template for fashion boutiques and clothing stores", category: "Fashion", thumbnail: "👗" },
  { id: "car-dealer", name: "Car Dealership", description: "Professional template for car dealers and auto sales", category: "Automotive", thumbnail: "🚗" },
  { id: "cleaning", name: "Cleaning Service", description: "Fresh, clean template for cleaning and home services companies", category: "Services", thumbnail: "🧹" },
  { id: "catering", name: "Catering & Food Delivery", description: "Appetising template for caterers, food vendors and delivery services", category: "Food & Drink", thumbnail: "🍱" },
  { id: "barber", name: "Barbershop", description: "Sharp, masculine template for barbershops and grooming studios", category: "Beauty", thumbnail: "✂️" },
  { id: "event-planner", name: "Event Planning", description: "Vibrant template for event planners, decorators and coordinators", category: "Events", thumbnail: "🎉" },
  { id: "consultant", name: "Freelancer / Consultant", description: "Personal brand template for consultants, coaches and freelancers", category: "Personal", thumbnail: "💼" },
  { id: "pharmacy", name: "Pharmacy", description: "Clean, trustworthy template for pharmacies and chemists", category: "Healthcare", thumbnail: "💊" },
  { id: "logistics", name: "Logistics & Courier", description: "Professional template for courier, delivery and logistics companies", category: "Transport", thumbnail: "🚚" },
  { id: "interior-design", name: "Interior Design", description: "Elegant template for interior designers and home decor studios", category: "Creative", thumbnail: "🛋️" },
  { id: "printing", name: "Printing & Branding", description: "Template for print shops, branding and signage companies", category: "Business", thumbnail: "🖨️" },
  { id: "security", name: "Security Company", description: "Authoritative template for security firms and private guard services", category: "Services", thumbnail: "🛡️" },
  { id: "construction", name: "Construction & Building", description: "Solid, professional template for construction and contracting companies", category: "Business", thumbnail: "🏗️" },
  { id: "tutoring", name: "Online Tutoring", description: "Bright, engaging template for tutors, coaches and online educators", category: "Education", thumbnail: "📚" },
  { id: "spa-wellness", name: "Spa & Wellness", description: "Calming, luxurious template for spas, yoga studios and wellness centres", category: "Health", thumbnail: "🧘" },
  { id: "gaming-cafe", name: "Gaming Café / Esports", description: "High-energy template for gaming cafés, esports arenas and gaming centres", category: "Entertainment", thumbnail: "🎮" },
  { id: "beauty-cosmetics", name: "Beauty & Cosmetics", description: "Glamorous template for beauty brands, skincare lines and cosmetics shops", category: "Beauty", thumbnail: "💄" },
  { id: "auto-workshop", name: "Auto Workshop", description: "Bold template for car repair shops, mechanics and auto service centres", category: "Automotive", thumbnail: "🔧" },
  { id: "agriculture", name: "Agriculture & Farming", description: "Vibrant template for farms, agribusinesses and agricultural cooperatives", category: "Services", thumbnail: "🌾" },
  { id: "childcare", name: "Childcare & Daycare", description: "Warm, colourful template for creches, daycares and nursery schools", category: "Education", thumbnail: "🧸" },
  { id: "accounting-firm", name: "Accounting & Finance", description: "Professional template for accounting firms, auditors and financial advisors", category: "Professional", thumbnail: "📊" },
  { id: "music-band", name: "Music Artist / Band", description: "Dynamic dark template for musicians, DJs, bands and music producers", category: "Creative", thumbnail: "🎵" },
  { id: "vet-clinic", name: "Veterinary Clinic", description: "Friendly template for vet clinics, pet hospitals and animal care services", category: "Healthcare", thumbnail: "🐾" },
  { id: "wedding-planner", name: "Wedding Planner", description: "Elegant template for wedding planners, coordinators and event designers", category: "Events", thumbnail: "💍" },
  { id: "digital-agency", name: "Digital Marketing Agency", description: "Bold, modern template for agencies, studios and creative consultancies", category: "Business", thumbnail: "📈" },
  { id: "personal-trainer", name: "Personal Trainer / Coach", description: "High-energy template for fitness coaches, PTs and wellness coaches", category: "Health", thumbnail: "🏆" },
  { id: "travel-agency", name: "Travel Agency", description: "Vibrant template for travel agents, tour operators and holiday packages", category: "Services", thumbnail: "✈️" },
  { id: "dental-clinic", name: "Dental Clinic", description: "Clean, professional template for dentists and dental practices", category: "Healthcare", thumbnail: "🦷" },
  { id: "flower-shop", name: "Florist & Flower Shop", description: "Fresh, beautiful template for florists and flower delivery services", category: "Services", thumbnail: "🌸" },
  { id: "podcast", name: "Podcast / YouTube Channel", description: "Dynamic template for podcasters, YouTubers and content creators", category: "Creative", thumbnail: "🎙️" },
  { id: "online-academy", name: "Online Academy / Courses", description: "Professional template for online educators and course creators", category: "Education", thumbnail: "🎯" },
  { id: "recruitment", name: "Recruitment Agency", description: "Professional template for staffing agencies and headhunters", category: "Professional", thumbnail: "🤝" },
  { id: "insurance", name: "Insurance Broker", description: "Trustworthy template for insurance brokers and financial advisors", category: "Professional", thumbnail: "🛡️" },
  { id: "supermarket", name: "Supermarket / Grocery Store", description: "Fresh, vibrant template for supermarkets and grocery stores", category: "E-commerce", thumbnail: "🛒" },
  { id: "bakery", name: "Bakery & Pastry Shop", description: "Warm, delicious template for bakeries, cake shops and patisseries", category: "Food & Drink", thumbnail: "🎂" },
  { id: "jewellery", name: "Jewellery Store", description: "Luxurious template for jewellers and accessories boutiques", category: "Fashion", thumbnail: "💎" },
  { id: "physiotherapy", name: "Physiotherapy & Rehab", description: "Caring template for physiotherapists and rehabilitation centres", category: "Healthcare", thumbnail: "🏥" },
  { id: "architecture", name: "Architecture Firm", description: "Sleek, minimal template for architects and design firms", category: "Creative", thumbnail: "🏗️" },
  { id: "coworking", name: "Coworking Space", description: "Modern template for coworking spaces and business centres", category: "Business", thumbnail: "💼" },
  { id: "car-wash", name: "Car Wash & Detailing", description: "Clean, bold template for car wash services and auto detailing", category: "Automotive", thumbnail: "🚿" },
  { id: "language-school", name: "Language School", description: "Bright template for language institutes and tutoring centres", category: "Education", thumbnail: "🌍" },
  { id: "rooftop-bar", name: "Bar / Nightclub", description: "Atmospheric dark template for bars, clubs and entertainment venues", category: "Food & Drink", thumbnail: "🍸" },
  { id: "makeup-artist", name: "Makeup Artist / MUA", description: "Glamorous template for makeup artists and beauty professionals", category: "Beauty", thumbnail: "💋" },
] as const;

export type TemplateMeta = (typeof TEMPLATE_METAS)[number];

const BASE_SETTINGS = (name: string, primary: string) => ({
  siteName: name,
  primaryColor: primary,
  secondaryColor: "#8b5cf6",
  fontFamily: "Inter",
  seoTitle: name,
  seoDescription: "",
});

const BASE_GLOBAL = (primary: string) => ({
  primaryColor: primary,
  bodyBackground: "#ffffff",
  textColor: "#1e293b",
  fontFamily: "Inter,system-ui,sans-serif",
});

export const TEMPLATES: Template[] = [
  // ── Business / Corporate ──────────────────────────────────
  {
    id: "business-classic",
    name: "Business Pro",
    description: "Complete professional website for SMEs, agencies and service businesses",
    category: "Business",
    siteType: "BUSINESS",
    thumbnail: "🏢",
    primaryColor: "#6272f1",
    secondaryColor: "#8b5cf6",
    featured: true,
    builderJson: {
      version: "1",
      siteSettings: { siteName: "My Business", primaryColor: "#6272f1", secondaryColor: "#8b5cf6", fontFamily: "Inter, system-ui, sans-serif", seoTitle: "My Business – Professional Services", seoDescription: "We deliver professional services that grow your business." },
      globalStyles: { primaryColor: "#6272f1", bodyBackground: "#ffffff", textColor: "#1e293b", fontFamily: "Inter, system-ui, sans-serif" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "My Business – Professional Services", description: "We deliver results that matter. Trusted by 500+ clients across Ghana." },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "#ffffff", paddingTop: 0, paddingBottom: 0 },
            elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "My Business", links: [{ label: "Home", href: "/" }, { label: "Services", href: "#services" }, { label: "About", href: "#about" }, { label: "Pricing", href: "#pricing" }, { label: "Contact", href: "#contact" }], ctaText: "Get Started" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1e1b4b 0%,#6272f1 50%,#8b5cf6 100%)", paddingTop: 120, paddingBottom: 120 },
            elements: [
              { id: "h-tag", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "⭐ TRUSTED BY 500+ BUSINESSES ACROSS GHANA" } },
              { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#ffffff", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: "900", lineHeight: "1.1", letterSpacing: "-0.02em" }, content: { text: "Grow Your Business With Expert Services", level: "h1" } },
              { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.85)", fontSize: "1.2rem", margin: "24px auto", maxWidth: "650px", lineHeight: "1.8" }, content: { text: "We deliver professional, results-driven services that help Ghanaian businesses grow, compete and thrive. Join hundreds of satisfied clients." } },
              { id: "hb1", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", gap: "12px", marginTop: "40px" }, content: { text: "Get a Free Quote →", href: "#contact", variant: "primary" } }
            ] },
          { id: "s-logos", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 40, paddingBottom: 40 },
            elements: [
              { id: "lg-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#94a3b8", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.15em", marginBottom: "20px" }, content: { text: "TRUSTED BY BUSINESSES ACROSS GHANA" } },
              { id: "lg-l", type: "brand-logos", isVisible: true, isLocked: false, styles: {}, content: { heading: "", logos: [{ name: "GCB Bank" }, { name: "MTN Ghana" }, { name: "Melcom Group" }, { name: "Ecobank GH" }, { name: "GOIL Company" }] } }
            ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { background: "linear-gradient(135deg,#1e1b4b,#312e81)", paddingTop: 70, paddingBottom: 70 },
            elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "500+", label: "Happy Clients" }, { number: "12yrs", label: "In Business" }, { number: "98%", label: "Satisfaction Rate" }, { number: "24/7", label: "Support Available" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { backgroundColor: "#ffffff", paddingTop: 100, paddingBottom: 100 },
            elements: [
              { id: "sv-tag", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#6272f1", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.15em", marginBottom: "12px" }, content: { text: "WHAT WE DO" } },
              { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Services Built for Your Growth", level: "h2" } },
              { id: "sv-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "56px", maxWidth: "600px", margin: "0 auto 56px" }, content: { text: "Every service we offer is designed to deliver measurable results and real value for your business." } },
              { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
                { icon: "🎯", title: "Strategic Consulting", desc: "Business strategy, market analysis and growth planning tailored to your industry" },
                { icon: "📊", title: "Business Analytics", desc: "Data-driven insights that help you make better decisions and outperform competitors" },
                { icon: "🚀", title: "Digital Marketing", desc: "Social media, SEO, and paid ads campaigns that bring real customers to your door" },
                { icon: "💼", title: "Operations Management", desc: "Streamline your processes, reduce costs and improve efficiency across your operations" },
                { icon: "🌐", title: "Web & Digital Presence", desc: "Professional websites and digital tools that represent your brand beautifully online" },
                { icon: "🛡️", title: "Compliance & Legal", desc: "Navigate regulations, contracts and compliance with expert guidance and support" }
              ] } }
            ] },
          { id: "s-about", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 100, paddingBottom: 100 },
            elements: [
              { id: "ab1", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "12 Years of Making Businesses Grow", body: "We started in 2012 with a simple mission: to give Ghanaian businesses access to the kind of professional services that were previously only available to large corporations. Today, we have served over 500 clients across every industry — from startups to listed companies — and our results speak for themselves. We are not just service providers. We are your growth partners.", image: "", imageLeft: true } }
            ] },
          { id: "s-process", type: "section", isVisible: true, styles: { backgroundColor: "#ffffff", paddingTop: 100, paddingBottom: 100 },
            elements: [
              { id: "pr-tag", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#6272f1", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.15em", marginBottom: "12px" }, content: { text: "HOW WE WORK" } },
              { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "48px" }, content: { text: "Simple. Fast. Effective.", level: "h2" } },
              { id: "pr-s", type: "steps-process", isVisible: true, isLocked: false, styles: {}, content: { heading: "", steps: [
                { number: "1", title: "Free Consultation", desc: "Tell us about your business and goals. We listen first, then advise. No pressure, no commitment." },
                { number: "2", title: "Custom Proposal", desc: "We build a tailored plan with clear deliverables, timelines and transparent pricing." },
                { number: "3", title: "Execution", desc: "Our experienced team gets to work. You get regular updates and full transparency throughout." },
                { number: "4", title: "Results & Growth", desc: "We measure every outcome against your goals and continue to optimise for maximum impact." }
              ] } }
            ] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 100, paddingBottom: 100 },
            elements: [
              { id: "pk-tag", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#6272f1", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.15em", marginBottom: "12px" }, content: { text: "PRICING" } },
              { id: "pk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Transparent, Flexible Pricing", level: "h2" } },
              { id: "pk-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "56px" }, content: { text: "No hidden fees. No surprises. Pay only for what you need." } },
              { id: "pk-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [
                { name: "Starter", price: "GHS 500", period: "/month", features: ["Monthly strategy session", "Basic analytics report", "Email support", "1 service area"], cta: "Get Started" },
                { name: "Growth", price: "GHS 1,500", period: "/month", features: ["Weekly strategy sessions", "Full analytics dashboard", "Priority support", "3 service areas", "Marketing campaigns included"], cta: "Most Popular", highlighted: true },
                { name: "Enterprise", price: "Custom", period: "", features: ["Dedicated account manager", "Unlimited services", "Board-level reporting", "On-site visits included", "SLA guarantee"], cta: "Contact Us" }
              ] } }
            ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { background: "linear-gradient(135deg,#1e1b4b,#6272f1)", paddingTop: 100, paddingBottom: 100 },
            elements: [
              { id: "tm-tag", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.15em", marginBottom: "20px" }, content: { text: "CLIENT SUCCESS STORIES" } },
              { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "48px" }, content: { text: "Don't Take Our Word For It", level: "h2" } },
              { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "700px", margin: "0 auto" }, content: { quote: "Working with this team completely transformed how we operate. In 6 months our revenue grew by 40% and our operational costs dropped by 25%. They genuinely care about results — not just deliverables.", author: "Kwame Asante-Mensah", role: "CEO, Asante Trading Group", avatar: "" } }
            ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#ffffff", paddingTop: 100, paddingBottom: 100 },
            elements: [
              { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "48px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
              { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: { maxWidth: "720px", margin: "0 auto" }, content: { items: [
                { q: "How quickly can you get started?", a: "We typically begin within 2 business days of signing. For urgent projects we can start same day." },
                { q: "Do you offer payment plans?", a: "Yes! We offer flexible monthly retainers, milestone-based billing, and custom arrangements for long-term engagements." },
                { q: "What industries do you serve?", a: "We work across all industries including finance, retail, manufacturing, healthcare, tech, real estate, and NGOs." },
                { q: "How do you measure success?", a: "We agree on specific KPIs before starting — revenue growth, cost reduction, lead generation or other measurables. You see your ROI clearly." },
                { q: "Do you offer a refund if I'm not satisfied?", a: "We offer a money-back guarantee on our first month if we don't meet agreed deliverables. We are confident in our work." }
              ] } }
            ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { backgroundColor: "#f0fdf4", paddingTop: 70, paddingBottom: 70 },
            elements: [
              { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Prefer to Chat? We Reply in Minutes", level: "h2" } },
              { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "28px" }, content: { text: "Send us a WhatsApp message and get a response from a real person — not a bot." } },
              { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I found your business online and I'd like to discuss how you can help me grow my business.", label: "Chat With Us on WhatsApp" } }
            ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { backgroundColor: "#1e1b4b", paddingTop: 100, paddingBottom: 100 },
            elements: [
              { id: "ct-tag", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.15em", marginBottom: "12px" }, content: { text: "GET IN TOUCH" } },
              { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#ffffff", marginBottom: "12px" }, content: { text: "Let's Grow Your Business", level: "h2" } },
              { id: "ct-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.7)", marginBottom: "48px" }, content: { text: "Free consultation. No obligation. Just an honest conversation about your business." } },
              { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto" }, content: { formId: "contact", submitText: "Book Free Consultation", successMessage: "Thank you! We will call you within 24 hours.", fields: [
                { name: "name", label: "Full Name", type: "text", required: true },
                { name: "email", label: "Email Address", type: "email", required: true },
                { name: "phone", label: "Phone Number", type: "tel", required: true },
                { name: "company", label: "Company / Business Name", type: "text", required: false },
                { name: "service", label: "Service You're Interested In", type: "text", required: false },
                { name: "message", label: "Tell us about your goals", type: "textarea", required: false }
              ] } }
            ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { background: "linear-gradient(135deg,#6272f1,#8b5cf6)", paddingTop: 70, paddingBottom: 70 },
            elements: [{ id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: {}, content: { title: "Get free business tips & insights every week", placeholder: "Enter your email address", buttonLabel: "Subscribe Free" } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#0f0c29", paddingTop: 0, paddingBottom: 0 },
            elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: { color: "#64748b" }, content: { text: "© 2025 My Business. Professional services that deliver real results.", links: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }] } }] }
        ]
      }]
    }
  }

  // ── Restaurant ────────────────────────────────────────────
  {
    id: "restaurant",
    name: "Restaurant & Chop Bar",
    description: "Showcase your menu, hours and location. Perfect for chop bars, restaurants & cafes",
    category: "Food & Drink",
    siteType: "RESTAURANT",
    thumbnail: "🍽️",
    primaryColor: "#ef4444",
    secondaryColor: "#f97316",
    featured: true,
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Mama's Kitchen", primaryColor: "#ef4444", secondaryColor: "#f97316", fontFamily: "Georgia, serif", seoTitle: "Mama's Kitchen – Authentic Ghanaian Cuisine", seoDescription: "Fresh, authentic Ghanaian food made daily with love." },
      globalStyles: { primaryColor: "#ef4444", bodyBackground: "#fffdf9", textColor: "#1c0800", fontFamily: "Georgia, serif" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Mama's Kitchen – Authentic Ghanaian Cuisine", description: "Fresh, authentic Ghanaian food made daily with love in Accra." },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "#1a0000", paddingTop: 0, paddingBottom: 0 },
            elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { logo: "🍽️ Mama's Kitchen", links: [{ label: "Menu", href: "#menu" }, { label: "About", href: "#about" }, { label: "Hours", href: "#hours" }, { label: "Find Us", href: "#location" }], ctaText: "Order Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1a0000 0%,#7f1d1d 40%,#ef4444 100%)", paddingTop: 120, paddingBottom: 120 },
            elements: [
              { id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fca5a5", fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.1em", marginBottom: "20px" }, content: { text: "🌟 OPEN DAILY · FRESH INGREDIENTS · MADE WITH LOVE" } },
              { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: "800", fontStyle: "italic", lineHeight: "1.1" }, content: { text: "Authentic Ghanaian Cuisine", level: "h1" } },
              { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.85)", fontSize: "1.15rem", margin: "20px auto 40px", maxWidth: "580px", lineHeight: "1.8" }, content: { text: "Traditional recipes passed down through generations. Every dish tells a story — come taste the real Ghana." } },
              { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", gap: "16px" }, content: { text: "View Full Menu", href: "#menu", variant: "outline" } }
            ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#7f1d1d", paddingTop: 50, paddingBottom: 50 },
            elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fef2f2" }, content: { stats: [{ number: "15+", label: "Years Cooking" }, { number: "30+", label: "Dishes Daily" }, { number: "500+", label: "Happy Diners Weekly" }, { number: "4.9 ★", label: "Google Rating" }] } }] },
          { id: "s-specials", type: "section", isVisible: true, styles: { backgroundColor: "#fffdf9", paddingTop: 90, paddingBottom: 90 },
            elements: [
              { id: "sp-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#ef4444", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.15em", marginBottom: "12px" }, content: { text: "TODAY'S SPECIALS" } },
              { id: "sp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Chef's Recommendations", level: "h2" } },
              { id: "sp-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#92400e", marginBottom: "50px" }, content: { text: "Cooked fresh every morning with ingredients from local markets" } },
              { id: "sp-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
                { icon: "🍖", title: "Jollof Rice & Chicken", desc: "Our signature smoky jollof with grilled chicken, fried plantain & coleslaw — GHS 45" },
                { icon: "🐟", title: "Banku & Tilapia", desc: "Fermented corn dough with whole grilled tilapia, pepper sauce & garden egg — GHS 55" },
                { icon: "🥘", title: "Fufu & Groundnut Soup", desc: "Pounded cassava with rich groundnut soup and assorted meat — GHS 50" },
                { icon: "🍚", title: "Waakye", desc: "Rice & beans with sorghum leaves, stew, spaghetti, fish & boiled egg — GHS 30" },
                { icon: "🫕", title: "Light Soup & Ampesi", desc: "Boiled yam, plantain & cocoyam with fresh tomato light soup — GHS 40" },
                { icon: "🌽", title: "Tuo Zaafi", desc: "Northern specialty with ayoyo leaf soup and dried fish — GHS 35" }
              ] } }
            ] },
          { id: "s-menu", type: "section", isVisible: true, styles: { backgroundColor: "#fef2f2", paddingTop: 90, paddingBottom: 90 },
            elements: [
              { id: "mn-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Full Menu", level: "h2" } },
              { id: "mn-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#7f1d1d", marginBottom: "48px" }, content: { text: "All dishes prepared fresh to order" } },
              { id: "mn-s1", type: "menu-section", isVisible: true, isLocked: false, styles: {}, content: { title: "🍚 Rice & Stew Dishes", items: [
                { name: "Jollof Rice (Chicken)", description: "Smoky tomato rice with grilled chicken, salad & plantain", price: "GHS 45" },
                { name: "Jollof Rice (Fish)", description: "Smoky tomato rice with fried fish, salad & plantain", price: "GHS 40" },
                { name: "Fried Rice & Chicken", description: "Mixed vegetable rice, grilled chicken & coleslaw", price: "GHS 45" },
                { name: "Waakye Special", description: "Full waakye with stew, spaghetti, boiled egg, fish & wele", price: "GHS 35" }
              ] } },
              { id: "sp-12", type: "spacer", isVisible: true, isLocked: false, styles: {}, content: { height: 32 } },
              { id: "mn-s2", type: "menu-section", isVisible: true, isLocked: false, styles: {}, content: { title: "🥘 Soups & Fufu", items: [
                { name: "Fufu & Groundnut Soup", description: "Pounded cassava with rich groundnut soup, assorted meat & fish", price: "GHS 50" },
                { name: "Fufu & Palm Nut Soup", description: "Pounded cassava with fresh palm nut soup & chicken", price: "GHS 48" },
                { name: "Banku & Light Soup", description: "Fermented corn dough with fresh tomato light soup & meat", price: "GHS 42" },
                { name: "Tuo Zaafi & Ayoyo", description: "Northern millet paste with ayoyo leaf soup & dried fish", price: "GHS 35" }
              ] } }
            ] },
          { id: "s-about", type: "section", isVisible: true, styles: { backgroundColor: "#fffdf9", paddingTop: 90, paddingBottom: 90 },
            elements: [
              { id: "ab1", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "Cooking Since 2009 with Love", body: "Mama's Kitchen was founded by Maame Ama in 2009 in her family home in Accra. What started as cooking for neighbours grew into one of the most loved restaurants in the city. We use only fresh, locally sourced ingredients and cook every dish from scratch each morning. No shortcuts. No frozen food. Just real Ghanaian cooking the way your grandmother made it.", image: "", imageLeft: true } }
            ] },
          { id: "s-hours", type: "section", isVisible: true, styles: { backgroundColor: "#fef2f2", paddingTop: 80, paddingBottom: 80 },
            elements: [
              { id: "hr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Opening Hours", level: "h2" } },
              { id: "hr-el", type: "business-hours", isVisible: true, isLocked: false, styles: {}, content: { title: "", hours: [
                { day: "Monday – Friday", time: "7:00am – 9:00pm" },
                { day: "Saturday", time: "7:00am – 10:00pm" },
                { day: "Sunday", time: "9:00am – 8:00pm" }
              ] } }
            ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#7f1d1d", paddingTop: 80, paddingBottom: 80 },
            elements: [
              { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fef2f2", marginBottom: "40px" }, content: { text: "What Our Diners Say", level: "h2" } },
              { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "640px", margin: "0 auto" }, content: { quote: "The best jollof rice in Accra — full stop. The chicken is always perfectly grilled, the plantain is caramelised just right and the portions are generous. I bring every visiting friend and family member here!", author: "Akosua Frimpong", role: "Regular Diner, East Legon", avatar: "" } }
            ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#fffdf9", paddingTop: 80, paddingBottom: 80 },
            elements: [
              { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Good to Know", level: "h2" } },
              { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: { maxWidth: "680px", margin: "0 auto" }, content: { items: [
                { q: "Do you take reservations?", a: "Yes! WhatsApp or call us to reserve your table, especially for groups of 4+. Walk-ins are always welcome for available seats." },
                { q: "Do you offer delivery?", a: "Yes, we deliver within 5km. Minimum order GHS 50. Call or WhatsApp to place a delivery order." },
                { q: "Do you cater for events?", a: "Absolutely! We cater for weddings, funerals, corporate events and parties. Call for a custom quote." },
                { q: "Are there vegetarian options?", a: "Yes! We have vegetarian versions of waakye, vegetable fried rice, and vegetable kontomire stew." }
              ] } }
            ] },
          { id: "s-location", type: "section", isVisible: true, styles: { backgroundColor: "#1a0000", paddingTop: 80, paddingBottom: 80 },
            elements: [
              { id: "lc-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fef2f2", marginBottom: "12px" }, content: { text: "Find Us", level: "h2" } },
              { id: "lc-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fca5a5", marginBottom: "24px" }, content: { text: "📍 123 High Street, Osu, Accra · Open Daily 7am–10pm · 📞 +233 24 000 0000" } },
              { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginBottom: "32px" }, content: { number: "", message: "Hello Mama's Kitchen! I'd like to reserve a table / place an order.", label: "Reserve a Table on WhatsApp" } },
              { id: "mp-el", type: "map", isVisible: true, isLocked: false, styles: { borderRadius: "16px", overflow: "hidden" }, content: { address: "Osu, Accra, Ghana", zoom: 15 } }
            ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#0a0000" },
            elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: { color: "#7f1d1d" }, content: { text: "© 2025 Mama's Kitchen. Made with love since 2009.", links: [] } }] }
        ]
      }]
    }
  }

  // ── Portfolio ─────────────────────────────────────────────
  {
    id: "portfolio",
    name: "Creative Portfolio",
    description: "Showcase your work as a designer, photographer, developer or creative.",
    category: "Portfolio",
    siteType: "PORTFOLIO",
    thumbnail: "🎨",
    primaryColor: "#8b5cf6",
    secondaryColor: "#06b6d4",
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("My Portfolio", "#8b5cf6"), secondaryColor: "#06b6d4" },
      globalStyles: { ...BASE_GLOBAL("#8b5cf6"), bodyBackground: "#0f0a1e", textColor: "#f1f5f9" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Portfolio", description: "Creative portfolio" },
        sections: [
          { id: "hero", type: "hero", isVisible: true, styles: { backgroundColor: "#0f0a1e", paddingTop: 100, paddingBottom: 100 }, elements: [
            { id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "🏆 CREATIVE PROFESSIONAL BASED IN ACCRA" } },
              { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: "800", color: "#fff", textAlign: "center" }, content: { text: "Hello, I'm a Creative", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { color: "#94a3b8", textAlign: "center", fontSize: "1.2rem", margin: "16px 0 32px" }, content: { text: "Designer · Developer · Storyteller" } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: {}, content: { label: "View My Work ↓", href: "#work", variant: "primary" } }
          ]},
          { id: "work", type: "gallery", isVisible: true, styles: { backgroundColor: "#0f0a1e", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "w-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Selected Work", level: "h2" } },
            { id: "w-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ]},
          { id: "about", type: "about", isVisible: true, styles: { backgroundColor: "#1e1035", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "a-h", type: "heading", isVisible: true, isLocked: false, styles: { color: "#fff", marginBottom: "16px" }, content: { text: "About Me", level: "h2" } },
            { id: "a-t", type: "text", isVisible: true, isLocked: false, styles: { color: "#94a3b8", lineHeight: "1.8" }, content: { text: "I'm a creative professional based in Accra, Ghana. I craft beautiful digital experiences that help brands tell their story and connect with their audience." } }
          ]},
          { id: "contact", type: "contact", isVisible: true, styles: { backgroundColor: "#0f0a1e", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "c-h", type: "heading", isVisible: true, isLocked: false, styles: { color: "#fff", textAlign: "center", marginBottom: "40px" }, content: { text: "Let's Work Together", level: "h2" } },
            { id: "c-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { formId: "contact", submitLabel: "Send Message", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "project", label: "Project Description", type: "textarea", required: true }] } }
          ]},
          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1e1035" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "What Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Exceptional creative work. They delivered beyond our expectations and on time. Will definitely work together again!", author: "James Owusu", role: "Founder, Owusu Brands", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0f0a1e" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px", color: "#fff" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "What's your turnaround time?", a: "Most projects are completed within 5–10 business days depending on scope." },
              { q: "Do you work with international clients?", a: "Absolutely! I work with clients across Africa, Europe and North America." },
              { q: "Do you offer revisions?", a: "Yes, every project includes 2 rounds of revisions at no extra cost." },
              { q: "What file formats do you deliver?", a: "I deliver in all standard formats — AI, PSD, PDF, PNG, JPG, SVG and more." }
            ] } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#8b5cf6" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get design tips & portfolio updates", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] }
        ]
      }]
    }
  },

  // ── E-commerce ────────────────────────────────────────────
  {
    id: "shop",
    name: "Online Shop",
    description: "Sell products online with Paystack checkout. Perfect for fashion, electronics & more.",
    category: "E-commerce",
    siteType: "ECOMMERCE",
    thumbnail: "🛍️",
    primaryColor: "#10b981",
    secondaryColor: "#06b6d4",
    featured: true,
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("My Shop", "#10b981"), secondaryColor: "#06b6d4" },
      globalStyles: BASE_GLOBAL("#10b981"),
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "My Shop", description: "Shop the best products" },
        sections: [
          { id: "nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { links: [{ label: "Shop", href: "#products" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }] } }] },
          { id: "hero", type: "hero", isVisible: true, styles: {}, elements: [{ id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "🛍️ FREE DELIVERY IN ACCRA ON ALL ORDERS" } },
              { id: "h1", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Shop the Best Products", subtitle: "Quality goods delivered to your door. Free delivery in Accra.", buttonLabel: "Shop Now", buttonHref: "#products" } }] },
          { id: "newsletter", type: "newsletter", isVisible: true, styles: { backgroundColor: "#f0fdf4", paddingTop: 60, paddingBottom: 60 }, elements: [{ id: "nl", type: "newsletter-signup", isVisible: true, isLocked: false, styles: {}, content: { title: "Get exclusive deals in your inbox", buttonLabel: "Subscribe" } }] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Fast delivery, quality products and great customer service. Will definitely shop again!", author: "Abena Osei", role: "Online Shopper", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How long does delivery take?", a: "Accra deliveries take 1–2 days. Nationwide deliveries take 3–5 business days." },
              { q: "What payment methods do you accept?", a: "We accept mobile money (MTN, Vodafone), card payments and bank transfer." },
              { q: "Can I return a product?", a: "Yes! We accept returns within 7 days if the product is unused and in original packaging." },
              { q: "Is my payment secure?", a: "All payments are secured by Paystack, Ghana's most trusted payment processor." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to place an order.", label: "Message Us to Order" } }
          ] },
          { id: "footer", type: "footer", isVisible: true, styles: { backgroundColor: "#064e3b" }, elements: [{ id: "f1", type: "footer", isVisible: true, isLocked: false, styles: { color: "#6ee7b7" }, content: { text: "© 2025 My Shop. Secured by Paystack." } }] }
        ]
      }]
    }
  },

  // ── NGO / Nonprofit ───────────────────────────────────────
  {
    id: "ngo",
    name: "NGO / Nonprofit",
    description: "Raise awareness, collect donations and showcase your impact.",
    category: "NGO",
    siteType: "NGO",
    thumbnail: "🤝",
    primaryColor: "#f59e0b",
    secondaryColor: "#ef4444",
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("Our Organization", "#f59e0b"), secondaryColor: "#ef4444" },
      globalStyles: BASE_GLOBAL("#f59e0b"),
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Our Organization", description: "Making a difference" },
        sections: [
          { id: "hero", type: "hero", isVisible: true, styles: {}, elements: [{ id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "🌍 CREATING CHANGE IN OUR COMMUNITIES" } },
              { id: "h1", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Together We Can Make a Difference", subtitle: "Join us in creating lasting change in our communities.", buttonLabel: "Support Our Cause", buttonHref: "#donate" } }] },
          { id: "stats", type: "stats", isVisible: true, styles: { backgroundColor: "#fefce8", paddingTop: 60, paddingBottom: 60 }, elements: [{ id: "s1", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ value: "10,000+", label: "Lives Impacted" }, { value: "50+", label: "Communities" }, { value: "GHS 2M+", label: "Raised" }, { value: "200+", label: "Volunteers" }] } }] },
          { id: "mission", type: "mission", isVisible: true, styles: { paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "m-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "16px" }, content: { text: "Our Mission", level: "h2" } },
            { id: "m-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", maxWidth: "700px", margin: "0 auto", lineHeight: "1.8", color: "#475569" }, content: { text: "We are committed to improving education, health, and economic opportunities for underserved communities across Ghana. Every donation, every volunteer hour, every act of support brings us closer to a more equitable society." } }
          ]},
          { id: "cta", type: "cta", isVisible: true, styles: { backgroundColor: "#f59e0b", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "16px" }, content: { text: "Your Support Changes Lives", level: "h2" } },
            { id: "ct-b", type: "button", isVisible: true, isLocked: false, styles: {}, content: { label: "Donate Today", href: "#donate", variant: "outline" } }
          ]},

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "This organisation truly makes a difference. I've seen lives changed through their programmes. Proud to be part of this mission.", author: "Akosua Frimpong", role: "Community Volunteer", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How do I donate?", a: "You can donate online via our secure payment page or via mobile money. All donations are receipted." },
              { q: "Is my donation tax-deductible?", a: "Yes, we are a registered NGO and can provide documentation for tax purposes." },
              { q: "How do I volunteer?", a: "Fill in the contact form and mention you'd like to volunteer. We'll get back to you within 48 hours." },
              { q: "Where does my money go?", a: "100% of donations go directly to our programmes. Our admin costs are covered by grants." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to know more about your work and how I can support.", label: "Contact Our Team" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Stay updated on our impact & latest news", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "footer", type: "footer", isVisible: true, styles: { backgroundColor: "#1c1917" }, elements: [{ id: "f1", type: "footer", isVisible: true, isLocked: false, styles: { color: "#a8a29e" }, content: { text: "© 2025 Our Organization. Registered NGO." } }] }
        ]
      }]
    }
  },

  // ── Personal Blog ─────────────────────────────────────────
  {
    id: "blog",
    name: "Personal Blog",
    description: "Share your ideas, stories and expertise with the world.",
    category: "Blog",
    siteType: "BLOG",
    thumbnail: "✍️",
    primaryColor: "#6272f1",
    secondaryColor: "#ec4899",
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("My Blog", "#6272f1"), secondaryColor: "#ec4899" },
      globalStyles: BASE_GLOBAL("#6272f1"),
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "My Blog", description: "Thoughts, stories and ideas" },
        sections: [
          { id: "nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { links: [{ label: "Home", href: "/" }, { label: "Blog", href: "#posts" }, { label: "About", href: "#about" }] } }] },
          { id: "hero", type: "hero", isVisible: true, styles: {}, elements: [{ id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "✍️ THOUGHTS, STORIES & IDEAS FROM GHANA" } },
              { id: "h1", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Welcome to My Corner of the Internet", subtitle: "Thoughts on tech, life, and everything in between.", buttonLabel: "Read My Posts ↓", buttonHref: "#posts" } }] },
          { id: "newsletter", type: "newsletter", isVisible: true, styles: { backgroundColor: "#faf5ff", paddingTop: 60, paddingBottom: 60 }, elements: [{ id: "nl", type: "newsletter-signup", isVisible: true, isLocked: false, styles: {}, content: { title: "Never miss a new post", placeholder: "your@email.com", buttonLabel: "Subscribe" } }] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "One of the best blogs I've come across. Insightful, authentic and always well-written. I look forward to every new post!", author: "Kofi Boateng", role: "Loyal Reader", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How often do you post?", a: "I publish new content every week — usually on Tuesdays." },
              { q: "Can I submit a guest post?", a: "Yes! I welcome guest contributions. Send me an email with your idea." },
              { q: "How do I support the blog?", a: "Share my posts, subscribe to the newsletter, or buy me a coffee via the link below!" },
              { q: "Can I republish your articles?", a: "Please contact me first. I'm open to syndication with proper attribution." }
            ] } }
          ] },
          { id: "footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "f1", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 My Blog. Written with ❤️ from Ghana." } }] }
        ]
      }]
    }
  },

  // ── Link in Bio ───────────────────────────────────────────
  {
    id: "link-in-bio",
    name: "Link in Bio",
    description: "One link to share everything — socials, products, bookings and more.",
    category: "Social",
    siteType: "LINK_IN_BIO",
    thumbnail: "🔗",
    primaryColor: "#ec4899",
    secondaryColor: "#8b5cf6",
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("My Links", "#ec4899"), secondaryColor: "#8b5cf6" },
      globalStyles: { ...BASE_GLOBAL("#ec4899"), bodyBackground: "#fdf2f8" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "My Links", description: "All my links in one place" },
        sections: [{
          id: "bio", type: "bio", isVisible: true,
          styles: { backgroundColor: "#fdf2f8", paddingTop: 60, paddingBottom: 60 },
          elements: [{
            id: "lib1", type: "link-in-bio", isVisible: true, isLocked: false,
            styles: {},
            content: {
              name: "Your Name",
              bio: "Content creator · Entrepreneur · 🇬🇭",
              links: [
                { label: "🛍️ Shop My Products", url: "#" },
                { label: "📅 Book a Session", url: "#" },
                { label: "📱 Follow on Instagram", url: "#" },
                { label: "🎵 My TikTok", url: "#" },
                { label: "💼 Work With Me", url: "#" },
              ]
            }
          }],
        },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff9fb" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Questions?", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How do I update my links?", a: "Just click any link in the builder and update the URL to point to your page." },
              { q: "Can I add more links?", a: "Yes! In the builder you can add as many link buttons as you need." },
              { q: "Can I sell products from here?", a: "Yes — add a button that links to your product or shop page." },
              { q: "Can people contact me from here?", a: "Add a WhatsApp button or contact form from the builder's Add Sections menu." }
            ] } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#ec4899" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Subscribe for exclusive content & updates", placeholder: "Enter your email", buttonLabel: "Subscribe" } }
          ] }
        ]
      }]
    }
  },

  // ── Event / Landing ───────────────────────────────────────
  {
    id: "event",
    name: "Event Landing Page",
    description: "Promote conferences, concerts, workshops and events with ticket links.",
    category: "Event",
    siteType: "EVENT",
    thumbnail: "🎪",
    primaryColor: "#f97316",
    secondaryColor: "#ef4444",
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("My Event", "#f97316"), secondaryColor: "#ef4444" },
      globalStyles: { ...BASE_GLOBAL("#f97316"), bodyBackground: "#0c0a09", textColor: "#f5f5f4" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "My Event", description: "Join us for an unforgettable experience" },
        sections: [
          { id: "hero", type: "hero", isVisible: true, styles: { backgroundColor: "#0c0a09", paddingTop: 100, paddingBottom: 60 }, elements: [
            { id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "🎪 LIMITED TICKETS — DON'T MISS OUT" } },
              { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: "800" }, content: { text: "🎪 Event Name 2025", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#d6d3d1", fontSize: "1.2rem", margin: "12px 0 20px" }, content: { text: "📅 March 15, 2025 · 📍 Accra International Conference Centre" } },
            { id: "cd", type: "countdown", isVisible: true, isLocked: false, styles: { margin: "32px 0" }, content: { title: "Event starts in:", targetDate: "2025-03-15T09:00:00" } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: {}, content: { label: "Get Your Ticket →", href: "#tickets", variant: "primary" } }
          ]},
          { id: "speakers", type: "speakers", isVisible: true, styles: { backgroundColor: "#1c1917", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "sp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Speakers & Guests", level: "h2" } }
          ]},

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "One of the best events I've attended! Perfectly organised, amazing speakers and great networking. Can't wait for next year!", author: "Sandra Ofori", role: "Previous Attendee", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Where is the venue?", a: "The event will be held at the Accra International Conference Centre. Parking is available." },
              { q: "What's included in the ticket?", a: "All tickets include access to all sessions, networking lunch and event materials." },
              { q: "Can I transfer my ticket?", a: "Yes, tickets are transferable. Contact us at least 48 hours before the event." },
              { q: "Is there a refund policy?", a: "Full refund up to 14 days before the event. 50% refund up to 7 days before." }
            ] } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get event updates & early bird ticket alerts", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "footer", type: "footer", isVisible: true, styles: { backgroundColor: "#0c0a09" }, elements: [{ id: "f1", type: "footer", isVisible: true, isLocked: false, styles: { color: "#a8a29e" }, content: { text: "© 2025 Event Name. All rights reserved." } }] }
        ]
      }]
    }
  },
  {
    id: "salon",
    name: "Salon & Beauty",
    description: "Elegant, stunning template for salons, beauty studios and spas",
    category: "Beauty",
    thumbnail: "💅",
    primaryColor: "#d4488a",
    secondaryColor: "#fce7f3",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Glam Studio", primaryColor: "#d4488a", secondaryColor: "#fce7f3", fontFamily: "Georgia, serif", seoTitle: "Glam Studio – Premium Beauty & Salon", seoDescription: "Accra's premier beauty salon. Hair, nails, facials and more." },
      globalStyles: { primaryColor: "#d4488a", bodyBackground: "#fff9fb", textColor: "#1a0010", fontFamily: "Georgia, serif" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Glam Studio – Premium Beauty & Salon in Accra", description: "Professional hair, nails, skincare and makeup services. Book your appointment today." },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "rgba(255,249,251,0.97)", paddingTop: 0, paddingBottom: 0 },
            elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Glam Studio", links: [{ label: "Services", href: "#services" }, { label: "Gallery", href: "#gallery" }, { label: "Prices", href: "#prices" }, { label: "Book", href: "#book" }], ctaText: "Book Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#500724 0%,#be185d 50%,#d4488a 80%,#f9a8d4 100%)", paddingTop: 120, paddingBottom: 120 },
            elements: [
              { id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fce7f3", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "24px" }, content: { text: "✨ ACCRA'S PREMIER BEAUTY DESTINATION" } },
              { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: "300", letterSpacing: "0.05em", lineHeight: "1.1" }, content: { text: "Where Beauty Meets Luxury", level: "h1" } },
              { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.88)", fontSize: "1.15rem", margin: "24px auto 44px", maxWidth: "580px", lineHeight: "1.9" }, content: { text: "Professional hair styling, nail art, skincare and makeup services in a luxurious, relaxing environment. Walk away feeling extraordinary." } },
              { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { text: "Book Your Appointment", href: "#book", variant: "outline" } }
            ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#500724", paddingTop: 50, paddingBottom: 50 },
            elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fce7f3" }, content: { stats: [{ number: "2,000+", label: "Happy Clients" }, { number: "8yrs", label: "In Business" }, { number: "4.9 ★", label: "Average Rating" }, { number: "100%", label: "Natural Products" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { backgroundColor: "#fff9fb", paddingTop: 100, paddingBottom: 100 },
            elements: [
              { id: "sv-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#d4488a", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.15em", marginBottom: "12px" }, content: { text: "OUR SPECIALTIES" } },
              { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Indulge in Our Treatments", level: "h2" } },
              { id: "sv-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#9d174d", marginBottom: "56px" }, content: { text: "Every treatment uses premium, skin-safe products for stunning results" } },
              { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
                { icon: "💇", title: "Hair Styling & Treatments", desc: "Cuts, colouring, relaxers, deep conditioning, blow-dry, braiding & protective styles" },
                { icon: "💅", title: "Nail Art & Extensions", desc: "Gel, acrylic, dip powder, nail art designs, manicure & pedicure with paraffin treatment" },
                { icon: "✨", title: "Facials & Skincare", desc: "Deep cleansing facials, brightening treatments, microdermabrasion & gua sha massage" },
                { icon: "💄", title: "Makeup & Glam", desc: "Bridal makeup, event glam, airbrush makeup and makeup lessons" },
                { icon: "🧖", title: "Body Treatments", desc: "Full body massage, waxing, body scrubs and hot stone therapy" },
                { icon: "👁️", title: "Lashes & Brows", desc: "Lash extensions, lash lifts, brow lamination, threading & tinting" }
              ] } }
            ] },
          { id: "s-prices", type: "section", isVisible: true, styles: { backgroundColor: "#fdf2f8", paddingTop: 90, paddingBottom: 90 },
            elements: [
              { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "56px" }, content: { text: "Our Price List", level: "h2" } },
              { id: "pr-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [
                { name: "Hair", price: "From GHS 80", period: "", features: ["Blow dry & style", "Relaxer treatment", "Braiding (from GHS 120)", "Colouring (from GHS 200)", "Deep conditioning"], cta: "Book Hair" },
                { name: "Nails & Skin", price: "From GHS 60", period: "", features: ["Classic manicure/pedicure", "Gel nails (from GHS 100)", "Facial (from GHS 120)", "Body wax (from GHS 80)", "Eyelash extensions (GHS 150)"], cta: "Book Beauty", highlighted: true },
                { name: "Bridal Package", price: "From GHS 800", period: "", features: ["Bridal makeup", "Hair styling", "Manicure & pedicure", "Trial session", "Bridal party discounts"], cta: "Book Bridal" }
              ] } }
            ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { backgroundColor: "#500724", paddingTop: 90, paddingBottom: 90 },
            elements: [
              { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fce7f3", marginBottom: "40px" }, content: { text: "Our Work", level: "h2" } },
              { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
            ] },
          { id: "s-process", type: "section", isVisible: true, styles: { backgroundColor: "#fff9fb", paddingTop: 80, paddingBottom: 80 },
            elements: [
              { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "48px" }, content: { text: "How to Book", level: "h2" } },
              { id: "pr-s", type: "steps-process", isVisible: true, isLocked: false, styles: {}, content: { heading: "", steps: [
                { number: "1", title: "Choose Your Service", desc: "Browse our menu and pick the treatment(s) you'd like. Combine multiple for a full glam day!" },
                { number: "2", title: "Book Your Slot", desc: "Fill in the booking form below or WhatsApp us. We'll confirm within 30 minutes." },
                { number: "3", title: "Come In & Relax", desc: "Arrive 5 minutes before your appointment. Enjoy complimentary drinks while we work our magic." },
                { number: "4", title: "Leave Glowing", desc: "Walk out looking and feeling extraordinary. Your satisfaction is guaranteed." }
              ] } }
            ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { background: "linear-gradient(135deg,#be185d,#d4488a)", paddingTop: 80, paddingBottom: 80 },
            elements: [
              { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Our Clients Love Us", level: "h2" } },
              { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "640px", margin: "0 auto" }, content: { quote: "I wouldn't go anywhere else! The nail technicians are incredibly skilled — my nail art always gets compliments. The atmosphere is luxurious and the staff treat you like royalty. My go-to salon for 5 years!", author: "Efua Boateng-Asante", role: "Loyal Client since 2019", avatar: "" } }
            ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#fdf2f8", paddingTop: 80, paddingBottom: 80 },
            elements: [
              { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
              { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: { maxWidth: "680px", margin: "0 auto" }, content: { items: [
                { q: "Do I need to book in advance?", a: "Booking is strongly recommended, especially on weekends. We do accept walk-ins for quick services when slots are available." },
                { q: "How long do appointments take?", a: "Simple services (nails, eyebrows) take 30-60 minutes. Hair and full glam packages can take 2-4 hours. We always give time estimates when booking." },
                { q: "Do you use quality products?", a: "Yes! We use only professional-grade, dermatologically tested products including OPI, Essie, Wella and Dermalogica." },
                { q: "What is your cancellation policy?", a: "Please cancel at least 24 hours in advance. Late cancellations may incur a 50% charge to cover the reserved slot." }
              ] } }
            ] },
          { id: "s-hours", type: "section", isVisible: true, styles: { backgroundColor: "#fff9fb", paddingTop: 60, paddingBottom: 60 },
            elements: [
              { id: "hr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Opening Hours", level: "h2" } },
              { id: "hr-el", type: "business-hours", isVisible: true, isLocked: false, styles: {}, content: { title: "", hours: [
                { day: "Monday – Friday", time: "8:00am – 7:00pm" },
                { day: "Saturday", time: "8:00am – 8:00pm" },
                { day: "Sunday", time: "10:00am – 5:00pm" }
              ] } }
            ] },
          { id: "s-book", type: "section", isVisible: true, styles: { backgroundColor: "#d4488a", paddingTop: 90, paddingBottom: 90 },
            elements: [
              { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "12px" }, content: { text: "Book Your Appointment", level: "h2" } },
              { id: "bk-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.85)", marginBottom: "40px" }, content: { text: "Monday – Sunday. Available slots confirmed within 30 minutes." } },
              { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "560px", margin: "0 auto" }, content: { formId: "booking", submitText: "Request Appointment", successMessage: "Thank you! We will confirm your slot within 30 minutes.", fields: [
                { name: "name", label: "Your Name", type: "text", required: true },
                { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true },
                { name: "service", label: "Service(s) Requested", type: "text", required: true },
                { name: "date", label: "Preferred Date & Time", type: "text", required: true },
                { name: "notes", label: "Any special requests?", type: "textarea", required: false }
              ] } }
            ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { backgroundColor: "#500724", paddingTop: 60, paddingBottom: 60 },
            elements: [
              { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fce7f3", marginBottom: "24px" }, content: { text: "Or Book on WhatsApp", level: "h3" } },
              { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello Glam Studio! I'd like to book an appointment.", label: "Book via WhatsApp" } }
            ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { background: "linear-gradient(135deg,#d4488a,#be185d)", paddingTop: 60, paddingBottom: 60 },
            elements: [{ id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: {}, content: { title: "Get exclusive offers & beauty tips", placeholder: "Your email address", buttonLabel: "Subscribe" } }] },
          { id: "s-compare", type: "section", isVisible: true, styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#f8fafc" }, elements: [
            { id: "cmp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "See the Difference", level: "h2" } },
            { id: "cmp-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "Real results from our clients" } },
            { id: "cmp-el", type: "image-compare", isVisible: true, isLocked: false, styles: {}, content: { beforeImage: "", afterImage: "", beforeLabel: "Before Your Visit", afterLabel: "After Your Treatment" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#1a0010" },
            elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: { color: "#9d174d" }, content: { text: "© 2025 Glam Studio. Where beauty meets luxury.", links: [] } }] }
        ]
      }]
    }
  }
  {
    id: "church",
    name: "Church & Ministry",
    description: "Welcoming template for churches and faith-based organisations",
    category: "Religious",
    thumbnail: "⛪",
    primaryColor: "#1d4ed8",
    secondaryColor: "#dbeafe",
    builderJson: {
      siteSettings: { siteName: "Grace Community Church", primaryColor: "#1d4ed8", secondaryColor: "#dbeafe", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#f8faff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Grace Community Church", description: "A place of worship, community and hope" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Grace Church", links: [{ label: "About", href: "#about" }, { label: "Services", href: "#services" }, { label: "Events", href: "#events" }, { label: "Give", href: "#give" }], ctaText: "Visit Us" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1d4ed8 0%,#3b82f6 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Welcome Home", subtitle: "Join us every Sunday at 8:30am & 11:00am. Everyone is welcome.", ctaText: "Plan Your Visit", ctaHref: "#visit", image: "" } }] },
          { id: "s-about", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "ab-it", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "About Our Church", body: "Grace Community Church is a vibrant, inclusive congregation committed to worship, discipleship, and serving our community. Founded in 1985, we've grown into a family of over 500 members across Accra.", image: "", imageLeft: true } }
          ] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8faff" }, elements: [
            { id: "svc-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Service Times", level: "h2" } },
            { id: "svc-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🌅", title: "Sunday Morning", desc: "8:30am & 11:00am — Main Sanctuary" }, { icon: "🌙", title: "Wednesday Evening", desc: "6:30pm — Bible Study & Prayer" }, { icon: "👨‍👩‍👧", title: "Youth Service", desc: "Sunday 11:00am — Youth Chapel" }, { icon: "🙏", title: "Online Service", desc: "Stream live on YouTube" }] } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#1d4ed8" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "500+", label: "Members" }, { number: "38", label: "Years Serving" }, { number: "12", label: "Ministries" }, { number: "200+", label: "Volunteers" }] } }] },
          { id: "s-give", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff", textAlign: "center" }, elements: [
            { id: "gv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Give & Support", level: "h2" } },
            { id: "gv-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px", maxWidth: "600px", margin: "0 auto 24px" }, content: { text: "Your generosity helps us serve the community, run our programs, and share the gospel." } },
            { id: "gv-b", type: "button", isVisible: true, isLocked: false, styles: {}, content: { label: "Give Online", href: "#give", variant: "primary" } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8faff" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Contact Us", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "message", label: "Message", type: "textarea", required: true }], submitText: "Send Message" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "This church feels like family. The worship, the sermons and the community have transformed my life. I'm grateful every day.", author: "Brother Emmanuel Asare", role: "Church Member, 10 years", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "What should I wear?", a: "Come as you are! We welcome everyone regardless of how they're dressed." },
              { q: "Is there parking?", a: "Yes, we have ample parking available. Arrive early on Sundays." },
              { q: "Are children welcome?", a: "Absolutely! We have a dedicated children's ministry running during all Sunday services." },
              { q: "How can I get more involved?", a: "Talk to any of our pastors after the service or fill in the contact form — we'd love to have you!" }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to know more about Grace Community Church.", label: "Contact the Church" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get our weekly sermon notes & church updates", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Grace Community Church. All are welcome.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "school",
    name: "School & Education",
    description: "Professional template for schools, colleges, and tutoring centres",
    category: "Education",
    thumbnail: "🎓",
    primaryColor: "#059669",
    secondaryColor: "#d1fae5",
    builderJson: {
      siteSettings: { siteName: "Bright Futures Academy", primaryColor: "#059669", secondaryColor: "#d1fae5", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0fdf4" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Bright Futures Academy", description: "Quality education for the next generation" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Bright Futures Academy", links: [{ label: "About", href: "#about" }, { label: "Programmes", href: "#programmes" }, { label: "Admissions", href: "#admissions" }, { label: "Contact", href: "#contact" }], ctaText: "Apply Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#059669 0%,#34d399 100%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Shaping Tomorrow's Leaders", subtitle: "Quality nursery, primary, and secondary education with a focus on excellence, character and innovation.", ctaText: "Apply for Admission", ctaHref: "#admissions", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "1,200+", label: "Students" }, { number: "98%", label: "Pass Rate" }, { number: "45", label: "Teachers" }, { number: "25yrs", label: "Experience" }] } }] },
          { id: "s-progs", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0fdf4" }, elements: [
            { id: "pg-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Our Programmes", level: "h2" } },
            { id: "pg-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🎒", title: "Nursery (Ages 2–4)", desc: "Play-based learning in a nurturing environment" }, { icon: "📚", title: "Primary (JHS)", desc: "Strong foundations in literacy, numeracy & science" }, { icon: "🎓", title: "Secondary (SHS)", desc: "WAEC-focused curriculum with extracurriculars" }, { icon: "💻", title: "ICT & STEM", desc: "Modern computing and STEM lab facilities" }] } }
          ] },
          { id: "s-admissions", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "ad-it", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "Admissions Open", body: "We accept applications year-round for all levels. Our admissions process is simple and welcoming. Contact us to schedule a visit or download our prospectus.", image: "", imageLeft: false } },
            { id: "ad-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "24px auto 0" }, content: { title: "Enquire About Admission", fields: [{ name: "parent", label: "Parent Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "level", label: "Level Applying For", type: "text", required: true }, { name: "message", label: "Additional Notes", type: "textarea", required: false }], submitText: "Submit Enquiry" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "My daughter has thrived since joining this school. The teachers are dedicated and the learning environment is exceptional. Highly recommended!", author: "Mr. Kwesi Adu", role: "Parent of Form 2 Student", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "What are the school fees?", a: "Fees vary by level. Please contact our admissions office for a detailed fee schedule." },
              { q: "Do you offer scholarships?", a: "Yes, we offer merit-based scholarships for exceptional students. Enquire with admissions." },
              { q: "Is there a school bus?", a: "Yes, we have school buses covering major routes. Contact us for the route schedule." },
              { q: "What's the student-to-teacher ratio?", a: "We maintain a ratio of 25:1 to ensure every student gets individual attention." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to enquire about admission to your school.", label: "Contact Admissions" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get school news, events & term dates", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Bright Futures Academy. Excellence in Education.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "real-estate",
    name: "Real Estate",
    description: "Professional template for property agents and real estate companies",
    category: "Property",
    thumbnail: "🏠",
    primaryColor: "#0f4c81",
    secondaryColor: "#dbeafe",
    builderJson: {
      siteSettings: { siteName: "Prime Properties GH", primaryColor: "#0f4c81", secondaryColor: "#dbeafe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f8faff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Prime Properties Ghana – Buy, Sell & Rent", description: "Ghana's trusted real estate agency" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Prime Properties GH", links: [{ label: "Buy", href: "#buy" }, { label: "Rent", href: "#rent" }, { label: "Sell", href: "#sell" }, { label: "About", href: "#about" }], ctaText: "Contact Agent" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0f4c81 0%,#1e6fbc 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Find Your Dream Home in Ghana", subtitle: "From luxury apartments in Accra to beachfront villas in Takoradi — we connect you with the best properties.", ctaText: "Browse Listings", ctaHref: "#listings", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "500+", label: "Properties Listed" }, { number: "1,200+", label: "Happy Clients" }, { number: "12", label: "Cities Covered" }, { number: "15yrs", label: "Experience" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8faff" }, elements: [
            { id: "svc-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Our Services", level: "h2" } },
            { id: "svc-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🏠", title: "Residential Sales", desc: "Houses, apartments & land across Ghana" }, { icon: "🏢", title: "Commercial Leasing", desc: "Office & retail space for businesses" }, { icon: "📋", title: "Property Management", desc: "Full management for landlords" }, { icon: "🔑", title: "Rentals", desc: "Short & long-term rental listings" }] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Featured Properties", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0f4c81" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px", color: "#fff" }, content: { text: "Talk to an Agent", level: "h2" } },
            { id: "ct-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", marginBottom: "32px" }, content: { text: "Tell us what you're looking for and we'll find the perfect match." } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "budget", label: "Budget (GHS)", type: "text", required: false }, { name: "message", label: "What are you looking for?", type: "textarea", required: true }], submitText: "Send Enquiry" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "The team found us our dream home in just 3 weeks! Professional, patient and incredibly knowledgeable about the Accra market. 10/10!", author: "Mrs. Adwoa Dankwa", role: "Homebuyer, Accra", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do you charge a buyer's fee?", a: "No, buyers pay no fees. Our commission is paid by the seller." },
              { q: "Can you help with mortgages?", a: "Yes, we work with several banks and can refer you to a mortgage advisor." },
              { q: "How long does the process take?", a: "A typical purchase takes 4–8 weeks from viewing to completion." },
              { q: "Do you handle legal paperwork?", a: "Yes, we work with trusted lawyers who handle all documentation from start to finish." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'm looking for a property and would like some assistance.", label: "Chat With an Agent" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get new property listings & market updates", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Prime Properties GH. Licensed Real Estate Agency.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "gym",
    name: "Gym & Fitness",
    description: "High-energy template for gyms, fitness studios, and personal trainers",
    category: "Health",
    thumbnail: "💪",
    primaryColor: "#dc2626",
    secondaryColor: "#fee2e2",
    builderJson: {
      siteSettings: { siteName: "PowerFit Gym", primaryColor: "#dc2626", secondaryColor: "#fee2e2", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#0f0f0f", textColor: "#f1f5f9" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "PowerFit Gym – Train Hard. Live Strong.", description: "Ghana's premier fitness facility" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { background: "#111", borderBottom: "1px solid #333" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "PowerFit", links: [{ label: "Classes", href: "#classes" }, { label: "Membership", href: "#membership" }, { label: "Trainers", href: "#trainers" }, { label: "Contact", href: "#contact" }], ctaText: "Join Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#7f1d1d 0%,#dc2626 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Train Hard.\nLive Strong.", subtitle: "State-of-the-art equipment, expert trainers, and a community that pushes you to your limits.", ctaText: "Start Free Trial", ctaHref: "#membership", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#1a1a1a" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "2,000+", label: "Members" }, { number: "50+", label: "Classes Weekly" }, { number: "20", label: "Expert Trainers" }, { number: "24/7", label: "Open Access" }] } }] },
          { id: "s-classes", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#111" }, elements: [
            { id: "cl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Our Classes", level: "h2" } },
            { id: "cl-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🥊", title: "Boxing", desc: "High-intensity boxing and cardio kickboxing classes" }, { icon: "🏋️", title: "Weight Training", desc: "Strength building and powerlifting sessions" }, { icon: "🧘", title: "Yoga & Pilates", desc: "Flexibility, balance and mind-body wellness" }, { icon: "🚴", title: "Spin Cycling", desc: "High-energy indoor cycling classes" }, { icon: "💪", title: "HIIT", desc: "Burn fat fast with high-intensity interval training" }, { icon: "🏃", title: "Functional Fitness", desc: "Real-world movement and athletic conditioning" }] } }
          ] },
          { id: "s-membership", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0f0f0f" }, elements: [
            { id: "mp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Membership Plans", level: "h2" } },
            { id: "mp-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Basic", price: "150", period: "/month", features: ["Gym Floor Access", "Locker Room", "2 Classes/week"], cta: "Get Started" }, { name: "Pro", price: "250", period: "/month", features: ["Unlimited Classes", "Personal Trainer (2x/month)", "Nutrition Consultation", "Pool Access"], cta: "Most Popular", highlighted: true }, { name: "Elite", price: "400", period: "/month", features: ["Everything in Pro", "Daily PT Sessions", "Meal Plan", "Priority Booking"], cta: "Go Elite" }] } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1a1a1a" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Start Your Journey", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "goal", label: "Your Fitness Goal", type: "text", required: false }], submitText: "Claim Free Trial" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "This gym changed my life. The trainers push you in the best way and the facilities are top-notch. I've lost 20kg and gained so much confidence!", author: "Nana Boateng", role: "Member for 2 Years", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Can I try before I join?", a: "Yes! We offer a free 3-day trial. Come in with your ID to get started." },
              { q: "Are there class timetables?", a: "Yes, check our schedule board or download our timetable PDF from reception." },
              { q: "Do you offer personal training?", a: "Yes, we have certified personal trainers available for 1-on-1 sessions at an extra cost." },
              { q: "Is there a joining fee?", a: "No joining fee during our current promotion. Just pay the monthly membership." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'm interested in joining PowerFit Gym. Can I get more information?", label: "Talk to a Trainer" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get workout tips, class updates & member offers", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-hours", type: "section", isVisible: true, styles: { paddingTop: 70, paddingBottom: 70, backgroundColor: "#fff" }, elements: [
            { id: "hr-el", type: "business-hours", isVisible: true, isLocked: false, styles: {}, content: { title: "Opening Hours", hours: [{ day: "Monday – Friday", time: "5:00am – 10:00pm" }, { day: "Saturday", time: "6:00am – 8:00pm" }, { day: "Sunday", time: "8:00am – 6:00pm" }, { day: "Public Holidays", time: "8:00am – 4:00pm" }] } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: { color: "#94a3b8" }, content: { text: "© 2025 PowerFit Gym. Train Hard. Live Strong.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "medical",
    name: "Medical Clinic",
    description: "Clean, trustworthy template for clinics, hospitals and healthcare providers",
    category: "Healthcare",
    thumbnail: "🩺",
    primaryColor: "#0891b2",
    secondaryColor: "#cffafe",
    builderJson: {
      siteSettings: { siteName: "HealthCare Clinic", primaryColor: "#0891b2", secondaryColor: "#cffafe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0fdfe" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "HealthCare Clinic – Your Health, Our Priority", description: "Quality medical care for the whole family" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "HealthCare Clinic", links: [{ label: "Services", href: "#services" }, { label: "Doctors", href: "#doctors" }, { label: "Book", href: "#book" }, { label: "Contact", href: "#contact" }], ctaText: "Book Appointment" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0891b2 0%,#06b6d4 100%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Your Health, Our Priority", subtitle: "Comprehensive primary care, specialist consultations, and diagnostic services — all under one roof.", ctaText: "Book an Appointment", ctaHref: "#book", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Our Medical Services", level: "h2" } },
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🩺", title: "General Consultation", desc: "Primary care for adults and children" }, { icon: "🧪", title: "Laboratory", desc: "Blood tests, urinalysis & diagnostic imaging" }, { icon: "💊", title: "Pharmacy", desc: "In-house dispensary with certified pharmacists" }, { icon: "🤱", title: "Maternal Care", desc: "Antenatal, delivery and postnatal services" }, { icon: "🦷", title: "Dental", desc: "Routine checkups, fillings and extractions" }, { icon: "🧠", title: "Mental Health", desc: "Counselling and psychiatric support" }] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0fdfe" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Book an Appointment", level: "h2" } },
            { id: "bk-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "32px" }, content: { text: "Available Monday–Friday 8am–6pm, Saturday 9am–2pm" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Patient Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "service", label: "Service Needed", type: "text", required: true }, { name: "message", label: "Describe your concern", type: "textarea", required: false }], submitText: "Request Appointment" } }
          ] },
          { id: "s-map", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "mp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "24px" }, content: { text: "Find Us", level: "h2" } },
            { id: "mp-m", type: "map", isVisible: true, isLocked: false, styles: {}, content: { address: "Accra, Ghana", zoom: 14 } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "The doctors here are thorough, compassionate and take time to explain everything. I always feel in good hands. Excellent care!", author: "Maame Esi Darko", role: "Patient", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do I need an appointment?", a: "Appointments are preferred but we do accept walk-in patients for emergencies." },
              { q: "Do you accept health insurance?", a: "Yes, we accept most major health insurance plans. Contact us to confirm your provider." },
              { q: "What are your consultation fees?", a: "General consultation starts from GHS 80. Specialist fees vary. Call for details." },
              { q: "Do you have a pharmacy?", a: "Yes, we have an in-house pharmacy for your convenience." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to book an appointment at the clinic.", label: "Book an Appointment" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get health tips & clinic news", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-hours", type: "section", isVisible: true, styles: { paddingTop: 70, paddingBottom: 70, backgroundColor: "#fff" }, elements: [
            { id: "hr-el", type: "business-hours", isVisible: true, isLocked: false, styles: {}, content: { title: "Opening Hours", hours: [{ day: "Monday – Friday", time: "8:00am – 6:00pm" }, { day: "Saturday", time: "9:00am – 2:00pm" }, { day: "Sunday", time: "Emergency only" }, { day: "24/7 Emergency Line", time: "Always available" }] } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 HealthCare Clinic. Caring for Ghana.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "photography",
    name: "Photography Portfolio",
    description: "Stunning visual portfolio for photographers and creative professionals",
    category: "Creative",
    thumbnail: "📷",
    primaryColor: "#1a1a1a",
    secondaryColor: "#f5f5f5",
    builderJson: {
      siteSettings: { siteName: "Lens & Light Photography", primaryColor: "#1a1a1a", secondaryColor: "#f5f5f5", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Lens & Light Photography", description: "Professional photography for weddings, portraits, and events" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { borderBottom: "1px solid #e2e8f0" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Lens & Light", links: [{ label: "Portfolio", href: "#portfolio" }, { label: "Services", href: "#services" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }], ctaText: "Book a Shoot" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { padding: "100px 40px", background: "#111" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Every Frame\nTells a Story", subtitle: "Professional photography for weddings, portraits, corporate events and brand campaigns across Ghana.", ctaText: "View Portfolio", ctaHref: "#portfolio", image: "" } }] },
          { id: "s-portfolio", type: "section", isVisible: true, styles: { padding: "60px 40px" }, elements: [
            { id: "pf-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Portfolio", level: "h2" } },
            { id: "pf-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What I Shoot", level: "h2" } },
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "💍", title: "Weddings", desc: "Cinematic wedding photography & videography" }, { icon: "👤", title: "Portraits", desc: "Individual, family & executive headshots" }, { icon: "🎉", title: "Events", desc: "Corporate, birthday, graduation & funerals" }, { icon: "📱", title: "Content Creation", desc: "Product & brand photography for social media" }] } }
          ] },
          { id: "s-testimonials", type: "section", isVisible: true, styles: { padding: "60px 40px" }, elements: [
            { id: "ts-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Client Love", level: "h2" } },
            { id: "ts-t", type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "Absolutely breathtaking photos. Everyone at our wedding was blown away. Worth every pesewa!", author: "Ama & Kweku Mensah", role: "Wedding Clients" } }
          ] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Packages", level: "h2" } },
            { id: "pr-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Portrait", price: "500", period: "/ session", features: ["2-hour shoot", "50 edited photos", "Online gallery", "Print-ready files"], cta: "Book Now" }, { name: "Event", price: "1,200", period: "/ event", features: ["Full day coverage", "200+ edited photos", "Video highlights", "USB drive"], cta: "Book Now", highlighted: true }, { name: "Wedding", price: "3,500", period: "/ wedding", features: ["2 photographers", "10-hour coverage", "500+ photos", "Drone footage", "Album"], cta: "Enquire" }] } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Book a Shoot", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "type", label: "Type of Shoot", type: "text", required: true }, { name: "date", label: "Preferred Date", type: "text", required: false }, { name: "message", label: "Tell me more", type: "textarea", required: false }], submitText: "Send Enquiry" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "What's your turnaround time?", a: "Most shoots are delivered within 5–7 business days. Rushed delivery available." },
              { q: "Do you travel for shoots?", a: "Yes! I travel across Ghana and internationally for destination shoots." },
              { q: "Do you offer video as well?", a: "Yes, I offer videography packages. Ask for combined photography + video pricing." },
              { q: "What rights do I get to the images?", a: "You receive full commercial rights to all delivered images." }
            ] } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Lens & Light Photography. Capturing Ghana's best moments.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "hotel",
    name: "Hotel & Accommodation",
    description: "Elegant template for hotels, guesthouses and Airbnb properties",
    category: "Hospitality",
    thumbnail: "🏨",
    primaryColor: "#78350f",
    secondaryColor: "#fef3c7",
    builderJson: {
      siteSettings: { siteName: "The Grand Hotel GH", primaryColor: "#78350f", secondaryColor: "#fef3c7", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fffbf0" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "The Grand Hotel Ghana – Luxury Accommodation", description: "Experience luxury hospitality in the heart of Accra" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "The Grand Hotel", links: [{ label: "Rooms", href: "#rooms" }, { label: "Amenities", href: "#amenities" }, { label: "Dining", href: "#dining" }, { label: "Book", href: "#book" }], ctaText: "Book Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#78350f 0%,#b45309 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Luxury Redefined", subtitle: "Experience the finest hospitality in Accra. Breathtaking views, world-class amenities, unforgettable stays.", ctaText: "Reserve Your Room", ctaHref: "#book", image: "" } }] },
          { id: "s-amenities", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "am-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Hotel Amenities", level: "h2" } },
            { id: "am-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🏊", title: "Swimming Pool", desc: "Olympic-size heated pool with pool bar" }, { icon: "🍽️", title: "Fine Dining", desc: "International and Ghanaian cuisine" }, { icon: "💆", title: "Spa & Wellness", desc: "Full-service spa, sauna and gym" }, { icon: "🅿️", title: "Free Parking", desc: "Secured parking for all guests" }, { icon: "📶", title: "Fast WiFi", desc: "Complimentary high-speed WiFi" }, { icon: "🚗", title: "Airport Transfer", desc: "Luxury shuttle service available" }] } }
          ] },
          { id: "s-rooms", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fffbf0" }, elements: [
            { id: "rm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Rooms & Suites", level: "h2" } },
            { id: "rm-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Standard Room", price: "450", period: "/ night", features: ["King Bed", "City View", "Free Breakfast", "WiFi", "TV"], cta: "Book" }, { name: "Deluxe Suite", price: "850", period: "/ night", features: ["King Bed + Living Area", "Ocean View", "Free Breakfast", "Minibar", "Butler Service"], cta: "Book", highlighted: true }, { name: "Presidential", price: "2,500", period: "/ night", features: ["3-Bedroom Suite", "Private Pool", "Personal Chef", "24/7 Concierge", "Airport Limo"], cta: "Enquire" }] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Gallery", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#78350f" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Make a Reservation", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "checkin", label: "Check-in Date", type: "text", required: true }, { name: "checkout", label: "Check-out Date", type: "text", required: true }, { name: "guests", label: "Number of Guests", type: "text", required: true }, { name: "room", label: "Room Type", type: "text", required: false }], submitText: "Request Booking" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Exceptional stay! The rooms are beautiful, staff are incredibly welcoming and the breakfast is outstanding. My go-to whenever I'm in Accra.", author: "Mr. David Owusu", role: "Business Traveller", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "What time is check-in/check-out?", a: "Check-in from 2pm, check-out by 12pm. Early/late options available on request." },
              { q: "Is breakfast included?", a: "Breakfast is included in all room rates. Enjoy our daily buffet from 6:30am." },
              { q: "Do you have airport transfers?", a: "Yes, we offer airport pickup and drop-off for a small fee. Book in advance." },
              { q: "Is there free WiFi?", a: "Yes, complimentary high-speed WiFi is available throughout the property." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to enquire about a room reservation.", label: "Book a Room" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get exclusive rates & special offers", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 The Grand Hotel Ghana. Luxury Hospitality.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "law-firm",
    name: "Law Firm",
    description: "Authoritative, professional template for lawyers and legal practices",
    category: "Professional",
    thumbnail: "⚖️",
    primaryColor: "#1e293b",
    secondaryColor: "#f1f5f9",
    builderJson: {
      siteSettings: { siteName: "Agyei & Partners Legal", primaryColor: "#1e293b", secondaryColor: "#f1f5f9", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#f8fafc" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Agyei & Partners Legal – Expert Legal Counsel", description: "Trusted legal expertise in corporate, civil and criminal law" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { borderBottom: "3px solid #c9a84c" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Agyei & Partners", links: [{ label: "Practice Areas", href: "#practice" }, { label: "Our Team", href: "#team" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }], ctaText: "Free Consultation" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1e293b 0%,#334155 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Justice. Integrity. Results.", subtitle: "Ghana's trusted legal firm serving corporations, individuals and government institutions since 1998.", ctaText: "Book Free Consultation", ctaHref: "#contact", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#c9a84c" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "25+", label: "Years Experience" }, { number: "2,000+", label: "Cases Won" }, { number: "15", label: "Attorneys" }, { number: "98%", label: "Success Rate" }] } }] },
          { id: "s-logos", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "lg-el", type: "brand-logos", isVisible: true, isLocked: false, styles: {}, content: { heading: "Trusted By Leading Businesses", logos: [
              { name: "Stanbic Bank" }, { name: "MTN Ghana" }, { name: "Vodafone GH" }, { name: "Melcom Group" }, { name: "Accra Mall" }
            ] } }
          ] },
                   { id: "s-practice", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "pa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Practice Areas", level: "h2" } },
            { id: "pa-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🏢", title: "Corporate Law", desc: "Company formation, mergers & commercial contracts" }, { icon: "⚖️", title: "Litigation", desc: "Civil, criminal and arbitration representation" }, { icon: "🏠", title: "Property Law", desc: "Conveyancing, land disputes and leases" }, { icon: "👨‍👩‍👧", title: "Family Law", desc: "Divorce, child custody and inheritance" }, { icon: "🌍", title: "Immigration", desc: "Visa applications and work permits" }, { icon: "💼", title: "Employment Law", desc: "Labour disputes and workplace rights" }] } }
          ] },
          { id: "s-about", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "ab-it", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "Why Choose Us", body: "Founded in 1998 by Senior Partner Kwame Agyei, our firm has built an unrivalled reputation for excellence in Ghana's legal landscape. We combine deep local expertise with international best practices to deliver results that matter.", image: "", imageLeft: false } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1e293b" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px", color: "#fff" }, content: { text: "Get Legal Advice", level: "h2" } },
            { id: "ct-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.7)", marginBottom: "32px" }, content: { text: "Book a free 30-minute consultation with one of our attorneys." } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "area", label: "Legal Issue (brief description)", type: "textarea", required: true }], submitText: "Request Consultation" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Knowledgeable, professional and always available. They handled our contract dispute with expertise and achieved a great outcome. Highly recommend.", author: "Mr. Fiifi Mensah", role: "Corporate Client", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do you offer a free initial consultation?", a: "Yes, we offer a 30-minute free consultation for new clients. Book via our contact form." },
              { q: "What areas of law do you practise?", a: "We specialise in corporate law, property law, family law, and commercial disputes." },
              { q: "How are your fees structured?", a: "We offer hourly rates, fixed fees and retainer arrangements depending on the matter." },
              { q: "Can you represent clients outside Ghana?", a: "Yes, we handle international arbitration and can collaborate with overseas counsel." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I have a legal matter I'd like to discuss with your firm.", label: "Speak to an Attorney" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get legal tips & firm updates", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Agyei & Partners Legal. All rights reserved. Not legal advice.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "tech-startup",
    name: "Tech Startup / SaaS",
    description: "Modern, bold template for tech startups and software products",
    category: "Technology",
    thumbnail: "🚀",
    primaryColor: "#7c3aed",
    secondaryColor: "#ede9fe",
    builderJson: {
      siteSettings: { siteName: "LaunchPad", primaryColor: "#7c3aed", secondaryColor: "#ede9fe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#ffffff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "LaunchPad – Build, Ship, Grow", description: "The all-in-one platform for modern businesses" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "LaunchPad", links: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }, { label: "About", href: "#about" }], ctaText: "Start Free Trial" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#4c1d95 0%,#7c3aed 60%,#a78bfa 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Build Faster.\nShip Smarter.\nGrow Bigger.", subtitle: "The complete platform to launch and scale your digital business. No code required.", ctaText: "Start Free — No Card Needed", ctaHref: "#signup", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#faf5ff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "10,000+", label: "Users" }, { number: "50K+", label: "Sites Built" }, { number: "99.9%", label: "Uptime" }, { number: "4.9★", label: "Rating" }] } }] },
          { id: "s-logos", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "lg-el", type: "brand-logos", isVisible: true, isLocked: false, styles: {}, content: { heading: "Trusted By Leading Businesses", logos: [
              { name: "Stanbic Bank" }, { name: "MTN Ghana" }, { name: "Vodafone GH" }, { name: "Melcom Group" }, { name: "Accra Mall" }
            ] } }
          ] },
                   { id: "s-features", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fe-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Everything You Need", level: "h2" } },
            { id: "fe-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "One platform. Every feature. Zero headaches." } },
            { id: "fe-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "⚡", title: "Lightning Fast", desc: "Sub-second load times on every device, everywhere" }, { icon: "🎨", title: "Beautiful by Default", desc: "Pro-grade templates designed by experts" }, { icon: "🔌", title: "100+ Integrations", desc: "Connect with tools you already use" }, { icon: "📊", title: "Real-time Analytics", desc: "Know exactly what's working and why" }, { icon: "🔒", title: "Enterprise Security", desc: "SSL, 2FA and data encryption built in" }, { icon: "💬", title: "24/7 Support", desc: "Live chat support whenever you need it" }] } }
          ] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#faf5ff" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Simple Pricing", level: "h2" } },
            { id: "pr-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Starter", price: "29", period: "/month", features: ["1 Website", "5GB Storage", "Custom Domain", "SSL Certificate", "Basic Analytics"], cta: "Start Free" }, { name: "Pro", price: "79", period: "/month", features: ["5 Websites", "50GB Storage", "All Starter Features", "Advanced Analytics", "Priority Support", "Remove Branding"], cta: "Most Popular", highlighted: true }, { name: "Scale", price: "199", period: "/month", features: ["Unlimited Sites", "500GB Storage", "White-label", "API Access", "Dedicated Manager"], cta: "Contact Sales" }] } }
          ] },
          { id: "s-cta", type: "section", isVisible: true, styles: { padding: "80px 40px", background: "linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)", textAlign: "center" }, elements: [
            { id: "cta-h", type: "heading", isVisible: true, isLocked: false, styles: { color: "#fff", textAlign: "center", marginBottom: "12px" }, content: { text: "Ready to Launch?", level: "h2" } },
            { id: "cta-t", type: "text", isVisible: true, isLocked: false, styles: { color: "rgba(255,255,255,0.8)", textAlign: "center", marginBottom: "24px" }, content: { text: "Join 10,000+ businesses already growing with LaunchPad." } },
            { id: "cta-b", type: "button", isVisible: true, isLocked: false, styles: {}, content: { label: "Get Started Free", href: "#signup", variant: "outline" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Their platform saved us weeks of development time. The support team is fantastic and the product keeps getting better. Game-changer!", author: "Ama Asante-Frimpong", role: "Founder, Afri-Tech Solutions", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Is there a free trial?", a: "Yes! All plans include a 14-day free trial. No credit card required." },
              { q: "Can I cancel anytime?", a: "Yes, cancel anytime with no penalties. We believe in earning your business every month." },
              { q: "Do you offer custom integrations?", a: "Yes, our API allows custom integrations. Our developer docs are publicly available." },
              { q: "Where is my data stored?", a: "Your data is stored on secure, encrypted servers with 99.9% uptime guaranteed." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'm interested in your platform and have a few questions.", label: "Chat With Our Team" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get product updates & early access to new features", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 LaunchPad Technologies. Built with ❤️ in Ghana.", links: [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] } }] }
        ]
      }]
    }
  },

  {
    id: "clothing-store",
    name: "Clothing & Fashion",
    description: "Trendy template for fashion boutiques and clothing stores",
    category: "Fashion",
    thumbnail: "👗",
    primaryColor: "#be185d",
    secondaryColor: "#fce7f3",
    builderJson: {
      siteSettings: { siteName: "Kente & Co.", primaryColor: "#be185d", secondaryColor: "#fce7f3", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#fff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Kente & Co. – African Fashion & Style", description: "Premium Ghanaian and African fashion" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Kente & Co.", links: [{ label: "Women", href: "#women" }, { label: "Men", href: "#men" }, { label: "New In", href: "#new" }, { label: "Sale", href: "#sale" }], ctaText: "Shop Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#9d174d 0%,#be185d 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "African Fashion,\nReimagined", subtitle: "Premium kente, ankara and contemporary African styles. Designed in Accra, worn worldwide.", ctaText: "Shop the Collection", ctaHref: "#shop", image: "" } }] },
          { id: "s-new", type: "section", isVisible: true, styles: { padding: "60px 40px" }, elements: [
            { id: "nw-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "New Arrivals", level: "h2" } },
            { id: "nw-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 4 } }
          ] },
          { id: "s-cats", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff9fb" }, elements: [
            { id: "ct-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Shop by Category", features: [{ icon: "👗", title: "Women's Wear", desc: "Dresses, tops, wraps & occasion wear" }, { icon: "👔", title: "Men's Wear", desc: "Shirts, trousers & traditional attire" }, { icon: "👶", title: "Kids", desc: "Adorable African prints for little ones" }, { icon: "👜", title: "Accessories", desc: "Bags, jewellery & headwraps" }] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "20px 40px", background: "#fff" }, elements: [{ id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi! I'd like to order from Kente & Co." } }] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#be185d" }, elements: [{ id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get 10% Off Your First Order", placeholder: "Enter your email", buttonText: "Subscribe" } }] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Absolutely love the quality and style! My outfit arrived perfectly packed and looked exactly like the photos. Will definitely order again!", author: "Efua Asante", role: "Fashion Lover, Kumasi", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do you offer delivery nationwide?", a: "Yes! We deliver across Ghana. Accra delivery in 1–2 days, nationwide in 3–5 days." },
              { q: "What sizes do you carry?", a: "We stock sizes XS to 3XL. Check each product page for the size guide." },
              { q: "Can I return or exchange?", a: "Yes, returns and exchanges accepted within 7 days. Item must be unworn with tags." },
              { q: "Do you accept custom orders?", a: "Yes! We do custom orders for events, uniforms and corporate wear. Contact us for pricing." }
            ] } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Kente & Co. African Fashion.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "car-dealer",
    name: "Car Dealership",
    description: "Professional template for car dealers and auto sales",
    category: "Automotive",
    thumbnail: "🚗",
    primaryColor: "#1e3a5f",
    secondaryColor: "#dbeafe",
    builderJson: {
      siteSettings: { siteName: "Premier Auto GH", primaryColor: "#1e3a5f", secondaryColor: "#dbeafe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f1f5f9" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Premier Auto GH – Quality Cars for Sale", description: "New and used cars for sale in Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Premier Auto GH", links: [{ label: "New Cars", href: "#new" }, { label: "Used Cars", href: "#used" }, { label: "Finance", href: "#finance" }, { label: "Contact", href: "#contact" }], ctaText: "Browse Stock" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Drive Your Dream Car Today", subtitle: "Ghana's trusted auto dealer. Over 200 vehicles in stock. Flexible financing available.", ctaText: "View Inventory", ctaHref: "#inventory", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "200+", label: "Cars in Stock" }, { number: "5,000+", label: "Happy Buyers" }, { number: "15yrs", label: "In Business" }, { number: "12mo", label: "Warranty" }] } }] },
          { id: "s-why", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f1f5f9" }, elements: [
            { id: "wy-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Why Buy From Us", features: [{ icon: "✅", title: "Certified Pre-Owned", desc: "Every used car is thoroughly inspected" }, { icon: "💳", title: "Flexible Finance", desc: "Low deposits and easy monthly payments" }, { icon: "🔧", title: "Free Servicing", desc: "First service free on every purchase" }, { icon: "📋", title: "Clear Documentation", desc: "All papers, customs & duties sorted" }] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Current Stock", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1e3a5f" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Enquire About a Car", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "budget", label: "Budget (GHS)", type: "text", required: false }, { name: "message", label: "Car you're interested in", type: "textarea", required: true }], submitText: "Send Enquiry" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Bought my Toyota Corolla from here last year — best decision ever! Transparent pricing, no hidden fees and the paperwork was handled smoothly. Very professional.", author: "Mr. Yaw Darko", role: "Car Buyer", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do you offer financing?", a: "Yes, we work with leading banks to offer vehicle financing. Enquire for details." },
              { q: "Do you accept trade-ins?", a: "Yes, we accept trade-ins and will give you a fair market valuation." },
              { q: "Are all cars inspected?", a: "Yes, all vehicles undergo a full mechanical inspection before listing." },
              { q: "Do you have foreign-used and brand-new cars?", a: "Yes, we stock brand new, foreign-used and Ghanaian-used vehicles across all budgets." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'm interested in a car and would like more information.", label: "Enquire About a Car" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get new stock alerts & special deals", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Premier Auto GH. Drive with confidence.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "cleaning",
    name: "Cleaning Service",
    description: "Fresh, clean template for cleaning and home services companies",
    category: "Services",
    thumbnail: "🧹",
    primaryColor: "#0369a1",
    secondaryColor: "#e0f2fe",
    builderJson: {
      siteSettings: { siteName: "SparkleClean GH", primaryColor: "#0369a1", secondaryColor: "#e0f2fe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0f9ff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "SparkleClean GH – Professional Cleaning Services", description: "Residential and commercial cleaning across Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "SparkleClean", links: [{ label: "Services", href: "#services" }, { label: "Pricing", href: "#pricing" }, { label: "About", href: "#about" }, { label: "Book", href: "#book" }], ctaText: "Get Free Quote" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0369a1 0%,#0ea5e9 100%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "A Cleaner Home,\nA Happier Life", subtitle: "Professional cleaning services for homes, offices and commercial spaces across Ghana. Trusted by 1,000+ customers.", ctaText: "Book a Clean", ctaHref: "#book", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "🏠", title: "Home Cleaning", desc: "Regular and deep cleaning for all room sizes" }, { icon: "🏢", title: "Office Cleaning", desc: "Daily, weekly or one-off commercial cleaning" }, { icon: "🛋️", title: "Sofa & Carpet", desc: "Steam cleaning and stain removal" }, { icon: "🪟", title: "Window Cleaning", desc: "Spotless windows inside and out" }, { icon: "🏗️", title: "Post-Construction", desc: "Site clearance and builder's clean" }, { icon: "🎉", title: "Event Cleaning", desc: "Before and after event cleaning" }] } }
          ] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0f9ff" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Transparent Pricing", level: "h2" } },
            { id: "pr-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Basic Clean", price: "150", period: "/ session", features: ["Up to 2 bedrooms", "Kitchen & bathrooms", "Dusting & vacuuming", "2 cleaners"], cta: "Book Now" }, { name: "Deep Clean", price: "350", period: "/ session", features: ["Full house", "Inside appliances", "Carpet cleaning", "4 cleaners", "3 hours"], cta: "Most Popular", highlighted: true }, { name: "Monthly Plan", price: "500", period: "/ month", features: ["4 visits/month", "Priority booking", "Free supplies", "Dedicated team"], cta: "Subscribe" }] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Book a Clean", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "address", label: "Property Address", type: "text", required: true }, { name: "type", label: "Type of Clean", type: "text", required: true }, { name: "date", label: "Preferred Date", type: "text", required: false }], submitText: "Request Booking" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "My house has never been cleaner! The team were professional, thorough and very respectful of our home. Will definitely use again. Highly recommend!", author: "Mrs. Patricia Asante", role: "Homeowner, East Legon", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do I need to be home during the clean?", a: "No, many clients give us a key or code. We are fully insured and trustworthy." },
              { q: "What products do you use?", a: "We use eco-friendly, non-toxic cleaning products — safe for children and pets." },
              { q: "How do I book?", a: "Fill in our contact form or send us a WhatsApp and we'll schedule at a convenient time." },
              { q: "Do you offer regular contracts?", a: "Yes! We offer weekly, bi-weekly and monthly contracts at discounted rates." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to book a cleaning service.", label: "Book a Cleaning" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get cleaning tips & special offers", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-compare", type: "section", isVisible: true, styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#f8fafc" }, elements: [
            { id: "cmp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "See the Difference", level: "h2" } },
            { id: "cmp-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "Real results from our clients" } },
            { id: "cmp-el", type: "image-compare", isVisible: true, isLocked: false, styles: {}, content: { beforeImage: "", afterImage: "", beforeLabel: "Before Cleaning", afterLabel: "Spotlessly Clean" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 SparkleClean GH. We clean so you don't have to.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "catering",
    name: "Catering & Food Delivery",
    description: "Appetising template for caterers, food vendors and delivery services",
    category: "Food & Drink",
    thumbnail: "🍱",
    primaryColor: "#b45309",
    secondaryColor: "#fef3c7",
    builderJson: {
      siteSettings: { siteName: "Mama's Kitchen", primaryColor: "#b45309", secondaryColor: "#fef3c7", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fffbeb" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Mama's Kitchen – Catering & Food Delivery", description: "Authentic Ghanaian food for events and daily delivery" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Mama's Kitchen", links: [{ label: "Menu", href: "#menu" }, { label: "Catering", href: "#catering" }, { label: "Order", href: "#order" }, { label: "Contact", href: "#contact" }], ctaText: "Order Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#78350f 0%,#b45309 100%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Authentic Ghanaian Food,\nDelivered Fresh", subtitle: "Home-cooked jollof, waakye, fufu and more. Daily delivery + event catering across Accra.", ctaText: "See Our Menu", ctaHref: "#menu", image: "" } }] },
          { id: "s-menu", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "mn-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Today's Menu", level: "h2" } },
            { id: "mn-m", type: "menu-section", isVisible: true, isLocked: false, styles: {}, content: { title: "", items: [{ name: "Jollof Rice + Chicken", description: "Party jollof with grilled chicken and coleslaw", price: "GHS 35" }, { name: "Waakye Special", description: "Waakye with eggs, spaghetti, fried fish and stew", price: "GHS 30" }, { name: "Fufu & Light Soup", description: "Fresh pounded fufu with goat light soup", price: "GHS 40" }, { name: "Fried Rice & Tilapia", description: "Chinese-style fried rice with whole tilapia", price: "GHS 45" }] } }
          ] },
          { id: "s-catering", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fffbeb" }, elements: [
            { id: "ct-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Event Catering", features: [{ icon: "💍", title: "Weddings", desc: "Full catering packages for up to 500 guests" }, { icon: "🎂", title: "Birthdays", desc: "Party packs, buffets and cake services" }, { icon: "🏢", title: "Corporate", desc: "Office lunches, meetings and conferences" }, { icon: "⛪", title: "Funerals & Outdooring", desc: "Traditional Ghanaian funeral catering" }] } }
          ] },
          { id: "s-order", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "or-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Place an Order", level: "h2" } },
            { id: "or-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "address", label: "Delivery Address", type: "text", required: true }, { name: "order", label: "What would you like to order?", type: "textarea", required: true }, { name: "time", label: "Delivery Time", type: "text", required: false }], submitText: "Send Order" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px 40px" }, elements: [{ id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi! I'd like to place a food order." } }] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "The food was absolutely amazing! Every dish was fresh, beautifully presented and the guests couldn't stop complimenting it. Will use for every event!", author: "Mrs. Adjoa Okyere", role: "Event Host", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How far in advance should I book?", a: "We recommend booking at least 2 weeks in advance for events, 24hrs for regular orders." },
              { q: "Do you cater for dietary requirements?", a: "Yes, we accommodate vegetarian, vegan, gluten-free and allergy-specific requests." },
              { q: "What's included in your catering package?", a: "All packages include food, serving equipment, and a dedicated serving team." },
              { q: "What's your minimum order?", a: "Minimum order for event catering is 20 guests. Food delivery minimum is GHS 50." }
            ] } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get our weekly menu & special event packages", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Mama's Kitchen. Cooked with love.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "barber",
    name: "Barbershop",
    description: "Sharp, masculine template for barbershops and grooming studios",
    category: "Beauty",
    thumbnail: "✂️",
    primaryColor: "#111827",
    secondaryColor: "#f3f4f6",
    builderJson: {
      siteSettings: { siteName: "Kingcuts Barbershop", primaryColor: "#111827", secondaryColor: "#f3f4f6", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#111", textColor: "#f1f5f9" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Kingcuts Barbershop – Premium Grooming", description: "Sharp cuts, clean shaves and premium grooming" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { background: "#000", borderBottom: "2px solid #d4af37" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Kingcuts", links: [{ label: "Services", href: "#services" }, { label: "Gallery", href: "#gallery" }, { label: "Book", href: "#book" }], ctaText: "Book Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#000 0%,#1f2937 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Look Sharp.\nFeel Fresh.", subtitle: "Premium barbering, fades, designs and beard grooming. Walk in fresh, walk out king.", ctaText: "Book Your Cut", ctaHref: "#book", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1a1a1a" }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Services & Pricing", level: "h2" } },
            { id: "sv-m", type: "menu-section", isVisible: true, isLocked: false, styles: {}, content: { title: "", items: [{ name: "Haircut (All styles)", description: "Fade, taper, caesar, afro shaping", price: "GHS 25" }, { name: "Beard Trim & Shape", description: "Full beard grooming and design", price: "GHS 20" }, { name: "Cut + Beard Combo", description: "Full grooming package", price: "GHS 40" }, { name: "Hair Design / Branding", description: "Custom designs and patterns", price: "GHS 15+" }, { name: "Kids Cut (Under 12)", description: "Patient and gentle cuts for children", price: "GHS 20" }] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#111" }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Our Work", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#000" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#d4af37" }, content: { text: "Book Your Appointment", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "480px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "service", label: "Service", type: "text", required: true }, { name: "date", label: "Preferred Date & Time", type: "text", required: true }], submitText: "Book Now" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Best barbershop in the city! The cuts are always fresh, the staff are skilled and the vibe is great. I won't go anywhere else. 5 stars!", author: "Kwabena Osei", role: "Regular Client", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do I need an appointment?", a: "Walk-ins are welcome but booking ahead ensures minimum wait time." },
              { q: "How long does a cut take?", a: "A standard haircut takes 20–40 minutes. Beards and special styles may take longer." },
              { q: "What's your price range?", a: "Prices start from GHS 30 for a basic cut. Ask at the shop for our full price list." },
              { q: "Do you do kids' cuts?", a: "Yes, we do kids' haircuts. We're great with children!" }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to book a haircut appointment.", label: "Book a Cut" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get our latest styles & special offers", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-compare", type: "section", isVisible: true, styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#f8fafc" }, elements: [
            { id: "cmp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "See the Difference", level: "h2" } },
            { id: "cmp-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "Real results from our clients" } },
            { id: "cmp-el", type: "image-compare", isVisible: true, isLocked: false, styles: {}, content: { beforeImage: "", afterImage: "", beforeLabel: "Before", afterLabel: "Fresh Cut" } }
          ] },
          { id: "s-hours", type: "section", isVisible: true, styles: { paddingTop: 70, paddingBottom: 70, backgroundColor: "#fff" }, elements: [
            { id: "hr-el", type: "business-hours", isVisible: true, isLocked: false, styles: {}, content: { title: "Opening Hours", hours: [{ day: "Monday", time: "8:00am – 7:00pm" }, { day: "Tuesday", time: "8:00am – 7:00pm" }, { day: "Wednesday", time: "8:00am – 7:00pm" }, { day: "Thursday", time: "8:00am – 8:00pm" }, { day: "Friday", time: "8:00am – 8:00pm" }, { day: "Saturday", time: "7:00am – 6:00pm" }, { day: "Sunday", time: "10:00am – 3:00pm" }] } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: { color: "#94a3b8" }, content: { text: "© 2025 Kingcuts Barbershop. Stay sharp.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "event-planner",
    name: "Event Planning",
    description: "Vibrant template for event planners, decorators and coordinators",
    category: "Events",
    thumbnail: "🎉",
    primaryColor: "#7e22ce",
    secondaryColor: "#f3e8ff",
    builderJson: {
      siteSettings: { siteName: "Celebrations by Adwoa", primaryColor: "#7e22ce", secondaryColor: "#f3e8ff", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fdf4ff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Celebrations by Adwoa – Event Planning & Décor", description: "Creating magical moments for weddings, birthdays and corporate events" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Celebrations by Adwoa", links: [{ label: "Services", href: "#services" }, { label: "Gallery", href: "#gallery" }, { label: "Packages", href: "#packages" }, { label: "Contact", href: "#contact" }], ctaText: "Plan Your Event" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#581c87 0%,#7e22ce 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "We Create\nMagical Moments", subtitle: "From intimate gatherings to grand weddings, we plan, design and execute unforgettable events across Ghana.", ctaText: "Start Planning", ctaHref: "#contact", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "What We Do", features: [{ icon: "💍", title: "Weddings", desc: "Full wedding planning and day-of coordination" }, { icon: "🎂", title: "Birthdays", desc: "Themed birthday parties for all ages" }, { icon: "🏢", title: "Corporate Events", desc: "Conferences, launches and award ceremonies" }, { icon: "⛪", title: "Funerals & Outdooring", desc: "Dignified and beautiful event management" }, { icon: "🎓", title: "Graduation", desc: "Celebratory setups and event organisation" }, { icon: "🌸", title: "Baby Showers", desc: "Adorable themes and full coordination" }] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fdf4ff" }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Past Events", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-testimonials", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "ts-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Clients Say", level: "h2" } },
            { id: "ts-t", type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "Adwoa transformed our wedding into a fairy tale. Every detail was perfect. We couldn't have asked for more!", author: "Esi & Kofi Boateng", role: "Wedding Clients, 2024" } }
          ] },
          { id: "s-packages", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fdf4ff" }, elements: [
            { id: "pk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Packages", level: "h2" } },
            { id: "pk-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Essential", price: "2,000", period: "/ event", features: ["Up to 100 guests", "Décor & setup", "Day-of coordination", "1 coordinator"], cta: "Book Now" }, { name: "Premium", price: "5,000", period: "/ event", features: ["Up to 300 guests", "Full planning", "Custom décor", "Catering coordination", "Photography referral"], cta: "Most Popular", highlighted: true }, { name: "Luxury", price: "12,000", period: "/ event", features: ["500+ guests", "End-to-end planning", "Bespoke décor", "Full vendor team", "Weekend events"], cta: "Enquire" }] } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#7e22ce" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Let's Plan Your Event", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "event", label: "Type of Event", type: "text", required: true }, { name: "date", label: "Event Date", type: "text", required: false }, { name: "guests", label: "Estimated Guests", type: "text", required: false }, { name: "message", label: "Tell us more", type: "textarea", required: false }], submitText: "Start Planning" } }
          ] },

          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How far in advance should I book?", a: "We recommend 3–6 months for weddings, 1 month for smaller events." },
              { q: "Do you handle décor too?", a: "Yes! We offer full-service packages including concept design, décor, catering coordination and more." },
              { q: "What types of events do you specialise in?", a: "Weddings, corporate events, birthdays, funerals, baby showers and graduations." },
              { q: "Do you travel outside Accra?", a: "Yes, we serve clients across Ghana and can travel internationally for destination events." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'm looking for an event planner and would like to discuss my event.", label: "Plan Your Event" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get event inspiration & planning tips", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Celebrations by Adwoa. Every moment deserves to be magical.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "consultant",
    name: "Freelancer / Consultant",
    description: "Personal brand template for consultants, coaches and freelancers",
    category: "Personal",
    thumbnail: "💼",
    primaryColor: "#2563eb",
    secondaryColor: "#dbeafe",
    builderJson: {
      siteSettings: { siteName: "Kofi Mensah – Business Consultant", primaryColor: "#2563eb", secondaryColor: "#dbeafe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f8fafc" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Kofi Mensah – Business Consultant", description: "Helping businesses grow, scale and succeed in Ghana and Africa" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Kofi Mensah", links: [{ label: "Services", href: "#services" }, { label: "About", href: "#about" }, { label: "Testimonials", href: "#testimonials" }, { label: "Contact", href: "#contact" }], ctaText: "Book a Call" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1d4ed8 0%,#2563eb 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "I Help Businesses\nGrow & Scale", subtitle: "10+ years helping Ghanaian entrepreneurs build systems, raise capital and dominate their market.", ctaText: "Book Free Strategy Call", ctaHref: "#contact", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "150+", label: "Clients Served" }, { number: "10yrs", label: "Experience" }, { number: "GHS 5M+", label: "Revenue Generated" }, { number: "4.9★", label: "Client Rating" }] } }] },
          { id: "s-logos", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "lg-el", type: "brand-logos", isVisible: true, isLocked: false, styles: {}, content: { heading: "Trusted By Leading Businesses", logos: [
              { name: "Stanbic Bank" }, { name: "MTN Ghana" }, { name: "Vodafone GH" }, { name: "Melcom Group" }, { name: "Accra Mall" }
            ] } }
          ] },
                   { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "How I Help You", features: [{ icon: "📊", title: "Business Strategy", desc: "Market entry, growth plans and competitive positioning" }, { icon: "💰", title: "Fundraising", desc: "Pitch decks, investor introductions and grant applications" }, { icon: "⚙️", title: "Operations", desc: "Systems, SOPs and process optimisation" }, { icon: "📱", title: "Digital Transformation", desc: "Tech adoption and online business development" }] } }
          ] },
          { id: "s-about", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "ab-it", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "About Kofi", body: "With a background in finance, strategy and entrepreneurship, I've spent 10 years in the trenches building and advising businesses across Ghana, Nigeria and the UK. I don't just give advice — I roll up my sleeves and work alongside you.", image: "", imageLeft: false } }
          ] },
          { id: "s-testimonials", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "ts-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Client Results", level: "h2" } },
            { id: "ts-t", type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "Kofi helped us grow from GHS 200k to GHS 1.2M revenue in 18 months. His strategic thinking is unmatched.", author: "Abena Darko", role: "CEO, DarkoFoods Ltd" } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#2563eb" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px", color: "#fff" }, content: { text: "Book a Free 30-Min Call", level: "h2" } },
            { id: "ct-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", marginBottom: "32px" }, content: { text: "No pressure. Just a conversation about your business and where you want to go." } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "business", label: "Your Business / Industry", type: "text", required: true }, { name: "challenge", label: "Your biggest challenge right now", type: "textarea", required: true }], submitText: "Book My Call" } }
          ] },

          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How do we get started?", a: "Book a free 30-min discovery call via the form above. No commitment required." },
              { q: "Do you work with small businesses?", a: "Yes! I work with businesses of all sizes — from startups to established enterprises." },
              { q: "How do you charge?", a: "I offer project-based, retainer, and hourly rates depending on the engagement." },
              { q: "Do you work remotely?", a: "Yes, I work with clients across Ghana and internationally via Zoom and email." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to book a free discovery call with you.", label: "Book a Free Call" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get business strategy tips & insights", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Kofi Mensah Consulting. Building Africa's next generation of great businesses.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "pharmacy",
    name: "Pharmacy",
    description: "Clean, trustworthy template for pharmacies and chemists",
    category: "Healthcare",
    thumbnail: "💊",
    primaryColor: "#16a34a",
    secondaryColor: "#dcfce7",
    builderJson: {
      siteSettings: { siteName: "Vida Pharmacy", primaryColor: "#16a34a", secondaryColor: "#dcfce7", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0fdf4" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Vida Pharmacy – Your Health Partner", description: "Certified pharmacy with genuine medicines and expert advice" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Vida Pharmacy", links: [{ label: "Products", href: "#products" }, { label: "Services", href: "#services" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }], ctaText: "Order Medicines" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#15803d 0%,#16a34a 100%)", padding: "80px 40px" }, elements: [{ id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "💊 YOUR HEALTH IS OUR PRIORITY" } },
              { id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Your Trusted Health Partner", subtitle: "Genuine medicines, expert pharmacist advice and health products. Now with home delivery across Accra.", ctaText: "Order Now", ctaHref: "#order", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "💊", title: "Prescription Medicines", desc: "Certified pharmacists to dispense all prescriptions" }, { icon: "🏥", title: "OTC Products", desc: "Pain relief, vitamins, skincare and wellness products" }, { icon: "🚚", title: "Home Delivery", desc: "Same-day delivery within Accra (GHS 10)" }, { icon: "👨‍⚕️", title: "Health Advice", desc: "Free consultations with our licensed pharmacists" }, { icon: "💉", title: "Vaccinations", desc: "Flu, travel and childhood vaccination services" }, { icon: "🧪", title: "Health Screening", desc: "Blood pressure, glucose and BMI checks" }] } }
          ] },
          { id: "s-order", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0fdf4" }, elements: [
            { id: "or-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Order Medicines Online", level: "h2" } },
            { id: "or-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "address", label: "Delivery Address", type: "text", required: true }, { name: "items", label: "Medicine(s) needed", type: "textarea", required: true }], submitText: "Place Order" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px 40px" }, elements: [{ id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi! I need to order medicines." } }] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Always helpful, knowledgeable staff who take time to explain my medications. Prices are fair and they always have what I need in stock.", author: "Mr. Kofi Atiemo", role: "Regular Customer", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do you require a prescription?", a: "Prescription medicines require a valid prescription from a registered doctor." },
              { q: "Do you deliver?", a: "Yes, we offer free delivery on orders above GHS 50 within 5km." },
              { q: "Can I call in my order?", a: "Yes, call or WhatsApp us your medication list and we'll prepare it for pickup or delivery." },
              { q: "Do you stock imported brands?", a: "Yes, we stock local and internationally recognised pharmaceutical brands." }
            ] } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get health tips & pharmacy promotions", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-hours", type: "section", isVisible: true, styles: { paddingTop: 70, paddingBottom: 70, backgroundColor: "#fff" }, elements: [
            { id: "hr-el", type: "business-hours", isVisible: true, isLocked: false, styles: {}, content: { title: "Opening Hours", hours: [{ day: "Monday – Friday", time: "7:00am – 9:00pm" }, { day: "Saturday", time: "8:00am – 8:00pm" }, { day: "Sunday", time: "9:00am – 5:00pm" }, { day: "24-Hour Emergency", time: "Call our hotline" }] } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Vida Pharmacy. Your health, our priority.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "logistics",
    name: "Logistics & Courier",
    description: "Professional template for courier, delivery and logistics companies",
    category: "Transport",
    thumbnail: "🚚",
    primaryColor: "#ea580c",
    secondaryColor: "#fff7ed",
    builderJson: {
      siteSettings: { siteName: "SwiftMove Logistics", primaryColor: "#ea580c", secondaryColor: "#fff7ed", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#fff7ed" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "SwiftMove Logistics – Fast, Reliable Delivery", description: "Same-day and next-day courier and freight services across Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "SwiftMove", links: [{ label: "Services", href: "#services" }, { label: "Track", href: "#track" }, { label: "Pricing", href: "#pricing" }, { label: "Contact", href: "#contact" }], ctaText: "Get a Quote" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#c2410c 0%,#ea580c 100%)", padding: "90px 40px" }, elements: [{ id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "🚚 FAST & RELIABLE DELIVERY" } },
              { id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Deliver Anywhere in Ghana, Fast", subtitle: "Same-day Accra delivery. Next-day nationwide. Freight, parcels, documents — handled with care.", ctaText: "Get Instant Quote", ctaHref: "#quote", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "5,000+", label: "Deliveries Monthly" }, { number: "16", label: "Regions Covered" }, { number: "98%", label: "On-Time Rate" }, { number: "3hrs", label: "Avg Accra Delivery" }] } }] },
          { id: "s-logos", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "lg-el", type: "brand-logos", isVisible: true, isLocked: false, styles: {}, content: { heading: "Trusted By Leading Businesses", logos: [
              { name: "Stanbic Bank" }, { name: "MTN Ghana" }, { name: "Vodafone GH" }, { name: "Melcom Group" }, { name: "Accra Mall" }
            ] } }
          ] },
                   { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff7ed" }, elements: [{ id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "📦", title: "Parcel Delivery", desc: "Same-day and next-day parcels across Ghana" }, { icon: "📄", title: "Document Courier", desc: "Secure, tracked document delivery" }, { icon: "🏪", title: "E-commerce Fulfilment", desc: "Last-mile delivery for online stores" }, { icon: "🚛", title: "Freight & Bulk", desc: "Heavy cargo and bulk goods transport" }, { icon: "❄️", title: "Cold Chain", desc: "Temperature-controlled delivery for perishables" }, { icon: "🌍", title: "International", desc: "DHL partnership for global shipments" }] } }] },
          { id: "s-quote", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#ea580c" }, elements: [
            { id: "qt-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Get an Instant Quote", level: "h2" } },
            { id: "qt-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "pickup", label: "Pickup Location", type: "text", required: true }, { name: "delivery", label: "Delivery Location", type: "text", required: true }, { name: "item", label: "What are you sending?", type: "text", required: true }, { name: "weight", label: "Approximate Weight (kg)", type: "text", required: false }], submitText: "Get My Quote" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Reliable, fast and always handles our packages with care. Our business depends on fast deliveries and they've never let us down.", author: "Ms. Ama Frimpong", role: "Business Owner, Kumasi", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "What areas do you cover?", a: "We cover all major cities in Ghana and offer express delivery to most regions." },
              { q: "How do I track my delivery?", a: "You receive a tracking code via SMS/WhatsApp after booking. Track in real-time." },
              { q: "What's the maximum package weight?", a: "Standard packages up to 50kg. Contact us for heavy freight and cargo." },
              { q: "How do I book a pickup?", a: "Call, WhatsApp or fill in our online form and a driver will be assigned within the hour." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to arrange a pickup/delivery.", label: "Book a Pickup" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get logistics tips & delivery promotions", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 SwiftMove Logistics. Delivering trust, one package at a time.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "interior-design",
    name: "Interior Design",
    description: "Elegant template for interior designers and home decor studios",
    category: "Creative",
    thumbnail: "🛋️",
    primaryColor: "#44403c",
    secondaryColor: "#fafaf9",
    builderJson: {
      siteSettings: { siteName: "Afia Interiors", primaryColor: "#44403c", secondaryColor: "#fafaf9", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fafaf9" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Afia Interiors – Luxury Interior Design Ghana", description: "Transforming spaces into beautiful, functional homes" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Afia Interiors", links: [{ label: "Portfolio", href: "#portfolio" }, { label: "Services", href: "#services" }, { label: "Process", href: "#process" }, { label: "Contact", href: "#contact" }], ctaText: "Book Consultation" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#292524 0%,#44403c 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Spaces That Tell\nYour Story", subtitle: "Award-winning interior design for homes, offices and hospitality spaces across Ghana and West Africa.", ctaText: "View Our Work", ctaHref: "#portfolio", image: "" } }] },
          { id: "s-portfolio", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "pf-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Recent Projects", level: "h2" } },
            { id: "pf-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fafaf9" }, elements: [{ id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "🏠", title: "Residential Design", desc: "Complete home transformations from concept to completion" }, { icon: "🏢", title: "Commercial Spaces", desc: "Offices, restaurants and retail that elevate your brand" }, { icon: "🎨", title: "Concept & Mood Boards", desc: "Visual direction and design storytelling" }, { icon: "🛒", title: "Furniture Sourcing", desc: "Curated furniture, art and accessories" }] } }] },
          { id: "s-process", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [{ id: "pr-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Process", features: [{ icon: "1️⃣", title: "Discovery Call", desc: "We learn about your vision, budget and timeline" }, { icon: "2️⃣", title: "Concept Design", desc: "Mood boards, floor plans and 3D renders" }, { icon: "3️⃣", title: "Procurement", desc: "We source and coordinate all furnishings" }, { icon: "4️⃣", title: "Installation", desc: "Full setup with final styling and walkthrough" }] } }] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fafaf9" }, elements: [{ id: "ts-t", type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "Afia completely transformed our home. Every room feels like it was curated just for us. The attention to detail is extraordinary.", author: "Nana & Abena Owusu", role: "Residential Clients, East Legon" } }] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#44403c" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Start Your Project", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "project", label: "Project Type (Home / Office / Other)", type: "text", required: true }, { name: "budget", label: "Budget Range (GHS)", type: "text", required: false }, { name: "message", label: "Tell us about your space", type: "textarea", required: false }], submitText: "Book Free Consultation" } }
          ] },

          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How does the design process work?", a: "We start with a consultation to understand your vision, then provide concepts, and execute upon approval." },
              { q: "How long does a project take?", a: "Small rooms take 2–4 weeks. Full home redesigns can take 2–3 months." },
              { q: "Do you source the furniture too?", a: "Yes, we handle full procurement — furniture, décor, lighting and accessories." },
              { q: "Do you work outside Accra?", a: "Yes, we travel across Ghana for the right projects. Travel costs apply." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to discuss an interior design project with you.", label: "Book a Consultation" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get design inspiration & décor tips", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Afia Interiors. Beautiful spaces, beautifully done.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "printing",
    name: "Printing & Branding",
    description: "Template for print shops, branding and signage companies",
    category: "Business",
    thumbnail: "🖨️",
    primaryColor: "#1d4ed8",
    secondaryColor: "#dbeafe",
    builderJson: {
      siteSettings: { siteName: "PrintKing GH", primaryColor: "#1d4ed8", secondaryColor: "#dbeafe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f8fafc" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "PrintKing GH – Printing, Branding & Signage", description: "High-quality printing for businesses across Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "PrintKing GH", links: [{ label: "Products", href: "#products" }, { label: "Branding", href: "#branding" }, { label: "Order", href: "#order" }, { label: "Contact", href: "#contact" }], ctaText: "Get a Quote" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 100%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Make Your Brand\nUnforgettable", subtitle: "Premium printing, signage and branding solutions. Business cards to billboards — fast turnaround, sharp quality.", ctaText: "Order Now", ctaHref: "#order", image: "" } }] },
          { id: "s-products", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [{ id: "pr-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "What We Print", features: [{ icon: "💳", title: "Business Cards", desc: "Matte, gloss, embossed and premium finishes" }, { icon: "📋", title: "Flyers & Brochures", desc: "A5, A4, tri-fold and custom sizes" }, { icon: "🪧", title: "Banners & Signage", desc: "Roll-up banners, flex prints and billboards" }, { icon: "👕", title: "T-Shirts & Uniforms", desc: "Embroidery and screen printing" }, { icon: "🎁", title: "Branded Merchandise", desc: "Mugs, pens, bags and corporate gifts" }, { icon: "📦", title: "Packaging & Labels", desc: "Custom boxes, stickers and product labels" }] } }] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#dbeafe" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Popular Products & Prices", level: "h2" } },
            { id: "pr-m", type: "menu-section", isVisible: true, isLocked: false, styles: {}, content: { title: "", items: [{ name: "Business Cards (500)", description: "Double-sided, gloss laminate", price: "GHS 80" }, { name: "A5 Flyers (500)", description: "Full colour both sides", price: "GHS 120" }, { name: "Roll-up Banner (85cm × 200cm)", description: "Full colour with stand", price: "GHS 180" }, { name: "T-Shirts (min 10)", description: "Screen print, 1 colour", price: "GHS 25 each" }] } }
          ] },
          { id: "s-order", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "or-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Place Your Order", level: "h2" } },
            { id: "or-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name / Company", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "product", label: "Product(s) needed", type: "text", required: true }, { name: "quantity", label: "Quantity", type: "text", required: true }, { name: "deadline", label: "Delivery Deadline", type: "text", required: false }], submitText: "Send Order" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px 40px" }, elements: [{ id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi! I need a print quote." } }] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Fast turnaround, excellent print quality and very competitive prices. They printed our branded materials for our launch and it was perfect!", author: "Mr. Asante Boateng", role: "Business Owner", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "What file formats do you accept?", a: "We accept PDF, AI, PSD, PNG and JPG. PDF is preferred for print-ready files." },
              { q: "How fast is turnaround?", a: "Standard orders: 2–3 days. Express orders: same day or next day (subject to capacity)." },
              { q: "Do you offer design services?", a: "Yes! Our in-house designers can create artwork for an additional fee." },
              { q: "What's the minimum order quantity?", a: "Minimum quantities vary by product. Business cards start from 50pcs. Contact us for details." }
            ] } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get new product updates & special printing deals", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 PrintKing GH. Print it right.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "security",
    name: "Security Company",
    description: "Authoritative template for security firms and private guard services",
    category: "Services",
    thumbnail: "🛡️",
    primaryColor: "#0f172a",
    secondaryColor: "#f1f5f9",
    builderJson: {
      siteSettings: { siteName: "Guardian Shield Security", primaryColor: "#0f172a", secondaryColor: "#f1f5f9", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#0f172a", textColor: "#e2e8f0" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Guardian Shield Security – Professional Security Services", description: "Licensed and trusted security services for homes and businesses" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { background: "#0f172a", borderBottom: "1px solid #1e293b" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Guardian Shield", links: [{ label: "Services", href: "#services" }, { label: "Why Us", href: "#why" }, { label: "Clients", href: "#clients" }, { label: "Contact", href: "#contact" }], ctaText: "Request Guards" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#020617 0%,#0f172a 60%,#1e3a5f 100%)", padding: "100px 40px" }, elements: [{ id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "🛡️ PROTECTING WHAT MATTERS MOST" } },
              { id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Protecting What\nMatters Most", subtitle: "Licensed, trained and trusted. Guardian Shield provides professional security for homes, businesses and events across Ghana.", ctaText: "Get a Security Assessment", ctaHref: "#contact", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#1e293b" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "500+", label: "Guards Deployed" }, { number: "200+", label: "Client Sites" }, { number: "15yrs", label: "In Operation" }, { number: "24/7", label: "Response" }] } }] },
          { id: "s-logos", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "lg-el", type: "brand-logos", isVisible: true, isLocked: false, styles: {}, content: { heading: "Trusted By Leading Businesses", logos: [
              { name: "Stanbic Bank" }, { name: "MTN Ghana" }, { name: "Vodafone GH" }, { name: "Melcom Group" }, { name: "Accra Mall" }
            ] } }
          ] },
                   { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0f172a" }, elements: [{ id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "👮", title: "Manned Guarding", desc: "Uniformed guards for residential and commercial sites" }, { icon: "📹", title: "CCTV & Monitoring", desc: "24/7 remote surveillance and installation" }, { icon: "🚗", title: "Mobile Patrol", desc: "Regular patrol rounds for your property" }, { icon: "🎉", title: "Event Security", desc: "Crowd management and VIP protection" }, { icon: "🔒", title: "Access Control", desc: "Biometric and key card systems" }, { icon: "🚨", title: "Alarm Response", desc: "Fast armed response to triggered alarms" }] } }] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1e293b" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Request a Security Assessment", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name / Company", type: "text", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "location", label: "Property Location", type: "text", required: true }, { name: "service", label: "Service Required", type: "text", required: true }, { name: "guards", label: "No. of Guards Needed", type: "text", required: false }], submitText: "Request Assessment" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Very professional, disciplined guards who take their work seriously. Our premises have never been more secure. Worth every cedi!", author: "Mr. Edwin Asante", role: "Property Manager", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Are your guards trained and licensed?", a: "All our security personnel are licensed by the Ghana Police Service and undergo rigorous training." },
              { q: "Do you offer 24/7 coverage?", a: "Yes, we offer round-the-clock protection with shift rotations." },
              { q: "What industries do you serve?", a: "Residential, commercial, events, construction sites, banks and government facilities." },
              { q: "Do you have armed response?", a: "Yes, armed response units are available as part of our premium security packages." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to enquire about security services for my property/event.", label: "Request a Security Assessment" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get security tips & company updates", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: { color: "#94a3b8" }, content: { text: "© 2025 Guardian Shield Security. Protecting Ghana.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "construction",
    name: "Construction & Building",
    description: "Solid, professional template for construction and contracting companies",
    category: "Business",
    thumbnail: "🏗️",
    primaryColor: "#ca8a04",
    secondaryColor: "#fefce8",
    builderJson: {
      siteSettings: { siteName: "BuildRight Construction", primaryColor: "#ca8a04", secondaryColor: "#fefce8", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f8fafc" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "BuildRight Construction – Quality Building & Civil Works", description: "Trusted construction company delivering quality projects across Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "BuildRight", links: [{ label: "Services", href: "#services" }, { label: "Projects", href: "#projects" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }], ctaText: "Get a Quote" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#78350f 0%,#ca8a04 100%)", padding: "90px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Building Ghana's\nFuture, One Slab at a Time", subtitle: "20 years of delivering quality residential, commercial and civil construction projects across Ghana. On time. On budget.", ctaText: "View Our Projects", ctaHref: "#projects", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "300+", label: "Projects Completed" }, { number: "20yrs", label: "Experience" }, { number: "100+", label: "Staff & Artisans" }, { number: "GHS 50M+", label: "Projects Delivered" }] } }] },
          { id: "s-logos", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "lg-el", type: "brand-logos", isVisible: true, isLocked: false, styles: {}, content: { heading: "Trusted By Leading Businesses", logos: [
              { name: "Stanbic Bank" }, { name: "MTN Ghana" }, { name: "Vodafone GH" }, { name: "Melcom Group" }, { name: "Accra Mall" }
            ] } }
          ] },
                   { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fefce8" }, elements: [{ id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "🏠", title: "Residential Building", desc: "Bungalows, townhouses and estate housing" }, { icon: "🏢", title: "Commercial Construction", desc: "Offices, shopping centres and warehouses" }, { icon: "🛣️", title: "Civil & Road Works", desc: "Road construction and drainage systems" }, { icon: "🏗️", title: "Renovation", desc: "Remodelling and facility upgrades" }, { icon: "🔧", title: "Plumbing & Electrical", desc: "MEP works for all building types" }, { icon: "📐", title: "Quantity Surveying", desc: "Cost estimation and project management" }] } }] },
          { id: "s-projects", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "pj-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Recent Projects", level: "h2" } },
            { id: "pj-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#ca8a04" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Get a Free Quote", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name / Company", type: "text", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "project", label: "Project Type", type: "text", required: true }, { name: "location", label: "Project Location", type: "text", required: true }, { name: "description", label: "Brief Description", type: "textarea", required: false }], submitText: "Request Quote" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "They built our family home to the highest standard. Professional team, great communication throughout and finished on time. Couldn't be happier!", author: "Mr. Kweku Bonsu", role: "Homeowner", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do you provide a free estimate?", a: "Yes, we offer free site visits and cost estimates for all projects." },
              { q: "How long does construction take?", a: "A standard 3-bedroom house takes 8–12 months. Timelines vary by project scope." },
              { q: "Are you licensed?", a: "Yes, we are a licensed and insured contractor registered with Ghana's construction authority." },
              { q: "Do you handle land searches and permits?", a: "Yes, we assist clients through the full process including planning permits." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to discuss a construction project with your team.", label: "Get a Free Quote" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get construction tips & project showcases", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 BuildRight Construction. Quality you can build on.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "tutoring",
    name: "Online Tutoring",
    description: "Bright, engaging template for tutors, coaches and online educators",
    category: "Education",
    thumbnail: "📚",
    primaryColor: "#7c3aed",
    secondaryColor: "#ede9fe",
    builderJson: {
      siteSettings: { siteName: "AceMind Tutoring", primaryColor: "#7c3aed", secondaryColor: "#ede9fe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#faf5ff" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "AceMind Tutoring – Private Tutors for BECE, WASSCE & University", description: "Expert tutoring to boost grades and build confidence" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "AceMind", links: [{ label: "Subjects", href: "#subjects" }, { label: "Tutors", href: "#tutors" }, { label: "Pricing", href: "#pricing" }, { label: "Book", href: "#book" }], ctaText: "Book Free Trial" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#5b21b6 0%,#7c3aed 100%)", padding: "90px 40px" }, elements: [{ id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "📚 RESULTS GUARANTEED" } },
              { id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Better Grades.\nBigger Dreams.", subtitle: "Expert tutors for BECE, WASSCE, university entry and beyond. Online and in-person sessions across Ghana.", ctaText: "Book Free Trial Lesson", ctaHref: "#book", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "1,500+", label: "Students Tutored" }, { number: "95%", label: "Grade Improvement" }, { number: "50+", label: "Expert Tutors" }, { number: "15+", label: "Subjects" }] } }] },
          { id: "s-subjects", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#ede9fe" }, elements: [{ id: "sb-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Subjects We Offer", features: [{ icon: "➕", title: "Mathematics", desc: "Core & Elective Maths from JHS to university" }, { icon: "🔬", title: "Science", desc: "Biology, Chemistry and Physics" }, { icon: "📖", title: "English Language", desc: "Grammar, comprehension and essay writing" }, { icon: "💻", title: "ICT / Computing", desc: "Programming, databases and web design" }, { icon: "🌍", title: "Social Studies / History", desc: "BECE and WASSCE social sciences" }, { icon: "📊", title: "Economics / Accounts", desc: "A-Level and SHS economics" }] } }] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Session Plans", level: "h2" } },
            { id: "pr-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Single Session", price: "80", period: "/ hour", features: ["1 subject", "Online or in-person", "Homework review", "Progress report"], cta: "Book Now" }, { name: "Weekly Plan", price: "250", period: "/ month", features: ["4 sessions/month", "1 subject", "WhatsApp support", "Mock exams"], cta: "Most Popular", highlighted: true }, { name: "Intensive", price: "600", period: "/ month", features: ["12 sessions/month", "Up to 3 subjects", "Daily check-ins", "Parent updates", "Exam prep"], cta: "Book Now" }] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#7c3aed" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Book a Free Trial", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Student Name", type: "text", required: true }, { name: "phone", label: "Parent/Guardian Phone", type: "tel", required: true }, { name: "grade", label: "Year / Grade Level", type: "text", required: true }, { name: "subject", label: "Subject(s) needed", type: "text", required: true }, { name: "mode", label: "Online or In-Person?", type: "text", required: false }], submitText: "Book My Free Trial" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "My son went from struggling to achieving A's in just 3 months! The tutor is patient, knowledgeable and knows how to make learning fun. Highly recommended!", author: "Mrs. Adwoa Acheampong", role: "Parent", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do you offer online tutoring?", a: "Yes! We tutor online via Zoom/Teams and in-person at your home or our centre." },
              { q: "What subjects do you cover?", a: "Maths, Science, English, French, ICT and all BECE/WASSCE subjects." },
              { q: "What ages do you teach?", a: "We teach from JHS 1 through to SHS 3 and university-level subjects." },
              { q: "How much do sessions cost?", a: "Sessions start from GHS 50/hour. Group sessions are available at a discount." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to book a tutoring session for my child.", label: "Book a Session" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get study tips, exam guides & session offers", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 AceMind Tutoring. Every child can excel.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "spa-wellness",
    name: "Spa & Wellness",
    description: "Calming, luxurious template for spas, yoga studios and wellness centres",
    category: "Health",
    thumbnail: "🧘",
    primaryColor: "#0d9488",
    secondaryColor: "#f0fdfa",
    builderJson: {
      siteSettings: { siteName: "Serenity Spa & Wellness", primaryColor: "#0d9488", secondaryColor: "#f0fdfa", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#f0fdfa" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Serenity Spa & Wellness – Relax, Restore, Revive", description: "Luxury spa treatments, yoga and wellness therapies" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Serenity", links: [{ label: "Treatments", href: "#treatments" }, { label: "Yoga", href: "#yoga" }, { label: "Book", href: "#book" }, { label: "Gift Cards", href: "#gift" }], ctaText: "Book a Session" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#134e4a 0%,#0d9488 100%)", padding: "100px 40px" }, elements: [{ id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "🧘 YOUR SANCTUARY AWAITS" } },
              { id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Find Your Calm.\nFeed Your Soul.", subtitle: "Luxury spa treatments, yoga classes and holistic wellness therapies. Your sanctuary from the everyday.", ctaText: "Book Your Escape", ctaHref: "#book", image: "" } }] },
          { id: "s-treatments", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [{ id: "tr-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Treatments", features: [{ icon: "💆", title: "Deep Tissue Massage", desc: "60 & 90-minute full body release sessions" }, { icon: "🌸", title: "Aromatherapy", desc: "Essential oil massage for stress and tension" }, { icon: "🛁", title: "Body Scrubs", desc: "Exfoliating treatments for glowing skin" }, { icon: "💅", title: "Manicure & Pedicure", desc: "Luxury nail care with premium products" }, { icon: "🧖", title: "Facials", desc: "Deep cleanse, brightening and anti-ageing treatments" }, { icon: "🏊", title: "Hydrotherapy", desc: "Water-based relaxation and healing" }] } }] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0fdfa" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Treatment Prices", level: "h2" } },
            { id: "pr-m", type: "menu-section", isVisible: true, isLocked: false, styles: {}, content: { title: "", items: [{ name: "60-Min Massage", description: "Swedish or deep tissue", price: "GHS 220" }, { name: "90-Min Massage", description: "With hot stones", price: "GHS 350" }, { name: "Full Facial", description: "60-minute luxury facial", price: "GHS 180" }, { name: "Spa Day Package", description: "Massage + facial + mani-pedi", price: "GHS 600" }] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0d9488" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Book Your Treatment", level: "h2" } },
            { id: "bk-b", type: "booking-widget", isVisible: true, isLocked: false, styles: {}, content: { title: "", subtitle: "Choose your treatment and preferred time.", buttonText: "Book Now", buttonHref: "#book-form" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "20px auto 0" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "treatment", label: "Treatment", type: "text", required: true }, { name: "date", label: "Preferred Date & Time", type: "text", required: true }], submitText: "Confirm Booking" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "My go-to place for self-care! The massage therapists are exceptional and the ambiance is so calming. I leave feeling completely renewed every time.", author: "Maame Yaa Asante", role: "Regular Client", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do I need to book in advance?", a: "Booking is strongly recommended, especially for weekends. Call or WhatsApp us." },
              { q: "What should I bring?", a: "Just yourself! We provide towels, robes and all products." },
              { q: "Do you offer gift vouchers?", a: "Yes! Gift vouchers are available for all treatments — a perfect present." },
              { q: "Are your products organic?", a: "Yes, we use certified organic, natural products in all our treatments." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to book a spa treatment.", label: "Book a Treatment" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get wellness tips & exclusive spa deals", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-compare", type: "section", isVisible: true, styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#f8fafc" }, elements: [
            { id: "cmp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "See the Difference", level: "h2" } },
            { id: "cmp-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "Real results from our clients" } },
            { id: "cmp-el", type: "image-compare", isVisible: true, isLocked: false, styles: {}, content: { beforeImage: "", afterImage: "", beforeLabel: "Before Treatment", afterLabel: "After Treatment" } }
          ] },
          { id: "s-hours", type: "section", isVisible: true, styles: { paddingTop: 70, paddingBottom: 70, backgroundColor: "#fff" }, elements: [
            { id: "hr-el", type: "business-hours", isVisible: true, isLocked: false, styles: {}, content: { title: "Opening Hours", hours: [{ day: "Monday – Friday", time: "9:00am – 8:00pm" }, { day: "Saturday", time: "9:00am – 6:00pm" }, { day: "Sunday", time: "10:00am – 5:00pm" }] } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Serenity Spa & Wellness. Your peace awaits.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "gaming-cafe",
    name: "Gaming Café / Esports",
    description: "High-energy template for gaming cafés, esports arenas and gaming centres",
    category: "Entertainment",
    thumbnail: "🎮",
    primaryColor: "#6d28d9",
    secondaryColor: "#1a1a2e",
    builderJson: {
      siteSettings: { siteName: "GhanaGameZone", primaryColor: "#6d28d9", secondaryColor: "#1a1a2e", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#0a0a1a", textColor: "#e2e8f0" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "GhanaGameZone – Ghana's Premier Gaming Café & Esports Arena", description: "High-speed gaming PCs, consoles, esports tournaments and more" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { background: "#0a0a1a", borderBottom: "1px solid #6d28d9" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "GhanaGameZone", links: [{ label: "Stations", href: "#stations" }, { label: "Tournaments", href: "#tournaments" }, { label: "Pricing", href: "#pricing" }, { label: "Book", href: "#book" }], ctaText: "Book a Station" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0a0a1a 0%,#1e1b4b 50%,#4c1d95 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Level Up Your Game.", subtitle: "Ghana's most epic gaming arena. 60+ high-spec PCs, PS5s, tournaments and a vibe like no other. Come to play. Stay to win.", ctaText: "Book a Session", ctaHref: "#book", image: "" } }] },
          { id: "s-stations", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0f0f1f" }, elements: [{ id: "st-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Gaming Stations", features: [{ icon: "🖥️", title: "Gaming PCs", desc: "60 stations with RTX 4080, 165Hz monitors, mechanical keyboards" }, { icon: "🎮", title: "PlayStation 5", desc: "10 PS5 stations with 4K TVs and top titles" }, { icon: "🏆", title: "Esports Arena", desc: "Dedicated 20-seat tournament space with streaming setup" }, { icon: "🥤", title: "Café & Snacks", desc: "Energy drinks, shawarma, waffles and more" }, { icon: "📶", title: "1Gbps Fibre", desc: "Zero lag guaranteed on all stations" }, { icon: "🎧", title: "VR Zone", desc: "Meta Quest 3 VR experiences" }] } }] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0a0a1a" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Pricing", level: "h2" } },
            { id: "pr-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Casual", price: "15", period: "/ hour", features: ["PC or PS5", "High-speed internet", "Noise-cancelling headset", "Pay as you go"], cta: "Walk In" }, { name: "Gamer Pack", price: "50", period: "/ day (6hrs)", features: ["Pick any station", "Free drinks (2)", "Locker storage", "Priority booking"], cta: "Most Popular", highlighted: true }, { name: "Monthly Pass", price: "200", period: "/ month", features: ["Unlimited sessions", "Reserved seat option", "Tournament entries", "10% café discount"], cta: "Subscribe" }] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1e1b4b" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Book a Station", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "station", label: "Station Type (PC / PS5 / VR)", type: "text", required: true }, { name: "date", label: "Date & Time", type: "text", required: true }, { name: "duration", label: "Duration (hours)", type: "text", required: false }], submitText: "Reserve My Station" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Best gaming café in Accra! Fast internet, top-tier PCs and great atmosphere. The staff really know their gaming. My squad comes here every weekend!", author: "Amos Darko", role: "Gaming Enthusiast", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How much does an hour cost?", a: "GHS 10/hour for PC gaming. Console gaming from GHS 15/hour. VR from GHS 25/hour." },
              { q: "Can I bring my own food?", a: "Yes, outside food is welcome. We also have snacks and drinks available." },
              { q: "Do you host tournaments?", a: "Yes! We host weekly and monthly tournaments. Check our socials for the schedule." },
              { q: "Is there a membership discount?", a: "Yes, our monthly membership gives you 20% off all sessions plus priority booking." }
            ] } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get tournament schedules, new games & special offers", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: { color: "#94a3b8" }, content: { text: "© 2025 GhanaGameZone. Play hard. Win harder.", links: [] } }] }
        ]
      }]
    }
  },

{
    id: "travel-agency",
    name: "Travel Agency",
    description: "Eye-catching template for travel agencies, tour operators and holiday planners",
    category: "Services",
    siteType: "TRAVEL",
    thumbnail: "✈️",
    primaryColor: "#0369a1",
    secondaryColor: "#e0f2fe",
    featured: true,
    builderJson: {
      siteSettings: { siteName: "SkyBound Travel", primaryColor: "#0369a1", secondaryColor: "#e0f2fe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0f9ff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "SkyBound Travel – Your Africa & Beyond Travel Experts", description: "Affordable holiday packages, visa assistance and group travel from Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "✈️ SkyBound Travel", links: [{ label: "Destinations", href: "#destinations" }, { label: "Packages", href: "#packages" }, { label: "Visa Help", href: "#visa" }, { label: "Contact", href: "#contact" }], ctaText: "Book a Trip" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0c4a6e 0%,#0369a1 60%,#0ea5e9 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Explore the World From Ghana", subtitle: "Dubai, London, Turkey, Cape Verde & more. Affordable packages with visa assistance, flight tickets and hotel booking.", ctaText: "View Packages", ctaHref: "#packages", image: "" } }] },
          { id: "s-stats", type: "stats", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "stats-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "500+", label: "Trips Completed" }, { number: "30+", label: "Destinations" }, { number: "2000+", label: "Happy Travellers" }, { number: "5★", label: "Average Rating" }] } }] },
          { id: "s-destinations", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0f9ff" }, elements: [
            { id: "d-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Popular Destinations", level: "h2" } },
            { id: "d-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "We fly you to over 30 amazing destinations with full support" } },
            { id: "d-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🇦🇪", title: "Dubai, UAE", desc: "4 nights from GHS 4,500 incl. visa & hotel" }, { icon: "🇬🇧", title: "United Kingdom", desc: "6 nights from GHS 8,000 — visa assistance included" }, { icon: "🇹🇷", title: "Turkey", desc: "5 nights Istanbul from GHS 3,800" }, { icon: "🇵🇹", title: "Portugal", desc: "Schengen visa gateway — 5 nights from GHS 5,200" }, { icon: "🇨🇻", title: "Cape Verde", desc: "Beach holiday — 4 nights from GHS 3,200" }, { icon: "🌍", title: "Africa Tours", desc: "Kenya, Tanzania, South Africa safari packages" }] } }
          ] },
          { id: "s-packages", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "pk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Holiday Packages", level: "h2" } },
            { id: "pk-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Budget Explorer", price: "From GHS 2,500", period: "per person", features: ["Return flight ticket", "3-star hotel (4 nights)", "Airport transfers", "Travel insurance"], cta: "Book Now", highlighted: false }, { name: "Comfort Plus", price: "From GHS 4,500", period: "per person", features: ["Return flight ticket", "4-star hotel (5 nights)", "Airport transfers", "Travel insurance", "Daily breakfast", "City tour"], cta: "Book Now", highlighted: true }, { name: "Premium VIP", price: "From GHS 8,000", period: "per person", features: ["Business class upgrade", "5-star hotel (6 nights)", "Private transfers", "Full-day guided tours", "All meals included", "24/7 concierge"], cta: "Book Now", highlighted: false }] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0f9ff" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Book Your Trip", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "560px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "destination", label: "Destination", type: "text", required: true }, { name: "passengers", label: "Number of Passengers", type: "text", required: true }, { name: "travelDate", label: "Preferred Travel Date", type: "text", required: false }, { name: "budget", label: "Budget (GHS)", type: "text", required: false }], submitText: "Request Quote" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px 40px" }, elements: [{ id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hello! I'd like to inquire about travel packages." } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 SkyBound Travel. Licensed travel agency in Ghana.", links: [{ label: "Privacy", href: "#" }] } }] }
        ]
      }]
    }
  },

  {
    id: "beauty-cosmetics",
    name: "Beauty & Cosmetics",
    description: "Glamorous template for beauty brands, skincare lines and cosmetics shops",
    category: "Beauty",
    siteType: "BUSINESS",
    thumbnail: "💄",
    primaryColor: "#be185d",
    secondaryColor: "#fdf2f8",
    featured: true,
    builderJson: {
      siteSettings: { siteName: "Lumière Beauty", primaryColor: "#be185d", secondaryColor: "#fdf2f8", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#fdf2f8" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Lumière Beauty – Premium Skincare & Cosmetics", description: "Luxury skincare and beauty products crafted for African skin" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "✨ Lumière", links: [{ label: "Shop", href: "#shop" }, { label: "Skincare", href: "#skincare" }, { label: "Makeup", href: "#makeup" }, { label: "About", href: "#about" }], ctaText: "Shop Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#831843 0%,#be185d 60%,#ec4899 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Beauty That Celebrates You", subtitle: "Premium skincare and cosmetics formulated for melanin-rich skin. Glow up with confidence.", ctaText: "Shop the Collection", ctaHref: "#shop", image: "" } }] },
          { id: "s-features", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "ft-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Why Lumière?", features: [{ icon: "🌿", title: "Natural Ingredients", desc: "Shea butter, cocoa butter & African botanicals" }, { icon: "✅", title: "Dermatologist Tested", desc: "Safe for all skin tones and types" }, { icon: "🚫", title: "No Harmful Chemicals", desc: "Paraben-free, sulfate-free formulations" }, { icon: "♻️", title: "Eco-Friendly", desc: "Sustainable packaging, cruelty-free" }, { icon: "🏆", title: "Award Winning", desc: "Best skincare brand in Ghana 2024" }, { icon: "🚚", title: "Nationwide Delivery", desc: "Free delivery on orders above GHS 200" }] } }
          ] },
          { id: "s-testimonials", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fdf2f8" }, elements: [
            { id: "tes-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "What Our Customers Say", level: "h2" } },
            { id: "tes-1", type: "testimonial", isVisible: true, isLocked: false, styles: { marginBottom: "20px" }, content: { quote: "My skin has never looked this radiant! The Glow Serum cleared my dark spots in 3 weeks.", author: "Abena K.", role: "Verified Customer", avatar: "" } },
            { id: "tes-2", type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "Finally a brand that understands our skin. The moisture cream is absolutely perfect.", author: "Fatima D.", role: "Verified Customer", avatar: "" } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "c-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Get in Touch", level: "h2" } },
            { id: "c-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "480px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "inquiry", label: "What are you looking for?", type: "textarea", required: true }], submitText: "Send Message" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px" }, elements: [{ id: "wa", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi! I'd like to order beauty products." } }] },

          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Are your products suitable for African skin?", a: "Absolutely! All our products are specifically formulated for melanin-rich skin tones." },
              { q: "Are your products natural?", a: "Yes, we use natural and ethically sourced ingredients. No harmful chemicals." },
              { q: "Do you ship nationwide?", a: "Yes, we ship across Ghana. Free shipping on orders above GHS 200." },
              { q: "Can I get a skin consultation?", a: "Yes! Book a free virtual skin consultation with our beauty specialist." }
            ] } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get skincare tips, new launches & exclusive deals", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-compare", type: "section", isVisible: true, styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#f8fafc" }, elements: [
            { id: "cmp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "See the Difference", level: "h2" } },
            { id: "cmp-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "Real results from our clients" } },
            { id: "cmp-el", type: "image-compare", isVisible: true, isLocked: false, styles: {}, content: { beforeImage: "", afterImage: "", beforeLabel: "Natural Skin", afterLabel: "After Treatment" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Lumière Beauty. Celebrating African beauty.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "auto-workshop",
    name: "Auto Workshop",
    description: "Bold template for car repair shops, mechanics and auto service centres",
    category: "Automotive",
    siteType: "BUSINESS",
    thumbnail: "🔧",
    primaryColor: "#dc2626",
    secondaryColor: "#fef2f2",
    builderJson: {
      siteSettings: { siteName: "ProAuto Workshop", primaryColor: "#dc2626", secondaryColor: "#fef2f2", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#0f172a", textColor: "#f1f5f9" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "ProAuto Workshop – Expert Car Repairs in Accra", description: "Certified mechanics for all makes and models. Engine repair, AC service, electrical, tyres and more." },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { background: "#0f172a" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "🔧 ProAuto", links: [{ label: "Services", href: "#services" }, { label: "Booking", href: "#booking" }, { label: "About", href: "#about" }], ctaText: "Book Service" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0f172a 0%,#1e293b 60%,#dc2626 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Trusted Car Repairs in Accra", subtitle: "Certified mechanics. Genuine parts. Guaranteed workmanship. All vehicle makes and models.", ctaText: "Book a Service", ctaHref: "#booking", image: "" } }] },
          { id: "s-stats", type: "stats", isVisible: true, styles: { padding: "40px", background: "#1e293b" }, elements: [{ id: "stats-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "5000+", label: "Cars Serviced" }, { number: "12yr", label: "In Business" }, { number: "15", label: "Certified Mechanics" }, { number: "24hr", label: "Turnaround Time" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1e293b" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "🔧", title: "Engine Repair", desc: "Full engine diagnostics, overhaul and repair" }, { icon: "❄️", title: "AC Service", desc: "Gas refill, compressor repair and full AC service" }, { icon: "⚡", title: "Electrical", desc: "Wiring, battery, alternator and ECU diagnostics" }, { icon: "🛞", title: "Tyres & Alignment", desc: "New tyres, balancing and wheel alignment" }, { icon: "🛢️", title: "Oil & Filters", desc: "Engine oil, transmission and brake fluid service" }, { icon: "🚗", title: "Full Service", desc: "Comprehensive 50-point inspection and service" }] } }
          ] },
          { id: "s-booking", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0f172a" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#f1f5f9" }, content: { text: "Book a Service", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "540px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Your Name", type: "text", required: true }, { name: "phone", label: "Phone Number", type: "tel", required: true }, { name: "car", label: "Car Make & Model", type: "text", required: true }, { name: "issue", label: "Describe the issue", type: "textarea", required: true }, { name: "date", label: "Preferred Date", type: "text", required: false }], submitText: "Book Now" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px", background: "#0f172a" }, elements: [{ id: "wa", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi! I need to book a car service." } }] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Honest, skilled mechanics who don't try to oversell unnecessary repairs. My car runs like new and the price was very fair. This is my go-to workshop from now on!", author: "Mr. Kofi Atta", role: "Car Owner", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do I need to book?", a: "Booking is recommended for major services. Walk-ins are welcome for minor repairs." },
              { q: "Do you offer a warranty on repairs?", a: "Yes, all repairs come with a 30-day workmanship warranty." },
              { q: "What brands do you work on?", a: "We service all brands — Toyota, Kia, Hyundai, Mercedes, BMW, and local brands." },
              { q: "Do you do roadside assistance?", a: "Yes, we offer emergency roadside assistance within Accra and surrounding areas." }
            ] } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get car maintenance tips & workshop specials", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-compare", type: "section", isVisible: true, styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#f8fafc" }, elements: [
            { id: "cmp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "See the Difference", level: "h2" } },
            { id: "cmp-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "Real results from our clients" } },
            { id: "cmp-el", type: "image-compare", isVisible: true, isLocked: false, styles: {}, content: { beforeImage: "", afterImage: "", beforeLabel: "Before Service", afterLabel: "After Service" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { background: "#0f172a" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#94a3b8" }, content: { text: "© 2025 ProAuto Workshop. Quality you can trust.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "agriculture",
    name: "Agriculture & Farming",
    description: "Vibrant template for farms, agribusinesses and agricultural cooperatives",
    category: "Services",
    siteType: "BUSINESS",
    thumbnail: "🌾",
    primaryColor: "#15803d",
    secondaryColor: "#dcfce7",
    builderJson: {
      siteSettings: { siteName: "GreenFields Farm", primaryColor: "#15803d", secondaryColor: "#dcfce7", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0fdf4" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "GreenFields Farm – Fresh Produce Direct from the Farm", description: "Fresh vegetables, fruits and organic produce delivered across Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "🌾 GreenFields", links: [{ label: "Products", href: "#products" }, { label: "About", href: "#about" }, { label: "Order", href: "#order" }], ctaText: "Order Fresh" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#14532d 0%,#15803d 60%,#22c55e 100%)", padding: "100px 40px" }, elements: [{ id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "🌾 FROM FARM TO TABLE" } },
              { id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Fresh From Our Farm to Your Table", subtitle: "Certified organic vegetables, fruits and grains grown sustainably in the Volta Region. Weekly delivery to Accra.", ctaText: "Order This Week", ctaHref: "#order", image: "" } }] },
          { id: "s-products", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "p-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "What We Grow", level: "h2" } },
            { id: "p-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🥬", title: "Vegetables", desc: "Tomatoes, peppers, cabbage, garden eggs, lettuce" }, { icon: "🫚", title: "Palm Products", desc: "Red palm oil, palm kernel oil, palm nuts" }, { icon: "🍌", title: "Fruits", desc: "Plantain, banana, pineapple, watermelon, mango" }, { icon: "🌽", title: "Grains", desc: "Maize, sorghum, rice, groundnuts, soybeans" }, { icon: "🌿", title: "Herbs & Spices", desc: "Ginger, garlic, turmeric, moringa, basil" }, { icon: "🐔", title: "Poultry", desc: "Free-range chickens, eggs and guinea fowl" }] } }
          ] },
          { id: "s-why", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0fdf4" }, elements: [
            { id: "w-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Why GreenFields?", features: [{ icon: "✅", title: "Certified Organic", desc: "No chemicals or pesticides in our growing process" }, { icon: "🚚", title: "Weekly Delivery", desc: "Fresh produce delivered every Friday across Accra" }, { icon: "💰", title: "Farm Gate Prices", desc: "Buy directly from the farm — no middlemen markup" }, { icon: "🌍", title: "Supporting Local", desc: "70+ farming families employed in the Volta Region" }] } }
          ] },
          { id: "s-order", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "o-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Place a Weekly Order", level: "h2" } },
            { id: "o-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "location", label: "Delivery Location", type: "text", required: true }, { name: "items", label: "What do you need? (items & quantities)", type: "textarea", required: true }], submitText: "Place Order" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px" }, elements: [{ id: "wa", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi GreenFields! I'd like to order fresh produce." } }] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Quality seeds, on-time delivery and knowledgeable staff who actually understand farming. My yields have improved significantly since working with this company.", author: "Mr. Emmanuel Owusu", role: "Farmer & Customer", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do you deliver farm inputs?", a: "Yes, we deliver seeds, fertilisers and equipment across Ghana." },
              { q: "Can you help with farm planning?", a: "Yes, our agronomists provide free farm planning consultations for customers." },
              { q: "Do you buy produce from farmers?", a: "Yes, we purchase produce directly from farms. Contact us for current prices." },
              { q: "Do you train farmers?", a: "Yes, we run free training workshops on modern farming techniques throughout the year." }
            ] } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get farming tips, market prices & company news", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 GreenFields Farm. Grown with love in Ghana.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "childcare",
    name: "Childcare & Daycare",
    description: "Warm, colourful template for creches, daycares and nursery schools",
    category: "Education",
    siteType: "BUSINESS",
    thumbnail: "🧸",
    primaryColor: "#d97706",
    secondaryColor: "#fef3c7",
    builderJson: {
      siteSettings: { siteName: "Little Stars Daycare", primaryColor: "#d97706", secondaryColor: "#fef3c7", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#fffbeb" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Little Stars Daycare – Safe & Nurturing Childcare", description: "Professional daycare and early childhood education for children aged 3 months to 6 years" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "🌟 Little Stars", links: [{ label: "About", href: "#about" }, { label: "Programs", href: "#programs" }, { label: "Gallery", href: "#gallery" }, { label: "Enroll", href: "#enroll" }], ctaText: "Enroll Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#92400e 0%,#d97706 60%,#fbbf24 100%)", padding: "80px 40px" }, elements: [{ id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "🧸 WHERE LITTLE ONES FLOURISH" } },
              { id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Where Little Stars Shine Brightest", subtitle: "A safe, nurturing environment where children learn, play and grow. Ages 3 months to 6 years.", ctaText: "Schedule a Visit", ctaHref: "#enroll", image: "" } }] },
          { id: "s-programs", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "pr-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Programs", features: [{ icon: "🍼", title: "Infant Care (0–12m)", desc: "Safe, loving care with regular parent updates" }, { icon: "🦆", title: "Toddler Group (1–3yr)", desc: "Play-based learning, motor skills and socialisation" }, { icon: "📚", title: "Pre-School (3–6yr)", desc: "School readiness, reading, numbers and creativity" }, { icon: "🎨", title: "After School", desc: "Homework help, arts, sports and supervised play" }] } }
          ] },
          { id: "s-features", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fffbeb" }, elements: [
            { id: "ft-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Why Parents Choose Us", features: [{ icon: "🔒", title: "Safe Environment", desc: "CCTV, secure entry, first aid trained staff" }, { icon: "👩‍🏫", title: "Qualified Teachers", desc: "All staff are ECE certified with background checks" }, { icon: "🍎", title: "Nutritious Meals", desc: "Balanced meals and snacks prepared fresh daily" }, { icon: "📱", title: "Daily Updates", desc: "Photo reports and updates sent to parents every day" }] } }
          ] },
          { id: "s-testimonials", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "t-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "What Parents Say", level: "h2" } },
            { id: "t-1", type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "My daughter loves going to Little Stars every morning. The teachers are amazing and so patient.", author: "Maame Asante", role: "Parent of 3-year-old", avatar: "" } }
          ] },
          { id: "s-enroll", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fffbeb" }, elements: [
            { id: "e-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Enroll Your Child", level: "h2" } },
            { id: "e-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "parentName", label: "Parent/Guardian Name", type: "text", required: true }, { name: "phone", label: "Phone Number", type: "tel", required: true }, { name: "childName", label: "Child's Name", type: "text", required: true }, { name: "age", label: "Child's Age", type: "text", required: true }, { name: "startDate", label: "Preferred Start Date", type: "text", required: false }], submitText: "Schedule Visit" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px" }, elements: [{ id: "wa", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hello! I'd like to enroll my child at Little Stars." } }] },

          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "What are your opening hours?", a: "We open Monday–Friday, 6:30am–6:00pm to accommodate working parents." },
              { q: "What age groups do you accept?", a: "We care for children from 3 months to 5 years in age-appropriate groups." },
              { q: "What's the daily routine like?", a: "Each day is filled with structured play, learning activities, meals and rest time." },
              { q: "How do I enrol my child?", a: "Fill in our enquiry form or call us to schedule a visit and meet the team." }
            ] } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get parenting tips & centre updates", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Little Stars Daycare. Nurturing the next generation.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "accounting-firm",
    name: "Accounting & Finance",
    description: "Professional template for accounting firms, auditors and financial advisors",
    category: "Professional",
    siteType: "BUSINESS",
    thumbnail: "📊",
    primaryColor: "#1e40af",
    secondaryColor: "#eff6ff",
    builderJson: {
      siteSettings: { siteName: "Mensah & Associates", primaryColor: "#1e40af", secondaryColor: "#eff6ff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f8fafc" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Mensah & Associates – Chartered Accountants in Ghana", description: "Audit, tax, payroll and financial advisory services for businesses in Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "📊 Mensah & Associates", links: [{ label: "Services", href: "#services" }, { label: "About", href: "#about" }, { label: "Team", href: "#team" }, { label: "Contact", href: "#contact" }], ctaText: "Free Consultation" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1e3a8a 0%,#1e40af 60%,#3b82f6 100%)", padding: "90px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Your Financial Success Is Our Business", subtitle: "Chartered accountants providing audit, tax compliance, payroll and financial advisory for SMEs across Ghana.", ctaText: "Book Free Consultation", ctaHref: "#contact", image: "" } }] },
          { id: "s-stats", type: "stats", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "200+", label: "Clients Served" }, { number: "15yr", label: "In Practice" }, { number: "8", label: "Qualified Accountants" }, { number: "100%", label: "Filing Success Rate" }] } }] },
          { id: "s-logos", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "lg-el", type: "brand-logos", isVisible: true, isLocked: false, styles: {}, content: { heading: "Trusted By Leading Businesses", logos: [
              { name: "Stanbic Bank" }, { name: "MTN Ghana" }, { name: "Vodafone GH" }, { name: "Melcom Group" }, { name: "Accra Mall" }
            ] } }
          ] },
                   { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#eff6ff" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "📋", title: "Audit & Assurance", desc: "Statutory and internal audits to GRA and ICAG standards" }, { icon: "💰", title: "Tax Services", desc: "Corporate tax, VAT registration, filing and compliance" }, { icon: "💼", title: "Payroll Management", desc: "SSNIT, PAYE, tier 1/2/3 and payslip processing" }, { icon: "📈", title: "Financial Advisory", desc: "Business planning, projections and investor reports" }, { icon: "🏦", title: "Accounting Software", desc: "QuickBooks and Sage setup and training" }, { icon: "🤝", title: "Company Registration", desc: "GHS, Registrar General, EPA and sector permits" }] } }
          ] },
          { id: "s-team", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Our Team", level: "h2" } },
            { id: "tm-1", type: "team-member", isVisible: true, isLocked: false, styles: {}, content: { name: "Kweku Mensah FCA", role: "Managing Partner", bio: "20 years in audit and tax with Big 4 experience", image: "" } },
            { id: "tm-2", type: "team-member", isVisible: true, isLocked: false, styles: {}, content: { name: "Ama Boateng CPA", role: "Tax Manager", bio: "Specialist in corporate tax and GRA disputes", image: "" } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#eff6ff" }, elements: [
            { id: "c-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Free Initial Consultation", level: "h2" } },
            { id: "c-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "company", label: "Company Name", type: "text", required: false }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "service", label: "Service Needed", type: "text", required: false }], submitText: "Book Consultation" } }
          ] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Professional, thorough and always ahead of deadlines. They've saved us significant money in tax planning and their financial advice is invaluable. Highly trusted.", author: "Mr. Charles Owusu-Mensah", role: "Business Owner", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do you work with small businesses?", a: "Yes, we serve sole traders, SMEs and large corporations across all industries." },
              { q: "What accounting software do you use?", a: "We work with QuickBooks, Sage, Wave and Zoho Books, and can train your team." },
              { q: "Do you handle tax filing?", a: "Yes, we handle all GRA filings including VAT, income tax, payroll and customs." },
              { q: "How do your fees work?", a: "We offer monthly retainer, project-based and hourly fee arrangements." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to discuss accounting or tax services for my business.", label: "Book a Consultation" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get tax tips & financial insights", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Mensah & Associates. Chartered Accountants & Business Advisors.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "music-band",
    name: "Music Artist / Band",
    description: "Dynamic dark template for musicians, DJs, bands and music producers",
    category: "Creative",
    siteType: "PERSONAL",
    thumbnail: "🎵",
    primaryColor: "#7c3aed",
    secondaryColor: "#f5f3ff",
    featured: true,
    builderJson: {
      siteSettings: { siteName: "The Artist", primaryColor: "#7c3aed", secondaryColor: "#f5f3ff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#09090b", textColor: "#f4f4f5" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Kojo Beat – Ghana's Finest Afrobeats Producer", description: "Music releases, booking info and collaborations" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { background: "#09090b" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "🎵 KOJO BEAT", links: [{ label: "Music", href: "#music" }, { label: "Events", href: "#events" }, { label: "About", href: "#about" }, { label: "Booking", href: "#booking" }], ctaText: "Book Me" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#09090b 0%,#1c0040 50%,#7c3aed 100%)", padding: "120px 40px" }, elements: [{ id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "🎵 BOOKING EVENTS NATIONWIDE" } },
              { id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Music That Moves the Soul", subtitle: "Afrobeats, Highlife and Afropop producer & artist from Accra, Ghana. Available for shows, features and studio sessions.", ctaText: "Stream My Music", ctaHref: "#music", image: "" } }] },
          { id: "s-stats", type: "stats", isVisible: true, styles: { padding: "40px", background: "#18181b" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "5M+", label: "Streams" }, { number: "50+", label: "Songs Released" }, { number: "100+", label: "Shows Performed" }, { number: "10+", label: "Artists Produced" }] } }] },
          { id: "s-music", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#09090b" }, elements: [
            { id: "m-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "20px", color: "#f4f4f5" }, content: { text: "Latest Releases", level: "h2" } },
            { id: "m-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🎧", title: "\"Jollof Season\" (2024)", desc: "Single — Available on Audiomack, Spotify & YouTube" }, { icon: "🎧", title: "\"Accra Nights\" EP", desc: "5-track EP — 1.2M streams on Audiomack" }, { icon: "🎧", title: "\"Vibes Only\" Mixtape", desc: "Free download — Afrobeats x Highlife fusion" }] } }
          ] },
          { id: "s-events", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#18181b" }, elements: [
            { id: "ev-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px", color: "#f4f4f5" }, content: { text: "Upcoming Events", level: "h2" } },
            { id: "ev-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🎤", title: "Accra City Festival", desc: "March 15 · Labadi Beach Hotel · Main Stage" }, { icon: "🎤", title: "Kumasi Music Awards", desc: "April 8 · KNUST Amphitheatre · Headline Act" }, { icon: "🎤", title: "Diaspora Tour — UK", desc: "May 2025 · London & Manchester" }] } }
          ] },
          { id: "s-booking", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#09090b" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#f4f4f5" }, content: { text: "Booking & Collaborations", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name / Organisation", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "type", label: "Type of booking (show / feature / production)", type: "text", required: true }, { name: "date", label: "Date / Timeframe", type: "text", required: false }, { name: "budget", label: "Budget Range", type: "text", required: false }], submitText: "Send Booking Request" } }
          ] },
          { id: "s-social", type: "section", isVisible: true, styles: { padding: "40px", background: "#09090b" }, elements: [{ id: "sl", type: "social-links", isVisible: true, isLocked: false, styles: {}, content: { links: [{ platform: "instagram", url: "#", label: "@kojobeat" }, { platform: "youtube", url: "#", label: "YouTube" }, { platform: "twitter", url: "#", label: "Twitter/X" }] } }] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Booked them for our corporate event and they absolutely brought the house down! The energy, the musicianship — everything was top class. Will book again!", author: "DJ Splash, Accra", role: "Event Organiser", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How do I book you for an event?", a: "Fill in our contact form with your event date, location and type. We'll respond within 24hrs." },
              { q: "What's your performance range?", a: "We perform across Ghana and are open to international bookings with reasonable travel arrangements." },
              { q: "Do you do wedding performances?", a: "Yes, we specialise in weddings, corporate events, concerts and private parties." },
              { q: "How much do you charge?", a: "Fees vary by event type and duration. Contact us for a custom quote." }
            ] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "50px 40px", background: "#f0fdf4", textAlign: "center" }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px" }, content: { text: "We typically reply within minutes." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to book your band/artist for an event.", label: "Book Us for Your Event" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get new music, tour dates & exclusive content", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { background: "#09090b" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#71717a" }, content: { text: "© 2025 Kojo Beat. All rights reserved.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "vet-clinic",
    name: "Veterinary Clinic",
    description: "Friendly template for vet clinics, pet hospitals and animal care services",
    category: "Healthcare",
    siteType: "BUSINESS",
    thumbnail: "🐾",
    primaryColor: "#0891b2",
    secondaryColor: "#ecfeff",
    builderJson: {
      siteSettings: { siteName: "PawCare Vet Clinic", primaryColor: "#0891b2", secondaryColor: "#ecfeff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#ecfeff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "PawCare Vet Clinic – Expert Animal Care in Accra", description: "Veterinary consultations, vaccinations, surgery and pet grooming for all animals" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "🐾 PawCare", links: [{ label: "Services", href: "#services" }, { label: "Team", href: "#team" }, { label: "Book", href: "#booking" }], ctaText: "Book Appointment" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#164e63 0%,#0891b2 60%,#22d3ee 100%)", padding: "90px 40px" }, elements: [{ id: "h-badge", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "20px" }, content: { text: "🐾 COMPASSIONATE CARE FOR EVERY PET" } },
              { id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Quality Care for Your Beloved Pets", subtitle: "Experienced veterinarians providing compassionate care for dogs, cats, birds and farm animals in Accra.", ctaText: "Book Appointment", ctaHref: "#booking", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "💉", title: "Vaccinations", desc: "Core and non-core vaccines for all pets and farm animals" }, { icon: "🔬", title: "Diagnostics", desc: "Blood tests, X-ray and ultrasound on-site" }, { icon: "🏥", title: "Surgery", desc: "Spay/neuter, dental, orthopaedic and emergency surgery" }, { icon: "🛁", title: "Grooming", desc: "Bathing, haircut, nail clipping and ear cleaning" }, { icon: "🐄", title: "Farm Animals", desc: "Cattle, poultry, pigs and goat veterinary services" }, { icon: "🚨", title: "Emergency Care", desc: "24/7 emergency line for critical cases" }] } }
          ] },
          { id: "s-booking", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#ecfeff" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Book an Appointment", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "ownerName", label: "Your Name", type: "text", required: true }, { name: "phone", label: "Phone Number", type: "tel", required: true }, { name: "petName", label: "Pet's Name & Species", type: "text", required: true }, { name: "concern", label: "Reason for Visit", type: "textarea", required: true }, { name: "date", label: "Preferred Date", type: "text", required: false }], submitText: "Book Appointment" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px" }, elements: [{ id: "wa", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hello PawCare! I'd like to book a vet appointment." } }] },

          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Our Clients Say", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "The vets here are so gentle and caring with my dog. They explain everything clearly and you can tell they genuinely love animals. Best vet clinic in the area!", author: "Ms. Akua Asante", role: "Pet Owner", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do I need an appointment?", a: "Appointments are preferred. We accept emergency walk-ins at all times." },
              { q: "Do you do house visits?", a: "Yes, we offer home visits for pets that find travel stressful. Call for availability." },
              { q: "What pets do you treat?", a: "We treat dogs, cats, birds, rabbits, and small animals. Exotic animals by arrangement." },
              { q: "Do you offer vaccination packages?", a: "Yes, we have affordable puppy, kitten and adult vaccination packages." }
            ] } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#6272f1" }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get pet care tips & clinic updates", placeholder: "Enter your email address", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 PawCare Vet Clinic. Because every life matters.", links: [] } }] }
        ]
      }]
    }
  },
  // ── Wedding Planner ──────────────────────────────────────
  {
    id: "wedding-planner",
    name: "Wedding Planner",
    description: "Elegant template for wedding planners, coordinators and event designers",
    category: "Events",
    thumbnail: "💍",
    primaryColor: "#c4a882",
    secondaryColor: "#fdf6ee",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Ivory & Gold Events", primaryColor: "#c4a882", secondaryColor: "#fdf6ee", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fffdf9", textColor: "#2d2217" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Ivory & Gold Events – Luxury Wedding Planning in Ghana", description: "Creating unforgettable weddings with grace and elegance" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "rgba(255,253,249,0.95)", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Ivory & Gold", links: [{ label: "Services", href: "#services" }, { label: "Gallery", href: "#gallery" }, { label: "Our Story", href: "#about" }, { label: "Packages", href: "#packages" }], ctaText: "Book Consultation" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#2d2217 0%,#6b4c2a 50%,#c4a882 100%)", paddingTop: 120, paddingBottom: 120 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fdf6ee", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: "300", letterSpacing: "0.05em" }, content: { text: "Your Perfect Day, Flawlessly Planned", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#e8d5b7", fontSize: "1.2rem", margin: "20px auto", maxWidth: "600px", lineHeight: "1.8" }, content: { text: "We craft bespoke weddings and celebrations that reflect your unique love story. Every detail, every moment, perfectly curated." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "40px" }, content: { text: "Begin Your Journey →", href: "#consultation", variant: "outline" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#2d2217", paddingTop: 50, paddingBottom: 50 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fdf6ee" }, content: { stats: [{ number: "350+", label: "Weddings Planned" }, { number: "12yrs", label: "Experience" }, { number: "4.9★", label: "Average Rating" }, { number: "100%", label: "Satisfaction" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { backgroundColor: "#fffdf9", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px", color: "#2d2217" }, content: { text: "Our Services", level: "h2" } },
            { id: "sv-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#8a7060", marginBottom: "50px" }, content: { text: "From intimate ceremonies to grand celebrations" } },
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "💍", title: "Full Wedding Planning", desc: "End-to-end management from engagement to reception" },
              { icon: "🌸", title: "Floral & Décor Design", desc: "Custom floral arrangements and venue decoration" },
              { icon: "🎵", title: "Entertainment Booking", desc: "Live bands, DJs, photographers and videographers" },
              { icon: "🍽️", title: "Catering Coordination", desc: "Menu design and catering partner management" },
              { icon: "✈️", title: "Destination Weddings", desc: "Planning weddings anywhere in Ghana or abroad" },
              { icon: "📋", title: "Day-of Coordination", desc: "Stress-free coordination on your special day" }
            ] } }
          ] },
          { id: "s-about", type: "section", isVisible: true, styles: { backgroundColor: "#fdf6ee", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "ab1", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "Creating Magic for 12 Years", body: "Ivory & Gold Events was founded by Abena Asante, a passionate event designer who believes every love story deserves a breathtaking celebration. We have orchestrated over 350 weddings, from intimate garden ceremonies to grand ballroom events across Ghana.", image: "", imageLeft: true } }
          ] },
          { id: "s-packages", type: "section", isVisible: true, styles: { backgroundColor: "#fffdf9", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "pk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Wedding Packages", level: "h2" } },
            { id: "pk-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#8a7060", marginBottom: "50px" }, content: { text: "Tailored to your vision and budget" } },
            { id: "pk-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [
              { name: "Silver", price: "GHS 5,000", period: "", features: ["Day-of coordination", "Venue styling consultation", "Vendor recommendations", "Timeline creation"], cta: "Get Started" },
              { name: "Gold", price: "GHS 12,000", period: "", features: ["Full planning (6 months)", "Décor & florals", "Catering coordination", "Entertainment booking", "Bridal suite setup"], cta: "Most Popular", highlighted: true },
              { name: "Platinum", price: "Custom", period: "", features: ["12-month planning", "Luxury venue sourcing", "International vendors", "Honeymoon planning", "Dedicated planner"], cta: "Contact Us" }
            ] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { backgroundColor: "#2d2217", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fdf6ee", marginBottom: "40px" }, content: { text: "Our Work", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#fdf6ee", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Happy Couples", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "650px", margin: "0 auto", textAlign: "center" }, content: { quote: "Our wedding was beyond what we ever imagined. Ivory & Gold turned our vision into reality — every detail was perfect. Our guests are still talking about it!", author: "Akosua & Emmanuel Mensah", role: "Married December 2024", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#fffdf9", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Questions & Answers", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How far in advance should we book?", a: "We recommend booking 6-12 months in advance, especially for Saturday dates which fill up quickly." },
              { q: "Do you work within our budget?", a: "Yes! We work across all budgets and will tailor our services to what works best for you." },
              { q: "Can we use our own vendors?", a: "Absolutely. We can work with your preferred vendors or recommend from our trusted network." },
              { q: "Do you handle outdoor weddings?", a: "Yes, we specialise in outdoor, garden and beachside weddings across Ghana." }
            ] } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { backgroundColor: "#2d2217", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fdf6ee", marginBottom: "12px" }, content: { text: "Start Planning Your Dream Wedding", level: "h2" } },
            { id: "ct-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#c4a882", marginBottom: "40px" }, content: { text: "Book a free 30-minute consultation with our lead planner." } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "560px", margin: "0 auto" }, content: { title: "", fields: [{ name: "names", label: "Your Names", type: "text", required: true }, { name: "email", label: "Email Address", type: "email", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "date", label: "Wedding Date (if set)", type: "text", required: false }, { name: "guests", label: "Estimated Guest Count", type: "text", required: false }, { name: "vision", label: "Describe your dream wedding", type: "textarea", required: false }], submitText: "Request Consultation" } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { backgroundColor: "#c4a882", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "8px" }, content: { text: "Chat With Us on WhatsApp", level: "h2" } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to enquire about wedding planning services.", label: "Chat With Our Planner" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#1a0e08" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#8a7060" }, content: { text: "© 2025 Ivory & Gold Events. Crafting unforgettable moments.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Digital Marketing Agency ──────────────────────────────
  {
    id: "digital-agency",
    name: "Digital Marketing Agency",
    description: "Bold, modern template for agencies, studios and creative consultancies",
    category: "Business",
    thumbnail: "📈",
    primaryColor: "#6272f1",
    secondaryColor: "#f0f0ff",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Apex Digital Agency", primaryColor: "#6272f1", secondaryColor: "#f0f0ff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#050510", textColor: "#f1f5f9" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Apex Digital – Growth Marketing Agency Ghana", description: "We grow businesses with data-driven digital marketing" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "rgba(5,5,16,0.95)", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { logo: "Apex Digital", links: [{ label: "Services", href: "#services" }, { label: "Results", href: "#results" }, { label: "Process", href: "#process" }, { label: "Pricing", href: "#pricing" }], ctaText: "Free Audit" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#050510 0%,#1a1a4e 50%,#6272f1 100%)", paddingTop: 120, paddingBottom: 100 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: "900", letterSpacing: "-0.02em", lineHeight: "1.1" }, content: { text: "We Don't Just Market. We Dominate.", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#94a3b8", fontSize: "1.2rem", margin: "24px auto", maxWidth: "650px", lineHeight: "1.8" }, content: { text: "Data-driven strategies that turn clicks into customers. We've generated over GHS 50M in revenue for Ghanaian businesses." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "40px" }, content: { text: "Get Your Free Marketing Audit →", href: "#audit", variant: "primary" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#0d0d2b", paddingTop: 60, paddingBottom: 60 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "200+", label: "Clients Grown" }, { number: "GHS 50M+", label: "Revenue Generated" }, { number: "850%", label: "Average ROI" }, { number: "5yrs", label: "In Business" }] } }] },
          { id: "s-logos", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "lg-el", type: "brand-logos", isVisible: true, isLocked: false, styles: {}, content: { heading: "Trusted By Leading Businesses", logos: [
              { name: "Stanbic Bank" }, { name: "MTN Ghana" }, { name: "Vodafone GH" }, { name: "Melcom Group" }, { name: "Accra Mall" }
            ] } }
          ] },
                   { id: "s-services", type: "section", isVisible: true, styles: { backgroundColor: "#050510", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "12px" }, content: { text: "What We Do", level: "h2" } },
            { id: "sv-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "50px" }, content: { text: "Full-service digital marketing that delivers measurable results" } },
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "📱", title: "Social Media Marketing", desc: "Grow your following and convert fans into paying customers" },
              { icon: "🎯", title: "Paid Advertising", desc: "Facebook, Google & TikTok ads with proven ROI" },
              { icon: "🔍", title: "SEO & Content", desc: "Rank #1 on Google and drive organic traffic 24/7" },
              { icon: "✉️", title: "Email Marketing", desc: "Automated campaigns that nurture and convert leads" },
              { icon: "🎨", title: "Brand Identity", desc: "Logos, visuals and brand guidelines that stand out" },
              { icon: "📊", title: "Analytics & Reporting", desc: "Real-time dashboards so you always know what's working" }
            ] } }
          ] },
          { id: "s-process", type: "section", isVisible: true, styles: { backgroundColor: "#0d0d2b", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Our Process", level: "h2" } },
            { id: "pr-s", type: "steps-process", isVisible: true, isLocked: false, styles: {}, content: { heading: "", steps: [
              { number: "1", title: "Discovery & Audit", desc: "We analyse your current marketing, competitors and growth opportunities" },
              { number: "2", title: "Strategy Creation", desc: "We build a custom growth plan with clear KPIs and timelines" },
              { number: "3", title: "Launch & Execute", desc: "Our team executes campaigns across all agreed channels" },
              { number: "4", title: "Optimise & Scale", desc: "We continuously refine based on data to maximise your ROI" }
            ] } }
          ] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { backgroundColor: "#050510", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "pk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "12px" }, content: { text: "Simple Pricing", level: "h2" } },
            { id: "pk-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "50px" }, content: { text: "No long-term contracts. Cancel anytime." } },
            { id: "pk-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [
              { name: "Starter", price: "GHS 1,500", period: "/month", features: ["2 social platforms", "8 posts/month", "Monthly report", "Email support"], cta: "Get Started" },
              { name: "Growth", price: "GHS 3,500", period: "/month", features: ["4 platforms + Google Ads", "20 posts/month", "Weekly reports", "Dedicated account manager", "SEO included"], cta: "Most Popular", highlighted: true },
              { name: "Scale", price: "GHS 7,500", period: "/month", features: ["All platforms + full stack", "Daily content", "Real-time dashboard", "CMO-level strategy", "PR & influencer marketing"], cta: "Scale Up" }
            ] } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#0d0d2b", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "32px" }, content: { text: "Client Results", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "650px", margin: "0 auto", textAlign: "center" }, content: { quote: "In 6 months, Apex Digital tripled our online sales and reduced our cost-per-lead by 60%. Best investment we've made as a business. Absolute game changers.", author: "Kwame Asante", role: "CEO, Asante Retail Group", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#050510", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "FAQs", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How soon will I see results?", a: "Most clients see measurable results within 30–60 days. SEO typically takes 3–6 months." },
              { q: "Do you work with small businesses?", a: "Yes! We have packages starting from GHS 1,500/month designed for growing businesses." },
              { q: "Can I cancel anytime?", a: "Yes. No long-term contracts. We earn your business every single month." },
              { q: "What's included in the free audit?", a: "A full analysis of your social media, SEO, paid ads and competitor landscape — no cost, no obligation." }
            ] } }
          ] },
          { id: "s-cta", type: "section", isVisible: true, styles: { background: "linear-gradient(135deg,#6272f1,#8b5cf6)", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "16px" }, content: { text: "Ready to Grow? Get Your Free Audit", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Your Name", type: "text", required: true }, { name: "email", label: "Email Address", type: "email", required: true }, { name: "website", label: "Your Website URL", type: "text", required: false }, { name: "budget", label: "Monthly Marketing Budget", type: "text", required: false }], submitText: "Get My Free Audit" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#030308" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#475569" }, content: { text: "© 2025 Apex Digital Agency. We Grow Businesses.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Personal Trainer ──────────────────────────────────────
  {
    id: "personal-trainer",
    name: "Personal Trainer / Coach",
    description: "High-energy template for fitness coaches, PTs and wellness coaches",
    category: "Health",
    thumbnail: "🏆",
    primaryColor: "#f97316",
    secondaryColor: "#fff7ed",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Coach Kofi Fitness", primaryColor: "#f97316", secondaryColor: "#fff7ed", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#09090b", textColor: "#f1f5f9" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Coach Kofi – Personal Trainer & Fitness Coach Ghana", description: "Transform your body and life with expert personal training" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "rgba(9,9,11,0.95)", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { logo: "Coach Kofi", links: [{ label: "Programs", href: "#programs" }, { label: "Results", href: "#results" }, { label: "About", href: "#about" }, { label: "Pricing", href: "#pricing" }], ctaText: "Start Today" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#09090b 0%,#431407 50%,#f97316 100%)", paddingTop: 120, paddingBottom: 100 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: "900", lineHeight: "1.1" }, content: { text: "Transform Your Body. Transform Your Life.", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#94a3b8", fontSize: "1.15rem", margin: "24px auto", maxWidth: "600px", lineHeight: "1.8" }, content: { text: "Certified personal trainer with 8+ years helping people across Accra build the body and confidence they deserve." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "40px" }, content: { text: "Claim Your Free Fitness Assessment", href: "#contact", variant: "primary" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#18181b", paddingTop: 60, paddingBottom: 60 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "500+", label: "Clients Transformed" }, { number: "8yrs", label: "Experience" }, { number: "30kg", label: "Avg Weight Lost" }, { number: "100%", label: "Commitment" }] } }] },
          { id: "s-programs", type: "section", isVisible: true, styles: { backgroundColor: "#09090b", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "pg-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "12px" }, content: { text: "Training Programs", level: "h2" } },
            { id: "pg-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "50px" }, content: { text: "Designed for real people with real goals" } },
            { id: "pg-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "💪", title: "Weight Loss & Toning", desc: "Proven fat-loss programs combining strength and cardio" },
              { icon: "🏋️", title: "Strength Building", desc: "Build real functional strength from the ground up" },
              { icon: "🧘", title: "Body Transformation", desc: "Complete lifestyle coaching for lasting change" },
              { icon: "👥", title: "Group Training", desc: "High-energy group sessions — motivation in numbers" },
              { icon: "🥗", title: "Nutrition Coaching", desc: "Meal plans tailored to Ghanaian foods and lifestyles" },
              { icon: "📱", title: "Online Coaching", desc: "Work with me remotely with daily check-ins and video calls" }
            ] } }
          ] },
          { id: "s-steps", type: "section", isVisible: true, styles: { backgroundColor: "#18181b", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "st-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "How We Work Together", level: "h2" } },
            { id: "st-s", type: "steps-process", isVisible: true, isLocked: false, styles: {}, content: { heading: "", steps: [
              { number: "1", title: "Free Assessment", desc: "We assess your fitness level, goals and lifestyle in a no-obligation call" },
              { number: "2", title: "Custom Plan", desc: "I build your personalised training and nutrition plan from scratch" },
              { number: "3", title: "Train & Track", desc: "We train together (in-person or online) and track every milestone" },
              { number: "4", title: "Achieve & Maintain", desc: "You hit your goal and I teach you how to maintain it for life" }
            ] } }
          ] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { backgroundColor: "#09090b", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "pk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "12px" }, content: { text: "Investment in Yourself", level: "h2" } },
            { id: "pk-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "50px" }, content: { text: "Results-driven coaching packages" } },
            { id: "pk-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [
              { name: "Online", price: "GHS 400", period: "/month", features: ["Custom workout plan", "Nutrition guide", "Weekly check-ins via WhatsApp", "Exercise video library"], cta: "Start Online" },
              { name: "In-Person", price: "GHS 800", period: "/month", features: ["3 sessions/week", "Personalised nutrition plan", "Progress tracking", "Body composition analysis", "24/7 WhatsApp support"], cta: "Train With Me", highlighted: true },
              { name: "Elite", price: "GHS 1,500", period: "/month", features: ["Daily sessions", "Full meal prep guidance", "Supplement advice", "Gym partner privileges", "Monthly photo shoots"], cta: "Go Elite" }
            ] } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#18181b", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "32px" }, content: { text: "Real Results", level: "h2" } },
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "650px", margin: "0 auto", textAlign: "center" }, content: { quote: "I lost 28kg in 5 months working with Coach Kofi. More importantly, I gained my confidence back. He genuinely cares about every client and it shows. My life has completely changed.", author: "Abena Quartey", role: "Client — 28kg lost in 5 months", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#09090b", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Common Questions", level: "h2" } },
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do I need to be fit to start?", a: "Absolutely not! I train complete beginners to advanced athletes. We start where you are." },
              { q: "Do you train women?", a: "Yes! 60% of my clients are women. I specialise in women's body transformation." },
              { q: "Where do sessions take place?", a: "At my gym in East Legon, Accra, or at your home/gym. Online coaching is also available." },
              { q: "How quickly will I see results?", a: "Most clients see visible changes in 4-6 weeks with consistent effort. Results vary by individual." }
            ] } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { background: "linear-gradient(135deg,#f97316,#ef4444)", paddingTop: 70, paddingBottom: 70 }, elements: [
            { id: "wa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "8px" }, content: { text: "Ready to Start? Message Me Now", level: "h2" } },
            { id: "wa-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.85)", marginBottom: "24px" }, content: { text: "I reply within minutes. No commitment required." } },
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello Coach! I'm interested in your training programs. Can we chat?", label: "Message Coach Kofi" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#030305" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#475569" }, content: { text: "© 2025 Coach Kofi Fitness. Transform. Inspire. Win.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Bakery ────────────────────────────────────────────────
  {
    id: "bakery",
    name: "Bakery & Pastry Shop",
    description: "Warm, delicious template for bakeries, cake shops and patisseries",
    category: "Food & Drink",
    thumbnail: "🎂",
    primaryColor: "#d97706",
    secondaryColor: "#fffbeb",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Sweet Crumbs Bakery", primaryColor: "#d97706", secondaryColor: "#fffbeb", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fffbeb", textColor: "#1c0a00" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Sweet Crumbs Bakery – Fresh Baked Daily", description: "Artisan cakes, pastries and breads baked fresh every day in Accra" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "#fff8f0", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "🎂 Sweet Crumbs", links: [{ label: "Menu", href: "#menu" }, { label: "Custom Cakes", href: "#custom" }, { label: "About", href: "#about" }, { label: "Order", href: "#order" }], ctaText: "Order Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#92400e 0%,#d97706 60%,#fbbf24 100%)", paddingTop: 100, paddingBottom: 100 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: "800" }, content: { text: "Baked with Love, Every Single Day", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.9)", fontSize: "1.2rem", margin: "20px auto", maxWidth: "600px", lineHeight: "1.8" }, content: { text: "Artisan breads, celebration cakes and pastries made from scratch using the finest ingredients. Baked fresh every morning in Accra." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", gap: "12px", justifyContent: "center", marginTop: "36px" }, content: { text: "Order Your Cake", href: "#order", variant: "outline" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#92400e", paddingTop: 50, paddingBottom: 50 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fef3c7" }, content: { stats: [{ number: "15+", label: "Years Baking" }, { number: "50+", label: "Daily Varieties" }, { number: "1,000+", label: "Cakes Made" }, { number: "100%", label: "Fresh Daily" }] } }] },
          { id: "s-menu", type: "section", isVisible: true, styles: { backgroundColor: "#fffbeb", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "mn-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "What We Bake", level: "h2" } },
            { id: "mn-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#92400e", marginBottom: "50px" }, content: { text: "Made fresh every morning — no preservatives, ever" } },
            { id: "mn-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "🎂", title: "Celebration Cakes", desc: "Birthdays, weddings, graduations — custom to your theme" },
              { icon: "🥐", title: "Pastries & Croissants", desc: "Buttery, flaky pastries baked fresh every morning" },
              { icon: "🍞", title: "Artisan Breads", desc: "Sourdough, whole wheat and specialty loaves daily" },
              { icon: "🧁", title: "Cupcakes & Muffins", desc: "Dozens of flavours including Ghanaian-inspired varieties" },
              { icon: "🍪", title: "Cookies & Biscuits", desc: "Perfect for gifting, events or just treating yourself" },
              { icon: "📦", title: "Corporate Orders", desc: "Branded cookies and cakes for offices and events" }
            ] } }
          ] },
          { id: "s-custom", type: "section", isVisible: true, styles: { backgroundColor: "#fef3c7", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "cs-it", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "Custom Celebration Cakes", body: "Tell us your vision and we'll bring it to life. From 3-tier wedding cakes to character birthday cakes for kids, our bakers are skilled in every style. We use premium ingredients and can accommodate dietary requirements including gluten-free and vegan options.", image: "", imageLeft: false } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#fffbeb", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "My daughter's birthday cake was absolutely stunning! The whole family couldn't believe how beautiful and delicious it was. Sweet Crumbs has our cake order every year from now on!", author: "Maame Serwaa Boateng", role: "Loyal Customer", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#fef3c7", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How far in advance should I order a custom cake?", a: "We recommend at least 5-7 days for custom cakes. For wedding cakes, 4-6 weeks minimum." },
              { q: "Do you deliver?", a: "Yes! We deliver within Accra for a small fee. Free delivery on orders above GHS 200." },
              { q: "Do you make eggless or gluten-free cakes?", a: "Yes, we accommodate most dietary requirements. Please mention this when ordering." },
              { q: "Can I visit the bakery?", a: "Yes! We welcome visitors Monday–Saturday 7am–6pm at our location in Osu, Accra." }
            ] } }
          ] },
          { id: "s-order", type: "section", isVisible: true, styles: { backgroundColor: "#d97706", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "or-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "12px" }, content: { text: "Place Your Order", level: "h2" } },
            { id: "or-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "540px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Your Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "item", label: "What would you like?", type: "text", required: true }, { name: "date", label: "Date Needed", type: "text", required: true }, { name: "details", label: "Special instructions or design notes", type: "textarea", required: false }], submitText: "Submit Order" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { backgroundColor: "#92400e", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello! I'd like to order from Sweet Crumbs Bakery.", label: "Order on WhatsApp" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#1c0a00" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#92400e" }, content: { text: "© 2025 Sweet Crumbs Bakery. Baked with love daily.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Online Academy ────────────────────────────────────────
  {
    id: "online-academy",
    name: "Online Academy / Courses",
    description: "Professional template for online educators and course creators",
    category: "Education",
    thumbnail: "🎯",
    primaryColor: "#7c3aed",
    secondaryColor: "#f5f3ff",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "EduVault Academy", primaryColor: "#7c3aed", secondaryColor: "#f5f3ff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#fafafa", textColor: "#1e293b" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "EduVault Academy – Learn Skills That Pay", description: "Professional online courses for Ghanaian learners and professionals" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "EduVault", links: [{ label: "Courses", href: "#courses" }, { label: "How It Works", href: "#how" }, { label: "Instructors", href: "#instructors" }, { label: "Pricing", href: "#pricing" }], ctaText: "Start Learning" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#2e1065 0%,#7c3aed 60%,#a78bfa 100%)", paddingTop: 110, paddingBottom: 100 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: "900", lineHeight: "1.1" }, content: { text: "Learn Skills That Actually Pay", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.85)", fontSize: "1.2rem", margin: "24px auto", maxWidth: "650px", lineHeight: "1.8" }, content: { text: "Practical, career-changing courses designed for Ghanaian learners. Learn at your own pace and get certified." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", gap: "12px", marginTop: "40px" }, content: { text: "Browse Courses →", href: "#courses", variant: "outline" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#2e1065", paddingTop: 60, paddingBottom: 60 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "25,000+", label: "Students Enrolled" }, { number: "80+", label: "Courses Available" }, { number: "4.8★", label: "Average Rating" }, { number: "95%", label: "Completion Rate" }] } }] },
          { id: "s-courses", type: "section", isVisible: true, styles: { backgroundColor: "#fafafa", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "cr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Popular Courses", level: "h2" } },
            { id: "cr-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "50px" }, content: { text: "Career-focused skills for the modern African professional" } },
            { id: "cr-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "💻", title: "Tech & Programming", desc: "Web development, Python, data science and cybersecurity" },
              { icon: "📊", title: "Business & Finance", desc: "Accounting, entrepreneurship and financial modelling" },
              { icon: "📱", title: "Digital Marketing", desc: "Social media, SEO, Google Ads and content creation" },
              { icon: "🎨", title: "Design & Creative", desc: "Graphic design, video editing and UI/UX design" },
              { icon: "📋", title: "Project Management", desc: "PMP, Agile, Scrum and team leadership" },
              { icon: "🌍", title: "Languages", desc: "English proficiency, French and professional communication" }
            ] } }
          ] },
          { id: "s-how", type: "section", isVisible: true, styles: { backgroundColor: "#f5f3ff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "hw-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "How It Works", level: "h2" } },
            { id: "hw-s", type: "steps-process", isVisible: true, isLocked: false, styles: {}, content: { heading: "", steps: [
              { number: "1", title: "Choose Your Course", desc: "Browse our library and pick the skill that will advance your career" },
              { number: "2", title: "Learn at Your Pace", desc: "Access video lessons, resources and projects on any device, anytime" },
              { number: "3", title: "Get Certified", desc: "Complete assignments and earn a verifiable digital certificate" },
              { number: "4", title: "Land Opportunities", desc: "Join our alumni network and get job placement support" }
            ] } }
          ] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { backgroundColor: "#fafafa", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "pk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Simple Pricing", level: "h2" } },
            { id: "pk-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "50px" }, content: { text: "Learn everything for one affordable price" } },
            { id: "pk-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [
              { name: "Free", price: "GHS 0", period: "", features: ["3 free courses", "Community access", "Course previews", "Basic certificate"], cta: "Start Free" },
              { name: "Pro", price: "GHS 99", period: "/month", features: ["Unlimited courses", "HD video quality", "Downloadable resources", "Verified certificate", "1-on-1 tutor access"], cta: "Go Pro", highlighted: true },
              { name: "Business", price: "GHS 499", period: "/month", features: ["Up to 20 team members", "All Pro features", "Custom learning paths", "Progress tracking", "Company certificate"], cta: "For Teams" }
            ] } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#f5f3ff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "650px", margin: "0 auto", textAlign: "center" }, content: { quote: "I completed the Web Development course and landed a job at a tech startup within 3 months! EduVault's practical approach made all the difference. Worth every pesewa.", author: "Ama Owusu-Acheampong", role: "Web Developer — Graduate 2024", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#fafafa", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Are the certificates internationally recognised?", a: "Our certificates are blockchain-verified and accepted by many employers across Africa and beyond." },
              { q: "Can I learn at my own pace?", a: "Yes! All courses are self-paced. Once enrolled, you have lifetime access." },
              { q: "What if I don't like a course?", a: "We offer a full refund within 7 days of enrollment, no questions asked." },
              { q: "Do I need a fast internet connection?", a: "You can download lessons to watch offline. Perfect for areas with slow connectivity." }
            ] } }
          ] },
          { id: "s-cta", type: "section", isVisible: true, styles: { background: "linear-gradient(135deg,#7c3aed,#2e1065)", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "16px" }, content: { text: "Start Learning Today — It's Free", level: "h2" } },
            { id: "ct-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", marginBottom: "32px" }, content: { text: "Join 25,000+ learners building skills that matter." } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "440px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Your Name", type: "text", required: true }, { name: "email", label: "Email Address", type: "email", required: true }], submitText: "Create Free Account" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#0f0720" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#6b21a8" }, content: { text: "© 2025 EduVault Academy. Learn. Grow. Succeed.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Architecture Firm ─────────────────────────────────────
  {
    id: "architecture",
    name: "Architecture Firm",
    description: "Sleek, minimal template for architects and design firms",
    category: "Creative",
    thumbnail: "🏗️",
    primaryColor: "#1e293b",
    secondaryColor: "#f8fafc",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Form & Structure Architects", primaryColor: "#1e293b", secondaryColor: "#f8fafc", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#ffffff", textColor: "#0f172a" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Form & Structure – Architecture & Design Ghana", description: "Award-winning architecture and interior design firm based in Accra" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "F&S Architects", links: [{ label: "Projects", href: "#projects" }, { label: "Services", href: "#services" }, { label: "Studio", href: "#studio" }, { label: "Contact", href: "#contact" }], ctaText: "Start a Project" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { backgroundColor: "#0f172a", paddingTop: 130, paddingBottom: 130 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: "200", letterSpacing: "0.1em" }, content: { text: "Architecture That Endures", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#94a3b8", fontSize: "1.1rem", margin: "24px auto", maxWidth: "600px", lineHeight: "2", letterSpacing: "0.05em" }, content: { text: "We design spaces that inspire, function beautifully and stand the test of time. From private residences to landmark commercial projects across Ghana." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "50px" }, content: { text: "View Our Portfolio", href: "#projects", variant: "outline" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 60, paddingBottom: 60 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "120+", label: "Projects Completed" }, { number: "18yrs", label: "Experience" }, { number: "12", label: "Design Awards" }, { number: "98%", label: "Client Retention" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Our Disciplines", level: "h2" } },
            { id: "sv-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "50px" }, content: { text: "From concept to completion" } },
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "🏢", title: "Commercial Architecture", desc: "Office complexes, retail spaces and hospitality buildings" },
              { icon: "🏠", title: "Residential Design", desc: "Custom homes, estates and luxury villa projects" },
              { icon: "🛋️", title: "Interior Architecture", desc: "Thoughtful spaces that balance beauty and function" },
              { icon: "📐", title: "Urban Planning", desc: "Master planning for mixed-use and community developments" },
              { icon: "📜", title: "Permitting & Approval", desc: "Navigating Ghana building codes and local authority approvals" },
              { icon: "🔍", title: "Project Management", desc: "End-to-end oversight from ground-breaking to handover" }
            ] } }
          ] },
          { id: "s-projects", type: "section", isVisible: true, styles: { backgroundColor: "#0f172a", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Selected Projects", level: "h2" } },
            { id: "pr-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-studio", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "ab1", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "The Studio", body: "Founded in 2006 by principal architect Emmanuel Asante-Mensah, Form & Structure has grown into one of Ghana's most respected design practices. Our team of 24 architects, designers and engineers brings diverse expertise to every project, guided by a shared belief that great architecture improves lives.", image: "", imageLeft: true } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "650px", margin: "0 auto", textAlign: "center" }, content: { quote: "Form & Structure delivered a building that has become a landmark in our neighbourhood. The design is timeless, the functionality is perfect and the project was delivered on time and budget.", author: "Mr. Kweku Darko-Mensah", role: "CEO, Darko Real Estate Group", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How long does a typical project take?", a: "Residential designs take 3-6 months. Commercial projects typically take 6-18 months from concept to completion." },
              { q: "Do you handle building permits?", a: "Yes, we manage all permitting, EPA approvals and local authority submissions on your behalf." },
              { q: "Do you work outside Accra?", a: "Yes, we have completed projects in Kumasi, Takoradi, Cape Coast and internationally." },
              { q: "What's the minimum project size?", a: "We work on projects of all sizes, from home extensions to large commercial developments." }
            ] } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { backgroundColor: "#0f172a", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Start a Project", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "560px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Your Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "type", label: "Project Type", type: "text", required: true }, { name: "location", label: "Project Location", type: "text", required: false }, { name: "brief", label: "Brief Description", type: "textarea", required: false }], submitText: "Submit Brief" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#020617" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#475569" }, content: { text: "© 2025 Form & Structure Architects. Designed in Ghana.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Dental Clinic ─────────────────────────────────────────
  {
    id: "dental-clinic",
    name: "Dental Clinic",
    description: "Clean, professional template for dentists and dental practices",
    category: "Healthcare",
    thumbnail: "🦷",
    primaryColor: "#0ea5e9",
    secondaryColor: "#f0f9ff",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "SmileCare Dental Clinic", primaryColor: "#0ea5e9", secondaryColor: "#f0f9ff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0f9ff", textColor: "#0c4a6e" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "SmileCare Dental – Your Smile Experts in Accra", description: "Modern, pain-free dental care for the whole family in Accra" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "SmileCare Dental", links: [{ label: "Services", href: "#services" }, { label: "Team", href: "#team" }, { label: "Patients", href: "#patients" }, { label: "Book", href: "#book" }], ctaText: "Book Appointment" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0c4a6e 0%,#0ea5e9 60%,#7dd3fc 100%)", paddingTop: 100, paddingBottom: 100 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: "800" }, content: { text: "Your Perfect Smile Starts Here", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.9)", fontSize: "1.15rem", margin: "20px auto", maxWidth: "600px", lineHeight: "1.8" }, content: { text: "Modern, compassionate dental care using the latest technology. We make dentistry comfortable and pain-free for every patient." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "36px" }, content: { text: "Book Your Appointment Today", href: "#book", variant: "outline" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#0c4a6e", paddingTop: 50, paddingBottom: 50 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "5,000+", label: "Happy Patients" }, { number: "15yrs", label: "Experience" }, { number: "6", label: "Specialist Dentists" }, { number: "4.9★", label: "Patient Rating" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Our Services", level: "h2" } },
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "🦷", title: "General Dentistry", desc: "Checkups, fillings, cleanings and preventive care" },
              { icon: "✨", title: "Teeth Whitening", desc: "Professional whitening for a brighter, confident smile" },
              { icon: "🔧", title: "Dental Implants", desc: "Permanent tooth replacement that looks and feels natural" },
              { icon: "😁", title: "Orthodontics", desc: "Braces and clear aligners to straighten your smile" },
              { icon: "🛡️", title: "Gum Treatment", desc: "Diagnosis and treatment of gum disease" },
              { icon: "👶", title: "Children's Dentistry", desc: "Gentle, fun dental care for kids of all ages" }
            ] } }
          ] },
          { id: "s-about", type: "section", isVisible: true, styles: { backgroundColor: "#f0f9ff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "ab1", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "Modern Care, Gentle Touch", body: "SmileCare Dental was founded in 2009 by Dr. Adwoa Mensah with a mission to bring world-class dental care to Accra. Our clinic is equipped with digital X-rays, laser technology and pain-free anaesthesia systems. We believe great dental health leads to great overall health.", image: "", imageLeft: false } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "I used to be terrified of the dentist until I came here. The team is so calm and gentle — I now look forward to my checkups! My smile transformation has given me so much confidence.", author: "Efua Asante-Boateng", role: "Patient for 5 years", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#f0f9ff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Is dental treatment painful?", a: "We use modern anaesthesia and laser techniques to make treatment as comfortable as possible." },
              { q: "Do you accept walk-ins?", a: "We prefer appointments but accept walk-ins for emergencies. Call us first if possible." },
              { q: "How much does a checkup cost?", a: "A standard checkup and clean starts from GHS 150. Specialist treatments are quoted separately." },
              { q: "Do you treat children?", a: "Yes! We have a dedicated children's dental suite designed to make kids feel safe and comfortable." }
            ] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { backgroundColor: "#0ea5e9", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Book Your Appointment", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "560px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "phone", label: "Phone Number", type: "tel", required: true }, { name: "email", label: "Email", type: "email", required: false }, { name: "service", label: "Service Needed", type: "text", required: false }, { name: "date", label: "Preferred Date & Time", type: "text", required: false }], submitText: "Book Appointment" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { backgroundColor: "#0c4a6e", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello SmileCare! I'd like to book a dental appointment.", label: "Book on WhatsApp" } }
          ] },
          { id: "s-hours", type: "section", isVisible: true, styles: { paddingTop: 70, paddingBottom: 70, backgroundColor: "#fff" }, elements: [
            { id: "hr-el", type: "business-hours", isVisible: true, isLocked: false, styles: {}, content: { title: "Opening Hours", hours: [{ day: "Monday – Wednesday", time: "8:00am – 5:00pm" }, { day: "Thursday", time: "8:00am – 7:00pm" }, { day: "Friday", time: "8:00am – 5:00pm" }, { day: "Saturday", time: "9:00am – 1:00pm" }, { day: "Sunday", time: "Closed" }] } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#082f49" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#7dd3fc" }, content: { text: "© 2025 SmileCare Dental Clinic. Your smile is our priority.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Makeup Artist ─────────────────────────────────────────
  {
    id: "makeup-artist",
    name: "Makeup Artist / MUA",
    description: "Glamorous template for makeup artists and beauty professionals",
    category: "Beauty",
    thumbnail: "💋",
    primaryColor: "#be185d",
    secondaryColor: "#fdf2f8",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Glam by Ama", primaryColor: "#be185d", secondaryColor: "#fdf2f8", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fdf2f8", textColor: "#1a0010" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Glam by Ama – Professional Makeup Artist in Accra", description: "Bridal, event and editorial makeup services across Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "rgba(253,242,248,0.95)", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Glam by Ama", links: [{ label: "Services", href: "#services" }, { label: "Portfolio", href: "#portfolio" }, { label: "Packages", href: "#packages" }, { label: "Book", href: "#book" }], ctaText: "Book Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#500724 0%,#be185d 60%,#f9a8d4 100%)", paddingTop: 110, paddingBottom: 100 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: "300", letterSpacing: "0.05em" }, content: { text: "Where Beauty Meets Artistry", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.9)", fontSize: "1.15rem", margin: "20px auto", maxWidth: "600px", lineHeight: "1.9" }, content: { text: "Professional makeup artist specialising in bridal, editorial and event glam. Because every woman deserves to feel breathtakingly beautiful." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "40px" }, content: { text: "Book Your Glam Session", href: "#book", variant: "outline" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#500724", paddingTop: 50, paddingBottom: 50 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fce7f3" }, content: { stats: [{ number: "800+", label: "Clients Glammed" }, { number: "7yrs", label: "Professional Experience" }, { number: "200+", label: "Bridal Bookings" }, { number: "4.9★", label: "Rating" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "My Services", level: "h2" } },
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "👰", title: "Bridal Makeup", desc: "Your wedding day look — flawless, long-lasting and uniquely you" },
              { icon: "✨", title: "Event & Party Glam", desc: "Graduations, parties, galas and special occasions" },
              { icon: "📸", title: "Editorial & Shoots", desc: "Magazine, portfolio and commercial photography makeup" },
              { icon: "🎬", title: "Film & TV Makeup", desc: "Movie sets, music videos and TV production" },
              { icon: "💋", title: "Airbrush Makeup", desc: "Flawless, weightless coverage for all skin tones" },
              { icon: "📚", title: "Makeup Masterclass", desc: "Learn professional makeup application techniques" }
            ] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { backgroundColor: "#fdf2f8", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Portfolio", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-packages", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "pk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "50px" }, content: { text: "Bridal Packages", level: "h2" } },
            { id: "pk-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [
              { name: "Classic Bride", price: "GHS 600", period: "", features: ["Bridal makeup", "Lashes included", "Touch-up kit", "1hr session"], cta: "Book Now" },
              { name: "Glam Bride", price: "GHS 1,200", period: "", features: ["Bride + 2 bridesmaids", "Trial session included", "Airbrush option", "All-day touch-ups", "Hairstyling coordination"], cta: "Most Booked", highlighted: true },
              { name: "Full Bridal Suite", price: "GHS 2,500", period: "", features: ["Full bridal party", "Getting-ready photoshoot", "2 trial sessions", "All-day on-site service", "Reception refresh"], cta: "Enquire" }
            ] } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#fdf2f8", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Ama is a true artist! She understood my vision perfectly and I felt like a queen on my wedding day. Every photo is stunning. I wouldn't trust anyone else with my face!", author: "Naomi Osei-Bonsu", role: "Bride — November 2024", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do you do a trial session?", a: "Yes! I highly recommend a trial 2-4 weeks before your event, especially for brides." },
              { q: "Do you travel to my venue?", a: "Yes, I'm fully mobile across Greater Accra and beyond (travel fees may apply)." },
              { q: "What skin tones do you work with?", a: "I specialise in all African skin tones and carry products from deep ebony to golden brown." },
              { q: "How far in advance should I book?", a: "For weddings, book 3-6 months ahead. Regular events need at least 2 weeks notice." }
            ] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { backgroundColor: "#be185d", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Book Your Session", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "520px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Your Name", type: "text", required: true }, { name: "phone", label: "WhatsApp Number", type: "tel", required: true }, { name: "event", label: "Type of Event", type: "text", required: true }, { name: "date", label: "Event Date", type: "text", required: true }, { name: "notes", label: "Look you're going for?", type: "textarea", required: false }], submitText: "Request Booking" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { backgroundColor: "#500724", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello Ama! I'd like to book a makeup session with you.", label: "Book via WhatsApp" } }
          ] },
          { id: "s-compare", type: "section", isVisible: true, styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#f8fafc" }, elements: [
            { id: "cmp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "See the Difference", level: "h2" } },
            { id: "cmp-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "Real results from our clients" } },
            { id: "cmp-el", type: "image-compare", isVisible: true, isLocked: false, styles: {}, content: { beforeImage: "", afterImage: "", beforeLabel: "Before Makeup", afterLabel: "After Glam" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#1a0010" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#be185d" }, content: { text: "© 2025 Glam by Ama. Because you deserve to feel beautiful.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Rooftop Bar / Nightclub ───────────────────────────────
  {
    id: "rooftop-bar",
    name: "Bar / Nightclub",
    description: "Atmospheric dark template for bars, clubs and entertainment venues",
    category: "Food & Drink",
    thumbnail: "🍸",
    primaryColor: "#f59e0b",
    secondaryColor: "#fffbeb",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Skyline Bar & Lounge", primaryColor: "#f59e0b", secondaryColor: "#fffbeb", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#050207", textColor: "#f8fafc" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Skyline Bar & Lounge – Accra's Finest Rooftop Experience", description: "Craft cocktails, stunning views and unforgettable nights in Accra" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "rgba(5,2,7,0.95)", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { logo: "SKYLINE", links: [{ label: "Menu", href: "#menu" }, { label: "Events", href: "#events" }, { label: "Reserve", href: "#reserve" }, { label: "Gallery", href: "#gallery" }], ctaText: "Reserve Table" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(180deg,#050207 0%,#1c0a3e 50%,#f59e0b22 100%)", paddingTop: 130, paddingBottom: 130 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(3rem,7vw,6rem)", fontWeight: "900", letterSpacing: "0.1em" }, content: { text: "SKYLINE", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#f59e0b", fontSize: "1.1rem", margin: "16px auto", maxWidth: "600px", letterSpacing: "0.2em" }, content: { text: "ACCRA'S PREMIER ROOFTOP EXPERIENCE" } },
            { id: "h3", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#94a3b8", fontSize: "1rem", margin: "16px auto 40px", maxWidth: "500px", lineHeight: "1.8" }, content: { text: "Craft cocktails, panoramic city views and an electric atmosphere — every night of the week." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { text: "Reserve Your Table", href: "#reserve", variant: "primary" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#0d0720", paddingTop: 50, paddingBottom: 50 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "12th", label: "Floor Views" }, { number: "80+", label: "Cocktails & Spirits" }, { number: "5,000+", label: "Happy Guests Monthly" }, { number: "Fri-Sun", label: "Live Music" }] } }] },
          { id: "s-menu", type: "section", isVisible: true, styles: { backgroundColor: "#050207", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "mn-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "50px" }, content: { text: "What We Offer", level: "h2" } },
            { id: "mn-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "🍸", title: "Craft Cocktails", desc: "Signature concoctions by our award-winning mixologists" },
              { icon: "🥃", title: "Premium Spirits", desc: "An extensive selection of whiskies, rums and gins" },
              { icon: "🍷", title: "Wine Collection", desc: "Curated Old and New World wines by the glass or bottle" },
              { icon: "🍽️", title: "Tapas & Small Plates", desc: "Sharing plates designed to complement your drinks" },
              { icon: "🎵", title: "Live Entertainment", desc: "Live bands, DJs and themed nights every weekend" },
              { icon: "🎉", title: "Private Events", desc: "Exclusive venue hire for birthdays, corporates and launches" }
            ] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { backgroundColor: "#0d0720", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "The Atmosphere", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#050207", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "What are your opening hours?", a: "We open Wednesday–Sunday from 5pm. Fridays and Saturdays until 3am." },
              { q: "Is there a dress code?", a: "Smart casual. We reserve the right to refuse entry to inappropriately dressed guests." },
              { q: "Can I book a table?", a: "Yes! Table reservations are strongly recommended on weekends. Book via our form or WhatsApp." },
              { q: "Do you host private events?", a: "Yes, we have dedicated private sections available for exclusive hire. Contact us for packages." }
            ] } }
          ] },
          { id: "s-reserve", type: "section", isVisible: true, styles: { backgroundColor: "#0d0720", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "rv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Reserve Your Table", level: "h2" } },
            { id: "rv-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "520px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "date", label: "Date & Time", type: "text", required: true }, { name: "guests", label: "Number of Guests", type: "text", required: true }, { name: "occasion", label: "Special Occasion?", type: "text", required: false }], submitText: "Reserve Now" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { background: "linear-gradient(135deg,#1c0a3e,#f59e0b22)", paddingTop: 60, paddingBottom: 60 }, elements: [
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hi Skyline! I'd like to reserve a table.", label: "Reserve on WhatsApp" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#030105" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#f59e0b44" }, content: { text: "© 2025 Skyline Bar & Lounge. Accra's rooftop experience.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Travel Agency ─────────────────────────────────────────
  {
    id: "travel-agency",
    name: "Travel Agency",
    description: "Vibrant template for travel agents, tour operators and holiday packages",
    category: "Services",
    thumbnail: "✈️",
    primaryColor: "#0891b2",
    secondaryColor: "#ecfeff",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Horizon Travel & Tours", primaryColor: "#0891b2", secondaryColor: "#ecfeff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0fdff", textColor: "#083344" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Horizon Travel & Tours – Ghana's Premier Travel Agency", description: "Dream holidays, visa assistance and group tours across Africa and beyond" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Horizon Travel", links: [{ label: "Packages", href: "#packages" }, { label: "Destinations", href: "#destinations" }, { label: "Visa Help", href: "#visa" }, { label: "Contact", href: "#contact" }], ctaText: "Get Quote" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#083344 0%,#0891b2 50%,#22d3ee 100%)", paddingTop: 110, paddingBottom: 100 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: "800" }, content: { text: "Your Dream Holiday Awaits", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.9)", fontSize: "1.2rem", margin: "20px auto", maxWidth: "600px", lineHeight: "1.8" }, content: { text: "Affordable holiday packages, visa assistance and unforgettable group tours across Africa, Europe, Dubai and beyond." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "40px" }, content: { text: "Get a Free Travel Quote", href: "#quote", variant: "outline" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#083344", paddingTop: 50, paddingBottom: 50 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "5,000+", label: "Travellers Served" }, { number: "50+", label: "Destinations" }, { number: "10yrs", label: "Experience" }, { number: "4.8★", label: "Client Rating" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "What We Offer", level: "h2" } },
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "✈️", title: "Flight Bookings", desc: "Best fares on domestic and international flights" },
              { icon: "🏨", title: "Hotel & Resort Packages", desc: "Handpicked accommodation from budget to luxury" },
              { icon: "🌍", title: "African Safari & Tours", desc: "Wildlife safaris, beach getaways and cultural tours" },
              { icon: "📋", title: "Visa Assistance", desc: "Schengen, UK, US and other visa applications handled" },
              { icon: "👥", title: "Group Tours", desc: "Organised group travel with like-minded Ghanaians" },
              { icon: "💑", title: "Honeymoon Packages", desc: "Romantic getaways designed for newlyweds" }
            ] } }
          ] },
          { id: "s-destinations", type: "section", isVisible: true, styles: { backgroundColor: "#f0fdff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "ds-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Popular Destinations", level: "h2" } },
            { id: "ds-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#0891b2", marginBottom: "50px" }, content: { text: "📍 Dubai · London · Paris · New York · Nairobi · Cape Town · Zanzibar · Istanbul · Bangkok · Maldives" } },
            { id: "ds-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 4 } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "650px", margin: "0 auto", textAlign: "center" }, content: { quote: "My Dubai trip was absolutely magical! Everything was arranged seamlessly — flights, hotel, transfers and tours. Horizon Travel took care of everything and I just enjoyed the trip.", author: "Dr. Abena Frimpong", role: "Traveller — Dubai Package", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#f0fdff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do you help with visa applications?", a: "Yes! We assist with Schengen, UK, US, Canadian and other visa applications." },
              { q: "What is included in your packages?", a: "Packages typically include flights, accommodation, airport transfers and select tours. Details vary per package." },
              { q: "Can I travel solo or only in groups?", a: "Both! We arrange solo trips and have regular group tours that you can join." },
              { q: "How do I pay?", a: "We accept mobile money, bank transfer and instalments are available for some packages." }
            ] } }
          ] },
          { id: "s-quote", type: "section", isVisible: true, styles: { backgroundColor: "#0891b2", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "qt-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Get Your Free Travel Quote", level: "h2" } },
            { id: "qt-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "560px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "destination", label: "Where would you like to go?", type: "text", required: true }, { name: "travelers", label: "Number of Travellers", type: "text", required: true }, { name: "dates", label: "Preferred Travel Dates", type: "text", required: false }, { name: "budget", label: "Budget (per person)", type: "text", required: false }], submitText: "Get My Free Quote" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { backgroundColor: "#083344", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello Horizon Travel! I'd like a travel quote.", label: "Chat With a Travel Agent" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#041c24" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#0891b2" }, content: { text: "© 2025 Horizon Travel & Tours. Explore More, Stress Less.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Jewellery Store ───────────────────────────────────────
  {
    id: "jewellery",
    name: "Jewellery Store",
    description: "Luxurious template for jewellers and accessories boutiques",
    category: "Fashion",
    thumbnail: "💎",
    primaryColor: "#b45309",
    secondaryColor: "#fffbeb",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Aurum Jewellers", primaryColor: "#b45309", secondaryColor: "#fffbeb", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fffbeb", textColor: "#1c0a00" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Aurum Jewellers – Handcrafted Fine Jewellery in Ghana", description: "Exquisite gold, diamond and gemstone jewellery handcrafted in Accra" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "rgba(255,251,235,0.95)", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "AURUM", links: [{ label: "Collections", href: "#collections" }, { label: "Custom", href: "#custom" }, { label: "About", href: "#about" }, { label: "Visit Us", href: "#contact" }], ctaText: "Shop Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1c0a00 0%,#78350f 50%,#b45309 100%)", paddingTop: 120, paddingBottom: 120 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fef3c7", fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: "300", letterSpacing: "0.15em" }, content: { text: "CRAFTED FOR ETERNITY", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fde68a", fontSize: "1.1rem", margin: "20px auto", maxWidth: "580px", lineHeight: "1.9", letterSpacing: "0.05em" }, content: { text: "Handcrafted fine jewellery in 18k and 22k gold, diamonds and precious gemstones. Every piece tells a story. Yours begins here." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "40px" }, content: { text: "Explore Collections", href: "#collections", variant: "outline" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#78350f", paddingTop: 50, paddingBottom: 50 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fef3c7" }, content: { stats: [{ number: "25yrs", label: "Of Craftsmanship" }, { number: "3,000+", label: "Pieces Created" }, { number: "18k & 22k", label: "Gold Used" }, { number: "100%", label: "Handcrafted" }] } }] },
          { id: "s-collections", type: "section", isVisible: true, styles: { backgroundColor: "#fffbeb", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "cl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Our Collections", level: "h2" } },
            { id: "cl-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "💍", title: "Engagement Rings", desc: "Timeless diamond and gemstone rings for your special moment" },
              { icon: "📿", title: "Necklaces & Pendants", desc: "Gold chains, pendants and statement necklaces" },
              { icon: "🌟", title: "Earrings", desc: "Studs, hoops and chandelier earrings for every occasion" },
              { icon: "⌚", title: "Bracelets & Bangles", desc: "Gold and gemstone pieces from delicate to bold" },
              { icon: "👑", title: "Bridal Sets", desc: "Matching wedding sets crafted to perfection" },
              { icon: "🎁", title: "Custom Designs", desc: "Your vision brought to life by our master jewellers" }
            ] } }
          ] },
          { id: "s-custom", type: "section", isVisible: true, styles: { backgroundColor: "#fef3c7", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "cs-it", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "Custom Jewellery Design", body: "Have a vision in your mind? Our master goldsmiths will bring it to life. We work with your design ideas, photos or sketches to craft a one-of-a-kind piece. Perfect for engagement rings, anniversaries and meaningful gifts. Consultation is free.", image: "", imageLeft: true } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { backgroundColor: "#1c0a00", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fef3c7", marginBottom: "40px" }, content: { text: "Featured Pieces", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#fffbeb", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "Aurum crafted my wife's engagement ring from scratch based on my description. It was beyond perfect — she cried when she saw it! Every detail was exactly as I imagined. True masters of their craft.", author: "Emmanuel Osei-Mensah", role: "Customer", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#fef3c7", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do you use certified gold?", a: "Yes, all our pieces use certified 18k and 22k gold from verified Ghanaian sources." },
              { q: "How long does custom jewellery take?", a: "Custom pieces typically take 2-4 weeks depending on complexity and design." },
              { q: "Do you offer resizing?", a: "Yes, we offer free resizing within 30 days of purchase on all rings." },
              { q: "Can I sell old gold jewellery to you?", a: "Yes, we buy old gold jewellery at fair market rates and can melt it into a new piece." }
            ] } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { backgroundColor: "#78350f", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fef3c7", marginBottom: "40px" }, content: { text: "Visit Our Showroom or Order Online", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "540px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Your Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "interest", label: "What are you looking for?", type: "text", required: true }, { name: "budget", label: "Approximate Budget (GHS)", type: "text", required: false }, { name: "message", label: "Any specific details?", type: "textarea", required: false }], submitText: "Send Enquiry" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { backgroundColor: "#1c0a00", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello Aurum! I'm interested in your jewellery.", label: "Chat With a Jeweller" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#0c0500" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#b45309" }, content: { text: "© 2025 Aurum Jewellers. Crafted for eternity.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Coworking Space ───────────────────────────────────────
  {
    id: "coworking",
    name: "Coworking Space",
    description: "Modern template for coworking spaces and business centres",
    category: "Business",
    thumbnail: "💼",
    primaryColor: "#0d9488",
    secondaryColor: "#f0fdfa",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Nexus Hub – Coworking Accra", primaryColor: "#0d9488", secondaryColor: "#f0fdfa", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0fdfa", textColor: "#0f3430" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Nexus Hub – Premium Coworking Space in Accra", description: "Hot desks, private offices and meeting rooms in the heart of Accra" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Nexus Hub", links: [{ label: "Spaces", href: "#spaces" }, { label: "Amenities", href: "#amenities" }, { label: "Pricing", href: "#pricing" }, { label: "Community", href: "#community" }], ctaText: "Book a Tour" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#042f2e 0%,#0d9488 60%,#2dd4bf 100%)", paddingTop: 110, paddingBottom: 100 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: "800" }, content: { text: "Work Better. Together.", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.9)", fontSize: "1.15rem", margin: "20px auto", maxWidth: "620px", lineHeight: "1.8" }, content: { text: "Premium coworking space in the heart of Accra. Hot desks, private offices, meeting rooms and a community of ambitious professionals." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "40px" }, content: { text: "Book a Free Tour", href: "#book", variant: "outline" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#042f2e", paddingTop: 50, paddingBottom: 50 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "500+", label: "Members" }, { number: "120", label: "Desks Available" }, { number: "8", label: "Meeting Rooms" }, { number: "24/7", label: "Access" }] } }] },
          { id: "s-spaces", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "sp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Our Spaces", level: "h2" } },
            { id: "sp-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "🪑", title: "Hot Desks", desc: "Flexible daily or monthly desks in our open workspace" },
              { icon: "🏢", title: "Private Offices", desc: "Lockable offices for teams of 1-20 people" },
              { icon: "📊", title: "Meeting Rooms", desc: "Bookable rooms with projectors, whiteboards and video conferencing" },
              { icon: "🎤", title: "Event Space", desc: "250-person venue for launches, conferences and workshops" },
              { icon: "☕", title: "Cafe & Lounge", desc: "On-site café with premium coffee and healthy food options" },
              { icon: "📮", title: "Registered Address", desc: "Use our address as your official business address" }
            ] } }
          ] },
          { id: "s-amenities", type: "section", isVisible: true, styles: { backgroundColor: "#f0fdfa", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "am-it", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "Everything You Need to Focus", body: "Nexus Hub provides 1Gbps fibre internet, 24/7 security and building access, air conditioning, printing and scanning, daily cleaning, complimentary coffee and tea, standing desks on request, and a rooftop terrace for when you need a break.", image: "", imageLeft: false } }
          ] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "pk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "50px" }, content: { text: "Simple Monthly Plans", level: "h2" } },
            { id: "pk-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [
              { name: "Day Pass", price: "GHS 80", period: "/day", features: ["Hot desk access", "Wifi & power", "Café access", "8am–8pm"], cta: "Get Day Pass" },
              { name: "Flex Member", price: "GHS 600", period: "/month", features: ["10 days/month", "Mail & address service", "2 meeting room hours", "Community events", "24/7 access"], cta: "Go Flex", highlighted: true },
              { name: "Dedicated Desk", price: "GHS 1,200", period: "/month", features: ["Your own locked desk", "Unlimited access", "8 meeting room hours", "1 guest per day", "Storage locker"], cta: "Get My Desk" }
            ] } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#f0fdfa", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "650px", margin: "0 auto", textAlign: "center" }, content: { quote: "Nexus Hub transformed how I work. The environment is inspiring, the internet is fast and the community is incredible. I've made 3 business partnerships just from being here. Worth every pesewa.", author: "Yaa Darko-Asante", role: "Freelance Consultant & Member", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Can I bring clients to meetings?", a: "Yes! All plans include guest access. Meeting rooms can be booked for client meetings." },
              { q: "Is there parking available?", a: "Yes, we have 50 parking spaces available for members. Street parking is also nearby." },
              { q: "Can I pay daily?", a: "Yes, daily passes are available at GHS 80/day. No commitment required." },
              { q: "Do you host networking events?", a: "Yes! We run monthly member mixers, skill workshops and business pitch nights." }
            ] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { backgroundColor: "#0d9488", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Book a Free Tour", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Your Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "date", label: "Preferred Tour Date", type: "text", required: false }, { name: "plan", label: "Plan you're interested in", type: "text", required: false }], submitText: "Schedule My Tour" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { backgroundColor: "#042f2e", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello Nexus Hub! I'd like to book a tour of the coworking space.", label: "Book a Tour via WhatsApp" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#021a19" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#0d9488" }, content: { text: "© 2025 Nexus Hub Coworking. Where work happens.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Podcast ───────────────────────────────────────────────
  {
    id: "podcast",
    name: "Podcast / YouTube Channel",
    description: "Dynamic template for podcasters, YouTubers and content creators",
    category: "Creative",
    thumbnail: "🎙️",
    primaryColor: "#7c3aed",
    secondaryColor: "#f5f3ff",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "The Real Talk Podcast", primaryColor: "#7c3aed", secondaryColor: "#f5f3ff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#09050f", textColor: "#f1f5f9" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "The Real Talk Podcast – Ghana's #1 Lifestyle Show", description: "Raw, honest conversations about life, business and success in Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "rgba(9,5,15,0.95)", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { logo: "🎙 Real Talk", links: [{ label: "Episodes", href: "#episodes" }, { label: "Guests", href: "#guests" }, { label: "Sponsor", href: "#sponsor" }, { label: "Subscribe", href: "#subscribe" }], ctaText: "Listen Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#09050f 0%,#2e1065 50%,#7c3aed 100%)", paddingTop: 120, paddingBottom: 110 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: "900" }, content: { text: "Real Talk. No Filter.", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#a78bfa", fontSize: "1.2rem", margin: "20px auto", maxWidth: "600px", lineHeight: "1.8" }, content: { text: "Ghana's most honest conversations about entrepreneurship, relationships, culture and life. New episode every Tuesday." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", gap: "12px", marginTop: "40px" }, content: { text: "🎧 Listen to Latest Episode", href: "#episode", variant: "primary" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#2e1065", paddingTop: 50, paddingBottom: 50 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "50K+", label: "Monthly Listeners" }, { number: "200+", label: "Episodes" }, { number: "#1", label: "Ghana Lifestyle Charts" }, { number: "150+", label: "Notable Guests" }] } }] },
          { id: "s-about", type: "section", isVisible: true, styles: { backgroundColor: "#09050f", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "ab-it", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "About the Show", body: "Real Talk was started in 2021 to give Ghanaians a platform for honest, unfiltered conversations. Every week, we sit down with entrepreneurs, creatives, professionals and everyday people sharing stories that inspire, educate and entertain.", image: "", imageLeft: false } }
          ] },
          { id: "s-platforms", type: "section", isVisible: true, styles: { backgroundColor: "#2e1065", paddingTop: 70, paddingBottom: 70 }, elements: [
            { id: "pl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Listen & Watch Everywhere", level: "h2" } },
            { id: "pl-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "🎵", title: "Spotify", desc: "Search 'Real Talk Ghana' and subscribe for free" },
              { icon: "🎙️", title: "Apple Podcasts", desc: "Available on all Apple devices — search and subscribe" },
              { icon: "▶️", title: "YouTube", desc: "Full video episodes on our YouTube channel" },
              { icon: "📻", title: "Audiomack", desc: "Stream free on Audiomack — popular in Ghana" }
            ] } }
          ] },
          { id: "s-sponsor", type: "section", isVisible: true, styles: { backgroundColor: "#09050f", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "sp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "16px" }, content: { text: "Partner With Us", level: "h2" } },
            { id: "sp-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#a78bfa", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }, content: { text: "Reach 50,000+ engaged Ghanaians each week. Our audience is 25-45, educated and entrepreneurial." } },
            { id: "sp-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "brand", label: "Brand / Company Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "budget", label: "Sponsorship Budget", type: "text", required: false }, { name: "goal", label: "What do you want to achieve?", type: "textarea", required: false }], submitText: "Enquire About Sponsorship" } }
          ] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { background: "linear-gradient(135deg,#7c3aed,#2e1065)", paddingTop: 70, paddingBottom: 70 }, elements: [
            { id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get notified when new episodes drop", placeholder: "Enter your email", buttonLabel: "Subscribe" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#050209" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#7c3aed" }, content: { text: "© 2025 The Real Talk Podcast. Real stories. Real impact.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Recruitment Agency ────────────────────────────────────
  {
    id: "recruitment",
    name: "Recruitment Agency",
    description: "Professional template for staffing agencies and headhunters",
    category: "Professional",
    thumbnail: "🤝",
    primaryColor: "#1d4ed8",
    secondaryColor: "#eff6ff",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "TalentBridge Recruitment", primaryColor: "#1d4ed8", secondaryColor: "#eff6ff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f8faff", textColor: "#0f172a" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "TalentBridge – Leading Recruitment Agency in Ghana", description: "Connecting top talent with the best employers across Ghana and Africa" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "TalentBridge", links: [{ label: "For Employers", href: "#employers" }, { label: "For Candidates", href: "#candidates" }, { label: "Sectors", href: "#sectors" }, { label: "Contact", href: "#contact" }], ctaText: "Post a Job" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 60%,#60a5fa 100%)", paddingTop: 110, paddingBottom: 100 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: "800" }, content: { text: "The Right People. The Right Roles.", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.9)", fontSize: "1.15rem", margin: "20px auto", maxWidth: "620px", lineHeight: "1.8" }, content: { text: "Ghana's leading specialist recruitment agency. We connect high-performing candidates with the companies that need them most." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "40px" }, content: { text: "Find Top Talent →", href: "#employers", variant: "outline" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#1e3a8a", paddingTop: 50, paddingBottom: 50 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "2,500+", label: "Placements Made" }, { number: "300+", label: "Employer Partners" }, { number: "98%", label: "Retention Rate" }, { number: "48hrs", label: "Avg Time to Shortlist" }] } }] },
          { id: "s-logos", type: "section", isVisible: true, styles: { backgroundColor: "#f8fafc", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "lg-el", type: "brand-logos", isVisible: true, isLocked: false, styles: {}, content: { heading: "Trusted By Leading Businesses", logos: [
              { name: "Stanbic Bank" }, { name: "MTN Ghana" }, { name: "Vodafone GH" }, { name: "Melcom Group" }, { name: "Accra Mall" }
            ] } }
          ] },
                   { id: "s-for-employers", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "em-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "For Employers", level: "h2" } },
            { id: "em-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "50px" }, content: { text: "We fill roles faster and better than any other agency" } },
            { id: "em-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "🎯", title: "Executive Search", desc: "C-suite, directors and senior management placement" },
              { icon: "⚡", title: "Contract Staffing", desc: "Flexible contract workers for project-based needs" },
              { icon: "👥", title: "Volume Hiring", desc: "Rapid scale-up hiring for growing businesses" },
              { icon: "🌍", title: "International Sourcing", desc: "Diaspora talent return and international recruitment" }
            ] } }
          ] },
          { id: "s-sectors", type: "section", isVisible: true, styles: { backgroundColor: "#eff6ff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "sc-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Sectors We Serve", level: "h2" } },
            { id: "sc-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#1d4ed8", fontSize: "1.1rem" }, content: { text: "🏦 Banking & Finance · 💻 Technology & IT · 🏥 Healthcare · ⛏️ Mining & Energy · 🏗️ Construction · 🛒 FMCG & Retail · 📞 Telecoms · 🎓 Education · 🏛️ NGO & Development" } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "650px", margin: "0 auto", textAlign: "center" }, content: { quote: "TalentBridge filled our CFO role in just 10 days with a shortlist of 4 exceptional candidates. The quality of their network and speed of delivery is unmatched in Ghana.", author: "Kwabena Osei", role: "CEO, Osei Holdings Group", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#eff6ff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How do your fees work?", a: "We charge a placement fee based on the annual salary of the hired candidate, payable only on successful hire." },
              { q: "How long does recruitment take?", a: "We aim to deliver a shortlist within 48 hours for most roles. Senior searches take 1-2 weeks." },
              { q: "Do you work with SMEs?", a: "Yes! We work with businesses of all sizes, from startups to large corporations." },
              { q: "Do you offer a replacement guarantee?", a: "Yes, we offer a free replacement within 3 months if a placed candidate leaves." }
            ] } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { backgroundColor: "#1d4ed8", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Hire Faster. Hire Better.", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "560px", margin: "0 auto" }, content: { title: "", fields: [{ name: "company", label: "Company Name", type: "text", required: true }, { name: "name", label: "Your Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "role", label: "Role(s) to fill", type: "text", required: true }, { name: "timeline", label: "When do you need them?", type: "text", required: false }], submitText: "Request Talent Now" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#0c1a4a" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#3b82f6" }, content: { text: "© 2025 TalentBridge Recruitment. Your people are everything.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Car Wash ──────────────────────────────────────────────
  {
    id: "car-wash",
    name: "Car Wash & Detailing",
    description: "Clean, bold template for car wash services and auto detailing",
    category: "Automotive",
    thumbnail: "🚿",
    primaryColor: "#2563eb",
    secondaryColor: "#eff6ff",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "AquaShine Car Wash", primaryColor: "#2563eb", secondaryColor: "#eff6ff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0f9ff", textColor: "#0c2461" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "AquaShine Car Wash – Professional Car Cleaning in Accra", description: "Exterior wash, full detailing and interior cleaning services in Accra" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "AquaShine", links: [{ label: "Services", href: "#services" }, { label: "Packages", href: "#packages" }, { label: "Book", href: "#book" }], ctaText: "Book Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#38bdf8 100%)", paddingTop: 100, paddingBottom: 100 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: "900" }, content: { text: "Your Car Deserves the Best", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.9)", fontSize: "1.15rem", margin: "20px auto", maxWidth: "600px", lineHeight: "1.8" }, content: { text: "Professional car wash and detailing services in Accra. We use premium products and techniques to keep your car looking showroom-fresh." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "36px" }, content: { text: "Book a Wash Today", href: "#book", variant: "outline" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#1e3a8a", paddingTop: 50, paddingBottom: 50 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "10,000+", label: "Cars Cleaned" }, { number: "8yrs", label: "In Business" }, { number: "4.9★", label: "Google Rating" }, { number: "Same Day", label: "Service Available" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "50px" }, content: { text: "Our Services", level: "h2" } },
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "🚿", title: "Exterior Wash", desc: "Hand wash, rinse and blow dry — spot free results" },
              { icon: "✨", title: "Interior Cleaning", desc: "Vacuuming, wipe-down and odour treatment" },
              { icon: "💎", title: "Full Detailing", desc: "Complete inside and outside deep clean — like new!" },
              { icon: "🎨", title: "Polish & Wax", desc: "Paint protection and showroom shine coating" },
              { icon: "🪑", title: "Leather Treatment", desc: "Conditioning and protection for leather seats" },
              { icon: "🚗", title: "Mobile Wash", desc: "We come to you — home or office wash available" }
            ] } }
          ] },
          { id: "s-packages", type: "section", isVisible: true, styles: { backgroundColor: "#eff6ff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "pk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "50px" }, content: { text: "Wash Packages", level: "h2" } },
            { id: "pk-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [
              { name: "Quick Wash", price: "GHS 40", period: "", features: ["Exterior hand wash", "Wheel clean", "Window wipe", "Air freshener"], cta: "Book Now" },
              { name: "Full Clean", price: "GHS 100", period: "", features: ["Exterior + interior", "Vacuum & wipe", "Dashboard clean", "Tyre dress & shine"], cta: "Most Popular", highlighted: true },
              { name: "Premium Detail", price: "GHS 250", period: "", features: ["Full clean", "Clay bar treatment", "Polish & wax", "Leather care", "Engine bay clean"], cta: "Book Detail" }
            ] } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "I got the full detail done and my 5-year-old car looks brand new inside and out! The team is professional, thorough and great value. I won't go anywhere else now.", author: "Kwesi Annan-Forson", role: "Regular Customer", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#eff6ff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "How long does a full detail take?", a: "A full detail takes 3-5 hours depending on the size and condition of the vehicle." },
              { q: "Do you come to my home or office?", a: "Yes! Our mobile service comes to your location in Accra for an extra GHS 20 travel fee." },
              { q: "What products do you use?", a: "We use premium imported car care products that are safe on all paint types and finishes." },
              { q: "Do I need to book in advance?", a: "Walk-ins are welcome but booking ahead guarantees your preferred time slot." }
            ] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { backgroundColor: "#2563eb", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Book Your Wash", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Your Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "car", label: "Vehicle Type & Model", type: "text", required: true }, { name: "package", label: "Package Preferred", type: "text", required: true }, { name: "date", label: "Preferred Date & Time", type: "text", required: false }], submitText: "Book Now" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { backgroundColor: "#1e3a8a", paddingTop: 50, paddingBottom: 50 }, elements: [
            { id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center" }, content: { number: "", message: "Hello AquaShine! I'd like to book a car wash.", label: "Book on WhatsApp" } }
          ] },
          { id: "s-hours", type: "section", isVisible: true, styles: { paddingTop: 70, paddingBottom: 70, backgroundColor: "#fff" }, elements: [
            { id: "hr-el", type: "business-hours", isVisible: true, isLocked: false, styles: {}, content: { title: "Opening Hours", hours: [{ day: "Monday – Friday", time: "7:00am – 6:00pm" }, { day: "Saturday", time: "7:00am – 5:00pm" }, { day: "Sunday", time: "9:00am – 3:00pm" }] } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#0c1a4e" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#60a5fa" }, content: { text: "© 2025 AquaShine Car Wash. We make cars shine.", links: [] } }] }
        ]
      }]
    }
  },

  // ── Language School ───────────────────────────────────────
  {
    id: "language-school",
    name: "Language School",
    description: "Bright template for language institutes and tutoring centres",
    category: "Education",
    thumbnail: "🌍",
    primaryColor: "#059669",
    secondaryColor: "#ecfdf5",
    builderJson: {
      version: "1",
      siteSettings: { siteName: "Lingua Institute Ghana", primaryColor: "#059669", secondaryColor: "#ecfdf5", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0fdf4", textColor: "#064e3b" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Lingua Institute – Language Learning Centre in Accra", description: "French, Spanish, Mandarin, German and English language courses in Accra" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 0, paddingBottom: 0 }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Lingua Institute", links: [{ label: "Languages", href: "#languages" }, { label: "Courses", href: "#courses" }, { label: "Exams", href: "#exams" }, { label: "Enrol", href: "#enrol" }], ctaText: "Enrol Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#064e3b 0%,#059669 60%,#6ee7b7 100%)", paddingTop: 100, paddingBottom: 100 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: "900" }, content: { text: "Speak the World's Languages", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.9)", fontSize: "1.15rem", margin: "20px auto", maxWidth: "620px", lineHeight: "1.8" }, content: { text: "Ghana's leading language learning institute. Expert tutors, small classes and internationally recognised certifications." } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "40px" }, content: { text: "Start Your Free Trial Lesson", href: "#enrol", variant: "outline" } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { backgroundColor: "#064e3b", paddingTop: 50, paddingBottom: 50 }, elements: [{ id: "st1", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "3,000+", label: "Students Enrolled" }, { number: "8", label: "Languages Offered" }, { number: "20+", label: "Native Tutors" }, { number: "95%", label: "Exam Pass Rate" }] } }] },
          { id: "s-languages", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 90, paddingBottom: 90 }, elements: [
            { id: "ln-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Languages We Teach", level: "h2" } },
            { id: "ln-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
              { icon: "🇫🇷", title: "French (DELF/DALF)", desc: "From beginner to C2 with official DELF certification" },
              { icon: "🇪🇸", title: "Spanish (DELE)", desc: "Conversational to advanced with DELE exam preparation" },
              { icon: "🇨🇳", title: "Mandarin Chinese (HSK)", desc: "The world's most spoken language — start today" },
              { icon: "🇩🇪", title: "German (Goethe)", desc: "A2 to C2 with Goethe-Institut certification" },
              { icon: "🇬🇧", title: "Business English", desc: "Professional English for corporate and academic settings" },
              { icon: "🇵🇹", title: "Portuguese", desc: "Brazilian and European Portuguese for business and travel" }
            ] } }
          ] },
          { id: "s-courses", type: "section", isVisible: true, styles: { backgroundColor: "#ecfdf5", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "cr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "50px" }, content: { text: "Course Options", level: "h2" } },
            { id: "cr-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [
              { name: "Evening Classes", price: "GHS 350", period: "/month", features: ["3x per week (7pm-9pm)", "Small groups (max 8)", "Materials included", "Monthly assessments"], cta: "Enrol Now" },
              { name: "Intensive Course", price: "GHS 650", period: "/month", features: ["Daily sessions (5 days/wk)", "Small groups (max 5)", "Fast-track progress", "Exam prep included", "Certificate on completion"], cta: "Fast-Track", highlighted: true },
              { name: "1-on-1 Private", price: "GHS 150", period: "/session", features: ["Your own schedule", "Tailored curriculum", "Native tutor", "Business or conversational focus", "Online or in-person"], cta: "Book Private" }
            ] } }
          ] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { backgroundColor: "#fff", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "tm-el", type: "testimonial", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto", textAlign: "center" }, content: { quote: "I passed my DELF B2 on my first attempt after 8 months at Lingua. The tutors are patient, engaging and really push you. I got a promotion at work because of my French skills. Life-changing!", author: "Maame Akua Boateng", role: "Student — French B2 Graduate", avatar: "" } }
          ] },
          { id: "s-faq", type: "section", isVisible: true, styles: { backgroundColor: "#ecfdf5", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "fq-el", type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
              { q: "Do I need any prior knowledge to enrol?", a: "No! We have beginner classes for complete newcomers to every language." },
              { q: "Are your certificates internationally recognised?", a: "Yes, we offer DELF (French), DELE (Spanish), Goethe (German) and HSK (Mandarin) exams." },
              { q: "Do you offer online classes?", a: "Yes! Both in-person and online (Zoom) options are available for all levels." },
              { q: "How long does it take to become fluent?", a: "Most students reach conversational level (B1) in 12-18 months of regular study." }
            ] } }
          ] },
          { id: "s-enrol", type: "section", isVisible: true, styles: { backgroundColor: "#059669", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "en-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Enrol or Book a Free Trial", level: "h2" } },
            { id: "en-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "520px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Your Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "language", label: "Language of Interest", type: "text", required: true }, { name: "level", label: "Your Current Level", type: "text", required: false }], submitText: "Start Learning" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { backgroundColor: "#022c22" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#059669" }, content: { text: "© 2025 Lingua Institute Ghana. Open doors through language.", links: [] } }] }
        ]
      }]
    }
  },

];

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  return TEMPLATES.filter((t) => t.category === category);
}
