"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Type, Image, Square, MousePointer, Layout, Star, Mail,
  MapPin, Play, MessageSquare, DollarSign, Timer, Link2,
  ShoppingCart, BookOpen, UtensilsCrossed, Calendar, Search,
  Users, HelpCircle, Minus, ArrowUpDown, Phone, Share2,
} from "lucide-react";

interface ElementDef {
  type: string;
  label: string;
  icon: React.ElementType;
  category: string;
  defaultContent: Record<string, unknown>;
}

const ELEMENTS: ElementDef[] = [
  // Basic
  { type: "heading", label: "Heading", icon: Type, category: "Basic", defaultContent: { text: "Your Heading", level: "h2" } },
  { type: "text", label: "Text", icon: Type, category: "Basic", defaultContent: { text: "Add your text here. Click to edit this paragraph." } },
  { type: "image", label: "Image", icon: Image, category: "Basic", defaultContent: { src: "", alt: "Image", caption: "" } },
  { type: "button", label: "Button", icon: MousePointer, category: "Basic", defaultContent: { text: "Click Me", href: "#", variant: "primary" } },
  { type: "divider", label: "Divider", icon: Minus, category: "Basic", defaultContent: { style: "solid", color: "#e2e8f0" } },
  { type: "spacer", label: "Spacer", icon: ArrowUpDown, category: "Basic", defaultContent: { height: 40 } },
  // Layout
  { type: "hero", label: "Hero", icon: Layout, category: "Layout", defaultContent: { title: "Welcome to Your Site", subtitle: "Add a compelling description here", ctaText: "Get Started", ctaHref: "#", image: "" } },
  // Media
  { type: "gallery", label: "Gallery", icon: Image, category: "Media", defaultContent: { images: [], columns: 3 } },
  { type: "video", label: "Video", icon: Play, category: "Media", defaultContent: { url: "", autoplay: false, controls: true } },
  // Social / Contact
  { type: "social-links", label: "Social Links", icon: Share2, category: "Social", defaultContent: { links: [] } },
  { type: "whatsapp-button", label: "WhatsApp", icon: Phone, category: "Social", defaultContent: { number: "", message: "Hello!" } },
  // Commerce
  { type: "product-card", label: "Product Card", icon: ShoppingCart, category: "Commerce", defaultContent: { name: "Product Name", price: 0, currency: "GHS", image: "", description: "" } },
  { type: "pricing-table", label: "Pricing Table", icon: DollarSign, category: "Commerce", defaultContent: { plans: [] } },
  { type: "booking-widget", label: "Booking", icon: Calendar, category: "Commerce", defaultContent: { title: "Book an Appointment" } },
  // Content
  { type: "testimonial", label: "Testimonial", icon: Star, category: "Content", defaultContent: { quote: "Great service!", author: "Customer Name", role: "Customer", avatar: "" } },
  { type: "blog-preview", label: "Blog Preview", icon: BookOpen, category: "Content", defaultContent: { title: "Latest Posts", postsCount: 3 } },
  { type: "team-member", label: "Team Member", icon: Users, category: "Content", defaultContent: { name: "Team Member", role: "Role", bio: "", image: "" } },
  { type: "faq-accordion", label: "FAQ", icon: HelpCircle, category: "Content", defaultContent: { items: [{ q: "Question?", a: "Answer." }] } },
  { type: "stats-counter", label: "Stats", icon: Square, category: "Content", defaultContent: { stats: [{ number: "100+", label: "Clients" }] } },
  { type: "countdown", label: "Countdown", icon: Timer, category: "Content", defaultContent: { targetDate: "", title: "Coming Soon" } },
  // Forms
  { type: "form", label: "Contact Form", icon: Mail, category: "Forms", defaultContent: { title: "Contact Us", fields: ["name", "email", "message"], submitText: "Send" } },
  { type: "newsletter-signup", label: "Newsletter", icon: Mail, category: "Forms", defaultContent: { title: "Subscribe", placeholder: "Enter your email", buttonText: "Subscribe" } },
  // Navigation
  { type: "navigation", label: "Navigation", icon: Layout, category: "Navigation", defaultContent: { logo: "", links: [], ctaText: "" } },
  { type: "footer", label: "Footer", icon: Layout, category: "Navigation", defaultContent: { copyright: "", links: [] } },
  // Misc
  { type: "map", label: "Google Map", icon: MapPin, category: "Misc", defaultContent: { address: "", zoom: 14 } },
  { type: "menu-section", label: "Menu Section", icon: UtensilsCrossed, category: "Misc", defaultContent: { title: "Menu", items: [] } },
  { type: "link-in-bio", label: "Link in Bio", icon: Link2, category: "Misc", defaultContent: { links: [] } },
];

const CATEGORIES = Array.from(new Set(ELEMENTS.map((e) => e.category)));

function DraggableElement({ element }: { element: ElementDef }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `new-element-${element.type}`,
    data: { type: "new-element", elementType: element.type, defaultContent: element.defaultContent },
  });

  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined;
  const Icon = element.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-grab active:cursor-grabbing text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-all select-none ${
        isDragging ? "opacity-50 ring-1 ring-josett-500" : ""
      }`}
    >
      <Icon size={13} className="text-slate-500 flex-shrink-0" />
      <span>{element.label}</span>
    </div>
  );
}

export function ElementsPanel() {
  return (
    <div className="p-2 space-y-4">
      {CATEGORIES.map((cat) => (
        <div key={cat}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 px-3 mb-1">{cat}</p>
          {ELEMENTS.filter((e) => e.category === cat).map((el) => (
            <DraggableElement key={el.type} element={el} />
          ))}
        </div>
      ))}
    </div>
  );
}
