export const SITE = {
  brand: "PASSION",
  tagline: "Crafted Fabric. Tailored Identity.",
  whatsapp: "923232032700",
  whatsappLink: "https://wa.me/923232032700",
  founder: "Muhammad Asif Khan",
  email: "atelier@passionfabrics.com",
  locations: [
    {
      city: "Lahore",
      country: "Pakistan",
      address: "Khayaban-e-Amin, Lahore",
      mapsEmbed: "https://www.google.com/maps?q=Khayaban-e-Amin,+Lahore,+Pakistan&output=embed",
      mapsLink: "https://maps.google.com/?q=Khayaban-e-Amin,+Lahore,+Pakistan",
    },
    {
      city: "Silicon Valley",
      country: "USA",
      address: "Silicon Valley, California",
      mapsEmbed: "https://www.google.com/maps?q=Silicon+Valley,+California,+USA&output=embed",
      mapsLink: "https://maps.google.com/?q=Silicon+Valley,+California,+USA",
    },
  ],
  nav: [
    { to: "/", label: "Home" },
    { to: "/collections", label: "Collections" },
    { to: "/services", label: "Services" },
    { to: "/advisor", label: "Fabric Advisor" },
    { to: "/about", label: "About Founder" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
  ],
} as const;

export interface FrontendVariation {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
}

export interface FrontendColor {
  id: number;
  name: string;
  hex_code: string;
}

export interface FrontendProduct {
  id: number;
  slug: string;
  name: string;
  short_description: string;
  long_description: string;
  featured_image_url: string | null;
  image_key: string | null;
  season: string;
  regular_price: number;
  sale_price: number;
  has_discount: boolean;
  avg_rating: number;
  review_count: number;
  variations: FrontendVariation[];
  colors: FrontendColor[];
}

export const SERVICES: FrontendProduct[] = [
  {
    id: 1,
    slug: "premium-cotton",
    name: "Premium Cotton Collection",
    short_description: "Breathable luxury cotton woven for daily refinement.",
    long_description: "A meticulously curated cotton collection that pairs heritage weaving with contemporary finish — soft hand-feel, breathable density, and a structure that holds the shape of any tailored cut.",
    featured_image_url: null,
    image_key: "cotton",
    season: "All-season",
    regular_price: 3999,
    sale_price: 3499,
    has_discount: true,
    avg_rating: 4.8,
    review_count: 24,
    variations: [
      { id: 1, name: "Superior 80s", description: "Crisp, lightweight — ideal for warm climates", price: 3499, original_price: 3999 },
      { id: 2, name: "Premium 100s", description: "Our bestseller — breathable with a soft drape", price: 4499, original_price: null },
      { id: 3, name: "Luxury 120s", description: "Ultra-fine combed yarn for a silky hand-feel", price: 5999, original_price: null },
    ],
    colors: [
      { id: 1, name: "Ivory", hex_code: "#f5f0e8" },
      { id: 2, name: "Stone", hex_code: "#c4b8a0" },
      { id: 3, name: "Navy", hex_code: "#1a2744" },
      { id: 4, name: "Charcoal", hex_code: "#3a3a3a" },
      { id: 5, name: "Black", hex_code: "#111111" },
      { id: 6, name: "Sage", hex_code: "#8a9a7a" },
    ],
  },
  {
    id: 2,
    slug: "wash-wear",
    name: "Luxury Wash & Wear",
    short_description: "Effortless polish that travels with you.",
    long_description: "Engineered for the modern professional — wrinkle-resistant, low-maintenance fabrics that retain their crisp silhouette through long days, intercontinental flights, and back-to-back rooms.",
    featured_image_url: null,
    image_key: "washwear",
    season: "Spring · Autumn · Winter",
    regular_price: 4999,
    sale_price: 3999,
    has_discount: true,
    avg_rating: 4.6,
    review_count: 18,
    variations: [
      { id: 4, name: "Classic Weave", description: "Trusted everyday performance with a natural feel", price: 3999, original_price: null },
      { id: 5, name: "Ultra Stretch", description: "Added elastane for unrestricted movement", price: 4999, original_price: null },
      { id: 6, name: "Supreme Stretch+", description: "Four-way stretch with memory technology", price: 6499, original_price: null },
    ],
    colors: [
      { id: 7, name: "White", hex_code: "#f8f8f6" },
      { id: 8, name: "Light Grey", hex_code: "#d0d0cc" },
      { id: 9, name: "Navy", hex_code: "#1a2744" },
      { id: 10, name: "Espresso", hex_code: "#3a2518" },
      { id: 11, name: "Burgundy", hex_code: "#4a1928" },
      { id: 12, name: "Forest", hex_code: "#1a3a2a" },
    ],
  },
  {
    id: 3,
    slug: "formal-latha",
    name: "Formal Latha Series",
    short_description: "The boardroom standard, redefined.",
    long_description: "A formal Latha series with a refined satin handle, graceful drape, and a quiet luminosity that reads as authority across boardrooms, ceremonies, and after-hours events.",
    featured_image_url: null,
    image_key: "latha",
    season: "Year-round formal",
    regular_price: 7499,
    sale_price: 5499,
    has_discount: true,
    avg_rating: 4.9,
    review_count: 31,
    variations: [
      { id: 7, name: "Standard Latha", description: "Classic lustre finish for daily formal wear", price: 5499, original_price: null },
      { id: 8, name: "Royal Latha", description: "Heavier fabric with an opulent sheen", price: 6999, original_price: 7499 },
      { id: 9, name: "Imperial Latha", description: "Premium grade with silk-blend enrichment", price: 8999, original_price: null },
    ],
    colors: [
      { id: 13, name: "Ivory", hex_code: "#f5f0e8" },
      { id: 14, name: "Silver", hex_code: "#c0c0c0" },
      { id: 15, name: "Midnight Blue", hex_code: "#191970" },
      { id: 16, name: "Charcoal", hex_code: "#3a3a3a" },
      { id: 17, name: "Black", hex_code: "#0a0a0a" },
      { id: 18, name: "Burgundy", hex_code: "#4a1928" },
    ],
  },
  {
    id: 4,
    slug: "custom-selection",
    name: "Custom Fabric Selection",
    short_description: "A personal atelier, on demand.",
    long_description: "Private consultations with a master fabric advisor — color matching, weight calibration, occasion mapping, and direct sourcing from our reserved heritage stock.",
    featured_image_url: null,
    image_key: "custom",
    season: "By appointment",
    regular_price: 14999,
    sale_price: 0,
    has_discount: false,
    avg_rating: 5.0,
    review_count: 12,
    variations: [
      { id: 10, name: "Personal Consultation", description: "One-on-one session with a master fabric advisor", price: 0, original_price: null },
      { id: 11, name: "Curated Swatch Kit", description: "12 hand-picked samples matched to your brief", price: 999, original_price: null },
      { id: 12, name: "Bespoke Sourcing", description: "Full-service sourcing from heritage mills worldwide", price: 14999, original_price: null },
    ],
    colors: [
      { id: 19, name: "All Available", hex_code: "var(--color-violet)" },
    ],
  },
];

export type ServiceSlug = typeof SERVICES[number]["slug"];

export const HERO_SLIDES = SERVICES.map((s) => ({
  slug: s.slug,
  title: s.name,
  subtitle: s.long_description.slice(0, 80) + '…',
  image: s.image_key ?? 'cotton',
  tag: s.colors.map((c) => c.name).slice(0, 3).join(' · '),
}));

export const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Alphabetical" },
] as const;
